import {checkoutConfig} from '../../../checkout/lib/config.mjs';
import {verifyCheckout,CheckoutError} from '../../../checkout/lib/payment.mjs';
import {gateway} from '../../../checkout/lib/gateway.mjs';
import {json,sameOrigin,jsonBody,safeError} from '../../../checkout/lib/http.mjs';
import {reconcileCaptured} from '../../../checkout/lib/reconcile.mjs';
export async function onRequestPost({request,env}){
 try{
  checkoutConfig(env,{allowPaused:true});sameOrigin(request);
  const input=await jsonBody(request);
  if(!/^order_[A-Za-z0-9]+$/.test(input.razorpay_order_id||'')||!/^pay_[A-Za-z0-9]+$/.test(input.razorpay_payment_id||''))throw new CheckoutError('invalid_input');
  const order=await env.ORDER_DB.prepare('SELECT * FROM orders WHERE gateway_order_id=?').bind(input.razorpay_order_id).first();
  if(!order)throw new CheckoutError('not_found');
  if(!verifyCheckout(env.RAZORPAY_KEY_SECRET,order.gateway_order_id,input.razorpay_payment_id,input.razorpay_signature))throw new CheckoutError('invalid_signature');
  const payment=await gateway(env,`/payments/${input.razorpay_payment_id}`);
  const result=await reconcileCaptured(env.ORDER_DB,order,payment);
  return json({status:result.action==='paid'||result.action==='duplicate'?'paid':result.action==='wait'?'confirming':'review_required'});
 }catch(error){return safeError(error);}
}
