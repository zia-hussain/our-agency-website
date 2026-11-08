import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

/**
 * The bounded paid step that sits beside an implementation service — offered,
 * not required. One anchored block so `/start` and the homepage can link
 * straight to it. Prices and names come from the caller (src/config/offers.ts);
 * this component states no promise of its own.
 */
interface OptionalStepProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: string[];
  cta: { label: string; href: string; onClick?: () => void };
  /** The implementation path, restated so the paid step never reads as the only door. */
  alternative?: { label: string; href: string };
}

const OptionalStep: React.FC<OptionalStepProps> = ({ id, eyebrow, title, description, meta, cta, alternative }) => (
  <section id={id} className="relative bg-background py-14 sm:py-16 scroll-mt-28">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection>
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-14 items-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent p-7 sm:p-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/90 mb-4">{eyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-[1.15] mb-4">{title}</h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">{description}</p>
          </div>
          <div className="lg:border-l lg:border-border/40 lg:pl-10">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-6">
              {meta.map((m, i) => (
                <React.Fragment key={m}>
                  {i > 0 && <span className="text-muted-foreground/70" aria-hidden="true">·</span>}
                  <span className={i === 1 ? "font-semibold text-foreground" : "text-muted-foreground"}>{m}</span>
                </React.Fragment>
              ))}
            </div>
            <Link
              to={cta.href}
              onClick={cta.onClick}
              className="btn-sheen group inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/[0.08] text-foreground pl-6 pr-2 py-2.5 text-sm font-semibold hover:bg-primary/[0.14] transition-colors duration-200"
            >
              {cta.label}
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 text-primary">
                <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
              </span>
            </Link>
            {alternative && (
              <p className="mt-4 text-xs text-muted-foreground/70">
                Or skip it:{" "}
                <Link to={alternative.href} className="text-foreground/80 hover:text-primary underline-offset-2 hover:underline transition-colors">
                  {alternative.label}
                </Link>
              </p>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default OptionalStep;
