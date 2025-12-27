# CLIENT ONBOARDING SYSTEM
**Last Updated:** Dec 2025
**For:** Zumetrix Labs - The 72 Hours That Set The Tone

---

## WHY THIS MATTERS

Bad onboarding = scope creep, missed expectations, refund requests, nightmare clients.

Good onboarding = smooth delivery, clear boundaries, clients who trust you.

The goal: Get from "contract signed" to "work starting" in 3-5 days max, with zero confusion.

---

## ONBOARDING CHECKLIST (DO IN ORDER)

### HOUR 0: Contract Signed + Deposit Received

**Immediately send:**

**Subject:** Welcome to Zumetrix Labs - What Happens Next

**Body:**
```
Hey [Name],

Welcome aboard. Here's what happens next:

TODAY:
- You'll receive access to our project workspace (Notion/ClickUp/Slack)
- You'll get a welcome doc with homework (yes, homework)

WITHIN 48 HOURS:
- Complete the kickoff questionnaire (20 min)
- Send any assets (logos, brand guidelines, existing code, etc.)
- Review + approve tech stack

KICKOFF CALL:
- Scheduled for: [Date/Time - within 5 days]
- Duration: 60 min
- Goal: Align on scope, timeline, communication rules

FIRST BUILD:
- Starts: [Date - within 7 days of kickoff]
- First update: [Date - 3-4 days after starting]

Questions? Reply to this email or text me: [Your number]

Let's build something great.

[Your name]
```

---

## ASSET COLLECTION (HOMEWORK)

Create a simple Notion page or Google Doc. Send link in welcome email.

### Client Kickoff Questionnaire

**Section 1: Project Clarity**

1. **In one sentence, what does this product do?**
   (Force them to get clear. If they can't answer in one sentence, you're in trouble.)

2. **Who is the primary user, and what problem are you solving for them?**
   (Listen for specificity. "Everyone" is a red flag.)

3. **What's the #1 thing users MUST be able to do in v1?**
   (This becomes your North Star. Everything else is negotiable.)

4. **What features can wait until v2?**
   (Set expectations early. You're building an MVP, not the final product.)

5. **How will you know if this launch is successful?**
   (Listen for realistic metrics. "Go viral" is not a success metric.)

**Section 2: Design + Brand**

6. **Upload your logo (PNG, SVG preferred)**

7. **Brand colors (hex codes if you have them)**

8. **Show us 3 websites/apps you like the look of (links + what you like about them)**
   (This avoids "make it look modern" conversations.)

9. **Do you have brand guidelines or a design system?**
   (If yes, upload. If no, we'll keep it clean and simple.)

**Section 3: Technical**

10. **Do you have existing code, APIs, or databases we need to work with?**
    (If yes, we need access ASAP.)

11. **Do you need us to set up hosting, or do you have infrastructure?**
    (Clarify who owns what.)

12. **Any compliance requirements? (HIPAA, GDPR, SOC2, etc.)**
    (This affects architecture. Better to know now.)

**Section 4: Access + Assets**

13. **What accounts do we need access to?**
    - [ ] Domain registrar
    - [ ] Hosting/cloud (AWS, Vercel, etc.)
    - [ ] Email service (if applicable)
    - [ ] Payment processor (Stripe, etc.)
    - [ ] Analytics (if applicable)
    - [ ] Other: ___________

14. **Who's the day-to-day contact? (Phone + email + best way to reach you)**

15. **Who has final approval authority?**
    (If it's not the person you're talking to, we need them in kickoff.)

**Section 5: Expectations**

16. **How involved do you want to be?**
    - [ ] Daily updates (high-touch, slower)
    - [ ] Weekly check-ins (recommended)
    - [ ] Just tell me when it's done (not realistic for custom work)

17. **What's your biggest fear about this project?**
    (Seriously, ask this. You'll learn a lot.)

18. **Anything else we should know?**

---

## KICKOFF CALL AGENDA (60 MIN)

### Pre-Call Prep (10 min)
- [ ] Review their questionnaire responses
- [ ] Note any red flags or missing info
- [ ] Prepare your tech stack recommendation
- [ ] Have scope doc ready to screen share

### Minutes 0-5: Frame the Call

**You:** "Today's goal is three things:
1. Make sure we're 100% aligned on what we're building
2. Lock in the tech stack and timeline
3. Set communication rules so there's no surprises

Sound good? Let's dive in."

### Minutes 5-25: Scope Confirmation

**Walk through the scope doc together. Screen share.**

**For each feature, ask:**
- "Is this still accurate?"
- "Anything missing that's critical?"
- "Anything here that can wait for v2?"

**KEY RULE:** If they add scope, you say:
"That's not in the original scope. We can do it, but it adds [X time] and [$Y cost]. Want to do that now, or park it for Phase 2?"

**Document any changes in real-time.** If scope grows, send updated scope doc + change order after the call.

### Minutes 25-35: Tech Stack Approval

Present your recommended stack. Example:

**You:** "Here's what we're building with:
- Frontend: React + Tailwind (fast, modern, maintainable)
- Backend: Supabase (database + auth + APIs in one)
- Hosting: Vercel (easy deployments, scales automatically)
- Payments: Stripe (if applicable)

Why this stack: [Quick reason tied to their goals]

Any concerns or requirements we need to account for?"

**Get explicit approval.** "Great, we're locked on this stack. Just so we're clear—changing this mid-project will delay timeline and cost more. Understood?"

### Minutes 35-45: Timeline + Milestones

**Present visual timeline (Notion, Figma, or simple doc):**

| Week | Milestone | What You'll See |
|------|-----------|-----------------|
| Week 1 | Core architecture + auth | Login/signup working |
| Week 2 | [Main feature 1] | [Specific demo-able thing] |
| Week 3 | [Main feature 2] | [Specific demo-able thing] |
| Week 4 | UI polish + testing | Looks production-ready |
| Week 5 | Deployment + handoff | Live site + training |

**You:** "This is the plan. Two things that will delay this:
1. Slow feedback from you (we need responses within 24-48 hours)
2. Scope changes (we handle those via change orders)

Can you commit to fast feedback?"

### Minutes 45-55: Communication Rules

**Set expectations explicitly:**

**Updates:**
- Every [Tuesday/Thursday] at [time], I'll send a progress update via [email/Slack]
- Includes: What's done, what's next, any blockers

**Feedback:**
- You have 48 hours to respond to questions
- After 48 hours, we make the call and keep moving
- No response = approval (yes, really)

**Urgent Issues:**
- Text me: [Your number]
- "Urgent" means "site is down" not "I had an idea"

**Revisions:**
- You get 1 round of revisions post-launch (per scope)
- Additional rounds billed at $[X]/hour or $[Y] flat fee

**Scope Changes:**
- Must go through change order process
- We estimate time + cost, you approve before we start
- No "quick adds" (everything costs time)

**You:** "Does this communication cadence work for you?"

### Minutes 55-60: Next Steps + Questions

**You:** "Okay, here's what happens next:

1. I'll send updated scope doc (if changes) by [tomorrow]
2. We start building [Monday/specific date]
3. First update: [specific date, 3-4 days after start]
4. Questions on anything we covered?"

**End with:** "Excited to get started. We'll talk soon."

---

## POST-KICKOFF (WITHIN 24 HOURS)

### Send Kickoff Summary Email

**Subject:** [Project Name] - Kickoff Summary

**Body:**
```
Hey [Name],

Great call today. Here's the summary:

SCOPE: [Attach updated scope doc if changed, or link to original]

TECH STACK: [List confirmed stack]

TIMELINE:
- Start: [Date]
- Milestones: [Link to timeline doc]
- Launch: [Target date]

COMMUNICATION:
- Updates: Every [day] at [time]
- Response time expected: 48 hours
- Urgent contact: [Your number]

NEXT:
- We start building [date]
- You'll hear from me on [date] with first update

Any questions before we dive in? Now's the time.

Let's build.

[Your name]
```

### Set Up Project Workspace

**Use:** Notion, ClickUp, Linear, or Jira (pick one, keep it simple)

**Create:**
- [ ] Project board (To Do, In Progress, Review, Done)
- [ ] Scope doc (linked)
- [ ] Timeline/milestones (linked)
- [ ] Client access (invite them, set to "view only" unless they're technical)

**Give client access with a note:**
"You can check progress anytime here: [link]. You'll see what we're working on in real-time. Updates still via email, but this is your transparency window."

---

## SCOPE PROTECTION RULES (MEMORIZE THESE)

### When Client Asks For "Quick Add"

**Client:** "Hey, can we add [small thing]? Should be easy."

**You:** "Let me check. [Review scope.] That's not in scope. I can add it—will take [X hours], costs [$Y]. Want me to send a change order, or save this for Phase 2?"

**Never say "sure, no problem" to out-of-scope work.** EVER.

### When Client Changes Mind Mid-Project

**Client:** "Actually, can we change [core feature] to work like [different thing]?"

**You:** "That's a significant change. We're [X days] into the current approach. Switching now will:
- Add [Y days] to timeline
- Cost [$Z] extra
- Push launch to [new date]

Do you want to proceed with the change, or stick with the original plan?"

**Make them feel the cost of indecision.**

### When Client Goes Dark

If you don't hear back on a decision after 48 hours:

**Day 3 email:**
"Hey [Name], waiting on [specific decision]. Need your input by [tomorrow] to stay on schedule. If I don't hear from you, I'll proceed with [Option A] and keep moving."

**Day 5 email (if still dark):**
"Haven't heard back. Making the call on [decision] so we don't lose time. You can request a change later via change order if needed."

**Never let client silence block your progress.**

### When Client Wants "Just One More Round" of Revisions

**Client:** "Can we tweak [thing] one more time?"

**You:** "You've used your included revision round. Happy to make the change—it's [$X flat fee] or [Y hours at $Z/hour]. Want me to send an invoice?"

**Don't negotiate. Don't make exceptions. Boundaries are everything.**

---

## EXPECTATION SETTING (SAY THESE THINGS OUT LOUD)

### On First Call:
"We're building an MVP, not the finished product. v1 is about getting something live that works. v2 is about making it perfect."

### On Kickoff:
"Fast feedback = on-time delivery. Slow feedback = delayed launch. We'll do our part if you do yours."

### When Scope Questions Come Up:
"That's a great idea. It's not in scope right now. Let's park it for Phase 2 and revisit after launch."

### When They're Nervous:
"You're going to see work-in-progress stuff that doesn't look finished. That's normal. Judge it at the milestones, not in between."

### When They Want Perfection:
"Perfect is the enemy of launched. We're optimizing for 'works well and ships on time,' not 'absolutely flawless.' We can iterate after launch."

---

## RED FLAGS DURING ONBOARDING (ACT FAST)

| Red Flag | What It Means | What To Do |
|----------|---------------|------------|
| They don't complete questionnaire after 2 reminders | Not serious or too busy | Call them: "Is this still a priority? If not, let's pause until it is." |
| They want to change scope significantly during kickoff | They didn't think it through | "This is a different project. Let me re-scope and re-price. We can start over or pause." |
| They want daily updates/calls | High-maintenance client | "That's not our process. We do [weekly]. If you need daily check-ins, we're not the right fit." |
| Multiple decision makers who disagree on call | You'll be stuck in the middle | "You need to align internally before we start. Let's reconvene when there's one clear decision maker." |
| They don't respond to questions for 5+ days | This will happen throughout project | "Seems like timing isn't great. Want to pause and restart when you have bandwidth?" |

**Don't ignore red flags hoping they'll go away. They won't.**

---

## ONBOARDING SUCCESS METRICS

| Metric | Target | Red Flag |
|--------|--------|----------|
| Questionnaire completion time | Within 48 hours | Over 5 days |
| Kickoff call scheduled | Within 5 days of contract | Over 10 days |
| Time from contract to first commit | Under 7 days | Over 14 days |
| Scope changes during onboarding | 0-1 small changes | 3+ changes or major pivot |
| Client responsiveness | Under 24 hours | Over 72 hours |

---

## TOOLS YOU NEED

| Function | Tool Options | Cost |
|----------|-------------|------|
| Project Management | Notion, ClickUp, Linear | Free-$10/mo |
| File Sharing | Google Drive, Dropbox | Free-$15/mo |
| Communication | Email + Slack (or just email) | Free-$8/user |
| Contracts | Bonsai, PandaDoc, HelloSign | $20-$50/mo |
| Invoicing | Stripe Invoicing, Bonsai, Wave | Free-2.9% fee |

**Don't over-tool. Pick simple, stick with it.**

---

## FINAL RULE

**Onboarding sets the tone for the entire project.**

If you let clients walk over you during onboarding, they'll do it during delivery too.

Be firm. Be clear. Be respectful.

**Your job is to deliver great work, not to be their therapist or their yes-man.**
