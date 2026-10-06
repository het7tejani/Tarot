import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, ETSY } from './Layout';
import { Wheel } from './Wheel';
import { SIGN_INFO } from '../data/seoPages';
import { ETSY_LISTINGS } from '../data/etsyListings';
const GLYPH: Record<string, string> = { aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓' };
const CARDS = ['the_fool', 'the_magician', 'the_high_priestess', 'the_lovers', 'the_star', 'the_moon'];
export const Home: React.FC = () => (
  <Layout>
    <section className="st-hero"><div className="wrap in">
      <div>
        <span className="eyebrow">Tarot · Horoscopes · Readings</span>
        <h1>Find your answers in the stars and the cards.</h1>
        <p className="lead">Hi, I'm Daisy Hayes. Draw a free card, read today's horoscope, or order a personal reading from my Etsy shop.</p>
        <div className="cta"><Link className="btn" to="/free-tarot">Draw a free card</Link><Link className="btn ghost" to="/shop">See my readings</Link></div>
      </div>
      <Wheel />
    </div></section>
    <div className="st-strip"><span>Free tarot</span>✦<span>Daily horoscope</span>✦<span>Love guidance</span>✦<span>Card meanings</span>✦<span>Angel numbers</span>✦<span>Personal readings</span></div>
    <section className="st-sec"><div className="wrap">
      <span className="eyebrow">Your sign</span><h2>Read today's horoscope</h2>
      <div className="st-grid c4">{SIGN_INFO.map((s) => <Link key={s.n} className="st-sign" to={`/horoscope/${s.n}`}><b>{GLYPH[s.n]}</b>{s.n[0].toUpperCase() + s.n.slice(1)}</Link>)}</div>
    </div></section>
    <section className="st-sec alt"><div className="wrap">
      <span className="eyebrow">Tarot library</span><h2>78 cards, explained plainly</h2><p className="sub">Upright and reversed meanings for love, career and life, one page for every card.</p>
      <div className="st-tarot">{CARDS.map((c) => <Link key={c} to={`/tarot-card-meanings/${c.replace(/_/g, '-')}`}><img src={`/tarot/${c}.jpg`} alt={c.replace(/_/g, ' ')} loading="lazy" /></Link>)}</div>
      <p style={{ marginTop: 26 }}><Link className="btn ghost" to="/tarot-card-meanings">Browse all card meanings</Link></p>
    </div></section>
    <section className="st-sec"><div className="wrap">
      <span className="eyebrow">Personal readings</span><h2>Ask Daisy</h2><p className="sub">Every reading is listed on Etsy. Pick one here, and you'll check out safely on Etsy.</p>
      <div className="st-grid c3">{ETSY_LISTINGS.slice(0, 3).map((r) => (
        <a key={r.id} className="st-card" href={r.url} target="_blank" rel="noopener noreferrer"><h3>{r.title.split(' | ')[0]}</h3><p>{r.title.split(' | ').slice(1, 3).join(' · ')}</p></a>))}</div>
      <p style={{ marginTop: 26 }}><Link className="btn" to="/shop">View all readings</Link></p>
    </div></section>
  </Layout>
);
