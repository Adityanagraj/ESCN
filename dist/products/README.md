# Product images

Drop product photos in this folder. They are served as static assets at
`/products/<filename>`. The active filenames are wired in `src/data/brand.ts`
under each product's `images: string[]`.

## What's here today

| Product                       | Cover file                  |
| ----------------------------- | --------------------------- |
| King Kohli Shadow Box         | `king-kohli-frame.png`      |
| Ee Sala Cup Namde Frame       | `champions-frame.png`       |
| Play Bold Bobblehead Frame    | `play-bold-frame.png`       |
| Hero (Kohli portrait)         | `hero-virat.png`            |

The first entry in each product's `images[]` is the **cover** — it's what
shows in the compare grid and the footer thumb. The rest fill the in-page
gallery + zoom lightbox.

## Add more angles per product

Suggested set per frame (4 shots = enough to sell):

1. **Cover** — clean front, full frame, on a neutral wall.
2. **Three-quarter** — angled to show depth of the shadow box.
3. **Detail** — close-up on bat / trophy / bobblehead / engraving.
4. **Lit on a wall** — LED bezel glowing in dim lighting, in-room context shot.

### Naming convention

Pattern: `<product-slug>-<angle>.png`

```text
king-kohli-frame.png           ← cover (already here)
king-kohli-frame-angle.png     ← three-quarter
king-kohli-frame-detail.png    ← close-up
king-kohli-frame-lit.png       ← lit-on-wall

champions-frame.png            ← cover (already here)
champions-frame-angle.png
champions-frame-trophy-detail.png
champions-frame-lit.png

play-bold-frame.png            ← cover (already here)
play-bold-frame-angle.png
play-bold-frame-bobblehead-detail.png
play-bold-frame-lit.png
```

After dropping them in, uncomment the matching lines in
`src/data/brand.ts` (look for the `TODO: add more angles` comments).

## Image specs

- **Format**: PNG (transparent bg) or high-quality JPEG. PNG preferred for
  the cover so the frame floats cleanly over the dark site background.
- **Resolution**: 1600 × 1200 minimum. The lightbox lets buyers zoom in up
  to 5x — anything below this looks pixelated under zoom.
- **Aspect**: roughly 4:3 to 5:4. The gallery card auto-letterboxes via
  `object-contain` so other ratios work, they just leave more empty space.
- **Weight**: keep each file under ~400 KB after compression. Run them
  through https://squoosh.app or `npx @squoosh/cli` before committing.
- **Background**: solid black, charcoal, or transparent — anything that
  blends with the site's `bg-rcb-surface` (#16191e-ish).
