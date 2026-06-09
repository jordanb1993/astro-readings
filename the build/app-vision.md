
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

**"Your AI astrologer who lives with your chart."**

Not an astrology app. Not a content platform. A subscription product that holds your birth chart as a permanent anchor and generates everything — daily readings, rituals, synastry, the full wheel of the year — in specific relationship to your placements.

**What it does:**
- Daily transit readings personalized to your chart (not generic sun-sign content)
- Synastry readings on demand: add any chart, get a full relationship interpretation
- Area-specific readings: love, career, money, body, creativity — deep dives through your chart's lens
- Other people's charts: subscribers can hold and read for friends, partners, family
- Personalized new moon + full moon rituals, written to how each lunation lands in your chart
- Personalized wheel of the year: all 8 Sabbats interpreted through your specific placements

**The origin:** Mercury stationed retrograde directly opposite Jordan's natal Chiron. The wound is the literal turning point. Chiron could not heal his own immortal wound but became the greatest healer of others precisely because of it.

**The differentiator:** Every astrology app produces content. This produces *your astrology* — daily, seasonal, relational, specific to the exact chart you were born with. Co-Star and The Pattern are horoscope-adjacent entertainment that you outgrow in three months. This is the product you go to after that.

---

## Phase Structure (updated June 5, 2026)

*Note: The Etsy plan is dropped. Jordan has a full-time job and doesn't need early income from readings. The beta testing is already happening — herself (daily readings) and friends (natal chart builds). No Etsy validation needed. Build the product.*

### Phase 1 — Build + Internal Beta (now)
**What it is:** Perfecting the pipeline using Jordan and close friends as beta users. Every morning reading is user research. Every friend chart build is a beta product. The standard is: would Jordan be proud to hand this to a paying stranger?

**Reading types to build in Phase 1:**
- Natal: ✅ template built (carina.html)
- Daily transit: 🔄 already running for Jordan — formalize the template
- Synastry: build the template (Carina's chart has synastry section as a start)
- Ritual: new moon + full moon template
- Area-specific: at least one (love or career) to prove the model

**Success condition:** Five complete friend readings (Marina, Miriam, Kate, Cat, Carina) across multiple reading types. The pipeline runs without Jordan needing to rebuild from scratch each time. The visual system is consistent. The voice is trained.

### Phase 2 — Closed Subscription Beta (months 3–6)
**What it is:** A small paid cohort, invited not discovered. Friends of friends, people from the Slack community, early supporters. Subscription at $20–35/month. Jordan still in the loop reviewing generated readings before they go out.

**Features:**
- Chart vault: subscriber's birth data stored, positions pre-calculated
- Daily transit reading delivered (automated generation, Jordan spot-checks)
- Monthly: new moon + full moon ritual
- On-demand: synastry reading (subscriber adds a second chart)
- Quarterly: area-specific deep dive

**Success condition:** 20 paying subscribers renewing. Feedback confirming the daily reading and ritual formats land. Retention data.

### Phase 3 — Public Subscription App (6–18 months)
**What it is:** Self-serve. User enters birth data → full onboarding reading → daily readings start immediately. No Jordan in the loop for generation. Jordan as editor/curator of the voice and reading system. Subscription at $25–35/month.

**The product at full build:**
- Chart vault for self + saved charts for others
- Daily personalized transit reading
- Synastry on demand
- Area-specific readings (love, career, money, body, creativity)
- Full moon + new moon rituals personalized to chart
- Wheel of the year: all 8 Sabbats, personalized
- Beautiful, proprietary visual system throughout

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

## Reading Types (Full Product Scope)

Five reading types, each needing its own template, voice register, and generation logic:

| Type | Status | Description |
|---|---|---|
| Natal | ✅ Built | Full chart synthesis — the scroll (carina.html canonical template) |
| Daily transit | 🔄 Prototype | What Claudia generates for Jordan each morning — personalized to natal chart |
| Synastry | 📋 Planned | Two-chart comparison, full relationship interpretation |
| Area-specific | 📋 Planned | Natal through one lens: love / career / money / body / creativity |
| Ritual | 📋 Planned | New moon, full moon, wheel of the year — ceremonial, action-oriented |

The natal template is the visual and voice foundation. Every other type inherits the aesthetic and reading voice, adapted to its register (daily readings are shorter and grounded in the present; rituals are ceremonial and forward-leaning; synastry has its own two-person dynamics).

---

## What Makes It Different

1. Real expertise — years of serious study, not prompts
2. **The voice is trained on Jordan's actual writing** — see Voice Differentiator section below
3. Persistent chart relationship — the app knows your chart the way an astrologer who has worked with you for years knows it
4. The full astrological year — daily, lunar, seasonal, all personalized
5. MFA-level writing quality — a pleasure to read, not a list of keywords
6. Healing orientation — Chiron wound as north star
7. Visual system with no competitor analog — sacred geometry, proprietary, unmistakable

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

## Interface Skins / Theming System
*Seeded June 9, 2026 — Jordan's idea, confirmed by Dasha*

**The concept:** User-selectable visual skins for the astrology interface. Like old MySpace or Tumblr where you could apply a skin and the whole look changes — the same data, a completely different feel.

**Proposed skin options:**
- Whimsigoth (default — the current sacred geometry palette)
- Hot pink / Y2K
- Retro / earth tones
- Clean minimal (for the corporate product angle)
- Seasonal (auto-shifts with the wheel of the year)

**Why it fits:** The 12th house design principle says the machinery should be invisible — but the surface can be endlessly customizable. Skins are purely presentational, the data layer doesn't change. This also creates a personalization signal: which skin a user picks tells you something about how they want to engage with astrology.

**Phase relevance:** Phase 3 endgame feature. Phase 1 and 2 use Whimsigoth only. Don't build this early — note it so the architecture doesn't preclude it (i.e., avoid hardcoding colors as statics; use CSS variables from the start).

---

## Chart-Centric Hub Architecture — The Connected Library Vision
*Seeded June 9, 2026 — Jordan's vision for what the mobile nav shell becomes*

**The core idea:** The natal chart HTML is not a standalone reading. It is the **root node** of a personal astrology library. Every other content type — daily readings, long-term transit breakdowns, weekly forecasts, moon rituals, synastry — branches off the same hub, navigable from the same URL.

One URL per person. Everything about their chart, their transits, their sky, accessible from one place. When Jordan sends someone their chart URL, they're not getting a PDF. They're getting their astrology home.

**The hub model:**
```
[person].html — the root
├── Chart tab         → SVG natal wheel, key drawer, Big Three (static, already built)
├── Natal tabs        → Identity / Depth / Roots / Soul (static content, already built)
├── Transits tab      → Active long-term transits, fetched from transits.json (Phase 2)
├── Daily tab         → Today's reading, fetched from daily.json rebuilt by routine (Phase 2)
├── Moon tab          → Current lunar phase, next ritual, fetched from moon.json (Phase 3)
└── [people chip]     → Switch between saved charts (Jordan → Mimi → Carina) (Phase 3)
```

**What makes this achievable without a backend:**
The routine already writes JSON every morning (`positions-today.json`, `active-transits.txt`). The HTML just needs to fetch those files on load. GitHub Pages can serve them. No server, no database, no login — until Phase 3 requires it.

**The JSON contract (Phase 2 target):**
Each person's chart gets a companion `[name]-live.json` rebuilt nightly by the routine:
```json
{
  "date": "2026-06-09",
  "daily_reading": "...",
  "active_transits": [...],
  "moon_phase": "waxing crescent",
  "next_exact": { "transit": "Pluto sextile Moon", "date": "2026-06-28" }
}
```
The HTML fetches this on load, renders the Transits and Daily tabs with live data. If the fetch fails (offline, old URL), the natal reading tabs still work — they're always baked in.

**For friends:** When Jordan is ready to extend this to others, each friend's `[name].html` needs:
1. Their natal data hardcoded (already done for mimi, carina)
2. A companion `[name]-live.json` that the routine generates for their chart
3. The same hub shell — no new code, just new data

**The build order:**
- Phase 1 now: Perfect the shell so it can hold this content without rebuilding (this session)
- Phase 2: Add Transits tab + routine writes `jordan-live.json`
- Phase 2: Add Daily tab reads from that same JSON
- Phase 3: People switcher, multi-chart support, login

**Shell build brief:** `the build/natal-shell-v2-brief.md`

---

## Workplace Synastry / Compatibility Matching
*Seeded June 9, 2026 — Dasha's explicit feature request*

**Dasha's words:** "You can have the matching feature where you select yourself and someone else and it gives tips on how you can work better together — where you line, where you don't line, I should be trying to do better because Tony does this because of his zodiac sign."

**The feature:** Within the workplace product or as a standalone feature, a user can select two charts and get practical guidance: where the connection flows, where friction lives, and concrete tips for navigating the dynamic. Not generic sun-sign compatibility — natal-to-natal synastry, interpreted through the lens of working together.

**Jordan's current capability:** She can run this manually now. The full synastry system is built. What's missing is the automation and the interface (pressing a button instead of Jordan calculating it).

**Priority:** Medium. Build the manual version first (Jordan runs synastry for friends/colleagues on request). The automation and self-serve interface comes at Phase 2.

**Live test case:** Dasha wants hers. Tony's birth time is still pending (ask his mom).

---

## Transit-to-Transit Library
*Seeded June 9, 2026 — from inbox capture*

**The idea:** The existing transit library covers transiting planets aspecting natal placements. A parallel library covering transit-to-transit aspects — planets making aspects to each other in the sky — would serve two purposes:

1. **Personal:** What does Venus conjunct Jupiter in the sky mean experientially, independent of any natal chart? What's the collective weather?
2. **Societal:** The broader mundane astrology layer — what is this transit meaning for the world, the culture, the zeitgeist?
3. **Workplace-specific:** A curated subset of transit-to-transit aspects that are specifically relevant to professional/organizational dynamics. Builds on the `#astroflow-weekly` proof of concept.

**Architecture:** Same pattern as the existing transit library — one file per transit, frontmatter schema, links from INDEX.md. This is an expansion of the same architecture, not a new system. Consistent with the "transit library is the app backend seed" principle.

**Phase relevance:** The workplace-specific variant is Phase 1/2 material — it powers the `sky-at-work.html` and the #astroflow-weekly format. The societal layer is Phase 3 content SEO fodder (see market-strategy SEO/AEO section).

---

## Tech Stack — Recommended Infrastructure (Dasha June 9)

| Tool | Purpose | Cost | Notes |
|------|---------|------|-------|
| **Render** | Hosting / backend | Free tier → paid | Already noted; Dasha uses it |
| **Supabase** | Database + storage | Free (1–2 projects/org), then $10–20/mo | Can't store subscriber data locally at scale — Supabase is the answer for Phase 2 chart vault |
| **Resend** | Email delivery | Free tier available | Newsletter + subscriber emails, API-accessible, vibe-codeable. Dasha's "R" service (distinct from Render). Use for Phase 2 subscriber email delivery |
| **Xcode** | Mobile dev preview | Free | Shows real phone UI live while coding; test mobile layouts without deploying |

**Supabase note:** 1–2 free projects per org. Start with one free project in Phase 1. At Phase 2 scale, $10–20/mo per project is trivial against subscription revenue. This is the natural home for: subscriber birth data, chart cache, reading history, delivery records. **Confirmation from work context:** Dasha uses Supabase (`vznjfxfugammbqgbwydl`) for the AI Playbook at Everflow — it's production-grade and already familiar to Jordan.

**Render note:** Dasha hosts the AI Playbook's geo map interactive tool at `ai-playbook-assets.onrender.com`. Same pattern works for astrology app backend tools and the Swiss Ephemeris calculation layer.

**Resend note:** Free tier supports subscriber/newsletter emails (not cold outreach). API means vibe-coding the email layer is feasible. Dasha hasn't paid for it yet on her free tier. Start there for Phase 2 delivery infrastructure.

**AEO/llms.txt note:** The AI Playbook has a `llms.txt` at root with all recipe content structured for LLM citation. The same pattern applies to the astrology content site — a `llms.txt` with all transit interpretations, reading formats, and natal methodology means the content gets cited by AI assistants as a primary source. Jordan and Dasha built this system together and it's proven.

---

## Mobile-Forward Navigation
*Confirmed direction June 9, 2026*

**Current state:** The natal reading scroll format is intentionally immersive and non-interactive (confirmed contemplative artifact design decision). But the broader app interface — the home, the nav, the "what do you want today" layer — needs to be mobile-first navigation, not a scroll dashboard.

**Jordan's words:** "I need to get it to switch over to that thing where it's like, it's not like a scroll sort of dashboard... I want it to be more like a navigation sort of a build. Mobile forward."

**Direction:** The reading itself stays as a scroll. The app wrapper (home screen, nav, chart vault, reading type selection) should be designed mobile-first with a navigation model. Think: bottom nav tabs, card-based reading type selection, chart as persistent anchor accessible from any screen.

**Phase relevance:** Phase 2 delivery infrastructure question. Phase 1 can stay as individual HTML files. Phase 2 needs the nav wrapper.

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
*Migrated to `the build/build-log.md` as of June 8, 2026. Add new entries there. Entries below kept for reference.*

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
