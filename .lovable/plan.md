# App-shell files for unlisted portal routes

## Confirmed before implementation

Production serves the same hashed JavaScript and CSS assets as the current local build at commit `4d30e10`. The deploy did run, and the deployed `200!` rules still return the custom 404 page for `/login` and authenticated deep links.

## Changes

1. Extend the prerender build step to copy the built SPA `index.html` unchanged into route-shaped shell files for these landing paths:
   - `/login`
   - `/reset-password`
   - `/portal`
   - `/payment-success`
   - `/.lovable/oauth/consent`
   - `/admin`
   - `/client`
2. Do not open those routes in Playwright, render authenticated content, add them to the sitemap, or alter their indexing behavior. The copied shell retains the existing noindex behavior supplied by the application.
3. Preserve the current `200!` rules, custom `404.html`, sitemap, blog content, and business address.
4. Update the SEO assertion so every landing route above must have both:
   - its route-shaped shell file in `dist/`
   - a matching forcing `200!` rule in `public/_redirects`
5. Keep the assertion’s explicit limitation: generated-file checks cannot prove Cloudflare’s runtime handling of wildcard child paths.

## Validation

- Generate redirects, build, prerender, and run the full SEO assertions.
- Confirm shell files are byte-identical to the built SPA shell and contain an empty app root rather than authenticated content.
- Verify unknown routes still resolve to `404.html` locally.
- After deployment, recheck `/login`, the other landing routes, authenticated child paths, and a deliberately nonexistent path against production. Report child-path failures plainly if Cloudflare still ignores the wildcard rewrites.
