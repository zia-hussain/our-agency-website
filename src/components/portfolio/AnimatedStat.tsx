import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useCountUp } from "../../hooks/useCountUp";

interface AnimatedStatProps {
  icon: LucideIcon;
  value: string;
  label: string;
  delay?: number;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ icon: Icon, value, label, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const display = useCountUp(value, isInView, delay);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.001, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className="group text-center rounded-2xl border border-border/40 bg-card/10 px-5 py-8 transition-colors duration-300 hover:border-primary/30 hover:bg-card/20"
    >
      <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary/30 bg-background mb-4 shadow-[0_25px_50px_-22px_rgba(196,138,100,0.35)] transition-transform duration-300 group-hover:scale-105 group-hover:border-primary/50">
        <Icon size={20} className="text-primary" />
      </span>
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1.5 whitespace-nowrap tabular-nums">
        {display}
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </motion.div>
  );
};

export default AnimatedStat;
