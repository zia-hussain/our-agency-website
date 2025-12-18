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
          "Zumetrix Labs builds software for founders who need thinking partners, not order-takers. Founded by developers Zia Hussain and Syed Omer Shah. 50+ projects delivered with Top Rated status on Upwork. Specializing in SaaS MVP development, React/Node.js applications, AI automation, and mobile apps.",
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
        employee: [
          {
            "@type": "Person",
            "@id": "https://zumetrix.com/about#zia-hussain",
            name: "Zia Hussain",
            alternateName: ["Syed Zia Hussain", "Syed Zia Hussain Shah"],
            jobTitle: "Co-Founder & CEO",
            description: "Zia leads product and growth at Zumetrix Labs. He works at the intersection of founders, users, and engineering—turning messy ideas into clear roadmaps and shipped products. Top Rated on Upwork with 100% Job Success Score. Specializes in React, Node.js, SaaS MVP development, and business strategy.",
            url: "https://zumetrix.com/about#zia-hussain",
            worksFor: {
              "@id": "https://zumetrix.com/#organization"
            },
            knowsAbout: [
              "React Development",
              "Node.js Development", 
              "SaaS MVP Development",
              "TypeScript Development",
              "Firebase Integration",
              "Stripe Payment Integration",
              "Enterprise Web Applications",
              "Startup MVP Strategy",
              "Business Strategy",
              "Client Success",
              "International Software Development",
              "Full Stack Development",
              "Software Architecture",
              "Project Management",
              "Digital Product Strategy"
            ],
            hasOccupation: {
              "@type": "Occupation",
              name: "Software Development Expert",
              occupationLocation: {
                "@type": "Place",
                name: "Worldwide"
              },
              skills: "React, Node.js, TypeScript, Firebase, SaaS Development, Business Strategy"
            },
            award: [
              "100% Client Satisfaction Rate",
              "30+ Successful MVP Launches",
              "Expert React/Node.js Developer Recognition"
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
            description: "Omer leads engineering and automation at Zumetrix Labs. He takes complex requirements and constraints, turning them into systems that are fast, reliable, and built to scale. Specializes in architecture, AI workflows, Python, cloud infrastructure, and maintainable code.",
            url: "https://zumetrix.com/about#syed-omer-shah",
            worksFor: {
              "@id": "https://zumetrix.com/#organization"
            },
            knowsAbout: [
              "AI Automation",
              "OpenAI Integration",
              "Machine Learning Implementation",
              "Python Development",
              "Cloud Architecture",
              "AWS Infrastructure",
              "Database Optimization",
              "API Development",
              "DevOps Engineering",
              "System Architecture",
              "Cloud Infrastructure", 
              "Performance Optimization",
              "Next.js Development",
              "Firebase Development",
              "Scalable Web Applications",
              "Enterprise Software Architecture"
            ],
            hasOccupation: {
              "@type": "Occupation",
              name: "Chief Technology Officer & AI Automation Expert",
              occupationLocation: {
                "@type": "Place",
                name: "Worldwide"
              },
              skills: "AI Automation, System Architecture, Python, Cloud Infrastructure, Performance Optimization"
            },
            award: [
              "Systems Serving 100K+ Users",
              "AI Automation Expert Recognition",
              "Scalable Architecture Specialist"
            ],
            sameAs: [
              "https://www.linkedin.com/in/omer-gillani/",
              "https://github.com/UmerGillani36"
            ]
          }
        ],
        keywords: [
          "software development agency",
          "SaaS MVP development",
          "React development services",
          "mobile app development",
          "AI automation services",
          "startup MVP builder"
        ],
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
        title="Zumetrix Labs | Software Development for Founders | SaaS MVP, React, AI Automation | Top Rated"
        description="We build software for founders who need thinking partners, not order-takers. 50+ projects delivered. Top Rated on Upwork with 100% Job Success Score. SaaS MVPs, mobile apps, AI automation. Founded by Zia Hussain & Syed Omer Shah."
        keywords="software development agency, SaaS MVP development, React development, mobile app development, AI automation, startup MVP"
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