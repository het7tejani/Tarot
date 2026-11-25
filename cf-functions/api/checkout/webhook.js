import {enabledTestConfig,verifySignature,CheckoutError} from '../../../checkout/lib/payment.mjs';
import {gateway} from '../../../checkout/lib/gateway.mjs';
import {json,boundedBody,safeError} from '../../../checkout/lib/http.mjs';
import {reconcileCaptured} from '../../../checkout/lib/reconcile.mjs';
export async function onRequestPost({request,env}){
 try{
  enabledTestConfig(env);
  const raw=await boundedBody(request,65536);
  if(!verifySignature(env.RAZORPAY_WEBHOOK_SECRET,raw,request.headers.get('X-Razorpay-Signature')))throw new CheckoutError('invalid_signature');
  const event=JSON.parse(raw);const eventId=request.headers.get('X-Razorpay-Event-Id');
  if(!eventId||eventId.length>200)throw new CheckoutError('invalid_input');
  const paymentId=event.payload?.payment?.entity?.id;
  // Only a capture triggers payment completion. Other event families await dedicated state handlers.
  if(event.event!=='payment.captured')return json({received:true});
  if(!/^pay_[A-Za-z0-9]+$/.test(paymentId||''))throw new CheckoutError('invalid_input');
  const payment=await gateway(env,`/payments/${paymentId}`);
  const order=await env.ORDER_DB.prepare('SELECT * FROM orders WHERE gateway_order_id=?').bind(payment.order_id).first();
  if(!order)throw new CheckoutError('not_found');
  await env.ORDER_DB.prepare('INSERT OR IGNORE INTO gateway_events(event_id,event_type,gateway_order_id,payment_id,received_at) VALUES(?,?,?,?,?)').bind(eventId,event.event,payment.order_id,payment.id,Date.now()).run();
  const result=await reconcileCaptured(env.ORDER_DB,order,payment);
  await env.ORDER_DB.prepare('UPDATE gateway_events SET processed_at=?,state=?,reason=? WHERE event_id=?').bind(Date.now(),result.action==='exception'?'exception':'processed',result.action==='exception'?'payment_exception':null,eventId).run();
  return json({received:true});
 }catch(error){return safeError(error);}
}
