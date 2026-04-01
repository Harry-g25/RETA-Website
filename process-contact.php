<?php
// process-contact.php — Handles contact form submissions

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

// Sanitise input
$name    = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// Validate required fields
$errors = [];
if (empty($name))    $errors[] = 'Name is required.';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email address is required.';
if (empty($message)) $errors[] = 'Message is required.';

if (!empty($errors)) {
    header('Location: contact.html?status=error');
    exit;
}

// Build email
$to = 'info@reta-training.co.uk';  // Change to your actual email
$subject = "Website Contact Message from {$name}";

$body = "CONTACT FORM MESSAGE\n";
$body .= "====================\n\n";
$body .= "Name:   {$name}\n";
$body .= "Email:  {$email}\n\n";
$body .= "Message:\n";
$body .= "{$message}\n\n";
$body .= "====================\n";
$body .= "Sent from RETA website contact form\n";

$headers = "From: noreply@reta-training.co.uk\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    header('Location: contact.html?status=success');
} else {
    header('Location: contact.html?status=error');
}
exit;
