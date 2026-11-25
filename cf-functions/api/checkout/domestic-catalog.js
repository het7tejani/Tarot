import {ETSY_LISTINGS} from '../../../src/data/etsyListings.ts';
import {domesticPrice} from '../../../checkout/lib/domestic-pricing.mjs';
import {enabledTestConfig} from '../../../checkout/lib/payment.mjs';
import {json,safeError} from '../../../checkout/lib/http.mjs';
export function onRequestGet({env}){try{enabledTestConfig(env);const products=ETSY_LISTINGS.map(product=>({slug:product.slug,title:product.title,...domesticPrice(product,env)}));return json({market:'India',currency:'INR',products});}catch(error){return safeError(error)}}
