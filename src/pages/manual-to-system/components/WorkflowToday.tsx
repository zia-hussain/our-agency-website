import React from "react";
import AnimatedSection from "../../../components/common/AnimatedSection";
import SectionEyebrow from "../../../components/common/SectionEyebrow";

// Brief Section 9/10: the page should begin closer to operational reality
// — busy, not calm — and only get calmer once the method resolves it. This
// is the "a lead arrives..." sequence, presented deliberately dense: short
// steps, tight spacing, a tangled connector instead of a clean arrow chain,
// tool names as scattered tags rather than an organized list. Purposeful
// information density, not gimmicky chaos (2026-10-01 commercial
// experience pass).
const HANDOFFS = [
  "A lead arrives",
  "Someone copies the details into a spreadsheet",
  "Someone checks another system for duplicates",
  "Someone posts it in Slack so the team sees it",
  "Someone creates a task, somewhere",
  "Someone follows up — eventually",
  "Someone updates a status, maybe",
  "Someone else never sees the update",
];

const TOOLS = ["Gmail", "Sheets", "Slack", "Calendly", "Notion", "a CRM", "a spreadsheet", "WhatsApp"];

const WorkflowToday: React.FC = () => (
  <section className="relative overflow-hidden bg-background py-20 sm:py-24 border-b border-border/40">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-10">
        <SectionEyebrow className="mb-5">What's Actually Happening</SectionEyebrow>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto">
          The company bought software. The humans are still the integration.
        </h2>
      </AnimatedSection>

      {/* Scattered tool tags — deliberately cluttered, no clean grid */}
      <div aria-hidden="true" className="relative h-16 sm:h-20 mb-6 hidden sm:block">
        {TOOLS.map((tool, i) => (
          <span
            key={tool}
            className="absolute whitespace-nowrap rounded-full border border-border/40 bg-card/20 px-3 py-1 text-[11px] text-muted-foreground/50"
            style={{
              top: `${(i % 2) * 42}%`,
              left: `${(i * 12.5) % 92}%`,
              transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (3 + i)}deg)`,
            }}
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Dense handoff chain — tight, staggered, not a clean vertical timeline */}
      <div className="rounded-2xl border border-border/50 bg-card/10 p-5 sm:p-7">
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {HANDOFFS.map((step, i) => (
            <AnimatedSection key={step} delay={i * 0.03} className="inline-block">
              <span
                className={`inline-flex items-center rounded-lg border px-3 py-2 text-xs sm:text-[13px] leading-snug ${
                  i === HANDOFFS.length - 1
                    ? "border-red-500/25 bg-red-500/[0.05] text-foreground/75"
                    : "border-border/50 bg-background/40 text-foreground/75"
                }`}
              >
                {step}
              </span>
            </AnimatedSection>
          ))}
        </div>
        <p className="mt-5 pt-5 border-t border-border/30 text-sm text-muted-foreground leading-relaxed">
          Eight handoffs. Eight chances for something to be copied wrong, checked late, or quietly
          dropped. None of it shows up as a bug — it just shows up as a slow week.
        </p>
      </div>
    </div>
  </section>
);

export default WorkflowToday;
