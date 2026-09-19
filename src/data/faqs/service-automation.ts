// AI Automation & Workflows detail-page FAQ — questions specific to
// automating a real operation, not a repeat of the Services hub's FAQ.
export const automationDetailFAQs = [
  {
    question: "What kinds of tools can actually be connected?",
    answer:
      "CRMs, spreadsheets, Slack, Airtable, Shopify, and other tools that expose an API or a webhook — connected through Make.com, Zapier, n8n, or custom integration logic where a no-code platform isn't enough. Floating Stone Ranch is a real example: Airtable as the source of truth, Make.com scenarios automating status changes across carcass, box, and shipment records.",
  },
  {
    question: "What happens when a step in the automation fails?",
    answer:
      "That's part of what we design for, not an afterthought — error handling and recoverability matter as much as the happy path, because an automation nobody trusts gets turned off. Reliability under real, messy operational conditions is the actual deliverable, not just the workflow diagram.",
  },
  {
    question: "Is this AI, or just no-code automation?",
    answer:
      "Whichever the problem actually needs. Some workflows are pure deterministic logic — Make.com or n8n moving data between tools with no AI involved. Others genuinely benefit from OpenAI-powered steps — document processing, email parsing, custom bots. We pick based on what the task needs, not what sounds more advanced.",
  },
  {
    question: "How do we know it's actually saving time, not just adding complexity?",
    answer:
      "Automated reporting and clear before/after visibility are part of the build — Floating Stone Ranch went from scattered paperwork to 100% centralized data with manual steps reduced by roughly 60%. You should be able to see the operational change, not just trust that it happened.",
  },
  {
    question: "Who maintains it after launch?",
    answer:
      "Either your team, with documentation and training so the system isn't a black box, or us on an ongoing basis if you'd rather not manage it. We'll tell you honestly which one fits before you have to guess.",
  },
];
