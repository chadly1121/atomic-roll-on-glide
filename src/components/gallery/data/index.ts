
import { GalleryImage } from '../types';
import { interiorImages } from './InteriorImages';
import { exteriorImages } from './ExteriorImages';
import { commercialImages } from './CommercialImages';
import { institutionalImages } from './InstitutionalImages';
import { epoxyImages } from './EpoxyImages';
import { prefinishingImages } from './PrefinishingImages';
import { cabinetPaintingImages } from './CabinetPaintingImages';

export const galleryImages: GalleryImage[] = [
  ...interiorImages,
  ...exteriorImages,
  ...commercialImages,
  ...institutionalImages,
  ...epoxyImages,
  ...prefinishingImages,
  ...cabinetPaintingImages
];

export * from './InteriorImages';
export * from './ExteriorImages';
export * from './CommercialImages';
export * from './InstitutionalImages';
export * from './EpoxyImages';
export * from './PrefinishingImages';
export * from './CabinetPaintingImages';
