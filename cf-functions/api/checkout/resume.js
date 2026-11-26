import {createHash} from 'node:crypto';
import {checkoutConfig} from '../../../checkout/lib/config.mjs';
import {CheckoutError} from '../../../checkout/lib/payment.mjs';
import {gateway} from '../../../checkout/lib/gateway.mjs';
import {reconcileCaptured} from '../../../checkout/lib/reconcile.mjs';
import {allowRequest} from '../../../checkout/lib/rate-limit.mjs';
import {json,sameOrigin,safeError} from '../../../checkout/lib/http.mjs';
export async function onRequestPost({request,env}){try{
 const {keyId}=checkoutConfig(env);sameOrigin(request);
 if(!await allowRequest(env,request,'checkout-resume',10))return json({error:'try_later'},429);
 const token=(request.headers.get('Cookie')||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('guest_order='))?.slice(12);
 if(!token||!/^[A-Za-z0-9_-]{43}$/.test(token))throw new CheckoutError('not_found');
 const order=await env.ORDER_DB.prepare('SELECT o.* FROM orders o JOIN access_tokens t ON t.order_id=o.id WHERE t.token_hash=? AND t.expires_at>? AND t.consumed_at IS NULL').bind(createHash('sha256').update(token).digest('hex'),Date.now()).first();
 if(!order)throw new CheckoutError('not_found');
 if(order.payment_status==='paid')return json({status:'paid'});
 if(order.payment_status!=='pending'||!/^order_[A-Za-z0-9]+$/.test(order.gateway_order_id||''))throw new CheckoutError('invalid_state');
 const remote=await gateway(env,'/orders/'+order.gateway_order_id);
 if(remote.amount!==order.amount_minor||remote.currency!==order.currency||remote.receipt!==order.id)throw new CheckoutError('payment_mismatch');
 const payments=await gateway(env,'/orders/'+order.gateway_order_id+'/payments');
 if(!Array.isArray(payments.items))throw new CheckoutError('gateway_unavailable');
 for(const payment of payments.items){if(payment.status==='captured'&&payment.captured===true){const result=await reconcileCaptured(env.ORDER_DB,order,payment);return json({status:['paid','duplicate'].includes(result.action)?'paid':'confirmation_pending'});}}
 if(remote.amount_paid>0||remote.status==='paid'||payments.items.some(p=>p.status==='authorized'))return json({status:'confirmation_pending'});
 if(!['created','attempted'].includes(remote.status))throw new CheckoutError('invalid_state');
 return json({status:'pending',id:order.id,keyId,gatewayOrderId:order.gateway_order_id,amount:order.amount_minor,currency:order.currency,productTitle:order.product_title});
 }catch(e){return safeError(e);}}
