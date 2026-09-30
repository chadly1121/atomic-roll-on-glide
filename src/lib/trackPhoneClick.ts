/**
 * Fire the GA4 `phone_call_click` event. Never blocks navigation and never
 * throws — the tel: link's default action always proceeds.
 */
export function trackPhoneClick(linkUrl: string, linkLocation: string): void {
  try {
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'phone_call_click', {
      link_url: linkUrl,
      link_location: linkLocation,
    });
  } catch {
    /* analytics must never break the UI */
  }
}
