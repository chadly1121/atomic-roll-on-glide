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

        // eslint-disable-next-line no-console
        console.log(`[prerender-blog] Generated ${posts.length} static blog post page(s) + /blog index.`);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[prerender-blog] Skipped pre-render:', err);
      }
    },
  };
}