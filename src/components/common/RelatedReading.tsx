import React from "react";
import { Link } from "react-router-dom";

interface RelatedReadingLink {
  href: string;
  label: string;
  description: string;
}

interface RelatedReadingProps {
  links: RelatedReadingLink[];
  eyebrow?: string;
  className?: string;
}

// Same visual treatment as the "Continue with Zumetrix" block on article
// pages (ArticleDetailPage.tsx) — reused here so service pages can point to
// the authority content that actually relates to them, instead of dead-ending
// at a FAQ with no forward links into the site's article cluster.
const RelatedReading: React.FC<RelatedReadingProps> = ({ links, eyebrow = "Continue with Zumetrix", className = "" }) => {
  if (!links.length) return null;

  return (
    <div className={`mx-auto max-w-[820px] border-y border-border/70 py-8 ${className}`}>
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="group rounded-2xl border border-border/70 bg-card/25 p-5 transition-colors duration-150 hover:border-primary/35 hover:bg-card/45"
          >
            <span className="mb-2 block text-base font-semibold text-foreground group-hover:text-primary">
              {link.label}
            </span>
            <span className="text-sm leading-6 text-muted-foreground">{link.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedReading;
