import React from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen } from "lucide-react";
import { articles } from "../data/articles.js";

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/articles">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-lg font-medium"
              >
                Back to Articles
              </motion.button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole,
      "worksFor": {
        "@type": "Organization",
        "name": "Zumetrix Labs"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zumetrix Labs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zumetrix.com/logo.png"
      }
    },
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://zumetrix.com/articles/${article.slug}`
    },
    "keywords": article.tags.join(", "),
    "articleSection": article.category,
    "wordCount": article.content.split(' ').length
  };

  return (
    <PageTransition>
      <SEO
        title={article.seo.title}
        description={article.seo.description}
        keywords={article.seo.keywords}
        image={article.image}
        url={`https://zumetrix.com/articles/${article.slug}`}
        type="article"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <Link to="/articles">
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-200 mb-8"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Articles
              </motion.div>
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{article.author}</div>
                    <div className="text-sm text-muted-foreground">{article.authorRole}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Share2 size={16} />
                Share
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-lg aspect-[16/9]">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div 
              className="prose prose-xl prose-invert max-w-none
                         prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
                         prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight
                         prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:leading-tight
                         prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                         prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                         prose-strong:text-foreground prose-strong:font-semibold
                         prose-code:text-primary prose-code:bg-card/50 prose-code:px-3 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-medium
                         prose-pre:bg-card/50 prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-6
                         prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-card/30 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8
                         prose-ul:text-muted-foreground prose-ul:leading-relaxed prose-ul:text-lg
                         prose-li:text-muted-foreground prose-li:mb-2 prose-li:leading-relaxed
                         prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Related Articles</h2>
            <p className="text-muted-foreground">More insights from our experts</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles
              .filter(a => a.id !== article.id && a.category === article.category)
              .slice(0, 3)
              .map((relatedArticle, index) => (
                <AnimatedSection key={relatedArticle.id} delay={index * 0.1}>
                  <Link to={`/articles/${relatedArticle.slug}`}>
                    <motion.article
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
                    >
                      <div className="relative overflow-hidden aspect-[16/10]">
                        <motion.img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {relatedArticle.title}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                          {relatedArticle.excerpt}
                        </p>

                        <div className="flex items-center text-primary font-medium text-sm">
                          <BookOpen size={14} className="mr-2" />
                          Read Article
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
              Ready to Start Your
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Next Project?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Let's discuss your project and create a solution that drives real business results.
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
                <ArrowLeft
                  size={20}
                  className="rotate-180 group-hover:translate-x-1 transition-transform duration-300"
                />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default ArticleDetailPage;