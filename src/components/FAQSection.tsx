import React from 'react';
import PrivateClientWhisper from '@/components/conversion/PrivateClientWhisper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';
import { verifiedFAQs, businessInfo } from '@/data/businessInfo';

/**
 * AISO-Optimized FAQ Section
 * 
 * Machine-readable FAQ content with FAQPage schema.
 * All answers are factual and sourced from verified site data.
 */
const FAQSection: React.FC = () => {
  return (
    <section 
      id="faq" 
      className="py-16 md:py-24 bg-background"
      aria-labelledby="faq-heading"
    >

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-atomic-turquoise/10 text-atomic-turquoise px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-5 h-5" aria-hidden="true" />
            <span className="font-semibold text-sm uppercase tracking-wide">Common Questions</span>
          </div>
          
          <h2 
            id="faq-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-atomic-navy mb-4"
          >
            Frequently Asked Questions
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-600">
            Find answers to common questions about our painting services in Muskoka.
            Can't find what you're looking for? <a href="#contact" className="text-atomic-turquoise hover:underline">Contact us</a>.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {verifiedFAQs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="border border-gray-200 rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-atomic-navy py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Block */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Have a specific question about your project?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${businessInfo.phone.tel}`}
              className="inline-flex items-center justify-center gap-2 bg-atomic-turquoise text-white px-6 py-3 rounded-full font-medium hover:bg-atomic-turquoise/90 transition-colors"
            >
              Call {businessInfo.phone.formatted}
            </a>
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname === '/') {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#contact';
                }
              }}
              className="inline-flex items-center justify-center gap-2 border-2 border-atomic-turquoise text-atomic-turquoise px-6 py-3 rounded-full font-medium hover:bg-atomic-turquoise/10 transition-colors"
            >
              Start the Conversation
            </a>
          </div>
          <PrivateClientWhisper className="mt-4" />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
