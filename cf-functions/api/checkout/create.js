import {checkoutConfig} from '../../../checkout/lib/config.mjs';
import {domesticPrice} from '../../../checkout/lib/domestic-pricing.mjs';
import {allowRequest} from '../../../checkout/lib/rate-limit.mjs';
import {randomUUID,createHash} from 'node:crypto';
import {ETSY_LISTINGS} from '../../../src/data/etsyListings.ts';
import {validateCustomer,opaqueToken,CheckoutError} from '../../../checkout/lib/payment.mjs';
import {createGatewayOrder} from '../../../checkout/lib/gateway.mjs';
import {json,sameOrigin,jsonBody,safeError} from '../../../checkout/lib/http.mjs';
export async function createOrder({request,env},market='usd'){
 let accessCookie;
 try{
  const {keyId,mode}=checkoutConfig(env);sameOrigin(request);if(mode==='live'&&market!=='domestic')throw new CheckoutError('checkout_unavailable');
  // A deployed rate limiter and abuse controls are required before enabling even a shared test preview.
  if(!await allowRequest(env,request,'checkout-create',5))return json({error:'try_later'},429);
  const input=await jsonBody(request);const customer=validateCustomer(input);
  if(!/^[a-f0-9-]{36}$/.test(input.requestId||''))throw new CheckoutError('invalid_input');
  const product=ETSY_LISTINGS.find(item=>item.slug===input.slug);if(!product)throw new CheckoutError('unknown_product');
  const previous=await env.ORDER_DB.prepare('SELECT id FROM orders WHERE client_request_id=?').bind(input.requestId).first();
  // Never issue a second gateway order after an uncertain response. Operator reconciliation must resolve it.
  if(previous)return json({error:'request_already_received'},409);
  const now=Date.now();const id=randomUUID();const token=opaqueToken();
  const quote=market==='domestic'?domesticPrice(product,env):{amount_minor:Math.round(product.price*100),currency:'USD'};
  const order={id,...quote};
  await env.ORDER_DB.batch([
   env.ORDER_DB.prepare('INSERT INTO orders(id,client_request_id,product_slug,product_title,amount_minor,currency,customer_name,customer_email,customer_question,terms_version,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,input.requestId,product.slug,product.title,order.amount_minor,order.currency,customer.name,customer.email,customer.question,mode==='live'?env.ORDER_TERMS_VERSION:'checkout-draft-2026-11-25',now,now),
   env.ORDER_DB.prepare('INSERT INTO access_tokens(token_hash,order_id,expires_at) VALUES(?,?,?)').bind(createHash('sha256').update(token).digest('hex'),id,now+30*24*60*60*1000)
  ]);
  accessCookie=`guest_order=${token}; Secure; HttpOnly; SameSite=Strict; Path=/api/checkout; Max-Age=2592000`;
  const remote=await createGatewayOrder(env,order);
  await env.ORDER_DB.prepare('UPDATE orders SET gateway_order_id=?,updated_at=? WHERE id=? AND gateway_order_id IS NULL').bind(remote.id,Date.now(),id).run();
  // Token is a bearer secret. Store only its hash, keep it out of URLs, logs and analytics.
  const response=json({id,keyId,gatewayOrderId:remote.id,amount:order.amount_minor,currency:order.currency,productTitle:product.title});
  response.headers.set('Set-Cookie',accessCookie);
  return response;
 }catch(error){const response=safeError(error);if(accessCookie)response.headers.set('Set-Cookie',accessCookie);return response;}
}

export const onRequestPost=context=>createOrder(context);
