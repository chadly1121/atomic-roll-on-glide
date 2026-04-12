

# Redirect Legacy URLs to Preserve SEO Equity

## Why This Matters
~30 of these old URLs have direct equivalents in the new site. Each one carries crawl history and potential backlink value. Redirecting them (instead of letting them 404) transfers that authority to your new pages — free ranking boost.

## What We'll Build

### 1. Legacy URL redirect map
Create `src/data/legacyRedirects.ts` containing a map of ~30 old `.html`/`.php` paths to their new equivalents.

### 2. Redirect component
Create `src/components/LegacyRedirect.tsx` — a React component that checks if the current path matches a legacy URL and performs a client-side redirect with a `<meta http-equiv="refresh">` tag (which Google treats similarly to a 301 for client-rendered sites).

### 3. Route integration
Add a catch-all route in `App.tsx` before the `*` NotFound route that handles `.html` and `.php` paths through the redirect component.

### 4. Update robots.txt
Add a `Disallow` for the `index.php/tools/` junk paths so Google stops crawling them.

## Technical Details
- The redirect component will render both a `<meta http-equiv="refresh" content="0;url=/new-path">` and a JS `window.location.replace()` for immediate redirect
- For the ~15 URLs with no equivalent, they'll continue to 404 naturally — this is correct behavior and Google will eventually de-index them
- The `index.php/tools/*` duplicates are crawler artifacts and should be blocked in robots.txt

## After Implementation
In Google Search Console:
1. Do NOT use the URL removal tool
2. Instead, use "Inspect URL" on a few redirected URLs to verify Google sees the redirect
3. The 404s will gradually clear as Google re-crawls and follows the redirects
4. For the ~15 truly dead URLs, you can optionally use the removal tool since they have no new equivalent

