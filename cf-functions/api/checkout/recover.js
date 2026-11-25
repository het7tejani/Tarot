import {enabledTestConfig,CheckoutError} from '../../../checkout/lib/payment.mjs';
import {consumeRecovery} from '../../../checkout/lib/recovery.mjs';
import {json,sameOrigin,jsonBody,safeError} from '../../../checkout/lib/http.mjs';
import {createHash} from 'node:crypto';
// POST avoids link-preview consumption. Browser UI must clear a fragment before exchange.
// Recovery preserves the original access deadline. It never creates a retention policy.
export async function onRequestPost({request,env}){try{
 enabledTestConfig(env);sameOrigin(request);
 const input=await jsonBody(request,1024);const now=Date.now();
 if(typeof input.token!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(input.token))throw new CheckoutError('not_found');
 const prior=await env.ORDER_DB.prepare('SELECT max(a.expires_at) AS expires_at FROM access_tokens a JOIN recovery_tokens r ON r.order_id=a.order_id WHERE r.token_hash=? AND a.consumed_at IS NULL').bind(createHash('sha256').update(input.token).digest('hex')).first();
 if(!prior?.expires_at||prior.expires_at<=now)throw new CheckoutError('not_found');
 const result=await consumeRecovery(env.ORDER_DB,input.token,{accessExpiresAt:Math.min(prior.expires_at,now+30*24*60*60*1000)},now);
 if(!result)throw new CheckoutError('not_found');
 return new Response(null,{status:204,headers:{'Set-Cookie':`guest_order=${result.token}; HttpOnly; Secure; Path=/api/checkout; SameSite=Strict; Max-Age=${Math.max(0,Math.floor((result.expiresAt-now)/1000))}`,'Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'}});
}catch(error){return safeError(error);}}
