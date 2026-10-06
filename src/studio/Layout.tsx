import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './studio.css';
import { RouteSEO } from '../components/RouteSEO';
export const ETSY = 'https://www.etsy.com/shop/PsychicEra';
const NAV: [string, string][] = [['/', 'Home'], ['/shop', 'Shop'], ['/free-tarot', 'Free Tarot'], ['/horoscope', 'Horoscope'], ['/tarot-card-meanings', 'Card Meanings'], ['/blog', 'Blog'], ['/about', 'About'], ['/contact', 'Contact']];
export const Layout: React.FC<{ children: React.ReactNode; seo?: boolean }> = ({ children, seo = true }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="st">
      {seo && <RouteSEO />}
      <header className="st-head"><div className="wrap in">
        <Link to="/" className="st-logo"><i />The Psychic Studio</Link>
        <button className="st-burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button>
        <nav className={'st-nav' + (open ? ' open' : '')}>
          {NAV.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'on' : '')}>{l}</NavLink>)}
        </nav>
      </div></header>
      <main>{children}</main>
      <footer className="st-foot"><div className="wrap">
        <div className="cols">
          <div><div className="st-logo" style={{ color: '#f4ecdc' }}><i />The Psychic Studio</div><p style={{ fontSize: 14, opacity: .75, maxWidth: 280 }}>Tarot, horoscopes and personal readings by Daisy Hayes.</p></div>
          <div><h4>Explore</h4><ul><li><Link to="/shop">Shop</Link></li><li><Link to="/free-tarot">Free tarot draw</Link></li><li><Link to="/blog">Blog</Link></li><li><Link to="/about">About Daisy</Link></li><li><Link to="/contact">Contact</Link></li></ul></div>
          <div><h4>Horoscopes</h4><ul><li><Link to="/horoscope">Daily horoscope</Link></li><li><Link to="/love-horoscope">Love horoscope</Link></li><li><Link to="/zodiac-signs">Zodiac signs</Link></li><li><Link to="/compatibility">Compatibility</Link></li></ul></div>
          <div><h4>Tarot</h4><ul><li><Link to="/tarot-card-meanings">Card meanings</Link></li><li><Link to="/angel-numbers">Angel numbers</Link></li><li><a href={ETSY} target="_blank" rel="noopener noreferrer">Etsy shop</a></li></ul></div>
        </div>
        <small>© The Psychic Studio by Daisy Hayes. For entertainment and personal reflection only; not medical, legal or financial advice.</small>
      </div></footer>
    </div>
  );
};
