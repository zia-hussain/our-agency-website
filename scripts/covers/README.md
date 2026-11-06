# Cover system

One authored family of category-led visuals for portfolio and article cards
(see `src/data/covers.ts` for which page gets which cover and why).

- `build-covers.mjs` — regenerates the SVG masters in `public/project_images/covers`
- `build-case-covers.mjs` — the eleven case-specific covers (aperture, crate tag, spines, rings, vial, stair, cloth stack, speaker, hex nut, pet tag, ember); same scene helpers (`scene.mjs`), registered per slug in `src/data/covers.ts` (`CASE_COVERS`) and in `render-covers.mjs`
  and `public/article_images/covers`.
- `render-covers.mjs` — renders 800/1600 PNG rasters and the share images
  (category OGs, `public/og/portfolio-<slug>.png`, `public/og/articles-<slug>.png`)
  with Playwright. Then `python3 to-webp.py` (rasters → WebP) and
  `python3 compress-og.py` (quantise OG PNGs).
- `render-founder-og.mjs` — `public/og/founder-<slug>.png`.

Rules: no text in the artwork, no client UI, no stock. Titles, clients,
quotes and headlines stay in HTML.
