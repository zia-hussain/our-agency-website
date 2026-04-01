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

  return (
    <div
      className={`relative w-full overflow-hidden ${
        isHero ? "rounded-2xl" : "rounded-none"
      }`}
      style={{ aspectRatio: "16/9" }}
    >
      <svg
        viewBox="0 0 800 450"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`bg-${variant}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0a0a0a" />
            <stop offset="45%" stopColor="#141210" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>

          <radialGradient
            id={`glow-${variant}`}
            cx="50%"
            cy="48%"
            r="42%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C48A64" stopOpacity="0.18" />
            <stop offset="55%" stopColor="#C48A64" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#C48A64" stopOpacity="0" />
          </radialGradient>

          <filter id={`blur-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>

        <rect width="800" height="450" fill={`url(#bg-${variant})`} />

        <circle
          cx="400"
          cy="216"
          r="280"
          fill={`url(#glow-${variant})`}
          filter={`url(#blur-${variant})`}
        />

        <line
          x1="0"
          y1="449"
          x2="800"
          y2="449"
          stroke="#C48A64"
          strokeWidth="1"
          strokeOpacity="0.15"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10">
        {category && (
          <div className="mb-3 sm:mb-4">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border"
              style={{
                color: "rgba(196,138,100,0.85)",
                borderColor: "rgba(196,138,100,0.2)",
                backgroundColor: "rgba(196,138,100,0.06)",
                letterSpacing: "0.12em",
              }}
            >
              {category}
            </span>
          </div>
        )}

        <h2
          className={`text-center font-bold leading-tight max-w-xl sm:max-w-2xl ${
            isHero
              ? "text-2xl sm:text-3xl md:text-4xl"
              : "text-lg sm:text-xl md:text-2xl"
          }`}
          style={{
            color: "#EDEDED",
            letterSpacing: "-0.02em",
            textShadow: "0 2px 20px rgba(0,0,0,0.6)",
          }}
        >
          {title}
        </h2>
      </div>

      <div
        className="absolute inset-0 rounded-inherit"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}
      />
    </div>
  );
};

export default ArticleVisual;
