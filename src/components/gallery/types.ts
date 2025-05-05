
// Gallery component type definitions
export interface GalleryImage {
  id: number;
  src: string;
  category: string;
  title: string;
}

export type GalleryCategory = {
  id: string;
  name: string;
};
