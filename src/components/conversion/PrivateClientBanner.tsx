import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Subtle premium banner linking to the Private Client landing page.
 * Designed to feel like a "hidden upgrade," not a sales pitch.
 * 
 * Variants:
 * - "light" (default): for light-background pages (homepage, location pages)
 * - "dark": for dark-background pages or service page templates
 */
interface PrivateClientBannerProps {
  variant?: 'light' | 'dark';
}

const PrivateClientBanner: React.FC<PrivateClientBannerProps> = ({ variant = 'light' }) => {
  if (variant === 'dark') {
    return (
      <section className="py-14 md:py-18 bg-[hsl(220,20%,6%)] border-y border-[hsl(0,0%,14%)]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-[hsl(0,0%,40%)] text-xs tracking-[0.25em] uppercase mb-4">Private Client Services</p>
          <p className="text-[hsl(0,0%,55%)] text-base leading-relaxed mb-8 max-w-lg mx-auto">
            For homeowners who prefer a fully managed approach, our Private Client program provides ongoing care, maintenance planning, and priority scheduling for Muskoka properties.
          </p>
          <Link
            to="/private-client-muskoka-property-care"
            className="inline-flex items-center gap-2 text-[hsl(0,0%,55%)] text-sm tracking-widest uppercase hover:text-white transition-colors duration-300"
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-18 bg-muted/70 border-y border-border/50">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-muted-foreground/60 text-xs tracking-[0.25em] uppercase mb-4">Private Client Services</p>
        <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg mx-auto">
          For homeowners who prefer a fully managed approach, our Private Client program provides ongoing care, maintenance planning, and priority scheduling for Muskoka properties.
        </p>
        <Link
          to="/private-client-muskoka-property-care"
          className="inline-flex items-center gap-2 text-muted-foreground/70 text-sm tracking-widest uppercase hover:text-foreground transition-colors duration-300"
        >
          Learn More
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default PrivateClientBanner;
