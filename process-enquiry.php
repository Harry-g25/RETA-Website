<?php
// process-enquiry.php — Handles course enquiry form submissions

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: enquire.html');
    exit;
}

// Sanitise input
$name      = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$email     = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone     = htmlspecialchars(trim($_POST['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
$company   = htmlspecialchars(trim($_POST['company'] ?? ''), ENT_QUOTES, 'UTF-8');
$course    = htmlspecialchars(trim($_POST['course'] ?? ''), ENT_QUOTES, 'UTF-8');
$timeframe = htmlspecialchars(trim($_POST['timeframe'] ?? ''), ENT_QUOTES, 'UTF-8');
$message   = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// Validate required fields
$errors = [];
if (empty($name))  $errors[] = 'Name is required.';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email address is required.';
if (empty($phone)) $errors[] = 'Phone number is required.';
if (empty($course)) $errors[] = 'Please select a course.';

// Validate course value against allowed options
$allowed_courses = ['heat-pumps', 'solar-pv', 'battery-storage', 'ev-charging', 'other'];
if (!in_array($course, $allowed_courses, true)) {
    $errors[] = 'Invalid course selection.';
}

if (!empty($errors)) {
    // Redirect back with error (in production, handle more gracefully)
    header('Location: enquire.html?status=error');
    exit;
}

// Course display names
$course_names = [
    'heat-pumps'      => 'Heat Pump Training',
    'solar-pv'        => 'Solar PV Installation',
    'battery-storage'  => 'Battery Storage',
    'ev-charging'      => 'EV Charging Installation',
    'other'            => 'Other / Not Sure',
];
$course_display = $course_names[$course] ?? $course;

// Build email
$to = 'info@reta-training.co.uk';  // Change to your actual email
$subject = "New Course Enquiry: {$course_display} — from {$name}";

$body = "NEW COURSE ENQUIRY\n";
$body .= "==================\n\n";
$body .= "Name:       {$name}\n";
$body .= "Email:      {$email}\n";
$body .= "Phone:      {$phone}\n";
$body .= "Company:    " . ($company ?: 'N/A') . "\n";
$body .= "Course:     {$course_display}\n";
$body .= "Timeframe:  " . ($timeframe ?: 'Not specified') . "\n\n";
$body .= "Message:\n";
$body .= ($message ?: 'No additional message.') . "\n\n";
$body .= "==================\n";
$body .= "Sent from RETA website enquiry form\n";

$headers = "From: noreply@reta-training.co.uk\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    header('Location: enquire.html?status=success');
} else {
    header('Location: enquire.html?status=error');
}
exit;
