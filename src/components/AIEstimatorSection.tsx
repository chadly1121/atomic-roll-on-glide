
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Clock, CheckCircle } from 'lucide-react';

const AIEstimatorSection = () => {
  useEffect(() => {
    // Load the AI estimator widget script
    const script = document.createElement('script');
    script.src = 'https://d6d72e6c-0da2-43cd-9fd4-8c21ea4feb0f.lovableproject.com/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const benefits = [
    { icon: Clock, text: "Get instant estimates in seconds" },
    { icon: Calculator, text: "AI-powered accuracy" },
    { icon: CheckCircle, text: "No obligation quote" },
  ];

  return (
    <section 
      id="ai-estimator" 
      className="py-20 bg-gradient-to-br from-atomic-pink/10 via-white to-atomic-turquoise/10 relative overflow-hidden"
      aria-labelledby="ai-estimator-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-atomic-pink rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-atomic-turquoise rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-atomic-pink/20 text-atomic-pink px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold text-sm uppercase tracking-wide">AI-Powered Technology</span>
          </div>
          
          <h2 
            id="ai-estimator-heading"
            className="text-4xl md:text-5xl font-bold text-atomic-navy mb-4"
          >
            Get Your <span className="text-atomic-pink">Instant Painting Estimate</span>
          </h2>
          
          <p className="text-lg text-atomic-navy/70 max-w-2xl mx-auto mb-8">
            Our AI-powered estimator gives you an accurate quote in seconds. Simply answer a few questions 
            about your project and get a professional estimate instantly – no waiting, no pressure.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
              >
                <benefit.icon className="w-5 h-5 text-atomic-turquoise" />
                <span className="text-atomic-navy font-medium">{benefit.text}</span>
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
            id="ai-estimator-widget" 
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-atomic-pink/20 min-h-[400px]"
            role="application"
            aria-label="AI Painting Cost Estimator"
          >
            {/* Widget will be injected here by the script */}
            <div className="flex items-center justify-center h-full min-h-[300px]">
              <div className="text-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-atomic-pink/20 rounded-full flex items-center justify-center">
                    <Calculator className="w-8 h-8 text-atomic-pink" />
                  </div>
                  <p className="text-atomic-navy/60">Loading AI Estimator...</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust indicator */}
          <p className="text-center text-sm text-atomic-navy/50 mt-4">
            Trusted by hundreds of Muskoka homeowners • Powered by advanced AI technology
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIEstimatorSection;
