import {randomUUID} from 'node:crypto';
// Provider-neutral queue mechanics only. No network send until a separately approved adapter exists.
export async function claimNotification(db,now=Date.now()){
 const id=randomUUID(),lease=now+60000;
 const row=await db.prepare("UPDATE notification_outbox SET state='sending',lease_until=?,attempts=attempts+1 WHERE id=(SELECT id FROM notification_outbox WHERE (state IN('pending','failed') OR (state='sending' AND lease_until<?)) AND next_attempt_at<=? AND attempts<5 ORDER BY next_attempt_at LIMIT 1) RETURNING *").bind(lease,now,now).first();
 return row?{...row,claimId:id,lease}:null;
}
export async function finishNotification(db,claim,{accepted,providerId},now=Date.now()){
 if(accepted&&(!providerId||typeof providerId!=='string'))throw Error('missing_provider_id');
 return db.prepare("UPDATE notification_outbox SET state=?,provider_id=?,lease_until=NULL,next_attempt_at=? WHERE id=? AND state='sending' AND lease_until=? AND attempts=?").bind(accepted?'accepted':'failed',accepted?providerId:null,now+Math.min(3600000,60000*2**claim.attempts),claim.id,claim.lease,claim.attempts).run();
}
