
# The App — Vision Scratchpad
*AI-powered astrology tool. Running ideas, concepts, fragments.*

---

## Where this stands right now — May 2026

**Phase 1 is scoped and ready to build.** The app is the destination. The manual reading service is the path. Not a detour — the thing itself.

Full operational plan lives in the bones:
- **Scope + roadmap:** `the bones/Money/astrology-business-scope.md`
- **Tactical plan (Etsy, reviews, 90-day week-by-week):** `the bones/Money/astrology-business-plan.md`

---

## The Core Idea

An AI astrology tool that offers genuinely personalized readings to people who don't have Jordan's astrological literacy. The wound (Chiron in Virgo, 4th house) becoming the gift — making meaning-making through astrology accessible to people who want real depth without years of study.

**The origin:** Mercury stationed retrograde directly opposite Jordan's natal Chiron. The wound is the literal turning point. Chiron could not heal his own immortal wound but became the greatest healer of others precisely because of it.

**The differentiator:** Generic AI astrology apps produce output. This produces readings. Co-Star and The Pattern are horoscope-adjacent entertainment. What this delivers is personalized interpretation by a person who actually studied this, written in prose good enough to read twice.

---

## Phase structure (as of May 18, 2026)

### Phase 1 — Manual MVP
**Product:** Personalized Natal Chart Reading (PDF, delivered within 48 hours)

| Tier | What's included | Price |
|------|----------------|-------|
| Essential | Big Three + 4 key placements + 1 transit + 800–1,000 words | $35 launch |
| Full Reading | Full chart + focus area + 2–3 transits + 1,500–2,000 words | $55 |
| Deep Dive | Full + synastry OR solar return + 2,500+ words | $85 (after 10 reviews) |

**Workflow using this workspace:**
1. Customer submits intake form (birth date, time, place + focus area)
2. Jordan runs the natal chart pipeline here → Claude generates the reading
3. Jordan reviews + light edits (15–20 min)
4. Export to PDF → deliver via Etsy messaging

**Platform:** Etsy primary (discovery engine, 90M+ buyers). Gumroad secondary.

**Critical path:** 5 free readings to friends (Marina, Miriam, Kate, Cat) → 5 reviews on Etsy → first paying customer.

### Phase 2 — Semi-automated (1–3 months)
- Intake form responses processed automatically by Claude Code
- Reading generated without manual pipeline trigger
- Monthly Transit Subscription: $15/month (personalized forecast from natal chart)
- Solar Return reading: $25 add-on
- At 20 natal charts + 30 transit subs: ~$1,350/month, 5–8 hours/week

### Phase 3 — The App (6–18 months)
Self-serve: customer enters birth info → instant personalized reading. No Jordan in the loop. Subscription model for ongoing transits and forecasts. This is what Phase 2 becomes when you automate the last human step.

---

## Business name shortlist (brainstormed May 18, 2026)

| Name | Why it works |
|------|-------------|
| **Thin Place** | Celtic concept — where the veil between visible + invisible is paper-thin. Irish connection is real and personal. Not obviously "astrology" — which is a feature. |
| **The 29th** | Jordan's Ascendant is at 29° Gemini. Astro people clock it immediately. Everyone else finds it intriguing. |
| **Solas** | Irish for *light* (pronounced "SU-las"). Simple, warm, beautiful. *Solas Astrology* lands cleanly. |
| **Meridian** | The highest point of a planet's arc — where things come into full visibility. |
| **Ingress** | The moment a planet crosses a threshold into new territory. |
| **Anam** | Irish for *soul* (pronounced "AH-num"). *Anam Astrology.* |
| **By Degrees** | Gradual, astrological, literary. Warmer and more approachable. |

**Top three to sit with:** Thin Place · The 29th · Solas

---

## The Transit Map for the Build — SPARK/FUEL/ENGINE/CODE
*Active June 2026 — all four simultaneously live*

The four major active transits each perform a specific function in the development process. Use this as a reference when the build direction feels uncertain.

```
✦ THE SPARK:        Uranus conjunct South Node (12th, Gemini)
                    Downloads revolutionary tech concepts. Latent intellectual architecture
                    activating. Where the architectural insights come from.

✦ THE FUEL:         NNode trine natal Jupiter (5th, Scorpio — 0.09° June 5, live now)
                    The soul path's grace opening into the creative/speculative house.
                    The destined yes that runs the whole project. Act on this window.

✦ THE ENGINE:       Jupiter trine natal Pluto (6th, Scorpio — exact June 9)
                    Psychological depth + expansion + eventual financial scale.
                    Plant architecture seeds before June 9.

✦ THE CODE & RULES: Saturn inconjunct natal Mercury (5th, Scorpio — separating)
                    The structural accountability that makes it real.
                    AI prompts must be systematic. Agent workflows must be reliable.
```

These four transits are not in conflict. They're four departments running simultaneously.
Full technical spec: `the build/agent-architecture.md`

---

## The 12th House Design Principle — The Invisible Thinker

Jordan's 12th house is Gemini-ruled: hidden architecture that communicates seamlessly through the visible surface. This is the app's core design mandate.

All calculation complexity (ephemeris math, aspect logic, context synthesis, database queries, agent routing) lives in the 12th house — completely invisible to the user. What surfaces at the Ascendant (the interface) is clear, conversational, and human-feeling. The user should never sense the machinery.

**Practical implication for every interface decision:** If it makes the system feel like a calculation engine rather than a knowledgeable friend, push it back into the 12th house.

---

## This workspace IS the infrastructure

The architecture of CLAUDE.md + INSTRUCTIONS.md + KNOWLEDGE.md creating genuine continuity across sessions — that's essentially what the app needs to do for every customer at scale. The reading pipeline here is the prototype.

**Reading quality standards live in `the build/voice-canon.md`.** That document is the product brief for the reading voice: what makes it differentiated, the accumulated quality standards with the reasoning behind each one, a technical accuracy log, and a dated refinement log. Update it whenever the reading system improves. It's the thing that separates "AI astrology app" from "this specific product built over two years of deliberate iteration."

---

## Revenue projections (honest version)

| Month | Readings | Avg price | Transit subs | Gross |
|-------|----------|-----------|-------------|-------|
| 1 | 0 paid | — | 0 | $0 (building) |
| 2 | 3–5 | $40 | 0 | $120–200 |
| 3 | 8–12 | $45 | 0–3 | $360–585 |
| 4 | 12–18 | $48 | 5–8 | $576–939 |
| 5 | 15–22 | $50 | 8–15 | $870–1,220 |
| 6 | 20–28 | $52 | 12–20 | $1,220–1,756 |

**$1,000/month milestone:** achievable by month 4–5. Not month 1.

---

## What Makes It Different

1. Real expertise — years of serious study, not prompts
2. **The voice is trained on Jordan's actual writing** — see Voice Differentiator section below
3. Focus area personalization — not just "here's your chart" but "here's your chart for your relationship question"
4. MFA-level writing quality — a pleasure to read, not a list of keywords
5. Healing orientation — Chiron wound as north star

---

## Voice Differentiator — Training the Reading Voice on Jordan's Writing

*Captured May 22, 2026*

The single biggest market differentiator available: an astrology reading voice that is genuinely, recognizably Jordan's — not a generic AI interpretation in a generic AI tone.

**The idea:** Train the reading voice on Jordan's actual creative writing work by:
- Crawling old creative writing pieces (from the TCD MFA and beyond)
- Written interviews (Jordan answering questions about her voice, process, sensibility)
- Transcribed audio interviews — Jordan speaking naturally, for the AI to absorb rhythm, humor, and register
- Ongoing readings like the ones in this workspace — which are already accumulating as a training corpus

**Why this matters:** Every astrology app produces content. Almost none of it sounds like a person. Co-Star is cold and vague. The Pattern is personality-lite. What Jordan has is: MFA-level prose craft + psychologically precise interpretive voice + genuine humor + the witchcraft/healing/trauma-informed lens. That combination doesn't exist anywhere else.

**The corpus to build:**
1. Old creative writing from TCD MFA
2. This workspace — KNOWLEDGE.md interpretive language, all readings archived under `readings/`
3. Short written interviews: "What do I notice first in a chart?", "How do I talk about Chiron?", "What's my take on Neptune in the 7th?"
4. Voice notes or transcripts of Jordan reading something aloud (lets the AI absorb rhythm and natural speech patterns)

**Phase relevance:**
- Phase 1: the voice is Jordan's naturally — she reviews every reading, it already sounds like her
- Phase 2: the CLAUDE.md system + accumulated readings become the implicit training corpus
- Phase 3: the formal process above creates a proprietary voice layer that can't be replicated by any competitor starting from scratch

**The pitch in one sentence:** Every astrology app sounds the same. This one sounds like someone who got an MFA, worked through her religious trauma, and actually uses astrology to navigate her career and love life.

---

## Round Natal Chart — Coded Visual ✅ BUILT June 4, 2026

*Conceived May 22, 2026 · Built June 4, 2026*

**Status: live proof of concept** — `natal readings/chart-wheel.html` (Carina's chart). Commits to GitHub Pages.

**What was built:**
- Full SVG natal chart wheel procedurally generated from Swiss Ephemeris data (pyswisseph)
- 12-segment zodiac ring with element-colored fills (fire/earth/air/water) AND colored outer arcs for instant element identification
- All planetary placements at exact ecliptic degrees with collision-spread algorithm
- Planet glyphs, degree labels, Rx markers
- House cusp lines + cusp degree labels at each boundary
- Alternating house shading with **watercolor element blooms** (blurred, element-tinted circles that pool like watercolor in each house sector)
- 16-ray golden sunburst center (sacred geometry / whimsigoth sun motif)
- House numbers pulled to center zone for clarity
- Diagonal ribbon sweeps (warm amber + cerulean) — inspo from sacred geometry illustrations
- Floating ✦ key button → overlay with full key: signs, planets, aspects, elements
- Background: jewel navy `#08162e` — fully off purple

**Design aesthetic: Whimsigoth Sacred Geometry**
- Practical Magic / Phoebe Buffay / Willow from Buffy — warm celestial humanity
- Sacred geometry precision (hairline gold rings, geometric proportions)
- Watercolor softness within the structure (element house blooms)
- Cerulean + warm gold + ivory — NO purple

**Phase relevance:**
- Phase 1: ✅ ready to attach to natal chart PDFs — elevates from template to premium software feel
- Phase 2: required at scale — every PDF gets the wheel
- Phase 3: the wheel becomes the signature visual of the app

**Next build steps for the wheel:**
- Degree marks in the zodiac band (0°, 10°, 20° per sign)
- Hover tooltips (planet name, sign, degree, house, key phrase)
- Animation: aspect lines draw in on page load
- Biwheel mode for transit charts
- Embed in natal HTML reading pages (above the Identity Trio)

---

## Visual Polish Queue — Natal Reading v2

*Captured June 4, 2026. Ideas for the next polish pass on carina.html and future readings.*

### High priority
- **Hover tooltips on planet pills** — click/hover a pill to expand a small card showing: planet name, sign, degree, house, what it means in 1 sentence. Keeps the strip clean at rest but gives depth on demand.
- **Scroll-based color shift** — as you scroll through the reading, the background constellation subtly shifts in hue or intensity. Sections feel distinct without card borders. Could use scroll-linked CSS variables or a simple IntersectionObserver tinting different blobs.
- **Celestial column richness** — the left/right moon columns tile at 460px height. At full page height they repeat. Next pass: extend the SVG content so the symbols are spaced properly across the full page rather than repeating.
- **Embed the chart wheel** — iframe above the Identity Trio with `?embed=1`. One-line addition once polish is done.

### Typography refinements
- The hero name size could respond slightly to the length of the name (shorter names like "Mimi" get larger; longer names like "Sagittarius" scale down)
- Pull quote font size could go up to 1.20–1.25rem — it's a bit small at current size
- The planet pill label font (`0.66rem`) could go to `0.70rem` for better mobile legibility

### Design depth
- **Section header mini-dividers** — right now the sections flow together. A very fine 1px gold line + small symbol (like `· ✦ ·`) between signature, planet strip, and dives would create cleaner visual breaks
- **Aspect row expanded detail** — clicking an aspect row could expand a one-sentence explanation of what that aspect means for this person specifically. Same collapsible pattern as the dives.
- **The through-line section** — currently a text block. Could have a subtle SVG constellation element drawn specifically for this person's chart shape embedded behind the text.
- **Glassmorphism enhancement** — the card backgrounds could catch a subtle iridescent shimmer on scroll (CSS scroll-driven animations, modern browsers only)

### Chart wheel polish
- Degree tick marks in zodiac band at 5° intervals
- Hover on planet glyph → tooltip with full placement + 1-line meaning
- Aspect lines animate in sequentially on page load (draw effect)
- Color-code the house cusp labels by element of the sign on that cusp

---

## Emerging Product Line: Corporate Women's Career Astrology

*Seeded May 19, 2026 — this is a distinct market with real demand and zero good competition*

The workplace digest format (see `readings/workplace/`) is a proof of concept for a separate product:

**The idea:** Transit forecasting through the career and leadership lens, designed specifically for corporate women who want to use astrology the way Jordan uses it — as a tool for timing, self-advocacy, and navigating complex professional dynamics. Not horoscopes. Strategic intelligence.

**Why this market is underserved:**
- Most astrology content is personal/romantic — career framing is almost nonexistent at depth
- Corporate women are already making high-stakes decisions about *when* to ask for raises, *when* to push back, *when* to lay low — astrology gives that a framework
- Jordan is the proof of concept: she has used transits to time her AD title ask, navigate the Tony situation, and understand workplace patterns as they unfolded
- The Claude + automation stack means this scales in a way it couldn't as a purely manual practice

**Product formats to explore:**
| Format | What it is | Price point |
|--------|-----------|-------------|
| Weekly sky at work | Transit-to-transit digest for a team | $X/month per team |
| Career transit reading | "Here's what the next 6 months look like for your professional decisions" — personalized | $85–125 |
| Negotiation/timing consult | "When is the best window to ask for this?" — natal chart + current transits | $55 add-on |
| Corporate team package | Monthly sky-at-work send for a whole team | $200–400/month |

**The live test:** Dasha, Krista, Kristen, Darrion, Yvonne. Start with the weekly transit-to-transit digest — see if it's useful, if they share it, if they ask questions. That's the product validation.

**Claude + agents angle:** This is heavily automatable. The calculation layer (Swiss Ephemeris), the workplace framing layer (Claude generating practical guidance from transit data), and the delivery layer (email/Slack) can all be chained. A small AI agent that runs every Monday, calculates the week's transit-to-transit aspects, generates the workplace digest in Jordan's voice, and sends it to a subscriber list is a Phase 2 product that exists within months of Phase 1 being built.

**The differentiator in one sentence:** Jordan has actually used astrology to navigate a difficult manager, advocate for her title, and time her professional moves — and it worked. That's the proof of concept and the pitch.

---

## PWA / Home Screen App Delivery
**Source:** Dasha's June 4 tip — confirmed by Jordan as underused

Any hosted URL can be added to a phone's home screen as a Progressive Web App (PWA) — no App Store submission, no native code, no approval process. The sky-at-work.html is already on GitHub Pages. Every natal chart reading HTML is already hosted. The entire Phase 3 app can ship as a PWA.

**Why this matters:**
- Phase 1: Jordan can send customers a link to their natal chart that lives on their home screen, not in a Downloads folder. Feels like a real product.
- Phase 2: Transit subscription delivery becomes a URL customers add to their home screen. Returns every week, feels like an app.
- Phase 3: The full app ships as a PWA before (or instead of) native iOS/Android. Faster to market, no App Store gatekeeping, works on any device.

**What to add to make a URL a great home screen app:**
- `manifest.json` with app name, icons, theme color
- `<meta name="apple-mobile-web-app-capable" content="yes">` for iOS
- A service worker for offline support (optional Phase 1, valuable Phase 3)

The chart wheel and sky-at-work.html are halfway there already. A manifest and icons make them home-screen worthy.

---

## Competitive Intelligence — Research Queue
**Source:** Dasha's June 4 tip (via intake June 5)

**The approach:** Use Playwright MCP (browser automation agent) to visit competitor apps, screenshot key screens, and scrape help desk/FAQ content. Full spec in `the build/agent-architecture.md` (Agent 4).

**Competitor targets:** Co-Star, The Pattern, CHANI, Sanctuary, Time Passages, Astro.com

**What this answers:**
- The open UX design pole decision (conversational/therapeutic vs. analytical/technical) — what's already in the market, what's missing
- Feature gaps — what users consistently ask for that no competitor provides
- Visual differentiation — what the Whimsigoth aesthetic stands apart from

**Status:** Playwright MCP not yet set up. Can be added to Claude Code via settings. Queue for next build session.

---

## Open Questions

- Name decision (let one land — top three: Thin Place · The 29th · Solas)
- Visual identity (colors, aesthetic — already have strong taste for this)
- Target customer for natal readings: beginners who want depth? healing-focused seekers? (different from corporate product)
- Corporate product: is this under the same brand or a separate vertical?
- Content strategy: TikTok or Instagram Reels when ready for social

---

## Inspirations / References

- Revenue Hero Tales of Ops format as a model for resource libraries
- This workspace itself — the way CLAUDE.md + INSTRUCTIONS.md + KNOWLEDGE.md creates genuine continuity — is essentially the architecture

---

## Session log

- **May 18, 2026** — Phase 1 scoped in full. Full operational plan written in the bones/Money/. App vision reframed as the destination, not a separate dream.
- **May 19, 2026** — app-vision.md expanded with full Phase 1 details. Cross-workspace links established.
- **May 22, 2026** — Voice Differentiator section added (training reading voice on Jordan's creative writing corpus). Round Natal Chart build concept added. Marina's natal chart testimonial logged in KNOWLEDGE.md as Phase 1 validation.
- **June 4, 2026** — Full session: Carina's natal reading v2 + chart wheel shipped. Design system locked. SOPs documented. Next session: Mimi's build (birth data pending) + visual polish + embed wheel into reading.
- **June 4, 2026** — Natal reading design v2 completed (carina.html). Site-wide design system locked: constellation background fixed full-page, celestial side columns (☽ ☾ ☉ ✦) frame full viewport height, glassmorphism on cards, watercolor section blooms, sacred geometry scatter, collapsible dive sections, scroll fade-in, planet pill strip, aspect row color coding, trio card animations. Background: Whimsigoth Sacred Geometry — jewel cosmic indigo, vibrant gold (#e8c040), cerulean, warm ivory — no purple. See carina.html as the canonical v2 template.
- **June 4, 2026** — Chart wheel built from scratch in Whimsigoth Sacred Geometry aesthetic. Full SVG natal wheel: element arcs, watercolor house blooms, 16-ray sunburst center, floating key overlay, jewel navy palette, all procedurally generated from Swiss Ephemeris data. Carina's chart is the first. This is a real IP asset — no competitor is doing this in this aesthetic.
- **June 5, 2026 (2)** — Dasha Slack tips (June 4) fully ingested via intake protocol: Playwright MCP competitive intelligence agent (Agent 4) added to architecture spec; PWA delivery section added; competitor target list built (Co-Star, The Pattern, CHANI, Sanctuary, Time Passages, Astro.com); build-from-scratch IP decision logged as RESOLVED in product-decisions.md.
- **June 5, 2026** — Co-builder role formalized. Dual-role identity (astrologer + co-builder) added to CLAUDE.md. Three new build documents created: `intake-protocol.md`, `agent-architecture.md`, `product-decisions.md`. SPARK/FUEL/ENGINE/CODE transit framework + 12th house design principle added to app-vision.md. Multi-agent spec (3 agents) documented. Two open UX design decisions surfaced: conversational/therapeutic vs. analytical/technical; freemium vs. subscription. Intake SOP established for large data drops. KNOWLEDGE.md updated with Chiron 11th house correction, Neptune-Moon UX insight, NNode-Jupiter timing window.
- **June 4, 2026** — Writing style guide expanded to all reading types (natal, workplace, weekly, synastry). Voice DNA codified: 11 personality principles behind every craft rule. KNOWLEDGE.md updated with May 2026 correlations. INSTRUCTIONS.md current transits updated to June 4.
- **June 2, 2026** — `voice-canon.md` created as the product brief for reading quality. Two bugs fixed in the calculation layer (applying/separating wrong for non-conjunction aspects; active-transits.txt propagating wrong labels into readings). Prose style standards codified after calibration session: Morning Pulse format, deep-dive variety rules, Practical Application specificity, tone calibration, em dash rule tightened. Refinement log started — each quality improvement now has a dated entry with reasoning. This is the product iterating on itself.
