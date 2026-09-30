import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, X, FileCheck, Search, ClipboardCheck } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageTransition from "../../components/common/PageTransition";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionEyebrow from "../../components/common/SectionEyebrow";
import FAQAccordion from "../../components/common/FAQAccordion";
import ClosingGlow from "../../components/common/ClosingGlow";
import V1BoundaryVisual from "./components/V1BoundaryVisual";
import MethodSequence from "./components/MethodSequence";
import BodyOfWork from "./components/BodyOfWork";
import ConsequenceStakes from "./components/ConsequenceStakes";
import AnsweredDirectly from "./components/AnsweredDirectly";
import RecognitionSelector, { type RecognitionOption } from "../offers/RecognitionSelector";
import { ideaToBuildFAQs } from "../../data/faqs/idea-to-build";
import { getOffer } from "../../config/offers";
import { trackEvent } from "../../utils/analytics";

const pageUrl = "https://zumetrix.com/idea-to-build";
const offer = getOffer("idea-to-build")!;

const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const heroItem = {
  hidden: { opacity: 0.96, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: HERO_EASE } },
};

// Possibility overload, deliberately denser than Product Rescue's 5
// scattered opinions (brief Section 6: AMBITION -> POSSIBILITY OVERLOAD) —
// this is the actual wishlist a founder is carrying, not a quote from
// someone else. It reappears, sorted, in the signature device below —
// the same list, compressed (2026-10-01 commercial experience pass).
const POSSIBILITY_FIELD = [
  { text: "AI chat", top: "2%", left: "4%", rotate: "-6deg" },
  { text: "marketplace", top: "38%", left: "10%", rotate: "4deg" },
  { text: "mobile app", top: "8%", left: "22%", rotate: "-3deg" },
  { text: "loyalty program", top: "44%", left: "30%", rotate: "5deg" },
  { text: "multi-currency", top: "4%", left: "42%", rotate: "-4deg" },
  { text: "admin analytics", top: "40%", left: "50%", rotate: "3deg" },
  { text: "social features", top: "10%", left: "62%", rotate: "-5deg" },
  { text: "white-label", top: "42%", left: "70%", rotate: "4deg" },
  { text: "public API", top: "6%", left: "80%", rotate: "-3deg" },
  { text: "integrations", top: "38%", left: "88%", rotate: "5deg" },
];

const RECOGNITION_OPTIONS: RecognitionOption[] = [
  {
    value: "no-v1-clarity",
    quote: "I have a clear idea, but I genuinely don't know what the first version should include.",
    response:
      "That's the actual job of this sprint — not validating the idea, deciding what V1 needs to prove and what can legitimately wait.",
  },
  {
    value: "conflicting-opinions",
    quote: "Everyone I ask gives me a different answer for what V1 should include.",
    response:
      "Different opinions usually mean nobody's anchored to what the first version actually needs to prove. We anchor to that first, then the scope question answers itself.",
  },
  {
    value: "fear-of-wasting-months",
    quote: "I'm scared of spending months building the wrong first version.",
    response:
      "That fear is a reasonable response to an unbounded decision. This sprint bounds it — five days, one Brief, before any development spend.",
  },
  {
    value: "scope-creep",
    quote: "Every time I sit down to plan this, the feature list gets longer, not shorter.",
    response:
      "That's what happens without a proof target. Once we know what V1 needs to prove, most of that list sorts itself into \"later,\" not \"never.\"",
  },
  {
    value: "have-validation-no-plan",
    quote: "I've got research and user interviews, but I don't know how to turn that into a build plan.",
    response:
      "Good — that's real context to work from. We turn it into the specific decisions a first build actually needs, not a re-summary of what you already know.",
  },
  {
    value: "something-else",
    quote: "It's not quite any of these, but something is still off.",
    response:
      "Not every situation fits a clean label. Tell us what's really going on in the application — that's exactly what it's for.",
  },
];

const PROCESS = [
  {
    n: "01",
    icon: FileCheck,
    label: "Show us the idea",
    body: "One application. No pitch deck, no prototype required — just what you're actually trying to build and for whom.",
  },
  {
    n: "02",
    icon: Search,
    label: "We decide if this fits",
    body: "Standard fit, custom scope, or an honest no — before you pay anything.",
  },
  {
    n: "03",
    icon: ClipboardCheck,
    label: "We shape V1",
    body: "Proof target, critical journey, what belongs and what waits. Payment and intake happen here, not before.",
  },
  {
    n: "04",
    icon: ArrowRight,
    label: "You leave with a buildable V1",
    body: "A Build-Ready V1 Brief and a founder walkthrough — yours, regardless of who implements it.",
  },
];

const IdeaToBuildLandingPage: React.FC = () => {
  useEffect(() => {
    trackEvent("offer_viewed", { offer: offer.slug });
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: offer.name,
        description:
          "A bounded, decision-focused sprint that defines what a first software version actually needs to prove, who it's for, and what belongs in V1 versus what waits.",
        provider: { "@id": "https://zumetrix.com/#organization" },
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          price: String(offer.price),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: pageUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://zumetrix.com/" },
          { "@type": "ListItem", position: 2, name: "Idea-to-Build Sprint", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <PageTransition>
      <SEO
        title="Idea-to-Build Sprint — Know What Your First Version Actually Needs | Zumetrix Labs"
        description="A bounded, $950 sprint that decides what your first software version needs to prove, who it's for, and what belongs in V1 — delivered as a Build-Ready V1 Brief in 5 business days."
        keywords="MVP scope, what should my MVP include, first version software, build ready brief, V1 planning, software idea validation, MVP scope sprint"
        url={pageUrl}
        image="https://zumetrix.com/og/page-idea-to-build.png"
        structuredData={structuredData}
      />

      {/* ================================================================ */}
      {/* HERO — possibility overload, denser than FIX's scattered opinions  */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background pt-28 sm:pt-36 pb-20 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_42%_at_50%_36%,rgba(196,138,100,0.11),transparent_68%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_28%,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div aria-hidden="true" className="hidden sm:block relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 mb-2">
          {POSSIBILITY_FIELD.map((frag, i) => (
            <motion.span
              key={frag.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.025 }}
              className="absolute whitespace-nowrap text-xs text-muted-foreground/30 italic"
              style={{ top: frag.top, left: frag.left, transform: `rotate(${frag.rotate})` }}
            >
              {frag.text}
            </motion.span>
          ))}
        </div>

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div variants={heroItem} className="flex justify-center">
            <SectionEyebrow className="mb-8">Idea-to-Build Sprint</SectionEyebrow>
          </motion.div>

          <h1 className="font-bold tracking-[-0.02em] mb-7">
            <motion.span variants={heroItem} className="block text-foreground text-4xl sm:text-6xl lg:text-7xl leading-[1.05]">
              You have ten ideas.
            </motion.span>
            <motion.span variants={heroItem} className="block bg-gradient-to-r from-primary via-primary/95 to-primary/80 bg-clip-text text-transparent text-4xl sm:text-6xl lg:text-7xl leading-[1.05] pb-1 mt-1">
              V1 needs one decision.
            </motion.span>
            <motion.span variants={heroItem} className="block text-[#F3EAE1] text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] mt-6">
              Proof &middot; Journey &middot; Build &middot; Not Yet &middot; Learn
            </motion.span>
          </h1>

          <motion.p variants={heroItem} className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-4 max-w-xl mx-auto mt-2">
            Before you spend months and real money on development, find out what the first
            version actually needs to prove — and which of those ten ideas can legitimately wait.
          </motion.p>
          <motion.p variants={heroItem} className="text-sm text-muted-foreground/70 mb-10">
            $950 · one product concept · 5 business days once context is ready
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-col items-center gap-5">
            <Link to="/idea-to-build/apply">
              <motion.button
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="btn-sheen group relative bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-8 pr-6 sm:pl-9 sm:pr-7 py-4 sm:py-[1.1rem] rounded-full font-semibold text-base sm:text-lg tracking-[-0.01em]
                         shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_10px_-2px_rgba(0,0,0,0.35),0_16px_36px_-16px_rgba(196,138,100,0.4)]
                         hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_2px_10px_-2px_rgba(0,0,0,0.4),0_20px_42px_-16px_rgba(196,138,100,0.5)]
                         flex items-center gap-3 overflow-hidden transition-shadow duration-300"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.14] via-white/0 to-black/[0.06]" />
                <span className="relative">Show Us What You're Building</span>
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                  <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </motion.button>
            </Link>
            <Link
              to="/articles/build-saas-mvp-in-30-days"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Not ready for the paid sprint? Read how we scope a first release →
            </Link>
          </motion.div>

          <motion.div variants={heroItem} className="mt-16 sm:mt-20">
            <div className="relative max-w-lg mx-auto rounded-2xl border border-border/50 bg-card/10 overflow-hidden text-left">
              <div className="px-6 py-4 border-b border-border/50 bg-card/20">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">V1 Brief — preview</p>
              </div>
              <div className="divide-y divide-border/40">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-foreground/80">Client booking flow</span>
                  <span className="text-xs font-semibold text-primary">V1 — proves the core loop</span>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-foreground/80">Custom pricing engine</span>
                  <span className="text-xs font-semibold text-muted-foreground/60">Not yet — earns its place in V2</span>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-foreground/80">Group sessions</span>
                  <span className="text-xs font-semibold text-muted-foreground/60">Not yet — validate solo first</span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground/50 mt-4 italic">Illustrative — your Brief is built from your own idea and answers.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* WHY NOW — truth-based consequence, not manufactured scarcity       */}
      {/* ================================================================ */}
      <ConsequenceStakes />

      {/* ================================================================ */}
      {/* RECOGNITION                                                        */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <SectionEyebrow className="mb-5">Which conversation are you having</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Pick the one that sounds like this week.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <RecognitionSelector offerSlug="idea-to-build" applyPath="/idea-to-build/apply" options={RECOGNITION_OPTIONS} />
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* THE SIGNATURE DEVICE — the same wishlist from the hero, compressed */}
      {/* ================================================================ */}
      <section className="bg-card/10 border-y border-border/40 py-24 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <MethodSequence />
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="text-center mb-4">
            <SectionEyebrow className="mb-6">How We Decide</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto">
              That scattered wishlist from the top of the page? Here's what happens to it.
            </h2>
          </AnimatedSection>
          <V1BoundaryVisual />
        </div>
      </section>

      {/* ================================================================ */}
      {/* THE TRADE — what $950 buys, framed as a decision, not a price tag  */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <SectionEyebrow className="mb-6">The Trade</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight max-w-2xl mx-auto leading-tight">
              $950 to decide what belongs in V1 — before a larger commitment assumes the answer.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Not a guess about what development will cost. A bounded price for the one decision
              that determines what that development actually builds.
            </p>
          </AnimatedSection>

          <div className="grid gap-8 lg:grid-cols-2">
            <AnimatedSection delay={0.04}>
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/[0.07] to-transparent p-7 sm:p-8 h-full">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">What you'll know</p>
                <ul className="space-y-4">
                  {[
                    "What your first version actually needs to prove",
                    "Who V1 is really for, and their one critical journey",
                    "What belongs in V1 — and what explicitly doesn't, yet",
                    "What a responsible build sequence looks like",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <div className="rounded-2xl border border-border/50 bg-card/10 p-7 sm:p-8 h-full">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">The mechanics</p>
                <ul className="space-y-4 mb-6">
                  {[
                    "One product concept, one primary V1 decision",
                    "$950, stated up front — no call required to learn the price",
                    "5 business days, starting once required context is ready",
                    "A Build-Ready V1 Brief and a founder walkthrough",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border/40 pt-5">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45">Not included</p>
                  <p className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                    <X size={11} className="mt-0.5 text-muted-foreground/40 flex-shrink-0" />
                    Implementation, a clickable prototype, UI design, and invented market
                    validation.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <BodyOfWork />

      {/* ================================================================ */}
      {/* ANSWERED DIRECTLY                                                  */}
      {/* ================================================================ */}
      <AnsweredDirectly />

      {/* ================================================================ */}
      {/* TRUST REVERSAL                                                     */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28 bg-card/10 border-y border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16 items-start">
            <AnimatedSection className="lg:col-span-3">
              <SectionEyebrow className="mb-6">The Honest Objection</SectionEyebrow>
              <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug mb-5">
                "If an agency scopes my V1, won't they just shrink it enough to sell me V2?"
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                There's no incentive to play that game: the Brief costs $950 whether V1 turns out
                small or larger than you expected.
              </p>
              <p className="text-base font-semibold text-foreground leading-relaxed">
                Our job isn't to make your V1 smaller than it should be. It's to make it exactly as
                small as it can responsibly be.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.06} className="lg:col-span-2">
              <div className="rounded-2xl border border-border/50 bg-card/10 p-7 sm:p-9">
                <div className="flex flex-col items-center text-center">
                  <span className="rounded-full border border-primary/40 bg-primary/[0.08] px-4 py-2 text-xs font-semibold text-foreground whitespace-nowrap">
                    The V1 Brief
                  </span>
                  <span aria-hidden="true" className="h-6 w-px bg-border/50" />
                  <div aria-hidden="true" className="relative w-full max-w-[220px]">
                    <span className="absolute left-[16.6%] right-[16.6%] top-0 h-px bg-border/50" />
                    <div className="flex justify-between px-0">
                      <span className="h-6 w-px bg-border/50" />
                      <span className="h-6 w-px bg-border/50" />
                      <span className="h-6 w-px bg-border/50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 w-full max-w-[220px]">
                    {["Your team", "Another team", "Us"].map((label) => (
                      <span key={label} className="rounded-lg border border-border/50 bg-background/50 px-1.5 py-2.5 text-[11px] font-semibold text-foreground/85 leading-tight">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-7 text-xs text-muted-foreground leading-relaxed text-center">
                  Three equal branches, on purpose — the Brief doesn't favor any of them, and neither
                  does its price.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PROCESS                                                            */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <SectionEyebrow className="mb-6">How It Starts</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              This should feel like momentum, not homework.
            </h2>
          </AnimatedSection>
          <div className="relative pl-9 sm:pl-11">
            <span aria-hidden="true" className="pointer-events-none absolute left-3.5 sm:left-4 top-1 bottom-1 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />
            {PROCESS.map((step, i, arr) => (
              <AnimatedSection key={step.label} delay={i * 0.05} className={i < arr.length - 1 ? "relative pb-9" : "relative"}>
                <span className="absolute -left-9 sm:-left-11 top-0.5 flex items-center justify-center w-7 h-7 rounded-full border border-primary/30 bg-background text-primary flex-shrink-0">
                  <step.icon size={12} />
                </span>
                <p className="text-base font-bold text-foreground mb-1">{step.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FAQ — secondary questions only; the primary ones ran earlier       */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <SectionEyebrow className="mb-6">A Few More Things</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Before you apply.</h2>
          </AnimatedSection>
          <div className="flex justify-center my-10 sm:my-12" aria-hidden="true">
            <span className="w-px h-10 sm:h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>
          <AnimatedSection delay={0.06}>
            <FAQAccordion items={ideaToBuildFAQs} idPrefix="idea-to-build-faq" />
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CLOSE                                                              */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_50%,rgba(196,138,100,0.09),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_85%_at_50%_50%,transparent_45%,rgba(0,0,0,0.35)_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6">
              <span className="block text-muted-foreground/50">The idea can wait.</span>
              <span className="block text-foreground mt-2">The decision shouldn't.</span>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="relative inline-block">
            <ClosingGlow />
            <Link to="/idea-to-build/apply">
              <motion.button
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group relative bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-9 pr-7 sm:pl-11 sm:pr-9 py-4 sm:py-[1.35rem] rounded-full font-semibold text-base sm:text-xl tracking-[-0.01em]
                         shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_10px_-2px_rgba(0,0,0,0.35),0_16px_36px_-16px_rgba(196,138,100,0.4)]
                         hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_2px_10px_-2px_rgba(0,0,0,0.4),0_20px_42px_-16px_rgba(196,138,100,0.5)]
                         flex items-center gap-3 sm:gap-4 overflow-hidden transition-shadow duration-300 btn-sheen"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.14] via-white/0 to-black/[0.06]" />
                <span className="relative">Show Us What You're Building</span>
                <span className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </motion.button>
            </Link>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-8">
            <Link to="/services/saas-mvp-development" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              Or see our broader SaaS MVP Development capability →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default IdeaToBuildLandingPage;
