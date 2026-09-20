import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import FAQAccordion from "../components/common/FAQAccordion";
import SectionEyebrow from "../components/common/SectionEyebrow";
import ClosingGlow from "../components/common/ClosingGlow";
import ProjectSpotlight from "../components/portfolio/ProjectSpotlight";
import AnimatedStat from "../components/portfolio/AnimatedStat";
import ProofMarquee from "../components/portfolio/ProofMarquee";
import ClientProofFilm from "../components/home/ClientProofFilm";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { portfolioFAQs } from "../data/faqs/portfolio";
import { TESTIMONIAL_FILMS } from "../data/testimonialFilms";
import { buildVideoObjectSchema } from "../utils/videoSchema";
import { ArrowRight, Eye, Code, Users, Award, Sparkles } from "lucide-react";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const stats = [
  { icon: Code, number: "80+", label: "Projects completed" },
  { icon: Users, number: "50+", label: "Happy clients" },
  { icon: Sparkles, number: "Founder-led", label: "Every single project" },
  { icon: Award, number: "100%", label: "Upwork job success" },
];

const PortfolioPage: React.FC = () => {
  const featuredProjects = projects.filter((project) => project.homepageFeatured);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://zumetrix.com/portfolio#webpage",
        name: "Software Development Case Studies",
        description: "Explore our portfolio of successful software development projects including SaaS applications, mobile apps, enterprise solutions, and startup MVPs for international clients.",
        url: "https://zumetrix.com/portfolio",
        isPartOf: { "@id": "https://zumetrix.com/#website" },
        about: { "@id": "https://zumetrix.com/#organization" },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: featuredProjects.map((project, index) => ({
            "@type": "CreativeWork",
            position: index + 1,
            name: project.title,
            description: project.description,
            image: project.image,
            url: `https://zumetrix.com/portfolio/${project.slug}`,
            creator: { "@id": "https://zumetrix.com/#organization" },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://zumetrix.com/" },
          { "@type": "ListItem", position: 2, name: "Software Development Case Studies", item: "https://zumetrix.com/portfolio" },
        ],
      },
      ...Object.values(TESTIMONIAL_FILMS).map(buildVideoObjectSchema),
    ],
  };

  return (
    <PageTransition>
      <SEO
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Software Development Case Studies | Zumetrix Labs"
        description="Explore Zumetrix Labs case studies across SaaS MVPs, business dashboards, mobile apps, workflow automation, and custom software."
        keywords="software development portfolio, SaaS MVP projects, React development projects, mobile app portfolio, enterprise software solutions, startup MVP case studies, international software projects, web application portfolio, Zia Hussain projects, Omer Gillani portfolio"
        url="https://zumetrix.com/portfolio"
        image="https://zumetrix.com/og/page-portfolio.png"
        structuredData={structuredData}
      />

      {/* ================================================================ */}
      {/* HERO — same badge/H1/gradient-line language as the Services hero,  */}
      {/* copy grounded in the real archive instead of a superlative claim.  */}
      {/* ================================================================ */}
      <section className="pt-40 pb-24 bg-background relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(196,138,100,0.1),transparent_38%),radial-gradient(circle_at_15%_80%,rgba(196,138,100,0.06),transparent_32%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection mode="hero">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-primary mb-10">
              <Eye size={16} />
              Software Development Case Studies
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.15] sm:leading-[1.05] mb-8">
              <span className="block text-foreground">Every project here</span>
              <span className="block bg-gradient-to-r from-primary via-primary/95 to-primary/85 bg-clip-text text-transparent">
                actually shipped.
              </span>
            </h1>

            <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              No concepts, no mockups — real builds for real clients, each one led
              end-to-end by the founders who wrote the code.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* STATS — numbers count up on scroll-in instead of just appearing;  */}
      {/* each tile lifts and lights up on hover instead of sitting flat.   */}
      {/* ================================================================ */}
      <section className="py-16 bg-card/10 border-y border-border/40 relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(196,138,100,0.05),transparent_70%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={stat.label}
                icon={stat.icon}
                value={stat.number}
                label={stat.label}
                delay={index * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PROOF MARQUEE — every real KPI across the full 20-project         */}
      {/* archive, scrolling continuously. Not decorative: it's the         */}
      {/* answer to "this is only three" before anyone has to ask it.       */}
      {/* ================================================================ */}
      <ProofMarquee />

      {/* ================================================================ */}
      {/* FEATURED PROJECTS — three signature scenes, not a card grid.      */}
      {/* Each earns its own space; real proof numbers, full-weight quote,  */}
      {/* alternating composition so three in a row read as curated.       */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28 bg-background relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-24 sm:mb-28">
            <SectionEyebrow className="mb-6">Featured Work</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.25]">
              <span className="text-muted-foreground/50">A few we'd show first.</span>{" "}
              <span className="text-foreground">Every one strong enough to stand alone.</span>
            </h2>
          </AnimatedSection>

          {featuredProjects.map((project, index) => (
            <React.Fragment key={project.id}>
              <ProjectSpotlight project={project} index={index} />
              {index < featuredProjects.length - 1 && (
                <div className="relative flex justify-center my-16 sm:my-20" aria-hidden="true">
                  <span className="w-px h-14 sm:h-20 bg-gradient-to-b from-border via-primary/50 to-border" />
                </div>
              )}
            </React.Fragment>
          ))}

          <AnimatedSection className="text-center mt-28 sm:mt-32">
            <p className="text-sm text-muted-foreground mb-6">
              Twenty builds in the full archive — different industries, same standard.
            </p>
            <Link to="/portfolio/all" className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen">
              See All Projects
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
              </span>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CLIENTS, ON CAMERA — the written case studies above, then the     */}
      {/* same clients saying it themselves. Shared with Home, contextual   */}
      {/* copy so the two pages don't read as literal duplicates.           */}
      {/* ================================================================ */}
      <ClientProofFilm
        eyebrow="Clients, On Camera"
        headingLead="You've read the case studies."
        headingMain="Here's the same clients, unscripted."
        exitLine="Every one of these is also a full case study above."
      />

      {/* FAQ — unchanged; already the current design system's pattern. */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_18%,rgba(196,138,100,0.06),transparent_70%)]"
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <SectionEyebrow className="mb-6">FAQ</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.25]">
              <span className="text-muted-foreground/50">Before you look through the work,</span>{" "}
              <span className="text-foreground">here's what people usually ask.</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Learn more about our projects and client work.
            </p>
          </AnimatedSection>

          <div className="flex justify-center my-10 sm:my-12" aria-hidden="true">
            <span className="w-px h-10 sm:h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>

          <AnimatedSection delay={0.06}>
            <FAQAccordion items={portfolioFAQs} idPrefix="portfolio-faq" />
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSE — same richest-tier button + breathing glow the service       */}
      {/* pages reserve for their final CTA, not the mid-page button style.   */}
      <section className="relative overflow-hidden bg-background py-32 sm:py-44">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_50%,rgba(196,138,100,0.07),transparent_70%)]" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-12">
              <span className="block text-muted-foreground/50">Yours could be</span>
              <span className="block text-foreground mt-2">the next one on this page.</span>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="relative inline-block">
            <ClosingGlow />
            <Link to="/contact">
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
        </div>
      </section>
    </PageTransition>
  );
};

export default PortfolioPage;
