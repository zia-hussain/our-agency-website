// Canonical metadata for every real, self-hosted testimonial video on the
// site — the single source VideoObject schema is built from, wherever a
// TestimonialFilm instance is embedded (ClientProofFilm on Home/Portfolio/
// Contact, and the two direct embeds on WebDetailPage/RescueDetailPage).
//
// uploadDate: all 4 files were first added to this repository in the same
// commit — `git log --follow -- public/videos/Josh.mp4` (and the other 3)
// all resolve to a35bea3, 2026-09-13, "Ship scroll-aware video proof
// system." That's the real, verifiable date each video first went live on
// zumetrix.com — not a guess, and not necessarily the date the interview
// was originally filmed (unknown, and not claimed here). If a truer
// original-recording date is known, replace this with that instead.
//
// duration: measured directly from the actual media files via
// `ffprobe -show_entries format=duration` and rounded to the nearest whole
// second, then expressed as ISO 8601. Not estimated.
export interface TestimonialFilmMeta {
  id: string;
  name: string;
  role: string;
  /** What the clip is actually about — used as the VideoObject description. */
  context: string;
  src: string;
  poster: string;
  captionsSrc: string;
  /** ISO 8601 date — see the uploadDate note above for what this actually represents. */
  uploadDate: string;
  /** ISO 8601 duration, measured via ffprobe against the real file. */
  duration: string;
  associatedService?: string;
}

export const TESTIMONIAL_FILMS: Record<string, TestimonialFilmMeta> = {
  josh: {
    id: "josh",
    name: "Josh Nyce",
    role: "Owner & Founder, Fast Track USA",
    context: "Another team spent two years without shipping it. Josh explains what changed the moment Zumetrix took over.",
    src: "/videos/Josh.mp4",
    poster: "/images/video-posters/josh-nyce-poster.jpg",
    captionsSrc: "/captions/josh-nyce-testimonial.vtt",
    uploadDate: "2026-09-13",
    duration: "PT1M26S",
    associatedService: "product-rescue-stabilization",
  },
  reema: {
    id: "reema",
    name: "Reema Rafay",
    role: "National Vice President, Arbonne",
    context: "Anyone can assemble a funnel. Reema explains the difference between that and what's actually built behind it.",
    src: "/videos/reema-rafay-testimonial.mp4",
    poster: "/images/video-posters/reema-rafay-poster.jpg",
    captionsSrc: "/captions/reema-rafay-testimonial.vtt",
    uploadDate: "2026-09-13",
    duration: "PT44S",
    associatedService: "web-application-development",
  },
  sarah: {
    id: "sarah",
    name: "Sarah",
    role: "Founder, Hinterland Co",
    context: "Most agencies go quiet once they're paid. Sarah's support started months ago and hasn't stopped.",
    src: "/videos/sarah-hinterland-testimonial.mp4",
    poster: "/images/video-posters/sarah-poster.jpg",
    captionsSrc: "/captions/sarah-hinterland-testimonial.vtt",
    uploadDate: "2026-09-13",
    duration: "PT53S",
  },
  krystof: {
    id: "krystof",
    name: "Krystof Kapka",
    role: "Co-Founder, AI Akvizicia",
    context: "Technical work only matters if it moves a real number. Krystof explains the one that changed.",
    src: "/videos/krystof-testimonial.mp4",
    poster: "/images/video-posters/krystof-poster.jpg",
    captionsSrc: "/captions/krystof-testimonial.vtt",
    uploadDate: "2026-09-13",
    duration: "PT2M15S",
  },
};
