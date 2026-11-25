import {randomUUID} from 'node:crypto';
import {CheckoutError,paymentDecision} from './payment.mjs';
export async function reconcileCaptured(db,order,payment,now=Date.now()){
 const decision=paymentDecision(order,payment);
 if(decision.action==='wait'||decision.action==='duplicate')return decision;
 if(decision.action==='exception'){
  await db.prepare('INSERT OR IGNORE INTO payment_exceptions(payment_id,order_id,reason,created_at) VALUES(?,?,?,?)').bind(payment.id,order.id,decision.reason,now).run();return decision;
 }
 // D1 batch executes as a transaction. Outbox insert is conditional on the winning payment.
 // A second capture cannot overwrite the first or create another order-received notice.
 await db.batch([
  db.prepare("UPDATE orders SET payment_status='paid',paid_payment_id=?,paid_at=?,due_at=?,updated_at=? WHERE id=? AND paid_payment_id IS NULL AND payment_status='pending'").bind(payment.id,now,now+24*60*60*1000,now,order.id),
  db.prepare("INSERT OR IGNORE INTO notification_outbox(id,order_id,kind,version,next_attempt_at) SELECT ?,id,'order_received','1',? FROM orders WHERE id=? AND paid_payment_id=? AND payment_status='paid'").bind(randomUUID(),now,order.id,payment.id),
  db.prepare("INSERT OR IGNORE INTO payment_exceptions(payment_id,order_id,reason,created_at) SELECT ?,id,'concurrent_or_late_capture',? FROM orders WHERE id=? AND (paid_payment_id IS NULL OR paid_payment_id<>?)").bind(payment.id,now,order.id,payment.id)
 ]);
 const updated=await db.prepare('SELECT paid_payment_id,payment_status FROM orders WHERE id=?').bind(order.id).first();
 if(!updated)throw new CheckoutError('not_found');
 return updated.paid_payment_id===payment.id&&updated.payment_status==='paid'?{action:'paid'}:{action:'exception'};
}
