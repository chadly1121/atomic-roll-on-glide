import "https://deno.land/std@0.168.0/dotenv/load.ts";

const SITE_URL = 'https://www.roll-onpainting.com';

/**
 * Locally-authored blog posts.
 * Mirrors src/data/localBlogPosts.ts — when you add a post there, add the
 * slug + lastmod date here too so the sitemap stays accurate.
 */
const POSTS: Array<{ slug: string; lastmod: string }> = [
  { slug: 'exterior-painting-muskoka-cottage-owners-guide', lastmod: '2026-05-03' },
  { slug: 'flood-damaged-boathouses-docks-muskoka-2026', lastmod: '2026-05-03' },
  { slug: 'sansin-exterior-stains-decks-docks-muskoka', lastmod: '2026-04-25' },
  { slug: 'gonano-nuroof-revive-extend-roof-life-muskoka', lastmod: '2026-04-24' },
  { slug: 'gonano-wood-saver-decks-docks-muskoka', lastmod: '2026-04-23' },
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
