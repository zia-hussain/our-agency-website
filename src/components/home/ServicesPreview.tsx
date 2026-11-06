import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { OFFERS, offerHref } from "../../config/offers";
import { trackOfferSelect, trackCTAClick } from "../../utils/analytics";

/**
 * Three situations, three rows. No tabs, no cards, no selected state.
 *
 * A visitor reads the left column, recognises themselves, and the rest of
 * the row tells them what we do about it and what the first step costs.
 * Everything else — proof, alternatives, the five disciplines — lives one
 * click deeper, where it is read by someone who has already self-selected.
 */
type Row = {
  key: "fix" | "build" | "automate";
  statement: string;
  body: string;
  step: string;
  price: string;
  href: string;
  offer?: "product-rescue";
};

const ROWS: Row[] = [
  {
    key: "fix",
    statement: "My product is stuck.",
    body:
      "Three developers have looked at it and you've had three answers. We read the code and the business before we promise anything — and if the right answer is to keep what you have, that is the answer you'll get.",
    step: "Rescue assessment, five business days",
    price: `$${OFFERS["product-rescue"].price}`,
    href: offerHref("product-rescue", "homepage-door"),
    offer: "product-rescue",
  },
  {
    key: "build",
    statement: "I have an idea. Nothing is built.",
    body:
      "We write down what the first version has to prove, then build exactly that: accounts, payments, the core flow and the admin behind it. The rest waits until the product has earned it.",
    step: "SaaS and product build",
    price: "from $4,800",
    href: "/services/saas-mvp-development",
  },
  {
    key: "automate",
    statement: "The work is still done by hand.",
    body:
      "Paper, spreadsheets, people remembering what to do. We build the one workflow that costs you most and leave it running with failures flagged to a person. Then we decide together whether there's a second.",
    step: "One workflow, built and live",
    price: "from $2,500",
    href: "/services/ai-automation-solutions#start-small",
  },
];

const ServicesPreview: React.FC = () => {
  return (
    <section id="situations" className="py-24 sm:py-28 bg-background scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0.95, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10 sm:mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05]">
            Which one is you?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground lg:max-w-xs lg:text-right leading-relaxed">
            Three ways an engagement starts. Each has a price before the call.
          </p>
        </motion.div>

        <ul className="border-t border-border/60">
          {ROWS.map((r, i) => (
            <motion.li
              key={r.key}
              initial={{ opacity: 0.95, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.28, delay: 0.05 * i }}
              className="border-b border-border/60"
            >
              <Link
                to={r.href}
                onClick={() => {
                  if (r.offer) trackOfferSelect(r.offer);
                  else trackCTAClick(`homepage-door-${r.key}`, "situations");
                }}
                className="group relative grid gap-4 py-8 sm:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.4fr)_auto] lg:gap-10 lg:items-start"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-px bg-primary scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none"
                />
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-[1.15] lg:pl-6 group-hover:text-primary transition-colors duration-200">
                  {r.statement}
                </h3>
                <p className="text-[15px] sm:text-base text-muted-foreground leading-relaxed max-w-xl">{r.body}</p>
                <span className="flex items-center justify-between gap-6 lg:block lg:text-right lg:min-w-[13rem]">
                  <span className="block">
                    <span className="block text-sm font-semibold text-foreground">{r.step}</span>
                    <span className="block text-sm text-primary mt-0.5 tabular-nums">{r.price}</span>
                  </span>
                  <span className="mt-0 lg:mt-3 inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/70 text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors duration-200">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted-foreground">
          None of these quite fits?{" "}
          <Link to="/contact" className="text-foreground underline decoration-border/70 underline-offset-4 hover:decoration-primary hover:text-primary transition-colors">
            Tell us where you are
          </Link>{" "}
          and we'll say which, if any, applies.
        </p>
      </div>
    </section>
  );
};

export default ServicesPreview;
