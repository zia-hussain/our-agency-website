import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Services from "../components/home/Services";
import Portfolio from "../components/home/Portfolio";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";

const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Zumetrix Labs | Premium Web & App Development Agency | SaaS MVP Experts | Pakistan"
        description="Zumetrix Labs is a premium web and app development agency in Pakistan, specializing in SaaS MVPs, custom dashboards, and full-stack applications. We transform your ideas into powerful software solutions."
        keywords="Zumetrix, Zumetrix Labs, metrix, zumetrixlab, Syed Zia Hussain Shah, Syed Omer Shah, Web Development Pakistan, Software Agency Pakistan, React Developer, Full Stack Developer, MVP Builder, SaaS Development, Dashboard Experts, Mobile App Development, Node.js Agency, Firebase Experts, Top Freelance Developers, Build Startup App, Custom Software Services, Pakistani Developers, Best Development Agency, Hire React Developer, Hire SaaS MVP Developer, Freelance Team, App Design Agency"
      />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
    </PageTransition>
  );
};

export default HomePage;
