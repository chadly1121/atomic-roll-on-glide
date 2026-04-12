/**
 * Geo coordinates for all location pages
 * Used for SEO meta tags and schema markup
 */

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

const coords: Record<string, GeoCoordinates> = {
  // MUSKOKA CORE
  "painters-bracebridge":     { latitude: 44.8340, longitude: -79.3077 },
  "painters-huntsville":      { latitude: 45.3270, longitude: -79.2169 },
  "painters-gravenhurst":     { latitude: 44.9188, longitude: -79.3723 },
  "painters-port-carling":    { latitude: 45.1131, longitude: -79.5861 },
  "painters-baysville":       { latitude: 45.1333, longitude: -79.1167 },
  "painters-milford-bay":     { latitude: 45.0500, longitude: -79.5333 },
  "painters-minett":          { latitude: 45.0667, longitude: -79.5333 },
  "painters-port-sandfield":  { latitude: 45.0833, longitude: -79.5500 },
  "painters-utterson":        { latitude: 45.1833, longitude: -79.1833 },
  "painters-windermere":      { latitude: 45.0500, longitude: -79.5000 },
  "painters-port-sydney":     { latitude: 45.2167, longitude: -79.2500 },

  // MUSKOKA LAKES & GEORGIAN BAY
  "painters-bala":            { latitude: 44.9967, longitude: -79.6178 },
  "painters-mactier":         { latitude: 45.0500, longitude: -79.7000 },
  "painters-rosseau":         { latitude: 45.1667, longitude: -79.6333 },
  "painters-torrance":        { latitude: 44.9500, longitude: -79.5167 },
  "painters-lake-rosseau":    { latitude: 45.1500, longitude: -79.6000 },
  "painters-lake-joseph":     { latitude: 45.1000, longitude: -79.6500 },
  "painters-lake-muskoka":    { latitude: 45.0000, longitude: -79.4500 },
  "painters-georgian-bay":    { latitude: 44.9000, longitude: -79.8500 },

  // ALGONQUIN & NORTH MUSKOKA
  "painters-lake-of-bays":    { latitude: 45.2500, longitude: -79.0500 },
  "painters-ahmic-harbour":   { latitude: 45.6167, longitude: -79.7167 },
  "painters-algonquin-park":  { latitude: 45.5500, longitude: -78.5000 },
  "painters-burks-falls":     { latitude: 45.6167, longitude: -79.4167 },
  "painters-dorset":          { latitude: 45.2333, longitude: -78.9333 },
  "painters-dunchurch":       { latitude: 45.5833, longitude: -79.8833 },
  "painters-dwight":          { latitude: 45.3167, longitude: -78.9833 },
  "painters-emsdale":         { latitude: 45.4667, longitude: -79.3000 },
  "painters-katrine":         { latitude: 45.4333, longitude: -79.3167 },
  "painters-kearney":         { latitude: 45.5667, longitude: -79.2167 },
  "painters-magnetawan":      { latitude: 45.6667, longitude: -79.6500 },
  "painters-novar":           { latitude: 45.3500, longitude: -79.2500 },
  "painters-south-river":     { latitude: 45.8333, longitude: -79.3833 },
  "painters-sprucedale":      { latitude: 45.4167, longitude: -79.4500 },
  "painters-sundridge":       { latitude: 45.7667, longitude: -79.3667 },

  // PARRY SOUND & GEORGIAN BAY ISLANDS
  "painters-parry-sound":     { latitude: 45.3432, longitude: -80.1892 },
  "painters-seguin":          { latitude: 45.2500, longitude: -79.8500 },
  "painters-mckellar":        { latitude: 45.4333, longitude: -79.8000 },
  "painters-the-archipelago": { latitude: 45.1667, longitude: -80.0500 },
  "painters-britt":           { latitude: 45.7667, longitude: -80.5167 },
  "painters-byng-inlet":      { latitude: 45.7833, longitude: -80.5667 },
  "painters-nobel":           { latitude: 45.3833, longitude: -80.1000 },
  "painters-pickerel":        { latitude: 45.6500, longitude: -80.3500 },
  "painters-pointe-au-baril": { latitude: 45.5500, longitude: -80.3667 },

  // SIMCOE COUNTY & BARRIE
  "painters-orillia":         { latitude: 44.6083, longitude: -79.4200 },
  "painters-oro-medonte":     { latitude: 44.5333, longitude: -79.5833 },
  "painters-ramara":          { latitude: 44.6333, longitude: -79.2167 },
  "painters-severn":          { latitude: 44.7500, longitude: -79.5167 },
  "painters-warminster":      { latitude: 44.7000, longitude: -79.2500 },
  "painters-barrie":          { latitude: 44.3894, longitude: -79.6903 },
  "painters-midland":         { latitude: 44.7494, longitude: -79.8875 },
  "painters-penetanguishene": { latitude: 44.7689, longitude: -79.9356 },
  "painters-port-severn":     { latitude: 44.8000, longitude: -79.7167 },
  "painters-six-mile-lake":   { latitude: 44.8167, longitude: -79.6333 },
  "painters-coldwater":       { latitude: 44.6833, longitude: -79.6667 },
  "painters-honey-harbour":   { latitude: 44.8667, longitude: -79.8167 },
  "painters-waubaushene":     { latitude: 44.7500, longitude: -79.7167 },
  "painters-victoria-harbour":{ latitude: 44.7500, longitude: -79.7833 },
  "painters-severn-bridge":   { latitude: 44.8167, longitude: -79.4833 },
};

const defaultCoords: GeoCoordinates = { latitude: 44.8340, longitude: -79.3077 }; // Bracebridge fallback

export const getLocationCoordinates = (slug: string): GeoCoordinates => {
  return coords[slug] || defaultCoords;
};
