import React from "react";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../../../components/common/AnimatedSection";

// Linear method, five stages — same restrained technique as Product
// Rescue's CycleBreaker.tsx and Idea-to-Build's MethodSequence.tsx, no
// shared component between them since each is a short, offer-specific
// sequence with no real logic to share (2026-09-30 BUILD/AUTOMATE
// expansion).
const STEPS = ["Remove", "Simplify", "Connect", "Automate", "Keep human"];

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
