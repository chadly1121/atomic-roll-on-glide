
import React from 'react';
import { motion } from 'framer-motion';
import BookingSystem from './BookingSystem';

const BookingSection = () => {
  return (
    <section id="booking" className="py-24 bg-white relative overflow-hidden">
      <div className="atomic-starburst w-80 h-80 -top-10 -right-10 opacity-20"></div>
      <div className="atomic-circle w-64 h-64 -bottom-32 -left-32 border-atomic-orange/20"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Book a Consultation</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schedule a free consultation with our painting experts to discuss your project needs and get professional advice.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-atomic-navy">Why Schedule a Consultation?</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-atomic-orange/20 flex items-center justify-center shrink-0">
                  <span className="text-atomic-orange font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Expert Color Advice</h4>
                  <p className="text-gray-600">Get personalized color recommendations that suit your space and preferences.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-atomic-orange/20 flex items-center justify-center shrink-0">
                  <span className="text-atomic-orange font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Accurate Estimates</h4>
                  <p className="text-gray-600">Receive detailed project estimates with transparent pricing.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-atomic-orange/20 flex items-center justify-center shrink-0">
                  <span className="text-atomic-orange font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Tailored Solutions</h4>
                  <p className="text-gray-600">Discuss your specific needs and get customized solutions for your painting project.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-atomic-orange/20 flex items-center justify-center shrink-0">
                  <span className="text-atomic-orange font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Time-Saving</h4>
                  <p className="text-gray-600">Skip the research phase and get professional guidance from the start.</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-atomic-turquoise/10 rounded-lg">
              <p className="italic text-sm text-atomic-navy">
                "Our consultation was incredibly helpful. The team provided color suggestions that perfectly matched our style and the house's architecture."
                <span className="block mt-2 font-semibold">- Sarah M., Port Sydney</span>
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <BookingSystem />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
