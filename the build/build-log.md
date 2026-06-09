# Build Log — AI Astrology System
*Running record of what was built, when, and why. Open at the start of any build session.*
*Newest entries at the top.*

---

## 2026-06-09 — Jordan's Natal Chart HTML v2 (Whimsigoth Visual Upgrade)

**The headline:** Full visual upgrade of jordan.html — mimi.html's Whimsigoth design language adapted to the mobile-nav architecture. New system now sets the bar for all future nav-format charts.

### What Changed
Complete rewrite of `natal readings/jordan.html` preserving all reading content verbatim.

**Sacred geometry constellation backdrop:** Custom SVG polygon networks (8-node outer ring + inner nodes, dot vertices) behind every panel. Chart panel uses the jewel-navy palette; reading panels use deep plum `#0a0614` with tailored geometry per panel (Scorpio cluster dots on Depth panel, IC root lines on Roots panel, triple nested polygon on Soul panel).

**Big Three strip:** Replaced dead whitespace below the chart wheel with a 3-card strip showing Sun 1°50' Sag / Moon 4°59' Aries / ASC 29°22' Gemini. Each card: role label, glyph, degree, sign + house.

**Enhanced section cards (`sec-card`):** Replaced flat `.read-card` glassmorphism cards. New structure: large sign glyph left + dot-separated eyebrow chain (`ASCENDANT · GEMINI 29°22' · ANARETIC DEGREE · 1ST HOUSE`) + section title + italic degree tagline + keyword pills + body text. Radial gradient on card head.

**Keyword pills (`.kw`):** Small-caps pills on every card — [THRESHOLD], [29TH DEGREE], [SOUL PATH], [LONG BUILD], [STELLIUM], etc.

**Section separators:** Named separators with flanking rules between major section groups.

**Tarot archetype card (SVG gothic arch):** Full gothic arch path + column lines + keystone ornament. 8-point compass rose SVG (custom vector, no emoji). "The Cartographer at the Seam" — Sagittarius · Scorpio · Gemini.

**Poem:** Centered treatment, `text-align:center`, 2.0 line-height, generous breathing room, gold close on the open question.

**Nav active dot indicator:** `::before` pseudo-element — 4px gold dot above active tab.

**Scroll fade-in:** IntersectionObserver on every `.sec-card`, `.dive-wrap`, `.throughline`, `.tarot-outer`, `.poem-outer`. Sibling stagger (`transitionDelay` set dynamically).

**Planet glyph font stack hardened:** `'Apple Symbols','Segoe UI Symbol','Noto Sans Symbols',serif` on all glyph elements, `font-variant-emoji:text` enforced.

Committed + pushed to GitHub. ✓

---

## 2026-06-09 — Jordan's Natal Chart HTML (Mobile-Nav Build)

**The headline:** Jordan's personal natal chart built in a new mobile-nav format — the first chart to use the 5-tab bottom nav architecture that will define Phase 2.

### What Was Built
`natal readings/jordan.html` — Jordan's natal chart with her corrected June 8 Swiss Ephemeris data.

**Architecture:** Fixed 56px header + 5-tab bottom nav + absolute panels with internal scrolling. First departure from the scroll-format natal charts (mimi.html, carina.html). Mobile-native from the ground up.

**Tabs:**
- ✦ Chart — full SVG natal wheel, chart key drawer
- ☉ Identity — Essential Signature, ASC, Sun/NNode/Mars, Moon/Lilith
- ♏ Depth — Scorpio 5th stellium, 7th house Uranus/Neptune architecture
- ⚷ Roots — Chiron/IC wound, Saturn/Fortune 9th, Pisces MC
- ☊ Soul — Through-Line, Archetype Card, free verse poem

**Chart wheel:** Jordan's CHART data (all 13 planets incl. SNode), aspects from the corrected natal data. Spread algorithm upgraded with `enforceMinGap()` post-processing (10° minimum) to fix NNode/Mars display overlap (only 0.42° apart after initial spread).

**Archetype card:** "The Cartographer at the Seam" — someone who stands where visible meets invisible, maps the territory from inside it, wound shows the seam, Fortune lives in the long tradition of this labor.

**Poem:** Present tense, no em dashes, ends on open question ("What is the thing you are building / that only the wound could have known to make?"). Workshop standards met.

**Reading content:** All prose from jordan-natal-reading.md (June 8 2026), voice-canon audited, used verbatim in reading panels. Collapsible dive sections for Mars, Pluto 6th, Lilith, Sagittarius DSC sections.

**Design:** Chart panel uses jewel navy `#09102a`; reading panels use deep plum `#0a0614`. Planet strips at top of each reading panel. Glassmorphism cards throughout.

Committed + pushed to GitHub. ✓

---

## 2026-06-09 — Dasha Work Call Intake + Inbox Processing

**The headline:** New product features seeded from Dasha's live reaction to the v2 natal chart demo. Tech stack recommendations landed. Inbox cleared.

### Dasha Transcript — AI Repository Call (44 min)
Jordan demoed the v2 natal chart (Mimi's) live to Dasha. Dasha saw the chart wheel, collapsible pop-outs, archetype card, and poem closing. Her reaction: "It looks really, really good, especially the artistic touches."

**New features seeded from Dasha's suggestions:**
- **Workplace synastry/matching feature** — select yourself + a coworker, get tips on how to work better together given your respective charts. Dasha: "Let me know once you get that matching system going, because I feel like I need that right now." Filed to app-vision.md under Corporate Product.
- **Interface skins/theming** — old MySpace/Tumblr concept: user can apply different visual skins (hot pink, retro, whimsigoth, etc.) to their astrology interface. Endgame Phase 3 feature. Filed to app-vision.md.
- **Mobile-forward navigation** — Jordan confirmed the current scroll-dashboard format needs to evolve to a nav-based mobile-first layout before the product goes to Phase 2.

**Tech stack from Dasha (June 9):**
- **Resend** — email service (Dasha's "R" one, near Render). Free tier, newsletter/subscriber comms, API-accessible, vibe-codeable. Use for Phase 2 subscriber email delivery.
- **Supabase** — free tier (1–2 projects per org), then ~$10–20/mo per project. For DB/storage — can't store data locally for long at scale. Filed to app-vision.md.
- **Xcode** — use for live mobile phone preview while coding. Dasha's dev tip for testing mobile UI without deploying.

### Inbox Processed
- **Lilith research** (True H10 + Mean H11 interpretations) → KNOWLEDGE.md
- **Transit-to-transit library** (societal + workplace-specific) → app-vision.md
- **SEO/AEO/passive income angle** → market-strategy

### Tony Birth Time
Still pending. Jordan asked him; he says he doesn't know. Suggestion: ask his mom.

---

## 2026-06-08 — Data Integrity + System Architecture Day

**The headline:** Discovered and corrected significant errors in the natal chart data that had been in the system since the beginning. Everything downstream is now accurate for the first time.

### Natal Data Correction
Prior natal data was entered manually and never verified against Swiss Ephemeris. Ran full recalculation using pyswisseph, verified every planet against Time Passages spot-check.

**Corrections made:**
| Planet | Was | Now | Impact |
|--------|-----|-----|--------|
| Pluto | Scorpio 25°40' **5th house** | Scorpio 25°41' **6th house** | Stellium interpretation changes; transformation lives in daily work |
| Mars | Sagittarius 27°35' | Sagittarius **10°46'** | Sun-NNode tight (1.2°); Mars is a separate instrument at 7-9° |
| Saturn | Aquarius 1°15' | Aquarius **24°15'** | 23° error; all Saturn transit timing recalibrated |
| Venus | Scorpio 10°41' | Scorpio **18°50'** | Stellium spread corrected |
| Mercury | Scorpio 9°25' | Scorpio **12°17'** | Minor but real |
| MC | Pisces 0°59' | Pisces **8°17'** | Confirmed by Time Passages (8°16') |
| Chiron | Virgo 8°08' | Virgo **8°29'** | 0.2° past IC — confirmed 4th house |
| Neptune | Capricorn 20°48' | Capricorn **19°11'** | Minor |

**New additions:**
- Lot of Fortune: Aquarius 26°13' H9 — night chart formula, 1°58' from natal Saturn. Fortune and discipline are conjunct.
- Black Moon Lilith (Mean): Aries 15°07' H11
- Black Moon Lilith (True): Aries 9°49' H10 — 4°50' from Moon

### House Cusps — First Complete Set
All 12 Placidus house cusps calculated via Swiss Ephemeris and added to `natal-chart.json`. Were a known gap since the file was created.

| House | Cusp |
|-------|------|
| 1 (ASC) | Gemini 29°22' |
| 2 | Cancer 20°14' |
| 3 | Leo 12°01' |
| 4 (IC) | Virgo 8°17' |
| 5 | Libra 12°07' |
| 6 | Scorpio 22°07' |
| 7 (DSC) | Sagittarius 29°22' |
| 8 | Capricorn 20°14' |
| 9 | Aquarius 12°01' |
| 10 (MC) | Pisces 8°17' |
| 11 | Aries 12°07' |
| 12 | Taurus 22°07' |

### Files Updated
- `natal-chart.json` — full rewrite with corrected degrees, house cusps, Lot of Fortune, Lilith
- `NATAL.md` — corrected planet table, key patterns section, stellium descriptions
- `CLAUDE.md` — intro paragraph corrected (Pluto house, Mars degree, MC)

### CLAUDE.md Tiered Architecture
Split the monolithic CLAUDE.md (~89K bytes always-loaded) into 6 specialized files. Always-loaded context now ~32K bytes.

| File | Loads When | Content |
|------|-----------|---------|
| `CLAUDE.md` | Always | Core SOPs, session routing, situation snapshot |
| `NATAL.md` | Always | Natal chart, house guide, calculation rules |
| `KNOWLEDGE.md` | Always | Correlations, patterns, life arcs |
| `transit library/INDEX.md` | Always | Active transit status |
| `READING-FORMAT.md` | Reading sessions | All reading SOPs, format specs, voice guide |
| `CLAUDE-WORKPLACE-HTML.md` | Workplace HTML only | Signal board, sky-at-work.html spec |
| `CLAUDE-BUILD.md` | Build sessions | Business context, intake protocol |
| `CLAUDE-NATAL-BUILD.md` | Natal chart builds | v3 template, poem SOP |

### House Interpretation System
Added to two files simultaneously:

**`NATAL.md` — House Color Guide:** All 12 houses with exact cusp degrees, natal planets, and interpretive lens specific to Jordan's chart. How transits through each house should be read. Proportion rule by orb (exact = full paragraph, separating >2° = transit board only).

**`READING-FORMAT.md` — House Interpretation Rules:** House number required in every transit board row. Prose leads with the department before the planet. When a transit changes houses, name the shift.

### Routine Updates
Two additions to `routine/ROUTINE-UPDATE-INSTRUCTIONS.md`:
1. **Step 4:** Now reads `the build/voice-canon.md` before writing every reading (alongside READING-FORMAT.md)
2. **Step 6 (new):** Patches `transit library/INDEX.md` orb values from `positions-today.json` on every run. The always-loaded index was going stale between sessions.

Jordan updated the live routine prompt at `claude.ai/code/routines` same day. ✓

### Transit Library
Two full breakdown files created:
- `transit library/pluto-sextile-moon.md` — 3-pass arc, exact ~June 28-July 1 (retrograde pass). Critical note: Neptune and Pluto both exact on natal Moon simultaneously in late June/July 2026.
- `transit library/saturn-conjunct-moon.md` — First pass documented with 7 dated correlations. Second pass enters orb October 2026.

### Jordan Natal Reading (Markdown)
`natal readings/jordan-natal-reading.md` — full natal reading using corrected data. Voice-canon audited: em dashes cut from ~15 to 3, "quality" crutch removed, house depth added to every section, trailing qualifications cut, archetype language replaced with specific. Key new interpretive findings woven in: Pluto in 6th, Lot of Fortune conjunct Saturn, Chiron conjunct IC.

### Lunar Ritual Spec
`rituals/LUNAR-RITUAL-SPEC.md` — complete build brief for next session. Covers: trigger logic (detect New/Full Moon within 48 hours), file structure (6 sections), tone rules, naming convention, seed/harvest tracking across pairs. All infrastructure already in place.

---

## 2026-06-05 — Business Strategy + Workspace Restructure

**The headline:** Etsy plan dropped. This is a full subscription app. Phase structure locked.

### Phase Structure (confirmed)
- Phase 1: Build + Internal Beta (now) — Jordan + close friends
- Phase 2: Closed subscriber cohort, ~20 people, $20–35/mo
- Phase 3: Public app

### New Build Files Created
- `the build/app-vision.md` — phase roadmap, feature list
- `the build/product-decisions.md` — resolved + open decisions log
- `the build/agent-architecture.md` — multi-agent system spec (transit fetcher built, chart synthesizer partial, counselor = 4-modes)
- `the build/market-strategy-2026-06-05.md` — competitive positioning
- `the build/intake-protocol.md` — 8-category SOP for large data drops
- `the build/competitor-research-2026-06-05.md` — Co-Star, The Pattern, CHANI, Sanctuary analysis

### Workspace Restructure (May 30, executed June 5)
Flat folder hierarchy. Renamed from nested structure:
- `readings/daily/` → `daily readings/YYYY-MM/`
- `readings/synastry/` → `synastry readings/`
- `natal/` → `natal readings/`
- `ritual/` → `rituals/`
- `tarot/` → `tarot readings/`
- `readings/week-ahead.md` → `weekly readings/`

GitHub Pages URLs updated: spaces encode as `%20`.

### Carina Natal Chart
`natal readings/carina.html` — complete, live at GitHub Pages. GitHub Pages was broken 20 hours due to missing `.nojekyll` — fixed. Canonical v2 Whimsigoth template.

---

## 2026-06-02 — Routine Quality + Bug Fixes

**The headline:** `is_applying()` function was wrong for all non-conjunction aspects. Fixed. Reading quality standards codified.

### Bug Fixes
- **`is_applying()` rewritten:** Was ignoring `aspect_angle` parameter — checked planetary motion but not aspect geometry. Oppositions were labeling "applying" when separating. Now uses 0.5-day lookahead, correct for all aspect types.
- **Weekday name bug:** Routine was computing weekday from date (unreliable in LLMs). Script now writes `"weekday"` directly to `positions-today.json`.

### Voice Canon Created
`the build/voice-canon.md` — product-level reading quality spec. 9 Voice DNA principles. Reading Quality Standards with dated refinement log. Cross-reading-type application protocol.

### Routine Instructions Updated
- Applying/separating cross-check requirement added
- Correlations no-repeat rule (same tracking prompt can't appear in consecutive readings)
- Language variety guidance for ongoing transits
- Morning Pulse: one sentence, no degrees, felt sense only
- Deep-dive: vary opening, optional pull-quotes, short minor transits, specific not archetypal

---

## 2026-06-04 — Carina's Chart v2 + Chart Wheel + Voice DNA

**The headline:** Full visual design system locked. The chart wheel is a real IP asset. Voice DNA codified.

### Carina's Natal Reading v2
`natal readings/carina.html` — canonical v2 Whimsigoth template. Design system locked: constellation background fixed full-page, celestial side columns (☽ ☾ ☉ ✦) framing full viewport height, glassmorphism cards, watercolor section blooms, sacred geometry scatter, collapsible dive sections, scroll fade-in, planet pill strip, aspect row color coding. Palette: jewel cosmic indigo, vibrant gold (#e8c040), cerulean, warm ivory — no purple.

### Chart Wheel Built from Scratch
`natal readings/chart-wheel.html` — full SVG natal wheel procedurally generated from Swiss Ephemeris data. Features: element-colored zodiac ring, watercolor house blooms, 16-ray sunburst center, floating key overlay, collision-spread planet placement algorithm, all glyphs and degree labels. Whimsigoth Sacred Geometry aesthetic. This is a real IP asset — no competitor is doing this visual.

**Next build steps for the wheel:** degree tick marks, hover tooltips, aspect line animation, biwheel mode for transits, embed in natal reading pages.

### Writing Style Guide + Voice DNA
Writing style guide expanded from daily readings to all reading types (natal, workplace, weekly, synastry). Voice DNA codified — 11 personality principles behind every craft rule. `voice-canon.md` begins taking shape as the product brief.

### Dasha Tips Ingested (June 4 → June 5)
- Playwright MCP for competitive intelligence (Agent 4 added to architecture spec)
- PWA delivery: any hosted URL can be a home-screen app — GitHub Pages natal charts are halfway there
- Competitor target list built: Co-Star, The Pattern, CHANI, Sanctuary, Time Passages, Astro.com

---

## 2026-05-22 — Voice Differentiator + Round Chart Concept

**The headline:** The reading voice is the product's biggest moat. Documented and scoped.

### Voice Differentiator Captured
The training corpus plan: old TCD MFA creative writing, this workspace's accumulated readings, short written interviews ("How do I talk about Chiron?"), voice notes for rhythm and speech patterns. The goal is a proprietary reading voice that can't be replicated by a competitor starting from scratch.

**The pitch in one sentence:** Every astrology app sounds the same. This one sounds like someone who got an MFA, worked through her religious trauma, and actually uses astrology to navigate her career and love life.

### Round Natal Chart Concept Seeded
The visual chart wheel concept originated here. Built June 4. First in the Whimsigoth aesthetic with no competitor analog.

### Marina Testimonial
First external validation logged in KNOWLEDGE.md. Marina's natal chart reading as Phase 1 proof of concept.

---

## 2026-05-21 — #astroflow-weekly Launch

**The headline:** Workplace transit channel went live. Proof of concept for "cyclical intelligence in corporate."

### What Launched
`#astroflow-weekly` in Everflow Slack — collective sky readings for Jordan's colleagues. First post May 21. Krista endorsed within 24 minutes. Organic adoption followed.

### Files Created
- `workplace readings/README.md` — format spec
- `CLAUDE-WORKPLACE-HTML.md` — signal board design spec, sky-at-work.html architecture
- First `sky-at-work.html` built and shared

### Significance for the Product
The channel is a live proof of concept: non-astrologers engaging with transit readings in a professional context. User feedback from colleagues is early beta data.

---

## 2026-05-19 — App Vision Expanded

Phase structure written out in full. Cross-workspace links between `the stars/` and `the bones/Money/` established. Business scope and 90-day tactical plan documented in `the bones/Money/astrology-business-scope.md` and `astrology-business-plan.md`.

---

## 2026-05-18 — Phase 1 Scoped

**The headline:** Etsy plan dropped. This is a full subscription app.

The manual reading service is the path, not a detour — every friend chart is a beta product, every morning reading is user research. Phase structure locked: Build+Beta → Closed Cohort ($20-35/mo) → Public App. Full operational plan written. The app is the destination.

---

## 2026-05-01 — Daily Routine Automation

**The headline:** 4am routine operational. The system generates its own readings.

### What Was Built
- `routine/generate-positions.py` — Swiss Ephemeris calculation script. Downloads `seas_18.se1` for Chiron on first run, caches in `routine/ephe/`. Outputs: `positions-today.json`, `positions-week.json`, `active-transits.txt`, `workspace-digest.txt`, `life-snapshot.txt`.
- `routine/ROUTINE-UPDATE-INSTRUCTIONS.md` — live prompt for the routine agent
- Routine `trig_01Rtm1xSST2GbdCZh896F2vP` at `claude.ai/code/routines` — runs 4am CDT / 9am UTC

### Daily output
Clones repo → calculates positions → writes daily reading → patches CLAUDE.md active transits line → commits and pushes. Obsidian Git plugin auto-pulls within 30 minutes.

---

*This log covers major build sessions. Minor patches and daily reading quality improvements are tracked in `the build/voice-canon.md` refinement log.*
