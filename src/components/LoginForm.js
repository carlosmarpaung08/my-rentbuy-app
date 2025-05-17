import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Email dan password harus diisi');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Login sukses, redirect ke halaman utama atau dashboard
      navigate('/'); // Ganti dengan route tujuan setelah login
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <div style={styles.card}>

          <div style={styles.header}>
            <div style={styles.waveContainer}>
              {/* svg wave */}
            </div>
            <h2 style={styles.headerTitle}>Selamat Datang</h2>
            <p style={styles.headerSubtitle}>Silakan masuk ke akun Anda</p>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <div style={styles.inputWithIcon}>
                <div style={styles.inputIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Masukkan email Anda"
                  style={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.labelFlex}>
                <label htmlFor="password" style={styles.label}>Password</label>
              </div>
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
                  placeholder="Masukkan password Anda"
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

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </button>

            <p style={styles.registerText}>
              Belum punya akun?{' '}
              <Link to="/register" style={styles.registerLink}>
                Daftar di sini
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
  forgotPassword: {
    fontSize: '0.75rem',
    color: '#FFB30E',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s',
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
  socialSection: {
    padding: '0 2rem 2rem 2rem',
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    padding: '0 0.5rem',
    color: '#6B7280',
    fontSize: '0.875rem',
  },
  socialButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  socialButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    backgroundColor: '#fff',
    border: '1px solid #D1D5DB',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  socialIcon: {
    width: '1.25rem',
    height: '1.25rem',
    marginRight: '0.5rem',
  },
  socialButtonText: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4B5563',
  }
};

export default LoginForm;