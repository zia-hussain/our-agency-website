# Canonical Public Facts — Zumetrix Labs

Source of truth for every public claim. Code reads `src/config/facts.ts`; this file holds the evidence.
Rule: projects ≠ clients ≠ reviews. Never infer one from another. Ratings are stated as each platform displays them.
Verified 2026-10-19/20 (Phase 1 — Truth & Measurement). Owner of changes: founders.

| Fact | Canonical value | Evidence | Status |
| --- | --- | --- | --- |
| Company name | Zumetrix Labs | Site, Trustpilot, Clutch | Verified |
| Founded | June 2025 | About page; Clutch "Founded 2025"; Trustpilot claimed Jul 2026 | Verified on site; GoodFirms/Krowdbase say 2024 → MANUAL correction |
| Base | Karachi, Pakistan | Trustpilot address; contact page | Verified |
| Tagline | Forge Clear Ideas Into Shipped Software. | site config | Verified; old "Forge Your Digital Empire. Conquer Tomorrow." survives only on GoodFirms/Krowdbase and stale search snippets |
| Founders (public names, roles) | Zia Hussain — Co-Founder & CEO; Omer Gillani — Co-Founder & CTO | site, LinkedIn | Verified |
| Team shape | Two founders plus a small group of specialists (design, development, QA, automation) engaged per project | About page copy | Stated by founders; not externally verifiable |
| Client geographies | US, UK, Canada, Europe (Norway, Denmark, Austria), Australia, Middle East | case studies, review countries | Verified from proof library |
| Projects shipped | 80+ | Internal proof library: 59 Fiverr order records + 19 Upwork job records (both founders) + direct/non-marketplace projects (Knipsr, Fast Track, Floating Stone Ranch, First North, Safco, BTE, Tech Skills, Liftly …) | Defensible when marketplace engagements count as projects. OWNER CONFIRM the definition |
| Clients | 50+ | Proof library: 49 unique client groups with written reviews (cross-platform duplicates counted once) + clients without written reviews (Safco, BTE, Tech Skills, Liftly, learning-platform founder) | Defensible; "around 50" is the conservative form. OWNER CONFIRM |
| Written reviews | 80+ (87 records) | Proof library master sheet: Fiverr 59, Upwork 20 (+1 separate testimonial), Trustpilot 3, Google 3, Clutch 1 | Verified internally |
| Average rating across rated written reviews | 4.99 (84 rated records; one 4.3 on Fiverr) | Proof library | "5.0 average" is true to one decimal; never say "all five-star" |
| Fiverr — Omer (omershahgillani) | Level 2 · 5.0 · 51 reviews | fiverr.com, 2026-10-19 | Verified |
| Fiverr — Zia (syedziashahgill) | Level 1 · 4.9 · 10 reviews | fiverr.com, 2026-10-20 | Verified |
| Upwork — Zia (ziahussain1) | Top Rated · 100% JSS · individual credential | Upwork API via connected account, 2026-10-19; proof library: 17 completed jobs, 16 with feedback | Verified; shown on Zia's profiles only, never on company surfaces |
| Upwork — Omer (omerautomationexpert) | 2 completed jobs, 2 feedbacks | Upwork API, 2026-10-19 | Verified |
| Trustpilot | TrustScore 4.0 ("Great") · 3 reviews · 100% 5-star · claimed Jul 2026 | trustpilot.com/review/zumetrix.com, 2026-10-20 | Verified. Do not write "5.0 on Trustpilot" |
| Clutch | 5.0 · 1 review (First North Peptides) · min project $5,000+ · $25–49/hr · 2–9 employees · founded 2025 | clutch.co/profile/zumetrix-labs, 2026-10-19 | Verified |
| Google reviews | 3 | proof library | Not re-verified on Google |
| GoodFirms | 0 reviews; says founded 2024; old tagline; "50+ international clients"; "world's premier" | goodfirms.co, 2026-10-19 | INCORRECT → MANUAL |
| Krowdbase | unclaimed; founded 2024; old tagline; "undefined" FAQ placeholders | krowdbase.com, 2026-10-19 | INCORRECT → MANUAL (claim or request removal) |
| LinkedIn company page | linkedin.com/company/zumetrix-labs | footer | Follower count / tagline UNVERIFIED (robots-blocked) |
| X account | x.com/zumetrix83892 | footer | Exists per founders; handle auto-generated. The uncommitted WIP branch removes it — owner decision |
| Published case studies | 19 | src/data/projects.ts | Verified (portfolio copy now derives the number) |
| Articles | 13 | sitemap | Verified |
| Response promise | reply within 24 hours (site); substantive reply within 2 business days (founders' locked rule, 15 Oct) | site copy vs locked rule | INCONSISTENT across surfaces → Phase 2 copy decision |

## Claims the site must not make
- "80+ reviewers" or "80+ clients" (there are 80+ *projects*; 50+ clients; 87 written review records from ~49 client groups).
- "5.0 on Trustpilot" (displays 4.0 with 3 reviews).
- Any company-wide "100% Job Success" or "Top Rated" (individual Upwork credentials of Zia).
- "All reviews five-star" (one 4.3 exists).
