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
      <SEO googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs" />

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
