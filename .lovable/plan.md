

## Plan: Fix SPA Duplicate Content for Bing

### Problem
Every URL on the site returns the same `index.html` with homepage-specific `<title>` ("Painters Muskoka | HGTV Featured | Roll On Painting"). When Bing doesn't fully execute JS, all 128+ pages look identical to the homepage — causing them to be flagged as duplicates.

### Fix

**1. Generic static title in `index.html`** (line 7)
- Change from: `Painters Muskoka | HGTV Featured | Roll On Painting`
- Change to: `Roll On Painting`
- SEOHelmet still sets the proper optimized title at runtime for JS-capable crawlers

**2. Add SPA fragment hint** in `index.html` `<head>`
- Add `<meta name="fragment" content="!">` to signal crawlers this is a JS-rendered app

### Files changed
- `index.html` — 2 small edits in `<head>`

No other files affected. SEOHelmet.tsx already has the correct 52-char title.

