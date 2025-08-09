import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Services from "../components/home/Services";
import Portfolio from "../components/home/Portfolio";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
import FAQ from "../components/home/FAQ";

const HomePage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zumetrix.com/#organization",
        name: "Zumetrix Labs",
        alternateName: ["Zumetrix", "Zometrix", "Zumetrix Agency"],
        url: "https://zumetrix.com",
        logo: {
          "@type": "ImageObject",
          url: "https://zumetrix.com/Zumetrix_Labs_Logo (5).png",
          width: 512,
          height: 512,
        },
        description:
          "Pakistan's #1 software development agency specializing in SaaS MVP development, React/Node.js applications, AI automation services, mobile app development, and custom software solutions. Founded by expert developers Zia Hussain and Syed Omer Shah.",
        foundingDate: "2021",
        slogan: "We build world-class software solutions",
        knowsAbout: [
          "Software Development",
          "SaaS MVP Development",
          "React Development",
          "Node.js Development",
          "Firebase Integration",
          "AI Automation",
          "Mobile App Development",
          "Web Development",
          "No-Code Automation",
          "Custom Software Solutions",
        ],
        founders: [
          {
            "@type": "Person",
            name: "Zia Hussain",
            alternateName: ["Syed Zia Hussain", "Syed Zia Hussain Shah"],
            jobTitle: "Co-Founder & CEO",
            description:
              "Expert full-stack developer and co-founder of Zumetrix Labs. Specializes in React, Node.js, and business strategy.",
            url: "https://zumetrix.com/about#zia-hussain",
            sameAs: [
              "https://www.upwork.com/freelancers/ziahussain1",
              "https://www.fiverr.com/syedziashahgill",
              "https://www.linkedin.com/in/zia-hussain-404-/",
              "https://github.com/zia-hussain",
            ],
          },
          {
            "@type": "Person",
            name: "Syed Omer Shah",
            alternateName: ["Omer Shah", "Omer"],
            jobTitle: "Co-Founder & CTO",
            description:
              "Technical backbone of Zumetrix Labs. Expert in scalable architecture, AI automation, and modern web technologies.",
            url: "https://zumetrix.com/about#syed-omer-shah",
            sameAs: [
              "https://www.linkedin.com/in/omer-gillani/",
              "https://github.com/UmerGillani36",
            ],
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressCountry: "Pakistan",
          addressRegion: "Punjab",
          addressLocality: "Karachi, Lahore, Islamabad",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+92-XXX-XXXXXXX",
          contactType: "customer service",
          email: "hello@zumetrix.com",
          availableLanguage: ["English", "Urdu"],
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Pakistan",
          },
          {
            "@type": "Place",
            name: "Worldwide",
          },
        ],
        sameAs: [
          "https://www.linkedin.com/company/zumetrix",
          "https://github.com/zumetrix",
          "https://www.instagram.com/zumetrixlabs",
          "https://x.com/zumetrix83892",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "SaaS MVP Development",
                description:
                  "Custom SaaS MVP development using React, Node.js, Firebase",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mobile App Development",
                description: "Native and cross-platform mobile applications",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Automation Services",
                description:
                  "Business process automation and AI workflow integration",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://zumetrix.com/#website",
        url: "https://zumetrix.com",
        name: "Zumetrix Labs - #1 Software Development Agency Pakistan",
        alternateName: [
          "Zumetrix",
          "Zometrix",
          "Zumetrix Agency",
          "Zia Hussain",
          "Zia Hussain Shah",
          "Syed Zia Hussain",
          "Syed Zia Hussain Shah",
          "Founder of Zumetrix",
          "Co-Founder of Zumetrix",
          "Syed Omer Shah",
          "Metrix",
          "Zumetrix Labs",
          "Zumetrix Software Development",
          "Zumetrix Agency",
          "Zumetrix Pakistan",
          "Zumetrix Labs Software Development",
          "Zumetrix Labs Agency",
          "Zumetrix Labs Pakistan",
          "Zumetrix Labs Software Development Agency",
          "Zumetrix Labs Software Development Company",
          "Zumetrix Labs Software Development Company Lahore",
          "Zumetrix Labs Software Development Agency Islamabad",
          "AI Automation",
          "No-Code Automation",
          "Mobile App Development",
          "Web Development",
          "Custom Software Solutions",
          "React Development",
          "Node.js Development",
          "Firebase Integration",
          "SaaS MVP Development",
          "Zumetrix Labs Software Development Agency Pakistan",
          "Zumetrix Labs Software Development Company Pakistan",
          "Zumetrix Labs Software Development Company Islamabad",
          "Zumetrix Labs Software Development Agency Karachi",
          "Zumetrix Labs Software Development Company Karachi",
          "Zumetrix Labs Software Development Agency Lahore",
          "Zumetrix",
          "Zumetrix Labs",
          "Zometrix",
          "Zia Hussain",
          "Syed Zia Hussain Shah",
          "Syed Omer Shah",
          "software development agency Pakistan",
          "SaaS MVP builder Pakistan",
          "React developer Pakistan",
          "Node.js agency Pakistan",
          "Firebase expert Pakistan",
          "AI automation company",
          "mobile app developers Pakistan",
          "web development company Pakistan",
          "custom software agency",
          "top software developers Pakistan",
          "hire React developer",
          "hire Node developer",
          "build SaaS product",
          "launch MVP fast",
          "agency for startup",
          "Karachi software developers",
          "Lahore tech agency",
          "Pakistan web development",
        ],
        description:
          "Pakistan's leading software development agency specializing in SaaS MVP development, React/Node.js applications, AI automation services, and mobile app development. Founded by Zia Hussain and Syed Omer Shah.",
        publisher: {
          "@id": "https://zumetrix.com/#organization",
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://zumetrix.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
      {
        "@type": "Service",
        name: "Software Development Services",
        description:
          "Comprehensive software development services including SaaS MVP development, mobile apps, web applications, AI automation, and custom software solutions",
        provider: {
          "@id": "https://zumetrix.com/#organization",
        },
        serviceType: [
          "Software Development",
          "Web Development",
          "Mobile App Development",
          "AI Automation",
        ],
        areaServed: ["Pakistan", "Worldwide"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "SaaS MVP Development",
                description:
                  "Rapid SaaS MVP development using React, Node.js, Firebase",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mobile App Development",
                description:
                  "iOS and Android app development with React Native and Flutter",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Automation Services",
                description:
                  "Business automation with AI, no-code tools, and workflow optimization",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What services does Zumetrix Labs provide?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Zumetrix Labs provides comprehensive software development services including SaaS MVP development, mobile app development, web applications, AI automation services, custom dashboards, React/Node.js development, Firebase integration, and no-code automation solutions.",
            },
          },
          {
            "@type": "Question",
            name: "Who founded Zumetrix Labs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Zumetrix Labs was founded by expert developers Zia Hussain (Co-Founder & CEO) and Syed Omer Shah (Co-Founder & CTO). Both are experienced full-stack developers specializing in modern web technologies and business automation.",
            },
          },
          {
            "@type": "Question",
            name: "Does Zumetrix build SaaS MVPs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! SaaS MVP development is one of our core specialties. We help startups validate their ideas quickly using React, Node.js, Firebase, and modern tech stacks. We've helped clients secure funding and launch successful products.",
            },
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        name: "Zumetrix Labs",
        image: "https://zumetrix.com/Zumetrix_Labs_Logo (5).png",
        address: {
          "@type": "PostalAddress",
          addressCountry: "Pakistan",
          addressRegion: "Punjab",
        },
        telephone: "+92-XXX-XXXXXXX",
        email: "hello@zumetrix.com",
        url: "https://zumetrix.com",
        priceRange: "$$",
        openingHours: "Mo-Fr 09:00-18:00",
      },
      {
        "@type": "TechArticle",
        headline: "Pakistan's Leading Software Development Agency",
        description:
          "Learn about Zumetrix Labs, Pakistan's premier software development agency founded by Zia Hussain and Syed Omer Shah.",
        author: {
          "@type": "Organization",
          "@id": "https://zumetrix.com/#organization",
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://zumetrix.com/#organization",
        },
        datePublished: "2021-01-01",
        dateModified: "2025-01-21",
      },
    ],
  };

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Zumetrix Labs | #1 Software Development Agency Pakistan | Zia Hussain & Syed Omer Shah | SaaS MVP Experts"
        description="Zumetrix Labs is Pakistan's top software development agency founded by expert developers Zia Hussain and Syed Omer Shah. We specialize in SaaS MVP development, React/Node.js applications, AI automation services, mobile app development, Firebase integration, and custom software solutions. Hire the best React developers, Node.js experts, and Firebase specialists in Pakistan."
        keywords="Zumetrix, Zumetrix Labs, Zometrix, Zia Hussain, Syed Zia Hussain Shah, Syed Omer Shah, software development agency Pakistan, SaaS MVP builder Pakistan, React developer Pakistan, Node.js agency Pakistan, Firebase expert Pakistan, AI automation company, mobile app developers Pakistan, web development company Pakistan, custom software agency, top software developers Pakistan, hire React developer, hire Node developer, build SaaS product, launch MVP fast, agency for startup, Karachi software developers, Lahore tech agency, Pakistan web development"
        structuredData={structuredData}
      />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <CTA />
    </PageTransition>
  );
};

export default HomePage;
