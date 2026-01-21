
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Clock, CheckCircle, Loader2 } from 'lucide-react';

const AIEstimatorSection = () => {
  const [isLoading, setIsLoading] = useState(true);

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
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-3 sm:p-6 md:p-8 border border-atomic-pink/20 relative"
            role="application"
            aria-label="AI Painting Cost Estimator"
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
            
            {/* Iframe for the AI estimator */}
            <iframe
              src="https://d6d72e6c-0da2-43cd-9fd4-8c21ea4feb0f.lovableproject.com/"
              className="w-full border-0 rounded-lg sm:rounded-xl"
              style={{ 
                minHeight: '500px',
                height: '600px'
              }}
              title="AI Painting Cost Estimator"
              allow="clipboard-write"
              onLoad={() => setIsLoading(false)}
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
