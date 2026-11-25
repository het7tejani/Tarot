import { TarotArtwork } from '../components/TarotArtwork';
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from './Layout';
import { Wheel } from './Wheel';
const SIGN_DATES: Record<string, string> = { aries: 'Mar 21 - Apr 19', taurus: 'Apr 20 - May 20', gemini: 'May 21 - Jun 20', cancer: 'Jun 21 - Jul 22', leo: 'Jul 23 - Aug 22', virgo: 'Aug 23 - Sep 22', libra: 'Sep 23 - Oct 22', scorpio: 'Oct 23 - Nov 21', sagittarius: 'Nov 22 - Dec 21', capricorn: 'Dec 22 - Jan 19', aquarius: 'Jan 20 - Feb 18', pisces: 'Feb 19 - Mar 20' };
const SIGN_INFO = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'].map(n=>({n}));
import { ETSY_LISTINGS } from '../data/etsyListings';
import { FAQS, HOW_IT_WORKS_STEPS } from '../data/readingsData';
const GLYPH: Record<string, string> = { aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓' };
const CARDS = ['the_fool', 'the_magician', 'the_high_priestess', 'the_lovers', 'the_star', 'the_moon'];
const ChristmasSnow: React.FC = () => {
  const wrap = React.useRef<HTMLDivElement>(null);
  const cv = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const el = wrap.current, c = cv.current;
    if (!el || !c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    let w = 0, h = 0, raf = 0, visible = false, t0 = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { w = el.clientWidth; h = el.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    const n = w < 760 ? 70 : 140;
    const flakes = Array.from({ length: n }, (_, i) => { const z = Math.random(); return { x: Math.random() * w, y: Math.random() * h, z, r: 0.8 + z * 3.2, v: 18 + z * 62, ph: Math.random() * 6.28, i }; });
    const draw = (now: number) => {
      const dt = Math.min((now - t0) / 1000, 0.05); t0 = now;
      ctx.clearRect(0, 0, w, h);
      const wind = Math.sin(now / 2600) * 22;
      for (const f of flakes) {
        f.y += f.v * dt; f.x += (wind * (0.3 + f.z) + Math.sin(now / 900 + f.ph) * 14 * f.z) * dt;
        if (f.y > h + 8) { f.y = -8; f.x = Math.random() * w; }
        if (f.x > w + 8) f.x = -8; if (f.x < -8) f.x = w + 8;
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 2);
        g.addColorStop(0, `rgba(255,255,255,${0.55 + f.z * 0.45})`); g.addColorStop(0.5, `rgba(255,255,255,${0.25 + f.z * 0.2})`); g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 2, 0, 6.2832); ctx.fill();
      }
      if (visible) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible) { t0 = performance.now(); raf = requestAnimationFrame(draw); } }, { threshold: 0.05 });
    io.observe(el);
    window.addEventListener('resize', resize);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <div ref={wrap} className="xmas-snow" aria-hidden="true"><canvas ref={cv} /></div>;
};
const Pine: React.FC<{ x: number; y: number; h: number; fill: string; snow?: boolean }> = ({ x, y, h, fill, snow = true }) => {
  const w = h * 0.52; const t = 4;
  return <g>{Array.from({ length: t }, (_, i) => {
    const top = y - h + (h * i) / (t + 0.6), bot = y - h * 0.08 - ((t - 1 - i) * h) / (t + 1.4) * 0.0 + 0, tw = w * (0.45 + i * 0.2);
    const by = top + h * 0.38;
    return <g key={i}><path d={`M${x} ${top} L${x + tw / 2} ${by} L${x - tw / 2} ${by}Z`} fill={fill} />{snow && <path d={`M${x} ${top} L${x + tw * 0.2} ${top + (by - top) * 0.4} L${x + tw * 0.08} ${top + (by - top) * 0.36} L${x} ${top + (by - top) * 0.5} L${x - tw * 0.1} ${top + (by - top) * 0.36} L${x - tw * 0.2} ${top + (by - top) * 0.4}Z`} fill="#e9f3ff" opacity=".85" />}</g>;
  })}<rect x={x - 2} y={y - h * 0.1} width="4" height={h * 0.1} fill="#1a0f0c" /></g>;
};
const Reindeer: React.FC<{ x: number; nose?: boolean }> = ({ x, nose }) => <g transform={`translate(${x} 0)`} className="xm-gallop">
  <ellipse cx="0" cy="0" rx="17" ry="7" fill="#2a1710" stroke="#f6d77d" strokeWidth=".9" />
  <path d="M12 -3 22 -13 28 -11 26 -5 17 2Z" fill="#2a1710" stroke="#f6d77d" strokeWidth=".9" />
  <path d="M24 -13 22 -24 28 -20 M24 -14 31 -26 M22 -19 17 -23" stroke="#f6d77d" strokeWidth="1.3" fill="none" strokeLinecap="round" />
  <path d="M-12 5-20 17M-8 6-12 18M10 5 18 15M13 4 24 11" stroke="#2a1710" strokeWidth="3" strokeLinecap="round" /><path d="M-12 5-20 17M10 5 18 15" stroke="#f6d77d" strokeWidth=".6" />
  {nose && <circle cx="29" cy="-8" r="3" fill="#ff3b3b" className="xm-nose" />}
</g>;
const TIERS: Array<[number, number, number]> = [[-400, -306, 66], [-340, -230, 98], [-268, -144, 128], [-186, -52, 154], [-92, 22, 180]];
const tierPath = ([t, b, hw]: [number, number, number]) => {
  const n = 6, step = (2 * hw) / n;
  let d = `M0 ${t} Q${hw * 0.5} ${t + (b - t) * 0.45} ${hw} ${b - 10}`;
  for (let k = 0; k < n; k++) d += ` Q${hw - step * (k + 0.5)} ${b + 14} ${hw - step * (k + 1)} ${b - 10}`;
  d += ` Q${-hw * 0.5} ${t + (b - t) * 0.45} 0 ${t}Z`;
  return d;
};
const BALLS: Array<[number, number, string]> = [[-22, -330, '#d12a3c'], [18, -300, '#e8a93a'], [-52, -250, '#e8a93a'], [8, -230, '#d12a3c'], [56, -208, '#d12a3c'], [-84, -170, '#d12a3c'], [-20, -158, '#e8a93a'], [40, -128, '#e8a93a'], [92, -110, '#d12a3c'], [-108, -78, '#e8a93a'], [-48, -62, '#d12a3c'], [14, -44, '#d12a3c'], [70, -20, '#e8a93a'], [-120, 0, '#d12a3c'], [-62, 8, '#e8a93a'], [118, 6, '#d12a3c']];
const edgeAt = (y: number) => TIERS.reduce((m, [t, b, hw]) => (y >= t && y <= b + 10 ? Math.max(m, hw * Math.min(1, (y - t) / (b - t))) : m), 0);
const BALLS_IN = BALLS.map(([x, y, c]) => { const lim = Math.max(8, edgeAt(y) * 0.6); return [Math.max(-lim, Math.min(lim, x)), y, c] as [number, number, string]; });
const StandingTeam: React.FC = () => <g className="xm-stand">
  <ellipse cx="10" cy="4" rx="165" ry="8" fill="#9fb9d4" opacity=".55" />
  <g className="xm-reind">
    <g stroke="#8a5222" strokeWidth="7" strokeLinecap="round"><path d="M-104 -40 V-8" /><path d="M-54 -40 V-8" /></g>
    <g fill="#3a2012"><rect x="-109" y="-7" width="10" height="7" rx="2" /><rect x="-59" y="-7" width="10" height="7" rx="2" /></g>
    <path d="M-128 -66 C-128 -84 -100 -90 -76 -86 C-52 -84 -38 -74 -40 -58 C-42 -42 -56 -38 -72 -38 L-104 -38 C-120 -38 -128 -50 -128 -66Z" fill="#b5702f" stroke="#6b3d17" strokeWidth="1.4" />
    <ellipse cx="-88" cy="-45" rx="32" ry="7" fill="#f0d9a8" />
    <path d="M-124 -72 C-134 -86 -140 -98 -144 -106 L-128 -114 C-122 -102 -116 -90 -106 -82Z" fill="#b5702f" stroke="#6b3d17" strokeWidth="1.2" />
    <g stroke="#a0612a" strokeWidth="7" strokeLinecap="round"><path d="M-118 -42 V-8" /><path d="M-66 -42 V-8" /></g>
    <g fill="#3a2012"><rect x="-123" y="-7" width="10" height="7" rx="2" /><rect x="-71" y="-7" width="10" height="7" rx="2" /></g>
    <circle cx="-37" cy="-68" r="6" fill="#f0d9a8" />
    <path d="M-112 -84 Q-104 -62 -108 -42" stroke="#d12a3c" strokeWidth="5" fill="none" /><path d="M-100 -86 Q-92 -62 -96 -42" stroke="#d12a3c" strokeWidth="3" fill="none" />
    <circle cx="-109" cy="-62" r="3.2" fill="#f2c84b" /><circle cx="-110" cy="-52" r="3.2" fill="#f2c84b" />
    <path d="M-140 -118 C-134 -134 -128 -144 -126 -152 M-134 -132 L-124 -134 M-129 -144 L-136 -150" stroke="#cdb987" strokeWidth="3" fill="none" strokeLinecap="round" />
    <ellipse cx="-150" cy="-110" rx="15" ry="10" transform="rotate(-22 -150 -110)" fill="#b5702f" stroke="#6b3d17" strokeWidth="1.2" />
    <ellipse cx="-141" cy="-122" rx="4" ry="8" transform="rotate(25 -141 -122)" fill="#b5702f" stroke="#6b3d17" strokeWidth="1" /><ellipse cx="-141" cy="-122" rx="2" ry="5" transform="rotate(25 -141 -122)" fill="#f2a9a0" />
    <ellipse cx="-161" cy="-104" rx="8" ry="6.5" fill="#e8c39a" /><circle cx="-168" cy="-104" r="4.6" fill="#e0313f" /><circle cx="-169.5" cy="-105.5" r="1.4" fill="#fff" opacity=".8" />
    <circle cx="-153" cy="-114" r="2.4" fill="#1d0d06" /><circle cx="-152.3" cy="-114.8" r=".8" fill="#fff" />
    <path d="M-148 -120 C-152 -136 -148 -148 -142 -156 M-148 -130 L-158 -136 M-145 -142 L-136 -144 M-143 -150 L-150 -158" stroke="#e8d3a2" strokeWidth="3.6" fill="none" strokeLinecap="round" />
  </g>
  <path d="M-120 -78 Q-60 -64 -6 -70" stroke="#b3202f" strokeWidth="2" fill="none" />
  <g className="xm-santa">
    <rect x="-2" y="-34" width="15" height="34" rx="3" fill="#1f1410" /><rect x="22" y="-34" width="15" height="34" rx="3" fill="#1f1410" />
    <rect x="-5" y="-7" width="21" height="7" rx="3" fill="#2d1c14" /><rect x="19" y="-7" width="21" height="7" rx="3" fill="#2d1c14" />
    <path d="M-8 -34 C-12 -70 -6 -92 8 -100 C22 -104 36 -98 40 -84 C46 -64 44 -48 40 -34Z" fill="#d12a3c" stroke="#8f1c2b" strokeWidth="1.4" />
    <rect x="-10" y="-40" width="54" height="9" rx="4" fill="#fff" />
    <path d="M18 -98 V-42" stroke="#fff" strokeWidth="5" />
    <rect x="-8" y="-64" width="50" height="8" fill="#1f1410" /><rect x="13" y="-66" width="12" height="12" rx="1.5" fill="#f2c84b" stroke="#a07820" strokeWidth="1.2" /><rect x="16" y="-63" width="6" height="6" fill="#1f1410" />
    <path d="M2 -90 Q-14 -80 -6 -68" stroke="#d12a3c" strokeWidth="9" fill="none" strokeLinecap="round" /><circle cx="-6" cy="-66" r="6" fill="#fff" />
    <path d="M36 -90 C52 -96 58 -110 54 -124" stroke="#d12a3c" strokeWidth="9" fill="none" strokeLinecap="round" /><g className="xm-wave"><circle cx="54" cy="-130" r="7" fill="#fff" /><rect x="48" y="-126" width="12" height="5" rx="2" fill="#fff" /></g>
    <circle cx="19" cy="-113" r="13" fill="#f6d0b0" /><circle cx="11" cy="-109" r="3" fill="#f2a9a0" opacity=".7" /><circle cx="27" cy="-109" r="3" fill="#f2a9a0" opacity=".7" />
    <circle cx="14" cy="-116" r="1.6" fill="#2a1a12" /><circle cx="24" cy="-116" r="1.6" fill="#2a1a12" /><circle cx="19" cy="-111" r="3.2" fill="#ee9a90" />
    <path d="M5 -108 C3 -88 13 -78 20 -78 C28 -78 36 -90 34 -108 C30 -98 24 -96 19 -96 C13 -96 8 -100 5 -108Z" fill="#fff" stroke="#e1e6ec" strokeWidth="1" />
    <ellipse cx="13" cy="-104" rx="7" ry="3.5" fill="#fff" stroke="#e1e6ec" strokeWidth=".8" /><ellipse cx="25" cy="-104" rx="7" ry="3.5" fill="#fff" stroke="#e1e6ec" strokeWidth=".8" />
    <path d="M16 -97 Q19 -94 22 -97" stroke="#b3202f" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <path d="M4 -118 C6 -140 26 -148 40 -134 L47 -124 C34 -128 20 -126 4 -118Z" fill="#d12a3c" stroke="#8f1c2b" strokeWidth="1.2" />
    <ellipse cx="19" cy="-120" rx="17" ry="5.5" fill="#fff" stroke="#e1e6ec" strokeWidth=".8" />
    <path d="M32 -136 C48 -134 56 -122 54 -108" stroke="#d12a3c" strokeWidth="8" fill="none" strokeLinecap="round" /><circle cx="54" cy="-105" r="6" fill="#fff" />
  </g>
  <g transform="translate(-14 0)">
    <path d="M56 -52 C56 -24 74 -20 84 -20 L150 -20 C176 -22 176 -44 172 -60 C164 -38 150 -36 140 -36 L80 -36 C68 -38 62 -44 56 -52Z" fill="#c42536" stroke="#8f1c2b" strokeWidth="1.4" />
    <path d="M60 -48 C66 -40 72 -38 82 -38 L140 -38 C152 -38 162 -42 168 -54" stroke="#fff" strokeWidth="2.4" fill="none" />
    <path d="M52 -4 Q100 10 164 -4 Q184 -10 182 -28 Q180 -40 168 -36" stroke="#e2b650" strokeWidth="4.5" fill="none" strokeLinecap="round" /><circle cx="168" cy="-38" r="4.5" fill="#f6d77d" />
    <path d="M74 -20 V-5 M146 -20 V-6" stroke="#e2b650" strokeWidth="3" />
    <g fill="#fff" opacity=".9"><circle cx="90" cy="-28" r="2.6" /><circle cx="112" cy="-28" r="2.6" /><circle cx="134" cy="-28" r="2.6" /></g>
    <rect x="84" y="-62" width="24" height="26" fill="#2f9a63" /><rect x="94" y="-62" width="4" height="26" fill="#f6d77d" /><rect x="116" y="-56" width="22" height="20" fill="#e8a93a" /><rect x="125" y="-56" width="4" height="20" fill="#d12a3c" />
    <path d="M90 -62 Q96 -72 102 -62 Q96 -66 90 -62Z" fill="#f6d77d" />
  </g>
</g>;
const PosterTree: React.FC = () => <g className="xm-tree"><g transform="translate(310 592) scale(.78)">
  <ellipse cx="0" cy="26" rx="190" ry="14" fill="#0a2a3d" opacity=".35" />
  <rect x="-16" y="-8" width="32" height="34" rx="3" fill="#5b3420" /><rect x="-16" y="-8" width="10" height="34" fill="#7a4a2c" />
  {[...TIERS].reverse().map((t, i) => <g key={i}><path d={tierPath(t)} fill="#0b4a2c" transform="translate(4 6)" /><path d={tierPath(t)} fill="url(#xsT2)" /><path d={`M0 ${t[0] + 6} Q${-t[2] * 0.5} ${t[0] + (t[1] - t[0]) * 0.5} ${-t[2] + 10} ${t[1] - 12}`} stroke="#8fe08f" strokeOpacity=".5" strokeWidth="5" fill="none" strokeLinecap="round" /></g>)}
  {TIERS.map(([t, b, hw], i) => <path key={i} d={`M${-hw * 0.8} ${b - 24} Q${-hw * 0.4} ${b - 4} 0 ${b - 20} T${hw * 0.8} ${b - 24}`} stroke="#f6d77d" strokeWidth="3" strokeOpacity=".7" fill="none" strokeLinecap="round" />)}
  {Array.from({ length: 30 }, (_, i) => { const lv = i % 5, [t, b, hw] = TIERS[lv], f = ((i * 37) % 100) / 100, x = (f - 0.5) * 2 * hw * 0.78, y = b - 14 - Math.abs(x) * 0.06 - ((i * 13) % 40); return <g key={i} className="xm-bulb" style={{ animationDelay: `${(i % 8) * 0.28}s` }}><circle cx={x} cy={y} r="9" fill="url(#xsHalo)" /><circle cx={x} cy={y} r="2.8" fill="#fff4b0" /></g>; })}
  {BALLS_IN.map(([x, y, c], i) => <g key={i} className="xm-ball"><rect x={x - 3} y={y - 15} width="6" height="5" fill="#e8c35a" /><circle cx={x} cy={y} r="11" style={{ color: c }} fill="url(#xsBall)" /><ellipse cx={x - 4} cy={y - 4} rx="3.4" ry="2.2" fill="#fff" opacity=".85" /></g>)}
  {[[-70, -120], [60, -178], [-30, -262]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><path d="M0 0 -16 -10 -16 10Z M0 0 16 -10 16 10Z" fill="#c8202f" stroke="#8d1220" strokeWidth="1" /><circle r="4" fill="#e8a93a" /></g>)}
  <g className="xm-star"><circle cy="-418" r="62" fill="url(#xsHalo)" /><path d="M0 -450 10 -424 38 -424 15 -406 24 -378 0 -394 -24 -378 -15 -406 -38 -424 -10 -424Z" fill="url(#xsGold)" stroke="#fff3c4" strokeWidth="1.5" /></g>
  {[[-150, -300, 1], [150, -330, 1.2], [-190, -150, .8], [200, -200, 1], [120, -440, .8], [-110, -420, 1]].map(([x, y, sc], i) => <path key={i} className="xm-bulb" style={{ animationDelay: `${i * 0.4}s` }} transform={`translate(${x} ${y}) scale(${sc})`} d="M0 -12 3 -3 12 0 3 3 0 12 -3 3 -12 0 -3 -3Z" fill="#fff3b0" />)}
</g></g>;
const PosterGifts: React.FC = () => <g>
  <g transform="translate(450 602)">
    <rect x="-34" y="-62" width="68" height="62" rx="3" fill="#c52a3a" /><rect x="-34" y="-62" width="14" height="62" fill="#e0475a" opacity=".6" /><rect x="-34" y="-62" width="68" height="12" rx="3" fill="#a81f2e" />
    <rect x="-6" y="-62" width="12" height="62" fill="url(#xsGold)" /><rect x="-34" y="-30" width="68" height="10" fill="url(#xsGold)" />
    <path d="M0 -62 Q-30 -96 -22 -66 Z M0 -62 Q30 -96 22 -66 Z" fill="url(#xsGold)" stroke="#9c7222" strokeWidth="1" /><circle cy="-64" r="6" fill="#f6d77d" />
  </g>
  <g transform="translate(388 602)"><rect x="-22" y="-34" width="44" height="34" rx="2" fill="#e8a93a" /><rect x="-22" y="-34" width="10" height="34" fill="#f6cf6a" opacity=".7" /><rect x="-4" y="-34" width="8" height="34" fill="#c52a3a" /><path d="M0 -34 Q-16 -52 -10 -38 Z M0 -34 Q16 -52 10 -38 Z" fill="#c52a3a" /></g>
  <g transform="translate(505 602)"><rect x="-20" y="-28" width="40" height="28" rx="2" fill="#b8283a" /><rect x="-4" y="-28" width="8" height="28" fill="url(#xsGold)" /><path d="M0 -28 Q-14 -44 -9 -32 Z M0 -28 Q14 -44 9 -32 Z" fill="url(#xsGold)" /></g>
  <g transform="translate(150 602)"><rect x="-26" y="-36" width="52" height="36" rx="2" fill="#c52a3a" /><rect x="-5" y="-36" width="10" height="36" fill="url(#xsGold)" /><path d="M0 -36 Q-18 -56 -12 -40 Z M0 -36 Q18 -56 12 -40 Z" fill="url(#xsGold)" /></g>
  <g transform="translate(556 604)"><ellipse cx="0" cy="-2" rx="24" ry="6" fill="#0a2a3d" opacity=".3" />
    <path d="M-12 -62 Q0 -84 12 -62" stroke="#3a2a14" strokeWidth="3" fill="none" /><rect x="-14" y="-62" width="28" height="6" rx="2" fill="#4a3216" /><rect x="-16" y="-8" width="32" height="6" rx="2" fill="#4a3216" />
    <rect x="-13" y="-56" width="26" height="48" rx="3" fill="url(#xsWin)" className="xm-win" opacity=".95" /><path d="M-13 -40H13M0 -56V-8" stroke="#4a3216" strokeWidth="2" /><ellipse cx="0" cy="-34" rx="44" ry="34" fill="url(#xsHalo)" />
    <g transform="translate(26 -2)"><path d="M0 0 12 -8 4 4Z M0 0 -12 -8 -4 4Z" fill="#2f8a4a" /><circle cx="-3" cy="2" r="3.2" fill="#d12a3c" /><circle cx="3" cy="3" r="3.2" fill="#d12a3c" /></g>
  </g>
</g>;
const Cabin: React.FC<{ t: string; cls: string }> = ({ t, cls }) => <g className={`xm-cabin ${cls}`}><g transform={t}>
    <rect x="-52" y="0" width="104" height="62" fill="#6b3f26" /><g stroke="#4c2a18" strokeWidth="1.2"><path d="M-52 12H52M-52 24H52M-52 36H52M-52 48H52" /></g>
    <path d="M-66 4 0 -40 66 4Z" fill="#3a2230" /><path d="M-70 6 0 -44 70 6 62 8 0 -34 -62 8Z" fill="#f4f9ff" />
    <rect x="30" y="-40" width="14" height="26" fill="#5a3a30" /><rect x="28" y="-44" width="18" height="6" fill="#f4f9ff" />
    <rect x="-38" y="16" width="26" height="22" fill="url(#xsWin)" className="xm-win" /><rect x="14" y="16" width="26" height="22" fill="url(#xsWin)" className="xm-win b" /><path d="M-25 16V38M-38 27H-12M27 16V38M14 27H40" stroke="#5a3a1c" strokeWidth="1.5" />
    <rect x="-9" y="30" width="18" height="32" rx="2" fill="#7a1f2e" /><circle cx="5" cy="47" r="1.6" fill="#f6d77d" />
    <ellipse cx="0" cy="62" rx="50" ry="5" fill="#ffd27a" opacity=".35" />
    <g className="xm-smoke">{[0, 1, 2, 3].map((i) => <circle key={i} cx="37" cy="-48" r={6 + i * 2} fill="#f4f9ff" style={{ animationDelay: `${i * 1.2}s` }} />)}</g>
</g></g>;
const ChristmasScene: React.FC = () => {
  const sceneRef = React.useRef<SVGSVGElement>(null);
  React.useEffect(() => {
    const svg = sceneRef.current;
    const title = svg?.closest('.st-xmas')?.querySelector('.sale-copy');
    if (!svg || !title) return;
    const update = () => {
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      const box = title.getBoundingClientRect();
      const inverse = matrix.inverse();
      const a = new DOMPoint(box.left, box.top).matrixTransform(inverse);
      const b = new DOMPoint(box.right, box.bottom).matrixTransform(inverse);
      const rect = svg.querySelector('#xsTextBlur rect');
      rect?.setAttribute('x', String(a.x)); rect?.setAttribute('y', String(a.y));
      rect?.setAttribute('width', String(b.x-a.x)); rect?.setAttribute('height', String(b.y-a.y));
      svg.querySelector('#xsTextClear path')?.setAttribute('d', `M-5000 -5000H5000V5000H-5000Z M${a.x} ${a.y}H${b.x}V${b.y}H${a.x}Z`);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(svg); observer.observe(title);
    document.fonts.ready.then(update);
    window.addEventListener('resize', update);
    return () => { observer.disconnect(); window.removeEventListener('resize', update); };
  }, []);
  return <svg ref={sceneRef} className="xm-scene" viewBox="0 0 1260 640" preserveAspectRatio="xMidYMax meet" overflow="visible" role="presentation" aria-hidden="true">
  <defs>
    <clipPath id="xsTextBlur" clipPathUnits="userSpaceOnUse"><rect x="0" y="0" width="0" height="0" /></clipPath>
    <clipPath id="xsTextClear" clipPathUnits="userSpaceOnUse"><path clipRule="evenodd" d="M-5000 -5000H5000V5000H-5000Z" /></clipPath>
    <radialGradient id="xsMoon" cx=".4" cy=".4" r=".8"><stop offset="0" stopColor="#fffbe6" /><stop offset="1" stopColor="#e9d9a4" /></radialGradient>
    <radialGradient id="xsHalo"><stop offset="0" stopColor="#fff3c4" stopOpacity=".5" /><stop offset="1" stopColor="#fff3c4" stopOpacity="0" /></radialGradient>
    <linearGradient id="xsHill" gradientUnits="userSpaceOnUse" x1="0" y1="470" x2="0" y2="640"><stop offset="0" stopColor="#f4f9ff" /><stop offset="1" stopColor="#b9d2ea" /></linearGradient>
    <linearGradient id="xsMtn" gradientUnits="userSpaceOnUse" x1="0" y1="250" x2="0" y2="470"><stop offset="0" stopColor="#35557c" /><stop offset="1" stopColor="#14283f" /></linearGradient>
    <radialGradient id="xsT2" cx=".4" cy=".35" r=".85"><stop offset="0" stopColor="#4cb36a" /><stop offset=".55" stopColor="#1f7a45" /><stop offset="1" stopColor="#0c4a2b" /></radialGradient>
    <linearGradient id="xsT1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2f9a63" /><stop offset="1" stopColor="#0d4d33" /></linearGradient>
    <linearGradient id="xsGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff0b8" /><stop offset=".55" stopColor="#e2b650" /><stop offset="1" stopColor="#9c7222" /></linearGradient>
    <radialGradient id="xsBall" cx=".35" cy=".3" r=".9"><stop offset="0" stopColor="#fff" stopOpacity=".9" /><stop offset=".25" stopColor="currentColor" /><stop offset="1" stopColor="#2a0a10" /></radialGradient>
    <radialGradient id="xsWin" r=".8"><stop offset="0" stopColor="#fff1b0" /><stop offset="1" stopColor="#f5a43a" /></radialGradient>
  </defs>
  <circle cx="470" cy="170" r="170" fill="url(#xsHalo)" className="xm-halo2" />
  <circle cx="470" cy="170" r="58" fill="url(#xsMoon)" />
  <g fill="#cdbb86" opacity=".5"><circle cx="452" cy="154" r="11" /><circle cx="490" cy="188" r="8" /><circle cx="478" cy="146" r="5" /><circle cx="448" cy="190" r="6" /></g>
  <g clipPath="url(#xsTextClear)"><g className="xm-sleigh"><image href="/xmas/santa-flying.webp" x="0" y="0" width="250" height="141" /></g></g>
  <g clipPath="url(#xsTextBlur)"><g style={{ filter: 'blur(1px)' }}><g className="xm-sleigh"><image href="/xmas/santa-flying.webp" x="0" y="0" width="250" height="141" /></g></g></g>
  <path d="M-1500 400 L-1330 300 L-1180 360 L-980 270 L-760 360 L-560 290 L-380 380 L-190 310 L0 400 V470 H-1500Z" fill="url(#xsMtn)" opacity=".9" />
  <path d="M1200 390 L1330 310 L1470 360 L1650 280 L1850 360 L2050 300 L2250 380 L2400 330 L2700 400 V470 H1200Z" fill="url(#xsMtn)" opacity=".9" />
  <path d="M-1500 400 L-1330 300 L-1180 360 L-980 270 L-760 360 L-560 290 L-380 380 L-190 310 L0 400 V470 H-1500Z" fill="url(#xsMtn)" opacity=".9" />
  <path d="M1200 390 L1330 300 L1470 360 L1650 280 L1850 360 L2050 300 L2250 380 L2400 330 L2700 400 V470 H1200Z" fill="url(#xsMtn)" opacity=".9" />
  <path className="xm-shoot" d="M980 190 L900 240" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  <path d="M0 400 L90 300 L150 350 L250 250 L350 360 L430 300 L560 400 L690 290 L790 350 L890 270 L1010 380 L1100 320 L1200 390 V470 H0Z" fill="url(#xsMtn)" opacity=".9" />
  <g fill="#e9f3ff" opacity=".9"><path d="M250 250 218 291 238 284 250 300 262 284 282 291Z" /><path d="M690 290 664 325 680 319 690 334 702 319 716 325Z" /><path d="M890 270 862 308 880 301 890 318 902 301 920 308Z" /></g>
  {[40, 120, 205, 300, 600, 700, 790, 880, 970, 1060, 1150].map((x, i) => <Pine key={`f${i}`} x={x} y={470 + (i % 3) * 6} h={90 + (i % 4) * 14} fill="#0e3a3a" snow={false} />)}
  <path d="M-1500 520 H0 Q150 470 330 505 T620 500 T900 510 T1200 485 H2700 V900 H-1500Z" fill="url(#xsHill)" />
  <path d="M-1500 560 H0 Q200 520 420 555 T800 548 T1200 540 H2700 V900 H-1500Z" fill="#dcebf7" />
  <Cabin cls="xm-cab-d" t="translate(1196 500) scale(.56)" />
  <Cabin cls="xm-cab-m" t="translate(740 476) scale(.82)" />
  {[[830, 545, 60], [900, 552, 80], [1010, 540, 90]].map(([x, y, h], i) => <Pine key={`m${i}`} x={x} y={y + 14} h={h} fill="#14684a" />)}
  <g className="xm-st-d" transform="translate(1152 606) scale(.66)"><StandingTeam /></g>
  <g className="xm-st-m" transform="translate(735 608) scale(.52)"><StandingTeam /></g>
  <PosterTree />
  <PosterGifts />
  <g stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" transform="translate(70 592) rotate(-14)"><path d="M0 0V-46Q0-60 14-60T26-48" stroke="#f4f9ff" /><path d="M0 -8 3 -12M0 -20 3 -24M0 -32 3 -36" stroke="#d12a3c" /></g>
  <g stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" transform="translate(948 608) rotate(8)"><path d="M0 0V-46Q0-60 14-60T26-48" stroke="#f4f9ff" /><path d="M0 -8 3 -12M0 -20 3 -24M0 -32 3 -36" stroke="#d12a3c" /></g>
</svg>;
};
const HeroSlider: React.FC = () => {
  const [idx, setIdx] = React.useState(0);
  const ref = React.useRef<HTMLElement>(null);
  const [hold, setHold] = React.useState(0); // >0 while hovered/touched or just after a manual click
  const [tick, setTick] = React.useState(0);
  const rollTimer = React.useRef<number | undefined>(undefined);
  const idleTimer = React.useRef<number | undefined>(undefined);
  const pause = () => { window.clearTimeout(idleTimer.current); setHold(1); };
  const resumeSoon = (ms: number) => { window.clearTimeout(idleTimer.current); idleTimer.current = window.setTimeout(() => setHold(0), ms); };
  React.useEffect(() => () => window.clearTimeout(idleTimer.current), []);
  const go = (n: number) => {
    const w = ref.current?.querySelector('.hs-wheel') as HTMLElement | null;
    if (w && ref.current) {
      // true rolling: rotation = distance / radius, distance = enough to clear the left screen edge
      const r = w.getBoundingClientRect();
      const d = (idx === 0 ? r.right : r.right - (parseFloat(ref.current.style.getPropertyValue('--roll-x')) || 0)) + 24;
      ref.current.style.setProperty('--roll-x', `${-Math.max(d, r.width)}px`);
      ref.current.style.setProperty('--roll-r', `${-(Math.max(d, r.width) / (r.width / 2)) * (180 / Math.PI)}deg`);
    }
    if (ref.current) {
      ref.current.dataset.rolling = '1';
      window.clearTimeout(rollTimer.current);
      rollTimer.current = window.setTimeout(() => { if (ref.current) delete ref.current.dataset.rolling; }, 1350);
    }
    setIdx(n);
  };
  const manual = (n: number) => { pause(); go(n); resumeSoon(12000); };
  React.useEffect(() => {
    if (hold || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => { if (!document.hidden) go(idx === 0 ? 1 : 0); else setTick((x) => x + 1); }, 7000);
    return () => window.clearTimeout(t);
  }, [idx, hold, tick]);
  return (
    <section ref={ref} className="st-hero st-hero-slider" data-slide={idx} aria-roledescription="carousel" aria-label="Featured" onMouseEnter={pause} onMouseLeave={() => resumeSoon(2000)} onTouchStart={pause} onTouchEnd={() => resumeSoon(8000)} onFocus={pause} onBlur={() => resumeSoon(2000)}>
      <div className="hs-stage">
        <div className="wrap in hs-slide hs-a" aria-hidden={idx !== 0} inert={idx !== 0 ? (true as any) : undefined}>
          <div className="hs-copy">
            <span className="eyebrow">Tarot · Horoscopes · Readings</span>
            <h1>Psychic and tarot readings for love, career and the question on your mind.</h1>
            <p className="lead">Draw a free card, read today's horoscope, or explore personal reading topics.</p>
            <div className="cta"><Link className="btn" to="/free-tarot">Draw a free card</Link><Link className="btn ghost" to="/shop">Explore personal readings</Link></div>
          </div>
          <div className="hs-wheel"><Wheel /></div>
        </div>
        <div className="wrap in hs-slide hs-b" aria-hidden={idx !== 1} inert={idx !== 1 ? (true as any) : undefined}>
          <div className="hs-copy">
            <span className="eyebrow">Personal readings</span>
            <h2 className="hs-h">Personal readings for the question on your mind.</h2>
            <p className="lead">Explore reading topics from love to career, each with its own page and details.</p>
            <div className="cta"><Link className="btn" to="/shop">Explore readings</Link><Link className="btn ghost" to="/faq">Read the FAQ</Link></div>
          </div>
          <div className="hs-cards" aria-hidden="true">
            {['the_star', 'the_lovers', 'the_moon'].map((c) => <TarotArtwork key={c} src={`/tarot/${c}.jpg`} alt="" loading="lazy" fetchPriority="low" sizes="(max-width: 700px) 100px, 170px" width={200} height={300} />)}
          </div>
        </div>
      </div>
      <button type="button" className="hs-arrow hs-prev" aria-label="Previous slide" onClick={() => manual(0)} disabled={idx === 0}>‹</button>
      <button type="button" className="hs-arrow hs-next" aria-label="Next slide" onClick={() => manual(1)} disabled={idx === 1}>›</button>
    </section>
  );
};
export const Home: React.FC = () => (
  <Layout>
    <HeroSlider />
    <div className="st-strip"><Link to="/free-tarot">Free tarot</Link>✦<Link to="/horoscope">Daily horoscope</Link>✦<Link to="/love-horoscope">Love guidance</Link>✦<Link to="/tarot-card-meanings">Card meanings</Link>✦<Link to="/angel-numbers">Angel numbers</Link>✦<Link to="/shop">Personal readings</Link></div>
    <section className="st-xmas" aria-labelledby="christmas-title">
      <style>{`
        .st-xmas{position:relative;isolation:isolate;background:linear-gradient(180deg,#061a2c 0%,#0b2f3c 38%,#0d4a3e 72%,#0a2f27 100%);padding:46px 0 60px;min-height:640px;overflow:hidden;color:#fdf3dc;border-top:3px solid #c9a24a}
        .st-xmas .xm-stars{position:absolute;inset:0;z-index:-3;pointer-events:none;background-image:radial-gradient(1.4px 1.4px at 8% 12%,#fff,transparent),radial-gradient(1px 1px at 22% 30%,#fff,transparent),radial-gradient(1.6px 1.6px at 37% 9%,#ffe9a8,transparent),radial-gradient(1px 1px at 52% 24%,#fff,transparent),radial-gradient(1.5px 1.5px at 66% 14%,#fff,transparent),radial-gradient(1px 1px at 78% 33%,#ffe9a8,transparent),radial-gradient(1.5px 1.5px at 90% 10%,#fff,transparent),radial-gradient(1px 1px at 14% 52%,#fff,transparent),radial-gradient(1.2px 1.2px at 94% 48%,#fff,transparent);animation:xm-stars 5s ease-in-out infinite alternate}
        @keyframes xm-stars{from{opacity:.55}to{opacity:1}}
        .st-xmas .xm-aurora{position:absolute;inset:-20% -10% 30% -10%;z-index:-2;pointer-events:none;filter:blur(46px);opacity:.55;background:radial-gradient(40% 50% at 25% 40%,#2fd39a66,transparent 70%),radial-gradient(35% 45% at 65% 30%,#5b8cff55,transparent 70%),radial-gradient(30% 40% at 85% 55%,#c45bff3a,transparent 70%);animation:xm-aurora 14s ease-in-out infinite alternate}
        @keyframes xm-aurora{from{transform:translateX(-4%) scaleY(.9)}to{transform:translateX(5%) scaleY(1.12)}}
        .st-xmas .xmas-snow{position:absolute;inset:0;z-index:3;pointer-events:none}
        .st-xmas .xmas-snow canvas{width:100%;height:100%;display:block}
        .st-xmas .lights{position:absolute;left:0;right:0;top:0;height:44px;z-index:4;pointer-events:none}
        .st-xmas .lights svg{width:100%;height:44px;display:block}
        .st-xmas .lights .bulb{animation:xm-twinkle 2.4s ease-in-out infinite}
        .st-xmas .xm-cab-m{display:none}
        .st-xmas .xm-scene{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}.st-xmas .xm-reind{animation:xm-nod 3.2s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}.st-xmas .xm-wave{animation:xm-wv 1.1s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 50%}@keyframes xm-nod{from{transform:rotate(-1deg)}to{transform:rotate(1.5deg)}}@keyframes xm-wv{from{transform:translate(-4px,3px)}to{transform:translate(4px,-3px)}}
        .st-xmas .xm-sleigh{animation:xm-fly 26s linear infinite}
        @keyframes xm-fly{0%{transform:translate(1800px,150px)}50%{transform:translate(700px,110px)}100%{transform:translate(-600px,170px)}}
        .st-xmas .xm-gallop{animation:xm-gal .5s ease-in-out infinite alternate;transform-box:fill-box}
        @keyframes xm-gal{from{transform:translateY(-2px) rotate(-2deg)}to{transform:translateY(3px) rotate(2deg)}}
        .st-xmas .xm-nose{animation:xm-twinkle 1s ease-in-out infinite;filter:drop-shadow(0 0 5px #f00)}
        .st-xmas .xm-shoot{stroke-dasharray:80;stroke-dashoffset:80;opacity:0;animation:xm-shoot 9s ease-out infinite 3s}
        @keyframes xm-shoot{0%{opacity:0;stroke-dashoffset:80;transform:translate(60px,-30px)}4%{opacity:1}12%{opacity:0;stroke-dashoffset:-80;transform:translate(-100px,50px)}100%{opacity:0}}
        .st-xmas .xm-halo2{animation:xm-pulse 6s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}
        .st-xmas .xm-win{animation:xm-flicker 3.2s ease-in-out infinite}.st-xmas .xm-win.b{animation-delay:-1.4s}
        @keyframes xm-flicker{0%,100%{opacity:1}45%{opacity:.78}60%{opacity:.95}}
        .st-xmas .xm-smoke circle{opacity:0;animation:xm-smoke 5s ease-out infinite}
        @keyframes xm-smoke{0%{opacity:.7;transform:translate(0,0) scale(.6)}100%{opacity:0;transform:translate(34px,-90px) scale(1.8)}}
        .st-xmas .xm-ball{animation:xm-sway 4s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% -60%}
        @keyframes xm-sway{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}
        .st-xmas .xm-star{animation:xm-glow2 2.6s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}
        @keyframes xm-glow2{from{opacity:.75;transform:scale(.95)}to{opacity:1;transform:scale(1.08)}}
        .st-xmas .xm-bulb{animation:xm-twinkle 2.2s ease-in-out infinite}
        .st-xmas .sale-in{grid-template-columns:1.15fr 1fr}
        .st-xmas .sale-in{display:grid;grid-template-columns:1.2fr 1fr;align-items:center;gap:24px;min-height:540px;position:relative;z-index:auto}
        .st-xmas .xmas-art{display:flex;align-items:center;justify-content:center}
        .st-xmas .xm-orb{width:min(500px,100%);height:auto;overflow:visible;filter:drop-shadow(0 20px 30px #0008)}
        .st-xmas .xm-spin-a,.st-xmas .xm-spin-b{transform-box:view-box;transform-origin:0 0}
        .st-xmas .xm-spin-a{animation:xm-rot 80s linear infinite}
        .st-xmas .xm-spin-b{animation:xm-rot 55s linear infinite reverse}
        @keyframes xm-rot{to{transform:rotate(360deg)}}
        .st-xmas .xm-float{animation:xm-float 5s ease-in-out infinite alternate}
        @keyframes xm-float{from{transform:translateY(-6px)}to{transform:translateY(8px)}}
        .st-xmas .xm-halo{animation:xm-pulse 4s ease-in-out infinite alternate;transform-box:view-box;transform-origin:0 0}
        @keyframes xm-pulse{from{opacity:.6;transform:scale(.95)}to{opacity:1;transform:scale(1.06)}}
        .st-xmas .xm-bulb{animation:xm-twinkle 2.2s ease-in-out infinite}
        .st-xmas .xm-twinkle{animation:xm-twinkle 2.8s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
        @keyframes xm-twinkle{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.7)}}
        .st-xmas .sale-copy::before{content:'';position:absolute;inset:-30px -40px;z-index:-1;background:radial-gradient(closest-side,#041a2bd9 0%,#041a2b99 60%,transparent 100%)}
        .st-xmas .sale-copy>*{position:relative;z-index:2}.st-xmas .sale-copy{z-index:auto;grid-column:2;text-align:center;position:relative;padding:16px 0;text-shadow:0 2px 12px #02101a}
        .st-xmas .sale-season{display:block;font-size:12px;letter-spacing:.25em;text-transform:uppercase;color:#f1d58b;margin-bottom:10px;font-weight:600}
        .st-xmas h2{margin:0;color:#f6d77d;font-size:clamp(50px,5.6vw,76px);line-height:1.04;font-style:normal;font-weight:800;text-shadow:2px 4px 0 #6e1620}
        .st-xmas .sale-word{display:block;font-family:Georgia,serif;font-size:clamp(46px,6.4vw,92px);line-height:1.12;letter-spacing:.06em;font-style:normal;font-weight:900;background:linear-gradient(180deg,#fffbe8,#f6d77d 55%,#d9a93a);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:none;filter:drop-shadow(2px 4px 0 #8f1c2b)}
        .st-xmas .sale-price{display:flex;justify-content:center;align-items:baseline;gap:15px;margin:18px 0 8px}
        .st-xmas .sale-price strong{font-size:62px;line-height:1;font-weight:600;color:#fff8ea;letter-spacing:-.04em}
        .st-xmas .sale-price span{font-size:12px;color:#d9ead7}
        .st-xmas .sale-sub{font-size:14px;line-height:1.65;color:#e4f0e1;max-width:350px;margin:12px auto 22px}
        .st-xmas .sale-cta{text-shadow:none;display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:12px 37px;background:linear-gradient(180deg,#e03348,#b3202f);color:#fff7e6;border:1px solid #f1d58b;border-radius:6px;font-size:15px;font-weight:800;letter-spacing:.08em;box-shadow:0 0 0 0 #f6d77d99;animation:xm-cta 2.6s ease-out infinite}
        @keyframes xm-cta{0%{box-shadow:0 0 0 0 #f6d77d88}70%,100%{box-shadow:0 0 0 16px #f6d77d00}}
        .st-xmas .sale-cta:hover{background:linear-gradient(180deg,#f0485c,#c42a3a);color:#fff}
        .st-xmas .sale-cta:focus-visible{outline:3px solid white;outline-offset:5px}
        @media(prefers-reduced-motion:reduce){.st-xmas *{animation:none!important}.st-xmas .xmas-snow{display:none}}
        .st-xmas .xm-st-m{display:none}@media(min-width:1800px){.st-xmas .xm-st-d{transform:translate(1182px,606px) scale(.66)}}@media(max-width:760px){.st-xmas .xm-st-d{display:none}.st-xmas .xm-st-m{display:inline}.st-xmas .xm-cab-d{display:none}.st-xmas .xm-cab-m{display:inline}.st-xmas{padding:46px 0 70px;min-height:0}.st-xmas .sale-in{grid-template-columns:1fr;gap:6px;min-height:0}.st-xmas .xm-scene{height:330px;width:620px;max-width:none;left:-70px;top:34px;bottom:auto;overflow:hidden;-webkit-mask-image:linear-gradient(180deg,#000 88%,transparent);mask-image:linear-gradient(180deg,#000 88%,transparent)}.st-xmas .xmas-art{height:336px}.st-xmas .sale-copy{grid-column:1;padding:4px 0 0}.st-xmas h2{font-size:clamp(38px,11vw,54px)}.st-xmas .sale-word{font-size:clamp(34px,10vw,60px);letter-spacing:.04em}.st-xmas .sale-price strong{font-size:52px}}
      `}</style>
      <div className="xm-stars" aria-hidden="true" />
      <div className="xm-aurora" aria-hidden="true" />
      <div className="lights" aria-hidden="true"><svg viewBox="0 0 1200 44" preserveAspectRatio="none"><path d="M0 4 Q150 30 300 4 T600 4 T900 4 T1200 4" fill="none" stroke="#06140f" strokeWidth="2" /><circle className="bulb" cx={40} cy={12} r="5" fill="#ff5468" style={{ animationDelay: "0.00s", filter: "drop-shadow(0 0 6px #ff5468)" }} /><circle className="bulb" cx={100} cy={12} r="5" fill="#ffd166" style={{ animationDelay: "0.25s", filter: "drop-shadow(0 0 6px #ffd166)" }} /><circle className="bulb" cx={160} cy={12} r="5" fill="#6fe3a8" style={{ animationDelay: "0.50s", filter: "drop-shadow(0 0 6px #6fe3a8)" }} /><circle className="bulb" cx={220} cy={12} r="5" fill="#82c8ff" style={{ animationDelay: "0.75s", filter: "drop-shadow(0 0 6px #82c8ff)" }} /><circle className="bulb" cx={280} cy={12} r="5" fill="#ff5468" style={{ animationDelay: "1.00s", filter: "drop-shadow(0 0 6px #ff5468)" }} /><circle className="bulb" cx={340} cy={12} r="5" fill="#ffd166" style={{ animationDelay: "1.25s", filter: "drop-shadow(0 0 6px #ffd166)" }} /><circle className="bulb" cx={400} cy={12} r="5" fill="#6fe3a8" style={{ animationDelay: "1.50s", filter: "drop-shadow(0 0 6px #6fe3a8)" }} /><circle className="bulb" cx={460} cy={12} r="5" fill="#82c8ff" style={{ animationDelay: "1.75s", filter: "drop-shadow(0 0 6px #82c8ff)" }} /><circle className="bulb" cx={520} cy={12} r="5" fill="#ff5468" style={{ animationDelay: "2.00s", filter: "drop-shadow(0 0 6px #ff5468)" }} /><circle className="bulb" cx={580} cy={12} r="5" fill="#ffd166" style={{ animationDelay: "2.25s", filter: "drop-shadow(0 0 6px #ffd166)" }} /><circle className="bulb" cx={640} cy={12} r="5" fill="#6fe3a8" style={{ animationDelay: "2.50s", filter: "drop-shadow(0 0 6px #6fe3a8)" }} /><circle className="bulb" cx={700} cy={12} r="5" fill="#82c8ff" style={{ animationDelay: "2.75s", filter: "drop-shadow(0 0 6px #82c8ff)" }} /><circle className="bulb" cx={760} cy={12} r="5" fill="#ff5468" style={{ animationDelay: "3.00s", filter: "drop-shadow(0 0 6px #ff5468)" }} /><circle className="bulb" cx={820} cy={12} r="5" fill="#ffd166" style={{ animationDelay: "3.25s", filter: "drop-shadow(0 0 6px #ffd166)" }} /><circle className="bulb" cx={880} cy={12} r="5" fill="#6fe3a8" style={{ animationDelay: "3.50s", filter: "drop-shadow(0 0 6px #6fe3a8)" }} /><circle className="bulb" cx={940} cy={12} r="5" fill="#82c8ff" style={{ animationDelay: "3.75s", filter: "drop-shadow(0 0 6px #82c8ff)" }} /><circle className="bulb" cx={1000} cy={12} r="5" fill="#ff5468" style={{ animationDelay: "4.00s", filter: "drop-shadow(0 0 6px #ff5468)" }} /><circle className="bulb" cx={1060} cy={12} r="5" fill="#ffd166" style={{ animationDelay: "4.25s", filter: "drop-shadow(0 0 6px #ffd166)" }} /><circle className="bulb" cx={1120} cy={12} r="5" fill="#6fe3a8" style={{ animationDelay: "4.50s", filter: "drop-shadow(0 0 6px #6fe3a8)" }} /><circle className="bulb" cx={1180} cy={12} r="5" fill="#82c8ff" style={{ animationDelay: "4.75s", filter: "drop-shadow(0 0 6px #82c8ff)" }} /></svg></div>
      <ChristmasScene />
      <ChristmasSnow />
      <div className="wrap sale-in">
        <div className="xmas-art" aria-hidden="true" />
        <div className="sale-copy">
          <span className="sale-season">The Psychic Studio presents</span>
          <h2 id="christmas-title">Christmas<span className="sale-word">READINGS</span></h2>
          <p className="sale-price"><strong>from $5</strong><span>USD / reading</span></p>
          <p className="sale-sub">A quiet season for a clear question.<br />Email the studio your question and we reply personally with the next step.</p>
          <Link className="sale-cta" to="/shop">SHOP NOW</Link>
        </div>
      </div>
    </section>
    <section className="st-sec"><div className="wrap">
      <span className="eyebrow">Your sign</span><h2>Read today's horoscope</h2><p className="sub">Daily guidance for every sign, with the dates each sign covers.</p>
      <div className="st-horo-grid">{[0, 1].map((col) => <div key={col}>{SIGN_INFO.slice(col * 6, col * 6 + 6).map((s) => <Link key={s.n} className="st-horo-row" to={`/horoscope/${s.n}`}><span className="sg">{GLYPH[s.n]}{'\uFE0E'}</span><span className="sn">{s.n[0].toUpperCase() + s.n.slice(1)}</span><span className="sd">{SIGN_DATES[s.n]}</span><span className="sa">{'\u2192'}</span></Link>)}</div>)}</div>
      <div className="st-horo-res">
        <div><h3>Zodiac guides</h3><Link to="/zodiac">Zodiac signs</Link><Link to="/zodiac-compatibility">Zodiac compatibility</Link><Link to="/mercury-retrograde">Mercury retrograde</Link></div>
        <div><h3>Numbers and charts</h3><Link to="/angel-numbers">Angel numbers</Link><Link to="/numerology">Numerology</Link><Link to="/birth-chart">Birth chart</Link><Link to="/rising-sign">Rising sign</Link></div>
        <div><h3>Love and spirit</h3><Link to="/love-tarot-reading">Love tarot reading</Link><Link to="/love-horoscope">Love horoscope</Link><Link to="/spirit-animal">Spirit animal</Link></div>
      </div>
    </div></section>
    <section className="st-sec alt"><div className="wrap">
      <span className="eyebrow">Tarot library</span><h2>Tarot card meanings: all 78 cards</h2><p className="sub">Upright and reversed meanings for love, career and life, one page for every card.</p>
      <div className="st-tarot">{CARDS.map((c) => <Link key={c} to={`/tarot-card-meanings/${c.replace(/_/g, '-')}`}><TarotArtwork src={`/tarot/${c}.jpg`} alt={c.replace(/_/g, ' ')} sizes="(max-width: 700px) 28vw, 170px" loading="lazy" /></Link>)}</div>
      <p style={{ marginTop: 26 }}><Link className="btn ghost" to="/tarot-card-meanings">Browse all card meanings</Link></p>
    </div></section>
    <section className="st-sec"><div className="wrap">
      <span className="eyebrow">Personal readings</span><h2>Personal reading topics</h2><p className="sub">Love, personal growth and life questions. Explore a topic and contact the studio to learn more.</p>
      <div className="st-grid c3 st-readings-home">{ETSY_LISTINGS.slice(0, 3).map((r) => (
        <Link key={r.id} className="st-card st-reading-feature" to={`/readings/${r.slug}`}><TarotArtwork src={r.img} alt={r.title.split(" | ")[0]} loading="lazy" /><h3>{r.title.split(' | ')[0]}</h3><p>{r.description}</p><p><strong>${r.price} USD</strong></p></Link>))}</div>
      <p style={{ marginTop: 26 }}><Link className="btn" to="/shop">View all readings</Link></p>
    </div></section>
    <section className="st-sec alt st-home-practical"><div className="wrap st-home-practical-grid"><div>
      <span className="eyebrow">How it works</span><h2>Three simple steps</h2>
      <div className="st-home-steps">{HOW_IT_WORKS_STEPS.map((x) => (
        <div key={x.stepNumber} className="st-card"><span className="st-num">{x.stepNumber}</span><h3>{x.title}</h3><p>{x.description}</p></div>))}</div>
    </div><div>
      <span className="eyebrow">Questions</span><h2>Good to know</h2>
      <div className="st-faq">{FAQS.slice(0, 5).map((f) => (<details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>))}</div>
      <p style={{ marginTop: 24 }}><Link className="btn ghost" to="/faq">All questions</Link></p>
    </div></div></section>
  </Layout>
);
