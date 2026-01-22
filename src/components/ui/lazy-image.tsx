import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { optimizeCloudinaryUrl, generateSrcSet } from "@/utils/imageOptimizer";

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fallback?: string;
  className?: string;
  loadingClassName?: string;
  placeholderColor?: string;
  blur?: boolean;
  priority?: boolean;
  optimizeQuality?: number;
  sizes?: string;
}

const LazyImage = ({
  src,
  alt,
  width,
  height,
  fallback = "/placeholder.svg",
  className,
  loadingClassName,
  placeholderColor = "bg-gray-200",
  blur = true,
  priority = false,
  optimizeQuality = 80,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Only optimize Cloudinary URLs, keep local images as-is
  const optimizedSrc = src.includes("cloudinary.com") 
    ? optimizeCloudinaryUrl(src, { quality: optimizeQuality, format: 'auto' })
    : src;
  
  // Only generate srcset for Cloudinary images
  const srcSet = src.includes("cloudinary.com") 
    ? generateSrcSet(src)
    : undefined;

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setError(false);
    
    // If priority is true, load immediately
    if (priority) {
      setIsInView(true);
      return;
    }
    
    // Use Intersection Observer for lazy loading
    if (containerRef.current && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "100px 0px" }
      );
      
      observer.observe(containerRef.current);
      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    } else {
      // Fallback if no IntersectionObserver
      setIsInView(true);
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(false);
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{ 
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
    >
      {/* Loading placeholder */}
      {!isLoaded && !error && (
        <div 
          className={cn(
            "absolute inset-0 animate-pulse", 
            placeholderColor,
            loadingClassName
          )} 
        />
      )}
      
      {/* Actual image - only render when in view */}
      {isInView && (
        <img
          ref={imageRef}
          src={error ? fallback : optimizedSrc}
          alt={error ? `Fallback for ${alt}` : alt}
          srcSet={!error && srcSet ? srcSet : undefined}
          sizes={!error ? sizes : undefined}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          {...props}
        />
      )}
    </div>
  );
};

export { LazyImage };
