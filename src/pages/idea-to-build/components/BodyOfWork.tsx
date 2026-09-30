import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import AnimatedSection from "../../../components/common/AnimatedSection";
import SectionEyebrow from "../../../components/common/SectionEyebrow";
import { TESTIMONIALS } from "../../../data/testimonials";

// Liftly is anonymized and has no published video or testimonial quote
// (proofStatus: "draft" in src/data/projects.ts) — so unlike Product
// Rescue's BodyOfWork (built around Josh's video), this flagship section is
// text- and decision-driven: the actual sequencing call Zumetrix made on
// Liftly, stated exactly as the case study itself states it. Pricing
// Engine V2 is explicitly "designed and planned," never implied shipped —
// see src/data/projects.ts's own proofNotes for why that line matters
// (2026-09-30 BUILD/AUTOMATE expansion).
const V1_SHIPPED = [
  "Customer booking, pickup/dropoff, and job/item detail capture",
  "Serviceability and distance-based eligibility logic",
  "Booking deposit and payment handling",
  "Internal admin and booking operations controls",
];

const knipsr = TESTIMONIALS.find((t) => t.id === "founder-knipsr");

const BodyOfWork: React.FC = () => (
  <section className="relative bg-card/10 border-y border-border/40 py-24 sm:py-32">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
      <AnimatedSection className="mb-3">
        <SectionEyebrow>Why Zumetrix</SectionEyebrow>
      </AnimatedSection>
      <AnimatedSection delay={0.03}>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto mb-3">
          We've sequenced a bigger vision before. On purpose.
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          This isn't a hypothetical framework — it's how we actually scoped a real founder's first
          release when the real vision was bigger than V1 could carry.
        </p>
      </AnimatedSection>
    </div>

    {/* Flagship: LIFTLY — the vision vs. the shipped V1, named explicitly */}
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
      <AnimatedSection>
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-3">
          <div className="text-center max-w-[160px] sm:max-w-[200px]">
            <p className="text-sm sm:text-base font-bold text-muted-foreground/45 leading-snug">The full vision</p>
            <p className="text-xs text-muted-foreground/55 mt-2 leading-relaxed">A logistics marketplace with a sophisticated variable-pricing engine</p>
          </div>
          <div aria-hidden="true" className="flex flex-col items-center gap-1">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
            <ArrowRight size={18} className="text-primary/60 flex-shrink-0" />
          </div>
          <div className="text-center max-w-[160px] sm:max-w-[200px]">
            <p className="text-sm sm:text-base font-bold text-primary leading-snug">What shipped as V1</p>
            <p className="text-xs text-foreground/70 mt-2 leading-relaxed">The operational core: booking, serviceability, payment, admin</p>
          </div>
        </div>
      </AnimatedSection>
    </div>

    <AnimatedSection delay={0.05} className="text-center mb-8">
      <span className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">LIFTLY</span>
      <p className="text-xs text-muted-foreground/60 mt-1">Operational V1, shipped — client identity withheld by request</p>
    </AnimatedSection>

    <AnimatedSection delay={0.06} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border/50 bg-background/50 p-7 sm:p-8">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50">What actually shipped in V1</p>
        <ul className="space-y-2.5 mb-6">
          {V1_SHIPPED.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed">
              <Check size={13} className="mt-0.5 flex-shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
        <div className="border-t border-border/30 pt-5">
          <p className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50">
            <X size={11} className="text-muted-foreground/40" />
            Explicitly not in V1
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The Pricing Engine — distance bands, labor, urgency, specialty items, margin protection —
            was designed and documented as a defined V2. It was planned, not built. The vision stayed
            intact; it just didn't have to ship on day one to prove the operational loop worked.
          </p>
        </div>
      </div>
    </AnimatedSection>

    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10 mb-4">
      <AnimatedSection delay={0.09}>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
          <span className="font-semibold text-foreground">A bigger vision doesn't mean a bigger V1.</span>{" "}
          It means knowing which part of the vision needs proving first — and being honest that the
          rest is designed, not shipped, until it earns its place.
        </p>
        <Link to="/portfolio/liftly-operational-mvp-v1" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-2">
          Read the full Liftly case study
          <ArrowRight size={13} />
        </Link>
      </AnimatedSection>
    </div>

    {/* Calmer coda — Knipsr, for the engineering side of turning a build into a real product */}
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-border/30">
      <AnimatedSection className="text-center mb-8">
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          The other half of this: once V1 is defined, it has to survive contact with real usage.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.05}>
        <div className="rounded-2xl border border-border/50 bg-background/50 p-7 sm:p-9">
          <p className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1.5">BUILT</p>
          <p className="text-xs text-muted-foreground/60 mb-6">Knipsr — event media platform, launch-ready</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            A no-login, QR-based guest upload experience up front — durable background processing,
            retry and recovery, and real event-day load underneath. Simple where guests touch it,
            engineered where it counts.
          </p>
          {knipsr && (
            <blockquote className="pb-5 border-b border-border/30">
              <p className="text-sm text-foreground/80 italic leading-relaxed">"{knipsr.quote}"</p>
              <p className="text-xs text-muted-foreground mt-2">Founder, Knipsr</p>
            </blockquote>
          )}
          <Link to="/portfolio/knipsr-event-media-saas" className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors duration-200">
            See the case study
            <ArrowRight size={11} />
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="text-center mt-10">
        <p className="text-sm font-medium text-foreground/80">
          We name what ships now, what waits, and why — then build the part that ships so it holds up.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default BodyOfWork;
