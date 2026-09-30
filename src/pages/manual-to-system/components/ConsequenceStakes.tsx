import React from "react";
import AnimatedSection from "../../../components/common/AnimatedSection";
import SectionEyebrow from "../../../components/common/SectionEyebrow";

// Truth-based urgency (brief Section 3) — AUTOMATE's version. The
// consequence compounds weekly, not through invented savings: every week
// a workflow stays manual, a person stays responsible for work a system
// could carry, and that responsibility doesn't show up on any P&L line
// (2026-10-01 commercial experience pass).
const ROWS = [
  { label: "This week", detail: "One person quietly absorbs the handoffs. It feels manageable." },
  { label: "This quarter", detail: "The workaround becomes 'how we do things' — new hires learn it as normal." },
  { label: "Next hire", detail: "You hire to cover the workflow, not because the business grew." },
];

const ConsequenceStakes: React.FC = () => (
  <section className="py-24 sm:py-28">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <SectionEyebrow className="mb-6">Why Now</SectionEyebrow>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto leading-tight">
          Every week a workflow stays manual, a person stays responsible for what a system could carry.
        </h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Not a number we'll invent — a pattern that compounds quietly enough that nobody
          questions it.
        </p>
      </AnimatedSection>

      <div className="space-y-3">
        {ROWS.map((row, i) => (
          <AnimatedSection key={row.label} delay={i * 0.06}>
            <div className={`flex items-center gap-5 rounded-xl border p-5 ${i === 2 ? "border-primary/40 bg-primary/[0.05]" : "border-border/50 bg-card/10"}`}>
              <span className={`text-xs font-semibold uppercase tracking-[0.14em] w-28 flex-shrink-0 ${i === 2 ? "text-primary" : "text-muted-foreground/60"}`}>{row.label}</span>
              <span className="text-sm text-foreground/85 leading-relaxed">{row.detail}</span>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.2} className="mt-10 text-center">
        <p className="text-sm text-muted-foreground/80 max-w-md mx-auto">
          This sprint happens before the next hire, on purpose — while the fix is still a system
          decision, not a headcount decision.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ConsequenceStakes;
