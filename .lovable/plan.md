## Fix Homepage Schema Markup

### Current state

The runtime schema (rendered by `SEOHelmet.tsx` via React Helmet) is **already correct**:
- Address pulls from `businessInfo.address` → 836 Greer Road, Port Sydney
- `aggregateRating`: 4.7 / 15 reviews
- `FAQPage` schema is already generated from the 9 entries in `verifiedFAQs`

The problem is the **static JSON-LD copy in `index.html`** (lines 70–173). It exists so non-JS crawlers (Bing, AI bots, social previews) can read schema without executing React. That static copy has stale data:

- Wrong street/city: `"1-123 Howland Dr"` / `"Huntsville"` (should be 836 Greer Road / Port Sydney)
- Wrong rating: `"4.9"` / `"140"` (should be 4.7 / 15)
- Postal code missing
- No `FAQPage` schema at all

### Changes

**File: `index.html` only** (one file, one JSON-LD `<script>` block)

1. **LocalBusiness `address` block** (lines 86–92) — replace with:
   ```
   "streetAddress": "836 Greer Road",
   "addressLocality": "Port Sydney",
   "addressRegion": "ON",
   "postalCode": "P0B 1L0",
   "addressCountry": "CA"
   ```

2. **LocalBusiness `geo` block** (lines 93–97) — update coordinates from Huntsville (45.3271, -79.2168) to Port Sydney (45.2237, -79.2899) so geo matches the address.

3. **`aggregateRating` block** (lines 110–115) — replace with:
   ```
   "ratingValue": "4.7",
   "reviewCount": "15",
   "bestRating": "5",
   "worstRating": "1"
   ```

4. **Add new `FAQPage` node** to the `@graph` array (after the existing Review nodes, before the closing `]`). It will mirror the 9 verified FAQs already in `src/data/businessInfo.ts` so the static copy stays in sync with what `SEOHelmet.tsx` outputs at runtime. Each entry:
   ```
   {
     "@type": "Question",
     "name": "<question>",
     "acceptedAnswer": { "@type": "Answer", "text": "<answer>" }
   }
   ```
   The 9 questions are exactly those listed in `verifiedFAQs` (How much does it cost…, Do you offer free touch-ups…, What areas…, Are you insured…, What is GoNano…, Is Roll On Painting the company from HGTV…, How do I get a quote…, Do you offer commercial painting…, Do I need to be home for an estimate…).

### What is NOT changed

- `SEOHelmet.tsx` — already correct, no edit needed.
- `src/data/businessInfo.ts` — source of truth, already correct.
- The visible `<dl>` FAQ block in `index.html` (lines 262–275) — not touched. Only schema is added.
- No other pages, components, or routes.

### Validation after the change

1. View source on the homepage → confirm address is `836 Greer Road / Port Sydney`, rating is `4.7 / 15`, and a `FAQPage` `@type` appears in the JSON-LD.
2. Paste the rendered HTML into Google's Rich Results Test (https://search.google.com/test/rich-results) → should show LocalBusiness valid + FAQ valid with 9 questions.
3. No regressions expected — runtime schema (the one Google actually prefers) was already correct, this just brings the static copy in line for non-JS crawlers.

### Note on Bing duplicate-content issue

This change is independent of the SPA-fallback bug we're waiting on Lovable to fix. The schema fix improves the homepage specifically; per-route schema for service/location pages is handled separately by `ServicePageTemplate` and `LocationPageTemplate` (already correct).
