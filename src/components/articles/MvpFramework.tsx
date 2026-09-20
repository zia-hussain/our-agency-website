import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import SectionEyebrow from "../common/SectionEyebrow";
import {
  FRAMEWORK_NOTE,
  GATES,
  LOOP_NOTE,
  PRECONDITION,
  STATES,
  type FrameworkGate,
  type FrameworkState,
} from "../../data/mvpFrameworkModel";

// A first version is a set of decisions. Every idea sits in one of three
// states, and two questions move it along: Later -> Designed -> Built. The
// states use the Decision Room convention (solid = shipped, dashed = planned),
// so the same picture reads the same way across both articles. Qualitative —
// see src/data/mvpFrameworkModel.ts.

const STATE_STYLE: Record<FrameworkState["key"], string> = {
  later: "border border-dotted border-border/80 bg-card/10",
  designed: "border border-dashed border-primary/40 bg-card/20",
  built: "border border-primary/60 bg-card/30",
};

const StateCard: React.FC<{ state: FrameworkState }> = ({ state }) => (
  <div className={`min-w-0 flex-1 rounded-xl p-4 md:p-5 ${STATE_STYLE[state.key]}`}>
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{state.label}</p>
    <p className="mt-2 text-[15px] font-semibold leading-snug tracking-tight text-foreground">{state.meaning}</p>
    <p className="mt-3 border-t border-border/40 pt-2.5 text-[13px] leading-snug text-muted-foreground">
      <span className="font-semibold text-foreground">Costs: </span>
      {state.cost}
    </p>
  </div>
);

const Gate: React.FC<{ gate: FrameworkGate }> = ({ gate }) => (
  <div className="flex flex-col items-center justify-center gap-1.5 px-1 py-3 text-center md:w-[9.5rem] md:flex-shrink-0 md:py-0">
    <span aria-hidden="true" className="text-primary/70">
      <ArrowDown size={15} className="md:hidden" />
      <ArrowRight size={16} className="hidden md:block" />
    </span>
    <p className="max-w-[16rem] text-xs font-medium leading-snug text-foreground">{gate.question}</p>
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">{gate.basis}</p>
  </div>
);

const MvpFramework: React.FC = () => (
  <div className="mx-auto my-14 max-w-[960px] sm:my-16">
    <AnimatedSection>
      <SectionEyebrow className="mb-5">Zumetrix first-version framework</SectionEyebrow>
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground [text-wrap:balance]">
        Three states. Two questions between them.
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Every idea for the product is in exactly one state. Only one of them costs build time.
      </p>
    </AnimatedSection>

    <AnimatedSection delay={0.06} className="mt-8">
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/10">
        <p className="border-b border-border/40 bg-card/[0.12] px-4 py-3 text-xs font-medium text-foreground md:px-6 md:text-[13px]">
          {PRECONDITION}
        </p>

        <div className="px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-col md:flex-row md:items-stretch">
            <StateCard state={STATES[0]} />
            <Gate gate={GATES[0]} />
            <StateCard state={STATES[1]} />
            <Gate gate={GATES[1]} />
            <StateCard state={STATES[2]} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 border-t border-border/40 bg-card/[0.15] px-4 py-3 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p className="font-medium text-foreground">{LOOP_NOTE}</p>
          <p>{FRAMEWORK_NOTE}</p>
        </div>
      </div>
    </AnimatedSection>
  </div>
);

export default MvpFramework;
