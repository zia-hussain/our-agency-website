// The Product Rescue (and, later, any offer's) lifecycle: the state names
// themselves, the business-day math the 5-day delivery promise depends on,
// and the one transition function ("payment became verified") that every
// future payment provider will eventually call into. Kept provider-neutral
// per audit Section 11 — this file has never heard of Stripe.

// Subset of the states listed in the architecture brief that this
// implementation actually drives. Two states from that list aren't used yet
// and are left out rather than wired to nothing: "in_progress" (the
// assessment work itself isn't tracked by this system, Section 9 — it's
// email + Airtable/Notion the way you already work) and "lost" (there's no
// automated path that ever sets it; a human sets it directly in
// Airtable/Notion when an opportunity dies, same as any other manual stage
// change).
export const STATUS = Object.freeze({
  APPLIED: "applied",
  QUALIFYING: "qualifying",
  STANDARD_FIT: "standard_fit",
  CUSTOM_SCOPE: "custom_scope",
  DECLINED: "declined",
  ACCEPTED: "accepted",
  PAYMENT_PENDING: "payment_pending",
  PAID: "paid",
  INTAKE_PENDING: "intake_pending",
  ACCESS_PENDING: "access_pending",
  READY: "ready",
  DELIVERED: "delivered",
});

export const addBusinessDays = (date, days) => {
  const d = new Date(date);
  let remaining = days;
  while (remaining > 0) {
    d.setUTCDate(d.getUTCDate() + 1);
    const day = d.getUTCDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return d;
};

// The 5-business-day promise is measured from "required access/evidence is
// ready," never from payment (Section 2/12) — this function is only ever
// called once both intake and access are true.
export const computeDeliveryDueDate = (clockStartDate) => addBusinessDays(clockStartDate, 5).toISOString();

/** True once both halves of "Day 0" are true. Payment is deliberately not a
 * factor here — the clock is about intake + access being ready, matching
 * the commercial rule stated in the brief. */
export const isClockEligible = ({ intakeComplete, accessReady }) => Boolean(intakeComplete && accessReady);
