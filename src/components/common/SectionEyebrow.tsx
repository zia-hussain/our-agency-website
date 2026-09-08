import React from "react";

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
}

// Tier A of the site's eyebrow system — the canonical rounded pill Hero
// already uses for its badge. Reserved for top-level section labels (FAQ,
// The Process, The Record, Where You Start). Chapter-level identifiers use
// a smaller, un-pilled tag instead (see ServicesPage's inline chapter tag),
// and micro annotations (Before/After, etc.) stay plain quiet text — three
// related but visually distinct tiers, not one pattern applied everywhere.
const SectionEyebrow: React.FC<SectionEyebrowProps> = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full border border-border/60 bg-card/40 backdrop-blur-xl px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-primary/90 ${className}`}
  >
    {children}
  </span>
);

export default SectionEyebrow;
