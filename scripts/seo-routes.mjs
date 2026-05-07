/**
 * Single source of truth for routes that the SEO/redirect/prerender
 * pipeline considers "real" destinations. Anything outside this set is
 * rejected by the redirect generator (no dead ends) and skipped by the
 * priority-route SEO audit.
 *
 * Keep in sync with src/App.tsx routes + sitemap.xml.
 */

// Top-level / template pages — strict SEO audit applies to these.
export const PRIORITY_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/portfolio',
  '/reviews',
  '/faq',
  '/careers',
  '/blog',
  '/service-areas',
  '/media',
  '/free-touch-ups',
  '/gonano',
  // Service pages
  '/interior-painting',
  '/exterior-painting',
  '/cabinet-refinishing',
  '/commercial-painting',
  '/deck-staining',
  '/epoxy-coatings',
  '/power-washing',
  '/spray-finishing',
  '/wallpaper-installation',
  '/wallpaper-removal',
  '/stucco-removal',
  '/prefinishing',
  '/institutional-painting',
  // Muskoka regional service pages
  '/interior-painting-muskoka',
  '/exterior-painting-muskoka',
  '/cabinet-painting-muskoka',
  '/cottage-painting-muskoka',
  '/staining-muskoka',
  '/spray-painting-muskoka',
  '/power-washing-muskoka',
  '/epoxy-floors-muskoka',
  // Town painters pages (sample)
  '/painters-bracebridge',
  '/painters-huntsville',
  '/painters-gravenhurst',
  '/painters-port-carling',
  '/painters-parry-sound',
  // City-to-cottage pages
  '/forest-hill-muskoka-cottage-painting',
  '/lawrence-park-muskoka-cottage-painting',
  '/vaughan-muskoka-cottage-painting',
  // Private client
  '/private-client-muskoka-property-care',
  // Sample blog post
  '/blog/sansin-exterior-stains-decks-docks-muskoka',
];

/**
 * Full list of valid destinations the redirect generator may target.
 * Built from PRIORITY_ROUTES plus any other live route in the SPA.
 * If a destination is not here, generate-redirects will fail.
 */
export const VALID_DESTINATIONS = new Set([
  ...PRIORITY_ROUTES,
  // Additional live destinations not in the audit sample
  '/cabinet-painting-barrie',
  '/cabinet-painting-gravenhurst',
  '/cottage-painting-gravenhurst',
  '/cottage-painting-port-carling',
  '/deck-staining-barrie',
  '/deck-staining-gravenhurst',
  '/deck-staining-port-carling',
  '/exterior-painting-barrie',
  '/exterior-painting-gravenhurst',
  '/exterior-painting-port-carling',
  '/interior-painting-barrie',
  '/interior-painting-gravenhurst',
  '/interior-painting-port-carling',
  '/painters-ahmic-harbour',
  '/painters-algonquin-park',
  '/painters-bala',
  '/painters-barrie',
  '/painters-baysville',
  '/painters-britt',
  '/painters-burks-falls',
  '/painters-byng-inlet',
  '/painters-coldwater',
  '/painters-dorset',
  '/painters-dunchurch',
  '/painters-dwight',
  '/painters-emsdale',
  '/painters-georgian-bay',
  '/painters-honey-harbour',
  '/painters-katrine',
  '/painters-kearney',
  '/painters-lake-joseph',
  '/painters-lake-muskoka',
  '/painters-lake-of-bays',
  '/painters-lake-rosseau',
  '/painters-mactier',
  '/painters-magnetawan',
  '/painters-mckellar',
  '/painters-midland',
  '/painters-milford-bay',
  '/painters-minett',
  '/painters-nobel',
  '/painters-novar',
  '/painters-orillia',
  '/painters-oro-medonte',
  '/painters-penetanguishene',
  '/painters-pickerel',
  '/painters-pointe-au-baril',
  '/painters-port-sandfield',
  '/painters-port-severn',
  '/painters-port-sydney',
  '/painters-ramara',
  '/painters-rosseau',
  '/painters-seguin',
  '/painters-severn',
  '/painters-severn-bridge',
  '/painters-six-mile-lake',
  '/painters-south-river',
  '/painters-sprucedale',
  '/painters-sundridge',
  '/painters-the-archipelago',
  '/painters-torrance',
  '/painters-utterson',
  '/painters-victoria-harbour',
  '/painters-warminster',
  '/painters-waubaushene',
  '/painters-windermere',
  '/rosedale-muskoka-cottage-painting',
  '/oakville-muskoka-cottage-painting',
  '/post-road-muskoka-cottage-painting',
  '/blog/gonano-nuroof-revive-extend-roof-life-muskoka',
  '/blog/gonano-wood-saver-decks-docks-muskoka',
]);

export const CANONICAL_ORIGIN = 'https://www.roll-onpainting.com';