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
  title = "Zumetrix Labs | #1 Software Development Agency Pakistan | SaaS MVP Experts | Zia Hussain & Omer Shah",
  description = "Zumetrix Labs is Pakistan's leading software development agency founded by expert developers Zia Hussain and Syed Omer Shah. We specialize in building world-class SaaS MVPs, React/Node.js web applications, mobile apps, AI automation workflows, and custom dashboards. Our team delivers premium, scalable solutions using React.js, Next.js, Firebase, TypeScript, and modern tech stacks. Trusted by 50+ clients globally for MVP development, no-code automations, and full-stack development services. Hire the best React/Firebase developers in Pakistan.",
  keywords = "software development agency Pakistan, SaaS MVP builder, Zumetrix Labs, Zia Hussain, Syed Omer Shah, React developer Pakistan, Node.js development, Firebase experts, web apps development, mobile apps development, AI automation services, no-code automations, custom dashboards, MVP development, hire React developers, hire Firebase developers, full stack development, TypeScript development, Next.js agency, startup MVP builder, software agency Pakistan, best developers Pakistan, React Native development, API development, database design, UI UX design Pakistan",
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
      <meta name="author" content="Zumetrix Labs - Zia Hussain & Syed Omer Shah" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="PK" />
      <meta name="geo.country" content="Pakistan" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

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
      <meta property="article:author" content="Zia Hussain" />
      <meta property="article:publisher" content="https://www.linkedin.com/company/zumetrix-labs" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@zumetrixlabs" />
      <meta name="twitter:creator" content="@ziahussain" />

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
