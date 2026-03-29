import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { HgtvAppearance } from '@/data/hgtvData';

interface HgtvEpisodePopupProps {
  appearance: HgtvAppearance | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HgtvEpisodePopup: React.FC<HgtvEpisodePopupProps> = ({ appearance, open, onOpenChange }) => {
  const [currentImage, setCurrentImage] = useState(0);

  if (!appearance) return null;

  const images = appearance.images;
  const hasImages = images.length > 0;

  const prev = () => setCurrentImage((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrentImage((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); setCurrentImage(0); }}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Image Carousel */}
        {hasImages && (
          <div className="relative w-full aspect-[3/2] bg-black overflow-hidden rounded-t-lg">
            <img
              src={images[currentImage].src}
              alt={images[currentImage].label}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            {/* Caption + counter */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
              <div className="flex items-center justify-between text-white text-sm">
                <span className="font-medium">{images[currentImage].label}</span>
                <span className="text-white/70">{currentImage + 1} / {images.length}</span>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <DialogHeader className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                {appearance.season}
              </span>
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {appearance.episode}
            </DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground mb-4 leading-relaxed">{appearance.description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {appearance.services.map((service) => (
              <span
                key={service}
                className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-md"
              >
                {service}
              </span>
            ))}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImage ? 'border-primary ring-1 ring-primary' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}

          {appearance.articleUrl && (
            <a
              href={appearance.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
            >
              View full project details
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HgtvEpisodePopup;
