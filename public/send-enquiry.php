<?php
/* =========================================================
   Quote form mailer (custom, no third-party service or library)
   ---------------------------------------------------------
   Every quote form on the site (homepage hero, homepage contact box,
   Contact page) POSTs JSON here; this script checks the data and emails it.

   How it sends – best first:
   1. SMTP: logs in to a real mailbox (e.g. Gmail with an App Password) and
      sends through that provider's mail server. Signed by the provider, so it
      lands in the inbox. Used when smtp-config.php exists next to this file.
   2. PHP mail(): the web server sends it directly. Works on most hosts but
      Gmail often files these under Spam. Used as a backup.

   smtp-config.php holds the mailbox password, so it is NOT in Git – the deploy
   writes it from GitHub Secrets (see .github/workflows/deploy.yml and
   smtp-config.example.php in the project root).

   Vite copies this file from /public into the build. It only runs on the live
   PHP server – in `npm run dev` the form fakes a successful send.
   ========================================================= */

// ---------- Settings ----------
$TO_EMAIL   = 'devdeviser@gmail.com';      // where enquiries are sent (temporary – change before launch)
$SITE_NAME  = 'Company Name';              // shown as the sender name and in the subject
$MAX_PER_IP = 5;                           // max enquiries per visitor…
$WINDOW_SEC = 600;                         // …in this many seconds (10 minutes)

// Services the form offers – anything else is rejected
$SERVICES = [
  'Building & Renovations',
  'Kitchen & Bathroom',
  'Roofing & Loft Solutions',
  'Gardens & Driveways',
  'Windows & Installation',
  'Repairs & Maintenance',
];

// ---------- Helpers ----------
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond($code, $ok, $error = '') {
  http_response_code($code);
  echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
  exit;
}

// One line of plain text: no line breaks (blocks email header injection), trimmed, length-limited
function clean_line($v, $max) {
  $v = is_string($v) ? $v : '';
  $v = preg_replace('/[\r\n\t]+/', ' ', $v);
  $v = trim(preg_replace('/\s+/', ' ', $v));
  return mb_substr($v, 0, $max);
}

// Multi-line text for the message body
function clean_text($v, $max) {
  $v = is_string($v) ? $v : '';
  $v = str_replace("\r\n", "\n", $v);
  $v = preg_replace('/[^\P{C}\n]+/u', '', $v);   // drop control characters except new lines
  return mb_substr(trim($v), 0, $max);
}

// "=?UTF-8?B?…?=" so names/subjects with symbols (–, £, é) display correctly
function encode_header($text) {
  return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

/* Minimal SMTP client: SSL (port 465) or STARTTLS (port 587), AUTH LOGIN.
   Returns true, or false with the server's reply in $err. */
function smtp_send(array $cfg, $envelopeFrom, $to, $message, &$err) {
  $host   = $cfg['host'];
  $port   = (int) ($cfg['port'] ?? 465);
  $secure = $cfg['secure'] ?? ($port === 465 ? 'ssl' : 'tls');
  $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
  $fp = @stream_socket_client(($secure === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
  if (!$fp) { $err = "connect failed: $errstr ($errno)"; return false; }
  stream_set_timeout($fp, 20);

  $read = function () use ($fp) {
    $data = '';
    while (($line = fgets($fp, 1024)) !== false) {
      $data .= $line;
      if (strlen($line) < 4 || $line[3] === ' ') break;   // last line of a (multi-line) reply
    }
    return $data;
  };
  $cmd = function ($line, $expect) use ($fp, $read, &$err) {
    if ($line !== null) fwrite($fp, $line . "\r\n");
    $reply = $read();
    if (!in_array((int) substr($reply, 0, 3), (array) $expect, true)) { $err = trim($reply) ?: 'no reply'; return false; }
    return true;
  };

  $helo = preg_replace('/[^a-z0-9.\-]/i', '', $_SERVER['SERVER_NAME'] ?? 'localhost') ?: 'localhost';
  $ok = $cmd(null, 220) && $cmd("EHLO $helo", 250);
  if ($ok && $secure === 'tls') {
    $method = STREAM_CRYPTO_METHOD_TLS_CLIENT;
    if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) $method |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
    if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) $method |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
    $ok = $cmd('STARTTLS', 220) && @stream_socket_enable_crypto($fp, true, $method) && $cmd("EHLO $helo", 250);
    if (!$ok && !$err) $err = 'STARTTLS failed';
  }
  $ok = $ok
    && $cmd('AUTH LOGIN', 334)
    && $cmd(base64_encode($cfg['username']), 334)
    && $cmd(base64_encode($cfg['password']), 235)
    && $cmd("MAIL FROM:<$envelopeFrom>", 250)
    && $cmd("RCPT TO:<$to>", [250, 251])
    && $cmd('DATA', 354);
  if ($ok) {
    // normalise line endings and "dot-stuff" lines that start with a full stop
    $data = preg_replace('/(?<!\r)\n/', "\r\n", $message);
    $data = preg_replace('/^\./m', '..', $data);
    $ok = $cmd($data . "\r\n.", 250);
  }
  @fwrite($fp, "QUIT\r\n");
  fclose($fp);
  return $ok;
}

// ---------- Request checks ----------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  header('Allow: POST');
  respond(405, false, 'Method not allowed.');
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode($raw ?: '', true);
if (!is_array($data)) respond(400, false, 'Invalid request.');

// Honeypot: a hidden field real visitors never fill in. Bots that do get a fake "success".
if (!empty($data['website'])) respond(200, true);

// ---------- Validate ----------
$service  = clean_line($data['service'] ?? '', 100);
$name     = clean_line($data['name'] ?? '', 100);
$phone    = clean_line($data['phone'] ?? '', 40);
$email    = clean_line($data['email'] ?? '', 160);
$postcode = clean_line($data['postcode'] ?? '', 20);
$message  = clean_text($data['message'] ?? '', 2000);
$page     = clean_line($data['page'] ?? '', 300);

if (!in_array($service, $SERVICES, true))                  respond(422, false, 'Please choose a service.');
if ($name === '')                                           respond(422, false, 'Please enter your name.');
if (strlen(preg_replace('/\D/', '', $phone)) < 7)          respond(422, false, 'Please enter a valid phone number.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))             respond(422, false, 'Please enter a valid email address.');

// ---------- Rate limit (per visitor IP, stored in the server's temp folder) ----------
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = rtrim(sys_get_temp_dir(), '/\\') . '/enquiry_' . hash('sha256', $ip . __FILE__) . '.json';
$now = time();
$times = [];
if (is_readable($rlFile)) {
  $times = json_decode((string) @file_get_contents($rlFile), true) ?: [];
  $times = array_values(array_filter($times, function ($t) use ($now, $WINDOW_SEC) { return is_int($t) && $t > $now - $WINDOW_SEC; }));
}
if (count($times) >= $MAX_PER_IP) {
  respond(429, false, 'Too many enquiries sent – please wait a few minutes or call us.');
}

// ---------- Sender ----------
$smtp = is_readable(__DIR__ . '/smtp-config.php') ? include __DIR__ . '/smtp-config.php' : null;
$useSmtp = is_array($smtp) && !empty($smtp['host']) && !empty($smtp['username']) && !empty($smtp['password']);

$host = preg_replace('/[^a-z0-9.\-]/i', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$host = preg_replace('/^www\./i', '', $host);
// With SMTP the sender must be the mailbox we log in to (Gmail rewrites anything else).
// With mail() it must be on this site's domain, or receiving servers distrust it.
$fromEmail = $useSmtp ? ($smtp['from'] ?? $smtp['username']) : 'no-reply@' . $host;
$fromName  = $useSmtp && !empty($smtp['from_name']) ? $smtp['from_name'] : $SITE_NAME . ' Website';
$msgDomain = substr(strrchr($fromEmail, '@'), 1) ?: $host;

// ---------- Build the email ----------
// A plain, personal-looking message (no links, images or marketing wording) – the kind
// Gmail treats as a normal one-to-one email rather than spam or a promotion.
$subject = 'New quote request: ' . $service . ' – ' . $name;

$lines = [
  'You have a new quote request from the website.',
  '',
  'Service:   ' . $service,
  'Name:      ' . $name,
  'Phone:     ' . $phone,
  'Email:     ' . $email,
  'Postcode:  ' . ($postcode !== '' ? $postcode : '–'),
  '',
  'Project details:',
  $message !== '' ? $message : '–',
  '',
  '----',
  'Sent from: ' . ($page !== '' ? $page : 'website'),
  'Date:      ' . date('j M Y, H:i'),
  'Reply to this email to answer the customer directly.',
];
$body = quoted_printable_encode(implode("\r\n", $lines));

$headers = [
  'Date: ' . date('r'),
  'From: ' . encode_header($fromName) . ' <' . $fromEmail . '>',
  'Reply-To: ' . encode_header($name) . ' <' . $email . '>',
  'Message-ID: <' . bin2hex(random_bytes(12)) . '.' . $now . '@' . $msgDomain . '>',
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: quoted-printable',
];

// ---------- Send ----------
$sent = false;
if ($useSmtp) {
  $full = implode("\r\n", array_merge($headers, ['To: <' . $TO_EMAIL . '>', 'Subject: ' . encode_header($subject)])) . "\r\n\r\n" . $body;
  $sent = smtp_send($smtp, $fromEmail, $TO_EMAIL, $full, $smtpError);
  if (!$sent) error_log('send-enquiry.php: SMTP failed – ' . $smtpError . ' – falling back to mail()');
}
if (!$sent) {
  // Backup (or no SMTP set up): the server's own mail()
  $fallbackFrom = 'no-reply@' . $host;
  $mailHeaders = $headers;
  $mailHeaders[1] = 'From: ' . encode_header($SITE_NAME . ' Website') . ' <' . $fallbackFrom . '>';
  $sent = @mail($TO_EMAIL, encode_header($subject), $body, implode("\r\n", $mailHeaders), '-f' . $fallbackFrom);
  if (!$sent) {
    // some hosts don't allow setting the envelope sender (-f) – try once more without it
    $sent = @mail($TO_EMAIL, encode_header($subject), $body, implode("\r\n", $mailHeaders));
  }
}

if (!$sent) {
  respond(500, false, "Sorry, we couldn't send your enquiry right now. Please try again or call us.");
}

$times[] = $now;
@file_put_contents($rlFile, json_encode($times), LOCK_EX);

respond(200, true);
