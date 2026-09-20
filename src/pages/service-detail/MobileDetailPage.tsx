import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Camera, MapPin, Fingerprint, Bell, WifiOff, Smartphone, Compass, Sliders, FlaskConical, Send, Store, Radio } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageTransition from "../../components/common/PageTransition";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionEyebrow from "../../components/common/SectionEyebrow";
import FAQAccordion from "../../components/common/FAQAccordion";
import RelatedReading from "../../components/common/RelatedReading";
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

// Six environments a product actually moves through, not six identical
// nodes — the container shape itself changes as the product gets more
// real: dashed while it's still logic, solid once it's on hardware, a
// gate shape at store review (a real threshold, not another circle),
// solid-and-lit once it's live.
const JOURNEY_STAGES = [
  { icon: Compass, label: "Product flow", description: "The journey on a phone, mapped first.", stage: "logic" as const },
  { icon: Sliders, label: "Device features", description: "Camera, location, biometrics.", stage: "logic" as const },
  { icon: FlaskConical, label: "Real device testing", description: "Real hardware, not simulators.", stage: "hardware" as const },
  { icon: Send, label: "TestFlight / Play testing", description: "In real hands first.", stage: "hardware" as const },
  { icon: Store, label: "Store review", description: "App Store & Play Store.", stage: "gate" as const },
  { icon: Radio, label: "Production", description: "Live, monitored, updatable.", stage: "live" as const },
];

const MobileDetailPage: React.FC = () => {
  // The rail has to span exactly from the first stage's icon to the
  // last's, but the grid's six columns aren't evenly spaced in fixed
  // pixels — same lesson as the SaaS loop arc: measure the real rendered
  // positions instead of assuming the grid math.
  const railContainerRef = useRef<HTMLDivElement>(null);
  const firstStageRef = useRef<HTMLSpanElement>(null);
  const lastStageRef = useRef<HTMLSpanElement>(null);
  const [rail, setRail] = useState<{ containerWidth: number; x1: number; x2: number; y: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const container = railContainerRef.current;
      const first = firstStageRef.current;
      const last = lastStageRef.current;
      if (!container || !first || !last) return;
      const containerRect = container.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      setRail({
        containerWidth: containerRect.width,
        x1: firstRect.left + firstRect.width / 2 - containerRect.left,
        x2: lastRect.left + lastRect.width / 2 - containerRect.left,
        y: firstRect.top + firstRect.height / 2 - containerRect.top,
      });
    };
    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

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
        image={`https://zumetrix.com/og/services-${service.slug}.png`}
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ================================================================ */}
      {/* HERO — kept close to the approved direction. Not rebuilt.          */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background pt-28 sm:pt-32 pb-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_10%,rgba(196,138,100,0.08),transparent_70%)]" />

        {/* Its own, wider row — left-aligned inside the narrow centered   */}
        {/* content column left it stranded in empty space at wide         */}
        {/* viewports, disconnected from everything below it. This width   */}
        {/* anchors it near the true page edge instead, the way the        */}
        {/* portfolio/article detail pages already do it.                  */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <AnimatedSection mode="hero">
            <Link to="/services" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-card/25 pl-2 pr-5 py-2 text-sm font-semibold text-muted-foreground shadow-[0_12px_30px_-16px_rgba(0,0,0,0.6)] hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors duration-200 btn-sheen"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-background/80 group-hover:bg-primary/10 transition-colors duration-200">
                  <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                </span>
                All Services
              </motion.div>
            </Link>
          </AnimatedSection>
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection mode="hero" delay={0.04}>
            <SectionEyebrow className="mb-7">Mobile App Development</SectionEyebrow>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">{service.title}</h1>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight leading-[1.35] mb-8 max-w-xl mx-auto">
              <span className="text-muted-foreground/50">Built for the phone in someone's hand —</span>{" "}
              <span className="text-foreground">not a shrunken website.</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link to={`/contact?service=${service.slug}`} className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen">
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
      {/* SHRUNK VS. REAL — the hero already spent one detailed phone on    */}
      {/* this page; a second and third mini-phone here just to make the    */}
      {/* same contrast again was decorative repetition, not a new idea.    */}
      {/* Same asymmetric compare grammar as Web's "website vs business     */}
      {/* software," in the site's shared visual language, without another  */}
      {/* device render.                                                    */}
      {/* ================================================================ */}
      <section className="relative bg-background py-20 sm:py-28 border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <SectionEyebrow className="mb-6">The Difference</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Not a website, resized.</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.05} className="grid sm:grid-cols-5 gap-4 sm:gap-5 items-stretch">
            <div className="sm:col-span-2 rounded-2xl border border-border/40 bg-card/10 p-7 sm:p-9 opacity-55 flex flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground mb-5">A website, shrunk</p>
              <ul className="space-y-3 text-base text-muted-foreground">
                <li>Tiny tap targets, pinch-to-zoom</li>
                <li>No real offline behavior</li>
                <li>Browser chrome eating the screen</li>
              </ul>
            </div>
            <div className="sm:col-span-3 rounded-2xl border border-primary/35 bg-gradient-to-b from-primary/[0.09] to-transparent p-7 sm:p-9 shadow-[0_35px_80px_-30px_rgba(196,138,100,0.28)]">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary mb-5">A real app</p>
              <div className="flex flex-wrap gap-2.5">
                {["Native gestures", "Proper touch targets", "Push notifications", "Offline mode", "Home screen icon", "No browser chrome"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-background/50 pl-3 pr-3.5 py-1.5 text-sm text-foreground/90">
                    <Check size={11} strokeWidth={2.5} className="text-primary flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
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
      {/* HOW WE WORK — RELEASE RAIL. One product, moving through six real   */}
      {/* environments — not six identical circles standing for six steps.  */}
      {/* The container shape itself changes as the product gets more real  */}
      {/* (dashed logic -> solid hardware -> a gate at store review -> lit  */}
      {/* once live), and a single lit point continuously travels the rail  */}
      {/* connecting them, the same "still moving" idea as the SaaS loop's  */}
      {/* traveling dot, applied to a one-way release pipeline instead of   */}
      {/* a loop.                                                           */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-32 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <AnimatedSection>
            <SectionEyebrow className="mb-6">How We Work</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">One product, moving through six real environments.</h2>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.06} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={railContainerRef} className="relative pt-2">
            {rail && (
              <div aria-hidden="true" className="hidden sm:block absolute left-0 top-0 h-16" style={{ width: rail.containerWidth }}>
                <svg width={rail.containerWidth} height={64} viewBox={`0 0 ${rail.containerWidth} 64`} className="overflow-visible text-primary/60">
                  <path id="mobile-rail-path" d={`M ${rail.x1} ${rail.y} L ${rail.x2} ${rail.y}`} fill="none" stroke="none" />
                  <motion.path
                    d={`M ${rail.x1} ${rail.y} L ${rail.x2} ${rail.y}`}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  <circle r="6" fill="#DCA973" opacity="0.22" style={{ filter: "blur(3px)" }}>
                    <animateMotion dur="3.2s" repeatCount="indefinite">
                      <mpath href="#mobile-rail-path" />
                    </animateMotion>
                  </circle>
                  <circle r="3" fill="#F3D9BE">
                    <animateMotion dur="3.2s" repeatCount="indefinite">
                      <mpath href="#mobile-rail-path" />
                    </animateMotion>
                  </circle>
                </svg>
              </div>
            )}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-3 gap-y-10 sm:gap-x-2">
              {JOURNEY_STAGES.map((stage, i) => {
                const stageRef = i === 0 ? firstStageRef : i === JOURNEY_STAGES.length - 1 ? lastStageRef : undefined;
                return (
                  <div key={stage.label} className="relative z-10 flex flex-col items-center text-center px-1">
                    {stage.stage === "gate" ? (
                      <span ref={stageRef} className="relative flex items-center justify-center w-14 h-14 mb-4">
                        <span className="absolute left-1 top-0 bottom-0 w-[3px] rounded-full bg-primary/70" aria-hidden="true" />
                        <span className="absolute right-1 top-0 bottom-0 w-[3px] rounded-full bg-primary/70" aria-hidden="true" />
                        <stage.icon size={18} className="text-primary relative" />
                      </span>
                    ) : (
                      <span
                        ref={stageRef}
                        className={`flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
                          stage.stage === "logic"
                            ? "border-2 border-dashed border-border/50 bg-background"
                            : stage.stage === "hardware"
                              ? "border-2 border-border/70 bg-background"
                              : "border-2 border-primary bg-primary/10 shadow-[0_18px_38px_-16px_rgba(196,138,100,0.5)]"
                        }`}
                      >
                        {stage.stage === "live" ? (
                          <span className="relative flex items-center justify-center">
                            <span className="absolute inset-0 rounded-full bg-primary/50 animate-ping" style={{ animationDuration: "2.5s" }} />
                            <stage.icon size={18} className="relative text-primary" />
                          </span>
                        ) : (
                          <stage.icon size={18} className={stage.stage === "hardware" ? "text-foreground/70" : "text-muted-foreground/50"} />
                        )}
                      </span>
                    )}
                    <p className="text-[11px] font-bold text-primary/60 mb-1">0{i + 1}</p>
                    <p className="text-xs sm:text-sm font-bold text-foreground leading-tight mb-1">{stage.label}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug hidden sm:block">{stage.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        <div className="flex justify-center my-4 sm:my-6" aria-hidden="true">
          <svg width="64" height="96" viewBox="0 0 64 96" fill="none" className="text-primary/80">
            <motion.path
              d="M32 4 C48 4, 51 21, 36 28 C19 35, 11 49, 24 58 C33 64, 40 69, 37 78"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
            <motion.path
              d="M25 71 L38 81 L48 68"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.75 }}
            />
          </svg>
        </div>

        <AnimatedSection delay={0.08} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="btn-sheen relative overflow-hidden rounded-[1.75rem] border border-primary/40 bg-gradient-to-b from-primary/[0.11] via-card/50 to-card/20 p-8 sm:p-11 text-center shadow-[0_45px_90px_-35px_rgba(196,138,100,0.4)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(196,138,100,0.14),transparent_70%)]" />
            <div className="relative">
              {/* Same ring treatment as the journey's "live" nodes — support */}
              {/* reads as the next stop on that same rail, not a new device. */}
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary bg-primary/10 mb-5 shadow-[0_18px_38px_-16px_rgba(196,138,100,0.5)]">
                <Radio size={24} className="text-primary" />
              </span>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" style={{ animationDuration: "2.5s" }} />
                  <span className="relative h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/80">After Production — Ongoing</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">Support</p>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                We stay on to fix, extend, and ship the next release — the app doesn't go quiet the day it hits the store.
              </p>
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
      {/* RELATED READING                                                    */}
      {/* ================================================================ */}
      <section className="pb-8 bg-background">
        <div className="px-4 sm:px-6 lg:px-8">
          <RelatedReading
            links={[
              {
                href: "/articles/mobile-app-development-flutter-react-native",
                label: "Flutter vs React Native: which is right for you?",
                description: "Five real questions to decide the framework, grounded in what we've actually shipped.",
              },
              {
                href: "/portfolio/tomo-voice-ai-companion",
                label: "Tomo — voice-first AI companion app",
                description: "Low-latency voice streaming and a premium interface, built in React Native.",
              },
              {
                href: "/portfolio/pawspace-pet-services-marketplace",
                label: "PawSpace — pet services marketplace app",
                description: "Booking and provider-matching flows for a two-sided mobile marketplace.",
              },
            ]}
          />
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
                         flex items-center gap-3 sm:gap-4 overflow-hidden transition-shadow duration-300 btn-sheen"
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
