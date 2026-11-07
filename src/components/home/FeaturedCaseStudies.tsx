import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, MapPin, Target } from "lucide-react";
import TiltFrame from "../portfolio/TiltFrame";
import { motion } from "framer-motion";
import { getProjectBySlug } from "../../data/projects";

const FeaturedCaseStudies: React.FC = () => {
  // Lead story: the case with the strongest public record — the founder on
  // film, a Trustpilot review corroborated on Google, a separate Upwork
  // contract, and permission. Liftly and Knipsr are still proofStatus:"draft"
  // (privacy review pending), so Liftly no longer carries the lead and
  // Knipsr appears as a supporting card with its public reviews.
  const flagship = getProjectBySlug("fast-track-usa-app-rescue");
  const buildCase = getProjectBySlug("knipsr-event-media-saas");
  const automateCase = getProjectBySlug(
    "floating-stone-ranch-processor-intake-engine"
  );

  if (!flagship) return null;

  // Authored for this one case; everything below traces to the case record
  // (problem, solution, results, evidence, testimonial in data/projects.ts).
  const headline = "Two years with another team. Live three weeks after the handover.";
  const situation =
    "Josh's app had been in development for around two years with a previous team without reaching a working, reliable launch. The technical causes aren't part of the public record — Josh's account describes the outcome, not the implementation.";
  const problem =
    "Zumetrix took over the existing, in-progress project and carried it to launch in three weeks — in Josh's words, with no bugs and no issues. We don't dress that up with a technical narrative we can't verify.";
  const decision = {
    title: "Why we tell it this way",
    description:
      "This case documents an outcome, not a method. What's verified is on the record: Josh on film, a Trustpilot review corroborated on Google, and a separate five-star Upwork contract. One client's three weeks is not a promise about yours.",
  };
  const ctaAngle = flagship.testimonial?.quote;
  const built = flagship.results ?? [];
  const evidence = flagship.evidence ?? [];
  const proofNote = flagship.caseStudy?.proofNotes?.[0];

  const supportingCases = [
    buildCase && {
      project: buildCase,
      heading: "Knipsr",
      eyebrow: "Built From Zero, Launch-Ready",
      purpose:
        "Proof we can take an idea to a production SaaS — background processing, retries and media delivery built to hold up on a real event day.",
    },
    automateCase && {
      project: automateCase,
      heading: "Floating Stone Ranch",
      eyebrow: "Manual Operations, Automated",
      purpose:
        "Proof we can replace real, error-prone manual workflows with a system the team actually trusts.",
    },
  ].filter(Boolean) as {
    project: NonNullable<typeof buildCase>;
    heading: string;
    eyebrow: string;
    purpose: string;
  }[];

  return (
    <section id="portfolio" className="py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0.95, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0.95, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28 }}
            className="inline-flex items-center px-3.5 py-1.5 bg-card/40 backdrop-blur-xl border border-border/70 rounded-full text-xs font-medium uppercase tracking-[0.1em] text-primary/90 mb-7"
          >
            <Target size={14} className="mr-2" />
            Real Work
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-5 tracking-tight leading-[1.1]">
            Work we can show
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              with the receipts
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-[1.6] font-light">
            One story told in full, with the record beside it. Then one case for each of the other two ways we work.
          </p>
        </motion.div>

        {/* FLAGSHIP — an editorial story, not a card. No box: it gets its own register. */}
        <motion.div
          initial={{ opacity: 0.95, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28 }}
          id="flagship-case"
          className="mb-20 lg:mb-24"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-10 bg-primary/50 flex-shrink-0" />
            <span className="text-xs font-semibold text-primary bg-primary/[0.08] border border-primary/20 px-3 py-1 rounded-full tracking-wide">
              {flagship.category}
            </span>
            <span className="text-xs font-medium text-muted-foreground/80">
              {flagship.clientLabel ?? "Product"}: {flagship.client.name}
            </span>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Narrative column */}
            <div className="lg:col-span-3">
              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-10 leading-[1.15] tracking-tight max-w-xl">
                {headline}
              </h3>

              <div className="space-y-8 max-w-xl">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2">
                    Where it started
                  </p>
                  <p className="text-muted-foreground leading-[1.75]">
                    {situation}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2">
                    What changed
                  </p>
                  <p className="text-muted-foreground leading-[1.75]">
                    {problem}
                  </p>
                </div>

                {decision && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2">
                      {decision.title}
                    </p>
                    <p className="text-muted-foreground leading-[1.75]">
                      {decision.description}
                    </p>
                  </div>
                )}
              </div>

              {ctaAngle && (
                <blockquote className="mt-10 border-l-2 border-primary/40 pl-6 max-w-xl">
                  <p className="text-xl sm:text-2xl text-foreground/90 font-medium leading-[1.5]">"{ctaAngle}"</p>
                  {flagship.testimonial && (
                    <footer className="mt-3 text-sm text-muted-foreground">
                      {flagship.testimonial.author}
                      {flagship.testimonial.role ? <span className="text-muted-foreground/60"> · {flagship.testimonial.role}</span> : null}
                      <span className="text-muted-foreground/60"> · on film and on Trustpilot</span>
                    </footer>
                  )}
                </blockquote>
              )}

              <Link
                to={`/portfolio/${flagship.slug}`}
                className="inline-flex items-center gap-2 text-primary font-medium mt-10 hover:gap-3 transition-all duration-150"
              >
                Read the full case study
                <ArrowUpRight size={18} />
              </Link>
            </div>

            {/* Built vs. deferred column — a structured spec sheet, contrasting the free-flowing story */}
            <div className="lg:col-span-2">
              <TiltFrame
                variant="card"
                maxTilt={5}
                frameClassName="relative rounded-2xl border border-primary/15 bg-background mb-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/[0.03]"
                innerClassName="relative overflow-hidden rounded-2xl"
              >
                <picture>
                  {flagship.heroImageMobile && <source media="(max-width: 640px)" srcSet={flagship.heroImageMobile} />}
                  <img
                    src={flagship.image}
                    alt={flagship.ogImageAlt ?? `${flagship.client.name} overview`}
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain"
                  />
                </picture>
              </TiltFrame>

              <div className="rounded-2xl border border-border/70 overflow-hidden">
                <div className="bg-card/40 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                    What happened
                  </p>
                  <ul className="space-y-2.5">
                    {built.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {evidence.length > 0 && (
                  <div className="bg-background/60 p-6 border-t border-border/50">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/60 mb-4">
                      On the record
                    </p>
                    <ul className="space-y-3">
                      {evidence.map((item) => (
                        <li key={item.label} className="text-sm">
                          <span className="block text-foreground/85 font-medium">{item.label}</span>
                          <span className="block text-muted-foreground/70 leading-snug">{item.detail}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="#client-films" className="inline-flex items-center gap-1.5 text-xs text-primary/80 hover:text-primary mt-4 transition-colors">
                      Watch Josh tell it <ArrowRight size={11} />
                    </a>
                  </div>
                )}
              </div>

              {proofNote && (
                <p className="text-xs text-muted-foreground/70 mt-4 leading-relaxed">
                  {proofNote}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* SUPPORTING PROOF — deliberately lighter, buyer-state matched */}
        {supportingCases.length > 0 && (
          <div id="supporting-proof" className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {supportingCases.map(({ project, heading, eyebrow, purpose }, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0.95, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.15, delay: index * 0.08 }}
                className="group"
              >
                <Link to={`/portfolio/${project.slug}`}>
                  <div className="bg-card/15 border border-border/60 rounded-2xl p-6 lg:p-7 h-full flex flex-col transition-all duration-300 hover:border-primary/25 hover:bg-card/30">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/85">
                        {eyebrow}
                      </span>
                      {project.client.country && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                          <MapPin size={10} />
                          {project.client.country}
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-150">
                      {heading}
                    </h4>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {purpose}
                    </p>

                    <div className="bg-background/40 border border-border/60 rounded-xl p-4 mb-5">
                      {project.kpis && project.kpis.length > 0 ? (
                        <div className="flex divide-x divide-border/60">
                          {project.kpis.slice(0, 2).map((kpi) => (
                            <div key={kpi.label} className="flex-1 first:pl-0 px-4 first:pr-4">
                              <div className="text-2xl font-bold text-primary leading-none">
                                {kpi.value}
                              </div>
                              <div className="text-[11px] text-muted-foreground mt-1.5">
                                {kpi.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {project.results.slice(0, 2).map((r) => (
                            <li key={r} className="text-xs text-muted-foreground/90 flex items-start gap-2">
                              <Check size={13} className="text-primary/70 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-2">{r}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-primary font-medium mt-auto group-hover:gap-3 transition-all duration-150">
                      View this case study
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0.95, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="btn-sheen group text-foreground hover:text-primary font-medium px-8 py-4
                       transition-colors duration-150 text-lg flex items-center gap-3 mx-auto
                       bg-card/30 backdrop-blur-xl border border-border rounded-full hover:border-primary/30 hover:bg-card/50"
            >
              View All Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-150" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;
