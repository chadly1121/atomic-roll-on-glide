/**
 * AISO Service Page Data
 * 
 * Structured data for individual service pages with AI Answer Blocks.
 * Each service has: description, includes, audience, availability, quote process.
 */

import { businessInfo } from './businessInfo';

export interface ServicePageData {
  slug: string;
  name: string;
  headline: string;
  description: string;
  metaDescription: string;
  heroImage?: string;
  category: 'residential' | 'commercial' | 'specialty';
  priceFrom?: { amount: number; unit: string };
  
  // AI Answer Block content
  aiAnswerBlock: {
    whatIncludes: string[];
    whoItsFor: string[];
    whereAvailable: string[];
    howQuotesWork: string[];
  };
  
  // Additional content sections
  benefits?: string[];
  faqs?: { question: string; answer: string }[];
}

export const servicePages: ServicePageData[] = [
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    headline: 'Professional Interior Painting in Muskoka',
    description: 'Transform your indoor spaces with premium interior painting services from Roll On Painting. Expert color consultation, meticulous preparation, and flawless finishes for homes and cottages throughout Muskoka.',
    metaDescription: 'Professional interior painting services in Muskoka. Roll On Painting offers expert color consultation, wall preparation, and premium finishes. Free quotes. Call 705-787-1401.',
    category: 'residential',
    priceFrom: { amount: 2.50, unit: 'sq ft' },
    aiAnswerBlock: {
      whatIncludes: [
        'Free color consultation with expert recommendations',
        'Complete wall preparation including patching and sanding',
        'Two coats of premium-quality paint',
        'Protection of floors, furniture, and fixtures',
        'Detailed trim and baseboard work',
        'Full cleanup and debris removal',
        'Final walkthrough and touch-ups'
      ],
      whoItsFor: [
        'Homeowners refreshing living spaces',
        'Cottage owners preparing for the season',
        'Property managers updating rental units',
        'Homeowners selling and staging properties',
        'New construction requiring finishing'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Port Sydney, Dorset, Baysville, Dwight',
        'Muskoka Lakes, Lake of Bays, Rosseau',
        'Parry Sound, Orillia, Barrie',
        'All communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Use our free AI estimator for an instant ballpark quote',
        'Call 705-787-1401 to schedule a free on-site estimate',
        'We measure, assess surface conditions, and discuss color options',
        'Receive a detailed written quote within 24-48 hours'
      ]
    },
    benefits: [
      'Over 25 years of professional painting experience',
      'WSIB covered with $5 million liability insurance',
      'Premium Benjamin Moore, Dulux, and PPG paints',
      'Free touch-ups on completed projects',
      'Clean, respectful, and punctual crews'
    ],
    faqs: [
      {
        question: 'How long does interior painting take?',
        answer: 'A typical room takes 1-2 days including preparation. Whole-house projects usually take 3-7 days depending on size and complexity.'
      },
      {
        question: 'Do I need to move my furniture?',
        answer: 'We handle furniture moving and protection. Large items are moved to the center of the room and covered. You don\'t need to prepare anything.'
      },
      {
        question: 'What paint brands do you use?',
        answer: 'We use premium paints from Benjamin Moore, Dulux, and PPG. We recommend specific products based on the room\'s use and your preferences.'
      }
    ]
  },
  {
    slug: 'exterior-painting',
    name: 'Exterior Painting',
    headline: 'Exterior Painting That Withstands Muskoka Weather',
    description: 'Protect and beautify your home with durable exterior painting built to withstand harsh Muskoka winters and humid summers. Roll On Painting uses weather-resistant products and proven techniques for lasting results.',
    metaDescription: 'Exterior painting services in Muskoka. Weather-resistant finishes, thorough prep work, and 5-year warranty. Roll On Painting serves Huntsville, Bracebridge, Gravenhurst. Call 705-787-1401.',
    category: 'residential',
    priceFrom: { amount: 3.75, unit: 'sq ft' },
    aiAnswerBlock: {
      whatIncludes: [
        'Power washing and surface cleaning',
        'Scraping, sanding, and caulking of gaps',
        'Primer application on bare wood and repairs',
        'Two coats of premium exterior paint',
        'Window and door trim detailing',
        'Gutter and soffit painting if needed',
        'Full site cleanup'
      ],
      whoItsFor: [
        'Homeowners protecting their investment',
        'Cottage owners maintaining lakefront properties',
        'Property managers refreshing curb appeal',
        'Homeowners selling who need exterior updates',
        'New builds requiring exterior finishing'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Port Sydney, Dorset, Baysville, Dwight',
        'Muskoka Lakes, Lake of Bays, Rosseau',
        'Parry Sound, Orillia, Barrie',
        'All communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Use our free AI estimator for an instant ballpark quote',
        'Call 705-787-1401 to schedule a free on-site estimate',
        'We inspect siding condition, measure, and discuss colors',
        'Receive a detailed written quote within 24-48 hours'
      ]
    },
    benefits: [
      'Weather-resistant paints rated for Canadian climates',
      '5-year warranty on exterior work',
      'Thorough preparation prevents peeling and cracking',
      'WSIB covered with $5 million liability insurance',
      'Experienced with cedar, wood siding, stucco, and more'
    ],
    faqs: [
      {
        question: 'What is the best time to paint exteriors in Muskoka?',
        answer: 'May through October offers the best conditions. We need temperatures above 10°C and dry weather. We monitor forecasts closely to ensure proper curing.'
      },
      {
        question: 'How long does exterior paint last?',
        answer: 'With proper preparation and quality paint, exterior finishes last 7-10 years in Muskoka\'s climate. We offer a 5-year warranty on our exterior work.'
      },
      {
        question: 'Do you paint log homes and cabins?',
        answer: 'Yes, we specialize in log homes using appropriate stains and finishes. We also partner with Sansin for premium wood treatments.'
      }
    ]
  },
  {
    slug: 'commercial-painting',
    name: 'Commercial Painting',
    headline: 'Commercial Painting with Minimal Business Disruption',
    description: 'Update your business space efficiently with Roll On Painting\'s commercial services. We work around your schedule, including after-hours and weekends, to minimize disruption to your operations.',
    metaDescription: 'Commercial painting services in Muskoka. Minimal disruption, after-hours availability, large-scale capacity. Roll On Painting serves businesses in Huntsville, Bracebridge, Parry Sound. Call 705-787-1401.',
    category: 'commercial',
    aiAnswerBlock: {
      whatIncludes: [
        'Free on-site assessment and detailed proposal',
        'Flexible scheduling including evenings and weekends',
        'Commercial-grade, durable paint products',
        'Complete surface preparation and repairs',
        'Daily cleanup to maintain safe work environment',
        'Project management and progress updates',
        'Final walkthrough and punch list completion'
      ],
      whoItsFor: [
        'Retail stores and shopping centers',
        'Offices and professional buildings',
        'Restaurants and hospitality venues',
        'Medical and dental clinics',
        'Warehouses and industrial facilities',
        'Multi-unit residential buildings'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Parry Sound and surrounding areas',
        'Orillia, Barrie, Midland',
        'All commercial properties in Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 to schedule a site visit',
        'We assess scope, surfaces, and scheduling needs',
        'Receive a detailed proposal with timeline and phases',
        'Flexible payment terms available for large projects'
      ]
    },
    benefits: [
      'After-hours and weekend availability',
      'Large-scale project capacity',
      'WSIB covered with $5 million liability insurance',
      'Experienced with retail, office, and industrial spaces',
      'References from Muskoka businesses available'
    ]
  },
  {
    slug: 'cabinet-refinishing',
    name: 'Cabinet Refinishing',
    headline: 'Kitchen Cabinet Refinishing in Muskoka',
    description: 'Give your kitchen a fresh, modern look without the cost of a full renovation. Roll On Painting\'s cabinet refinishing transforms dated cabinets with durable, factory-quality finishes.',
    metaDescription: 'Kitchen cabinet refinishing in Muskoka. Transform your kitchen for a fraction of replacement cost. Roll On Painting serves Huntsville, Bracebridge, Gravenhurst. Call 705-787-1401.',
    category: 'residential',
    aiAnswerBlock: {
      whatIncludes: [
        'Careful removal of doors, drawers, and hardware',
        'Thorough cleaning and degreasing',
        'Sanding and surface preparation',
        'Primer application for adhesion',
        'Multiple coats of durable cabinet paint',
        'Reinstallation of doors and hardware',
        'Optional hardware replacement'
      ],
      whoItsFor: [
        'Homeowners updating dated kitchens',
        'Cottage owners refreshing cabin kitchens',
        'Property flippers improving resale value',
        'Anyone wanting a new look without full renovation'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Port Sydney, Dorset, Baysville',
        'Muskoka Lakes, Rosseau',
        'All communities across Muskoka'
      ],
      howQuotesWork: [
        'Send photos of your cabinets via email or our contact form',
        'We\'ll provide a preliminary estimate',
        'Schedule an in-home visit for precise measurements',
        'Receive a detailed quote with color samples'
      ]
    },
    benefits: [
      'Fraction of the cost of cabinet replacement',
      'Completed in 3-5 days typically',
      'Durable finish that resists chips and scratches',
      'Wide range of colors and finishes available',
      'Minimal disruption to your kitchen use'
    ]
  },
  {
    slug: 'deck-staining',
    name: 'Deck & Fence Staining',
    headline: 'Deck and Fence Staining in Muskoka',
    description: 'Protect your outdoor wood surfaces from Muskoka\'s harsh weather with professional deck and fence staining. Roll On Painting uses premium stains from Sansin and other trusted brands for lasting protection.',
    metaDescription: 'Deck and fence staining services in Muskoka. Power washing, wood treatment, and premium stains. Roll On Painting protects your outdoor spaces. Call 705-787-1401.',
    category: 'residential',
    aiAnswerBlock: {
      whatIncludes: [
        'Power washing to remove dirt, mold, and old finish',
        'Wood brightening treatment',
        'Sanding of rough areas',
        'Application of premium penetrating stain',
        'Two coats for maximum protection',
        'Staining of railings, stairs, and trim'
      ],
      whoItsFor: [
        'Homeowners maintaining decks and patios',
        'Cottage owners protecting lakeside decks',
        'Property managers refreshing outdoor spaces',
        'Anyone with weathered or graying wood'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Lake of Bays, Muskoka Lakes',
        'Rosseau, Port Carling, Windermere',
        'All lakefront and cottage properties in Muskoka'
      ],
      howQuotesWork: [
        'Call or use our AI estimator for a ballpark price',
        'We visit to assess wood condition and size',
        'Receive a quote with stain options and colors',
        'Scheduling based on weather forecasts'
      ]
    },
    benefits: [
      'Premium Sansin and quality stain products',
      'UV protection prevents graying',
      'Water repellent finish',
      'Extends the life of your deck by years',
      'Available in transparent, semi-transparent, and solid colors'
    ]
  },
  {
    slug: 'epoxy-coatings',
    name: 'Epoxy Coatings',
    headline: 'Epoxy Floor Coatings in Muskoka',
    description: 'Transform your garage, basement, or commercial floor with durable epoxy coatings from Roll On Painting. Our professional-grade epoxy provides a beautiful, easy-to-clean surface that lasts for years.',
    metaDescription: 'Epoxy floor coatings in Muskoka. Durable, attractive floors for garages, basements, and commercial spaces. Roll On Painting serves Huntsville, Bracebridge. Call 705-787-1401.',
    category: 'specialty',
    priceFrom: { amount: 0.99, unit: 'sq ft' },
    aiAnswerBlock: {
      whatIncludes: [
        'Concrete grinding and surface preparation',
        'Crack and damage repair',
        'Primer coat application',
        'High-build epoxy coat',
        'Optional decorative flake broadcast',
        'Clear topcoat for durability',
        'Full cleanup and curing guidance'
      ],
      whoItsFor: [
        'Homeowners upgrading garage floors',
        'Cottage owners finishing basement floors',
        'Commercial and industrial facilities',
        'Showrooms and retail spaces',
        'Workshops and studios'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Parry Sound, Orillia, Barrie',
        'All communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 or email info@roll-onpainting.com',
        'Provide floor dimensions and current condition',
        'We visit to assess concrete and discuss options',
        'Receive a detailed quote with color/flake samples'
      ]
    },
    benefits: [
      'Extremely durable and long-lasting',
      'Resistant to chemicals, oil, and stains',
      'Easy to clean and maintain',
      'Available in many colors and finishes',
      'Transforms dull concrete into an attractive surface'
    ]
  },
  {
    slug: 'gonano-coating',
    name: 'GoNano Permanent Coating',
    headline: 'GoNano Nanotechnology Coating in Muskoka',
    description: 'Advanced nanotechnology coating providing superior, long-lasting protection for exterior surfaces. GoNano creates a hydrophobic barrier that repels water, prevents mold growth, and reduces maintenance.',
    metaDescription: 'GoNano permanent nanotechnology coating in Muskoka. Hydrophobic protection, mold prevention, reduced cleaning. Roll On Painting is a certified GoNano applicator. Call 705-787-1401.',
    category: 'specialty',
    priceFrom: { amount: 0.99, unit: 'sq ft' },
    aiAnswerBlock: {
      whatIncludes: [
        'Surface cleaning and preparation',
        'Professional GoNano application',
        'Hydrophobic barrier that beads water',
        'UV damage protection',
        'Mold and mildew prevention',
        'Environmentally friendly formula',
        'Long-lasting protection (years, not months)'
      ],
      whoItsFor: [
        'Cottage owners protecting lakefront properties',
        'Homeowners wanting low-maintenance exteriors',
        'Properties with recurring mold or mildew issues',
        'Commercial buildings seeking reduced maintenance',
        'Anyone wanting cutting-edge surface protection'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'All lakefront and cottage properties',
        'Muskoka, Parry Sound, and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 to discuss your project',
        'We assess surfaces and recommend approach',
        'Receive a quote for GoNano application',
        'Can be combined with painting or applied standalone'
      ]
    },
    benefits: [
      'Certified GoNano applicator',
      'Dramatically reduces cleaning frequency',
      'Prevents mold and mildew growth',
      'Protects against UV damage',
      'Environmentally friendly nanotechnology',
      'Ideal for Muskoka\'s harsh weather conditions'
    ]
  }
];

// Helper to get service by slug
export const getServiceBySlug = (slug: string): ServicePageData | undefined => {
  return servicePages.find(s => s.slug === slug);
};

// Get all service slugs for routing
export const getAllServiceSlugs = (): string[] => {
  return servicePages.map(s => s.slug);
};
