import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, X } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageTransition from "../../components/common/PageTransition";
import { getOffer } from "../../config/offers";
import { AutoTextarea, ChoiceButtons, inputBase } from "../offers/formPrimitives";
import { prefillKey } from "../offers/RecognitionSelector";
import { submitOfferApplication } from "../../services/offerApplication";
import { trackEvent } from "../../utils/analytics";

const offer = getOffer("manual-to-system")!;
const DRAFT_KEY = "zumetrix:manual-to-system:draft";
const PREFILL_KEY = prefillKey("manual-to-system");

// Commercial experience pass (2026-10-01): the previous version asked two
// open essay questions — "what's actually happening" and "what are you
// trying to decide" — which amounts to asking the operator to perform the
// REMOVE/SIMPLIFY/CONNECT/AUTOMATE/KEEP-HUMAN analysis themselves before
// paying for exactly that analysis. Rebuilt around recognition: pick the
// friction type and the scope signal, write almost nothing. decisionNeeded
// and problemDescription (the two fields the shared backend already
// expects and validates — see api/offer-application.js) are now COMPOSED
// from those choices, so the backend contract is unchanged; only how the
// frontend fills it is different.
interface FormState {
  situationType: string;
  productName: string;
  productDescription: string;
  frictionType: string;
  scopeBoundary: string;
  extraContext: string;
  name: string;
  email: string;
  company: string;
  marketingConsent: boolean;
}

const EMPTY: FormState = {
  situationType: "",
  productName: "",
  productDescription: "",
  frictionType: "",
  scopeBoundary: "",
  extraContext: "",
  name: "",
  email: "",
  company: "",
  marketingConsent: false,
};

const SITUATION_TYPES = [
  { value: "team-is-bottleneck", label: "Our team keeps doing the same manual work" },
  { value: "copying-data", label: "We're copying data between tools by hand" },
  { value: "hiring-for-repetition", label: "We keep hiring to handle repetitive work" },
  { value: "tool-suggestions-dont-stick", label: "Tool suggestions keep coming, nothing sticks" },
  { value: "automation-made-it-worse", label: "We tried automating before and it got messier" },
  { value: "something-else", label: "Something else" },
];

// The specific mechanical nature of the friction within this workflow —
// distinct from the macro "why are you here" of Situation above.
const FRICTION_TYPE_OPTIONS = [
  { value: "manual-data-entry", label: "Copying data between tools by hand" },
  { value: "waiting-handoffs", label: "Waiting on handoffs between people" },
  { value: "manual-checking", label: "Manually checking or approving things" },
  { value: "chasing-followups", label: "Chasing follow-ups that fall through" },
  { value: "something-else-friction", label: "Something else" },
];

// The one genuine Custom-Scope signal this offer needs pre-payment —
// matches the Custom Scope triggers already agreed with the client
// (several departments, legacy systems, original data analysis).
const SCOPE_BOUNDARY_OPTIONS = [
  { value: "one-workflow-one-team", label: "One clear workflow, one team" },
  { value: "few-tools-one-team", label: "One team, but touches several tools" },
  { value: "multiple-departments", label: "Spans multiple departments or teams" },
  { value: "legacy-systems", label: "Involves legacy systems or complex permissions" },
  { value: "needs-data-analysis", label: "Needs original data analysis first" },
  { value: "not-sure", label: "Not sure — that's part of what I need help with" },
];

const STEPS = [
  { id: "situation", title: "What best describes where you're stuck?", sub: "Pick the closest one — there's room to explain later." },
  { id: "workflow", title: "What's the workflow, and where's the friction?", sub: "A name or area of the business, and what actually slows it down." },
  { id: "boundary", title: "Is this one clear workflow, or something bigger?", sub: "Pick what's true — this helps us scope the sprint correctly before you pay." },
  { id: "contact", title: "Last thing — who are we talking to?", sub: "So we can send the review and next steps." },
  { id: "review", title: "Take a look before you send it.", sub: "Everything below is what we'll review." },
];

function composeDecisionNeeded(data: FormState): string {
  return SCOPE_BOUNDARY_OPTIONS.find((o) => o.value === data.scopeBoundary)?.label || "";
}
function composeProblemDescription(data: FormState): string {
  const frictionLabel = FRICTION_TYPE_OPTIONS.find((o) => o.value === data.frictionType)?.label;
  if (!frictionLabel) return data.extraContext.trim();
  const extra = data.extraContext.trim();
  return `Friction: ${frictionLabel}.${extra ? ` ${extra}` : ""}`;
}

function ReviewSummary({ data }: { data: FormState }) {
  const items = [
    { label: "Situation", value: SITUATION_TYPES.find((s) => s.value === data.situationType)?.label },
    { label: "Workflow", value: data.productName },
    { label: "Tools involved", value: data.productDescription },
    { label: "Friction", value: FRICTION_TYPE_OPTIONS.find((s) => s.value === data.frictionType)?.label },
    { label: "Scope", value: SCOPE_BOUNDARY_OPTIONS.find((s) => s.value === data.scopeBoundary)?.label },
    { label: "More context", value: data.extraContext },
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Company", value: data.company },
  ].filter((i) => i.value);

  return (
    <div className="space-y-0 border border-border/50 rounded-3xl overflow-hidden">
      {items.map((item) => (
        <div key={item.label} className="flex gap-4 px-6 py-4 border-b border-border/40 last:border-0">
          <span className="text-primary/50 text-sm w-28 shrink-0 pt-0.5">{item.label}</span>
          <span className="text-foreground/80 text-sm leading-relaxed flex-1 whitespace-pre-line">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function SituationSummary({ data }: { data: FormState }) {
  const rows: { label: string; value: string }[] = [];
  if (data.situationType) {
    const label = SITUATION_TYPES.find((s) => s.value === data.situationType)?.label;
    if (label) rows.push({ label: "Situation", value: label });
  }
  if (data.frictionType) {
    const label = FRICTION_TYPE_OPTIONS.find((s) => s.value === data.frictionType)?.label;
    if (label) rows.push({ label: "Friction", value: label });
  }
  if (data.scopeBoundary) {
    const label = SCOPE_BOUNDARY_OPTIONS.find((s) => s.value === data.scopeBoundary)?.label;
    if (label) rows.push({ label: "Scope", value: label });
  }

  if (rows.length === 0) return null;

  return (
    <motion.div layout className="mt-10 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/70">Here's what we're hearing</p>
      <div className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex gap-3 text-xs">
            <span className="w-28 flex-shrink-0 text-muted-foreground/55">{row.label}</span>
            <span className="flex-1 leading-relaxed text-foreground/85 line-clamp-2">{row.value}</span>
          </div>
        ))}
      </div>
      <p className="mt-3.5 border-t border-primary/10 pt-3 text-[11px] text-muted-foreground/45">
        What you're telling us — not yet what we've mapped.
      </p>
    </motion.div>
  );
}

function ConfirmationState({ email }: { email: string }) {
  const stages = ["Review", "Fit decision", "Scope confirmation", "Payment", "Sprint"];
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="pt-16 text-center sm:pt-24">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/30 bg-background mx-auto mb-8 shadow-[0_25px_50px_-22px_rgba(196,138,100,0.35)]">
        <CheckCircle2 size={28} className="text-primary" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">We have the context.</h1>
      <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto mb-3">
        We'll review whether the Manual-to-System Sprint is actually the right fit before asking you
        to spend anything. A confirmation is on its way to <span className="text-foreground">{email}</span>.
      </p>
      <p className="text-sm text-muted-foreground/70 mb-12">Usually within one business day.</p>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
        {stages.map((stage, i) => (
          <React.Fragment key={stage}>
            <span
              className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                i === 1 ? "border-primary/50 bg-primary/[0.08] text-primary" : "border-border/50 text-muted-foreground"
              }`}
            >
              {stage}
            </span>
            {i < stages.length - 1 && <ArrowRight size={12} className="text-border" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <Link to="/" className="text-sm font-medium text-primary hover:underline underline-offset-2">
          Back to zumetrix.com
        </Link>
      </div>
    </motion.div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -18 : 18 }),
};
const slideVariantsReduced = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const ManualToSystemApplyPage: React.FC = () => {
  const [phase, setPhase] = useState<"intro" | "form" | "submitting" | "done">("intro");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FormState>(EMPTY);
  const [hpToken, setHpToken] = useState("");
  const [error, setError] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const hasStartedRef = useRef(false);
  const isSubmittingRef = useRef(false);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    let restoredFromDraft = false;
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as Partial<FormState>;
        restoredFromDraft = Boolean(draft.situationType);
        setData((prev) => ({ ...prev, ...draft }));
      }
    } catch {
      // Private browsing / storage disabled — form still works, just without recovery.
    }

    if (!restoredFromDraft) {
      try {
        const situation = window.sessionStorage.getItem(PREFILL_KEY);
        window.sessionStorage.removeItem(PREFILL_KEY);
        if (situation && SITUATION_TYPES.some((s) => s.value === situation)) {
          setData((prev) => ({ ...prev, situationType: situation }));
          setPrefilled(true);
        }
      } catch {
        // Same as above — non-fatal.
      }
    }
  }, []);

  useEffect(() => {
    if (phase !== "form") return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      // Same as above — non-fatal.
    }
  }, [data, phase]);

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  }, [step, phase, shouldReduceMotion]);

  const startForm = () => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackEvent("offer_application_started", { offer: offer.slug });
    }
    setPhase("form");
  };

  const validate = (): string => {
    switch (STEPS[step].id) {
      case "situation":
        return data.situationType ? "" : "Choose the option closest to your situation.";
      case "workflow":
        if (!data.productName.trim()) return "Give the workflow a name, even a rough one.";
        if (!data.productDescription.trim()) return "Tell us which tools are currently involved.";
        if (!data.frictionType) return "Pick the option closest to what's actually slowing things down.";
        return "";
      case "boundary":
        return data.scopeBoundary ? "" : "Pick the option closest to your situation.";
      case "contact":
        if (!data.name.trim()) return "Your name is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "A valid email is required.";
        return "";
      default:
        return "";
    }
  };

  const next = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prev = () => {
    setError("");
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setPhase("submitting");
    setError("");
    const result = await submitOfferApplication({
      offerSlug: offer.slug,
      name: data.name,
      email: data.email,
      company: data.company || undefined,
      situationType: data.situationType,
      productName: data.productName,
      productDescription: data.productDescription,
      problemDescription: composeProblemDescription(data),
      decisionNeeded: composeDecisionNeeded(data),
      marketingConsent: data.marketingConsent,
      hpToken: hpToken || undefined,
    });

    if (!result.success) {
      isSubmittingRef.current = false;
      setPhase("form");
      setError(result.error || "We could not send this. Please try again, or email hello@zumetrix.com.");
      return;
    }

    trackEvent("offer_application_submitted", { offer: offer.slug });
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      // non-fatal
    }
    setPhase("done");
  };

  const isLast = step === STEPS.length - 1;
  const pct = useMemo(() => Math.round(((step + 1) / STEPS.length) * 100), [step]);
  const variants = shouldReduceMotion ? slideVariantsReduced : slideVariants;
  const current = STEPS[step];

  return (
    <PageTransition>
      <SEO
        title="Apply — Manual-to-System Sprint | Zumetrix Labs"
        description="Apply for the Manual-to-System Sprint — a short application, reviewed by hand before you're ever asked to pay."
        url="https://zumetrix.com/manual-to-system/apply"
        noIndex
      />

      <div className="min-h-screen bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {phase === "intro" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="pt-16 text-center sm:pt-24">
              <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Let's start with the workflow.
              </h1>
              <p className="mx-auto mb-3 max-w-md text-lg leading-relaxed text-muted-foreground">
                Mostly picking, barely any typing. No process documentation required. About two minutes.
              </p>
              <p className="mx-auto mb-10 max-w-md text-sm text-muted-foreground/70">
                We review every application by hand — you won't be charged anything from here.
              </p>
              <button
                type="button"
                onClick={startForm}
                className="btn-sheen group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
              >
                Start the application
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </button>
            </motion.div>
          )}

          {(phase === "form" || phase === "submitting") && (
            <>
              <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
                <label htmlFor="mts_company_confirm">Leave this field empty</label>
                <input id="mts_company_confirm" name="mts_company_confirm" type="text" tabIndex={-1} autoComplete="off" value={hpToken} onChange={(e) => setHpToken(e.target.value)} />
              </div>

              <div className="mb-10 flex items-center justify-between pt-16 sm:pt-24">
                {step > 0 ? (
                  <button type="button" onClick={prev} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                    <ArrowLeft size={14} /> Back
                  </button>
                ) : (
                  <span />
                )}
                <div className="hidden items-center gap-1.5 sm:flex">
                  {STEPS.map((_, i) => (
                    <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-primary" : i < step ? "w-1.5 bg-primary/50" : "w-1.5 bg-border"}`} />
                  ))}
                </div>
                <span className="text-xs font-medium tabular-nums text-muted-foreground/70">{step + 1} / {STEPS.length}</span>
              </div>

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: shouldReduceMotion ? 0.01 : 0.26, ease: "easeOut" }}>
                  <h2 className="mb-2 text-2xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl">{current.title}</h2>
                  <p className="mb-8 text-sm text-muted-foreground">{current.sub}</p>

                  {current.id === "situation" && (
                    <>
                      {prefilled && data.situationType && (
                        <p className="mb-4 text-xs font-medium text-primary/80">Carried over from what you told us — change it if it's not quite right.</p>
                      )}
                      <ChoiceButtons options={SITUATION_TYPES} value={data.situationType} onSelect={(v) => { update("situationType", v); setError(""); setPrefilled(false); }} />
                    </>
                  )}

                  {current.id === "workflow" && (
                    <div className="space-y-8">
                      <input autoFocus className={inputBase} placeholder="e.g. Lead intake, client onboarding, order fulfillment" value={data.productName} onChange={(e) => update("productName", e.target.value)} />
                      <AutoTextarea value={data.productDescription} onChange={(v) => update("productDescription", v)} placeholder="Which tools, spreadsheets, or people are currently involved?" rows={2} />
                      <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/50">What's actually slowing it down</p>
                        <ChoiceButtons options={FRICTION_TYPE_OPTIONS} value={data.frictionType} onSelect={(v) => { update("frictionType", v); setError(""); }} />
                      </div>
                    </div>
                  )}

                  {current.id === "boundary" && (
                    <div className="space-y-8">
                      <ChoiceButtons options={SCOPE_BOUNDARY_OPTIONS} value={data.scopeBoundary} onSelect={(v) => { update("scopeBoundary", v); setError(""); }} />
                      <AutoTextarea value={data.extraContext} onChange={(v) => update("extraContext", v)} placeholder="Anything else worth knowing, in a sentence or two? (optional)" rows={2} />
                    </div>
                  )}

                  {current.id === "contact" && (
                    <div className="space-y-8">
                      <input autoFocus type="text" autoComplete="name" className={inputBase} placeholder="Your full name" value={data.name} onChange={(e) => update("name", e.target.value)} />
                      <input type="email" autoComplete="email" className={inputBase} placeholder="you@company.com" value={data.email} onChange={(e) => update("email", e.target.value)} />
                      <input type="text" autoComplete="organization" className={`${inputBase} text-base sm:text-lg`} placeholder="Company (optional)" value={data.company} onChange={(e) => update("company", e.target.value)} />
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                        <input type="checkbox" checked={data.marketingConsent} onChange={(e) => update("marketingConsent", e.target.checked)} className="mt-1 h-4 w-4 accent-primary" />
                        <span className="text-sm leading-relaxed text-muted-foreground">Send me occasional practical notes about product decisions. Optional, unsubscribe anytime.</span>
                      </label>
                    </div>
                  )}

                  {current.id === "review" && <ReviewSummary data={data} />}
                </motion.div>
              </AnimatePresence>

              {step > 0 && current.id !== "review" && <SituationSummary data={data} />}

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 flex items-center gap-3 rounded-2xl border border-red-500/15 bg-red-500/[0.06] p-4">
                    <AlertCircle size={16} className="flex-shrink-0 text-red-400/70" />
                    <p role="alert" className="flex-1 text-sm text-red-400/80">{error}</p>
                    <button type="button" onClick={() => setError("")} aria-label="Dismiss">
                      <X size={16} className="text-red-400/40 hover:text-red-400/70" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12 flex items-center justify-between">
                <span className="hidden text-xs text-muted-foreground/40 sm:inline">{pct}% complete</span>
                {!isLast ? (
                  <button
                    type="button"
                    onClick={next}
                    className="btn-sheen group ml-auto inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
                  >
                    Continue
                    <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={phase === "submitting"}
                    className="btn-sheen group ml-auto inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {phase === "submitting" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send application
                        <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          )}

          {phase === "done" && <ConfirmationState email={data.email} />}
        </div>
      </div>
    </PageTransition>
  );
};

export default ManualToSystemApplyPage;
