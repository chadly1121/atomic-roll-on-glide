# Roadmap — Soro blog migration

- [ ] Restructure blog data: `src/data/blog/index.ts` (metadata) + `src/data/blog/posts/<slug>.ts` (bodies, code-split)
- [ ] Move the 6 existing posts into the new structure
- [ ] Import 44 Soro articles (tags, author, SEO fields, content scan/fixes)
- [ ] Download 44 featured images to `public/lovable-uploads/blog/`, rewrite image fields
- [ ] Update `public/sitemap.xml`, `supabase/functions/blog-sitemap/index.ts` POSTS, `scripts/seo-routes.mjs`
- [ ] Remove `SoroBlogEmbed` from BlogPage
- [ ] Build `scripts/sync-soro.mjs` (idempotent incremental ingestion)
- [ ] Add `.github/workflows/sync-soro.yml` (weekly cron, opens PR, GITHUB_TOKEN only)
- [ ] Verify: typecheck, build, SEO sitemap/blog sync assertion
