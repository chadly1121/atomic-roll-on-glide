
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
  const [error, setError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Generate optimized image URL
  const optimizedSrc = src.includes("cloudinary.com") 
    ? optimizeCloudinaryUrl(src, { quality: optimizeQuality, format: 'auto' })
    : src;
  
  // Generate srcset for responsive images
  const srcSet = src.includes("cloudinary.com") 
    ? generateSrcSet(src)
    : undefined;

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setError(false);
    
    // Check if we should use IntersectionObserver or load immediately
    if (priority) {
      setIsLoaded(true);
      return;
    }
    
    // Use Intersection Observer for lazy loading
    if (imageRef.current && !isLoaded && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsLoaded(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "200px 0px" } // Start loading when within 200px of viewport
      );
      
      observer.observe(imageRef.current);
      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
    }
    
    // Fallback if no IntersectionObserver or priority is true
    setIsLoaded(true);
  }, [src, priority]);

  // Handle image load error
  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
  };

  return (
    <div 
      ref={imageRef}
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
      {(!isLoaded || error) && (
        <div 
          className={cn(
            "absolute inset-0", 
            placeholderColor,
            error ? "animate-pulse" : "",
            loadingClassName
          )} 
        />
      )}
      
      {/* Actual image */}
      {isLoaded && !error && (
        <img
          src={optimizedSrc}
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          width={width}
          height={height}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchpriority={priority ? "high" : "auto"}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            !isLoaded || error ? "opacity-0" : "opacity-100",
            className
          )}
          {...props}
        />
      )}
      
      {/* Fallback for error */}
      {error && (
        <img
          src={fallback}
          alt={`Fallback for ${alt}`}
          width={width}
          height={height}
          className={cn("w-full h-full object-cover", className)}
        />
      )}
    </div>
  );
};

export { LazyImage };
