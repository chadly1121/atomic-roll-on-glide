# Agent rules
- Cloudflare Pages Functions live in /functions (blog.ts); _routes.json include is ONLY FUNCTION_ROUTES in generate-redirects.mjs (/blog) — why: keeps every other path on the static layer, and this exact shape is known to deploy.
- Trailing-slash URLs are canonical: canonical tags, og:url, sitemap AND redirect-map.json targets ("/" stays "/"); generate-redirects.mjs fails on a no-slash target — why: Cloudflare Pages 308s /route to /route/ before _redirects runs, so no-slash targets double-hop.
- Prerender gates are fatal after 2 retries; canonical mismatch is fatal immediately; any failed route fails the build; the prerender server always serves a pristine shell snapshot — why: half-hydrated captures shipped silently and failed the audit only sometimes.
- public/_headers must have no overlapping rules (Cloudflare concatenates every match; splats cross "/") — why: overlaps doubled Cache-Control on every response.
