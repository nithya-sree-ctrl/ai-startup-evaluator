import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import EvaluationResult from '../components/EvaluationResult';

export default function History() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await api.get('/history');
      setIdeas(data);
    } catch {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const loadDetail = async (id) => {
    setLoadingDetail(true);
    try {
      const { data } = await api.get(`/history/${id}`);
      setSelected(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      toast.error('Failed to load idea');
    } finally {
      setLoadingDetail(false);
    }
  };

  const deleteIdea = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this evaluation?')) return;
    try {
      await api.delete(`/history/${id}`);
      setIdeas(ideas.filter(i => i._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const scoreColor = (s) => s >= 70 ? '#10b981' : s >= 40 ? '#f59e0b' : '#ef4444';

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px' }}>
      <div className="spinner" style={{ width: '40px', height: '40px', borderWidth: '3px', margin: '0 auto' }} />
    </div>
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>📋 Idea History</h1>
          <p style={{ color: '#94a3b8' }}>{ideas.length} evaluated idea{ideas.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/evaluate')}>+ New Evaluation</button>
      </div>

      {ideas.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💡</div>
          <h3 style={{ marginBottom: '8px' }}>No ideas evaluated yet</h3>
          <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Start by evaluating your first startup idea</p>
          <button className="btn btn-primary" onClick={() => navigate('/evaluate')}>Evaluate an Idea</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ideas.map(idea => (
            <div key={idea._id} className="card"
              onClick={() => loadDetail(idea._id)}
              style={{ cursor: 'pointer', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: selected?._id === idea._id ? '1px solid #6c63ff' : '1px solid #2d2d4e' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#6c63ff'}
              onMouseLeave={e => e.currentTarget.style.borderColor = selected?._id === idea._id ? '#6c63ff' : '#2d2d4e'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(108,99,255,0.15)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '20px',
                }}>💡</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>{idea.title}</div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {idea.industry && <span className="badge badge-purple">{idea.industry}</span>}
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: scoreColor(idea.evaluation?.score) }}>
                    {idea.evaluation?.score}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Score</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#00d4aa' }}>
                    {idea.evaluation?.investorScore}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Investor</div>
                </div>
                <button className="btn btn-danger" onClick={(e) => deleteIdea(idea._id, e)}
                  style={{ padding: '6px 12px', fontSize: '12px' }}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {loadingDetail && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="spinner" style={{ width: '32px', height: '32px', borderWidth: '3px', margin: '0 auto' }} />
        </div>
      )}

      {selected && !loadingDetail && <EvaluationResult idea={selected} />}
    </div>
  );
}
