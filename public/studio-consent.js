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
    script.src = 'https://www.clarity.ms/tag/ywia4vi28ff';
    document.head.appendChild(script);
  }
  function decide(value) {
    choice = value;
    try { localStorage.setItem(key, value); } catch (_) {}
    document.getElementById('studio-cookie-banner').hidden = true;
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
    banner.querySelectorAll('[data-choice]').forEach(function (b) { b.addEventListener('click', function () { decide(b.dataset.choice); }); });
    document.body.appendChild(banner);
    var settings = document.createElement('button');
    settings.type = 'button'; settings.id = 'studio-cookie-settings'; settings.textContent = 'Clarity cookie settings';
    settings.addEventListener('click', function () { banner.hidden = false; banner.querySelector('button').focus(); });
    document.body.appendChild(settings);
    if (choice === 'accepted') startClarity();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true }); else mount();
})();
