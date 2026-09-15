import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltFrameProps {
  children: React.ReactNode;
  frameClassName?: string;
}

// The tactile hallmark of a premium agency site — whatever's inside leans
// toward the cursor with real depth and a light sheen that tracks it,
// instead of sitting flat. Physics-based (spring), so it settles rather
// than snaps. Generalized from TiltImage so it can wrap anything — an
// <img>, or a generated SVG visual like ArticleVisual — not just photos.
const TiltFrame: React.FC<TiltFrameProps> = ({ children, frameClassName = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-7, 7]);
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
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.16), transparent 55%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/[0.06] to-transparent p-2 shadow-[0_40px_90px_-30px_rgba(196,138,100,0.35)] ${frameClassName}`}
    >
      <div className="relative overflow-hidden rounded-xl">
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{ background: glareBackground, opacity: hovering ? 1 : 0 }}
        />
      </div>
    </motion.div>
  );
};

export default TiltFrame;
