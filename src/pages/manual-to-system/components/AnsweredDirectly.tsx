import React from "react";
import AnimatedSection from "../../../components/common/AnimatedSection";
import SectionEyebrow from "../../../components/common/SectionEyebrow";

// Brief Section 11: the real objections, answered on the page — a visitor
// shouldn't have to click an accordion to find out why this isn't "just
// use Zapier." Distinct visual treatment from the FAQ section later
// (2026-10-01 commercial experience pass).
const ITEMS = [
  {
    q: "Why don't I just use Zapier or n8n myself?",
    a: "Those tools execute automations well. They don't tell you which steps deserve automating, which should be removed instead, or which should stay human — that's a system decision, not a tool choice.",
  },
  {
    q: "Why not just ask ChatGPT to design the automation?",
    a: "A generic prompt doesn't know your tools, your exceptions, or which steps are actually judgment calls. It'll happily automate something that should have been removed.",
  },
  {
    q: "Why not automate everything while you're at it?",
    a: "Because some of it shouldn't exist, and some of it genuinely needs a person. Automating a step that should've been removed just makes the mess run faster.",
  },
  {
    q: "Why pay $750 for a plan before any implementation?",
    a: "Because implementing the wrong automation costs more than the plan — and \"automate everything\" is usually the wrong automation.",
  },
  {
    q: "What do I actually receive, and can my team implement it?",
    a: "A Workflow System Plan: current reality, what to remove/simplify/connect/automate/keep human, and a sequence. Built to be handed to any competent team — yours, another one, or us.",
  },
];

const AnsweredDirectly: React.FC = () => (
  <section className="py-24 sm:py-28">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <SectionEyebrow className="mb-6">Before You Ask</SectionEyebrow>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          The objections operators actually have, answered here.
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
