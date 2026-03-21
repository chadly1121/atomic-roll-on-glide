
import { Paintbrush, Home, Building2, UtensilsCrossed, Fence, School, Hammer, Image, Sparkles, Droplets, Construction } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  slug?: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Interior Painting",
    description: "Transform your indoor spaces with expert color consultation, meticulous prep, and flawless finishes for homes and cottages.",
    icon: Home,
    image: "/lovable-uploads/44c0f726-e327-4bd3-84f8-39856de74304.webp",
    slug: "interior-painting",
  },
  {
    id: 2,
    title: "Exterior Painting",
    description: "Enhance curb appeal with durable exterior coatings that withstand Muskoka's harsh seasons while looking beautiful.",
    icon: Paintbrush,
    image: "/lovable-uploads/dad95b14-ad28-4aab-ab8b-05f9a56458ec.webp",
    slug: "exterior-painting",
  },
  {
    id: 3,
    title: "Commercial Painting",
    description: "Update your business space with minimal disruption. Efficient, professional, and completed on your schedule.",
    icon: Building2,
    image: "/lovable-uploads/033a3727-9412-4815-8892-28a94d347c4b.webp",
    slug: "commercial-painting",
  },
  {
    id: 4,
    title: "Kitchen Cabinet Refinishing",
    description: "A fresh kitchen without the full renovation cost. Stunning results that completely transform the space.",
    icon: UtensilsCrossed,
    image: "/lovable-uploads/cabinet-refinish-stock-1.jpg",
    slug: "cabinet-refinishing",
  },
  {
    id: 5,
    title: "Deck & Fence Staining",
    description: "Protect and beautify outdoor wooden surfaces with expert staining that lasts through Muskoka winters.",
    icon: Fence,
    image: "/lovable-uploads/8ef8ff98-b72d-4bb2-981c-a2a94dae744a.png",
    slug: "deck-staining",
  },
  {
    id: 6,
    title: "Institutional Painting",
    description: "Specialized painting for schools, hospitals, and government buildings. All regulatory requirements met.",
    icon: School,
    image: "/lovable-uploads/d59b04c1-a87c-430a-a6a5-8c28a9fa05d7.png",
  },
  {
    id: 7,
    title: "Pre-Finishing",
    description: "Professional pre-finishing for new construction materials. Perfect appearance and enhanced durability from day one.",
    icon: Hammer,
    image: "/lovable-uploads/963fb41b-91e9-4c30-9898-38f5beeeb300.png",
  },
  {
    id: 8,
    title: "Wallpaper Installation",
    description: "Add character and style with professional wallpaper installation. Precision cuts and seamless patterns.",
    icon: Image,
    image: "/lovable-uploads/a71ffb89-e69e-48e3-bf5c-9632a6b728ae.png",
    slug: "wallpaper-installation",
  },
  {
    id: 9,
    title: "Epoxy Coatings",
    description: "Durable, attractive epoxy for garage floors, basements, and commercial spaces. Expert application for lasting results.",
    icon: Sparkles,
    image: "/lovable-uploads/7671fcb5-a810-4e9a-84fc-76713831e5ba.png",
    slug: "epoxy-coatings",
  },
  {
    id: 10,
    title: "Power & Soft Washing",
    description: "Remove dirt, grime, mold, and mildew from exterior surfaces. Your property looking brand new.",
    icon: Droplets,
    image: "/lovable-uploads/5d50956e-9da8-4286-b5e3-daa38c6413a5.png",
    slug: "power-washing",
  },
  {
    id: 11,
    title: "Stucco Removal",
    description: "Professional stucco and popcorn ceiling removal. Clean surfaces ready for a modern finish.",
    icon: Construction,
    image: "/lovable-uploads/stucco-popcorn-texture.png",
    slug: "stucco-removal",
  },
];
