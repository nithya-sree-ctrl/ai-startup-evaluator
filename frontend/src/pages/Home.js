import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const features = [
    { icon: '🎯', title: 'AI Evaluation', desc: 'Get scored on market demand, feasibility, uniqueness & more' },
    { icon: '📊', title: 'SWOT Analysis', desc: 'Full strengths, weaknesses, opportunities & threats breakdown' },
    { icon: '🎤', title: 'Pitch Generator', desc: 'Auto-generate investor-ready pitch for your idea' },
    { icon: '🏢', title: 'Business Model', desc: 'Complete Business Model Canvas generated instantly' },
    { icon: '⚔️', title: 'Competitor Finder', desc: 'Discover similar startups and market competitors' },
    { icon: '🤖', title: 'AI Mentor Chat', desc: 'Chat with an AI startup mentor for personalized advice' },
  ];

  const steps = [
    { num: '01', title: 'Create Account', desc: 'Sign up for free in seconds' },
    { num: '02', title: 'Enter Your Idea', desc: 'Describe your startup idea in detail' },
    { num: '03', title: 'Get AI Analysis', desc: 'Receive full evaluation instantly' },
    { num: '04', title: 'Take Action', desc: 'Use insights to build smarter' },
  ];

  const handleGetStarted = () => {
    if (isAuth) {
      navigate('/evaluate');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh' }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
        borderBottom: '1px solid #2d2d4e',
        padding: '100px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(108,99,255,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)',
            borderRadius: '20px', padding: '6px 16px', marginBottom: '28px',
            fontSize: '13px', color: '#a78bfa',
          }}>
            🚀 AI-Powered Startup Evaluation Platform
          </div>

          <h1 style={{ fontSize: '58px', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px', color: '#f1f5f9' }}>
            Turn Your Idea Into a{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6c63ff, #00d4aa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Validated Startup
            </span>
          </h1>

          <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '560px', margin: '0 auto 48px', lineHeight: 1.8 }}>
            Get instant AI-powered analysis with SWOT, investor pitch, business model canvas, competitor research, and expert mentor advice — all in one place.
          </p>

          {/* GET STARTED BUTTON - ONLY ONE BUTTON */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleGetStarted}
              style={{
                padding: '16px 56px', fontSize: '17px', fontWeight: 700,
                background: 'linear-gradient(135deg, #6c63ff, #5a52d5)',
                color: 'white', border: 'none', borderRadius: '12px',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: '0 8px 32px rgba(108,99,255,0.4)',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(108,99,255,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(108,99,255,0.4)'; }}
            >
              🚀 Get Started Free
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', marginTop: '64px', flexWrap: 'wrap' }}>
            {[
              { value: '10+', label: 'AI Features' },
              { value: '100%', label: 'Free to Start' },
              { value: '< 30s', label: 'Evaluation Time' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#6c63ff' }}>{s.value}</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '12px' }}>Everything You Need to Validate</h2>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Powered by AI to give you real startup insights</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {features.map((f, i) => (
            <div key={i} className="card"
              style={{ textAlign: 'center', transition: 'all 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = '#6c63ff'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#2d2d4e'; }}
            >
              <div style={{ fontSize: '40px', marginBottom: '14px' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '16px' }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ background: '#1a1a2e', borderTop: '1px solid #2d2d4e', borderBottom: '1px solid #2d2d4e', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '12px' }}>How It Works</h2>
            <p style={{ color: '#94a3b8' }}>Get your startup evaluated in 4 simple steps</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(0,212,170,0.2))',
                  border: '1px solid rgba(108,99,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px', fontSize: '18px', fontWeight: 800, color: '#a78bfa',
                }}>
                  {s.num}
                </div>
                <div style={{ fontWeight: 700, marginBottom: '6px' }}>{s.title}</div>
                <div style={{ color: '#64748b', fontSize: '13px' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div className="card" style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,170,0.08))',
          border: '1px solid rgba(108,99,255,0.3)',
          padding: '48px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>Ready to Validate Your Idea?</h2>
          <p style={{ color: '#94a3b8', marginBottom: '32px', lineHeight: 1.7 }}>
            Join entrepreneurs who use AI to build smarter startups. Free to get started.
          </p>
          <button
            onClick={handleGetStarted}
            style={{
              padding: '14px 40px', fontSize: '16px', fontWeight: 700,
              background: 'linear-gradient(135deg, #6c63ff, #5a52d5)',
              color: 'white', border: 'none', borderRadius: '12px',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 8px 32px rgba(108,99,255,0.4)',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Get Started Now →
          </button>
        </div>
      </div>

    </div>
  );
}
