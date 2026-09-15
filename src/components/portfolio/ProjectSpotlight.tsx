import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { Project } from "../../data/projects";
import TiltImage from "./TiltImage";

interface ProjectSpotlightProps {
  project: Project;
  index: number;
}

// Each featured project gets treated as its own signature scene — the same
// register as the service pages' case-study moments (Liftly's fork, the
// architecture cutaway) — not a card in a repeating grid. Real KPI numbers
// surfaced boldly, the testimonial at full editorial weight, alternating
// image side so three in a row don't read as one template stamped 3 times.
const ProjectSpotlight: React.FC<ProjectSpotlightProps> = ({ project, index }) => {
  const reversed = index % 2 === 1;
  const kpis = (project.kpis ?? []).slice(0, 4);

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
          className="relative"
        >
          <TiltImage src={project.image} alt={project.title} className="aspect-[4/3]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.001, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.06 }}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary/70 mb-4">
            <span>{project.category}</span>
            <span className="text-muted-foreground/40" aria-hidden="true">·</span>
            <span className="text-muted-foreground normal-case tracking-normal">{project.client.country}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug mb-4">
            {project.title}
          </h3>

          <p className="text-base text-muted-foreground leading-relaxed mb-7">
            {project.description}
          </p>

          {kpis.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-7">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-primary/20 bg-gradient-to-b from-primary/[0.07] to-card/20 px-4 py-3 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)]"
                >
                  <p className="text-lg font-bold text-primary leading-none mb-1.5">{kpi.value}</p>
                  <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground/70">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {project.testimonial && (
            <div className="flex gap-3 mb-7 pt-6 border-t border-border/30">
              <span className="w-px flex-shrink-0 bg-primary/30 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-base sm:text-lg italic text-foreground/85 leading-snug">
                  "{project.testimonial.quote}"
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2">
                  {project.testimonial.author}, {project.testimonial.role}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border border-border/50 text-muted-foreground"
              >
                <Check size={10} strokeWidth={2.5} className="text-primary/60 flex-shrink-0" />
                {tech}
              </span>
            ))}
          </div>

          <Link to={`/portfolio/${project.slug}`}>
            <motion.span
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group btn-sheen inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-6 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
            >
              View Full Case Study
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

export default ProjectSpotlight;
