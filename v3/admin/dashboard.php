<!DOCTYPE html>
<html lang="en">
<?php
session_start();
require_once '../api/db.php';
if (empty($_SESSION['admin_logged_in']) || empty($_SESSION['admin_id'])) {
  header('Location: ./');
  exit;
  header('Location: ./');
  exit;
}
?>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard Admin - CNPLUS</title>
  <link rel="icon" href="../asset/logo-2.png" type="image/x-icon" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
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
          <span class="text-sm font-medium truncate max-w-[12rem]"><?php echo $_SESSION['admin_username']; ?></span>
        </div>
        <a href="../api/logout.php" class="flex items-center gap-2 h-9 border border-zinc-200 px-3 rounded-lg text-sm hover:bg-zinc-50">
          <i class="bx bx-log-out text-lg"></i>
          <span class="hidden sm:inline">Logout</span>
        </a>
      </div>
    </nav>
  </header>

  <div id="backdrop" class="fixed inset-0 bg-black/30 opacity-0 pointer-events-none transition-opacity duration-200 ease-out z-40 lg:hidden"></div>

  <aside id="aside"
    class="fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-zinc-200 w-64 lg:translate-x-0 -translate-x-full transition-all duration-300 ease-in-out flex flex-col overflow-hidden">
    <ul class="p-2 space-y-1 flex-grow">
      <li>
        <a class="aside-link flex items-center gap-3 px-3 h-10 rounded-xl hover:bg-zinc-100 text-[#028f46] bg-[#028f46]/10 font-medium" href="./dashboard.php">
          <i class="bx bxs-chalkboard text-xl"></i>
          <span class="aside-label">Pengajuan Demo</span>
        </a>
      </li>
      <li>
        <a class="aside-link flex items-center gap-3 px-3 h-10 rounded-xl hover:bg-zinc-100 text-zinc-800" href="./settings.php">
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
        <form id="filterBar" action="" method="get" class="w-full mb-4">
          <div class="relative flex items-center gap-2 max-w-full">
            <div class="relative flex-1 min-w-0">
              <i class="bx bx-search absolute left-3 top-3 text-zinc-400"></i>
              <input id="q" name="q" type="search" placeholder="Search..."
                class="w-full h-10 pl-10 pr-3 rounded-xl border border-zinc-200 bg-white text-sm focus:ring-2 focus:ring-[#028f46] outline-none" />
            </div>

            <button id="btnDropdown" type="button"
              class="h-10 px-3 rounded-xl border border-[#026934] text-sm bg-[#028f46] hover:bg-[#026934] text-white flex items-center gap-2 ease-in-out duration-150">
              <i class="bx bx-filter-alt"></i><span id="btnLabel">Filter</span>
            </button>

            <div id="dropdown"
              class="hidden absolute right-0 top-[calc(100%+6px)] z-50 w-full sm:w-[560px] md:w-[720px] lg:w-[880px] bg-white border border-zinc-200 rounded-xl shadow-lg">
              <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="p-3 border-b md:border-b-0 md:border-r border-zinc-200">
                  <div class="flex items-center justify-between mb-2">
                    <div class="font-semibold text-sm">Industri</div>
                    <button id="btnAllInd" type="button" class="text-xs px-2 py-1 rounded-lg border border-zinc-200 hover:bg-zinc-50">View all</button>
                  </div>
                  <div id="listInd" class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-auto"></div>
                </div>
                <div class="p-3">
                  <div class="flex items-center justify-between mb-2">
                    <div class="font-semibold text-sm">Produk/Servis</div>
                    <button id="btnAllProd" type="button" class="text-xs px-2 py-1 rounded-lg border border-zinc-200 hover:bg-zinc-50">View all</button>
                  </div>
                  <div id="listProd" class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </form>



        <div class="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div class="max-h-[100vh] overflow-y-auto overflow-x-auto">
            <table id="data-table" class="w-full min-w-[1200px] text-sm text-left">
              <thead class="bg-zinc-50 text-xs uppercase text-zinc-600 sticky top-0">
                <tr>
                  <th class="py-3 px-4 text-center overflow-hidden">No</th>
                  <th class="py-3 px-4 text-center overflow-hidden">Nama Lengkap</th>
                  <th class="py-3 px-4 text-center overflow-hidden">Email</th>
                  <th class="py-3 px-4 text-center overflow-hidden">Perusahaan</th>
                  <th class="py-3 px-4 text-center overflow-hidden">Industri</th>
                  <th class="py-3 px-4 text-center overflow-hidden">Nomor Telepon</th>
                  <th class="py-3 px-4 text-center overflow-hidden">Produk</th>
                  <th class="py-3 px-4 text-center overflow-hidden">Deskripsi</th>
                  <th class="py-3 px-4 text-center overflow-hidden whitespace-nowrap">Tanggal Pengajuan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-200"></tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
  <script src="../assets/admin.js"></script>
</body>

</html>