import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        <span style={{ fontSize: '22px' }}>🚀</span>
        <span>StartupAI</span>
      </Link>

      {/* Show nav links only when logged in and not on home page */}
      {isAuth && !isHome && (
        <div style={styles.links}>
          {[
            { path: '/evaluate', label: '🎯 Evaluate' },
            { path: '/history', label: '📋 History' },
            { path: '/chat', label: '🤖 AI Mentor' },
          ].map(({ path, label }) => (
            <Link key={path} to={path} style={{
              ...styles.link,
              ...(isActive(path) ? styles.activeLink : {}),
            }}>
              {label}
            </Link>
          ))}
        </div>
      )}

      <div style={styles.right}>
        {isAuth ? (
          <>
            <div style={styles.userBadge}>
              <span style={{ fontSize: '16px' }}>👤</span>
              <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 500 }}>{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              style={styles.logoutBtn}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#ef4444'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#2d2d4e'}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {!isHome && (
              <button onClick={() => navigate('/login')} style={styles.loginBtn}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#6c63ff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2d2d4e'}
              >
                Sign In
              </button>
            )}
            <button onClick={() => navigate('/signup')} style={styles.signupBtn}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 32px', height: '64px',
    background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #2d2d4e', position: 'sticky', top: 0, zIndex: 100,
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: '8px',
    textDecoration: 'none', color: '#f1f5f9', fontWeight: 800, fontSize: '18px',
  },
  links: { display: 'flex', gap: '4px' },
  link: {
    textDecoration: 'none', color: '#94a3b8', padding: '7px 14px',
    borderRadius: '8px', fontSize: '14px', fontWeight: 500, transition: 'all 0.2s',
  },
  activeLink: { color: '#a78bfa', background: 'rgba(108,99,255,0.12)' },
  right: { display: 'flex', alignItems: 'center', gap: '10px' },
  userBadge: {
    display: 'flex', alignItems: 'center', gap: '6px',
    background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)',
    borderRadius: '20px', padding: '5px 12px',
  },
  logoutBtn: {
    padding: '7px 16px', borderRadius: '8px', border: '1px solid #2d2d4e',
    background: 'transparent', color: '#94a3b8', cursor: 'pointer',
    fontSize: '13px', fontWeight: 500, fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s',
  },
  loginBtn: {
    padding: '7px 16px', borderRadius: '8px', border: '1px solid #2d2d4e',
    background: 'transparent', color: '#e2e8f0', cursor: 'pointer',
    fontSize: '13px', fontWeight: 500, fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s',
  },
  signupBtn: {
    padding: '7px 18px', borderRadius: '8px', border: 'none',
    background: 'linear-gradient(135deg, #6c63ff, #5a52d5)',
    color: 'white', cursor: 'pointer',
    fontSize: '13px', fontWeight: 600, fontFamily: 'Inter, sans-serif',
    transition: 'opacity 0.2s',
  },
};
