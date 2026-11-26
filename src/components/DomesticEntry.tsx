import React from 'react';
export const DOMESTIC_ENTRY_ENABLED=true;
const tiers:Record<number,number>={5:46234,9:83221,15:138702};
export function DomesticEntry({slug,usdTier}:{slug:string;usdTier:number}){
 const amount=tiers[usdTier];if(!amount)return null;
 const money=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(amount/100);
 return <section className="st-purchase-panel" aria-label="India checkout"><div className="st-purchase-price"><div><span>India · One-time payment</span><strong>{money}</strong></div><span className="st-purchase-format">Personalised PDF<br/>No subscription</span></div><a className="btn st-purchase-cta" href={`/checkout/${slug}`}>Continue to secure checkout <span aria-hidden="true">→</span></a><p className="st-purchase-gateway">Payments processed by Razorpay</p><dl className="st-purchase-assurances"><div><dt>Prepared personally</dt><dd>Your question, your written reading. No automatic report.</dd></div><div><dt>Delivered by email</dt><dd>Usually within 24 hours. Maximum 72 hours after verified payment.</dd></div><div><dt>72-hour refund promise</dt><dd>Not sent within 72 hours? You get a full refund.</dd></div></dl></section>;
}
