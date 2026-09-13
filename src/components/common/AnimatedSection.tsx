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

  const distance = mode === 'hero' ? 12 : OFFSET;
  const restOpacity = mode === 'hero' ? 0.96 : 0.95;
  const duration = mode === 'hero' ? 0.48 : 0.28;
  // Fast response + soft deceleration ("settling"), not a linear ease —
  // reserved for hero mode; reveal mode's easeOut is unchanged/frozen.
  const heroEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
        // Micro-stagger only: a hero's own logical groups (text block vs.
        // visual block, say) settle within ~60ms of each other, never a
        // sequential reveal the visitor has to wait through.
        delay: mode === 'hero' ? Math.min(delay, 0.08) : delay,
        ease: mode === 'hero' ? heroEase : 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
