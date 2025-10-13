<?php
// db.php - File koneksi, auto-create database & tabel

$host = "localhost";
$dbusername = "cnplusco_admin";
$dbpassword = "cn+db.admin";
$dbname = "cnplusco_admin"; // Database utama

try {
    // Koneksi awal tanpa memilih database
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Cek apakah database sudah ada
    $stmt = $pdo->prepare("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?");
    $stmt->execute([$dbname]);

    if ($stmt->rowCount() === 0) {
        // Database belum ada → buat baru
        $pdo->exec("CREATE DATABASE `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    }

    // Sekarang connect ke database yang sudah ada
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Membuat tabel demo_requests jika belum ada
    $tableExists = $pdo->query("SHOW TABLES LIKE 'demo_requests'")->rowCount();
    if (!$tableExists) {
        $pdo->exec("
            CREATE TABLE demo_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                company VARCHAR(255) NOT NULL,
                industry VARCHAR(50) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                product VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    }

    // Membuat tabel admin jika belum ada
    $tableExists = $pdo->query("SHOW TABLES LIKE 'admin'")->rowCount();
    if (!$tableExists) {
        $pdo->exec("
            CREATE TABLE admin (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    }

    // Return $pdo agar bisa digunakan di file lain
    return $pdo;

} catch (PDOException $e) {
    die("Database error: " . $e->getMessage());
}