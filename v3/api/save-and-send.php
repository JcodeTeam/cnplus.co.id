<?php
// Header untuk CORS & JSON response
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

require_once './db.php'; // Pastikan path benar

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Ambil data dari request
$data = json_decode(file_get_contents('php://input'), true);

// Validasi input
$fullname = filter_var($data['fullname'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$company = filter_var($data['company'] ?? '', FILTER_SANITIZE_STRING);
$industry = filter_var($data['industry'] ?? '', FILTER_SANITIZE_STRING);
$phone = filter_var($data['phone'] ?? '', FILTER_SANITIZE_STRING);
$product = filter_var($data['product'] ?? '', FILTER_SANITIZE_STRING);
$description = filter_var($data['description'] ?? '', FILTER_SANITIZE_STRING);

if (!$fullname || !$email || !$company || !$industry || !$phone || !$product || !$description) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Semua field harus diisi dengan benar"]);
    exit;
}

try {
    // Simpan ke database
    $stmt = $pdo->prepare("
        INSERT INTO demo_requests 
        (fullname, email, company, industry, phone, product, description) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$fullname, $email, $company, $industry, $phone, $product, $description]);

    // Kirim email setelah simpan
    $to = $email;
    $subject = 'Terima Kasih Telah Mengajukan Demo - CNPLUS';

    $message = '
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Halo ' . htmlspecialchars($fullname) . ',</h2>

        <p>Terima kasih telah mengisi form demo di website kami!</p>

        <p>Kami ingin mengundang Anda untuk meeting singkat, agar kami dapat membahas lebih detail tentang produk/servis kami dan bagaimana kami bisa mendukung kebutuhan spesifik perusahaan Anda.</p>

        <p><strong>Klik link di bawah ini untuk langsung menghubungi kami:</strong><br>
        <a href="https://www.instagram.com/cnpluscomputercenter " target="_blank" style="color: #007BFF; text-decoration: none;">Jadwalkan Meeting Sekarang</a></p>

        <p>Terima kasih atas waktu dan minat Anda!</p>

        <br>
        <p>Salam hangat,</p>
        <p><strong>CNPLUS</strong></p>
    </body>
    </html>
    ';

    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=utf-8',
        'From: CNPLUS <no-reply@cnplus.co.id>',
        'Reply-To: Sales Team <sales@cnplus.co.id>'
    ];

    $mailSent = mail($to, $subject, $message, implode("\r\n", $headers));

    $adminQuery = $pdo->query("SELECT name, email FROM admin WHERE notify_demo = 1 AND email IS NOT NULL");
    $admins = $adminQuery->fetchAll(PDO::FETCH_ASSOC);

    foreach ($admins as $admin) {
        $adminBody = "
        <html><body>
            <h3>Permintaan Demo Baru:</h3>
            <ul>
                <li><b>Nama:</b> {$fullname}</li>
                <li><b>Email:</b> {$email}</li>
                <li><b>Perusahaan:</b> {$company}</li>
                <li><b>Industri:</b> {$industry}</li>
                <li><b>Telepon:</b> {$phone}</li>
                <li><b>Produk:</b> {$product}</li>
                <li><b>Deskripsi:</b> {$description}</li>
            </ul>
        </body></html>";

        mail($admin['email'], "Request Demo Baru dari {$fullname}", $adminBody, implode("\r\n", $headers));
    }

    if ($mailSent) {
        echo json_encode([
            "status" => "success",
            "message" => "Data berhasil disimpan dan email telah dikirim"
        ]);
    } else {
        echo json_encode([
            "status" => "warning",
            "message" => "Data berhasil disimpan, tapi gagal mengirim email"
        ]);
    }

} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Terjadi kesalahan server"]);
}