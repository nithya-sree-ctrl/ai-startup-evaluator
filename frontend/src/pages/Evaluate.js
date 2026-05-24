import React, { useState } from 'react';
import api from '../utils/api';
import EvaluationResult from '../components/EvaluationResult';
import toast from 'react-hot-toast';

const INDUSTRIES = ['SaaS', 'FinTech', 'HealthTech', 'EdTech', 'E-Commerce', 'AI/ML', 'CleanTech', 'FoodTech', 'PropTech', 'Other'];

export default function Evaluate() {
  const [form, setForm] = useState({ title: '', description: '', targetAudience: '', industry: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return toast.error('Title and description are required');
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post('/evaluate', form);
      setResult({ ...form, id: data.id, evaluation: data.evaluation });
      toast.success('Evaluation complete! 🎉');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Evaluation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>🚀 Evaluate Your Idea</h1>
        <p style={{ color: '#94a3b8' }}>Fill in the details below and let AI analyze your startup idea</p>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Idea Title *</label>
            <input
              type="text" placeholder="e.g. AI-powered personal finance tracker"
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              rows={5} placeholder="Describe your startup idea in detail. What problem does it solve? How does it work?"
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Target Audience</label>
              <input
                type="text" placeholder="e.g. Millennials aged 25-35"
                value={form.targetAudience} onChange={e => setForm({ ...form, targetAudience: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Industry</label>
              <select value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}>
                <option value="">Select industry...</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}
            style={{ padding: '12px 32px', fontSize: '15px' }}>
            {loading
              ? <><span className="spinner" /> Analyzing with AI...</>
              : '🔍 Evaluate Idea'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
          <h3 style={{ marginBottom: '8px' }}>AI is analyzing your idea...</h3>
          <p style={{ color: '#94a3b8' }}>Evaluating market demand, competition, feasibility & more</p>
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
            <div className="spinner" style={{ width: '32px', height: '32px', borderWidth: '3px' }} />
          </div>
        </div>
      )}

      {result && <EvaluationResult idea={result} />}
    </div>
  );
}
