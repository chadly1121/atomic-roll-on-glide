## Goal

Close the last gap from the Search Console 404 list by 301-redirecting all legacy nested `/index.php/tools/*` URLs (8 known variants, plus any others Google has indexed) to the homepage.

## Change

**Edit `redirect-map.json`** — add one new wildcard entry:

```json
{
  "source": "/index.php/tools/*",
  "destination": "/",
  "status": 301
}
```

Cloudflare Pages `_redirects` natively supports `*` wildcards in the source, so this single rule covers every URL under `/index.php/tools/...` including the 8 already flagged in Search Console plus any future variants Google surfaces.

## How it deploys

1. CI runs `bun run generate:redirects` → regenerates `public/_redirects` from the updated map.
2. Validator confirms `/` is in `VALID_DESTINATIONS` (already used by 9+ existing entries — will pass).
3. Cloudflare Pages picks up the new `_redirects` file on deploy.
4. IndexNow ping fires automatically post-deploy to nudge Bing.

## Verification after deploy

Test with: `curl -I https://www.roll-onpainting.com/index.php/tools/Port-Carling.html`
Expected: `HTTP/2 301` with `location: https://www.roll-onpainting.com/`

## Out of scope

- The 51 already-redirected URLs need no action — Google will clear them on its next recrawl (typically 2–6 weeks).
- No sitemap change needed (these legacy paths aren't in the sitemap).
