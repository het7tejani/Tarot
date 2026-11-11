const INTERNAL_KEY = 'psychic-studio-internal';
const PRIVATE_PATH = /^\/(admin|cms|boundary-preview-test)(\/|$)/;

export type StudioAnalyticsParams = Record<string, string | number | boolean | undefined>;

export function trackStudioEvent(name: string, params: StudioAnalyticsParams = {}) {
  try {
    if (PRIVATE_PATH.test(window.location.pathname)) return;
    if (window.localStorage.getItem(INTERNAL_KEY) === '1') return;
    const win = window as typeof window & { dataLayer?: unknown[] };
    win.dataLayer = win.dataLayer || [];
    (function () { win.dataLayer!.push(arguments); })('event', name, params);
  } catch {
    // Analytics must never interrupt the visit.
  }
}
