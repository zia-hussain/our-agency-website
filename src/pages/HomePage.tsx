import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import Hero from "../components/home/Hero";
import BrandFilmMoment from "../components/home/BrandFilmMoment";
import TrustTicker from "../components/home/TrustTicker";
import ServicesPreview from "../components/home/ServicesPreview";
import FeaturedCaseStudies from "../components/home/FeaturedCaseStudies";
import FoundersStrip from "../components/home/FoundersStrip";
import TechStack from "../components/home/TechStack";
import ClientProofFilm from "../components/home/ClientProofFilm";
import FAQ from "../components/home/FAQ";
import FinalCTA from "../components/home/FinalCTA";
import SectionDivider from "../components/common/SectionDivider";
import { BRAND_CONTENT } from "../config/content";
import { SITE_CONFIG } from "../config/site";
import { TESTIMONIAL_FILMS } from "../data/testimonialFilms";
import { buildVideoObjectSchema } from "../utils/videoSchema";

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
        foundingDate: "2025-06",
        founder: [
          { "@id": "https://zumetrix.com/founders/zia-hussain#person" },
          { "@id": "https://zumetrix.com/founders/omer-gillani#person" },
        ],
        address: {
          "@type": "PostalAddress",
          addressCountry: "Pakistan",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "hello@zumetrix.com",
          telephone: SITE_CONFIG.company.phone,
        },
        sameAs: [
          "https://www.linkedin.com/company/zumetrix-labs",
          "https://github.com/zumetrix-labs",
          "https://www.instagram.com/zumetrixlabs",
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
        "@id": "https://zumetrix.com/founders/omer-gillani#person",
        name: "Omer Gillani",
        alternateName: "Syed Omer Shah Gillani",
        jobTitle: "Co-Founder & CTO",
        url: "https://zumetrix.com/founders/omer-gillani",
        worksFor: { "@id": "https://zumetrix.com/#organization" },
        sameAs: [
          "https://www.linkedin.com/in/omer-gillani/",
          "https://github.com/UmerGillani36",
        ],
      },
      ...Object.values(TESTIMONIAL_FILMS).map(buildVideoObjectSchema),
      // The combined-client brand film — same four people already listed
      // individually above, cut together with a Zumetrix intro card.
      // uploadDate is the real date this file was added to the repo;
      // duration is measured via ffprobe against the delivered file, not
      // estimated (same discipline as every entry in testimonialFilms.ts).
      buildVideoObjectSchema({
        id: "brand-film",
        name: "Josh, Reema, Sarah & Krystof",
        role: "",
        context: "Four Zumetrix clients — Josh Nyce, Reema, Sarah, and Krystof — in their own words.",
        src: "/videos/zumetrix-brand-film.mp4",
        poster: "/images/video-posters/zumetrix-brand-film-poster.jpg",
        captionsSrc: "/captions/zumetrix-brand-film.vtt",
        uploadDate: "2026-10-05",
        duration: "PT1M11S",
      }),
    ],
  };

  return (
    <PageTransition>
      <SEO
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title={BRAND_CONTENT.meta.home.title}
        description={BRAND_CONTENT.meta.home.description}
        image="https://zumetrix.com/og/page-home.png"
        structuredData={structuredData}
      />
      <Hero />
      <div className="performance-defer"><BrandFilmMoment /></div>
      <div className="performance-defer"><TrustTicker /></div>
      <SectionDivider />
      <div className="performance-defer"><ServicesPreview /></div>
      <SectionDivider />
      <div className="performance-defer"><FeaturedCaseStudies /></div>
      <SectionDivider />
      <div className="performance-defer"><FoundersStrip /></div>
      <SectionDivider />
      <div className="performance-defer"><ClientProofFilm /></div>
      <SectionDivider />
      <div className="performance-defer"><TechStack /></div>
      <SectionDivider />
      {/* Phase 1 (2026-10-20): the AI ROI calculator and the 30-Day MVP
          Blueprint download were unfeatured from the homepage. The
          calculator's default output ("1820% ROI") contradicted the site's
          own "no invented hours-saved figure" promise and its Calculate
          button fired GA4 `generate_lead`, polluting the lead metric; no
          accessible evidence showed either surface producing qualified
          conversations. Components are kept (not deleted) so either can be
          restored by a one-line revert if Airtable/GA4 history says
          otherwise. /downloads/30-day-saas-mvp-blueprint.pdf still resolves. */}
      <div className="performance-defer"><FAQ /></div>
      <SectionDivider />
      <div className="performance-defer"><FinalCTA /></div>
    </PageTransition>
  );
};

export default HomePage;
