import React, { useMemo } from "react";
import { projects } from "../../data/projects";

// A new signature moment for the portfolio hub — not recycled from the
// service pages. Every real KPI across the full 20-project archive (not
// just the 3 featured) scrolls past continuously, so the page communicates
// real volume and breadth the moment you land, not just three examples.
const ProofMarquee: React.FC = () => {
  const items = useMemo(() => {
    const all = projects.flatMap((p) =>
      (p.kpis ?? []).map((kpi) => ({
        value: kpi.value,
        label: kpi.label,
        project: p.title.split(/[–-]/)[0].trim(),
      }))
    );
    // Shuffle deterministically-ish by project id parity so the strip
    // doesn't read as "one project's four stats, then the next project's".
    return all;
  }, []);

  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border/40 bg-card/10 py-7">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="animate-marquee flex items-center gap-14 sm:gap-20 w-max" style={{ animationDuration: "140s" }}>
        {track.map((item, i) => (
          <div key={i} className="flex items-baseline gap-2.5 flex-shrink-0">
            <span className="text-lg sm:text-xl font-semibold text-primary/90 whitespace-nowrap">{item.value}</span>
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{item.label}</span>
            <span className="text-xs text-muted-foreground/40 whitespace-nowrap hidden sm:inline">— {item.project}</span>
            <span className="text-border/40 ml-10 sm:ml-14" aria-hidden="true">·</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProofMarquee;
