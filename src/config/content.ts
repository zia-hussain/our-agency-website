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
    tagline: "Software for founders who need thinking partners, not order-takers",
    positioningStatement: "We build software for founders who need thinking partners, not order-takers",

    shortDescription: "Founded by Zia Hussain and Syed Omer Shah. We build software for founders who need thinking partners, not order-takers. Top Rated on Upwork with 100% Job Success Score.",

    longDescription: "50+ projects built. Some raised funding. Some didn't. The difference was usually how clear the problem was before we started building. We push back on unclear ideas. We challenge assumptions. We say no when it makes sense. That's uncomfortable. It's also why our projects actually launch.",
  },

  /**
   * HERO SECTION
   * Primary landing content that sets expectations
   */
  hero: {
    badge: "Now accepting new projects",

    headline: {
      line1: "We build software for founders",
      line2: "who need thinking partners,",
      line3: "not order-takers"
    },

    subheadline: [
      { text: "50+ projects built. Some raised funding. Some didn't.", type: "emphasis" },
      { text: " The difference was usually how clear the problem was before we started building.", type: "normal" },
      { type: "break" },
      { type: "break" },
      { text: "We push back on unclear ideas. We challenge assumptions. We say no when it makes sense. ", type: "normal" },
      { text: "That's uncomfortable.", type: "accent" },
      { text: " It's also why our projects actually launch.", type: "normal" }
    ] as ContentSegment[],

    primaryCTA: {
      text: "Start Your Project",
      link: "/contact"
    },

    secondaryCTA: {
      text: "View Success Stories",
      link: "#portfolio"
    },

    trustBadge: {
      text: "Top Rated on Upwork",
      subtext: "100% Job Success Score",
      link: "https://www.upwork.com/freelancers/ziahussain1"
    },

    stats: [
      {
        title: "4-6 Week MVPs",
        description: "Most launch in 30-45 days"
      },
      {
        title: "Top Rated on Upwork",
        description: "100% Job Success Score"
      },
      {
        title: "50+ Projects",
        description: "Built in the last 3 years"
      }
    ]
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
        title: "The Problem With Most Agencies",
        description: [
          { text: "Most agencies say yes to everything. Vague ideas become vague products. Six months later, nothing works. We ask uncomfortable questions early because ", type: "normal" },
          { text: "we'd rather lose a deal than build something that fails.", type: "emphasis" }
        ] as ContentSegment[],
        stat: "Most projects fail from unclear thinking"
      },
      {
        icon: "approach",
        title: "How We Work Different",
        description: [
          { text: "We push back on unclear ideas. We challenge assumptions. We say no when it makes sense. Our founders personally architect every solution. ", type: "normal" },
          { text: "Not order-takers—thinking partners.", type: "accent" }
        ] as ContentSegment[],
        stat: "Top Rated on Upwork"
      },
      {
        icon: "results",
        title: "What Actually Happens",
        description: [
          { text: "50+ projects delivered in the last 3 years. Some raised funding. Some didn't. The difference? ", type: "normal" },
          { text: "How clear the problem was before we started building.", type: "emphasis" },
          { text: " We help with that clarity.", type: "normal" }
        ] as ContentSegment[],
        stat: "4-6 week average delivery"
      }
    ]
  },

  /**
   * FINAL CTA
   * Bottom of page conversion content
   */
  finalCTA: {
    badge: "Ready to Start?",

    headline: {
      line1: "Have a project?",
      line2: "Let's talk."
    },

    subtitle: [
      { text: "Book a 30-minute call. No pitch, no pressure. We'll ask questions, challenge assumptions, and ", type: "normal" },
      { text: "tell you honestly if we're the right fit.", type: "emphasis" }
    ] as ContentSegment[],

    primaryCTA: {
      text: "Book Free Strategy Call",
      link: "https://calendly.com/zumetrix-labs/consultation"
    },

    secondaryCTA: {
      text: "Send Project Brief",
      link: "/contact"
    },

    trustSignals: [
      "24-hour response guaranteed",
      "Expert insights & strategy",
      "No obligation consultation"
    ]
  },

  /**
   * FOOTER
   * Brand description for footer section
   */
  footer: {
    description: "Founded by Zia Hussain and Syed Omer Shah. We build software for founders who need thinking partners, not order-takers. Top Rated on Upwork with 100% Job Success Score.",

    copyright: "Crafted by Zia Hussain and Syed Omer Shah"
  },

  /**
   * TRUST CREDENTIALS
   * Verifiable proof points used across the site
   */
  trust: {
    upwork: {
      badge: "Top Rated on Upwork",
      score: "100% Job Success Score",
      link: "https://www.upwork.com/freelancers/ziahussain1"
    },

    metrics: {
      projects: "50+",
      projectsDescription: "Projects Delivered",
      timeline: "4-6 weeks",
      timelineDescription: "Average MVP delivery",
      experience: "3 years",
      experienceDescription: "Building for founders"
    }
  },

  /**
   * DEFAULT META CONTENT
   * SEO descriptions for pages (can be overridden)
   */
  meta: {
    home: {
      title: "Zumetrix Labs | Software Development for Founders | SaaS MVP, React, AI Automation | Top Rated",
      description: "We build software for founders who need thinking partners, not order-takers. 50+ projects delivered. Top Rated on Upwork with 100% Job Success Score. SaaS MVPs, mobile apps, AI automation. Founded by Zia Hussain & Syed Omer Shah."
    },

    about: {
      title: "About Zumetrix Labs | Meet Zia Hussain & Syed Omer Shah | Technical Founders",
      description: "Meet Zia Hussain (CEO) and Syed Omer Shah (CTO), technical founders of Zumetrix Labs. 50+ projects delivered across US, UK, Canada, Australia, UAE, and Singapore. Top Rated on Upwork. Specializing in SaaS MVP development, React/Node.js applications, and AI automation."
    },

    services: {
      title: "Software Development Services | SaaS MVP, React, AI Automation | Zumetrix Labs",
      description: "Software development services by Zumetrix Labs. SaaS MVP development, React/Node.js applications, mobile apps, AI automation, Firebase integration. Founded by Zia Hussain & Syed Omer Shah. Top Rated on Upwork with 100% Job Success Score."
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
