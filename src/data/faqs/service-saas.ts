// SaaS Product Development detail-page FAQ — questions specific to the
// decision of starting a SaaS build, not a repeat of the Services hub's FAQ.
export const saasDetailFAQs = [
  {
    question: "I only have an idea, not a spec. Is that enough to start?",
    answer:
      "Yes — that's the normal starting point. Before any build work begins, we work through what your first version actually needs to prove, what can wait, and what the real user flow looks like. You don't need a finished spec; you need to be ready to make scope decisions with us.",
  },
  {
    question: "How do you decide what belongs in V1?",
    answer:
      "By what the product needs to prove first, not by what's easiest to imagine. Liftly is a real example: the founder's full vision included a sophisticated variable-pricing engine, but V1 shipped the operational core — booking, serviceability, payment, admin controls — because that had to work before pricing sophistication had anything real to price. The bigger vision gets designed, not skipped.",
  },
  {
    question: "Do you build subscriptions and payments, or just the UI?",
    answer:
      "We build the real mechanics — Stripe integration, subscription management, multi-tenant access control with roles and permissions, the admin panel that runs the business behind the product. A SaaS product isn't done at the login screen.",
  },
  {
    question: "Who owns the code and the product?",
    answer:
      "You do. Once the project is paid for, you own the code, the IP, and the infrastructure it runs on. We can hand it to your own accounts (GitHub, Vercel, Supabase, etc.) with documentation, or stay on as a long-term technical partner if you want to keep building.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Either we hand everything over to your team, or we stay on as a monthly retainer for new features, fixes, and iteration — whichever fits how fast you expect to move. We'll tell you honestly which one makes sense before you have to guess.",
  },
];
