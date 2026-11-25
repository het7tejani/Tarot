import {CheckoutError} from './payment.mjs';
// Separate domestic catalog. Never infer an exchange rate or accept browser amounts.
// This configuration is intentionally absent until the owner settles final INR prices.
export function domesticPrice(product,env){
 let tiers;try{tiers=JSON.parse(env.DOMESTIC_INR_TIERS||'null')}catch{throw new CheckoutError('domestic_prices_unavailable')}
 if(!tiers||typeof tiers!=='object'||Array.isArray(tiers))throw new CheckoutError('domestic_prices_unavailable');
 const required=['5','9','15'];
 if(Object.keys(tiers).sort().join(',')!==required.sort().join(','))throw new CheckoutError('domestic_prices_unavailable');
 for(const tier of required)if(!Number.isSafeInteger(tiers[tier])||tiers[tier]<100||tiers[tier]>50000000)throw new CheckoutError('domestic_prices_unavailable');
 const amount=tiers[String(product?.price)];
 if(!amount)throw new CheckoutError('domestic_prices_unavailable');
 return {amount_minor:amount,currency:'INR'};
}
