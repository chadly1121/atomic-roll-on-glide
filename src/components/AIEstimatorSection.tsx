import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Clock, CheckCircle } from 'lucide-react';

const AIEstimatorSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const benefits = [
    { icon: Clock, text: "Get instant estimates in seconds" },
    { icon: Calculator, text: "AI-powered accuracy" },
    { icon: CheckCircle, text: "No obligation quote" },
  ];

  // Prevent infinite spinner if the iframe never fires onLoad (blocked / offline / etc.)
  useEffect(() => {
    if (isLoaded) return;
    const t = window.setTimeout(() => {
      setShowFallback(true);
      console.info('[AIEstimator] iframe still not loaded after timeout');
    }, 12000);
    return () => window.clearTimeout(t);
  }, [isLoaded]);

  return (
    <section 
      ref={sectionRef}
      id="ai-estimator" 
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-atomic-pink/10 via-white to-atomic-turquoise/10 relative overflow-hidden"
      aria-labelledby="ai-estimator-heading"
    >
      {/* Background decoration - hidden on mobile for performance */}
      <div className="absolute inset-0 opacity-5 hidden sm:block" aria-hidden="true">
        <div className="absolute top-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-atomic-pink rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-atomic-turquoise rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
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
            about your project and get a professional estimate instantly – no waiting, no pressure.
          </p>

          {/* Benefits - stack on mobile */}
          <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 mb-6 sm:mb-10 px-2" role="list">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg shadow-sm"
              >
                <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-atomic-turquoise flex-shrink-0" aria-hidden="true" />
                <span className="text-atomic-navy font-medium text-sm sm:text-base">{benefit.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Widget Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-3 sm:p-6 md:p-8 border border-atomic-pink/20 min-h-[700px]"
            role="application"
            aria-label="AI Painting Cost Estimator"
          >
            <div className="relative">
              {/* Iframe (always rendered so the browser can show useful errors if blocked) */}
              <iframe
                src="https://paint-quick-quote.lovable.app/embed/dd283090a9a7bde311a9b8bb34a8d90d27f15ee58c74e3d045b5fdda5bf07e26"
                width="100%"
                height="700"
                style={{
                  border: 'none',
                  maxWidth: '600px',
                  display: 'block',
                  margin: '0 auto',
                }}
                title="Get a Free Painting Estimate"
                loading="lazy"
                onLoad={() => {
                  console.info('[AIEstimator] iframe loaded');
                  setIsLoaded(true);
                  setShowFallback(false);
                }}
                allow="clipboard-write"
              />

              {/* Loading overlay */}
              {!isLoaded && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
                  aria-busy="true"
                  aria-live="polite"
                >
                  <div className="w-12 h-12 border-4 border-atomic-pink border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-atomic-navy/60">Loading estimator...</p>
                </div>
              )}
            </div>

            {/* Fallback link if the iframe never loads */}
            {showFallback && !isLoaded && (
              <div className="mt-4 text-center px-2">
                <p className="text-sm text-atomic-navy/70">
                  Having trouble loading the estimator?
                </p>
                <a
                  href="https://paint-quick-quote.lovable.app/embed/dd283090a9a7bde311a9b8bb34a8d90d27f15ee58c74e3d045b5fdda5bf07e26"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold underline underline-offset-4 text-atomic-pink"
                >
                  Open it in a new tab
                </a>
              </div>
            )}
          </div>
          
          {/* Trust indicator */}
          <p className="text-center text-xs sm:text-sm text-atomic-navy/50 mt-3 sm:mt-4 px-2">
            Trusted by hundreds of Muskoka homeowners • Powered by advanced AI technology
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIEstimatorSection;
