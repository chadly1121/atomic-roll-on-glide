## Production Deployment Architecture (locked)

### Pipeline (do NOT modify without team approval)

```text
Lovable editor (preview only)
    │ auto-syncs commits
    ▼
GitHub  ←  source of truth
    │ push to main
    ▼
GitHub Actions (.github/workflows/deploy.yml)
    1. install-and-build   bun install → generate:redirects → bun run build
    2. prerender           Playwright → dist/<route>/index.html
    3. seo-assertions      audit:seo (strict) + verify-prerendered-source
    4. deploy              wrangler pages deploy → Cloudflare Pages
                           IndexNow ping
    ▼
Cloudflare Pages (static host)  →  www.roll-onpainting.com
```

### Domain policy

| Domain | Hosted by | Purpose |
|---|---|---|
| `www.roll-onpainting.com` | Cloudflare Pages | **Production** |
| `roll-onpainting.com` (apex) | Cloudflare Pages (301 → www) | Production canonical |
| `staging.roll-onpainting.com` | Lovable Publish | **Staging only** |
| `*.lovable.app` | Lovable | Internal preview |

**Rule: Lovable Publish must NEVER point at the apex/www domain.** Only at `staging.roll-onpainting.com`.

#### Manual setup steps (cannot be automated from inside Lovable)

1. In Cloudflare DNS, add: `staging` CNAME → `atomic-roll-on-glide.lovable.app` (proxied OFF, "DNS only").
2. In Lovable → Project Settings → Domains, add custom domain `staging.roll-onpainting.com`.
3. In Lovable → Project Settings → Domains, **do not** add `www.roll-onpainting.com` or the apex. Those stay on Cloudflare Pages.
4. In Cloudflare Pages dashboard, confirm the project `roll-onpainting` has both `roll-onpainting.com` and `www.roll-onpainting.com` attached.

### Source of truth files

- `redirect-map.json` — every legacy `.html`/`.php` 301 redirect. Edit this, never edit `public/_redirects` directly.
- `scripts/seo-routes.mjs` — every valid SPA destination. Anything outside `VALID_DESTINATIONS` is rejected by `generate:redirects`. `PRIORITY_ROUTES` are audited strictly.
- `public/llms.txt`, `public/llms-full.txt` — hand-curated AI knowledge bases. Audit enforces ≥1,800 / ≥3,800 words.

### What changed (vs. previous architecture)

| Before | After |
|---|---|
| `npm ci` in CI | `bun install --frozen-lockfile` (faster, deterministic) |
| `public/_redirects` hand-edited | Auto-generated from `redirect-map.json` (no duplicates, no cycles, no dead destinations) |
| Legacy redirects via React `<LegacyRedirect>` meta-refresh | True 301s served by Cloudflare. Removed `src/components/LegacyRedirect.tsx` and `src/data/legacyRedirects.ts`. |
| `assert-seo.mjs` checked title/desc/canonical presence on 14 routes | Checks H1, body content, self-canonical, dedup tags on 47 priority routes. |
| Deploy ran on every push to main, no env gate | Deploy job has `if: github.ref == 'refs/heads/main' && github.event_name == 'push'` and `environment: production` for protection rules. |
| No Playwright cache | Cached by OS + Playwright version + lockfile hash. |
| No failure logs preserved | `playwright-logs` artifact uploaded on prerender failure. |

### Architectural constraints (do NOT reverse)

- Cloudflare Pages is the **only** production host. Lovable Publish is for staging.
- Redirects live in `redirect-map.json`. Adding to `public/_redirects` directly will be overwritten on next CI run.
- New SPA routes MUST be added to `scripts/seo-routes.mjs` (in `VALID_DESTINATIONS` and, if user-facing, also `PRIORITY_ROUTES`) before any redirect can target them.
- `public/llms.txt` and `public/llms-full.txt` are length-gated. Trimming below the thresholds breaks the build by design.
- Vite copies `public/` to `dist/` automatically. Do NOT add manual `cp` steps for `lovable-uploads/` or `partner-logos/` in CI.
