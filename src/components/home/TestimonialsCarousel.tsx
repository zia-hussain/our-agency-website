import React from "react";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getFeaturedTestimonials, TestimonialEntry } from "../../data/testimonials";
import PlatformIcon from "../common/PlatformIcon";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

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

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const Avatar: React.FC<{ name: string; size?: "sm" | "md" }> = ({ name, size = "sm" }) => (
  <div
    className={`flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/25 to-primary/10 border border-primary/25 font-semibold text-primary ${
      size === "md" ? "w-11 h-11 text-sm" : "w-9 h-9 text-xs"
    }`}
  >
    {initialsOf(name)}
  </div>
);

const PlatformMark: React.FC<{ t: TestimonialEntry }> = ({ t }) => (
  <span className="flex items-center gap-1.5 text-muted-foreground/60">
    <PlatformIcon platform={t.platform} size={14} />
    <span className="text-xs">{t.platform}</span>
  </span>
);

const BeforeAfterStat: React.FC<{ t: TestimonialEntry; compact?: boolean }> = ({ t, compact }) => {
  const { before, after } = t.evidence ?? {};
  if (!before || !after) return null;
  const numCls = compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl";

  return (
    <div className={`flex items-center ${compact ? "justify-start gap-4" : "justify-center gap-6 sm:gap-10"}`}>
      <div className={compact ? "" : "text-center"}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/55 mb-2">
          {before.who}
        </p>
        <div className={`font-bold tracking-tight tabular-nums text-foreground/45 ${numCls}`}>{before.stat}</div>
      </div>

      <div className={`flex flex-col items-center gap-1.5 ${compact ? "pt-4" : "pt-5"}`}>
        <span className={`relative h-px bg-primary/30 overflow-hidden ${compact ? "w-5" : "w-8"}`}>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="absolute inset-0 origin-left bg-primary"
          />
        </span>
        <ArrowRight className="text-primary/60" size={compact ? 15 : 18} />
      </div>

      <div className={compact ? "" : "text-center"}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-2">
          {after.who}
        </p>
        <div className={`font-bold tracking-tight tabular-nums bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent ${numCls}`}>
          {after.stat}
        </div>
      </div>
    </div>
  );
};

const FactStat: React.FC<{ t: TestimonialEntry; large?: boolean }> = ({ t, large }) => {
  const fact = t.evidence?.fact;
  if (!fact) return null;
  return (
    <div className={`font-bold tracking-tight tabular-nums bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent ${large ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
      {fact.stat}
    </div>
  );
};

const EvidenceCard: React.FC<{ t: TestimonialEntry; large?: boolean; index: number }> = ({
  t,
  large,
  index,
}) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/60 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/[0.03] ${
      large ? "p-8 lg:p-9" : "p-7 lg:p-8"
    }`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(196,138,100,0.07),transparent_55%)]" />
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
      style={{ backgroundImage: GRAIN }}
    />
    <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div className="relative">
      {t.evidence?.before ? <BeforeAfterStat t={t} compact /> : <FactStat t={t} large={large} />}
    </div>

    <blockquote
      className={`relative mt-5 flex-grow leading-[1.6] text-foreground/90 ${large ? "text-lg" : "text-base"}`}
    >
      "{t.quote}"
    </blockquote>

    <div className="relative mt-7 flex-shrink-0 border-t border-border/50 pt-5">
      <div className="flex items-center gap-3">
        <Avatar name={t.author} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5">
            <p className="text-sm font-semibold text-foreground">{t.author}</p>
            <Stars rating={t.rating} size={11} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 mt-0.5">
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
              <PlatformMark t={t} />
            )}
          </div>
        </div>
      </div>
    </div>
  </motion.article>
);

const TestimonialsCarousel: React.FC = () => {
  const featured = getFeaturedTestimonials();
  if (!featured.length) return null;

  const [flagship, ...rest] = featured;
  const rows: TestimonialEntry[][] = [];
  for (let i = 0; i < rest.length; i += 2) rows.push(rest.slice(i, i + 2));

  return (
    <section className="relative overflow-hidden bg-card/20 py-24 lg:py-28 border-y border-border/40">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3.5 py-1.5 bg-card/40 backdrop-blur-xl border border-border/70 rounded-full text-xs font-medium uppercase tracking-[0.1em] text-primary/90 mb-7">
            Evidence
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-5 tracking-tight leading-[1.1]">
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
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
            className="relative mb-6 lg:mb-8 overflow-hidden rounded-3xl border border-primary/20 bg-background/60 p-10 sm:p-14 lg:p-16 backdrop-blur-xl text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/[0.04]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,138,100,0.10),transparent_45%)]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
              style={{ backgroundImage: GRAIN }}
            />

            <motion.p
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              className="relative text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-9"
            >
              Product Rescue
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="relative">
              <BeforeAfterStat t={flagship} />
            </motion.div>

            <motion.blockquote
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="relative mx-auto mt-11 max-w-2xl text-xl sm:text-2xl font-medium leading-[1.5] tracking-tight text-foreground"
            >
              "{flagship.quote}"
            </motion.blockquote>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              className="relative mt-9 flex flex-col items-center gap-3"
            >
              <Avatar name={flagship.author} size="md" />
              <Stars rating={flagship.rating} size={13} center />
              <p className="text-sm">
                <span className="font-semibold text-foreground">{flagship.author}</span>
                <span className="text-muted-foreground">, {flagship.role}</span>
              </p>
              <PlatformMark t={flagship} />
            </motion.div>
          </motion.article>
        )}

        {/* Supporting evidence — matched pairs, strongest stories first */}
        {rows.map((row, ri) => (
          <div
            key={ri}
            className={`grid lg:grid-cols-2 gap-5 lg:gap-6 items-start ${
              ri < rows.length - 1 ? "mb-5 lg:mb-6" : ""
            }`}
          >
            {row.map((t, ci) => (
              <EvidenceCard key={t.id} t={t} large index={ri * 2 + ci} />
            ))}
          </div>
        ))}

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
