import React from "react";
import TiltFrame from "./TiltFrame";

interface HeroEvidenceProps {
  beforeLabel: string;
  beforeValue: string;
  beforeCaption: string;
  pivotLabel: string;
  afterLabel: string;
  afterValue: string;
  afterCaption: string;
  className?: string;
}

// The hero-visual slot every case study fills with a TiltImage. Some
// stories are a verified before/pivot/after contrast rather than a UI
// screenshot or a process diagram — this fills the same slot, inside the
// same TiltFrame (identical border/glare/tilt/shadow treatment), with a
// native evidence card instead of an image. Reused only when a project
// sets `heroEvidence`; every other case study is unaffected.
const HeroEvidence: React.FC<HeroEvidenceProps> = ({
  beforeLabel,
  beforeValue,
  beforeCaption,
  pivotLabel,
  afterLabel,
  afterValue,
  afterCaption,
  className = "",
}) => (
  <TiltFrame>
    <div className={`bg-card/20 px-7 py-9 sm:px-10 sm:py-11 ${className}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 mb-2">
        {beforeLabel}
      </p>
      <p className="text-4xl sm:text-5xl font-bold text-muted-foreground/50 tracking-tight leading-none mb-2">
        {beforeValue}
      </p>
      <p className="text-sm text-muted-foreground/60">{beforeCaption}</p>

      <div className="flex items-center gap-4 my-8" aria-hidden="true">
        <span className="h-px flex-1 bg-border/50" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary whitespace-nowrap">
          {pivotLabel}
        </span>
        <span className="h-px flex-1 bg-border/50" />
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary/70 mb-2">
        {afterLabel}
      </p>
      <p className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-none mb-2">
        {afterValue}
      </p>
      <p className="text-sm text-primary/80">{afterCaption}</p>
    </div>
  </TiltFrame>
);

export default HeroEvidence;
