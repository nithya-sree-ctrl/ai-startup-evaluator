import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Always reset form to blank on page load
  React.useEffect(() => {
    setForm({ name: '', email: '', password: '' });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Please enter your name');
    if (!form.email.trim()) return toast.error('Please enter your email');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');

    setLoading(true);
    try {
      const { data } = await api.post('/auth/signup', {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      login(data.user, data.token);
      toast.success(`Welcome, ${data.user.name}! 🎉`);
      navigate('/evaluate');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      {/* Left Panel */}
      <div style={leftPanel}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚀</div>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', color: '#f1f5f9' }}>
          Start Your Journey
        </h2>
        <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '32px' }}>
          Join thousands of entrepreneurs who use AI to validate and build successful startups.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['✅ AI Idea Evaluation', '✅ SWOT Analysis', '✅ Investor Pitch Generator', '✅ AI Mentor Chatbot', '✅ PDF Export'].map((f, i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: '14px' }}>{f}</div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div style={rightPanel}>
        <div style={formCard}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>✨</div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#f1f5f9' }}>Create Account</h1>
            <p style={{ color: '#94a3b8', marginTop: '6px', fontSize: '14px' }}>
              Already have an account?{' '}
              <span onClick={() => navigate('/login')}
                style={{ color: '#6c63ff', fontWeight: 600, cursor: 'pointer' }}>
                Sign in
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text" placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                autoComplete="off" required autoFocus
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email" placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoComplete="off" required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
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
              {loading ? <><span className="spinner" /> Creating account...</> : '🚀 Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', color: '#64748b', fontSize: '12px' }}>
            By signing up, you agree to our Terms of Service
          </p>
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
