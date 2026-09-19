import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import ArticleVisual from "../common/ArticleVisual";
import TiltFrame from "../portfolio/TiltFrame";

interface ArticleSpotlightProps {
  article: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    authorRole: string;
    authorImage: string;
    readTime: string;
    publishedAt: string;
    tags: string[];
  };
  index: number;
  /** Which decision this piece works through: Build, Fix or Automate. */
  decision?: string;
}

// Same register as ProjectSpotlight — each featured article is its own
// scene, not a card in a grid. ArticleVisual is already the bespoke
// element here (its own hook-highlight algorithm), so it's shown large
// and tilted rather than competing with more typography on top of it.
const ArticleSpotlight: React.FC<ArticleSpotlightProps> = ({ article, index, decision }) => {
  const reversed = index % 2 === 1;

  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 sm:-top-14 left-1/2 -translate-x-1/2 text-[8rem] sm:text-[11rem] font-bold leading-none select-none bg-gradient-to-b from-foreground/[0.05] to-foreground/0 bg-clip-text text-transparent"
      >
        0{index + 1}
      </span>

      <div className={`relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0.001, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
        >
          <TiltFrame>
            <ArticleVisual title={article.title} category={article.category} variant="hero" />
          </TiltFrame>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.001, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.06 }}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary/70 mb-4">
            {decision && (
              <>
                <span className="text-primary">{decision}</span>
                <span className="text-muted-foreground/40" aria-hidden="true">·</span>
              </>
            )}
            <span>{article.category}</span>
            <span className="text-muted-foreground/40" aria-hidden="true">·</span>
            <span className="text-muted-foreground normal-case tracking-normal inline-flex items-center gap-1">
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug mb-4">
            {article.title}
          </h3>

          <p className="text-base text-muted-foreground leading-relaxed mb-7">{article.excerpt}</p>

          <div className="flex items-center gap-3 mb-7 pt-6 border-t border-border/30">
            <img src={article.authorImage} alt={article.author} className="w-10 h-10 rounded-full object-cover border border-border/50" />
            <div>
              <p className="text-sm font-semibold text-foreground">{article.author}</p>
              <p className="text-xs text-muted-foreground">{article.authorRole}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1.5 rounded-full border border-border/50 text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>

          <Link to={`/articles/${article.slug}`}>
            <motion.span
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group btn-sheen inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-6 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
            >
              Read Full Article
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
              </span>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticleSpotlight;
