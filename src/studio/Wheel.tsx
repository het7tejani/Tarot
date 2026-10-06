import React from 'react';
const SIGNS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const pt = (r: number, a: number) => [260 + r * Math.cos(a), 260 + r * Math.sin(a)];
export const Wheel: React.FC = () => {
  const petals = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <div className="st-wheel" aria-hidden="true">
      <svg viewBox="0 0 520 520" fill="none" stroke="#5d6b2f" strokeWidth="1.4">
        <g className="st-spin slow" opacity=".55">
          {petals.map((d) => (<path key={d} transform={`rotate(${d} 260 260)`} d="M260 28 C 276 62 276 92 260 118 C 244 92 244 62 260 28Z" fill="rgba(169,181,122,.28)" />))}
        </g>
        <g className="st-spin">
          <circle cx="260" cy="260" r="200" strokeWidth="2" />
          <circle cx="260" cy="260" r="158" />
          {Array.from({ length: 72 }, (_, i) => { const a = (i * 5 * Math.PI) / 180; const [x1, y1] = pt(200, a); const [x2, y2] = pt(i % 6 === 0 ? 184 : 192, a); return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />; })}
          {SIGNS.map((s, i) => { const a = ((i * 30 + 15 - 90) * Math.PI) / 180; const [x, y] = pt(179, a); return <text key={s} x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="22" fill="#38441b" stroke="none">{s}</text>; })}
          {Array.from({ length: 12 }, (_, i) => { const a = ((i * 30 - 90) * Math.PI) / 180; const [x1, y1] = pt(158, a); const [x2, y2] = pt(200, a); return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />; })}
        </g>
        <g className="st-spin rev">
          <circle cx="260" cy="260" r="118" strokeDasharray="3 7" />
          <polygon points="260,150 355,315 165,315" /><polygon points="260,370 165,205 355,205" />
        </g>
        <circle cx="260" cy="260" r="64" fill="#fbf6ea" />
        <g className="st-float"><circle cx="260" cy="260" r="26" fill="#c8892b" stroke="none" />
          {Array.from({ length: 12 }, (_, i) => <line key={i} x1="260" y1="222" x2="260" y2="212" stroke="#c8892b" strokeWidth="3" transform={`rotate(${i * 30} 260 260)`} />)}</g>
      </svg>
    </div>
  );
};
