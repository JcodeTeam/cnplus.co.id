<?php
session_start();

require_once './db.php'; // Mengambil koneksi $pdo

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Username dan password harus diisi']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM admin WHERE username = ?");
        $stmt->execute([$username]);
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin && password_verify($password, $admin['password'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $admin['id'];     
            $_SESSION['admin_username'] = $admin['username'];
            ob_clean();
            echo json_encode(['status' => 'success', 'redirect' => 'dashboard.php']);
        } else {
            ob_clean();
            echo json_encode(['status' => 'error', 'message' => 'Username atau password salah']);
        }
    } catch (PDOException $e) {
        error_log("Login error: " . $e->getMessage());
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Terjadi kesalahan server']);
    }

    exit;
}
