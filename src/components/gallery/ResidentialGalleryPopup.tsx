import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { interiorImages } from './data/InteriorImages';
import { exteriorImages } from './data/ExteriorImages';
import { GalleryImage } from './types';

// Combine all residential images (interior + exterior residential)
const residentialImages: GalleryImage[] = [
  ...interiorImages,
  ...exteriorImages.filter(img => 
    img.title?.toLowerCase().includes('residential') || 
    img.title?.toLowerCase().includes('cottage') ||
    img.title?.toLowerCase().includes('home')
  )
];

const ResidentialGalleryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const [[x, direction], setX] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  const currentImage = residentialImages[currentIndex];

  const navigateImages = (dir: 'prev' | 'next') => {
    if (dir === 'prev') {
      setCurrentIndex(prev => prev === 0 ? residentialImages.length - 1 : prev - 1);
    } else {
      setCurrentIndex(prev => prev === residentialImages.length - 1 ? 0 : prev + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateImages('prev');
      else if (e.key === 'ArrowRight') navigateImages('next');
      else if (e.key === 'Escape') setIsOpen(false);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const dragElastic = isMobile ? 0.2 : 0.15;
  const swipeConfidenceThreshold = isMobile ? 5000 : 10000;
  
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const predictedPower = swipePower(info.offset.x, info.velocity.x);

    if (predictedPower > swipeConfidenceThreshold) {
      if (info.offset.x > 0) {
        navigateImages('prev');
      } else {
        navigateImages('next');
      }
    }
    setX([0, 0]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="atomic-button-secondary group border-2 border-atomic-turquoise text-center flex-1 text-sm sm:text-base py-3">
          <span className="relative z-10 flex items-center justify-center">
            <Images className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            View Gallery
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 bg-black border-none">
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-4 right-4 p-3 bg-gray-800/80 text-white rounded-full hover:bg-gray-700 transition-colors z-50"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Navigation Buttons */}
        <button 
          onClick={() => navigateImages('prev')} 
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 text-white rounded-full p-3 md:p-4 hover:bg-gray-700 transition-colors z-50"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={() => navigateImages('next')} 
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 text-white rounded-full p-3 md:p-4 hover:bg-gray-700 transition-colors z-50"
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Caption/Counter */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/70 py-3 px-4 z-50">
          <p className="font-medium text-base">{currentImage?.title || `Image ${currentIndex + 1}`}</p>
          <p className="text-sm text-gray-300 mt-1">{currentIndex + 1} / {residentialImages.length}</p>
        </div>

        {/* Image Display */}
        <div className="w-full h-full flex justify-center items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction < 0 ? 100 : -100 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragElastic={dragElastic}
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={() => setIsDragging(true)}
              onDrag={(_, info) => setX([info.offset.x, info.offset.x > 0 ? 1 : -1])}
              onDragEnd={handleDragEnd}
              className="w-full h-full flex justify-center items-center"
              style={{ touchAction: 'none' }}
            >
              <img
                src={currentImage?.src}
                alt={currentImage?.title || "Residential gallery image"}
                className="max-w-full max-h-[80vh] object-contain px-4"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-20 left-0 right-0 overflow-x-auto z-40">
          <div className="flex gap-2 justify-center px-4 py-2">
            {residentialImages.slice(Math.max(0, currentIndex - 3), Math.min(residentialImages.length, currentIndex + 4)).map((img, idx) => {
              const actualIdx = Math.max(0, currentIndex - 3) + idx;
              return (
                <button
                  key={img.id}
                  onClick={() => setCurrentIndex(actualIdx)}
                  className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                    actualIdx === currentIndex ? 'border-atomic-orange scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img.src} 
                    alt="" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResidentialGalleryPopup;
