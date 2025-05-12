
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
    logo: "/lovable-uploads/b4ae26c1-276b-4724-a731-79dd41a3b244.png",
    altText: "Benjamin Moore - Premium Paint Provider",
    url: "https://www.benjaminmoore.com/"
  },
  {
    name: "Sansin Stain",
    logo: "/lovable-uploads/96370911-68b2-4d07-a273-044f94541183.png",
    altText: "Sansin Stain - Wood Protection",
    url: "https://www.sansin.com/"
  },
  {
    name: "Painting Contractors Association",
    logo: "/lovable-uploads/752b1bd8-1f32-4dfd-8d84-dc73830a1a87.png",
    altText: "Painting Contractors Association - Professional Certification",
    url: "https://pcapainted.org/"
  },
  {
    name: "Dulux",
    logo: "/lovable-uploads/ebf93eae-014a-46ef-99a5-63ebc0150f4d.png",
    altText: "Dulux - Quality Paints and Coatings",
    url: "https://www.dulux.ca/"
  },
  {
    name: "PPG",
    logo: "/lovable-uploads/8d6fb21f-63d9-4ecb-ae65-94bb308df800.png",
    altText: "PPG - Paint and Coatings Provider",
    url: "https://www.ppg.com/"
  },
  {
    name: "WSIB",
    logo: "https://www.wsib.ca/sites/default/files/logo/wsib-logo.svg",
    altText: "WSIB - Workplace Safety and Insurance Board",
    url: "https://www.wsib.ca/"
  },
  {
    name: "HGTV",
    logo: "/lovable-uploads/ddba3df4-6df9-4be7-a310-40bea8f37fb7.png",
    altText: "As Seen on HGTV",
    url: "https://www.hgtv.com/"
  }
];
