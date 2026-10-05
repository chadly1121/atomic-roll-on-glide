# Agent rules
- Cloudflare Pages Functions live in /functions (blog.ts); _routes.json include is ONLY FUNCTION_ROUTES in generate-redirects.mjs (/blog) — why: keeps every other path on the static layer, and this exact shape is known to deploy.
- Trailing-slash URLs are canonical (canonical tags, og:url, sitemap) — why: Cloudflare Pages 308s /route to /route/ before _redirects runs.
