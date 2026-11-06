import { FACTS } from "./facts";
/**
 * ZUMETRIX LABS - CENTRALIZED BRAND CONTENT
 *
 * This is the single source of truth for all brand-defining content.
 * Update this file to change positioning, messaging, and CTAs across the entire site.
 *
 * DO NOT hardcode brand content in components. Pull from this file instead.
 *
 * CONTENT SEGMENT TYPES:
 * - "normal": Regular body text (text-muted-foreground)
 * - "emphasis": Bold, standout text (font-medium text-foreground)
 * - "accent": Primary color highlight (text-primary font-medium)
 * - "break": Line break
 */

export type ContentSegment = {
  text: string;
  type: "normal" | "emphasis" | "accent";
} | {
  type: "break";
};

export const BRAND_CONTENT = {
  /**
   * CORE BRAND POSITIONING
   * These define who we are and what we stand for
   */
  brand: {
    name: "Zumetrix Labs",
    tagline: "Forge Clear Ideas Into Shipped Software.",
    positioningStatement: "The software studio that decides before it builds.",

    shortDescription: "Zumetrix Labs is a founder-led software studio. Zia Hussain and Omer Gillani, with a small specialist team, work out what should happen to a product before anyone writes code — then build it: SaaS, web and mobile products, product rescue, and operational automation.",

    longDescription: FACTS.counts.projectsShipped + " projects built. Some raised funding. Some didn't. In our experience the difference was how clear the problem was before we started building. We push back on unclear ideas. We challenge assumptions. We say no when it makes sense. That's uncomfortable. It's also how we try to keep our projects on track to launch.",
  },

  /**
   * HERO SECTION
   * Primary landing content that sets expectations
   */
  hero: {
    badge: "Founder-led software studio",

    headline: {
      line1: "The software studio",
      line2: "that decides",
      line3: "before it builds."
    },

    subheadline: [
      { text: "Starting a product, stuck with one, or still running it by hand — ", type: "normal" },
      { text: "we work out what should actually happen next, then build it.", type: "emphasis" },
      { type: "break" },
      { text: "SaaS, web and mobile products, product rescue, operational automation. Zia and Omer stay close to every project, with a specialist team behind them.", type: "normal" }
    ] as ContentSegment[],

    proofLine: `${FACTS.counts.projectsShipped} projects shipped · ${FACTS.counts.writtenReviews} written client reviews`,

    primaryCTA: {
      text: "Tell us where you are",
      link: "/contact"
    },

    secondaryCTA: {
      text: "See the work",
      link: "#portfolio"
    }
  },

  /**
   * SIGNATURE METHOD (Why Us)
   * The PAS framework section explaining differentiation
   */
  signatureMethod: {
    title: "Why Founders Choose Us (And Why Some Don't)",
    subtitle: "We're technical. We're direct. We've done this before.",

    sections: [
      {
        icon: "problem",
        title: "The Problem With Saying Yes to Everything",
        description: [
          { text: "An agency that says yes to everything turns vague ideas into vague products. Six months later, nothing works. We ask uncomfortable questions early because ", type: "normal" },
          { text: "we'd rather lose a deal than build something that fails.", type: "emphasis" }
        ] as ContentSegment[],
        stat: "Clear thinking comes before code"
      },
      {
        icon: "approach",
        title: "How We Work Different",
        description: [
          { text: "We push back on unclear ideas. We challenge assumptions. We say no when it makes sense. Zia and Omer shape every solution and stay on it, with a small specialist team across design, development, QA and automation. ", type: "normal" },
          { text: "Founders close, delivery deep.", type: "accent" }
        ] as ContentSegment[],
        stat: ""
      },
      {
        icon: "results",
        title: "What Actually Happens",
        description: [
          { text: "Some clients raise funding on what we build. Others don't. ", type: "normal" },
          { text: "That was never about execution — it was about how clear the problem was on day one.", type: "emphasis" },
          { text: " We build that clarity in before we touch a keyboard.", type: "normal" }
        ] as ContentSegment[],
        stat: "Scope decided before code"
      }
    ]
  },

  /**
   * FINAL CTA
   * Bottom of page conversion content
   */
  finalCTA: {
    badge: "What happens next",

    headline: {
      line1: "Tell us where you are.",
      line2: "We'll tell you what fits."
    },

    subtitle: [
      { text: "A 30-minute call with Zia or Omer. If one of our services fits, we'll say which and what it would cost to start. ", type: "normal" },
      { text: "If none does, we'll say that too.", type: "emphasis" }
    ] as ContentSegment[],

    primaryCTA: {
      text: "Book a call",
      link: "https://calendly.com/zumetrix-labs/consultation"
    },

    secondaryCTA: {
      text: "Write to us instead",
      link: "/contact"
    },

    trustSignals: [
      "A reply within two business days",
      "Prices stated before the call",
      "No obligation"
    ]
  },

  /**
   * FOOTER
   * Brand description for footer section
   */
  footer: {
    description: "Founded by Zia Hussain and Omer Gillani. The software studio that decides before it builds — SaaS, web and mobile products, product rescue and operational automation.",

    copyright: "Crafted by Zia Hussain and Omer Gillani"
  },

  /**
   * TRUST CREDENTIALS
   * Verifiable proof points used across the site
   */
  trust: {
    upwork: {
      badge: "Top Rated on Upwork",
      score: "Zia Hussain · 100% Job Success Score",
      link: "https://www.upwork.com/freelancers/ziahussain1"
    },

    metrics: {
      projects: FACTS.counts.projectsShipped,
      projectsDescription: "Projects Delivered",
      timeline: FACTS.counts.writtenReviews,
      timelineDescription: "Written client reviews",
      experience: "Founder-led",
      experienceDescription: "Every engagement"
    }
  },

  /**
   * DEFAULT META CONTENT
   * SEO descriptions for pages (can be overridden)
   */
  meta: {
    home: {
      title: "Zumetrix Labs — The software studio that decides before it builds",
      description: "Founder-led software studio for founders and operating companies: SaaS, web and mobile products, product rescue and stabilization, and workflow automation. Prices stated on every service page."
    },

    about: {
      title: "About Zumetrix Labs | Zia Hussain & Omer Gillani, Founders",
      description: "Zia Hussain (CEO) and Omer Gillani (CTO) founded Zumetrix Labs in June 2025 after years of shipping software for other people's businesses. How the studio decides, builds and stays accountable — with a small specialist team behind the founders."
    },

    services: {
      title: "Software Development Services | SaaS MVP, React, AI Automation | Zumetrix Labs",
      description: "Software development services by Zumetrix Labs. SaaS MVP development, React/Node.js applications, mobile apps, AI automation, Firebase integration. Founded by Zia Hussain & Omer Gillani."
    }
  }
} as const;

/**
 * USAGE EXAMPLES:
 *
 * Simple strings:
 * <h1>{BRAND_CONTENT.hero.headline.line1}</h1>
 *
 * Content with semantic emphasis:
 * import { renderContentSegments } from '@/utils/contentRenderer';
 * <p>{renderContentSegments(BRAND_CONTENT.hero.subheadline)}</p>
 *
 * Links:
 * <a href={BRAND_CONTENT.trust.upwork.link}>{BRAND_CONTENT.trust.upwork.badge}</a>
 */
