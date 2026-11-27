<?php
/* =========================================================
   SMTP settings for public/send-enquiry.php (the quote form mailer)
   ---------------------------------------------------------
   The real file is called smtp-config.php and sits next to send-enquiry.php
   on the server. It contains a password, so it is never committed to Git.

   It is created automatically on every deploy from these GitHub Secrets
   (repo › Settings › Secrets and variables › Actions):
     SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USERNAME, SMTP_PASSWORD
     (optional) SMTP_FROM, SMTP_FROM_NAME
   …or you can upload a copy of this file, filled in and renamed, by FTP.

   Gmail example (recommended for now):
   1. Sign in to the Gmail account that will SEND the emails.
   2. Turn on 2-Step Verification: myaccount.google.com › Security.
   3. Create an App Password: myaccount.google.com/apppasswords
      (name it e.g. "Website form") and copy the 16-character password.
   4. Use these values:
   ========================================================= */
return [
  'host'      => 'smtp.gmail.com',
  'port'      => 465,                  // 465 = SSL, 587 = STARTTLS
  'secure'    => 'ssl',                // 'ssl' or 'tls'
  'username'  => 'sender@gmail.com',   // the Gmail address you log in with
  'password'  => 'xxxx xxxx xxxx xxxx', // the 16-character App Password (NOT your normal password)
  'from'      => 'sender@gmail.com',   // usually the same as username
  'from_name' => 'Company Name Website',
];
