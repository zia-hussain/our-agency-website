import React, { useState } from "react";
import { LayoutGroup, motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Zap, UserCheck, MousePointerClick } from "lucide-react";
import AnimatedSection from "../../../components/common/AnimatedSection";

// The centerpiece: a real workflow's tasks, unsorted, resolving into two
// lanes — same shared-layoutId migration technique as Product Rescue's
// DecisionVisual.tsx and Idea-to-Build's V1BoundaryVisual.tsx, applied to
// this offer's actual tension: which steps are mechanical enough to
// automate, and which ones are judgment a person should keep doing. The
// workflow below (a new-client inquiry) is generic and illustrative, not
// any real client's actual process (2026-09-30 BUILD/AUTOMATE expansion).
//
// A static interactive component teaches nothing if nobody knows it's
// interactive — a caption below the block isn't enough (2026-10-01
// affordance pass). Fix is a quiet pulsing ring + "Tap" hint on the zones
// while nothing is selected yet, gone for good the moment a real tap
// happens. Deliberately NOT an auto-playing demo: a layoutId animation
// triggered on scroll-into-view fires while the viewport may still be
// mid-scroll, and framer-motion measuring positions that are still
// shifting produces exactly the kind of glitchy, "did that just click
// itself" jump a real tap never has. Nothing moves until the visitor
// actually taps something.
type LaneKey = "automate" | "human";

interface Task {
  id: string;
  text: string;
  lane: LaneKey;
  rotate: number;
  offset: number;
}

const TASKS: Task[] = [
  { id: "calendar", text: "Check calendar availability", lane: "automate", rotate: -3, offset: 2 },
  { id: "contract", text: "Send contract for signature", lane: "automate", rotate: 2, offset: -4 },
  { id: "deposit", text: "Collect deposit payment", lane: "automate", rotate: -2, offset: 4 },
  { id: "crm", text: "Update the CRM with the new client", lane: "automate", rotate: 3, offset: -3 },
  { id: "reply", text: "Reply to the first inquiry email", lane: "human", rotate: -4, offset: 3 },
  { id: "fit", text: "Answer \"is this actually a good fit\" questions", lane: "human", rotate: 2, offset: -5 },
];

const LANES: { key: LaneKey; icon: typeof Zap; label: string; weight: "solid" | "dashed" }[] = [
  { key: "automate", icon: Zap, label: "Automate", weight: "solid" },
  { key: "human", icon: UserCheck, label: "Keep human", weight: "dashed" },
];

const CAPTIONS: Record<LaneKey, string> = {
  automate: "Four repeatable, bounded steps with no real judgment in them. Once the workflow is understood, software can do these reliably.",
  human: "Two moments that are actually relationships, not steps — the kind of judgment that shouldn't disappear just because the rest of the workflow got faster.",
};

const TaskChip: React.FC<{ task: Task; state: "pool" | "sorted" }> = ({ task, state }) => (
  <motion.span
    layoutId={task.id}
    layout
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    animate={state === "pool" ? { rotate: task.rotate, y: task.offset } : { rotate: 0, y: 0 }}
    className={`inline-block rounded-full border px-3.5 py-2 text-xs sm:text-[13px] leading-snug ${
      state === "sorted"
        ? "border-primary/60 bg-primary/[0.12] text-foreground"
        : "border-dashed border-border/50 text-foreground/70"
    }`}
  >
    {task.text}
  </motion.span>
);

const WorkflowVisual: React.FC = () => {
  const [active, setActive] = useState<LaneKey | null>(null);
  const [userTouched, setUserTouched] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSelect = (key: LaneKey) => {
    setUserTouched(true);
    setActive((prev) => (prev === key ? null : key));
  };

  const poolTasks = TASKS.filter((t) => t.lane !== active);
  const showHint = !userTouched;

  const counts = {
    automate: TASKS.filter((t) => t.lane === "automate").length,
    human: TASKS.filter((t) => t.lane === "human").length,
  };

  return (
    <AnimatedSection delay={0.06} className="mt-8">
      <LayoutGroup>
        <div className="rounded-3xl border border-border/50 bg-black/30 p-5 sm:p-8">
          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/50">
            A new-client inquiry, today
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 px-2 sm:px-6 min-h-[52px] items-center">
            <AnimatePresence>
              {poolTasks.map((task) => (
                <TaskChip key={task.id} task={task} state="pool" />
              ))}
            </AnimatePresence>
          </div>

          <div aria-hidden="true" className="my-6 sm:my-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/70">System boundary</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
          </div>

          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/50">
            The workflow, after
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {LANES.map((lane) => {
              const isActive = active === lane.key;
              const sorted = TASKS.filter((t) => t.lane === lane.key && active === lane.key);
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
                  transition={!isActive && showHint ? { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: lane.key === "human" ? 1.1 : 0 } : { duration: 0.3 }}
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
                      {sorted.map((task) => (
                        <TaskChip key={task.id} task={task} state="sorted" />
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
              {counts.automate} steps stop needing a person. {counts.human} stay human — on purpose, not by default.
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
        Tap Automate or Keep human — watch a workflow become a system.
      </p>
    </AnimatedSection>
  );
};

export default WorkflowVisual;
