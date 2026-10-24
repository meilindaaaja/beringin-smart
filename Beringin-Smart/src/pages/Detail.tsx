
import React, { useContext, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonButton,
  IonIcon,
  IonToast,
  IonTextarea,
} from '@ionic/react';
import {
  checkmarkCircleOutline,
  timeOutline,
  personOutline,
  calendarOutline,
  documentTextOutline,
  locationOutline,
  leafOutline,
  arrowForwardOutline,
  saveOutline,
} from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { LaporanContext } from '../context/LaporanContext';

type LaporanDenganTanggal = {
  created_at?: string | null;
  tanggal?: string | null;
};

const formatTanggal = (value: unknown): string => {
  if (typeof value !== 'string' || !value.trim()) {
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

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getLaporanById, ubahStatusLaporan } =
    useContext(LaporanContext);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [hasilPenanganan, setHasilPenanganan] = useState('');
  const [menyimpan, setMenyimpan] = useState(false);

  const laporan = getLaporanById(id || '');
  const role = localStorage.getItem('role');
  const isPetugas = role === 'petugas';

  const dataTanggal = laporan as
    | (NonNullable<typeof laporan> & LaporanDenganTanggal)
    | null
    | undefined;

  const tanggalMasuk = formatTanggal(
    dataTanggal?.created_at ?? dataTanggal?.tanggal
  );

  // Ikuti hasil terbaru dari context, tanpa refresh halaman.
  React.useEffect(() => {
    setHasilPenanganan(laporan?.hasil_penanganan ?? '');
  }, [laporan?.id, laporan?.hasil_penanganan]);

  const simpanPenanganan = async (
    statusBaru: 'Sedang Diproses' | 'Selesai'
  ) => {
    if (!laporan || !isPetugas || menyimpan) return;

    setMenyimpan(true);

    try {
      await ubahStatusLaporan(
        laporan.id,
        statusBaru,
        hasilPenanganan.trim()
      );

      setToastMessage('Hasil penanganan dan status berhasil disimpan!');
      setShowToast(true);
    } catch {
      setToastMessage('Gagal menyimpan. Periksa koneksi dan coba lagi.');
      setShowToast(true);
    } finally {
      setMenyimpan(false);
    }
  };

  const warnaStatus =
    laporan?.status === 'Selesai'
      ? 'success'
      : laporan?.status === 'Sedang Diproses'
      ? 'primary'
      : 'warning';

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar
          style={{
            '--background': '#193D32',
            '--color': '#F7F2E8',
            '--border-width': '0',
            padding: '4px 8px',
          } as React.CSSProperties}
        >
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/home"
              text="Kembali"
              style={{ '--color': '#F7F2E8' } as React.CSSProperties}
            />
          </IonButtons>
          <IonTitle style={{ fontWeight: 700, fontSize: '18px' }}>
            Detail Laporan
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        style={{ '--background': '#F7F2E8' } as React.CSSProperties}
      >
        <style>{`
          .detail-wrapper {
            max-width: 680px;
            margin: 0 auto;
            padding: 22px 16px 36px;
          }
          .detail-hero {
            background: linear-gradient(135deg, #193D32, #315A45);
            color: #F7F2E8;
            padding: 24px 22px;
            border-radius: 22px;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 8px 22px rgba(25, 61, 50, 0.16);
          }
          .detail-hero::after {
            content: "";
            position: absolute;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            right: -40px;
            top: -55px;
            background: rgba(247, 242, 232, 0.08);
          }
          .detail-card {
            margin: 0;
            border-radius: 22px;
            background: #FFFFFF;
            box-shadow: 0 6px 24px rgba(38, 55, 47, 0.07);
            overflow: hidden;
          }
          .detail-info-row {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 13px 0;
          }
          .detail-info-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            border-radius: 13px;
            background: #DCE5D7;
            color: #193D32;
            font-size: 20px;
          }
          .detail-description {
            background: #F7F2E8;
            color: #26372F;
            border-radius: 15px;
            padding: 16px;
            line-height: 1.7;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
            margin: 0;
          }
          .detail-action {
            --border-radius: 14px;
            --box-shadow: none;
            font-weight: 700;
            height: 50px;
            margin-top: 12px;
          }
          .detail-label {
            font-size: 12px;
            color: #718078;
            margin-bottom: 5px;
          }
          .detail-value {
            color: #26372F;
            font-weight: 600;
            font-size: 14px;
            overflow-wrap: anywhere;
          }
        `}</style>

        {laporan ? (
          <div className="detail-wrapper">
            <div className="detail-hero">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <IonIcon icon={leafOutline} style={{ fontSize: 23 }} />
                <span style={{ fontSize: 12, letterSpacing: 1.2 }}>
                  BERINGIN SMART
                </span>
              </div>

              <div style={{ fontSize: 13, opacity: 0.8 }}>
                Rincian pengaduan
              </div>

              <h1
                style={{
                  fontSize: 25,
                  fontWeight: 800,
                  lineHeight: 1.3,
                  margin: '8px 0 16px',
                  overflowWrap: 'anywhere',
                }}
              >
                {laporan.lokasi}
              </h1>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '8px 12px',
                  borderRadius: 30,
                  background: 'rgba(247,242,232,0.13)',
                  fontSize: 13,
                }}
              >
                <IonIcon icon={locationOutline} />
                {laporan.kategori}
              </div>
            </div>

            <IonCard className="detail-card">
              <IonCardHeader style={{ padding: '22px 20px 10px' }}>
                <IonCardSubtitle
                  style={{
                    color: '#718078',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  STATUS PENGADUAN
                </IonCardSubtitle>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 12,
                    marginTop: 10,
                  }}
                >
                  <IonCardTitle
                    style={{
                      fontSize: 21,
                      fontWeight: 800,
                      color: '#193D32',
                    }}
                  >
                    Informasi Laporan
                  </IonCardTitle>

                  <IonBadge
                    color={warnaStatus}
                    style={{
                      padding: '9px 12px',
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  >
                    {laporan.status}
                  </IonBadge>
                </div>
              </IonCardHeader>

              <IonCardContent style={{ padding: '8px 20px 24px' }}>
                <div className="detail-info-row">
                  <div className="detail-info-icon">
                    <IonIcon icon={personOutline} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="detail-label">Nama Pelapor</div>
                    <div className="detail-value">{laporan.nama}</div>
                  </div>
                </div>

                <div style={{ height: 1, background: '#EEF1EB' }} />

                <div className="detail-info-row">
                  <div className="detail-info-icon">
                    <IonIcon icon={calendarOutline} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="detail-label">Tanggal Masuk</div>
                    <div className="detail-value">{tanggalMasuk}</div>
                  </div>
                </div>

                <div style={{ height: 1, background: '#EEF1EB' }} />

                <div className="detail-info-row">
                  <div className="detail-info-icon">
                    <IonIcon icon={documentTextOutline} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="detail-label">Kategori Laporan</div>
                    <div className="detail-value">{laporan.kategori}</div>
                  </div>
                </div>

                <div
                  style={{
                    height: 1,
                    background: '#EEF1EB',
                    margin: '4px 0 20px',
                  }}
                />

                <h3
                  style={{
                    color: '#193D32',
                    fontSize: 16,
                    fontWeight: 800,
                    margin: '0 0 12px',
                  }}
                >
                  <IonIcon
                    icon={documentTextOutline}
                    style={{
                      verticalAlign: 'middle',
                      marginRight: 8,
                      fontSize: 20,
                    }}
                  />
                  Deskripsi Masalah
                </h3>

                <p className="detail-description">{laporan.deskripsi}</p>

                {/* HASIL PENANGANAN UNTUK SISWA DAN PETUGAS */}
                <div style={{ marginTop: 24 }}>
                  <h3
                    style={{
                      color: '#193D32',
                      fontSize: 16,
                      fontWeight: 800,
                      margin: '0 0 12px',
                    }}
                  >
                    <IonIcon
                      icon={checkmarkCircleOutline}
                      style={{
                        verticalAlign: 'middle',
                        marginRight: 8,
                        fontSize: 20,
                      }}
                    />
                    Hasil Penanganan
                  </h3>

                  {isPetugas ? (
                    <>
                      <IonTextarea
                        value={hasilPenanganan}
                        onIonInput={(event) =>
                          setHasilPenanganan(event.detail.value ?? '')
                        }
                        placeholder="Tuliskan hasil pemeriksaan atau tindakan yang dilakukan..."
                        rows={5}
                        autoGrow
                        fill="outline"
                        style={{
                          '--background': '#FFFFFF',
                          '--color': '#26372F',
                          '--border-color': '#DCE5D7',
                          '--border-radius': '14px',
                          '--highlight-color-focused': '#315A45',
                          marginBottom: 8,
                        } as React.CSSProperties}
                      />

                      <IonButton
                        expand="block"
                        className="detail-action"
                        disabled={menyimpan}
                        onClick={() =>
                          simpanPenanganan(
                            laporan.status === 'Menunggu'
                              ? 'Sedang Diproses'
                              : laporan.status === 'Selesai'
                              ? 'Selesai'
                              : 'Sedang Diproses'
                          )
                        }
                        style={{
                          '--background': '#315A45',
                          '--background-hover': '#193D32',
                          '--color': '#FFFFFF',
                        } as React.CSSProperties}
                      >
                        <IonIcon slot="start" icon={saveOutline} />
                        {menyimpan ? 'Menyimpan...' : 'Simpan Hasil Penanganan'}
                      </IonButton>

                      {laporan.status === 'Menunggu' && (
                        <p
                          style={{
                            fontSize: 12,
                            color: '#718078',
                            lineHeight: 1.6,
                          }}
                        >
                          Menyimpan hasil penanganan sekaligus mengubah status
                          menjadi Sedang Diproses.
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="detail-description">
                      {laporan.hasil_penanganan?.trim()
                        ? laporan.hasil_penanganan
                        : 'Belum ada hasil penanganan dari petugas.'}
                    </p>
                  )}
                </div>

                {isPetugas && (
                  <div
                    style={{
                      marginTop: 25,
                      paddingTop: 20,
                      borderTop: '1px solid #EEF1EB',
                    }}
                  >
                    <h3
                      style={{
                        color: '#193D32',
                        fontSize: 16,
                        fontWeight: 800,
                        margin: '0 0 5px',
                      }}
                    >
                      Tindakan Petugas
                    </h3>

                    <p
                      style={{
                        fontSize: 13,
                        color: '#718078',
                        margin: '0 0 12px',
                      }}
                    >
                      Perbarui status sesuai perkembangan laporan.
                    </p>

                    {laporan.status === 'Menunggu' ? (
                      <IonButton
                        expand="block"
                        className="detail-action"
                        disabled={menyimpan}
                        onClick={() => simpanPenanganan('Sedang Diproses')}
                        style={{
                          '--background': '#315A45',
                          '--background-hover': '#193D32',
                          '--color': '#FFFFFF',
                        } as React.CSSProperties}
                      >
                        <IonIcon slot="start" icon={timeOutline} />
                        Mulai Proses Laporan
                        <IonIcon slot="end" icon={arrowForwardOutline} />
                      </IonButton>
                    ) : laporan.status === 'Sedang Diproses' ? (
                      <IonButton
                        expand="block"
                        className="detail-action"
                        disabled={menyimpan}
                        onClick={() => simpanPenanganan('Selesai')}
                        style={{
                          '--background': '#193D32',
                          '--background-hover': '#315A45',
                          '--color': '#FFFFFF',
                        } as React.CSSProperties}
                      >
                        <IonIcon
                          slot="start"
                          icon={checkmarkCircleOutline}
                        />
                        Tandai Laporan Selesai
                      </IonButton>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: 15,
                          borderRadius: 14,
                          background: '#DCE5D7',
                          color: '#193D32',
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        <IonIcon
                          icon={checkmarkCircleOutline}
                          style={{ fontSize: 24 }}
                        />
                        Laporan Sudah Selesai
                      </div>
                    )}
                  </div>
                )}
              </IonCardContent>
            </IonCard>

            <p
              style={{
                textAlign: 'center',
                color: '#718078',
                fontSize: 11,
                margin: '20px 0 0',
              }}
            >
              BERINGIN SMART · Sistem Informasi Pengaduan
            </p>
          </div>
        ) : (
          <div
            style={{
              maxWidth: 420,
              margin: '80px auto',
              padding: 24,
              textAlign: 'center',
              color: '#26372F',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 24,
                background: '#DCE5D7',
                color: '#193D32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                fontSize: 34,
              }}
            >
              <IonIcon icon={documentTextOutline} />
            </div>

            <h2 style={{ fontWeight: 800 }}>Laporan Tidak Ditemukan</h2>
            <p style={{ color: '#718078', lineHeight: 1.6 }}>
              Data laporan mungkin belum dimuat atau sudah tidak tersedia.
              Coba kembali ke halaman utama.
            </p>

            <IonButton
              routerLink="/home"
              expand="block"
              style={{
                '--background': '#193D32',
                '--border-radius': '14px',
              } as React.CSSProperties}
            >
              Kembali ke Beranda
            </IonButton>
          </div>
        )}

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2500}
          color={toastMessage.startsWith('Gagal') ? 'danger' : 'success'}
        />
      </IonContent>
    </IonPage>
  );
};

export default Detail;
