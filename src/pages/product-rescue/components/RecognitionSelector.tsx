import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITUATION_TYPES } from "../../../config/offers";

// The recognition moment (brief Section 7): not a six-card pain grid, a
// single interactive choice that mirrors the applicant's own words back at
// them with something specific — not "we understand" but a concrete,
// situation-shaped response. The value written to sessionStorage is read
// once by ApplyPage on mount so a visitor who already told us their
// situation here is never asked to repeat it (brief Section 19).
const PREFILL_KEY = "zumetrix:product-rescue:prefill-situation";

const CONVERSATIONS: Record<string, { quote: string; response: string }> = {
  "product-breaking": {
    quote: "It keeps breaking, and every fix seems to create a new problem somewhere else.",
    response:
      "That's a pattern, not bad luck. We trace what's actually causing it — not just patch whatever broke most recently.",
  },
  "development-stalled": {
    quote: "We've been “almost ready to launch” for months.",
    response:
      "Momentum problems are rarely about effort. Something underneath is fighting the team — we find out what, specifically.",
  },
  "considering-rebuild": {
    quote: "Everyone keeps telling us to just rebuild it.",
    response:
      "Maybe they're right. But “everyone says rebuild” isn't evidence — it's a guess with more people behind it. We check before you spend on one.",
  },
  "inherited-product": {
    quote: "The person who actually built this is gone, and nobody fully trusts the code.",
    response:
      "Inherited software doesn't come with a manual. We read what's actually there — not what anyone assumes must be there.",
  },
  "distrust-direction": {
    quote: "Three developers have looked at it. I've heard three different diagnoses.",
    response:
      "Three opinions, three different answers — that's the actual problem. One evidence-based read replaces the guessing.",
  },
  "something-else": {
    quote: "It's not quite any of these, but something is still off.",
    response:
      "Not every situation fits a clean label. Tell us what's really going on in the application — that's exactly what it's for.",
  },
};

const RecognitionSelector: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    try {
      window.sessionStorage.setItem(PREFILL_KEY, value);
    } catch {
      // Private browsing / storage disabled — selection still works, just not carried forward.
    }
  };

  const active = selected ? CONVERSATIONS[selected] : null;

  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {SITUATION_TYPES.map((situation) => {
          const isActive = selected === situation.value;
          return (
            <button
              key={situation.value}
              type="button"
              onClick={() => handleSelect(situation.value)}
              className={`group rounded-xl border px-5 py-4 text-left text-sm leading-relaxed transition-all duration-200 ${
                isActive
                  ? "border-primary/60 bg-primary/[0.08] text-foreground"
                  : "border-border/50 bg-background/40 text-foreground/85 hover:border-primary/30 hover:bg-background/60"
              }`}
            >
              <span aria-hidden="true" className={`mb-2 block text-lg leading-none transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground/30 group-hover:text-primary/50"}`}>
                &ldquo;
              </span>
              {CONVERSATIONS[situation.value].quote}
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
                  to="/product-rescue/apply"
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
export { PREFILL_KEY };
