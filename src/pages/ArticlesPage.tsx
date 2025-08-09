import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { articles } from "../data/articles.js";

const ArticlesPage: React.FC = () => {
  const featuredArticles = articles.filter((article) => article.featured);
  const regularArticles = articles.filter((article) => !article.featured);

  return (
    <PageTransition>
      <SEO
        title="Articles & Insights | Zumetrix Labs - Expert Software Development Blog"
        description="Read expert insights on software development, SaaS MVP building, AI automation, React/Node.js development, and mobile app development from Zumetrix Labs founders Zia Hussain and Syed Omer Shah."
        keywords="software development blog, SaaS MVP guide, AI automation insights, React Node.js tutorials, mobile app development, Firebase guides, Zia Hussain articles, Syed Omer Shah blog"
        url="https://zumetrix.com/articles"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
            >
              <BookOpen size={16} className="mr-2" />
              Expert Insights
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              Articles &
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Insights
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

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Featured Articles
              </h2>
              <p className="text-muted-foreground">
                Our most popular and comprehensive guides
              </p>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <AnimatedSection key={article.id} delay={index * 0.1}>
                  <Link to={`/articles/${article.slug}`}>
                    <motion.article
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
                    >
                      <div className="relative overflow-hidden aspect-[16/9]">
                        <motion.img
                          src={article.image}
                          alt={article.title}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-xl">
                            Featured
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="p-8">
                        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User size={14} />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>
                              {new Date(
                                article.publishedAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>{article.readTime}</span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {article.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all duration-300">
                          Read Article
                          <ArrowRight
                            size={16}
                            className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              All Articles
            </h2>
            <p className="text-muted-foreground">
              Comprehensive guides and tutorials on modern software development
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <AnimatedSection key={article.id} delay={index * 0.1}>
                <Link to={`/articles/${article.slug}`}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 h-full flex flex-col"
                  >
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-card/80 backdrop-blur-xl text-foreground text-xs font-medium rounded-full border border-border">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User size={12} />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all duration-300">
                        Read More
                        <ArrowRight
                          size={14}
                          className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
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
                         hover:shadow-glow transition-all duration-300 
                         flex items-center gap-3 text-lg mx-auto"
              >
                Start Your Project
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
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
