
import { GalleryImage } from '../types';
import { interiorImages } from './InteriorImages';
import { commercialImages } from './CommercialImages';
import { exteriorImages } from './ExteriorImages';
import { institutionalImages } from './InstitutionalImages';
import { epoxyImages } from './EpoxyImages';
import { prefinishingImages } from './PrefinishingImages';

export const galleryImages: GalleryImage[] = [
  ...prefinishingImages,
  ...epoxyImages,
  ...interiorImages,
  ...commercialImages,
  ...exteriorImages,
  ...institutionalImages
];

export * from './InteriorImages';
export * from './CommercialImages';
export * from './ExteriorImages';
export * from './InstitutionalImages';
export * from './EpoxyImages';
export * from './PrefinishingImages';
