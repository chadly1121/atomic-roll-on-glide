import React from 'react';
import { CheckCircle, Users, MapPin, FileText } from 'lucide-react';

interface AIAnswerBlockProps {
  whatIncludes: string[];
  whoItsFor: string[];
  whereAvailable: string[];
  howQuotesWork: string[];
}

/**
 * AI Answer Block Component
 * 
 * Structured content block optimized for AI search engines.
 * Clear, scannable format that AI can easily parse and cite.
 */
const AIAnswerBlock: React.FC<AIAnswerBlockProps> = ({
  whatIncludes,
  whoItsFor,
  whereAvailable,
  howQuotesWork
}) => {
  return (
    <section 
      className="py-12 bg-accent/30"
      aria-labelledby="service-details-heading"
    >
      <div className="container mx-auto px-4">
        <h2 
          id="service-details-heading"
          className="text-2xl font-bold text-atomic-navy text-center mb-8"
        >
          Service Details
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* What's Included */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-atomic-turquoise" aria-hidden="true" />
              <h3 className="font-semibold text-atomic-navy">What's Included</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {whatIncludes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-atomic-turquoise mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who It's For */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-atomic-turquoise" aria-hidden="true" />
              <h3 className="font-semibold text-atomic-navy">Who It's For</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {whoItsFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-atomic-turquoise mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Where Available */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-atomic-turquoise" aria-hidden="true" />
              <h3 className="font-semibold text-atomic-navy">Where We Serve</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {whereAvailable.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-atomic-turquoise mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How Quotes Work */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-atomic-turquoise" aria-hidden="true" />
              <h3 className="font-semibold text-atomic-navy">How to Get a Quote</h3>
            </div>
            <ol className="space-y-2 text-sm text-muted-foreground">
              {howQuotesWork.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-atomic-turquoise font-medium mt-0">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAnswerBlock;
