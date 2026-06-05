---
cssclasses: stars-reading
date: 2026-06-05
type: build-doc
---

# Product Decisions Log
*Resolved and open decisions for the astrology app*
*Last updated: June 5, 2026*

---

## How to Use This Document

Every significant product decision — resolved or open — lives here. When a decision is made, mark it RESOLVED and note when and how it was decided. When a question is open, track what the options are and what's blocking a decision.

Do not re-open resolved decisions without flagging it explicitly. Do not assume defaults on open decisions.

---

## OPEN DECISIONS

---

### UX Philosophy: Conversational/Therapeutic vs. Analytical/Technical
**Status: OPEN**
**Raised:** June 5, 2026 (Gemini intake)

Two design poles:

**Pole A — Conversational and Therapeutic**
Primary interface is a conversation. The app asks questions, user responds, it deepens. Modeled on the 4-modes session experience. Warm entry point. Best for new users or emotionally activated users.

**Pole B — Analytical and Technical**
Primary interface is a dashboard. User sees their chart, active transits, forecast at a glance. Selects what to explore. Better for returning users who know what they want.

**Note:** These may not be mutually exclusive. Pole A as onboarding/emotional layer, Pole B as the returning-user power layer. But the primary register needs to be decided before Phase 3 UX is built.

**Astrological note:** Neptune conjunct the 10th house Moon = Jordan has unusually precise access to the collective emotional landscape right now. What users feel when they receive a reading — she can sense this with unusual clarity during this transit. This is the season to make this decision from direct empathic observation, not market research.

**What's blocking:** Need to decide whether we're building for new seekers (Pole A) or for people who already know their chart (Pole B). Likely relates to the freemium vs. subscription question below.

---

### Business Model: Freemium Interactive vs. Deep Subscription Specialized Tool
**Status: OPEN**
**Raised:** June 5, 2026 (Gemini intake)

**Option A — Freemium Interactive**
Free tier: limited readings, basic chart. Paid tier: full chart synthesis, ongoing transits, counselor mode. Discovery model — broad top of funnel, convert curious users.

**Option B — Deep Subscription Specialized Tool**
No free tier or minimal free preview. Subscribers get full access. Positions as premium, specialized, not for everyone. Aligns with 5th house Jupiter Scorpio design philosophy: depth and intensity over broad casual access.

**Option C — Hybrid (Phase 2 / Phase 3 transition)**
Phase 2 remains transactional (per reading on Etsy). Phase 3 launches as subscription. Use Phase 2 revenue and reviews to validate before deciding freemium vs. paywall.

**What's blocking:** Phase 1 doesn't require this decision. Phase 3 does. Could run Phase 2 as data collection on what customers actually want.

---

### Business Name: Thin Place / The 29th / Solas
**Status: OPEN**
**Raised:** May 18, 2026

Top three candidates:

| Name | Why it works |
|---|---|
| **Thin Place** | Celtic — where the veil between visible and invisible is paper-thin. Irish connection real and personal. Not obviously "astrology" — a feature. |
| **The 29th** | Jordan's Ascendant at 29° Gemini. Astro people clock it. Everyone else finds it intriguing. |
| **Solas** | Irish for light (SU-las). Simple, warm. Solas Astrology lands cleanly. |

Other candidates in the running: Meridian, Ingress, Anam, By Degrees.

**What's blocking:** Let one land. No forcing. The name should arrive, not be decided.

---

### Corporate Product: Same Brand or Separate Vertical
**Status: OPEN**
**Raised:** May 2026

The corporate women's career astrology angle (sky-at-work, timing professional moves, navigating workplace dynamics) may be a distinct enough market to warrant its own brand and positioning, separate from the personal natal chart reading service.

**Option A:** One brand, two product lines. Corporate product lives under the same name, positioned as "workplace intelligence" vs. "personal reading."
**Option B:** Separate brand for corporate. The personal reading brand stays mystical/witchy. The corporate brand is clean, strategic, professional.

**What's blocking:** Phase 1 is personal readings only. This decision doesn't need to be made until Phase 2-3. Worth noting the live test is running (#astroflow-weekly).

---

### Social Content Strategy
**Status: OPEN**
**Raised:** May 2026

**Options:** TikTok, Instagram Reels, neither until Phase 2.
**What's blocking:** Phase 1 doesn't need content strategy. Revisit at Phase 2 when there's product to demonstrate.

---

## RESOLVED DECISIONS

---

### Phase 1: Manual Natal Chart Reading Service on Etsy
**Status: RESOLVED**
**Decided:** May 18, 2026
**Details:** Manual readings delivered via Etsy, $35 (Essential) / $55 (Full) / $85 (Deep Dive, after 10 reviews). 48-hour delivery. Jordan generates via this workspace pipeline, reviews, exports PDF.
**Platform:** Etsy primary (90M+ buyer discovery engine), Gumroad secondary.
**Critical path:** 5 free readings to friends (Marina, Miriam, Kate, Cat, Carina) → 5 Etsy reviews → first paying customer.

---

### Visual Aesthetic: Whimsigoth Sacred Geometry
**Status: RESOLVED**
**Decided:** June 4, 2026 (locked with carina.html v2)
**Details:** Jewel cosmic indigo background, vibrant gold (#e8c040), cerulean, warm ivory. No purple. Cormorant Garamond display + Inter sans. Glassmorphism cards, watercolor section blooms, sacred geometry scatter. Chart wheel: jewel navy (#08162e), element arcs, watercolor house fills, 16-ray sunburst center.
**Reference:** `natal readings/carina.html` (canonical v2 template). `natal readings/chart-wheel.html` (canonical wheel template).
**Rule:** Do not deviate without explicit instruction.

---

### Reading Voice: Trained on Jordan's Writing, Psychologically Precise
**Status: RESOLVED**
**Decided:** Ongoing, codified May-June 2026
**Details:** Voice DNA in CLAUDE.md Writing Style Guide. Warm-precise (not warm-vague). Implication before description. Economy — say it then stop. Specific beats archetype. No performing "astrologer." See `the build/voice-canon.md` for full quality standards and refinement log.

---

### Development Stage: Stealth Mode Prototype
**Status: RESOLVED**
**Decided:** June 5, 2026 (Gemini intake, confirmed as principle)
**Details:** Build the prototype before broadcasting it. The 12th house (hidden architecture) is where the build lives during Phase 1 and Phase 2. The 11th house (networks, collective) is where it goes at Phase 3 launch. Resist the South Node Gemini pull to mirror progress externally before it's ready.

---

### Architecture Principle: Non-Linear, Modular Agentic Workflows
**Status: RESOLVED**
**Decided:** June 5, 2026
**Details:** The app uses a routing agent that reads input and determines which agent to activate — not a fixed sequential pipeline. Each agent (Transit Fetcher, Chart Synthesizer, Conversational Counselor) is a separate composable module. See `the build/agent-architecture.md` for full spec.

---

### Build Original Code — No Existing Repos
**Status: RESOLVED**
**Decided:** June 4, 2026 (Jordan's explicit statement during chart wheel build)
**Details:** Jordan looked at existing astrology app repos, decided against using them. "Claudia was like 'fuck it we should build one completely ourselves.'" This is the IP decision — building original protects the creative and technical assets as proprietary.
**Implication:** Every component (chart wheel, reading engine, routing agent, UI) is built from first principles in this workspace. No adapting existing astrology libraries as the foundation. We can research what exists (via competitive intelligence / Playwright scraping) but we build our own.

---

### Phase Structure: Manual → Semi-Automated → Self-Serve App
**Status: RESOLVED**
**Decided:** May 2026
**Details:**
- Phase 1: Manual (Jordan in loop, Etsy)
- Phase 2: Semi-automated (intake form → Claude generates → Jordan approves → delivers), monthly transit subscription $15/month
- Phase 3: Self-serve app (user enters birth data → instant reading, no Jordan in loop), subscription model

---

### This Workspace IS the Infrastructure / Prototype
**Status: RESOLVED**
**Decided:** May 2026 (articulated in app-vision.md)
**Details:** The CLAUDE.md + INSTRUCTIONS.md + KNOWLEDGE.md architecture creating genuine continuity is what the app needs to do for every customer at scale. The reading pipeline here is the prototype. Every session adds to the training corpus.

---

## Decision Log (Chronological)

| Date | Decision | Status |
|---|---|---|
| May 18, 2026 | Phase 1: Etsy natal chart readings | RESOLVED |
| May 2026 | Phase structure: Manual → Semi-auto → App | RESOLVED |
| May 2026 | Visual aesthetic: Whimsigoth Sacred Geometry | RESOLVED |
| May 2026 | Voice: trained on Jordan's writing | RESOLVED |
| June 4, 2026 | Aesthetic locked with carina.html v2 | RESOLVED |
| June 5, 2026 | Architecture: non-linear, modular, agentic | RESOLVED |
| June 5, 2026 | Development stage: stealth mode | RESOLVED |
| June 5, 2026 | UX philosophy: conversational vs. analytical | OPEN |
| June 5, 2026 | Business model: freemium vs. subscription | OPEN |
| Ongoing | Business name: Thin Place / The 29th / Solas | OPEN |
| Ongoing | Corporate product: same brand or separate | OPEN |
