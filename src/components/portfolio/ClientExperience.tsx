import React from "react";
import { Clock, MessageCircle } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import SectionEyebrow from "../common/SectionEyebrow";

interface ClientExperienceProps {
  eyebrow: string;
  heading: string;
  items: { icon: "response" | "communication"; value: string; quote: string }[];
  advice?: { label: string; quote: string; attribution: string };
}

const ICONS = { response: Clock, communication: MessageCircle } as const;

// Same icon-tile + bold-value + muted-caption cell the homepage's proof strip
// uses, inside the same soft-bordered container — filled with the client's own
// recorded words instead of Zumetrix's claims. Only rendered when a project
// supplies `clientExperience`.
const ClientExperience: React.FC<ClientExperienceProps> = ({ eyebrow, heading, items, advice }) => (
  <div className="mb-16 sm:mb-20">
    <AnimatedSection className="text-center mb-12">
      <SectionEyebrow className="mb-6">{eyebrow}</SectionEyebrow>
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{heading}</h2>
    </AnimatedSection>

    <AnimatedSection delay={0.05}>
      <div className="max-w-3xl mx-auto grid sm:grid-cols-2 rounded-2xl border border-border/50 bg-card/10 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div key={item.value} className="flex items-start gap-4 p-6 sm:p-7">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-border/50 bg-card/40 text-primary">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-tight">{item.value}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">"{item.quote}"</p>
              </div>
            </div>
          );
        })}
      </div>
    </AnimatedSection>

    {advice && (
      <AnimatedSection delay={0.1} className="max-w-2xl mx-auto mt-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-4">{advice.label}</p>
        <p className="text-xl sm:text-2xl text-foreground/90 leading-snug tracking-tight">"{advice.quote}"</p>
        <p className="mt-4 text-sm text-muted-foreground">{advice.attribution}</p>
      </AnimatedSection>
    )}
  </div>
);

export default ClientExperience;
