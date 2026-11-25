import {createHash,randomUUID} from 'node:crypto';
import {CheckoutError,opaqueToken} from './payment.mjs';
const tokenHash=token=>createHash('sha256').update(token).digest('hex');
const validToken=token=>typeof token==='string'&&/^[A-Za-z0-9_-]{43}$/.test(token);
// Provider-neutral preparation only. No HTTP endpoint and no email sending here.
// Caller must verify the order email and authorized recipient before handing off a link.
export async function prepareRecovery(db,{orderId,email},now=Date.now()){
 if(typeof email!=='string'||email.length>254||!/^[a-f0-9-]{36}$/.test(orderId||''))throw new CheckoutError('invalid_input');
 const order=await db.prepare("SELECT id FROM orders WHERE id=? AND customer_email=? AND payment_status='paid' AND fulfilment_status<>'cancelled'").bind(orderId,email.trim().toLowerCase()).first();
 if(!order)return null;
 const token=opaqueToken(),expiresAt=now+15*60*1000;
 await db.prepare('INSERT INTO recovery_tokens(token_hash,order_id,expires_at) VALUES(?,?,?)').bind(tokenHash(token),order.id,expiresAt).run();
 return {orderId:order.id,token,expiresAt};
}
// Atomic single use: a recovery link exchanges for a new private cookie, never a PDF URL.
export async function consumeRecovery(db,token,{accessExpiresAt},now=Date.now()){
 if(!validToken(token)||!Number.isSafeInteger(accessExpiresAt)||accessExpiresAt<=now||accessExpiresAt>now+30*24*60*60*1000)throw new CheckoutError('invalid_input');
 const access=opaqueToken(),hash=tokenHash(access),operation=randomUUID();
 const result=await db.batch([
 db.prepare("INSERT INTO recovery_claims(id,order_id,created_at) SELECT ?,r.order_id,? FROM recovery_tokens r JOIN orders o ON o.id=r.order_id WHERE r.token_hash=? AND r.consumed_at IS NULL AND r.expires_at>? AND o.payment_status='paid' AND o.fulfilment_status<>'cancelled'").bind(operation,now,tokenHash(token),now),
 db.prepare('UPDATE recovery_tokens SET consumed_at=? WHERE token_hash=? AND EXISTS(SELECT 1 FROM recovery_claims WHERE id=?)').bind(now,tokenHash(token),operation),
 db.prepare('INSERT INTO access_tokens(token_hash,order_id,expires_at) SELECT ?,order_id,? FROM recovery_claims WHERE id=?').bind(hash,accessExpiresAt,operation)
 ]);
 if((result[0].meta?.changes??result[0].changes)!==1)return null;
 return {token:access,expiresAt:accessExpiresAt};
}
export async function revokeOrderAccess(db,orderId,now=Date.now()){
 if(!/^[a-f0-9-]{36}$/.test(orderId||''))throw new CheckoutError('invalid_input');
 await db.batch([
 db.prepare('UPDATE access_tokens SET consumed_at=? WHERE order_id=? AND consumed_at IS NULL').bind(now,orderId),
 db.prepare('UPDATE recovery_tokens SET consumed_at=? WHERE order_id=? AND consumed_at IS NULL').bind(now,orderId)
 ]);
}
