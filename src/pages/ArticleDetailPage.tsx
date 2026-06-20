import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import ArticleVisual from "../components/common/ArticleVisual";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  User,
  Twitter,
  Linkedin,
  Eye,
} from "lucide-react";
import { articles } from "../data/articles.js";

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeRelated, setActiveRelated] = useState(0);

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
    setActiveRelated(0);

    // Reading progress
    const handleScroll = () => {
      const articleContent = document.querySelector(".article-content");
      if (!articleContent) return;

      const articleTop = articleContent.getBoundingClientRect().top + window.scrollY;
      const articleHeight = articleContent.clientHeight;
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
      window.removeEventListener("scroll", handleScroll);
    };
  }, [article]);

  const visibleRelatedArticles =
    relatedArticles.length <= 2
      ? relatedArticles
      : [
          relatedArticles[activeRelated],
          relatedArticles[(activeRelated + 1) % relatedArticles.length],
        ];

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

  const structuredAuthors = article.author.split(" & ").map((authorName) => ({
    "@type": "Person",
    "@id": authorName === "Zia Hussain"
      ? "https://zumetrix.com/founders/zia-hussain#person"
      : "https://zumetrix.com/founders/syed-omer-shah#person",
    name: authorName,
    jobTitle: authorName === "Zia Hussain" ? "Co-Founder & CEO" : "Co-Founder & CTO",
    url: authorName === "Zia Hussain"
      ? "https://zumetrix.com/founders/zia-hussain"
      : "https://zumetrix.com/founders/syed-omer-shah",
    worksFor: {
      "@id": "https://zumetrix.com/#organization",
    },
  }));

  const articleStructuredData = {
    "@type": "TechArticle",
    "@id": `https://zumetrix.com/articles/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: structuredAuthors,
    publisher: {
      "@type": "Organization",
      name: "Zumetrix Labs",
      logo: {
        "@type": "ImageObject",
        url: "https://zumetrix.com/logo/Logo%20Icon.png",
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
    wordCount: (article.content || "").split(" ").length,
  };

  const faqStructuredData = article.faqs?.length
    ? {
        "@type": "FAQPage",
        "@id": `https://zumetrix.com/articles/${article.slug}#faq`,
        mainEntity: article.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": faqStructuredData
      ? [articleStructuredData, faqStructuredData]
      : [articleStructuredData],
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
                          timeZone: "UTC",
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
                  aria-label="Share this article on X"
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
                  aria-label="Share this article on LinkedIn"
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
                  aria-label="Share this article on WhatsApp"
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
                  aria-label={copied ? "Article link copied" : "Copy article link"}
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

      {/* Article Hero Visual */}
      <section className="pb-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <ArticleVisual
              title={article.title}
              category={article.category}
              variant="hero"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto mb-14 flex max-w-[820px] items-center gap-4 border-y border-border/70 py-4 text-sm text-muted-foreground">
              <span className="h-px w-8 bg-primary/60" />
              <p className="leading-7">
                <span className="font-semibold text-foreground">
                  Zumetrix field guide.
                </span>{" "}
                Written from real product delivery work, with the goal of
                making the next decision clearer before the build gets
                expensive.
              </p>
            </div>

            <article
              className="article-content prose prose-lg dark:prose-invert mx-auto max-w-[820px]
                       prose-headings:scroll-mt-28 prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
                       prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-t prose-h2:border-border/70 prose-h2:pt-10 prose-h2:text-3xl prose-h2:leading-tight md:prose-h2:text-4xl
                       prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-2xl prose-h3:leading-snug
                       prose-p:text-[1.0625rem] prose-p:leading-[1.95] prose-p:text-zinc-300
                       prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                       prose-strong:text-foreground prose-strong:font-semibold
                       prose-ul:my-7 prose-ul:pl-6 prose-ul:text-zinc-300 prose-li:my-2 prose-li:leading-[1.85] marker:prose-li:text-primary/70
                       prose-ol:my-7 prose-ol:pl-7 prose-ol:text-zinc-300
                       prose-code:rounded-md prose-code:bg-card/70 prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-code:text-primary
                       prose-pre:rounded-2xl prose-pre:border prose-pre:border-border prose-pre:bg-card/70 prose-pre:p-6
                       prose-blockquote:my-10 prose-blockquote:rounded-2xl prose-blockquote:border-l-0 prose-blockquote:bg-card/45 prose-blockquote:p-6 prose-blockquote:text-foreground prose-blockquote:shadow-sm prose-blockquote:ring-1 prose-blockquote:ring-border/70
                       prose-img:my-10 prose-img:rounded-2xl prose-img:border prose-img:border-border/70 prose-img:shadow-lg
                       [&>h2:first-of-type]:mt-0 [&>h2:first-of-type]:border-t-0 [&>h2:first-of-type]:pt-0"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {article.internalLinks?.length > 0 && (
              <div className="mx-auto mt-16 max-w-[820px] border-y border-border/70 py-8">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Continue with Zumetrix
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {article.internalLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="group rounded-2xl border border-border/70 bg-card/25 p-5 transition-colors duration-150 hover:border-primary/35 hover:bg-card/45"
                    >
                      <span className="mb-2 block text-base font-semibold text-foreground group-hover:text-primary">
                        {link.label}
                      </span>
                      <span className="text-sm leading-6 text-muted-foreground">
                        {link.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {article.faqs?.length > 0 && (
              <div className="mx-auto mt-16 max-w-[820px]">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Common questions
                </p>
                <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Quick answers before you build
                </h2>
                <div className="space-y-4">
                  {article.faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="rounded-2xl border border-border/70 bg-card/30 p-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">
                        {faq.question}
                      </h3>
                      <p className="text-base leading-8 text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mx-auto mt-16 max-w-[820px] rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/45 to-card/20 p-6 sm:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                Apply this to your product
              </p>
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Want a clear build plan before spending months on development?
              </h2>
              <p className="mb-6 max-w-2xl text-base leading-8 text-muted-foreground">
                Share the idea, current stage, and the result you want. We will
                help you shape the right first version, the technical path, and
                the next move with less guesswork.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-150 hover:-translate-y-0.5"
              >
                Talk to Zumetrix Labs
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
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
              <div className="mx-auto max-w-5xl">
                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                      Keep reading
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      Related articles
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                      More field notes connected to this topic, without pulling
                      you out of the reading flow.
                    </p>
                  </div>

                  {relatedArticles.length > 2 && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Previous related article"
                        onClick={() =>
                          setActiveRelated((current) =>
                            current === 0 ? relatedArticles.length - 1 : current - 1,
                          )
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors duration-150 hover:border-primary/35 hover:text-primary"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        aria-label="Next related article"
                        onClick={() =>
                          setActiveRelated((current) => (current + 1) % relatedArticles.length)
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors duration-150 hover:border-primary/35 hover:text-primary"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-background/45 p-1 backdrop-blur-xl">
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background via-background/80 to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background via-background/80 to-transparent" />

                  <motion.div
                    key={activeRelated}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="grid gap-3 rounded-[20px] bg-card/35 p-3 sm:grid-cols-2"
                  >
                    {visibleRelatedArticles.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        to={`/articles/${relatedArticle.slug}`}
                        className="group min-h-[260px] rounded-2xl border border-border/70 bg-background/55 p-6 transition-colors duration-150 hover:border-primary/35 hover:bg-card/55 sm:p-7"
                      >
                        <div className="mb-8 flex items-center justify-between gap-4">
                          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                            {relatedArticle.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock size={13} />
                            {relatedArticle.readTime}
                          </span>
                        </div>

                        <h3 className="max-w-xl text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors duration-150 group-hover:text-primary">
                          {relatedArticle.title}
                        </h3>

                        <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-7 text-muted-foreground">
                          {relatedArticle.excerpt}
                        </p>

                        <div className="mt-8 flex items-end justify-between gap-4 border-t border-border/60 pt-5">
                          <div className="min-w-0 text-xs text-muted-foreground">
                            <div className="mb-1 flex items-center gap-1">
                              <User size={12} />
                              <span className="line-clamp-1">{relatedArticle.author}</span>
                            </div>
                            <span>{relatedArticle.category}</span>
                          </div>

                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                            Read
                            <ArrowRight
                              size={15}
                              className="transition-transform duration-150 group-hover:translate-x-1"
                            />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                </div>

                {relatedArticles.length > 2 && (
                  <div className="mt-6 flex justify-center gap-2">
                    {relatedArticles.map((relatedArticle, index) => (
                      <button
                        key={relatedArticle.id}
                        type="button"
                        aria-label={`Show related article ${index + 1}`}
                        onClick={() => setActiveRelated(index)}
                        className={`h-2 rounded-full transition-all duration-200 ${
                          index === activeRelated
                            ? "w-8 bg-primary"
                            : "w-2 bg-muted-foreground/30 hover:bg-primary/60"
                        }`}
                      />
                    ))}
                  </div>
                )}
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
