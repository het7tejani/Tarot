import React from 'react';
import { Layout, ETSY } from './Layout';
import { ETSY_LISTINGS } from '../data/etsyListings';
export const Shop: React.FC = () => (
  <Layout>
    <div className="st-page"><div className="wrap">
      <span className="eyebrow">Shop</span><h1>Personal psychic and tarot readings</h1>
      <p className="st-prose">Browse personal psychic and tarot readings by Daisy Hayes for love, relationships and life questions. Click a card for the full Etsy listing, current price, format, reviews and delivery terms. This website does not take payment.</p>
      <div className="st-grid c3">{ETSY_LISTINGS.map((r) => (
        <a key={r.id} className="st-prod" href={r.url} target="_blank" rel="noopener noreferrer">
          <div className="ph"><img src={r.img} alt={r.title} loading="lazy" /></div>
          <div className="bd"><h2 className="st-shop-card-title">{r.title.split(' | ')[0]}</h2><p>{r.title.split(' | ').slice(1, 3).join(' · ')}</p><span className="btn">View on Etsy ↗</span></div>
        </a>))}</div>
      <p style={{ marginTop: 34 }}><a className="btn ghost" href={ETSY} target="_blank" rel="noopener noreferrer">Open the full Etsy shop ↗</a></p>
    </div></div>
  </Layout>
);
