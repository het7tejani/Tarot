import {checkoutConfig} from '../../../checkout/lib/config.mjs';
import {createHash} from 'node:crypto';
import {CheckoutError} from '../../../checkout/lib/payment.mjs';
import {json,safeError} from '../../../checkout/lib/http.mjs';
export async function onRequestGet({request,env}){
 try{
  checkoutConfig(env,{allowPaused:true});
  const token=request.headers.get('Cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith('guest_order='))?.slice(12);
  if(!token||!/^[A-Za-z0-9_-]{43}$/.test(token))throw new CheckoutError('not_found');
  const order=await env.ORDER_DB.prepare('SELECT o.id,o.customer_name,o.customer_email,o.customer_question,o.customer_dob,o.product_title,o.amount_minor,o.currency,o.payment_status,o.fulfilment_status,o.created_at,o.paid_at,o.due_at FROM orders o JOIN access_tokens t ON t.order_id=o.id WHERE t.token_hash=? AND t.expires_at>? AND t.consumed_at IS NULL').bind(createHash('sha256').update(token).digest('hex'),Date.now()).first();
  if(!order)throw new CheckoutError('not_found');
  return json({order});
 }catch(error){return safeError(error);}
}
