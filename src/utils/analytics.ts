declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export const trackFormSubmit = (formType: string) => {
  trackEvent('generate_lead', {
    method: formType,
    value: 12000,
    currency: 'USD'
  });
};

// Phase 1 (2026-10-20): one event for every website Calendly click, with the
// same `source` value that buildCalendlyUrl() puts in utm_content, so a GA4
// click and a Calendly booking can be matched by page/section.
export const trackCalendlyClick = (source: string) => trackEvent('calendly_click', { source });

export const trackCalendlyBooking = () => {
  trackEvent('schedule_consultation', {
    method: 'calendly'
  });
};

export const trackLeadMagnetDownload = (magnetName: string) => {
  trackEvent('download_lead_magnet', {
    magnet_name: magnetName
  });
};

export const trackCTAClick = (ctaName: string, pageLocation: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    page_location: pageLocation
  });
};

export const trackScrollDepth = (percent: number) => {
  trackEvent('scroll_depth', {
    percent_scrolled: percent
  });
};

export const trackOutboundLink = (url: string, linkType: string) => {
  trackEvent('outbound_link_click', {
    link_url: url,
    link_type: linkType
  });
};

// Rescue-or-Rebuild tool events. Deliberately no-payload: never log raw
// answers, dimension states, or the resulting outcome category by default.
// If a visitor chooses to carry their result into a contact inquiry, that is
// an explicit opt-in on the result screen — not something these events do.
export const trackRescueToolStarted = () => trackEvent('rescue_tool_started');
export const trackRescueToolCompleted = () => trackEvent('rescue_tool_completed');
export const trackRescueToolCaseClicked = () => trackEvent('rescue_tool_case_clicked');
export const trackRescueToolServiceClicked = () => trackEvent('rescue_tool_service_clicked');
export const trackRescueToolContactStarted = () => trackEvent('rescue_tool_contact_started');

// Product Rescue offer-system events (audit Section 23 / brief Section 23).
// Same no-payload convention as the rescue-tool events above: these log that
// a stage happened, never the problem description, evidence links, or any
// other free-text answer. `route` is the one safe categorical value ever
// attached — "standard" | "custom" | "decline" — and only fires from the
// one place that value is decided by a human action, never inferred from
// form answers client-side.
export const trackRescueOfferViewed = () => trackEvent('rescue_offer_viewed');
export const trackRescueApplicationStarted = () => trackEvent('rescue_application_started');
export const trackRescueApplicationSubmitted = () => trackEvent('rescue_application_submitted');
export const trackRescueApplicationQualified = (route: 'standard' | 'custom' | 'decline') =>
  trackEvent('rescue_application_qualified', { route });
export const trackRescueAccepted = () => trackEvent('rescue_accepted');
export const trackRescuePaymentStarted = () => trackEvent('rescue_payment_started');
export const trackRescuePaymentCompleted = () => trackEvent('rescue_payment_completed');
export const trackRescueDay0Confirmed = () => trackEvent('rescue_day0_confirmed');
export const trackRescueAssessmentDelivered = () => trackEvent('rescue_assessment_delivered');
export const trackRescueImplementationRequested = () => trackEvent('rescue_implementation_requested');

// Homepage brand-film event. No free-text, no identifying payload — just
// that playback started (same autoplay-on-scroll trigger as every other
// TestimonialFilm instance).
export const trackHeroVideoPlay = () => trackEvent('hero_video_play');

// Offers commercial-routing events (2026-10-11 pass). One parameterized
// function per journey step, not three copy-pasted functions per offer —
// `offer` is always the slug ("idea-to-build" | "product-rescue" |
// "manual-to-system"), never free text, so this stays as PII-free as the
// rescue_* events above. `source` is a short, developer-chosen string
// identifying WHERE the click happened (e.g. "nav", "homepage-router",
// "article:build-saas-mvp-in-30-days", "offers-hub-proof") — never user
// input — which is what lets source page -> selected offer -> application
// be reconstructed later without storing anything PII.
export const trackOffersNavClick = () => trackEvent('offers_nav_click');
export const trackOffersHubView = () => trackEvent('offers_hub_view');
export const trackOfferSelect = (offer: string) => trackEvent('offer_select', { offer });
// 'offer_viewed' already existed (fired inline from idea-to-build's and
// manual-to-system's own LandingPage.tsx, offer param only, no source) —
// consolidated here rather than introducing a second, competing "page
// view" event name. product-rescue keeps its separate rescue_offer_viewed
// too (unchanged, an established funnel of its own); this is additive.
export const trackOfferDetailView = (offer: string, source?: string) =>
  trackEvent('offer_viewed', { offer, source });
export const trackOfferApplyClick = (offer: string, source?: string) =>
  trackEvent('offer_apply_click', { offer, source });
// 'offer_application_started'/'_submitted' already existed too (fired
// inline from idea-to-build's and manual-to-system's own ApplyPage.tsx,
// offer param only) — same consolidation as trackOfferDetailView above,
// now also carrying source. product-rescue's separate rescue_application_
// started/submitted pair is unchanged and fires alongside this, not
// replaced by it.
export const trackOfferApplicationStart = (offer: string, source?: string) =>
  trackEvent('offer_application_started', { offer, source });
// Phase 1: which step an applicant reached (1-based index of the step they
// just ADVANCED TO). Lets step-4 abandonment be measured without storing
// any answer. Fires once per forward move; never on back.
export const trackOfferApplicationStep = (offer: string, step: number) =>
  trackEvent('offer_application_step', { offer, step });
export const trackOfferApplicationComplete = (offer: string, source?: string) =>
  trackEvent('offer_application_submitted', { offer, source });
export const trackContextualOfferCtaClick = (offer: string, source: string) =>
  trackEvent('contextual_offer_cta_click', { offer, source });
