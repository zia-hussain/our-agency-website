import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Shared recognition-moment mechanism for the BUILD/AUTOMATE offers — the
// same pattern Product Rescue's own RecognitionSelector.tsx proved (a
// single interactive choice that mirrors the applicant's own words back at
// them, carried forward into the application via sessionStorage so nobody
// re-answers what they already told us). Parameterized here because two
// offers need it with different content; Product Rescue's own copy of this
// component stays untouched — it is frozen (2026-09-30 BUILD/AUTOMATE
// expansion).
export interface RecognitionOption {
  value: string;
  quote: string;
  response: string;
}

export const prefillKey = (offerSlug: string) => `zumetrix:${offerSlug}:prefill-situation`;

const RecognitionSelector: React.FC<{
  offerSlug: string;
  applyPath: string;
  options: RecognitionOption[];
}> = ({ offerSlug, applyPath, options }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    try {
      window.sessionStorage.setItem(prefillKey(offerSlug), value);
    } catch {
      // Private browsing / storage disabled — selection still works, just not carried forward.
    }
  };

  const active = options.find((o) => o.value === selected) || null;

  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => {
          const isActive = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`group rounded-xl border px-5 py-4 text-left text-sm leading-relaxed transition-all duration-200 ${
                isActive
                  ? "border-primary/60 bg-primary/[0.08] text-foreground"
                  : "border-border/50 bg-background/40 text-foreground/85 hover:border-primary/30 hover:bg-background/60"
              }`}
            >
              <span aria-hidden="true" className={`mb-2 block text-lg leading-none transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground/30 group-hover:text-primary/50"}`}>
                &ldquo;
              </span>
              {option.quote}
            </button>
          );
        })}
      </div>

      <div className="mt-3 min-h-[1px]">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/[0.06] to-transparent p-6 sm:p-7">
                <p className="text-base sm:text-lg font-medium leading-relaxed text-foreground mb-5">
                  {active.response}
                </p>
                <Link
                  to={applyPath}
                  className="group inline-flex items-center gap-2.5 text-sm font-semibold text-primary hover:gap-3.5 transition-all duration-200"
                >
                  Continue with this
                  <ArrowRight size={14} className="transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecognitionSelector;
