
// Define interface for partner logo data
export interface PartnerLogo {
  name: string;
  logo: string;
  altText: string;
  url?: string;
}

// Partner and affiliation logos used in TrustBadges.tsx
export const partnerLogos: PartnerLogo[] = [
  {
    name: "Benjamin Moore",
    logo: "/partner-logos/benjamin-moore.png",
    altText: "Benjamin Moore - Premium Paint Provider",
    url: "https://www.benjaminmoore.com/"
  },
  {
    name: "Sansin Stain",
    logo: "/partner-logos/sansin.png",
    altText: "Sansin Enviro Stain - Wood Protection",
    url: "https://www.sansin.com/"
  },
  {
    name: "Painting Contractors Association",
    logo: "/partner-logos/pca.png",
    altText: "Painting Contractors Association - Professional Certification",
    url: "https://pcapainted.org/"
  },
  {
    name: "Dulux",
    logo: "/partner-logos/dulux.png",
    altText: "Dulux - Quality Paints and Coatings",
    url: "https://www.dulux.ca/"
  },
  {
    name: "PPG",
    logo: "/partner-logos/ppg.png",
    altText: "PPG - Paint and Coatings Provider",
    url: "https://www.ppg.com/"
  },
  {
    name: "WSIB",
    logo: "/partner-logos/wsib.png",
    altText: "WSIB Ontario - Workplace Safety and Insurance Board",
    url: "https://www.wsib.ca/"
  },
  {
    name: "Home Network",
    logo: "/partner-logos/home-network.png",
    altText: "As Seen on Home Network",
    url: "https://www.homenetwork.ca/scotts-vacation-house-rules/"
  },
  {
    name: "HGTV",
    logo: "/partner-logos/hgtv.png",
    altText: "HGTV - Home & Garden Television",
    url: "https://www.hgtv.com/"
  }
];
