import {checkoutConfig} from '../../../checkout/lib/config.mjs';
import {ETSY_LISTINGS} from '../../../src/data/etsyListings.ts';
import {domesticPrice} from '../../../checkout/lib/domestic-pricing.mjs';
import {json,safeError} from '../../../checkout/lib/http.mjs';
export function onRequestGet({env}){try{checkoutConfig(env,{allowPaused:true});const products=ETSY_LISTINGS.map(product=>({slug:product.slug,title:product.title,...domesticPrice(product,env)}));return json({market:'India',currency:'INR',products});}catch(error){return safeError(error)}}
