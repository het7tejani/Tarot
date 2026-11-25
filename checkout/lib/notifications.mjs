import {CheckoutError} from './payment.mjs';
// Text-only draft templates. These functions do not authorize or send email.
export function notificationDraft(kind,{orderReference,amountMinor,currency,accessUrl}){
 if(typeof orderReference!=='string'||!/^[a-f0-9-]{36}$/.test(orderReference))throw new CheckoutError('invalid_input');
 const ref=orderReference.slice(0,8).toUpperCase();
 if(kind==='order_received'){
  if(!Number.isSafeInteger(amountMinor)||amountMinor<1||currency!=='INR')throw new CheckoutError('invalid_input');
  return {subject:`Order ${ref}: payment received`,text:`We received your payment of ${new Intl.NumberFormat('en-IN',{style:'currency',currency}).format(amountMinor/100)}. Your order reference is ${ref}.\n\nWe will email you when your private reading is ready. To ask about your order, reply to this email.\n\nThe Psychic Studio`};
 }
 if(!['reading_ready','access_requested'].includes(kind))throw new CheckoutError('invalid_input');
 let url;try{url=new URL(accessUrl);}catch{throw new CheckoutError('invalid_input');}
 if(url.username||url.password||url.port||url.protocol!=='https:'||url.hostname!=='thepsychicstudio.com'||url.pathname!=='/order-access'||url.search||!/^#[A-Za-z0-9_-]{43}$/.test(url.hash))throw new CheckoutError('invalid_input');
 return kind==='reading_ready'?{subject:`Order ${ref}: your private reading is ready`,text:`Your private reading is ready. Open this link to access it:\n${url.href}\n\nThe link expires in 15 minutes and can be used once. You can request a new link from the website. To ask about your order, reply to this email.\n\nThe Psychic Studio`}:{subject:`Order ${ref}: your requested access link`,text:`Use this link to access your order:\n${url.href}\n\nThe link expires in 15 minutes and can be used once. If you did not request this link, you can ignore this email.\n\nThe Psychic Studio`};
}
