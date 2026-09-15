import React, { useEffect, useState } from "react";

interface LegalTOCProps {
  items: { id: string; label: string }[];
}

// Fourteen numbered sections with zero way to jump to the one you actually
// need is the real gap on a legal page — not motion, not color. A quiet
// anchor grid right under the hero, scroll-mt on the headings so a jump
// doesn't land underneath the sticky nav. Tracks which section is actually
// in view as you scroll and highlights it — the same "you are here" craft
// a well-built docs site has, done with a plain observer, not a library.
const LegalTOC: React.FC<LegalTOCProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Topmost visible heading wins — stable even when several
          // short sections are on screen at once.
          const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActiveId(topMost.target.id);
        }
      },
      { rootMargin: "-100px 0px -55% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav aria-label="Table of contents" className="not-prose rounded-xl border border-border/60 bg-card/20 p-6 mb-14 shadow-[0_25px_50px_-28px_rgba(0,0,0,0.55)]">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/70 mb-4">On this page</p>
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative pl-3 py-1 text-sm transition-colors duration-200 ${
                isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-colors duration-200 ${
                  isActive ? "bg-primary" : "bg-transparent"
                }`}
              />
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default LegalTOC;
