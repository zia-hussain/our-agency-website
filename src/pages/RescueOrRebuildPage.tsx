import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, Circle } from "lucide-react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionEyebrow from "../components/common/SectionEyebrow";
import {
  RESCUE_QUESTIONS,
  evaluateRescueOrRebuild,
  type RescueAnswers,
} from "../data/rescueOrRebuildModel";
import {
  trackRescueToolStarted,
  trackRescueToolCompleted,
  trackRescueToolCaseClicked,
  trackRescueToolServiceClicked,
  trackRescueToolContactStarted,
} from "../utils/analytics";

const pageUrl = "https://zumetrix.com/rescue-or-rebuild";
const TOTAL_STEPS = RESCUE_QUESTIONS.length;

type Step = "intro" | number | "result";

const RescueOrRebuildPage: React.FC = () => {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Partial<RescueAnswers>>({});
  const [includeContext, setIncludeContext] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const result = useMemo(() => {
    if (step !== "result") return null;
    if (
      !answers.structuralIntegrity ||
      !answers.operationalControl ||
      !answers.businessReversibility ||
      !answers.problemScope
    ) {
      return null;
    }
    return evaluateRescueOrRebuild(answers as RescueAnswers);
  }, [step, answers]);

  useEffect(() => {
    if (step === "result" && !hasCompleted) {
      trackRescueToolCompleted();
      setHasCompleted(true);
    }
  }, [step, hasCompleted]);

  const handleStart = () => {
    if (!hasStarted) {
      trackRescueToolStarted();
      setHasStarted(true);
    }
    setStep(0);
  };

  const handleAnswer = (questionIndex: number, value: string) => {
    const question = RESCUE_QUESTIONS[questionIndex];
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    window.setTimeout(() => {
      if (questionIndex === TOTAL_STEPS - 1) {
        setStep("result");
      } else {
        setStep(questionIndex + 1);
      }
    }, 220);
  };

  const handleBack = () => {
    if (step === "result") {
      setStep(TOTAL_STEPS - 1);
    } else if (typeof step === "number" && step > 0) {
      setStep(step - 1);
    } else {
      setStep("intro");
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setIncludeContext(false);
    setStep(0);
  };

  const buildContextNote = (): string => {
    if (!result) return "";
    const lines = RESCUE_QUESTIONS.map((q) => {
      const value = answers[q.id];
      const optionLabel = q.options.find((o) => o.value === value)?.label ?? "Not answered";
      return `${q.dimension}: ${optionLabel}`;
    });
    return [
      `I used the Rescue-or-Rebuild tool. My result: "${result.headline}".`,
      "",
      "My answers:",
      ...lines.map((l) => `- ${l}`),
      "",
      "More about my situation:",
    ].join("\n");
  };

  const contactHref = includeContext && result
    ? `/contact?service=product-rescue-stabilization&note=${encodeURIComponent(buildContextNote())}`
    : "/contact?service=product-rescue-stabilization";

  return (
    <PageTransition>
      <SEO
        title="Rescue or Rebuild? A Straight Answer for Your SaaS | Zumetrix Labs"
        description="A short tool that reads four signals about your codebase and business — not a quiz score — and points to one of six outcomes, from “no rebuild signal” to auditing first."
        image="https://zumetrix.com/project_images/rescue-or-rebuild-tool-og.png"
        imageAlt="Rescue or rebuild? Three answers (structural integrity, operational control, scope) select one of six outcomes through ordered rules, first match. Business Reversibility sets the stakes and never selects the outcome."
        url={pageUrl}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://zumetrix.com/" },
            { "@type": "ListItem", position: 2, name: "Rescue or Rebuild", item: pageUrl },
          ],
        }}
      />

      <section className="relative overflow-hidden bg-background pt-28 sm:pt-32 pb-24 sm:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_10%,rgba(196,138,100,0.08),transparent_70%)]" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {step === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <AnimatedSection mode="hero" className="text-center">
                  <SectionEyebrow className="mb-7">A Straight Answer, Not a Quiz Score</SectionEyebrow>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
                    Rescue or rebuild?
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-4 max-w-xl mx-auto">
                    Four questions about your actual situation — not a lead form. If the honest answer is
                    "you're fine," this tool will tell you that.
                  </p>
                  <p className="text-sm text-muted-foreground/70 mb-10">
                    No email required. No score. "I don't know" is a valid answer to every question.
                  </p>
                  <button
                    type="button"
                    onClick={handleStart}
                    className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen"
                  >
                    Start — takes about a minute
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                      <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                    </span>
                  </button>
                </AnimatedSection>

                <AnimatedSection mode="hero" delay={0.06} className="mt-16 sm:mt-20">
                  <div className="rounded-3xl border border-border/50 bg-card/10 p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-6 text-center">
                      What we'll actually ask about
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {RESCUE_QUESTIONS.map((q, i) => (
                        <div
                          key={q.id}
                          className="rounded-2xl border border-border/50 bg-background/40 px-4 py-4 sm:px-5 sm:py-5"
                        >
                          <span className="flex items-center justify-center w-7 h-7 rounded-full border border-primary/30 text-xs font-mono text-primary mb-3">
                            {i + 1}
                          </span>
                          <p className="text-sm font-semibold text-foreground leading-snug">{q.dimension}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-xs text-muted-foreground/60 mt-5">
                    Same framework behind our{" "}
                    <Link to="/articles/should-you-rescue-or-rebuild-your-saas" className="text-primary/80 hover:text-primary underline underline-offset-2">
                      Rescue-or-Rebuild decision guide
                    </Link>
                    .
                  </p>
                </AnimatedSection>
              </motion.div>
            )}

            {typeof step === "number" && (
              <motion.div
                key={`question-${step}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between mb-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <div className="flex items-center gap-1.5">
                    {RESCUE_QUESTIONS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === step ? "w-6 bg-primary" : i < step ? "w-1.5 bg-primary/50" : "w-1.5 bg-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground/70 tabular-nums">
                    {step + 1} / {TOTAL_STEPS}
                  </span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                  {RESCUE_QUESTIONS[step].dimension}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3 leading-snug">
                  {RESCUE_QUESTIONS[step].prompt}
                </h2>
                <p className="text-sm text-muted-foreground mb-8">{RESCUE_QUESTIONS[step].helper}</p>

                <div className="space-y-3">
                  {RESCUE_QUESTIONS[step].options.map((option) => {
                    const isSelected = answers[RESCUE_QUESTIONS[step].id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleAnswer(step, option.value)}
                        className={`w-full text-left flex items-start gap-3 rounded-2xl border px-5 py-4 transition-all duration-200 ${
                          isSelected
                            ? "border-primary/60 bg-primary/[0.06]"
                            : "border-border/60 bg-card/10 hover:border-primary/30 hover:bg-card/20"
                        }`}
                      >
                        {isSelected ? (
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                        ) : (
                          <Circle size={18} className="mt-0.5 shrink-0 text-muted-foreground/40" />
                        )}
                        <span className="text-[15px] leading-snug text-foreground">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <div className="text-center mb-10">
                  <SectionEyebrow className="mb-5">Your Read</SectionEyebrow>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-6 text-balance">
                    {result.headline}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">{result.yourRead}</p>
                </div>

                <div className="space-y-8 rounded-3xl border border-border/50 bg-card/10 p-6 sm:p-8">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">Why</h3>
                    <p className="text-[15px] text-foreground/90 leading-relaxed">{result.why}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                      Signals that mattered
                    </h3>
                    <ul className="space-y-2">
                      {result.signalsThatMattered.map((signal, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[15px] text-foreground/90 leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
                          {signal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                      What to check next
                    </h3>
                    <ul className="space-y-2">
                      {result.whatToCheckNext.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[15px] text-foreground/90 leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
                      What could change this
                    </h3>
                    <ul className="space-y-2">
                      {result.whatCouldChangeThis.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[15px] text-foreground/90 leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-border/50 bg-background/40 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
                      Is professional review warranted?
                    </h3>
                    <p className="text-[15px] text-foreground/90 leading-relaxed">
                      <span className="font-semibold">
                        {result.professionalReview.warranted ? "Yes — " : "Not necessarily — "}
                      </span>
                      {result.professionalReview.explanation}
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex flex-col items-center gap-6">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                      to="/portfolio/fast-track-usa-app-rescue"
                      onClick={trackRescueToolCaseClicked}
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/20 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200"
                    >
                      See a related case study
                    </Link>
                    <Link
                      to="/services/product-rescue-stabilization"
                      onClick={trackRescueToolServiceClicked}
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/20 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200"
                    >
                      See how we approach this
                    </Link>
                  </div>

                  <label className="flex max-w-md cursor-pointer items-start gap-3 rounded-xl border border-border/50 bg-card/10 p-4 text-left">
                    <input
                      type="checkbox"
                      checked={includeContext}
                      onChange={(e) => setIncludeContext(e.target.checked)}
                      className="mt-0.5"
                    />
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      Include a short summary of my answers and result in my message, so I don't have to repeat
                      myself. Nothing is sent unless I click through and submit the contact form myself.
                    </span>
                  </label>

                  <Link
                    to={contactHref}
                    onClick={trackRescueToolContactStarted}
                    className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen"
                  >
                    Talk to us about this
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                      <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/70 hover:text-foreground transition-colors duration-200"
                  >
                    <RotateCcw size={12} /> Start over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
};

export default RescueOrRebuildPage;
