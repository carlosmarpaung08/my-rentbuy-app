import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // import supabase client

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Tambahkan state untuk input form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigate = useNavigate(); // untuk redirect setelah register sukses

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Menambahkan effect untuk auto-dismiss alert
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  // Fungsi handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage(null);

    // Validasi sederhana
    if (!name || !email || !password || !confirmPassword) {
      setAlertMessage('Semua field harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage('Password dan konfirmasi password tidak sama');
      return;
    }

    setLoading(true);

    // Signup ke Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name, // Simpan nama lengkap di metadata user
        }
      }
    });

    setLoading(false);

    if (error) {
      setAlertMessage(error.message);
    } else {
      setAlertMessage('Registrasi berhasil! Silakan cek email untuk verifikasi.');
      setTimeout(() => {
        navigate('/login'); // redirect ke halaman login setelah beberapa detik
      }, 2000);
    }
  };

  return (
    <div style={styles.container}>
      {alertMessage && (
        <div style={styles.alertBox}>
          {alertMessage}
          <button onClick={() => setAlertMessage(null)} style={styles.alertClose} aria-label="Close alert">&times;</button>
        </div>
      )}
      
      <div style={styles.formWrapper}>
        <div style={styles.card}>

          <div style={styles.header}>
            <div style={styles.waveContainer}>
              {/* svg wave */}
            </div>
            <h2 style={styles.headerTitle}>Daftar Akun Baru</h2>
            <p style={styles.headerSubtitle}>Silakan isi data untuk mendaftar</p>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="name" style={styles.label}>Nama Lengkap</label>
              <div style={styles.inputWithIcon}>
                <div style={styles.inputIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input
                  type="text"
                  id="name"
                  placeholder="Masukkan nama lengkap"
                  style={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <div style={styles.inputWithIcon}>
                <div style={styles.inputIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Masukkan email"
                  style={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={styles.inputWithIcon}>
                <div style={styles.inputIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Masukkan password"
                  style={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  style={styles.passwordToggle}
                  onClick={togglePasswordVisibility}
                >
                {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>Konfirmasi Password</label>
              <div style={styles.inputWithIcon}>
                <div style={styles.inputIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Konfirmasi password"
                  style={styles.input}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  style={styles.passwordToggle}
                  onClick={toggleConfirmPasswordVisibility}
                >
                {showConfirmPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Memproses...' : 'Daftar'}
            </button>

            <p style={styles.registerText}>
              Sudah punya akun?{' '}
              <Link to="/login" style={styles.registerLink}>
                Masuk di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
    padding: '1rem',
    paddingTop: '5rem', // Menambahkan padding top untuk menghindari navbar
  },
  formWrapper: {
    width: '100%',
    maxWidth: '28rem',
    paddingTop: '2rem',
    marginTop: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    border: '1px solid rgba(209, 213, 219, 0.5)'
  },
  header: {
    background: 'linear-gradient(to right, #FFB30E)',
    padding: '1.5rem',
    position: 'relative',
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  wave: {
    width: '100%',
    height: '4rem',
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '0.5rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 10,
  },
  headerSubtitle: {
    color: 'rgba(219, 234, 254, 1)',
    textAlign: 'center',
    fontSize: '0.875rem',
    position: 'relative',
    zIndex: 10,
  },
  form: {
    padding: '2rem',
    paddingTop: '1.5rem',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.25rem',
    color: '#4B5563',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  labelFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.25rem',
  },
  inputWithIcon: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    top: '50%',
    left: '0.75rem',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    paddingLeft: '2.5rem',
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    border: '1px solid #D1D5DB',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none',
  },
  passwordToggle: {
    position: 'absolute',
    top: '50%',
    right: '0.75rem',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#FFB30E',
    backgroundImage: 'linear-gradient(to right, #FFB30E)',
    border: 'none',
    borderRadius: '0.5rem',
    color: '#fff',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginBottom: '1.5rem',
  },
  registerText: {
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#4B5563',
    margin: 0,
  },
  registerLink: {
    color: '#FFB30E',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'color 0.2s',
  },
  // Menambahkan styling alert sesuai dengan OrderDetail.js
  alertBox: {
    position: "fixed",
    top: 30,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "16px 28px",
    borderRadius: 30,
    boxShadow: "0 6px 16px rgba(40,167,69,0.5)",
    fontSize: 16,
    fontWeight: "700",
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    gap: 12,
    maxWidth: 360,
    userSelect: "none",
    animation: "slideDown 0.4s ease-out",
  },
  alertClose: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 20,
    cursor: "pointer",
    padding: 0,
    lineHeight: 1,
  },
};

// Tambahkan CSS animation global
const addGlobalStyles = () => {
  if (!document.getElementById('register-animations')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'register-animations';
    styleSheet.type = "text/css";
    styleSheet.innerText = `
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideDown {
      from { opacity: 0; transform: translate(-50%, -20px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
    `;
    document.head.appendChild(styleSheet);
  }
};

// Call the function to add global styles
addGlobalStyles();

export default RegisterForm;