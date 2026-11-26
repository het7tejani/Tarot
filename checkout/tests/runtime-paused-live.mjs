import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {randomBytes} from 'node:crypto';
import assert from 'node:assert/strict';
import {hashPassword} from '../lib/password.mjs';
import {ownerSession} from '../lib/owner.mjs';
const require=createRequire(import.meta.url);
const {Miniflare,convertV4MiniflareOptions}=require(process.env.MINIFLARE_MODULE||'miniflare');
const bundle=process.env.RUNTIME_BUNDLE_DIR;
if(!bundle)throw Error('RUNTIME_BUNDLE_DIR required');
const password=randomBytes(24).toString('hex');
const bindings={CHECKOUT_MODE:'live',CHECKOUT_ACCEPTING_ORDERS:'no',ORDER_ENVIRONMENT:'psychic-domestic-production',ORDER_CURRENCY:'INR',ORDER_FULFILMENT:'manual_email_24h',ORDER_TERMS_VERSION:'domestic-manual-2026-11-26',DOMESTIC_INR_TIERS:readFileSync(new URL('../fixtures/domestic-price-snapshot.json',import.meta.url),'utf8'),RAZORPAY_KEY_ID:'rzp_live_fixture_never_real',RAZORPAY_KEY_SECRET:'synthetic_not_real',RAZORPAY_WEBHOOK_SECRET:'synthetic_not_real',ORDER_OWNER_SESSION_SECRET:randomBytes(32).toString('hex'),ORDER_RATE_LIMIT_SECRET:randomBytes(32).toString('hex'),ORDER_OWNER_SESSION_EPOCH:'live-v1',ORDER_OWNER_PASSWORD_HASH:await hashPassword(password)};
bindings.DOMESTIC_INR_TIERS=JSON.stringify(JSON.parse(bindings.DOMESTIC_INR_TIERS).tiersPaise);
const mf=new Miniflare(convertV4MiniflareOptions({workers:[{name:'paused-live-runtime',modulesRoot:bundle,modules:true,scriptPath:bundle+'/index.js',compatibilityDate:'2026-11-13',compatibilityFlags:['nodejs_compat'],d1Databases:['ORDER_DB'],bindings}]}));
const origin='https://runtime.example.test';
async function req(path,{body,cookie,originHeader=origin,method=body?'POST':'GET'}={}){
 return mf.dispatchFetch(origin+path,{method,headers:{Origin:originHeader,'CF-Connecting-IP':'192.0.2.8',...(body?{'Content-Type':'application/json'}:{}),...(cookie?{Cookie:cookie}:{})},...(body?{body:JSON.stringify(body)}:{})});
}
function privateHeaders(r){assert.match(r.headers.get('Cache-Control'),/no-store/);assert.match(r.headers.get('X-Robots-Tag'),/noindex/);assert.equal(r.headers.get('Referrer-Policy'),'no-referrer');assert.doesNotMatch(r.headers.get('Content-Security-Policy'),/clarity|googletagmanager/);}
try{
 const db=await mf.getD1Database('ORDER_DB');
 for(const sql of readFileSync(new URL('../production/schema-inr.sql',import.meta.url),'utf8').replace(/^--.*$/mg,'').split(';').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
 let r=await req('/api/checkout/create-domestic',{body:{}});assert.equal(r.status,503);privateHeaders(r);
 assert.equal((await db.prepare('SELECT count(*) n FROM orders').first()).n,0);
 r=await req('/api/checkout/domestic-catalog');assert.equal(r.status,200);privateHeaders(r);const catalog=await r.json();assert.equal(catalog.currency,'INR');assert.equal(catalog.products.find(p=>p.slug==='one-question-tarot').amount_minor,46234);
 r=await req('/api/orders-owner/orders');assert.equal(r.status,401);privateHeaders(r);
 r=await req('/api/orders-owner/session',{body:{action:'login',password},originHeader:'https://foreign.example.test'});assert.equal(r.status,403);
 r=await req('/api/orders-owner/session',{body:{action:'login',password:'wrong'}});assert.equal(r.status,401);
 r=await req('/api/orders-owner/session',{body:{action:'login',password}});assert.equal(r.status,204);privateHeaders(r);const cookie=r.headers.get('Set-Cookie').split(';')[0];assert.match(r.headers.get('Set-Cookie'),/HttpOnly; Secure/);
 const wrongAudience=ownerSession({...bindings,CHECKOUT_MODE:'test'},'studio-owner');r=await req('/api/orders-owner/orders',{cookie:'studio_orders_owner='+wrongAudience});assert.equal(r.status,401);
 const wrongEpoch=ownerSession({...bindings,ORDER_OWNER_SESSION_EPOCH:'revoked-v0'},'studio-owner');r=await req('/api/orders-owner/orders',{cookie:'studio_orders_owner='+wrongEpoch});assert.equal(r.status,401);
 const id='10000000-0000-4000-8000-000000000001',now=Date.now();
 await db.prepare('INSERT INTO orders(id,client_request_id,product_slug,product_title,amount_minor,currency,customer_name,customer_email,customer_question,customer_dob,terms_version,created_at,updated_at,payment_status,paid_at,due_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,'synthetic-local-only','one-question-tarot','SYNTHETIC manual workflow',46234,'INR','Sample','sample@example.test','Synthetic local test','1990-01-01',bindings.ORDER_TERMS_VERSION,now,now,'paid',now,now+86400000).run();
 r=await req('/api/orders-owner/orders?id='+id,{cookie});assert.equal(r.status,200);const detail=await r.json();assert.equal(detail.order.customer_dob,'1990-01-01');
 r=await req('/api/orders-owner/manual-complete',{cookie,body:{id,recipient:'different@example.test',confirmSent:true}});assert.equal(r.status,409);
 r=await req('/api/orders-owner/manual-complete',{cookie,body:{id,recipient:'sample@example.test',confirmSent:true}});assert.equal(r.status,200);
 r=await req('/api/orders-owner/manual-complete',{cookie,body:{id,recipient:'sample@example.test',confirmSent:true}});assert.equal(r.status,409);
 assert.equal((await db.prepare("SELECT count(*) n FROM admin_audit WHERE action='manual_email_sent_attested'").first()).n,1);
 for(const path of ['/orders-test','/checkout-test/one-question-tarot','/api/orders-owner/files','/api/orders-owner/publish','/api/orders-owner/recovery','/api/checkout/download','/api/checkout/recover']){r=await req(path,{cookie});assert.equal(r.status,404,path);privateHeaders(r);}
 r=await mf.dispatchFetch(origin+'/api/checkout/webhook',{method:'POST',headers:{'Content-Type':'application/json','X-Razorpay-Signature':'0'.repeat(64),'X-Razorpay-Event-Id':'synthetic-invalid'},body:'{}'});assert.equal(r.status,400);privateHeaders(r);assert.equal((await db.prepare('SELECT count(*) n FROM gateway_events').first()).n,0);
 r=await req('/api/orders-owner/session',{cookie,body:{action:'logout'}});assert.equal(r.status,204);assert.match(r.headers.get('Set-Cookie'),/Max-Age=0/);
 console.log(JSON.stringify({ok:true,runtime:'local workerd nodejs_compat 2026-11-13',mode:'synthetic paused live',schema:'new INR-only',checks:['create gate rejects before gateway or DB write','domestic fixed quote','owner login and origin','Test audience rejection','revoked epoch rejection','optional DOB stored','exact recipient and once-only sent attestation','disabled PDF/recovery/Test routes','invalid webhook no event','private response headers','logout cookie'],externalGatewayCalls:0,emailsSent:0,realOrders:0}));
}finally{await mf.dispose();}
