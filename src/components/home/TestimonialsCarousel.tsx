import React from "react";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getFeaturedTestimonials, TestimonialEntry } from "../../data/testimonials";
import PlatformIcon from "../common/PlatformIcon";

const Stars: React.FC<{ rating?: number; size?: number; center?: boolean }> = ({
  rating,
  size = 12,
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

const BeforeAfterStat: React.FC<{ t: TestimonialEntry }> = ({ t }) => {
  const { before, after } = t.evidence ?? {};
  if (!before || !after) return null;

  return (
    <div className="flex items-center justify-center gap-5 sm:gap-8">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 mb-2">
          {before.who}
        </p>
        <div className="text-3xl sm:text-4xl font-bold tracking-tight tabular-nums text-foreground/45">
          {before.stat}
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 max-w-[9rem]">{before.label}</p>
      </div>

      <div className="flex flex-col items-center gap-1 pt-5">
        <span className="relative w-8 h-px bg-primary/30 overflow-hidden">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="absolute inset-0 origin-left bg-primary"
          />
        </span>
        <ArrowRight className="text-primary/60" size={18} />
      </div>

      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary/70 mb-2">
          {after.who}
        </p>
        <div className="text-3xl sm:text-4xl font-bold tracking-tight tabular-nums bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {after.stat}
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 max-w-[9rem]">{after.label}</p>
      </div>
    </div>
  );
};

const FactStat: React.FC<{ t: TestimonialEntry }> = ({ t }) => {
  const fact = t.evidence?.fact;
  if (!fact) return null;
  return (
    <div>
      <div className="text-xl sm:text-2xl font-bold tracking-tight tabular-nums bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        {fact.stat}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{fact.label}</p>
    </div>
  );
};

const TestimonialsCarousel: React.FC = () => {
  const featured = getFeaturedTestimonials();
  if (!featured.length) return null;

  const [flagship, ...rest] = featured;

  return (
    <section className="relative overflow-hidden bg-card/20 py-24 lg:py-28 border-y border-border/40">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8">
            Evidence
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            Founders keep trusting us with
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              the difficult parts
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Not testimonials — what happened when someone handed us
            something difficult.
          </p>
        </motion.div>

        {/* Flagship — one story given real room, contained like the rest of the site's spotlight moments */}
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
              className="relative text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-8"
            >
              Product Rescue
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="relative">
              <BeforeAfterStat t={flagship} />
            </motion.div>

            <motion.blockquote
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="relative mx-auto mt-10 max-w-2xl text-xl sm:text-2xl font-medium leading-[1.45] tracking-tight text-foreground"
            >
              "{flagship.quote}"
            </motion.blockquote>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              className="relative mt-8 flex flex-col items-center gap-3"
            >
              <Stars rating={flagship.rating} size={13} center />
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold text-foreground">{flagship.author}</span>
                <span className="text-muted-foreground">{flagship.role}</span>
              </div>
              <PlatformBadge t={flagship} center />
            </motion.div>
          </motion.article>
        )}

        {/* Supporting evidence — a card grid, matching the rest of the site */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {rest.map((t, index) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-6 lg:p-7 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-black/20"
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between gap-3 mb-1">
                <FactStat t={t} />
              </div>

              <blockquote className="mt-4 flex-grow text-base leading-[1.55] text-foreground/90">
                "{t.quote}"
              </blockquote>

              <div className="mt-6 flex-shrink-0 border-t border-border/50 pt-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className="text-sm font-semibold text-foreground">{t.author}</p>
                  <Stars rating={t.rating} size={11} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                  {t.projectSlug ? (
                    <Link
                      to={`/portfolio/${t.projectSlug}`}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:gap-1.5 transition-all duration-150 flex-shrink-0"
                    >
                      Case study
                      <ArrowUpRight size={11} />
                    </Link>
                  ) : (
                    <PlatformBadge t={t} />
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link
            to="/client-stories"
            className="group inline-flex items-center gap-2 text-foreground hover:text-primary font-medium px-8 py-4 bg-card/30 backdrop-blur-xl border border-border rounded-full hover:border-primary/30 hover:bg-card/50 transition-colors duration-150"
          >
            More client stories
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-150" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
