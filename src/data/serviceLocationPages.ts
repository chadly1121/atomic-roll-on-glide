import { ServicePageData } from './servicePages';

/**
 * Service + Location combo pages for hyper-local SEO.
 * Each page targets a specific service + "Muskoka" keyword
 * with 800+ words of unique, keyword-rich content.
 */
export const serviceLocationPages: ServicePageData[] = [
  {
    slug: 'interior-painting-muskoka',
    name: 'Interior Painting Muskoka',
    headline: 'Interior Painting in Muskoka – Clean, High-End Results Without the Headaches',
    description: 'Looking for reliable interior painters in Muskoka? Roll On Painting specializes in clean, professional painting for homes, cottages, and renovations across Port Sydney, Huntsville, Bracebridge, and surrounding areas. Over 25 years of experience. Featured 4 times on HGTV.',
    metaDescription: 'Interior painting in Muskoka by Roll On Painting. 25+ years experience. Walls, ceilings, trim, spray finishes. Serving Huntsville, Bracebridge, Port Sydney. Free quotes. 705-787-1401.',
    category: 'residential',
    priceFrom: { amount: 4.50, unit: 'sq ft' },
    aiAnswerBlock: {
      whatIncludes: [
        'Walls, ceilings, trim, doors, and baseboards — every surface done right',
        'Spray or brush/roll finishes depending on your project',
        'Full surface preparation: patching holes, sanding rough spots, caulking gaps, and priming bare surfaces',
        'Two coats of premium-quality paint from Benjamin Moore, Dulux, or PPG',
        'Complete floor, furniture, and fixture protection throughout the project',
        'Clean job sites — we leave your home cleaner than we found it',
        'Sharp, consistent paint lines with no flashing or lap marks',
        'Final walkthrough with you to ensure every detail meets your standards',
        'Free Touch Ups for Life on every completed interior painting project'
      ],
      whoItsFor: [
        'Muskoka homeowners refreshing living rooms, bedrooms, kitchens, and bathrooms',
        'Cottage owners preparing lakefront properties for the season',
        'Property managers updating rental units between tenants',
        'Homeowners staging properties for sale who need a quick, professional refresh',
        'New construction and renovation projects requiring premium finishing',
        'High-end custom homes with vaulted ceilings, exposed beams, and specialty finishes'
      ],
      whereAvailable: [
        'Port Sydney, Huntsville, Bracebridge, Gravenhurst',
        'Muskoka Lakes, Lake of Bays, Dorset, Baysville, Dwight',
        'Lake Rosseau, Lake Joseph, Lake Muskoka, Port Carling',
        'Parry Sound, Georgian Bay, Bala, Port Severn',
        'Orillia, Barrie, and all communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 or use our online contact form for a free estimate',
        'We visit your property, measure rooms, assess surface conditions, and discuss your color preferences',
        'Receive a detailed, written quote within 24-48 hours — no surprises, no hidden fees',
        'Interior painting in Muskoka starts at $4.50 per square foot including prep, primer, and two coats'
      ]
    },
    benefits: [
      'Over 25 years of professional painting experience in Muskoka',
      'Featured 4 times on HGTV\'s Scott\'s Vacation House Rules',
      'WSIB covered with $5 million liability insurance for your protection',
      'Premium Benjamin Moore, Dulux, and PPG paints — never builder-grade products',
      'Free Touch Ups for Life on every completed project',
      'Clean, respectful, and punctual crews who treat your home like their own',
      'Proper preparation is everything — we never skip steps',
      'Consistent, flawless finishes without flashing, lap marks, or drips',
      'Detailed trim, baseboard, and door work that most painters rush through',
      'We respect your space — furniture moved, floors protected, full cleanup included'
    ],
    process: [
      { step: 'Free Consultation', description: 'We visit your Muskoka home, discuss your vision, measure rooms, and recommend colors and finishes.' },
      { step: 'Detailed Quote', description: 'Receive a written, itemized quote within 24-48 hours — no hidden fees, no surprises.' },
      { step: 'Surface Preparation', description: 'We patch holes, sand rough spots, caulk gaps, prime bare surfaces, and protect your floors and furniture.' },
      { step: 'Professional Painting', description: 'Two coats of premium paint applied with spray, brush, or roller — whichever delivers the best finish for your surfaces.' },
      { step: 'Final Walkthrough', description: 'We walk through every room with you to ensure every detail meets your standards before we leave.' },
      { step: 'Free Touch Ups for Life', description: 'After your project is complete, we come back anytime to touch up scuffs or marks — for life.' }
    ],
    faqs: [
      {
        question: 'How much does interior painting cost in Muskoka?',
        answer: 'Interior painting in Muskoka starts at $4.50 per square foot with Roll On Painting. This includes full preparation (patching, sanding, priming), two coats of premium paint, and cleanup. High-end finishes like stained beams, pine ceilings, or specialty wallpaper can range up to $15/sq ft. Contact us for a free, no-obligation quote specific to your project.'
      },
      {
        question: 'How long does interior painting take in a Muskoka home?',
        answer: 'A typical room takes 1-2 days including full preparation. Whole-house projects usually take 3-7 days depending on size, number of rooms, and complexity. Cottage interiors with vaulted ceilings or exposed beams may take slightly longer. We provide a clear timeline before starting.'
      },
      {
        question: 'Do you paint cottage interiors in Muskoka?',
        answer: 'Absolutely. We specialize in Muskoka cottage interiors including pine ceilings, exposed beams, shiplap walls, and lakefront living areas. We use products suited to cottage environments and can work around your seasonal schedule.'
      },
      {
        question: 'What paint brands do you use for interior projects?',
        answer: 'We use premium paints from Benjamin Moore, Dulux, and PPG. We never use builder-grade products. We recommend specific sheens and formulations based on the room — for example, scrubbable eggshell for high-traffic areas and flat for ceilings.'
      },
      {
        question: 'Do I need to move furniture before you start painting?',
        answer: 'No. We handle all furniture moving and protection. Large items are moved to the center of the room and fully covered. We protect floors with drop cloths and tape off trim, windows, and fixtures. You don\'t need to prepare anything.'
      },
      {
        question: 'What areas in Muskoka do you serve for interior painting?',
        answer: 'We serve all of Muskoka and surrounding areas including Port Sydney, Huntsville, Bracebridge, Gravenhurst, Muskoka Lakes, Lake of Bays, Dorset, Baysville, Dwight, Parry Sound, Georgian Bay, Bala, Orillia, and Barrie.'
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
      '/lovable-uploads/interior-primer-ceiling-beams.jpg',
      '/lovable-uploads/interior-cottage-shiplap-lake-rosseau.jpg',
      '/lovable-uploads/interior-great-room-vaulted-ceiling-muskoka.jpg',
      '/lovable-uploads/interior-accent-wall-dark-blue-muskoka.jpg',
      '/lovable-uploads/interior-living-room-fireplace-builtins-muskoka.jpg',
      '/lovable-uploads/interior-painting-crew-lakefront-dockside.jpg'
    ]
  },
  {
    slug: 'exterior-painting-muskoka',
    name: 'Exterior Painting Muskoka',
    headline: 'Exterior Painting in Muskoka – Built to Withstand Canadian Winters',
    description: 'Protect and beautify your Muskoka home or cottage with professional exterior painting from Roll On Painting. Weather-resistant finishes, thorough prep work, and 25+ years of experience serving Huntsville, Bracebridge, Port Sydney, and all of Muskoka.',
    metaDescription: 'Exterior painting in Muskoka. Weather-resistant finishes for homes & cottages. 25+ years experience. Serving Huntsville, Bracebridge, Port Sydney. Free quotes. 705-787-1401.',
    category: 'residential',
    priceFrom: { amount: 5.75, unit: 'sq ft' },
    aiAnswerBlock: {
      whatIncludes: [
        'Full power washing and surface cleaning before any paint is applied',
        'Scraping loose and flaking paint, sanding rough surfaces, and caulking all gaps and joints',
        'Primer application on bare wood, repaired areas, and stain-blocking where needed',
        'Two coats of premium, weather-resistant exterior paint rated for Canadian climates',
        'Window and door trim detailing with clean, precise lines',
        'Gutter, soffit, and fascia painting when included in scope',
        'Deck and porch floor coating available as an add-on',
        'Full site cleanup — no paint cans, no drop cloths, no mess left behind',
        'Free Touch Ups for Life on every completed exterior project'
      ],
      whoItsFor: [
        'Muskoka homeowners protecting their investment from harsh weather',
        'Cottage owners maintaining lakefront and waterfront properties',
        'Property managers refreshing curb appeal for rentals and vacation properties',
        'Homeowners selling who need exterior updates to boost resale value',
        'New builds and additions requiring exterior finishing and trim work',
        'Log home and cabin owners needing specialized stains and coatings'
      ],
      whereAvailable: [
        'Port Sydney, Huntsville, Bracebridge, Gravenhurst',
        'Muskoka Lakes, Lake of Bays, Dorset, Baysville, Dwight',
        'Lake Rosseau, Lake Joseph, Lake Muskoka, Port Carling',
        'Parry Sound, Georgian Bay, Bala, Port Severn',
        'Orillia, Barrie, and all communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 or submit a request through our online contact form',
        'We visit your property to inspect siding condition, measure surfaces, and discuss color options',
        'Receive a detailed, written quote within 24-48 hours with no hidden fees',
        'Exterior painting in Muskoka starts at $5.75 per square foot including prep, primer, and two coats'
      ]
    },
    benefits: [
      'Weather-resistant paints and stains rated for -30°C Canadian winters and humid Muskoka summers',
      'Over 25 years of professional exterior painting experience in Muskoka',
      'Featured 4 times on HGTV\'s Scott\'s Vacation House Rules',
      'WSIB covered with $5 million liability insurance',
      'Thorough preparation prevents peeling, cracking, and premature failure',
      'Experienced with cedar, pine, wood siding, vinyl, stucco, brick, and log homes',
      'Free Touch Ups for Life on every completed project',
      'We partner with Sansin for premium wood treatments and natural finishes',
      'Clean, professional crews who respect your property and landscaping'
    ],
    process: [
      { step: 'Property Inspection', description: 'We inspect your siding, trim, and surfaces to assess condition and recommend the right approach for Muskoka weather.' },
      { step: 'Power Washing', description: 'We power wash all surfaces to remove dirt, mildew, and loose paint before any prep work begins.' },
      { step: 'Prep & Repair', description: 'Scraping, sanding, caulking, and priming — we fix every issue so paint adheres properly and lasts.' },
      { step: 'Paint Application', description: 'Two coats of weather-resistant exterior paint rated for Canadian climates, applied by experienced crews.' },
      { step: 'Detail Work', description: 'Windows, doors, trim, soffits, and gutters — every detail is finished with clean, precise lines.' },
      { step: 'Cleanup & Warranty', description: 'Full site cleanup and Free Touch Ups for Life on every completed exterior project.' }
    ],
    faqs: [
      {
        question: 'How much does exterior painting cost in Muskoka?',
        answer: 'Exterior painting in Muskoka starts at $5.75 per square foot with Roll On Painting. This includes power washing, full surface preparation, primer, and two coats of weather-resistant paint. Log homes and specialty finishes may cost more. Contact us for a free estimate specific to your property.'
      },
      {
        question: 'What is the best time to paint exteriors in Muskoka?',
        answer: 'May through October offers the best conditions for exterior painting in Muskoka. We need temperatures above 10°C and dry weather for proper adhesion and curing. We monitor forecasts closely and schedule accordingly to ensure the best results.'
      },
      {
        question: 'How long does exterior paint last in Muskoka\'s climate?',
        answer: 'With proper preparation and quality paint, exterior finishes typically last 7-10 years in Muskoka\'s climate. Surfaces exposed to direct sun or lake spray may need attention sooner. Our thorough prep work maximizes paint longevity.'
      },
      {
        question: 'Do you paint log homes and cabins in Muskoka?',
        answer: 'Yes. We specialize in log homes and cabins using appropriate stains, sealers, and finishes. We partner with Sansin for premium wood treatments designed specifically for Canadian log structures. We also handle chinking and log restoration.'
      },
      {
        question: 'Can you paint my cottage exterior while I\'m not there?',
        answer: 'Yes. Many of our Muskoka clients are seasonal cottage owners. We can coordinate access, provide photo updates throughout the project, and ensure everything is completed to your satisfaction before you arrive.'
      },
      {
        question: 'What areas do you serve for exterior painting?',
        answer: 'We serve all of Muskoka and surrounding areas including Port Sydney, Huntsville, Bracebridge, Gravenhurst, Muskoka Lakes, Lake of Bays, Parry Sound, Georgian Bay, Bala, Orillia, and Barrie.'
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
      '/lovable-uploads/exterior-brick-spray-black-front-entry.jpg',
      '/lovable-uploads/exterior-cottage-staining-roller-muskoka.webp',
      '/lovable-uploads/exterior-staining-crew-client-consultation-muskoka.webp',
      '/lovable-uploads/exterior-boathouse-painting-lake-muskoka.jpg',
      '/lovable-uploads/exterior-painting-crew-port-sydney.jpg',
      '/lovable-uploads/exterior-painting-crew-lakeside-cottage.jpg'
    ]
  },
  {
    slug: 'spray-painting-muskoka',
    name: 'Spray Painting Muskoka',
    headline: 'Professional Spray Painting in Muskoka – Factory-Quality Finishes on Site',
    description: 'Roll On Painting delivers professional spray painting and spray finishing services across Muskoka. Get smooth, factory-quality finishes on doors, trim, cabinets, fences, ceilings, and large surfaces — without the brush marks.',
    metaDescription: 'Spray painting in Muskoka. Factory-quality finishes for trim, cabinets, doors, fences & ceilings. 25+ years experience. Serving Huntsville, Bracebridge. 705-787-1401.',
    category: 'specialty',
    aiAnswerBlock: {
      whatIncludes: [
        'Surface preparation including cleaning, sanding, patching, and priming',
        'Complete masking and overspray protection for surrounding surfaces',
        'Airless or HVLP spray application for smooth, even coverage',
        'Multiple coats for maximum durability and uniformity',
        'Trim, doors, railings, baseboards, crown moulding, and wainscoting',
        'Vaulted ceilings, exposed beams, and large open areas',
        'Cabinets, built-ins, and custom millwork',
        'Exterior fences, decks, siding, and garage doors',
        'Full cleanup and inspection — no overspray left behind',
        'Free Touch Ups for Life on every completed spray painting project'
      ],
      whoItsFor: [
        'Homeowners who want a smooth, brushstroke-free finish on trim and doors',
        'New construction projects requiring fast, uniform coverage on large surfaces',
        'Cottage owners in Muskoka upgrading pine ceilings, beams, and shiplap',
        'Kitchen renovations needing factory-quality cabinet refinishing',
        'Commercial properties requiring efficient, professional application',
        'Fence, deck, and exterior projects where spray coverage saves time and delivers better results'
      ],
      whereAvailable: [
        'Port Sydney, Huntsville, Bracebridge, Gravenhurst',
        'Muskoka Lakes, Lake of Bays, Dorset, Baysville, Dwight',
        'Lake Rosseau, Lake Joseph, Lake Muskoka, Port Carling',
        'Parry Sound, Georgian Bay, Bala, Port Severn',
        'Orillia, Barrie, and all communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Call 705-787-1401 or email info@roll-onpainting.com to describe your project',
        'We visit to assess surfaces, recommend spray vs. brush/roll, and measure',
        'Receive a detailed written quote with timeline and scope breakdown',
        'Spray painting projects are priced based on surface area and complexity'
      ]
    },
    benefits: [
      'Factory-smooth finish without brush marks, roller stipple, or lap marks',
      'Faster application on large surfaces — saves time and money on big projects',
      'Ideal for trim, doors, cabinets, fences, ceilings, and new construction',
      'Over 25 years of professional spray painting experience in Muskoka',
      'Featured 4 times on HGTV\'s Scott\'s Vacation House Rules',
      'WSIB covered with $5 million liability insurance',
      'Free Touch Ups for Life on every completed project',
      'We use professional airless and HVLP equipment — not consumer-grade sprayers',
      'Meticulous masking protects every surface not being painted'
    ],
    process: [
      { step: 'Scope Assessment', description: 'We visit your property to evaluate surfaces and recommend spray vs. brush/roll for the best results.' },
      { step: 'Masking & Protection', description: 'Every surface not being painted is carefully masked and protected — no overspray, guaranteed.' },
      { step: 'Surface Preparation', description: 'Cleaning, sanding, patching, and priming to ensure perfect adhesion and a flawless base.' },
      { step: 'Spray Application', description: 'Professional airless or HVLP spray equipment delivers smooth, factory-quality coverage without brush marks.' },
      { step: 'Inspection & Touch-Up', description: 'We inspect every surface for consistency and touch up any areas that need attention.' },
      { step: 'Cleanup & Warranty', description: 'Full cleanup, tape removal, and Free Touch Ups for Life on your completed project.' }
    ],
    faqs: [
      {
        question: 'What is the difference between spray painting and brush/roller painting?',
        answer: 'Spray painting uses professional airless or HVLP equipment to atomize paint into a fine mist, producing a smoother, more uniform finish without brush strokes or roller stipple. It\'s faster for large or detailed surfaces like trim, cabinets, ceilings, and fences. Roll On Painting recommends spray finishing for any project where a smooth, factory-quality result is the goal.'
      },
      {
        question: 'Is spray painting suitable for interior walls?',
        answer: 'Yes. Spray painting can produce beautiful results on interior walls, especially in new construction, empty rooms, or spaces with vaulted ceilings. We fully mask and protect all areas not being painted. For occupied homes, we may recommend a combination of spray and roller for the best results with minimal disruption.'
      },
      {
        question: 'Can you spray paint kitchen cabinets in my Muskoka home?',
        answer: 'Absolutely. Cabinet spray painting is one of our most popular services. We remove doors and hardware, prep all surfaces, and spray multiple coats for a durable, factory-quality finish. This transforms your kitchen for a fraction of the cost of replacing cabinets.'
      },
      {
        question: 'How much does spray painting cost in Muskoka?',
        answer: 'Spray painting costs vary based on surface area and project complexity. Interior spray finishing typically starts around $4.50/sq ft. Cabinet refinishing, specialty trim, and large exterior projects are quoted individually. Contact us for a free estimate.'
      },
      {
        question: 'Do you spray paint exteriors in Muskoka?',
        answer: 'Yes. We spray paint exterior siding, fences, decks, garage doors, and trim throughout Muskoka. Spray application is especially effective for fences and large siding areas where speed and even coverage matter.'
      }
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
      '/lovable-uploads/prefinishing-white-trim-boards.jpg'
    ]
  },
  {
    slug: 'cabinet-painting-muskoka',
    name: 'Cabinet Painting Muskoka',
    headline: 'Kitchen Cabinet Painting in Muskoka – Transform Your Kitchen for Less',
    description: 'Give your Muskoka kitchen a fresh, modern look without the cost of a full renovation. Roll On Painting transforms dated cabinets with durable, factory-quality spray finishes that last. Serving Huntsville, Bracebridge, Port Sydney, and all of Muskoka.',
    metaDescription: 'Cabinet painting in Muskoka. Transform your kitchen for a fraction of replacement cost. Spray finishes, 25+ years experience. Serving Huntsville, Bracebridge. 705-787-1401.',
    category: 'residential',
    aiAnswerBlock: {
      whatIncludes: [
        'Careful removal of all cabinet doors, drawers, and hardware',
        'Thorough cleaning and degreasing of all surfaces',
        'Sanding, filling, and surface preparation for maximum adhesion',
        'Primer application with professional-grade bonding primer',
        'Multiple coats of durable cabinet paint via spray application',
        'Factory-smooth finish without brush marks or roller texture',
        'Reinstallation of all doors, drawers, and hardware',
        'Optional hardware replacement and soft-close hinge upgrades',
        'Full kitchen cleanup and protection throughout the process',
        'Free Touch Ups for Life on every completed cabinet project'
      ],
      whoItsFor: [
        'Muskoka homeowners updating dated or worn kitchen cabinets',
        'Cottage owners refreshing cabin and lakefront kitchens',
        'Property flippers and investors improving resale value',
        'Anyone wanting a brand-new kitchen look without the $30,000+ cost of replacement',
        'Bathroom vanity and built-in cabinet updates',
        'Laundry room and mudroom cabinet refreshes'
      ],
      whereAvailable: [
        'Port Sydney, Huntsville, Bracebridge, Gravenhurst',
        'Muskoka Lakes, Lake of Bays, Dorset, Baysville',
        'Lake Rosseau, Lake Joseph, Port Carling',
        'Parry Sound, Georgian Bay, Bala',
        'All communities across Muskoka and Simcoe County'
      ],
      howQuotesWork: [
        'Send photos of your cabinets via our contact form or email info@roll-onpainting.com',
        'We provide a preliminary estimate based on photos and cabinet count',
        'Schedule a free in-home visit for precise measurements and color consultation',
        'Receive a detailed written quote — typically within 24-48 hours'
      ]
    },
    benefits: [
      'Transform your kitchen for a fraction of the cost of new cabinets',
      'Factory-quality spray finish — smooth, durable, and chip-resistant',
      'Completed in 3-5 business days for a standard kitchen',
      'Wide range of colors and finishes — from classic white to bold modern shades',
      'Over 25 years of professional painting experience in Muskoka',
      'Featured 4 times on HGTV\'s Scott\'s Vacation House Rules',
      'WSIB covered with $5 million liability insurance',
      'Free Touch Ups for Life on every completed project',
      'Minimal disruption to your daily routine — we work clean and fast',
      'Premium primers and paints designed specifically for kitchen cabinets'
    ],
    process: [
      { step: 'Photo Consultation', description: 'Send us photos of your cabinets and we provide a preliminary estimate within 24 hours.' },
      { step: 'In-Home Visit', description: 'We measure your kitchen, assess cabinet material and condition, and discuss color options with samples.' },
      { step: 'Door Removal', description: 'We carefully remove all doors, drawers, and hardware — labeling everything for perfect reinstallation.' },
      { step: 'Prep & Prime', description: 'Thorough cleaning, degreasing, sanding, and bonding primer application for maximum adhesion.' },
      { step: 'Spray Finishing', description: 'Multiple coats of durable cabinet paint via professional spray equipment for a factory-smooth finish.' },
      { step: 'Reinstall & Warranty', description: 'Doors and hardware reinstalled with precision. Free Touch Ups for Life included.' }
    ],
    faqs: [
      {
        question: 'How much does cabinet painting cost in Muskoka?',
        answer: 'Cabinet painting costs depend on the number of cabinets, doors, drawers, and the condition of existing surfaces. A standard Muskoka kitchen typically ranges from $3,500 to $7,000 for a full spray refinish — a fraction of the $25,000-$40,000 cost of new cabinets. Contact us for a free, accurate quote.'
      },
      {
        question: 'How long does cabinet painting take?',
        answer: 'A standard kitchen cabinet painting project takes 3-5 business days. This includes door removal, preparation, spraying multiple coats, drying time, and reinstallation. We work efficiently to minimize disruption to your kitchen use.'
      },
      {
        question: 'Will painted cabinets chip or peel?',
        answer: 'Not when done properly. We use professional-grade bonding primers and durable cabinet-specific paints designed to withstand daily kitchen use. Our multi-coat spray process creates a hard, factory-quality finish that resists chipping, scratching, and moisture.'
      },
      {
        question: 'Can you paint thermofoil or laminate cabinets?',
        answer: 'Yes. We can paint thermofoil, laminate, MDF, and solid wood cabinets. Each material requires specific preparation techniques — we assess your cabinet material during our in-home visit and use the appropriate primers and paints for maximum adhesion.'
      },
      {
        question: 'What colors are available for cabinet painting?',
        answer: 'We offer the full range of Benjamin Moore, Dulux, and PPG colors. White, grey, navy, and black are the most popular choices in Muskoka right now, but we can match any color you choose. We bring samples so you can see the finish before we start.'
      },
      {
        question: 'Do you serve cottage kitchens in Muskoka?',
        answer: 'Absolutely. We frequently paint cottage kitchen cabinets throughout Muskoka including Huntsville, Bracebridge, Port Sydney, Lake of Bays, and Muskoka Lakes. We can coordinate around your cottage schedule.'
      }
    ],
    galleryImages: [
      '/lovable-uploads/cabinet-grey-kitchen-finished.jpg',
      '/lovable-uploads/cabinet-white-kitchen-black-backsplash.jpg',
      '/lovable-uploads/cabinet-spray-finish-action.jpg',
      '/lovable-uploads/cabinet-door-sanding-closeup.jpg',
      '/lovable-uploads/cabinet-painting-masking-prep.jpg',
      '/lovable-uploads/cabinet-dark-doors-drying-rack.jpg',
      '/lovable-uploads/cabinet-white-builtin-shelving.jpg',
      '/lovable-uploads/cabinet-onsite-spray-white.jpg',
      '/lovable-uploads/cabinet-kitchen-refinish-dockside-muskoka.jpg'
    ],
    galleryVideos: [
      '/lovable-uploads/cabinet-repaint-video.mp4'
    ]
  }
];

// Helper to get service-location page by slug
export const getServiceLocationBySlug = (slug: string): ServicePageData | undefined => {
  return serviceLocationPages.find(s => s.slug === slug);
};

// Get all service-location slugs for routing
export const getAllServiceLocationSlugs = (): string[] => {
  return serviceLocationPages.map(s => s.slug);
};
