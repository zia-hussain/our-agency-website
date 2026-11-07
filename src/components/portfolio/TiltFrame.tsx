import React, { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

interface TiltFrameProps {
  children: React.ReactNode;
  frameClassName?: string;
  /**
   * "spotlight" (default) is the hero treatment: 7° of lean, copper frame,
   * deep shadow. "card" is the same physics scaled for a grid cell — a
   * smaller lean, and the card's own existing frame classes are kept
   * (passed in via frameClassName) so a card in a grid looks exactly as it
   * did at rest and only gains the motion.
   */
  variant?: "spotlight" | "card";
  /** Max lean in degrees; defaults to 7 for spotlight, 4 for card. */
  maxTilt?: number;
  /** Class for the clipping box around the children (the rounded inner). */
  innerClassName?: string;
  /** Light sheen that tracks the cursor; off for a group of separate cards, where one sheen across gaps reads wrong. */
  glare?: boolean;
}

// The tactile hallmark of a premium agency site — whatever's inside leans
// toward the cursor with real depth and a light sheen that tracks it,
// instead of sitting flat. Physics-based (spring), so it settles rather
// than snaps. Generalized from TiltImage so it can wrap anything — an
// <img>, or a generated SVG visual like ArticleVisual — not just photos.
// Pointer-only by nature: touch devices never fire mousemove, so a phone
// sees the resting frame and nothing jitters under a scrolling thumb.
// Reduced motion keeps the glare and drops the lean.
const TiltFrame: React.FC<TiltFrameProps> = ({
  children,
  frameClassName = "",
  variant = "spotlight",
  maxTilt,
  innerClassName,
  glare = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const lean = shouldReduceMotion ? 0 : maxTilt ?? (variant === "card" ? 4 : 7);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [lean, -lean]);
  const rotateY = useTransform(springX, [0, 1], [-lean, lean]);
  const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    x.set(0.5);
    y.set(0.5);
    setHovering(false);
  };

  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,${variant === "card" ? 0.11 : 0.16}), transparent 55%)`
  );

  const frame =
    variant === "card"
      ? frameClassName
      : `relative rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/[0.06] to-transparent p-2 shadow-[0_40px_90px_-30px_rgba(196,138,100,0.35)] ${frameClassName}`;
  const inner = innerClassName ?? (variant === "card" ? "relative overflow-hidden rounded-lg" : "relative overflow-hidden rounded-xl");

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={frame}
    >
      <div className={inner}>
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{ background: glareBackground, opacity: hovering ? 1 : 0 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default TiltFrame;
