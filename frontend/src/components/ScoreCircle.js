import React from 'react';

export default function ScoreCircle({ score, label, size = 120, color = '#6c63ff' }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#2d2d4e" strokeWidth="8" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text
          x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
          fill="#e2e8f0" fontSize={size / 4} fontWeight="700"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fontFamily: 'Inter' }}
        >
          {score}
        </text>
      </svg>
      <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>{label}</span>
    </div>
  );
}
