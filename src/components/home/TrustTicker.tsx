import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FACTS } from "../../config/facts";
import { getSiteData } from "../../data/site";
import { listedProjects } from "../../data/projects";

/**
 * The trust moment beneath the film.
 *
 * Production had a logo strip here and it did a real job: recognition,
 * scale, a change of pace. The logos were not cleared, so the job is done
 * instead with the thing that is true and ours — the range of businesses
 * we've shipped for, set large and in motion, under the best line the site
 * has ever had. A permitted logo re-enters the moving line automatically
 * (`companyLogosCarousel.logos[].permitted`).
 */
const CLIENTS: { slug: string; name: string; what: string; where?: string }[] = [
  { slug: "floating-stone-ranch-processor-intake-engine", name: "Floating Stone Ranch", what: "beef processing", where: "Canada" },
  { slug: "forlag-publishing-sales-inventory-dashboard", name: "Forlag", what: "book publishing", where: "Norway" },
  { slug: "fast-track-usa-app-rescue", name: "Fast Track USA", what: "app rescue" },
  { slug: "knipsr-event-media-saas", name: "Knipsr", what: "event media SaaS" },
  { slug: "first-north-peptides-website-ai-concierge", name: "First North Peptides", what: "life sciences", where: "Denmark" },
  { slug: "skill-x-swap-mvp", name: "Skill x Swap", what: "skill-sharing marketplace", where: "United Kingdom" },
  { slug: "liftly-operational-mvp-v1", name: "Liftly", what: "logistics booking" },
  { slug: "tomo-voice-ai-companion", name: "Tomo", what: "voice AI companion", where: "United States" },
  { slug: "hjelpna-handyman-marketplace", name: "HjelpNå", what: "home services marketplace", where: "Norway" },
  { slug: "learning-platform-saas-stabilization", name: "Learning Platform SaaS", what: "edtech, stabilised" },
  { slug: "pawspace-pet-services-marketplace", name: "PawSpace", what: "pet services marketplace" },
  { slug: "bondfire-event-booking-app", name: "Bondfire", what: "event booking", where: "India" },
  { slug: "ifyify-ai-personal-branding", name: "Ifyify", what: "AI personal branding", where: "United States" },
];

const TrustTicker: React.FC = () => {
  const { companyLogosCarousel } = getSiteData();

  const items = useMemo(() => {
    const listed = new Set(listedProjects.map((x) => x.slug));
    const out: { key: string; node: React.ReactNode }[] = CLIENTS.filter((c) => listed.has(c.slug)).map((c) => ({
      key: c.slug,
      node: (
        <Link to={`/portfolio/${c.slug}`} className="group flex items-baseline gap-3 whitespace-nowrap">
          <span className="text-2xl sm:text-[2rem] font-bold tracking-tight text-foreground/80 group-hover:text-foreground transition-colors duration-300">
            {c.name}
          </span>
          <span className="text-sm text-muted-foreground/70 group-hover:text-primary/80 transition-colors duration-300">
            {c.what}
            {c.where ? `, ${c.where}` : ""}
          </span>
        </Link>
      ),
    }));
    (companyLogosCarousel?.logos ?? [])
      .filter((l) => l.permitted)
      .forEach((l, i) =>
        out.splice(2 + i * 3, 0, {
          key: `logo-${l.name}`,
          node: <img src={l.imageUrl} alt={l.name} width="160" height="56" loading="lazy" decoding="async" className="h-10 w-auto object-contain opacity-80" />,
        }),
      );
    return out;
  }, [companyLogosCarousel?.logos]);

  const track = [...items, ...items];
  const c = FACTS.counts;

  return (
    <section id="trust" aria-label="Who we've built for" className="relative overflow-hidden bg-background pt-16 pb-20 sm:pt-20 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0.95, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28 }}
          className="max-w-3xl"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground">
            From beef plants
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">to book publishers.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl font-light">
            {c.projectsShipped} projects for {c.clients} clients on four continents. If your business doesn't fit a neat template, good — neither did theirs.
          </p>
        </motion.div>
      </div>

      <div className="relative mt-12 sm:mt-14">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="overflow-hidden py-2">
          <div className="flex items-baseline gap-12 sm:gap-16 w-max animate-marquee-slow will-change-transform hover:[animation-play-state:paused] motion-reduce:[animation:none]">
            {track.map((item, i) => (
              <span key={`${item.key}-${i}`} aria-hidden={i >= items.length ? true : undefined} className="flex items-baseline">
                {item.node}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Between them, our clients have written {c.writtenReviews} reviews on Fiverr, Upwork, Trustpilot, Clutch and Google — platforms we can't edit.{" "}
          <Link to="/client-stories" className="text-foreground underline decoration-border/70 underline-offset-4 hover:text-primary hover:decoration-primary transition-colors">
            Read them
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default TrustTicker;
