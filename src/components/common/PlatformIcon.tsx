import React from "react";

type Platform = "Fiverr" | "Upwork" | "Google" | "Trustpilot" | "Clutch";

const PATHS: Partial<Record<Platform, string>> = {
  Upwork:
    "M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z",
  Google:
    "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
  Trustpilot:
    "M17.227 16.67l2.19 6.742-7.413-5.388 5.223-1.354zM24 9.31h-9.165L12.005.589l-2.84 8.723L0 9.3l7.422 5.397-2.84 8.714 7.422-5.388 4.583-3.326L24 9.311z",
};

// Fiverr and Clutch don't read cleanly as tiny monochrome glyphs at this size —
// a plain letter monogram stays legible where the real mark turns to mush.
const MONOGRAMS: Partial<Record<Platform, string>> = {
  Fiverr: "Fi",
  Clutch: "C",
};

const PlatformIcon: React.FC<{ platform: Platform; size?: number; className?: string }> = ({
  platform,
  size = 14,
  className = "",
}) => {
  const monogram = MONOGRAMS[platform];
  if (monogram) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full border border-current font-bold leading-none flex-shrink-0 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.52 }}
        aria-hidden="true"
      >
        {monogram}
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={`flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d={PATHS[platform]} />
    </svg>
  );
};

export default PlatformIcon;
