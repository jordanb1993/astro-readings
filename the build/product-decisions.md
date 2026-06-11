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
**Status: RESOLVED**
**Raised:** June 5, 2026 (Gemini intake)
**Decided:** June 5, 2026 (competitive research)

**Ruling: Neither pole. The reading is a contemplative artifact.**

Competitive research across all six major players (full findings in `the build/competitor-research-2026-06-05.md`) revealed that Pole A vs. Pole B is a false binary for this product. Every competitor picks one:

- Co-Star, Time Passages, Astro.com: Pole B (data-first, cold)
- CHANI, The Pattern, Sanctuary: Pole A (therapeutic, chatty, personality-quiz adjacent)

None of them do what the natal reading scroll already does: **a reading as an art object you receive and return to.** Deep, specific, beautiful, made for one person. Not interactive, not a dashboard, not a chatbot.

The UX register for the natal reading product is **contemplative**: you scroll, you absorb, you sit with it. Immersion, not interaction. The experience is the reading itself.

**Implications:**
- The natal reading HTML format is the correct primary deliverable format. Do not replace it with a chat interface.
- Interactivity (if any) should be in supplementary layers: transit tracking, return-visit hooks, ritual prompts. Not in the reading itself.
- If the app ever develops a conversational layer, model it on CHANI (narrative, authored, empowering) rather than The Pattern (personality quiz output).
- The return-visit problem (flagged in app-vision.md as the main anti-pattern of the scroll format) is still open. Solving it means building features around the reading, not changing the reading.

**Market white space confirmed by research:** Sacred geometry + warm color palette, technical precision + emotional warmth, the reading-as-artifact format. All three are uncrowded.

**Astrological note:** Neptune conjunct the 10th house Moon = Jordan has unusually precise access to the collective emotional landscape right now. What users feel when they receive a reading — she can sense this with unusual clarity during this transit. This decision was made from direct empathic observation and competitive data simultaneously.

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

### Business Name
**Status: RESOLVED**
**Raised:** May 18, 2026
**Decided:** June 11, 2026

**Name: Pathfinder**

Named after Star Trek: Voyager's "Pathfinder" episode (S6) — the one where Reg Barclay, the awkward, underestimated, deeply passionate engineer, builds a communication system from a basement computer to reach Voyager lost across the galaxy, because he refuses to stop believing the signal is worth sending.

Jordan is building a system from her apartment to reach people who feel lost and want to find their way back to themselves. That's not a metaphor. That's the actual story.

The Trek reference is hidden and personal — Jordan knows it, the world sees a navigation tool for your life.

**Internal section names (also locked June 11):**
- Natal chart section: **The Constant** — Lost S4, Desmond's anchor across all timelines. Your chart is the one fixed thing.
- Transits section: **The Variable** — Lost S4/5, "we are the variables, we can change destiny." What's moving, what you can influence.

**Trademark note:** Check App Store for conflicts before Phase 3 public launch. Different market class from Pathfinder RPG (Paizo) and Nissan Pathfinder — not a current blocker.

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

### Reading UX: Plain-Language First vs. Technical-First
**Status: OPEN — new product directive**
**Raised:** June 11, 2026 (inbox capture)

**The insight (Jordan's words):**
"We need meaning first and practical precise language of what the energy feels like and is doing, then take it technical. I want others to use it as a learning tool but they can't do that if we speak in only technical language. We need to shift to plain language of meaning and affect built from the technical — and then the technical information if the user wants to learn. That way our app can be appealing to beginner, intermediate, and advanced astrology people all at the same time."

**The precedent:** `sky-at-work.html` already implements this exactly — plain-language insight cards on the surface, "What's driving this?" disclosure tap reveals the transit mechanism. The architecture works. The question is how to apply it to daily readings and natal charts.

**Option A — Layered daily reading:** Plain-language meaning in the prose body (what the energy FEELS like), with transit details available in a collapsible / secondary layer. Current readings reverse this — they lead technical and translate into meaning. The inversion makes the product beginner-accessible without dumbing it down for advanced users.

**Option B — Natal chart tiering:** The natal reading scroll stays as-is (a contemplative artifact for intermediate-advanced users), but add a companion "plain language summary" layer at the top — 3–5 sentences about what this chart means in a life, before the technical depth begins.

**Option C — Both:** Daily reading prose leads with meaning/felt sense, technical data lives in the transit board (already there). Natal reading adds a plain-language entry layer.

**What's blocking:** Format spec update. Applies to voice-canon.md and READING-FORMAT.md once decided.

**Design principle already proven:** The `sky-at-work.html` inversion confirms this works. Plain language first is NOT dumbing down — it is meeting people where they are so the technical layer lands as depth rather than barrier.

---

## RESOLVED DECISIONS

---

### Phase 1: Build + Internal Beta (No Etsy)
**Status: RESOLVED**
**Original decision:** May 18, 2026 (Etsy plan)
**Revised:** June 5, 2026
**Details:** Etsy plan dropped. Jordan has a full-time job and doesn't need early reading income. Beta testing is already live — Jordan's daily readings are the primary user research, and friends' natal chart builds are the beta product. No external validation platform needed.
**Phase 1 goal:** Perfect the pipeline across multiple reading types (natal, daily transit, synastry, ritual) using Jordan + close friends as beta users. Build until the product is something Jordan would be proud to hand to a paying stranger.
**Critical path:** Complete 5 friend readings across multiple types → formalize all templates → begin Phase 2 closed beta cohort.

---

### Natal Chart HTML: Archetype Card + Planet Strip UI Patterns
**Status: RESOLVED**
**Decided:** June 5, 2026 (surgical fixes after first mobile review)
**Details:**

**Archetype card tap-to-reveal pill:**
- The pill lives INSIDE `.card-label` as a flex child, below the sign subtitle (e.g. "Gemini · Pisces · Scorpio") — not absolutely positioned over the label text
- `.card-label` height = 96px (not 76px); `justify-content: flex-end; padding-bottom: 14px`
- Pill gets `margin-top: 13px` to give it breathing room above on mobile
- Pill styling: `backdrop-filter: blur(4px)`, dark semi-transparent bg (`rgba(10,6,32,0.50)`), no key emoji — text only ("tap to reveal")
- **Anti-pattern:** `position: absolute; bottom: 10px` on the hint will overlap the label text — never do this

**Planet pills "At a Glance" strip:**
- Add a `.planet-strip-hint` ghost caption directly below the "At a Glance" label: "tap each to expand"
- `.planet-strip-label { margin-bottom: 5px }` + `.planet-strip-hint { margin-bottom: 14px }` to keep total spacing consistent
- `.planet-strip-hint` styling: Inter, 0.49rem, letter-spacing 0.16em, uppercase, `rgba(240,228,200,0.25)` — very faint, clearly subordinate
- `.planet-pill` must have `cursor: pointer` — check on every new build; `cursor: default` silently kills the desktop affordance

**Live URLs:**
- mimi: `https://jordanb1993.github.io/astro-readings/natal%20readings/mimi.html`
- carina: `https://jordanb1993.github.io/astro-readings/natal%20readings/carina.html`

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

### Phase Structure: Build + Beta → Closed Subscription → Public App
**Status: RESOLVED**
**Originally decided:** May 2026
**Revised:** June 5, 2026
**Details:**
- Phase 1: Build + internal beta (Jordan + friends, no Etsy, perfect all reading type templates)
- Phase 2: Closed subscription beta (~20 paying subscribers, $20–35/month, Jordan reviews generated readings)
- Phase 3: Public subscription app (self-serve, no Jordan in loop for generation, $25–35/month)

---

### This Workspace IS the Infrastructure / Prototype
**Status: RESOLVED**
**Decided:** May 2026 (articulated in app-vision.md)
**Details:** The CLAUDE.md + INSTRUCTIONS.md + KNOWLEDGE.md architecture creating genuine continuity is what the app needs to do for every customer at scale. The reading pipeline here is the prototype. Every session adds to the training corpus.

---

## Decision Log (Chronological)

| Date | Decision | Status |
|---|---|---|
| May 18, 2026 | Phase 1: Etsy natal chart readings | REVISED June 5 |
| May 2026 | Phase structure: Build+Beta → Closed Beta → Public App | RESOLVED |
| May 2026 | Visual aesthetic: Whimsigoth Sacred Geometry | RESOLVED |
| May 2026 | Voice: trained on Jordan's writing | RESOLVED |
| June 4, 2026 | Aesthetic locked with carina.html v2 | RESOLVED |
| June 5, 2026 | Architecture: non-linear, modular, agentic | RESOLVED |
| June 5, 2026 | Development stage: stealth mode | RESOLVED |
| June 5, 2026 | UX philosophy: contemplative artifact (neither pole) | RESOLVED |
| June 5, 2026 | Business model: freemium vs. subscription | OPEN |
| Ongoing | Business name: Thin Place / The 29th / Solas | OPEN |
| Ongoing | Corporate product: same brand or separate | OPEN |
