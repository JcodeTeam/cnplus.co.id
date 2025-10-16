<?php
session_start();
require_once '../api/db.php';

if (empty($_SESSION['admin_logged_in']) || empty($_SESSION['admin_id'])) {
    header('Location: ./');
    exit;
}

$stmt = $pdo->query("SELECT id, name, username, email, notify_demo FROM admin ORDER BY id ASC");
$admins = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pengaturan Admin - CNPLUS</title>
    <link rel="icon" href="../asset/logo-2.png" type="image/x-icon" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/mregister-admin.css" />
    <script src="../assets/admin.js" defer></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1" type="module"></script>
</head>

<body class="bg-zinc-50 text-zinc-900" id="app">
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-200">
        <nav class="mx-auto max-w-7xl px-4 lg:px-6 h-16 flex items-center gap-3">
            <button id="btnAside" class="p-2 rounded-lg hover:bg-zinc-100 lg:hidden">
                <i class="bx bx-menu text-2xl"></i>
            </button>
            <div class="flex items-center gap-2 shrink-0">
                <img src="../asset/logo-2.png" class="w-10">
                <span class="text-3xl font-bold text-[#028f46]">Admin Panel</span>
            </div>
            <div class="ml-auto flex items-center gap-2">
                <div class="hidden sm:flex items-center gap-2">
                    <i class="bx bx-user-circle text-2xl mt-1"></i>
                    <span class="text-sm font-medium truncate max-w-[12rem]"><?php echo htmlspecialchars($_SESSION['admin_username']); ?></span>
                </div>
                <a href="../api/logout.php"
                    class="flex items-center gap-2 h-9 border border-zinc-200 px-3 rounded-lg text-sm hover:bg-zinc-50">
                    <i class="bx bx-log-out text-lg"></i>
                    <span class="hidden sm:inline">Logout</span>
                </a>
            </div>
        </nav>
    </header>

    <div id="backdrop" class="fixed inset-0 bg-black/30 opacity-0 pointer-events-none transition-opacity duration-200 ease-out z-40 lg:hidden"></div>

    <aside id="aside" class="fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-zinc-200 w-64 lg:translate-x-0 -translate-x-full transition-all duration-300 ease-in-out flex flex-col overflow-hidden">
        <ul class="p-2 space-y-1 flex-grow">
            <li>
                <a class="aside-link flex items-center gap-3 px-3 h-10 rounded-xl hover:bg-zinc-100 text-zinc-800 font-medium" href="dashboard.php">
                    <i class="bx bxs-chalkboard text-xl"></i>
                    <span class="aside-label">Pengajuan Demo</span>
                </a>
            </li>
            <li>
                <a class="aside-link flex items-center gap-3 px-3 h-10 rounded-xl hover:bg-zinc-100 text-[#028f46] bg-[#028f46]/10 font-medium" href="settings.php">
                    <i class="bx bxs-cog text-xl"></i>
                    <span class="aside-label">Pengaturan</span>
                </a>
            </li>
        </ul>
        <div class="p-3 border-t border-zinc-200">
            <button id="btnCollapse" class="w-full h-10 flex items-center justify-between px-3 rounded-xl hover:bg-zinc-50 border border-zinc-200">
                <span data-collapse-label class="text-sm">Collapse sidebar</span>
                <i class="bx bx-chevrons-left text-2xl transition-transform duration-200 ease-linear"></i>
            </button>
        </div>
    </aside>

    <div id="page" class="pt-6 lg:pl-64 transition-all">
        <div class="mx-auto max-w-7xl px-4 lg:px-8">
            <main class="col-span-12">
                <div class="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
                    <div class="p-4 border-b border-zinc-200 flex items-center justify-between">
                        <div class="text-lg font-semibold">Pengaturan Admin</div>
                        <button id="registerDialog" class="bg-[#028f46] hover:bg-[#015c2d] text-white text-sm p-1.5 px-3 rounded-xl inline-flex items-center gap-1 transition-all duration-300 ease-out">
                            <i class="bx bx-plus text-lg mt-0.5"></i>
                            <span>Tambah Admin</span>
                        </button>
                    </div>

                    <div class="max-h-[100vh] overflow-y-auto overflow-x-auto">
                        <table id="data-table" class="w-full min-w-[900px] text-sm text-left">
                            <thead class="bg-zinc-50 text-xs uppercase text-zinc-600 sticky top-0">
                                <tr>
                                    <th class="py-3 px-4">Nama Lengkap</th>
                                    <th class="py-3 px-4">Username</th>
                                    <th class="py-3 px-4">Email</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Notifikasi Pengajuan Demo</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-zinc-200">
                                <?php foreach ($admins as $admin): ?>
                                    <tr>
                                        <td class="py-3 px-4"><?php echo htmlspecialchars($admin['name']); ?></td>
                                        <td class="py-3 px-4"><?php echo htmlspecialchars($admin['username']); ?></td>
                                        <td class="py-3 px-4"><?php echo htmlspecialchars($admin['email'] ?? '-'); ?></td>
                                        <td class="py-3 px-4">
                                            <button
                                                class="toggle-btn inline-flex items-center h-8 px-3 rounded-xl text-xs font-medium border transition-colors
                        <?php echo $admin['notify_demo'] ? 'bg-[#028f46] border-[#028f46] text-white hover:bg-[#015c2d]' : 'bg-rose-600 border-rose-700 text-white hover:bg-rose-700'; ?>"
                                                data-id="<?php echo (int)$admin['id']; ?>"
                                                data-state="<?php echo $admin['notify_demo'] ? '1' : '0'; ?>">
                                                <i class="bx <?php echo $admin['notify_demo'] ? 'bx-bell' : 'bx-bell-off'; ?> text-base mr-1.5"></i>
                                                <span><?php echo $admin['notify_demo'] ? 'Aktif' : 'Nonaktif'; ?></span>
                                            </button>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
        <?php include '../admin/register.php'; ?>
    </div>
    <script src="../assets/logout-confirm.js"></script>
</body>

</html>