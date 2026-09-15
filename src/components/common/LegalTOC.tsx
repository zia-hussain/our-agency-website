import React from "react";

interface LegalTOCProps {
  items: { id: string; label: string }[];
}

// Fourteen numbered sections with zero way to jump to the one you actually
// need is the real gap on a legal page — not motion, not color. A quiet
// anchor grid right under the hero, scroll-mt on the headings so a jump
// doesn't land underneath the sticky nav.
const LegalTOC: React.FC<LegalTOCProps> = ({ items }) => (
  <nav aria-label="Table of contents" className="not-prose rounded-xl border border-border/60 bg-card/20 p-6 mb-14 shadow-[0_25px_50px_-28px_rgba(0,0,0,0.55)]">
    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/70 mb-4">On this page</p>
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
        >
          {item.label}
        </a>
      ))}
    </div>
  </nav>
);

export default LegalTOC;
