import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import AnimatedSection from "../../../components/common/AnimatedSection";
import SectionEyebrow from "../../../components/common/SectionEyebrow";

// Flagship proof here is Zumetrix's own internal operating stack — real,
// dogfooded, with a founder testimonial already public in
// src/data/projects.ts (id 20). No client-facing automation case study
// matched this offer more honestly: it's the actual REMOVE/SIMPLIFY/
// CONNECT/AUTOMATE method, applied to Zumetrix's own operations, not a
// hypothetical. Coda is the Stripe→Airtable sync (id 16) — a real,
// deterministic, webhook-driven CONNECT automation, explicitly not AI
// (2026-09-30 BUILD/AUTOMATE expansion).
const STACK_RESULTS = [
  "Centralized tracking of deals, proposals, and client pipelines",
  "Automated repetitive reporting and reminders",
  "Let the founder operate like a small agency instead of a solo freelancer",
];

const BodyOfWork: React.FC = () => (
  <section className="relative bg-card/10 border-y border-border/40 py-24 sm:py-32">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
      <AnimatedSection className="mb-3">
        <SectionEyebrow>Why Zumetrix</SectionEyebrow>
      </AnimatedSection>
      <AnimatedSection delay={0.03}>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto mb-3">
          We run on the same method we're selling you.
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          This isn't a framework we made up for a landing page — it's how Zumetrix's own operations
          are actually built.
        </p>
      </AnimatedSection>
    </div>

    {/* Flagship — Zumetrix's own internal stack */}
    <AnimatedSection delay={0.05} className="text-center mb-8">
      <span className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">OUR OWN SYSTEM</span>
      <p className="text-xs text-muted-foreground/60 mt-1">Zumetrix Labs' internal automation & CRM stack</p>
    </AnimatedSection>

    <AnimatedSection delay={0.06} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border/50 bg-background/50 p-7 sm:p-8">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50">What it replaced</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          As deal volume and project count grew, tracking everything with ad-hoc tools and mental
          notes stopped working — the workflow itself was the bottleneck, not the team's effort.
        </p>
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50">What it is now</p>
        <ul className="space-y-2.5 mb-6">
          {STACK_RESULTS.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed">
              <Check size={13} className="mt-0.5 flex-shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
        <div className="border-t border-border/30 pt-5">
          <blockquote>
            <p className="text-sm text-foreground/80 italic leading-relaxed">
              "These tools are why Zumetrix Labs can juggle so many high-impact projects without
              dropping the ball."
            </p>
            <p className="text-xs text-muted-foreground mt-2">Zia Hussain, Founder</p>
          </blockquote>
        </div>
      </div>
    </AnimatedSection>

    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10 mb-4">
      <AnimatedSection delay={0.09}>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
          <span className="font-semibold text-foreground">Rules, not AI.</span> Airtable, Notion, and
          Google Sheets, connected with Make.com and Zapier — syncing and reminders, deliberately
          without AI where none was needed.
        </p>
        <Link to="/portfolio/zumetrix-labs-internal-automation-stack" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-2">
          Read the full internal stack case study
          <ArrowRight size={13} />
        </Link>
      </AnimatedSection>
    </div>

    {/* Calmer coda — client-facing CONNECT automation */}
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-border/30">
      <AnimatedSection className="text-center mb-8">
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          The CONNECT stage in practice, for a client's actual workflow.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.05}>
        <div className="rounded-2xl border border-border/50 bg-background/50 p-7 sm:p-9">
          <p className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1.5">CONNECTED</p>
          <p className="text-xs text-muted-foreground/60 mb-6">Stripe → Airtable subscription sync</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            Subscription events in Stripe now update Airtable automatically — webhook-driven, fully
            deterministic, no manual copying and no AI in the loop, because the task never needed it.
          </p>
          <Link to="/portfolio/stripe-to-airtable-subscription-sync" className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors duration-200">
            See the case study
            <ArrowRight size={11} />
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="text-center mt-10">
        <p className="text-sm font-medium text-foreground/80">
          We connect what should sync automatically, and leave AI out of what doesn't need it.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default BodyOfWork;
