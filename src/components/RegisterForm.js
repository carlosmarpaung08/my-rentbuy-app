import React, { useState } from 'react';
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

  const navigate = useNavigate(); // untuk redirect setelah register sukses

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Fungsi handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validasi sederhana
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Semua field harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi password tidak sama');
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
      setErrorMessage(error.message);
    } else {
      alert('Registrasi berhasil! Silakan cek email untuk verifikasi.');
      navigate('/login'); // redirect ke halaman login
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.waveContainer}>
              {/* ... svg wave ... */}
            </div>
            <h2 style={styles.headerTitle}>Daftar Akun Baru</h2>
            <p style={styles.headerSubtitle}>Silakan isi data untuk mendaftar</p>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            {errorMessage && <p style={{color:'red', textAlign:'center'}}>{errorMessage}</p>}

            <div style={styles.inputGroup}>
              <label htmlFor="name" style={styles.label}>Nama Lengkap</label>
              <input
                type="text"
                id="name"
                placeholder="Masukkan nama lengkap"
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                placeholder="Masukkan email"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={styles.inputWithIcon}>
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
  },
  formWrapper: {
    width: '100%',
    maxWidth: '28rem',
    marginTop: '6rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    overflow: 'hidden',
    border: '1px solid rgba(209,213,219,0.5)',
  },
   header: {
    background: 'linear-gradient(to right, #FFB30E)',
    padding: '1.5rem',
    position: 'relative',
    paddingBottom: '3rem', 
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    overflow: 'visible',
  },
  wave: {
    width: '100%',
    height: '4rem',
    marginTop: '-1rem',
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
    color: 'rgba(219,234,254,1)',
    textAlign: 'center',
    fontSize: '0.875rem',
    position: 'relative',
    zIndex: 10,
  },
  form: {
    padding: '2rem',
     paddingTop: '3.5rem',
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
  inputWithIcon: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    paddingLeft: '1rem',
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
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
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
};

export default RegisterForm;
