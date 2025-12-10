// Home Page FAQs - SEO Optimized for Global Markets & AEO Ready
export const homeFAQs = [
  {
    question: "What is Zumetrix Labs and what do you specialize in?",
    answer:
      "Zumetrix Labs is a founder-led software studio focused on building production-ready SaaS products, web applications, mobile apps, and AI-driven automation systems. We specialize in React/Next.js and Node.js web apps, 30-day SaaS MVP development, React Native mobile applications, AI integrations with OpenAI, and automation workflows using tools like Zapier, Make.com, and n8n. Most of our work is for international clients in the United States, United Kingdom, Canada, Europe, Australia, and the Middle East who want a technical partner, not a faceless outsourcing agency."
  },
  {
    question: "Who are the founders behind Zumetrix Labs?",
    answer:
      "Zumetrix Labs is led by two hands-on technical founders: Zia Hussain (Co-Founder & CEO) and Syed Omer Shah (Co-Founder & CTO). Zia focuses on product strategy and full-stack development using React, Next.js, TypeScript, Node.js, and Firebase. He has led multiple SaaS MVPs from idea to launch for international clients. Omer focuses on backend systems, AI automation, and scalable architecture using Node.js, Python, cloud infrastructure, and OpenAI integrations. Instead of delegating everything to juniors, both founders stay directly involved in architecture, code reviews, and critical technical decisions on every project."
  },
  {
    question: "How fast can Zumetrix Labs build a production-ready SaaS MVP?",
    answer:
      "For most projects, we can take you from idea to a production-ready SaaS MVP in about 30 days. Our process includes an initial strategy and scoping call, a clear technical architecture, UI/UX layout, weekly development sprints, QA, and deployment to production (usually on Vercel, AWS, or similar). Timelines depend on scope, but the 30-day MVP model works well for focused products like dashboards, internal tools, niche SaaS products, or marketplaces with a clear first feature set."
  },
  {
    question: "What does your 30-day SaaS MVP process look like?",
    answer:
      "Our 30-day SaaS MVP process is structured and transparent: (1) Product discovery and requirements clarification, (2) Technical architecture and database design, (3) UI/UX layout and core flows, (4) Backend and frontend implementation, (5) Integrations such as Stripe, OpenAI, or Firebase, (6) QA and bug-fixing, and (7) Production deployment and handover. You get weekly progress updates, Loom walkthroughs, and a clear list of what will be included in your V1 so there are no surprises."
  },
  {
    question: "What AI automation services does Zumetrix Labs provide?",
    answer:
      "We help companies turn manual, repetitive work into automated, AI-assisted workflows. This includes OpenAI and ChatGPT integrations, custom AI endpoints, document and email processing automation, customer support assistants, internal tools powered by AI, and no-code/low-code automation using Zapier, Make.com, and n8n. We often connect AI flows to CRMs, marketing tools, databases, or internal systems so your team saves hours every week while keeping full control over the business logic."
  },
  {
    question: "Which technologies and tech stack do you use?",
    answer:
      "Our primary tech stack includes React, Next.js, TypeScript, Node.js, Express, React Native, Expo, Firebase, Supabase, PostgreSQL, MongoDB, Stripe, OpenAI APIs, TailwindCSS, and modern deployment platforms like Vercel and AWS. For automations and internal tools, we frequently use Airtable, Notion, Zapier, Make.com, and n8n. We choose technologies based on performance, maintainability, and your team’s long-term needs so you are not locked into something you can’t scale or hire for later."
  },
  {
    question: "What types of projects are the best fit for Zumetrix Labs?",
    answer:
      "We are a great fit if you want to build: (1) a SaaS MVP or internal tool, (2) a React/Next.js dashboard or analytics platform, (3) a React Native mobile app, (4) an AI-powered product or assistant, or (5) a serious automation system that connects tools like Stripe, Airtable, Notion, or your CRM. We are usually not the right fit for one-off landing pages only, pure WordPress sites, or projects where there is no clear owner on your side."
  },
  {
    question: "How much does it cost to work with Zumetrix Labs?",
    answer:
      "Budgets depend on scope, complexity, and timeline. As a rough guideline: focused SaaS MVPs typically start around $8,000–$15,000, AI automation projects usually start from $3,000–$7,000, and larger web or mobile applications can go higher depending on advanced features, integrations, and long-term support. After an initial call, we send a clear proposal with scope, timeline, pricing, and responsibilities so you know exactly what you’re getting."
  },
  {
    question: "Do I own the code and intellectual property (IP)?",
    answer:
      "Yes. Once the project is paid for, you own the code, the IP, and the production infrastructure. We can host it for you or deploy it to your own accounts (GitHub, AWS, Vercel, Firebase, etc.). We also provide handover documentation and can stay on as a long-term technical partner if you want ongoing improvements and maintenance."
  },
  {
    question: "How do you communicate and manage projects across time zones?",
    answer:
      "Most of our clients are in US, UK, Europe, and the Middle East, so we are used to working across time zones. We typically use Slack, email, or WhatsApp for day-to-day updates, and schedule weekly or bi-weekly Zoom/Google Meet calls. You’ll get Loom video walkthroughs for key milestones, and we keep everything organized in shared documents or project boards so you can see progress without chasing us."
  },
  {
    question: "Can you work with my existing team or codebase?",
    answer:
      "Yes. We regularly join existing teams as React/Node/React Native experts, fix complex bugs, refactor legacy code, or build new modules on top of an existing system. Before touching your code, we’ll review the repository, discuss architecture constraints, and agree on a clear scope so we add value without creating new technical debt."
  },
  {
    question: "What happens after launch? Do you offer ongoing support?",
    answer:
      "Yes. After we launch your product, we can either hand everything over to your internal team or stay on as your technical partner. Many clients keep us for monthly retainers to handle new features, performance improvements, bug fixes, monitoring, and further automation of their operations. We prefer long-term relationships where we can keep improving the product over time instead of just doing a one-off build and disappearing."
  }
];

// Structured data for FAQ section
export const homeFAQStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFAQs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};