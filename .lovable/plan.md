# Bring the 44 Soro articles into the site as real blog pages

Today those 44 articles only exist inside a third-party script on `/blog`. They share one web address and one page heading, so search engines see them as a single page. This plan moves the articles into the site itself, with their own addresses, their own images, and full search-engine markup.

## What I verified (all numbers are measured, not estimated)

- **44 articles**, all with full bodies. Total body text: **408,376 characters**, average 9,281.
- **Metadata only** (id, title, slug, excerpt, date, image) for all 44: **24.9 KB raw**, roughly 7–8 KB compressed.
- **44 distinct featured images**, all `.webp`, on Soro's storage. **Zero inline images inside article bodies** — nothing else to download.
- **No slug collisions** with the 6 existing posts.
- **Content is clean**: no Bowmanville, Collingwood or Midland; no phone numbers at all; no links at all; no addresses; no `missedaspot.sky-quote.com`; no `rollonpainting.com`. The only two "Barrie" matches are the word "barrier" ("protective barrier") — not the town.
- Article dates run **2026-07-10 to 2026-09-21**.
- Bodies contain no `<h1>`, so they slot into the existing post layout without duplicate headings.

### One thing to correct in your brief
The Soro records carry only `id, title, slug, excerpt, date, isoDate, image` plus the body. They have **no tags, no author, no separate meta description or keywords**. The 6 local posts have all of those. So each imported post will get: summary and meta description from the excerpt, author Chad Gilchrist, and tags derived from the article subject. I will generate tags from the title/subject unless you would rather they ship with none.

## Structure (fixes the bundle-size problem)

Today `localBlogPosts.ts` (67 KB) is imported by `useBlogFeed`, which both `/blog` and every post page use — so all article text is downloaded by every visitor, including on the homepage. Adding 408 KB of new text that way is not acceptable.

New shape:

```text
src/data/blog/index.ts        metadata for all 50 posts (~30 KB, always loaded)
src/data/blog/posts/<slug>.ts one file per post, exporting content_html only
```

- `useBlogFeed` returns metadata only — the `/blog` index and "related posts" never touch article bodies.
- Post pages load their own body on demand via `import.meta.glob('./posts/*.ts')`, so Vite emits one small chunk per article and a visitor downloads exactly one.
- Net effect: the blog list payload drops from ~67 KB to ~30 KB despite going from 6 to 50 posts; each article page adds ~9 KB.
- The 6 existing posts move into the same structure, so there is one system, not two.

## Images

Download all 44 `.webp` featured images into `public/lovable-uploads/blog/` with descriptive, slug-based filenames (good for image search), and point every `image` field at the local path. No inline image rewriting is needed — there are none. After this, nothing on the site depends on Soro's storage.

## Search-engine plumbing

- Add all 44 slugs to `public/sitemap.xml` and to `POSTS` in `supabase/functions/blog-sitemap/index.ts` — the build assertion in `scripts/assert-seo.mjs` fails otherwise.
- Add a representative sample of the new posts to `scripts/seo-routes.mjs` so the strict audit covers them (the prerender step already covers every sitemap URL, so all 44 get prerendered).
- Each post keeps its original publish date, gets its own canonical address, title, description and Article markup from the existing post page.
- Old query-string addresses (`/blog?post=<slug>`) are the same page as `/blog` to a crawler; the new `/blog/<slug>` pages become the indexable version. No redirects are possible or needed for query strings, but I will confirm nothing in `_redirects` conflicts.

## The embed

**Remove `SoroBlogEmbed` from `src/pages/BlogPage.tsx`.** I agree with you: leaving it would list all 44 articles twice and keep a third-party script overwriting the page title. Removal happens in the same change as the import, so there is never a moment with duplicates or missing content.

## Verification before finishing

- 50 posts on `/blog`, each opening at its own address with its own heading, title and canonical.
- No request to `app.trysoro.com` or `afocirmbqdxnkyescnev.supabase.co` anywhere on the site.
- Sitemap/post sync assertion passes; typecheck and build clean.
- The 6 original posts still resolve unchanged.

## Sequencing note

This is large: 44 new content files, 44 images, plus the restructure. It is still one commit and one push, matching the CI constraint.
