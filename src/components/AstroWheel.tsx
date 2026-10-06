import React from 'react';

const SIGNS = ['♈\uFE0E', '♉\uFE0E', '♊\uFE0E', '♋\uFE0E', '♌\uFE0E', '♍\uFE0E', '♎\uFE0E', '♏\uFE0E', '♐\uFE0E', '♑\uFE0E', '♒\uFE0E', '♓\uFE0E'];
const NAMES = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

export const AstroWheel: React.FC = () => {
  const c = 300;
  const pt = (r: number, deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [c + r * Math.cos(a), c + r * Math.sin(a)];
  };
  const ticks = Array.from({ length: 72 }, (_, i) => i);
  return (
    <div className="wheel-wrap" aria-hidden="true">
      <svg viewBox="0 0 600 600" role="img" aria-label="Zodiac wheel">
        <defs>
          <radialGradient id="sunG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff1c2" />
            <stop offset="55%" stopColor="#e0a93b" />
            <stop offset="100%" stopColor="#a8741a" />
          </radialGradient>
        </defs>
        <g className="spin-slow" fill="none" stroke="#5b6d2e">
          <circle cx={c} cy={c} r="292" strokeOpacity=".55" />
          <circle cx={c} cy={c} r="226" strokeOpacity=".6" />
          <circle cx={c} cy={c} r="206" strokeOpacity=".25" />
          {ticks.map((i) => {
            const [x1, y1] = pt(292, i * 5);
            const [x2, y2] = pt(i % 6 === 0 ? 276 : 284, i * 5);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity={i % 6 === 0 ? 0.9 : 0.4} />;
          })}
          {SIGNS.map((_, i) => {
            const [x1, y1] = pt(226, i * 30 - 15);
            const [x2, y2] = pt(292, i * 30 - 15);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity=".5" />;
          })}
          {SIGNS.map((g, i) => {
            const [x, y] = pt(259, i * 30);
            return (
              <text key={g} x={x} y={y} fill="#3e4b1f" stroke="none" fontSize="30" textAnchor="middle" dominantBaseline="central" transform={`rotate(${i * 30} ${x} ${y})`}>
                {g}
                <title>{NAMES[i]}</title>
              </text>
            );
          })}
        </g>
        <g className="spin-rev" fill="none" stroke="#8a9a54">
          <circle cx={c} cy={c} r="176" strokeOpacity=".5" strokeDasharray="2 8" />
          <circle cx={c} cy={c} r="150" strokeOpacity=".35" />
          <polygon points={[0, 1, 2].map((k) => pt(150, k * 120).join(',')).join(' ')} strokeOpacity=".6" />
          <polygon points={[0, 1, 2].map((k) => pt(150, k * 120 + 60).join(',')).join(' ')} strokeOpacity=".6" />
          {[0, 72, 144, 216, 288].map((d) => {
            const [x, y] = pt(176, d);
            return <circle key={d} cx={x} cy={y} r="6" fill="#d99a2b" stroke="none" />;
          })}
        </g>
        <g className="spin-mid" fill="none" stroke="#5b6d2e" strokeOpacity=".5">
          <circle cx={c} cy={c} r="104" />
          {Array.from({ length: 12 }, (_, i) => {
            const [x, y] = pt(104, i * 30);
            return <line key={i} x1={c} y1={c} x2={x} y2={y} strokeOpacity=".3" />;
          })}
        </g>
        <g className="float">
          <circle cx={c} cy={c} r="56" fill="url(#sunG)" />
          {Array.from({ length: 16 }, (_, i) => {
            const [x1, y1] = pt(62, i * 22.5);
            const [x2, y2] = pt(i % 2 ? 76 : 88, i * 22.5);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d99a2b" strokeWidth="2" strokeLinecap="round" />;
          })}
        </g>
      </svg>
    </div>
  );
};
