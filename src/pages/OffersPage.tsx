import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionEyebrow from "../components/common/SectionEyebrow";
import ClosingGlow from "../components/common/ClosingGlow";
import { OFFERS, offerHref } from "../config/offers";
import { trackOfferSelect, trackOffersHubView, trackContextualOfferCtaClick } from "../utils/analytics";

// The one new public surface in the commercial-routing pass (2026-10-11),
// re-art-directed (2026-10-18) after the first pass read as a conventional
// SaaS pricing/comparison page — three equal cards, a feature-style table,
// three proof cards. BUILD/FIX/AUTOMATE aren't Basic/Pro/Enterprise; they're
// three different states a buyer is already in. The page's only job is
// recognition, so each one gets a full-width editorial chapter instead of
// a card, proof is integrated into its own chapter rather than pooled into
// a separate "proof" section, and the three-table comparison is replaced
// with four plain facts — there's nothing here that needs a feature matrix.
const CHAPTERS = [
  {
    n: "01",
    offer: "idea-to-build" as const,
    label: "Nothing Has Been Built Yet",
    statement: ["You have the idea.", "V1 is still a decision."],
    body: "Before turning assumptions into development cost, decide what the first version actually needs to prove.",
    deliverable: "Build-Ready V1 Brief",
    cta: "Show Us What You're Building",
    proofLabel: "Liftly",
    proof: "The broader marketplace vision already existed. The operational V1 had to be decided first — what the business actually needed to run, before the sophisticated parts.",
    proofHref: "/portfolio/liftly-operational-mvp-v1",
  },
  {
    n: "02",
    offer: "product-rescue" as const,
    label: "The Product Already Exists",
    statement: ["The code exists.", "Certainty doesn't."],
    body: "Before another sprint or rebuild, find out what deserves keeping, fixing, replacing, or leaving alone.",
    deliverable: "Rescue Brief",
    cta: "Show Us Where You're Stuck",
    proofLabel: "Fast Track USA",
    proof: "Josh Nyce describes roughly two years with a previous team without a reliable launch. Zumetrix took the project over and shipped it in three weeks, per Josh's own account.",
    proofHref: "/portfolio/fast-track-usa-app-rescue",
    emphasis: true,
  },
  {
    n: "03",
    offer: "manual-to-system" as const,
    label: "The Workflow Already Exists",
    statement: ["The workflow works.", "Your team shouldn't be the integration."],
    body: "Before adding another tool, decide what should disappear, simplify, connect, automate, and remain human.",
    deliverable: "Workflow System Plan",
    cta: "Show Us The Workflow",
    proofLabel: "Floating Stone Ranch",
    proof: "A beef processor's carcass intake, boxing, and shipping ran on spreadsheets and paper. Centralized into one system, with the status transitions that used to be tracked by hand automated instead.",
    proofHref: "/portfolio/floating-stone-ranch-processor-intake-engine",
  },
];

const FACTS = [
  "5 business days",
  "A concrete decision artifact",
  "Implementation is separate",
  "Use the output with us or another team",
];

const OffersPage: React.FC = () => {
  useEffect(() => {
    trackOffersHubView();
  }, []);

  return (
    <PageTransition>
      <SEO
        title="Offers — Three Ways to Start With Zumetrix | Zumetrix Labs"
        description="Three bounded, paid decisions — not packages. Idea-to-Build, Product Rescue, and Manual-to-System each give you a clear next step before any larger commitment."
        url="https://zumetrix.com/offers"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(196,138,100,0.06),transparent_65%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection mode="hero" className="mb-7">
            <SectionEyebrow>Three Ways to Start</SectionEyebrow>
          </AnimatedSection>
          <AnimatedSection mode="hero" delay={0.04}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground mb-8 text-balance">
              Start with what already exists.
            </h1>
          </AnimatedSection>
          <AnimatedSection mode="hero" delay={0.08} className="space-y-2 mb-9">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              No product yet? Decide what V1 needs to prove.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Product already exists? Decide what deserves fixing.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Workflow already exists? Decide what deserves automation.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.14}>
            <p className="text-sm text-muted-foreground/70">
              Offers decide what should happen next.{" "}
              <span className="text-foreground/80 font-medium">Services are how we implement it.</span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Three editorial chapters */}
      <div className="relative bg-background">
        {CHAPTERS.map((chapter) => {
          const offer = OFFERS[chapter.offer];
          return (
            <section
              key={chapter.offer}
              className={`relative border-t border-border/40 ${chapter.emphasis ? "py-24 sm:py-32 bg-card/10" : "py-20 sm:py-28"}`}
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
                  {/* Main column */}
                  <div className="max-w-2xl">
                    <AnimatedSection className="flex items-baseline gap-4 mb-5">
                      <span className="text-sm font-mono text-primary/50 tracking-wider">{chapter.n}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/70">
                        {chapter.label}
                      </span>
                    </AnimatedSection>

                    <AnimatedSection delay={0.04}>
                      <h2
                        className={`font-bold tracking-tight leading-[1.08] text-foreground mb-6 ${
                          chapter.emphasis ? "text-3xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-5xl"
                        }`}
                      >
                        {chapter.statement.map((line, i) => (
                          <span key={i} className={`block ${i === 1 ? "text-muted-foreground/50" : ""}`}>
                            {line}
                          </span>
                        ))}
                      </h2>
                    </AnimatedSection>

                    <AnimatedSection delay={0.08}>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                        {chapter.body}
                      </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.12}>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground/80 mb-8 pb-8 border-b border-border/40">
                        <span className="font-semibold">{offer.name}</span>
                        <span className="text-muted-foreground/40" aria-hidden="true">·</span>
                        <span className="font-semibold text-foreground">${offer.price}</span>
                        <span className="text-muted-foreground/40" aria-hidden="true">·</span>
                        <span className="text-muted-foreground">5 business days</span>
                        <span className="text-muted-foreground/40" aria-hidden="true">·</span>
                        <span className="text-muted-foreground">{chapter.deliverable}</span>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.16}>
                      <Link
                        to={offerHref(chapter.offer, "offers-hub")}
                        onClick={() => trackOfferSelect(chapter.offer)}
                        className="btn-sheen group inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-6 pr-2 py-2.5 text-sm font-semibold"
                      >
                        {chapter.cta}
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                          <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                        </span>
                      </Link>
                    </AnimatedSection>
                  </div>

                  {/* Proof column — asymmetric, integrated, not a card */}
                  <AnimatedSection delay={0.1} className="lg:max-w-[15rem] lg:border-l lg:border-primary/20 lg:pl-8">
                    <Link
                      to={chapter.proofHref}
                      onClick={() => trackContextualOfferCtaClick(chapter.offer, "offers-hub-proof")}
                      className="group block"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-2.5">
                        {chapter.proofLabel}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{chapter.proof}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 group-hover:text-primary transition-colors duration-200">
                        See the case study
                        <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                      </span>
                    </Link>
                  </AnimatedSection>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Engagement model — four facts, not a comparison table */}
      <section className="relative border-t border-border/40 bg-background py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-lg sm:text-xl font-bold text-foreground tracking-tight mb-8">
              Different decision. Same engagement model.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {FACTS.map((fact, i) => (
                <React.Fragment key={fact}>
                  {i > 0 && <span className="hidden sm:inline text-muted-foreground/30" aria-hidden="true">·</span>}
                  <span>{fact}</span>
                </React.Fragment>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Close — thinking-partner positioning, not a generic sales CTA */}
      <section className="relative bg-background pb-24 sm:pb-32">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-5">
              None of These Sound Exactly Right?
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-[1.2] mb-5">
              Don't choose an offer just to choose one.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-9 max-w-md mx-auto">
              Tell us what's happening. We'll tell you honestly whether one of
              these fits — or whether you shouldn't buy one at all.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="relative inline-block">
            <ClosingGlow />
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="btn-sheen group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-7 pr-2 py-3 text-base font-semibold"
              >
                Tell Us The Situation
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </motion.span>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default OffersPage;
