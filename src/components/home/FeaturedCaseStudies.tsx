import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { getProjectBySlug } from "../../data/projects";
import PlatformIcon from "../common/PlatformIcon";
import CoverImage from "../common/CoverImage";
import { listingImageForProject } from "../../data/covers";

/**
 * One case per door. The flagship is the best-evidenced story the company
 * has (Fast Track: the founder on film, a Trustpilot review corroborated on
 * Google, written permission) and it is told as Josh's experience, not as a
 * promise. The two supporting cases keep the page from reading as a
 * rescue-only studio: one built from zero, one automated.
 *
 * Everything shown here is read from the case record — nothing is restated
 * by hand, so a correction in data/projects.ts reaches the homepage.
 */
const FeaturedCaseStudies: React.FC = () => {
  const flagship = getProjectBySlug("fast-track-usa-app-rescue");
  const buildCase = getProjectBySlug("knipsr-event-media-saas");
  const automateCase = getProjectBySlug("floating-stone-ranch-processor-intake-engine");

  if (!flagship) return null;

  const supporting = [
    buildCase && {
      project: buildCase,
      door: "BUILD",
      eyebrow: "Built from the ground up",
      line: "A product taken from first build to launch-ready SaaS — background processing, retries, media streaming, and a stress test against real event-day failure modes before launch.",
    },
    automateCase && {
      project: automateCase,
      door: "AUTOMATE",
      eyebrow: "Manual operation, now a system",
      line: "Carcass intake, boxing and shipping moved from paper and spreadsheets into one traceable system with automated status transitions. Eight months on, still a client.",
    },
  ].filter(Boolean) as { project: NonNullable<typeof buildCase>; door: string; eyebrow: string; line: string }[];

  return (
    <section id="portfolio" className="py-24 sm:py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0.95, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10 lg:mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05]">
            Work we can show in full.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground lg:max-w-sm lg:text-right leading-relaxed">
            The founder on camera, his review where we can't edit it. Then one case for each of the other two situations.
          </p>
        </motion.div>

        {/* Flagship — Fast Track */}
        <motion.article
          initial={{ opacity: 0.95, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/[0.07] via-card/20 to-transparent p-6 sm:p-10 lg:p-12 ring-1 ring-inset ring-white/[0.02] shadow-[0_40px_100px_-50px_rgba(0,0,0,0.7)] mb-6"
        >
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-primary/80">FIX</span>
                <span className="text-muted-foreground/40" aria-hidden="true">·</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">{flagship.category}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-foreground leading-[1.15] mb-5">
                Two years with another team.
                <span className="block text-muted-foreground/60">Live three weeks after the handover.</span>
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-7 max-w-xl">Josh's app had been in development for around two years with a previous team and had never reliably launched. He handed it to us. Three weeks later it was live.</p>

              {flagship.testimonial && (
                <figure className="border-l border-primary/40 pl-5 mb-7 max-w-xl">
                  <blockquote className="text-[17px] leading-snug text-foreground/90 italic">“{flagship.testimonial.quote}”</blockquote>
                  <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/80">{flagship.testimonial.author}</span>
                    {flagship.testimonial.role && <span>· {flagship.testimonial.role}</span>}
                    <span className="inline-flex items-center gap-1.5 ml-1">
                      <PlatformIcon platform="Trustpilot" size={11} /> Trustpilot · corroborated on Google
                    </span>
                  </figcaption>
                </figure>
              )}

              <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-xl mb-8">
                Josh's account, corroborated by his written reviews. We weren't there for the first two years, and one client's three weeks is not a promise about yours.
              </p>

              <Link
                to={`/portfolio/${flagship.slug}`}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Read the full Fast Track case study
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
              <a href="#client-films" className="lg:hidden ml-5 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                Watch Josh tell it <ArrowRight size={12} />
              </a>
            </div>

            <div className="hidden lg:block lg:sticky lg:top-28">
              {/* The evidence diagram, not the film: the film plays once, in
                  the clients' own section below. Here the job is the record. */}
              <figure className="rounded-2xl border border-border/50 bg-[#0F0E0D] p-3 sm:p-4">
                <picture>
                  <source media="(max-width: 640px)" srcSet="/project_images/fast-track-recovery-timeline-mobile.svg" />
                  <img
                    src="/project_images/fast-track-recovery-timeline.svg"
                    alt="Timeline of the Fast Track USA takeover: roughly two years with a previous team, then three weeks from handover to launch"
                    width="1200"
                    height="800"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                  />
                </picture>
                <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground/70">
                  <span>Timeline as reported by the client.</span>
                  <a href="#client-films" className="inline-flex items-center gap-1 text-primary/80 hover:text-primary transition-colors">
                    Watch Josh tell it <ArrowRight size={11} />
                  </a>
                </figcaption>
              </figure>
            </div>
          </div>
        </motion.article>

        {/* Supporting — one BUILD, one AUTOMATE */}
        <div className="grid md:grid-cols-2 gap-6">
          {supporting.map(({ project, door, eyebrow, line }, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0.95, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.06 * (i + 1) }}
              className="group rounded-2xl border border-border/60 bg-card/20 hover:border-primary/30 hover:bg-card/35 transition-all duration-300 p-7 sm:p-8 flex flex-col ring-1 ring-inset ring-white/[0.02]"
            >
              <div className="rounded-xl overflow-hidden border border-border/40 mb-6 -mx-1">
                <CoverImage cover={listingImageForProject(project)} sizes="(min-width: 768px) 40vw, 90vw" className="aspect-[16/9] object-cover group-hover:scale-[1.02] transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-primary/80">{door}</span>
                <span className="text-muted-foreground/40" aria-hidden="true">·</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">{eyebrow}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-[1.2] mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{line}</p>
              {project.testimonial && (
                <p className="hidden sm:block text-sm italic text-foreground/80 leading-snug border-l border-primary/30 pl-4 mb-6">
                  “{project.testimonial.quote.length > 170 ? project.testimonial.quote.slice(0, 167).replace(/\s+\S*$/, "") + "…" : project.testimonial.quote}”
                  <span className="not-italic block mt-2 text-xs text-muted-foreground">— {project.testimonial.author}{project.testimonial.role ? `, ${project.testimonial.role}` : ""}</span>
                </p>
              )}
              <Link to={`/portfolio/${project.slug}`} className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                View this case study
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0.95 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/25 pl-6 pr-2 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200 btn-sheen"
          >
            All case studies
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-background/80 group-hover:bg-primary/10 transition-colors duration-200">
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;
