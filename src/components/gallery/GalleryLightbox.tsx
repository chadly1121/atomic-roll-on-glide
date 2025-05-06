
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from './types';

interface GalleryLightboxProps {
  selectedImage: number | null;
  images: GalleryImage[];
  closeModal: () => void;
  navigateImages: (direction: 'prev' | 'next') => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ selectedImage, images, closeModal, navigateImages }) => {
  // If no image is selected, don't render the lightbox
  if (selectedImage === null) return null;
  
  // Find the current image object
  const currentImage = images.find(img => img.id === selectedImage);
  if (!currentImage) return null;
  
  // Get current index for navigation
  const currentIndex = images.findIndex(img => img.id === selectedImage);
  
  // Gestures
  const [[x, direction], setX] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  const dragElastic = 0.15;

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center items-center p-4">
      <div className="relative max-w-5xl max-h-screen">
        {/* Close Button */}
        <button 
          onClick={closeModal} 
          className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition-colors z-50"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Image Navigation Buttons */}
        <button 
          onClick={() => navigateImages('prev')} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition-colors z-50"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={() => navigateImages('next')} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition-colors z-50"
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image Display */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: (direction: number) => {
                return { x: direction > 0 ? 1000 : -1000, opacity: 0 };
              },
              center: { zIndex: 1, x: 0, opacity: 1 },
              exit: (direction: number) => {
                return { zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 };
              },
            }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 20 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragElastic={dragElastic}
            onDragStart={() => setIsDragging(true)}
            onDrag={(event, info) => {
              setX([info.offset.x, info.offset.x > 0 ? 1 : -1]);
            }}
            onDragEnd={(event, info) => {
              setIsDragging(false);
              const predictedPower = swipePower(info.offset.x, info.velocity.x);

              if (predictedPower > swipeConfidenceThreshold) {
                const direction = info.offset.x > 0 ? 1 : -1;
                if (direction > 0) {
                  navigateImages('prev');
                } else {
                  navigateImages('next');
                }
              } else {
                // Settle back to center
                setX([0, 0]);
              }
            }}
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
          >
            <img
              src={currentImage.src}
              alt={currentImage.title || "Gallery image"}
              className="max-w-full max-h-[85vh] object-contain"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryLightbox;
