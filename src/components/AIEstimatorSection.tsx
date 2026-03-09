import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
// Quohta AI estimator iframe embed – do not delete

const AIEstimatorSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for custom event from FloatingEstimateButton
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-ai-estimator', handler);
    return () => window.removeEventListener('open-ai-estimator', handler);
  }, []);
  const [isLoaded, setIsLoaded] = useState(false);

  const benefits = [
    { icon: Clock, text: "Get instant estimates in seconds" },
    { icon: Calculator, text: "AI-powered accuracy" },
    { icon: CheckCircle, text: "No obligation quote" },
  ];

  return (
    <>
      {/* CTA Section */}
      <section
        id="ai-estimator"
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-atomic-orange/10 via-white to-atomic-turquoise/10 relative overflow-hidden"
        aria-labelledby="ai-estimator-heading"
      >
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-atomic-pink/20 text-atomic-pink px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="font-semibold text-xs sm:text-sm uppercase tracking-wide">AI-Powered Technology</span>
            </div>

            <h2
              id="ai-estimator-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-atomic-navy mb-3 sm:mb-4 px-2"
            >
              Get Your <span className="text-atomic-pink">Instant Painting Estimate</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-atomic-navy/70 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              Our AI-powered estimator gives you an accurate quote in seconds. Simply answer a few questions
              about your project and get a professional estimate instantly.
            </p>

            {/* Benefits */}
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-10 px-2" role="list">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center gap-2 bg-white/80 px-3 sm:px-4 py-2 rounded-lg shadow-sm"
                >
                  <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-atomic-turquoise flex-shrink-0" aria-hidden="true" />
                  <span className="text-atomic-navy font-medium text-sm sm:text-base">{benefit.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 bg-atomic-orange text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:bg-atomic-orange/90 transition-all group"
            >
              <Calculator className="w-5 h-5" />
              Get Your Free Estimate Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-xs sm:text-sm text-atomic-navy/50 mt-4 px-2">
              Trusted by hundreds of Muskoka homeowners
            </p>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal with Estimator */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden border-atomic-pink/20" aria-describedby={undefined}>
          <VisuallyHidden.Root>
            <DialogTitle>AI Painting Estimator</DialogTitle>
          </VisuallyHidden.Root>
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-gradient-to-r from-atomic-pink/5 to-atomic-turquoise/5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-atomic-pink" />
              <span className="font-semibold text-atomic-navy text-sm sm:text-base">AI Painting Estimator</span>
            </div>
          </div>

          {/* Iframe */}
          <div className="flex-1 relative" style={{ height: 'calc(90vh - 52px)' }}>
            <iframe
              src="https://easy-painting-quote.lovable.app/widget/chat?token=3ee7b5f543db22516abedd47dfd3c9f5f95b377695efaac886d523bbcaf7bfe0"
              width="100%"
              height="100%"
              style={{ border: 'none', display: 'block' }}
              title="Quohta Estimator"
              onLoad={() => setIsLoaded(true)}
              allow="clipboard-write"
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background">
                <div className="w-12 h-12 border-4 border-atomic-pink border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-muted-foreground">Loading estimator...</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIEstimatorSection;
