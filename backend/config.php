<?php
/**
 * Database Configuration
 * Update these credentials with your actual database information
 */

// Database credentials
$db_host = 'localhost';
$db_user = 'root'; // Change this to your database username
$db_pass = ''; // Change this to your database password
$db_name = 'portfolio_db'; // Change this to your database name

// Create connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]));
}

// Set charset to UTF-8
$conn->set_charset("utf8mb4");

// Define response header
header('Content-Type: application/json; charset=utf-8');

/**
 * Create messages table if not exists
 */
function createMessagesTable($conn)
{
    $sql = "CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        subject VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('new', 'read', 'replied') DEFAULT 'new',
        INDEX idx_email (email),
        INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

    if (!$conn->query($sql)) {
        error_log("Error creating messages table: " . $conn->error);
    }
}

// Create table on first run
createMessagesTable($conn);

// Function to sanitize input
function sanitizeInput($conn, $data)
{
    return $conn->real_escape_string(strip_tags(trim($data)));
}

// Function to validate email
function validateEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Function to log errors
function logError($message)
{
    $log_file = __DIR__ . '/error_log.txt';
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($log_file, "[$timestamp] $message\n", FILE_APPEND);
}

?>