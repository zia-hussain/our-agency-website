import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Circle, Clock, ArrowRight } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageTransition from "../../components/common/PageTransition";
import { fetchRescueStatus, submitRescueIntake, type RescueStatus } from "../../services/offerApplication";
import { trackEvent } from "../../utils/analytics";

// Same shared, offer-agnostic status contract as Product Rescue's and
// Idea-to-Build's ConfirmedPage — see api/rescue-status.js's header
// comment (2026-09-30 BUILD/AUTOMATE expansion).
type ViewState = "loading" | "not-found" | "ready";

const ChecklistRow: React.FC<{ label: string; done: boolean; note?: string }> = ({ label, done, note }) => (
  <div className="flex items-start gap-3.5 rounded-xl border border-border/50 bg-card/10 px-5 py-4">
    <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${done ? "border-primary bg-primary/15 text-primary" : "border-border/60 text-muted-foreground/40"}`}>
      {done ? <Check size={12} strokeWidth={3} /> : <Circle size={8} />}
    </span>
    <div>
      <p className={`text-sm font-semibold ${done ? "text-foreground" : "text-foreground/70"}`}>{label}</p>
      {note && <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{note}</p>}
    </div>
  </div>
);

const ManualToSystemConfirmedPage: React.FC = () => {
  const [params] = useSearchParams();
  const ref = params.get("ref") || "";
  const [view, setView] = useState<ViewState>("loading");
  const [status, setStatus] = useState<RescueStatus | null>(null);
  const [accessReady, setAccessReady] = useState(false);
  const [accessNote, setAccessNote] = useState("");
  const [intakeSubmitting, setIntakeSubmitting] = useState(false);
  const [intakeError, setIntakeError] = useState("");
  const [intakeDone, setIntakeDone] = useState(false);

  useEffect(() => {
    if (!ref) {
      setView("not-found");
      return;
    }
    fetchRescueStatus(ref).then((result) => {
      if (!result.found) {
        setView("not-found");
        return;
      }
      setStatus(result);
      setView("ready");
      if (result.paymentVerified) trackEvent("offer_day0_confirmed", { offer: "manual-to-system" });
    });
  }, [ref]);

  const submitIntake = async () => {
    setIntakeSubmitting(true);
    setIntakeError("");
    const result = await submitRescueIntake(ref, accessReady, accessNote);
    setIntakeSubmitting(false);
    if (!result.found) {
      setIntakeError(result.error || "We could not save that just now. Please try again.");
      return;
    }
    setStatus(result);
    setIntakeDone(true);
  };

  return (
    <PageTransition>
      <SEO
        title="Sprint Status | Zumetrix Labs"
        description="Your Manual-to-System Sprint status."
        url="https://zumetrix.com/manual-to-system/confirmed"
        noIndex
      />

      <div className="min-h-screen bg-background px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-lg">
          {view === "loading" && (
            <div className="flex justify-center pt-20">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            </div>
          )}

          {view === "not-found" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pt-16 text-center">
              <h1 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">We couldn't find that status link.</h1>
              <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Links like this come from a payment-confirmation email and expire once used incorrectly.
                If you're expecting one, check your inbox — or reply to any email from us and we'll sort it out directly.
              </p>
              <Link to="/" className="text-sm font-medium text-primary hover:underline underline-offset-2">
                Back to zumetrix.com
              </Link>
            </motion.div>
          )}

          {view === "ready" && status && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Your sprint status.</h1>
              <p className="mb-10 text-sm leading-relaxed text-muted-foreground">
                The 5-business-day clock starts once every item below is checked — not the moment payment
                was made.
              </p>

              <div className="space-y-3">
                <ChecklistRow label="Payment" done={Boolean(status.paymentVerified)} />
                <ChecklistRow label="Intake form" done={Boolean(status.intakeComplete)} />
                <ChecklistRow label="Workflow context" done={Boolean(status.accessReady)} />
              </div>

              {status.deliveryDueAt && (
                <div className="mt-8 flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/[0.05] px-5 py-4">
                  <Clock size={16} className="flex-shrink-0 text-primary" />
                  <p className="text-sm text-foreground">
                    System Plan due by <span className="font-semibold">{new Date(status.deliveryDueAt).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span>.
                  </p>
                </div>
              )}

              {status.paymentVerified && !status.intakeComplete && !intakeDone && (
                <div className="mt-12 rounded-2xl border border-border/50 bg-card/10 p-6 sm:p-7">
                  <h2 className="mb-1.5 text-lg font-bold text-foreground">Finish your intake</h2>
                  <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                    One question — no credentials, ever needed for this sprint. We'll follow up
                    separately for whatever walkthrough the sprint actually needs.
                  </p>
                  <div className="space-y-4">
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/50 bg-background/40 p-4">
                      <input type="checkbox" checked={accessReady} onChange={(e) => setAccessReady(e.target.checked)} className="mt-1 h-4 w-4 accent-primary" />
                      <span className="text-sm leading-relaxed text-foreground">I can walk you through the current workflow within the next 2 business days.</span>
                    </label>
                    <textarea
                      value={accessNote}
                      onChange={(e) => setAccessNote(e.target.value)}
                      placeholder="A Loom, screenshots of the current tools, or anything else worth knowing before we start. (optional)"
                      rows={3}
                      className="w-full rounded-xl border border-border/50 bg-background/40 p-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none"
                    />
                    {intakeError && <p className="text-sm text-red-400/80">{intakeError}</p>}
                    <button
                      type="button"
                      onClick={submitIntake}
                      disabled={intakeSubmitting}
                      className="btn-sheen inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    >
                      {intakeSubmitting ? "Saving…" : "Submit intake"}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {(intakeDone || status.intakeComplete) && (
                <p className="mt-10 text-sm text-muted-foreground">
                  Intake received. We'll reach out to arrange the walkthrough, and this page will
                  update once the clock starts.
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ManualToSystemConfirmedPage;
