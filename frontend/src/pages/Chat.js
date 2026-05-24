import React, { useState, useRef, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "👋 Hi! I'm your AI startup mentor. Ask me anything about your startup idea — market strategy, fundraising, product development, or anything else!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideaContext, setIdeaContext] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    const history = messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content }));

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('/chat', {
        message: input,
        ideaContext,
        history,
      });
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to get response. Check your OpenAI API key in backend/.env';
      toast.error(errMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${errMsg}` }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'How do I validate my startup idea?',
    'What makes a good investor pitch?',
    'How to find my first customers?',
    'What is product-market fit?',
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>🤖 AI Startup Mentor</h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Get personalized startup advice from your AI mentor</p>
      </div>

      {/* Context Input */}
      <div className="card" style={{ marginBottom: '16px', padding: '16px' }}>
        <label style={{ marginBottom: '6px' }}>💡 Startup Context (optional — helps AI give better advice)</label>
        <input
          type="text"
          placeholder="e.g. I'm building an AI-powered fitness app for busy professionals"
          value={ideaContext}
          onChange={e => setIdeaContext(e.target.value)}
        />
      </div>

      {/* Chat Window */}
      <div className="card" style={{ flex: 1, overflowY: 'auto', padding: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '75%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-card2)',
              color: 'var(--text)',
              fontSize: '14px',
              lineHeight: '1.6',
              border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
            }}>
              {msg.role === 'assistant' && (
                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>🤖 AI Mentor</div>
              )}
              <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '12px 16px', borderRadius: '16px 16px 16px 4px', background: 'var(--bg-card2)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '6px', height: '6px', borderRadius: '50%', background: '#6c63ff',
                    animation: 'bounce 1s infinite', animationDelay: `${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {quickPrompts.map((p, i) => (
            <button key={i} className="btn btn-secondary" onClick={() => setInput(p)}
              style={{ fontSize: '12px', padding: '6px 12px' }}>
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          placeholder="Ask your startup mentor anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
          style={{ flex: 1 }}
        />
        <button className="btn btn-primary" type="submit" disabled={loading || !input.trim()}
          style={{ padding: '12px 20px', flexShrink: 0 }}>
          {loading ? <span className="spinner" /> : '➤ Send'}
        </button>
      </form>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
