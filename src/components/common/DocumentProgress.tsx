import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface DocumentProgressProps {
  targetRef: React.RefObject<HTMLElement>;
}

// Progress through this specific document, not the whole page — a legal
// page's hero and footer shouldn't count toward "how much have I read."
// Same physics as the case-study reading rail, scoped to the actual body.
const DocumentProgress: React.FC<DocumentProgressProps> = ({ targetRef }) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-primary/70 via-primary to-primary/70 z-[60]"
      style={{ scaleX }}
    />
  );
};

export default DocumentProgress;
