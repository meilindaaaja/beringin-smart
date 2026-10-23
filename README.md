# Beringin Smart
### Sistem Informasi dan Portal Pengaduan Sarana Prasarana Sekolah

**SMK Negeri 1 Beringin**  
Kompetensi Keahlian Pengembangan Perangkat Lunak dan Gim (PPLG)

**Pengembang:** Meylinda Anjuni Waruwu — XII PPLG 3

**Teknologi:** Ionic React · TypeScript · Vite · Laravel · Laravel Sanctum · MySQL

---

## 📌 Tentang Proyek

Beringin Smart adalah aplikasi untuk membantu siswa melaporkan kendala sarana dan prasarana di lingkungan sekolah. Petugas dapat melihat laporan dan memperbarui status penanganannya, sedangkan siswa dapat memantau perkembangan laporan yang telah dikirimkan.

Proyek ini dikembangkan sebagai bagian dari pembelajaran Kompetensi Keahlian Pengembangan Perangkat Lunak dan Gim (PPLG) di SMK Negeri 1 Beringin.

## ⚡ Fitur Utama

- **Login Pengguna:** autentikasi untuk siswa dan petugas.
- **Formulir Pengaduan:** siswa dapat mengirim laporan kendala fasilitas sekolah.
- **Daftar Laporan:** menampilkan laporan sesuai alur aplikasi.
- **Pencarian Laporan:** membantu pengguna menemukan laporan.
- **Detail Laporan:** menampilkan informasi dan status penanganan laporan.
- **Pembaruan Status:** petugas dapat mengubah status laporan menjadi Sedang Diproses atau Selesai.
- **Pemantauan Laporan:** siswa dapat melihat perkembangan status laporan.
- **Tampilan Responsif:** antarmuka menggunakan tema forest green dan cream.

## 🛠️ Teknologi yang Digunakan

- Frontend: Ionic React, React, TypeScript, Vite
- Backend: Laravel
- Autentikasi API: Laravel Sanctum
- Database: MySQL
- HTTP Client: Axios

## 📁 Struktur Direktori

```text
beringin-smart/
├── Beringin-Smart/       # Frontend Ionic React
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── beringin-backend/     # Backend API Laravel
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── composer.json
├── screenshots/          # Dokumentasi tampilan aplikasi
└── README.md
```

## 🚀 Cara Menjalankan Aplikasi

### 1. Persiapan

Pastikan perangkat sudah memiliki PHP, Composer, Node.js, npm, dan MySQL. Unduh repository, lalu buka folder proyek.

### 2. Backend Laravel

Masuk ke folder backend:

```bash
cd beringin-backend
composer install
```

Buat file `.env` berdasarkan `.env.example` dan sesuaikan konfigurasi database MySQL lokal. Setelah itu jalankan:

```bash
php artisan key:generate
php artisan migrate
php artisan serve
```

Server backend secara default tersedia di `http://127.0.0.1:8000`.

### 3. Frontend Ionic React

Buka terminal baru dan masuk ke folder frontend yang berisi `package.json`. Jalankan:

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan oleh terminal Vite. Pastikan alamat API pada konfigurasi frontend sesuai dengan alamat backend yang sedang berjalan.

## 📸 Dokumentasi Screenshot

### 1. Halaman Login Petugas

![Login Petugas](screenshots/login-petugas.png)

### 2. Halaman Login Siswa

![Login Siswa](screenshots/login-siswa.png)

### 3. Dashboard Siswa

![Dashboard Siswa](screenshots/dashboard-siswa.png)

### 4. Detail Laporan Siswa

![Detail Laporan Siswa](screenshots/detail-laporan-siswa.png)

### 5. Daftar Laporan dan Konfirmasi Hapus

![Daftar Laporan dan Konfirmasi Hapus](screenshots/daftar-laporan-konfirmasi-hapus.png)

### 6. Detail Laporan Petugas

![Detail Laporan Petugas](screenshots/detail-laporan-petugas.png)

## 👩‍💻 Pengembang

**Meylinda Anjuni Waruwu**  
XII PPLG 3 — SMK Negeri 1 Beringin
