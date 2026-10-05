# Agent rules
- Cloudflare Pages Functions live in /functions (_middleware.ts); _routes.json include is ONLY FUNCTION_ROUTES in generate-redirects.mjs (/blog, /blog/, /blog/*) — why: keeps every other path on the static layer.
- Trailing-slash URLs are canonical (canonical tags, og:url, sitemap) — why: Cloudflare Pages 308s /route to /route/ before _redirects runs.
