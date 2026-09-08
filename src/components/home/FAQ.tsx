import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import FAQAccordion from "../common/FAQAccordion";
import SectionEyebrow from "../common/SectionEyebrow";
import { homeFAQs } from "../../data/faqs/home";

// Home's own purpose and copy — pricing, ownership, timelines, what it's like
// to work with us directly — kept exactly as before. What changed is the
// language it's built in: the same eyebrow + two-tone sentence + vertical
// thread + FAQAccordion system now anchored on Services, instead of the
// gradient headline, pill badge, and bordered glass cards this section used
// to carry on its own. Shared interaction DNA, not a copy of Services' page.
const FAQ: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_18%,rgba(196,138,100,0.06),transparent_70%)]"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <SectionEyebrow className="mb-6">FAQ</SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.25]">
            <span className="text-muted-foreground/50">Before you reach out,</span>{" "}
            <span className="text-foreground">here's what we get asked most.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Pricing, ownership, timelines, and what it's like to work with Zia and Omer directly.
          </p>
        </AnimatedSection>

        <div className="flex justify-center my-10 sm:my-12" aria-hidden="true">
          <span className="w-px h-10 sm:h-12 bg-gradient-to-b from-primary/40 to-transparent" />
        </div>

        <AnimatedSection delay={0.06}>
          <FAQAccordion items={homeFAQs} idPrefix="home-faq" />
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="text-center mt-14 sm:mt-16">
          <p className="text-sm text-muted-foreground mb-5">
            Still have questions? We'd love to help.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full border border-primary/30 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
          >
            Contact us today
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              <ArrowRight size={11} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
            </span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQ;
