import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const GRID =
  "linear-gradient(rgba(196,138,100,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(196,138,100,0.05) 1px, transparent 1px)";

const founders = [
  {
    name: "Zia Hussain",
    slug: "zia-hussain",
    role: "Co-Founder · CEO · Product & Growth",
    domain: ["Product", "SaaS Strategy", "Decisions", "Execution"],
    statement: "A useful first release does one important job exceptionally clearly.",
    bio: "Zia leads product and growth at Zumetrix Labs. He lives in the space between founders, users, and engineering—turning messy ideas into clear roadmaps, offers, and shipped products. He cares about clean execution, simple user flows, and making sure what gets built is actually useful to the business, not just another feature.",
    image: "/profile_images/zia-hussain-founder-optimized.jpg",
    skills: [
      "SaaS Product Strategy",
      "MVP Scoping & Roadmapping",
      "Full-Stack & Mobile Execution",
      "Product Rescue & Stabilization",
      "Client Acquisition & Sales",
    ],
    badge: "100% Job Success — Zia's Upwork",
    evidence: {
      quote: "He treats the project as his own and is responsive to anything you need.",
      author: "Alan Ayoubi",
      role: "Learning Platform SaaS",
      linkTo: "/portfolio/learning-platform-saas-stabilization",
    },
  },
  {
    name: "Omer Gillani",
    slug: "omer-gillani",
    role: "Co-Founder · CTO · Engineering & Automation",
    domain: ["Engineering", "Automation", "Systems", "Infrastructure"],
    statement: "Reliable systems begin with a clear understanding of the work they must support.",
    bio: "Omer leads engineering and automation at Zumetrix Labs. He takes complex requirements, constraints, and integrations—and turns them into systems that are fast, reliable, and easy to grow. He thinks in terms of architecture, data flows, and long-term maintainability, making sure what we ship today doesn't become tomorrow's technical debt.",
    image: "/profile_images/syed-omer-shah-founder-optimized.jpg",
    skills: [
      "Technical Architecture & System Design",
      "AI & No-Code Automation Workflows",
      "Scalable Backend & Infrastructure",
      "Integration & Platform Engineering",
      "Code Quality, Reviews & Standards",
    ],
    badge: null as string | null,
    evidence: {
      quote:
        "He quickly understood the vision for my project and translated it into a clean, scalable system that integrates Twilio, Make, Airtable, and Softr seamlessly.",
      author: "Kevin",
      role: "Automation client",
      linkTo: "/client-stories",
    },
  },
];

type Evidence = { quote: string; author: string; role: string; linkTo: string };

const EvidenceNote: React.FC<{ evidence: Evidence; className?: string }> = ({ evidence, className = "" }) => (
  <div className={`border-l-2 border-primary/40 pl-5 sm:pl-6 ${className}`}>
    <p className="text-base sm:text-lg text-foreground/80 italic leading-relaxed mb-2">
      "{evidence.quote}"
    </p>
    <p className="text-sm text-muted-foreground">
      <span className="text-primary font-medium">{evidence.author}</span>, {evidence.role}
      {" · "}
      <Link to={evidence.linkTo} className="text-primary hover:underline">
        {evidence.linkTo === "/client-stories" ? "See more" : "Case study"}
      </Link>
    </p>
  </div>
);

const ProcessStage: React.FC<{
  n: string;
  title: string;
  body: string;
  evidence?: Evidence;
  reverse?: boolean;
}> = ({ n, title, body, evidence, reverse }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`grid lg:grid-cols-12 gap-x-10 gap-y-6 items-start ${reverse ? "lg:text-right" : ""}`}
  >
    <div className={`lg:col-span-5 flex items-baseline gap-4 ${reverse ? "lg:flex-row-reverse lg:justify-start" : ""}`}>
      <span className="text-3xl sm:text-4xl font-bold text-primary/25 tabular-nums leading-none">{n}</span>
      <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[0.95] tracking-tight">
        {title}
      </h3>
    </div>
    <div className={`lg:col-span-7 lg:pt-3 ${reverse ? "lg:order-first" : ""}`}>
      <p className={`text-xl text-muted-foreground leading-[1.7] mb-6 max-w-xl ${reverse ? "lg:ml-auto" : ""}`}>
        {body}
      </p>
      {evidence && (
        <div className={reverse ? "lg:text-left inline-block" : ""}>
          <EvidenceNote evidence={evidence} />
        </div>
      )}
    </div>
  </motion.div>
);

const ForkGlyph: React.FC<{ flip?: boolean; label: string }> = ({ flip, label }) => {
  const glyph = (
    <svg
      viewBox="0 0 600 90"
      className={`w-full max-w-2xl h-auto text-primary/50 ${flip ? "-scale-y-100" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="300" y1="0" x2="300" y2="30" />
      <line x1="300" y1="30" x2="60" y2="90" />
      <line x1="300" y1="30" x2="300" y2="90" />
      <line x1="300" y1="30" x2="540" y2="90" />
      <circle cx="300" cy="0" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="60" cy="90" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="300" cy="90" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="540" cy="90" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  );
  return (
    <div className="flex flex-col items-center gap-4 py-16 lg:py-24">
      {!flip && glyph}
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">{label}</p>
      {flip && glyph}
    </div>
  );
};

const AboutPage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://zumetrix.com/about#webpage",
        url: "https://zumetrix.com/about",
        name: "About Zumetrix Labs",
        isPartOf: { "@id": "https://zumetrix.com/#website" },
        about: { "@id": "https://zumetrix.com/#organization" },
        mainEntity: { "@id": "https://zumetrix.com/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://zumetrix.com/" },
          { "@type": "ListItem", position: 2, name: "About Zumetrix Labs", item: "https://zumetrix.com/about" },
        ],
      },
    ],
  };

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="About Zumetrix Labs | Founder-Led Software Studio"
        description="Zia Hussain and Omer Gillani founded Zumetrix Labs — a founder-led studio building SaaS MVPs, stabilizing stalled products, and automating operations worldwide."
        keywords="Zia Hussain, Omer Gillani, founder-led software company, SaaS MVP development, product rescue, application stabilization, AI automation, no-code development, mobile app development, web application development"
        url="https://zumetrix.com/about"
        structuredData={structuredData}
      />

      {/* Hero + Why We Exist — one connected opening movement */}
      <section className="pt-36 pb-28 lg:pt-48 lg:pb-40 bg-background relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_15%,rgba(196,138,100,0.12),transparent_35%),radial-gradient(circle_at_10%_85%,rgba(196,138,100,0.07),transparent_30%)]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center mb-24 lg:mb-32">
          <AnimatedSection>
            <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-10">
              <BookOpen size={16} className="mr-2" />
              About Zumetrix Labs
            </div>

            <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 tracking-tight leading-[1.05] break-words">
              <span className="block">Software decisions</span>
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                have consequences.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light mb-8">
              We treat them that way. Zia Hussain and Omer Gillani founded
              Zumetrix Labs in June 2025 — this page is the long answer to
              who we are and how we think.
            </p>

            <p className="text-sm text-muted-foreground/70">
              Founded June 2025 · 80+ projects shipped · 50+ clients worldwide
            </p>
          </AnimatedSection>
        </div>

        {/* The connecting thread — a decision, followed through */}
        <div className="flex justify-center mb-24 lg:mb-32" aria-hidden="true">
          <svg width="2" height="96" viewBox="0 0 2 96" className="text-primary/40" fill="none">
            <line x1="1" y1="0" x2="1" y2="96" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
              <div className="lg:col-span-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-6">
                  Why We Exist
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.2]">
                  Most software work starts with a request. We've found the
                  request is rarely the real situation.
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-2 space-y-7 text-xl text-muted-foreground leading-[1.7]">
                <p>
                  Sometimes the product doesn't exist yet, and the risk is
                  building the wrong first version. Sometimes it exists, but
                  nobody fully trusts it anymore. Sometimes the business is
                  still being held together by a founder doing work an
                  operating system should be doing instead.
                </p>
                <p>
                  In all three cases, the founder doesn't need another
                  developer. They need somebody who can hold the product, the
                  business, and the technical reality in the same
                  conversation — and help decide what happens next.
                </p>
                <p className="text-foreground font-medium">
                  That's the work we built Zumetrix to do — turn uncertainty
                  into products and systems founders can actually{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    operate, trust, and keep building.
                  </span>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How we build — WIDE, structural: one philosophy, fork, three realities, rejoin */}
      <section className="pt-28 lg:pt-40 pb-24 lg:pb-32 bg-background relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[1400px] opacity-[0.5]"
          style={{ backgroundImage: GRID, backgroundSize: "56px 56px", maskImage: "linear-gradient(to bottom, black, transparent)" }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-24 lg:mb-32">
            <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8">
              How We Build
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 tracking-tight leading-[1.02]">
              One way of thinking.
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Three realities.
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
              Whether we're building something new, fixing something broken,
              or removing manual work from an operation, the shape of how we
              approach it doesn't change.
            </p>
          </AnimatedSection>

          {/* Shared: Understand, Decide — wide editorial spread, alternating */}
          <div className="max-w-5xl mx-auto space-y-28 lg:space-y-36">
            <ProcessStage
              n="01"
              title="Understand"
              body="We start with what's actually happening, not the request as written. A missing product, a broken one, or work that shouldn't be manual anymore — the real problem is often different from what's being asked for, and building the requested thing instead of the real one is the most expensive mistake to make this early."
              evidence={{
                quote:
                  "The team understood the complexity of my industry and of the project quickly and were flexible with the scope as we all learned to deal with new solutions on the fly.",
                author: "James",
                role: "Floating Stone Ranch",
                linkTo: "/portfolio/floating-stone-ranch-processor-intake-engine",
              }}
            />
            <ProcessStage
              n="02"
              title="Decide"
              body="We separate what belongs now from what can wait, and protect the decisions that are expensive to reverse — the ones that are hard to undo once code, data, or a customer depends on them."
              reverse
            />
          </div>

          {/* Fork — a transition, not a squeezed graphic */}
          <ForkGlyph label="The work forks here" />

          <div className="grid sm:grid-cols-3 gap-x-10 lg:gap-x-16 gap-y-14 max-w-6xl mx-auto">
            {[
              {
                label: "Build",
                context: "Something new",
                body: "The core flow comes first — done properly, before anything else gets attention.",
              },
              {
                label: "Stabilize",
                context: "Something broken",
                body: "The path the business can't survive without gets stabilized first, before anything else is improved.",
              },
              {
                label: "Connect",
                context: "Manual operations",
                body: "The systems already in place get connected, instead of replaced wholesale.",
              },
            ].map((col, i) => (
              <motion.div
                key={col.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-t-2 border-primary/40 pt-7"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-3">
                  {col.context}
                </p>
                <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-5 tracking-tight">{col.label}</h3>
                <p className="text-lg text-muted-foreground leading-[1.7]">{col.body}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-foreground/80 max-w-xl mx-auto mt-20 mb-4 leading-[1.7] text-xl">
            In every case, whatever the business can least afford to get
            wrong gets solved first, so everything built after it stands on
            something solid.
          </p>

          {/* Merge */}
          <ForkGlyph flip label="Then rejoins" />

          {/* Shared: Verify, Ship, Improve */}
          <div className="max-w-5xl mx-auto space-y-28 lg:space-y-36">
            <ProcessStage
              n="04"
              title="Verify"
              body="We test what's uncomfortable to test, not just the happy path, because a fix that only works in the demo isn't a fix, and an automation nobody can debug when it breaks isn't finished. That means proving a fix holds under real use, or that a workflow still has a human who can see what happened and step in."
            />
            <ProcessStage
              n="05"
              title="Ship & observe"
              body="Version one should prove version two deserves to exist. We watch what happens after launch as closely as what happens before it."
              reverse
            />
            <ProcessStage
              n="06"
              title="Improve"
              body="Then we improve deliberately, with a working system as the baseline — not a rebuild for its own sake. If rebuilding isn't necessary, we say so."
            />
          </div>

          <div className="max-w-3xl mx-auto mt-28 pt-14 border-t border-border/40 space-y-10">
            <p className="text-xl text-foreground/90 leading-[1.7]">
              Two things about how we work don't fit neatly into steps. We
              tell you what something costs to maintain, not just what it
              costs to build. And we explain trade-offs in plain language —
              not hidden behind jargon.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <EvidenceNote
                evidence={{
                  quote: "The best team I have worked with in over a decade.",
                  author: "Reema",
                  role: "Repeat client, multiple projects",
                  linkTo: "/client-stories",
                }}
              />
              <EvidenceNote
                evidence={{
                  quote:
                    "My new go to guy. I finally found him. I will use him for all my future projects.",
                  author: "Fateh",
                  role: "Repeat client",
                  linkTo: "/client-stories",
                }}
              />
            </div>
            <p className="text-base text-muted-foreground">
              This shows up differently across{" "}
              <Link to="/services/saas-mvp-development" className="text-primary hover:underline">
                SaaS MVPs
              </Link>
              ,{" "}
              <Link to="/services/ai-automation-solutions" className="text-primary hover:underline">
                AI automation
              </Link>
              , and product rescue work — see the full range on{" "}
              <Link to="/services" className="text-primary hover:underline">
                Services
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Founders — human: the domains as a wide spread, then editorial portraits */}
      <section className="pt-28 lg:pt-40 pb-24 lg:pb-32 bg-card/20 border-y border-border/40 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,138,100,0.06),transparent_50%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-20 lg:mb-24">
            <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8">
              Who Leads Zumetrix
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 tracking-tight leading-[1.02]">
              Two domains,
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                one responsibility
              </span>
            </h2>
          </AnimatedSection>

          {/* The domain spread — wide, spatial, its own visual moment */}
          <AnimatedSection className="mb-28 lg:mb-40">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-14 sm:gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-5">
                  Zia's domain
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-[14ch]">
                  Product.
                  <br />
                  SaaS strategy.
                  <br />
                  Decisions.
                  <br />
                  Execution.
                </p>
              </div>

              <div className="text-center flex-shrink-0 px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5">
                  What they share
                </p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
                  Responsibility
                  <br />
                  Delivery
                  <br />
                  Product ownership
                  <br />
                  Client decisions
                </p>
              </div>

              <div className="text-center sm:text-right">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-5">
                  Omer's domain
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-[16ch] sm:ml-auto">
                  Engineering.
                  <br />
                  Automation.
                  <br />
                  Systems.
                  <br />
                  Infrastructure.
                </p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-20 max-w-lg mx-auto leading-relaxed text-lg">
              That's the shape of it on paper. In practice, it looks like
              this:
            </p>
          </AnimatedSection>

          <div className="space-y-24 lg:space-y-32">
            {founders.map((founder, index) => {
              const reversed = index % 2 === 1;
              return (
                <motion.article
                  key={founder.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center"
                >
                  <div className={reversed ? "lg:order-2" : ""}>
                    <div className="relative aspect-[4/5] max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-x-0 top-0 p-6 bg-gradient-to-b from-black/70 to-transparent">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                          {founder.domain.join(" · ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={reversed ? "lg:order-1" : ""}>
                    <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 hover:text-primary transition-colors duration-150">
                      <Link to={`/founders/${founder.slug}`}>{founder.name}</Link>
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8">
                      <p className="text-base text-primary font-medium">{founder.role}</p>
                      {founder.badge && (
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {founder.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xl text-foreground/90 leading-relaxed mb-8 pl-5 border-l-2 border-primary/40">
                      "{founder.statement}"
                    </p>

                    <p className="text-lg text-muted-foreground leading-[1.7] mb-8">
                      {founder.bio}
                    </p>

                    <p className="text-xs text-muted-foreground/60 mb-8">
                      {founder.skills.join(" · ")}
                    </p>

                    <div className="mb-8">
                      <EvidenceNote evidence={founder.evidence} />
                    </div>

                    <Link
                      to={`/founders/${founder.slug}`}
                      className="inline-flex items-center gap-1.5 text-base font-medium text-primary hover:gap-2.5 transition-all duration-150"
                    >
                      Full profile
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <AnimatedSection className="max-w-3xl mx-auto mt-24 lg:mt-28 text-center">
            <p className="text-lg text-muted-foreground leading-[1.7]">
              Zia and Omer aren't the only people who touch a Zumetrix
              project — a small group of specialists works alongside them on
              design, QA, and delivery depending on what an engagement needs.
              What doesn't change is who's accountable: architecture,
              technical decisions, and client communication stay with the
              founders, from the first call through the part after launch
              when most agencies have already moved on.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Principles — manifesto, four distinct compositions, real room between them */}
      <section className="pt-28 lg:pt-40 pb-16 lg:pb-20 bg-background overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8">
              What We Believe
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
              Ideas we'd still stand
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                behind in ten years
              </span>
            </h2>
          </AnimatedSection>

          {/* 01 — big, left, loud */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.5 }}
            className="py-24 lg:py-32 border-t border-border/40"
          >
            <span className="text-xs font-semibold text-primary/50 tabular-nums">01 / 04</span>
            <h3 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-bold text-foreground leading-[0.95] tracking-tight mt-6 mb-10 max-w-4xl">
              The next decision
              <br />
              matters more than
              <br />
              the next feature.
            </h3>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
              Every choice either keeps your options open or closes them. We
              spend more time protecting the second kind than shipping the
              first.
            </p>
          </motion.div>

          {/* 02 — poster, centered, the two costs as a pair */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.5 }}
            className="py-24 lg:py-36 border-t border-border/40 text-center"
          >
            <span className="text-xs font-semibold text-primary/50 tabular-nums">02 / 04</span>
            <p className="text-2xl text-muted-foreground mt-6 mb-4">A feature has</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
                Build cost
              </span>
              <span className="text-2xl sm:text-4xl text-primary font-light">+</span>
              <span className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent tracking-tight">
                Maintenance cost
              </span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md mx-auto">
              The second one is the one nobody asks about in the first
              meeting — and the one that decides whether a product is still
              alive in two years.
            </p>
          </motion.div>

          {/* 03 — V1 → V2 motif, echoing the proof arrow */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.5 }}
            className="py-24 lg:py-36 border-t border-border/40 text-center"
          >
            <span className="text-xs font-semibold text-primary/50 tabular-nums">03 / 04</span>
            <div className="flex items-center justify-center gap-8 sm:gap-12 mt-8 mb-10">
              <span className="text-6xl sm:text-8xl lg:text-9xl font-bold text-foreground/40 tracking-tight">
                V1
              </span>
              <ArrowRight className="text-primary/50 flex-shrink-0" size={40} />
              <span className="text-6xl sm:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent tracking-tight">
                V2
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
              Version one should prove version two deserves to exist.
            </h3>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md mx-auto">
              We'd rather ship something smaller that tells you the truth
              than something bigger that only tells you what you wanted to
              hear.
            </p>
          </motion.div>

          {/* 04 — quiet, right, closing */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.5 }}
            className="py-24 lg:py-32 border-t border-border/40 text-right"
          >
            <span className="text-xs font-semibold text-primary/50 tabular-nums">04 / 04</span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight mt-6 mb-6 ml-auto max-w-lg">
              If rebuilding isn't necessary, we say so.
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm ml-auto">
              Sometimes the fastest way to help a founder is telling them
              their existing system doesn't need to be thrown away.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Proof interruption — clean, obvious sequence: story → before/after → quote → attribution */}
      <section className="py-28 lg:py-44 bg-card/20 border-y border-border/40 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,138,100,0.09),transparent_55%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/60 mb-16">
            One Verified Client Story
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 mb-16">
            <div className="text-center sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-4">
                Previous Dev Team
              </p>
              <p className="text-6xl sm:text-8xl lg:text-9xl font-bold text-foreground/40 tabular-nums leading-none">
                2 YEARS
              </p>
              <p className="text-sm text-muted-foreground/50 mt-4">stalled</p>
            </div>
            <ArrowRight className="text-primary/50 flex-shrink-0 rotate-90 sm:rotate-0" size={40} />
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70 mb-4">
                Zumetrix
              </p>
              <p className="text-6xl sm:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent tabular-nums leading-none">
                3 WEEKS
              </p>
              <p className="text-sm text-muted-foreground/50 mt-4">operational</p>
            </div>
          </div>
          <p className="text-2xl sm:text-3xl text-foreground/90 leading-relaxed max-w-2xl mx-auto italic mb-8">
            "Within 3 weeks of Zia taking over it was up and running in
            Flawless condition."
          </p>
          <p className="text-base font-medium text-primary mb-2">
            Josh Nyce, Fast Track · Trustpilot
          </p>
          <Link
            to="/client-stories"
            className="inline-block mt-4 text-sm text-muted-foreground hover:text-primary underline underline-offset-2"
          >
            Read the full story
          </Link>
        </div>
      </section>

      {/* The company — the year creates scale behind the headline, then fades before the story */}
      <section className="pt-40 lg:pt-56 pb-32 lg:pb-48 bg-background relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-4 lg:pt-8"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 62%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 90%)",
          }}
        >
          <p className="text-[9rem] sm:text-[15rem] lg:text-[21rem] font-bold leading-none text-foreground/[0.07] tabular-nums select-none tracking-tight">
            2025
          </p>
        </div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-20">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
              The company started.
            </p>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-muted-foreground tracking-tight leading-tight mt-2">
              The work didn't.
            </p>
          </AnimatedSection>

          <AnimatedSection className="relative space-y-7 text-xl text-muted-foreground leading-[1.7] bg-background">
            <p>
              Zumetrix Labs was founded in June 2025. Zia and Omer weren't
              new to the work — before Zumetrix, they'd already built and
              shipped software for other people's businesses, mostly
              freelance, before deciding to do it together as partners
              instead of separately.
            </p>
            <p>
              What's changed since is the shape, not the standard: one
              company, two founders who stay personally involved in the
              decisions — not just the delivery — because the best software
              work happens when the person building it understands the
              product and the business, not just the ticket.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Closing statement — quiet, tight to the company story above */}
      <section className="pt-16 lg:pt-20 pb-28 lg:pb-36 bg-card/20 border-y border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-10 tracking-tight leading-[1.15]">
              What doesn't change as{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                we grow.
              </span>
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-primary/20 bg-background/60 backdrop-blur-xl p-10 sm:p-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/[0.04]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,138,100,0.10),transparent_45%)]" />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
                style={{ backgroundImage: GRAIN }}
              />
              <p className="relative text-xl sm:text-2xl text-foreground/90 leading-relaxed italic">
                "Every project we take starts the same way — we get skeptical
                before we get excited. If the idea doesn't hold up to real
                questions, we say so. The ones that survive that get our full
                attention, every time."
              </p>
              <div className="relative mt-8 text-base font-medium text-primary">
                — Zia Hussain & Omer Gillani, Co-Founders
              </div>
            </motion.div>

            <p className="mt-12 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Zumetrix is still young — founded in 2025. What won't change as
              it grows is the standard: founders who stay in the room,
              decisions that get explained instead of hidden, and software
              built to be operated, not just delivered.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA — the natural next sentence, not a dropped-in component */}
      <section className="py-32 lg:py-44 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-10"
            >
              What Happens Next
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1] px-4">
              You've read how we think.
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mt-2"
              >
                Now tell us what you're building.
              </motion.span>
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-[1.6] font-light px-4">
              Book a 30-minute call. We'll ask questions, tell you honestly
              whether we're the right fit, and go from there.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center px-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold
                           hover:shadow-glow transition-all duration-150
                           flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg shadow-lg w-full sm:w-auto justify-center"
                >
                  <Calendar size={20} />
                  Book a Strategy Call
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-150" />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="group bg-card/50 backdrop-blur-xl text-muted-foreground hover:text-primary px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold
                           hover:bg-card/80 transition-all duration-150
                           flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg border border-border hover:border-primary/30 w-full sm:w-auto justify-center"
                >
                  <Mail size={20} />
                  Send Project Brief
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;
