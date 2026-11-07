import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "../../utils/analytics";

interface Action {
  label: string;
  to: string;
  /** Analytics label; defaults to the button text. */
  track?: string;
  onClick?: () => void;
}

interface HeroActionsProps {
  primary: Action;
  secondary?: Action & { icon?: React.ReactNode };
  /** One line under the pair that removes the last objection — a fact the page already stands behind. */
  note?: string;
  align?: "center" | "left";
  className?: string;
}

// The homepage hero's primary button, lifted into one component so every
// hub page opens on the same unmistakable action instead of a text link
// three screens down. One copper pill, one quiet alternative, one line of
// reassurance. Nothing else competes with it above the fold.
const HeroActions: React.FC<HeroActionsProps> = ({ primary, secondary, note, align = "center", className = "" }) => {
  const location = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <div className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start"} ${className}`}>
      <div className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 ${align === "center" ? "justify-center" : ""}`}>
        <Link
          to={primary.to}
          onClick={() => {
            trackCTAClick(primary.track ?? primary.label, location);
            primary.onClick?.();
          }}
        >
          <motion.span
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="btn-sheen group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-b from-primary to-primary/[0.92] pl-8 pr-6 sm:pl-9 sm:pr-7 py-3.5 sm:py-4 text-base sm:text-[17px] font-semibold tracking-[-0.01em] text-primary-foreground
                       shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_10px_-2px_rgba(0,0,0,0.35),0_16px_36px_-16px_rgba(196,138,100,0.4)]
                       hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_2px_10px_-2px_rgba(0,0,0,0.4),0_20px_42px_-16px_rgba(196,138,100,0.5)]
                       transition-shadow duration-300"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.14] via-white/0 to-black/[0.06]" />
            <span className="relative">{primary.label}</span>
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-black/10 transition-colors duration-300 group-hover:bg-black/[0.14]">
              <ArrowRight size={12} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-[1.5px]" />
            </span>
          </motion.span>
        </Link>
        {secondary && (
          <Link
            to={secondary.to}
            onClick={() => {
              trackCTAClick(secondary.track ?? secondary.label, location);
              secondary.onClick?.();
            }}
            className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/30 px-6 py-3.5 text-[15px] font-medium text-foreground/85 transition-colors duration-200 hover:border-primary/40 hover:text-primary"
          >
            {secondary.icon}
            {secondary.label}
            <ArrowRight size={13} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      {note && <p className="mt-4 text-[13px] text-muted-foreground/70">{note}</p>}
    </div>
  );
};

export default HeroActions;
