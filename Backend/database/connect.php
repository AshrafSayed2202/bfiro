<?php
$allowed_origins = [
    'https://bfiro.com',
    'http://localhost:5174',
    'http://localhost:5173',
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // Cache for 1 day
}

// Handle OPTIONS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

header("Content-Type: application/json");
date_default_timezone_set('Africa/Cairo');

$host = "mysql:host=localhost;dbname=bfiro;charset=utf8mb4";
$db_user = "admin";
$db_pass = "admin";

$option = [
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4",
];

try {
    $con = new PDO($host, $db_user, $db_pass, $option);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection error: " . $e->getMessage()]);
    exit();
}
