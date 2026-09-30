import React, { useState } from "react";
import { LayoutGroup, motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Clock, MousePointerClick } from "lucide-react";
import AnimatedSection from "../../../components/common/AnimatedSection";

// The centerpiece: a founder's real wishlist, unsorted, narrowing into two
// lanes — the same "shared layoutId migrates, doesn't just recolor"
// technique Product Rescue's DecisionVisual.tsx proved, adapted to this
// offer's actual tension (PROOF → JOURNEY → BUILD / NOT YET, not
// Keep/Fix/Replace). Two lanes instead of three: the whole point of this
// offer is a binary — ships in V1, or waits — not a triage. Ideas below are
// a generic, illustrative coaching-scheduler concept, not any real client's
// actual feature list (2026-09-30 BUILD/AUTOMATE expansion).
//
// A static interactive component teaches nothing if nobody knows it's
// interactive — same fix as Manual-to-System's WorkflowVisual.tsx
// (2026-10-01 affordance pass): a quiet pulsing ring + "Tap" hint on the
// zones until someone actually taps one, then gone for good. Deliberately
// NOT an auto-playing demo — an unrequested layoutId animation firing
// while the page might still be mid-scroll measures positions that are
// still shifting and looks broken, not smooth. Nothing moves on its own.
type LaneKey = "v1" | "later";

interface Idea {
  id: string;
  text: string;
  lane: LaneKey;
  rotate: number;
  offset: number;
}

const IDEAS: Idea[] = [
  { id: "booking", text: "Client booking calendar", lane: "v1", rotate: -3, offset: 2 },
  { id: "reminders", text: "Automated reminder emails", lane: "v1", rotate: 2, offset: -5 },
  { id: "payment", text: "Payment collection at booking", lane: "v1", rotate: -2, offset: 4 },
  { id: "groups", text: "Group session support", lane: "later", rotate: 3, offset: -3 },
  { id: "branding", text: "Custom branding per coach", lane: "later", rotate: -4, offset: 3 },
  { id: "analytics", text: "Analytics dashboard", lane: "later", rotate: 2, offset: -4 },
  { id: "mobile", text: "Native mobile app", lane: "later", rotate: -3, offset: 5 },
];

const LANES: { key: LaneKey; icon: typeof Check; label: string; weight: "solid" | "dashed" }[] = [
  { key: "v1", icon: Check, label: "Build now — V1", weight: "solid" },
  { key: "later", icon: Clock, label: "Not yet", weight: "dashed" },
];

const CAPTIONS: Record<LaneKey, string> = {
  v1: "Three things prove the loop works: a client can book, get reminded, and pay. That's the whole first version.",
  later: "Real ideas, genuinely later. None of them help prove whether the core loop works — they make sense once it does.",
};

const IdeaChip: React.FC<{ idea: Idea; state: "pool" | "sorted" }> = ({ idea, state }) => (
  <motion.span
    layoutId={idea.id}
    layout
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    animate={state === "pool" ? { rotate: idea.rotate, y: idea.offset } : { rotate: 0, y: 0 }}
    className={`inline-block rounded-full border px-3.5 py-2 text-xs sm:text-[13px] leading-snug ${
      state === "sorted"
        ? "border-primary/60 bg-primary/[0.12] text-foreground"
        : "border-dashed border-border/50 text-foreground/70"
    }`}
  >
    {state === "sorted" && <Check size={11} className="mr-1.5 -mt-0.5 inline text-primary" />}
    {idea.text}
  </motion.span>
);

const V1BoundaryVisual: React.FC = () => {
  const [active, setActive] = useState<LaneKey | null>(null);
  const [userTouched, setUserTouched] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSelect = (key: LaneKey) => {
    setUserTouched(true);
    setActive((prev) => (prev === key ? null : key));
  };

  const poolIdeas = IDEAS.filter((s) => s.lane !== active);
  const showHint = !userTouched;

  const counts = {
    v1: IDEAS.filter((s) => s.lane === "v1").length,
    later: IDEAS.filter((s) => s.lane === "later").length,
  };

  return (
    <AnimatedSection delay={0.06} className="mt-8">
      <LayoutGroup>
        <div className="rounded-3xl border border-border/50 bg-black/30 p-5 sm:p-8">
          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/50">
            The wishlist
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 px-2 sm:px-6 min-h-[52px] items-center">
            <AnimatePresence>
              {poolIdeas.map((idea) => (
                <IdeaChip key={idea.id} idea={idea} state="pool" />
              ))}
            </AnimatePresence>
          </div>

          <div aria-hidden="true" className="my-6 sm:my-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/70">Proof target</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
          </div>

          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/50">
            The first version
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {LANES.map((lane) => {
              const isActive = active === lane.key;
              const sorted = IDEAS.filter((s) => s.lane === lane.key && active === lane.key);
              return (
                <motion.button
                  key={lane.key}
                  type="button"
                  onClick={() => handleSelect(lane.key)}
                  aria-pressed={isActive}
                  animate={
                    isActive
                      ? { boxShadow: "0 0 0 1px rgba(196,138,100,0.3)" }
                      : showHint && !shouldReduceMotion
                        ? { boxShadow: ["0 0 0 0 rgba(196,138,100,0)", "0 0 0 7px rgba(196,138,100,0.10)", "0 0 0 0 rgba(196,138,100,0)"] }
                        : { boxShadow: "0 0 0 0 rgba(196,138,100,0)" }
                  }
                  transition={!isActive && showHint ? { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: lane.key === "later" ? 1.1 : 0 } : { duration: 0.3 }}
                  className={`relative flex flex-col rounded-2xl p-4 sm:p-5 text-left transition-colors duration-250 min-h-[128px] sm:min-h-[140px] ${
                    isActive
                      ? "border border-primary bg-gradient-to-b from-primary/[0.14] to-transparent"
                      : lane.weight === "solid"
                        ? "border border-primary/30 bg-gradient-to-b from-primary/[0.06] to-transparent hover:border-primary/50"
                        : "border border-dashed border-border/50 bg-card/5 opacity-80 hover:opacity-100"
                  }`}
                >
                  {showHint && (
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-primary/25 bg-background/70 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-primary/80">
                      <MousePointerClick size={10} />
                      Tap
                    </span>
                  )}
                  <span className="mb-2.5 flex items-center gap-2">
                    <span className={`flex h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 items-center justify-center rounded-full border ${isActive || lane.weight === "solid" ? "border-primary/40 text-primary" : "border-border/60 text-muted-foreground"}`}>
                      <lane.icon size={12} />
                    </span>
                    <span className="text-sm sm:text-base font-bold tracking-tight text-foreground">{lane.label}</span>
                  </span>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    <AnimatePresence>
                      {sorted.map((idea) => (
                        <IdeaChip key={idea.id} idea={idea} state="sorted" />
                      ))}
                    </AnimatePresence>
                    {isActive && sorted.length === 0 && <span className="text-xs text-muted-foreground/40">—</span>}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-4 rounded-2xl border border-border/30 bg-card/10 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50 mb-1.5">What this produces</p>
            <p className="text-sm text-foreground/85 leading-relaxed">
              {counts.v1} things ship in V1. The other {counts.later} — real, not forgotten, just not yet.
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
        Tap Build now or Not yet — watch a wishlist become a version.
      </p>
    </AnimatedSection>
  );
};

export default V1BoundaryVisual;
