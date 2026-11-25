import {checkoutConfig} from '../../../checkout/lib/config.mjs';
import {randomUUID} from 'node:crypto';import {CheckoutError} from '../../../checkout/lib/payment.mjs';import {requireOwner} from '../../../checkout/lib/owner.mjs';import {json,sameOrigin,jsonBody,safeError} from '../../../checkout/lib/http.mjs';
export async function onRequestPost({request,env}){try{
 checkoutConfig(env,{allowPaused:true});sameOrigin(request);const actor=requireOwner(request,env);const input=await jsonBody(request,1024);if(!/^[a-f0-9-]{36}$/.test(input.fileId||'')||input.reviewed!==true||typeof input.confirmEmail!=='string')throw new CheckoutError('invalid_input');
 const now=Date.now(),operation=randomUUID();
 // All preconditions are checked inside the same atomic batch as publication.
 // A concurrent publish/refund cannot interleave between the guard and writes.
 const result=await env.ORDER_DB.batch([
 env.ORDER_DB.prepare("INSERT INTO admin_audit(id,actor_id,order_id,action,created_at) SELECT ?,?,f.order_id,?,? FROM order_files f JOIN orders o ON o.id=f.order_id WHERE f.id=? AND f.state='draft' AND o.payment_status='paid' AND o.fulfilment_status IN('new','in_progress','ready') AND o.customer_email=?").bind(operation,actor,'pdf_publish:'+input.fileId,now,input.fileId,input.confirmEmail),
 env.ORDER_DB.prepare("UPDATE order_files SET state='retired' WHERE state='published' AND order_id=(SELECT order_id FROM admin_audit WHERE id=?)").bind(operation),
 env.ORDER_DB.prepare("UPDATE order_files SET state='published',published_at=? WHERE id=? AND EXISTS(SELECT 1 FROM admin_audit WHERE id=?)").bind(now,input.fileId,operation),
 env.ORDER_DB.prepare("UPDATE order_files SET state='retired' WHERE state='draft' AND id<>? AND order_id=(SELECT order_id FROM admin_audit WHERE id=?)").bind(input.fileId,operation),
 env.ORDER_DB.prepare("UPDATE orders SET fulfilment_status='ready',updated_at=? WHERE id=(SELECT order_id FROM admin_audit WHERE id=?)").bind(now,operation)
 ]);
 if((result[0].meta?.changes??result[0].changes)!==1)throw new CheckoutError('invalid_state');
 return json({ok:true,status:'ready',notification:'not_sent'});
}catch(e){return safeError(e);}}
