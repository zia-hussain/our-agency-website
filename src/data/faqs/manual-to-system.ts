// /manual-to-system FAQ — questions specific to the paid sprint (price,
// boundary, what happens if it's not a fit). Mirrors the structure of
// src/data/faqs/product-rescue.ts but answers a different buyer's actual
// questions, not a reskinned copy of the same six.
export const manualToSystemFAQs = [
  {
    question: "Are you just going to tell me to buy Zapier?",
    answer:
      "No. Tools are the last decision, not the first. We start with what should be removed or simplified — sometimes that alone fixes more than automation would, and we'll say so even if it means a smaller sprint.",
  },
  {
    question: "Do you build the automation?",
    answer:
      "No — implementation is separate, on purpose. The sprint is the decision: what to remove, simplify, connect, automate, or keep human, and in what order. Once that's clear, you can build it with your own team, another team, or us.",
  },
  {
    question: "Will you tell me to add AI everywhere?",
    answer:
      "No. We don't recommend AI because the offer sits under \"automation\" — most workflow problems are solved by removing steps, simplifying a process, or connecting two tools with deterministic rules. AI only shows up in the plan if the workflow genuinely needs it.",
  },
  {
    question: "What counts as \"one bounded workflow\"?",
    answer:
      "One recurring chain of work with a clear trigger and outcome — lead to booking, inquiry to onboarding, order to fulfillment, that kind of thing — even if it touches a few tools or people. If it genuinely spans several departments or workflows that need to be redesigned together, we'll say so before you pay, not after.",
  },
  {
    question: "What if the answer is mostly \"keep doing this manually\"?",
    answer:
      "Then that's what the Plan says. We're not paid more for recommending more automation — the sprint costs the same $750 whether the plan is \"automate most of this\" or \"remove two steps and leave the rest.\"",
  },
  {
    question: "What if I'm not accepted as a standard fit?",
    answer:
      "We'll say so before asking you to pay anything, and tell you why — either a custom scope that fits your actual situation, or point you at Product Rescue or Idea-to-Build if one of those is actually the better fit.",
  },
  {
    question: "When does the 5-business-day clock actually start?",
    answer:
      "Once payment, a short intake form, and a walkthrough of the current workflow are all in place — not the moment you pay. If arranging that takes a few extra days, the clock waits for it.",
  },
  {
    question: "Do I need to document the workflow before applying?",
    answer:
      "No. A working call, a Loom walkthrough, or clear answers to our questions are enough to start. If you already have process documentation, it helps — but it's not a requirement to apply.",
  },
];
