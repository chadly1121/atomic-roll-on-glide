
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Clock, CheckCircle, Loader2 } from 'lucide-react';

const AIEstimatorSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let timeoutId: number | undefined;

    const widgetToken = 'dd283090a9a7bde311a9b8bb34a8d90d27f15ee58c74e3d045b5fdda5bf07e26';
    const baseUrl = 'https://paint-quick-quote.lovable.app';
    
    const container = document.getElementById('quohta-widget');
    if (!container) {
      setIsLoading(false);
      setLoadError('Estimator container not found on page.');
      return;
    }

    // Check if iframe already exists (e.g., React StrictMode double-mount)
    if (container.querySelector('iframe')) {
      setIsLoading(false);
      setLoadError(null);
      return;
    }

    // Instead of loading the widget script (which relies on document.currentScript),
    // we directly create the iframe as the script would do.
    // This is more reliable for dynamic/SPA injection.
    try {
      // Style the container for proper centering (matching widget.js)
      container.style.cssText = 'width: 100%; max-width: 600px; margin: 0 auto; position: relative;';

      // Create the iframe directly
      const iframe = document.createElement('iframe');
      iframe.src = `${baseUrl}/embed/${widgetToken}`;
      iframe.width = '100%';
      iframe.height = '700';
      iframe.frameBorder = '0';
      iframe.scrolling = 'no';
      iframe.style.cssText = 'border: none; display: block; width: 100%; min-height: 600px;';
      iframe.setAttribute('title', 'Quohta Quote Widget');
      iframe.setAttribute('allow', 'clipboard-write');

      container.appendChild(iframe);

      // Listen for iframe load
      iframe.onload = () => {
        setIsLoading(false);
        setLoadError(null);
      };

      iframe.onerror = () => {
        setIsLoading(false);
        setLoadError('Failed to load the estimator.');
      };

      // Timeout fallback if iframe doesn't trigger onload
      timeoutId = window.setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
          // Don't show error if iframe is present - it might just be slow
        }
      }, 10000);

    } catch (e) {
      setIsLoading(false);
      setLoadError('Failed to initialize estimator.');
      console.error('Quohta widget error:', e);
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [retryKey]);

  const benefits = [
    { icon: Clock, text: "Get instant estimates in seconds" },
    { icon: Calculator, text: "AI-powered accuracy" },
    { icon: CheckCircle, text: "No obligation quote" },
  ];

  return (
    <section 
      id="ai-estimator" 
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-atomic-pink/10 via-white to-atomic-turquoise/10 relative overflow-hidden"
      aria-labelledby="ai-estimator-heading"
    >
      {/* Background decoration - hidden on mobile for performance */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
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
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
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
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 mb-6 sm:mb-10 px-2">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg shadow-sm"
              >
                <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-atomic-turquoise flex-shrink-0" />
                <span className="text-atomic-navy font-medium text-sm sm:text-base">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
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
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-3 sm:p-6 md:p-8 border border-atomic-pink/20 min-h-[600px] sm:min-h-[700px] md:min-h-[750px] relative"
            role="application"
            aria-label="AI Painting Cost Estimator"
            style={{ 
              overflowAnchor: 'none',
              scrollMarginTop: '80px'
            }}
          >
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl sm:rounded-2xl z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 text-atomic-pink animate-spin" />
                  <p className="text-atomic-navy/70 text-sm">Loading estimator...</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {!isLoading && loadError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl sm:rounded-2xl z-10 p-6">
                <div className="max-w-md text-center space-y-4">
                  <p className="text-atomic-navy font-semibold">Estimator unavailable</p>
                  <p className="text-atomic-navy/70 text-sm leading-relaxed">{loadError}</p>
                  <button
                    type="button"
                    className="atomic-button border-2 border-atomic-pink bg-atomic-pink hover:bg-atomic-pink/90"
                    onClick={() => {
                      setIsLoading(true);
                      setLoadError(null);
                      setRetryKey((k) => k + 1);
                    }}
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
            {/* Widget container - taller for mobile usability */}
            <div 
              id="quohta-widget" 
              className="w-full flex justify-center min-h-[550px] sm:min-h-[650px]"
              style={{ overflowAnchor: 'none' }}
            />
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
