import React from "react";
import { ArrowRight, Repeat } from "lucide-react";
import AnimatedSection from "../../../components/common/AnimatedSection";

// The trap is a loop, not a villain — four nodes that would keep circling
// back to the first without something breaking the pattern. The loop-back
// connector is the whole argument; no explanatory paragraph needed under
// it (compression pass: the headline that used to sit here now leads the
// signature section directly, so this is purely the visual).
const NODES = ["Symptom", "Opinion", "More work", "Another symptom"];

const CycleBreaker: React.FC = () => (
  <AnimatedSection className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4">
    {NODES.map((node, i) => (
      <React.Fragment key={node}>
        <div className="rounded-full border border-border/50 bg-card/20 px-4 py-2.5 sm:px-5 sm:py-3">
          <span className="text-xs sm:text-sm font-medium text-foreground/80">{node}</span>
        </div>
        {i < NODES.length - 1 && (
          <ArrowRight aria-hidden="true" size={14} className="flex-shrink-0 text-border" />
        )}
      </React.Fragment>
    ))}
    <span className="mx-1 flex-shrink-0 text-border/50" aria-hidden="true">
      <Repeat size={14} />
    </span>
    <span className="text-xs text-muted-foreground/50 italic">repeats</span>
  </AnimatedSection>
);

export default CycleBreaker;
