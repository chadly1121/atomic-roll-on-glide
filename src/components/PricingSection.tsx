import React from 'react';
import PrivateClientWhisper from '@/components/conversion/PrivateClientWhisper';

interface PricingTier {
  id: number;
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: 1,
    name: "Interior Painting",
    description: "Perfect for refreshing your indoor spaces",
    price: "Request a Quote",
    features: [
      "Premium quality paints",
      "Wall preparation & repair",
      "Two coats of paint",
      "Clean up & debris removal"
    ]
  },
  {
    id: 2,
    name: "Exterior Painting",
    description: "Enhance your home's curb appeal",
    price: "Request a Quote",
    features: [
      "Weather-resistant paints",
      "Thorough surface preparation",
      "Primer application",
      "Two coats of paint",
      "5-year warranty"
    ],
    isPopular: true
  },
  {
    id: 3,
    name: "Commercial Painting",
    description: "Tailored solutions for businesses",
    price: "Request a Quote",
    features: [
      "Minimal business disruption",
      "After-hours service available",
      "Large-scale capacity",
      "Quick turnaround times",
      "Commercial-grade materials"
    ]
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden sm:block atomic-circle w-96 h-96 -top-20 -left-48 border-atomic-coral" aria-hidden="true" />
      <div className="hidden sm:block atomic-starburst w-64 h-64 -bottom-20 right-40" aria-hidden="true" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative mb-6 sm:mb-8 md:mb-12 inline-block">
            Our Pricing
            <span className="absolute left-1/4 -bottom-2 sm:-bottom-4 h-1 w-1/2 bg-atomic-orange rounded-full" />
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 px-2">
            Transparent pricing with no hidden costs. Contact us for a custom quote tailored to your project.
          </p>
        </div>
        
        {/* Pricing Tiers - scroll horizontally on mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`relative rounded-xl border p-4 sm:p-6 shadow-lg transition-transform hover:-translate-y-1 ${
                tier.isPopular ? 'border-atomic-turquoise ring-1 ring-atomic-turquoise' : 'border-gray-200'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-4 sm:right-8 -translate-y-1/2 bg-atomic-orange text-white px-2 sm:px-3 py-1 text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold">{tier.name}</h3>
                <p className="text-sm sm:text-base text-gray-500">{tier.description}</p>
              </div>
              <div className="mb-4 sm:mb-6">
                <p className="text-2xl sm:text-3xl font-bold text-atomic-navy">{tier.price}</p>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="mr-2 text-atomic-turquoise flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
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
                className={`w-full py-3 text-center rounded-full font-medium block transition-colors min-h-[48px] flex items-center justify-center active:scale-95 text-sm sm:text-base ${
                  tier.isPopular 
                    ? 'bg-atomic-turquoise hover:bg-atomic-turquoise/90 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-atomic-navy'
                }`}
              >
                Get a Quote
              </a>
            </div>
          ))}
        </div>

        {/* Catalog CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Looking for fixed-price packages? Browse our full service catalog with instant online booking.
          </p>
          <a
            href="/catalog"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full font-semibold bg-atomic-orange text-white hover:bg-atomic-orange/90 transition-colors min-h-[48px] active:scale-95 text-sm sm:text-base"
          >
            View Service Catalog →
          </a>
          <PrivateClientWhisper className="mt-4" />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
