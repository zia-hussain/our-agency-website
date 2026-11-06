import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { buildCalendlyUrl } from "../../utils/attribution";
import { trackCalendlyClick } from "../../utils/analytics";
import { getSiteData } from "../../data/site";
import { FACTS } from "../../config/facts";

/**
 * Founders and "why founder-led" in one place.
 *
 * Production split this into two sections: a numbered 01/02/03 argument,
 * then two profile cards with skill chips. Together they read like a
 * framework followed by two marketplace profiles. Here the argument is a
 * single piece of writing a buyer can check, and the founders sit beside it
 * as the people responsible for it — name, role, one sentence, no chips.
 */
const FoundersStrip: React.FC = () => {
  const { foundersStrip } = getSiteData();
  const [zia, omer] = foundersStrip.founders;

  const onBook = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const source = "home-founders";
    event.currentTarget.href = buildCalendlyUrl(source);
    trackCalendlyClick(source);
  };

  return (
    <section id="founders" className="py-24 sm:py-28 bg-card/20 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-14 lg:gap-20 items-start">
          {/* The argument */}
          <motion.div
            initial={{ opacity: 0.95, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground">
              Founder-led
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">from strategy through delivery.</span>
            </h2>

            <div className="mt-8 space-y-5 text-base sm:text-lg text-muted-foreground leading-[1.65] max-w-xl">
              <p>
                The people on your first call write the scope, and they're the ones still answering the thread after launch. There is no account manager between you and the engineers, and nothing gets handed to a team you've never met.
              </p>
              <p>
                That has consequences you can check. A rescue assessment can end with <em className="text-foreground/90">keep what you have</em>; it costs the same either way. A new build starts with what the first version will not include. Every price on this site is published before the call, and {FACTS.counts.writtenReviews} reviews sit on platforms we don't control.
              </p>
              <p>
                Behind the two of us is a small specialist bench — design, mobile, QA, automation — brought in for the parts of a project that need them, and named when they are.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
              <a
                href={buildCalendlyUrl("home-founders")}
                onClick={onBook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-primary text-primary-foreground pl-6 pr-5 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen"
              >
                <Calendar size={15} />
                Book a 30-minute call
              </a>
              <Link to="/about" className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                How we work
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </motion.div>

          {/* The people */}
          <motion.div
            initial={{ opacity: 0.95, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28, delay: 0.06 }}
            className="lg:pt-3"
          >
            <ul className="divide-y divide-border/60 border-y border-border/60">
              {[
                { f: zia, line: "Owns what gets built and why. Runs the first call, writes the scope, and has shipped the code himself, not just managed it." },
                { f: omer, line: "Owns how it gets built and that it holds. Architecture, integrations and automation — the parts that have to still hold up a year from now." },
              ].map(({ f, line }) => (
                <li key={f.name} className="py-7 first:pt-6 last:pb-6">
                  <div className="flex items-start gap-5">
                    <img
                      src={f.image}
                      alt={f.fullName}
                      width="192"
                      height="192"
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-full object-cover border border-border/70 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-xl font-bold tracking-tight text-foreground">{f.name}</h3>
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/80">{f.role}</span>
                      </div>
                      <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{line}</p>
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-xs text-muted-foreground/70 hover:text-primary transition-colors underline decoration-border/60 underline-offset-4 hover:decoration-primary"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted-foreground/60 leading-relaxed">
              Karachi, working with clients across North America, Europe and Australia. Replies within two business days.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FoundersStrip;
