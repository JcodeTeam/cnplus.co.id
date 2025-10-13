<?php
session_start();

// if (!isset($_SESSION['admin_logged_in'])) {
//     http_response_code(401); // Unauthorized
//     echo json_encode(['error' => 'Unauthorized']);
//     exit;
// }

require_once './db.php';

try {
    $stmt = $pdo->query("SELECT * FROM demo_requests ORDER BY created_at DESC");
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($requests);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}