import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {onRequestGet} from '../../cf-functions/api/checkout/status.js';
function fixture(cookie='a'.repeat(43),record={id:'saved',payment_status:'pending',customer_name:'Example',customer_email:'example@example.test',customer_question:'Example context',customer_dob:null}){
 let selected='',args=[],reads=0;
 const env={CHECKOUT_ENABLED:'test',RAZORPAY_KEY_ID:'rzp_test_fixture',RAZORPAY_KEY_SECRET:'fixture',RAZORPAY_WEBHOOK_SECRET:'fixture',ORDER_DB:{prepare(sql){selected=sql;return{bind(...values){args=values;return this},async first(){reads++;return record}}}}};
 const headers=cookie===null?{}:{Cookie:'guest_order='+cookie};
 return{env,request:new Request('https://example.test/api/checkout/status?order=other',{headers}),get:()=>({selected,args,reads})};
}
test('guest review returns saved fields only through hashed active unconsumed bearer token',async()=>{
 const f=fixture(),before=Date.now(),r=await onRequestGet(f),j=await r.json(),q=f.get();
 assert.equal(r.status,200);assert.equal(j.order.customer_name,'Example');assert.equal(j.order.customer_dob,null);
 assert.match(q.selected,/o.customer_name,o.customer_email,o.customer_question,o.customer_dob/);
 assert.match(q.selected,/t.token_hash=\? AND t.expires_at>\? AND t.consumed_at IS NULL/);
 assert.equal(q.args[0],createHash('sha256').update('a'.repeat(43)).digest('hex'));assert.ok(q.args[1]>=before);
 assert.equal(r.headers.get('Cache-Control'),'no-store');assert.equal(r.headers.get('Referrer-Policy'),'no-referrer');
});
test('no cookie or malformed cookie exposes no details and never reads database',async()=>{
 for(const token of [null,'bad','x'.repeat(44)]){const f=fixture(token),r=await onRequestGet(f);assert.equal(r.status,404);assert.equal(f.get().reads,0);assert.deepEqual(await r.json(),{error:'not_found'})}
});
test('unknown expired or consumed guest access returns private not-found without details',async()=>{
 const f=fixture('a'.repeat(43),null),r=await onRequestGet(f);assert.equal(r.status,404);assert.deepEqual(await r.json(),{error:'not_found'});assert.equal(r.headers.get('Cache-Control'),'no-store');
});
