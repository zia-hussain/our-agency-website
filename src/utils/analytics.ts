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

// Homepage brand-film events. No free-text, no identifying payload — just
// that playback happened. `play` fires once per deliberate user-initiated
// start (never on muted background autoplay, since this film never does
// that); `complete` fires once when the film plays through to its end.
export const trackHeroVideoPlay = () => trackEvent('hero_video_play');
export const trackHeroVideoComplete = () => trackEvent('hero_video_complete');
