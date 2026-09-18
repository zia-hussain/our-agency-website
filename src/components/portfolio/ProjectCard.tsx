import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "../../data/projects";

interface ProjectCardProps {
  project: Project;
  size?: "featured" | "archive";
  index?: number;
}

// The project images are the designer's own title/problem-solution slides —
// already dense with type — so this card never stacks more badges or text
// on top of the image. Everything the card needs to say lives underneath it
// in plain typography, reusing the same leading-quote-with-rule language the
// service detail pages already established for testimonials, so a card here
// and a quote there read as the same voice, not two different systems.
const ProjectCard: React.FC<ProjectCardProps> = ({ project, size = "archive" }) => {
  const highlight = project.testimonial?.quote ?? project.results[0];
  const highlightAuthor = project.testimonial
    ? `${project.testimonial.author}${project.testimonial.role ? `, ${project.testimonial.role}` : ""}`
    : null;

  const isFeatured = size === "featured";

  return (
    <Link to={`/portfolio/${project.slug}`} className="group block h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.15 }}
        className="h-full flex flex-col"
      >
        <div className="rounded-xl border border-border/60 bg-gradient-to-b from-primary/[0.05] to-transparent p-1.5 shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)] group-hover:shadow-[0_30px_60px_-24px_rgba(196,138,100,0.25)] group-hover:border-primary/30 transition-shadow duration-300">
          <div className="overflow-hidden rounded-lg">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`w-full aspect-[4/3] ${project.heroImageFit === "contain" ? "object-contain bg-background" : "object-cover"}`}
            />
          </div>
        </div>

        <div className="pt-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-primary/80 mb-2">
            <span>{project.category}</span>
            <span className="text-muted-foreground/40" aria-hidden="true">·</span>
            <span className="text-muted-foreground normal-case tracking-normal">{project.year}</span>
          </div>

          <h3
            className={`font-semibold text-foreground group-hover:text-primary transition-colors duration-150 leading-snug ${
              isFeatured ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {project.title}
          </h3>

          <p className="text-sm text-muted-foreground mt-1.5">
            {project.client.name}
            {project.client.country && ` · ${project.client.country}`}
          </p>

          {highlight && (
            <div className="flex gap-3 mt-4 pt-4 border-t border-border/30">
              <span className="w-px flex-shrink-0 bg-primary/30 mt-0.5" aria-hidden="true" />
              <div>
                <p
                  className={`text-foreground/85 leading-snug ${
                    isFeatured ? "text-base sm:text-lg italic" : "text-sm italic"
                  }`}
                >
                  "{highlight}"
                </p>
                {highlightAuthor && (
                  <p className="text-xs text-muted-foreground/70 mt-1.5">{highlightAuthor}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border border-border/50 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              View case study
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-150"
              />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default ProjectCard;
