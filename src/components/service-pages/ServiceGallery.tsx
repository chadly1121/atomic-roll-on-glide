import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceGalleryProps {
  images: string[];
  videos?: string[];
  serviceName: string;
}

const ServiceGallery: React.FC<ServiceGalleryProps> = ({ images, videos = [], serviceName }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const allMedia = [...images, ...videos];
  if (allMedia.length === 0) return null;

  const isVideo = (src: string) => src.endsWith('.mp4');

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (dir: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    if (dir === 'prev') {
      setLightboxIndex(lightboxIndex === 0 ? allMedia.length - 1 : lightboxIndex - 1);
    } else {
      setLightboxIndex(lightboxIndex === allMedia.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="service-gallery-heading">
      <div className="container mx-auto px-4">
        <h2 id="service-gallery-heading" className="text-2xl font-bold text-atomic-navy text-center mb-8">
          Our {serviceName} Work
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {allMedia.map((src, idx) => (
            <button
              key={src}
              onClick={() => openLightbox(idx)}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-atomic-turquoise"
            >
              {isVideo(src) ? (
                <>
                  <video
                    src={src}
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <Play className="w-10 h-10 text-white drop-shadow-lg" fill="white" />
                  </div>
                </>
              ) : (
                <img
                  src={src}
                  alt={`${serviceName} project`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className={`absolute ${isMobile ? 'top-5 right-5 p-3' : 'top-4 right-4 p-2'} bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition-colors z-50`}
            aria-label="Close"
            style={{ touchAction: 'manipulation' }}
          >
            <X className={isMobile ? 'h-7 w-7' : 'h-6 w-6'} strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-80 text-white rounded-full ${isMobile ? 'p-4' : 'p-2'} hover:bg-opacity-100 transition-colors z-50`}
            aria-label="Previous"
            style={{ touchAction: 'manipulation' }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate('next'); }}
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-80 text-white rounded-full ${isMobile ? 'p-4' : 'p-2'} hover:bg-opacity-100 transition-colors z-50`}
            aria-label="Next"
            style={{ touchAction: 'manipulation' }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            {isVideo(allMedia[lightboxIndex]) ? (
              <video
                src={allMedia[lightboxIndex]}
                controls
                autoPlay
                className="w-full max-h-[85vh] object-contain rounded-lg"
              />
            ) : (
              <img
                src={allMedia[lightboxIndex]}
                alt={`${serviceName} project`}
                className="w-full max-h-[85vh] object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceGallery;
