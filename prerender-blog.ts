import type { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

/**
 * Vite plugin that pre-renders static HTML for indexable SPA routes so crawlers
 * can read route-specific titles, descriptions, canonicals, H1s, and schema
 * before React runs.
 */
export function prerenderBlogPlugin(): Plugin {
  const SITE_URL = 'https://www.roll-onpainting.com';
  const FEED_URL = 'https://getautoseo.com/feeds/11478/2BAyrFT4mJ27iBtqKG5KC5XTe9wE9K8FMjrMA4C10ok.json';
  const DEFAULT_IMAGE =
    'https://res.cloudinary.com/dxqfou8jh/image/upload/f_auto,q_80,w_1200/v1745866797/IMG_20190920_121835_fchin4.jpg';

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

  type RouteMeta = {
    slug: string;
    title: string;
    description: string;
    h1: string;
    jsonLd: Record<string, unknown>;
    image?: string;
    ogType?: 'website' | 'article';
    bodyHtml?: string;
  };

  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const safeJson = (value: Record<string, unknown>) => JSON.stringify(value).replace(/<\//g, '<\\/');

  const unescapeSourceString = (value: string) =>
    value
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\`/g, '`')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .trim();

  const normalizeText = (value: string) => value.replace(/\s+/g, ' ').trim();

  const readSitemapRoutes = (): string[] => {
    const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    if (!fs.existsSync(sitemapPath)) return [];

    const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
    const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.roll-onpainting\.com\/?([^<]*)<\/loc>/g)]
      .map((match) => match[1].trim().replace(/^\/+|\/+$/g, ''))
      .sort((a, b) => a.localeCompare(b));

    return [...new Set(routes)];
  };

  const readStringField = (block: string, field: string): string | undefined => {
    const fieldIndex = block.indexOf(`${field}:`);
    if (fieldIndex === -1) return undefined;

    let i = fieldIndex + field.length + 1;
    while (i < block.length && /\s/.test(block[i])) i++;

    const quote = block[i];
    if (quote !== "'" && quote !== '"' && quote !== '`') return undefined;

    i++;
    let value = '';
    for (; i < block.length; i++) {
      const ch = block[i];
      if (ch === '\\') {
        value += ch;
        if (i + 1 < block.length) {
          value += block[i + 1];
          i++;
        }
        continue;
      }
      if (ch === quote) break;
      value += ch;
    }

    return unescapeSourceString(value);
  };

  const splitTopLevelObjects = (src: string) => src.split(/\n\s{2}\{\n/).slice(1);

  // Extract a string-array field like:  whatIncludes: [ 'a', "b", `c` ],
  const readStringArrayField = (block: string, field: string): string[] => {
    const re = new RegExp(`${field}\\s*:\\s*\\[`);
    const m = re.exec(block);
    if (!m) return [];
    let i = m.index + m[0].length;
    let depth = 1;
    let buf = '';
    while (i < block.length && depth > 0) {
      const ch = block[i];
      if (ch === '[') depth++;
      else if (ch === ']') {
        depth--;
        if (depth === 0) break;
      }
      buf += ch;
      i++;
    }
    const items: string[] = [];
    let j = 0;
    while (j < buf.length) {
      const ch = buf[j];
      if (ch === "'" || ch === '"' || ch === '`') {
        const quote = ch;
        j++;
        let val = '';
        while (j < buf.length) {
          const c = buf[j];
          if (c === '\\' && j + 1 < buf.length) {
            val += c + buf[j + 1];
            j += 2;
            continue;
          }
          if (c === quote) {
            j++;
            break;
          }
          val += c;
          j++;
        }
        items.push(unescapeSourceString(val));
      } else {
        j++;
      }
    }
    return items;
  };

  // Extract an object-array field, returning each object's body as a substring
  // for further per-field parsing via readStringField.
  const readObjectArrayField = (block: string, field: string): string[] => {
    const re = new RegExp(`${field}\\s*:\\s*\\[`);
    const m = re.exec(block);
    if (!m) return [];
    let i = m.index + m[0].length;
    let arrDepth = 1;
    const objects: string[] = [];
    while (i < block.length && arrDepth > 0) {
      const ch = block[i];
      if (ch === '[') {
        arrDepth++;
        i++;
        continue;
      }
      if (ch === ']') {
        arrDepth--;
        i++;
        continue;
      }
      if (ch === '{') {
        let depth = 1;
        i++;
        let buf = '';
        while (i < block.length && depth > 0) {
          const c = block[i];
          if (c === "'" || c === '"' || c === '`') {
            const quote = c;
            buf += c;
            i++;
            while (i < block.length) {
              const cc = block[i];
              if (cc === '\\' && i + 1 < block.length) {
                buf += cc + block[i + 1];
                i += 2;
                continue;
              }
              buf += cc;
              i++;
              if (cc === quote) break;
            }
            continue;
          }
          if (c === '{') depth++;
          else if (c === '}') {
            depth--;
            if (depth === 0) {
              i++;
              break;
            }
          }
          buf += c;
          i++;
        }
        objects.push(buf);
        continue;
      }
      i++;
    }
    return objects;
  };

  // Extract a nested object field's inner body, e.g. aiAnswerBlock: { ... }
  const readObjectField = (block: string, field: string): string | null => {
    const re = new RegExp(`${field}\\s*:\\s*\\{`);
    const m = re.exec(block);
    if (!m) return null;
    let i = m.index + m[0].length;
    let depth = 1;
    let buf = '';
    while (i < block.length && depth > 0) {
      const c = block[i];
      if (c === "'" || c === '"' || c === '`') {
        const quote = c;
        buf += c;
        i++;
        while (i < block.length) {
          const cc = block[i];
          if (cc === '\\' && i + 1 < block.length) {
            buf += cc + block[i + 1];
            i += 2;
            continue;
          }
          buf += cc;
          i++;
          if (cc === quote) break;
        }
        continue;
      }
      if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) break;
      }
      buf += c;
      i++;
    }
    return buf;
  };

  const renderList = (items: string[], ordered = false): string => {
    if (!items.length) return '';
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag}>${items.map((it) => `<li>${escapeHtml(it)}</li>`).join('')}</${tag}>`;
  };

  const renderFaqs = (faqs: { question: string; answer: string }[]): string => {
    if (!faqs.length) return '';
    return `<section aria-labelledby="faq-heading"><h2 id="faq-heading">Frequently Asked Questions</h2>${faqs
      .map(
        (f) =>
          `<details><summary>${escapeHtml(f.question)}</summary><p>${escapeHtml(f.answer)}</p></details>`,
      )
      .join('')}</section>`;
  };

  const parseFaqArray = (block: string): { question: string; answer: string }[] => {
    return readObjectArrayField(block, 'faqs')
      .map((obj) => {
        const question = readStringField(obj, 'question');
        const answer = readStringField(obj, 'answer');
        if (!question || !answer) return null;
        return { question, answer };
      })
      .filter((x): x is { question: string; answer: string } => Boolean(x));
  };

  const extractSlug = (url: string, id: string): string => {
    try {
      const parts = url.split('/').filter(Boolean);
      if (parts.length > 0) return parts[parts.length - 1];
    } catch {
      // Fall through to the id fallback below.
    }
    return id;
  };

  const readLocalBlogPosts = (): ParsedPost[] => {
    const localPostsPath = path.resolve(process.cwd(), 'src/data/localBlogPosts.ts');
    const src = fs.readFileSync(localPostsPath, 'utf-8');

    return splitTopLevelObjects(src)
      .map((block): ParsedPost | null => {
        const slug = readStringField(block, 'slug');
        const title = readStringField(block, 'title');
        const contentHtml = readStringField(block, 'content_html');
        if (!slug || !title || !contentHtml) return null;

        const post: ParsedPost = {
          slug,
          title,
          summary: readStringField(block, 'summary') ?? '',
          contentHtml,
        };

        const image = readStringField(block, 'image');
        const datePublished = readStringField(block, 'date_published');
        const dateModified = readStringField(block, 'date_modified');
        const author = readStringField(block, 'name');
        const metaDescription = readStringField(block, 'meta_description');

        if (image) post.image = image;
        if (datePublished) post.date_published = datePublished;
        if (dateModified) post.date_modified = dateModified;
        if (author) post.author = author;
        if (metaDescription) post.metaDescription = metaDescription;

        return post;
      })
      .filter((post): post is ParsedPost => Boolean(post));
  };

  const readRemoteBlogPosts = async (): Promise<ParsedPost[]> => {
    try {
      const res = await fetch(FEED_URL);
      if (!res.ok) return [];

      const data = (await res.json()) as { items?: any[] };
      const items = Array.isArray(data.items) ? data.items : [];

      return items
        .map((item: any): ParsedPost | null => {
          const slug = extractSlug(item.url || '', item.id || '');
          if (!slug || !item.title || !item.content_html) return null;

          const post: ParsedPost = {
            slug,
            title: String(item.title),
            summary: String(item.summary || ''),
            contentHtml: String(item.content_html),
          };

          if (item.image) post.image = String(item.image);
          if (item.date_published) post.date_published = String(item.date_published);
          if (item.date_modified) post.date_modified = String(item.date_modified);
          if (Array.isArray(item.authors) && item.authors[0]?.name) post.author = String(item.authors[0].name);
          if (item._seo?.meta_description) post.metaDescription = String(item._seo.meta_description);

          return post;
        })
        .filter((post): post is ParsedPost => Boolean(post));
    } catch (e) {
      console.warn('[prerender-blog] remote blog feed skipped:', e);
      return [];
    }
  };

  const readAllBlogPosts = async (): Promise<ParsedPost[]> => {
    const local = readLocalBlogPosts();
    const remote = await readRemoteBlogPosts();
    const localSlugs = new Set(local.map((post) => post.slug));

    return [...local, ...remote.filter((post) => !localSlugs.has(post.slug))].sort(
      (a, b) => new Date(b.date_published ?? 0).getTime() - new Date(a.date_published ?? 0).getTime(),
    );
  };

  const replaceOrInject = (html: string, pattern: RegExp, replacement: string) => {
    if (pattern.test(html)) return html.replace(pattern, replacement);
    return html.replace('</head>', `    ${replacement}\n  </head>`);
  };

  const replaceRoot = (html: string, bodyHtml: string) => {
    const rootOpen = html.indexOf('<div id="root"');
    if (rootOpen === -1) return html;

    const afterOpen = html.indexOf('>', rootOpen) + 1;
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

    return html.slice(0, rootOpen) + `<div id="root">${bodyHtml}</div>` + html.slice(i);
  };

  const stripHomepageSchema = (html: string) =>
    html.replace(
      /\s*<!-- Static JSON-LD for non-JS crawlers[\s\S]*?<!-- SEOHelmet component injects additional\/page-specific JSON-LD at runtime\. Static copy above for non-JS crawlers\. -->\s*/,
      '\n',
    );

  const renderStaticRoute = (template: string, route: RouteMeta) => {
    const canonical = route.slug ? `${SITE_URL}/${route.slug}` : `${SITE_URL}/`;
    let html = stripHomepageSchema(template);

    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`);
    html = replaceOrInject(
      html,
      /<meta\s+name=["']description["'][^>]*>/,
      `<meta name="description" content="${escapeHtml(route.description)}" />`,
    );
    html = replaceOrInject(
      html,
      /<link\s+rel=["']canonical["'][^>]*>/,
      `<link rel="canonical" href="${canonical}" />`,
    );
    html = replaceOrInject(
      html,
      /<meta\s+property=["']og:title["'][^>]*>/,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    );
    html = replaceOrInject(
      html,
      /<meta\s+property=["']og:description["'][^>]*>/,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    );
    html = replaceOrInject(
      html,
      /<meta\s+property=["']og:url["'][^>]*>/,
      `<meta property="og:url" content="${canonical}" />`,
    );
    html = replaceOrInject(
      html,
      /<meta\s+property=["']og:type["'][^>]*>/,
      `<meta property="og:type" content="${route.ogType ?? 'website'}" />`,
    );
    html = replaceOrInject(
      html,
      /<meta\s+name=["']twitter:title["'][^>]*>/,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    );
    html = replaceOrInject(
      html,
      /<meta\s+name=["']twitter:description["'][^>]*>/,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    );

    if (route.image) {
      html = replaceOrInject(
        html,
        /<meta\s+property=["']og:image["'][^>]*>/,
        `<meta property="og:image" content="${route.image}" />`,
      );
      html = replaceOrInject(
        html,
        /<meta\s+name=["']twitter:image["'][^>]*>/,
        `<meta name="twitter:image" content="${route.image}" />`,
      );
    }

    const schema = `    <script type="application/ld+json">${safeJson(route.jsonLd)}</script>\n`;
    html = html.replace('</head>', `${schema}  </head>`);

    const bodyHtml =
      route.bodyHtml ??
      `<main><header><h1>${escapeHtml(route.h1)}</h1><p>${escapeHtml(route.description)}</p></header></main>`;
    return replaceRoot(html, bodyHtml);
  };

  const writeRoute = (distDir: string, routePath: string, html: string) => {
    const dir = path.join(distDir, routePath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  };

  const writePrerenderRedirects = (distDir: string, routePaths: string[]) => {
    const uniqueRoutes = [...new Set(routePaths.filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const exactRouteRewrites = uniqueRoutes
      .map((route) => `/${route}    /${route}/index.html    200`)
      .join('\n');

    const redirects = `# Force non-www to www
https://roll-onpainting.com/*  https://www.roll-onpainting.com/:splat  301!
http://roll-onpainting.com/*   https://www.roll-onpainting.com/:splat  301!

# Static assets - serve directly
/sitemap.xml      /sitemap.xml      200!
/robots.txt       /robots.txt       200!
/llms.txt         /llms.txt         200!
/llms-full.txt    /llms-full.txt    200!
/site.webmanifest /site.webmanifest 200!

# Pre-rendered sitemap routes - serve route-specific HTML before SPA fallback
${exactRouteRewrites}

# SPA fallback for non-indexed/client-only routes
/*    /index.html   200
`;

    fs.writeFileSync(path.join(distDir, '_redirects'), redirects, 'utf-8');
  };

  const serviceRouteJsonLd = (slug: string, name: string, description: string) => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/${slug}#service`,
        name,
        serviceType: name,
        url: `${SITE_URL}/${slug}`,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: { '@type': 'AdministrativeArea', name: 'Muskoka, Ontario, Canada' },
        description,
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/${slug}#webpage`,
        url: `${SITE_URL}/${slug}`,
        name: `${name} | Roll On Painting | Muskoka`,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/${slug}#service` },
        inLanguage: 'en-CA',
      },
    ],
  });

  const parseServiceRoutes = (filePath: string): RouteMeta[] => {
    const src = fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf-8');

    return splitTopLevelObjects(src)
      .map((block): RouteMeta | null => {
        const slug = readStringField(block, 'slug');
        const name = readStringField(block, 'name');
        if (!slug || !name) return null;

        const description = normalizeText(
          readStringField(block, 'metaDescription') ??
            readStringField(block, 'description') ??
            `${name} services in Muskoka by Roll On Painting.`,
        );
        const h1 = readStringField(block, 'headline') ?? `${name} in Muskoka`;
        const title = `${name} | Roll On Painting | Muskoka`;

        const longDescription = readStringField(block, 'description') ?? description;
        const aiBlock = readObjectField(block, 'aiAnswerBlock') ?? '';
        const whatIncludes = readStringArrayField(aiBlock, 'whatIncludes');
        const whoItsFor = readStringArrayField(aiBlock, 'whoItsFor');
        const whereAvailable = readStringArrayField(aiBlock, 'whereAvailable');
        const howQuotesWork = readStringArrayField(aiBlock, 'howQuotesWork');
        const benefits = readStringArrayField(block, 'benefits');
        const processSteps = readObjectArrayField(block, 'process')
          .map((obj) => {
            const step = readStringField(obj, 'step');
            const desc = readStringField(obj, 'description');
            if (!step || !desc) return null;
            return { step, description: desc };
          })
          .filter((x): x is { step: string; description: string } => Boolean(x));
        const faqs = parseFaqArray(block);

        const sectionHtml = (heading: string, body: string) =>
          body ? `<section><h2>${escapeHtml(heading)}</h2>${body}</section>` : '';

        const bodyHtml = `<main>
  <header>
    <h1>${escapeHtml(h1)}</h1>
    <p>${escapeHtml(longDescription)}</p>
  </header>
  ${sectionHtml("What's Included", renderList(whatIncludes))}
  ${sectionHtml("Who It's For", renderList(whoItsFor))}
  ${sectionHtml('Where We Serve', renderList(whereAvailable))}
  ${sectionHtml('How to Get a Quote', renderList(howQuotesWork, true))}
  ${sectionHtml(`Why Choose Roll On Painting for ${name}`, renderList(benefits))}
  ${
    processSteps.length
      ? `<section><h2>Our ${escapeHtml(name)} Process</h2><ol>${processSteps
          .map(
            (s) =>
              `<li><strong>${escapeHtml(s.step)}.</strong> ${escapeHtml(s.description)}</li>`,
          )
          .join('')}</ol></section>`
      : ''
  }
  ${renderFaqs(faqs)}
</main>`;

        return {
          slug,
          title,
          description,
          h1,
          image: DEFAULT_IMAGE,
          jsonLd: serviceRouteJsonLd(slug, name, description),
          bodyHtml,
        } satisfies RouteMeta;
      })
      .filter((route): route is RouteMeta => Boolean(route));
  };

  const parseLocationRoutes = (): RouteMeta[] => {
    const src = fs.readFileSync(path.resolve(process.cwd(), 'src/data/locationPages.ts'), 'utf-8');

    return splitTopLevelObjects(src)
      .map((block): RouteMeta | null => {
        const slug = readStringField(block, 'slug');
        const name = readStringField(block, 'name');
        if (!slug || !name) return null;

        const title = readStringField(block, 'metaTitle') ?? `Painters in ${name} | Roll On Painting`;
        const description = normalizeText(
          readStringField(block, 'metaDescription') ?? `Professional painters serving ${name}, Ontario.`,
        );
        const h1 = readStringField(block, 'headline') ?? `Painters in ${name}`;

        const intro = readStringField(block, 'intro') ?? '';
        const localContent = readStringField(block, 'localContent') ?? '';
        const region = readStringField(block, 'region') ?? '';
        const nearbyAreas = readStringArrayField(block, 'nearbyAreas');
        const faqs = parseFaqArray(block);

        const bodyHtml = `<main>
  <header>
    <h1>${escapeHtml(h1)}</h1>
    ${region ? `<p><strong>Region:</strong> ${escapeHtml(region)}, Ontario</p>` : ''}
  </header>
  ${intro ? `<section><h2>About Our ${escapeHtml(name)} Painting Services</h2><p>${escapeHtml(intro)}</p></section>` : ''}
  ${localContent ? `<section><h2>Local Expertise in ${escapeHtml(name)}</h2><p>${escapeHtml(localContent)}</p></section>` : ''}
  ${nearbyAreas.length ? `<section><h2>Nearby Areas We Serve</h2>${renderList(nearbyAreas)}</section>` : ''}
  ${renderFaqs(faqs)}
  <section><h2>Get a Free Quote</h2><p>Call Roll On Painting at 705-787-1401 or email info@roll-onpainting.com for a free, no-obligation painting estimate in ${escapeHtml(name)}.</p></section>
</main>`;

        return {
          slug,
          title,
          description,
          h1,
          image: DEFAULT_IMAGE,
          bodyHtml,
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebPage',
                '@id': `${SITE_URL}/${slug}#webpage`,
                url: `${SITE_URL}/${slug}`,
                name: title,
                description,
                isPartOf: { '@id': `${SITE_URL}/#website` },
                about: { '@id': `${SITE_URL}/#business` },
                inLanguage: 'en-CA',
              },
              {
                '@type': 'ProfessionalService',
                '@id': `${SITE_URL}/${slug}#localservice`,
                name: `Roll On Painting — ${name}`,
                url: `${SITE_URL}/${slug}`,
                areaServed: { '@type': 'Place', name: `${name}, Ontario, Canada` },
                parentOrganization: { '@id': `${SITE_URL}/#business` },
                description,
              },
            ],
          },
        } satisfies RouteMeta;
      })
      .filter((route): route is RouteMeta => Boolean(route));
  };

  const parseCottageOwnerRoutes = (): RouteMeta[] => {
    const src = fs.readFileSync(path.resolve(process.cwd(), 'src/data/cottageOwnerPages.ts'), 'utf-8');

    return splitTopLevelObjects(src)
      .map((block): RouteMeta | null => {
        const slug = readStringField(block, 'slug');
        const cityName = readStringField(block, 'cityName');
        if (!slug || !cityName) return null;

        const title = readStringField(block, 'metaTitle') ?? `${cityName} to Muskoka Cottage Painting | Roll On Painting`;
        const description = normalizeText(
          readStringField(block, 'metaDescription') ?? `Muskoka cottage painting for ${cityName} homeowners.`,
        );
        const h1 = readStringField(block, 'headline') ?? `Muskoka Cottage Painting for ${cityName} Homeowners`;

        const subheadline = readStringField(block, 'subheadline') ?? '';
        const ctaText = readStringField(block, 'ctaText') ?? 'Request a Consultation';
        const sections = readObjectArrayField(block, 'sections')
          .map((obj) => {
            const heading = readStringField(obj, 'heading');
            const body = readStringField(obj, 'body');
            if (!heading || !body) return null;
            return { heading, body };
          })
          .filter((x): x is { heading: string; body: string } => Boolean(x));
        const faqs = parseFaqArray(block);

        const bodyHtml = `<main>
  <header>
    <h1>${escapeHtml(h1)}</h1>
    ${subheadline ? `<p>${escapeHtml(subheadline)}</p>` : ''}
  </header>
  ${sections
    .map((s) => `<section><h2>${escapeHtml(s.heading)}</h2><p>${escapeHtml(s.body)}</p></section>`)
    .join('\n  ')}
  ${renderFaqs(faqs)}
  <section><h2>${escapeHtml(ctaText)}</h2><p>Call 705-787-1401 or email info@roll-onpainting.com to discuss your Muskoka cottage. Serving ${escapeHtml(cityName)} homeowners with discreet, fully managed property care.</p></section>
</main>`;

        return {
          slug,
          title,
          description,
          h1,
          image: DEFAULT_IMAGE,
          bodyHtml,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${SITE_URL}/${slug}#webpage`,
            url: `${SITE_URL}/${slug}`,
            name: title,
            description,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#business` },
            inLanguage: 'en-CA',
          },
        } satisfies RouteMeta;
      })
      .filter((route): route is RouteMeta => Boolean(route));
  };

  return {
    name: 'prerender-blog',
    apply: 'build',
    async closeBundle() {
      try {
        const distDir = path.resolve(process.cwd(), 'dist');
        const templatePath = path.join(distDir, 'index.html');
        if (!fs.existsSync(templatePath)) return;

        const template = fs.readFileSync(templatePath, 'utf-8');
        const posts = await readAllBlogPosts();

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

        const blogIndexRoute: RouteMeta = {
          slug: 'blog',
          title: 'Painting & GoNano Blog | Roll On Painting Muskoka',
          description:
            'Expert articles on interior, exterior, cabinet painting and GoNano roof protection in Muskoka, Huntsville, Bracebridge and Gravenhurst.',
          h1: 'Roll On Painting Blog',
          image: DEFAULT_IMAGE,
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
        };

        const blogIndexHtml = replaceRoot(
          renderStaticRoute(template, blogIndexRoute),
          `<main><header><h1>Roll On Painting Blog</h1><p>${escapeHtml(blogIndexRoute.description)}</p></header><ul>${blogListItems}</ul></main>`,
        );

        for (const p of posts) {
          const slug = `blog/${p.slug}`;
          const description = normalizeText(p.metaDescription ?? p.summary);
          const image = p.image ? (p.image.startsWith('http') ? p.image : SITE_URL + p.image) : DEFAULT_IMAGE;
          const canonical = `${SITE_URL}/${slug}`;
          const title = `${p.title} | Roll On Painting`;
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
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` },
            },
            mainEntityOfPage: canonical,
          };
          const bodyHtml = `<main><article>
      <header>
        <h1>${escapeHtml(p.title)}</h1>
        ${p.date_published ? `<time datetime="${p.date_published}">${p.date_published.slice(0, 10)}</time>` : ''}
        ${p.author ? `<p>By ${escapeHtml(p.author)}</p>` : ''}
      </header>
      <div>${p.contentHtml}</div>
    </article></main>`;

          const blogPostHtml = replaceRoot(
            renderStaticRoute(template, {
              slug,
              title,
              description,
              h1: p.title,
              image,
              ogType: 'article',
              jsonLd,
            }),
            bodyHtml,
          );
          writeRoute(distDir, slug, blogPostHtml);
        }

        writeRoute(distDir, 'blog', blogIndexHtml);

        const coreRoutes: RouteMeta[] = [
          {
            slug: 'about',
            title: 'About Roll On Painting | HGTV Featured Muskoka Painters',
            description:
              'Family-run painting contractor based in Port Sydney, Ontario. 25+ years experience, HGTV featured, $5M insured, WSIB covered. Serving Muskoka since 2014.',
            h1: 'About Roll On Painting',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'AboutPage' },
          },
          {
            slug: 'contact',
            title: 'Contact Roll On Painting | Free Quote in Muskoka',
            description:
              'Request a free painting quote in Muskoka. Call 705-787-1401 or email info@roll-onpainting.com. Serving Huntsville, Bracebridge, Gravenhurst & all of Muskoka.',
            h1: 'Contact Roll On Painting',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'ContactPage' },
          },
          {
            slug: 'service-areas',
            title: 'Service Areas | Painters Across Muskoka & Parry Sound',
            description:
              'Roll On Painting serves 50+ communities across Muskoka, Parry Sound and Simcoe County including Huntsville, Bracebridge, Gravenhurst, Port Carling, Bala and more.',
            h1: 'Service Areas',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage' },
          },
          {
            slug: 'portfolio',
            title: 'Portfolio | Roll On Painting Muskoka Projects',
            description:
              'Browse interior, exterior, cabinet, commercial and cottage painting projects completed across Muskoka by Roll On Painting.',
            h1: 'Roll On Painting Portfolio',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage' },
          },
          {
            slug: 'reviews',
            title: 'Reviews | Roll On Painting — 4.8★ Google Rated',
            description:
              '20 Google reviews from Muskoka homeowners and cottage owners about Roll On Painting.',
            h1: 'Customer Reviews',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'Review' },
          },
          {
            slug: 'faq',
            title: 'FAQ | Roll On Painting Muskoka',
            description:
              'Answers to common questions about painting costs, timelines, warranty, insurance and the Perfect Finish Promise in Muskoka.',
            h1: 'Frequently Asked Questions',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'FAQPage' },
          },
          {
            slug: 'catalog',
            title: 'Painting Service Catalog | Fixed-Price Packages | Roll On Painting',
            description:
              'Transparent fixed-price painting packages for Muskoka. Book online with 13% HST included. WSIB covered, $5M insured.',
            h1: 'Painting Service Catalog',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage' },
          },
          {
            slug: 'gonano',
            title: 'GoNano Roof Coatings & Sealers | Authorized Dealer | Muskoka',
            description:
              "GoNano nanotechnology roof and surface coatings. NuRoof Fortify, Revive and Bio-Boost. Authorized dealer for Muskoka. As seen on Dragon's Den.",
            h1: 'GoNano Roof Coatings & Sealers',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'Service' },
          },
          {
            slug: 'private-client-muskoka-property-care',
            title: 'Private Client Program | Roll On Painting Muskoka',
            description:
              'Fully managed property painting and care for high-net-worth Muskoka cottage owners. Discreet, premium, headache-free.',
            h1: 'Private Client Program',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'Service' },
          },
          {
            slug: 'free-touch-ups',
            title: 'Perfect Finish Promise | Free Touch-Ups | Roll On Painting',
            description:
              'Every Roll On Painting project includes our Perfect Finish Promise — complimentary touch-ups so your finish stays flawless.',
            h1: 'Perfect Finish Promise',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage' },
          },
          {
            slug: 'media',
            title: 'Media | HGTV & Dockside Magazine Features | Roll On Painting',
            description:
              "Roll On Painting featured 5 times on HGTV's Scott's Vacation House Rules and 15 times in Dockside Magazine.",
            h1: 'In The Media',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage' },
          },
          {
            slug: 'careers',
            title: 'Careers | Join Roll On Painting Muskoka',
            description:
              'Hiring skilled painters in Muskoka. Apply by email — join an HGTV-featured, WSIB-covered, $5M insured painting team.',
            h1: 'Careers at Roll On Painting',
            image: DEFAULT_IMAGE,
            jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage' },
          },
        ].map((route) => ({
          ...route,
          bodyHtml: coreRouteBody(route.slug, route.h1, route.description),
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': (route.jsonLd as any)['@type'] ?? 'WebPage',
            '@id': `${SITE_URL}/${route.slug}#webpage`,
            url: `${SITE_URL}/${route.slug}`,
            name: route.title,
            description: route.description,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#business` },
            inLanguage: 'en-CA',
            speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
          },
        }));

        const allRoutes = [
          ...coreRoutes,
          ...parseServiceRoutes('src/data/servicePages.ts'),
          ...parseServiceRoutes('src/data/serviceLocationPages.ts'),
          ...parseLocationRoutes(),
          ...parseCottageOwnerRoutes(),
        ];
        const sitemapRoutes = readSitemapRoutes();

        const seen = new Set<string>();
        for (const route of allRoutes) {
          if (seen.has(route.slug)) continue;
          seen.add(route.slug);
          writeRoute(distDir, route.slug, renderStaticRoute(template, route));
        }

        const generatedRoutes = new Set(['', 'blog', ...posts.map((post) => `blog/${post.slug}`), ...seen]);
        const missingSitemapRoutes = sitemapRoutes.filter((route) => !generatedRoutes.has(route));
        if (missingSitemapRoutes.length > 0) {
          console.warn(
            `[prerender-blog] Missing prerender metadata for sitemap route(s): ${missingSitemapRoutes.join(', ')}`,
          );
        }

        writePrerenderRedirects(
          distDir,
          sitemapRoutes.filter((route) => route && generatedRoutes.has(route)),
        );

        const publishedRouteCount = 1 + posts.length + seen.size;

        console.log(
          `[prerender-blog] Generated ${publishedRouteCount} total static HTML route(s) and exact rewrites for ${sitemapRoutes.length} sitemap URL(s).`,
        );
      } catch (err) {
        console.warn('[prerender-blog] Skipped pre-render:', err);
      }
    },
  };
}
