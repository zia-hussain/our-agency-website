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
}

const SEO: React.FC<SEOProps> = ({
  title = "Zumetrix Labs | #1 Software Development Agency Pakistan | Zia Hussain & Syed Omer Shah | SaaS MVP Experts",
  description = "Zumetrix Labs is Pakistan's top software development agency founded by expert developers Zia Hussain and Syed Omer Shah. We specialize in SaaS MVP development, React/Node.js applications, AI automation services, mobile app development, Firebase integration, and custom software solutions. Hire the best React developers, Node.js experts, and Firebase specialists in Pakistan. Trusted by 50+ clients globally for enterprise software, startup MVPs, no-code automations, and full-stack development services.",
  keywords = "Zumetrix, Zumetrix Labs, Zometrix, Zia Hussain, Syed Zia Hussain, Syed Zia Hussain Shah, Syed Omer Shah, Omer Shah, software development agency Pakistan, SaaS MVP builder Pakistan, React developer Pakistan, Node.js agency Pakistan, Firebase expert Pakistan, AI automation company, no-code automation agency, mobile app developers Pakistan, web development company Pakistan, custom software agency, top software developers Pakistan, enterprise software Pakistan, startup app development, React Node Firebase agency, TypeScript development agency, Next.js developers Pakistan, MongoDB backend experts, Tailwind developers, REST API development team, AI workflow developers, Make.com specialists, Zapier expert agency, Flutter app developers, PWA app builders, cross-platform app development, API integration specialists, custom dashboard developers, data visualization dashboards, business automation services, OpenAI integration, ChatGPT automation experts, task automation, CRM automation setup, WhatsApp automation, email parsing bots, webhooks integration, Stripe automation, hire React developer, hire Node developer, hire Firebase expert, build SaaS product, launch MVP fast, agency for startup, Karachi software developers, Lahore tech agency, Islamabad app builders, Pakistan web development, top agency in Pakistan, remote dev team Pakistan, Pakistani devs for hire, best developer team Pakistan, Zumetrix CEO, Zia Hussain software engineer, top fullstack devs Pakistan",
  image = "https://zumetrix.com/og-image.jpg",
  url = "https://zumetrix.com",
  type = "website",
  googleVerification,
  gaTagId,
  structuredData,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      <meta
        name="author"
        content="Zumetrix Labs - Founded by Zia Hussain & Syed Omer Shah"
      />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="PK" />
      <meta name="geo.country" content="Pakistan" />
      <meta name="geo.placename" content="Karachi, Lahore, Islamabad" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="classification" content="Software Development Agency" />
      <meta
        name="category"
        content="Technology, Software Development, Web Development, Mobile Apps"
      />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="Startups, Enterprises, Businesses" />

      {googleVerification && (
        <meta name="google-site-verification" content={googleVerification} />
      )}

      {/* Open Graph for sharing on Facebook/LinkedIn */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Zumetrix Labs" />
      <meta property="og:locale" content="en_US" />
      <meta property="article:author" content="Zia Hussain, Syed Omer Shah" />
      <meta
        property="article:publisher"
        content="https://www.linkedin.com/company/zumetrix"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Zumetrix Labs - Pakistan's #1 Software Development Agency"
      />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@zumetrixlabs" />
      <meta name="twitter:creator" content="@ziahussain, @omershah" />
      <meta
        name="twitter:image:alt"
        content="Zumetrix Labs - Software Development Agency Pakistan"
      />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#C48A64" />
      <meta name="msapplication-TileColor" content="#C48A64" />
      <meta name="apple-mobile-web-app-title" content="Zumetrix Labs" />
      <meta name="application-name" content="Zumetrix Labs" />
      <meta
        name="msapplication-tooltip"
        content="Pakistan's #1 Software Development Agency"
      />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* ✅ Google Analytics Tag */}
      {gaTagId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaTagId}`}
          ></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaTagId}');
            `}
          </script>
        </>
      )}
    </Helmet>
  );
};

export default SEO;
