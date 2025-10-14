<?php
session_start();
require_once '../api/db.php';

if (empty($_SESSION['admin_logged_in']) || empty($_SESSION['admin_id'])) {
  header('Location: ./');
  exit;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard Admin - CNPLUS</title>
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet" />
  <link
    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
    rel="stylesheet" />
  <!-- CDN jsDelivr
    <link
      href="https://cdn.jsdelivr.net/npm/boxicons @2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    /> -->
  <script type="module" crossorigin src="../assets/dashboard-CRPYBi8V.js"></script>
  <link rel="modulepreload" crossorigin href="../assets/utils-0K0NRc03.js">
  <link rel="stylesheet" crossorigin href="../assets/utils-G2Uxg8FP.css">
  <link rel="stylesheet" crossorigin href="../assets/dashboard-Bsd0-XCv.css">
</head>

<body class="inter-font dark-mode">
  <header>
    <nav>
      <i class="bx bx-menu" data-toggle="aside"></i>
      <a href="#" class="nav-link">Categories</a>
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
        <img src="" alt="" />
        <h4 class="name"><?= $_SESSION['admin_username']; ?></h4>
      </a>
      <a href="../api/logout.php" class="btn btn-danger">Logout</a>
    </nav>
  </header>

  <!-- Main Content -->
  <div class="wrapper">
    <aside>
      <div class="brand">
        <i class="bx bxs-dashboard"></i>
        <h2>Dashboard</h2>
      </div>
      <ul class="lists">
        <li class="list active" data-toggle="siblings">
          <a href="#">
            <!-- <i class="bx bxs-dashboard"></i> -->
            <i class="bx bxs-chalkboard"></i>
            <span>Pengajuan Demo</span>
          </a>
        </li>
        <li class="list" data-toggle="siblings">
          <a href="settings.php">
            <i class="bx bxs-cog"></i>
            <span>Pengaturan</span>
          </a>
        </li>
      </ul>
    </aside>

    <!-- Main -->
    <main class="main">
      <div class="content">
        <table id="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Lengkap</th>
              <th>Email</th>
              <th>Perusahaan</th>
              <th>Industri</th>
              <th>Nomor Telepon</th>
              <th>Produk</th>
              <th>Deskripsi</th>
              <th>Tanggal Pengajuan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="9" id="loading">Memuat data...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
  <!-- Main -->

</body>

</html>