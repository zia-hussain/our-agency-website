import React from "react";
import AnimatedSection from "../../../components/common/AnimatedSection";
import SectionEyebrow from "../../../components/common/SectionEyebrow";

// Truth-based urgency (brief Section 3): the consequence isn't manufactured
// scarcity, it's that the cost of guessing wrong compounds the later you
// catch it. Three real stages, qualitative not invented numbers — nothing
// here claims a dollar figure or a saved percentage (2026-10-01 commercial
// experience pass).
const STAGES = [
  {
    label: "Right now",
    state: "A wrong guess costs a conversation.",
    detail: "The V1 boundary is still just a decision — changing your mind here costs nothing but time.",
  },
  {
    label: "Mid-build",
    state: "A wrong guess costs sprints.",
    detail: "Code exists for the wrong version. Undoing it means rewriting, not reprioritizing.",
  },
  {
    label: "After launch",
    state: "A wrong guess costs trust.",
    detail: "Early users formed an opinion of the wrong product. That's harder to walk back than code.",
  },
];

const ConsequenceStakes: React.FC = () => (
  <section className="bg-card/10 border-y border-border/40 py-24 sm:py-28">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <SectionEyebrow className="mb-6">Why Now</SectionEyebrow>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto leading-tight">
          Every implementation decision made before V1 is clear turns a guess into code.
        </h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Not spending is also a decision — it just gets more expensive to reverse the longer it
          waits.
        </p>
      </AnimatedSection>

      <div className="grid gap-4 sm:grid-cols-3">
        {STAGES.map((stage, i) => (
          <AnimatedSection key={stage.label} delay={i * 0.06}>
            <div
              className={`h-full rounded-2xl border p-6 ${
                i === 2 ? "border-primary/40 bg-gradient-to-b from-primary/[0.08] to-transparent" : "border-border/50 bg-background/40"
              }`}
            >
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/50">{stage.label}</p>
              <p className={`mb-3 text-lg font-bold leading-snug ${i === 2 ? "text-primary" : "text-foreground"}`}>{stage.state}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{stage.detail}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.2} className="mt-10 text-center">
        <p className="text-sm text-muted-foreground/80 max-w-md mx-auto">
          This sprint happens at the first stage, on purpose — while the boundary still only
          costs a conversation to change.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ConsequenceStakes;
