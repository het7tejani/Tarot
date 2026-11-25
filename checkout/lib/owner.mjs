import {createHmac,randomBytes,timingSafeEqual} from 'node:crypto';
import {CheckoutError} from './payment.mjs';
const cookie='studio_orders_owner';
function secret(env){if(typeof env.ORDER_OWNER_SESSION_SECRET!=='string'||env.ORDER_OWNER_SESSION_SECRET.length<32)throw new CheckoutError('checkout_unavailable');return env.ORDER_OWNER_SESSION_SECRET;}
export function ownerSession(env,actor,now=Date.now()){
 if(typeof actor!=='string'||actor.length>120||!actor)throw new CheckoutError('invalid_input');
 const payload=Buffer.from(JSON.stringify({actor,exp:now+60*60*1000,nonce:randomBytes(16).toString('hex'),aud:'orders-owner-test'})).toString('base64url');
 return payload+'.'+createHmac('sha256',secret(env)).update(payload).digest('base64url');
}
export function ownerCookie(token){return `${cookie}=${token}; HttpOnly; Secure; Path=/api/orders-owner; SameSite=Strict; Max-Age=3600`;}
export function requireOwner(request,env,now=Date.now()){
 const token=(request.headers.get('Cookie')||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(cookie+'='))?.slice(cookie.length+1);
 if(!token||token.length>1024)throw new CheckoutError('unauthorized');
 const parts=token.split('.');if(parts.length!==2||!parts.every(x=>/^[A-Za-z0-9_-]+$/.test(x)))throw new CheckoutError('unauthorized');
 const expected=createHmac('sha256',secret(env)).update(parts[0]).digest('base64url');
 if(parts[1].length!==expected.length||!timingSafeEqual(Buffer.from(parts[1]),Buffer.from(expected)))throw new CheckoutError('unauthorized');
 let data;try{data=JSON.parse(Buffer.from(parts[0],'base64url').toString('utf8'));}catch{throw new CheckoutError('unauthorized');}
 if(data.aud!=='orders-owner-test'||!data.actor||typeof data.exp!=='number'||data.exp<=now||data.exp>now+60*60*1000)throw new CheckoutError('unauthorized');
 return data.actor;
}
