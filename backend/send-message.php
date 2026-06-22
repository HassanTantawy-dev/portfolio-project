<?php
/**
 * Contact Form Handler with Validation & Database Storage
 */

require_once 'config.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode([
        'success' => false,
        'message' => 'Method Not Allowed'
    ]));
}

// Initialize response array
$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];

// Get and sanitize form data
$name = isset($_POST['name']) ? sanitizeInput($conn, $_POST['name']) : '';
$email = isset($_POST['email']) ? sanitizeInput($conn, $_POST['email']) : '';
$subject = isset($_POST['subject']) ? sanitizeInput($conn, $_POST['subject']) : '';
$message = isset($_POST['message']) ? sanitizeInput($conn, $_POST['message']) : '';

/**
 * VALIDATION
 */

// Validate Name
if (empty($name)) {
    $response['errors']['name'] = 'Name is required';
} elseif (strlen($name) < 2) {
    $response['errors']['name'] = 'Name must be at least 2 characters';
} elseif (strlen($name) > 100) {
    $response['errors']['name'] = 'Name cannot exceed 100 characters';
} elseif (!preg_match('/^[a-zA-Z\s\-\.\']+$/u', $name)) {
    $response['errors']['name'] = 'Name contains invalid characters';
}

// Validate Email
if (empty($email)) {
    $response['errors']['email'] = 'Email is required';
} elseif (!validateEmail($email)) {
    $response['errors']['email'] = 'Please enter a valid email address';
} elseif (strlen($email) > 100) {
    $response['errors']['email'] = 'Email is too long';
}

// Validate Subject
if (empty($subject)) {
    $response['errors']['subject'] = 'Subject is required';
} elseif (strlen($subject) < 3) {
    $response['errors']['subject'] = 'Subject must be at least 3 characters';
} elseif (strlen($subject) > 200) {
    $response['errors']['subject'] = 'Subject cannot exceed 200 characters';
}

// Validate Message
if (empty($message)) {
    $response['errors']['message'] = 'Message is required';
} elseif (strlen($message) < 10) {
    $response['errors']['message'] = 'Message must be at least 10 characters';
} elseif (strlen($message) > 5000) {
    $response['errors']['message'] = 'Message cannot exceed 5000 characters';
}

// If there are validation errors, return them
if (!empty($response['errors'])) {
    http_response_code(400);
    echo json_encode($response);
    exit;
}

/**
 * PREVENT SPAM
 */

// Check for duplicate messages from same email within 5 minutes
$check_spam = "SELECT id FROM messages WHERE email = ? AND created_at > DATE_SUB(NOW(), INTERVAL 5 MINUTE) LIMIT 1";
$stmt = $conn->prepare($check_spam);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'Please wait a few minutes before sending another message'
    ]);
    $stmt->close();
    exit;
}
$stmt->close();

/**
 * DATABASE INSERTION
 */

$insert_sql = "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($insert_sql);

if (!$stmt) {
    logError("Prepare failed: " . $conn->error);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while processing your request'
    ]);
    exit;
}

$stmt->bind_param("ssss", $name, $email, $subject, $message);

if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = 'Your message has been sent successfully! We will get back to you soon.';
    http_response_code(200);

    /**
     * SEND EMAIL NOTIFICATION (Optional)
     * Uncomment the following lines if you have email configured
     */
    /*
    $to = "your-email@example.com";
    $email_subject = "New Contact Form Submission: " . $subject;
    $email_body = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";
    $headers = "From: " . $email;

    mail($to, $email_subject, $email_body, $headers);
    */

} else {
    logError("Insert failed: " . $stmt->error . " | Data: Name=$name, Email=$email");
    http_response_code(500);
    $response['success'] = false;
    $response['message'] = 'An error occurred while saving your message. Please try again later.';
}

$stmt->close();
$conn->close();

// Return response as JSON
echo json_encode($response);
?>