import React from 'react';
import { Phone } from 'lucide-react';
import { businessInfo } from '@/data/businessInfo';

/**
 * Global floating "Call Now" button.
 * Renders on every page so a tappable phone CTA is always one tap away.
 * - Mobile: prominent pill at bottom-left with label.
 * - Desktop: compact circular icon button at bottom-left.
 * Uses native tel: link (per CTA protocol memory).
 */
const FloatingCallButton: React.FC = () => {
  return (
    <a
      href={`tel:${businessInfo.phone.tel}`}
      aria-label={`Call ${businessInfo.phone.formatted} now`}
      data-testid="floating-call-button"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-atomic-orange text-white shadow-lg hover:bg-atomic-orange/90 active:scale-95 transition-all px-4 py-3 md:px-3 md:py-3 min-h-[48px] min-w-[48px] font-semibold"
    >
      <Phone className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      <span className="text-sm md:hidden">Call Now</span>
      <span className="hidden md:inline text-sm">{businessInfo.phone.formatted}</span>
    </a>
  );
};

export default FloatingCallButton;