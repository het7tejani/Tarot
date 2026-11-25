import {randomUUID} from 'node:crypto';import {CheckoutError} from './payment.mjs';
export async function applyPaymentHold(db,order,payment,eventType,now=Date.now()){
 if(payment.order_id!==order.gateway_order_id||payment.amount!==order.amount_minor||payment.currency!==order.currency||order.paid_payment_id&&order.paid_payment_id!==payment.id)throw new CheckoutError('payment_mismatch');
 let state;if(eventType==='payment.dispute.created')state='disputed';else if(['refund.created','refund.processed'].includes(eventType)){
 if(!Number.isInteger(payment.amount_refunded)||payment.amount_refunded<=0||payment.amount_refunded>payment.amount)throw new CheckoutError('invalid_state');
 state=payment.amount_refunded===payment.amount?'refunded':'partially_refunded';
 }else throw new CheckoutError('invalid_input');
 // Holds may become stricter, never automatically resume fulfilment after dispute/refund events.
 await db.batch([
 db.prepare("UPDATE orders SET payment_status=CASE WHEN payment_status='disputed' OR ?='disputed' THEN 'disputed' WHEN payment_status='refunded' THEN 'refunded' ELSE ? END,updated_at=? WHERE id=?").bind(state,state,now,order.id),
 db.prepare('INSERT INTO admin_audit(id,actor_id,order_id,action,created_at) VALUES(?,?,?,?,?)').bind(randomUUID(),'gateway',order.id,'payment_hold:'+state,now)
 ]);return {action:'hold',state};
}
