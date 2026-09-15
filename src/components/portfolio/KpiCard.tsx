import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "../../hooks/useCountUp";

interface KpiCardProps {
  value: string;
  label: string;
  description?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ value, label, description }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const display = useCountUp(value, isInView);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.15 }}
      className="h-full rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/[0.07] to-card/20 px-5 py-6 shadow-[0_25px_50px_-28px_rgba(0,0,0,0.55)]"
    >
      <p className="text-2xl sm:text-3xl font-bold text-primary leading-none mb-2 tabular-nums">{display}</p>
      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-foreground/80 mb-2">{label}</p>
      {description && <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>}
    </motion.div>
  );
};

export default KpiCard;
