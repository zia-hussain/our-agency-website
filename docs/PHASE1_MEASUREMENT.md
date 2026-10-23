# Phase 1 — Measurement, Attribution and Lead Data

Companion to `docs/CANONICAL_FACTS.md`. Describes what is measured, how a lead's origin is recorded, and the Airtable fields the founders must create by hand.

## 1. Analytics implementation (as deployed by Phase 1)
- GA4 measurement ID `G-PR5PS9FL20` — bootstrapped once in `src/components/common/Analytics.tsx`. `js` + `config` are queued immediately on mount; gtag.js itself loads on first interaction or after 3 s idle. Before Phase 1 the config was queued only after the deferred script load, so the landing `page_view` (and any early event) preceded `config` and was dropped by gtag — verified on production 2026-10-20 (dataLayer order was `[page_view, offers_hub_view, js, config]`).
- Microsoft Clarity — REMOVED 2026-10-23. Tag `p5j8k9m0n1` was added 2025-11-22 ("Updated index.html") with no project record; the owner has no Clarity account; clarity.ms answered an empty 204 for it on production (no script body, no cookies, no data ever collected). Session replay can be reintroduced deliberately later with a real project.
- GA4 measurement ID corrected 2026-10-23 from `G-PRSP59FL20` (never existed; the property showed "No data received from your website yet") to the real stream `G-PR5PS9FL20`. All GA4 history before this date is EMPTY, not merely under-counted.
- GA4 stream setting to change (MANUAL, Admin → Data streams → MY Agency Website → Enhanced measurement gear → Page views → Show advanced settings): turn OFF "Page changes based on browser history events". App.tsx already sends one page_view per route; leaving this on will double-count SPA navigations.
- Consent: no consent banner; GA4 consent state is implicit-granted. Documented, not changed (separate compliance decision).
- No PII in any event payload: parameters are offer slugs, section names, step numbers and `?from=` source strings only.

## 2. Commercial event map

| Event | Trigger | Page(s) | Params | PII |
| --- | --- | --- | --- | --- |
| page_view | every route change (App.tsx) | all public | page_path, page_location (UTMs parsed by GA4), page_title | no |
| offers_nav_click | nav "Offers" click | all | — | no |
| offers_hub_view | /offers mount | /offers | — | no |
| offer_select | pick an offer on the hub | /offers | offer | no |
| offer_viewed | offer landing mount | /idea-to-build, /product-rescue (also rescue_offer_viewed), /manual-to-system | offer, source (= ?from) | no |
| offer_apply_click | apply CTA | offer landings | offer, source | no |
| offer_application_started | application mount | /*/apply | offer, source | no |
| offer_application_step (new) | forward step | /*/apply | offer, step (1-based) | no |
| offer_application_submitted | successful POST | /*/apply | offer, source | no |
| contextual_offer_cta_click | article/case-study offer bridges | articles, case studies | offer, source | no |
| generate_lead | contact form success (method `lead_contact_form`); lead magnet (unfeatured) | /contact | method, value | no |
| calendly_click (new) | any website Calendly CTA | home-cta, home-founder-{zia,omer}, footer, sticky-bar, contact-quick-actions, article-footer | source | no |
| rescue_tool_* | free diagnostic | /rescue-or-rebuild | — | no |
| cta_click | misc CTAs | various | cta_name, page_location | no |

Removed from the homepage with the ROI calculator: its `generate_lead` (value 12000) fired on every **Calculate** click, which inflated GA4 lead counts.

## 3. Attribution model (privacy-safe, first-touch)
`src/utils/attribution.ts` stores once per session: utm_source/medium/campaign/content/term, `?from=` (entry source), entry pathname, referrer host. Both submit helpers (`leadRouter.ts`, `offerApplication.ts`) send current-page UTMs first and fall back to first-touch. Offer applications now also send the offer landing page's `?from=` value (previously GA4-only).

Journey examples now reconstructable: LinkedIn (utm_source=linkedin) → article → offer (`from=article:slug`) → application (Entry Source = article:slug, UTM Source = linkedin). Homepage router → FIX → application (Entry Source = homepage-router). Case study → BUILD (Entry Source = case-study:slug).

All website Calendly links go to one destination `calendly.com/zumetrix-labs/consultation` with `utm_source=site&utm_medium=website&utm_content=<section>` (+ `utm_campaign` / `utm_term=<entry source>` when known). Zia's personal Calendly is no longer linked from the website.

## 4. Airtable — fields to create (MANUAL, Airtable UI)
Code already writes these; until the field exists Airtable rejects it as unknown and the API retries without it (no submission is lost). Create as plain text unless noted.

Website Leads table: `Entry Source`, `Entry Page`, `Referrer Host`, `Situation` (single select: Nothing is built yet / A product exists (live, stuck, or inherited) / A workflow runs on people and spreadsheets / Not sure), `Next Action`, `Next Action Date` (date), `Outcome` (single select: Open / Won / Lost / Deferred / Disqualified), `Win-Loss Reason`.

Each offer application table (Idea-to-Build, Product Rescue, Manual-to-System): `Entry Source`, `Entry Page`, `Referrer Host`, `Next Action`, `Next Action Date`, `Outcome`, `Win-Loss Reason`. (Existing fields reused: Source, Situation Type, Status, Fit, UTM Source/Medium/Campaign, Page URL, Referrer, Quoted Price.)

Do not rename existing fields.

## 5. Baseline (2026-10-23)
GA4: NO DATA EXISTS for any period before 2026-10-23 (wrong measurement ID since the tag was installed, 2025-06-21). Sessions, users, source/medium, landing pages, event counts: UNAVAILABLE. The first real GA4 day is the first full day after commit `bdc4ac2`+closure deploy.
Search Console (legacy www property, last 3 months to 2026-10-17): 4 web-search clicks total; 7 indexed / 17 not-indexed pages (property only sees www URLs, which redirect). New property https://zumetrix.com/ verified 2026-10-23; sitemap submitted; /about re-index requested; reports populate in ~1 day.
Airtable Website Leads, lifetime (2026-06-19 → 2026-10-18): 7 records = 1 internal release test, 1 genuine contact enquiry (Jul 2026, Web Application), 2 ROI-calculator submissions (Sep 2026; one with nonsense inputs: 10,000 employees at $1,000/h), 3 vendor solicitations from one sender (Oct 2026). Genuine inbound via the website: 1. Budget mix: UNAVAILABLE (1 record). Situation mix: UNAVAILABLE (field new).
Airtable Offer Applications, lifetime: 1 record (internal test by Zia). Genuine paid-offer applications: 0.
Calendly bookings: UNAVAILABLE (no Calendly access in this closure). Referral/marketplace lead counts: not captured by any system; UNAVAILABLE.
Measurement-quality note: the ROI calculator's two submissions each fired GA4 `generate_lead`; had GA4 been receiving data, lead counts would have been inflated by them.

## 5a. Earlier note (2026-10-20)
UNAVAILABLE to this execution (no signed-in GA4, Clarity, Airtable or Vercel access): sessions, traffic sources, landing pages, offer views, application starts/submissions, contact submissions, Calendly bookings, budget-band mix, situation mix, referral and marketplace lead counts.
Captured: route count 61 prerendered public routes; sitemap 50 URLs; 19 case studies; 13 articles; event inventory above; the dataLayer-ordering defect (landing page_view not sent) — meaning GA4 history before 2026-10-20 under-counts sessions that never interacted and misattributes landing pages.
MANUAL: export GA4 (last 28 days) for sessions by source, landing pages, and the event counts above; export Airtable lead/application rows with Source/UTM/Status; record both in the weekly scoreboard as the pre-change baseline. Note the GA4 under-count when comparing.
