import React from 'react';
const SIGNS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((g) => g + '\uFE0E');
const NAMES = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const PLANETS = ['☉', '☽', '☿', '♀', '♂', '♃', '♄', '♅', '♆', '♇', '⚷', '☊'].map((g) => g + '\uFE0E');
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const C = 300;
const rad = (d: number) => ((d - 90) * Math.PI) / 180;
const P = (r: number, d: number): [number, number] => [C + r * Math.cos(rad(d)), C + r * Math.sin(rad(d))];
const seg = (r1: number, r2: number, a: number, b: number) => {
  const [x1, y1] = P(r2, a), [x2, y2] = P(r2, b), [x3, y3] = P(r1, b), [x4, y4] = P(r1, a);
  return `M${x1} ${y1}A${r2} ${r2} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r1} ${r1} 0 0 0 ${x4} ${y4}Z`;
};
export const Wheel: React.FC = () => {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty('--rx', `${24 - y * 14}deg`);
    e.currentTarget.style.setProperty('--rz', `${x * 12}deg`);
  };
  return (
    <div className="st-wheel3d" onMouseMove={onMove} aria-hidden="true">
      <div className="st-tilt">
        <svg viewBox="0 0 600 600" fill="none">
          <defs>
            <radialGradient id="wg1" cx="50%" cy="40%" r="70%"><stop offset="0" stopColor="#fffefa" /><stop offset="1" stopColor="#dfe8c2" /></radialGradient>
            <linearGradient id="wg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f5e3b0" /><stop offset=".5" stopColor="#d29a3a" /><stop offset="1" stopColor="#a8741f" /></linearGradient>
            <linearGradient id="wg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a9bf72" /><stop offset="1" stopColor="#6f8a3d" /></linearGradient>
            <radialGradient id="wg4" cx="50%" cy="35%" r="65%"><stop offset="0" stopColor="#fff6d6" /><stop offset=".55" stopColor="#e7b64f" /><stop offset="1" stopColor="#b9801f" /></radialGradient>
            <filter id="wsh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#4a5f27" floodOpacity=".28" /></filter>
            <filter id="wsh2"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#4a5f27" floodOpacity=".3" /></filter>
          </defs>
          {/* thickness: stacked offset discs */}
          {[18, 14, 10, 6].map((o, i) => <circle key={o} cx={C} cy={C + o} r="288" fill={['#8fa352', '#9bb05d', '#a7bb6b', '#b4c67a'][i]} />)}
          <g filter="url(#wsh)">
            <circle cx={C} cy={C} r="288" fill="url(#wg1)" stroke="#6f8a3d" strokeWidth="2" />
          </g>
          {/* ring 1: zodiac segments */}
          <g className="st-r st-r1">
            {SIGNS.map((_, i) => <path key={i} d={seg(214, 284, i * 30, i * 30 + 30)} fill={i % 2 ? '#e7eed2' : '#f9f5e6'} stroke="#7d9448" strokeWidth="1.2" />)}
            {Array.from({ length: 360 }, (_, d) => { if (d % 5) return null; const [x1, y1] = P(284, d), [x2, y2] = P(d % 10 ? 278 : 272, d); return <line key={d} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6f8a3d" strokeWidth={d % 30 ? 0.7 : 1.6} />; })}
            {SIGNS.map((s, i) => { const [x, y] = P(246, i * 30 + 15); const [nx, ny] = P(226, i * 30 + 15); return (<g key={s}><text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="30" fill="#4a5f27" transform={`rotate(${i * 30 + 15} ${x} ${y})`}>{s}</text><text x={nx} y={ny} textAnchor="middle" dominantBaseline="central" fontSize="8" letterSpacing="1.5" fill="#8a8d6e" transform={`rotate(${i * 30 + 15} ${nx} ${ny})`}>{NAMES[i].toUpperCase()}</text></g>); })}
          </g>
          {/* ring 2: planets on golden band */}
          <g className="st-r st-r2" filter="url(#wsh2)">
            <circle cx={C} cy={C} r="206" fill="url(#wg2)" />
            <circle cx={C} cy={C} r="160" fill="#fdf9ec" />
            {PLANETS.map((s, i) => { const [x, y] = P(183, i * 30 + 15); return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="24" fill="#5b3f0e" transform={`rotate(${i * 30 + 15} ${x} ${y})`}>{s}</text>; })}
            {Array.from({ length: 12 }, (_, i) => { const [x1, y1] = P(160, i * 30), [x2, y2] = P(206, i * 30); return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fdf9ec" strokeWidth="1.5" />; })}
          </g>
          {/* ring 3: houses */}
          <g className="st-r st-r3">
            <circle cx={C} cy={C} r="150" fill="none" stroke="#7d9448" strokeWidth="1.2" strokeDasharray="2 6" />
            <circle cx={C} cy={C} r="118" fill="url(#wg3)" opacity=".16" />
            {ROMAN.map((n, i) => { const [x, y] = P(134, i * 30 + 15); return <text key={n} x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="13" fill="#4a5f27" fontStyle="italic" transform={`rotate(${i * 30 + 15} ${x} ${y})`}>{n}</text>; })}
            <polygon points={[0, 1, 2].map((k) => P(112, k * 120).join(',')).join(' ')} stroke="#6f8a3d" strokeWidth="1.3" fill="rgba(201,214,163,.35)" />
            <polygon points={[0, 1, 2].map((k) => P(112, k * 120 + 60).join(',')).join(' ')} stroke="#d29a3a" strokeWidth="1.3" fill="rgba(210,154,58,.16)" />
          </g>
          {/* center compass star */}
          <g className="st-r st-r4" filter="url(#wsh2)">
            {Array.from({ length: 8 }, (_, i) => { const a = i * 45; const [tx, ty] = P(i % 2 ? 56 : 84, a); const [lx, ly] = P(16, a - 22.5), [rx, ry] = P(16, a + 22.5); return <polygon key={i} points={`${tx},${ty} ${lx},${ly} ${rx},${ry}`} fill={i % 2 ? '#c9d6a3' : 'url(#wg2)'} stroke="#8a6a1f" strokeWidth=".6" />; })}
          </g>
          <circle cx={C} cy={C} r="26" fill="url(#wg4)" stroke="#a8741f" strokeWidth="1.5" filter="url(#wsh2)" />
          <circle cx={C} cy={C} r="9" fill="#fffaf0" opacity=".85" />
          {/* highlight sheen */}
          <ellipse cx="230" cy="150" rx="150" ry="70" fill="#fff" opacity=".18" transform="rotate(-24 230 150)" />
        </svg>
      </div>
      <div className="st-floor" />
      <ul className="st-sr">{NAMES.map((n) => <li key={n}>{n}</li>)}</ul>
    </div>
  );
};
