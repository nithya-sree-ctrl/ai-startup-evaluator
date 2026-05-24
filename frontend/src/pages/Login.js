import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Always reset form to blank on page load
  React.useEffect(() => {
    setForm({ email: '', password: '' });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) return toast.error('Please enter your email');
    if (!form.password) return toast.error('Please enter your password');

    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}! 👋`);
      navigate('/evaluate');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      {/* Left Panel */}
      <div style={leftPanel}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎯</div>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', color: '#f1f5f9' }}>
          Welcome Back!
        </h2>
        <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '32px' }}>
          Sign in to access your startup evaluations, history, and AI mentor.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { icon: '📊', text: 'View your past evaluations' },
            { icon: '🤖', text: 'Chat with AI mentor' },
            { icon: '📄', text: 'Export PDF reports' },
            { icon: '💡', text: 'Evaluate new ideas' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1', fontSize: '14px' }}>
              <span style={{ fontSize: '20px' }}>{f.icon}</span>
              {f.text}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div style={rightPanel}>
        <div style={formCard}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔐</div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#f1f5f9' }}>Sign In</h1>
            <p style={{ color: '#94a3b8', marginTop: '6px', fontSize: '14px' }}>
              Don't have an account?{' '}
              <span onClick={() => navigate('/signup')}
                style={{ color: '#6c63ff', fontWeight: 600, cursor: 'pointer' }}>
                Sign up free
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email" placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoComplete="off" required autoFocus
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  autoComplete="new-password" required
                  style={{ paddingRight: '48px' }}
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '16px' }}
                >
                  {showPass ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '13px', fontSize: '15px', fontWeight: 700,
                background: loading ? '#4a4a6a' : 'linear-gradient(135deg, #6c63ff, #5a52d5)',
                color: 'white', border: 'none', borderRadius: '10px',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                marginTop: '8px', fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              {loading ? <><span className="spinner" /> Signing in...</> : '🔐 Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(108,99,255,0.08)', borderRadius: '10px', border: '1px solid rgba(108,99,255,0.2)' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', margin: 0 }}>
              💡 New here? <span onClick={() => navigate('/signup')} style={{ color: '#6c63ff', cursor: 'pointer', fontWeight: 600 }}>Create a free account</span> to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: 'calc(100vh - 64px)',
  display: 'flex',
};

const leftPanel = {
  flex: 1,
  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
  padding: '60px 48px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRight: '1px solid #2d2d4e',
};

const rightPanel = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 24px',
  background: '#0f0f1a',
};

const formCard = {
  width: '100%',
  maxWidth: '420px',
  background: '#1a1a2e',
  border: '1px solid #2d2d4e',
  borderRadius: '20px',
  padding: '40px',
};
