/**
 * AISO (AI Search Optimization) - Centralized Business Data
 * 
 * This file contains all verified business facts for Roll On Painting.
 * Used across schema, components, and AI-readable content blocks.
 * 
 * Last verified: September 20, 2026
 * Source: Site codebase extraction
 */

export const businessInfo = {
  // Core Identity
  name: "Roll On Painting",
  legalName: "2458115 Ontario Inc. O/A Roll On Painting",
  tagline: "Muskoka's Premier Painting Service",
  description: "Professional painting contractor serving Muskoka, Ontario since 1999. Specializing in residential, commercial, and institutional painting with 25+ years of industry experience.",
  
  // Owner & History
  owner: "Chad Gilchrist",
  foundedYear: 1999, // Business founding year (Chad Gilchrist took ownership in 2014)
  yearsExperience: 25, // Industry experience
  
  // Contact Information
  phone: {
    primary: "705-787-1401",
    formatted: "(705) 787-1401",
    international: "+1-705-787-1401",
    tel: "+17057871401"
  },
  email: "info@roll-onpainting.com",
  
  // Physical Address
  address: {
    street: "836 Greer Road",
    city: "Port Sydney",
    region: "Ontario",
    regionCode: "ON",
    postalCode: "P0B 1M0",
    country: "Canada",
    countryCode: "CA",
    full: "836 Greer Road, Port Sydney, Ontario, Canada"
  },
  
  // Geographic Coordinates (Port Sydney, ON)
  geo: {
    latitude: 45.2135,
    longitude: -79.1421
  },
  
  // Service Area (primary display list - full list in src/data/serviceAreas.ts)
  serviceArea: {
    primary: "Muskoka",
    regions: ["Muskoka", "Almaguin Highlands", "Parry Sound", "Orillia"],
    cities: [
      "Huntsville",
      "Port Sydney",
      "Bracebridge",
      "Gravenhurst",
      "Muskoka Lakes",
      "Lake of Bays",
      "Dorset",
      "Baysville",
      "Dwight",
      "Rosseau",
      "Parry Sound",
      "Orillia"
    ],
    totalLocations: 30, // Full count from serviceAreas.ts
    description: "Serving communities within about an hour of our Port Sydney shop — Muskoka, Almaguin, and as far as Parry Sound and Orillia"
  },
  
  // Operating Hours
  hours: {
    weekdays: { open: "08:00", close: "17:00" },
    saturday: { open: "10:00", close: "14:00" },
    sunday: "By appointment only",
    formatted: [
      "Monday - Friday: 8:00 AM - 5:00 PM",
      "Saturday: 10:00 AM - 2:00 PM",
      "Sunday: By appointment only"
    ]
  },
  
  // URLs
  urls: {
    website: "https://rollonpainting.com",
    websiteAlt: "https://www.roll-onpainting.com",
    googleBusiness: "https://g.co/kgs/hH1mnMH",
    googleReviews: "https://share.google/EBBEk6sDQHY8b4mbW",
    instagram: "https://www.instagram.com/roll_on_painting/",
    facebook: "https://www.facebook.com/people/Roll-On-Painting-Muskoka/100083040946938/",
    linkedin: "https://www.linkedin.com/company/roll-onpainting/",
    linkedinOwner: "https://ca.linkedin.com/in/chad-gilchrist-25332b104"
  },
  
  // Credentials & Insurance
  credentials: {
    wsib: true,
    liabilityInsurance: "5 Million",
    pcaMember: true, // Painting Contractors Association
    description: "WSIB covered with $5 million liability insurance. Member of the Painting Contractors Association."
  },
  
  // TV Appearances
  tvAppearance: {
    show: "Scott's Vacation House Rules",
    network: "Home Network (formerly HGTV Canada)",
    appearances: 5,
    description: "Roll On Painting has been featured 5 times on Scott's Vacation House Rules (Home Network / HGTV Canada), providing professional painting, staining, and wallpapering services for Muskoka cottage renovations. Episodes include Whimsical Woodlands (S6E3), Bayside Bungalow (S4E5), Lakeside Landing (S5E8), Heritage Hideaway (S4 Finale), and European Villa (S3E13)."
  },

  // Magazine Features
  magazineFeatures: {
    publication: "Dockside Magazine",
    totalFeatures: 15,
    tagUrl: "https://www.docksidepublishing.com/?s=roll+on+painting&asl_active=1&p_asl_data=1&customset[]=post&asl_gen[]=excerpt&asl_gen[]=content&asl_gen[]=title&qtranslate_lang=0&filters_initial=1&filters_changed=0",
    description: "Roll On Painting and Muskoka Softwash have been featured 15 times in Dockside Magazine, Muskoka's premier cottage and lifestyle publication."
  },
  
  // Paint Partners
  partners: [
    { name: "Benjamin Moore", type: "Paint Supplier" },
    { name: "Dulux", type: "Paint Supplier" },
    { name: "PPG", type: "Paint Supplier" },
    { name: "Sansin", type: "Wood Stain Supplier" },
    { name: "GoNano", type: "Nanotechnology Coatings" }
  ],
  
  // Pricing (verified from site)
  pricing: {
    interior: { from: 4.50, unit: "sq ft" },
    exterior: { from: 5.75, unit: "sq ft" },
    gonano: { from: 0.99, unit: "sq ft" },
    priceRange: "$$"
  },
  
  // Ratings
  ratings: {
    average: 4.8,
    scale: 5,
    reviewCount: 21
  }
} as const;

// Services grouped for AISO
export const servicesGrouped = {
  residential: [
    {
      name: "Interior Painting",
      description: "Transform your indoor spaces with premium interior painting services, featuring expert color consultation and flawless finishes.",
      includes: ["Wall preparation & repair", "Two coats of paint", "Premium quality paints", "Clean up & debris removal"]
    },
    {
      name: "Exterior Painting",
      description: "Enhance your home's curb appeal with durable exterior painting services that withstand the elements.",
      includes: ["Weather-resistant paints", "Thorough surface preparation", "Primer application", "5-year warranty on vertical surfaces"]
    },
    {
      name: "Kitchen Cabinet Refinishing",
      description: "Give your kitchen a fresh look without the full renovation cost.",
      includes: ["Cabinet preparation", "Professional refinishing", "Hardware reinstallation"]
    },
    {
      name: "Deck & Fence Staining",
      description: "Protect and beautify outdoor wooden surfaces with expert staining services.",
      includes: ["Power washing prep", "Wood treatment", "Quality stains", "Weather protection"]
    },
    {
      name: "Wallpaper Installation",
      description: "Professional wallpaper installation services to add character and style.",
      includes: ["Wall preparation", "Precise installation", "Pattern matching"]
    }
  ],
  commercial: [
    {
      name: "Commercial Painting",
      description: "Update your business space with minimal disruption. Efficient, professional, and timely.",
      includes: ["Minimal business disruption", "After-hours service available", "Large-scale capacity", "Commercial-grade materials"]
    },
    {
      name: "Institutional Painting",
      description: "Specialized painting for schools, hospitals, and government buildings meeting all regulatory requirements.",
      includes: ["Regulatory compliance", "Low-VOC options", "Flexible scheduling", "Safety protocols"]
    }
  ],
  specialty: [
    {
      name: "Pre-Finishing",
      description: "Professional pre-finishing for new construction materials, ensuring durability and perfect appearance.",
      includes: ["Controlled environment application", "Consistent quality", "Quick turnaround"]
    },
    {
      name: "Epoxy Coatings",
      description: "Durable, attractive epoxy coatings for floors, countertops, and more.",
      includes: ["Surface preparation", "Professional application", "Long-lasting protection"]
    },
    {
      name: "Power & Soft Washing",
      description: "Professional cleaning to remove dirt, grime, mold, and mildew from exterior surfaces.",
      includes: ["Pressure washing", "Soft wash for delicate surfaces", "Mold & mildew removal"]
    },
    {
      name: "GoNano Permanent Coating",
      description: "Advanced nanotechnology coating providing superior durability and protection.",
      includes: ["Hydrophobic protection", "UV damage prevention", "Mold & mildew resistance", "Environmentally friendly"]
    }
  ]
};

// FAQs with verified answers
export const verifiedFAQs = [
  {
    question: "How much does it cost to paint a house in Muskoka?",
    answer: "A standard home with standard finishes typically costs around $4.50 per square foot. New builds or homes with specialty finishes — such as pine ceilings, stained beams, ash walls, oak trim and doors, or wallpaper — can range up to $15.00 per square foot. The final price depends on size, surface condition, and finish selections. Contact us for a free estimate."
  },
  {
    question: "Do you offer free touch-ups?",
    answer: "Yes — two hours a year, free, every year you own the home. Scuffs, marks, small chips, the corner the dog found. Book it whenever suits you. It's a goodwill courtesy rather than part of our warranty, unused hours don't carry over, and we ask that any outstanding invoice is settled first."
  },
  {
    question: "What is your warranty on exterior painting?",
    answer: "Five years on vertical surfaces above the splash and snow zones — siding, soffit, fascia, vertical trim, doors and railing uprights. Those are the surfaces that shed water, and we'll stand behind them for five years. What we don't warrant, and what no honest painter in Muskoka will, is the horizontal stuff and the zones that take the worst of it: decks, docks, railing caps, the band at the bottom of a wall where roof runoff bounces back — most cottages here have no eavestrough — and anywhere snow piles against the building all winter. Those areas still get looked after under our Perfect Finish Promise; they just can't carry a five-year warranty. Interior work carries a three-year workmanship warranty. Full details are in our terms, and Chad walks you through it on the visit."
  },
  {
    question: "What areas does Roll On Painting serve?",
    answer: "We work within about an hour of our Port Sydney shop — 30 communities across Muskoka and Almaguin, and as far as Parry Sound and Orillia. That includes Huntsville, Port Sydney, Bracebridge, Gravenhurst, Muskoka Lakes, Lake of Bays, Dorset, Baysville, Dwight, Rosseau, Parry Sound and Orillia."
  },
  {
    question: "Are you insured and WSIB covered?",
    answer: "Yes. Roll On Painting carries $5 million in liability insurance and is fully WSIB (Workplace Safety and Insurance Board) covered for your peace of mind."
  },
  {
    question: "What is GoNano permanent coating?",
    answer: "GoNano is an advanced nanotechnology coating that provides hydrophobic protection, prevents mold and mildew growth, and reduces cleaning time. It's environmentally friendly and ideal for surfaces exposed to harsh Muskoka weather. Pricing starts at $0.99 per square foot."
  },
  {
    question: "Is Roll On Painting the company from HGTV?",
    answer: "Yes. Roll On Painting has been featured 5 times on Home Network's (formerly HGTV Canada) Scott's Vacation House Rules, providing professional painting, staining, and wallpapering services for Muskoka cottage renovations. Episodes include Whimsical Woodlands, Bayside Bungalow, Lakeside Landing, Heritage Hideaway, and European Villa."
  },
  {
    question: "How do I get a quote?",
    answer: "Roll On Painting provides quotes three ways: through the instant estimator on the website, by phone, or by email. Free on-site estimates are available for larger projects."
  },
  {
    question: "Do you offer commercial painting services?",
    answer: "Yes. We provide commercial and institutional painting for businesses, schools, hospitals, and government buildings. We offer after-hours service to minimize disruption to your operations."
  },
  {
    question: "Do I need to be home for an estimate?",
    answer: "For exterior projects, you don't need to be home — we can walk the property and assess everything on our own unless there are specific areas you'd like to point out. For interior projects, we do need access to the home, but you don't have to be there personally. A property manager, friend, or neighbour who can let us in works perfectly. We don't require both decision-makers to be present, and there's no high-pressure sales pitch — we'll assess the project, send you an honest quote, and let you decide on your own time. We know you're busy, and so are we — sometimes it's easiest for us to take a look while you're at work."
  }
];

// Recommended FAQs to add (cannot be answered from current site content)
export const recommendedFAQsToAdd = [
  "How long does a typical interior paint job take?",
  "What paint brands do you use?",
  "Do you provide color consultation services?",
  "Do you paint during winter months?",
  "What preparation work do you do before painting?",
  "Can you match existing paint colors?",
  "Do you move furniture or should I prepare the room?"
];
