import {createHmac, timingSafeEqual, randomBytes} from 'node:crypto';
export class CheckoutError extends Error { constructor(code) {super(code);this.code=code;} }
export const opaqueToken=()=>randomBytes(32).toString('base64url');
export const digest=(secret,message)=>createHmac('sha256',secret).update(message).digest('hex');
export function verifySignature(secret,message,signature){
 if(!secret || typeof signature!=='string' || !/^[a-f0-9]{64}$/.test(signature))return false;
 return timingSafeEqual(Buffer.from(digest(secret,message),'hex'),Buffer.from(signature,'hex'));
}
export function verifyCheckout(secret,storedGatewayOrderId,paymentId,signature){
 return /^order_[A-Za-z0-9]+$/.test(storedGatewayOrderId||'') && /^pay_[A-Za-z0-9]+$/.test(paymentId||'') && verifySignature(secret,`${storedGatewayOrderId}|${paymentId}`,signature);
}
export function validateCustomer(input){
 if(!input||typeof input!=='object')throw new CheckoutError('invalid_input');
 const name=typeof input.name==='string'?input.name.trim():'';
 const email=typeof input.email==='string'?input.email.trim().toLowerCase():'';
 const question=typeof input.question==='string'?input.question.trim():'';
 if(name.length<1||name.length>120||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||question.length<5||question.length>4000||input.adult!==true||input.acceptTerms!==true)throw new CheckoutError('invalid_customer');
 return {name,email,question};
}
export function paymentDecision(order,payment){
 if(!payment||payment.order_id!==order.gateway_order_id||payment.amount!==order.amount_minor||payment.currency!==order.currency)throw new CheckoutError('payment_mismatch');
 if(payment.status!=='captured'||payment.captured!==true)return {action:'wait'};
 if(['refunded','partially_refunded','disputed'].includes(order.payment_status))return {action:'exception',reason:'capture_after_'+order.payment_status};
 if(order.paid_payment_id===payment.id)return {action:'duplicate'};
 if(order.paid_payment_id)return {action:'exception',reason:'extra_capture'};
 return {action:'mark_paid',paymentId:payment.id};
}
export function enabledTestConfig(env){
 // Deliberately fail closed. Live activation is not implemented in this prototype.
 if(env.CHECKOUT_ENABLED!=='test'||!String(env.RAZORPAY_KEY_ID||'').startsWith('rzp_test_')||!env.RAZORPAY_KEY_SECRET||!env.RAZORPAY_WEBHOOK_SECRET||!env.ORDER_DB)throw new CheckoutError('checkout_unavailable');
 return {keyId:env.RAZORPAY_KEY_ID};
}
