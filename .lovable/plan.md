## Hardened Production Deployment Pipeline — Revised Plan

### Context: what already exists

Before committing to your spec, here's what's already in the repo so we don't rebuild working systems:

| Asset | Status |
|---|---|
| `.github/workflows/deploy.yml` | Exists. 4 jobs: build → prerender → assert → deploy to Cloudflare Pages. Uses npm + Playwright + wrangler. |
| `scripts/prerender.mjs` | Exists. Playwright-based, reads sitemap, waits for Helmet to flush, writes `dist/<route>/index.html`. |
| `scripts/assert-seo.mjs` | Exists. Checks title/desc/canonical presence + uniqueness on sample routes; enforces `llms.txt ≥ 1,800 words` and `llms-full.txt ≥ 3,800 words`. |
| `public/_redirects` | Exists. Handcrafted, 14 lines. Used by Cloudflare Pages. |
| `src/data/legacyRedirects.ts` | Exists. ~50 client-side legacy `.html`/`.php` redirects handled by `LegacyRedirect` React component (meta-refresh). |
| `public/llms.txt` | Exists, **2,121 words** (already exceeds your 300-word minimum). |
| `public/llms-full.txt` | Exists, **4,417 words** (already exceeds your 1,500-word minimum). |
| `public/lovable-uploads/`, `public/partner-logos/` | Both in `public/`. Vite copies them to `dist/` automatically — **no manual copy step needed**. The "broken images" risk in your spec does not apply to this project. |
| Cloudflare Pages deploy via wrangler | Working, on `main` push. |

### Honest assessment of your spec

A few items in the spec would be downgrades or duplicate existing logic. I'm flagging them rather than silently implementing:

1. **`bun` vs `npm`**: Repo uses `npm ci` + `package-lock.json` today. Switching to `bun install --frozen-lockfile` requires committing `bun.lock` and removing `package-lock.json`. Doable, but pure churn unless you want it. **Recommend: stay on npm.**
2. **Manual `cp lovable-uploads/ partner-logos/ dist/` step**: Unnecessary. Vite's `publicDir` already handles this. Adding it would mask future regressions. **Recommend: skip.**
3. **`redirect-map.json` + `generate-redirects.mjs`**: The current `public/_redirects` is 14 lines, mostly a single www-canonicalization block + SPA fallback. The 50 legacy `.html` redirects live in `src/data/legacyRedirects.ts` (client-side meta-refresh). Two reasonable paths:
   - **(A) Status quo** — keep them split (server-level canonicalization in `_redirects`, app-level legacy in `LegacyRedirect`). Cleanest, no migration risk.
   - **(B) Unify** — move all 50 legacy entries into `redirect-map.json`, generate `_redirects` so Cloudflare does true 301s (better for SEO than meta-refresh), then delete `LegacyRedirect.tsx` + `legacyRedirects.ts`.
   I recommend **(B)** because real 301s pass link equity better than meta-refresh, but it's a meaningful refactor. Confirm before I do it.
4. **Lower `llms.txt` thresholds (300 / 1,500)**: Current assertions are stricter (1,800 / 3,800) and the files already pass. Lowering = regression. **Recommend: keep stricter thresholds.**
5. **`build:base` script**: Identical to `build` per your spec. Adding both is redundant. **Recommend: just `build` (drop `remove-large-assets.mjs` from it, run that as a separate `prebuild:cleanup` step if needed).**
6. **`environment: production` on deploy job + staging subdomain**: Good additions. Your current workflow has neither. Will add.
7. **Lovable custom-domain decoupling**: Lovable's Publish currently serves `atomic-roll-on-glide.lovable.app` and the custom domains are pointed at Cloudflare. To formalize "Lovable → `staging.roll-onpainting.com` only" you need to (a) add `staging.roll-onpainting.com` as a Lovable custom domain in Project Settings → Domains, (b) leave `www.roll-onpainting.com` / apex pointed at Cloudflare. **I cannot do (a) for you — it's a manual click in Lovable settings + a CNAME in Cloudflare DNS.** I'll document the steps in `.lovable/plan.md`.

### Revised plan I'll execute (after your approval)

#### Workflow hardening (`.github/workflows/deploy.yml`)
Keep 4-job structure. Concrete changes:
- Rename jobs to your naming: `install-and-build`, `prerender`, `seo-assertions`, `deploy`.
- Add **Playwright browser cache** keyed on `${{ runner.os }}-playwright-${{ hashFiles('package-lock.json') }}-${{ steps.pw-version.outputs.version }}`.
- Add **upload Playwright traces/logs** as artifact on prerender failure.
- Add `environment: production` and `if: github.ref == 'refs/heads/main'` to deploy job (currently runs on any push to main, which is the same effect, but explicit is better).
- Keep existing `verify-prerendered-source.mjs` step and IndexNow ping.
- Stay on `npm ci` (not bun).
- **Skip** the manual `cp lovable-uploads partner-logos` step (Vite handles it).

#### SEO audit hardening (`scripts/assert-seo.mjs`)
Extend (not replace) the existing script with the strict checks from your spec:
- Add: every priority route's `index.html` contains a non-empty `<h1>` and real body text (>500 chars after stripping `<script>`/`<style>`), not just a CSR shell.
- Add: canonical self-references the route's own URL on `https://www.roll-onpainting.com`.
- Keep: title/desc/canonical presence + uniqueness, llms word counts (at current 1,800 / 3,800 thresholds).
- Expand the priority-route sample from 14 to ~25 routes covering each page template.

#### Redirect handling
**Pending your choice (A or B above).** Default to (A) — leave alone — unless you confirm (B).

#### Files NOT created (and why)
- `redirect-map.json`, `scripts/generate-redirects.mjs` — only if you pick option (B).
- New `public/llms.txt` / `public/llms-full.txt` — already exist and exceed your thresholds.
- `bun.lock` migration — not needed.

#### Files updated
- `.github/workflows/deploy.yml` — caching, naming, explicit environment, failure-log upload.
- `scripts/assert-seo.mjs` — add H1/body-content/self-canonical checks, expand sample list.
- `package.json` — add `prerender`, `audit:seo` script aliases pointing at existing scripts (so spec's command names work without renaming files).
- `.lovable/plan.md` — document architecture decisions: GitHub = source of truth, Cloudflare = host, Lovable = editor only, staging-subdomain-only policy, **manual steps required from you** (Cloudflare DNS for `staging`, Lovable Project Settings to add staging custom domain, do NOT add apex/www custom domain in Lovable).

### Technical details

```text
GitHub push to main
   │
   ▼
[install-and-build]  npm ci → npm run build → upload dist-base
   │
   ▼
[prerender]  download dist-base → cached Playwright Chromium
             → node scripts/prerender.mjs (visits 111 sitemap URLs)
             → upload dist-prerendered (+ traces on failure)
   │
   ▼
[seo-assertions]  download dist-prerendered
                  → node scripts/assert-seo.mjs (extended)
                  → node scripts/verify-prerendered-source.mjs
                  → upload dist-audited
   │
   ▼ (if refs/heads/main, environment: production)
[deploy]  download dist-audited
          → wrangler pages deploy --project-name roll-onpainting --branch main
          → node scripts/indexnow-ping.mjs
```

Required GitHub secrets (already configured, used by current workflow): `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

### Two questions before I execute

1. **Redirects:** option (A) leave the split as-is, or (B) unify into `redirect-map.json` + generated `_redirects` + delete `LegacyRedirect`?
2. **npm vs bun:** stay on npm (recommended), or migrate to bun?

Once you answer, I'll switch to build mode and implement.