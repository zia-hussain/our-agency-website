import React from "react";
import TiltFrame from "./TiltFrame";

interface TiltImageProps {
  src: string;
  alt: string;
  className?: string;
  frameClassName?: string;
}

const TiltImage: React.FC<TiltImageProps> = ({ src, alt, className = "", frameClassName = "" }) => (
  <TiltFrame frameClassName={frameClassName}>
    <img src={src} alt={alt} loading="lazy" className={`w-full object-cover ${className}`} />
  </TiltFrame>
);

export default TiltImage;
