
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
  }
];

export const galleryCategories = [
  { id: 'all', name: 'All Projects' },
  { id: 'interior', name: 'Interior' },
  { id: 'exterior', name: 'Exterior' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'epoxy', name: 'Epoxy Coatings' },
  { id: 'prefinishing', name: 'Pre-Finishing' }
];
