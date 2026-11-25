import {CheckoutError} from './payment.mjs';
// Explicit environment identity. A Live key alone never activates customer payments.
export function checkoutConfig(env,{allowPaused=false}={}){
 const mode=env.CHECKOUT_MODE??(env.CHECKOUT_ENABLED==='test'?'test':undefined);
 if(!['test','live'].includes(mode)||!env.ORDER_DB||!env.RAZORPAY_KEY_SECRET||!env.RAZORPAY_WEBHOOK_SECRET)throw new CheckoutError('checkout_unavailable');
 if(!String(env.RAZORPAY_KEY_ID||'').startsWith(mode==='live'?'rzp_live_':'rzp_test_'))throw new CheckoutError('checkout_unavailable');
 if(mode==='live'){
  if(env.ORDER_ENVIRONMENT!=='psychic-domestic-production'||env.ORDER_CURRENCY!=='INR'||env.ORDER_FULFILMENT!=='manual_email_24h'||env.ORDER_TERMS_VERSION!=='domestic-manual-2026-11-26')throw new CheckoutError('checkout_unavailable');
  if(!allowPaused&&env.CHECKOUT_ACCEPTING_ORDERS!=='yes')throw new CheckoutError('checkout_unavailable');
 }else if(env.CHECKOUT_ENABLED!=='test')throw new CheckoutError('checkout_unavailable');
 return {mode,keyId:env.RAZORPAY_KEY_ID,currency:mode==='live'?'INR':null};
}
