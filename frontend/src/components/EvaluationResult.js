import React, { useState } from 'react';
import ScoreCircle from './ScoreCircle';
import { exportToPDF } from '../utils/exportPDF';

export default function EvaluationResult({ idea }) {
  const [activeTab, setActiveTab] = useState('overview');
  const e = idea.evaluation;

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'swot', label: '🔷 SWOT' },
    { id: 'pitch', label: '🎤 Pitch' },
    { id: 'business', label: '🏢 Business Model' },
    { id: 'competitors', label: '⚔️ Competitors' },
    { id: 'simulation', label: '🔮 Simulation' },
  ];

  const scoreColor = (s) => s >= 70 ? '#10b981' : s >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ marginTop: '32px' }}>
      {/* Score Header */}
      <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>{idea.title}</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {idea.industry && <span className="badge badge-purple">{idea.industry}</span>}
              {idea.targetAudience && <span className="badge badge-teal">{idea.targetAudience}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <ScoreCircle score={e.score} label="Overall Score" color={scoreColor(e.score)} />
            <ScoreCircle score={e.investorScore} label="Investor Score" size={100} color="#00d4aa" />
            <button className="btn btn-primary" onClick={() => exportToPDF(idea)}>
              📄 Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            className="btn"
            onClick={() => setActiveTab(t.id)}
            style={{
              background: activeTab === t.id ? 'var(--primary)' : 'var(--bg-card)',
              color: activeTab === t.id ? 'white' : 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid-3" style={{ gap: '16px' }}>
          <div className="card">
            <div className="section-title" style={{ color: '#10b981' }}>✅ Strengths</div>
            {(e.strengths || []).map((s, i) => (
              <div key={i} style={itemStyle}><span style={{ color: '#10b981' }}>▸</span> {s}</div>
            ))}
          </div>
          <div className="card">
            <div className="section-title" style={{ color: '#ef4444' }}>⚠️ Weaknesses</div>
            {(e.weaknesses || []).map((w, i) => (
              <div key={i} style={itemStyle}><span style={{ color: '#ef4444' }}>▸</span> {w}</div>
            ))}
          </div>
          <div className="card">
            <div className="section-title" style={{ color: '#6c63ff' }}>💡 Suggestions</div>
            {(e.suggestions || []).map((s, i) => (
              <div key={i} style={itemStyle}><span style={{ color: '#6c63ff' }}>▸</span> {s}</div>
            ))}
          </div>
          <div className="card" style={{ gridColumn: '1 / -1' }}>
            <div className="section-title">🧠 Investor Notes</div>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontStyle: 'italic' }}>"{e.investorNotes}"</p>
          </div>
        </div>
      )}

      {activeTab === 'swot' && (
        <div className="grid-2">
          {[
            { key: 'strengths', label: 'Strengths', color: '#10b981', icon: '💪' },
            { key: 'weaknesses', label: 'Weaknesses', color: '#ef4444', icon: '⚠️' },
            { key: 'opportunities', label: 'Opportunities', color: '#6c63ff', icon: '🚀' },
            { key: 'threats', label: 'Threats', color: '#f59e0b', icon: '🔥' },
          ].map(({ key, label, color, icon }) => (
            <div key={key} className="card" style={{ borderLeft: `3px solid ${color}` }}>
              <div className="section-title" style={{ color }}>{icon} {label}</div>
              {(e.swot?.[key] || []).map((item, i) => (
                <div key={i} style={itemStyle}><span style={{ color }}>▸</span> {item}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'pitch' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { key: 'problem', label: '🔴 Problem', color: '#ef4444' },
            { key: 'solution', label: '🟢 Solution', color: '#10b981' },
            { key: 'marketOpportunity', label: '🔵 Market Opportunity', color: '#6c63ff' },
            { key: 'uniqueValueProposition', label: '⭐ Unique Value Proposition', color: '#f59e0b' },
          ].map(({ key, label, color }) => (
            <div key={key} className="card" style={{ borderLeft: `3px solid ${color}` }}>
              <div className="section-title" style={{ color }}>{label}</div>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7' }}>{e.pitch?.[key]}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'business' && (
        <div className="grid-2">
          {[
            { key: 'valueProposition', label: '💎 Value Proposition', color: '#6c63ff', isString: true },
            { key: 'keyPartners', label: '🤝 Key Partners', color: '#00d4aa' },
            { key: 'keyActivities', label: '⚙️ Key Activities', color: '#f59e0b' },
            { key: 'customerSegments', label: '👥 Customer Segments', color: '#10b981' },
            { key: 'revenueStreams', label: '💰 Revenue Streams', color: '#ef4444' },
          ].map(({ key, label, color, isString }) => (
            <div key={key} className="card" style={{ borderLeft: `3px solid ${color}` }}>
              <div className="section-title" style={{ color }}>{label}</div>
              {isString
                ? <p style={{ color: '#cbd5e1', lineHeight: '1.7' }}>{e.businessModel?.[key]}</p>
                : (e.businessModel?.[key] || []).map((item, i) => (
                    <div key={i} style={itemStyle}><span style={{ color }}>▸</span> {item}</div>
                  ))
              }
            </div>
          ))}
        </div>
      )}

      {activeTab === 'competitors' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(e.competitors || []).map((c, i) => (
            <div key={i} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'rgba(108,99,255,0.2)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px', flexShrink: 0,
              }}>⚔️</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>{c.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>{c.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'simulation' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Recommendation Banner */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,170,0.1))',
            border: '1px solid rgba(108,99,255,0.3)',
            textAlign: 'center', padding: '24px',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔮</div>
            <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>AI Growth Simulation</div>
            <div style={{ fontSize: '16px', color: '#a78bfa', fontWeight: 600 }}>
              {e.simulation?.recommendation || 'Evaluate your idea to see simulation'}
            </div>
            <div style={{ marginTop: '12px' }}>
              <span style={{
                padding: '4px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
                background: e.simulation?.growthRate === 'high' ? 'rgba(16,185,129,0.2)' : e.simulation?.growthRate === 'medium' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
                color: e.simulation?.growthRate === 'high' ? '#10b981' : e.simulation?.growthRate === 'medium' ? '#f59e0b' : '#ef4444',
              }}>
                {e.simulation?.growthRate === 'high' ? '📈 High Growth Potential' : e.simulation?.growthRate === 'medium' ? '⚠️ Medium Growth Potential' : '🔴 Low Growth Potential'}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <div className="section-title" style={{ color: '#6c63ff', marginBottom: '20px' }}>📅 12-Month Growth Timeline</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {(e.simulation?.timeline || []).map((t, i) => (
                <div key={i} style={{
                  background: '#16213e', borderRadius: '12px', padding: '16px',
                  border: '1px solid #2d2d4e', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px', fontWeight: 600 }}>{t.month}</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#6c63ff', marginBottom: '4px' }}>
                    {(t.users || 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>users</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#00d4aa', marginBottom: '8px' }}>{t.revenue}</div>
                  <div style={{ fontSize: '11px', color: '#a78bfa', marginBottom: '8px' }}>{t.status}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.5 }}>{t.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* User Growth Bar Chart */}
          <div className="card">
            <div className="section-title" style={{ color: '#00d4aa', marginBottom: '20px' }}>📊 User Growth Chart</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(e.simulation?.timeline || []).map((t, i) => {
                const maxUsers = Math.max(...(e.simulation?.timeline || []).map(x => x.users || 0));
                const pct = maxUsers > 0 ? ((t.users || 0) / maxUsers) * 100 : 0;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '70px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{t.month}</div>
                    <div style={{ flex: 1, background: '#16213e', borderRadius: '6px', height: '28px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${pct}%`, height: '100%',
                        background: 'linear-gradient(90deg, #6c63ff, #00d4aa)',
                        borderRadius: '6px', transition: 'width 1s ease',
                        display: 'flex', alignItems: 'center', paddingLeft: '10px',
                      }}>
                        <span style={{ fontSize: '11px', color: 'white', fontWeight: 600, whiteSpace: 'nowrap' }}>
                          {(t.users || 0).toLocaleString()} users
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risks */}
          <div className="card">
            <div className="section-title" style={{ color: '#f59e0b', marginBottom: '16px' }}>⚠️ Risk Analysis</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(e.simulation?.risks || []).map((risk, i) => (
                <div key={i} style={{
                  padding: '12px 16px', background: '#16213e',
                  borderRadius: '10px', border: '1px solid #2d2d4e',
                  fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5,
                }}>
                  {risk}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

const itemStyle = {
  padding: '8px 0',
  borderBottom: '1px solid #2d2d4e',
  fontSize: '14px',
  color: '#cbd5e1',
  lineHeight: '1.5',
  display: 'flex',
  gap: '8px',
};
