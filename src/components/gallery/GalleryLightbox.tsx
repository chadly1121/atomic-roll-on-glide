
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from './types';
import { useIsMobile } from "@/hooks/use-mobile";

interface GalleryLightboxProps {
  selectedImage: string | null;
  images: GalleryImage[];
  closeModal: () => void;
  navigateImages: (direction: 'prev' | 'next') => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ selectedImage, images, closeModal, navigateImages }) => {
  const isMobile = useIsMobile();

  // All hooks must be called before any early returns
  const [[x, direction], setX] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  // Add body scroll lock when lightbox is open
  useEffect(() => {
    if (selectedImage === null) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  // Early returns AFTER all hooks
  if (selectedImage === null) return null;

  const currentImage = images.find(img => img.src === selectedImage);
  if (!currentImage) return null;

  const currentIndex = images.findIndex(img => img.src === selectedImage);

  const dragElastic = isMobile ? 0.2 : 0.15;
  const swipeConfidenceThreshold = isMobile ? 5000 : 10000;

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const predictedPower = swipePower(info.offset.x, info.velocity.x);

    if (predictedPower > swipeConfidenceThreshold) {
      const dir = info.offset.x > 0 ? 1 : -1;
      if (dir > 0) {
        navigateImages('prev');
      } else {
        navigateImages('next');
      }
    } else {
      setX([0, 0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex justify-center items-center">
      <button
        onClick={closeModal}
        className={`absolute ${isMobile ? 'top-4 right-4 p-4' : 'top-4 right-4 p-2'} bg-gray-800 bg-opacity-80 text-white rounded-full hover:bg-opacity-100 transition-colors z-50`}
        aria-label="Close"
        style={{ touchAction: 'manipulation' }}
      >
        <X className="h-6 w-6" />
      </button>

      <button
        onClick={() => navigateImages('prev')}
        className={`absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-80 text-white rounded-full ${isMobile ? 'p-4' : 'p-2'} hover:bg-opacity-100 transition-colors z-50`}
        aria-label="Previous"
        style={{ touchAction: 'manipulation' }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => navigateImages('next')}
        className={`absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-80 text-white rounded-full ${isMobile ? 'p-4' : 'p-2'} hover:bg-opacity-100 transition-colors z-50`}
        aria-label="Next"
        style={{ touchAction: 'manipulation' }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className={`absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-70 py-3 px-4 ${isMobile ? 'text-base' : 'text-sm'}`}>
        <p className={`font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>{currentImage.title || `Image ${currentIndex + 1}`}</p>
        <p className={`${isMobile ? 'text-sm' : 'text-xs'} text-gray-300 mt-1`}>{currentIndex + 1} / {images.length}</p>
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={{
            enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
            center: { zIndex: 1, x: 0, opacity: 1 },
            exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 }),
          }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: isMobile ? 30 : 20 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragElastic={dragElastic}
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDrag={(_, info) => setX([info.offset.x, info.offset.x > 0 ? 1 : -1])}
          onDragEnd={handleDragEnd}
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
          style={{ touchAction: 'none' }}
        >
          <img
            src={currentImage.src}
            alt={currentImage.title || "Gallery image"}
            className={`max-w-full max-h-[80vh] md:max-h-[85vh] object-contain px-4 ${isDragging ? 'pointer-events-none' : ''}`}
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </AnimatePresence>

      {isMobile && (
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 opacity-40 pointer-events-none">
          <div className="flex justify-between px-8">
            <div className="bg-white/20 rounded-full p-2">
              <ChevronLeft className="h-8 w-8 text-white" />
            </div>
            <div className="bg-white/20 rounded-full p-2">
              <ChevronRight className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryLightbox;
