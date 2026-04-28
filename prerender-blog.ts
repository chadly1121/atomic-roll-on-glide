import type { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

/**
 * Vite plugin that pre-renders static HTML for /blog and individual blog posts
 * so that crawlers (Manus, PrimePage, GPTBot, etc.) can read article content
 * and SEO metadata without executing JavaScript.
 *
 * React hydrates over the pre-rendered markup at runtime.
 */
export function prerenderBlogPlugin(): Plugin {
  const SITE_URL = 'https://www.roll-onpainting.com';

  return {
    name: 'prerender-blog',
    apply: 'build',
    async closeBundle() {
      try {
        const distDir = path.resolve(process.cwd(), 'dist');
        const templatePath = path.join(distDir, 'index.html');
        if (!fs.existsSync(templatePath)) return;

        const template = fs.readFileSync(templatePath, 'utf-8');

        // Dynamically import the local blog posts using tsx-friendly path
        // We use a runtime require via a JIT loader compatible approach: read+eval is brittle,
        // so instead we parse the TS source minimally for slug + title + summary + content_html.
        const localPostsPath = path.resolve(process.cwd(), 'src/data/localBlogPosts.ts');
        const src = fs.readFileSync(localPostsPath, 'utf-8');

        type ParsedPost = {
          slug: string;
          title: string;
          summary: string;
          image?: string;
          date_published?: string;
          date_modified?: string;
          author?: string;
          metaDescription?: string;
          contentHtml: string;
        };

        const posts: ParsedPost[] = [];

        // Split on top-level "{ id:" object starts inside the array.
        const objectBlocks = src.split(/\n\s{2}\{\n/).slice(1);
        for (const block of objectBlocks) {
          const slugMatch = block.match(/slug:\s*'([^']+)'/);
          const titleMatch = block.match(/title:\s*'([^']+)'/);
          const summaryMatch = block.match(/summary:\s*\n?\s*'([^']+)'/);
          const imageMatch = block.match(/image:\s*'([^']+)'/);
          const datePubMatch = block.match(/date_published:\s*'([^']+)'/);
          const dateModMatch = block.match(/date_modified:\s*'([^']+)'/);
          const authorMatch = block.match(/name:\s*'([^']+)'/);
          const metaDescMatch = block.match(/meta_description:\s*\n?\s*'([^']+)'/);
          const contentMatch = block.match(/content_html:\s*`([\s\S]*?)`,\s*\n/);
          if (!slugMatch || !titleMatch || !contentMatch) continue;
          posts.push({
            slug: slugMatch[1],
            title: titleMatch[1].replace(/\\'/g, "'"),
            summary: summaryMatch?.[1].replace(/\\'/g, "'") ?? '',
            image: imageMatch?.[1],
            date_published: datePubMatch?.[1],
            date_modified: dateModMatch?.[1],
            author: authorMatch?.[1],
            metaDescription: metaDescMatch?.[1].replace(/\\'/g, "'"),
            contentHtml: contentMatch[1],
          });
        }

        const escapeHtml = (s: string) =>
          s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

        const renderPage = (opts: {
          title: string;
          description: string;
          canonical: string;
          image?: string;
          bodyHtml: string;
          jsonLd: Record<string, unknown>;
        }) => {
          let html = template;
          // Replace <title>
          html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(opts.title)}</title>`);
          // Inject/replace meta description + canonical + og tags
          const headInjection = `
    <meta name="description" content="${escapeHtml(opts.description)}" />
    <link rel="canonical" href="${opts.canonical}" />
    <meta property="og:title" content="${escapeHtml(opts.title)}" />
    <meta property="og:description" content="${escapeHtml(opts.description)}" />
    <meta property="og:url" content="${opts.canonical}" />
    <meta property="og:type" content="article" />
    ${opts.image ? `<meta property="og:image" content="${opts.image}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(opts.title)}" />
    <meta name="twitter:description" content="${escapeHtml(opts.description)}" />
    ${opts.image ? `<meta name="twitter:image" content="${opts.image}" />` : ''}
    <script type="application/ld+json">${JSON.stringify(opts.jsonLd)}</script>
  </head>`;
          html = html.replace('</head>', headInjection);
          // Inject pre-rendered body content into #root.
          // The base template fills #root with a static SEO block and may contain
          // nested <div>s, so we replace from <div id="root"> up to the closing
          // </div> immediately before <noscript> (the next sibling block).
          const rootOpen = html.indexOf('<div id="root"');
          if (rootOpen !== -1) {
            const afterOpen = html.indexOf('>', rootOpen) + 1;
            // Find matching </div> by walking depth.
            let depth = 1;
            let i = afterOpen;
            while (i < html.length && depth > 0) {
              const nextOpen = html.indexOf('<div', i);
              const nextClose = html.indexOf('</div>', i);
              if (nextClose === -1) break;
              if (nextOpen !== -1 && nextOpen < nextClose) {
                depth++;
                i = nextOpen + 4;
              } else {
                depth--;
                i = nextClose + 6;
              }
            }
            const rootClose = i; // position right after the matching </div>
            html =
              html.slice(0, rootOpen) +
              `<div id="root">${opts.bodyHtml}</div>` +
              html.slice(rootClose);
          }
          return html;
        };

        // ---- /blog index ----
        const blogListItems = posts
          .map(
            (p) => `
      <li>
        <article>
          <h2><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a></h2>
          <p>${escapeHtml(p.summary)}</p>
          ${p.date_published ? `<time datetime="${p.date_published}">${p.date_published.slice(0, 10)}</time>` : ''}
        </article>
      </li>`,
          )
          .join('');

        const blogIndexHtml = renderPage({
          title: 'Painting & GoNano Blog | Roll On Painting Muskoka',
          description:
            'Expert articles on interior, exterior, cabinet painting and GoNano roof protection in Muskoka, Huntsville, Bracebridge and Gravenhurst.',
          canonical: `${SITE_URL}/blog`,
          bodyHtml: `<main><header><h1>Roll On Painting Blog</h1><p>Practical guides for Muskoka homeowners and cottage owners.</p></header><ul>${blogListItems}</ul></main>`,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Roll On Painting Blog',
            url: `${SITE_URL}/blog`,
            blogPost: posts.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              url: `${SITE_URL}/blog/${p.slug}`,
              datePublished: p.date_published,
              dateModified: p.date_modified ?? p.date_published,
              description: p.metaDescription ?? p.summary,
              image: p.image ? (p.image.startsWith('http') ? p.image : SITE_URL + p.image) : undefined,
              author: p.author ? { '@type': 'Person', name: p.author } : undefined,
            })),
          },
        });

        const blogDir = path.join(distDir, 'blog');
        fs.mkdirSync(blogDir, { recursive: true });
        fs.writeFileSync(path.join(blogDir, 'index.html'), blogIndexHtml, 'utf-8');

        // ---- Individual post pages ----
        for (const p of posts) {
          const canonical = `${SITE_URL}/blog/${p.slug}`;
          const description = p.metaDescription ?? p.summary;
          const image = p.image
            ? p.image.startsWith('http')
              ? p.image
              : SITE_URL + p.image
            : undefined;

          const bodyHtml = `<main><article>
      <header>
        <h1>${escapeHtml(p.title)}</h1>
        ${p.date_published ? `<time datetime="${p.date_published}">${p.date_published.slice(0, 10)}</time>` : ''}
        ${p.author ? `<p>By ${escapeHtml(p.author)}</p>` : ''}
      </header>
      <div>${p.contentHtml}</div>
    </article></main>`;

          const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: p.title,
            description,
            image,
            datePublished: p.date_published,
            dateModified: p.date_modified ?? p.date_published,
            author: p.author ? { '@type': 'Person', name: p.author } : undefined,
            publisher: {
              '@type': 'Organization',
              name: 'Roll On Painting',
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/favicon.ico`,
              },
            },
            mainEntityOfPage: canonical,
          };

          const html = renderPage({
            title: `${p.title} | Roll On Painting`,
            description,
            canonical,
            image,
            bodyHtml,
            jsonLd,
          });

          const postDir = path.join(distDir, 'blog', p.slug);
          fs.mkdirSync(postDir, { recursive: true });
          fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf-8');
        }

        // ==========================================================
        // CORE STATIC ROUTES — head-only overrides for SPA pages.
        // Body content stays the same as the homepage SEO block (it
        // already includes nav/services/areas/FAQ/contact). Each
        // route gets a unique <title>, meta description, canonical,
        // OG tags, and a WebPage JSON-LD so AI bots and search
        // engines see distinct, indexable URLs without JS.
        // ==========================================================
        const renderHeadOnly = (opts: {
          title: string;
          description: string;
          canonical: string;
          extraJsonLd?: Record<string, unknown>;
        }) => {
          let html = template;
          html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(opts.title)}</title>`);
          // Replace homepage canonical/description/og:url/og:title/og:description with route-specific values
          html = html.replace(
            /<meta name="description"[^>]*\/>/,
            `<meta name="description" content="${escapeHtml(opts.description)}" />`,
          );
          html = html.replace(
            /<link rel="canonical"[^>]*\/>/,
            `<link rel="canonical" href="${opts.canonical}" />`,
          );
          html = html.replace(
            /<meta property="og:url"[^>]*\/>/,
            `<meta property="og:url" content="${opts.canonical}" />`,
          );
          html = html.replace(
            /<meta property="og:title"[^>]*\/>/,
            `<meta property="og:title" content="${escapeHtml(opts.title)}" />`,
          );
          html = html.replace(
            /<meta property="og:description"[^>]*\/>/,
            `<meta property="og:description" content="${escapeHtml(opts.description)}" />`,
          );
          html = html.replace(
            /<meta name="twitter:title"[^>]*\/>/,
            `<meta name="twitter:title" content="${escapeHtml(opts.title)}" />`,
          );
          html = html.replace(
            /<meta name="twitter:description"[^>]*\/>/,
            `<meta name="twitter:description" content="${escapeHtml(opts.description)}" />`,
          );
          if (opts.extraJsonLd) {
            html = html.replace(
              '</head>',
              `    <script type="application/ld+json">${JSON.stringify(opts.extraJsonLd)}</script>\n  </head>`,
            );
          }
          return html;
        };

        const writeRoute = (routePath: string, html: string) => {
          const dir = path.join(distDir, routePath);
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
        };

        const coreRoutes: Array<{ path: string; title: string; description: string }> = [
          { path: 'about', title: 'About Roll On Painting | HGTV Featured Muskoka Painters', description: 'Family-run painting contractor based in Port Sydney, Ontario. 25+ years experience, HGTV featured, $5M insured, WSIB covered. Serving Muskoka since 2014.' },
          { path: 'contact', title: 'Contact Roll On Painting | Free Quote in Muskoka', description: 'Request a free painting quote in Muskoka. Call 705-787-1401 or email info@roll-onpainting.com. Serving Huntsville, Bracebridge, Gravenhurst & all of Muskoka.' },
          { path: 'service-areas', title: 'Service Areas | Painters Across Muskoka & Parry Sound', description: 'Roll On Painting serves 50+ communities across Muskoka, Parry Sound and Simcoe County including Huntsville, Bracebridge, Gravenhurst, Port Carling, Bala and more.' },
          { path: 'portfolio', title: 'Portfolio | Roll On Painting Muskoka Projects', description: 'Browse interior, exterior, cabinet, commercial and cottage painting projects completed across Muskoka by Roll On Painting.' },
          { path: 'reviews', title: 'Reviews | Roll On Painting — 4.9★ Google Rated', description: '140+ five-star Google reviews. Real testimonials from Muskoka homeowners and cottage owners about Roll On Painting.' },
          { path: 'faq', title: 'FAQ | Roll On Painting Muskoka', description: 'Answers to common questions about painting costs, timelines, warranty, insurance and our Free Touch-Ups for Life program in Muskoka.' },
          { path: 'catalog', title: 'Painting Service Catalog | Fixed-Price Packages | Roll On Painting', description: 'Transparent fixed-price painting packages for Muskoka. Book online with 13% HST included. WSIB covered, $5M insured.' },
          { path: 'gonano', title: 'GoNano Roof Coatings & Sealers | Authorized Dealer | Muskoka', description: 'GoNano nanotechnology roof and surface coatings. NuRoof Fortify, Revive and Bio-Boost. Authorized dealer for Muskoka. As seen on Dragon\'s Den.' },
          { path: 'private-client', title: 'Private Client Program | Roll On Painting Muskoka', description: 'Fully managed property painting and care for high-net-worth Muskoka cottage owners. Discreet, premium, headache-free.' },
          { path: 'free-touch-ups', title: 'Perfect Finish Promise | Free Touch-Ups | Roll On Painting', description: 'Every Roll On Painting project includes our Perfect Finish Promise — complimentary touch-ups so your finish stays flawless.' },
          { path: 'media', title: 'Media | HGTV & Dockside Magazine Features | Roll On Painting', description: 'Roll On Painting featured 5 times on HGTV\'s Scott\'s Vacation House Rules and 15 times in Dockside Magazine.' },
          { path: 'careers', title: 'Careers | Join Roll On Painting Muskoka', description: 'Hiring skilled painters in Muskoka. Apply by email — join an HGTV-featured, WSIB-covered, $5M insured painting team.' },
        ];

        for (const r of coreRoutes) {
          const canonical = `${SITE_URL}/${r.path}`;
          const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            url: canonical,
            name: r.title,
            description: r.description,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#business` },
            inLanguage: 'en-CA',
            speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
          };
          writeRoute(r.path, renderHeadOnly({ title: r.title, description: r.description, canonical, extraJsonLd: jsonLd }));
        }

        // ---- Per-service pages ----
        try {
          const servicesSrc = fs.readFileSync(
            path.resolve(process.cwd(), 'src/data/servicePages.ts'),
            'utf-8',
          );
          const serviceBlocks = servicesSrc.split(/\n\s{2}\{\n/).slice(1);
          for (const block of serviceBlocks) {
            const slug = block.match(/slug:\s*'([^']+)'/)?.[1];
            const name = block.match(/name:\s*'([^']+)'/)?.[1];
            const metaDesc = block.match(/metaDescription:\s*'([^']+)'/)?.[1];
            if (!slug || !name) continue;
            const canonical = `${SITE_URL}/${slug}`;
            const title = `${name} | Roll On Painting | Muskoka`;
            const description =
              metaDesc?.replace(/\\'/g, "'") ?? `${name} services in Muskoka by Roll On Painting.`;
            const jsonLd = {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name,
              serviceType: name,
              url: canonical,
              provider: { '@id': `${SITE_URL}/#business` },
              areaServed: { '@type': 'AdministrativeArea', name: 'Muskoka, Ontario, Canada' },
              description,
            };
            writeRoute(slug, renderHeadOnly({ title, description, canonical, extraJsonLd: jsonLd }));
          }
        } catch (e) {
          console.warn('[prerender-blog] service pages skipped:', e);
        }

        // ---- Per-location pages ----
        try {
          const locSrc = fs.readFileSync(
            path.resolve(process.cwd(), 'src/data/locationPages.ts'),
            'utf-8',
          );
          const locBlocks = locSrc.split(/\n\s{2}\{\n/).slice(1);
          for (const block of locBlocks) {
            const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
            const name = block.match(/name:\s*"([^"]+)"/)?.[1];
            const metaTitle = block.match(/metaTitle:\s*"([^"]+)"/)?.[1];
            const metaDesc = block.match(/metaDescription:\s*"([^"]+)"/)?.[1];
            if (!slug || !name) continue;
            const canonical = `${SITE_URL}/${slug}`;
            const title = metaTitle ?? `Painters in ${name} | Roll On Painting`;
            const description = metaDesc ?? `Professional painters serving ${name}, Ontario.`;
            const jsonLd = {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': `${canonical}#localbusiness`,
              name: `Roll On Painting — ${name}`,
              url: canonical,
              areaServed: { '@type': 'Place', name: `${name}, Ontario, Canada` },
              parentOrganization: { '@id': `${SITE_URL}/#business` },
              description,
            };
            writeRoute(slug, renderHeadOnly({ title, description, canonical, extraJsonLd: jsonLd }));
          }
        } catch (e) {
          console.warn('[prerender-blog] location pages skipped:', e);
        }

        // eslint-disable-next-line no-console
        console.log(`[prerender-blog] Generated ${posts.length} blog page(s) + core/service/location routes.`);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[prerender-blog] Skipped pre-render:', err);
      }
    },
  };
}