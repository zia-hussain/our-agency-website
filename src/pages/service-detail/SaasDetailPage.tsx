import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, X, Lightbulb, Rocket, Users, MapPin, Hammer,
  FlaskConical, MessageCircle, Flag, CalendarClock, LifeBuoy,
} from "lucide-react";
import SEO from "../../components/common/SEO";
import PageTransition from "../../components/common/PageTransition";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionEyebrow from "../../components/common/SectionEyebrow";
import FAQAccordion from "../../components/common/FAQAccordion";
import ClosingGlow from "../../components/common/ClosingGlow";
import { services } from "../../data/services";
import { saasDetailFAQs } from "../../data/faqs/service-saas";
import { TESTIMONIALS } from "../../data/testimonials";

const service = services.find((s) => s.slug === "saas-mvp-development")!;
const pageUrl = `https://zumetrix.com/services/${service.slug}`;
const kellyTestimonial = TESTIMONIALS.find((t) => t.id === "kelly-andrews-ifyify");
const jennyTestimonial = TESTIMONIALS.find((t) => t.id === "jenny-hjelpna");

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Capability, drawn as two load-bearing layers rather than a flat bullet
// list — the point is that Foundation exists to carry Product Mechanics,
// not that both are interchangeable rows in the same list.
const CORE_LAYER = ["User accounts, roles & multi-tenant access", "Stripe payments & subscriptions", "Dashboards & business intelligence", "Onboarding flows & feature tours"];
const FOUNDATION_LAYER = ["Admin panel for day-to-day management", "REST APIs built for what's next", "Cloud deployment, production from day one", "Automated reporting & exports"];

const ENGAGEMENT = [
  { icon: Users, title: "Decide", description: "What your first version needs to prove, and what can genuinely wait." },
  { icon: MapPin, title: "Scope", description: "The decisions become a focused build plan — priorities, order, milestones." },
  { icon: Hammer, title: "Build", description: "Short sprints. Working software to review at every step." },
  { icon: FlaskConical, title: "Validate", description: "Real user feedback, folded back into the product before launch." },
];

const LIFTLY_BUILT = [
  "Customer booking, pickup/dropoff & job detail capture",
  "Serviceability & distance-based eligibility logic",
  "Booking deposit & payment handling",
  "Internal admin & day-to-day booking operations controls",
];
const LIFTLY_DEFERRED = [
  "Distance bands, labor & urgency-based pricing",
  "Specialty item & stairs pricing modifiers",
  "Admin override & customer approval flows",
  "Margin protection logic",
];

const WORKING_TOGETHER = [
  { icon: Flag, title: "Kickoff", description: "Scope and priorities confirmed before a sprint starts." },
  { icon: CalendarClock, title: "Sprints", description: "Working builds to review on a fixed cadence — never a black box." },
  { icon: MessageCircle, title: "Review", description: "You approve direction at each milestone, not just at the end." },
];

const SaasDetailPage: React.FC = () => {
  // The loop arc has to land exactly on the Build and Validate icons, but
  // those icons aren't at clean percentage marks — they're left-aligned
  // inside four unevenly-gapped grid columns. Guessing percentages drifted
  // by a viewport's worth of pixels, so this measures the real rendered
  // positions instead and redraws the arc to match them exactly.
  const loopContainerRef = useRef<HTMLDivElement>(null);
  const buildIconRef = useRef<HTMLSpanElement>(null);
  const validateIconRef = useRef<HTMLSpanElement>(null);
  const [loopArc, setLoopArc] = useState<{ containerWidth: number; x1: number; x2: number; tipX: number; startX: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const container = loopContainerRef.current;
      const buildEl = buildIconRef.current;
      const validateEl = validateIconRef.current;
      if (!container || !buildEl || !validateEl) return;
      const containerRect = container.getBoundingClientRect();
      const buildRect = buildEl.getBoundingClientRect();
      const validateRect = validateEl.getBoundingClientRect();
      const x1 = buildRect.left + buildRect.width / 2 - containerRect.left;
      const x2 = validateRect.left + validateRect.width / 2 - containerRect.left;
      // Inset both ends by the same fraction of the Build–Validate gap so the
      // arc's own midpoint lands exactly on the gap's midpoint — centered
      // between the two icons, not just shortened from one side.
      const inset = (x2 - x1) * 0.15;
      setLoopArc({
        containerWidth: containerRect.width,
        x1,
        x2,
        tipX: x1 + inset,
        startX: x2 - inset,
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
        image={`https://zumetrix.com${service.image}`}
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ================================================================ */}
      {/* HERO — kept close to the approved direction. Not rebuilt.          */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background pt-28 sm:pt-32 pb-20 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_50%_8%,rgba(196,138,100,0.11),transparent_70%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

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
            <SectionEyebrow className="mb-7">SaaS Product Development</SectionEyebrow>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">{service.title}</h1>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight leading-[1.35] mb-8 max-w-xl mx-auto">
              <span className="text-muted-foreground/50">We don't build every feature you can imagine.</span>{" "}
              <span className="text-foreground">We decide what your first version needs to prove.</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link to={`/contact?service=${service.slug}`} className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen">
                Start Your Product
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </Link>
              <span className="text-sm font-medium text-muted-foreground">{service.price}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection mode="hero" delay={0.1} className="mt-16 sm:mt-20">
            <div className="relative max-w-3xl mx-auto grid sm:grid-cols-3 gap-4 sm:gap-3 items-stretch text-left">
              <div className="rounded-2xl border border-border/50 bg-card/15 p-6 flex flex-col items-center text-center shadow-[0_25px_60px_-25px_rgba(0,0,0,0.6)]">
                <Lightbulb size={22} className="text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground/60">An idea</p>
                <p className="text-xs text-muted-foreground/40 mt-1">Everything feels essential</p>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/[0.08] to-transparent p-6 shadow-[0_30px_70px_-25px_rgba(196,138,100,0.25)]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/70 mb-3 text-center">Scope decisions</p>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2 text-xs text-foreground/85"><Check size={12} className="text-primary flex-shrink-0" /> Accounts &amp; payments</li>
                  <li className="flex items-center gap-2 text-xs text-foreground/85"><Check size={12} className="text-primary flex-shrink-0" /> Core user flow</li>
                  <li className="flex items-center gap-2 text-xs text-foreground/85"><Check size={12} className="text-primary flex-shrink-0" /> Admin &amp; dashboards</li>
                  <li className="flex items-center gap-2 text-xs text-muted-foreground/45 line-through decoration-muted-foreground/30"><X size={12} className="text-muted-foreground/35 flex-shrink-0" /> Advanced automation — v2</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/40 bg-gradient-to-b from-primary/12 to-primary/[0.02] p-6 flex flex-col items-center text-center shadow-[0_30px_70px_-20px_rgba(196,138,100,0.35)]">
                <Rocket size={22} className="text-primary mb-3" />
                <p className="text-sm font-semibold text-foreground">A real product</p>
                <p className="text-xs text-muted-foreground/50 mt-1">Focused, working, live</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* IS THIS YOU — buyer self-recognition. Answers "is this my         */}
      {/* situation" before anything else, in the buyer's own voice.        */}
      {/* ================================================================ */}
      <section className="relative bg-background py-20 sm:py-28 border-b border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">This is for you if</p>
          </AnimatedSection>
          <div className="space-y-0 divide-y divide-border/30">
            {[
              "You have a real idea, but haven't shipped anything yet.",
              "You've sketched twenty features and can't tell which four actually matter.",
              "You need something real in front of users or investors — not a slide deck.",
            ].map((line, i) => (
              <AnimatedSection key={line} delay={i * 0.05} className="py-6 sm:py-7 flex items-start sm:items-center gap-5">
                <span className="text-xs font-semibold text-primary/50 flex-shrink-0 mt-1 sm:mt-0">0{i + 1}</span>
                <p className="text-xl sm:text-2xl text-foreground/90 tracking-tight leading-snug">{line}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SIGNATURE SCENE — PRODUCT ARCHITECTURE. An architectural cutaway:  */}
      {/* the visible product sitting on, and physically held up by, the    */}
      {/* foundation beneath it. Full width, real scale, textured bedrock.  */}
      {/* ================================================================ */}
      <section className="relative bg-card/10 border-b border-border/40 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
          <AnimatedSection>
            <SectionEyebrow className="mb-6">What We Build</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Two layers. Users only ever see the top one.
            </h2>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.05} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* The deck — narrower, elevated, floating above ground.          */}
          <div className="relative z-20 mx-auto w-[82%] sm:w-[62%] rounded-2xl border border-primary/40 bg-gradient-to-b from-primary/[0.14] to-primary/[0.04] px-6 sm:px-9 pt-6 sm:pt-8 pb-7 sm:pb-9 shadow-[0_40px_80px_-25px_rgba(196,138,100,0.4)]">
            <p className="text-base sm:text-lg font-bold text-foreground tracking-tight mb-1">Visible product</p>
            <p className="text-[11px] text-primary/70 font-semibold uppercase tracking-[0.14em] mb-5">what users touch</p>
            <div className="flex flex-wrap gap-2">
              {CORE_LAYER.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-background/60 pl-2.5 pr-3 py-1.5 text-xs sm:text-sm text-foreground/90">
                  <Check size={11} strokeWidth={2.5} className="text-primary flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Support columns — real number, real span, visibly carrying     */}
          {/* something narrower than the ground they're planted in.         */}
          <div className="relative z-10 flex justify-center gap-[7%] sm:gap-[6.5%] h-8 sm:h-10" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="w-px bg-gradient-to-b from-primary/40 to-border/30" style={{ height: `${100 - Math.abs(i - 4) * 8}%`, alignSelf: "flex-end" }} />
            ))}
          </div>

          {/* Ground / foundation — full width, visibly deeper and heavier   */}
          <div className="relative rounded-3xl border border-border/50 bg-gradient-to-b from-card/40 to-background overflow-hidden">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
            <div className="relative px-6 sm:px-12 pt-8 sm:pt-10 pb-9 sm:pb-12">
              <p className="text-base sm:text-lg font-bold text-muted-foreground tracking-tight mb-1">Foundation</p>
              <p className="text-[11px] text-muted-foreground/60 font-semibold uppercase tracking-[0.14em] mb-6">what carries it</p>
              <div className="flex flex-wrap gap-2.5 max-w-3xl">
                {FOUNDATION_LAYER.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 pl-3 pr-4 py-2 text-sm text-muted-foreground">
                    <Check size={12} strokeWidth={2.5} className="text-muted-foreground/50 flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground/50 italic mt-6">
            The foundation is wider than the product for a reason — it has to carry more than what's visible.
          </p>
        </AnimatedSection>
      </section>

      {/* ================================================================ */}
      {/* HOW WE WORK — big nodes seated on a rail, with a real drawn loop   */}
      {/* arcing from Validate back into Build. Distinct from the linear    */}
      {/* progress bar Working Together uses below — this one iterates.     */}
      {/* ================================================================ */}
      <section className="relative bg-background py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16 sm:mb-20">
            <SectionEyebrow className="mb-6">How We Work</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Decide, scope, build — then loop.</h2>
          </AnimatedSection>

          <div ref={loopContainerRef} className="relative pb-14 sm:pb-16 sm:pt-32">
            {/* The loop — arcs above the row, from Validate back into Build, */}
            {/* hand-drawn like the rest of the site's arrows rather than a   */}
            {/* dashed technical-diagram line, with real clearance before it  */}
            {/* reaches the icons instead of touching them. Positioned from   */}
            {/* measured icon centers, not guessed percentages — the icons    */}
            {/* sit left-aligned inside unevenly-gapped columns, so           */}
            {/* percentage math never lined up with the actual circles.       */}
            {loopArc && (
              <>
                {/* One bold, confident stroke — the same weight and hand-     */}
                {/* drawn character as the squiggle arrows used everywhere     */}
                {/* else on the site, not a busier "look how premium this is"  */}
                {/* composition. The arrowhead is a filled triangle, not a     */}
                {/* stroked chevron — a stroked V can render very slightly     */}
                {/* uneven depending on how the two segments join; a filled    */}
                {/* shape is exact by construction, every time.                */}
                <div aria-hidden="true" className="hidden sm:block absolute left-0 top-10 h-16" style={{ width: loopArc.containerWidth }}>
                  <svg width={loopArc.containerWidth} height={64} viewBox={`0 0 ${loopArc.containerWidth} 64`} className="overflow-visible text-primary/80">
                    {/* Pulled in from Validate's icon toward Build's — a short, */}
                    {/* contained swoosh instead of a line stretched across the */}
                    {/* whole row — and it now ends exactly at the arrowhead's  */}
                    {/* base, not a few px past it, so line and arrowhead read  */}
                    {/* as one continuous stroke instead of two shapes glued    */}
                    {/* together off-register.                                 */}
                    <path
                      id="saas-loop-path"
                      d={`M ${loopArc.startX} 46 C ${loopArc.startX} 6, ${loopArc.tipX} 6, ${loopArc.tipX} 36`}
                      fill="none"
                      stroke="none"
                    />
                    <motion.path
                      d={`M ${loopArc.startX} 46 C ${loopArc.startX} 6, ${loopArc.tipX} 6, ${loopArc.tipX} 36`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.35"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.35 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                    />
                    {/* Base sits exactly at the line's new endpoint (y=36) —   */}
                    {/* no overlap, no gap — tip extends on past it toward     */}
                    {/* Build, dead center on the line's own x-axis.           */}
                    <motion.path
                      d={`M ${loopArc.tipX - 6.5} 36 L ${loopArc.tipX + 6.5} 36 L ${loopArc.tipX} 49 Z`}
                      fill="currentColor"
                      opacity="0.6"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 0.6, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: 0.8 }}
                      style={{ transformOrigin: `${loopArc.tipX}px 42px` }}
                    />
                    {/* The loop itself, shown happening rather than implied —  */}
                    {/* a lit dot with a soft trailing glow, endlessly          */}
                    {/* traveling the path. This is the "it never really       */}
                    {/* stops" idea, made literal instead of just labeled.     */}
                    <circle r="7" fill="#DCA973" opacity="0.25" style={{ filter: "blur(4px)" }}>
                      <animateMotion dur="2.4s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#saas-loop-path" />
                      </animateMotion>
                    </circle>
                    <circle r="3.5" fill="#F3D9BE">
                      <animateMotion dur="2.4s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#saas-loop-path" />
                      </animateMotion>
                    </circle>
                  </svg>
                </div>
                {/* True center over the arrowhead's own axis (-50%), not a    */}
                {/* partial nudge that left the label reading off to one side. */}
                <p
                  aria-hidden="true"
                  className="hidden sm:block absolute text-xs font-semibold text-primary/70 whitespace-nowrap"
                  style={{ left: loopArc.tipX, top: 0, transform: "translateX(-50%)" }}
                >
                  Loops until ready
                </p>
              </>
            )}

            <span aria-hidden="true" className="hidden sm:block absolute left-[12.5%] right-[12.5%] top-40 h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />
            <div className="grid sm:grid-cols-4 gap-10 sm:gap-6">
              {ENGAGEMENT.map((step, i) => (
                <AnimatedSection key={step.title} delay={i * 0.06}>
                  <div className="text-center sm:text-left">
                    <span
                      ref={i === 2 ? buildIconRef : i === 3 ? validateIconRef : undefined}
                      className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/40 bg-background shadow-[0_25px_50px_-22px_rgba(196,138,100,0.4)] mb-5 mx-auto sm:mx-0"
                    >
                      <step.icon size={22} className="text-primary" />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary/60 mb-2">Step 0{i + 1}</p>
                    <p className="text-lg font-bold text-foreground mb-2">{step.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <p className="sm:hidden text-center text-xs text-muted-foreground/60 italic mt-6">
              Loops back into Build until the first version is ready.
            </p>
          </div>
        </div>
      </section>

      <div className="relative flex justify-center" aria-hidden="true">
        <span className="w-px h-12 sm:h-16 bg-gradient-to-b from-border to-primary/50" />
      </div>

      {/* ================================================================ */}
      {/* SIGNATURE SCENE — THE FORK, IN PRACTICE. The decision philosophy   */}
      {/* flows directly into Liftly: an abstract fork resolving into a     */}
      {/* real, asymmetric V1/V2 split. One continuous scene, not two.      */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-4">
            <SectionEyebrow className="mb-6">How We Decide</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Every idea reaches this fork.</h2>
          </AnimatedSection>

          {/* The fork — an actual branch point, drawn. Build Now is the      */}
          {/* thick, solid, primary line; Design For Later is thin and        */}
          {/* fades out. The solid line is what continues into Liftly below.  */}
          <AnimatedSection delay={0.06} className="max-w-3xl mx-auto mt-8">
            <svg viewBox="0 0 400 90" className="w-full h-auto" aria-hidden="true">
              <path d="M 200 0 L 200 26 L 110 78" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-border/50" />
              <path d="M 200 0 L 200 26 L 290 78" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary" />
              <circle cx="200" cy="2" r="4" className="fill-foreground/50" />
            </svg>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 -mt-2">
              <div className="opacity-45 text-center sm:text-left">
                <p className="text-sm font-semibold text-muted-foreground mb-1">Build everything imagined</p>
                <p className="text-xs text-muted-foreground/60 leading-relaxed">Six months. A launch that proves nothing — too much shipped at once to know what worked.</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-lg font-bold text-foreground mb-1">Build what proves the concept</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Weeks. A focused first version that answers the one question that actually matters.</p>
              </div>
            </div>
          </AnimatedSection>

          {/* The solid path continues — same color, same weight, straight   */}
          {/* into the real decision it produced, arriving at a real point   */}
          {/* instead of just fading into the next section's margin.         */}
          <AnimatedSection delay={0.1} className="flex flex-col items-end max-w-3xl mx-auto pr-0 sm:pr-[3%]" aria-hidden="true">
            <span className="w-[3px] h-16 sm:h-20 bg-gradient-to-b from-primary to-primary/70" />
            <span className="w-2 h-2 rounded-full bg-primary" style={{ marginTop: "-3px", marginRight: "-2.5px" }} />
          </AnimatedSection>

          <AnimatedSection delay={0.04} className="text-center mb-12 max-w-xl mx-auto mt-4">
            <p className="text-sm text-primary/70 font-semibold italic mb-6">Liftly took exactly this path.</p>
            <SectionEyebrow className="mb-6">The Proof</SectionEyebrow>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
              A founder had a bigger vision than the first release could carry.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Liftly's real ambition was a full marketplace with a sophisticated, variable pricing
              engine. Building that first would have delayed proving what the business actually
              needed: a reliable, bookable operational loop.
            </p>
          </AnimatedSection>

          {/* V1 dominates — full editorial scale. V2 recedes underneath as  */}
          {/* a footnote, not a co-equal column.                              */}
          <AnimatedSection delay={0.08} className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-primary/40 bg-gradient-to-b from-primary/10 to-primary/[0.02] p-8 sm:p-11 shadow-[0_40px_90px_-30px_rgba(196,138,100,0.35)]">
              <div className="flex items-center gap-2.5 mb-7">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 ring-1 ring-primary/25 flex-shrink-0">
                  <Check size={15} strokeWidth={3} className="text-primary" />
                </span>
                <span className="text-xl sm:text-2xl font-bold text-foreground">V1 — built &amp; shipped</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {LIFTLY_BUILT.map((item) => (
                  <p key={item} className="text-sm text-foreground/85 leading-relaxed">{item}</p>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 opacity-45 px-2">
              <X size={12} strokeWidth={3} className="text-muted-foreground/50 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold">V2 — designed, not built:</span> {LIFTLY_DEFERRED.join(" · ")}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12} className="text-center mt-14">
            <blockquote className="max-w-lg mx-auto">
              <p className="text-lg text-foreground/90 leading-snug mb-3">
                "Working with this Fiverr team has been an absolute game-changer for our business.
                From the very beginning, they understood our vision and brought it to life with a
                beautifully designed, high-performing landing page that exceeded our expectations."
              </p>
              <footer className="text-sm text-muted-foreground">Founder, Liftly</footer>
            </blockquote>
            <p className="text-xs text-muted-foreground/50 italic mt-4">
              Client identity withheld by request — product name and scope shared with permission.
            </p>
          </AnimatedSection>

          {/* Folded into this scene as a quiet aside rather than a second   */}
          {/* standalone section — these don't answer a different doubt      */}
          {/* than Liftly already did, so they don't earn their own weight.  */}
          {(kellyTestimonial || jennyTestimonial) && (
            <AnimatedSection delay={0.16} className="max-w-2xl mx-auto mt-10 pt-8 border-t border-border/30 grid sm:grid-cols-2 gap-5 text-left">
              {kellyTestimonial && (
                <div>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed mb-2">"{kellyTestimonial.quote}"</p>
                  <p className="text-[11px] text-muted-foreground/60">{kellyTestimonial.author}, {kellyTestimonial.role}</p>
                </div>
              )}
              {jennyTestimonial && (
                <div>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed mb-2">"{jennyTestimonial.quote}"</p>
                  <p className="text-[11px] text-muted-foreground/60">{jennyTestimonial.author}, {jennyTestimonial.role}</p>
                </div>
              )}
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* WORKING TOGETHER — a filled progress bar, not a loop. Logistics   */}
      {/* move forward once and don't repeat, so the visual doesn't either. */}
      {/* ================================================================ */}
      <section className="relative bg-card/10 border-y border-border/40 py-24 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16 sm:mb-20">
            <SectionEyebrow className="mb-6">Working Together</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Once we've decided what to build, here's the cadence.</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="relative h-1.5 rounded-full bg-border/40 mb-12 sm:mb-14 max-w-3xl mx-auto">
              <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-gradient-to-r from-primary/50 via-primary/70 to-primary" />
              {WORKING_TOGETHER.map((step, i) => (
                <span
                  key={step.title}
                  className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-primary bg-background"
                  style={{ left: `${(i / (WORKING_TOGETHER.length - 1)) * 100}%`, transform: "translate(-50%, -50%)" }}
                />
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
              {WORKING_TOGETHER.map((step) => (
                <div key={step.title} className="text-center sm:text-left">
                  <span className="flex items-center justify-center w-11 h-11 rounded-full border border-border/60 bg-background mb-4 mx-auto sm:mx-0">
                    <step.icon size={18} className="text-primary" />
                  </span>
                  <p className="text-base font-bold text-foreground mb-2">{step.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <div className="flex justify-center my-6 sm:my-8" aria-hidden="true">
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

          <AnimatedSection delay={0.08} className="max-w-2xl mx-auto">
            <div className="btn-sheen relative overflow-hidden rounded-[1.75rem] border border-primary/40 bg-gradient-to-b from-primary/[0.11] via-card/50 to-card/20 p-8 sm:p-11 text-center shadow-[0_45px_90px_-35px_rgba(196,138,100,0.4)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(196,138,100,0.14),transparent_70%)]" />
              <div className="relative">
                {/* Same ring treatment as the Decide/Scope/Build/Validate     */}
                {/* icons above — support reads as one more stop on the same  */}
                {/* loop, not a new, unrelated component.                    */}
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/40 bg-background mb-5 shadow-[0_25px_50px_-22px_rgba(196,138,100,0.4)]">
                  <LifeBuoy size={26} className="text-primary" />
                </span>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" style={{ animationDuration: "2.5s" }} />
                    <span className="relative h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/80">After Launch — Ongoing</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">Support</p>
                <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Ongoing support available once the product is live — the same team, still reachable, still accountable.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FAQ                                                                */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28 bg-card/10 border-t border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <SectionEyebrow className="mb-6">FAQ</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Before you start building.</h2>
          </AnimatedSection>
          <div className="flex justify-center my-10 sm:my-12" aria-hidden="true">
            <span className="w-px h-10 sm:h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>
          <AnimatedSection delay={0.06}>
            <FAQAccordion items={saasDetailFAQs} idPrefix="saas-detail-faq" />
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
              <span className="block text-muted-foreground/50">You have the idea.</span>
              <span className="block text-foreground mt-2">Let's decide what it needs to become first.</span>
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
                <span className="relative">Start Your Product</span>
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

export default SaasDetailPage;
