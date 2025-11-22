declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
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
