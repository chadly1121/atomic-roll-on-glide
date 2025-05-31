
import { GalleryImage } from './types';

// Using locally uploaded images for faster loading
export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/lovable-uploads/22085489-537d-44d5-b570-3dd99a63f2e3.png", 
    category: "prefinishing",
    title: "Marine Vessel Pre-Finishing"
  },
  {
    id: 2,
    src: "/lovable-uploads/323140ca-6825-4ad3-abcd-6dae649a4b02.png", 
    category: "prefinishing",
    title: "Professional Marine Coating"
  },
  {
    id: 3,
    src: "/lovable-uploads/28a50dd0-0c72-41ce-b0d4-1fb4c4b9a6cc.png", 
    category: "prefinishing",
    title: "Industrial Coating Application"
  },
  {
    id: 4,
    src: "/lovable-uploads/7671fcb5-a810-4e9a-84fc-76713831e5ba.png", 
    category: "epoxy",
    title: "Garage Floor Epoxy Coating"
  },
  {
    id: 5,
    src: "/lovable-uploads/41fed3c2-d734-4c98-aa94-862ae8f83f1b.png",
    category: "epoxy",
    title: "Professional Epoxy Flooring"
  },
  {
    id: 6,
    src: "/lovable-uploads/d92e575b-d7e8-477c-a4d6-d34674df328a.png",
    category: "epoxy",
    title: "Commercial Garage Flooring"
  },
  {
    id: 7,
    src: "/lovable-uploads/1855749d-b944-4711-a457-be80657744dc.png",
    category: "interior",
    title: "Luxury Interior Project"
  },
  {
    id: 8,
    src: "/lovable-uploads/8db1f419-2ee2-49da-b2cd-c17a8edafd7c.png",
    category: "commercial",
    title: "Large Scale Commercial Project"
  },
  {
    id: 9,
    src: "/lovable-uploads/5a06b919-e0cd-4254-928f-a8f7d589c4c8.png",
    category: "interior",
    title: "Master Bedroom Transformation"
  },
  {
    id: 10,
    src: "/lovable-uploads/1e023552-0b11-4ade-8457-f7740f0317ee.png",
    category: "commercial",
    title: "Commercial Ceiling Project"
  },
  {
    id: 11,
    src: "/lovable-uploads/f2f5fa2a-ca62-4c8c-9bc8-2b867c3894c3.png",
    category: "commercial",
    title: "Large Commercial Space - In Progress"
  },
  {
    id: 12,
    src: "/lovable-uploads/f73a02c1-39a6-483e-9f22-4d1984faa38c.png",
    category: "commercial",
    title: "Commercial Warehouse Painting"
  },
  {
    id: 13,
    src: "/lovable-uploads/87bdcfa0-2592-4703-8cd5-cc9c042006e7.png",
    category: "commercial",
    title: "Industrial Facility Interior"
  },
  {
    id: 14,
    src: "/lovable-uploads/ab647620-f91e-445a-b59d-7cd493143382.png",
    category: "commercial",
    title: "Large Scale Industrial Project"
  },
  {
    id: 15,
    src: "/lovable-uploads/d59b04c1-a87c-430a-a6a5-8c28a9fa05d7.png",
    category: "institutional",
    title: "School Hallway Renovation"
  },
  {
    id: 16,
    src: "/lovable-uploads/6ff94989-f399-4ad6-9f2e-1cee10aa41d2.png",
    category: "institutional",
    title: "School Gymnasium Painting"
  },
  {
    id: 17,
    src: "/lovable-uploads/025a31b7-5076-4ece-80fa-d0c7fc2c4915.png",
    category: "exterior",
    title: "Commercial Building Exterior"
  },
  {
    id: 18,
    src: "/lovable-uploads/c8560baa-059c-446e-aae0-6707f5dd45f6.png",
    category: "exterior",
    title: "Industrial Building Painting"
  },
  {
    id: 19,
    src: "/lovable-uploads/c3ff2882-fdbf-4fb8-8b69-ae377584ec4d.png",
    category: "exterior",
    title: "Commercial Building Project"
  },
  {
    id: 20,
    src: "/lovable-uploads/edc2e333-aeba-4888-8622-44f4bc074d81.png",
    category: "prefinishing",
    title: "Wood Staining Project"
  }
];

export const galleryCategories = [
  { id: 'all', name: 'All Projects' },
  { id: 'interior', name: 'Interior' },
  { id: 'exterior', name: 'Exterior' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'institutional', name: 'Institutional' },
  { id: 'epoxy', name: 'Epoxy Coatings' },
  { id: 'prefinishing', name: 'Pre-Finishing' }
];
