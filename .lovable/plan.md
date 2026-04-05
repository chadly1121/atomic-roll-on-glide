

# Mobile Optimization Audit & Plan

After reviewing all major components, the site is already well-optimized for mobile in most areas. Here are the specific issues to fix:

## Issues Found

### 1. Footer — 4-column grid stacks poorly on mobile
The footer uses `grid md:grid-cols-4` with no mobile breakpoint, so all 4 columns stack vertically into a very long scroll. On a 390px screen this creates an excessively tall footer.

**Fix**: Use `grid-cols-2` on small screens so columns pair up (Brand + Quick Links, Services + Contact), then `md:grid-cols-4`.

### 2. Testimonials — review metadata wraps awkwardly
The "5-star Google review • Location • Date" line on each card crams too much into one line on mobile, causing unreadable wrapping.

**Fix**: Stack the rating badge and location/date on separate lines below `sm` breakpoint.

### 3. Testimonials — social follow row overflows
The "Follow Us:" text plus 4 social icons in a single row can overflow or feel cramped on narrow screens.

**Fix**: Stack "Follow Us:" above the icon row on mobile.

### 4. Contact section — "Get In Touch" heading uses `section-heading` class
The `section-heading::after` underline uses `left-1/4` + `w-1/2` which can look odd on narrow screens when the heading wraps to two lines.

**Fix**: Use responsive heading size classes like other sections already do.

### 5. Exit Intent Popup — uses `Dialog.Content` incorrectly
This component references `Dialog.Content` as a sub-property, but the shadcn Dialog exports `DialogContent` as a separate named export. This would crash if triggered. Also, it's desktop-only (mouseleave) and doesn't fire on mobile at all.

**Fix**: Either remove it (it does nothing on mobile) or add a scroll-based trigger for mobile users.

### 6. About Section — extra comma in badges array
Line 46 has a trailing comma creating an `undefined` badge entry: `'5x on HGTV',,` — this renders an empty badge pill on all devices.

**Fix**: Remove the extra comma.

### 7. Gallery Grid — uses framer-motion for every card
Each gallery card uses `motion.div` with `whileInView` and `whileHover` animations. On mobile, hover states don't apply and the JS overhead is unnecessary.

**Fix**: Use CSS-only animations for the grid cards, keeping framer-motion only where truly needed (lightbox swipe).

## What's Already Good

- Hero: responsive gradient overlays, proper font scaling, full-width CTA on mobile
- Navbar: hamburger menu with smooth CSS transition (no framer-motion dependency)
- Services: responsive grid (`sm:grid-cols-2 lg:grid-cols-3`)
- Pricing: proper responsive padding and font sizes
- FAQ: accordion works well, touch-friendly CTA buttons
- Floating AI Estimate button: proper mobile sizing with `bottom-4 right-4`
- CSS: 16px input font (prevents iOS zoom), 44px min touch targets, safe-area-inset support, prefers-reduced-motion media query
- Images: lazy loading, explicit dimensions, WebP format

## Implementation Summary

| File | Change |
|------|--------|
| `Footer.tsx` | 2-col grid on mobile |
| `TestimonialsSection.tsx` | Stack metadata + social row on mobile |
| `ContactSection.tsx` | Responsive heading |
| `AboutSection.tsx` | Fix trailing comma bug |
| `ExitIntentPopup.tsx` | Fix Dialog import or remove |
| `GalleryGrid.tsx` | CSS-only animations on mobile |

These are targeted fixes — the site's mobile foundation (touch targets, font sizing, safe areas, responsive grids) is already solid.

