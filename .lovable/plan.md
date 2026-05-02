# Add Logo to Homepage Hero Heading

## Goal
Make the Roll On Painting pink logo visible and recognizable directly alongside the main "Muskoka House Painters" headline on the homepage hero.

## Layout
- **Desktop (sm and up)**: Logo sits to the **right** of the "Muskoka House Painters" heading block, vertically centered.
- **Mobile (< sm)**: Logo stacks **above** the heading, centered.

```text
Desktop:                          Mobile:
[ Muskoka House Painters ]  [LOGO]      [ LOGO ]
[ Huntsville, Bracebridge…  ]           [ Muskoka House Painters ]
                                        [ Huntsville, Bracebridge… ]
```

## Implementation
**File:** `src/components/hero/HeroContent.tsx`

1. Wrap the existing `<div>` containing the H1, subline, and trust paragraph (lines 25–38) in a flex container:
   - `flex flex-col-reverse sm:flex-row sm:items-center sm:gap-6`
   - `flex-col-reverse` ensures the logo (placed after the text in DOM) appears **above** on mobile while staying on the **right** on desktop.
2. Add the logo as a sibling after the text block:
   ```tsx
   <img
     src="/lovable-uploads/9058a595-b38f-4cdc-893a-19baaccf57d5.webp"
     alt="Roll On Painting logo"
     width={160}
     height={160}
     loading="eager"
     className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain mx-auto sm:mx-0 flex-shrink-0"
   />
   ```
3. No other files need to change — the asset already exists at that path (it's the same logo used in the navbar/footer).

## Notes
- Uses `loading="eager"` and explicit width/height so it doesn't hurt LCP or cause layout shift.
- Reuses the existing brand asset path — no new uploads, no SEO/Open Graph changes.
- Pure CSS/markup change; no logic, routes, or data touched.
