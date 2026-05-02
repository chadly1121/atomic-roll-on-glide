## Goal

Make your blog 100% self-hosted from the codebase. No more GetAutoSEO fetches. Your 3 existing local posts become the canonical source, and any new posts you write get added the same way.

## Current state

- Posts live in two places: `src/data/localBlogPosts.ts` (3 posts, yours) and a live fetch from `getautoseo.com` in `src/hooks/useBlogFeed.ts`.
- I checked the GetAutoSEO feed — it's already returning empty (your cancellation took effect), so there's nothing extra to "copy back". You already have everything.
- The `blog-sitemap` Supabase edge function also pulls from GetAutoSEO to build `/blog-sitemap.xml`.

## Changes

### 1. `src/hooks/useBlogFeed.ts`
- Remove the `fetch(FEED_URL)` call entirely.
- Return `localBlogPosts` directly (still computing `readingTime`, sorted by date).
- Keep the same hook API (`items`, `loading`, `error`, `retry`, `getBySlug`) so `BlogPage.tsx`, `BlogPostPage.tsx`, and `RelatedPosts.tsx` keep working unchanged.
- Drop `loading`/`error` states to trivial values (no network = always loaded).

### 2. `supabase/functions/blog-sitemap/index.ts`
- Stop fetching GetAutoSEO.
- Hardcode the 3 local post slugs + `lastmod` dates, generated from a small embedded list. (Each time you add a post, you add one line here too — same pattern as `localBlogPosts.ts`.)
- Keeps the existing sitemap URL working so Bing/Google don't see a broken endpoint.
- Alternative: just delete this function and rely on `public/sitemap.xml` for blog URLs. Let me know which you prefer (default: keep it, hardcoded).

### 3. `src/data/localBlogPosts.ts`
- No structural change. This stays your "CMS". Add a new entry to the array → new post goes live on next deploy.
- I'll add a clearer header comment explaining the workflow for adding a post (id, slug, title, summary, image, tags, dates, content_html).

### 4. Cleanup
- Remove the merge logic and `FEED_URL` constant.
- Remove the now-unused remote-fetch error UI in `BlogPage.tsx` (Retry button, error skeleton paths).

## How you add a new blog post going forward

1. Open `src/data/localBlogPosts.ts`.
2. Copy an existing entry, change the `id`, `slug`, `title`, `summary`, `image`, `tags`, `date_published`, `date_modified`, and `content_html` (HTML string with your article body).
3. Add the same slug + date to the sitemap function's list (one line).
4. Push. Done — IndexNow pings Bing automatically on deploy.

## Out of scope

- No new admin UI / database-backed CMS. You said you'll author posts yourself like the 3 existing ones — keeping it as code-as-content is simpler, faster, and free.
- If you later want a true CMS (write posts in the browser, no code), that's a separate project (Supabase table + simple admin page). Say the word.
