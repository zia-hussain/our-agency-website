import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TestimonialFilm from "../common/TestimonialFilm";

// Real clients, real projects — each one a different reason they trusted
// this team. Deliberately not a service-mapping exercise (see the detail
// pages for that) and deliberately not framed around a count: this is a
// curated, growing archive, not "our four clients." Adding a fifth, sixth,
// or tenth story later is a data change, not a redesign — the rail and
// the mobile selector both just map over STORIES.
interface ClientStory {
  id: string;
  dimension: string;
  name: string;
  role: string;
  context: string;
  quote: string;
  src: string;
  poster: string;
  captionsSrc: string;
}

const STORIES: ClientStory[] = [
  {
    id: "josh",
    dimension: "Recovery",
    name: "Josh Nyce",
    role: "Owner & Founder, Fast Track USA",
    context: "Another team spent two years without shipping it. Josh explains what changed the moment Zumetrix took over.",
    quote: "They took over and within three weeks my app was launched and it was perfect.",
    src: "/videos/Josh.mp4",
    poster: "/images/video-posters/josh-nyce-poster.jpg",
    captionsSrc: "/captions/josh-nyce-testimonial.vtt",
  },
  {
    id: "reema",
    dimension: "Execution",
    name: "Reema Rafay",
    role: "National Vice President, Arbonne",
    context: "Anyone can assemble a funnel. Reema explains the difference between that and what's actually built behind it.",
    quote: "Anyone can build a funnel, okay? But to build a funnel and have the functionality, the coding, the programming at the back... is second to none.",
    src: "/videos/reema-rafay-testimonial.mp4",
    poster: "/images/video-posters/reema-rafay-poster.jpg",
    captionsSrc: "/captions/reema-rafay-testimonial.vtt",
  },
  {
    id: "sarah",
    dimension: "Continuity",
    name: "Sarah",
    role: "Founder, Hinterland Co",
    context: "Most agencies go quiet once they're paid. Sarah's support started months ago and hasn't stopped.",
    quote: "His after sales support continues to this day and is greatly appreciated.",
    src: "/videos/sarah-hinterland-testimonial.mp4",
    poster: "/images/video-posters/sarah-poster.jpg",
    captionsSrc: "/captions/sarah-hinterland-testimonial.vtt",
  },
  {
    id: "krystof",
    dimension: "Business impact",
    name: "Krystof Kapka",
    role: "Co-Founder, AI Akvizicia",
    context: "Technical work only matters if it moves a real number. Krystof explains the one that changed.",
    quote: "We are basically processing one-click upsells, which are boosting our cash per customer quite a lot.",
    src: "/videos/krystof-testimonial.mp4",
    poster: "/images/video-posters/krystof-poster.jpg",
    captionsSrc: "/captions/krystof-testimonial.vtt",
  },
];

const ClientProofFilm: React.FC = () => {
  const [activeId, setActiveId] = useState(STORIES[0].id);
  const active = STORIES.find((s) => s.id === activeId)!;

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_0%,rgba(196,138,100,0.06),transparent_65%)]" />

      {/* Entry — the same thread device the rest of the site uses to mark  */}
      {/* a deliberate handoff between chapters, not just another section.  */}
      <div className="relative flex justify-center mb-14 sm:mb-16" aria-hidden="true">
        <span className="w-px h-12 sm:h-16 bg-gradient-to-b from-border to-primary/50" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70 mb-5"
          >
            Clients, Unscripted
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12]"
          >
            <span className="block text-muted-foreground/50">Different projects.</span>
            <span className="block text-foreground mt-1.5">Different reasons they trusted the same team.</span>
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1.7fr_1fr] gap-10 lg:gap-16 items-start">
          {/* The featured film — dominant, changes meaningfully with selection */}
          <div>
            {/* The dimension is restated here, at real scale, so the selected */}
            {/* state is legible from the film itself, not just a rail marker. */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`${active.id}-label`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4"
              >
                {active.dimension}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <TestimonialFilm
                  src={active.src}
                  poster={active.poster}
                  captionsSrc={active.captionsSrc}
                  variant="featured"
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.id}-context`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="mt-7 sm:mt-8"
              >
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xl">{active.context}</p>
                <blockquote className="border-l-2 border-primary/40 pl-5">
                  <p className="text-lg sm:text-xl text-foreground/90 leading-snug tracking-tight mb-3">"{active.quote}"</p>
                  <footer className="text-sm text-muted-foreground">
                    {active.name}
                    <span className="text-muted-foreground/50"> · {active.role}</span>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* The selector rail — a typographic index, not a thumbnail grid.  */}
          {/* A plain map over STORIES: a fifth or sixth entry just adds a    */}
          {/* row here, nothing about the layout has to change.               */}
          <div className="lg:pt-14">
            <div className="hidden lg:flex flex-col">
              {STORIES.map((story) => {
                const isActive = story.id === active.id;
                return (
                  <button
                    key={story.id}
                    onClick={() => setActiveId(story.id)}
                    aria-pressed={isActive}
                    className={`group relative text-left py-5 px-5 -mx-5 border-t border-border/40 last:border-b transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                      isActive ? "bg-primary/[0.035]" : ""
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-300 ${isActive ? "bg-primary" : "bg-transparent"}`}
                      aria-hidden="true"
                    />
                    <span
                      className={`block text-lg sm:text-xl font-bold tracking-tight transition-colors duration-200 ${isActive ? "text-foreground" : "text-muted-foreground/50 group-hover:text-muted-foreground"}`}
                    >
                      {story.dimension}
                    </span>
                    <span className={`block text-xs mt-1 transition-colors duration-200 ${isActive ? "text-primary/80" : "text-muted-foreground/40"}`}>
                      {story.name} · {story.role}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile — horizontal scroll-snap chips instead of a squeezed rail */}
            <div className="lg:hidden flex gap-2.5 overflow-x-auto pb-1 -mx-4 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {STORIES.map((story) => {
                const isActive = story.id === active.id;
                return (
                  <button
                    key={story.id}
                    onClick={() => setActiveId(story.id)}
                    aria-pressed={isActive}
                    className={`flex-shrink-0 snap-start rounded-full border px-4 py-2.5 text-left transition-colors duration-200 ${
                      isActive ? "border-primary/50 bg-primary/10" : "border-border/50 bg-card/10"
                    }`}
                  >
                    <span className={`block text-sm font-bold ${isActive ? "text-foreground" : "text-muted-foreground/60"}`}>{story.dimension}</span>
                    <span className={`block text-[11px] ${isActive ? "text-primary/70" : "text-muted-foreground/40"}`}>{story.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Exit — names what comes next so the written carousel reads as a */}
        {/* different, broader layer of proof, not a second testimonial     */}
        {/* section repeating the same beat.                                 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center text-sm text-muted-foreground/50 italic mt-16 sm:mt-20"
        >
          A few of the voices. The fuller record is below.
        </motion.p>
      </div>
    </section>
  );
};

export default ClientProofFilm;
