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
  '/services',
  '/how-we-quote',
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
  '/cabinet-painting-gravenhurst',
  '/cottage-painting-gravenhurst',
  '/cottage-painting-port-carling',
  '/deck-staining-gravenhurst',
  '/deck-staining-port-carling',
  '/exterior-painting-gravenhurst',
  '/exterior-painting-port-carling',
  '/interior-painting-gravenhurst',
  '/interior-painting-port-carling',
  '/painters-algonquin-park',
  '/painters-bala',
  '/painters-baysville',
  '/painters-burks-falls',
  '/painters-dorset',
  '/painters-dwight',
  '/painters-emsdale',
  '/painters-katrine',
  '/painters-kearney',
  '/painters-lake-joseph',
  '/painters-lake-muskoka',
  '/painters-lake-of-bays',
  '/painters-lake-rosseau',
  '/painters-mactier',
  '/painters-magnetawan',
  '/painters-milford-bay',
  '/painters-minett',
  '/painters-novar',
  '/painters-orillia',
  '/painters-port-sandfield',
  '/painters-port-sydney',
  '/painters-rosseau',
  '/painters-seguin',
  '/painters-severn-bridge',
  '/painters-six-mile-lake',
  '/painters-south-river',
  '/painters-sprucedale',
  '/painters-sundridge',
  '/painters-the-archipelago',
  '/painters-torrance',
  '/painters-utterson',
  '/painters-windermere',
  '/rosedale-muskoka-cottage-painting',
  '/oakville-muskoka-cottage-painting',
  '/post-road-muskoka-cottage-painting',
  '/blog/gonano-nuroof-revive-extend-roof-life-muskoka',
  '/blog/gonano-wood-saver-decks-docks-muskoka',
  '/blog/best-interior-paint-colours-muskoka-cottage',
  '/blog/exterior-painting-muskoka-cottage-owners-guide',
  '/blog/flood-damaged-boathouses-docks-muskoka-2026',

]);

export const CANONICAL_ORIGIN = 'https://www.roll-onpainting.com';

/**
 * Routes registered in src/App.tsx that must NEVER appear in public/sitemap.xml.
 * Everything else in the router is required to be in the sitemap — see the
 * router/sitemap parity assertion in scripts/assert-seo.mjs.
 *
 * Adding a route here is a deliberate decision that the page should not be
 * crawled or prerendered. It is NOT a way to silence the assertion for a real
 * public page: an unlisted page is never prerendered, and public/404.html then
 * takes precedence over the SPA fallback on Cloudflare Pages, so it 404s in
 * production while working perfectly in dev.
 */
export const UNLISTED_ROUTES = new Set([
  // Transactional endpoint reached only after a Stripe checkout.
  // Public catalog return URL — nothing to do with the removed portal.
  '/payment-success',

  // Legacy alias: a real 301 to /portfolio lives in redirect-map.json, so the
  // router <Navigate> is only a fallback and the URL must not be advertised.
  '/catalog',

  // Dynamic patterns — their concrete URLs are listed in the sitemap individually.
  '/blog/:slug',
  '/:slug',
]);


/**
 * Unlisted routes a person can actually land on or refresh, which therefore
 * need a REAL FILE in the build output.
 *
 * WHY: on Cloudflare Pages a custom public/404.html takes precedence over the
 * SPA fallback for any path with no matching file. A path that has a file at
 * build time returns 200; a path that does not gets 404.html. Neither the
 * site-wide `/* /index.html 200` catch-all nor the forcing `200!` form beat
 * that — both were shipped and both still 404'd in production.
 *
 * So these routes get a plain SPA-shell file written by
 * scripts/write-spa-shells.mjs: the same index.html the app boots from, with
 * a noindex robots meta added. They are NOT prerendered (no Playwright, no
 * authenticated UI rendered) and must never enter the sitemap.
 *
 * The prefinishing portal (login, admin, client) was deleted; /payment-success
 * is the only landing route left that needs a shell.
 */
export const SHELL_ROUTES = [
  '/payment-success',
];
