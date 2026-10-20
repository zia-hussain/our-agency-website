// CANONICAL PUBLIC FACTS — the single source every public claim about
// Zumetrix Labs must copy from. Change a number here, never on a page.
// Evidence and verification dates live in docs/CANONICAL_FACTS.md.
//
// Rules (Phase 1 — Truth & Measurement, 2026-10-20):
//   projects ≠ clients ≠ reviews. Never derive one from another.
//   Marketplace credentials belong to the founder who earned them, not to
//   the company; they are shown on that founder's own profiles only.
//   Ratings are stated as each platform displays them.

export const FACTS = {
  company: {
    legalName: "Zumetrix Labs",
    founded: "June 2025",
    foundedYear: 2025,
    baseCity: "Karachi, Pakistan",
    tagline: "Forge Clear Ideas Into Shipped Software.",
    url: "https://zumetrix.com",
    email: "hello@zumetrix.com",
  },
  founders: {
    zia: { publicName: "Zia Hussain", fullName: "Syed Zia Hussain Shah", role: "Co-Founder & CEO" },
    omer: { publicName: "Omer Gillani", fullName: "Syed Omer Shah Gillani", role: "Co-Founder & CTO" },
  },
  // Counts the site is allowed to state. Defensibility is documented in
  // docs/CANONICAL_FACTS.md; the founders own any change.
  counts: {
    projectsShipped: "80+", // marketplace engagements + direct projects, founders' combined record
    clients: "50+",         // unique client groups across all sources (duplicates across platforms counted once)
    writtenReviews: "80+",  // written review records across Fiverr, Upwork, Trustpilot, Google, Clutch
    caseStudiesPublished: 19,
  },
  // Per-platform facts exactly as each platform displayed them on the
  // verification date. These are NOT company-wide ratings.
  platforms: {
    fiverrOmer: { handle: "omershahgillani", level: "Level 2", rating: "5.0", reviews: 51, verified: "2026-10-19" },
    fiverrZia: { handle: "syedziashahgill", level: "Level 1", rating: "4.9", reviews: 10, verified: "2026-10-20" },
    upworkZia: { handle: "ziahussain1", badge: "Top Rated", jss: "100%", verified: "2026-10-19" },
    upworkOmer: { handle: "omerautomationexpert", verified: "2026-10-19" },
    trustpilot: { trustScore: "4.0", reviews: 3, allFiveStar: true, verified: "2026-10-20" },
    clutch: { rating: "5.0", reviews: 1, verified: "2026-10-19" },
    google: { reviews: 3, verified: "2026-10-19", note: "from internal proof library; not re-verified on Google" },
  },
} as const;
