import { useEffect } from 'react';
import { trackEvent, currentPath } from '@/lib/analytics';

/**
 * Global, delegated tracker for every telephone link/button on the site.
 * One listener covers header, footer, sticky mobile button, contact page,
 * location pages and any future tel: link — no per-component wiring needed.
 *
 * Only fires on a genuine click/tap (never on mount), and trackEvent's
 * debounce guarantees one event per user action.
 */
const resolveLocation = (el: Element): string => {
  const explicit = el.closest<HTMLElement>('[data-analytics-location]');
  if (explicit?.dataset.analyticsLocation) return explicit.dataset.analyticsLocation;
  if (el.closest('header, nav')) return 'header';
  if (el.closest('footer')) return 'footer';
  if (currentPath() === '/contact') return 'contact_page';
  return 'page_body';
};

const PhoneClickTracker = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || typeof target.closest !== 'function') return;

      const link = target.closest<HTMLElement>('a[href^="tel:"], [data-phone-cta]');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const phoneNumber = href.startsWith('tel:')
        ? href.slice(4)
        : link.getAttribute('data-phone-cta') || '';

      trackEvent('phone_call_click', {
        location: resolveLocation(link),
        page_path: currentPath(),
        phone_number: phoneNumber,
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
};

export default PhoneClickTracker;
