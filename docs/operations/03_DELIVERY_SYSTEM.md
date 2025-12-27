# DELIVERY SYSTEM
**Last Updated:** Dec 2025
**For:** Zumetrix Labs - How to Ship Consistently Without Chaos

---

## CORE PHILOSOPHY

**Good delivery = predictable process + clear checkpoints + managed expectations**

You're not building art. You're building products on a timeline.

Every project should feel the same to the client: Clear updates, steady progress, on-time delivery.

---

## STANDARD DELIVERY PHASES

### PHASE 1: ARCHITECTURE + SETUP (Week 1)

**What you're doing:**
- Setting up repo, hosting, CI/CD
- Database schema design
- Auth implementation (if applicable)
- Core project structure

**What client sees:**
- Login/signup working (even if basic)
- Staging environment URL
- First commit evidence

**Update to client (end of week 1):**
```
Subject: [Project Name] - Week 1 Complete

Hey [Name],

Week 1 done. Here's where we are:

COMPLETED:
✓ Project infrastructure set up
✓ Database schema designed + deployed
✓ Authentication working (login/signup)
✓ Staging environment live at: [URL]

NEXT WEEK:
- [Core feature 1]
- [Core feature 2]

TEST THIS:
Go to [staging URL] and create an account. You should be able to log in/out. That's it for now—more coming next week.

NEED FROM YOU:
- [Any pending decision or asset]
- Response by: [Date]

On track for [launch date].

[Your name]
```

---

### PHASE 2: CORE FEATURES (Weeks 2-3)

**What you're doing:**
- Implementing primary features (the things they're paying for)
- Connecting frontend to backend
- Basic UI (not polished yet)

**What client sees:**
- Main workflows functional (even if ugly)
- Real data flowing through system
- Progress on staging environment

**Update cadence:** 2x per week (Tuesday + Friday)

**Update template (mid-phase):**
```
Subject: [Project Name] - Progress Update

Hey [Name],

Here's where we are:

DONE THIS WEEK:
✓ [Feature 1] - [what it does]
✓ [Feature 2] - [what it does]

IN PROGRESS:
→ [Feature 3] - [ETA]

COMING NEXT:
- [Feature 4]
- [Feature 5]

CHECK IT OUT:
[Staging URL] - [What they should test]

BLOCKERS/QUESTIONS:
- [Any decisions needed]

Timeline: Still on track for [date].

[Your name]
```

---

### PHASE 3: UI POLISH + EDGE CASES (Week 4)

**What you're doing:**
- Making it look production-ready
- Handling error states
- Mobile responsiveness
- Loading states, empty states
- Fixing bugs from client testing

**What client sees:**
- It starts looking "real"
- Branding applied
- Smooth interactions

**Client involvement increases here:**
- They're testing more actively
- Feedback loop tightens
- You're fixing their reported issues

**Update template:**
```
Subject: [Project Name] - UI Polish Phase

Hey [Name],

We're in polish mode. Core features are done—now making it beautiful.

COMPLETED:
✓ Full UI design applied
✓ Mobile responsive
✓ [Bug fixes from your testing]

NEEDS YOUR REVIEW:
Test everything at [staging URL] and send me:
1. Any bugs or broken flows
2. Any UI tweaks (be specific: "button on X page should be Y color")
3. Anything confusing or unclear

Deadline for feedback: [Date - 48 hours from now]

After that, we move to final testing + launch prep.

[Your name]
```

---

### PHASE 4: QA + LAUNCH PREP (Week 5)

**What you're doing:**
- Full QA pass (see checklist below)
- Performance optimization
- Security check
- Deployment to production
- DNS setup (if needed)
- Final client testing

**What client sees:**
- "This is ready to launch" moment
- Final approval checkpoint
- Handoff training scheduled

**Update template:**
```
Subject: [Project Name] - Final QA + Launch Prep

Hey [Name],

We're in final stretch. Here's the plan:

THIS WEEK:
✓ Full QA testing (our side)
✓ Performance optimization
✓ Production deployment prep

YOUR ACTION ITEMS:
1. Final testing on staging: [URL]
2. Sign off on functionality by [Date]
3. Confirm launch date: [Proposed date]

LAUNCH WEEK:
- Deploy to production
- DNS setup (if needed)
- Handoff training: [Scheduled time]

Any last-minute changes need to go through change order process.

Almost there.

[Your name]
```

---

### PHASE 5: LAUNCH + HANDOFF (Week 6)

**What you're doing:**
- Deploy to production
- Monitoring for first 48 hours
- Handoff training (1 hour)
- Documentation delivery
- Project closeout

**What client gets:**
- Live product at their domain
- Access to all systems
- Training on how to manage it
- Documentation (README, env vars, etc.)
- Invoice for final payment

**Launch day email:**
```
Subject: [Project Name] - LIVE

Hey [Name],

We're live: [Production URL]

WHAT'S LIVE:
✓ All core features deployed
✓ Database + auth production-ready
✓ Domain configured
✓ SSL certificate active

HANDOFF TRAINING:
Scheduled: [Date/time]
We'll cover:
- How to make common changes
- Where everything is hosted
- How to access admin/database
- Support options going forward

MONITORING:
I'm watching the site for the next 48 hours. If anything breaks, I'll fix it.

FINAL INVOICE:
[Amount] due. Link: [Invoice URL]

Congrats on launching.

[Your name]
```

---

## DEFINITION OF DONE (EVERY FEATURE)

Before you mark anything "complete," it must:

- [ ] Work on desktop (Chrome, Safari, Firefox)
- [ ] Work on mobile (iOS Safari, Android Chrome)
- [ ] Handle error states gracefully (no white screens of death)
- [ ] Have loading states (no "is this working?" moments)
- [ ] Be accessible (keyboard navigation, screen reader friendly basics)
- [ ] Be tested with real data (not just "Test User")
- [ ] Match the approved design (if design was provided)
- [ ] Have no console errors
- [ ] Be deployed to staging for client review

**If it doesn't meet this checklist, it's not done. Period.**

---

## QA CHECKLIST (RUN BEFORE LAUNCH)

### Functionality
- [ ] All core features work as scoped
- [ ] Auth works (signup, login, logout, password reset)
- [ ] Forms validate properly (required fields, error messages)
- [ ] Data persists correctly (refresh doesn't break things)
- [ ] User roles/permissions work (if applicable)
- [ ] Payments process correctly (if applicable)
- [ ] Emails send correctly (if applicable)
- [ ] API integrations work (if applicable)

### UI/UX
- [ ] Responsive on mobile, tablet, desktop
- [ ] No broken images or missing assets
- [ ] Loading states everywhere something loads
- [ ] Empty states (what shows when there's no data?)
- [ ] Error states (what shows when something fails?)
- [ ] Buttons/links all do something
- [ ] Navigation makes sense
- [ ] Brand colors/fonts applied correctly

### Performance
- [ ] Pages load in under 3 seconds
- [ ] No massive images (optimize)
- [ ] No unnecessary API calls
- [ ] Smooth scrolling (no jank)

### Security
- [ ] Passwords hashed (never plain text)
- [ ] API routes protected (can't access without auth)
- [ ] SQL injection prevented (use parameterized queries)
- [ ] XSS prevented (sanitize inputs)
- [ ] HTTPS enabled
- [ ] Env variables not exposed to client
- [ ] CORS configured properly

### Technical
- [ ] No console errors
- [ ] Database schema correct (indexes, relationships)
- [ ] Backups configured
- [ ] Domain + DNS configured
- [ ] SSL certificate active
- [ ] Analytics installed (if applicable)
- [ ] Error tracking enabled (Sentry, LogRocket, etc.)

### Documentation
- [ ] README with setup instructions
- [ ] Env variables documented
- [ ] API endpoints documented (if applicable)
- [ ] Admin access credentials provided
- [ ] Deployment instructions

**Don't skip this checklist. Ever.**

---

## CLIENT UPDATE RULES

### Frequency
- **During build:** 2x per week (Tuesday + Friday)
- **During polish:** 3x per week (Monday + Wednesday + Friday)
- **Launch week:** Daily

### Format
- Email (with staging link)
- Bullet points (not paragraphs)
- Specific next steps
- Clear ask (if you need something from them)

### What to include:
- ✅ What's done
- 🔄 What's in progress
- 📋 What's next
- 🔗 Link to test
- ⏰ Timeline status
- ❓ Decisions needed (if any)

### What NOT to include:
- ❌ Technical jargon they won't understand
- ❌ Excuses for delays
- ❌ Vague language ("making progress")
- ❌ Surprises (if you're behind, tell them early)

---

## REVISION HANDLING SOP

### Included in Scope: 1 Round Post-Launch

**"Revision round" means:**
- Fixing bugs (unlimited)
- Adjusting copy/text
- Small UI tweaks (colors, spacing, button sizes)
- Performance fixes

**"Revision round" does NOT mean:**
- Adding new features
- Rebuilding existing features differently
- Changing core functionality
- Redesigning entire pages

### When Client Requests Revision

**Step 1: Categorize**

| Type | Response |
|------|----------|
| Bug fix | "That's a bug. I'll fix it ASAP. No charge." |
| Small UI tweak | "That's covered in your revision round. I'll knock it out." |
| New feature | "That's out of scope. I can add it for [$X]. Want me to send a change order?" |
| Major change | "That's a rebuild. Let me scope it separately and send you a quote." |

**Step 2: Set Timeline**

| Revision Type | Timeline |
|--------------|----------|
| Critical bug (site broken) | Within 4 hours |
| Non-critical bug | Within 24 hours |
| Small UI tweak | Within 48 hours |
| Out-of-scope work | After change order approved |

**Step 3: Execute + Confirm**

```
Hey [Name],

Fixed: [What you fixed]
Live now: [URL]

Let me know if that covers it.

[Your name]
```

### When Client Wants "Just One More Round"

**Client:** "Can we make a few more tweaks?"

**You:** "You've used your included revision round. I can do these tweaks for [$X flat fee]. Want me to send an invoice?"

**If they push back:**
"I hear you. Here's the thing: Included revisions are for catching stuff we missed or small adjustments. Additional rounds after that are billable. That's the agreement. I'm happy to do the work—just needs to be invoiced. Sound fair?"

**Stand firm. Don't negotiate your boundaries.**

---

## SCOPE CREEP DURING DELIVERY (IT WILL HAPPEN)

### Scenario 1: "Quick Add"

**Client:** "Hey, can we add [thing]? Should be quick."

**Your response:**
"Let me check the scope. [Review.] That's not included. I can add it, but it'll take [X hours] and cost [$Y]. It'll also push delivery to [new date]. Want to add it now, or save for Phase 2?"

**Never say "sure" without checking scope and pricing.**

### Scenario 2: "I Changed My Mind"

**Client:** "Actually, let's do [feature] differently."

**Your response:**
"That's a significant change. We've already built [current approach]. Switching will:
- Take [X] additional days
- Cost [$Y] extra
- Move launch to [new date]

Do you want to proceed with the change, stick with what we have, or split the difference [offer compromise if reasonable]?"

### Scenario 3: "Can We Add Just a Few Things?"

**Client:** Sends list of 10 new requests.

**Your response:**
"Thanks for the list. I've reviewed—8 of these are out of scope. Here are your options:

Option 1: Stick with original scope, launch on time
Option 2: Add these via change order, push launch by [X] weeks, cost [$Y]
Option 3: Launch as planned, tackle these in Phase 2

Which direction?"

**Make them choose. Don't just absorb extra work.**

---

## HANDLING DELAYS (BE HONEST, BE EARLY)

### If You're Going to Miss Deadline

**DON'T:** Wait until deadline day to tell them.

**DO:** Tell them as soon as you know (at least 5-7 days early).

**Email template:**
```
Subject: [Project Name] - Timeline Adjustment

Hey [Name],

Quick update: We're hitting a snag on [specific technical challenge].

SITUATION:
[Explain in non-technical terms what's causing delay]

IMPACT:
Original launch: [Date]
New launch: [Date - realistic estimate]

WHY:
[Honest reason: their slow feedback, technical complexity, scope additions]

PLAN:
[How you're fixing it]

I know this isn't ideal. Questions or concerns, call me: [Your number].

[Your name]
```

**Key:** Be honest about whose fault it is. If it's you, own it. If it's them, say so (tactfully).

### If THEY'RE Causing Delays

**Email template:**
```
Subject: [Project Name] - Need Your Input to Stay on Track

Hey [Name],

We're waiting on [specific decision/asset] to keep moving.

WHAT WE NEED:
- [Thing 1]
- [Thing 2]

BY WHEN:
[Date - 24-48 hours]

IF WE DON'T HEAR BACK:
We'll [make the call/proceed with Option A/pause project].

Current launch date: [Date]
At-risk launch date: [New date if they don't respond]

Let's stay on track. Reply by [date].

[Your name]
```

**Don't let their delays become your problem. Put it in writing.**

---

## HANDOFF TRAINING (1 HOUR CALL)

### Agenda

**Minutes 0-5: Overview**
"Congrats on launching. Today I'm going to show you how to manage this thing yourself. Take notes."

**Minutes 5-20: Access + Accounts**
Walk through:
- Where the site is hosted
- How to access the database (if applicable)
- Admin login
- Domain registrar
- Any third-party services (Stripe, SendGrid, etc.)

Share all credentials securely (1Password, LastPass, or encrypted doc).

**Minutes 20-40: Common Tasks**
Show them how to:
- Add/edit content (if CMS or admin panel)
- View user data (if applicable)
- Check logs/errors (basic stuff)
- Update environment variables (if they need to)

**Minutes 40-50: What to Do If Things Break**
- Where to check for errors (hosting dashboard, database logs)
- When to reach out for support
- Basic troubleshooting ("Did you try refreshing? Clearing cache?")

**Minutes 50-60: Support Options + Q&A**
- "Here's what's covered under warranty [30 days bug fixes]"
- "Here's what costs extra [new features, changes]"
- "Here's how to reach me if something's on fire"
- Open floor for questions

**End with:** "You're all set. Email me if you run into anything."

---

## PROJECT CLOSEOUT CHECKLIST

- [ ] Final payment received
- [ ] All code pushed to their repo (if they own it)
- [ ] All credentials transferred
- [ ] Documentation delivered
- [ ] Handoff training completed
- [ ] Warranty period noted (30 days bug fixes)
- [ ] Post-project survey sent (optional but useful)
- [ ] Case study request (if project went well)
- [ ] Final invoice marked paid
- [ ] Archive project files

**Don't skip closeout. Clean endings = referrals.**

---

## DELIVERY METRICS (TRACK THESE)

| Metric | Target | Red Flag |
|--------|--------|----------|
| On-time delivery | 80%+ | Under 70% |
| Scope creep incidents | Under 2 per project | 5+ changes |
| Client response time (average) | Under 48 hours | Over 72 hours |
| Post-launch bugs (critical) | 0-2 | 5+ |
| Revision rounds used | 1 (as scoped) | 3+ |
| Client satisfaction (1-10) | 8+ | Under 7 |

---

## RED FLAGS DURING DELIVERY

| Red Flag | What It Means | What To Do |
|----------|---------------|------------|
| Client stops responding | Lost interest or budget issues | "Is this still a priority? Let's pause if not." |
| Client requests 5+ scope changes | Didn't think it through | "We're off track. Let's have a call to realign or rescope." |
| You're working 60+ hours/week | Underpriced or underestimated | Finish project, raise prices for next one |
| Client is angry at every update | Misaligned expectations | "Let's have a call. Something's not working here." |
| You dread their emails | Toxic client | Finish project, never work with them again |

**Don't ignore red flags. Address them immediately.**

---

## TOOLS YOU NEED

| Function | Tool | Cost |
|----------|------|------|
| Project Management | Notion, Linear, ClickUp | Free-$10/mo |
| Version Control | GitHub, GitLab | Free |
| Hosting | Vercel, Netlify, Railway | Free-$20/mo per project |
| Error Tracking | Sentry, LogRocket | Free-$26/mo |
| Communication | Email + Slack | Free-$8/user |
| Time Tracking | Toggl, Clockify | Free-$10/mo |

---

## FINAL RULE

**Delivery is where you prove your worth.**

Sales gets them excited. Onboarding sets the tone. **Delivery earns trust.**

Ship on time. Communicate clearly. Handle problems honestly.

Do this right, and they'll refer you. Do it wrong, and you'll never hear from them again.

**Your reputation is built one delivery at a time. Act like it.**
