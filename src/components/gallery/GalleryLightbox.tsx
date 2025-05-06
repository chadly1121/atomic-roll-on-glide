
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { GalleryImage } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryLightboxProps {
  selectedImage: number | null;
  images: GalleryImage[];
  closeModal: () => void;
  navigateImages: (direction: 'prev' | 'next') => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  selectedImage,
  images,
  closeModal,
  navigateImages
}) => {
  // If no image is selected, don't render anything
  if (selectedImage === null) return null;

  const currentImage = images.find(img => img.id === selectedImage);
  if (!currentImage) return null;
  
  // Find current image index
  const currentIndex = images.findIndex(img => img.id === selectedImage);
  
  // Preload adjacent images for smoother navigation
  useEffect(() => {
    if (currentIndex !== -1) {
      // Determine previous and next image indices
      const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      
      // Preload the previous and next images
      if (images[prevIndex]) {
        const prevImg = new Image();
        prevImg.src = images[prevIndex].src;
      }
      
      if (images[nextIndex]) {
        const nextImg = new Image();
        nextImg.src = images[nextIndex].src;
      }
    }
  }, [currentIndex, images]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        onClick={closeModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="relative max-w-5xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-10 bg-gradient-to-b from-black/70 to-transparent text-white">
            <h3 className="text-lg font-bold">
              {currentImage.title}
            </h3>
            <motion.button 
              onClick={closeModal}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-atomic-turquoise to-atomic-orange backdrop-blur-sm text-white hover:bg-white/50 transition-colors"
              aria-label="Close modal"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
          
          <img 
            src={currentImage.src} 
            alt={currentImage.title}
            className="w-full h-auto max-h-[90vh] object-contain"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          
          <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-4 bg-gradient-to-t from-black/70 to-transparent">
            <motion.button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImages('prev');
              }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-atomic-turquoise to-atomic-turquoise/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImages('next');
              }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-atomic-orange/20 to-atomic-orange backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryLightbox;
