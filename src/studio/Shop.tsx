import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from './Layout';
import { ETSY_LISTINGS } from '../data/etsyListings';
export const Shop: React.FC = () => <Layout><div className="st-page"><div className="wrap">
<span className="eyebrow">Personal readings</span><h1>A reading for the question you're carrying.</h1>
<p className="st-prose">Every reading is written personally for you and delivered by email, usually within 1 day of payment. Choose a topic, send the studio a short inquiry from its page, and we reply with payment and delivery details. Ordering is handled personally by email, so you can ask anything before you decide.</p>
<div className="st-grid c3 st-shop-grid">{ETSY_LISTINGS.map(r=><article key={r.id} className="st-prod"><div className="ph"><img src={r.img} alt={r.title} loading="lazy" width="600" height="420" /></div><div className="bd"><h2 className="st-shop-card-title">{r.title}</h2><p>{r.description}</p><p className="st-shop-meta">Written reading · delivered by email</p><p className="st-shop-price"><del style={{opacity:.5}}>$79</del> <strong>${r.price} USD</strong></p><Link className="btn" to={`/readings/${r.slug}`}>View reading details</Link></div></article>)}</div>
<p style={{marginTop:34,fontSize:14}}>For entertainment and personal reflection only. No reading can promise a future outcome or replace medical, legal, financial or mental health advice.</p>
</div></div></Layout>;
