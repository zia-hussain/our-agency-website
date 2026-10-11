import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionEyebrow from "../components/common/SectionEyebrow";
import ClosingGlow from "../components/common/ClosingGlow";
import TestimonialFilm from "../components/common/TestimonialFilm";
import DecisionVisual from "./product-rescue/components/DecisionVisual";
import V1BoundaryVisual from "./idea-to-build/components/V1BoundaryVisual";
import WorkflowVisual from "./manual-to-system/components/WorkflowVisual";
import { TESTIMONIAL_FILMS } from "../data/testimonialFilms";
import { OFFERS, offerHref } from "../config/offers";
import { trackOfferSelect, trackOffersHubView, trackContextualOfferCtaClick } from "../utils/analytics";

// Second re-art-direction pass (2026-10-18, same day): the first rewrite
// fixed the SaaS-pricing-card problem but over-corrected into something too
// thin to do real selling work — three short chapters next to landing pages
// that each carry a full qualification journey, an interactive sort, real
// proof, and objection-handling. This pass gives each chapter that same
// depth: the exact interactive visual its own landing page uses (imported
// directly, not rebuilt), the real escalation stakes already approved for
// each offer's own ConsequenceStakes component, and an honest "is/isn't for
// you" split. Still not a fourth landing page — no application flow lives
// here, every chapter still exists to route to one.
const josh = TESTIMONIAL_FILMS.josh;

const CHAPTERS = [
  {
    n: "01",
    offer: "idea-to-build" as const,
    label: "Nothing Has Been Built Yet",
    statement: ["You have the idea.", "V1 is still a decision."],
    body: "Before turning assumptions into development cost, decide what the first version actually needs to prove. Not the whole product — the one thing it has to get right to earn the rest.",
    stakes: [
      { label: "Right now", state: "A wrong guess costs a conversation.", detail: "The V1 boundary is still just a decision — changing your mind here costs nothing but time." },
      { label: "Mid-build", state: "A wrong guess costs sprints.", detail: "Code exists for the wrong version. Undoing it means rewriting, not reprioritizing." },
      { label: "After launch", state: "A wrong guess costs trust.", detail: "Early users formed an opinion of the wrong product. That's harder to walk back than code." },
    ],
    visual: <V1BoundaryVisual />,
    forYou: ["An idea exists, but V1's boundary doesn't yet", "You want the decision made before development spend, not during it", "You're fine building the result with us or another team"],
    notForYou: ["Something's already built and the problem is what's wrong with it — that's Product Rescue", "You already have a validated, specific V1 scope — you need a build, not a decision"],
    deliverable: "Build-Ready V1 Brief",
    cta: "Show Us What You're Building",
    proofLabel: "Liftly",
    proof: "The founder's broader marketplace vision already existed — a logistics platform with a sophisticated variable-pricing engine as the real differentiator. We separated the vision from the first release: V1 shipped the operational core — booking, serviceability, payment, admin — as a complete system on its own. The pricing engine was scoped and documented for a defined V2, not built prematurely into a release that didn't need it yet.",
    proofHref: "/portfolio/liftly-operational-mvp-v1",
  },
  {
    n: "02",
    offer: "product-rescue" as const,
    label: "The Product Already Exists",
    statement: ["The code exists.", "Certainty doesn't."],
    body: "Before another sprint or rebuild, find out — from evidence, not a guess — what deserves keeping, fixing, replacing, or leaving alone. Most fixes fail because the diagnosis was wrong, not because the fix was.",
    stakes: [
      { label: "Right now", state: "A wrong diagnosis costs a conversation.", detail: "Nothing has been built on the guess yet — changing course here costs nothing but time." },
      { label: "Next fix", state: "A wrong diagnosis costs a sprint.", detail: "Work goes into patching a symptom. If it was the wrong one, that work doesn't transfer." },
      { label: "Next rebuild", state: "A wrong diagnosis costs a rebuild.", detail: "The biggest bet, made on the same unverified read of what's actually wrong." },
    ],
    visual: <DecisionVisual />,
    forYou: ["A real product already exists — stalled, breaking, inherited, or just not trusted anymore", "You can share access or evidence if accepted (we never ask for credentials up front)", "You want an outside, evidence-based read before spending on another attempt"],
    notForYou: ["Nothing's been built yet — that's a V1 decision, not a rescue. Try Idea-to-Build instead", "You already know exactly what's wrong and just need it fixed — that's implementation, a service, not this assessment"],
    deliverable: "Rescue Brief",
    cta: "Show Us Where You're Stuck",
    proofLabel: "Fast Track USA",
    proof: "Josh Nyce, owner and founder, describes roughly two years with a previous team without a reliable launch. Zumetrix took the project over and shipped it in three weeks — bug-free, by his account, on video and in a separately-worded, verified Trustpilot review corroborated on Google.",
    proofHref: "/portfolio/fast-track-usa-app-rescue",
    emphasis: true,
  },
  {
    n: "03",
    offer: "manual-to-system" as const,
    label: "The Workflow Already Exists",
    statement: ["The workflow works.", "Your team shouldn't be the integration."],
    body: "Before adding another tool, decide what should disappear, simplify, connect, automate, and remain human. Not everything manual is worth automating — some of it is, and the sprint exists to tell the difference honestly.",
    stakes: [
      { label: "This week", state: "One person quietly absorbs it.", detail: "It feels manageable — a few extra minutes per handoff, easy to not notice." },
      { label: "This quarter", state: "It becomes \"how we do things.\"", detail: "New hires learn the workaround as normal, not as a problem worth fixing." },
      { label: "Next hire", state: "You hire to cover the workflow.", detail: "Not because the business grew — because a person is now load-bearing infrastructure." },
    ],
    visual: <WorkflowVisual />,
    forYou: ["A real, recurring workflow already runs today — carried by people, not a system", "You want to know what's actually worth automating before buying another tool", "You're open to some of it staying human — that's a legitimate outcome, not a failure"],
    notForYou: ["Nothing's running manually yet to analyze — there's no workflow to automate", "You already know exactly what to automate and just need it built — that's implementation, a service, not this sprint"],
    deliverable: "Workflow System Plan",
    cta: "Show Us The Workflow",
    proofLabel: "Floating Stone Ranch",
    proof: "A beef processor's carcass intake, boxing, and shipping ran on spreadsheets and paper — no single source of truth, no reliable manifest. We centralized it into one Airtable-backed system and automated the status transitions that used to be tracked by hand, with a structure built to support the reporting that comes next.",
    proofHref: "/portfolio/floating-stone-ranch-processor-intake-engine",
  },
];

const DIFFERENCE = [
  {
    typical: "Open-ended discovery call, then a scope that firms up (or doesn't) once work has already started.",
    zumetrix: "A bounded, fixed-price assessment. You know the cost and the timeline before anything begins.",
  },
  {
    typical: "The exploration happens on your dime, inside the build — figuring out what's actually needed while you're already paying to build it.",
    zumetrix: "The decision happens first, on its own. What gets built is informed by it, not tangled with it.",
  },
  {
    typical: "If it doesn't work out, you've paid for partial work and still don't have clarity.",
    zumetrix: "You keep the Brief either way — usable with us or with anyone else. Nothing about it depends on hiring us next.",
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

      {/* Three editorial chapters, full depth */}
      <div className="relative bg-background">
        {CHAPTERS.map((chapter) => {
          const offer = OFFERS[chapter.offer];
          return (
            <section
              key={chapter.offer}
              className={`relative border-t border-border/40 ${chapter.emphasis ? "py-24 sm:py-32 bg-card/10" : "py-20 sm:py-28"}`}
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                  {/* Left: statement, stakes, qualification, CTA */}
                  <div>
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

                    {/* Stakes — the cost of waiting, truth-based, no invented numbers */}
                    <AnimatedSection delay={0.1} className="mb-9">
                      <div className="flex gap-4 sm:gap-6">
                        {chapter.stakes.map((stage) => (
                          <div key={stage.label} className="flex-1 min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50 mb-1.5">
                              {stage.label}
                            </p>
                            <p className="text-sm font-semibold text-foreground/90 leading-snug mb-1">{stage.state}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed hidden sm:block">{stage.detail}</p>
                          </div>
                        ))}
                      </div>
                    </AnimatedSection>

                    {/* Honest qualification — who this is and isn't for */}
                    <AnimatedSection delay={0.14} className="mb-8">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary/70 mb-3">
                            This is for you if
                          </p>
                          <ul className="space-y-2.5">
                            {chapter.forYou.map((line) => (
                              <li key={line} className="flex items-start gap-2 text-sm text-foreground/80 leading-snug">
                                <Check size={14} className="text-primary/70 mt-0.5 flex-shrink-0" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 mb-3">
                            Not for you if
                          </p>
                          <ul className="space-y-2.5">
                            {chapter.notForYou.map((line) => (
                              <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground leading-snug">
                                <X size={14} className="text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.18}>
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

                    <AnimatedSection delay={0.2}>
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

                  {/* Right: the real interactive visual + integrated proof */}
                  <div>
                    {chapter.visual}

                    {chapter.offer === "product-rescue" ? (
                      <AnimatedSection delay={0.1} className="mt-8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-3">
                          {chapter.proofLabel}
                        </p>
                        <TestimonialFilm
                          src={josh.src}
                          poster={josh.poster}
                          captionsSrc={josh.captionsSrc}
                          variant="proof"
                        />
                        <p className="text-sm text-muted-foreground leading-relaxed mt-4">{chapter.proof}</p>
                        <Link
                          to={chapter.proofHref}
                          onClick={() => trackContextualOfferCtaClick(chapter.offer, "offers-hub-proof")}
                          className="group mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors duration-200"
                        >
                          See the full case study
                          <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                      </AnimatedSection>
                    ) : (
                      <AnimatedSection delay={0.1} className="mt-8 border-l border-primary/20 pl-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-2.5">
                          {chapter.proofLabel}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{chapter.proof}</p>
                        <Link
                          to={chapter.proofHref}
                          onClick={() => trackContextualOfferCtaClick(chapter.offer, "offers-hub-proof")}
                          className="group inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors duration-200"
                        >
                          See the case study
                          <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                      </AnimatedSection>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* How Zumetrix is different */}
      <section className="relative border-t border-border/40 bg-card/10 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <SectionEyebrow className="mb-5">How This Is Different</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight max-w-xl mx-auto leading-[1.2]">
              Most engagements start with a conversation. This one starts with a decision.
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {DIFFERENCE.map((row, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-10 items-start pb-8 border-b border-border/30 last:border-0 last:pb-0">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50 mb-2">
                      The Usual Way
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{row.typical}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary/70 mb-2">
                      Zumetrix
                    </p>
                    <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">{row.zumetrix}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement model — four facts, not a comparison table */}
      <section className="relative bg-background py-16 sm:py-20">
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
