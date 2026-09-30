import React, { useState } from "react";
import { LayoutGroup, motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Wrench, RefreshCcw, ShieldCheck, MousePointerClick } from "lucide-react";
import AnimatedSection from "../../../components/common/AnimatedSection";

// The centerpiece: not four cards, one instrument. Five realistic signals
// start in a single "REPORTED" lane — what a founder would actually say.
// Choosing a destination physically moves the matching signal(s) down into
// an "OBSERVED" lane, through a labeled evidence gate — the same shared
// layoutId animates across both lanes, so a signal doesn't recolor in
// place, it migrates. That migration IS the argument: reported and
// observed are different things, and evidence is what moves something
// from one to the other. REPLACE's lane stays visibly the narrowest and
// requires two signals — the minority outcome, by construction.
//
// A quiet pulsing "Tap" hint on each zone until someone actually taps one
// (2026-10-01 affordance pass, requested after the same fix shipped on
// Idea-to-Build/Manual-to-System's equivalents) — gone for good the
// instant a real tap happens. Deliberately no auto-playing demo: a
// layoutId animation fired automatically on scroll-into-view measures
// positions that may still be shifting mid-scroll and looks like a glitch,
// not a smooth reveal. Nothing here moves on its own.
type CategoryKey = "keep" | "fix" | "replace";

interface Signal {
  id: string;
  text: string;
  category: CategoryKey;
  rotate: number;
  offset: number;
}

const SIGNALS: Signal[] = [
  { id: "age", text: "The stack is a few years old", category: "keep", rotate: -3, offset: 2 },
  { id: "taste", text: "It's not built the way a new hire would choose", category: "keep", rotate: 2, offset: -6 },
  { id: "checkout", text: "Checkout breaks under heavy load", category: "fix", rotate: -2, offset: 5 },
  { id: "onboarding", text: "New users drop off during onboarding", category: "fix", rotate: 4, offset: -3 },
  { id: "auth", text: "Auth was patched by three developers who've all since left", category: "replace", rotate: -4, offset: 4 },
];

const ZONES: {
  key: CategoryKey;
  icon: typeof Check;
  label: string;
  weight: "solid" | "dashed";
}[] = [
  { key: "keep", icon: Check, label: "Keep", weight: "solid" },
  { key: "fix", icon: Wrench, label: "Fix", weight: "solid" },
  { key: "replace", icon: RefreshCcw, label: "Replace", weight: "dashed" },
];

const CAPTIONS: Record<CategoryKey, string> = {
  keep: "Age and taste aren't evidence of a problem. Two signals, zero findings — observed, confirmed, left alone.",
  fix: "Two real, bounded problems. Observed directly, fixable without touching anything that already works.",
  replace: "Qualifies only because two things were both observed to be true: nobody can explain how it works, and it keeps failing the same way.",
};

const SignalChip: React.FC<{ signal: Signal; state: "reported" | "matched" }> = ({ signal, state }) => (
  <motion.span
    layoutId={signal.id}
    layout
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    animate={state === "reported" ? { rotate: signal.rotate, y: signal.offset } : { rotate: 0, y: 0 }}
    className={`inline-block rounded-full border px-3.5 py-2 text-xs sm:text-[13px] leading-snug ${
      state === "matched"
        ? "border-primary/60 bg-primary/[0.12] text-foreground"
        : "border-dashed border-border/50 text-foreground/70"
    }`}
  >
    {state === "matched" && <Check size={11} className="mr-1.5 -mt-0.5 inline text-primary" />}
    {signal.text}
  </motion.span>
);

const DecisionVisual: React.FC = () => {
  const [active, setActive] = useState<CategoryKey | null>(null);
  const [userTouched, setUserTouched] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSelect = (key: CategoryKey) => {
    setUserTouched(true);
    setActive((prev) => (prev === key ? null : key));
  };
  const reportedSignals = SIGNALS.filter((s) => s.category !== active);
  const showHint = !userTouched;

  const counts = {
    keep: SIGNALS.filter((s) => s.category === "keep").length,
    fix: SIGNALS.filter((s) => s.category === "fix").length,
    replace: SIGNALS.filter((s) => s.category === "replace").length,
  };

  return (
    <AnimatedSection delay={0.06} className="mt-8">
      <LayoutGroup>
        <div className="rounded-3xl border border-border/50 bg-black/30 p-5 sm:p-8">
          {/* REPORTED — what a founder would actually say, unsorted */}
          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/50">
            Reported
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 px-2 sm:px-6 min-h-[52px] items-center">
            <AnimatePresence>
              {reportedSignals.map((signal) => (
                <SignalChip key={signal.id} signal={signal} state="reported" />
              ))}
            </AnimatePresence>
          </div>

          {/* Evidence gate */}
          <div aria-hidden="true" className="my-6 sm:my-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/70">Evidence</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
          </div>

          {/* OBSERVED — the same signals, once evidence has sorted them */}
          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/50">
            Observed
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {ZONES.map((zone) => {
              const isActive = active === zone.key;
              const isReplace = zone.key === "replace";
              const matched = SIGNALS.filter((s) => s.category === zone.key && active === zone.key);
              return (
                <motion.button
                  key={zone.key}
                  type="button"
                  onClick={() => handleSelect(zone.key)}
                  aria-pressed={isActive}
                  animate={
                    isActive
                      ? { boxShadow: "0 0 0 1px rgba(196,138,100,0.3)" }
                      : showHint && !shouldReduceMotion
                        ? { boxShadow: ["0 0 0 0 rgba(196,138,100,0)", "0 0 0 6px rgba(196,138,100,0.10)", "0 0 0 0 rgba(196,138,100,0)"] }
                        : { boxShadow: "0 0 0 0 rgba(196,138,100,0)" }
                  }
                  transition={!isActive && showHint ? { duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: zone.key === "keep" ? 0 : zone.key === "fix" ? 0.7 : 1.4 } : { duration: 0.3 }}
                  className={`relative flex flex-col rounded-2xl p-3.5 sm:p-5 text-left transition-colors duration-250 min-h-[104px] sm:min-h-[120px] ${
                    isActive
                      ? "border border-primary bg-gradient-to-b from-primary/[0.14] to-transparent"
                      : zone.weight === "solid"
                        ? "border border-primary/30 bg-gradient-to-b from-primary/[0.06] to-transparent hover:border-primary/50"
                        : "border border-dashed border-border/50 bg-card/5 opacity-80 hover:opacity-100"
                  }`}
                >
                  {showHint && (
                    <span className="absolute right-2 top-2 sm:right-3 sm:top-3 flex items-center gap-1 rounded-full border border-primary/25 bg-background/70 px-1.5 sm:px-2 py-1 text-[8px] sm:text-[9px] font-semibold uppercase tracking-wide text-primary/80">
                      <MousePointerClick size={9} />
                      <span className="hidden sm:inline">Tap</span>
                    </span>
                  )}
                  <span className="mb-2 flex items-center gap-2">
                    <span className={`flex h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 items-center justify-center rounded-full border ${isActive || zone.weight === "solid" ? "border-primary/40 text-primary" : "border-border/60 text-muted-foreground"}`}>
                      <zone.icon size={12} />
                    </span>
                    <span className="text-sm sm:text-base font-bold tracking-tight text-foreground">{zone.label}</span>
                  </span>
                  {isReplace && (
                    <span className="mb-1.5 flex items-center gap-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text-muted-foreground/55">
                      <ShieldCheck size={10} />
                      Two required
                    </span>
                  )}
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    <AnimatePresence>
                      {matched.map((signal) => (
                        <SignalChip key={signal.id} signal={signal} state="matched" />
                      ))}
                    </AnimatePresence>
                    {isActive && matched.length === 0 && <span className="text-xs text-muted-foreground/40">—</span>}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Next — the sequence this produces */}
          <div className="mt-4 rounded-2xl border border-border/30 bg-card/10 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50 mb-1.5">Next — the sequence this produces</p>
            <p className="text-sm text-foreground/85 leading-relaxed">
              {counts.fix} fixed first. {counts.replace} replaced once the evidence above is confirmed. The
              other {counts.keep} — left exactly as they are.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {active && (
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 border-t border-border/30 pt-4 text-sm leading-relaxed text-foreground/80"
              >
                {CAPTIONS[active]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>

      <p className="mt-4 text-center text-xs text-muted-foreground/60">
        Tap Keep, Fix, or Replace — watch reported become observed.
      </p>
    </AnimatedSection>
  );
};

export default DecisionVisual;
