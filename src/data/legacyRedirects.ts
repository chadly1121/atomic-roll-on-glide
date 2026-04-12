/**
 * Maps old .html/.php URLs from the previous site to their new equivalents.
 * Used by LegacyRedirect component to preserve SEO equity.
 */
export const legacyRedirects: Record<string, string> = {
  // Location pages
  "/Bracebridge.html": "/painters-bracebridge",
  "/Huntsville.html": "/painters-huntsville",
  "/Port-Carling.html": "/painters-port-carling",
  "/Port Carling.html": "/painters-port-carling",
  "/Parry-Sound.html": "/painters-parry-sound",
  "/Parry Sound.html": "/painters-parry-sound",
  "/Muskoka.html": "/",
  "/Dwight.html": "/painters-dwight",
  "/Burks-Falls.html": "/painters-burks-falls",
  "/Burks Falls.html": "/painters-burks-falls",

  // Service pages
  "/Muskoka-interior-painting-services.html": "/interior-painting-muskoka",
  "/Muskoka-home-interior-painting.html": "/interior-painting-muskoka",
  "/Muskoka-exterior-painting-services.html": "/exterior-painting-muskoka",
  "/Muskoka-home-exterior-painting.html": "/exterior-painting-muskoka",
  "/Muskoka-interior-cabinet-painting.html": "/cabinet-painting-muskoka",
  "/Muskoka-epoxy-garage-floor-painting.html": "/epoxy-flooring-muskoka",
  "/Muskoka-wood-refinishing-services.html": "/staining-muskoka",
  "/Muskoka-commercial-deck-wood-refinishing.html": "/staining-muskoka",
  "/Muskoka-wallpaper-removal-services.html": "/wallpaper-services-muskoka",
  "/Muskoka-wallpaper-hanging-services.html": "/wallpaper-services-muskoka",
  "/Muskoka-power-washing-services.html": "/power-washing-muskoka",
  "/Muskoka-gutter-cleaning-services.html": "/",
  "/Muskoka-drywall-patch-repair.html": "/",
  "/Muskoka-textured-spraying.html": "/spray-painting-muskoka",
  "/Muskoka-popcorn-ceiling-removal-services.html": "/interior-painting-muskoka",
  "/Muskoka-stucco-painting.html": "/exterior-painting-muskoka",
  "/Muskoka-lead-paint-removal-services.html": "/exterior-painting-muskoka",

  // Commercial pages
  "/commercial-painters-Muskoka.html": "/",
  "/commercial-interior-services.html": "/",
  "/commercial-exterior-services.html": "/",
  "/commercial-painting-epoxy-floor-coating.html": "/epoxy-flooring-muskoka",
  "/commercial-eifs-synthetic-stucco-painting-repair.html": "/exterior-painting-muskoka",
  "/commercial-drywall-patching-painting.html": "/",
  "/commercial-concrete-staining.html": "/epoxy-flooring-muskoka",
  "/commercial-concrete-ceiling-painting-repair.html": "/",
  "/commercial-brick-waterproofing.html": "/exterior-painting-muskoka",

  // Other pages
  "/Muskoka-house-painters.html": "/",
  "/Roll-On-Painting-painters.html": "/",
  "/Roll On Painting-painters.html": "/",
  "/Muskoka-painting-experts.php": "/",
  "/Muskoka-request-quote.php": "/contact",
  "/review-our-service-contact.php": "/reviews",
  "/index.php": "/",
  "/painting-areas-served.html": "/service-areas",
  "/site-map.html": "/",
  "/Muskoka-painting-portfolio.html": "/portfolio",
  "/Muskoka-painting-exterior-portfolio.html": "/portfolio",
  "/Muskoka-testimonials.html": "/reviews",
  "/Muskoka-selecting-paints.html": "/blog",
  "/Muskoka-home-services.html": "/",
  "/Muskoka-home-door-painting.html": "/interior-painting-muskoka",
  "/Muskoka-house-molding-painters.html": "/interior-painting-muskoka",
  "/Muskoka-commercial-molding-painters.html": "/",
  "/Muskoka-faux-finishes.html": "/interior-painting-muskoka",
  "/Muskoka-awning-painting-repair.html": "/exterior-painting-muskoka",
  "/parking-lot-striping-Muskoka.html": "/epoxy-flooring-muskoka",
  "/roof-coating-painting-Muskoka.html": "/exterior-painting-muskoka",
  "/New-builds.html": "/",
  "/privacy-policy.html": "/",
};

/**
 * Looks up a legacy path and returns the new path, or null if no redirect exists.
 */
export const getLegacyRedirect = (path: string): string | null => {
  // Direct match
  if (legacyRedirects[path]) {
    return legacyRedirects[path];
  }

  // Try decoding (handles %20 spaces in URLs)
  const decoded = decodeURIComponent(path);
  if (legacyRedirects[decoded]) {
    return legacyRedirects[decoded];
  }

  // Strip index.php/tools/ prefix — these are crawler artifacts of the same pages
  const toolsPrefix = "/index.php/tools/";
  if (path.startsWith(toolsPrefix)) {
    const innerPath = "/" + path.slice(toolsPrefix.length);
    return getLegacyRedirect(innerPath);
  }

  return null;
};
