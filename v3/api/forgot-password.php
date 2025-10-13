<?php
session_start();
require_once './db.php'; // Sesuaikan path sesuai struktur folder

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';

    if (empty($username)) {
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Username harus diisi']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT id FROM admin WHERE username = ?");
        $stmt->execute([$username]);

        if ($stmt->rowCount() === 0) {
            ob_clean();
            echo json_encode(['status' => 'error', 'message' => 'Username tidak ditemukan']);
            exit;
        }

        // Simpan username sementara di session untuk reset password
        $_SESSION['reset_username'] = $username;

        ob_clean();
        echo json_encode([
            'status' => 'success',
            'username' => $username,
            'redirect' => 'reset-password.html'
        ]);
    } catch (PDOException $e) {
        error_log("Forgot password error: " . $e->getMessage());
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Terjadi kesalahan server']);
    }
    exit;
}
?>