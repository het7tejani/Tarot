import {createHmac} from 'node:crypto';import {CheckoutError} from './payment.mjs';
export async function allowRequest(env,request,scope,max,now=Date.now()){
 if(typeof env.ORDER_RATE_LIMIT_SECRET!=='string'||env.ORDER_RATE_LIMIT_SECRET.length<32||!env.ORDER_DB)throw new CheckoutError('checkout_unavailable');
 const ip=request.headers.get('CF-Connecting-IP');if(!ip||ip.length>128)throw new CheckoutError('checkout_unavailable');
 const windowMs=600000,windowStart=Math.floor(now/windowMs)*windowMs;
 const key=createHmac('sha256',env.ORDER_RATE_LIMIT_SECRET).update(scope+'\0'+ip).digest('hex');
 await env.ORDER_DB.prepare('DELETE FROM request_limits WHERE key_hash IN(SELECT key_hash FROM request_limits WHERE expires_at<? LIMIT 100)').bind(now).run();
 const row=await env.ORDER_DB.prepare(`INSERT INTO request_limits(key_hash,window_start,hits,expires_at) SELECT ?,?,1,? WHERE (SELECT count(*) FROM request_limits)<10000 OR EXISTS(SELECT 1 FROM request_limits WHERE key_hash=?) ON CONFLICT(key_hash) DO UPDATE SET window_start=excluded.window_start,hits=CASE WHEN request_limits.window_start=excluded.window_start THEN request_limits.hits+1 ELSE 1 END,expires_at=excluded.expires_at RETURNING hits`).bind(key,windowStart,windowStart+windowMs,key).first();
 return !!row&&row.hits<=max;
}
