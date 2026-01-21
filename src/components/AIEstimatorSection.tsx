
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Clock, CheckCircle } from 'lucide-react';

const AIEstimatorSection = () => {
  useEffect(() => {
    // Create a container div that the widget expects
    const container = document.getElementById('ai-estimator-widget');
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';
    
    // Create iframe for the widget
    const iframe = document.createElement('iframe');
    iframe.src = 'https://d6d72e6c-0da2-43cd-9fd4-8c21ea4feb0f.lovableproject.com/';
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    iframe.title = 'AI Painting Cost Estimator';
    iframe.allow = 'clipboard-write';
    
    container.appendChild(iframe);

    return () => {
      // Cleanup on unmount
      if (container) {
        container.innerHTML = '';
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
            {/* Widget iframe will be injected here */}
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
