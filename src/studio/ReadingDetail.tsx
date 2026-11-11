import { SoulmateReadingGuide } from '../components/SearchGuidance';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from './Layout';
import { SEOHead } from '../components/SEOHead';
import { ETSY_LISTINGS } from '../data/etsyListings';
import { AskAboutReading } from '../components/AskAboutReading';
import { trackStudioEvent } from '../analytics';
export const ReadingDetail: React.FC = () => {
 const {slug}=useParams();const r=ETSY_LISTINGS.find(x=>x.slug===slug);
 if(!r)return <Layout><div className="st-page wrap"><h1>Reading not found</h1><Link to="/shop">Explore all readings</Link></div></Layout>;
 const idx=ETSY_LISTINGS.findIndex(x=>x.slug===slug);const related=[1,2,3].map(n=>ETSY_LISTINGS[(idx+n)%ETSY_LISTINGS.length]);
 const inquiry=`mailto:contact.thepsychicstudio@gmail.com?subject=${encodeURIComponent('Reading inquiry: '+r.title)}`;
 const isSoulmate=r.slug==='soulmate-and-future-relationship';
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:r.title,serviceType:'Personal tarot and psychic reading',description:r.intro,provider:{'@type':'Organization',name:'The Psychic Studio',url:'https://thepsychicstudio.com'},url:`https://thepsychicstudio.com/readings/${r.slug}`};
 const soulmateFaqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:[{'@type':'Question',name:'What can a soulmate reading help with?',acceptedAnswer:{'@type':'Answer',text:'It can help you reflect on relationship patterns, boundaries and the question you want to bring. It cannot verify who your soulmate is or guarantee a future outcome.'}},{'@type':'Question',name:'Is the free tarot draw the same as a personal soulmate reading?',acceptedAnswer:{'@type':'Answer',text:'No. The free tarot draw is a general reflection tool. A personal soulmate reading is written for your question after you inquire with the studio.'}},{'@type':'Question',name:'Can a soulmate reading tell me whether someone will return?',acceptedAnswer:{'@type':'Answer',text:"It cannot promise another person's actions or feelings. It can help you frame your own choices, boundaries and next step."}}]};
 return <Layout seo={false}><SEOHead title={isSoulmate ? 'Soulmate and Future Relationship Reading | The Psychic Studio' : `${r.title}: Personal Tarot Reading | The Psychic Studio`} description={isSoulmate ? 'A soulmate and future relationship reading for reflection on patterns, boundaries and next steps. See what it covers, what it cannot confirm, and how to ask.' : `${r.intro} Email the studio to ask about this reading.`} canonicalUrl={`https://thepsychicstudio.com/readings/${r.slug}`} ogImage={r.img.startsWith('http')?r.img:`https://thepsychicstudio.com${r.img}`} schema={isSoulmate?[serviceSchema,soulmateFaqSchema]:serviceSchema}/>
 <div className="st-page"><div className="wrap">
 <Link to="/shop">← All readings</Link><div className="st-reading-detail-hero">
 <img src={r.img} alt={r.title} width="600" height="420"/>
 <div><span className="eyebrow">Personal reading</span><h1>{r.title}</h1><p className="st-prose">{r.intro}</p><p className="st-reading-price"><strong>${r.price} USD</strong></p>
 <ul className="st-reading-meta"><li>Written reading, made personally for you</li><li>Delivered by email once your inquiry is confirmed</li></ul>
 <a className="btn" href="#ask-about-reading" onClick={() => trackStudioEvent('inquiry_cta_click', { cta_type: 'ask_form', link_url: '#ask-about-reading', page_path: window.location.pathname, reading_slug: r.slug, reading_title: r.title })}>Ask about this reading</a></div>
 </div>
 <div className="st-reading-layout">
 <div className="st-reading-main st-prose">
 <h2>What this reading looks at</h2>
 <p>{r.description} It centers on {r.focus}: a reflective conversation starter built around your own question, not a prediction of events or of what another person feels.</p>
 <h2>Questions worth bringing</h2>
 <p>You do not need a perfect question. Start with what is on your mind about {r.focus}:</p>
 <ul>{r.questions.map(q=><li key={q}>{q}</li>)}</ul>
 <p>Open questions give you more room to reflect. Instead of asking for a guaranteed outcome, ask what you can notice, what matters to you or what you could approach differently.</p>
 <h2>Who this reading may suit</h2>
 <p>This may suit you if you want space to think about {r.focus}, put a feeling into words or consider a question from a different angle. It is for reflection, rather than certainty about future events or another person's thoughts.</p>
 <h2>How to prepare</h2>
 <ul><li>Choose one main question and note why it matters to you now.</li><li>Separate what you know from what you are assuming. A few lines of context are enough to start an inquiry.</li><li>Share only what you are comfortable sharing. Do not send passwords, payment-card details or private records about other people.</li></ul>
 <p style={{fontSize:14}}>For a decision with medical, legal or financial consequences, use advice from a qualified professional. A personal reading is not a substitute for that support.</p>
 </div>
 <aside className="st-reading-side">
 <div className="st-order-card">
 <p className="st-order-price"><strong>${r.price} USD</strong></p>
 <h2>How ordering works</h2>
 <ol><li>Send the inquiry form below (or email the studio) with your question.</li><li>The studio replies personally by email with the next step.</li><li>You receive your written reading by email once everything is confirmed.</li></ol>
 <p className="st-order-note">Ordering is handled personally by email, so you can confirm scope, format and timing before you decide.</p>
 <a className="btn" href={inquiry} onClick={() => trackStudioEvent('inquiry_cta_click', { cta_type: 'mailto', link_url: inquiry, page_path: window.location.pathname, reading_slug: r.slug, reading_title: r.title })}>Talk to the studio · ${r.price} USD</a>
 </div>
 </aside>
 </div>
 {r.slug === 'soulmate-and-future-relationship' && <SoulmateReadingGuide />}
 <section className="st-sec alt" id="ask-about-reading"><span className="eyebrow">Questions first</span><h2>Ask about this reading</h2><p className="sub">Share your name, date of birth and your questions. The studio will email you back personally with the next step.</p><AskAboutReading title={r.title} slug={r.slug}/></section><section className="st-sec"><h2>Other reading topics</h2><div className="st-related-row">{related.map(x=><Link key={x.slug} className="st-related-card" to={`/readings/${x.slug}`}><img src={x.img} alt={x.title} loading="lazy"/><span>{x.title}</span></Link>)}</div><p><Link to="/free-tarot">Try the free tarot draw</Link> or read about <Link to="/tarot-card-meanings">all 78 card meanings</Link>.</p></section>
 </div></div></Layout>;
};
