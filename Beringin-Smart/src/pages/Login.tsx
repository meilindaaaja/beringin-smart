
import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonIcon,
  IonToast,
  IonSpinner,
} from '@ionic/react';
import {
  mailOutline,
  lockClosedOutline,
  leafOutline,
  shieldCheckmarkOutline,
  arrowForwardOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const GREEN = '#193D32';
const DEEP_GREEN = '#315A45';
const CREAM = '#F7F2E8';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setErrorMessage('');
    setLoading(true);

    try {
      const response = await API.post('/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      navigate('/home');
      window.location.reload();
    } catch (error: any) {
      console.error('Login Error:', error);

      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Gagal terhubung ke server Laravel!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        style={{
          '--background': CREAM,
        } as React.CSSProperties}
      >
        <style>{`
          .bs-login * {
            box-sizing: border-box;
          }

          .bs-login {
            min-height: 100%;
            display: flex;
            background: ${CREAM};
            color: ${GREEN};
            font-family: inherit;
          }

          .bs-welcome {
            width: 43%;
            min-height: 100vh;
            padding: 48px 38px;
            background: linear-gradient(145deg, ${GREEN}, #244B3A 65%, #102C23);
            color: ${CREAM};
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
          }

          .bs-welcome::before {
            content: "";
            position: absolute;
            width: 300px;
            height: 300px;
            border: 1px solid rgba(247,242,232,.12);
            border-radius: 50%;
            right: -150px;
            top: 18%;
          }

          .bs-welcome::after {
            content: "";
            position: absolute;
            width: 220px;
            height: 220px;
            border: 1px solid rgba(247,242,232,.10);
            border-radius: 50%;
            left: -130px;
            bottom: 8%;
          }

          .bs-brand {
            display: flex;
            align-items: center;
            gap: 13px;
            position: relative;
            z-index: 1;
          }

          .bs-brand-icon {
            width: 48px;
            height: 48px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(247,242,232,.13);
            border: 1px solid rgba(247,242,232,.2);
            font-size: 27px;
          }

          .bs-brand-name {
            font-size: 19px;
            font-weight: 800;
            letter-spacing: 1px;
          }

          .bs-brand-sub {
            font-size: 11px;
            color: #DCE5D7;
            margin-top: 4px;
          }

          .bs-welcome-copy {
            max-width: 430px;
            margin: 65px 0;
            position: relative;
            z-index: 1;
          }

          .bs-eyebrow {
            font-size: 11px;
            letter-spacing: 2px;
            font-weight: 700;
            color: #C6D7B9;
            text-transform: uppercase;
          }

          .bs-welcome-copy h1 {
            font-size: clamp(30px, 3.5vw, 46px);
            line-height: 1.2;
            margin: 18px 0;
            font-weight: 750;
          }

          .bs-welcome-copy p {
            color: #DCE5D7;
            line-height: 1.8;
            font-size: 14px;
            margin: 0;
          }

          .bs-features {
            display: grid;
            gap: 19px;
            position: relative;
            z-index: 1;
          }

          .bs-feature {
            display: flex;
            align-items: center;
            gap: 13px;
            color: #F7F2E8;
            font-size: 13px;
          }

          .bs-feature-icon {
            width: 39px;
            height: 39px;
            flex-shrink: 0;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(220,229,215,.13);
            color: #DCE5D7;
            font-size: 20px;
          }

          .bs-form-side {
            flex: 1;
            min-width: 0;
            padding: 40px 28px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .bs-form-card {
            width: 100%;
            max-width: 420px;
            padding: 38px;
            background: rgba(255,255,255,.78);
            border: 1px solid #E8E4D8;
            border-radius: 25px;
            box-shadow: 0 18px 55px rgba(25,61,50,.08);
          }

          .bs-mobile-brand {
            display: none;
          }

          .bs-form-card h2 {
            font-size: 28px;
            margin: 0 0 9px;
            color: ${GREEN};
            font-weight: 750;
          }

          .bs-form-intro {
            font-size: 13px;
            line-height: 1.7;
            color: #77837A;
            margin: 0 0 29px;
          }

          .bs-field-label {
            font-size: 13px;
            font-weight: 650;
            color: ${GREEN};
            margin: 0 0 9px;
            display: block;
          }

          .bs-input-wrap {
            display: flex;
            align-items: center;
            gap: 11px;
            padding: 0 13px;
            min-height: 53px;
            border: 1px solid #DCDDD2;
            background: #FFFEFA;
            border-radius: 12px;
            transition: border-color .2s, box-shadow .2s;
          }

          .bs-input-wrap:focus-within {
            border-color: ${DEEP_GREEN};
            box-shadow: 0 0 0 3px rgba(49,90,69,.09);
          }

          .bs-input-icon {
            font-size: 20px;
            color: #829387;
            flex-shrink: 0;
          }

          .bs-input-wrap ion-input {
            --color: ${GREEN};
            --placeholder-color: #9AA39B;
            --padding-start: 0;
            font-size: 14px;
          }

          .bs-eye-button {
            border: 0;
            background: transparent;
            color: #829387;
            font-size: 20px;
            padding: 6px;
            display: flex;
            cursor: pointer;
          }

          .bs-submit {
            margin-top: 26px;
            --background: ${GREEN};
            --background-hover: ${DEEP_GREEN};
            --background-activated: #102C23;
            --color: #FFFFFF;
            --border-radius: 12px;
            --box-shadow: 0 7px 18px rgba(25,61,50,.16);
            height: 52px;
            font-weight: 650;
            font-size: 15px;
            text-transform: none;
            letter-spacing: .2px;
          }

          .bs-security {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            color: #77877A;
            font-size: 11px;
            margin-top: 25px;
            text-align: center;
          }

          .bs-security ion-icon {
            font-size: 17px;
            color: ${DEEP_GREEN};
          }

          .bs-footer {
            margin-top: 28px;
            text-align: center;
            font-size: 11px;
            color: #9AA198;
          }

          @media (max-width: 760px) {
            .bs-login {
              flex-direction: column;
            }

            .bs-welcome {
              width: 100%;
              min-height: auto;
              padding: 27px 24px 34px;
              border-radius: 0 0 28px 28px;
            }

            .bs-welcome-copy {
              margin: 32px 0 0;
            }

            .bs-welcome-copy h1 {
              font-size: 29px;
              margin: 12px 0;
            }

            .bs-welcome-copy p {
              font-size: 13px;
            }

            .bs-features {
              display: none;
            }

            .bs-form-side {
              padding: 25px 18px 32px;
              align-items: flex-start;
            }

            .bs-form-card {
              max-width: 480px;
              margin: 0 auto;
              padding: 27px 23px;
              border-radius: 21px;
            }

            .bs-mobile-brand {
              display: block;
              font-size: 11px;
              letter-spacing: 1.5px;
              font-weight: 750;
              color: ${DEEP_GREEN};
              margin-bottom: 18px;
            }

            .bs-form-card h2 {
              font-size: 25px;
            }
          }
        `}</style>

        <div className="bs-login">
          <section className="bs-welcome">
            <div className="bs-brand">
              <div className="bs-brand-icon">
                <IonIcon icon={leafOutline} />
              </div>

              <div>
                <div className="bs-brand-name">
                  BERINGIN SMART
                </div>
                <div className="bs-brand-sub">
                  Sistem Informasi Pengaduan Sekolah
                </div>
              </div>
            </div>

            <div className="bs-welcome-copy">
              <div className="bs-eyebrow">
                Bersama untuk perubahan
              </div>

              <h1>
                Satu langkah untuk sekolah yang lebih baik.
              </h1>

              <p>
                Sampaikan laporan, pantau prosesnya, dan
                ikut menciptakan lingkungan sekolah yang
                lebih nyaman melalui Beringin Smart.
              </p>
            </div>

            <div className="bs-features">
              <div className="bs-feature">
                <div className="bs-feature-icon">
                  <IonIcon icon={leafOutline} />
                </div>
                <span>Lingkungan sekolah yang lebih baik</span>
              </div>

              <div className="bs-feature">
                <div className="bs-feature-icon">
                  <IonIcon icon={arrowForwardOutline} />
                </div>
                <span>Pelaporan mudah dan praktis</span>
              </div>

              <div className="bs-feature">
                <div className="bs-feature-icon">
                  <IonIcon icon={shieldCheckmarkOutline} />
                </div>
                <span>Pantau tindak lanjut laporan</span>
              </div>
            </div>
          </section>

          <section className="bs-form-side">
            <div className="bs-form-card">
              <div className="bs-mobile-brand">
                BERINGIN SMART
              </div>

              <h2>Selamat datang!</h2>

              <p className="bs-form-intro">
                Masuk ke akun kamu untuk melanjutkan
                ke portal pengaduan sekolah.
              </p>

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '19px' }}>
                  <label className="bs-field-label">
                    Email
                  </label>

                  <div className="bs-input-wrap">
                    <IonIcon
                      icon={mailOutline}
                      className="bs-input-icon"
                    />

                    <IonInput
                      type="email"
                      value={email}
                      onIonInput={(e) =>
                        setEmail(e.detail.value ?? '')
                      }
                      placeholder="Masukkan email"
                      autocomplete="email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="bs-field-label">
                    Password
                  </label>

                  <div className="bs-input-wrap">
                    <IonIcon
                      icon={lockClosedOutline}
                      className="bs-input-icon"
                    />

                    <IonInput
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onIonInput={(e) =>
                        setPassword(e.detail.value ?? '')
                      }
                      placeholder="Masukkan password"
                      autocomplete="current-password"
                      required
                    />

                    <button
                      type="button"
                      className="bs-eye-button"
                      aria-label={
                        showPassword
                          ? 'Sembunyikan password'
                          : 'Tampilkan password'
                      }
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      <IonIcon
                        icon={
                          showPassword ? eyeOffOutline : eyeOutline
                        }
                      />
                    </button>
                  </div>
                </div>

                <IonButton
                  expand="block"
                  type="submit"
                  className="bs-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <IonSpinner
                        name="crescent"
                        style={{ marginRight: '10px' }}
                      />
                      Memproses...
                    </>
                  ) : (
                    <>
                      Masuk ke akun
                      <IonIcon
                        slot="end"
                        icon={arrowForwardOutline}
                      />
                    </>
                  )}
                </IonButton>
              </form>

              <div className="bs-security">
                <IonIcon icon={shieldCheckmarkOutline} />
                <span>Akses mudah untuk layanan pengaduan sekolah</span>
              </div>

              <div className="bs-footer">
                Beringin Smart · Sistem Informasi Sekolah
              </div>
            </div>
          </section>
        </div>

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

export default Login;
