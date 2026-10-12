import React, { useEffect, useRef } from 'react';

type TrustpilotWindow = Window & {
  Trustpilot?: { loadFromElement: (element: HTMLElement, forceReload?: boolean) => void };
};

let bootstrap: Promise<void> | undefined;
const loadBootstrap = () => {
  if ((window as TrustpilotWindow).Trustpilot) return Promise.resolve();
  if (!bootstrap) {
    bootstrap = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Trustpilot widget unavailable'));
      document.head.appendChild(script);
    });
  }
  return bootstrap;
};

/** Official free Review Collector. Load near the footer, not during initial render. */
export const TrustpilotReviewCollector: React.FC = () => {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = element.current;
    if (!node) return;
    let active = true;
    const initialize = () => {
      void loadBootstrap().then(() => {
        if (active && !node.querySelector('iframe')) {
          (window as TrustpilotWindow).Trustpilot?.loadFromElement(node, true);
        }
      }).catch(() => { /* Keep the plain review link usable if Trustpilot is blocked. */ });
    };
    const observer = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer?.disconnect();
          initialize();
        }
      }, { rootMargin: '300px' })
      : null;
    if (observer) observer.observe(node);
    else initialize();
    return () => { active = false; observer?.disconnect(); };
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: 360, marginTop: 24, minHeight: 52 }} aria-label="Review The Psychic Studio on Trustpilot">
      <div ref={element} className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="6accbc7aeb5b17997e5eadb1"
        data-style-height="52px"
        data-style-width="100%"
        data-token="0beaef28-77ad-4736-bb00-c42dc7897d62">
        <a href="https://www.trustpilot.com/review/thepsychicstudio.com" target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', minHeight: 52, fontSize: 14 }}>
          Review us on Trustpilot
        </a>
      </div>
    </div>
  );
};
