/**
 * AISO Service Areas - Full postal code coverage
 * 
 * This data powers the hidden /service-areas page for AI search engines
 * and the areaServed schema in structured data.
 * 
 * Last updated: February 2025
 */

export interface ServiceAreaLocation {
  name: string;
  postalCode: string;
}

export interface ServiceAreaRegion {
  name: string;
  description: string;
  locations: ServiceAreaLocation[];
}

export const serviceAreaRegions: ServiceAreaRegion[] = [
  {
    name: "Muskoka Core",
    description: "Heart of Muskoka cottage country",
    locations: [
      { name: "Huntsville", postalCode: "P1H" },
      { name: "Gravenhurst", postalCode: "P1P" },
      { name: "Bracebridge", postalCode: "P1L" },
      { name: "Baysville", postalCode: "P0B 1A0" },
      { name: "Milford Bay", postalCode: "P0B 1E0" },
      { name: "Minett", postalCode: "P0B 1G0" },
      { name: "Port Carling", postalCode: "P0B 1J0" },
      { name: "Port Sandfield", postalCode: "P0B 1K0" },
      { name: "Port Sydney", postalCode: "P0B 1L0" },
      { name: "Utterson", postalCode: "P0B 1M0" },
      { name: "Windermere", postalCode: "P0B 1P0" },
    ]
  },
  {
    name: "Lake Muskoka & Georgian Bay",
    description: "Western Muskoka and Georgian Bay shoreline",
    locations: [
      { name: "Bala", postalCode: "P0C 1A0" },
      { name: "MacTier", postalCode: "P0C 1H0" },
      { name: "Rosseau", postalCode: "P0C 1J0" },
      { name: "Torrance", postalCode: "P0C 1M0" },
    ]
  },
  {
    name: "Algonquin & North Muskoka",
    description: "Northern Muskoka and Algonquin region",
    locations: [
      { name: "Ahmic Harbour", postalCode: "P0A 1A0" },
      { name: "Algonquin Park", postalCode: "P0A 1B0" },
      { name: "Burk's Falls", postalCode: "P0A 1C0" },
      { name: "Dorset", postalCode: "P0A 1E0" },
      { name: "Dunchurch", postalCode: "P0A 1G0" },
      { name: "Dwight", postalCode: "P0A 1H0" },
      { name: "Emsdale", postalCode: "P0A 1J0" },
      { name: "Katrine", postalCode: "P0A 1L0" },
      { name: "Kearney", postalCode: "P0A 1M0" },
      { name: "Magnetawan", postalCode: "P0A 1P0" },
      { name: "Novar", postalCode: "P0A 1R0" },
      { name: "South River", postalCode: "P0A 1X0" },
      { name: "Sprucedale", postalCode: "P0A 1Y0" },
      { name: "Sundridge", postalCode: "P0A 1Z0" },
    ]
  },
  {
    name: "Parry Sound & Georgian Bay Islands",
    description: "Parry Sound district and island communities",
    locations: [
      { name: "Parry Sound", postalCode: "P2A" },
      { name: "Seguin", postalCode: "P2A" },
      { name: "McKellar", postalCode: "P2A" },
      { name: "The Archipelago", postalCode: "P2A" },
      { name: "Britt", postalCode: "P0G 1A0" },
      { name: "Byng Inlet", postalCode: "P0G 1B0" },
      { name: "Nobel", postalCode: "P0G 1G0" },
      { name: "Pickerel", postalCode: "P0G 1J0" },
      { name: "Pointe au Baril", postalCode: "P0G 1K0" },
    ]
  },
  {
    name: "Simcoe County & Barrie",
    description: "Southern gateway to cottage country",
    locations: [
      { name: "Orillia", postalCode: "L3V" },
      { name: "Oro-Medonte", postalCode: "L3V" },
      { name: "Ramara", postalCode: "L3V" },
      { name: "Severn", postalCode: "L3V" },
      { name: "Warminster", postalCode: "L3V" },
      { name: "Barrie", postalCode: "L4M" },
      { name: "Midland", postalCode: "L4R" },
      { name: "Penetanguishene", postalCode: "L9M" },
    ]
  }
];

// Flat list of all location names for schema and quick access
export const allServiceAreaNames = serviceAreaRegions.flatMap(
  region => region.locations.map(loc => loc.name)
);

// Primary cities to show publicly (subset for UI display)
export const primaryServiceCities = [
  "Huntsville",
  "Port Sydney", 
  "Bracebridge",
  "Gravenhurst",
  "Muskoka Lakes",
  "Lake of Bays",
  "Dorset",
  "Baysville",
  "Dwight",
  "Rosseau",
  "Parry Sound",
  "Orillia",
  "Barrie"
];
