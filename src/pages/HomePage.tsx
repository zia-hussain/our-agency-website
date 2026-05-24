import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import Hero from "../components/home/Hero";
import InfiniteLogoCarousel from "../components/home/InfiniteLogoCarousel";
import TrustBand from "../components/home/TrustBand";
import ServicesPreview from "../components/home/ServicesPreview";
import SignatureMethod from "../components/home/SignatureMethod";
import FeaturedCaseStudies from "../components/home/FeaturedCaseStudies";
import FoundersStrip from "../components/home/FoundersStrip";
import TechStack from "../components/home/TechStack";
import TestimonialsCarousel from "../components/home/TestimonialsCarousel";
import LeadMagnet from "../components/home/LeadMagnet";
import FAQ from "../components/home/FAQ";
import FinalCTA from "../components/home/FinalCTA";
import AIROICalculator from "../components/home/AIROICalculator";
import { BRAND_CONTENT } from "../config/content";

const HomePage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zumetrix.com/#organization",
        name: "Zumetrix Labs",
        alternateName: "Zumetrix",
        url: "https://zumetrix.com",
        logo: {
          "@type": "ImageObject",
          contentUrl: "https://zumetrix.com/logo/Logo%20Icon.png",
        },
        slogan: BRAND_CONTENT.brand.tagline,
        description: BRAND_CONTENT.brand.shortDescription,
        foundingDate: "2021",
        founder: [
          { "@id": "https://zumetrix.com/founders/zia-hussain#person" },
          { "@id": "https://zumetrix.com/founders/syed-omer-shah#person" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "hello@zumetrix.com",
        },
        sameAs: [
          "https://www.linkedin.com/company/zumetrix-labs",
          "https://github.com/zumetrix-labs",
          "https://www.instagram.com/zumetrixlabs",
          "https://x.com/zumetrix83892",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://zumetrix.com/#website",
        url: "https://zumetrix.com",
        name: "Zumetrix Labs",
        publisher: { "@id": "https://zumetrix.com/#organization" },
      },
      {
        "@type": "Person",
        "@id": "https://zumetrix.com/founders/zia-hussain#person",
        name: "Zia Hussain",
        alternateName: "Syed Zia Hussain Shah",
        jobTitle: "Co-Founder & CEO",
        url: "https://zumetrix.com/founders/zia-hussain",
        worksFor: { "@id": "https://zumetrix.com/#organization" },
        sameAs: [
          "https://www.upwork.com/freelancers/ziahussain1",
          "https://www.fiverr.com/syedziashahgill",
          "https://www.linkedin.com/in/zia-hussain-404-/",
          "https://github.com/zia-hussain",
        ],
      },
      {
        "@type": "Person",
        "@id": "https://zumetrix.com/founders/syed-omer-shah#person",
        name: "Syed Omer Shah",
        jobTitle: "Co-Founder & CTO",
        url: "https://zumetrix.com/founders/syed-omer-shah",
        worksFor: { "@id": "https://zumetrix.com/#organization" },
        sameAs: [
          "https://www.linkedin.com/in/omer-gillani/",
          "https://github.com/UmerGillani36",
        ],
      },
    ],
  };

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Zumetrix Labs | Forge Clear Ideas Into Shipped Software | SaaS MVP, React, AI Automation"
        description="Forge Clear Ideas Into Shipped Software. Zumetrix Labs builds SaaS MVPs, mobile apps, and AI automation for founders who need thinking partners, not order-takers."
        structuredData={structuredData}
      />
      <Hero />
      <InfiniteLogoCarousel />
      <TrustBand />
      <ServicesPreview />
      <AIROICalculator />
      <SignatureMethod />
      <FeaturedCaseStudies />
      <FoundersStrip />
      <TechStack />
      <TestimonialsCarousel />
      <LeadMagnet />
      <FAQ />
      <FinalCTA />
    </PageTransition>
  );
};

export default HomePage;
