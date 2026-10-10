import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from './Layout';
import { SEOHead } from '../components/SEOHead';
import { ETSY_LISTINGS } from '../data/etsyListings';
export const ReadingDetail: React.FC = () => {
 const {slug}=useParams();const r=ETSY_LISTINGS.find(x=>x.slug===slug);
 if(!r)return <Layout><div className="st-page wrap"><h1>Reading not found</h1><Link to="/shop">Explore all readings</Link></div></Layout>;
 const inquiry=`mailto:contact.thepsychicstudio@gmail.com?subject=${encodeURIComponent('Reading inquiry: '+r.title)}`;
 return <Layout seo={false}><SEOHead title={`${r.title} | The Psychic Studio`} description={r.intro} canonicalUrl={`https://thepsychicstudio.com/readings/${r.slug}`} ogImage={r.img}/>
 <div className="st-page"><div className="wrap">
 <Link to="/shop">← All readings</Link><div className="st-reading-detail-hero">
 <img src={r.img} alt="Tarot cards and candlelight" width="600" height="420"/>
 <div><span className="eyebrow">Personal reading</span><h1>{r.title}</h1><p className="st-prose">{r.intro}</p><p className="st-reading-price"><del>$79</del> <strong>$29 USD</strong></p><p>One reading. A little space to see your question differently.</p><a className="btn" href={inquiry}>Ask about this reading</a><p style={{fontSize:13}}>Email the studio to confirm scope, format, delivery and payment details before ordering. This website does not take payments.</p></div>
 </div>
 <section className="st-sec"><span className="eyebrow">A fresh perspective</span><h2>What you can take from the experience</h2><div className="st-grid c3">{r.benefits.map(x=><div className="st-card" key={x}><h3>{x}</h3><p>A reading offers a different lens, while your decisions remain yours.</p></div>)}</div></section>
 <section className="st-prose"><h2>Questions worth bringing</h2><p>You do not need a perfect question. Start with what is on your mind about {r.focus}.</p><ul>{r.questions.map(q=><li key={q}>{q}</li>)}</ul><h2>Before you decide</h2><p>The studio will confirm what your reading includes, how it is delivered and when to expect it. Ask about any follow-up questions before ordering. No fixed delivery time, report length or live call is promised on this page.</p><h2>How it works</h2><ol><li>Choose the topic that feels closest to your question.</li><li>Email the studio with your question and the context you want to share.</li><li>Confirm the service details and payment arrangements before proceeding.</li></ol><h2>A thoughtful place to start</h2><p>You can ask a question without committing to a purchase. Readings are for entertainment and personal reflection. They cannot guarantee another person's feelings, future events or results, and they do not replace professional advice.</p><a className="btn" href={inquiry}>Talk to the studio · $29 USD</a></section>
 </div></div></Layout>;
};
