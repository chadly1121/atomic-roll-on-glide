
import React from 'react';
import { motion } from "framer-motion";
import { GalleryImage } from './types';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (id: number) => void;
  isImagesLoaded: boolean;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ 
  images, 
  onImageClick,
  isImagesLoaded
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  // Loading placeholder
  if (!isImagesLoaded) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-md bg-gray-200 h-64 animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <motion.div 
          key={image.id} 
          className="rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group"
          onClick={() => onImageClick(image.id)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -8 }}
        >
          <div className="relative h-64">
            <img 
              src={image.src} 
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 transition-opacity duration-300 ${
              hoveredIndex === index ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="w-full">
                <span className="text-white font-medium block">{image.title}</span>
                <span className="text-gray-300 text-sm">{image.category.charAt(0).toUpperCase() + image.category.slice(1)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GalleryGrid;
