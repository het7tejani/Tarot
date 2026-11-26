export const PRIVATE_ROUTE=/^\/(?:checkout|orders)(?:\/|$)/;
export const PRIVATE_API=/^\/api\/(?:checkout|orders-owner)(?:\/|$)/;
export const TEST_ROUTE=/^\/(?:checkout-test|orders-test|checkout-preview|orders-preview)(?:\/|$)/;
// Private responses must not inherit public caching, referrers, indexing or analytics CSP.
// Gateway-domain allowances still require hosted Checkout validation before launch.
export const PRIVATE_CSP="default-src 'self'; script-src 'self' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.razorpay.com https://checkout.razorpay.com; connect-src 'self' https://api.razorpay.com https://checkout.razorpay.com https://lumberjack.razorpay.com; frame-src https://api.razorpay.com https://checkout.razorpay.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'";
export function privateHeaders(response){
 const headers=new Headers(response.headers);
 headers.set('Cache-Control','no-store, private');headers.set('Pragma','no-cache');
 headers.set('X-Robots-Tag','noindex, nofollow, noarchive');headers.set('Referrer-Policy','no-referrer');
 headers.set('X-Content-Type-Options','nosniff');if(!headers.get('Content-Type')?.startsWith('application/pdf'))headers.set('Content-Security-Policy',PRIVATE_CSP);
 headers.delete('Content-Security-Policy-Report-Only');
 return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
