import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, LifeBuoy, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionEyebrow from "../components/common/SectionEyebrow";
import { OFFERS } from "../config/offers";
import { trackOfferSelect, trackContextualOfferCtaClick } from "../utils/analytics";

// The one new public surface in this pass (2026-10-11 commercial routing
// pass). Its only job is recognition — "that's my situation" — not
// persuasion; the three landing pages this routes to already do the deep
// selling. Deliberately shorter and quieter than any of them: no pricing-
// card tropes, no tier comparison, no urgency. A visitor should be able to
// read the whole thing in under a minute and know which door to walk
// through, or that none of them fit yet.
const RECOGNITION = [
  {
    offer: "idea-to-build",
    icon: Compass,
    situation: "Nothing's built yet.",
    detail: "The idea exists. The first version doesn't — or it's still arguable what it should even include.",
    cta: "Show Us What You're Building",
  },
  {
    offer: "product-rescue",
    icon: LifeBuoy,
    situation: "Something already exists — and it's not right.",
    detail: "Stalled, breaking, inherited, or you just don't trust the direction it's headed.",
    cta: "Show Us Where You're Stuck",
  },
  {
    offer: "manual-to-system",
    icon: Workflow,
    situation: "Your team keeps doing this by hand.",
    detail: "A real workflow, run by people, that a system could probably be carrying instead.",
    cta: "Show Us The Workflow",
  },
] as const;

const COMPARISON_ROWS: { label: string; values: [string, string, string] }[] = [
  {
    label: "Core decision",
    values: [
      "What does V1 actually need to prove?",
      "What should we keep, fix, replace, and do next?",
      "What should disappear, simplify, connect, automate, or stay human?",
    ],
  },
  {
    label: "Price",
    values: ["$950", "$750", "$750"],
  },
  {
    label: "Delivery",
    values: ["5 business days once context is ready", "5 business days once access is ready", "5 business days once input is ready"],
  },
  {
    label: "You receive",
    values: ["Build-Ready V1 Brief + walkthrough", "Rescue Brief + walkthrough", "Workflow System Plan + walkthrough"],
  },
  {
    label: "Implementation included",
    values: ["No", "No", "No"],
  },
  {
    label: "Usable with another team",
    values: ["Yes", "Yes", "Yes"],
  },
];

const PROOF = [
  {
    offer: "idea-to-build",
    name: "Liftly",
    blurb: "The founder's broader marketplace vision was deliberately sequenced: ship the operational foundation first, design the sophisticated pricing engine for a defined V2.",
    href: "/portfolio/liftly-operational-mvp-v1",
  },
  {
    offer: "product-rescue",
    name: "Fast Track USA",
    blurb: "A previous team spent roughly two years without a reliable launch. Zumetrix took over an existing, in-progress app and shipped it in three weeks.",
    href: "/portfolio/fast-track-usa-app-rescue",
  },
  {
    offer: "manual-to-system",
    name: "Zumetrix's own internal stack",
    blurb: "Deal tracking, task boards, and reporting that let the founder run the agency instead of running the chaos — shown transparently as our own system, not a client's.",
    href: "/portfolio/zumetrix-labs-internal-automation-stack",
  },
] as const;

const OffersPage: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Offers — Three Ways to Start With Zumetrix | Zumetrix Labs"
        description="Three bounded, paid decisions — not packages. Idea-to-Build, Product Rescue, and Manual-to-System each give you a clear next step before any larger commitment."
        url="https://zumetrix.com/offers"
      />

      {/* Hero — recognition, not persuasion */}
      <section className="relative overflow-hidden bg-background pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(196,138,100,0.06),transparent_65%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection mode="hero" className="mb-6">
            <SectionEyebrow>Where You Start</SectionEyebrow>
          </AnimatedSection>
          <AnimatedSection mode="hero" delay={0.04}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground mb-6 text-balance">
              Which one is actually true right now?
            </h1>
          </AnimatedSection>
          <AnimatedSection mode="hero" delay={0.08}>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Pick the situation, not the package. Each one is a bounded, paid
              decision — not a discount version of a bigger project.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.14} className="mt-8">
            <p className="text-sm text-muted-foreground/70 max-w-md mx-auto leading-relaxed">
              An offer decides what should happen next.{" "}
              <span className="text-foreground/80 font-medium">A service is how it gets built.</span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Recognition — the actual job of this page */}
      <section className="relative bg-background pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {RECOGNITION.map((item, index) => {
              const offer = OFFERS[item.offer];
              return (
                <AnimatedSection key={item.offer} delay={index * 0.06}>
                  <Link
                    to={`/${item.offer}`}
                    onClick={() => trackOfferSelect(item.offer)}
                    className="group relative flex h-full flex-col rounded-[1.75rem] border border-border/60 bg-card/25 backdrop-blur-xl p-7 sm:p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card/40 hover:-translate-y-1 ring-1 ring-inset ring-white/[0.02]"
                  >
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-primary/25 bg-background mb-6 group-hover:border-primary/45 transition-colors duration-300">
                      <item.icon size={18} className="text-primary" />
                    </span>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-2.5">
                      {offer.category}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-snug mb-3">
                      {item.situation}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-7">{item.detail}</p>

                    <div className="mt-auto pt-6 border-t border-border/50">
                      <div className="mb-5">
                        <span className="block text-[11px] uppercase tracking-[0.1em] text-muted-foreground/60 mb-1.5 truncate">
                          {offer.name}
                        </span>
                        <p className="text-2xl font-bold text-foreground leading-none tracking-tight">
                          ${offer.price}
                          <span className="ml-2 text-xs font-normal text-muted-foreground/60 tracking-normal">
                            · 5 business days
                          </span>
                        </p>
                      </div>
                      <span className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        {item.cta}
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 group-hover/link:bg-primary/20 transition-colors duration-300">
                          <ArrowRight size={13} className="group-hover/link:translate-x-[1.5px] transition-transform duration-200" />
                        </span>
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison — fast, honest, not a feature table */}
      <section className="relative bg-card/10 border-y border-border/40 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionEyebrow className="mb-4">Side by Side</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              One page, the whole comparison.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.06}>
            <p className="sm:hidden text-center text-xs text-muted-foreground/50 mb-3">
              Swipe to compare all three →
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground/50 pb-4 pr-4 w-[22%]" />
                    {RECOGNITION.map((item) => (
                      <th key={item.offer} className="text-left pb-4 px-4 border-b border-border/50">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-1">
                          {OFFERS[item.offer].category}
                        </span>
                        <span className="block text-sm font-bold text-foreground">{OFFERS[item.offer].name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label} className="border-b border-border/30 last:border-0">
                      <td className="py-4 pr-4 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground/60 align-top">
                        {row.label}
                      </td>
                      {row.values.map((value, i) => (
                        <td key={i} className="py-4 px-4 text-sm text-foreground/85 leading-relaxed align-top">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="pt-6 pr-4" />
                    {RECOGNITION.map((item) => (
                      <td key={item.offer} className="pt-6 px-4">
                        <Link
                          to={`/${item.offer}`}
                          onClick={() => trackOfferSelect(item.offer)}
                          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-2"
                        >
                          Explore
                          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Proof — real, specific, minimal */}
      <section className="relative bg-background py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionEyebrow className="mb-4">Already Done This</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              One real example per situation.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {PROOF.map((item, index) => (
              <AnimatedSection key={item.offer} delay={index * 0.06}>
                <Link
                  to={item.href}
                  onClick={() => trackContextualOfferCtaClick(item.offer, "offers-hub-proof")}
                  className="group flex h-full flex-col rounded-2xl border border-border/50 bg-card/15 p-6 hover:border-primary/25 hover:bg-card/30 transition-colors duration-200"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-2">
                    {OFFERS[item.offer].category}
                  </p>
                  <p className="text-base font-bold text-foreground mb-3">{item.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{item.blurb}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary/90 group-hover:text-primary">
                    See the case study
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Still not sure — no forced choice */}
      <section className="relative bg-background pb-24 sm:pb-32">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
              Still not sure which one?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Describe the situation instead — we'll tell you honestly which of
              these fits, or if none of them do yet.
            </p>
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="btn-sheen inline-flex items-center gap-2.5 rounded-full border border-border bg-card/30 backdrop-blur-xl px-7 py-3.5 text-sm font-semibold text-foreground hover:border-primary/30 hover:bg-card/50 transition-colors duration-150"
              >
                Describe Your Situation
                <ArrowRight size={14} />
              </motion.span>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default OffersPage;
