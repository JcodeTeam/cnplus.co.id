<?php
session_start();
require_once '../api/db.php';

if (empty($_SESSION['admin_logged_in']) || empty($_SESSION['admin_id'])) {
    header('Location: ./');
    exit;
}

// Ambil semua admin
$stmt = $pdo->query("SELECT id, name, username, email, notify_demo FROM admin ORDER BY id ASC");
$admins = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pengaturan Admin - CNPLUS</title>

    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@100..900&family=Poppins:wght@100;300;400;500;600;700;900&display=swap" rel="stylesheet" />
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />

    <link rel="modulepreload" crossorigin href="../assets/utils-0K0NRc03.js">
    <link rel="stylesheet" crossorigin href="../assets/utils-G2Uxg8FP.css" />
    <link rel="stylesheet" crossorigin href="../assets/dashboard-Bsd0-XCv.css" />

    <style>
        #data-table th,
        #data-table td {
            text-align: left !important;
            padding: 8px 12px;
        }

        .toggle-btn {
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
            color: #fff;
            font-weight: 500;
        }

        .on {
            background-color: #28a745;
        }

        .off {
            background-color: #dc3545;
        }
    </style>
</head>

<body class="inter-font dark-mode">
    <header>
        <nav>
            <i class="bx bx-menu" data-toggle="aside"></i>
            <a href="#" class="nav-link">Settings</a>
            <form action="#" class="form-search">
                <input type="search" placeholder="Search..." />
                <button type="submit" class="search-btn">
                    <i class="bx bx-search"></i>
                </button>
            </form>
            <a href="#" class="notification">
                <i class="bx bxs-bell"></i>
                <span class="num">8</span>
            </a>
            <a href="#">
                <h4 class="name"><?= htmlspecialchars($_SESSION['admin_username']); ?></h4>
            </a>
            <a href="../api/logout.php" class="btn btn-danger">Logout</a>
        </nav>
    </header>

    <div class="wrapper">
        <aside>
            <div class="brand">
                <i class="bx bxs-dashboard"></i>
                <h2>Dashboard</h2>
            </div>
            <ul class="lists">
                <li class="list">
                    <a href="dashboard.php">
                        <i class="bx bxs-chalkboard"></i>
                        <span>Pengajuan Demo</span>
                    </a>
                </li>
                <li class="list active">
                    <a href="settings.php">
                        <i class="bx bxs-cog"></i>
                        <span>Pengaturan</span>
                    </a>
                </li>
            </ul>
        </aside>

        <main class="main">
            <div class="content">
                <table id="data-table">
                    <thead>
                        <tr>
                            <th>Nama Lengkap</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Notifikasi Pengajuan Demo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($admins as $admin): ?>
                            <tr>
                                <td><?= htmlspecialchars($admin['name']) ?></td>
                                <td><?= htmlspecialchars($admin['username']) ?></td>
                                <td><?= htmlspecialchars($admin['email'] ?? '-') ?></td>
                                <td>
                                    <span class="toggle-btn <?= $admin['notify_demo'] ? 'on' : 'off' ?>" 
                                          data-id="<?= $admin['id'] ?>">
                                          <?= $admin['notify_demo'] ? 'Aktif' : 'Nonaktif' ?>
                                    </span>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </main>
    </div>

    <script>
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                const current = btn.classList.contains('on') ? 1 : 0;
                const newValue = current ? 0 : 1;

                const formData = new FormData();
                formData.append('id', id);
                formData.append('notify_demo', newValue);

                const res = await fetch('../api/update_notify.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await res.json();
                if (data.success) {
                    btn.textContent = newValue ? 'Aktif' : 'Nonaktif';
                    btn.classList.toggle('on', newValue === 1);
                    btn.classList.toggle('off', newValue === 0);
                } else {
                    alert('Gagal memperbarui status!');
                }
            });
        });
    </script>
</body>
</html>
