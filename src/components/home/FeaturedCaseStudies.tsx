import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";
import { getFeaturedProjects } from "../../data/homepageProjects/projects";

const categoryColors: Record<string, string> = {
  "Web Application": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Mobile Application": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Enterprise Solution": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Startup MVP": "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

const FeaturedCaseStudies: React.FC = () => {
  const { featuredCaseStudies } = getSiteData();
  const projects = getFeaturedProjects().slice(0, 3);
  const [hero, second, third] = projects;

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
            Case Studies
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-[1.08] tracking-tight max-w-xl">
              Success Stories from<br />
              <span className="text-primary">Global Markets</span>
            </h2>
            <Link
              to={featuredCaseStudies.cta.link}
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 shrink-0 pb-1"
            >
              {featuredCaseStudies.cta.text}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-150" />
            </Link>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-4">
          {/* HERO — left large card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 group"
          >
            <Link to={`/portfolio/${hero.slug}`}>
              <div className="relative rounded-2xl overflow-hidden bg-neutral-900" style={{ height: "480px" }}>
                <img
                  src={hero.image}
                  alt={hero.title}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-40 transition-opacity duration-500 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${categoryColors[hero.category] ?? 'bg-white/10 text-white/70 border-white/15'}`}>
                      {hero.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-white/50">
                      <MapPin size={11} />
                      {hero.client.country}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3 group-hover:text-primary transition-colors duration-200 max-w-lg">
                    {hero.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed max-w-md line-clamp-2 mb-5">
                    {hero.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-white/40 group-hover:text-primary transition-colors duration-200">
                    View case study
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* RIGHT COLUMN — two stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[second, third].map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
                className="group flex-1"
              >
                <Link to={`/portfolio/${project.slug}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-neutral-900 h-full" style={{ minHeight: "228px" }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-35 transition-opacity duration-500 group-hover:opacity-45"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${categoryColors[project.category] ?? 'bg-white/10 text-white/70 border-white/15'}`}>
                          {project.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-white/45">
                          <MapPin size={10} />
                          {project.client.country}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white leading-snug mb-4 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-white/40 group-hover:text-primary transition-colors duration-200">
                        View case study
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-150" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;
