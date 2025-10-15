<?php
session_start();
require_once './db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name'] ?? '');
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    if (empty($name) || empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Semua kolom harus diisi']);
        exit;
    }

    if ($confirmPassword !== $password) {
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Password tidak cocok']);
        exit;
    }

    try {
        // Cek apakah username sudah ada
        $stmt = $pdo->prepare("SELECT id FROM admin WHERE username = ?");
        $stmt->execute([$username]);

        if ($stmt->rowCount() > 0) {
            ob_clean();
            echo json_encode(['status' => 'error', 'message' => 'Username sudah terdaftar']);
            exit;
        }

        // Simpan admin baru
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO admin (name, username, email, password) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $username, $email, $hashedPassword]);

        ob_clean();
        echo json_encode(['status' => 'success', 'redirect' => 'settings.php']);
    } catch (PDOException $e) {
        error_log("Register error: " . $e->getMessage());
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Terjadi kesalahan server']);
    }
    exit;
}
