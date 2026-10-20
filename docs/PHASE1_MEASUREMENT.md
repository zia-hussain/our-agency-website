# Phase 1 — Measurement, Attribution and Lead Data

Companion to `docs/CANONICAL_FACTS.md`. Describes what is measured, how a lead's origin is recorded, and the Airtable fields the founders must create by hand.

## 1. Analytics implementation (as deployed by Phase 1)
- GA4 measurement ID `G-PRSP59FL20` — bootstrapped once in `src/components/common/Analytics.tsx`. `js` + `config` are queued immediately on mount; gtag.js itself loads on first interaction or after 3 s idle. Before Phase 1 the config was queued only after the deferred script load, so the landing `page_view` (and any early event) preceded `config` and was dropped by gtag — verified on production 2026-10-20 (dataLayer order was `[page_view, offers_hub_view, js, config]`).
- Microsoft Clarity project id `p5j8k9m0n1` — loaded from `index.html` after `load` + idle. The id pattern looks placeholder-like; **MANUAL: confirm it matches the project in the Clarity dashboard and that sessions are arriving.** Code is correct and loads on production (script request observed).
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

## 5. Baseline — what could and could not be captured (2026-10-20)
UNAVAILABLE to this execution (no signed-in GA4, Clarity, Airtable or Vercel access): sessions, traffic sources, landing pages, offer views, application starts/submissions, contact submissions, Calendly bookings, budget-band mix, situation mix, referral and marketplace lead counts.
Captured: route count 61 prerendered public routes; sitemap 50 URLs; 19 case studies; 13 articles; event inventory above; the dataLayer-ordering defect (landing page_view not sent) — meaning GA4 history before 2026-10-20 under-counts sessions that never interacted and misattributes landing pages.
MANUAL: export GA4 (last 28 days) for sessions by source, landing pages, and the event counts above; export Airtable lead/application rows with Source/UTM/Status; record both in the weekly scoreboard as the pre-change baseline. Note the GA4 under-count when comparing.
