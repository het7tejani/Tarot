/* Empty brand-owned GTM container. Existing GA4 and consent-gated Clarity stay separate. */
(function () {
  'use strict';
  if (/^\/(admin|cms|boundary-preview-test)(\/|$)/.test(location.pathname)) return;
  try { if (new URLSearchParams(location.search).get('internal') === '1') localStorage.setItem('psychic-studio-internal', '1'); if (new URLSearchParams(location.search).get('internal') === '0') localStorage.removeItem('psychic-studio-internal'); if (localStorage.getItem('psychic-studio-internal') === '1') return; } catch (e) { /* storage unavailable */ }

  // Key-event pushes in gtag format; the Google tag in the container forwards them to GA4.
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var path = a.getAttribute('href') || '';
    var name = /^\/shop(\/|$|\?)/.test(path) ? 'shop_click' : /^\/readings(\/|$|\?)/.test(path) ? 'readings_click' : /^\/free-tarot(\/|$|\?)/.test(path) ? 'free_tarot_click' : '';
    if (!name) return;
    window.dataLayer = window.dataLayer || [];
    (function () { window.dataLayer.push(arguments); })('event', name, { link_url: path, page_path: location.pathname });
  }, true);
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
