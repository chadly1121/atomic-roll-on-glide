import "https://deno.land/std@0.168.0/dotenv/load.ts";

const SITE_URL = 'https://www.roll-onpainting.com';

/**
 * Locally-authored blog posts.
 * Mirrors src/data/localBlogPosts.ts — when you add a post there, add the
 * slug + lastmod date here too so the sitemap stays accurate.
 */
const POSTS: Array<{ slug: string; lastmod: string }> = [
  { slug: 'best-interior-paint-colours-muskoka-cottage', lastmod: '2026-05-03' },
  { slug: 'exterior-painting-muskoka-cottage-owners-guide', lastmod: '2026-05-03' },
  { slug: 'flood-damaged-boathouses-docks-muskoka-2026', lastmod: '2026-05-03' },
  { slug: 'sansin-exterior-stains-decks-docks-muskoka', lastmod: '2026-04-25' },
  { slug: 'gonano-nuroof-revive-extend-roof-life-muskoka', lastmod: '2026-04-24' },
  { slug: 'gonano-wood-saver-decks-docks-muskoka', lastmod: '2026-04-23' },
  { slug: 'spray-painting-versus-brush-painting', lastmod: '2026-09-21' },
  { slug: 'deck-stain-fading', lastmod: '2026-09-19' },
  { slug: 'guide-to-paint-project-estimates', lastmod: '2026-09-17' },
  { slug: 'new-construction-sequencing', lastmod: '2026-09-15' },
  { slug: 'best-garage-floor-coatings', lastmod: '2026-09-13' },
  { slug: 'rental-property-repainting-muskoka', lastmod: '2026-09-11' },
  { slug: 'guide-to-moisture-resistant-paint-muskoka', lastmod: '2026-09-09' },
  { slug: 'professional-painter-versus-handyman', lastmod: '2026-09-07' },
  { slug: 'paint-warranty-review', lastmod: '2026-09-05' },
  { slug: 'best-wall-coatings-for-bathrooms', lastmod: '2026-09-03' },
  { slug: 'epoxy-versus-polyaspartic-floors', lastmod: '2026-09-01' },
  { slug: 'matte-versus-satin-paint', lastmod: '2026-08-30' },
  { slug: 'trim-prefinishing-results', lastmod: '2026-08-28' },
  { slug: 'painted-cabinet-repairs', lastmod: '2026-08-26' },
  { slug: 'best-finishes-for-wood-trim', lastmod: '2026-08-24' },
  { slug: 'selecting-paint-sheen-for-bedrooms', lastmod: '2026-08-22' },
  { slug: 'bathroom-paint-humidity', lastmod: '2026-08-20' },
  { slug: 'how-to-wash-cedar-siding', lastmod: '2026-08-18' },
  { slug: 'washing-mould-from-exterior-surfaces', lastmod: '2026-08-16' },
  { slug: 'controlled-shop-finishing-guide', lastmod: '2026-08-14' },
  { slug: 'solid-stain-versus-transparent-stain', lastmod: '2026-08-12' },
  { slug: 'cottage-repainting-frequency-muskoka-homes', lastmod: '2026-08-10' },
  { slug: 'how-to-prepare-walls', lastmod: '2026-08-08' },
  { slug: 'what-causes-peeling-exterior-paint', lastmod: '2026-08-06' },
  { slug: 'painter-drywall-repairs', lastmod: '2026-08-04' },
  { slug: 'cottage-colour-trends-muskoka-homes', lastmod: '2026-08-02' },
  { slug: 'choosing-an-insured-painter', lastmod: '2026-07-31' },
  { slug: 'cottage-maintenance-painting-checklist-muskoka', lastmod: '2026-07-29' },
  { slug: 'weathered-siding-restoration-muskoka-homes', lastmod: '2026-07-27' },
  { slug: 'best-paints-for-cottage-interiors-muskoka', lastmod: '2026-07-25' },
  { slug: 'how-long-cottage-paint-lasts', lastmod: '2026-07-23' },
  { slug: 'stucco-ceiling-removal-muskoka', lastmod: '2026-07-22' },
  { slug: 'gonano-protective-coating-canada-muskoka', lastmod: '2026-07-21' },
  { slug: 'pre-staining-wood-siding', lastmod: '2026-07-20' },
  { slug: 'pressure-washing-driveway-muskoka', lastmod: '2026-07-19' },
  { slug: 'soft-washing-house-siding', lastmod: '2026-07-18' },
  { slug: 'wallpaper-installation-service-muskoka', lastmod: '2026-07-17' },
  { slug: 'fence-staining-contractor-muskoka', lastmod: '2026-07-16' },
  { slug: 'weatherproof-cottage-siding-painting', lastmod: '2026-07-15' },
  { slug: 'pre-finish-millwork', lastmod: '2026-07-14' },
  { slug: 'popcorn-ceiling-removal', lastmod: '2026-07-13' },
  { slug: 'deck-staining-muskoka', lastmod: '2026-07-12' },
  { slug: 'cabinet-refinishing-muskoka', lastmod: '2026-07-11' },
  { slug: 'exterior-painters-muskoka-homeowners-can-trust', lastmod: '2026-07-10' },
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve((req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;

  for (const post of POSTS) {
    xml += `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
});
