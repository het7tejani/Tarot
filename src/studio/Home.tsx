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
export const Home: React.FC = () => (
  <Layout>
    <section className="st-hero"><div className="wrap in">
      <div>
        <span className="eyebrow">Tarot · Horoscopes · Readings</span>
        <h1>Psychic and tarot readings for a clearer perspective.</h1>
        <p className="lead">Draw a free card, read today's horoscope, or explore personal reading topics.</p>
        <div className="cta"><Link className="btn" to="/free-tarot">Draw a free card</Link><Link className="btn ghost" to="/shop">See my readings</Link></div>
      </div>
      <Wheel />
    </div></section>
    <div className="st-strip"><span>Free tarot</span>✦<span>Daily horoscope</span>✦<span>Love guidance</span>✦<span>Card meanings</span>✦<span>Angel numbers</span>✦<span>Personal readings</span></div>
    <section className="st-halloween" aria-labelledby="halloween-title">
      <style>{`
        .st-halloween{padding:54px 0 30px;background:linear-gradient(115deg,#f5eddc,#f9f5eb 65%);overflow:hidden}
        .st-halloween .sale-in{display:grid;grid-template-columns:1.1fr 1fr;align-items:center;gap:36px}
        .st-halloween .eyebrow{color:#925b32}
        .st-halloween h2{font-size:clamp(34px,4vw,54px);line-height:1.08;margin:14px 0 18px;font-weight:500;font-style:italic;max-width:560px}
        .st-halloween .sale-copy{max-width:460px;color:var(--ink2);line-height:1.7}
        .st-halloween .sale-price{display:flex;align-items:baseline;gap:14px;margin:20px 0 24px}
        .st-halloween .sale-price del{font-size:24px;color:#716954}
        .st-halloween .sale-price strong{font-size:46px;font-weight:500;color:var(--leaf-d)}
        .st-halloween .sale-price span{font-size:13px;color:var(--ink2)}
        .st-halloween .sale-art{position:relative;height:360px;isolation:isolate}
        .st-halloween .sale-art svg{position:absolute;inset:0;width:100%;height:100%;z-index:-1}
        .st-halloween .sale-card{position:absolute;top:42px;width:134px;border:5px solid #fcfaf3;border-radius:9px;box-shadow:0 14px 30px #4a3d2424}
        .st-halloween .sale-card.moon{left:calc(50% - 115px);transform:rotate(-13deg)}
        .st-halloween .sale-card.star{left:calc(50% - 14px);top:60px;transform:rotate(10deg)}
        @media(max-width:760px){.st-halloween{padding:38px 0 12px}.st-halloween .sale-in{grid-template-columns:1fr;gap:8px}.st-halloween .sale-art{height:295px}.st-halloween .sale-card{width:114px;top:26px}.st-halloween .sale-card.star{top:40px}.st-halloween h2{font-size:38px}}
      `}</style>
      <div className="wrap sale-in">
        <div>
          <span className="eyebrow">Halloween sale</span>
          <h2 id="halloween-title">A little mystery.<br />A clearer perspective.</h2>
          <p className="sale-copy">As the nights grow longer, make a little space for reflection. Explore personal readings for love, life questions and the path ahead.</p>
          <p className="sale-price"><del>$79</del><strong>$29</strong><span>USD / reading</span></p>
          <Link className="btn" to="/shop">Explore the Halloween sale</Link>
        </div>
        <div className="sale-art" aria-hidden="true">
          <svg viewBox="0 0 440 360" fill="none">
            <circle cx="227" cy="173" r="137" fill="#e8dfc7" />
            <circle cx="227" cy="173" r="154" stroke="#a58d63" strokeOpacity=".3" strokeDasharray="2 8" />
            <path d="M337 30a29 29 0 1 0 30 39 29 29 0 0 1-30-39Z" fill="#b49a5f" />
            <path d="m85 61 3 10 10 3-10 3-3 10-3-10-10-3 10-3Zm278 142 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" fill="#b49a5f" />
            <ellipse cx="220" cy="325" rx="137" ry="12" fill="#a5967526" />
            <path d="M101 288c-24-5-42 14-32 36 5 11 21 16 38 12 17 4 34-1 39-12 9-22-9-41-33-36" fill="#ba784b" />
            <ellipse cx="107" cy="311" rx="19" ry="27" fill="#ce8c57" />
            <path d="M107 287c-4-10-1-16 6-20" stroke="#697450" strokeWidth="7" strokeLinecap="round" />
            <path d="M88 294c-7 15-7 25 0 35m38-35c7 15 7 25 0 35" stroke="#a76942" strokeWidth="2" />
            <rect x="329" y="278" width="19" height="52" rx="3" fill="#e4d4ae" />
            <path d="M338 274c-15-10-4-17 0-28 5 11 15 18 0 28Z" fill="#c99b50" />
            <path d="M309 330h59" stroke="#7e7759" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <img className="sale-card moon" src="/tarot/the_moon.jpg" alt="" loading="lazy" width="134" height="224" />
          <img className="sale-card star" src="/tarot/the_star.jpg" alt="" loading="lazy" width="134" height="224" />
        </div>
      </div>
    </section>
    <section className="st-sec"><div className="wrap">
      <span className="eyebrow">Your sign</span><h2>Read today's horoscope</h2>
      <div className="st-grid c4">{SIGN_INFO.map((s) => <Link key={s.n} className="st-sign" to={`/horoscope/${s.n}`}><b>{GLYPH[s.n]}{'\uFE0E'}</b>{s.n[0].toUpperCase() + s.n.slice(1)}</Link>)}</div>
    </div></section>
    <section className="st-sec alt"><div className="wrap">
      <span className="eyebrow">Tarot library</span><h2>Tarot card meanings: all 78 cards</h2><p className="sub">Upright and reversed meanings for love, career and life, one page for every card.</p>
      <div className="st-tarot">{CARDS.map((c) => <Link key={c} to={`/tarot-card-meanings/${c.replace(/_/g, '-')}`}><TarotArtwork src={`/tarot/${c}.jpg`} alt={c.replace(/_/g, ' ')} loading="lazy" /></Link>)}</div>
      <p style={{ marginTop: 26 }}><Link className="btn ghost" to="/tarot-card-meanings">Browse all card meanings</Link></p>
    </div></section>
    <section className="st-sec"><div className="wrap">
      <span className="eyebrow">Personal readings</span><h2>Personal reading topics</h2><p className="sub">Love, personal growth and life questions. Explore a topic and contact the studio to learn more.</p>
      <div className="st-grid c3">{ETSY_LISTINGS.slice(0, 3).map((r) => (
        <Link key={r.id} className="st-card st-reading-feature" to={`/readings/${r.slug}`}><TarotArtwork src={r.img} alt={r.title.split(" | ")[0]} loading="lazy" /><h3>{r.title.split(' | ')[0]}</h3><p>{r.description}</p><p><del style={{opacity:.5}}>$79</del> <strong>$29 USD</strong></p></Link>))}</div>
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
