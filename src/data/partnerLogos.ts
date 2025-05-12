
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
    logo: "https://www.benjaminmoore.com/sites/default/files/2023-11/BM_Logo_Primary_4C_FullColor.png",
    altText: "Benjamin Moore - Premium Paint Provider",
    url: "https://www.benjaminmoore.com/"
  },
  {
    name: "Sansin Stain",
    logo: "https://cdn.sansin.com/wp-content/uploads/2018/03/06232406/sansin-logo-en.png",
    altText: "Sansin Stain - Wood Protection",
    url: "https://www.sansin.com/"
  },
  {
    name: "Painting Contractors Association",
    logo: "https://pcapainted.org/wp-content/uploads/2020/03/Horizontal_Logo_Full_Color-1-2.png",
    altText: "Painting Contractors Association - Professional Certification",
    url: "https://pcapainted.org/"
  },
  {
    name: "Dulux",
    logo: "https://www.dulux.ca/content/dam/dulux/icons/logos/dulux/logo.svg",
    altText: "Dulux - Quality Paints and Coatings",
    url: "https://www.dulux.ca/"
  },
  {
    name: "PPG",
    logo: "https://www.ppg.com/content/dam/ppgcom/global-site/en/images/branding/logos/ppg_logo.svg",
    altText: "PPG - Paint and Coatings Provider",
    url: "https://www.ppg.com/"
  },
  {
    name: "WSIB",
    logo: "https://www.wsib.ca/sites/default/files/logo/wsib-logo.svg",
    altText: "WSIB - Workplace Safety and Insurance Board",
    url: "https://www.wsib.ca/"
  }
];
