import {CheckoutError} from './payment.mjs';
export const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'}});
export function sameOrigin(request){
 const origin=request.headers.get('Origin');
 if(!origin||origin!==new URL(request.url).origin)throw new CheckoutError('forbidden');
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))throw new CheckoutError('unsupported_media');
}
export async function boundedBody(request,maxBytes=16384){
 const reader=request.body?.getReader();if(!reader)throw new CheckoutError('invalid_input');
 let size=0;const chunks=[];
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>maxBytes){await reader.cancel();throw new CheckoutError('body_too_large');}chunks.push(value);}
 const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
 return new TextDecoder('utf-8',{fatal:true}).decode(bytes);
}
export async function jsonBody(request,maxBytes=16384){
 try{return JSON.parse(await boundedBody(request,maxBytes));}catch(error){if(error instanceof CheckoutError)throw error;throw new CheckoutError('invalid_input');}
}
export function safeError(error){
 const publicCodes={forbidden:403,unsupported_media:415,invalid_input:400,invalid_customer:400,body_too_large:413,unknown_product:400,payment_mismatch:409,invalid_signature:400,not_found:404};
 const code=error instanceof CheckoutError?error.code:'internal_error';
 return json({error:publicCodes[code]?code:'checkout_unavailable'},publicCodes[code]||503);
}
