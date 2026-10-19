import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './studio.css';
import { RouteSEO } from '../components/RouteSEO';
const NAV: [string, string][] = [['/', 'Home'], ['/shop', 'Shop'], ['/free-tarot', 'Free Tarot'], ['/horoscope', 'Horoscope'], ['/tarot-card-meanings', 'Card Meanings'], ['/blog', 'Blog'], ['/about', 'About'], ['/contact', 'Contact']];
const REVEAL_SEL = 'main section:not(:first-child) h2, main section:not(:first-child) .st-card, main .st-prod, main article, main .st-sec > .wrap > p, main .faq > div, main .st-grid > *, main .grid > article';
const useReveal = (pathname: string) => {
  useEffect(() => {
    if (pathname === '/free-tarot' || typeof window === 'undefined' || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('js-rv');
    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    const scan = () => document.querySelectorAll<HTMLElement>(REVEAL_SEL).forEach(el => {
      if (seen.has(el)) return;
      seen.add(el);
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // first screen stays visible: no LCP hit
      const i = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--d', Math.min(i, 5) * 140 + 'ms');
      el.classList.add('rv');
      io.observe(el);
    });
    const t = window.setTimeout(scan, 50);
    const mo = new MutationObserver(() => scan());
    const main = document.querySelector('main');
    if (main) mo.observe(main, { childList: true, subtree: true });
    return () => { window.clearTimeout(t); mo.disconnect(); io.disconnect(); root.classList.remove('js-rv'); };
  }, [pathname]);
};
export const Layout: React.FC<{ children: React.ReactNode; seo?: boolean }> = ({ children, seo = true }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  useReveal(pathname);
  return (
    <div className="st">
      {seo && <RouteSEO />}
      <header className="st-head"><div className="wrap in">
        <Link to="/" className="st-logo"><img className="st-brand-mark" src="/navbar-96.webp" srcSet="/navbar-96.webp 96w, /navbar-192.webp 192w" sizes="40px" width="40" height="44.667" alt="" />The Psychic Studio</Link>
        <button className="st-burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button>
        <nav className={'st-nav' + (open ? ' open' : '')}>
          {NAV.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'on' : '')}>{l}</NavLink>)}
        </nav>
      </div></header>
      <main>{children}</main>
      <footer className="st-foot"><div className="wrap">
        <div className="cols">
          <div><div className="st-logo" style={{ color: "var(--leaf-d)" }}><img className="st-brand-mark" src="/navbar-96.webp" srcSet="/navbar-96.webp 96w, /navbar-192.webp 192w" sizes="40px" width="40" height="44.667" alt="" />The Psychic Studio</div><p style={{ fontSize: 14, opacity: .75, maxWidth: 280 }}>Tarot, horoscopes and personal readings.</p></div>
          <div><h2 className="st-footer-heading">Explore</h2><ul><li><Link to="/shop">Shop</Link></li><li><Link to="/free-tarot">Free tarot draw</Link></li><li><Link to="/blog">Blog</Link></li><li><Link to="/about">About the studio</Link></li><li><Link to="/contact">Contact</Link></li></ul></div>
          <div><h2 className="st-footer-heading">Horoscopes</h2><ul><li><Link to="/horoscope">Daily horoscope</Link></li><li><Link to="/love-horoscope">Love horoscope</Link></li><li><Link to="/zodiac">Zodiac signs</Link></li><li><Link to="/zodiac-compatibility">Compatibility</Link></li></ul></div>
          <div><h2 className="st-footer-heading">Tarot</h2><ul><li><Link to="/tarot-card-meanings">Card meanings</Link></li><li><Link to="/angel-numbers">Angel numbers</Link></li><li><Link to="/contact">Contact the studio</Link></li></ul></div>
        </div>
        <nav aria-label="Follow The Psychic Studio" className="st-social" style={{ marginTop: 28 }}>
          <a href="https://about.me/thepsychicstudio" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontSize: 13 }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.158 9.897v4.131h.65v-.408c.23.297.577.483.961.483.768 0 1.332-.582 1.332-1.573 0-.967-.558-1.568-1.332-1.568-.372 0-.719.168-.96.49V9.897Zm10.285.322v.818h-.495v.563h.495v1.729c0 .501.26.774.769.774.297 0 .49-.087.607-.192l-.155-.496a.4.4 0 0 1-.285.112c-.186 0-.285-.155-.285-.36V11.6h.607v-.563h-.607v-.818zm-5.488.743c-.954 0-1.536.706-1.536 1.567 0 .855.582 1.574 1.536 1.574s1.537-.719 1.537-1.574c0-.86-.583-1.567-1.537-1.567m14.577 0c-.886 0-1.518.7-1.518 1.567 0 .948.663 1.574 1.567 1.574.47 0 .91-.155 1.214-.44l-.297-.427c-.217.216-.557.334-.855.334-.564 0-.898-.378-.948-.824H24v-.16c0-.942-.57-1.624-1.468-1.624m-4.576 0c-.459 0-.849.298-.979.477v-.402h-.65v2.991h.65v-2.093c.137-.192.403-.397.694-.397.354 0 .49.217.49.54v1.95h.65v-2.093c.13-.199.403-.397.694-.397.353 0 .495.217.495.54v1.95h.65v-2.161c0-.607-.315-.905-.86-.905-.453 0-.85.28-1.016.545-.1-.322-.372-.545-.818-.545m-16.55 0c-.477 0-.91.15-1.257.484l.272.452a1.2 1.2 0 0 1 .886-.384c.41 0 .7.21.7.557v.446c-.223-.254-.563-.384-.972-.384-.49 0-1.035.285-1.035.979 0 .656.551.99 1.035.99.396 0 .75-.142.972-.402v.328h.65V12.04c0-.799-.582-1.078-1.25-1.078m8.449.075v2.118c0 .607.322.948.966.948.47 0 .842-.235 1.053-.471v.396h.65v-2.991h-.65v2.1a.99.99 0 0 1-.762.39c-.372 0-.607-.149-.607-.613v-1.877zm12.67.458c.589 0 .83.434.85.787H21.69c.025-.36.285-.787.837-.787m-17.942.043c.514 0 .843.415.843.992 0 .582-.329.997-.843.997a.98.98 0 0 1-.774-.397v-1.189a.98.98 0 0 1 .774-.403m3.372 0c.558 0 .861.465.861.991 0 .533-.303.998-.86.998-.552 0-.862-.465-.862-.997 0-.527.31-.992.861-.992m-6.66 1.041c.279 0 .557.105.712.31v.458c-.155.204-.433.31-.712.31-.366 0-.644-.21-.644-.539 0-.322.278-.539.644-.539m14.269.65a.44.44 0 0 0-.434.428c0 .235.198.44.434.44a.445.445 0 0 0 .434-.44.44.44 0 0 0-.434-.428" /></svg>about.me</a>
          <a href="https://medium.com/@thepsychicstudio" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontSize: 13 }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.21 0A4.201 4.201 0 0 0 0 4.21v15.58A4.201 4.201 0 0 0 4.21 24h15.58A4.201 4.201 0 0 0 24 19.79v-1.093c-.137.013-.278.02-.422.02-2.577 0-4.027-2.146-4.09-4.832a7.592 7.592 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.885 3.885 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023c.101 0 .202.004.303.01V4.211A4.201 4.201 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.378 1.378 0 0 0-.342-.047Zm-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z" /></svg>Medium</a>
          <a href="https://thepsychicstudio.tumblr.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontSize: 13 }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z" /></svg>Tumblr</a>
          <a href="https://www.pinterest.com/contactthepsychicstudio/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontSize: 13 }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" /></svg>Pinterest</a>
          <a href="https://gravatar.com/sensationallycyber15c9d0c50c" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontSize: 13 }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-1.326 0-2.4 1.074-2.4 2.4v8.4c0 1.324 1.074 2.398 2.4 2.398s2.4-1.074 2.4-2.398V5.21c2.795.99 4.799 3.654 4.799 6.789 0 3.975-3.225 7.199-7.199 7.199S4.801 15.975 4.801 12c0-1.989.805-3.789 2.108-5.091.938-.938.938-2.458 0-3.396s-2.458-.938-3.396 0C1.344 5.686 0 8.686 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0" /></svg>Gravatar</a>
          <a href="https://www.quora.com/profile/The-Psychic-Studio" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontSize: 13 }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.3799.9483A11.9628 11.9628 0 0 1 21.248 19.5397l2.4096 2.4225c.7322.7362.21 1.9905-.8272 1.9905l-10.7105.01a12.52 12.52 0 0 1-.304 0h-.02A11.9628 11.9628 0 0 1 7.3818.9503Zm7.3217 4.428a7.1717 7.1717 0 1 0-5.4873 13.2512 7.1717 7.1717 0 0 0 5.4883-13.2511Z" /></svg>Quora</a>
          <a href="https://www.trustpilot.com/review/thepsychicstudio.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontSize: 13 }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5l3.09 7.2 7.41.6-5.6 5.1 1.7 7.6L12 17.9l-6.6 4.1 1.7-7.6-5.6-5.1 7.41-.6z" /></svg>Trustpilot</a>
        </nav>
        <small>© The Psychic Studio. For entertainment and personal reflection only; not medical, legal or financial advice.</small>
      </div></footer>
    </div>
  );
};
