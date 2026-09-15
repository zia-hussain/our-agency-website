import type { TestimonialFilmMeta } from "../data/testimonialFilms";

const SITE = "https://zumetrix.com";

// Google's 3 required VideoObject properties (name, thumbnailUrl,
// uploadDate — per developers.google.com/search/docs/appearance/
// structured-data/video, checked 2026-09) are all genuinely satisfied here:
// uploadDate and duration are sourced from real evidence (git history and
// ffprobe, respectively — see testimonialFilms.ts's own comments for
// exactly what each represents and where it came from), not invented.
// Schema.org validity and Google rich-result eligibility are two different
// claims — see the Phase 1 delta report for that distinction spelled out.
export const buildVideoObjectSchema = (film: TestimonialFilmMeta) => ({
  "@type": "VideoObject",
  name: `${film.name} on working with Zumetrix Labs`,
  description: film.context,
  thumbnailUrl: `${SITE}${film.poster}`,
  contentUrl: `${SITE}${film.src}`,
  uploadDate: film.uploadDate,
  duration: film.duration,
});
