export interface CatalogItem {
  id: string;
  category: string;
  title: string;
  price: string;
  stripePriceId: string;
  duration?: string;
  coverage?: string;
  includes: string[];
  excludes?: string[];
  note?: string;
  popular?: boolean;
  isPerSqFt?: boolean;
}

export interface CatalogCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: CatalogItem[];
}

export const catalogCategories: CatalogCategory[] = [
  {
    id: "painting",
    title: "Painting Services",
    icon: "🎨",
    description: "Professional painters ready to transform your space — book by the day.",
    items: [
      {
        id: "painter-day",
        category: "painting",
        title: "Painter for a Day",
        price: "$750",
        stripePriceId: "price_1T9Dc7I3v1u61BwNHyScE8Rc",
        duration: "7 hours",
        includes: [
          "Professional painter for a full day",
          "Sundries (tape, drop cloths, rollers, brushes)",
          "Patching & drywall repair",
          "Caulking & prep work",
          "Clean up & debris removal",
        ],
        excludes: [
          "Paint & primer (due to wide variety of products and price points)",
        ],
        note: "Paint is not included so you can choose the exact brand, finish, and colour you want. We're happy to advise on the best options for your project.",
        popular: true,
      },
    ],
  },
  {
    id: "power-washing",
    title: "Power & Soft Washing",
    icon: "💦",
    description: "Restore your property's exterior — driveways, siding, decks, and more.",
    items: [
      {
        id: "powerwash-day",
        category: "power-washing",
        title: "Power Washer for a Day",
        price: "$750",
        stripePriceId: "price_1T9DcpI3v1u61BwN0U2Hbssu",
        duration: "7 hours",
        includes: [
          "Professional operator for a full day",
          "Commercial-grade equipment",
          "Gas & fuel",
          "Detergents & cleaning solutions",
          "Labour",
        ],
      },
      {
        id: "softwash-exterior",
        category: "power-washing",
        title: "Soft Wash Bungalow Exterior — Walls, Soffits, Gutters, Downspouts, Windows & Doors",
        price: "$750",
        stripePriceId: "NEEDS_STRIPE_PRICE_ID",
        coverage: "Up to 1,800 sq ft",
        includes: [
          "Full exterior soft wash",
          "Walls, soffits, gutters & downspouts",
          "Windows & doors",
          "Commercial-grade equipment",
          "Cleaning solutions & chemicals",
          "All labour included",
          "Tidy up & debris removal",
        ],
        note: "A gentle, low-pressure wash safe for all exterior surfaces. Bungalow homes up to 1,800 sq ft.",
      },
    ],
  },
  {
    id: "roof-wash",
    title: "Asphalt Roof Wash",
    icon: "🏠",
    description: "Safe, thorough roof cleaning to remove moss, algae, and buildup — extends roof life.",
    items: [
      {
        id: "roof-small",
        category: "roof-wash",
        title: "Small Roof Wash",
        price: "$1,500",
        stripePriceId: "price_1T9Dd8I3v1u61BwNoHrirIrp",
        coverage: "Up to 1,200 sq ft",
        includes: [
          "Light moss & algae removal",
          "Chemical treatment & detergents",
          "Commercial equipment",
          "All labour included",
          "Gutter flush & debris cleanup",
        ],
      },
      {
        id: "roof-medium",
        category: "roof-wash",
        title: "Medium Roof Wash",
        price: "$2,200",
        stripePriceId: "price_1T9Dd9I3v1u61BwNPma25QWJ",
        coverage: "1,200 – 2,000 sq ft",
        includes: [
          "Moderate moss & algae removal",
          "Chemical treatment & detergents",
          "Commercial equipment",
          "All labour included",
          "Gutter flush & debris cleanup",
          "Before & after photo documentation",
        ],
        popular: true,
      },
      {
        id: "roof-large",
        category: "roof-wash",
        title: "Large Roof Wash",
        price: "$3,000",
        stripePriceId: "price_1T9DdAI3v1u61BwNLWdXawiF",
        coverage: "2,000 – 4,000 sq ft",
        includes: [
          "Heavy moss & algae removal",
          "Multi-stage chemical treatment",
          "Commercial equipment",
          "All labour included",
          "Gutter flush & debris cleanup",
          "Before & after photo documentation",
          "Post-wash inspection report",
        ],
      },
    ],
  },
  {
    id: "gonano",
    title: "GoNano Roof Protection",
    icon: "🛡️",
    description: "Permanent waterproof nanotechnology coating — as seen on Dragon's Den on CBC.",
    items: [
      {
        id: "gonano-nuroof-fortify",
        category: "gonano",
        title: "GoNano NuRoof Fortify™",
        price: "From $1.99/sq ft",
        stripePriceId: "price_1T9DdHI3v1u61BwNGV3qMe9U",
        isPerSqFt: true,
        coverage: "Roofs 0–7 years old",
        includes: [
          "Full roof inspection & assessment",
          "Surface preparation & cleaning",
          "GoNano nanotechnology application",
          "Permanent waterproof barrier",
          "UV & weather protection",
          "Prevents moss & algae growth",
        ],
        note: "Ideal for newer roofs — locks in protection early and extends lifespan by 15+ years.",
      },
      {
        id: "gonano-nuroof-revive",
        category: "gonano",
        title: "GoNano NuRoof Revive™",
        price: "From $1.49/sq ft",
        stripePriceId: "price_1T9DdJI3v1u61BwNBiwpElzQ",
        isPerSqFt: true,
        coverage: "Roofs 7–15 years old",
        includes: [
          "Comprehensive roof inspection",
          "Deep cleaning & moss removal",
          "Minor granule restoration treatment",
          "GoNano nanotechnology application",
          "Permanent waterproof barrier",
          "UV & weather protection",
          "Colour restoration enhancement",
        ],
        note: "The sweet spot — restore and protect your mid-life roof before expensive damage sets in.",
        popular: true,
      },
      {
        id: "gonano-bio-boost",
        category: "gonano",
        title: "GoNano Bio-Boost™",
        price: "From $0.99/sq ft",
        stripePriceId: "price_1T9DdLI3v1u61BwN2UnMBS5E",
        isPerSqFt: true,
        coverage: "Roofs 10+ years old",
        includes: [
          "Full condition assessment & report",
          "Heavy-duty moss & organic removal",
          "Granule bonding treatment",
          "Crack & seal micro-repair",
          "GoNano nanotechnology application",
          "Maximum-strength waterproof barrier",
          "Anti-microbial protection layer",
          "Extended coverage warranty",
        ],
        note: "Heavy-duty rejuvenation for aging roofs — avoid a full replacement and add years of life.",
      },
    ],
  },
];
