# Build Log — AI Astrology System
*Running record of what was built, when, and why. Open at the start of any build session.*
*Newest entries at the top.*

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
