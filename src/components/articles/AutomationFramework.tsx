import React from "react";
import { ArrowDown, ArrowRight, Cpu, Inbox, ListChecks, Pause, Send, UserCheck, type LucideIcon } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import SectionEyebrow from "../common/SectionEyebrow";
import {
  CHECKPOINT_SLOT,
  ENGINE_SLOT,
  FRAMEWORK_NOTE,
  GATE,
  SHAPES,
  type Slot,
  type StepKey,
} from "../../data/automationFrameworkModel";

// A workflow is a small system: input -> engine -> checkpoint -> action. The
// framework is that system's own anatomy, behind a readiness gate. The gate asks
// its question and forks: "no" is a neutral exit (map the workflow first) and
// "yes" is the branch that CONTAINS the system, so the pipeline visibly exists
// only downstream of readiness. Inside it, two questions each fill one slot (the
// engine, the checkpoint). "Not yet" is a readiness state, not a fifth shape, so
// it lives at the gate; the four shapes below are what the engine and
// checkpoint answers produce. Qualitative — see
// src/data/automationFrameworkModel.ts. Human review is a checkpoint on either
// engine, not a third kind of engine, which is why this is not a 2x2.

const STEP_TEXT: Record<StepKey, string> = { rules: "Rules", ai: "AI", person: "Person", action: "Action" };

const NODE_ICON: Record<"input" | "action", LucideIcon> = { input: Inbox, action: Send };
const FILL_ICON: Record<string, LucideIcon> = { rules: ListChecks, ai: Cpu, none: ArrowRight, person: UserCheck };

const Connector: React.FC = () => (
  <span aria-hidden="true" className="flex items-center justify-center self-center py-1 text-primary/70 md:px-2 md:py-0">
    <ArrowDown size={15} className="md:hidden" />
    <ArrowRight size={16} className="hidden md:block" />
  </span>
);

const Node: React.FC<{ kind: "input" | "action"; text: string }> = ({ kind, text }) => {
  const Icon = NODE_ICON[kind];
  return (
    <div className="flex items-center gap-2 self-start rounded-lg border border-border/50 bg-card/30 px-3 py-2 md:w-[4.5rem] md:flex-col md:justify-center md:gap-1.5 md:self-center md:px-2 md:py-3.5">
      <Icon size={16} aria-hidden="true" className="text-muted-foreground" />
      <span className="text-[13px] font-semibold text-foreground">{text}</span>
    </div>
  );
};

const SlotPanel: React.FC<{ slot: Slot }> = ({ slot }) => (
  <div className="min-w-0 flex-1 rounded-xl border border-primary/25 bg-card/20 p-3.5 md:p-4">
    <p className="flex flex-wrap items-baseline gap-x-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
      {slot.label}
      {slot.aka && <span className="text-[11px] font-medium normal-case tracking-normal text-muted-foreground/60">{slot.aka}</span>}
    </p>
    <p className="mt-1.5 text-[15px] font-semibold leading-snug tracking-tight text-foreground">{slot.question}</p>
    <div className="mt-3">
      {slot.fills.map((fill, i) => {
        const Icon = FILL_ICON[fill.key];
        return (
          <React.Fragment key={fill.key}>
            {i > 0 && (
              <p aria-hidden="true" className="my-1 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50">
                or
              </p>
            )}
            <div className="rounded-lg border border-border/50 bg-card/30 p-2.5 md:p-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Icon size={14} aria-hidden="true" className="flex-shrink-0 text-primary/70" />
                {fill.title}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{fill.body}</p>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

const AutomationFramework: React.FC = () => (
  <div className="mx-auto my-14 max-w-[960px] sm:my-16">
    <AnimatedSection>
      <SectionEyebrow className="mb-5">Zumetrix automation framework</SectionEyebrow>
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground [text-wrap:balance]">
        Three questions help you see a workflow&rsquo;s shape.
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Ask them of one workflow at a time. None of the answers is the &ldquo;advanced&rdquo; one.
      </p>
    </AnimatedSection>

    <AnimatedSection delay={0.06} className="mt-8">
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/10">
        <div className="px-4 py-5 md:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{GATE.label}</p>
          <p className="mt-1 text-base font-semibold leading-snug tracking-tight text-foreground [text-wrap:balance]">{GATE.question}</p>

          <div className="mt-4 ml-2 space-y-3 border-l border-border/60 pl-4 md:ml-3 md:pl-5">
            <div className="relative">
              <span aria-hidden="true" className="absolute -left-4 top-[1.15rem] w-3.5 border-t border-dashed border-border/80 md:-left-5 md:w-[1.1rem]" />
              <div className="flex items-start gap-2.5 rounded-lg border border-dashed border-border/60 px-3 py-2.5">
                <Pause size={15} aria-hidden="true" className="mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="md:flex md:flex-wrap md:items-baseline md:gap-x-2.5">
                  <p className="text-sm font-semibold text-foreground">{GATE.no.title}</p>
                  <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground md:mt-0">{GATE.no.body}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <span aria-hidden="true" className="absolute -left-4 top-[0.7rem] w-3.5 border-t border-primary/60 md:-left-5 md:w-[1.1rem]" />
              <p className="text-sm font-semibold text-foreground">{GATE.yes.title}</p>
              <div className="mt-2.5 flex flex-col md:flex-row md:items-stretch md:rounded-xl md:border md:border-primary/20 md:bg-card/[0.08] md:p-4">
                <Node kind="input" text="Input" />
                <Connector />
                <SlotPanel slot={ENGINE_SLOT} />
                <Connector />
                <SlotPanel slot={CHECKPOINT_SLOT} />
                <Connector />
                <Node kind="action" text="Action" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 px-4 py-3.5 md:px-6 md:py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">What the answers point to</p>
          <ul className="mt-3 grid gap-1.5 md:grid-cols-4 md:gap-2.5">
            {SHAPES.map((shape) => (
              <li key={shape.key} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 rounded-xl border border-border/50 bg-card/25 px-3 py-2 md:block md:py-2.5">
                <p className="text-[13px] font-semibold leading-snug text-foreground">{shape.name}</p>
                <p className="flex flex-wrap items-center gap-x-1 text-xs leading-snug text-muted-foreground md:mt-1.5">
                  {shape.steps.map((step, i) => (
                    <React.Fragment key={`${step}-${i}`}>
                      {i > 0 && <span aria-hidden="true" className="text-primary/60">→</span>}
                      <span>{STEP_TEXT[step]}</span>
                    </React.Fragment>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <p className="border-t border-border/40 bg-card/[0.15] px-4 py-3 text-[13px] leading-relaxed text-muted-foreground md:px-6">
          {FRAMEWORK_NOTE}
        </p>
      </div>
    </AnimatedSection>
  </div>
);

export default AutomationFramework;
