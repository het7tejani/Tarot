import {enabledTestConfig,CheckoutError} from '../../../checkout/lib/payment.mjs';
import {requireOwner} from '../../../checkout/lib/owner.mjs';
import {prepareRecovery,revokeOrderAccess} from '../../../checkout/lib/recovery.mjs';
import {json,sameOrigin,jsonBody,safeError} from '../../../checkout/lib/http.mjs';
// Owner-only preview. This never sends or authorizes an email.
export async function onRequestPost({request,env}){try{
 enabledTestConfig(env);sameOrigin(request);requireOwner(request,env);
 const input=await jsonBody(request,1024);
 if(input.action==='revoke'){
  await revokeOrderAccess(env.ORDER_DB,input.orderId);return json({ok:true});
 }
 if(input.action!=='prepare')throw new CheckoutError('invalid_input');
 const recovery=await prepareRecovery(env.ORDER_DB,input);
 if(!recovery)throw new CheckoutError('not_found');
 return json({recovery,notification:'not_sent'});
}catch(error){return safeError(error);}}
