import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// A slow, breathing glow behind a final CTA button — the same device the
// Services hub uses to make its closing button feel alive rather than
// static. Pauses entirely under reduced motion rather than just slowing
// down, since a paused glow is still a glow; a jittery one isn't.
const ClosingGlow: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-8 sm:-inset-10 rounded-full bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(196,138,100,0.24),transparent_70%)]"
      animate={shouldReduceMotion ? undefined : { opacity: [0.55, 1, 0.55], scale: [0.96, 1.04, 0.96] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

export default ClosingGlow;
