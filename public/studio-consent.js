/* Clarity-specific consent gate; existing GA4 is unchanged. */
(function () {
  'use strict';
  var key = 'psychic-studio-clarity-consent-v1';
  var choice = null;
  var loaded = false;
  try { choice = localStorage.getItem(key); } catch (_) {}
  function isPrivate() { return /^\/(admin|cms)(\/|$)/.test(location.pathname); }
  function clarityStub() { window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); }; }
  function signal(granted) {
    if (window.clarity) window.clarity('consentv2', { analytics_Storage: granted ? 'granted' : 'denied', ad_Storage: 'denied' });
  }
  function startClarity() {
    if (loaded || choice !== 'accepted' || isPrivate()) return;
    loaded = true;
    clarityStub();
    signal(true);
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.clarity.ms/tag/ywia4vi28f';
    document.head.appendChild(script);
  }
  function decide(value) {
    choice = value;
    try { localStorage.setItem(key, value); } catch (_) {}
    document.getElementById('studio-cookie-banner').hidden = true;
    document.body.classList.remove('studio-cookie-open');
    if (value === 'accepted') startClarity();
    else { signal(false); if (loaded) location.reload(); }
  }
  function mount() {
    if (isPrivate()) return;
    var banner = document.createElement('section');
    banner.id = 'studio-cookie-banner';
    banner.setAttribute('aria-label', 'Clarity cookie choice');
    banner.innerHTML = '<div><strong>Clarity analytics cookies</strong><p>Allow Microsoft Clarity to use analytics cookies and record how you use this site? You can reject Clarity or change this choice later.</p><a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft privacy statement</a></div><div class="studio-cookie-actions"><button type="button" data-choice="rejected">Reject</button><button type="button" data-choice="accepted">Accept</button></div>';
    banner.hidden = choice === 'accepted' || choice === 'rejected';
    document.body.classList.toggle('studio-cookie-open', !banner.hidden);
    banner.querySelectorAll('[data-choice]').forEach(function (b) { b.addEventListener('click', function () { decide(b.dataset.choice); }); });
    document.body.appendChild(banner);
    document.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('[data-cookie-settings]') : null;
      if (t) { e.preventDefault(); banner.hidden = false; document.body.classList.add('studio-cookie-open'); banner.querySelector('button').focus(); }
    });
    if (choice === 'accepted') startClarity();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true }); else mount();
})();
