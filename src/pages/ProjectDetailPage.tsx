import React from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionEyebrow from "../components/common/SectionEyebrow";
import ClosingGlow from "../components/common/ClosingGlow";
import RelatedReading from "../components/common/RelatedReading";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  ChevronRight,
  Check,
} from "lucide-react";
import { getProjectBySlug } from "../data/projects";
import TiltImage from "../components/portfolio/TiltImage";
import HeroEvidence from "../components/portfolio/HeroEvidence";
import ClientExperience from "../components/portfolio/ClientExperience";
import ReadingProgress from "../components/portfolio/ReadingProgress";
import KpiCard from "../components/portfolio/KpiCard";
import TestimonialFilm from "../components/common/TestimonialFilm";
import { TESTIMONIAL_FILMS } from "../data/testimonialFilms";
import { buildVideoObjectSchema } from "../utils/videoSchema";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const getServiceUrl = (serviceName: string, fallback = "/services/web-application-development") => {
  const normalized = serviceName.toLowerCase();

  if (normalized.includes("mobile")) {
    return "/services/mobile-app-development";
  }

  if (
    normalized.includes("automation") ||
    normalized.includes("airtable") ||
    normalized.includes("workflow") ||
    normalized.includes("no-code") ||
    normalized.includes("process")
  ) {
    return "/services/ai-automation-solutions";
  }

  if (
    normalized.includes("stabiliz") ||
    normalized.includes("rescue") ||
    normalized.includes("triage")
  ) {
    return "/services/product-rescue-stabilization";
  }

  if (
    normalized.includes("mvp") ||
    normalized.includes("saas") ||
    normalized.includes("product consultation") ||
    normalized.includes("rapid prototyping")
  ) {
    return "/services/saas-mvp-development";
  }

  return fallback;
};

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : null;

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
            <Link to="/portfolio" className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen">
              Back to Portfolio
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
              </span>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const pageUrl = `https://zumetrix.com/portfolio/${project.slug}`;
  // A dedicated 1200x630 PNG for link previews (the card/hero image can be an SVG, which X, LinkedIn and Facebook do not render).
  const shareSource = project.ogImage ?? project.image;
  const shareImage = shareSource.startsWith("http") ? shareSource : `https://zumetrix.com${shareSource}`;
  // heroEvidence already carries this evidence in the hero, so the KPI band is
  // skipped for those projects; `kpis` stays on the record for the portfolio
  // proof ticker and cards that read it.
  const kpis = project.heroEvidence ? [] : project.kpis ?? [];
  const testimonialFilm = project.testimonialFilmKey ? TESTIMONIAL_FILMS[project.testimonialFilmKey] : undefined;
  const metaFields = [
    project.client.name && { label: project.clientLabel || "Client", value: project.client.name },
    project.client.country && { label: "Location", value: project.client.country },
    project.duration && { label: "Duration", value: project.duration },
    project.team && { label: "Team", value: project.team },
  ].filter((f): f is { label: string; value: string } => Boolean(f));

  const serviceFallback = project.linkServicesToPrimary ? `/services/${project.primaryService}` : undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#case-study`,
        name: project.title,
        description: project.description,
        image: shareImage,
        url: pageUrl,
        creator: { "@id": "https://zumetrix.com/#organization" },
        ...(project.year ? { dateCreated: project.year } : {}),
        keywords: project.tags.join(", "),
        about: project.services.map((serviceName) => ({
          "@type": "Service",
          name: serviceName,
          url: `https://zumetrix.com${getServiceUrl(serviceName, serviceFallback)}`,
        })),
        // Points at the exact Service entity already declared on that
        // service's own detail page (same @id convention: {pageUrl}#service)
        // — a real cross-page link in the entity graph, not a guessed one.
        mentions: { "@id": `https://zumetrix.com/services/${project.primaryService}#service` },
        ...(project.client.name
          ? {
              client: {
                "@type": "Organization",
                name: project.client.name,
                ...(project.client.country ? { location: project.client.country } : {}),
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://zumetrix.com/" },
          { "@type": "ListItem", position: 2, name: "Software Development Case Studies", item: "https://zumetrix.com/portfolio" },
          { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
        ],
      },
      ...(testimonialFilm ? [buildVideoObjectSchema(testimonialFilm)] : []),
    ],
  };

  return (
    <PageTransition>
      <ReadingProgress />
      <SEO
        title={`${project.title.split("–")[0].trim()} Case Study | Zumetrix Labs`}
        description={project.description}
        keywords={`${project.tags.join(", ")}, case study, portfolio, ${project.client.country}`}
        image={shareImage}
        imageAlt={project.ogImageAlt}
        url={pageUrl}
        structuredData={structuredData}
        noIndex={!project.searchIndexable}
      />

      {/* ================================================================ */}
      {/* HERO                                                               */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background pt-32 sm:pt-40 pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_15%,rgba(196,138,100,0.09),transparent_38%),radial-gradient(circle_at_15%_85%,rgba(196,138,100,0.05),transparent_32%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-primary transition-colors duration-150">Home</Link>
              <ChevronRight size={16} />
              <Link to="/portfolio" className="hover:text-primary transition-colors duration-150">Portfolio</Link>
              <ChevronRight size={16} />
              <span className="text-foreground font-medium line-clamp-1">{project.title}</span>
            </nav>

            <Link to="/portfolio" className="group inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-card/25 pl-2 pr-5 py-2 text-sm font-semibold text-muted-foreground shadow-[0_12px_30px_-16px_rgba(0,0,0,0.6)] hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors duration-200 mb-10 btn-sheen">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-background/80 group-hover:bg-primary/10 transition-colors duration-200">
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              </span>
              Back to Portfolio
            </Link>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection mode="hero">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary/70 mb-5">
                <span>{project.category}</span>
                {project.client.country && (
                  <>
                    <span className="text-muted-foreground/40" aria-hidden="true">·</span>
                    <span className="text-muted-foreground normal-case tracking-normal">{project.client.country}</span>
                  </>
                )}
                {project.featured && (
                  <>
                    <span className="text-muted-foreground/40" aria-hidden="true">·</span>
                    <span className="text-primary normal-case tracking-normal">Featured</span>
                  </>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
                {project.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-9">
                {project.description}
              </p>

              {metaFields.length > 0 && (
                <div className="flex flex-wrap gap-x-9 gap-y-5 mb-9 pt-7 border-t border-border/40">
                  {metaFields.map((field) => (
                    <div key={field.label}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60 mb-1">
                        {field.label}
                      </p>
                      <p className="font-semibold text-foreground">{field.value}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen"
                  >
                    View Live Project
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                      <ExternalLink size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px] transition-transform duration-200" />
                    </span>
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/25 px-6 py-2.5 text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-200 btn-sheen"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection mode="hero" delay={0.1}>
              {project.heroEvidence ? (
                <HeroEvidence {...project.heroEvidence} />
              ) : (
                <TiltImage
                  src={project.image}
                  alt={project.title}
                  className={project.heroImageMobile ? "aspect-auto sm:aspect-[4/3]" : "aspect-[4/3]"}
                  fit={project.heroImageFit}
                  mobileSrc={project.heroImageMobile}
                />
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* THE SITUATION — before/after, weighted asymmetrically like the   */}
      {/* service pages' fork scene: the problem recedes, the build lands. */}
      {/* ================================================================ */}
      <section className="relative bg-card/10 border-y border-border/40 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <SectionEyebrow className="mb-6">The Situation</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              What they came to us with, and what we shipped.
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-10 sm:gap-14">
            <AnimatedSection delay={0.04} className="opacity-55">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground mb-3">Before</p>
              <p className="text-base text-muted-foreground leading-relaxed">{project.problem}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.08} className="sm:border-l sm:border-primary/20 sm:pl-14">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary/70 mb-3">
                {project.situationAfterLabel || "What We Built"}
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">{project.solution}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* WHAT CHANGED — numbered results, same register as the service    */}
      {/* pages' "This is for you if" list, not a bulleted glass card.      */}
      {/* ================================================================ */}
      <section className="bg-background py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionEyebrow className="mb-6">What Changed</SectionEyebrow>
          </AnimatedSection>
          <div className="divide-y divide-border/30">
            {project.results.map((result, i) => (
              <motion.div
                key={result}
                initial={{ opacity: 0.95 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="py-6 flex items-start gap-5"
              >
                <motion.span
                  initial={{ opacity: 0.95, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                  className="text-xs font-semibold text-primary/50 flex-shrink-0 mt-1.5"
                >
                  0{i + 1}
                </motion.span>
                <motion.p
                  initial={{ opacity: 0.95, x: -4 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.05 + 0.05 }}
                  className="text-lg sm:text-xl text-foreground/90 tracking-tight leading-snug"
                >
                  {result}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* THE NUMBERS — only when the project has real KPIs to show.       */}
      {/* ================================================================ */}
      {kpis.length > 0 && (
        <section className="relative bg-card/10 border-y border-border/40 py-20 sm:py-24 overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-14">
              <SectionEyebrow className="mb-6">The Numbers</SectionEyebrow>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Proof, not adjectives.</h2>
            </AnimatedSection>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
              {kpis.map((kpi, i) => (
                <AnimatedSection key={kpi.label} delay={i * 0.05} className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]">
                  <KpiCard value={kpi.value} label={kpi.label} description={kpi.description} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* BUILT WITH / DELIVERED — two-layer pill treatment, same          */}
      {/* register as the SaaS page's product/foundation layers.           */}
      {/* ================================================================ */}
      <section className="bg-background py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {project.clientExperience && <ClientExperience {...project.clientExperience} />}
          <div className={project.stack.length > 0 ? "grid sm:grid-cols-2 gap-12" : "max-w-3xl mx-auto text-center"}>
            {project.stack.length > 0 && (
              <AnimatedSection>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary/70 mb-5">Built With</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-border/50 bg-card/20 text-muted-foreground"
                    >
                      <Check size={11} strokeWidth={2.5} className="text-primary/60 flex-shrink-0" />
                      {tech}
                    </span>
                  ))}
                </div>
              </AnimatedSection>
            )}
            <AnimatedSection delay={0.06}>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground mb-5">What We Delivered</p>
              <div className={project.stack.length > 0 ? "flex flex-wrap gap-2" : "flex flex-wrap gap-2 justify-center"}>
                {project.services.map((service) => (
                  <Link
                    key={service}
                    to={getServiceUrl(service, serviceFallback)}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-150"
                  >
                    {service}
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TESTIMONIAL — full editorial weight, same voice as the           */}
      {/* portfolio spotlights and the service pages' pull-quotes.         */}
      {/* ================================================================ */}
      {project.testimonial && (
        <section className="relative overflow-hidden bg-card/10 border-y border-border/40 py-24 sm:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_18%,rgba(196,138,100,0.06),transparent_70%)]" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {project.testimonialLeadIn && (
              <AnimatedSection>
                <p className="text-lg text-muted-foreground mb-10">{project.testimonialLeadIn}</p>
              </AnimatedSection>
            )}
            <AnimatedSection>
              <blockquote>
                <p className="text-2xl sm:text-3xl text-foreground/90 leading-snug tracking-tight mb-6">
                  "{project.testimonial.quote}"
                </p>
                <footer className="text-sm text-muted-foreground">
                  {project.testimonial.author}, {project.testimonial.role}
                </footer>
              </blockquote>
            </AnimatedSection>
          </div>

          {testimonialFilm && (
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
              <AnimatedSection delay={0.06}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-6 text-center">
                  {testimonialFilm.name}, in their own words
                </p>
                <TestimonialFilm
                  src={testimonialFilm.src}
                  poster={testimonialFilm.poster}
                  captionsSrc={testimonialFilm.captionsSrc}
                  variant="proof"
                />
              </AnimatedSection>
            </div>
          )}
        </section>
      )}

      {/* ================================================================ */}
      {/* GALLERY — only when there's more than one real image.            */}
      {/* ================================================================ */}
      {project.gallery && project.gallery.length > 1 && (
        <section className="bg-background py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-14">
              <SectionEyebrow className="mb-6">Gallery</SectionEyebrow>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, i) => (
                <AnimatedSection key={image + i} delay={i * 0.05}>
                  <div className="rounded-xl border border-border/50 bg-gradient-to-b from-primary/[0.05] to-transparent p-1.5 shadow-[0_25px_50px_-28px_rgba(0,0,0,0.55)]">
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full aspect-[16/10] object-cover rounded-lg"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* RELATED READING — only when this case study has a real,          */}
      {/* curated connection into an article cluster.                      */}
      {/* ================================================================ */}
      {project.relatedReading && project.relatedReading.length > 0 && (
        <section className="pb-8 bg-background">
          <div className="px-4 sm:px-6 lg:px-8">
            <RelatedReading links={project.relatedReading} eyebrow={project.relatedReadingEyebrow} />
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* CLOSE — same richest-tier button + breathing glow as the         */}
      {/* service pages and the portfolio hub reserve for their final CTA. */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background py-32 sm:py-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_50%,rgba(196,138,100,0.07),transparent_70%)]" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-12">
              <span className="block text-muted-foreground/50">
                {project.closeHeadline?.muted || "You've seen what we built."}
              </span>
              <span className="block text-foreground mt-2">
                {project.closeHeadline?.foreground || "Let's talk about what you need."}
              </span>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="relative inline-block">
            <ClosingGlow />
            <Link to={`/contact?project=${project.slug}`}>
              <motion.button
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group relative bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-9 pr-7 sm:pl-11 sm:pr-9 py-4 sm:py-[1.35rem] rounded-full font-semibold text-base sm:text-xl tracking-[-0.01em]
                         shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_10px_-2px_rgba(0,0,0,0.35),0_16px_36px_-16px_rgba(196,138,100,0.4)]
                         hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_2px_10px_-2px_rgba(0,0,0,0.4),0_20px_42px_-16px_rgba(196,138,100,0.5)]
                         flex items-center gap-3 sm:gap-4 overflow-hidden transition-shadow duration-300 btn-sheen mx-auto"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.14] via-white/0 to-black/[0.06]" />
                <span className="relative">Start Your Project</span>
                <span className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </motion.button>
            </Link>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-8">
            <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150">
              View more projects
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default ProjectDetailPage;
