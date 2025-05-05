
import { useState, useEffect } from 'react';
import { GalleryImage } from './types';

export const useImagePreloader = (images: GalleryImage[]) => {
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload images
    const preloadImages = async () => {
      try {
        const imagePromises = images.map((image) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.src;
            img.onload = resolve;
            img.onerror = (err) => {
              console.error(`Failed to load image: ${image.src}`, err);
              reject(err);
            };
          });
        });
        
        await Promise.all(imagePromises);
        setIsImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        // Set as loaded anyway to show what we can
        setIsImagesLoaded(true);
      }
    };
    
    preloadImages();
  }, [images]);

  return { isImagesLoaded };
};
