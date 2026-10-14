/* Empty brand-owned GTM container. Existing GA4 and consent-gated Clarity stay separate. */
(function () {
  'use strict';
  if (/^\/(admin|cms)(\/|$)/.test(location.pathname)) return;
  function load() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MXBQ87JD';
    document.head.appendChild(script);
  }
  function schedule() {
    if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 3000 });
    else window.setTimeout(load, 1500);
  }
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
})();
