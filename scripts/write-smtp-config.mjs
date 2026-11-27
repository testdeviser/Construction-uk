/* Writes dist/smtp-config.php (SMTP settings for the quote form mailer) from
   environment variables – used by the deploy workflow with GitHub Secrets, so the
   mailbox password is never stored in Git. Does nothing if SMTP_HOST isn't set
   (the mailer then falls back to the server's own mail()). */
import { writeFileSync } from 'node:fs';

const env = process.env;
if (!env.SMTP_HOST || !env.SMTP_USERNAME || !env.SMTP_PASSWORD) {
  console.log('SMTP secrets not set – skipping smtp-config.php (forms will use PHP mail()).');
  process.exit(0);
}

// PHP single-quoted string: only \ and ' need escaping
const php = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const port = parseInt(env.SMTP_PORT || '465', 10);

const file = `<?php
// Written by the deploy (scripts/write-smtp-config.mjs) from GitHub Secrets – do not edit on the server.
return [
  'host'      => ${php(env.SMTP_HOST)},
  'port'      => ${port},
  'secure'    => ${php(env.SMTP_SECURE || (port === 465 ? 'ssl' : 'tls'))},
  'username'  => ${php(env.SMTP_USERNAME)},
  'password'  => ${php(env.SMTP_PASSWORD)},
  'from'      => ${php(env.SMTP_FROM || env.SMTP_USERNAME)},
  'from_name' => ${php(env.SMTP_FROM_NAME || 'Company Name Website')},
];
`;
writeFileSync('dist/smtp-config.php', file, { mode: 0o600 });
console.log('Wrote dist/smtp-config.php for ' + env.SMTP_HOST);
