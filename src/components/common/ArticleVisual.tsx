import React from "react";

interface ArticleVisualProps {
  title: string;
  category?: string;
  variant?: "card" | "hero";
}

const ArticleVisual: React.FC<ArticleVisualProps> = ({
  title,
  category,
  variant = "card",
}) => {
  const isHero = variant === "hero";
  const uid = `av-${title.slice(0, 8).replace(/\s/g, "")}`;

  const titleFontSize = isHero ? 54 : 34;
  const titleLineHeight = isHero ? 60 : 40;
  const maxCharsPerLine = isHero ? 30 : 30;

  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  const clampedLines = lines.slice(0, isHero ? 4 : 3);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "16/9",
        borderRadius: isHero ? "16px" : "0px",
      }}
    >
      <svg
        viewBox="0 0 800 450"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d0c0b" />
            <stop offset="50%" stopColor="#111009" />
            <stop offset="100%" stopColor="#0a0908" />
          </linearGradient>

          <radialGradient
            id={`glow1-${uid}`}
            cx="62%"
            cy="38%"
            r="55%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C48A64" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#C48A64" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#C48A64" stopOpacity="0" />
          </radialGradient>

          <radialGradient
            id={`glow2-${uid}`}
            cx="20%"
            cy="72%"
            r="40%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#8B5E3C" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8B5E3C" stopOpacity="0" />
          </radialGradient>

          <filter id={`noise-${uid}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
              result="noiseOut"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.045 0"
              in="noiseOut"
              result="alphaedNoise"
            />
            <feBlend in="SourceGraphic" in2="alphaedNoise" mode="screen" />
          </filter>

          <filter id={`gblur-${uid}`}>
            <feGaussianBlur stdDeviation="72" />
          </filter>

          <filter id={`gblur2-${uid}`}>
            <feGaussianBlur stdDeviation="56" />
          </filter>

          <clipPath id={`clip-${uid}`}>
            <rect width="800" height="450" />
          </clipPath>
        </defs>

        <g clipPath={`url(#clip-${uid})`}>
          <rect width="800" height="450" fill={`url(#bg-${uid})`} />

          <circle
            cx="495"
            cy="170"
            r="300"
            fill={`url(#glow1-${uid})`}
            filter={`url(#gblur-${uid})`}
          />
          <circle
            cx="160"
            cy="325"
            r="220"
            fill={`url(#glow2-${uid})`}
            filter={`url(#gblur2-${uid})`}
          />

          <rect
            width="800"
            height="450"
            fill="transparent"
            filter={`url(#noise-${uid})`}
          />
        </g>

        <line x1="0" y1="449" x2="800" y2="449" stroke="#C48A64" strokeWidth="1" strokeOpacity="0.12" />
      </svg>

      <div className="absolute inset-0 flex flex-col" style={{ padding: isHero ? "28px 36px" : "18px 22px" }}>
        {category && (
          <div className="mb-auto">
            <span
              style={{
                display: "inline-block",
                fontSize: isHero ? "11px" : "10px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(196,138,100,0.9)",
                background: "rgba(196,138,100,0.08)",
                border: "1px solid rgba(196,138,100,0.22)",
                borderRadius: "50px",
                padding: isHero ? "5px 12px" : "4px 10px",
              }}
            >
              {category}
            </span>
          </div>
        )}

        <div
          className="flex flex-col justify-end"
          style={{ flex: 1, alignItems:"center", justifyContent:"center" }}
        >
          {clampedLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: `${titleFontSize}px`,
                lineHeight: `${titleLineHeight}px`,
                fontWeight: 900,
                color: "#A8A8A7",
                letterSpacing: "-0.020em",
                textShadow: "0 2px 24px rgba(0,0,0,0.55)",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(10,9,8,0.45) 0%, transparent 55%)",
          borderRadius: isHero ? "16px" : "0px",
        }}
      />

      {isHero && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}
        />
      )}
    </div>
  );
};

export default ArticleVisual;
