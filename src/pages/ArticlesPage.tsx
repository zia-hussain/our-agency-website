import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  Filter,
} from "lucide-react";
import { articles, categories } from "../data/articles.js";

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
      "Expert insights on software development, SaaS MVP building, AI automation, React/Node.js development from Zumetrix Labs founders Zia Hussain and Syed Omer Shah.",
    url: "https://zumetrix.com/articles",
    publisher: {
      "@type": "Organization",
      name: "Zumetrix Labs",
      logo: {
        "@type": "ImageObject",
        url: "https://zumetrix.com/logo.png",
      },
    },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      url: `https://zumetrix.com/articles/${article.slug}`,
      datePublished: article.publishedAt,
      author: {
        "@type": "Person",
        name: article.author,
      },
    })),
  };

  return (
    <PageTransition>
      <SEO
        title="Expert Software Development Articles | SaaS MVP, AI Automation, React/Node.js Insights | Zumetrix Labs"
        description="Read expert insights on software development, SaaS MVP building, AI automation, React/Node.js development, and mobile app development from Zumetrix Labs founders Zia Hussain and Syed Omer Shah. Learn from Pakistan's leading software development experts."
        keywords="software development blog, SaaS MVP guide, AI automation insights, React Node.js tutorials, mobile app development, Firebase guides, Zia Hussain articles, Syed Omer Shah blog, Pakistan software development, startup development guides, tech insights Pakistan"
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

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              Software Development
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent pb-2 leading-[1.1]">
                Expert Articles
              </span>
            </h1>

            <div className="max-w-5xl mx-auto">
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light mb-6">
                Expert insights on <strong>software development</strong>,{" "}
                <strong>SaaS MVP building</strong>,
                <strong> AI automation</strong>, and modern web technologies
                from <strong>Zumetrix Labs</strong> founders
                <strong> Zia Hussain</strong> and{" "}
                <strong>Syed Omer Shah</strong>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Learn from Pakistan's leading{" "}
                <strong>software development experts</strong> about
                React/Node.js development, Firebase integration, mobile app
                development, no-code automation, and building successful SaaS
                products. Our technical articles help developers and
                entrepreneurs stay ahead in the rapidly evolving tech landscape.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-8">
              <Filter size={20} className="text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Filter by Category
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFilterChange(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-250 ${
                    activeFilter === category.id
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-glow"
                      : "bg-card/50 backdrop-blur-xl text-muted-foreground border border-border hover:border-primary/30 hover:text-primary"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article, index) => (
              <AnimatedSection key={article.id} delay={index * 0.1}>
                <Link to={`/articles/${article.slug}`}>
                  <motion.article
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="group bg-card/50 backdrop-blur-xl border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-card-hover h-full flex flex-col transition-all duration-250"
                  >
                    {/* Featured Badge */}
                    {article.featured && (
                      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-medium px-3 py-1 text-center">
                        Featured Article
                      </div>
                    )}

                    {/* Article Image */}
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-card/80 backdrop-blur-xl text-foreground text-xs font-medium rounded-full border border-border">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      {/* Meta Information */}
                      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User size={12} />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-250 line-clamp-2 leading-tight">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all duration-250">
                        Read Article
                        <ArrowRight
                          size={14}
                          className="ml-1 group-hover:translate-x-1 transition-transform duration-250"
                        />
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="bg-card/50 backdrop-blur-xl text-foreground hover:text-primary px-8 py-4 rounded-lg font-medium 
                         hover:bg-card/70 transition-all duration-250 
                         flex items-center gap-3 text-lg mx-auto border border-border hover:border-primary/30"
              >
                Load More Articles
                <ArrowRight size={20} />
              </motion.button>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Ready to Build Your
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Next Project?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Let's discuss your project and create a solution that drives real
              business results.
            </p>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-lg font-medium 
                         hover:shadow-glow transition-all duration-250
                         flex items-center gap-3 text-lg mx-auto"
              >
                Start Your Project
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-250"
                />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default ArticlesPage;