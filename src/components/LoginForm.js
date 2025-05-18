import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  // Track window width for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  // Get responsive styles based on window width
  const getResponsiveStyles = () => {
    return {
      container: {
        ...styles.container,
        padding: windowWidth < 640 ? '0.5rem' : '1rem',
      },
      formWrapper: {
        ...styles.formWrapper,
        maxWidth: windowWidth < 640 ? '100%' : '28rem',
      },
      card: {
        ...styles.card,
        margin: windowWidth < 640 ? '0' : 'auto',
      },
      form: {
        ...styles.form,
        padding: windowWidth < 640 ? '1.5rem 1rem' : '2rem',
      },
      headerTitle: {
        ...styles.headerTitle,
        fontSize: windowWidth < 640 ? '1.25rem' : '1.5rem',
      },
      button: {
        ...styles.button,
        padding: windowWidth < 640 ? '0.625rem' : '0.75rem',
      }
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <div style={responsiveStyles.container}>
      <div style={responsiveStyles.formWrapper}>
        <div style={responsiveStyles.card}>

          <div style={styles.header}>
            <div style={styles.waveContainer}>
              <svg style={styles.wave} viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
                <path 
                  fill="#ffffff" 
                  fillOpacity="1" 
                  d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
                ></path>
              </svg>
            </div>
            <h2 style={responsiveStyles.headerTitle}>Selamat Datang</h2>
            <p style={styles.headerSubtitle}>Silakan masuk ke akun Anda</p>
          </div>

          <form style={responsiveStyles.form} onSubmit={handleSubmit}>
            {errorMessage && (
              <div style={styles.errorContainer}>
                <p style={styles.errorMessage}>{errorMessage}</p>
              </div>
            )}

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
                  autoComplete="email"
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
                  autoComplete="current-password"
                />
                <div
                  style={styles.passwordToggle}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  role="button"
                  tabIndex="0"
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

            <button 
              type="submit" 
              style={responsiveStyles.button} 
              disabled={loading}
              aria-busy={loading}
            >
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
    boxSizing: 'border-box',
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
    height: '40px',
    overflow: 'hidden',
  },
  wave: {
    width: '100%',
    height: '100%',
    display: 'block',
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
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontSize: '0.875rem',
    position: 'relative',
    zIndex: 10,
  },
  form: {
    padding: '2rem',
    paddingTop: '1.5rem',
  },
  errorContainer: {
    backgroundColor: 'rgba(254, 226, 226, 1)',
    borderRadius: '0.375rem',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid rgba(248, 113, 113, 1)',
  },
  errorMessage: {
    color: 'rgba(185, 28, 28, 1)',
    margin: 0,
    fontSize: '0.875rem',
    textAlign: 'center',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
};

export default LoginForm;