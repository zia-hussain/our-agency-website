import React from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Above-the-fold usage (e.g. an article's real hero image) should set
   *  this so the browser doesn't lazy-load or deprioritize the LCP
   *  candidate. Defaults to a below-the-fold-safe lazy/auto pair. */
  priority?: boolean;
  /** AVIF/WebP siblings of `src`, same basename convention (foo.jpg ->
   *  foo.avif / foo.webp) — pass explicitly rather than guessing paths, so
   *  a component never references an asset that doesn't exist on disk. */
  avifSrc?: string;
  webpSrc?: string;
  sizes?: string;
  caption?: string;
  credit?: string;
  /** A genuinely different image for narrow viewports — not a resized
   *  version of the same file, but a real alternate composition (e.g. a
   *  dense desktop matrix redrawn as a vertical sequence for mobile).
   *  Served via a <picture> media-query source, so it's a real swap the
   *  browser makes before paint, not a CSS-only visual resize. */
  mobileSrc?: string;
  mobileBreakpoint?: string;
}

// The image-infrastructure counterpart to ArticleVisual: for the cases
// where an article earns a real, indexable editorial image (an original
// diagram, an annotated screenshot, a real project shot) rather than a
// generated visual. <picture> with modern-format sources and a plain JPG/PNG
// fallback, explicit width/height (no CLS), and a priority switch for
// whichever single image is an article's actual LCP candidate. Nothing
// today passes avifSrc/webpSrc — this renders correctly with just `src`
// until those assets exist, so wiring it in early costs nothing.
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  avifSrc,
  webpSrc,
  sizes = "(min-width: 1024px) 800px, 100vw",
  caption,
  credit,
  mobileSrc,
  mobileBreakpoint = "(max-width: 640px)",
}) => {
  // A mobile variant is a genuinely different composition (different aspect
  // ratio on purpose — e.g. a wide desktop matrix redrawn as a tall vertical
  // sequence), so it can't share the desktop's cropped, fixed-ratio box.
  // h-auto lets whichever <source> actually matched render at its own real
  // shape instead of being cropped to the desktop width/height hint.
  const imgClassName = mobileSrc ? `${className ?? ""} h-auto`.trim() : className;

  const img = (
    <picture>
      {mobileSrc && <source srcSet={mobileSrc} media={mobileBreakpoint} />}
      {avifSrc && <source srcSet={avifSrc} type="image/avif" sizes={sizes} />}
      {webpSrc && <source srcSet={webpSrc} type="image/webp" sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // @ts-expect-error fetchpriority isn't in the DOM typings this React version ships
        fetchpriority={priority ? "high" : undefined}
      />
    </picture>
  );

  if (!caption && !credit) return img;

  return (
    <figure className="m-0">
      {img}
      {(caption || credit) && (
        <figcaption className="mt-2 text-xs text-muted-foreground/70">
          {caption}
          {caption && credit ? " — " : ""}
          {credit}
        </figcaption>
      )}
    </figure>
  );
};

export default ResponsiveImage;
