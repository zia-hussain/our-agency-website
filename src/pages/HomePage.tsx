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
        "name": "Zumetrix Labs",
        "url": "https://zumetrix.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zumetrix.com/zumetrix-logo.png",
          "width": 512,
          "height": 512
        },
        "description": "Pakistan's leading software development agency specializing in SaaS MVP development, React/Node.js applications, AI automation, and custom software solutions.",
        "foundingDate": "2021",
        "founders": [
          {
            "@type": "Person",
            "name": "Zia Hussain",
            "jobTitle": "Co-Founder & CEO",
            "url": "https://www.linkedin.com/in/zia-hussain",
            "sameAs": [
              "https://www.upwork.com/freelancers/ziahussain",
              "https://www.fiverr.com/ziahussain"
            ]
          },
          {
            "@type": "Person",
            "name": "Syed Omer Shah",
            "jobTitle": "Co-Founder & CTO",
            "url": "https://www.linkedin.com/in/syed-omer-shah"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "Pakistan",
          "addressRegion": "Punjab"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+92-XXX-XXXXXXX",
          "contactType": "customer service",
          "email": "hello@zumetrix.com",
          "availableLanguage": ["English", "Urdu"]
        },
        "sameAs": [
          "https://www.linkedin.com/company/zumetrix-labs",
          "https://github.com/zumetrix-labs",
          "https://www.instagram.com/zumetrixlabs"
        ],
        "serviceArea": {
          "@type": "Place",
          "name": "Worldwide"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://zumetrix.com/#website",
        "url": "https://zumetrix.com",
        "name": "Zumetrix Labs - Software Development Agency Pakistan",
        "description": "Leading software development agency in Pakistan specializing in SaaS MVP development, React/Node.js applications, and AI automation services.",
        "publisher": {
          "@id": "https://zumetrix.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://zumetrix.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "SaaS MVP Development",
        "description": "Custom SaaS MVP development using React, Node.js, Firebase, and modern tech stacks",
        "provider": {
          "@id": "https://zumetrix.com/#organization"
        },
        "serviceType": "Software Development",
        "areaServed": "Worldwide"
      },
      {
        "@type": "Service",
        "name": "React/Node.js Development",
        "description": "Full-stack web application development using React.js, Next.js, Node.js, and TypeScript",
        "provider": {
          "@id": "https://zumetrix.com/#organization"
        },
        "serviceType": "Web Development",
        "areaServed": "Worldwide"
      },
      {
        "@type": "Service",
        "name": "AI Automation Services",
        "description": "Custom AI automation workflows, no-code solutions, and intelligent business process automation",
        "provider": {
          "@id": "https://zumetrix.com/#organization"
        },
        "serviceType": "AI Automation",
        "areaServed": "Worldwide"
      }
    ]
  };

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Zumetrix Labs | #1 Software Development Agency Pakistan | SaaS MVP Experts | Zia Hussain & Omer Shah"
        description="Zumetrix Labs is Pakistan's leading software development agency founded by expert developers Zia Hussain and Syed Omer Shah. We specialize in building world-class SaaS MVPs, React/Node.js web applications, mobile apps, AI automation workflows, and custom dashboards. Hire the best React/Firebase developers in Pakistan for your next project."
        keywords="software development agency Pakistan, SaaS MVP builder, Zumetrix Labs, Zia Hussain, Syed Omer Shah, React developer Pakistan, Node.js development, Firebase experts, web apps development, mobile apps development, AI automation services, no-code automations, custom dashboards, MVP development, hire React developers, hire Firebase developers, full stack development, TypeScript development, Next.js agency, startup MVP builder"
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
