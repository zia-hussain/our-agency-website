import React from "react";

interface ArticleVisualProps {
  title: string;
  category?: string;
  variant?: "card" | "hero";
}

const HIGHLIGHT_STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "for", "in", "on", "at", "to",
  "of", "by", "with", "from", "how", "what", "why", "when", "is", "are",
  "was", "were", "be", "been", "have", "has", "do", "does", "your", "our",
  "we", "i", "my", "vs", "vs.", "complete", "guide",
]);

function pickHighlightWord(title: string): string {
  const words = title.split(" ");
  for (let i = words.length - 1; i >= 0; i--) {
    const clean = words[i].replace(/[^a-zA-Z0-9+]/g, "").toLowerCase();
    if (clean.length >= 4 && !HIGHLIGHT_STOP_WORDS.has(clean)) {
      return words[i];
    }
  }
  return words[words.length - 1];
}

function wrapLines(
  title: string,
  maxChars: number
): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const CurvedUnderline: React.FC<{ width: number; color: string }> = ({ width, color }) => (
  <svg
    viewBox={`0 0 ${width} 10`}
    width={width}
    height={10}
    style={{ display: "block", overflow: "visible", marginTop: "2px" }}
    aria-hidden="true"
  >
    <path
      d={`M2,6 Q${width * 0.25},1 ${width * 0.5},5.5 Q${width * 0.75},10 ${width - 2},4`}
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.85"
    />
  </svg>
);

const ArticleVisual: React.FC<ArticleVisualProps> = ({
  title,
  category,
  variant = "card",
}) => {
  const isHero = variant === "hero";
  const uid = `av-${title.slice(0, 8).replace(/\s/g, "")}`;

  const titleFontSize = isHero ? 54 : 34;
  const titleLineHeight = isHero ? 62 : 42;
  const maxCharsPerLine = 30;
  const maxLines = isHero ? 4 : 3;

  const allLines = wrapLines(title, maxCharsPerLine);
  const clampedLines = allLines.slice(0, maxLines);

  const highlightWord = pickHighlightWord(title);

  const lastLineIdx = clampedLines.length - 1;
  const lastLine = clampedLines[lastLineIdx];
  const highlightInLastLine = lastLine.includes(highlightWord);

  const renderLine = (line: string, isLast: boolean) => {
    if (!isLast || !highlightInLastLine) {
      return (
        <span style={{ color: "#DEDEDE" }}>{line}</span>
      );
    }

    const idx = line.indexOf(highlightWord);
    const before = line.slice(0, idx);
    const after = line.slice(idx + highlightWord.length);
    const charWidth = titleFontSize * 0.58;
    const underlineWidth = Math.max(highlightWord.length * charWidth, 32);

    return (
      <>
        {before && <span style={{ color: "#DEDEDE" }}>{before}</span>}
        <span style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              color: "#C48A64",
              textShadow: "0 0 28px rgba(196,138,100,0.35)",
            }}
          >
            {highlightWord}
          </span>
          <span
            style={{
              position: "absolute",
              left: 0,
              bottom: isHero ? "-6px" : "-4px",
              width: `${underlineWidth}px`,
              pointerEvents: "none",
            }}
          >
            <CurvedUnderline width={underlineWidth} color="#C48A64" />
          </span>
        </span>
        {after && <span style={{ color: "#DEDEDE" }}>{after}</span>}
      </>
    );
  };

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

        <line
          x1="0" y1="449" x2="800" y2="449"
          stroke="#C48A64" strokeWidth="1" strokeOpacity="0.12"
        />
      </svg>

      <div
        className="absolute inset-0 flex flex-col"
        style={{ padding: isHero ? "28px 36px" : "18px 22px" }}
      >
        {category && (
          <div style={{ marginBottom: "auto" }}>
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
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {clampedLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: `${titleFontSize}px`,
                lineHeight: `${titleLineHeight}px`,
                fontWeight: 900,
                letterSpacing: "-0.022em",
                textShadow: "0 2px 24px rgba(0,0,0,0.6)",
                fontFamily: "Inter, system-ui, sans-serif",
                textAlign: "center",
                marginBottom: i < clampedLines.length - 1 ? "2px" : "0",
              }}
            >
              {renderLine(line, i === lastLineIdx)}
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
