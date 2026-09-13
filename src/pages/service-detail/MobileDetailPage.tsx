import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Camera, MapPin, Fingerprint, Bell, WifiOff, Smartphone, Compass, Sliders, FlaskConical, Send, Store, Radio } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageTransition from "../../components/common/PageTransition";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionEyebrow from "../../components/common/SectionEyebrow";
import FAQAccordion from "../../components/common/FAQAccordion";
import ClosingGlow from "../../components/common/ClosingGlow";
import { services } from "../../data/services";
import { mobileDetailFAQs } from "../../data/faqs/service-mobile";
import { getProjectBySlug } from "../../data/projects";
import { TESTIMONIALS } from "../../data/testimonials";

const service = services.find((s) => s.slug === "mobile-app-development")!;
const pageUrl = `https://zumetrix.com/services/${service.slug}`;
const skillXSwapProject = getProjectBySlug("skill-x-swap-mvp");
const sheezaTestimonial = TESTIMONIALS.find((t) => t.id === "sheeza-mobile-delivery");

const DEVICE_FEATURES = [
  { icon: Camera, label: "Camera" },
  { icon: MapPin, label: "Location" },
  { icon: Fingerprint, label: "Biometrics" },
  { icon: Bell, label: "Push notifications" },
  { icon: WifiOff, label: "Offline mode" },
];

// A miniature phone frame, reused at three scales through the page so the
// device itself becomes the page's visual spine — not just a hero prop.
const MiniPhone: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`relative rounded-[1.1rem] border border-border bg-gradient-to-b from-card to-card/50 p-[2px] ${className}`}>
    <div className="relative w-full h-full rounded-[0.95rem] overflow-hidden bg-background border border-border/50">
      <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 rounded-full bg-foreground/80 z-10" />
      {children}
    </div>
  </div>
);

const MobileDetailPage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.title,
        description: service.description,
        url: pageUrl,
        provider: { "@id": "https://zumetrix.com/#organization" },
        serviceType: service.technologies,
        areaServed: "Worldwide",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://zumetrix.com/" },
          { "@type": "ListItem", position: 2, name: "Software Development Services", item: "https://zumetrix.com/services" },
          { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <PageTransition>
      <SEO
        title={service.seo.title}
        description={service.seo.description}
        keywords={service.seo.keywords}
        image={`https://zumetrix.com${service.image}`}
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ================================================================ */}
      {/* HERO — kept close to the approved direction. Not rebuilt.          */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background pt-28 sm:pt-32 pb-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_10%,rgba(196,138,100,0.08),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection mode="hero">
            <Link to="/services" className="inline-block mb-8">
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-card/25 pl-2 pr-5 py-2 text-sm font-semibold text-muted-foreground shadow-[0_12px_30px_-16px_rgba(0,0,0,0.6)] hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors duration-200"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-background/80 group-hover:bg-primary/10 transition-colors duration-200">
                  <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                </span>
                All Services
              </motion.div>
            </Link>
            <SectionEyebrow className="mb-7">Mobile App Development</SectionEyebrow>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">{service.title}</h1>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight leading-[1.35] mb-8 max-w-xl mx-auto">
              <span className="text-muted-foreground/50">Built for the phone in someone's hand —</span>{" "}
              <span className="text-foreground">not a shrunken website.</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link to={`/contact?service=${service.slug}`} className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200">
                Build Your Mobile App
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </Link>
              <span className="text-sm font-medium text-muted-foreground">{service.price}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection mode="hero" delay={0.1} className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
            <div className="relative w-64 sm:w-72 aspect-[9/19.5] rounded-[2.75rem] bg-gradient-to-b from-card via-card/70 to-card/40 border border-border p-[3px] -rotate-2 shadow-[0_35px_80px_-20px_rgba(0,0,0,0.85),0_0_60px_-15px_rgba(196,138,100,0.22)] flex-shrink-0">
              <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] bg-gradient-to-br from-foreground/10 via-transparent to-transparent" />
              <span className="absolute -left-px top-20 w-[3px] h-7 rounded-l-sm bg-border" />
              <span className="absolute -left-px top-32 w-[3px] h-11 rounded-l-sm bg-border" />
              <span className="absolute -right-px top-28 w-[3px] h-14 rounded-r-sm bg-border" />
              <div className="relative w-full h-full rounded-[2.55rem] overflow-hidden bg-background border border-border/50">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_40%_at_50%_8%,rgba(196,138,100,0.20),transparent_60%)]" />
                <span className="absolute top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-full bg-foreground/90 z-10" />
                <div className="relative h-full flex flex-col p-4 pt-14">
                  <div className="flex items-center justify-between mb-5 px-1">
                    <div className="h-2.5 w-14 rounded-full bg-foreground/15" />
                    <div className="h-5 w-5 rounded-full bg-primary/40" />
                  </div>
                  <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-4 mb-3 h-24">
                    <div className="h-2 w-1/2 rounded-full bg-foreground/20 mb-2" />
                    <div className="h-2 w-1/3 rounded-full bg-foreground/10" />
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-10 rounded-xl bg-card/60 border border-border/50 flex items-center gap-3 px-3">
                        <span className="w-5 h-5 rounded-full bg-foreground/10 flex-shrink-0" />
                        <span className="h-2 rounded-full bg-foreground/10 flex-1" />
                      </div>
                    ))}
                  </div>
                  <div className="h-12 rounded-2xl bg-card/60 border border-border/50 mt-3 flex items-center justify-around px-2">
                    {[0, 1, 2, 3].map((i) => (<span key={i} className={`w-4 h-4 rounded-full ${i === 0 ? "bg-primary/70" : "bg-foreground/10"}`} />))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col gap-3 flex-wrap justify-center max-w-xs">
              {DEVICE_FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 rounded-full border border-border/50 bg-card/15 pl-3 pr-4 py-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10"><f.icon size={12} className="text-primary" /></span>
                  <span className="text-xs font-medium text-foreground/80 whitespace-nowrap">{f.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SHRUNK VS. REAL — two miniature phones side by side, one cramped, */}
      {/* one native. The distinction made physically visible.              */}
      {/* ================================================================ */}
      <section className="relative bg-background py-20 sm:py-28 border-b border-border/40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-center justify-center gap-8 sm:gap-14">
            <div className="text-center">
              <MiniPhone className="w-24 h-48 sm:w-28 sm:h-56 opacity-50 mb-3 mx-auto">
                <div className="p-2 pt-6 space-y-1">
                  {[1, 2, 3, 4, 5].map((i) => (<span key={i} className="block h-1 rounded-full bg-foreground/15" style={{ width: `${90 - i * 8}%` }} />))}
                </div>
              </MiniPhone>
              <p className="text-xs font-semibold text-muted-foreground">A website, shrunk</p>
              <p className="text-[11px] text-muted-foreground/50 mt-0.5">Tiny text, no real gestures</p>
            </div>
            <ArrowRight size={18} className="text-primary/50 flex-shrink-0" />
            <div className="text-center">
              <MiniPhone className="w-24 h-48 sm:w-28 sm:h-56 mb-3 mx-auto shadow-[0_25px_60px_-25px_rgba(196,138,100,0.3)] border-primary/30">
                <div className="p-2 pt-6 space-y-1.5">
                  <span className="block h-6 rounded-lg bg-primary/25 border border-primary/30" />
                  <span className="block h-3 rounded-md bg-foreground/10" />
                  <span className="block h-3 rounded-md bg-foreground/10" />
                </div>
              </MiniPhone>
              <p className="text-xs font-semibold text-foreground">A real app</p>
              <p className="text-[11px] text-muted-foreground/60 mt-0.5">Native gestures, proper touch targets</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SIGNATURE SCENE — SHARED CORE, PLATFORM REALITIES. Wider, bolder   */}
      {/* than a flat list — the branch itself explains why cross-platform   */}
      {/* doesn't mean identical.                                           */}
      {/* ================================================================ */}
      <section className="relative bg-card/10 border-b border-border/40 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
          <AnimatedSection>
            <SectionEyebrow className="mb-6">What We Build</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-lg mx-auto">
              One codebase. Two real platforms.
            </h2>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.06} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center gap-3 rounded-full border-2 border-primary/50 bg-gradient-to-b from-primary/16 to-transparent px-7 py-3.5 shadow-[0_30px_70px_-25px_rgba(196,138,100,0.4)]">
              <Smartphone size={19} className="text-primary" />
              <span className="text-lg font-bold text-foreground">React Native core</span>
            </div>
          </div>
          <div className="relative flex justify-center" aria-hidden="true">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[62%] h-px bg-border/40 mt-9" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-7 pt-16">
            {[
              { label: "iOS", accent: "border-t-2 border-t-sky-400/40", items: ["App Store review guidelines & submission", "Face ID / Touch ID interaction patterns", "iOS-native navigation & gesture conventions"] },
              { label: "Android", accent: "border-t-2 border-t-emerald-400/40", items: ["Play Store staged rollout & submission", "Fingerprint / biometric prompt patterns", "Android back-button & navigation conventions"] },
            ].map((col) => (
              <div key={col.label} className="relative">
                <span className="hidden sm:block absolute left-1/2 -translate-x-1/2 -top-7 w-px h-7 bg-border/40" aria-hidden="true" />
                <div className={`rounded-2xl border border-border/50 ${col.accent} bg-background/60 p-6 sm:p-7`}>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-foreground/80 mb-5">{col.label}</p>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <Check size={12} className="text-primary/70 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ================================================================ */}
      {/* SIGNATURE SCENE — THE REAL-WORLD SHIPPING JOURNEY. The device      */}
      {/* itself evolves through the delivery reality — the page's visual   */}
      {/* spine, made explicit as its own moment.                          */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-32 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <AnimatedSection>
            <SectionEyebrow className="mb-6">How We Work</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">A phone travels from idea to production.</h2>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.06} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <span aria-hidden="true" className="hidden sm:block absolute left-[8%] right-[8%] top-14 h-px bg-gradient-to-r from-border/20 via-primary/40 to-primary" />
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-3 gap-y-12 sm:gap-x-2">
              {[
                { icon: Compass, badge: "Flow", fill: 1, tone: "border-border/50", label: "Product flow", description: "The journey on a phone, mapped first." },
                { icon: Sliders, badge: "Features", fill: 2, tone: "border-border/50", label: "Device features", description: "Camera, location, biometrics." },
                { icon: FlaskConical, badge: "Testing", fill: 3, tone: "border-primary/30", label: "Real device testing", description: "Real hardware, not simulators." },
                { icon: Send, badge: "TestFlight", fill: 4, tone: "border-primary/40", label: "TestFlight / Play testing", description: "In real hands first." },
                { icon: Store, badge: "Review", fill: 5, tone: "border-primary/50", label: "Store review", description: "App Store & Play Store." },
                { icon: Radio, badge: "Live", fill: 6, tone: "border-primary", label: "Production", description: "Live, monitored, updatable." },
              ].map((stage) => (
                <div key={stage.label} className="relative z-10 flex flex-col items-center text-center px-1">
                  <div className={`relative w-14 h-28 sm:w-16 sm:h-32 rounded-[1rem] border-2 bg-background shadow-[0_20px_40px_-18px_rgba(0,0,0,0.5)] ${stage.tone} p-[3px] mb-4`}>
                    <div className="relative w-full h-full rounded-[0.8rem] overflow-hidden bg-card/40 border border-border/40 flex flex-col items-center justify-end p-1.5 gap-1">
                      <stage.icon size={13} className={stage.fill >= 5 ? "text-primary mb-auto mt-2.5" : "text-muted-foreground/40 mb-auto mt-2.5"} />
                      {Array.from({ length: 4 }).map((_, layer) => (
                        <span key={layer} className={`h-[4px] w-full rounded-sm ${layer < stage.fill ? "bg-primary" : "bg-transparent"}`} style={{ opacity: layer < stage.fill ? 0.5 + (0.5 * stage.fill) / 6 : 0 }} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary/70 mb-1.5">{stage.badge}</span>
                  <p className="text-sm font-bold text-foreground leading-tight mb-1">{stage.label}</p>
                  <p className="text-xs text-muted-foreground leading-snug hidden sm:block">{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ================================================================ */}
      {/* THE PROOF — Skill x Swap, as the page's dominant proof moment,    */}
      {/* framed as a timeline against a real device, not a buried card.    */}
      {/* ================================================================ */}
      <section className="relative bg-card/10 border-y border-border/40 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <SectionEyebrow className="mb-6">The Proof</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto">
              A founder needed a real product on real phones — in six weeks.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="grid sm:grid-cols-[0.8fr_1.2fr] gap-10 sm:gap-14 items-center max-w-4xl mx-auto">
            <div className="flex justify-center">
              <div className="relative w-52 aspect-[9/19.5] rounded-[2.4rem] bg-gradient-to-b from-card via-card/70 to-card/40 border border-border p-[3px] rotate-2 shadow-[0_40px_90px_-25px_rgba(196,138,100,0.3)]">
                <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-background border border-border/50">
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-4 rounded-full bg-foreground/90 z-10" />
                  <div className="p-4 pt-10 space-y-2.5">
                    <span className="block h-16 rounded-xl bg-gradient-to-br from-primary/25 via-primary/10 to-transparent border border-primary/30" />
                    {[0, 1, 2].map((i) => (<span key={i} className="block h-9 rounded-lg bg-card/60 border border-border/50" />))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-5">
                Skill x Swap — credit-based skill trading marketplace
              </p>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">6 weeks</span>
                <span className="text-sm text-muted-foreground">requirements → testable build</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">This became a real product people could carry — on React Native + Firebase.</p>
              <ul className="space-y-2.5">
                {["Full onboarding with Core vs. Lite Pro user tiers", "Monthly credit allowance + persistent earned credits", "Matchmaking, swap requests, pending-request management", "Architecture ready for Stripe subscriptions in a later phase"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <Check size={12} className="text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <div className="max-w-xl mx-auto text-center mt-14">
            <AnimatedSection delay={0.12}>
              <blockquote>
                <p className="text-lg text-foreground/90 leading-snug mb-3">
                  "I wouldn't have been able to launch my startup without his expertise in app
                  building and development. 100% will use Omer every time I need help."
                </p>
                <footer className="text-sm text-muted-foreground">
                  Sam, Founder, Skill x Swap
                  {skillXSwapProject && (<>{" · "}<Link to={`/portfolio/${skillXSwapProject.slug}`} className="text-primary hover:underline">Case study</Link></>)}
                </footer>
              </blockquote>
            </AnimatedSection>
            {sheezaTestimonial && (
              <AnimatedSection delay={0.16} className="mt-10 text-left rounded-xl border border-border/50 bg-background/30 p-5">
                <p className="text-sm text-foreground/85 leading-relaxed mb-3">"{sheezaTestimonial.quote}"</p>
                <p className="text-xs text-muted-foreground">{sheezaTestimonial.author}, {sheezaTestimonial.role}</p>
              </AnimatedSection>
            )}
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
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Before you build for mobile.</h2>
          </AnimatedSection>
          <div className="flex justify-center my-10 sm:my-12" aria-hidden="true">
            <span className="w-px h-10 sm:h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>
          <AnimatedSection delay={0.06}>
            <FAQAccordion items={mobileDetailFAQs} idPrefix="mobile-detail-faq" />
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CLOSE                                                              */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_50%,rgba(196,138,100,0.07),transparent_70%)]" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-12">
              <span className="block text-muted-foreground/50">Tell us what you're building —</span>
              <span className="block text-foreground mt-2">and who's going to carry it.</span>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="relative inline-block">
            <ClosingGlow />
            <Link to={`/contact?service=${service.slug}`}>
              <motion.button
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group relative bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-9 pr-7 sm:pl-11 sm:pr-9 py-4 sm:py-[1.35rem] rounded-full font-semibold text-base sm:text-xl tracking-[-0.01em]
                         shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_10px_-2px_rgba(0,0,0,0.35),0_16px_36px_-16px_rgba(196,138,100,0.4)]
                         hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_2px_10px_-2px_rgba(0,0,0,0.4),0_20px_42px_-16px_rgba(196,138,100,0.5)]
                         flex items-center gap-3 sm:gap-4 overflow-hidden transition-shadow duration-300"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.14] via-white/0 to-black/[0.06]" />
                <span className="relative">Build Your Mobile App</span>
                <span className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default MobileDetailPage;
