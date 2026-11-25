import {checkoutConfig} from '../../../checkout/lib/config.mjs';
import {allowRequest} from '../../../checkout/lib/rate-limit.mjs';
import {CheckoutError} from '../../../checkout/lib/payment.mjs';
import {ownerSession,ownerCookie,requireOwner} from '../../../checkout/lib/owner.mjs';
import {checkPassword} from '../../../checkout/lib/password.mjs';
import {json,sameOrigin,jsonBody,safeError} from '../../../checkout/lib/http.mjs';
export async function onRequestPost({request,env}){try{checkoutConfig(env,{allowPaused:true});sameOrigin(request);if(!env.ORDER_OWNER_PASSWORD_HASH)throw new CheckoutError('checkout_unavailable');if(!await allowRequest(env,request,'owner-login',10))return json({error:'try_later'},429);const data=await jsonBody(request,1024);if(data.action==='logout')return new Response(null,{status:204,headers:{'Set-Cookie':'studio_orders_owner=; HttpOnly; Secure; Path=/api/orders-owner; SameSite=Strict; Max-Age=0','Cache-Control':'no-store'}});if(data.action!=='login'||!await checkPassword(data.password,env.ORDER_OWNER_PASSWORD_HASH))return json({error:'unauthorized'},401);return new Response(null,{status:204,headers:{'Set-Cookie':ownerCookie(ownerSession(env,'studio-owner')),'Cache-Control':'no-store'}});}catch(e){return safeError(e);}}
export async function onRequestGet({request,env}){try{checkoutConfig(env,{allowPaused:true});requireOwner(request,env);return json({authenticated:true});}catch(e){return safeError(e);}}
