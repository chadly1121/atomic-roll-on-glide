
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

  try {
    // Parse the original URL to extract relevant parts
    const [baseUrl, uploadPath] = url.split('/upload/');
    
    if (!baseUrl || !uploadPath) {
      console.warn('Invalid Cloudinary URL format:', url);
      return url;
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
  } catch (error) {
    console.warn('Error optimizing Cloudinary URL:', error);
    return url;
  }
};

/**
 * Get responsive image sources for different device sizes
 */
export const getResponsiveImageSources = (url: string, sizes = [480, 768, 1024, 1366, 1920]) => {
  if (!url.includes('cloudinary.com')) {
    // For non-Cloudinary images, return the original URL for all sizes
    return sizes.map(size => ({
      src: url,
      width: size
    }));
  }

  return sizes.map(size => ({
    src: optimizeCloudinaryUrl(url, { width: size, format: 'auto', quality: 80 }),
    width: size
  }));
};

/**
 * Get optimized thumbnail version of an image
 */
export const getThumbnailUrl = (url: string, width = 300, height = 300) => {
  if (!url.includes('cloudinary.com')) {
    return url;
  }
  
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
  if (!url.includes('cloudinary.com')) {
    // For non-Cloudinary images, don't generate srcset
    return undefined;
  }

  return widths
    .map(width => `${optimizeCloudinaryUrl(url, { width, format: 'auto' })} ${width}w`)
    .join(', ');
};

/**
 * Check if an image URL is valid and accessible
 */
export const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

export default {
  optimizeCloudinaryUrl,
  getResponsiveImageSources,
  getThumbnailUrl,
  generateSrcSet,
  validateImageUrl
};
