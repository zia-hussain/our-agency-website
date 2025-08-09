import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  BookOpen,
  ChevronRight,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { articles } from "../data/articles.js";

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");

  // Get related articles (same category, excluding current)
  const relatedArticles = articles
    .filter((a) => a.id !== article?.id && a.category === article?.category)
    .slice(0, 3);

  // Get next/previous articles
  const currentIndex = articles.findIndex((a) => a.id === article?.id);
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  useEffect(() => {
    // Extract headings for TOC
    const headings = document.querySelectorAll("h2, h3");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.textContent || "");
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [article]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareOnTwitter = () => {
    const text = `${article?.title} by ${article?.author} @zumetrixlabs`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, "_blank");
  };

  const shareOnWhatsApp = () => {
    const text = `${article?.title} - ${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  if (!article) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist.
            </p>
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
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: {
      "@type": "Person",
      name: article.author,
      jobTitle: article.authorRole,
      worksFor: {
        "@type": "Organization",
        name: "Zumetrix Labs",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Zumetrix Labs",
      logo: {
        "@type": "ImageObject",
        url: "https://zumetrix.com/logo.png",
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zumetrix.com/articles/${article.slug}`,
    },
    keywords: article.tags.join(", "),
    articleSection: article.category,
    wordCount: article.content.split(" ").length,
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

      {/* Breadcrumbs */}
      <section className="pt-32 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight size={16} />
              <Link
                to="/articles"
                className="hover:text-primary transition-colors"
              >
                Articles
              </Link>
              <ChevronRight size={16} />
              <span className="text-foreground">{article.title}</span>
            </nav>

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
          </AnimatedSection>
        </div>
      </section>

      {/* Article Hero */}
      <section className="pb-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            {/* Tags */}
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

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-light">
              {article.excerpt}
            </p>

            {/* Meta & Share */}
            <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-6">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {article.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {article.authorRole}
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground mr-2">
                  Share:
                </span>
                <motion.button
                  onClick={shareOnTwitter}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-card/50 backdrop-blur-xl border border-border rounded-lg hover:border-primary/30 transition-colors"
                  title="Share on Twitter"
                >
                  <MessageCircle
                    size={16}
                    className="text-muted-foreground hover:text-primary"
                  />
                </motion.button>
                <motion.button
                  onClick={shareOnLinkedIn}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-card/50 backdrop-blur-xl border border-border rounded-lg hover:border-primary/30 transition-colors"
                  title="Share on LinkedIn"
                >
                  <Share2
                    size={16}
                    className="text-muted-foreground hover:text-primary"
                  />
                </motion.button>
                <motion.button
                  onClick={shareOnWhatsApp}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-card/50 backdrop-blur-xl border border-border rounded-lg hover:border-primary/30 transition-colors"
                  title="Share on WhatsApp"
                >
                  <MessageCircle
                    size={16}
                    className="text-muted-foreground hover:text-primary"
                  />
                </motion.button>
                <motion.button
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-card/50 backdrop-blur-xl border border-border rounded-lg hover:border-primary/30 transition-colors"
                  title="Copy link"
                >
                  {copied ? (
                    <Check size={16} className="text-primary" />
                  ) : (
                    <Copy
                      size={16}
                      className="text-muted-foreground hover:text-primary"
                    />
                  )}
                </motion.button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-xl aspect-[16/9] shadow-2xl">
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

      {/* Article Content with Sticky TOC */}
      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sticky TOC - Desktop Only */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen size={16} />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {/* This would be dynamically generated from article headings */}
                    <a
                      href="#section1"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Introduction
                    </a>
                    <a
                      href="#section2"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Getting Started
                    </a>
                    <a
                      href="#section3"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Best Practices
                    </a>
                    <a
                      href="#section4"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Conclusion
                    </a>
                  </nav>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <article
                  className="prose prose-lg dark:prose-invert max-w-none article-content
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
          </div>
        </div>
      </section>

      {/* Navigation & Related Articles */}
      <section className="py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Next/Previous Navigation */}
          {(prevArticle || nextArticle) && (
            <AnimatedSection className="mb-16">
              <div className="grid md:grid-cols-2 gap-6">
                {prevArticle && (
                  <Link to={`/articles/${prevArticle.slug}`}>
                    <motion.div
                      whileHover={{ x: -4 }}
                      className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <ArrowLeft size={16} />
                        Previous Article
                      </div>
                      <h3 className="font-semibold text-foreground line-clamp-2">
                        {prevArticle.title}
                      </h3>
                    </motion.div>
                  </Link>
                )}
                {nextArticle && (
                  <Link to={`/articles/${nextArticle.slug}`}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-200 text-right"
                    >
                      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                        Next Article
                        <ArrowRight size={16} />
                      </div>
                      <h3 className="font-semibold text-foreground line-clamp-2">
                        {nextArticle.title}
                      </h3>
                    </motion.div>
                  </Link>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Related Articles
              </h2>
              <p className="text-muted-foreground text-center mb-12">
                More insights from our experts
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle, index) => (
                  <AnimatedSection key={relatedArticle.id} delay={index * 0.1}>
                    <Link to={`/articles/${relatedArticle.slug}`}>
                      <motion.article
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ duration: 0.25 }}
                        className="group bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:shadow-card-hover transition-all duration-250"
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
                          <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-250 line-clamp-2">
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
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Ready to Start Your
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Next Project?
                </span>
              </h2>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-light">
                Get a free 30-minute consultation to discuss your project
                requirements and see how we can help bring your vision to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-lg font-medium 
                             hover:shadow-glow transition-all duration-300 
                             flex items-center gap-3 text-lg"
                  >
                    Free Consultation
                    <ExternalLink
                      size={20}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </motion.button>
                </Link>

                <motion.button
                  onClick={() =>
                    window.open(
                      "https://calendly.com/zumetrix-labs/consultation",
                      "_blank"
                    )
                  }
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="group bg-card/50 backdrop-blur-xl text-foreground hover:text-primary px-8 py-4 rounded-lg font-medium 
                           hover:bg-card/70 transition-all duration-300 
                           flex items-center gap-3 text-lg border border-border hover:border-primary/30"
                >
                  Schedule Call
                  <Calendar size={20} />
                </motion.button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default ArticleDetailPage;
