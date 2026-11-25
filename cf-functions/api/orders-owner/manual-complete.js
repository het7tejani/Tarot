import {randomUUID} from 'node:crypto';
import {checkoutConfig} from '../../../checkout/lib/config.mjs';
import {CheckoutError} from '../../../checkout/lib/payment.mjs';
import {requireOwner} from '../../../checkout/lib/owner.mjs';
import {json,sameOrigin,jsonBody,safeError} from '../../../checkout/lib/http.mjs';
// Records the owner's attestation, never claims an email API sent the reading.
export async function onRequestPost({request,env}){try{
 checkoutConfig(env,{allowPaused:true});sameOrigin(request);const actor=requireOwner(request,env);const input=await jsonBody(request,1024);
 if(!/^[a-f0-9-]{36}$/.test(input.id||'')||input.confirmSent!==true||typeof input.recipient!=='string')throw new CheckoutError('invalid_input');
 const order=await env.ORDER_DB.prepare('SELECT * FROM orders WHERE id=?').bind(input.id).first();if(!order)throw new CheckoutError('not_found');
 if(input.recipient.trim().toLowerCase()!==order.customer_email.toLowerCase())throw new CheckoutError('recipient_mismatch');
 if(order.payment_status!=='paid'||!['new','in_progress'].includes(order.fulfilment_status))throw new CheckoutError('invalid_state');
 const now=Date.now(),operation=randomUUID();const result=await env.ORDER_DB.batch([
 env.ORDER_DB.prepare("INSERT INTO admin_audit(id,actor_id,order_id,action,created_at) SELECT ?,?,id,'manual_email_sent_attested',? FROM orders WHERE id=? AND payment_status='paid' AND fulfilment_status IN('new','in_progress')").bind(operation,actor,now,input.id),
 env.ORDER_DB.prepare("UPDATE orders SET fulfilment_status='completed',updated_at=? WHERE id=? AND payment_status='paid' AND fulfilment_status IN('new','in_progress') AND EXISTS(SELECT 1 FROM admin_audit WHERE id=?)").bind(now,input.id,operation)
 ]);if((result[0].meta?.changes??result[0].changes)!==1)throw new CheckoutError('invalid_state');return json({ok:true,delivery:'owner_attested_manual_email'});
 }catch(e){return safeError(e);}}
