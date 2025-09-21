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
  title = "Zumetrix Labs | World-Class Software Development Agency | Zia Hussain & Syed Omer Shah | Global SaaS MVP Experts",
  description = "Zumetrix Labs is the world's premier software development agency founded by expert developers Zia Hussain and Syed Omer Shah. We specialize in enterprise-grade SaaS MVP development, React/Node.js applications, AI automation services, mobile app development, Firebase integration, and custom software solutions for global markets. Trusted by 50+ international clients across US, UK, Canada, Australia, UAE, Singapore for world-class enterprise software, startup MVPs, AI automation, and full-stack development services.",
  keywords = "Zumetrix Labs, Zumetrix, Zometrix Labs, Zumetrix Agency, Zia Hussain, Syed Zia Hussain Shah, Syed Omer Shah, software development agency, international software development, global software agency, enterprise software development, world class software development, premium software agency, expert software developers, SaaS MVP development, SaaS MVP builder, startup MVP development, enterprise SaaS development, custom SaaS development, SaaS product development, MVP development agency, React development services, React development agency, expert React developers, hire React developers, React TypeScript development, Node.js development, Node.js development services, Node.js backend development, full stack development, JavaScript development services, TypeScript development services, Firebase development services, Firebase experts, Firebase integration services, Firestore development, Firebase authentication, AI automation services, AI automation agency, business automation services, workflow automation services, process automation, intelligent automation, OpenAI integration services, ChatGPT integration, AI chatbot development, custom AI solutions, AI workflow automation, mobile app development, mobile app development services, cross platform app development, React Native development, React Native app development, Flutter app development, iOS app development, Android app development, custom mobile apps, custom software solutions, custom software development, bespoke software development, enterprise software solutions, web development company, web development agency, web application development, progressive web apps, PWA development, startup development services, enterprise web applications, no-code automation, Zapier automation, Make.com automation, n8n automation, business process optimization, digital transformation, cloud migration services, API development, database development, DevOps services, technical consulting, software architecture, scalable software solutions, high performance applications, secure software development, SaaS development company, software development experts, top software developers, best software agency, premium development services, world class developers, international software team, remote development team, offshore development, software development outsourcing, technology consulting, digital innovation, software modernization",
  image = "https://zumetrix.com/Zumetrix_Labs_Logo (5).png",
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
        content="Zumetrix Labs - World-Class Software Development Agency Founded by Expert Developers Zia Hussain & Syed Omer Shah"
      />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="slurp" content="index, follow" />
      <meta name="duckduckbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="WORLDWIDE" />
      <meta name="geo.country" content="GLOBAL" />
      <meta
        name="category"
        content="Technology, Software Development, Web Development, Mobile Apps, AI Automation, SaaS Development, Enterprise Software"
      />
      <meta name="coverage" content="Global" />
      <meta name="target" content="Startups, Enterprises, International Businesses, Global Markets" />
      <meta name="audience" content="Software Development Clients, Startup Founders, Enterprise Decision Makers, Technology Leaders" />
      <meta name="subject" content="Software Development, SaaS MVP Development, AI Automation, React Development, Node.js Development" />
      
      {/* BEAST MODE: Enhanced Dublin Core metadata for better content classification */}
      <meta name="DC.title" content={title} />
      <meta name="DC.creator" content="Zia Hussain (CEO), Syed Omer Shah (CTO), Zumetrix Labs" />
      <meta name="DC.subject" content="Software Development, SaaS MVP Development, AI Automation, React Development, Node.js Development, Enterprise Software" />
      <meta name="DC.description" content={description} />
      <meta name="DC.publisher" content="Zumetrix Labs" />
      <meta name="DC.contributor" content="Zumetrix Labs Expert Development Team" />
      <meta name="DC.date" content={new Date().toISOString().split('T')[0]} />
      <meta name="DC.type" content="Text" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content={url} />
      <meta name="DC.language" content="en" />
      <meta name="DC.coverage" content="Global, International Markets" />
      <meta name="DC.rights" content="Copyright Zumetrix Labs - World-Class Software Development Agency" />

      {/* BEAST MODE: Advanced meta tags for AI engines and entity recognition */}
      <meta name="entity" content="Zumetrix Labs" />
      <meta name="entity.type" content="Software Development Agency" />
      <meta name="entity.founders" content="Zia Hussain, Syed Omer Shah" />
      <meta name="entity.services" content="SaaS MVP Development, AI Automation, React Development, Mobile App Development" />
      <meta name="entity.expertise" content="React, Node.js, TypeScript, Firebase, AI Automation, OpenAI Integration" />
      <meta name="entity.markets" content="Global, International, US, UK, Canada, Australia, UAE, Singapore, Europe" />
      <meta name="business.type" content="B2B Software Development Agency" />
      <meta name="business.model" content="Custom Software Development, SaaS MVP Building, AI Automation Services" />
      <meta name="expertise.level" content="Expert, Senior, World-Class" />
      <meta name="service.delivery" content="Remote, Global, International" />
      <meta name="quality.rating" content="5.0/5.0" />
      <meta name="client.satisfaction" content="100%" />
      <meta name="projects.completed" content="50+" />
      <meta name="experience.years" content="6+" />

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
      <meta property="article:author" content="Zia Hussain (CEO), Syed Omer Shah (CTO)" />
      <meta
        property="article:publisher"
        content="https://www.linkedin.com/company/zumetrix-labs"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Zumetrix Labs - World-Class Software Development Agency Founded by Expert Developers Zia Hussain & Syed Omer Shah"
      />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@zumetrix83892" />
      <meta name="twitter:creator" content="@zumetrix83892" />
      <meta
        name="twitter:image:alt"
        content="Zumetrix Labs - World-Class Software Development Agency"
      />

      {/* BEAST MODE: Enhanced SEO Meta Tags for global recognition */}
      <meta name="theme-color" content="#C48A64" />
      <meta name="msapplication-TileColor" content="#C48A64" />
      <meta name="apple-mobile-web-app-title" content="Zumetrix Labs" />
      <meta name="application-name" content="Zumetrix Labs" />
      <meta
        name="msapplication-tooltip"
        content="World-Class Software Development Agency - Zumetrix Labs"
      />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      
      {/* BEAST MODE: Additional meta tags for comprehensive AI understanding */}
      <meta name="rating" content="5.0" />
      <meta name="distribution" content="global" />
      <meta name="resource-type" content="document" />
      <meta name="classification" content="Software Development Agency" />
      <meta name="owner" content="Zumetrix Labs" />
      <meta name="copyright" content="Zumetrix Labs" />
      <meta name="designer" content="Zumetrix Labs" />
      <meta name="reply-to" content="hello@zumetrix.com" />
      <meta name="url" content={url} />
      <meta name="identifier-URL" content={url} />
      <meta name="directory" content="submission" />
      <meta name="pagename" content={title} />
      <meta name="category" content="Software Development, Technology Services" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />

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
