import {CheckoutError} from './payment.mjs';
import {checkoutConfig} from './config.mjs';
export async function gateway(env,path,{method='GET',body,fetcher=fetch}={}){
 checkoutConfig(env,{allowPaused:true});
 if(!/^\/(orders|payments)(\/[A-Za-z0-9_]+)?(\/payments)?$/.test(path))throw new CheckoutError('invalid_gateway_path');
 const response=await fetcher(`https://api.razorpay.com/v1${path}`,{method,headers:{Authorization:`Basic ${Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString('base64')}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(12000)});
 if(!response.ok)throw new CheckoutError('gateway_unavailable');
 return response.json();
}
export async function createGatewayOrder(env,order,options={}){
 const result=await gateway(env,'/orders',{...options,method:'POST',body:{amount:order.amount_minor,currency:order.currency,receipt:order.id,notes:{internal_order_id:order.id}}});
 if(!/^order_[A-Za-z0-9]+$/.test(result.id||'')||result.amount!==order.amount_minor||result.currency!==order.currency||result.receipt!==order.id)throw new CheckoutError('gateway_order_mismatch');
 return result;
}
