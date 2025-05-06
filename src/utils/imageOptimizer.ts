
/**
 * Image optimizer utility for Cloudinary images
 * This utility helps create optimized image URLs for different scenarios
 */

interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'scale' | 'fit' | 'thumb';
  loading?: 'lazy' | 'eager';
  effect?: string;
}

/**
 * Generates an optimized Cloudinary URL with specified transformations
 */
export const optimizeCloudinaryUrl = (url: string, options: ImageTransformOptions = {}): string => {
  // If not a Cloudinary URL, return as is
  if (!url.includes('cloudinary.com')) {
    return url;
  }

  // Parse the original URL to extract relevant parts
  const [baseUrl, uploadPath] = url.split('/upload/');
  
  if (!baseUrl || !uploadPath) {
    return url; // Not a valid Cloudinary URL
  }
  
  // Build transformation string
  const transformations: string[] = [];
  
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.effect) transformations.push(`e_${options.effect}`);
  
  // Build the new URL
  const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : '';
  return `${baseUrl}/upload/${transformationString}${uploadPath}`;
};

/**
 * Get responsive image sources for different device sizes
 */
export const getResponsiveImageSources = (url: string, sizes = [480, 768, 1024, 1366, 1920]) => {
  return sizes.map(size => ({
    src: optimizeCloudinaryUrl(url, { width: size, format: 'auto', quality: 80 }),
    width: size
  }));
};

/**
 * Get optimized thumbnail version of an image
 */
export const getThumbnailUrl = (url: string, width = 300, height = 300) => {
  return optimizeCloudinaryUrl(url, {
    width,
    height,
    crop: 'thumb',
    quality: 70,
    format: 'auto'
  });
};

/**
 * Generate a responsive image srcset string for HTML img tags
 */
export const generateSrcSet = (url: string, widths = [320, 640, 768, 1024, 1280, 1920]) => {
  return widths
    .map(width => `${optimizeCloudinaryUrl(url, { width, format: 'auto' })} ${width}w`)
    .join(', ');
};

export default {
  optimizeCloudinaryUrl,
  getResponsiveImageSources,
  getThumbnailUrl,
  generateSrcSet
};
