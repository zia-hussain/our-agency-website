import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import AnimatedSection from "../../../components/common/AnimatedSection";
import SectionEyebrow from "../../../components/common/SectionEyebrow";
import TestimonialFilm from "../../../components/common/TestimonialFilm";
import { TESTIMONIALS } from "../../../data/testimonials";

// One continuous proof experience, not "authority section" + "proof
// section" back to back — the same structural move RescueDetailPage
// already makes: the flagship story gets full cinematic weight (a
// standalone word, a stat pair, video, blockquote), then a deliberately
// calmer two-column coda names the other two competencies with real,
// checkmarked specifics rather than a third equal-weight card. All copy
// below is adapted from already-verified, already-public case study
// language (RescueDetailPage's own Knipsr and Learning-Platform sections)
// — nothing new is claimed here. Learning Platform stays fully anonymous.
const KNIPSR_HARDENED = [
  "Durable background processing for media, with retry & recovery",
  "Storage & delivery across Supabase, Postgres, Edge Functions, Cloudflare Stream",
  "Caching & performance tuning for gallery load under real usage",
  "Private access & expiry flows for guest and host privacy",
];

const TRIAGE_CATEGORIES = ["Bug", "Unfinished feature", "Intentional behavior", "Future scope"];

const fastTrack = TESTIMONIALS.find((t) => t.id === "josh-fast-track");
const knipsr = TESTIMONIALS.find((t) => t.id === "founder-knipsr");

const BodyOfWork: React.FC = () => {
  if (!fastTrack?.evidence?.before || !fastTrack.evidence.after) return null;

  return (
    <section className="relative bg-card/10 border-y border-border/40 py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <AnimatedSection className="mb-3">
          <SectionEyebrow>Why Zumetrix</SectionEyebrow>
        </AnimatedSection>
        <AnimatedSection delay={0.03}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto mb-3">
            We didn't build this after one rescue went well.
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            New teams often start prescribing before they understand what's actually there. Product
            Rescue reverses that order — evidence first, a recommendation second, implementation
            third, only if you want it from us.
          </p>
        </AnimatedSection>
      </div>

      {/* Flagship: RESCUED — full cinematic weight, one continuous scene */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-6 sm:gap-10 mb-3">
            <div className="text-center">
              <p className="text-4xl sm:text-6xl font-bold text-muted-foreground/35 line-through decoration-2 tracking-tight">{fastTrack.evidence.before.stat}</p>
              <p className="text-xs text-muted-foreground/50 mt-2">{fastTrack.evidence.before.label}</p>
            </div>
            <div aria-hidden="true" className="flex flex-col items-center gap-1">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
              <ArrowRight size={18} className="text-primary/60 flex-shrink-0" />
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-6xl font-bold text-primary tracking-tight">{fastTrack.evidence.after.stat}</p>
              <p className="text-xs text-muted-foreground mt-2">{fastTrack.evidence.after.label}</p>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.05} className="text-center mb-8">
        <span className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">RESCUED</span>
        <p className="text-xs text-muted-foreground/60 mt-1">One client's stuck product, in his own words</p>
      </AnimatedSection>

      <AnimatedSection delay={0.06} className="flex justify-center mb-6" aria-hidden="true">
        <span className="w-px h-8 bg-gradient-to-b from-primary/50 to-border/40" />
      </AnimatedSection>

      <AnimatedSection delay={0.07} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-6 text-center">Josh, in his own words</p>
        <TestimonialFilm
          src="/videos/Josh.mp4"
          poster="/images/video-posters/josh-nyce-poster.jpg"
          captionsSrc="/captions/josh-nyce-testimonial.vtt"
          variant="proof"
        />
      </AnimatedSection>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 mb-4">
        <AnimatedSection delay={0.09}>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            <span className="font-semibold text-foreground">Time elapsed is not a diagnosis.</span>{" "}
            Two years stuck doesn't, by itself, tell you whether the answer is a patch, a
            stabilization, one subsystem replaced, or a full rebuild. One verified story — not a
            typical timeline.
          </p>
          <Link to="/portfolio/fast-track-usa-app-rescue" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-2">
            Read the full Fast Track case study
            <ArrowRight size={13} />
          </Link>
        </AnimatedSection>
      </div>

      {/* Calmer coda — the other two competencies, quieter deliberately */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-border/30">
        <AnimatedSection className="text-center mb-12">
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Rebuilding isn't the only thing we know how to do. We've operated on more than one side of
            this.
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-primary/50 line-through decoration-1">RESCUED</span>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-foreground">BUILT</span>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-foreground">STABILIZED</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.06} className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          <div className="rounded-2xl border border-border/50 bg-background/50 p-7 sm:p-9">
            <p className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1.5">BUILT</p>
            <p className="text-xs text-muted-foreground/60 mb-6">Knipsr — event media platform</p>

            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50 mb-1.5">Situation</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">Simple guest experience, real event-day load underneath.</p>

            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50 mb-2">Role</p>
            <ul className="space-y-2 mb-5">
              {KNIPSR_HARDENED.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                  <Check size={11} className="text-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50 mb-2">Demonstrates</p>
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

          <div className="rounded-2xl border border-border/50 bg-background/50 p-7 sm:p-9">
            <p className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1.5">STABILIZED</p>
            <p className="text-xs text-muted-foreground/60 mb-6">A founder-built SaaS, kept anonymous</p>

            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50 mb-1.5">Situation</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">A fast-growing product that needed stabilizing, not rebuilding.</p>

            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50 mb-1.5">Role</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">Frontend, backend, and routing stabilized — without a rewrite.</p>

            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50 mb-2">Demonstrates</p>
            <div className="grid grid-cols-2 gap-2 pb-5 border-b border-border/30">
              {TRIAGE_CATEGORIES.map((cat) => (
                <span key={cat} className="text-xs font-medium text-foreground/80 border border-border/50 rounded-lg px-2.5 py-2 text-center">
                  {cat}
                </span>
              ))}
            </div>
            <Link to="/portfolio/learning-platform-saas-stabilization" className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors duration-200">
              See the case study
              <ArrowRight size={11} />
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.14} className="text-center mt-10">
          <p className="text-sm font-medium text-foreground/80">
            We build. We stabilize. We rescue. "Replace everything" was never going to be our default
            answer.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default BodyOfWork;
