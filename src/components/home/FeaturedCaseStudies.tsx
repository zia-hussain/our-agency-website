import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Minus, MapPin, Target } from "lucide-react";
import { motion } from "framer-motion";
import { getProjectBySlug } from "../../data/projects";

const FeaturedCaseStudies: React.FC = () => {
  const flagship = getProjectBySlug("liftly-operational-mvp-v1");
  const fixCase = getProjectBySlug("learning-platform-saas-stabilization");
  const automateCase = getProjectBySlug(
    "floating-stone-ranch-processor-intake-engine"
  );

  if (!flagship) return null;

  const situation =
    flagship.caseStudy?.situation ??
    "A founder came to Zumetrix with a broader product vision than the first release could carry.";
  const problem = flagship.caseStudy?.problem ?? flagship.problem;
  const built = flagship.caseStudy?.built ?? [];
  const decision = flagship.caseStudy?.decisions?.[0];
  const ctaAngle = flagship.caseStudy?.ctaAngle;
  const proofNote = flagship.caseStudy?.proofNotes?.[0];

  const deferred = [
    "Service minimums & distance bands",
    "Labor, urgency & specialty-item pricing",
    "Margin protection & admin overrides",
  ];

  const supportingCases = [
    fixCase && {
      project: fixCase,
      heading: "Learning Platform SaaS",
      eyebrow: "Existing Product, Stabilized",
      purpose:
        "Proof we can walk into someone else's half-finished product and tell them, honestly, what's actually wrong with it.",
    },
    automateCase && {
      project: automateCase,
      heading: "Floating Stone Ranch",
      eyebrow: "Manual Operations, Automated",
      purpose:
        "Proof we can replace real, error-prone manual workflows with a system the team actually trusts.",
    },
  ].filter(Boolean) as {
    project: NonNullable<typeof fixCase>;
    heading: string;
    eyebrow: string;
    purpose: string;
  }[];

  return (
    <section id="portfolio" className="py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            <Target size={16} className="mr-2" />
            Real Work
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            When The Vision Was
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Bigger Than The First Release
            </span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.6] font-light">
            Here's exactly what we did about it.
          </p>
        </motion.div>

        {/* FLAGSHIP — an editorial story, not a card. No box: it gets its own register. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="liftly-flagship"
          className="mb-20 lg:mb-24"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-10 bg-primary/40 flex-shrink-0" />
            <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              {flagship.category}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {flagship.clientLabel ?? "Product"}: {flagship.client.name}
            </span>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Narrative column */}
            <div className="lg:col-span-3">
              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-10 leading-[1.15] tracking-tight max-w-xl">
                {flagship.client.name} had a bigger vision than its first
                release could carry.
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
                    The trap
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
                <blockquote className="mt-10 border-l-2 border-primary/40 pl-6 text-xl sm:text-2xl text-foreground/90 font-medium leading-[1.5] max-w-xl">
                  "{ctaAngle}"
                </blockquote>
              )}

              <Link
                to={`/portfolio/${flagship.slug}`}
                className="inline-flex items-center gap-2 text-primary font-medium mt-10 hover:gap-3 transition-all duration-150"
              >
                Read the full {flagship.client.name} case study
                <ArrowUpRight size={18} />
              </Link>
            </div>

            {/* Built vs. deferred column — a structured spec sheet, contrasting the free-flowing story */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden border border-border bg-background mb-6">
                <img
                  src={flagship.image}
                  alt={`${flagship.client.name} system overview`}
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="bg-card/40 border border-border rounded-2xl p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground mb-4">
                  Shipped in V1
                </p>
                <ul className="space-y-2.5 mb-6">
                  {built.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground mb-4">
                  Deliberately deferred to V2
                </p>
                <ul className="space-y-2.5">
                  {deferred.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground/70">
                      <Minus size={16} className="text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground/60 mt-4 italic">
                  Planned and designed. Not built. Not shipped.
                </p>
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.15, delay: index * 0.08 }}
                className="group"
              >
                <Link to={`/portfolio/${project.slug}`}>
                  <div className="bg-card/20 border border-border/70 rounded-2xl p-6 lg:p-7 h-full flex flex-col transition-all duration-150 hover:border-primary/30 hover:bg-card/40">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group text-foreground hover:text-primary font-medium px-8 py-4
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
