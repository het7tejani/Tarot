import { TarotArtwork } from '../components/TarotArtwork';
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from './Layout';
import { Wheel } from './Wheel';
const SIGN_INFO = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'].map(n=>({n}));
import { ETSY_LISTINGS } from '../data/etsyListings';
import { FAQS, HOW_IT_WORKS_STEPS } from '../data/readingsData';
const GLYPH: Record<string, string> = { aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓' };
const CARDS = ['the_fool', 'the_magician', 'the_high_priestess', 'the_lovers', 'the_star', 'the_moon'];
const HalloweenBats: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`sale-bats${active ? ' is-active' : ''}`} aria-hidden="true">
    {Array.from({ length: 7 }, (_, i) => <svg key={i} className="sale-bat" viewBox="0 0 100 50" style={{ '--i': i, '--y': `${8 + (i % 4) * 13}%`, '--size': `${28 + (i % 3) * 12}px` } as React.CSSProperties}>
      <path d="M50 19 45 10 43 22C31 10 18 5 1 7L12 23 20 20 25 34 34 27 42 39 50 31 58 39 66 27 75 34 80 20 88 23 99 7C82 5 69 10 57 22L55 10Z" />
    </svg>)}
  </div>;
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
            {['the_star', 'the_lovers', 'the_moon'].map((c) => <TarotArtwork key={c} src={`/tarot/${c}.jpg`} alt="" loading="lazy" width={200} height={300} />)}
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
    <section className="st-halloween" aria-labelledby="halloween-title">
      <style>{`
        .st-halloween{position:relative;isolation:isolate;background:radial-gradient(ellipse at 18% 44%,#da6827 0%,#9d351c 40%,#3b1412 78%,#190f10 100%);padding:46px 0;min-height:620px;overflow:hidden;color:#fff6df;border-top:3px solid #dd852d;border-bottom:3px solid #dd852d}
        .st-halloween:before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(0deg,#170b1055,transparent 25%,transparent 85%,#190d1233);z-index:-1}
        .st-halloween .sale-in{display:grid;grid-template-columns:1.3fr 1fr;align-items:center;gap:32px;min-height:526px}
        .st-halloween .sale-art{position:absolute;inset:0;z-index:-1;pointer-events:none}
        .st-halloween .sale-art img{display:block;width:100%;height:100%;object-fit:cover;object-position:left 64%;mask-image:linear-gradient(90deg,#000 0%,#000 35%,#000c 48%,#0004 64%,transparent 84%);-webkit-mask-image:linear-gradient(90deg,#000 0%,#000 35%,#000c 48%,#0004 64%,transparent 84%)}
        .st-halloween .sale-copy{z-index:1;grid-column:2;text-align:center;position:relative;padding:16px 0;text-shadow:0 2px 10px #190b10}
        .st-halloween .sale-season{display:block;font-size:12px;letter-spacing:.25em;text-transform:uppercase;color:#ffd189;margin-bottom:10px;font-weight:600}
        .st-halloween h2{margin:0;color:#ffcd70;font-size:clamp(52px,6vw,80px);line-height:1.04;font-style:italic;font-weight:800;text-shadow:2px 4px 0 #5a1b10}
        .st-halloween .sale-word{position:relative;display:block;font-family:Georgia,serif;font-size:clamp(76px,9vw,116px);line-height:1.12;letter-spacing:.08em;font-style:normal;font-weight:900;color:#fff4dc;text-shadow:2px 5px 0 #7e2717,0 8px 22px #21090e66}
        .st-halloween .sale-badge{text-shadow:none;display:inline-flex;align-items:center;gap:8px;margin:24px 0 12px;padding:10px 22px;background:#ffd17b;color:#49140e;font-size:clamp(19px,2.5vw,27px);font-weight:800;letter-spacing:.045em;transform:rotate(-2deg);box-shadow:4px 5px 0 #54170e}
        .st-halloween .sale-price{display:flex;justify-content:center;align-items:baseline;gap:15px;margin:18px 0 8px}
        .st-halloween .sale-price del{font-size:27px;color:#e4baa0}
        .st-halloween .sale-price strong{font-size:62px;line-height:1;font-weight:600;color:#fff7e8;letter-spacing:-.04em}
        .st-halloween .sale-price span{font-size:12px;color:#f9d3af}
        .st-halloween .sale-sub{font-size:14px;line-height:1.65;color:#ffdfbf;max-width:350px;margin:12px auto 22px}
        .st-halloween .sale-cta{text-shadow:none;display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:12px 37px;background:#ffb641;color:#3a110c;border:1px solid #ffdc8c;border-radius:6px;font-size:15px;letter-spacing:.1em;font-weight:800;box-shadow:0 5px 0 #752913,0 0 28px #ff971533;text-decoration:none}
        .st-halloween .sale-cta:hover{background:#ffd078;color:#3a110c}
        .st-halloween .sale-cta:focus-visible{outline:3px solid white;outline-offset:5px}
        .st-halloween .sale-bats{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
        .st-halloween .sale-bat{position:absolute;left:-70px;top:var(--y);width:var(--size);fill:#160e15;opacity:0;filter:drop-shadow(0 1px 1px #faad4633)}
        .st-halloween .sale-bats.is-active .sale-bat{animation:sale-bat-flight 8s calc(var(--i) * .35s) ease-in-out both}
        .st-halloween .sale-bats.is-active .sale-bat path{transform-origin:50% 50%;animation:sale-bat-flap .34s ease-in-out infinite alternate}
        @keyframes sale-bat-flight{0%{opacity:0;transform:translate(0,60px) rotate(-12deg)}8%{opacity:.85}35%{transform:translate(35vw,-30px) rotate(9deg)}65%{opacity:.85;transform:translate(70vw,22px) rotate(-7deg)}100%{opacity:0;transform:translate(calc(100vw + 150px),-80px) rotate(8deg)}}
        @keyframes sale-bat-flap{from{transform:scaleY(.6)}to{transform:scaleY(1)}}
        @media(prefers-reduced-motion:reduce){.st-halloween .sale-bats{display:none}.st-halloween .sale-bat,.st-halloween .sale-bat path{animation:none!important}}
        @media(max-width:760px){.st-halloween{padding:0 0 38px;min-height:0;background:#351411}.st-halloween .sale-in{grid-template-columns:1fr;gap:0;min-height:0}.st-halloween .sale-art{height:450px}.st-halloween .sale-art img{object-position:40% center;mask-image:linear-gradient(180deg,#000 0%,#000 42%,#000b 65%,transparent 100%);-webkit-mask-image:linear-gradient(180deg,#000 0%,#000 42%,#000b 65%,transparent 100%)}.st-halloween .sale-copy{grid-column:1;padding:330px 0 0}.st-halloween h2{font-size:54px}.st-halloween .sale-word{font-size:87px}.st-halloween .sale-badge{font-size:23px;margin-top:22px}.st-halloween .sale-price strong{font-size:56px}.st-halloween .sale-season{font-size:10px}.st-halloween .sale-sub{max-width:300px}}
        @media(max-width:350px){.st-halloween h2{font-size:46px}.st-halloween .sale-word{font-size:76px}.st-halloween .sale-badge{font-size:20px;padding:10px 16px}}
      `}</style>
      <HalloweenBats />
      <div className="wrap sale-in">
        <div className="sale-art" aria-hidden="true"><img src="/perf-assets/halloween-reading.webp" srcSet="/perf-assets/halloween-reading-400.webp 400w, /perf-assets/halloween-reading-560.webp 560w, /perf-assets/halloween-reading-800.webp 800w, /perf-assets/halloween-reading.webp 1100w" sizes="(max-width: 760px) 100vw, 45vw" loading="lazy" decoding="async" alt="" width="1100" height="733" /></div>
        <div className="sale-copy">
          <span className="sale-season">The Psychic Studio presents</span>
          <h2 id="halloween-title">Halloween<span className="sale-word">SALE</span></h2>
          <div className="sale-badge">UP TO 94% OFF</div>
          <p className="sale-price"><del>$79</del><strong>from $5</strong><span>USD / reading</span></p>
          <p className="sale-sub">A night of mystery. A moment for you.<br />Order by email: the studio replies personally with payment and delivery details, usually within a day.</p>
          <Link className="sale-cta" to="/shop">SHOP NOW</Link>
        </div>
      </div>
    </section>
    <section className="st-sec"><div className="wrap">
      <span className="eyebrow">Your sign</span><h2>Read today's horoscope</h2>
      <div className="st-grid c4">{SIGN_INFO.map((s) => <Link key={s.n} className="st-sign" to={`/horoscope/${s.n}`}><b>{GLYPH[s.n]}{'\uFE0E'}</b>{s.n[0].toUpperCase() + s.n.slice(1)}</Link>)}</div>
      <p style={{ marginTop: 26, display: 'flex', flexWrap: 'wrap', gap: '10px 20px', fontWeight: 600, fontSize: 14 }}>
        <Link to="/zodiac">Zodiac signs</Link><Link to="/zodiac-compatibility">Zodiac compatibility</Link><Link to="/angel-numbers">Angel numbers</Link><Link to="/numerology">Numerology</Link><Link to="/birth-chart">Birth chart</Link><Link to="/rising-sign">Rising sign</Link><Link to="/spirit-animal">Spirit animal</Link><Link to="/love-tarot-reading">Love tarot reading</Link><Link to="/love-horoscope">Love horoscope</Link><Link to="/mercury-retrograde">Mercury retrograde</Link>
      </p>
    </div></section>
    <section className="st-sec alt"><div className="wrap">
      <span className="eyebrow">Tarot library</span><h2>Tarot card meanings: all 78 cards</h2><p className="sub">Upright and reversed meanings for love, career and life, one page for every card.</p>
      <div className="st-tarot">{CARDS.map((c) => <Link key={c} to={`/tarot-card-meanings/${c.replace(/_/g, '-')}`}><TarotArtwork src={`/tarot/${c}.jpg`} alt={c.replace(/_/g, ' ')} sizes="(max-width: 700px) 28vw, 170px" loading="lazy" /></Link>)}</div>
      <p style={{ marginTop: 26 }}><Link className="btn ghost" to="/tarot-card-meanings">Browse all card meanings</Link></p>
    </div></section>
    <section className="st-sec"><div className="wrap">
      <span className="eyebrow">Personal readings</span><h2>Personal reading topics</h2><p className="sub">Love, personal growth and life questions. Explore a topic and contact the studio to learn more.</p>
      <div className="st-grid c3 st-readings-home">{ETSY_LISTINGS.slice(0, 3).map((r) => (
        <Link key={r.id} className="st-card st-reading-feature" to={`/readings/${r.slug}`}><TarotArtwork src={r.img} alt={r.title.split(" | ")[0]} loading="lazy" /><h3>{r.title.split(' | ')[0]}</h3><p>{r.description}</p><p><del style={{opacity:.5}}>$79</del> <strong>${r.price} USD</strong></p></Link>))}</div>
      <p style={{ marginTop: 26 }}><Link className="btn" to="/shop">View all readings</Link></p>
    </div></section>
    <section className="st-sec alt"><div className="wrap">
      <span className="eyebrow">How it works</span><h2>Three simple steps</h2>
      <div className="st-grid c3">{HOW_IT_WORKS_STEPS.map((x) => (
        <div key={x.stepNumber} className="st-card"><span className="st-num">{x.stepNumber}</span><h3>{x.title}</h3><p>{x.description}</p></div>))}</div>
    </div></section>
    <section className="st-sec alt"><div className="wrap">
      <span className="eyebrow">Questions</span><h2>Good to know</h2>
      <div className="st-faq">{FAQS.slice(0, 5).map((f) => (<details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>))}</div>
      <p style={{ marginTop: 24 }}><Link className="btn ghost" to="/faq">All questions</Link></p>
    </div></section>
  </Layout>
);
