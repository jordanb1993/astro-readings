---
cssclasses: stars-reading
date: 2026-06-05
type: build-doc
---

# Agent Architecture — AI Astrology App
*The technical and design blueprint for the multi-agent system*
*Last updated: June 5, 2026*

---

## What This Document Is

The architecture log for the app's AI agent system. Tracks: what agents exist or need to exist, how they connect, what they're trained to do, what architectural decisions have been made, and what's still open.

This workspace IS the prototype. The CLAUDE.md + INSTRUCTIONS.md + KNOWLEDGE.md system is the first working version of the agent architecture — built manually, driven by context loading. Phase 3 is this system at scale, automated, with a database layer replacing the flat files and a routing agent replacing manual session triggers.

---

## Current State of the Prototype (June 2026)

| Layer | What it is in the current workspace | What it becomes in the app |
|---|---|---|
| Knowledge base | CLAUDE.md + INSTRUCTIONS.md + KNOWLEDGE.md | Structured database per user (birth data, chart, history, life context) |
| Orchestration | Session start protocol (read these files in this order) | Routing agent (reads input, determines which agent to activate) |
| Transit fetcher | Live pull from astrolibrary.org at session start | Automated scheduled agent, runs daily per user |
| Chart synthesizer | Manual pipeline: Jordan triggers natal chart build | Autonomous: user submits intake form → agent generates reading |
| Counseling layer | 4 modes system (Astrologer / Tarot / Parts Work / Reflection) | Adaptive routing agent that detects emotional register and routes accordingly |
| Output | Markdown file or HTML — written by Claude, reviewed by Jordan | Formatted reading delivered via app interface, no Jordan in loop |
| Voice calibration | KNOWLEDGE.md + voice-canon.md as context | Embedded in agent system prompt — consistent across all users |

---

## The Three Core Agents

### Agent 1: Transit Fetcher
**Status: BUILT (prototype)**
**Function:** Autonomously pulls live planetary positions at session start. Calculates transit-to-natal aspects using natal chart. Derives transit-to-transit aspects.
**Current implementation:** Web fetch from astrolibrary.org at start of every reading session.
**Phase 3 implementation:** Scheduled job, runs daily per user at their local morning time. Caches positions. Feeds Agent 2 and Agent 3 with current sky data.
**Key principle:** This agent runs invisibly. User never sees the calculation layer — only the output.

---

### Agent 2: Chart Synthesizer
**Status: PARTIALLY BUILT (requires Jordan in loop)**
**Function:** Takes birth data (date, time, place) + focus question + current transits → generates a full personalized reading.
**Current implementation:** Jordan triggers manually, reviews output, edits, exports to PDF.
**Gap:** Not autonomous. Jordan is the quality gate. Phase 2 = semi-automated; Phase 3 = fully autonomous with voice calibration handling quality.
**Phase 3 implementation:** User submits intake form → agent pulls natal chart from database → pulls current transit data from Agent 1 → generates reading in Jordan's voice → delivers via app.
**Key principle (from June 5 intake):** "Autonomous chart synthesis" as a distinct agentic behavior. Not text generation — the agent takes action: fetching data, running calculations, routing to the right reading format, composing the output.

---

### Agent 3: Conversational Counselor
**Status: EXISTS as 4-modes system, not yet a standalone agent**
**Function:** Adaptive response layer. Detects whether the user needs data delivery, emotional holding, tarot reflection, or thinking partnership. Routes accordingly. Never delivers a clinical report when someone is in distress.
**Current implementation:** 4 modes triggered by conversation keywords (spinning / card pull / help me think / astro reading).
**Gap:** The routing is manual (Jordan or context triggers it). For a multi-user app, the routing agent needs to detect emotional register from user input automatically and activate the correct mode.
**Phase 3 implementation:** NLP layer on user input → sentiment/intent detection → routes to Astrologer, Counselor, Tarot, or Reflection sub-agent. Each sub-agent has its own prompt context and output format.
**Key principle (from June 5 intake):** "Conversational counseling" is a distinct agentic behavior from chart synthesis. These are not the same agent. The counselor doesn't calculate aspects — it holds the person.

---

## Architecture Principles

### Non-Linear Routing
**Source:** June 5 Gemini intake
The system does not run the same pipeline every time. Input determines which agent activates. A user in crisis doesn't get a transit reading — they get Agent 3. A user asking "what does my chart say about my career?" gets Agent 2 focused on the 6th/10th house axis. A user asking "what's happening in the sky this week?" gets Agent 1's output formatted as a collective digest.

This is the core architectural decision that separates a reading pipeline from an agentic system.

### Modular and Composable
**Source:** June 5 Gemini intake
Each agent is its own module. Agents can be updated, replaced, or extended without rebuilding the whole system. Agent 1 (transit fetcher) can be swapped to a different ephemeris source without touching Agent 2 or Agent 3. Agent 3 can have new modes added without touching the calculation layer.

**Implication for the current workspace:** Don't hardcode the reading format into CLAUDE.md as a monolith. Each mode (Astrologer, Tarot, Parts Work, Reflection) should eventually be its own prompt context — separable, testable, improvable independently.

### 12th House Invisible Thinker
**Source:** June 5 session — astrological + design principle
The 12th house in Jordan's chart is Gemini-ruled: the hidden architecture that communicates seamlessly through the visible surface. This is the design mandate for the app's backend. All the calculation complexity (Swiss Ephemeris math, aspect logic, context synthesis, database queries) lives in the 12th house — invisible to the user. What surfaces at the Ascendant (the interface) is clear, conversational, human-feeling. The user should never sense the machinery.

**Practical implication:** Loading states and processing indicators should feel minimal and deliberate, not technical. Error messages should be warm. The reading should feel like it came from a person who understands them, not from a calculation engine.

### Stealth Mode Development
**Source:** June 5 Gemini intake
The 12th house requires isolation to create. Build the prototype before broadcasting it. The South Node Gemini pull is to mirror progress externally (share the concept, get feedback, validate the direction). The North Node Sagittarius imperative is to build it privately and release it complete. Phase 1 and Phase 2 are stealth. Phase 3 launch is the 11th house moment — releasing to the collective.

---

## Training and Calibration Principles

### Emotional Register Calibration
**Source:** June 5 Gemini intake
Agents don't just output accurate data — they read the emotional register of the request and respond accordingly. A user asking "what does my Venus in Scorpio mean" wants interpretation. A user saying "I keep ending up in relationships where I feel unseen" wants to be held and then interpreted. Agent 3 (Counselor) specifically: train to detect the difference and never skip the holding step to deliver data faster.

**Current calibration source:** KNOWLEDGE.md psychological patterns section + voice-canon.md + Jordan's own 4-modes trigger protocol.

### Jordan's Voice as the Training Corpus
**Source:** app-vision.md Voice Differentiator section + June 5 session
The reading voice is trained on:
1. This workspace — daily readings accumulating as a corpus since March 2026
2. KNOWLEDGE.md interpretive language (what phrases land, what reframes work)
3. voice-canon.md (explicit quality standards with reasoning)
4. Jordan's MFA creative writing (to be integrated Phase 2-3)
5. Transcribed audio of Jordan speaking naturally (Phase 3)

Every reading session adds to this corpus. The voice gets more precise over time.

### The Empathy-Accuracy Axis
The app sits at the intersection of psychological precision and emotional warmth — not either/or. Agent calibration targets: accurate before anything else (never shape readings to fit narrative), then warm (the accuracy IS the warmth — knowing someone's specific situation well enough to name it precisely).

Anti-pattern to train out: vague platitudes that feel warm but contain nothing specific. "You may find communication challenging today" is not a reading. "Saturn is 0.32° past exact inconjunct your Scorpio Mercury — the editorial weight is releasing, Friday is a good day to notice your voice coming back" is.

---

## Interface Design Principles

### Not Dry Data Blocks
**Source:** June 5 Gemini intake
The UI is not a report. It's a discovery experience. Interactive, visually immersive, curiosity-driven. Users should feel like they're exploring something, not reading a document.

**Existing examples that get this right:**
- `sky-at-work.html` signal board: click-to-reveal, sticky status bar, scannable at a glance
- `chart-wheel.html`: visual + interactive, key overlay, procedurally generated from data

**The reading as artifact:** The natal reading scroll is the product, not an anti-pattern. It is an art object you return to. The return-visit challenge is solved by building recurring touchpoints (daily transits, lunar rituals, seasonal readings) that orbit the natal reading as a fixed reference — not by replacing it with a card feed.

### Gamified / Joyful Element (5th House Design Philosophy)
**Source:** June 5 Gemini intake — natal Jupiter in Scorpio, 5th house
The 5th house rules play, speculative ventures, joyful creation. Jupiter in Scorpio: depth, intensity, but fundamentally expansive and generous. The app's UX should have an element of play and discovery built into the core interaction — not as an add-on, but as the design philosophy.

What this might look like:
- Aspects that "activate" as you scroll or interact
- Personalized planet descriptions that reveal in sequence
- A transits feed that shows "what's building toward you" like a forecast with movement
- Rising sign personalization that makes the same chart feel specifically yours

### The UX Register: Contemplative Artifact
**Source:** June 5 — resolved via competitive research
**Status: RESOLVED**

The Pole A / Pole B framing was a false binary. Competitive research across all six major apps (see `competitor-research-2026-06-05.md`) confirmed that every competitor picks one: either cold/analytical or warm/chatty. Neither pole is the product.

**Ruling:** The natal reading is a contemplative artifact. You receive it, you scroll it, you return to it. The experience is immersion, not interaction. The app's core deliverable — the natal chart reading — stays a scroll. An art object made for one specific person.

**What this means for the interface:**
- The reading format (scroll, beautiful, deep) is not an anti-pattern — it is the product. Preserve it.
- Interactivity lives in the layers *around* the reading: transit updates, ritual prompts, synastry on demand, lunar moments.
- If a conversational layer is ever built, model it on CHANI (narrative, authored, empowering) not The Pattern (personality quiz cards).
- The return-visit problem is solved by building recurring touchpoints around the reading — not by replacing the reading with an app feed.

---

## The Transit Map for the Build (SPARK/FUEL/ENGINE/CODE)
*Active as of June 2026 — all four simultaneously live*

| Function | Transit | What it does for the build |
|---|---|---|
| **THE SPARK** | Uranus conjunct South Node (12th, Gemini) | Downloads revolutionary tech concepts. The latent intellectual architecture activating. Where the architectural insights come from. |
| **THE FUEL** | NNode trine natal Jupiter (5th, Scorpio, 0.09° June 5) | The soul path's grace opening into the creative/speculative house. The destined yes that runs the whole project. Act on this window. |
| **THE ENGINE** | Jupiter trine natal Pluto (6th, Scorpio, exact June 9) | Psychological depth + expansion + eventual financial scale. Plant architecture seeds before June 9 — they reach fuller expression through this trine. |
| **THE CODE & RULES** | Saturn inconjunct natal Mercury (5th, Scorpio, separating) | The structural accountability that makes it real. AI prompts must be systematically structured. Agent workflows must be reliable. Not just conceptually innovative. |

Use this as a reference when the build direction feels uncertain. Each of the four active transits is performing a specific function in the development process. They don't conflict — they're four different departments running simultaneously.

---

## Agent 4: Competitive Intelligence / Research Agent
**Status: COMPLETE — June 5, 2026**
**Source:** Dasha's June 4 Slack tips (via intake June 5)

**Function:** A browser-based agent that visits competitor apps, websites, and help desks — takes screenshots, scrapes copy and UI patterns, surfaces what competitors do and what their users struggle with.

**Why this matters for the build:**
The open UX design decision (conversational/therapeutic vs. analytical/technical) cannot be answered by thinking about it — it requires knowing what already exists in the market. Competitor help desks specifically surface: what users most commonly ask about, where they get confused, what features they need that don't exist yet. This is the research layer that informs every product decision.

**The tool: Playwright MCP**
Dasha's specific recommendation. Playwright is a browser automation library — when added as an MCP server to Claude Code, it lets me launch a real browser, navigate to URLs, take screenshots, scrape page content, and interact with UI elements. This is how we research the market without doing it manually.

**What to set up:**
1. Add Playwright MCP to Claude Code (via `claude mcp add` or settings.json)
2. Define the competitor target list (see below)
3. Run a research session: visit each target, screenshot key screens, scrape help desk/FAQ content, summarize UI patterns and gaps

**Competitor target list (proposed — confirm with Jordan):**
| App | What to scrape | Why |
|---|---|---|
| Co-Star | Onboarding, daily reading UI, notification style | Market leader aesthetics, cold/data-driven — what Jordan's app is NOT |
| The Pattern | Reading format, psychological framing, subscription model | Closest to Jordan's psychological depth angle |
| CHANI | Full product experience, pricing page, reading style | Feminist/healing-oriented — closest to the tone |
| Sanctuary | Chat interface, live + AI hybrid model | Conversational-first UX model |
| Time Passages | Chart UI, transit reading format | Jordan uses this — knows it well, good baseline |
| Astro.com | Data presentation, chart wheel design | Serious astrologer's tool — ugly but deep |

**Help desk scraping:**
Each competitor's help/FAQ section reveals: what users ask most, what features confuse them, what's missing. This is free user research. Dasha specifically flagged this.

**IP note:** We build our own code entirely (see product-decisions.md). The research agent is for intelligence only — screenshots, UI patterns, and pain point research — not for copying implementation.

**Results filed:** `the build/competitor-research-2026-06-05.md` (full analysis). UX pole decision resolved from findings. Market gap strategy filed to `the build/market-strategy-2026-06-05.md`.

---

1. **Database layer:** When does the move from flat files (CLAUDE.md / INSTRUCTIONS.md) to a structured database make sense? What format — JSON per user, SQLite, Supabase? What triggers the migration?

2. **Routing agent:** What NLP approach detects emotional register accurately enough for the Agent 3 routing? Rule-based keyword detection (current) vs. classification model vs. LLM-based intent detection?

3. **Ephemeris integration:** The current implementation uses astrolibrary.org web scraping. For a production app, direct Swiss Ephemeris integration (pyswisseph, already in use in the routine) is more reliable. When does this get built into the app layer?

4. **Delivery mechanism:** Phase 2 is a hosted reading URL (GitHub Pages, PWA-enabled) delivered to a closed subscriber cohort. Phase 3 is the full self-serve app. The PDF format is legacy — the URL format (reading lives on device home screen) is the direction.

5. **Intake form design:** What questions does the user answer before a reading is generated? Birth data is the minimum. What else is needed — focus area, emotional context, life chapter?

---

## Session Log

- **June 5, 2026** — Document created. Multi-agent spec, architecture principles, design principles, and open questions populated from Gemini intake + session synthesis. This is the first build architecture document in the workspace.
