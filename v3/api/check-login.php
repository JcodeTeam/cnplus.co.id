<?php
session_start();

if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode(['logged_in' => false]);
    exit;
}

echo json_encode(['logged_in' => true]);