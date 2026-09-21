import type { BlogPostMeta } from './types';

/**
 * Blog metadata index (canonical list of every article).
 *
 * This file IS the blog CMS index. Article bodies live one-per-file in
 * ./posts/<slug>.ts and are loaded on demand — never import them here.
 *
 * To publish a new article by hand:
 *   1. Add an entry below (newest first is not required; sorting is by date).
 *   2. Create ./posts/<slug>.ts exporting the article HTML as the default.
 *   3. Add the same { slug, lastmod } to POSTS in
 *      supabase/functions/blog-sitemap/index.ts and a <url> to
 *      public/sitemap.xml (the SEO audit fails if either is missing).
 *
 * scripts/sync-soro.mjs performs steps 1-3 automatically for new Soro
 * articles and never overwrites an existing post file.
 */
export const blogPostsMeta: BlogPostMeta[] = [
  {
    id: 'local-best-interior-paint-colours-muskoka-cottage',
    slug: 'best-interior-paint-colours-muskoka-cottage',
    title: 'What Are the Best Interior Paint Colours for a Muskoka Cottage?',
    summary: 'What paint colours work best for a Muskoka cottage interior? From nature-inspired neutrals to moody darks and limewash finishes — a colour guide for Port Carling, Bala, Lake of Bays, and beyond.',
    image: '/lovable-uploads/interior-modern-cottage-living.webp',
    url: 'https://www.roll-onpainting.com/blog/best-interior-paint-colours-muskoka-cottage',
    tags: ['Interior Painting', 'Colour Selection', 'Muskoka', 'Cottage Interiors', 'Limewash', 'Wallpaper', 'Port Carling', 'Lake of Bays', 'Bala'],
    date_published: '2026-05-03T09:00:00-04:00',
    date_modified: '2026-05-03T09:00:00-04:00',
    authors: [{ name: 'Chad Gilchrist', url: 'https://www.roll-onpainting.com/about' }],
    language: 'en-CA',
    readingTime: 10,
    _seo: {
      meta_description: 'What paint colours work best for a Muskoka cottage interior? From nature-inspired neutrals to moody darks and limewash finishes — a colour guide for Port Carling, Bala, Lake of Bays, and beyond.',
      meta_keywords: [
      'Muskoka cottage paint colours',
      'best interior paint colours cottage',
      'Benjamin Moore cottage colours',
      'White Dove OC-17',
      'limewash Muskoka',
      'wallpaper Muskoka cottage',
      'Port Carling interior painter',
      'Lake of Bays cottage interior',
      'cottage colour consultation',
      ],
    },
  },
  {
    id: 'local-exterior-painting-muskoka-cottage-owners-guide',
    slug: 'exterior-painting-muskoka-cottage-owners-guide',
    title: 'Exterior Painting in Muskoka: What Cottage Owners Need to Know Before They Start',
    summary: 'Exterior painting in Muskoka requires more prep than most contractors admit. Here\'s what cottage owners in Huntsville, Bracebridge, Gravenhurst, and Port Carling need to know.',
    image: '/lovable-uploads/exterior-painting-crew-lakeside-cottage.webp',
    url: 'https://www.roll-onpainting.com/blog/exterior-painting-muskoka-cottage-owners-guide',
    tags: ['Exterior Painting', 'Muskoka', 'Cottage Maintenance', 'Huntsville', 'Bracebridge', 'Gravenhurst', 'Port Carling', 'Sansin'],
    date_published: '2026-05-03T09:00:00-04:00',
    date_modified: '2026-05-03T09:00:00-04:00',
    authors: [{ name: 'Chad Gilchrist', url: 'https://www.roll-onpainting.com/about' }],
    language: 'en-CA',
    readingTime: 9,
    _seo: {
      meta_description: 'Exterior painting in Muskoka requires more prep than most contractors admit. Here\'s what cottage owners in Huntsville, Bracebridge, Gravenhurst, and Port Carling need to know.',
      meta_keywords: [
      'exterior painting Muskoka',
      'Muskoka cottage painting',
      'Huntsville exterior painter',
      'Bracebridge cottage painting',
      'Gravenhurst exterior painting',
      'Port Carling painter',
      'cottage exterior prep',
      'Sansin stain Muskoka',
      'Benjamin Moore exterior',
      ],
    },
  },
  {
    id: 'local-flood-damaged-boathouses-docks-muskoka-2026',
    slug: 'flood-damaged-boathouses-docks-muskoka-2026',
    title: 'Flood-Damaged Boathouses & Docks in Muskoka: How to Protect Your Wood After the Water Recedes',
    summary: 'Muskoka\'s 2026 spring flooding has submerged docks and boathouses across Huntsville and Bracebridge. Here\'s how to assess, dry, prep, and protect your wood after floodwater recedes.',
    image: '/lovable-uploads/exterior-boathouse-dockside-painting.webp',
    url: 'https://www.roll-onpainting.com/blog/flood-damaged-boathouses-docks-muskoka-2026',
    tags: ['Flood Recovery', 'Boathouse', 'Dock Protection', 'Muskoka', 'Wood Care', 'Cottage Maintenance', 'Sansin', 'GoNano'],
    date_published: '2026-05-03T09:00:00-04:00',
    date_modified: '2026-05-03T09:00:00-04:00',
    authors: [{ name: 'Chad Gilchrist', url: 'https://www.roll-onpainting.com/about' }],
    language: 'en-CA',
    readingTime: 10,
    _seo: {
      meta_description: 'Muskoka\'s 2026 spring flooding has submerged docks and boathouses across Huntsville and Bracebridge. Here\'s how to assess, dry, prep, and protect your wood after floodwater recedes.',
      meta_keywords: [
      'Muskoka flood 2026',
      'flood damaged dock',
      'boathouse flood recovery',
      'Huntsville flood',
      'Bracebridge flood',
      'dock staining after flood',
      'wood drying flood damage',
      'GoNano Wood Saver',
      'Sansin Dec',
      ],
    },
  },
  {
    id: 'local-sansin-exterior-stains-decks-docks-muskoka',
    slug: 'sansin-exterior-stains-decks-docks-muskoka',
    title: 'Sansin Exterior Stains for Decks & Docks: The Right Way to Protect Wood in Muskoka',
    summary: 'Why Sansin penetrating stains outperform film-forming coatings on Muskoka decks and docks — plus the right prep, sanding, and product choice (Dec, SDF, WoodForce) for long-lasting results.',
    image: '/lovable-uploads/exterior-deck-staining-hardwood.webp',
    url: 'https://www.roll-onpainting.com/blog/sansin-exterior-stains-decks-docks-muskoka',
    tags: ['Sansin', 'Deck Staining', 'Dock Protection', 'Muskoka', 'Wood Care', 'Cottage Maintenance'],
    date_published: '2026-04-25T09:00:00-04:00',
    date_modified: '2026-04-25T09:00:00-04:00',
    authors: [{ name: 'Chad Gilchrist', url: 'https://www.roll-onpainting.com/about' }],
    language: 'en-CA',
    readingTime: 5,
    _seo: {
      meta_description: 'Sansin Dec, SDF & WoodForce protect Muskoka decks and docks with deep penetration — no peeling, no blistering. Expert prep & application guide from Roll On Painting.',
      meta_keywords: [
      'Sansin stain Muskoka',
      'Sansin Dec deck stain',
      'Sansin SDF',
      'Sansin WoodForce',
      'dock staining Muskoka',
      'deck stain Huntsville',
      'penetrating wood stain Bracebridge',
      ],
    },
  },
  {
    id: 'local-gonano-nuroof-revive-muskoka',
    slug: 'gonano-nuroof-revive-extend-roof-life-muskoka',
    title: 'GoNano NuRoof Revive: Extend the Life of Your Roof in Muskoka (Without Replacing It)',
    summary: 'How GoNano NuRoof Revive rejuvenates aging asphalt shingles in Muskoka — restoring flexibility, repelling water, and delaying full roof replacement while keeping shingles out of the landfill.',
    image: '/lovable-uploads/exterior-cedar-roof-soft-wash-muskoka.webp',
    url: 'https://www.roll-onpainting.com/blog/gonano-nuroof-revive-extend-roof-life-muskoka',
    tags: ['GoNano', 'NuRoof Revive', 'Roof Rejuvenation', 'Muskoka', 'Asphalt Shingles', 'Sustainability'],
    date_published: '2026-04-24T09:00:00-04:00',
    date_modified: '2026-04-24T09:00:00-04:00',
    authors: [{ name: 'Chad Gilchrist', url: 'https://www.roll-onpainting.com/about' }],
    language: 'en-CA',
    readingTime: 4,
    _seo: {
      meta_description: 'GoNano NuRoof Revive rejuvenates aging asphalt shingles in Muskoka — extend roof life 5–15 years, repel water, and avoid early replacement. Expert guide from Roll On Painting.',
      meta_keywords: [
      'GoNano NuRoof Revive',
      'roof rejuvenation Muskoka',
      'asphalt shingle treatment',
      'extend roof life Huntsville',
      'roof restoration Bracebridge',
      'nano roof coating',
      'sustainable roof care',
      ],
    },
  },
  {
    id: 'local-gonano-wood-saver-decks-docks-muskoka',
    slug: 'gonano-wood-saver-decks-docks-muskoka',
    title: 'GoNano Wood Saver: The Smart Way to Protect Your Decks & Docks in Muskoka',
    summary: 'How GoNano Wood Saver penetrates wood fibres to stop rot, freeze-thaw damage, and slippery moss buildup on Muskoka decks and docks — without changing the natural wood look.',
    image: '/lovable-uploads/exterior-deck-underside-staining.webp',
    url: 'https://www.roll-onpainting.com/blog/gonano-wood-saver-decks-docks-muskoka',
    tags: ['GoNano', 'Deck Staining', 'Dock Protection', 'Muskoka', 'Wood Care', 'Cottage Maintenance'],
    date_published: '2026-04-23T09:00:00-04:00',
    date_modified: '2026-04-23T09:00:00-04:00',
    authors: [{ name: 'Chad Gilchrist', url: 'https://www.roll-onpainting.com/about' }],
    language: 'en-CA',
    readingTime: 4,
    _seo: {
      meta_description: 'GoNano Wood Saver protects Muskoka decks & docks at the wood-fibre level — stops rot, slippery moss, and freeze-thaw damage. Expert guide from Roll On Painting.',
      meta_keywords: [
      'GoNano Wood Saver',
      'deck protection Muskoka',
      'dock sealer Muskoka',
      'wood deck stain Huntsville',
      'cottage deck care Bracebridge',
      'nano wood treatment',
      'hydrophobic wood sealer',
      ],
    },
  },
  // <<< sync-soro inserts new entries above this line
];
