
import { GalleryImage } from '../types';
import { interiorImages } from './InteriorImages';
import { exteriorImages } from './ExteriorImages';
import { commercialImages } from './CommercialImages';
import { institutionalImages } from './InstitutionalImages';
import { epoxyImages } from './EpoxyImages';
import { prefinishingImages } from './PrefinishingImages';
import { cabinetPaintingImages } from './CabinetPaintingImages';
import { wallpaperImages } from './WallpaperImages';

export const galleryImages: GalleryImage[] = [
  ...interiorImages,
  ...exteriorImages,
  ...commercialImages,
  ...institutionalImages,
  ...epoxyImages,
  ...prefinishingImages,
  ...cabinetPaintingImages,
  ...wallpaperImages
];

export * from './InteriorImages';
export * from './ExteriorImages';
export * from './CommercialImages';
export * from './InstitutionalImages';
export * from './EpoxyImages';
export * from './PrefinishingImages';
export * from './CabinetPaintingImages';
export * from './WallpaperImages';
