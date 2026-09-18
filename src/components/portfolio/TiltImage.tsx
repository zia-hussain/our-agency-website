import React from "react";
import TiltFrame from "./TiltFrame";

interface TiltImageProps {
  src: string;
  alt: string;
  className?: string;
  frameClassName?: string;
  // "cover" (default) fills the frame and crops — right for photography.
  // "contain" shows the whole image — required for a hand-authored diagram
  // whose edge-to-edge text a cover-crop would cut off (e.g. the Fast Track
  // recovery-timeline SVG, authored at a wider aspect than the 4:3 frame).
  fit?: "cover" | "contain";
  // A genuinely different composition for narrow viewports (not a resized
  // copy) — see ResponsiveImage's identical mobileSrc for the rationale.
  // Swaps via a <picture> media-query source, so it's a real image change,
  // not a CSS scale-down of the desktop diagram's already-small text.
  mobileSrc?: string;
}

const TiltImage: React.FC<TiltImageProps> = ({ src, alt, className = "", frameClassName = "", fit = "cover", mobileSrc }) => (
  <TiltFrame frameClassName={frameClassName}>
    <picture>
      {mobileSrc && <source srcSet={mobileSrc} media="(max-width: 640px)" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full ${fit === "contain" ? "object-contain bg-background" : "object-cover"} ${className}`}
      />
    </picture>
  </TiltFrame>
);

export default TiltImage;
