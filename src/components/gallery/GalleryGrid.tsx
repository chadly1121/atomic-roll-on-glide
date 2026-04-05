
import React from 'react';
import { GalleryImage } from './types';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (src: string) => void;
  isImagesLoaded: boolean;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  images,
  onImageClick,
  isImagesLoaded
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  if (!isImagesLoaded) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-md bg-muted h-64 animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {images.map((image, index) => (
        <div
          key={image.src}
          className="rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group animate-fade-in"
          style={{ animationDelay: `${index * 0.05}s` }}
          onClick={() => onImageClick(image.src)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative h-64">
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              width="400"
              height="300"
              decoding="async"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 transition-opacity duration-300 ${
              hoveredIndex === index ? 'opacity-100' : 'opacity-0 sm:opacity-0'
            } max-sm:opacity-100`}>
              <div className="w-full">
                <span className="text-white font-medium block">{image.title}</span>
                <span className="text-gray-300 text-sm">{image.category.charAt(0).toUpperCase() + image.category.slice(1)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
