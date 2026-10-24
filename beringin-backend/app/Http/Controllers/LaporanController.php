<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    // AMBIL LAPORAN
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Laporan::orderBy('created_at', 'desc');

        // Petugas melihat semua laporan.
        // Siswa hanya melihat laporan miliknya.
        if ($user->role !== 'petugas') {
            $query->where('user_id', $user->id);
        }

        return response()->json([
            'message' => 'Berhasil mengambil data laporan',
            'data' => $query->get()
        ], 200);
    }

    // TAMBAH LAPORAN
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pelapor' => 'nullable|string',
            'nama' => 'nullable|string',
            'lokasi' => 'required|string',
            'kategori' => 'required|string',
            'deskripsi' => 'required|string',
        ]);

        $namaPelapor = $validated['nama_pelapor']
            ?? $validated['nama']
            ?? 'Anonim';

        $laporan = Laporan::create([
            'user_id' => $request->user()->id,
            'nama' => $namaPelapor,
            'lokasi' => $validated['lokasi'],
            'kategori' => $validated['kategori'],
            'deskripsi' => $validated['deskripsi'],
            'status' => 'Menunggu',
        ]);

        return response()->json([
            'message' => 'Laporan berhasil dibuat',
            'data' => $laporan
        ], 201);
    }

    // UBAH STATUS DAN HASIL PENANGANAN
    // KHUSUS PETUGAS
    public function updateStatus(Request $request, $id)
    {
        if ($request->user()->role !== 'petugas') {
            return response()->json([
                'message' => 'Akses ditolak. Hanya petugas yang dapat mengubah status.'
            ], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:Menunggu,Sedang Diproses,Selesai',
            'hasil_penanganan' => 'nullable|string',
        ]);

        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'message' => 'Data laporan tidak ditemukan'
            ], 404);
        }

        $laporan->status = $validated['status'];

        if (array_key_exists('hasil_penanganan', $validated)) {
            $laporan->hasil_penanganan = $validated['hasil_penanganan'];
        }

        $laporan->save();

        return response()->json([
            'message' => 'Status dan hasil penanganan berhasil diperbarui',
            'data' => $laporan
        ], 200);
    }

    // HAPUS LAPORAN
    // Petugas boleh menghapus semua laporan.
    // Siswa hanya boleh menghapus laporan miliknya.
    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'message' => 'Data laporan tidak ditemukan'
            ], 404);
        }

        if (
            $user->role !== 'petugas'
            && (int) $laporan->user_id !== (int) $user->id
        ) {
            return response()->json([
                'message' => 'Akses ditolak. Kamu tidak dapat menghapus laporan ini.'
            ], 403);
        }

        $laporan->delete();

        return response()->json([
            'message' => 'Laporan berhasil dihapus'
        ], 200);
    }
}
