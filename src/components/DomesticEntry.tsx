import React from 'react';
// Explicit domestic entry. USD catalog and international inquiry paths remain separate.
export const DOMESTIC_ENTRY_ENABLED = true;
const tiers:Record<number,number>={5:46234,9:83221,15:138702};
export function DomesticEntry({slug,usdTier}:{slug:string;usdTier:number}){
 if(!DOMESTIC_ENTRY_ENABLED)return null;
 const amount=tiers[usdTier];if(!amount)return null;
 const money=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(amount/100);
 return <section className="st-domestic-entry" aria-label="India checkout"><span className="eyebrow">For customers in India</span><h2>Order this reading in INR</h2><p><strong>{money}</strong> total. Pay through Razorpay, then receive your personally prepared PDF by email, usually within 24 hours and no later than 72 hours.</p><a className="btn" href={`/checkout/${slug}`}>Continue in INR · {money}</a><p className="st-order-note">India domestic payments only. If your reading is not sent within 72 hours of verified payment, you can request a full refund. For international inquiries, use the email form below.</p></section>;
}
