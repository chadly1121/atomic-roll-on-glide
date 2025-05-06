
import { useState, useEffect } from 'react';
import { GalleryImage } from './types';

export const useImagePreloader = (images: GalleryImage[]) => {
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<number>(0);

  useEffect(() => {
    // Don't attempt to preload if we have no images
    if (images.length === 0) {
      setIsImagesLoaded(true);
      return;
    }
    
    // Set a timeout to mark images as loaded even if not all load
    // This ensures the page won't be blocked indefinitely
    const timeoutId = setTimeout(() => {
      if (!isImagesLoaded) {
        console.log('Image preloading timed out, showing available images');
        setIsImagesLoaded(true);
      }
    }, 5000);
    
    // Track loaded images count
    let loadedCount = 0;
    
    // Preload images with priority
    const preloadImages = async () => {
      try {
        // Create a limited batch size to avoid too many concurrent requests
        const batchSize = 3;
        const batches = Math.ceil(images.length / batchSize);
        
        for (let i = 0; i < batches; i++) {
          const startIdx = i * batchSize;
          const endIdx = Math.min(startIdx + batchSize, images.length);
          const currentBatch = images.slice(startIdx, endIdx);
          
          // Process each batch concurrently
          await Promise.all(
            currentBatch.map((image) => {
              return new Promise((resolve, reject) => {
                const img = new Image();
                
                // Add loading priority
                if (i === 0) {
                  img.fetchPriority = 'high';
                } else {
                  img.fetchPriority = 'low';
                }
                
                img.src = image.src;
                img.onload = () => {
                  loadedCount++;
                  setLoadedImages(loadedCount);
                  resolve(undefined);
                };
                img.onerror = (err) => {
                  console.error(`Failed to load image: ${image.src}`, err);
                  loadedCount++;
                  setLoadedImages(loadedCount);
                  resolve(undefined); // Resolve anyway to continue loading other images
                };
              });
            })
          );
          
          // If all images are loaded, no need to continue with timeouts
          if (loadedCount === images.length) {
            setIsImagesLoaded(true);
            clearTimeout(timeoutId);
            break;
          }
        }
        
        setIsImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        // Set as loaded anyway to show what we can
        setIsImagesLoaded(true);
      }
    };
    
    preloadImages();
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [images]);

  return { isImagesLoaded, loadProgress: images.length > 0 ? (loadedImages / images.length) * 100 : 100 };
};
