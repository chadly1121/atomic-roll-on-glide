/**
 * Lightweight GA4 event helper.
 *
 * The gtag snippet is already loaded in index.html (G-MQXX7WKKX6 + AW-481474558).
 * This module NEVER loads another tag — it only calls the gtag that already exists,
 * and silently no-ops when it is missing (blocked, still loading, or SSR/prerender).
 */

export type GtagParams = Record<string, string | number | boolean | undefined>;

type GtagFn = (command: string, targetOrName: string, params?: GtagParams) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

/** Current route path, used as a structural parameter (never contains PII). */
export const currentPath = (): string =>
  typeof window === 'undefined' ? '' : window.location.pathname;

/** Repeat-suppression: identical event keys fired within this window are dropped. */
const DEBOUNCE_MS = 1000;
const lastFired = new Map<string, number>();
const firedOnce = new Set<string>();

/**
 * Fire a GA4 event. Safe to call anywhere — no-ops if gtag is unavailable.
 * Identical events fired within one second are collapsed into one.
 */
export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const key = `${name}:${JSON.stringify(params)}`;
  const now = Date.now();
  const previous = lastFired.get(key);
  if (previous !== undefined && now - previous < DEBOUNCE_MS) return;
  lastFired.set(key, now);

  try {
    window.gtag('event', name, params);
  } catch {
    /* analytics must never break the UI */
  }
}

/**
 * Fire an event at most once per unique key for the life of this page view
 * (e.g. one form_start per form per page view).
 */
export function trackEventOnce(key: string, name: string, params: GtagParams = {}): void {
  if (firedOnce.has(key)) return;
  firedOnce.add(key);
  trackEvent(name, params);
}

/** True when the given once-key has already fired in this page view. */
export function hasFiredOnce(key: string): boolean {
  return firedOnce.has(key);
}
