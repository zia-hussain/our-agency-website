import React from "react";
import type { Cover } from "../../data/covers";

interface CoverImageProps {
  cover: Cover;
  className?: string;
  /** The one image that is the page's LCP candidate (a detail-page hero)
   *  loads eagerly with high fetch priority; everything else is lazy. */
  priority?: boolean;
  /** Override the responsive `sizes` hint for the slot this renders in. */
  sizes?: string;
  /** The entity the cover stands for (article or case title). Leads the alt
   *  and fills the title attribute, so the image is tied to its subject for
   *  search and for anyone hovering it — the picture description follows. */
  subject?: string;
}

// One <img> for every authored cover. The SVG master is the `src` (crisp at
// any density, a few KB); the WebP siblings go in srcSet for browsers that
// prefer raster for the slot. Intrinsic width/height stop layout shift;
// decoding is async; alt describes the picture and its category, never the
// project name (that's adjacent HTML).
const CoverImage: React.FC<CoverImageProps> = ({ cover, className = "", priority = false, sizes, subject }) => (
  <img
    src={cover.src}
    srcSet={cover.srcSet || undefined}
    sizes={cover.srcSet ? sizes || cover.sizes : undefined}
    width={cover.width}
    height={cover.height}
    alt={subject ? `${subject} — ${cover.alt}` : cover.alt}
    title={subject || undefined}
    loading={priority ? "eager" : "lazy"}
    decoding="async"
    {...(priority ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
    style={cover.shift ? { objectPosition: cover.shift === 1 ? "40% 45%" : "60% 55%" } : undefined}
    className={`block w-full h-auto ${cover.flip ? "-scale-x-100" : ""} ${cover.shift ? "object-cover scale-[1.06]" : ""} ${className}`}
  />
);

export default CoverImage;
