
/**
 * Performance utilities to optimize rendering and animations
 */

// Debounce function to limit how often a function can be called
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function to limit the rate at which a function is executed
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      lastRan = Date.now();
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// Check if requestAnimationFrame is available and provide a fallback
export const requestAnimationFramePolyfill = 
  (typeof window !== 'undefined' && window.requestAnimationFrame) || 
  ((callback: FrameRequestCallback) => {
    return setTimeout(callback, 1000 / 60);
  });

// Request animation frame with cancellation capability
export const rafWithCleanup = (callback: FrameRequestCallback) => {
  const frame = requestAnimationFrame(callback);
  return () => cancelAnimationFrame(frame);
};

// Detect if device has reduced motion preference
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize animations based on device capability
export const getOptimizedAnimationSettings = () => {
  const reducedMotion = prefersReducedMotion();
  const isLowEndDevice = 
    typeof navigator !== 'undefined' && 
    'deviceMemory' in navigator && 
    (navigator as any).deviceMemory < 4;
  
  return {
    enableAnimations: !reducedMotion,
    reducedAnimations: isLowEndDevice,
    transitionDuration: reducedMotion ? 0 : isLowEndDevice ? 0.15 : 0.3,
    useSimpleAnimations: isLowEndDevice || reducedMotion
  };
};

// Detect if browser supports passive event listeners
export const supportsPassiveEvents = (): boolean => {
  let supportsPassive = false;
  try {
    // Test via a getter in the options object to see if the passive property is accessed
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
        return true;
      }
    });
    window.addEventListener('testPassive', null as any, opts);
    window.removeEventListener('testPassive', null as any, opts);
  } catch (e) {}
  
  return supportsPassive;
};

// Add passive event listener with feature detection
export const addPassiveEventListener = (
  element: HTMLElement | Window | Document,
  eventName: string,
  callback: EventListenerOrEventListenerObject,
  options: boolean | AddEventListenerOptions = false
): (() => void) => {
  const supportsPassive = supportsPassiveEvents();
  const optionsObj = supportsPassive 
    ? typeof options === 'object' 
      ? { ...options, passive: true } 
      : { passive: true }
    : options;
    
  element.addEventListener(eventName, callback, optionsObj);
  
  return () => {
    element.removeEventListener(eventName, callback, optionsObj);
  };
};

export default {
  debounce,
  throttle,
  rafWithCleanup,
  prefersReducedMotion,
  getOptimizedAnimationSettings,
  addPassiveEventListener
};
