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
  ChevronRight,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  User,
  Twitter,
  Linkedin,
  Hash,
  Eye,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { articles } from "../data/articles.js";

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [tableOfContents, setTableOfContents] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);

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
    if (!article) return;

    // Extract headings for TOC and set up intersection observer
    const headings = document.querySelectorAll(
      ".article-content h2, .article-content h3"
    );

    // Build table of contents
    const toc: Array<{ id: string; text: string; level: number }> = [];
    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      toc.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
      });
    });

    setTableOfContents(toc);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    // Reading progress
    const handleScroll = () => {
      const article = document.querySelector(".article-content");
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const progress = Math.min(
        Math.max(
          (scrollTop - articleTop + windowHeight * 0.2) / articleHeight,
          0
        ),
        1
      );
      setReadingProgress(progress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [article]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
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

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/30">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary/80 shadow-glow"
          style={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Breadcrumbs */}
      <section className="pt-32 pb-8 bg-background ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
              <Link
                to="/"
                className="hover:text-primary transition-colors duration-100"
              >
                Home
              </Link>
              <ChevronRight size={16} />
              <Link
                to="/articles"
                className="hover:text-primary transition-colors duration-100"
              >
                Articles
              </Link>
              <ChevronRight size={16} />
              <span className="text-foreground font-medium line-clamp-1">
                {article.title}
              </span>
            </nav>

            <Link to="/articles">
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.1 }}
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-100 mb-8 group"
              >
                <ArrowLeft
                  size={16}
                  className="mr-2 group-hover:-translate-x-0.5 transition-transform duration-100"
                />
                Back to Articles
              </motion.div>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Hero */}
      <section className="pb-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                {article.category}
              </span>
              {article.featured && (
                <span className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-sm font-semibold">
                  Featured Article
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 font-light max-w-4xl">
              {article.excerpt}
            </p>

            {/* Meta & Share */}
            <div className="flex items-center justify-between flex-wrap gap-6 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-6">
                {/* Author */}
                <div className="flex items-center gap-4">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.1 }}
                    src={article.authorImage}
                    alt={article.author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-border"
                  />
                  <div>
                    <div className="font-semibold text-foreground text-lg">
                      {article.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {article.authorRole}
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
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
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="p-3 bg-card/50 backdrop-blur-xl border border-border rounded-lg hover:border-primary/30 transition-all duration-100 group"
                  title="Share on Twitter"
                >
                  <Twitter
                    size={16}
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-100"
                  />
                </motion.button>
                <motion.button
                  onClick={shareOnLinkedIn}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="p-3 bg-card/50 backdrop-blur-xl border border-border rounded-lg hover:border-primary/30 transition-all duration-100 group"
                  title="Share on LinkedIn"
                >
                  <Linkedin
                    size={16}
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-100"
                  />
                </motion.button>
                <motion.button
                  onClick={shareOnWhatsApp}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="p-3 bg-card/50 backdrop-blur-xl border border-border rounded-lg hover:border-primary/30 transition-all duration-100 group"
                  title="Share on WhatsApp"
                >
                  <MessageCircle
                    size={16}
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-100"
                  />
                </motion.button>
                <motion.button
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="p-3 bg-card/50 backdrop-blur-xl border border-border rounded-lg hover:border-primary/30 transition-all duration-100 group"
                  title="Copy link"
                >
                  {copied ? (
                    <Check size={16} className="text-primary" />
                  ) : (
                    <Copy
                      size={16}
                      className="text-muted-foreground group-hover:text-primary transition-colors duration-100"
                    />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.1 }}
                  className="text-sm px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-100 cursor-pointer"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-2xl aspect-[16/9] shadow-2xl border border-border">
              <motion.img
                initial={{ scale: 1.02 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content with Modern Sidebar */}
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
      <section className="py-24 bg-card/20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Next/Previous Navigation */}
          {(prevArticle || nextArticle) && (
            <AnimatedSection className="mb-20">
              <div className="grid md:grid-cols-2 gap-8">
                {prevArticle && (
                  <Link to={`/articles/${prevArticle.slug}`}>
                    <motion.div
                      whileHover={{ x: -4, scale: 1.01 }}
                      transition={{ duration: 0.1 }}
                      className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-8 hover:border-primary/30 hover:shadow-2xl transition-all duration-100 group h-full"
                    >
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        <ArrowLeft
                          size={16}
                          className="group-hover:-translate-x-1 transition-transform duration-100"
                        />
                        <span className="font-medium">Previous Article</span>
                      </div>
                      <h3 className="font-bold text-foreground text-xl line-clamp-2 group-hover:text-primary transition-colors duration-100">
                        {prevArticle.title}
                      </h3>
                      <p className="text-muted-foreground mt-3 line-clamp-2 text-sm">
                        {prevArticle.excerpt}
                      </p>
                    </motion.div>
                  </Link>
                )}
                {nextArticle && (
                  <Link to={`/articles/${nextArticle.slug}`}>
                    <motion.div
                      whileHover={{ x: 4, scale: 1.01 }}
                      transition={{ duration: 0.1 }}
                      className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-8 hover:border-primary/30 hover:shadow-2xl transition-all duration-100 text-right group h-full"
                    >
                      <div className="flex items-center justify-end gap-3 text-sm text-muted-foreground mb-4">
                        <span className="font-medium">Next Article</span>
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform duration-100"
                        />
                      </div>
                      <h3 className="font-bold text-foreground text-xl line-clamp-2 group-hover:text-primary transition-colors duration-100">
                        {nextArticle.title}
                      </h3>
                      <p className="text-muted-foreground mt-3 line-clamp-2 text-sm">
                        {nextArticle.excerpt}
                      </p>
                    </motion.div>
                  </Link>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Related
                  <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Articles
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground font-light">
                  More expert insights from our team
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {relatedArticles.map((relatedArticle, index) => (
                  <AnimatedSection key={relatedArticle.id} delay={index * 0.05}>
                    <Link to={`/articles/${relatedArticle.slug}`}>
                      <motion.article
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="group bg-card/60 backdrop-blur-xl border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-2xl transition-all duration-100 h-full"
                      >
                        <div className="relative overflow-hidden aspect-[16/10]">
                          <motion.img
                            src={relatedArticle.image}
                            alt={relatedArticle.title}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-100" />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-card/80 backdrop-blur-xl text-foreground text-xs font-medium rounded-full border border-border">
                              {relatedArticle.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-8">
                          <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-100 line-clamp-2 leading-tight">
                            {relatedArticle.title}
                          </h3>

                          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                            {relatedArticle.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User size={12} />
                                <span>{relatedArticle.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={12} />
                                <span>{relatedArticle.readTime}</span>
                              </div>
                            </div>

                            <div className="flex items-center text-primary font-medium text-sm transition-all duration-100">
                              <span>Read More</span>
                              <ArrowRight
                                size={14}
                                className="group-hover:translate-x-0.5 transition-transform duration-100"
                              />
                            </div>
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
            <div className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border border-border rounded-2xl p-16 max-w-5xl mx-auto shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Eye size={24} className="text-primary-foreground" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
                Ready to Transform Your
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Business Vision?
                </span>
              </h2>

              <p className="text-xl text-muted-foreground mb-12 leading-relaxed font-light max-w-3xl mx-auto">
                Get a free 30-minute strategy consultation with our founders.
                We'll discuss your project requirements, provide expert
                insights, and create a roadmap to bring your vision to life.
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
                      import.meta.env.VITE_CALENDLY_URL ||
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

              <div className="mt-12 pt-8 border-t border-border/30">
                <div className="mx-auto inline-block rounded-full bg-muted/20 px-6 py-2">
                  <p className="text-center text-base tracking-wide text-muted-foreground">
                    No obligation • Expert insights • Custom roadmap • 24-hour
                    response
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default ArticleDetailPage;
