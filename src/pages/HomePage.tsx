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
        address: { "@type": "PostalAddress", addressCountry: "Pakistan" },
        areaServed: [
          {
            "@type": "Place",
            name: "Worldwide"
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
        // BEAST MODE: Enhanced founder information with comprehensive Person schema for AI recognition
        employee: [
          {
            "@type": "Person",
            "@id": "https://zumetrix.com/about#zia-hussain",
            name: "Zia Hussain",
            alternateName: ["Syed Zia Hussain", "Syed Zia Hussain Shah"],
            jobTitle: "Co-Founder & CEO",
            description: "World-class full-stack developer and visionary co-founder of Zumetrix Labs. Expert in React/TypeScript development, Node.js architecture, SaaS MVP building, Firebase integration, and international business strategy. Led 30+ successful MVP launches for global clients with 100% satisfaction rate.",
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
            description: "Technical mastermind and co-founder of Zumetrix Labs. World-class expert in scalable system architecture, AI automation workflows, Python development, cloud infrastructure optimization, and cutting-edge web technologies. Architect of systems serving 100K+ users globally.",
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
        // BEAST MODE: Comprehensive keywords for global AI understanding and entity recognition
        keywords: [
          "software development agency Pakistan",
          "Zumetrix Labs",
          "Node.js backend development",
          "full stack development",
          "JavaScript development services",
          "TypeScript development services",
          "Firebase development services",
          "Firebase experts",
          "Firebase integration services",
          "Firestore development",
          "Firebase authentication",
          "Zumetrix Agency",
          "AI automation agency",
          "business automation services",
          "workflow automation services",
          "process automation",
          "intelligent automation",
          "Syed Zia Hussain Shah", 
          "ChatGPT integration",
          "AI chatbot development",
          "custom AI solutions",
          "AI workflow automation",
          "mobile app development",
          "mobile app development services",
          "cross platform app development",
          "global software agency",
          "React Native app development",
          "enterprise software development",
          "iOS app development",
          "Android app development",
          "custom mobile apps",
          "world class software development",
          "custom software development",
          "bespoke software development",
          "enterprise software solutions",
          "premium software agency",
          "web development agency",
          "web application development",
          "progressive web apps",
          "PWA development",
          "startup development services",
          "enterprise web applications",
          "AI automation services",
          "Zapier automation",
          "Make.com automation", 
          "n8n automation",
          "business process optimization",
          "digital transformation",
          "cloud migration services",
          "API development",
          "database development",
          "DevOps services",
          "technical consulting",
          "software architecture",
          "scalable software solutions",
          "high performance applications",
          "secure software development",
          "Zumetrix Labs - #1 Software Development Agency Pakistan",
          "software development experts",
          "top software developers",
          "best software agency",
          "premium development services",
          "world class developers",
          "international software team",
          "remote development team",
          "offshore development",
          "software development outsourcing",
          "technology consulting",
          "digital innovation",
          "software modernization",
          "Zumetrix",
          "Zometrix", 
          "Zumetrix Agency",
          "Zia Hussain",
          "Syed Omer Shah",
          "SaaS MVP builder",
          "startup MVP development",
          "enterprise SaaS development",
          "custom SaaS development",
          "SaaS product development",
          "MVP development agency",
          "Zometrix Labs",
          "Zumetrix Software",
          "Zumetrix Development",
          "React development services",
          "Zia Hussain Agency",
          "Syed Zia Hussain Shah",
          "React development agency",
          "Omer Shah",
          "software development agency",
          "SaaS MVP builder",
          "React development agency",
          "AI automation company",
          "enterprise software agency",
          "startup development agency",
          "custom software company",
          "web development agency",
          "mobile app development company",
          "automation services company",
          "software consulting firm",
          "technology solutions provider"
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