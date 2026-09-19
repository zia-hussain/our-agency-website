import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import FAQAccordion from "../components/common/FAQAccordion";
import SectionEyebrow from "../components/common/SectionEyebrow";
import ClosingGlow from "../components/common/ClosingGlow";
import ArticleCard from "../components/articles/ArticleCard";
import ArticleSpotlight from "../components/articles/ArticleSpotlight";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { articles, categories } from "../data/articles.js";
import { articlesFAQs } from "../data/faqs/articles";
import { getAuthorIdentity } from "../data/authors";
import { DECISION_LABEL, FEATURED_ORDER, INDEX_ORDER, pickInOrder, sortByOrder } from "../data/articleHierarchy";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const ArticlesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  // Every article is linked from the hub's static HTML; the list is ordered by
  // editorial hierarchy (see articleHierarchy.ts), not by data-file order.
  const [visibleCount, setVisibleCount] = useState(articles.length);

  const featuredArticles = pickInOrder(articles, FEATURED_ORDER);
  const orderedArticles = sortByOrder(articles, INDEX_ORDER);

  const filteredArticles =
    activeFilter === "all" ? orderedArticles : orderedArticles.filter((a) => a.category === activeFilter);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleFilterChange = (categoryId: string) => {
    setActiveFilter(categoryId);
    setVisibleCount(articles.length);
  };

  const categoryCounts = categories.map((c) => ({
    ...c,
    count: c.id === "all" ? articles.length : articles.filter((a) => a.category === c.id).length,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Zumetrix Labs Blog - Expert Software Development Insights",
    description:
      "Expert insights on software development, SaaS MVP building, AI automation, React/Node.js development from Zumetrix Labs founders Zia Hussain and Omer Gillani.",
    url: "https://zumetrix.com/articles",
    publisher: {
      "@type": "Organization",
      "@id": "https://zumetrix.com/#organization",
      name: "Zumetrix Labs",
      logo: { "@type": "ImageObject", url: "https://zumetrix.com/logo/Logo%20Icon.png" },
    },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      url: `https://zumetrix.com/articles/${article.slug}`,
      image: article.ogImage || article.image,
      datePublished: article.publishedAt,
      author: article.author.split(" & ").map((authorName: string) => {
        const identity = getAuthorIdentity(authorName);
        return identity
          ? { "@type": "Person", "@id": identity.personId, name: identity.displayName }
          : { "@type": "Person", name: authorName };
      }),
    })),
  };

  return (
    <PageTransition>
      <SEO
        title="SaaS, Automation & Software Articles | Zumetrix Labs"
        description="Practical articles from Zumetrix Labs on SaaS MVPs, AI automation, React and Node.js, mobile apps, product strategy, and software delivery."
        keywords="software development blog, SaaS MVP guide, AI automation insights, React Node.js tutorials, mobile app development, Firebase guides, Zia Hussain articles, Omer Gillani blog, Pakistan software development, startup development guides, tech insights Pakistan"
        url="https://zumetrix.com/articles"
        structuredData={structuredData}
      />

      {/* ================================================================ */}
      {/* HERO — same badge/H1/gradient-line language as Portfolio/Services. */}
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
              <BookOpen size={16} />
              Expert Insights &amp; Guides
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.15] sm:leading-[1.05] mb-8">
              <span className="block text-foreground">Field notes from</span>
              <span className="block bg-gradient-to-r from-primary via-primary/95 to-primary/85 bg-clip-text text-transparent">
                actual delivery work.
              </span>
            </h1>

            <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Written by Zia Hussain and Omer Gillani from real product work — not
              theory, and not written to rank for a keyword.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED ARTICLES — signature scenes, same treatment as the      */}
      {/* Portfolio hub's featured case studies.                            */}
      {/* ================================================================ */}
      {featuredArticles.length > 0 && (
        <section className="py-24 sm:py-28 bg-background relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <AnimatedSection className="text-center mb-24 sm:mb-28">
              <SectionEyebrow className="mb-6">Featured</SectionEyebrow>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.25]">
                <span className="text-muted-foreground/50">What to build, what to fix, what to automate.</span>{" "}
                <span className="text-foreground">Start with the thinking.</span>
              </h2>
            </AnimatedSection>

            {featuredArticles.map((article, index) => (
              <React.Fragment key={article.id}>
                <ArticleSpotlight article={article} index={index} decision={DECISION_LABEL[article.slug]} />
                {index < featuredArticles.length - 1 && (
                  <div className="relative flex justify-center my-16 sm:my-20" aria-hidden="true">
                    <span className="w-px h-14 sm:h-20 bg-gradient-to-b from-border via-primary/50 to-border" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* FILTER — quiet segmented row, count folded into the label.        */}
      {/* ================================================================ */}
      <section className="pb-12 bg-background border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-wrap gap-2">
              {categoryCounts.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFilterChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 border ${
                    activeFilter === category.id
                      ? "bg-primary/10 text-primary border-primary/40"
                      : "text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
                  }`}
                >
                  {category.label}
                  <span className={activeFilter === category.id ? "text-primary/60 ml-1.5" : "text-muted-foreground/50 ml-1.5"}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* ARTICLE GRID                                                       */}
      {/* ================================================================ */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            {displayedArticles.map((article, index) => (
              <AnimatedSection key={article.id} delay={index * 0.04}>
                <ArticleCard article={article} />
              </AnimatedSection>
            ))}
          </div>

          {hasMore && (
            <AnimatedSection className="text-center mt-16">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredArticles.length))}
                className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen"
              >
                Load More Articles
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </button>
            </AnimatedSection>
          )}
        </div>
      </section>

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
              <span className="text-muted-foreground/50">Before you start reading,</span>{" "}
              <span className="text-foreground">here's what people usually ask.</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Common questions about our expert insights and development guides.
            </p>
          </AnimatedSection>

          <div className="flex justify-center my-10 sm:my-12" aria-hidden="true">
            <span className="w-px h-10 sm:h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>

          <AnimatedSection delay={0.06}>
            <FAQAccordion items={articlesFAQs} idPrefix="articles-faq" />
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSE */}
      <section className="relative overflow-hidden bg-background py-32 sm:py-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_50%,rgba(196,138,100,0.07),transparent_70%)]" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-12">
              <span className="block text-muted-foreground/50">Read enough?</span>
              <span className="block text-foreground mt-2">Let's talk about your build.</span>
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

export default ArticlesPage;
