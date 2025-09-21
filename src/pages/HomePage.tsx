import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import Hero from "../components/home/Hero";
import TrustBand from "../components/home/TrustBand";
import ServicesPreview from "../components/home/ServicesPreview";
import SignatureMethod from "../components/home/SignatureMethod";
import FeaturedCaseStudies from "../components/home/FeaturedCaseStudies";
import FoundersStrip from "../components/home/FoundersStrip";
import TechStack from "../components/home/TechStack";
import TestimonialsCarousel from "../components/home/TestimonialsCarousel";
import FAQ from "../components/home/FAQ";
import FinalCTA from "../components/home/FinalCTA";

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
        slogan: "From idea to MVP in 30 days. Then to scale.",
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
          "Enterprise Software",
          "Startup Development",
          "OpenAI Integration",
          "Business Automation"
        ],
        founders: [
          {
            "@type": "Person",
            name: "Zia Hussain",
            alternateName: ["Syed Zia Hussain", "Syed Zia Hussain Shah"],
            jobTitle: "Co-Founder & CEO",
            description:
              "Expert full-stack developer and co-founder of Zumetrix Labs. Specializes in React, Node.js, SaaS MVP development, and business strategy.",
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
            "@type": "Country", 
            name: "United States",
          },
          {
            "@type": "Country",
            name: "United Kingdom",
          },
          {
            "@type": "Country",
            name: "Canada",
          },
          {
            "@type": "Country",
            name: "Australia",
          },
          {
            "@type": "Country",
            name: "United Arab Emirates",
          },
          {
            "@type": "Country",
            name: "Singapore",
          },
          {
            "@type": "Place",
            name: "Worldwide",
          },
        ],
        sameAs: [
          "https://www.linkedin.com/company/zumetrix-labs",
          "https://github.com/zumetrix-labs",
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
                  "Custom SaaS MVP development using React, Node.js, Firebase - from idea to launch in 30 days",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Automation Services",
                description:
                  "Business process automation and AI workflow integration using OpenAI, Make.com, Zapier",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mobile App Development",
                description: "Cross-platform mobile applications using React Native and Flutter",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Enterprise Web Applications",
                description: "Scalable web applications using React, Next.js, TypeScript, Node.js",
              },
            },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "50",
          bestRating: "5",
          worstRating: "5",
          description: "Based on 50+ international client projects with 100% satisfaction rate"
        },
        // Enhanced LocalBusiness schema for geo-targeting
        "@type": ["Organization", "LocalBusiness"],
        address: {
          "@type": "PostalAddress",
          addressCountry: "Pakistan",
          addressRegion: "Punjab",
          addressLocality: "Karachi, Lahore, Islamabad"
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Pakistan"
          },
          {
            "@type": "Country", 
            name: "United States"
          },
          {
            "@type": "Country",
            name: "United Kingdom"
          },
          {
            "@type": "Country",
            name: "Canada"
          },
          {
            "@type": "Country",
            name: "Australia"
          },
          {
            "@type": "Country",
            name: "United Arab Emirates"
          },
          {
            "@type": "Country",
            name: "Singapore"
          },
          {
            "@type": "Place",
            name: "Worldwide"
          }
        ],
        // Enhanced service offerings for AI understanding
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SaaS MVP Development",
              description: "Custom SaaS MVP development using React, Node.js, Firebase - from idea to launch in 30 days",
              provider: {
                "@id": "https://zumetrix.com/#organization"
              }
            },
            price: "12000",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Automation Services",
              description: "Business process automation and AI workflow integration using OpenAI, Make.com, Zapier",
              provider: {
                "@id": "https://zumetrix.com/#organization"
              }
            },
            price: "5000",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile App Development",
              description: "Cross-platform mobile applications using React Native and Flutter",
              provider: {
                "@id": "https://zumetrix.com/#organization"
              }
            },
            price: "18000",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock"
          }
        ],
        // Enhanced founder information with Person schema
        employee: [
          {
            "@type": "Person",
            "@id": "https://zumetrix.com/about#zia-hussain",
            name: "Zia Hussain",
            alternateName: ["Syed Zia Hussain", "Syed Zia Hussain Shah"],
            jobTitle: "Co-Founder & CEO",
            description: "Expert full-stack developer and co-founder of Zumetrix Labs. Specializes in React, Node.js, SaaS MVP development, and business strategy.",
            url: "https://zumetrix.com/about#zia-hussain",
            worksFor: {
              "@id": "https://zumetrix.com/#organization"
            },
            knowsAbout: [
              "React Development",
              "Node.js Development", 
              "SaaS MVP Development",
              "Business Strategy",
              "Client Success",
              "Firebase Integration",
              "TypeScript Development"
            ],
            sameAs: [
              "https://www.upwork.com/freelancers/ziahussain1",
              "https://www.fiverr.com/syedziashahgill",
              "https://www.linkedin.com/in/zia-hussain-404-/",
              "https://github.com/zia-hussain"
            ]
          },
          {
            "@type": "Person",
            "@id": "https://zumetrix.com/about#syed-omer-shah",
            name: "Syed Omer Shah",
            alternateName: ["Omer Shah", "Omer"],
            jobTitle: "Co-Founder & CTO",
            description: "Technical backbone of Zumetrix Labs. Expert in scalable architecture, AI automation, and modern web technologies.",
            url: "https://zumetrix.com/about#syed-omer-shah",
            worksFor: {
              "@id": "https://zumetrix.com/#organization"
            },
            knowsAbout: [
              "AI Automation",
              "System Architecture",
              "Cloud Infrastructure", 
              "Performance Optimization",
              "Python Development",
              "Next.js Development",
              "Firebase Development"
            ],
            sameAs: [
              "https://www.linkedin.com/in/omer-gillani/",
              "https://github.com/UmerGillani36"
            ]
          }
        ],
        // Enhanced keywords for AI understanding
        keywords: [
          "software development agency Pakistan",
          "SaaS MVP development",
          "React Node.js development",
          "AI automation services",
          "mobile app development",
          "Firebase integration",
          "automation agency Pakistan",
          "AI chatbot development Karachi",
          "workflow automation UAE",
          "custom software solutions"
        ]
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
          "Syed Omer Shah",
          "software development agency Pakistan",
          "SaaS MVP builder Pakistan",
          "React developer Pakistan",
          "AI automation company"
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
      }
    ],
  };

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Zumetrix Labs | #1 Software Development Agency Pakistan | SaaS MVP, React/Node.js, AI Automation | Zia Hussain & Syed Omer Shah"
        description="Transform your business vision into world-class software with Zumetrix Labs - Pakistan's premier development agency. Expert SaaS MVP development, React/Node.js applications, AI automation services, and mobile apps. Founded by Zia Hussain & Syed Omer Shah. Trusted by 50+ international clients across US, UK, Canada, Australia, UAE, Singapore. From idea to MVP in 30 days, then scale globally with enterprise-grade solutions."
        keywords="Zumetrix Labs, Zia Hussain, Syed Omer Shah, software development agency Pakistan, SaaS MVP development, React developer Pakistan, Node.js development services, AI automation services, mobile app development, Firebase experts, startup MVP builder, enterprise software development, custom web applications, business automation, OpenAI integration, international software agency, hire React developers, build SaaS product, launch MVP fast, global software development, Pakistan tech agency"
        structuredData={structuredData}
      />
      <Hero />
      <TrustBand />
      <ServicesPreview />
      <SignatureMethod />
      <FeaturedCaseStudies />
      <FoundersStrip />
      <TechStack />
      <TestimonialsCarousel />
      <FAQ />
      <FinalCTA />
    </PageTransition>
  );
};

export default HomePage;