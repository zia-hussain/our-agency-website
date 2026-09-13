import React from "react";
import { motion } from "framer-motion";
import { Clapperboard } from "lucide-react";

// The early trust moment near the Hero — architecturally ready for a real
// combined-client brand film (variant="brand" on TestimonialFilm) the
// moment that asset exists. Until then this renders an honest "in
// production" placeholder at the exact same stage proportions the real
// film will use, so nothing about the layout needs to change later —
// only BRAND_FILM_SRC needs a real path. It deliberately has no play
// button or fake controls: an interactive element that does nothing on
// click would be worse than admitting the film isn't ready yet.
const BRAND_FILM_SRC: string | null = null;

const BrandFilmMoment: React.FC = () => {
  if (BRAND_FILM_SRC) return null; // real <TestimonialFilm variant="brand" /> takes over once an asset exists

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_0%,rgba(196,138,100,0.05),transparent_65%)]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0.95, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28 }}
          className="text-center mb-9 sm:mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70 mb-4">The Zumetrix Film</p>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight max-w-md mx-auto leading-[1.25]">
            <span className="text-muted-foreground/50">What it's actually like</span>{" "}
            <span className="text-foreground">to work with this team.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.95, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, delay: 0.05 }}
          className="relative aspect-video max-w-4xl mx-auto rounded-[2rem] overflow-hidden border border-border/50 bg-card/10 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.6)] flex items-center justify-center"
        >
          <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(196,138,100,0.08),transparent_60%)]" />
          <div className="relative text-center px-6">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-border/60 bg-background/60 mb-5">
              <Clapperboard size={22} className="text-muted-foreground/50" />
            </span>
            <p className="text-sm font-semibold text-muted-foreground/70 mb-1.5">In production</p>
            <p className="text-xs text-muted-foreground/45 max-w-xs mx-auto leading-relaxed">
              A short film built from real Zumetrix client stories.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandFilmMoment;
