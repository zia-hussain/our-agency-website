import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// A thin progress rail across the very top of the viewport, filling as you
// read through the case study — the premium-editorial cue that this is a
// story with a beginning and an end, not an endless scroll of sections.
const ReadingProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-primary/70 via-primary to-primary/70 z-[60]"
      style={{ scaleX }}
    />
  );
};

export default ReadingProgress;
