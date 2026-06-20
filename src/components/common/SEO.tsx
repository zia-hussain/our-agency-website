import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  googleVerification?: string;
  gaTagId?: string;
  structuredData?: object;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "Zumetrix Labs | SaaS MVPs, Apps & AI Automation",
  description = "Forge Clear Ideas Into Shipped Software. Zumetrix Labs builds SaaS MVPs, React/Node.js apps, AI automation, and mobile apps for founders who need thinking partners.",
  image = "https://zumetrix.com/logo/Logo%20Icon.png",
  url = "https://zumetrix.com",
  type = "website",
  googleVerification,
  gaTagId,
  structuredData,
  noIndex = false,
}) => {
  const robots = noIndex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="author"
        content="Zumetrix Labs"
      />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={noIndex ? "noindex, follow" : "index, follow"} />

      {googleVerification && (
        <meta name="google-site-verification" content={googleVerification} />
      )}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Zumetrix Labs" />
      <meta property="og:locale" content="en_US" />
      <meta
        property="og:image:alt"
        content="Zumetrix Labs"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content="Zumetrix Labs"
      />

      <meta name="theme-color" content="#C48A64" />
      <meta name="apple-mobile-web-app-title" content="Zumetrix Labs" />
      <meta name="application-name" content="Zumetrix Labs" />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {gaTagId && (
        <script>
          {`
            (function () {
              if (window.__zumetrixAnalyticsScheduled) return;
              window.__zumetrixAnalyticsScheduled = true;
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};

              function loadAnalytics() {
                if (document.querySelector('script[data-zumetrix-ga]')) return;
                cleanupAnalyticsTriggers();
                var script = document.createElement('script');
                script.async = true;
                script.src = 'https://www.googletagmanager.com/gtag/js?id=${gaTagId}';
                script.dataset.zumetrixGa = 'true';
                document.head.appendChild(script);
                window.gtag('js', new Date());
                window.gtag('config', '${gaTagId}');
              }

              var triggerEvents = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
              function cleanupAnalyticsTriggers() {
                triggerEvents.forEach(function (eventName) {
                  window.removeEventListener(eventName, loadAnalytics);
                });
              }

              window.addEventListener('load', function () {
                triggerEvents.forEach(function (eventName) {
                  window.addEventListener(eventName, loadAnalytics, { once: true, passive: true });
                });
                window.setTimeout(loadAnalytics, 8000);
              }, { once: true });
            })();
          `}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
