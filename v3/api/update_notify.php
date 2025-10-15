<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;
    $notify = $_POST['notify_demo'] ?? null;

    if ($id && ($notify === '0' || $notify === '1')) {
        $stmt = $pdo->prepare("UPDATE admin SET notify_demo = ? WHERE id = ?");
        $success = $stmt->execute([$notify, $id]);
        echo json_encode(['success' => $success]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
}
