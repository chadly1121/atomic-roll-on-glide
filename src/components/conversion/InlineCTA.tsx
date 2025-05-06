
import React from 'react';
import { motion } from 'framer-motion';
import CallToAction from './CallToAction';
import { BadgeCheck } from 'lucide-react';

interface InlineCTAProps {
  title: string;
  description?: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  variant?: 'light' | 'dark' | 'accent';
  className?: string;
  showTrustBadges?: boolean;
}

const InlineCTA = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'light',
  className = '',
  showTrustBadges = false,
}: InlineCTAProps) => {
  // Variant styles
  const variantStyles = {
    light: 'bg-white text-atomic-navy',
    dark: 'bg-atomic-navy text-white',
    accent: 'bg-atomic-turquoise/10 text-atomic-navy',
  };

  // Trust badges to display
  const trustBadges = [
    { text: "5-star rated service" },
    { text: "Licensed & insured" },
    { text: "Free estimates" },
    { text: "10-year warranty" }
  ];

  return (
    <motion.div 
      className={`py-8 px-6 md:py-12 md:px-10 rounded-xl shadow-md ${variantStyles[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">{title}</h3>
        {description && (
          <p className="text-lg mb-6 opacity-90">{description}</p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <CallToAction 
            text={primaryCTA.text} 
            href={primaryCTA.href} 
            variant="primary" 
            size="lg" 
          />
          
          {secondaryCTA && (
            <CallToAction 
              text={secondaryCTA.text} 
              href={secondaryCTA.href} 
              variant="outline" 
              size="lg" 
            />
          )}
        </div>

        {showTrustBadges && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {trustBadges.map((badge, index) => (
              <div 
                key={index} 
                className="flex items-center text-sm font-medium"
              >
                <BadgeCheck className="h-4 w-4 mr-1 text-atomic-turquoise" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InlineCTA;
