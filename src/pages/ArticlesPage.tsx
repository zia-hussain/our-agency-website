import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import ArticleVisual from "../components/common/ArticleVisual";
import FAQAccordion from "../components/common/FAQAccordion";
import SectionEyebrow from "../components/common/SectionEyebrow";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { articles, categories } from "../data/articles.js";
import { articlesFAQs } from "../data/faqs/articles";

const ArticlesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleArticles, setVisibleArticles] = useState(6);

  const filteredArticles =
    activeFilter === "all"
      ? articles
      : articles.filter((article) => article.category === activeFilter);

  const displayedArticles = filteredArticles.slice(0, visibleArticles);
  const hasMore = visibleArticles < filteredArticles.length;

  const loadMore = () => {
    setVisibleArticles((prev) => Math.min(prev + 6, filteredArticles.length));
  };

  const handleFilterChange = (categoryId: string) => {
    setActiveFilter(categoryId);
    setVisibleArticles(6);
  };

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
      logo: {
        "@type": "ImageObject",
        url: "https://zumetrix.com/logo/Logo%20Icon.png",
      },
    },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      url: `https://zumetrix.com/articles/${article.slug}`,
      datePublished: article.publishedAt,
      author: article.author.split(" & ").map((authorName) => ({
        "@type": "Person",
        "@id": authorName === "Zia Hussain"
          ? "https://zumetrix.com/founders/zia-hussain#person"
          : "https://zumetrix.com/founders/omer-gillani#person",
        name: authorName,
      })),
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
            >
              <BookOpen size={16} className="mr-2" />
              Expert Insights & Guides
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              Software Development
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent pb-2 leading-[1.1]">
                Expert Articles
              </span>
            </h1>

            <div className="max-w-5xl mx-auto">
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light mb-6">
                Practical lessons from the team building software products,
                building SaaS MVPs, React/Node.js applications, AI automation,
                and scaling tech businesses globally.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Expert insights from <strong>Zia Hussain</strong> and{" "}
                <strong>Omer Gillani</strong>, founders of Zumetrix Labs. Our
                articles help developers and entrepreneurs master modern web
                technologies and build successful digital products.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-16 bg-card/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Explore by Category
              </h2>
              <p className="text-muted-foreground">
                Find articles tailored to your interests and expertise level
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFilterChange(category.id)}
                  className={`px-8 py-4 rounded-xl font-semibold shadow-lg ${
                    activeFilter === category.id
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-glow scale-105"
                      : "bg-card/60 backdrop-blur-xl text-muted-foreground border border-border hover:border-primary/30 hover:text-primary hover:bg-card/80"
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
            {displayedArticles.map((article, index) => (
              <AnimatedSection key={article.id} delay={index * 0.1}>
                <Link to={`/articles/${article.slug}`}>
                  <motion.article
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{
                      duration: 0.15,
                      ease: "easeOut",
                    }}
                    className="group bg-card/60 backdrop-blur-xl border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-2xl h-full flex flex-col transition-all duration-300"
                  >
                    {/* Featured Badge */}
                    {article.featured && (
                      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-semibold px-4 py-2 text-center">
                        Featured Article
                      </div>
                    )}

                    {/* Article Visual */}
                    <div className="relative overflow-hidden">
                      <ArticleVisual
                        title={article.title}
                        category={article.category}
                        variant="card"
                      />
                    </div>

                    {/* Article Content */}
                    <div className="p-8 flex-grow flex flex-col">
                      {/* Meta Information */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span className="font-medium">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              timeZone: "UTC",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      {/* Title - 2 lines max with ellipsis */}
                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-150 line-clamp-2 leading-tight">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[#DBDBDB] leading-relaxed mb-6 flex-grow line-clamp-3 font-light">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-primary font-semibold">
                          <span>Read Article</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <AnimatedSection className="text-center mt-16">
              <motion.button
                onClick={loadMore}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-card/60 backdrop-blur-xl text-foreground hover:text-primary px-10 py-5 rounded-xl font-semibold 
                         hover:bg-card/80 transition-all duration-300 
                         flex items-center gap-3 text-lg mx-auto border border-border hover:border-primary/30 shadow-lg hover:shadow-2xl"
              >
                Load More Articles
                <ArrowRight size={22} />
              </motion.button>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Ready to Build Your
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Next Project?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Get expert guidance from our founders and transform your business
              vision into a powerful digital solution.
            </p>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-10 py-5 rounded-xl font-semibold 
                         hover:shadow-glow transition-all duration-100
                         flex items-center gap-3 text-lg mx-auto shadow-lg"
              >
                Start Your Project
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section — same interaction language as Services/Home: eyebrow,   */}
      {/* two-tone sentence, vertical thread into the list, FAQAccordion. No   */}
      {/* bottom CTA — a real CTA section precedes it immediately above.       */}
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
    </PageTransition>
  );
};

export default ArticlesPage;
