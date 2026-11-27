<?php
/* =========================================================
   Quote form mailer (custom, no third-party service)
   ---------------------------------------------------------
   The quote forms on the site POST JSON here; this script checks the
   data and emails it to the address below using the server's mail().
   Vite copies this file from /public into the build, so it is uploaded
   with the site and runs on the live (PHP) server. It does not run in
   `npm run dev` – the form fakes a successful send there instead.
   ========================================================= */

// ---------- Settings ----------
$TO_EMAIL   = 'devdeviser@gmail.com';     // where enquiries are sent (temporary – change before launch)
$SITE_NAME  = 'Company Name';              // shown in the email subject / sender name
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

// ---------- Build the email ----------
$host = preg_replace('/[^a-z0-9.\-]/i', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$host = preg_replace('/^www\./i', '', $host);
$from = 'no-reply@' . $host;   // must be on this site's domain, or many mail servers reject / spam it

$subject = 'New quote request: ' . $service . ' – ' . $name;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

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
$body = implode("\r\n", $lines);

$headers = [
  'From: =?UTF-8?B?' . base64_encode($SITE_NAME . ' Website') . '?= <' . $from . '>',
  'Reply-To: ' . $email,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
  'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail($TO_EMAIL, $encodedSubject, $body, implode("\r\n", $headers), '-f' . $from);
if (!$sent) {
  // some hosts don't allow setting the envelope sender (-f) – try once more without it
  $sent = @mail($TO_EMAIL, $encodedSubject, $body, implode("\r\n", $headers));
}

if (!$sent) {
  respond(500, false, "Sorry, we couldn't send your enquiry right now. Please try again or call us.");
}

$times[] = $now;
@file_put_contents($rlFile, json_encode($times), LOCK_EX);

respond(200, true);
