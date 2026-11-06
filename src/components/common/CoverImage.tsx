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
}

// One <img> for every authored cover. The SVG master is the `src` (crisp at
// any density, a few KB); the WebP siblings go in srcSet for browsers that
// prefer raster for the slot. Intrinsic width/height stop layout shift;
// decoding is async; alt describes the picture and its category, never the
// project name (that's adjacent HTML).
const CoverImage: React.FC<CoverImageProps> = ({ cover, className = "", priority = false, sizes }) => (
  <img
    src={cover.src}
    srcSet={cover.srcSet || undefined}
    sizes={cover.srcSet ? sizes || cover.sizes : undefined}
    width={cover.width}
    height={cover.height}
    alt={cover.alt}
    loading={priority ? "eager" : "lazy"}
    decoding="async"
    {...(priority ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
    className={`block w-full h-auto ${cover.flip ? "-scale-x-100" : ""} ${className}`}
  />
);

export default CoverImage;
