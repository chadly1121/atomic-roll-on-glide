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
  process?: { step: string; description: string }[];
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
    ],
    galleryImages: [
      '/lovable-uploads/interior-modern-cottage-living.jpg',
      '/lovable-uploads/interior-vaulted-ceiling-painting-muskoka-1.jpg',
      '/lovable-uploads/interior-stain-paint-fireplace-trusses.jpg',
      '/lovable-uploads/interior-shiplap-fireplace-beams.jpg',
      '/lovable-uploads/interior-kitchen-masking-prep.jpg',
      '/lovable-uploads/interior-loft-space-finished.jpg',
      '/lovable-uploads/interior-great-room-dark-beams-lakeview.jpg',
      '/lovable-uploads/interior-primer-ceiling-beams.jpg'
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
    ],
    galleryImages: [
      '/lovable-uploads/exterior-residential-lakeside-paint.jpg',
      '/lovable-uploads/exterior-black-brick-home-finished-2.jpg',
      '/lovable-uploads/exterior-boathouse-lakeside-scaffold.jpg',
      '/lovable-uploads/exterior-spray-window-masking.jpg',
      '/lovable-uploads/exterior-repairs-ladder-siding.jpg',
      '/lovable-uploads/exterior-siding-paint-grey-trim.jpg',
      '/lovable-uploads/exterior-dark-garage-finished.jpg',
      '/lovable-uploads/exterior-brick-spray-black-front-entry.jpg'
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
    ],
    galleryImages: [
      '/lovable-uploads/commercial-interior-spray-canvas-brewing.jpg',
      '/lovable-uploads/commercial-exterior-muskoka-living-finished.jpg',
      '/lovable-uploads/commercial-interior-office-wide.jpg',
      '/lovable-uploads/commercial-interior-real-estate-office-design.jpg',
      '/lovable-uploads/commercial-interior-spray-silver-ceiling-black-beams-3.jpg',
      '/lovable-uploads/commercial-exterior-opp-gas-pumps-2.jpg',
      '/lovable-uploads/commercial-interior-new-build-stain-paint.jpg',
      '/lovable-uploads/commercial-interior-muskoka-brewing-spray-paint.jpg'
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
    ],
    galleryImages: [
      '/lovable-uploads/cabinet-grey-kitchen-finished.jpg',
      '/lovable-uploads/cabinet-white-kitchen-black-backsplash.jpg',
      '/lovable-uploads/cabinet-spray-finish-action.jpg',
      '/lovable-uploads/cabinet-door-sanding-closeup.jpg',
      '/lovable-uploads/cabinet-painting-masking-prep.jpg',
      '/lovable-uploads/cabinet-dark-doors-drying-rack.jpg',
      '/lovable-uploads/cabinet-white-builtin-shelving.jpg',
      '/lovable-uploads/cabinet-onsite-spray-white.jpg'
    ],
    galleryVideos: [
      '/lovable-uploads/cabinet-repaint-video.mp4'
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
    ],
    galleryImages: [
      '/lovable-uploads/exterior-deck-stain-muskoka.jpg',
      '/lovable-uploads/exterior-deck-staining-action.jpg',
      '/lovable-uploads/exterior-deck-staining-before-after.jpg',
      '/lovable-uploads/exterior-deck-staining-hardwood.jpg',
      '/lovable-uploads/exterior-deck-underside-staining.jpg',
      '/lovable-uploads/exterior-wood-garage-door-staining.jpg'
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
    ],
    galleryImages: [
      '/lovable-uploads/epoxy-flake-floor-muskoka-1.jpg',
      '/lovable-uploads/epoxy-garage-floor-grey-finish-1.jpg',
      '/lovable-uploads/epoxy-prep-grinder-closeup.jpg',
      '/lovable-uploads/epoxy-canvas-brewery-huntsville-1.jpg',
      '/lovable-uploads/epoxy-flake-floor-steps.jpg',
      '/lovable-uploads/epoxy-warehouse-floor-grey-finish.jpg',
      '/lovable-uploads/epoxy-residential-prep-room.jpg'
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
    galleryImages: [
      '/lovable-uploads/interior-spray-painting-vaulted.jpg',
      '/lovable-uploads/interior-spray-doors-new-build.jpg',
      '/lovable-uploads/interior-spray-trim-shiplap-after.jpg',
      '/lovable-uploads/interior-spray-trim-shiplap-during.jpg',
      '/lovable-uploads/cabinet-spray-finish-action.jpg',
      '/lovable-uploads/exterior-spray-masked-doors.jpg',
      '/lovable-uploads/prefinishing-stained-boards-muskoka-1.jpg',
      '/lovable-uploads/prefinishing-shop-racks-muskoka-1.jpg',
      '/lovable-uploads/prefinishing-pine-doors.jpg',
      '/lovable-uploads/prefinishing-white-trim-boards.jpg',
      '/lovable-uploads/prefinishing-douglas-fir-boards.jpg'
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
    galleryImages: [
      '/lovable-uploads/wallpaper-feature-wall-collage.jpg',
      '/lovable-uploads/wallpaper-dark-croc-bathroom.jpg',
      '/lovable-uploads/wallpaper-silver-texture-wall.jpg'
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
    galleryImages: [
      '/lovable-uploads/wallpaper-feature-wall-collage.jpg',
      '/lovable-uploads/wallpaper-dark-croc-bathroom.jpg',
      '/lovable-uploads/wallpaper-silver-texture-wall.jpg',
      '/lovable-uploads/wallpaper-croc-texture-bathroom-wide.jpg'
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
    galleryImages: [
      '/lovable-uploads/exterior-softwash-before.jpg',
      '/lovable-uploads/exterior-softwash-after.jpg',
      '/lovable-uploads/exterior-softwash-roof-steam-team.jpg',
      '/lovable-uploads/exterior-softwash-cedar-shingles.jpg'
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
  },
  {
    slug: 'institutional-painting',
    name: 'Institutional Painting',
    headline: 'Institutional Painting Services in Muskoka & Central Ontario',
    description: 'Roll On Painting delivers professional institutional painting for schools, hospitals, government buildings, and public facilities. We understand the unique demands of institutional environments — strict timelines, regulatory compliance, low-VOC coatings, and minimal disruption to daily operations.',
    metaDescription: 'Institutional painting in Muskoka. Schools, hospitals, government buildings. WSIB covered, $5M insured, low-VOC paints. Roll On Painting. 705-787-1401.',
    category: 'commercial',
    aiAnswerBlock: {
      whatIncludes: [
        'Full surface preparation including patching, sanding, and priming',
        'Low-VOC and zero-VOC paint options for occupied spaces',
        'Anti-microbial and washable coatings for high-traffic areas',
        'Colour-coded wayfinding and accent wall systems',
        'Floor and ceiling painting including gymnasium lines',
        'Complete cleanup with zero disruption to operations'
      ],
      whoItsFor: [
        'School boards and educational facilities',
        'Hospitals, clinics, and long-term care homes',
        'Municipal and government buildings',
        'Community centres and recreation facilities',
        'Religious institutions and public assembly spaces'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Port Sydney, Dorset, Baysville, Dwight',
        'Muskoka Lakes, Lake of Bays, Rosseau',
        'Parry Sound, Orillia, Barrie',
        'All communities across Muskoka, Parry Sound, and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 or email info@roll-onpainting.com',
        'Provide building details, scope, and scheduling requirements',
        'We conduct an on-site assessment during or after hours',
        'Receive a detailed written quote with phased scheduling options'
      ]
    },
    benefits: [
      'WSIB covered with $5 million liability insurance',
      'After-hours and weekend scheduling to avoid disruption',
      'Low-VOC and zero-VOC options safe for students and patients',
      'Experience with schools, hospitals, and government facilities',
      'Strict adherence to institutional safety and access protocols',
      'Over 25 years of professional painting experience',
      'Phased painting plans for occupied buildings',
      'Clean, uniformed crews with full background checks available'
    ],
    process: [
      { step: 'Initial Consultation', description: 'We meet with facility managers to understand scope, timelines, regulatory requirements, and any special considerations for occupied spaces.' },
      { step: 'On-Site Assessment', description: 'Our team inspects all surfaces, identifies repairs needed, and documents the work area including any hazardous materials like lead paint.' },
      { step: 'Detailed Proposal', description: 'You receive a comprehensive quote with phased scheduling options designed to minimize disruption to students, patients, or staff.' },
      { step: 'Surface Preparation', description: 'We repair, patch, sand, and prime all surfaces. Containment and protection measures are set up to keep adjacent areas clean and safe.' },
      { step: 'Professional Application', description: 'Using low-VOC coatings and professional spray/roller techniques, we deliver uniform, durable finishes designed for high-traffic institutional use.' },
      { step: 'Final Inspection & Handoff', description: 'We conduct a thorough walkthrough with your team, address any touch-ups, and leave the space clean and ready for use.' }
    ],
    galleryImages: [
      '/lovable-uploads/institutional-school-painting.jpg',
      '/lovable-uploads/institutional-school-interior.jpg',
      '/lovable-uploads/institutional-stage-floor-before.jpg',
      '/lovable-uploads/institutional-stage-floor-after.jpg'
    ],
    faqs: [
      {
        question: 'Can you paint schools while they are in session?',
        answer: 'Yes. We regularly paint schools during evenings, weekends, and holidays. We create phased plans that allow sections of the building to remain in use while others are being painted. All products used are low-VOC and safe for occupied environments.'
      },
      {
        question: 'Do you carry the insurance required for institutional work?',
        answer: 'Absolutely. Roll On Painting carries $5 million in commercial general liability insurance and is fully WSIB covered. We can provide certificates of insurance to meet any facility requirements.'
      },
      {
        question: 'What types of paint do you use in hospitals and care facilities?',
        answer: 'We use zero-VOC and anti-microbial coatings specifically designed for healthcare environments. These products are durable, washable, and meet infection control standards.'
      },
      {
        question: 'How do you handle painting in occupied government buildings?',
        answer: 'We develop a phased schedule in coordination with facility managers. Work is typically done after business hours or on weekends, with full containment to prevent dust and odour from reaching occupied areas.'
      },
      {
        question: 'Do you paint gymnasium floors and stage areas?',
        answer: 'Yes. We paint gym floors with regulation line markings and durable floor coatings. We also paint stages, auditoriums, and multipurpose rooms with specialty finishes designed for heavy use.'
      }
    ]
  },
  {
    slug: 'prefinishing',
    name: 'Pre-Finishing Services',
    headline: 'Professional Pre-Finishing Services in Muskoka',
    description: 'Roll On Painting provides expert pre-finishing and pre-staining for new construction materials — tongue-and-groove boards, trim, doors, siding, and millwork. Materials arrive on-site ready to install with a perfect factory-quality finish, saving builders time and delivering superior results.',
    metaDescription: 'Pre-finishing services in Muskoka. Pre-stain and pre-paint trim, T&G boards, doors, and millwork. Shop-quality finishes. Roll On Painting. 705-787-1401.',
    category: 'specialty',
    aiAnswerBlock: {
      whatIncludes: [
        'Pre-staining and pre-painting of tongue-and-groove boards',
        'Trim, baseboard, and crown moulding finishing',
        'Door and window casing pre-finishing',
        'Siding and exterior cladding pre-coating',
        'Custom colour matching and stain selection',
        'Controlled shop environment for consistent results'
      ],
      whoItsFor: [
        'Custom home builders and general contractors',
        'Cottage builders working in Muskoka and cottage country',
        'Renovation contractors needing pre-finished materials',
        'Homeowners building new or renovating existing properties',
        'Millwork shops requiring professional finishing'
      ],
      whereAvailable: [
        'Huntsville, Bracebridge, Gravenhurst',
        'Port Sydney, Dorset, Baysville, Dwight',
        'Muskoka Lakes, Lake of Bays, Rosseau',
        'Parry Sound, Orillia, Barrie',
        'Delivery and pickup available across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 or email info@roll-onpainting.com',
        'Provide material type, quantity, and finish specifications',
        'We quote based on board feet or linear feet',
        'Materials can be dropped off or picked up from our shop'
      ]
    },
    benefits: [
      'Controlled shop environment ensures consistent, dust-free finishes',
      'Faster on-site installation — materials arrive ready to install',
      'Eliminates mess, fumes, and drying time on the job site',
      'Professional spray application for smooth, even coverage',
      'Custom colour matching to any stain or paint specification',
      'Over 25 years of finishing experience',
      'Bulk capacity — we can handle large-volume orders',
      'WSIB covered with $5 million liability insurance'
    ],
    process: [
      { step: 'Material Intake', description: 'Materials are delivered to our shop or picked up from your supplier. We inspect each piece for defects and confirm finish specifications.' },
      { step: 'Surface Preparation', description: 'All materials are sanded smooth, cleaned, and inspected. Any defects are filled and repaired before finishing begins.' },
      { step: 'Finish Application', description: 'Using professional spray equipment in our controlled shop environment, we apply stain, paint, or clear coat for a uniform, factory-quality finish.' },
      { step: 'Drying & Curing', description: 'Materials are placed on custom drying racks in our climate-controlled shop to ensure proper curing without dust contamination.' },
      { step: 'Quality Inspection', description: 'Every piece is inspected for consistency, coverage, and finish quality. Additional coats are applied if needed.' },
      { step: 'Packaging & Delivery', description: 'Finished materials are carefully stacked and protected for transport. We coordinate delivery timing with your installation schedule.' }
    ],
    galleryImages: [
      '/lovable-uploads/prefinishing-stained-boards-muskoka-1.jpg',
      '/lovable-uploads/prefinishing-shop-racks-muskoka-1.jpg',
      '/lovable-uploads/prefinishing-pine-doors.jpg',
      '/lovable-uploads/prefinishing-stained-glass-restoration.jpg',
      '/lovable-uploads/prefinishing-white-trim-boards.jpg',
      '/lovable-uploads/prefinishing-douglas-fir-boards.jpg',
      '/lovable-uploads/prefinishing-rutherford-go-station-ceilings.jpg'
    ],
    galleryVideos: [
      '/lovable-uploads/prefinishing-video-thumbnail.jpg'
    ],
    faqs: [
      {
        question: 'What materials can you pre-finish?',
        answer: 'We pre-finish tongue-and-groove boards (pine, cedar, Douglas fir), trim and baseboards, interior and exterior doors, window casings, crown moulding, siding, and custom millwork. If it can be stained or painted, we can finish it.'
      },
      {
        question: 'How does pre-finishing save time on a build?',
        answer: 'Pre-finished materials arrive ready to install — no on-site sanding, priming, painting, or drying time. This can save days or weeks on a project, especially for large cottage builds with extensive trim and T&G work.'
      },
      {
        question: 'Can you match a specific stain colour?',
        answer: 'Yes. We can match any stain colour from major manufacturers including Minwax, Sikkens, and Sansin. We create test samples on your actual material for approval before starting the full batch.'
      },
      {
        question: 'What is the turnaround time for pre-finishing?',
        answer: 'Typical turnaround is 5-10 business days depending on volume and finish type. Rush orders can be accommodated. We coordinate timing with your construction schedule to ensure materials arrive when needed.'
      },
      {
        question: 'Do you offer pickup and delivery?',
        answer: 'Yes. Materials can be dropped off at our shop in Port Sydney or we can arrange pickup from your supplier. Finished materials can be delivered directly to your job site anywhere in Muskoka.'
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
