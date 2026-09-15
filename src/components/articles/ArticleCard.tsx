import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import ArticleVisual from "../common/ArticleVisual";

interface ArticleCardProps {
  article: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    readTime: string;
    publishedAt: string;
    tags: string[];
  };
}

// Same restraint as ProjectCard: the visual (here, ArticleVisual's own
// generated hook-highlight system) is already doing real work, so nothing
// stacks another badge or gradient on top of it. Everything else lives in
// plain typography underneath.
const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => (
  <Link to={`/articles/${article.slug}`} className="group block h-full">
    <article className="h-full flex flex-col">
      <div className="rounded-xl border border-border/60 bg-gradient-to-b from-primary/[0.05] to-transparent p-1.5 shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)] group-hover:shadow-[0_30px_60px_-24px_rgba(196,138,100,0.25)] group-hover:border-primary/30 transition-shadow duration-300">
        <div className="overflow-hidden rounded-lg">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <ArticleVisual title={article.title} category={article.category} variant="card" />
          </motion.div>
        </div>
      </div>

      <div className="pt-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>{article.author}</span>
          <span className="text-muted-foreground/40" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={11} />
            {article.readTime}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-150 leading-snug line-clamp-2">
          {article.title}
        </h3>

        <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed line-clamp-2 flex-grow">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-border/50 text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Read Article
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
          </span>
        </div>
      </div>
    </article>
  </Link>
);

export default ArticleCard;
