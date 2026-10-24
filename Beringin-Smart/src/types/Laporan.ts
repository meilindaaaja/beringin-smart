
export interface Laporan {
  id: string;
  nama: string;
  lokasi: string;
  kategori: string;
  deskripsi: string;
  tanggal: string;
  status: 'Menunggu' | 'Sedang Diproses' | 'Selesai';
  hasil_penanganan?: string | null;
}
