import React from "react";
import AnimatedSection from "../../../components/common/AnimatedSection";
import SectionEyebrow from "../../../components/common/SectionEyebrow";

// Added during the 2026-10-01 commercial experience pass across all three
// offers — Product Rescue was the one page in the system with no explicit
// consequence/urgency moment at all. Same truth-based pattern as
// Idea-to-Build's and Manual-to-System's ConsequenceStakes (three real
// stages, no invented numbers), FIX-specific content: the cost compounds
// with every implementation decision made on top of an undiagnosed
// problem. This is a pure addition to the live page — no other section
// changed, no backend/application behavior touched.
const STAGES = [
  { label: "Right now", state: "A wrong diagnosis costs a conversation.", detail: "Nothing has been built on the guess yet — changing course here costs nothing but time." },
  { label: "Next fix", state: "A wrong diagnosis costs a sprint.", detail: "Work goes into patching a symptom. If it was the wrong one, that work doesn't transfer." },
  { label: "Next rebuild", state: "A wrong diagnosis costs a rebuild.", detail: "The biggest bet, made on the same unverified read of what's actually wrong." },
];

const ConsequenceStakes: React.FC = () => (
  <section className="bg-card/10 border-y border-border/40 py-24 sm:py-28">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <SectionEyebrow className="mb-6">Why Now</SectionEyebrow>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto leading-tight">
          Every fix, feature, or rebuild decided before the real problem is known deepens the bet on a guess.
        </h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Waiting doesn't pause the decision. It just means the next dollar gets spent on the same
          unverified guess.
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
          This assessment happens at the first stage, on purpose — while the diagnosis still
          only costs a conversation to get right.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ConsequenceStakes;
