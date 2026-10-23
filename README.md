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
<img width="384" height="514" alt="halaman login" src="https://github.com/user-attachments/assets/459e27c9-accf-40f1-a4a1-0c7f373f44d7" />


### 2. Halaman Login Siswa
<img width="380" height="516" alt="hal login" src="https://github.com/user-attachments/assets/46880160-c853-43c0-9da0-28c727d582bc" />


### 3. Dashboard Siswa

<img width="386" height="556" alt="akun" src="https://github.com/user-attachments/assets/10fbfaa8-227a-4e9a-9d50-653ecf5a8730" />

### 4. Detail Laporan Siswa

<img width="382" height="504" alt="Gambar ChatGPT 23 Okt 2026, 21 26 31" src="https://github.com/user-attachments/assets/0928a0ba-0781-420f-b8ea-86f739260f67" />

### 5. Daftar Laporan dan Konfirmasi Hapus

<img width="385" height="516" alt="Gambar ChatGPT 23 Okt 2026, 21 36 42" src="https://github.com/user-attachments/assets/28f46ae7-e223-436f-8528-3667eed39a73" />

### 6. Detail Laporan Petugas

<img width="384" height="508" alt="Gambar ChatGPT 23 Okt 2026, 21 36 59" src="https://github.com/user-attachments/assets/821d50db-ce8a-411b-be59-e0ad7927568a" />

## 👩‍💻 Pengembang

**Meylinda Anjuni Waruwu**  
XII PPLG 3 — SMK Negeri 1 Beringin
