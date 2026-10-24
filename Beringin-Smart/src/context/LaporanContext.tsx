
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { Laporan } from '../types/Laporan';
import API from '../services/api';

interface LaporanContextType {
  laporanList: Laporan[];
  tambahLaporan: (
    laporan: Omit<Laporan, 'id' | 'tanggal' | 'status'>
  ) => Promise<void>;
  getLaporanById: (id: string) => Laporan | undefined;
  ambilLaporan: () => Promise<void>;
  ubahStatusLaporan: (
    id: string,
    statusBaru: 'Sedang Diproses' | 'Selesai',
    hasilPenanganan?: string
  ) => Promise<void>;
  hapusLaporan: (id: string) => Promise<void>;
}

export const LaporanContext = createContext<LaporanContextType>(
  {} as LaporanContextType
);

export const LaporanProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [laporanList, setLaporanList] = useState<Laporan[]>([]);

  // Ambil laporan dari database
  const ambilLaporan = useCallback(async () => {
    try {
      const response = await API.get('/laporan');
      const data = response.data.data;

      setLaporanList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Gagal mengambil laporan:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    void ambilLaporan().catch(() => {});
  }, [ambilLaporan]);

  // Tambah laporan
  const tambahLaporan = async (
    data: Omit<Laporan, 'id' | 'tanggal' | 'status'>
  ) => {
    const response = await API.post('/laporan', {
      nama: data.nama,
      lokasi: data.lokasi,
      kategori: data.kategori,
      deskripsi: data.deskripsi,
    });

    const laporanBaru = response.data.data;

    setLaporanList((prevList) => [
      laporanBaru,
      ...prevList.filter(
        (item) => String(item.id) !== String(laporanBaru.id)
      ),
    ]);
  };

  // Cari laporan berdasarkan ID
  const getLaporanById = (id: string) =>
    laporanList.find((item) => String(item.id) === String(id));

  // Ubah status laporan
  const ubahStatusLaporan = async (
    id: string,
    statusBaru: 'Sedang Diproses' | 'Selesai',
    hasilPenanganan?: string
  ) => {
    const response = await API.patch(`/laporan/${id}/status`, {
      status: statusBaru,
      hasil_penanganan: hasilPenanganan ?? '',
    });

    const laporanDiperbarui = response.data.data;

    setLaporanList((prevList) =>
      prevList.map((item) =>
        String(item.id) === String(id)
          ? { ...item, ...laporanDiperbarui }
          : item
      )
    );
  };

  // Hapus laporan dari database
  const hapusLaporan = async (id: string) => {
    await API.delete(`/laporan/${id}`);

    setLaporanList((prevList) =>
      prevList.filter((item) => String(item.id) !== String(id))
    );
  };

  return (
    <LaporanContext.Provider
      value={{
        laporanList,
        tambahLaporan,
        getLaporanById,
        ambilLaporan,
        ubahStatusLaporan,
        hapusLaporan,
      }}
    >
      {children}
    </LaporanContext.Provider>
  );
};
