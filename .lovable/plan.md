

## Plan: Fix Bing SEO Errors (4 issues)

### Problems identified

Bing found these on the homepage:
1. **Title too long** -- SEOHelmet title is 82 chars (limit ~60)
2. **Meta Description too long** -- SEOHelmet description is 156 chars (limit ~155, but the real issue is duplication making Bing confused)
3. **More than one Meta Description** -- index.html AND SEOHelmet both set it
4. **More than one canonical tag** -- index.html AND SEOHelmet both set it

### Root cause

`index.html` has static SEO tags for non-JS crawlers, but `SEOHelmet.tsx` (via react-helmet-async) injects the same tags again at runtime. Bing sees both.

### Fix

**1. Strip duplicate SEO tags from `index.html`**

Remove from index.html:
- `<meta name="description">` (line 8)
- `<meta name="keywords">` (line 9)
- All OG tags (lines 36-44)
- All Twitter tags (lines 46-51)
- `<link rel="canonical">` and hreflang alternates (lines 54-57)
- Duplicate geo/robots tags that SEOHelmet also sets (lines 25-29)

Keep in index.html: charset, viewport, Content-Language, title (as fallback), favicons, fonts, preloads, JSON-LD, AI discovery links, and analytics.

**2. Shorten the SEOHelmet title** to ~55 chars:
- Current: `Painters Muskoka | HGTV Featured | Huntsville, Bracebridge & Gravenhurst — Roll On Painting` (92 chars)
- New: `Painters Muskoka | HGTV Featured | Roll On Painting` (52 chars)

**3. Trim SEOHelmet meta description** to ~150 chars to stay safe.

### Technical details

- Two files edited: `index.html`, `src/components/layout/SEOHelmet.tsx`
- The static `<title>` in index.html stays as a fallback for non-JS crawlers but react-helmet-async will replace it at runtime
- JSON-LD in index.html stays (it has `id` differentiation and doesn't conflict)

