import React from "react";
import AnimatedSection from "../../../components/common/AnimatedSection";
import SectionEyebrow from "../../../components/common/SectionEyebrow";

// Brief Section 7: the real objections answered on the page itself, not
// buried in an accordion — a visitor shouldn't have to click to find out
// why this isn't just a PRD. Distinct visual treatment from the FAQ
// section later (stacked, always-visible, not collapsed) so the two don't
// read as the same component twice (2026-10-01 commercial experience pass).
const ITEMS = [
  {
    q: "Why can't I just give my developer a feature list?",
    a: "A feature list is a wishlist, not a decision. It doesn't say what the list needs to prove, who it's really for, or what should wait — which is exactly what makes early development guesswork expensive.",
  },
  {
    q: "Isn't this just a PRD?",
    a: "A PRD documents everything a product could have. This sprint decides what your first version needs to prove and cuts the rest on purpose — it's short because most of what's excluded doesn't belong yet, not because we ran out of time.",
  },
  {
    q: "Why pay $950 before paying someone to build?",
    a: "Because the $950 decision is cheap to get wrong and expensive to skip. A misjudged V1 costs weeks of development, not a conversation.",
  },
  {
    q: "What will I actually receive, and can another developer use it?",
    a: "A Build-Ready V1 Brief: proof target, critical journey, what's in V1, what waits, and a build sequence. It's written to be handed to any competent team — yours, another one, or us.",
  },
  {
    q: "What if the idea changes later?",
    a: "It probably will, a little — that's normal. The Brief isn't a contract, it's the clearest starting boundary we can responsibly give you today.",
  },
];

const AnsweredDirectly: React.FC = () => (
  <section className="py-24 sm:py-28">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <SectionEyebrow className="mb-6">Before You Ask</SectionEyebrow>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          The questions worth answering here, not buried in an FAQ.
        </h2>
      </AnimatedSection>

      <div className="space-y-5">
        {ITEMS.map((item, i) => (
          <AnimatedSection key={item.q} delay={i * 0.04}>
            <div className="rounded-2xl border border-border/50 bg-card/10 p-6 sm:p-7">
              <p className="mb-2.5 text-base font-bold text-foreground leading-snug">{item.q}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default AnsweredDirectly;
