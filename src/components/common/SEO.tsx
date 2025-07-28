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
}

const SEO: React.FC<SEOProps> = ({
  title = "Zumetrix Labs | Premium Web & App Development Agency | SaaS MVP Experts | Pakistan",
  description = "Zumetrix Labs is a full-stack software development agency led by Syed Zia Hussain Shah and Syed Omer Shah. We specialize in building world-class web applications, mobile apps, custom SaaS dashboards, and MVPs for startups and businesses worldwide. Whether you're launching a new product or scaling your platform, our team delivers premium, scalable, and modern solutions using React.js, Node.js, Next.js, React Native, Firebase, and more. Trusted by clients across Europe, USA, and the Middle East.",
  keywords = "Zumetrix, Zumetrix Labs, metrix, zumetrixlab, Syed Zia Hussain Shah, Syed Omer Shah, Web Development Pakistan, Software Agency Pakistan, React Developer, Full Stack Developer, MVP Builder, SaaS Development, Dashboard Experts, Mobile App Development, Node.js Agency, Firebase Experts, Top Freelance Developers, Build Startup App, Custom Software Services, Pakistani Developers, Best Development Agency, Hire React Developer, Hire SaaS MVP Developer, Freelance Team, App Design Agency",
  image = "https://zumetrix.com/og-image.jpg",
  url = "https://zumetrix.com",
  type = "website",
  googleVerification,
  gaTagId,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {googleVerification && (
        <meta name="google-site-verification" content={googleVerification} />
      )}

      {/* Open Graph for sharing on Facebook/LinkedIn */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Extra SEO tags */}
      <meta
        name="author"
        content="Zumetrix Labs - Syed Zia Hussain Shah & Syed Omer Shah"
      />
      <meta name="robots" content="index, follow" />

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
