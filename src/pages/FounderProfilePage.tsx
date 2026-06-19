import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Mail,
  Plus,
  Sparkles,
  Target,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import { articles } from "../data/articles.js";

type FounderFAQ = {
  question: string;
  answer: string;
};

type FounderProfile = {
  name: string;
  displayName: [string, string];
  alternateName?: string;
  role: string;
  discipline: string;
  image: string;
  statement: string;
  summary: string;
  valuePromise: string;
  valueSignals: { title: string; description: string }[];
  valueHeadline: [string, string];
  practiceHeadline: [string, string];
  practiceIntroduction: string;
  biographyHeading: string;
  biography: string[];
  outcomes: { title: string; description: string }[];
  capabilities: { title: string; description: string }[];
  fit: string[];
  approach: string[];
  methodHeadline: [string, string];
  methodIntroduction: string;
  expertiseHeadline: [string, string];
  expertiseIntroduction: string;
  serviceLanes: { title: string; description: string; path: string }[];
  collaboration: string;
  counterpart: { name: string; role: string; path: string };
  cta: { heading: string; description: string };
  profiles: { label: string; url: string }[];
  faqs: FounderFAQ[];
};

const founders: Record<string, FounderProfile> = {
  "zia-hussain": {
    name: "Zia Hussain",
    displayName: ["Zia", "Hussain"],
    alternateName: "Syed Zia Hussain Shah",
    role: "Co-Founder & CEO",
    discipline: "Product strategy, MVP definition and launch delivery",
    image: "/profile_images/zia-hussain-founder-optimized.jpg",
    statement: "A useful first release does one important job exceptionally clearly.",
    summary:
      "Zia Hussain is Co-Founder and CEO of Zumetrix Labs. He leads product direction for SaaS MVPs and web applications, translating ambitious ideas into focused releases with a clear user journey and a reason to exist.",
    valuePromise:
      "Zia works at the point where an idea becomes a product: defining the user, the essential workflow and the smallest release worth putting into real hands.",
    valueSignals: [
      {
        title: "Find the essential job",
        description: "Identify the user action the product must make meaningfully easier.",
      },
      {
        title: "Draw the boundary",
        description: "Keep the first release focused enough to build well and learn from honestly.",
      },
      {
        title: "Make it usable",
        description: "Carry product decisions into clear flows and software people can actually try.",
      },
    ],
    valueHeadline: ["From ambitious idea", "to deliberate product."],
    practiceHeadline: ["Good products begin", "with decisive scope."],
    practiceIntroduction:
      "Zia's work starts with three questions: who the product is for, what they need to accomplish and what the first release must prove in use.",
    biographyHeading: "The strongest first version is not the largest one.",
    biography: [
      "Software becomes valuable when it gives a particular user a clearer, faster or more dependable way to do something important. Zia concentrates on that purpose early, before a promising idea becomes a long feature list without a strong center.",
      "At Zumetrix Labs, he leads product direction across SaaS MVPs and web applications: defining the core journey, setting release priorities and keeping design and engineering decisions connected to the product's original reason for being built.",
    ],
    outcomes: [
      {
        title: "A focused first release",
        description: "A version-one scope centered on the user action the product exists to support.",
      },
      {
        title: "Disciplined scope",
        description: "Features considered by purpose and timing, rather than collected by default.",
      },
      {
        title: "Clear product flows",
        description: "The essential journeys and delivery priorities made clear enough to implement.",
      },
      {
        title: "A release that can teach",
        description: "Software ready for real use, feedback and a more informed next iteration.",
      },
    ],
    capabilities: [
      {
        title: "Product Validation & Scope",
        description:
          "Defining the audience, core workflow and release boundary before product scope becomes difficult to control.",
      },
      {
        title: "SaaS MVP Direction",
        description:
          "Shaping onboarding, account, dashboard and release decisions into a coherent first SaaS product.",
      },
      {
        title: "Web Product Delivery",
        description:
          "Connecting product priorities to practical React and TypeScript delivery for usable web experiences.",
      },
      {
        title: "Founder Decision Support",
        description:
          "Making clear calls on tradeoffs, sequencing and the features that should wait.",
      },
    ],
    fit: [
      "An early-stage product needs a disciplined version-one scope.",
      "An existing build has features, but the core user journey is still unclear.",
      "A roadmap needs firmer product decisions before engineering expands.",
    ],
    approach: [
      "Start with the customer's problem and the business assumption the product must validate.",
      "Cut or postpone work that does not strengthen the first useful release.",
      "Build, launch and learn from use before committing budget to the next layer.",
    ],
    methodHeadline: ["From an idea", "to a first release."],
    methodIntroduction:
      "A focused route from the core product question to software that can be used, observed and improved.",
    expertiseHeadline: ["Product direction", "with delivery in view."],
    expertiseIntroduction:
      "Zia's work spans the decisions that shape an MVP and the delivery choices that carry it into a usable product.",
    serviceLanes: [
      {
        title: "SaaS MVP Development",
        description: "For founders who need to turn a new software idea into a focused, launchable first product.",
        path: "/services/saas-mvp-development",
      },
      {
        title: "Web Applications",
        description: "For businesses that need a custom web product shaped around clear users, workflows and operations.",
        path: "/services",
      },
    ],
    collaboration:
      "Zia leads product direction and release alignment. When the product needs backend architecture, integrations or automation, he works alongside Syed Omer Shah so product intent and technical structure are designed together.",
    counterpart: {
      name: "Syed Omer Shah",
      role: "Co-Founder & CTO",
      path: "/founders/syed-omer-shah",
    },
    cta: {
      heading: "Have a product worth shaping carefully?",
      description:
        "Share the idea, roadmap or product constraint with Zumetrix Labs. The first discussion focuses on fit, scope and a practical next step.",
    },
    profiles: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/zia-hussain-404-/" },
      { label: "GitHub", url: "https://github.com/zia-hussain" },
      { label: "Upwork", url: "https://www.upwork.com/freelancers/ziahussain1" },
      { label: "Fiverr", url: "https://www.fiverr.com/syedziashahgill" },
    ],
    faqs: [
      {
        question: "What is Zia's role at Zumetrix Labs?",
        answer:
          "Zia is Co-Founder and CEO. He leads product direction for SaaS MVP and web application work, including product scope, essential user journeys, release priorities and alignment between the product goal and delivery.",
      },
      {
        question: "Can Zia help if a product has already started being built?",
        answer:
          "Yes. His work can begin with an idea, a roadmap, a prototype or a live product whose scope or central user journey needs clearer direction.",
      },
      {
        question: "How does Zia work with Syed Omer Shah?",
        answer:
          "Zia leads product direction and alignment around the release. Omer leads architecture, integrations and automation where the product requires deeper technical systems. Together they connect the product decision to the way it is built.",
      },
      {
        question: "Where can I verify Zia's public profiles?",
        answer:
          "This page links to Zia's public LinkedIn, GitHub, Upwork and Fiverr profiles. Project inquiries are handled through the Zumetrix Labs contact page.",
      },
    ],
  },
  "syed-omer-shah": {
    name: "Syed Omer Shah",
    displayName: ["Syed Omer", "Shah"],
    role: "Co-Founder & CTO",
    discipline: "System architecture, integrations and purposeful automation",
    image: "/profile_images/syed-omer-shah-founder-optimized.jpg",
    statement: "Reliable systems begin with a clear understanding of the work they must support.",
    summary:
      "Syed Omer Shah is Co-Founder and CTO of Zumetrix Labs. He leads system architecture, backend integrations and purposeful automation for software shaped around real operations.",
    valuePromise:
      "Omer works where software meets operations: mapping dependencies, designing stable technical boundaries and applying automation where it has a precise job to do.",
    valueSignals: [
      {
        title: "Map the workflow",
        description: "Understand the steps, data and dependencies a system must support reliably.",
      },
      {
        title: "Design the boundary",
        description: "Plan data flows, integrations and backend responsibilities with care.",
      },
      {
        title: "Automate deliberately",
        description: "Use AI or workflow automation only where its role is clear and useful.",
      },
    ],
    valueHeadline: ["Turn operational friction", "into dependable systems."],
    practiceHeadline: ["Reliable software begins", "with understood operations."],
    practiceIntroduction:
      "Omer's work starts below the interface: the data, integrations and system behavior that must remain understandable as a product grows.",
    biographyHeading: "Complexity is easiest to manage before it becomes architecture.",
    biography: [
      "The technical problems that matter most are often quiet at first: repeated manual handoffs, unclear data ownership, integrations that depend on fragile assumptions or systems that become difficult to extend. Omer works on these foundations before complexity begins to dictate the product.",
      "As CTO of Zumetrix Labs, he leads architecture, backend behavior, integrations and automation planning. His approach is practical: understand the operation, choose a technical structure that fits it and introduce AI only when its responsibility can be clearly defined.",
    ],
    outcomes: [
      {
        title: "Defined system boundaries",
        description: "Components, data movement and integration responsibilities made understandable.",
      },
      {
        title: "Purposeful automation",
        description: "Automated behavior attached to a specific workflow and a clear responsibility.",
      },
      {
        title: "Dependable connections",
        description: "Integrations approached as part of the system, not isolated conveniences.",
      },
      {
        title: "Room to evolve",
        description: "Technical choices that make future change easier to understand and support.",
      },
    ],
    capabilities: [
      {
        title: "Workflow & AI Automation",
        description:
          "Designing automation and AI assistance around a defined workflow, responsibility and human handoff.",
      },
      {
        title: "Integration Architecture",
        description:
          "Mapping how tools, APIs and data connect so operational behavior is visible and dependable.",
      },
      {
        title: "Backend Reliability",
        description:
          "Shaping server-side behavior, data handling and technical boundaries for stable product workflows.",
      },
      {
        title: "Engineering Direction",
        description:
          "Evaluating implementation tradeoffs for maintainability, delivery and long-term technical clarity.",
      },
    ],
    fit: [
      "A workflow contains repeated work that may be suitable for considered automation.",
      "A product depends on integrations, backend behavior or reliable movement of data.",
      "Architecture decisions need to be made before technical complexity compounds.",
    ],
    approach: [
      "Map the actual workflow, failure points and ownership before proposing automation.",
      "Choose AI, integration or backend patterns because they solve an identified constraint.",
      "Build for dependable operation and understandable future change.",
    ],
    methodHeadline: ["From workflow", "to dependable system."],
    methodIntroduction:
      "A considered route from the real operation to a technical foundation that remains understandable.",
    expertiseHeadline: ["Technical architecture", "built around operations."],
    expertiseIntroduction:
      "Omer's work covers the backend, integration and automation decisions that make software dependable in daily use.",
    serviceLanes: [
      {
        title: "AI Automation",
        description: "For teams that want to reduce recurring manual work through intentional workflows and AI integrations.",
        path: "/services/ai-automation-solutions",
      },
      {
        title: "Custom Software Systems",
        description: "For products requiring backend logic, integrations and technical architecture designed around operations.",
        path: "/services",
      },
    ],
    collaboration:
      "Omer leads technical architecture and system reliability. He works alongside Zia Hussain when a technical solution must also serve product scope, customer value and launch priorities, keeping engineering connected to the reason the product exists.",
    counterpart: {
      name: "Zia Hussain",
      role: "Co-Founder & CEO",
      path: "/founders/zia-hussain",
    },
    cta: {
      heading: "Have a system challenge worth untangling?",
      description:
        "Share the workflow, product dependency or integration question with Zumetrix Labs. The first discussion focuses on the system, fit and a practical next step.",
    },
    profiles: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/omer-gillani/" },
      { label: "GitHub", url: "https://github.com/UmerGillani36" },
        { label: "Upwork", url: "https://www.upwork.com/freelancers/~019551f0a911e24660" },
      { label: "Fiverr", url: "https://www.fiverr.com/omershahgillani" },
    ],
    faqs: [
      {
        question: "What is Omer's role at Zumetrix Labs?",
        answer:
          "Omer is Co-Founder and CTO. He leads system architecture, backend behavior, integrations and purposeful automation for products and operational workflows built by Zumetrix Labs.",
      },
      {
        question: "Does every workflow need AI automation?",
        answer:
          "No. Automation makes sense only when the workflow, inputs, expected output and human responsibility are understood. Sometimes a cleaner process or integration is the better engineering decision.",
      },
      {
        question: "How does Omer work with Zia Hussain?",
        answer:
          "Omer leads the technical system while Zia leads product direction and release priorities. Their work joins product purpose to architecture, integrations and delivery.",
      },
      {
        question: "Where can I verify Omer's public profiles?",
        answer:
          "This page links to Omer's public LinkedIn and GitHub profiles. Project inquiries are handled through the Zumetrix Labs contact page.",
      },
    ],
  },
};

const FounderProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const founder = slug ? founders[slug] : undefined;
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const authoredArticles = useMemo(
    () => founder
      ? articles.filter((article) => article.author.includes(founder.name))
      : [],
    [founder],
  );
  const featuredWriting = useMemo(
    () => authoredArticles.filter((article) => article.slug === "what-we-learned-building-50-projects"),
    [authoredArticles],
  );

  if (!founder || !slug) {
    return <Navigate to="/about" replace />;
  }

  const url = `https://zumetrix.com/founders/${slug}`;
  const personId = `${url}#person`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profilepage`,
        url,
        name: `${founder.name} | ${founder.role} at Zumetrix Labs`,
        description: founder.summary,
        dateModified: "2026-05-24",
        mainEntity: { "@id": personId },
        hasPart: featuredWriting.map((article) => ({
          "@type": "Article",
          headline: article.title,
          url: `https://zumetrix.com/articles/${article.slug}`,
          datePublished: article.publishedAt,
          author: { "@id": personId },
        })),
      },
      {
        "@type": "Person",
        "@id": personId,
        name: founder.name,
        ...(founder.alternateName && { alternateName: founder.alternateName }),
        jobTitle: founder.role,
        url,
        image: `https://zumetrix.com${founder.image}`,
        description: founder.summary,
        worksFor: { "@id": "https://zumetrix.com/#organization" },
        sameAs: founder.profiles.map((profile) => profile.url),
        knowsAbout: founder.capabilities.map((capability) => capability.title),
      },
      {
        "@type": "Organization",
        "@id": "https://zumetrix.com/#organization",
        name: "Zumetrix Labs",
        url: "https://zumetrix.com",
        slogan: "Forge Clear Ideas Into Shipped Software.",
      },
    ],
  };

  return (
    <PageTransition>
      <SEO
        title={`${founder.name} | ${founder.role} of Zumetrix Labs`}
        description={`${founder.summary} View areas of practice, published work and official profiles.`}
        url={url}
        image={`https://zumetrix.com${founder.image}`}
        structuredData={structuredData}
      />

      <main className="min-h-screen overflow-x-hidden bg-background">
        <section className="relative overflow-hidden border-b border-white/[0.07] pt-[350px] sm:pt-[480px] lg:flex lg:min-h-[100svh] lg:items-end lg:pt-28">
          <div className="absolute inset-0">
            <img
              src={founder.image}
              alt=""
              aria-hidden="true"
              className="absolute right-0 top-0 h-[380px] w-full object-cover object-top opacity-80 sm:h-[505px] lg:h-full lg:w-[58%] lg:opacity-90"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,12,0.03)_0%,rgba(12,12,12,0.1)_28%,#0c0c0c_380px)] sm:bg-[linear-gradient(180deg,rgba(12,12,12,0.03)_0%,rgba(12,12,12,0.1)_34%,#0c0c0c_505px)] lg:bg-[linear-gradient(90deg,#0c0c0c_0%,#0c0c0c_42%,rgba(12,12,12,0.78)_58%,rgba(12,12,12,0.12)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(0deg,#0c0c0c_20%,transparent_100%)]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8 lg:pb-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-[760px]"
            >
              <div className="-mt-3 mb-8 sm:mt-0 sm:mb-10">
                <div className="inline-flex items-center gap-3 rounded-lg border border-white/[0.09] border-l-2 border-l-primary bg-[#111111]/95 px-3 py-3 pr-5 shadow-[0_18px_44px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:hidden">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/[0.08] text-primary">
                    <CheckCircle2 size={16} />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[10px] font-medium uppercase text-muted-foreground">Zumetrix Labs</span>
                    <span className="text-xs font-semibold uppercase text-foreground">Official Founder Profile</span>
                  </span>
                </div>
                <div className="hidden items-center gap-4 text-xs uppercase text-muted-foreground sm:flex">
                  <span className="text-primary">Official Founder Profile</span>
                  <span className="h-px w-9 bg-primary/60" />
                  <span>Zumetrix Labs</span>
                </div>
              </div>
              <h1 className={`mb-7 font-semibold leading-[0.91] tracking-normal text-foreground lg:text-[clamp(6.2rem,10vw,9.1rem)] ${
                founder.displayName[0].length > 5
                  ? "text-[clamp(3.25rem,15vw,7.5rem)]"
                  : "text-[clamp(4rem,15vw,7.5rem)]"
              }`}>
                <span className="block">{founder.displayName[0]}</span>
                <span className="block text-primary">{founder.displayName[1]}</span>
              </h1>
              <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-base sm:text-lg">
                <span className="font-medium text-foreground">{founder.role}</span>
                <span className="hidden h-4 w-px bg-border sm:block" />
                <span className="text-muted-foreground">{founder.discipline}</span>
              </div>
              <p className="mb-5 max-w-2xl text-lg leading-relaxed text-foreground sm:text-2xl lg:text-[1.7rem]">
                {founder.statement}
              </p>
              <p className="mb-9 max-w-xl text-[0.95rem] leading-[1.8] text-muted-foreground sm:text-base">
                {founder.summary}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-md bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Discuss your project
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/portfolio"
                  className="group inline-flex items-center gap-3 px-3 py-3.5 font-medium text-foreground transition-colors hover:text-primary"
                >
                  View our work
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            <div className="mt-12 grid gap-7 border-t border-white/[0.1] pt-7 sm:grid-cols-3 lg:mt-16">
              <div>
                <p className="mb-2 text-xs uppercase text-muted-foreground">Role</p>
                <p className="text-sm text-foreground">{founder.role}</p>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase text-muted-foreground">Practice</p>
                <p className="max-w-xs text-sm leading-relaxed text-foreground">{founder.discipline}</p>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase text-muted-foreground">Public Profiles</p>
                <div className="flex flex-wrap gap-2">
                  {founder.profiles.map((profile) => (
                    <a
                      key={profile.label}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-foreground transition-all hover:border-primary/30 hover:bg-primary/[0.06] hover:text-primary"
                    >
                      {profile.label}
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="profile" className="relative overflow-hidden bg-background py-20 lg:py-28">
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-14 text-center lg:mb-20"
            >
              <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium text-primary backdrop-blur-xl">
                <Target size={16} className="mr-2" />
                {founder.role} / Zumetrix Labs
              </div>
              <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                {founder.valueHeadline[0]}
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {founder.valueHeadline[1]}
                </span>
              </h2>
              <p className="mx-auto max-w-4xl text-lg font-light leading-[1.65] text-muted-foreground sm:text-xl lg:text-2xl">
                {founder.valuePromise}
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-[1.34fr_0.86fr] lg:gap-8">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-border bg-card/35 p-7 backdrop-blur-xl sm:p-10 lg:p-12"
              >
                <p className="mb-5 text-sm font-medium text-primary">Perspective</p>
                <h3 className="mb-7 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                  {founder.biographyHeading}
                </h3>
                {founder.biography.map((paragraph) => (
                  <p key={paragraph} className="mb-6 text-base leading-[1.85] text-muted-foreground last:mb-0 sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </motion.article>

              <div className="grid gap-4">
                {founder.valueSignals.map((signal, index) => (
                  <motion.article
                    key={signal.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.07 }}
                    className="group rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-xl transition-colors hover:border-primary/30 hover:bg-card/70"
                  >
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                      0{index + 1}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {signal.title}
                    </h3>
                    <p className="leading-[1.7] text-muted-foreground">{signal.description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/20 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center lg:mb-20">
              <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium text-primary backdrop-blur-xl">
                <CheckCircle2 size={16} className="mr-2" />
                Working Principles
              </div>
              <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {founder.practiceHeadline[0]}
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {founder.practiceHeadline[1]}
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
                {founder.practiceIntroduction}
              </p>
            </div>

            <p className="mb-7 text-center text-sm font-medium text-primary">Where the work begins</p>
            <div className="mb-14 grid gap-5 md:grid-cols-3">
              {founder.fit.map((situation, index) => (
                <motion.article
                  key={situation}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  className="rounded-2xl border border-border bg-background/60 p-7 backdrop-blur-xl transition-colors hover:border-primary/30"
                >
                  <span className="mb-6 block text-sm font-medium text-primary">0{index + 1}</span>
                  <p className="text-lg font-medium leading-[1.65] text-foreground">{situation}</p>
                </motion.article>
              ))}
            </div>

            <p className="mb-7 text-center text-sm font-medium text-primary">What the work establishes</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {founder.outcomes.map((outcome, index) => (
                <motion.article
                  key={outcome.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl transition-colors hover:border-primary/30"
                >
                  <div className="mb-5 h-px w-10 bg-primary/70" />
                  <h3 className="mb-3 text-lg font-semibold text-foreground group-hover:text-primary">
                    {outcome.title}
                  </h3>
                  <p className="text-sm leading-[1.7] text-muted-foreground">{outcome.description}</p>
                </motion.article>
              ))}
            </div>

            <div className="mb-10 mt-16 text-center lg:mt-20">
              <h3 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                {founder.methodHeadline[0]}{" "}
                <span className="text-primary">{founder.methodHeadline[1]}</span>
              </h3>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {founder.methodIntroduction}
              </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
              {founder.approach.map((principle, index) => (
                <motion.article
                  key={principle}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  className="rounded-2xl border border-border bg-background/60 p-7 text-center backdrop-blur-xl transition-colors hover:border-primary/30"
                >
                  <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-sm font-semibold text-primary">
                    0{index + 1}
                  </div>
                  <p className="text-base leading-[1.8] text-foreground sm:text-lg">{principle}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="expertise" className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center lg:mb-20">
              <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium text-primary backdrop-blur-xl">
                <Sparkles size={16} className="mr-2" />
                Areas of Practice
              </div>
              <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                {founder.expertiseHeadline[0]}
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {founder.expertiseHeadline[1]}
                </span>
              </h2>
              <p className="mx-auto max-w-4xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
                {founder.expertiseIntroduction}
              </p>
            </div>

            <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {founder.capabilities.map((capability, index) => (
                <motion.article
                  key={capability.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2, delay: index * 0.06 }}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-7 backdrop-blur-xl transition-colors hover:border-primary/30 hover:bg-card/70"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                    0{index + 1}
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {capability.title}
                  </h3>
                  <p className="leading-[1.7] text-muted-foreground">{capability.description}</p>
                </motion.article>
              ))}
            </div>

            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                Related work at Zumetrix Labs
              </h3>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                These service areas are where this expertise is applied in the studio's product and engineering work.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {founder.serviceLanes.map((lane) => (
                <Link
                  key={lane.title}
                  to={lane.path}
                  className="group rounded-2xl border border-border bg-card/40 p-7 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-card/60 sm:p-8"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {lane.title}
                    </h3>
                    <ArrowRight size={19} className="shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="leading-[1.75] text-muted-foreground">{lane.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/20 py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-primary backdrop-blur-xl">
              Founder-Led Delivery
            </div>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Two disciplines.
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                One accountable team.
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-lg font-light leading-[1.8] text-muted-foreground sm:text-xl">
              {founder.collaboration}
            </p>
            <Link
              to={founder.counterpart.path}
              className="group inline-flex items-center gap-3 rounded-xl border border-border bg-card/50 px-7 py-4 font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
            >
              Meet {founder.counterpart.name}, {founder.counterpart.role}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {featuredWriting.length > 0 && (
          <section id="articles" className="bg-background py-20 lg:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium text-primary backdrop-blur-xl">
                  Published Work
                </div>
                <h2 className="mb-5 text-4xl font-bold text-foreground sm:text-5xl">
                  Writing from
                  <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    the founders.
                  </span>
                </h2>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  A first-hand reflection on the product and engineering decisions that shape a software project.
                </p>
              </div>
              {featuredWriting.map((article) => (
                <Link
                  key={article.slug}
                  to={`/articles/${article.slug}`}
                  className="group block rounded-2xl border border-border bg-card/50 p-7 backdrop-blur-xl transition-colors hover:border-primary/30 hover:bg-card/70 sm:p-10"
                >
                  <p className="mb-5 text-sm font-medium text-primary">
                    {article.publishedAt} / {article.readTime}
                  </p>
                  <h3 className="mb-4 text-2xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    {article.title}
                  </h3>
                  <p className="mb-7 max-w-3xl text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-3 font-medium text-primary">
                    Read the insight
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section id="questions" className="border-t border-border/60 bg-background py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium text-primary backdrop-blur-xl">
                Common Questions
              </div>
              <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                About {founder.displayName[0]}
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  and the work.
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
                Role, areas of practice and official ways to connect with Zumetrix Labs.
              </p>
            </div>
            <div className="space-y-4">
              {founder.faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="overflow-hidden rounded-lg border border-border bg-card/50 backdrop-blur-xl transition-colors hover:border-primary/30"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    aria-expanded={openFAQ === index}
                    className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left transition-colors hover:bg-card/70"
                  >
                    <span className="text-lg font-semibold leading-relaxed text-foreground">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: openFAQ === index ? 45 : 0 }}
                      transition={{ duration: 0.15 }}
                      className="shrink-0 text-primary"
                    >
                      <Plus size={20} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 leading-[1.8] text-[#DBDBDB]">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-background py-20 lg:py-28">
          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium text-primary backdrop-blur-xl">
              <Sparkles size={16} className="mr-2" />
              Zumetrix Labs
            </div>
            <h2 className="mb-8 text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
              {founder.cta.heading}
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
              {founder.cta.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
              >
                <Mail size={18} />
                Discuss your project
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card/50 px-8 py-4 font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary sm:w-auto"
              >
                View our work
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default FounderProfilePage;
