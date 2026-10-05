import React from "react";
import { motion } from "framer-motion";
import TestimonialFilm from "../common/TestimonialFilm";
import { trackHeroVideoPlay, trackHeroVideoComplete } from "../../utils/analytics";

// The early trust moment near the Hero. Real asset shipped 2026-10-05: a
// combined-client brand film (Josh, Reema, Sarah, Krystof — the same four
// people already in testimonialFilms.ts, cut together with a Zumetrix
// intro card). autoPlay={false} because this film carries real narration
// — it waits for a deliberate click and plays with sound on immediately,
// instead of the muted-background-autoplay behavior every other
// TestimonialFilm instance uses (see TestimonialFilm's autoPlay prop).
const BRAND_FILM_SRC = "/videos/zumetrix-brand-film.mp4";
const BRAND_FILM_POSTER = "/images/video-posters/zumetrix-brand-film-poster.jpg";

const BrandFilmMoment: React.FC = () => {
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

        <TestimonialFilm
          src={BRAND_FILM_SRC}
          poster={BRAND_FILM_POSTER}
          variant="brand"
          autoPlay={false}
          onPlayStart={trackHeroVideoPlay}
          onComplete={trackHeroVideoComplete}
          className="max-w-4xl mx-auto"
        />
      </div>
    </section>
  );
};

export default BrandFilmMoment;
