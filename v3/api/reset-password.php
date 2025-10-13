<?php
session_start();
require_once './db.php'; // Sesuaikan path sesuai struktur folder

$username = $_GET['user'] ?? '';
// if (empty($username) || !isset($_SESSION['reset_username']) || $_SESSION['reset_username'] !== $username) {
//     ob_clean();
//     echo json_encode(['status' => 'error', 'message' => 'Akses tidak valid']);
//     exit;
// }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newPassword = $_POST['new_password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    if (empty($newPassword) || empty($confirmPassword)) {
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Semua kolom harus diisi']);
        exit;
    }

    if ($newPassword !== $confirmPassword) {
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Password tidak cocok']);
        exit;
    }

    try {
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("UPDATE admin SET password = ? WHERE username = ?");
        $stmt->execute([$hashedPassword, $username]);

        unset($_SESSION['reset_username']);

        ob_clean();
        echo json_encode(['status' => 'success', 'redirect' => '../admin/index.html']);
    } catch (PDOException $e) {
        error_log("Reset password error: " . $e->getMessage());
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Terjadi kesalahan server']);
    }
    exit;
}
?>