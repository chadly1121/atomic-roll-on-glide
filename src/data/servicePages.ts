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
  
  // Gallery media
  galleryImages?: string[];
  galleryVideos?: string[];
}

export const servicePages: ServicePageData[] = [
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    headline: 'Professional Interior Painting in Muskoka',
    description: 'Transform your indoor spaces with premium interior painting services from Roll On Painting. Expert color consultation, meticulous preparation, and flawless finishes for homes and cottages throughout Muskoka.',
    metaDescription: 'Professional interior painting services in Muskoka. Roll On Painting offers expert color consultation, wall preparation, and premium finishes. Free quotes. Call 705-787-1401.',
    category: 'residential',
    priceFrom: { amount: 4.50, unit: 'sq ft' },
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
    priceFrom: { amount: 5.75, unit: 'sq ft' },
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
  },
  {
    slug: 'spray-finishing',
    name: 'Spray Finishing',
    headline: 'Professional Spray Painting & Spray Finishing in Muskoka',
    description: 'Roll On Painting offers professional spray painting and spray finishing services for residential and commercial projects. Spray application delivers a smooth, factory-quality finish on doors, trim, cabinets, fences, and large surfaces.',
    metaDescription: 'Spray painting and spray finishing services in Muskoka. Factory-quality finishes for cabinets, trim, doors, and fences. Roll On Painting. Call 705-787-1401.',
    category: 'specialty',
    aiAnswerBlock: {
      whatIncludes: [
        'Surface preparation and masking',
        'Airless or HVLP spray application',
        'Even, drip-free coverage on all surfaces',
        'Multiple coats for durability',
        'Trim, doors, railings, and large surfaces',
        'Full cleanup and overspray protection'
      ],
      whoItsFor: [
        'Homeowners wanting a smooth, brushstroke-free finish',
        'New construction requiring fast, uniform coverage',
        'Commercial properties needing efficient application',
        'Fence and deck projects requiring speed and consistency'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Port Sydney, Dorset, Baysville, Dwight',
        'Muskoka Lakes, Lake of Bays, Rosseau',
        'Parry Sound, Orillia, Barrie',
        'All communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 or email info@roll-onpainting.com',
        'Describe surfaces and scope of work',
        'We visit to assess and recommend the best approach',
        'Receive a detailed written quote'
      ]
    },
    benefits: [
      'Factory-smooth finish without brush marks',
      'Faster application on large surfaces',
      'Ideal for trim, doors, cabinets, and fences',
      'WSIB covered with $5 million liability insurance',
      'Over 25 years of professional experience'
    ],
    faqs: [
      {
        question: 'What is the difference between spray finishing and brush/roller painting?',
        answer: 'Spray finishing uses airless or HVLP equipment to atomize paint, producing a smoother, more uniform finish without brush strokes. It is faster for large or detailed surfaces like trim, cabinets, and fences.'
      },
      {
        question: 'Is spray painting suitable for interior walls?',
        answer: 'Yes, spray painting can be used on interior walls for a smooth finish, especially in new construction or empty rooms. We mask and protect all areas not being painted.'
      }
    ]
  },
  {
    slug: 'wallpaper-removal',
    name: 'Wallpaper Removal',
    headline: 'Professional Wallpaper Removal in Muskoka',
    description: 'Roll On Painting provides professional wallpaper removal and wall restoration services. We safely strip old wallpaper, repair underlying surfaces, and prepare walls for fresh paint or new wallpaper.',
    metaDescription: 'Wallpaper removal services in Muskoka. Safe stripping, wall repair, and surface prep for painting. Roll On Painting serves Huntsville, Bracebridge, Gravenhurst. Call 705-787-1401.',
    category: 'residential',
    aiAnswerBlock: {
      whatIncludes: [
        'Careful removal of all wallpaper layers',
        'Adhesive residue cleaning',
        'Wall surface repair (skim coating if needed)',
        'Sanding and smoothing',
        'Primer application for new finish',
        'Ready for painting or new wallpaper installation'
      ],
      whoItsFor: [
        'Homeowners updating dated wallpaper',
        'Cottage owners refreshing interiors',
        'Property sellers improving appeal',
        'Anyone wanting to switch from wallpaper to paint'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Port Sydney, Dorset, Baysville, Dwight',
        'Muskoka Lakes, Lake of Bays, Rosseau',
        'Parry Sound, Orillia, Barrie',
        'All communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 or send photos via our contact form',
        'Describe the wallpaper type and room size',
        'We visit to assess adhesion and wall condition',
        'Receive a detailed quote including wall restoration'
      ]
    },
    benefits: [
      'Safe removal without wall damage',
      'Complete adhesive residue cleanup',
      'Wall restoration and skim coating available',
      'Can combine with interior painting for a full refresh',
      'WSIB covered with $5 million liability insurance'
    ],
    faqs: [
      {
        question: 'Can you remove wallpaper without damaging the walls?',
        answer: 'Yes. We use professional techniques including steamers and safe chemical solutions to soften adhesive and lift wallpaper cleanly. Minor wall repairs and skim coating are included when needed.'
      },
      {
        question: 'How long does wallpaper removal take?',
        answer: 'A typical room takes 1-2 days depending on the number of layers and adhesive type. Older wallpaper with multiple layers takes longer.'
      }
    ]
  },
  {
    slug: 'stucco-removal',
    name: 'Stucco Removal',
    headline: 'Professional Stucco Removal in Muskoka',
    description: 'Roll On Painting provides professional stucco removal services for homes and commercial buildings. We safely strip old, damaged, or unwanted stucco and prepare the underlying surface for a new finish.',
    metaDescription: 'Stucco removal services in Muskoka. Safe stripping of old or damaged stucco, surface repair, and preparation. Roll On Painting. Call 705-787-1401.',
    category: 'residential',
    aiAnswerBlock: {
      whatIncludes: [
        'Assessment of existing stucco condition',
        'Safe mechanical removal of stucco layers',
        'Disposal of removed material',
        'Inspection and repair of underlying substrate',
        'Surface preparation for new finish (paint, siding, or new stucco)',
        'Full site cleanup'
      ],
      whoItsFor: [
        'Homeowners with cracked or water-damaged stucco',
        'Property owners switching from stucco to another finish',
        'Renovation projects requiring stucco strip-down',
        'Commercial buildings needing facade updates'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Port Sydney, Dorset, Baysville, Dwight',
        'Muskoka Lakes, Lake of Bays, Rosseau',
        'Parry Sound, Orillia, Barrie',
        'All communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 or email info@roll-onpainting.com',
        'Describe the area and condition of the stucco',
        'We visit to assess scope and substrate condition',
        'Receive a detailed written quote'
      ]
    },
    benefits: [
      'Safe removal without structural damage',
      'Proper disposal of all debris',
      'Substrate inspection and repair included',
      'Can combine with interior painting',
      'WSIB covered with $5 million liability insurance'
    ],
    faqs: [
      {
        question: 'Why would I need stucco removed?',
        answer: 'Common reasons include water damage behind the stucco, persistent cracking, mold issues, or wanting to change to a different exterior finish such as siding or stone.'
      },
      {
        question: 'How long does stucco removal take?',
        answer: 'It depends on the area and number of layers. A typical residential exterior takes 2-5 days including cleanup and surface preparation.'
      }
    ]
  },
  {
    slug: 'wallpaper-installation',
    name: 'Wallpaper Installation',
    headline: 'Professional Wallpaper Installation in Muskoka',
    description: 'Add character and elegance to any room with professional wallpaper installation from Roll On Painting. Precision cuts, seamless pattern matching, and flawless finishes for homes and cottages throughout Muskoka.',
    metaDescription: 'Professional wallpaper installation services in Muskoka. Seamless pattern matching, precision hanging, and expert finishing. Roll On Painting serves Huntsville, Bracebridge, Gravenhurst. Call 705-787-1401.',
    category: 'residential',
    aiAnswerBlock: {
      whatIncludes: [
        'Wall surface preparation and priming',
        'Precise measurement and material planning',
        'Expert pattern matching and alignment',
        'Seamless seam finishing',
        'Trim and edge detailing around outlets, windows, and doors',
        'Full cleanup and inspection'
      ],
      whoItsFor: [
        'Homeowners adding a feature or accent wall',
        'Cottage owners creating a signature look',
        'Interior designers and decorators',
        'Commercial spaces wanting a premium finish',
        'Anyone looking to add texture and pattern to their walls'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Port Sydney, Dorset, Baysville, Dwight',
        'Muskoka Lakes, Lake of Bays, Rosseau',
        'Parry Sound, Orillia, Barrie',
        'All communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 or send photos via our contact form',
        'Describe the room dimensions and wallpaper type',
        'We visit to assess wall condition and confirm measurements',
        'Receive a detailed quote including material recommendations'
      ]
    },
    benefits: [
      'Expert pattern matching for seamless results',
      'Experience with all wallpaper types — vinyl, grasscloth, peel-and-stick, and more',
      'Proper wall preparation for long-lasting adhesion',
      'Can combine with interior painting for a complete refresh',
      'WSIB covered with $5 million liability insurance'
    ],
    faqs: [
      {
        question: 'Do you supply the wallpaper or do I need to buy it?',
        answer: 'You can supply your own wallpaper, or we can help you source it. We work with all brands and types and can recommend suppliers based on your design goals.'
      },
      {
        question: 'How long does wallpaper installation take?',
        answer: 'A single accent wall typically takes half a day. A full room takes 1-2 days depending on pattern complexity and wall preparation needed.'
      },
      {
        question: 'Can you install wallpaper over existing wallpaper?',
        answer: 'We generally recommend removing old wallpaper first for the best adhesion and finish. We offer wallpaper removal as a companion service.'
      }
    ]
  },
  {
    slug: 'power-washing',
    name: 'Power & Soft Washing',
    headline: 'Power Washing & Soft Washing in Muskoka',
    description: 'Remove years of dirt, grime, mold, and mildew from your home or business exterior with Roll On Painting\'s professional power washing and soft washing services. Safe, effective cleaning for every surface.',
    metaDescription: 'Power washing and soft washing services in Muskoka. Safe exterior cleaning for siding, decks, driveways, and roofs. Roll On Painting serves Huntsville, Bracebridge, Gravenhurst. Call 705-787-1401.',
    category: 'residential',
    aiAnswerBlock: {
      whatIncludes: [
        'Assessment of surfaces and appropriate cleaning method',
        'High-pressure power washing for concrete, driveways, and walkways',
        'Low-pressure soft washing for siding, soffits, and delicate surfaces',
        'Mold, mildew, and algae treatment',
        'Gutter exterior cleaning',
        'Full property cleanup'
      ],
      whoItsFor: [
        'Homeowners refreshing curb appeal',
        'Cottage owners preparing for the season',
        'Property managers maintaining rental properties',
        'Commercial properties needing exterior cleaning',
        'Anyone with mold, mildew, or algae buildup'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Port Sydney, Dorset, Baysville, Dwight',
        'Muskoka Lakes, Lake of Bays, Rosseau',
        'Parry Sound, Orillia, Barrie',
        'All communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Use our free AI estimator for a ballpark price',
        'Call 705-787-1401 to schedule a free assessment',
        'We identify the best cleaning method for each surface',
        'Receive a detailed quote — often same-day'
      ]
    },
    benefits: [
      'Safe soft wash method protects siding and paint',
      'Removes mold, mildew, algae, and oxidation',
      'Dramatically improves curb appeal',
      'Can combine with exterior painting for a full refresh',
      'WSIB covered with $5 million liability insurance'
    ],
    faqs: [
      {
        question: 'What is the difference between power washing and soft washing?',
        answer: 'Power washing uses high pressure for hard surfaces like concrete and brick. Soft washing uses low pressure with specialized cleaning solutions for delicate surfaces like vinyl siding, stucco, and roofs — safely removing organic growth without damage.'
      },
      {
        question: 'Will power washing damage my siding or paint?',
        answer: 'We use the appropriate method for each surface. Soft washing is used on painted surfaces and siding to clean effectively without causing damage. Our team has over 25 years of experience knowing which method to use where.'
      },
      {
        question: 'How often should I have my home exterior washed?',
        answer: 'In Muskoka, we recommend exterior washing every 1-2 years. Properties near water or in shaded areas may benefit from annual cleaning due to increased mold and mildew growth.'
      }
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
