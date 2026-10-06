import React from 'react';
import { Layout, ETSY } from './Layout';
import { ETSY_LISTINGS } from '../data/etsyListings';
export const Shop: React.FC = () => (
  <Layout>
    <div className="st-page"><div className="wrap">
      <span className="eyebrow">Shop</span><h1>Personal readings by Daisy</h1>
      <p className="st-prose">These are my current readings on Etsy. Click any card to see the full listing, price and reviews there. Checkout happens on Etsy.</p>
      <div className="st-grid c3">{ETSY_LISTINGS.map((r) => (
        <a key={r.id} className="st-prod" href={r.url} target="_blank" rel="noopener noreferrer">
          <div className="ph"><img src={r.img} alt={r.title} loading="lazy" /></div>
          <div className="bd"><h3>{r.title.split(' | ')[0]}</h3><p>{r.title.split(' | ').slice(1, 3).join(' · ')}</p><span className="btn">View on Etsy ↗</span></div>
        </a>))}</div>
      <p style={{ marginTop: 34 }}><a className="btn ghost" href={ETSY} target="_blank" rel="noopener noreferrer">Open the full Etsy shop ↗</a></p>
    </div></div>
  </Layout>
);
