import "https://deno.land/std@0.168.0/dotenv/load.ts";

const FEED_URL = 'https://getautoseo.com/feeds/11478/2BAyrFT4mJ27iBtqKG5KC5XTe9wE9K8FMjrMA4C10ok.json';
const SITE_URL = 'https://www.roll-onpainting.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function extractSlug(url: string, id: string): string {
  try {
    const parts = url.split('/').filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  } catch {}
  return id;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const feedRes = await fetch(FEED_URL);
    if (!feedRes.ok) throw new Error(`Feed returned ${feedRes.status}`);
    const feed = await feedRes.json();
    const items = feed.items || [];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;

    for (const item of items) {
      const slug = extractSlug(item.url || '', item.id);
      const lastmod = item.date_modified || item.date_published || '';
      xml += `  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>${lastmod ? `\n    <lastmod>${lastmod.split('T')[0]}</lastmod>` : ''}
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
  } catch (err) {
    console.error('Sitemap generation error:', err);
    return new Response('Error generating sitemap', {
      status: 500,
      headers: corsHeaders,
    });
  }
});
