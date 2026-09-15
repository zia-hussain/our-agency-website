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
}) => {
  const img = (
    <picture>
      {avifSrc && <source srcSet={avifSrc} type="image/avif" sizes={sizes} />}
      {webpSrc && <source srcSet={webpSrc} type="image/webp" sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
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
