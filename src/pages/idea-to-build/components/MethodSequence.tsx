import React from "react";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../../../components/common/AnimatedSection";

// A linear method, not a loop — deliberately no "repeats" indicator (that
// was Product Rescue's CycleBreaker.tsx, for a trap that circles back on
// itself; this offer's method resolves forward, once, into a decision).
const STEPS = ["Proof", "Journey", "Build", "Not yet", "Learn"];

const MethodSequence: React.FC = () => (
  <AnimatedSection className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4">
    {STEPS.map((step, i) => (
      <React.Fragment key={step}>
        <div className="rounded-full border border-border/50 bg-card/20 px-4 py-2.5 sm:px-5 sm:py-3">
          <span className="text-xs sm:text-sm font-medium text-foreground/80">{step}</span>
        </div>
        {i < STEPS.length - 1 && (
          <ArrowRight aria-hidden="true" size={14} className="flex-shrink-0 text-border" />
        )}
      </React.Fragment>
    ))}
  </AnimatedSection>
);

export default MethodSequence;
