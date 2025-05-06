import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { GalleryImage } from './types';

interface GalleryLightboxProps {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ images, startIndex, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(startIndex);

  const nextImage = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextImage();
      } else if (event.key === 'ArrowLeft') {
        prevImage();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage, onClose]);

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
          onClick={onClose} 
          className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition-colors z-50"
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Image Navigation Buttons */}
        <button 
          onClick={prevImage} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition-colors z-50"
          aria-label="Previous"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button 
          onClick={nextImage} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition-colors z-50"
          aria-label="Next"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* Image Display */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
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
            onDrag={(_event, { deltaX }) => {
              setX([deltaX, deltaX > 0 ? 1 : -1]);
            }}
            onDragEnd={(event, { offset, velocity }) => {
              setIsDragging(false);
              const predictedPower = swipePower(offset.x, velocity.x);

              if (predictedPower > swipeConfidenceThreshold) {
                const direction = offset.x > 0 ? 1 : -1;
                if (direction > 0) {
                  prevImage();
                } else {
                  nextImage();
                }
              } else {
                // Settle back to center
                setX([0, 0]);
              }
            }}
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
          >
            <img
              src={images[activeIndex].large}
              alt={images[activeIndex].alt || "Gallery image"}
              className="max-w-full max-h-[85vh] object-contain"
              loading="eager"
              decoding="async"
			  fetchPriority="high"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryLightbox;
