
import React, { useState, useContext } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonToast,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonList,
  IonChip,
  IonSearchbar,
  IonAlert,
} from '@ionic/react';

import {
  documentTextOutline,
  sendOutline,
  businessOutline,
  personOutline,
  locationOutline,
  listOutline,
  statsChartOutline,
  checkmarkCircleOutline,
  timeOutline,
  chevronForwardOutline,
  logOutOutline,
  leafOutline,
  trashOutline,
  mailOutline,
} from 'ionicons/icons';

import { useIonRouter } from '@ionic/react';
import { LaporanContext } from '../context/LaporanContext';

const GREEN = '#193D32';
const DEEP_GREEN = '#315A45';
const CREAM = '#F7F2E8';
const SAGE = '#DCE5D7';
const TEXT = '#26372F';

const formatTanggal = (value: unknown): string => {
  if (typeof value !== 'string' || !value) {
    return 'Tanggal tidak tersedia';
  }

  const tanggal = new Date(value);

  if (Number.isNaN(tanggal.getTime())) {
    return 'Tanggal tidak tersedia';
  }

  return tanggal.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const Home: React.FC = () => {
  const router = useIonRouter();

  const { laporanList, tambahLaporan, hapusLaporan } =
    useContext(LaporanContext);

  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [kategori, setKategori] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [kataCari, setKataCari] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pesanToast, setPesanToast] = useState('');
  const [laporanHapusId, setLaporanHapusId] =
    useState<string | null>(null);

  let akun: {
    nama?: string;
    name?: string;
    email?: string;
    role?: string;
  } = {};

  try {
    const dataAkun = localStorage.getItem('user');
    if (dataAkun) {
      akun = JSON.parse(dataAkun);
    }
  } catch {
    akun = {};
  }

  const role = localStorage.getItem('role') || akun.role || '';
  const namaAkun = akun.nama || akun.name || 'Pengguna Beringin Smart';
  const emailAkun = akun.email || 'Email tidak tersedia';

  const totalLaporan = laporanList.length;

  const laporanSelesai = laporanList.filter(
    (item) => item.status === 'Selesai'
  ).length;

  const laporanPending = totalLaporan - laporanSelesai;

  const laporanTerfilter = laporanList.filter((item) => {
    const kata = kataCari.trim().toLowerCase();

    if (!kata) return true;

    return [
      item.nama,
      item.lokasi,
      item.kategori,
      item.deskripsi,
      item.status,
    ].some((nilai) =>
      String(nilai || '').toLowerCase().includes(kata)
    );
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    router.push('/login', 'root', 'replace');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !nama.trim() ||
      !lokasi.trim() ||
      !kategori ||
      !deskripsi.trim()
    ) {
      setErrorMessage('Mohon isi seluruh form pengaduan!');
      return;
    }

    try {
      await tambahLaporan({
        nama: nama.trim(),
        lokasi: lokasi.trim(),
        kategori,
        deskripsi: deskripsi.trim(),
      });

      setNama('');
      setLokasi('');
      setKategori('');
      setDeskripsi('');
      setPesanToast('Laporan berhasil dikirim!');
      setShowToast(true);
    } catch {
      setErrorMessage('Laporan gagal dikirim. Silakan coba kembali.');
    }
  };

  const konfirmasiHapus = async () => {
    if (!laporanHapusId) return;

    try {
      await hapusLaporan(laporanHapusId);
      setPesanToast('Laporan berhasil dihapus.');
      setShowToast(true);
    } catch {
      setErrorMessage(
        'Laporan gagal dihapus. Periksa koneksi atau hak akses akun.'
      );
    } finally {
      setLaporanHapusId(null);
    }
  };

  const cardStyle: React.CSSProperties = {
    margin: 0,
    marginBottom: 14,
    borderRadius: 18,
    background: '#FFFEFA',
    boxShadow: '0 8px 28px rgba(25,61,50,0.06)',
    border: '1px solid #E8E5D9',
    overflow: 'hidden',
  };

  const inputStyle = {
    '--background': '#FFFEFA',
    '--border-color': '#D6DED4',
    '--highlight-color-focused': GREEN,
    '--border-radius': '12px',
    color: TEXT,
    marginBottom: '16px',
  } as React.CSSProperties;

  return (
    <IonPage className="home-page">
      <style>{`
        .home-page {
          --background: ${CREAM};
          color: ${TEXT};
        }

        .home-page .section-heading {
          color: ${GREEN};
          font-weight: 800;
          letter-spacing: -.4px;
        }

        .home-page .form-label {
          color: ${GREEN};
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 9px;
          display: block;
        }

        .home-page .stat-card,
        .home-page .report-card {
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .home-page .stat-card:hover,
        .home-page .report-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(25,61,50,.10);
        }

        @media (max-width: 576px) {
          .home-page .welcome-title {
            font-size: 27px !important;
          }

          .home-page .welcome-panel {
            padding: 23px !important;
          }
        }
      `}</style>

      <IonHeader className="ion-no-border">
        <IonToolbar
          style={{
            '--background': GREEN,
            '--color': '#FFFFFF',
            '--min-height': '76px',
            '--padding-start': '8px',
            '--padding-end': '8px',
          } as React.CSSProperties}
        >
          <IonTitle style={{ paddingInline: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'rgba(220,229,215,.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(220,229,215,.22)',
                }}
              >
                <IonIcon
                  icon={leafOutline}
                  style={{ fontSize: 23, color: SAGE }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    letterSpacing: 1,
                  }}
                >
                  BERINGIN SMART
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: SAGE,
                    marginTop: 4,
                    letterSpacing: '.4px',
                  }}
                >
                  SISTEM PENGADUAN SARPRAS
                </div>
              </div>
            </div>
          </IonTitle>

          <IonButton
            slot="end"
            fill="outline"
            onClick={handleLogout}
            style={{
              '--color': '#FFFFFF',
              '--border-color': '#A8C1B0',
              '--border-radius': '10px',
              fontSize: 12,
              marginInline: 5,
            } as React.CSSProperties}
          >
            <IonIcon icon={logOutOutline} slot="start" />
            Keluar
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid fixed>
          {/* PROFIL AKUN */}
          <IonRow>
            <IonCol size="12">
              <IonCard style={{ ...cardStyle, marginTop: 12 }}>
                <IonCardContent
                  style={{
                    padding: 18,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      flexShrink: 0,
                      borderRadius: 17,
                      background: SAGE,
                      color: GREEN,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 27,
                    }}
                  >
                    <IonIcon icon={personOutline} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: DEEP_GREEN,
                        letterSpacing: 1,
                      }}
                    >
                      PROFIL AKUN
                    </div>

                    <h2
                      style={{
                        margin: '5px 0',
                        color: GREEN,
                        fontSize: 17,
                        fontWeight: 800,
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {namaAkun}
                    </h2>

                    <div
                      style={{
                        color: '#718074',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        overflowWrap: 'anywhere',
                      }}
                    >
                      <IonIcon icon={mailOutline} />
                      {emailAkun}
                    </div>
                  </div>

                  <IonBadge
                    style={{
                      '--background': SAGE,
                      '--color': GREEN,
                      padding: '8px 10px',
                      borderRadius: 8,
                      textTransform: 'capitalize',
                    } as React.CSSProperties}
                  >
                    {role || 'Pengguna'}
                  </IonBadge>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* SAMBUTAN */}
          <IonRow>
            <IonCol size="12">
              <div
                className="welcome-panel"
                style={{
                  marginBottom: 24,
                  padding: 30,
                  borderRadius: 22,
                  color: '#FFFFFF',
                  background: `linear-gradient(120deg, ${GREEN}, ${DEEP_GREEN})`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: -25,
                    top: -45,
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,.12)',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    right: 35,
                    top: 45,
                    fontSize: 75,
                    color: 'rgba(220,229,215,.10)',
                  }}
                >
                  <IonIcon icon={leafOutline} />
                </div>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 600 }}>
                  <div
                    style={{
                      color: SAGE,
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 2,
                      marginBottom: 12,
                    }}
                  >
                    DASHBOARD PENGADUAN
                  </div>

                  <h1
                    className="welcome-title"
                    style={{
                      fontSize: 35,
                      lineHeight: 1.2,
                      fontWeight: 800,
                      margin: '0 0 12px',
                    }}
                  >
                    Pusat Pengaduan
                  </h1>

                  <p
                    style={{
                      margin: 0,
                      maxWidth: 460,
                      fontSize: 14,
                      lineHeight: 1.8,
                      color: '#E2EAE1',
                    }}
                  >
                    Sampaikan kendala fasilitas sekolah dan pantau
                    perkembangan laporanmu dengan mudah.
                  </p>

                  <div
                    style={{
                      marginTop: 21,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'rgba(255,255,255,.12)',
                      borderRadius: 9,
                      padding: '9px 13px',
                      fontSize: 12,
                    }}
                  >
                    <IonIcon icon={checkmarkCircleOutline} />
                    Bersama menciptakan sekolah yang lebih baik
                  </div>
                </div>
              </div>
            </IonCol>
          </IonRow>

          {/* STATISTIK */}
          <IonRow>
            {[
              {
                judul: 'TOTAL LAPORAN',
                angka: totalLaporan,
                keterangan: 'Semua laporan',
                ikon: statsChartOutline,
                warna: GREEN,
                latar: SAGE,
              },
              {
                judul: 'BELUM SELESAI',
                angka: laporanPending,
                keterangan: 'Menunggu tindak lanjut',
                ikon: timeOutline,
                warna: '#926B2D',
                latar: '#F4E9D4',
              },
              {
                judul: 'LAPORAN SELESAI',
                angka: laporanSelesai,
                keterangan: 'Sudah ditindaklanjuti',
                ikon: checkmarkCircleOutline,
                warna: DEEP_GREEN,
                latar: SAGE,
              },
            ].map((stat) => (
              <IonCol size="12" sizeMd="4" key={stat.judul}>
                <IonCard
                  className="stat-card"
                  style={{
                    ...cardStyle,
                    borderTop: `4px solid ${stat.warna}`,
                  }}
                >
                  <IonCardContent style={{ padding: '22px 19px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            color: '#788278',
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: '.8px',
                          }}
                        >
                          {stat.judul}
                        </div>

                        <div
                          style={{
                            fontSize: 32,
                            fontWeight: 800,
                            color: GREEN,
                            marginTop: 9,
                          }}
                        >
                          {stat.angka}
                        </div>

                        <div
                          style={{
                            color: '#7A867B',
                            fontSize: 11,
                            marginTop: 5,
                          }}
                        >
                          {stat.keterangan}
                        </div>
                      </div>

                      <div
                        style={{
                          width: 53,
                          height: 53,
                          borderRadius: 16,
                          background: stat.latar,
                          color: stat.warna,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 25,
                        }}
                      >
                        <IonIcon icon={stat.ikon} />
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>

          <IonRow style={{ marginTop: 26 }}>
            {/* FORM PENGADUAN */}
            <IonCol size="12" sizeLg="5">
              <IonCard style={cardStyle}>
                <IonCardHeader style={{ padding: '24px 22px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 43,
                        height: 43,
                        borderRadius: 13,
                        background: SAGE,
                        color: GREEN,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 22,
                      }}
                    >
                      <IonIcon icon={documentTextOutline} />
                    </div>

                    <div>
                      <div
                        style={{
                          color: DEEP_GREEN,
                          fontWeight: 800,
                          fontSize: 10,
                          letterSpacing: 1,
                        }}
                      >
                        FORM PENGADUAN
                      </div>

                      <IonCardTitle
                        className="section-heading"
                        style={{ fontSize: 19, marginTop: 5 }}
                      >
                        Buat Laporan Baru
                      </IonCardTitle>
                    </div>
                  </div>
                </IonCardHeader>

                <IonCardContent style={{ padding: '16px 22px 24px' }}>
                  <form onSubmit={handleSubmit}>
                    <label className="form-label">Nama Pelapor</label>
                    <IonInput
                      fill="outline"
                      placeholder="Masukkan nama lengkap"
                      value={nama}
                      onIonInput={(e) => setNama(e.detail.value ?? '')}
                      style={inputStyle}
                    >
                      <IonIcon slot="start" icon={personOutline} />
                    </IonInput>

                    <label className="form-label">Lokasi / Ruangan</label>
                    <IonInput
                      fill="outline"
                      placeholder="Contoh: Lab PPLG 1"
                      value={lokasi}
                      onIonInput={(e) => setLokasi(e.detail.value ?? '')}
                      style={inputStyle}
                    >
                      <IonIcon slot="start" icon={locationOutline} />
                    </IonInput>

                    <label className="form-label">Kategori Laporan</label>
                    <IonSelect
                      fill="outline"
                      value={kategori}
                      placeholder="Pilih kategori"
                      onIonChange={(e) => setKategori(e.detail.value ?? '')}
                      style={inputStyle}
                    >
                      <IonIcon slot="start" icon={listOutline} />
                      <IonSelectOption value="Fasilitas Kelas">
                        Fasilitas Kelas
                      </IonSelectOption>
                      <IonSelectOption value="Laboratorium">
                        Laboratorium
                      </IonSelectOption>
                      <IonSelectOption value="Lingkungan/Taman">
                        Lingkungan/Taman
                      </IonSelectOption>
                    </IonSelect>

                    <label className="form-label">Deskripsi Masalah</label>
                    <IonTextarea
                      fill="outline"
                      rows={4}
                      placeholder="Jelaskan kendala yang ditemukan..."
                      value={deskripsi}
                      onIonInput={(e) => setDeskripsi(e.detail.value ?? '')}
                      style={inputStyle}
                    />

                    <IonButton
                      expand="block"
                      type="submit"
                      style={{
                        '--background': GREEN,
                        '--background-hover': DEEP_GREEN,
                        '--border-radius': '12px',
                        height: 49,
                        fontWeight: 750,
                        marginTop: 6,
                        textTransform: 'none',
                      } as React.CSSProperties}
                    >
                      <IonIcon slot="start" icon={sendOutline} />
                      Kirim Laporan
                    </IonButton>

                    <p
                      style={{
                        fontSize: 11,
                        color: '#829083',
                        textAlign: 'center',
                        lineHeight: 1.6,
                        margin: '15px 0 0',
                      }}
                    >
                      Pastikan informasi laporan sudah benar sebelum dikirim.
                    </p>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* DAFTAR LAPORAN */}
            <IonCol size="12" sizeLg="7">
              <div style={{ margin: '5px 2px 17px' }}>
                <h2 className="section-heading" style={{ fontSize: 23, margin: 0 }}>
                  Daftar Laporan
                </h2>

                <p
                  style={{
                    margin: '7px 0 12px',
                    color: '#748075',
                    fontSize: 12,
                  }}
                >
                  Cari laporan dan pantau perkembangan pengaduan sekolah.
                </p>

                <IonSearchbar
                  value={kataCari}
                  onIonInput={(e) => setKataCari(e.detail.value ?? '')}
                  placeholder="Cari nama, lokasi, kategori..."
                  debounce={150}
                  style={{
                    '--background': CREAM,
                    '--color': TEXT,
                    '--placeholder-color': '#849084',
                    '--icon-color': DEEP_GREEN,
                    '--border-radius': '12px',
                    '--box-shadow': '0 3px 12px rgba(25,61,50,.05)',
                    padding: 0,
                  } as React.CSSProperties}
                />
              </div>

              <IonList style={{ background: 'transparent', padding: 0 }}>
                {laporanTerfilter.length === 0 ? (
                  <IonCard style={cardStyle}>
                    <IonCardContent
                      style={{ textAlign: 'center', padding: '38px 20px' }}
                    >
                      <IonIcon
                        icon={documentTextOutline}
                        style={{ fontSize: 40, color: DEEP_GREEN }}
                      />

                      <h3 style={{ color: GREEN, fontWeight: 800 }}>
                        {kataCari
                          ? 'Laporan Tidak Ditemukan'
                          : 'Belum Ada Laporan'}
                      </h3>

                      <p style={{ color: '#748075', fontSize: 13 }}>
                        {kataCari
                          ? 'Coba gunakan kata pencarian yang berbeda.'
                          : 'Laporan yang dikirim akan muncul di bagian ini.'}
                      </p>
                    </IonCardContent>
                  </IonCard>
                ) : (
                  laporanTerfilter.map((item) => {
                    const dataTanggal = (
                      item as typeof item & { created_at?: string | null }
                    ).created_at;

                    const warnaStatus =
                      item.status === 'Selesai'
                        ? 'success'
                        : item.status === 'Sedang Diproses'
                          ? 'warning'
                          : 'medium';

                    return (
                      <IonCard
                        key={item.id}
                        className="report-card"
                        style={{ ...cardStyle, cursor: 'pointer' }}
                        button
                        onClick={() => router.push(`/detail/${item.id}`)}
                      >
                        <IonCardContent style={{ padding: 19 }}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              gap: 12,
                            }}
                          >
                            <div style={{ minWidth: 0 }}>
                              <IonBadge
                                style={{
                                  '--background': SAGE,
                                  '--color': GREEN,
                                  fontWeight: 700,
                                  padding: '7px 9px',
                                  borderRadius: 7,
                                } as React.CSSProperties}
                              >
                                <IonIcon
                                  icon={businessOutline}
                                  style={{ marginRight: 5, verticalAlign: 'middle' }}
                                />
                                {item.kategori}
                              </IonBadge>

                              <h3
                                style={{
                                  margin: '12px 0 6px',
                                  fontWeight: 800,
                                  color: GREEN,
                                  fontSize: 17,
                                  overflowWrap: 'anywhere',
                                }}
                              >
                                {item.lokasi}
                              </h3>
                            </div>

                            <IonBadge
                              color={warnaStatus}
                              style={{
                                padding: '7px 9px',
                                borderRadius: 7,
                                flexShrink: 0,
                                whiteSpace: 'normal',
                                textAlign: 'center',
                                maxWidth: 130,
                              }}
                            >
                              {item.status}
                            </IonBadge>
                          </div>

                          <p
                            style={{
                              color: '#69776C',
                              fontSize: 13,
                              lineHeight: 1.7,
                              margin: '6px 0 17px',
                              whiteSpace: 'pre-wrap',
                              overflowWrap: 'anywhere',
                            }}
                          >
                            {item.deskripsi}
                          </p>

                          {item.hasil_penanganan && (
                            <div
                              style={{
                                background: '#F0F5EC',
                                borderRadius: 10,
                                padding: 12,
                                marginBottom: 15,
                                color: DEEP_GREEN,
                                fontSize: 12,
                                lineHeight: 1.7,
                              }}
                            >
                              <strong>Tanggapan petugas:</strong>
                              <div>{item.hasil_penanganan}</div>
                            </div>
                          )}

                          <div
                            style={{
                              borderTop: '1px solid #EAEDE5',
                              paddingTop: 14,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: 12,
                              flexWrap: 'wrap',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                                fontSize: 12,
                                color: '#748075',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 7,
                                }}
                              >
                                <IonIcon icon={personOutline} />
                                Pelapor:{' '}
                                <strong style={{ color: TEXT }}>
                                  {item.nama || 'Tidak diketahui'}
                                </strong>
                              </div>

                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 7,
                                }}
                              >
                                <IonIcon icon={timeOutline} />
                                {formatTanggal(dataTanggal || item.tanggal)}
                              </div>
                            </div>

                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                flexWrap: 'wrap',
                              }}
                            >
                              <IonButton
                                fill="clear"
                                color="danger"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLaporanHapusId(String(item.id));
                                }}
                                style={{ margin: 0, fontSize: 11 }}
                              >
                                <IonIcon icon={trashOutline} slot="start" />
                                Hapus
                              </IonButton>

                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 4,
                                  color: DEEP_GREEN,
                                  fontWeight: 800,
                                  fontSize: 12,
                                }}
                              >
                                Detail
                                <IonIcon icon={chevronForwardOutline} />
                              </div>
                            </div>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    );
                  })
                )}
              </IonList>

              <IonChip
                style={{
                  '--background': SAGE,
                  '--color': GREEN,
                  fontWeight: 800,
                  fontSize: 11,
                  borderRadius: 9,
                } as React.CSSProperties}
              >
                {laporanTerfilter.length} Laporan Ditampilkan
              </IonChip>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <p
                style={{
                  textAlign: 'center',
                  color: '#879187',
                  fontSize: 11,
                  padding: '20px 0 8px',
                }}
              >
                Beringin Smart · Bersama menciptakan sekolah yang lebih baik
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonAlert
          isOpen={laporanHapusId !== null}
          header="Hapus Laporan?"
          message="Laporan yang dihapus tidak dapat dikembalikan. Yakin ingin melanjutkan?"
          buttons={[
            {
              text: 'Batal',
              role: 'cancel',
              handler: () => setLaporanHapusId(null),
            },
            {
              text: 'Ya, Hapus',
              role: 'destructive',
              handler: () => {
                void konfirmasiHapus();
              },
            },
          ]}
          onDidDismiss={() => setLaporanHapusId(null)}
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={pesanToast}
          duration={2500}
          color="success"
          icon={checkmarkCircleOutline}
        />

        <IonToast
          isOpen={!!errorMessage}
          onDidDismiss={() => setErrorMessage('')}
          message={errorMessage}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
