import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface FAQAccordionItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQAccordionItem[];
  /** Unique per page — keeps ids stable when more than one accordion renders in a document. */
  idPrefix: string;
  defaultOpenIndex?: number | null;
}

// The canonical Zumetrix FAQ list. One signature carries it: a hairline
// spine on the left edge that lights up copper for whichever row is open,
// so state reads spatially instead of through a spinning chip icon — the
// same restraint the rest of the site spends on rules and dividers rather
// than UI chrome. Every answer stays mounted (height/opacity animate, the
// node never unmounts), so the full text exists in the rendered document
// for every question, not only the one that happens to be open.
const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  idPrefix,
  defaultOpenIndex = 0,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="border-t border-border/60">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const questionId = `${idPrefix}-question-${index}`;
        const panelId = `${idPrefix}-panel-${index}`;

        return (
          <div key={index} className="relative border-b border-border/60">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 bottom-0 transition-all duration-300 ${
                isOpen ? "w-[2px] bg-primary" : "w-px bg-transparent"
              }`}
            />

            <button
              type="button"
              id={questionId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="group w-full py-5 sm:py-6 pl-5 sm:pl-6 pr-2 text-left flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
            >
              <span
                className={`text-base sm:text-lg font-semibold leading-snug transition-colors duration-200 ${
                  isOpen ? "text-foreground" : "text-foreground/85 group-hover:text-foreground"
                }`}
              >
                {item.question}
              </span>

              <span aria-hidden="true" className="relative flex-shrink-0 w-4 h-4 mt-1.5">
                <span
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-px transition-colors duration-300 ${
                    isOpen ? "bg-primary" : "bg-muted-foreground/50 group-hover:bg-primary/70"
                  }`}
                />
                <span
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-px transition-all duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100 bg-muted-foreground/50 group-hover:bg-primary/70"
                  }`}
                />
              </span>
            </button>

            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={questionId}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden"
            >
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-5 sm:pb-6 pl-5 sm:pl-6 pr-8 sm:pr-12 max-w-2xl">
                {item.answer}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
