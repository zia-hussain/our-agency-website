// Mobile App Development detail-page FAQ — questions specific to shipping
// a real mobile product, not a repeat of the Services hub's FAQ.
export const mobileDetailFAQs = [
  {
    question: "Do you build for iOS and Android separately?",
    answer:
      "Often from one React Native codebase, which can be easier to maintain than two separate native apps. When a feature genuinely needs platform-specific code, we build it natively rather than forcing a workaround.",
  },
  {
    question: "What does app store submission actually involve?",
    answer:
      "We handle the submission process for both the App Store and Google Play — store listings, build configuration, and the review requirements each platform has — so launch isn't a separate project you have to figure out afterward.",
  },
  {
    question: "How do you test on real devices, not just simulators?",
    answer:
      "Performance monitoring and crash analytics are part of the build, not bolted on after launch, so issues that only show up on real devices under real conditions get caught before your users hit them.",
  },
  {
    question: "Can the app work offline or sync data in real time?",
    answer:
      "Both, depending on what the product needs — offline mode and push notifications are standard parts of what we build, backed by real backend integration (Firebase, custom APIs, or whatever your data actually requires).",
  },
  {
    question: "What happens after the app is live?",
    answer:
      "Either we hand over the codebase and documentation, or we stay on for updates and new features as a retainer — the same choice as our other services. Store review cycles mean updates need a real process, not guesswork, and we handle that.",
  },
];
