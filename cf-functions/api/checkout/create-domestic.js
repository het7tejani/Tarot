import {createOrder} from './create.js';
// Separate explicit route, never a guessed visitor location or a buyer-supplied amount.
// Deployment requires an INR-compatible isolated database and settled server price tiers.
export const onRequestPost=context=>createOrder(context,'domestic');
