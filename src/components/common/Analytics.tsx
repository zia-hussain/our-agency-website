import { useEffect } from "react";

const GA_TAG_ID = "G-PRSP59FL20";

declare global {
  interface Window {
    __zumetrixAnalyticsScheduled?: boolean;
  }
}

// GA4 bootstrap, rendered exactly once in App.tsx regardless of route — this
// used to live inside SEO.tsx behind a per-page `gaTagId` prop, which meant
// window.gtag only existed on the 5 pages that remembered to pass it. Every
// other route's page_view/CTA/lead events (see App.tsx's router-aware
// tracking effect, and analytics.ts) were silently no-ops. Deferred to first
// interaction or an 8s idle timeout either way, so this never competes with
// the initial paint.
const Analytics = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__zumetrixAnalyticsScheduled) return;
    window.__zumetrixAnalyticsScheduled = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };

    const triggerEvents: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "touchstart", "scroll"];

    const cleanupTriggers = () => {
      triggerEvents.forEach((eventName) => window.removeEventListener(eventName, loadAnalytics));
    };

    function loadAnalytics() {
      if (document.querySelector("script[data-zumetrix-ga]")) return;
      cleanupTriggers();
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}`;
      script.dataset.zumetrixGa = "true";
      document.head.appendChild(script);
      window.gtag("js", new Date());
      // send_page_view: false — App.tsx's router-aware effect fires the
      // manual page_view for every route (initial load included) with the
      // exact pathname/location we want; letting GA4's own config call also
      // auto-fire one would double-count the first pageview of every visit.
      window.gtag("config", GA_TAG_ID, { send_page_view: false });
    }

    const timeoutId = window.setTimeout(loadAnalytics, 8000);
    triggerEvents.forEach((eventName) =>
      window.addEventListener(eventName, loadAnalytics, { once: true, passive: true }),
    );

    return () => {
      window.clearTimeout(timeoutId);
      cleanupTriggers();
    };
  }, []);

  return null;
};

export default Analytics;
