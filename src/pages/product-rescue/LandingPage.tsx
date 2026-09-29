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
import DecisionVisual from "./components/DecisionVisual";
import RecognitionSelector from "./components/RecognitionSelector";
import CycleBreaker from "./components/CycleBreaker";
import BodyOfWork from "./components/BodyOfWork";
import { productRescueFAQs } from "../../data/faqs/product-rescue";
import { getOffer } from "../../config/offers";
import { trackRescueOfferViewed } from "../../utils/analytics";

const pageUrl = "https://zumetrix.com/product-rescue";
const offer = getOffer("product-rescue")!;

// Same stagger/ease as the homepage hero (Hero.tsx) — near-full opacity at
// rest so the H1 effectively exists at first paint, settling rather than
// theatrically revealing.
const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const heroItem = {
  hidden: { opacity: 0.96, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: HERO_EASE } },
};

const OPINION_FRAGMENTS = [
  { text: "\"just rebuild it\"", top: "4%", left: "6%", rotate: "-5deg" },
  { text: "\"it's probably fine\"", top: "40%", left: "24%", rotate: "3deg" },
  { text: "\"the architecture is the problem\"", top: "10%", left: "48%", rotate: "-3deg" },
  { text: "\"no, it's the last team's fault\"", top: "42%", left: "66%", rotate: "4deg" },
  { text: "\"could go either way\"", top: "2%", left: "84%", rotate: "-6deg" },
];

const PROCESS = [
  {
    n: "01",
    icon: FileCheck,
    label: "Show us the product",
    body: "One application. No credentials, no file uploads — just what's actually happening.",
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
    label: "We investigate",
    body: "The real product and the real evidence. Payment and access happen here, not before.",
  },
  {
    n: "04",
    icon: ArrowRight,
    label: "You leave with the decision",
    body: "A Rescue Brief and a walkthrough — yours, regardless of what you do next.",
  },
];

const ProductRescueLandingPage: React.FC = () => {
  useEffect(() => {
    trackRescueOfferViewed();
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: offer.name,
        description:
          "A bounded, evidence-based assessment of one existing software product: what to keep, what to fix, and where replacement is actually justified.",
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
          { "@type": "ListItem", position: 2, name: "Product Rescue Assessment", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <PageTransition>
      <SEO
        title="Product Rescue Assessment — Know What Your Product Actually Needs | Zumetrix Labs"
        description="A bounded, $750 assessment of one existing software product: what to keep, what to fix, and where replacement is actually justified — delivered as a Rescue Brief in 5 business days once access is ready."
        keywords="software product assessment, should I rebuild my software, software rescue assessment, technical decision before rebuild, stuck SaaS diagnostic, product rescue assessment"
        url={pageUrl}
        image="https://zumetrix.com/og/page-product-rescue.png"
        structuredData={structuredData}
      />

      {/* ================================================================ */}
      {/* HERO — the moment before another expensive decision                */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background pt-28 sm:pt-36 pb-20 sm:pb-28">
        {/* Motivated light — gathers behind the headline, not the block as a whole */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_42%_at_50%_36%,rgba(196,138,100,0.11),transparent_68%)]" />
        {/* Edge falloff — depth, not a flat spotlight */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_28%,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
        {/* Fine grain — the same tactile texture as the homepage hero */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Conflicting opinions — scattered, unresolved, the state the       */}
        {/* headline below is about to answer. What every founder has        */}
        {/* actually heard before landing here.                              */}
        <div aria-hidden="true" className="hidden sm:block relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-20 mb-2">
          {OPINION_FRAGMENTS.map((frag) => (
            <motion.span
              key={frag.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="absolute whitespace-nowrap text-sm text-muted-foreground/35 italic"
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
            <SectionEyebrow className="mb-8">Product Rescue Assessment</SectionEyebrow>
          </motion.div>

          <h1 className="font-bold tracking-[-0.02em] mb-7">
            <motion.span variants={heroItem} className="block text-foreground text-4xl sm:text-6xl lg:text-7xl leading-[1.05]">
              You don't need another opinion.
            </motion.span>
            <motion.span variants={heroItem} className="block bg-gradient-to-r from-primary via-primary/95 to-primary/80 bg-clip-text text-transparent text-4xl sm:text-6xl lg:text-7xl leading-[1.05] pb-1 mt-1">
              You need evidence.
            </motion.span>
            <motion.span variants={heroItem} className="block text-[#F3EAE1] text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] mt-6">
              Keep &middot; Fix &middot; Replace &middot; Next
            </motion.span>
          </h1>

          <motion.p variants={heroItem} className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-4 max-w-xl mx-auto mt-2">
            Before you approve another fix, rebuild, or month of work — find out what deserves to
            stay, what needs fixing, what actually needs replacing, and what happens next.
          </motion.p>
          <motion.p variants={heroItem} className="text-sm text-muted-foreground/70 mb-10">
            $750 · one bounded product · 5 business days once access is ready
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-col items-center gap-5">
            <Link to="/product-rescue/apply">
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
                <span className="relative">Show Us Where You're Stuck</span>
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                  <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </motion.button>
            </Link>
            <Link
              to="/rescue-or-rebuild"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Not ready for the paid assessment? Start with the free diagnostic →
            </Link>
          </motion.div>

          {/* What the conflicting opinions above resolve into — a concrete  */}
          {/* preview of the deliverable, not an abstract promise.           */}
          <motion.div variants={heroItem} className="mt-16 sm:mt-20">
            <div className="relative max-w-lg mx-auto rounded-2xl border border-border/50 bg-card/10 overflow-hidden text-left">
              <div className="px-6 py-4 border-b border-border/50 bg-card/20">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">Rescue Brief — preview</p>
              </div>
              <div className="divide-y divide-border/40">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-foreground/80">Core checkout flow</span>
                  <span className="text-xs font-semibold text-primary">Keep — confirmed working</span>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-foreground/80">Auth &amp; session handling</span>
                  <span className="text-xs font-semibold text-red-400/80">Replace — evidence attached</span>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-foreground/80">Onboarding drop-off</span>
                  <span className="text-xs font-semibold text-muted-foreground/60">Fix — bounded, scoped</span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground/50 mt-4 italic">Illustrative — your Rescue Brief is built from your product's own evidence.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* RECOGNITION — an interactive moment, not a pain-point grid         */}
      {/* ================================================================ */}
      <section className="bg-card/10 border-y border-border/40 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <SectionEyebrow className="mb-5">Which conversation are you having</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Pick the one that sounds like this week.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <RecognitionSelector />
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* THE SIGNATURE DEVICE — the enemy (unsorted, repeating) leads       */}
      {/* straight into the mechanism that sorts it. One scene, not two.    */}
      {/* ================================================================ */}
      <section className="bg-card/10 border-y border-border/40 py-24 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <CycleBreaker />
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="text-center mb-4">
            <SectionEyebrow className="mb-6">How We Decide</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto">
              Stop buying the next fix before you know what the problem actually is.
            </h2>
          </AnimatedSection>
          <DecisionVisual />
        </div>
      </section>

      {/* ================================================================ */}
      {/* THE OFFER — outcome first, mechanism second                        */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <SectionEyebrow className="mb-6">The Assessment</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight max-w-xl mx-auto leading-tight">
              Five business days later, you should know what deserves another dollar.
            </h2>
          </AnimatedSection>

          <div className="grid gap-8 lg:grid-cols-2">
            <AnimatedSection delay={0.04}>
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/[0.07] to-transparent p-7 sm:p-8 h-full">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">What you'll know</p>
                <ul className="space-y-4">
                  {[
                    "What's already doing its job — confirmed, not just assumed",
                    "What's genuinely fixable without starting over",
                    "What actually deserves replacement, and why",
                    "What to fund first, once the rest is sorted",
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
                    "One bounded software product",
                    "$750, stated up front — no call required to learn the price",
                    "5 business days, starting once access/evidence is ready",
                    "A Rescue Brief and a short walkthrough call",
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
                    Implementation, a line-by-line audit or pen test, and a guaranteed root cause or
                    recovery — the brief is a decision, not those things.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* BODY OF WORK — Rescued (flagship) + Built/Stabilized (coda)        */}
      {/* ================================================================ */}
      <BodyOfWork />

      {/* ================================================================ */}
      {/* TRUST REVERSAL — the incentive objection, answered directly        */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16 items-start">
            <AnimatedSection className="lg:col-span-3">
              <SectionEyebrow className="mb-6">The Honest Objection</SectionEyebrow>
              <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug mb-5">
                "If an agency assesses my product, won't they just tell me I need to hire them?"
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                We don't need to win the implementation for this engagement to succeed — the Rescue
                Brief costs $750 whether it says "mostly keep it" or "this needs to go."
              </p>
              <p className="text-base font-semibold text-foreground leading-relaxed">
                Our job isn't to sell you the most work. It's to make your next decision defensible.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.06} className="lg:col-span-2">
              <div className="rounded-2xl border border-border/50 bg-card/10 p-7 sm:p-9">
                <div className="flex flex-col items-center text-center">
                  <span className="rounded-full border border-primary/40 bg-primary/[0.08] px-4 py-2 text-xs font-semibold text-foreground whitespace-nowrap">
                    The Rescue Brief
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
                  Three equal branches, on purpose — the brief doesn't favor any of them, and neither
                  does its price.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PROCESS — simplified to four moments                               */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <SectionEyebrow className="mb-6">How It Starts</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              This should feel easy.
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
      {/* FAQ                                                                */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <SectionEyebrow className="mb-6">FAQ</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Before you apply.</h2>
          </AnimatedSection>
          <div className="flex justify-center my-10 sm:my-12" aria-hidden="true">
            <span className="w-px h-10 sm:h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>
          <AnimatedSection delay={0.06}>
            <FAQAccordion items={productRescueFAQs} idPrefix="product-rescue-faq" />
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
              <span className="block text-muted-foreground/50">No more competing opinions.</span>
              <span className="block text-foreground mt-2">Just an evidence-backed next decision.</span>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="relative inline-block">
            <ClosingGlow />
            <Link to="/product-rescue/apply">
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
                <span className="relative">Show Us Where You're Stuck</span>
                <span className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </motion.button>
            </Link>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-8">
            <Link to="/services/product-rescue-stabilization" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              Or see our broader Product Rescue &amp; Stabilization capability →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default ProductRescueLandingPage;
