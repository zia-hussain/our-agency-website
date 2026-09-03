import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Mail, Star } from "lucide-react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import PlatformIcon from "../components/common/PlatformIcon";
import {
  ProofCategory,
  TestimonialEntry,
  CATEGORY_LABELS,
  getFeaturedTestimonials,
  getTestimonialLibrary,
} from "../data/testimonials";

const Stars: React.FC<{ rating?: number; size?: number; center?: boolean }> = ({
  rating,
  size = 11,
  center,
}) => {
  if (!rating) return null;
  return (
    <div className={`flex items-center gap-0.5 text-primary ${center ? "justify-center" : ""}`}>
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={size} className="fill-current" />
      ))}
    </div>
  );
};

const PlatformBadge: React.FC<{ t: TestimonialEntry; center?: boolean }> = ({ t, center }) => (
  <div className={`flex items-center gap-1.5 text-muted-foreground/70 ${center ? "justify-center" : ""}`}>
    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-card/60 border border-border/70">
      <PlatformIcon platform={t.platform} size={12} />
    </span>
    <span className="text-xs">{t.platform}</span>
    {t.corroboratedOn?.length ? (
      <span className="flex items-center gap-1 text-xs">
        <span className="text-muted-foreground/40">· verified on</span>
        {t.corroboratedOn.map((p) => (
          <span
            key={p}
            className="flex items-center justify-center w-5 h-5 rounded-full bg-card/60 border border-border/70 ml-0.5"
          >
            <PlatformIcon platform={p as TestimonialEntry["platform"]} size={12} />
          </span>
        ))}
      </span>
    ) : null}
  </div>
);

const BeforeAfterStat: React.FC<{ t: TestimonialEntry; compact?: boolean }> = ({ t, compact }) => {
  const { before, after } = t.evidence ?? {};
  if (!before || !after) return null;
  const numCls = compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl";

  return (
    <div className={`flex items-center ${compact ? "justify-start" : "justify-center"} gap-4 sm:gap-6`}>
      <div className={compact ? "" : "text-center"}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 mb-1.5">
          {before.who}
        </p>
        <div className={`font-bold tracking-tight tabular-nums text-foreground/45 ${numCls}`}>{before.stat}</div>
      </div>
      <div className="flex flex-col items-center gap-1 pt-4">
        <span className="relative w-6 h-px bg-primary/30 overflow-hidden">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="absolute inset-0 origin-left bg-primary"
          />
        </span>
        <ArrowRight className="text-primary/60" size={compact ? 14 : 18} />
      </div>
      <div className={compact ? "" : "text-center"}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/70 mb-1.5">{after.who}</p>
        <div className={`font-bold tracking-tight tabular-nums bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent ${numCls}`}>
          {after.stat}
        </div>
      </div>
    </div>
  );
};

const FactStat: React.FC<{ t: TestimonialEntry; size?: "lg" | "md" }> = ({ t, size = "md" }) => {
  const fact = t.evidence?.fact;
  if (!fact) return null;
  const cls = size === "lg" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl";
  return (
    <div>
      <div className={`font-bold tracking-tight tabular-nums bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent ${cls}`}>
        {fact.stat}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{fact.label}</p>
    </div>
  );
};

const Byline: React.FC<{ t: TestimonialEntry; center?: boolean }> = ({ t, center }) => (
  <div className={`flex flex-col gap-1.5 ${center ? "items-center" : ""}`}>
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${center ? "justify-center" : ""}`}>
      <span className="text-sm font-semibold text-foreground">{t.author}</span>
      <span className="text-sm text-muted-foreground">{t.role}</span>
      <Stars rating={t.rating} />
      {t.projectSlug && (
        <Link
          to={`/portfolio/${t.projectSlug}`}
          className="inline-flex items-center gap-1 text-sm text-primary hover:gap-1.5 transition-all duration-150"
        >
          Case study
          <ArrowUpRight size={12} />
        </Link>
      )}
    </div>
    {!t.projectSlug && <PlatformBadge t={t} center={center} />}
  </div>
);

const FILTERS: { id: ProofCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "build", label: "Build" },
  { id: "rescue", label: "Rescue" },
  { id: "automation", label: "Automation" },
  { id: "technical", label: "Technical" },
  { id: "longterm", label: "Long-Term" },
];

const ClientStoriesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProofCategory | "all">("all");
  const featured = getFeaturedTestimonials();
  const library = getTestimonialLibrary();

  const [flagship, tierB1, tierB2, ...tierC] = featured;

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? library
        : library.filter((t) => t.category.includes(activeFilter)),
    [activeFilter, library]
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Client Stories | Zumetrix Labs",
    url: "https://zumetrix.com/client-stories",
    description:
      "What it's actually like to hand Zumetrix Labs something difficult — real client evidence.",
  };

  return (
    <PageTransition>
      <SEO
        title="Client Stories | Zumetrix Labs"
        description="What it's actually like to hand Zumetrix Labs something difficult — real evidence from the founders and teams who trusted us with it."
        url="https://zumetrix.com/client-stories"
        structuredData={structuredData}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_25%,rgba(196,138,100,0.10),transparent_32%),radial-gradient(circle_at_10%_75%,rgba(196,138,100,0.06),transparent_28%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <AnimatedSection>
            <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8">
              Client Stories
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
              What it's actually like
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                to hand us something hard
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              Every engagement leaves a record — what was at stake, what we
              had to solve, what changed, and what they said about it
              afterward.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured stories */}
      <section className="py-20 lg:py-24 bg-card/20 border-y border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
              Featured Stories
            </h2>
          </AnimatedSection>

          {/* Flagship — contained, centered */}
          {flagship && (
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
              }}
              className="relative mb-6 lg:mb-8 overflow-hidden rounded-3xl border border-primary/20 bg-background/60 p-8 sm:p-10 lg:p-14 backdrop-blur-xl text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/[0.04]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,138,100,0.10),transparent_45%)]" />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />

              <motion.p
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                className="relative text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-7"
              >
                Product Rescue
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="relative">
                <BeforeAfterStat t={flagship} />
              </motion.div>
              <motion.p
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="relative mx-auto mt-6 max-w-xl text-sm text-muted-foreground leading-relaxed"
              >
                A previous development team had the app for two years without
                getting it reliably running. Zia took it over, and it was in
                production, working end to end, within three weeks.
              </motion.p>
              <motion.blockquote
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="relative mx-auto mt-8 max-w-2xl text-xl sm:text-2xl font-medium leading-[1.45] tracking-tight text-foreground"
              >
                "{flagship.quote}"
              </motion.blockquote>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                className="relative mt-8"
              >
                <Byline t={flagship} center />
              </motion.div>
            </motion.article>
          )}

          {/* Tier B — two substantial stories, side by side cards */}
          {(tierB1 || tierB2) && (
            <div className="grid lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
              {[tierB1, tierB2].filter(Boolean).map((t, idx) => (
                <motion.article
                  key={t!.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-7 lg:p-8 backdrop-blur-xl transition-colors duration-300 hover:border-primary/30"
                >
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5">
                    {CATEGORY_LABELS[t!.category[0]]}
                  </p>
                  {t!.evidence?.before ? <BeforeAfterStat t={t!} compact /> : <FactStat t={t!} size="lg" />}
                  <blockquote className="mt-5 text-base text-foreground/90 leading-[1.6]">
                    "{t!.quote}"
                  </blockquote>
                  <div className="mt-5">
                    <Byline t={t!} />
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Tier C — compact supporting trio */}
          {tierC.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tierC.map((t, idx) => (
                <motion.article
                  key={t.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/40 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-primary/30"
                >
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {t.evidence?.before ? <BeforeAfterStat t={t} compact /> : <FactStat t={t} />}
                  <blockquote className="mt-4 text-sm text-foreground/90 leading-[1.6]">
                    "{t.quote}"
                  </blockquote>
                  <div className="mt-4">
                    <Byline t={t} />
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Fuller record — filterable archive */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
              And the Fuller Record
            </h2>
          </AnimatedSection>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-12 border-b border-border pb-4">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`relative pb-3 text-sm font-medium transition-colors duration-150 ${
                  activeFilter === filter.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter.label}
                {activeFilter === filter.id && (
                  <motion.span
                    layoutId="proof-filter-underline"
                    className="absolute left-0 right-0 -bottom-[17px] h-[2px] bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((t, index) => (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/20 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-primary/30"
              >
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
                    {CATEGORY_LABELS[t.category[0]]}
                  </span>
                  {t.repeatClient && (
                    <span className="text-[11px] text-muted-foreground">· Repeat client</span>
                  )}
                </div>
                <blockquote className="text-sm leading-[1.6] text-foreground/90">
                  "{t.quote}"
                </blockquote>
                <div className="mt-4">
                  <Byline t={t} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — matches the homepage FinalCTA pattern */}
      <section className="py-28 lg:py-36 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-10"
            >
              Ready to Start?
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1] px-4">
              Have something
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mt-2"
              >
                difficult to hand off?
              </motion.span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 lg:mb-14 leading-[1.6] font-light px-4">
              Book a 30-minute call. We'll ask questions, tell you honestly
              whether we're the right fit, and go from there.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center px-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold
                           hover:shadow-glow transition-all duration-150
                           flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg shadow-lg w-full sm:w-auto justify-center"
                >
                  <Calendar size={20} />
                  Book a Strategy Call
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-150" />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="group bg-card/50 backdrop-blur-xl text-muted-foreground hover:text-primary px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold
                           hover:bg-card/80 transition-all duration-150
                           flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg border border-border hover:border-primary/30 w-full sm:w-auto justify-center"
                >
                  <Mail size={20} />
                  Send Project Brief
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ClientStoriesPage;
