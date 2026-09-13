import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  /**
   * hero    — above-the-fold content. No viewport detection: it is already
   *           on screen, so there is nothing to "detect". Mounts already
   *           near-visible and settles in place almost immediately.
   * reveal  — below-the-fold content (default). Real IntersectionObserver
   *           gating stays, but the hidden state is a light refinement
   *           (~0.95 opacity, small offset), never a blank element — the
   *           section still reads as complete if the observer never fires.
   * none    — no entrance animation; renders children directly.
   */
  mode?: 'hero' | 'reveal' | 'none';
}

const OFFSET = 8;

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  mode = 'reveal',
}) => {
  const ref = useRef(null);
  // Only below-fold content needs to ask "has the visitor scrolled here yet" —
  // above-fold content is in the initial viewport by definition, so gating it
  // behind the same check just adds JS-dependency and hydration risk for zero
  // benefit (see AnimatedSection audit, Sept 2026: this useInView-on-above-fold
  // pattern is the leading hypothesis for the site's long-standing #418/#422
  // hydration warnings).
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (mode === 'none') {
    return <div className={className}>{children}</div>;
  }

  const distance = mode === 'hero' ? 6 : OFFSET;
  const restOpacity = mode === 'hero' ? 0.96 : 0.95;
  const duration = mode === 'hero' ? 0.2 : 0.28;

  const variants = {
    hidden: {
      opacity: restOpacity,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  // Hero content is mount-triggered only — never gated by isInView. Reveal
  // content still uses the observer, but "hidden" is already ~95% opaque, so
  // a visitor whose JS never runs (or whose observer never fires) still sees
  // complete, readable content — the animation is a refinement, not a gate.
  const animateState = mode === 'hero' ? 'visible' : isInView ? 'visible' : 'hidden';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={animateState}
      variants={variants}
      transition={{
        duration,
        delay: mode === 'hero' ? Math.min(delay, 0.15) : delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
