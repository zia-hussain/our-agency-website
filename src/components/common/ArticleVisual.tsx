import React from "react";

interface ArticleVisualProps {
  title: string;
  category?: string;
  variant?: "card" | "hero";
  highlightOverride?: string;
}

const SKIP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "for", "in", "on", "at", "to",
  "of", "by", "with", "from", "how", "what", "why", "when", "is", "are",
  "was", "were", "be", "been", "have", "has", "do", "does", "your", "our",
  "we", "i", "my", "vs", "that", "this", "it", "its", "not", "no", "can",
  "will", "get", "make", "use", "also", "just", "about", "into", "over",
]);

const HOOK_SCORES: Record<string, number> = {
  secret: 10, secrets: 10, never: 10, hidden: 10, truth: 9,
  mistake: 9, mistakes: 9, fail: 9, failing: 9, failed: 9,
  million: 10, billion: 10, money: 9, profit: 9, revenue: 9,
  growth: 9, scale: 9, scaling: 9, dominate: 10, dominating: 10,
  transform: 9, transforming: 9, transformed: 9, transformation: 9,
  launch: 8, launching: 8, launched: 8, ship: 8, shipped: 8,
  real: 8, reality: 8, honest: 8, brutal: 9, raw: 8,
  ultimate: 8, masterclass: 10, blueprint: 9, framework: 8, system: 8,
  proven: 9, worked: 9, works: 8, success: 8, winning: 9, won: 8,
  best: 7, fastest: 8, easiest: 7, powerful: 8,
  lessons: 8, learned: 8, learn: 7, taught: 8,
  founder: 8, founders: 8, startup: 8, startups: 8, entrepreneur: 8,
  mvp: 9, saas: 9, ai: 8, automation: 8, product: 7,
  pakistani: 7, pakistan: 7, local: 6,
  days: 7, hours: 7, minutes: 7,
  projects: 7, clients: 7, users: 7, team: 6,
  broke: 9, built: 8, building: 7, build: 7,
  game: 8, changed: 8, change: 7, changer: 9,
  stop: 8, avoid: 8, warning: 9, danger: 9,
  free: 7, fast: 7, instant: 7, quick: 6,
  dead: 9, death: 9, killing: 9, dying: 9,
  simple: 7, easy: 6, hard: 7, impossible: 9,
  everyone: 7, nobody: 9, someone: 6,
  first: 7, only: 8, ever: 8, finally: 8,
  expert: 7, complete: 7, guide: 7, practices: 6,
  firebase: 7, react: 7, nodejs: 7, node: 6, flutter: 7,
};

type Token = {
  raw: string;
  clean: string;
  start: number;
  end: number;
};

type HighlightCandidate = {
  text: string;
  start: number;
  end: number;
  score: number;
};

function normalizeWord(value: string): string {
  return value.replace(/[^a-zA-Z0-9+]/g, "").toLowerCase();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeComparableText(value: string): string {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function titleContainsPhraseInSingleLine(lines: string[], phrase: string): boolean {
  const phrasePattern = new RegExp(escapeRegExp(phrase), "i");
  return lines.some((line) => phrasePattern.test(line));
}

function tokenizeTitle(title: string): Token[] {
  const tokens: Token[] = [];
  const regex = /\S+/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(title)) !== null) {
    const raw = match[0];
    const clean = normalizeWord(raw);
    tokens.push({
      raw,
      clean,
      start: match.index,
      end: match.index + raw.length,
    });
  }

  return tokens;
}

function scoreSingleToken(token: Token): number {
  if (!token.clean || token.clean.length < 3 || SKIP_WORDS.has(token.clean)) {
    return -Infinity;
  }

  let score = 0;

  if (HOOK_SCORES[token.clean] !== undefined) {
    score += HOOK_SCORES[token.clean];
  }

  if (/^\d+\+?$/.test(token.clean)) score += 5;
  if (/\d/.test(token.clean) && /[a-zA-Z]/.test(token.clean)) score += 4;

  if (token.clean.length >= 6) score += 1;
  if (token.clean.length >= 9) score += 1;

  return score;
}

function scorePhrase(tokens: Token[]): number {
  if (!tokens.length) return -Infinity;

  const cleans = tokens.map((t) => t.clean).filter(Boolean);
  const raws = tokens.map((t) => t.raw);
  const phrase = cleans.join(" ");
  const rawPhrase = raws.join(" ");

  let score = 0;

  for (const clean of cleans) {
    if (HOOK_SCORES[clean] !== undefined) {
      score += HOOK_SCORES[clean];
    } else if (!SKIP_WORDS.has(clean) && clean.length >= 4) {
      score += 2;
    }
  }

  if (tokens.length === 2) score += 2;
  if (tokens.length === 3) score += 1;

  if (/^\d+\+?$/.test(cleans[0]) && cleans[1]) score += 7;
  if (/^\d+x$/i.test(cleans[0])) score += 7;
  if (cleans.some((c) => /^\d+\+?$/.test(c))) score += 3;

  if (phrase === "saas mvp") score += 8;
  if (phrase === "pakistani startups") score += 7;
  if (phrase === "pakistani developers") score += 7;
  if (phrase === "react native") score += 8;
  if (phrase === "ai automation") score += 8;
  if (phrase === "50 projects" || phrase === "50+ projects") score += 9;
  if (phrase === "expert tips") score += 8;
  if (phrase === "best practices") score += 7;
  if (phrase === "no code" || phrase === "no-code automation") score += 8;
  if (phrase === "node js" || rawPhrase.toLowerCase().includes("node.js")) score += 5;

  const strongCount = cleans.filter((c) => !SKIP_WORDS.has(c) && c.length >= 3).length;
  if (strongCount < tokens.length) score -= 1;

  return score;
}

function buildHighlightCandidates(title: string): HighlightCandidate[] {
  const tokens = tokenizeTitle(title);
  if (!tokens.length) return [];

  const candidates: HighlightCandidate[] = [];

  for (const token of tokens) {
    const score = scoreSingleToken(token);
    if (score > 0) {
      candidates.push({
        text: token.raw,
        start: token.start,
        end: token.end,
        score,
      });
    }
  }

  for (let i = 0; i < tokens.length - 1; i++) {
    const pair = [tokens[i], tokens[i + 1]];
    const score = scorePhrase(pair);
    if (score > 6) {
      candidates.push({
        text: title.slice(pair[0].start, pair[1].end),
        start: pair[0].start,
        end: pair[1].end,
        score,
      });
    }
  }

  for (let i = 0; i < tokens.length - 2; i++) {
    const trio = [tokens[i], tokens[i + 1], tokens[i + 2]];
    const score = scorePhrase(trio);
    const hasNumber = trio.some((t) => /^\d+\+?$/.test(t.clean) || /^\d+x$/i.test(t.clean));
    const hasStrongHook = trio.some((t) => (HOOK_SCORES[t.clean] ?? 0) >= 8);

    if (score > 11 && (hasNumber || hasStrongHook)) {
      candidates.push({
        text: title.slice(trio[0].start, trio[2].end),
        start: trio[0].start,
        end: trio[2].end,
        score,
      });
    }
  }

  return candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;

    const aWords = a.text.trim().split(/\s+/).length;
    const bWords = b.text.trim().split(/\s+/).length;
    if (bWords !== aWords) return bWords - aWords;

    return a.start - b.start;
  });
}

function pickHighlightTarget(title: string, lines: string[], highlightOverride?: string): HighlightCandidate | null {
  if (highlightOverride && titleContainsPhraseInSingleLine(lines, highlightOverride)) {
    const match = title.match(new RegExp(escapeRegExp(highlightOverride), "i"));
    if (match && match.index !== undefined) {
      return {
        text: match[0],
        start: match.index,
        end: match.index + match[0].length,
        score: 999,
      };
    }
  }

  const allCandidates = buildHighlightCandidates(title);

  const lineSafeCandidates = allCandidates.filter((candidate) =>
    titleContainsPhraseInSingleLine(lines, candidate.text)
  );

  if (lineSafeCandidates.length > 0) {
    return lineSafeCandidates[0];
  }

  // If every strong phrase breaks across lines, fallback to a line-safe single token.
  const singleWordFallbacks = allCandidates.filter(
    (candidate) => candidate.text.trim().split(/\s+/).length === 1 && titleContainsPhraseInSingleLine(lines, candidate.text)
  );

  if (singleWordFallbacks.length > 0) {
    return singleWordFallbacks[0];
  }

  const tokens = tokenizeTitle(title);
  const simpleFallback = tokens.find(
    (t) => t.clean.length >= 4 && !SKIP_WORDS.has(t.clean) && titleContainsPhraseInSingleLine(lines, t.raw)
  );

  return simpleFallback
    ? {
        text: simpleFallback.raw,
        start: simpleFallback.start,
        end: simpleFallback.end,
        score: 1,
      }
    : null;
}

function wrapLines(title: string, maxChars: number): string[] {
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

function renderHighlightedText(
  text: string,
  highlight: string | null,
  titleFontSize: number,
  isHero: boolean
) {
  if (!highlight) {
    return <span style={{ color: "#DEDEDE" }}>{text}</span>;
  }

  const regex = new RegExp(escapeRegExp(highlight), "i");
  const match = text.match(regex);

  if (!match || match.index === undefined) {
    return <span style={{ color: "#DEDEDE" }}>{text}</span>;
  }

  const matchedText = match[0];
  const start = match.index;
  const end = start + matchedText.length;

  const before = text.slice(0, start);
  const after = text.slice(end);

  const estimatedCharWidth = titleFontSize * 0.56;
  const underlineWidth = Math.max(matchedText.length * estimatedCharWidth + 6, 40);

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
          {matchedText}
        </span>
        <span
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
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
}

const ArticleVisual: React.FC<ArticleVisualProps> = ({
  title,
  category,
  variant = "card",
  highlightOverride,
}) => {
  const isHero = variant === "hero";
  const uid = `av-${title.slice(0, 24).replace(/\s/g, "").replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const titleFontSize = isHero ? 54 : 30;
  const titleLineHeight = isHero ? 62 : 38;
  const maxCharsPerLine = 30;
  const maxLines = isHero ? 4 : 3;

  const allLines = wrapLines(title, maxCharsPerLine);
  const clampedLines = allLines.slice(0, maxLines);

  const highlightTarget = pickHighlightTarget(title, clampedLines, highlightOverride);
  const highlightText = highlightTarget?.text ?? null;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: isHero ? "500px" : "300px",
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
          x1="0"
          y1="449"
          x2="800"
          y2="449"
          stroke="#C48A64"
          strokeWidth="1"
          strokeOpacity="0.12"
        />
      </svg>

      <div
        className="absolute inset-0 flex flex-col "
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
              {renderHighlightedText(line, highlightText, titleFontSize, isHero)}
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
