
import React from 'react';

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
    price: "From $2.50 / sq ft",
    features: [
      "Premium quality paints",
      "Wall preparation & repair",
      "Two coats of paint",
      "Color consultation",
      "Clean up & debris removal"
    ]
  },
  {
    id: 2,
    name: "Exterior Painting",
    description: "Enhance your home's curb appeal",
    price: "From $3.75 / sq ft",
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
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="atomic-circle w-96 h-96 -top-20 -left-48 border-atomic-coral"></div>
      <div className="atomic-starburst w-64 h-64 -bottom-20 right-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Pricing</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Transparent pricing with no hidden costs. Contact us for a custom quote tailored to your project.
          </p>
        </div>
        
        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`relative rounded-xl border p-6 shadow-lg transition-transform hover:-translate-y-1 ${
                tier.isPopular ? 'border-atomic-turquoise ring-1 ring-atomic-turquoise' : 'border-gray-200'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-atomic-orange text-white px-3 py-1 text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="text-gray-500">{tier.description}</p>
              </div>
              <div className="mb-6">
                <p className="text-3xl font-bold text-atomic-navy">{tier.price}</p>
              </div>
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="mr-2 text-atomic-turquoise">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-2 text-center rounded-full font-medium block transition-colors ${
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
      </div>
    </section>
  );
};

export default PricingSection;
