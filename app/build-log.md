# Build Log — AI Astrology System
*Running record of what was built, when, and why. Open at the start of any build session.*
*Newest entries at the top.*

---

## 2026-06-13 — Session 18: Friend chart migrations — Hazel · Iza · Su · Yvonne + icon + PWA

**Theme:** Migrate remaining friends with birth data to 9-tab Pathfinder app; rose-gold icon redesign; PWA + social preview system across all builds

### Hazel — `natal readings/hazel.html`
- Full 9-tab Pathfinder build, Jordan's niece (born May 20 2013, Elmhurst IL)
- Chart: Aquarius Rising 28.92° (anaretic) + Taurus Sun 29.42° (also anaretic — two threshold degrees), Virgo Moon H7, 3rd house stellium, triple 1st house outer planets
- Archetype: **"The Signal Reader"** — numeral XVII, antenna receiving cosmic signal, electric sky blue + gold + violet palette
- Synastry: 3 contacts, niece scope (warm, brief, relational)

### Iza — `natal readings/iza.html`
- Full 9-tab Pathfinder build, online friend (born Feb 23 1996, Opoczno Poland)
- Chart: Sagittarius Rising 12.97°, Pisces Sun H2, Aries Moon H4, NNode Libra 10th, Sun sq Pluto 0.64° (tightest)
- Archetype: **"The Interior Architect"** — numeral XI, compass dividers sigil, forest green + gold + muted rose

### Su — `natal readings/su.html`
- Full 9-tab Pathfinder build, online friend (born Jun 19 1998, Erfurt Germany)
- Chart: Taurus Rising 10.98°, Gemini Sun H2, Aries Moon H12, 12th house cluster (Moon+Jupiter+Saturn), Venus conj ASC, Sun sq Jupiter 0.83°
- Archetype: **"The Interior Press"** — numeral I, quill + ink drop sigil, terra cotta + lavender + cream

### Yvonne — `natal readings/yvonne.html`
- Full 9-tab Pathfinder build, close friend (born Jul 14 1994, Fremont CA)
- Chart: Sagittarius Rising 3.80°, Cancer Sun H8, Libra Moon H10, Sun opp Neptune 0.34° (tightest), NNode Scorpio H12
- Archetype: **"The Interior Witness"** — numeral XX, witnessing eye sigil, deep teal + amber + midnight navy
- Synastry: 8 contacts, full close-friend treatment (ASC conj Jordan NNode 0.75° = most significant contact)

### Synastry duplicate fix — all friend builds
- Removed `#arc-synastry-inject` div + injection script from dasha, kate, mimi, carina, hazel, yvonne, iza, su
- Synastry now lives only in Variable panel (IS_FRIEND_BUILD daily view), not duplicated in Arc tab
- `#synastry-reading-src` hidden div retained so pathfinder-core.js can still use the content

### Icon redesign
- `natal readings/icon.svg`: Rose-gold compass rose — rich plum gradient bg with rose/gold tonal washes (radial + linear gradient layers), bright outer ring with 24 tick marks, glow filters on compass points + rings, cardinal north tip extra bright (#fce870)
- `natal readings/apple-touch-icon.png`: Regenerated from new SVG
- `natal readings/og-preview.png`: 1200x630 branded link preview card (mini compass rose left + PATHFINDER wordmark right, same rose-gold palette)
- Jordan named rose gold as a Pathfinder brand direction

### Sky at Work icon
- `workplace readings/sky-at-work-icon.svg/png`: Distinct icon — night city skyline at dawn, crescent moon + stars above, golden sun arc rising, teal-lit office windows. Navy-teal background (contrasts with Pathfinder's plum)
- `workplace readings/manifest-sky-at-work.json`: Standalone Sky at Work PWA manifest

### PWA + social preview — all active builds
- Per-person `manifest-[name].json` files in `natal readings/` (correct start_url per chart)
- OG + Twitter card meta injected into all 10 charts + jordan.html + sky-at-work.html
- Shared `og-preview.png` as social image for natal charts

---

## 2026-06-13 — Session 17: Friend chart migrations — Mimi · Carina · Kate

**Theme:** Migrate three close friends from old scrolling HTML format to full 9-tab Pathfinder app

### Mimi — `natal readings/mimi.html`
- Full 9-tab Pathfinder build: Portrait → Signature → Constitution → Formative → Shadow → Arc → Archetype → Poem
- Chart wheel with exact CHART constant (pyswisseph, Jupiter retro corrected)
- Archetype: **"The Deep Channel"** — numeral II, two-pillar sigil (crimson fire right / midnight blue depth left, fire grand trine triangle above), crimson + midnight palette
- Big Three: ☉ 19°48' Aries H5 · ☽ 11°26' Leo H9 · ♏ 23°08' Rising
- 5 synastry contacts with Jordan in Arc panel (Saturn-Neptune 0.01°, Moon-Mars 0.68°, Pluto-Sun 1.60°, MC-Chiron 1.97°, ASC-Pluto 2.53°)
- Old 3095-line scrolling template archived to `_archive/mimi-scrolling-v3.html`

### Carina — `natal readings/carina.html`
- Full 9-tab Pathfinder build, complete voice canon
- Archetype: **"The Cartographer"** — numeral IX, compass rose sigil with Sag NNode as primary N needle, parchment gold + ink midnight blue palette
- Big Three: ☉ 20°04' Gemini H7 · ☽ 6°17' Pisces H3 · ♏ 26°52' Rising
- 6 synastry contacts with Jordan in Arc panel (Jupiter opp Moon 0.07°, Saturn trine ASC 0.95°, NNode conj Mars 1.13°, ASC conj Pluto 1.20°, Chiron sq Venus 0.92°, Saturn sq Sun 1.50°)
- Note: Mars-Chiron orb in old draft was wrong (0.44° was Mars sq Pluto); actual Mars conj Chiron orb = 3.2° — corrected in HTML

### Kate — `natal readings/kate.html`
- Full 9-tab Pathfinder build, complete voice canon
- Archetype: **"The Keeper of the Veil"** — numeral XVIII, rose/teal divided veil + crescent moon sigil, rose + deep teal palette
- Big Three: ☉ 13°00' Libra H12 · ☽ 1°20' Scorpio H1 · ♎ 18°37' Rising
- 8 synastry contacts with Jordan in Arc panel (Mars trine Sun 0.03°, Chiron trine Uranus/Neptune 0.26°, Moon conj Jupiter 0.67°, Chiron sext Venus 0.74°, Venus conj Venus 0.85°, Mars sq Jupiter 0.97°, Saturn opp Chiron 1.37°, NNode conj Venus 2.95°)

### Deployment
- Committed + pushed to GitHub — Vercel auto-deploy triggered
- URLs:
  - pathfinderastro.vercel.app/natal%20readings/mimi.html
  - pathfinderastro.vercel.app/natal%20readings/carina.html
  - pathfinderastro.vercel.app/natal%20readings/kate.html

---

## 2026-06-12 — Session 16 (continued): Rituals · Nav polish · PWA rebrand · Design system

**Theme:** Ritual cards, interface refinements, and the first Pathfinder component library

### New Moon in Gemini Rituals
- **Jordan — "The Threshold Crossing":** Gold ritual card added to Wheel panel. Natal anchors: ASC 29° Gem (new moon conjunct within 2°), S.Node H12 Gem, Sun opp Sag. Three practice steps (The Ledger · The Breath · The Fold). Closing question: "Where does the Gemini self take over to avoid the moment the Sagittarius self would have to commit?"
- **Marina — "The Speaking True":** Gold ritual card added to Wheel panel. Natal anchors: Venus 25° Gem H9 (new moon ~2° orb), Venus ✶ Chiron 0.05° exact, N.Node Sag H3. Three practice steps (The Knowing · The Claiming · The Offer). Closing question on saving for the right moment.

### Sky at Work — Dasha + Marina
- Home card (constellation SVG) added to both apps
- Full Wheel tab section (teal card, week table, rising-sign picker) added to both apps
- All 3 apps now fully parity on Sky at Work integration

### Nav Icons + Alignment
- All 3 apps: ◯/✧ → ⊙ (The Constant, natal symbol), ☽︎ (The Variable, crescent + VS15), ⊕ (The Wheel, Earth/wheel symbol)
- CSS: `.nav-icon` + `.nav-icon-t` get `width:22px;height:22px;display:flex;align-items:center;justify-content:center` — fixes baseline misalignment between SVG and text glyphs
- `.b3-sign` wrapping fix: `white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%` — Dasha "Pisces · noon chart" → "Pisces · noon", Marina "Libra · Jupiter 2°16' away" → "Libra · ♃ conj."

### PWA Rebrand
- `manifest.json`: name + short_name → "Pathfinder", description updated, background/theme → `#0a0614`
- `icon.svg`: full compass rose redraw — gold cardinal points at full opacity, rose diagonal points, brighter center ring, removed noisy constellation dots
- `apple-touch-icon.png`: regenerated at 512×512 via `qlmanage` Quick Look render

### Em Dash Pass
- `today.json`: 4 em dashes removed from prose + today bullets; colon/semicolon/new sentence substitutions
- `2026-06-12.md`: table notes cleaned of em dashes

### Design System Library
- `app/design-system.md` — Obsidian token reference (colors, typography, CSS vars, all UI components, chart elements, nav icons, zodiac glyphs with VS15)
- `natal readings/design-system.html` — browser preview page with live rendered examples of every component; linked to pathfinder-core.css

---

## 2026-06-12 — Session 16 (continued): Voice canon drafts — 6 charts

**Theme:** Plain text natal reading drafts for all friends with complete birth data

All 6 readings written simultaneously via parallel agents, following the 8-section Pathfinder format established by carina-reading.md:
Portrait → Chart Signature → Core Constitution → Formative Ground → Shadow & Mirror → The Arc → Archetype Card → Poem → Synastry with Jordan

| File | Archetype | Key Aspect |
|---|---|---|
| `charts/carina-reading.md` | The Cartographer | NNode sq MC 0.25° / Sag NNode 1st vs Gemini Sun 7th |
| `charts/kate-reading.md` | The Keeper of the Veil | Moon □ Mars 0.31° / Libra surface, Scorpio core |
| `charts/mimi-reading.md` | The Deep Channel | Fire Grand Trine Mercury/Mars/Jupiter 0.20–0.57° |
| `charts/hazel-reading.md` | The Signal Reader | Two 29° placements (Sun + ASC) / triple 1st house outer planets |
| `charts/iza-reading.md` | The Interior Architect | Sun sq Pluto 0.64° / Pisces 2nd weight vs Libra NNode 10th |
| `charts/su-reading.md` | The Interior Press | Jupiter sq Sun 0.83° / 12th house cluster (Moon/Jupiter/Saturn) hidden |

Also calculated and filed natal charts for:
- **Iza** (`charts/iza.md`): Sagittarius Rising, Pisces Sun, Aries Moon — Moshier ephemeris
- **Su** (`charts/su.md`): Taurus Rising, Gemini Sun, Aries Moon — Moshier ephemeris
- **Kristen Yim Bell** (`charts/kristen-bell.md`): Sagittarius Rising, Virgo Sun 10th, Libra Moon 10th — new person added to chart library

Chiron approximate for Iza and Su (seas_18.se1 ephemeris file not present) — flag for Time Passages verification before HTML builds.

---

## 2026-06-12 — Session 16 (continued): Archetype flip card redesign

**Theme:** Full archetype card visual system — flip mechanic + unique sigil art per person

### Archetype Card — New System

Replaced the old static tarot card (fixed-height box with compass SVG) with a full flip card system across all three charts (jordan, marina, dasha).

**Shared CSS (`pathfinder-core.css`):**
- `.tarot-card`: `perspective:1200px`, fixed `min(272px,78vw) × 462px`, `cursor:pointer`
- `.card-inner`: `transform-style:preserve-3d`, spring flip transition (`cubic-bezier(0.36,0.07,0.19,0.97)`)
- `.tarot-card.flipped .card-inner`: `rotateY(180deg)` — tap to reveal
- Both faces: `backface-visibility:hidden`, `border-radius:18px`, gold border + glow shadow
- Front layer stack: `card-bg` (dark) → `card-wc` (watercolor blobs, animated) → `card-grain` (fractalNoise SVG) → `card-vignette` → double tarot border → `card-numeral` → `card-sigil-wrap` → `card-label`
- Back layer stack: `card-back-bg` → `card-back-wc` → `card-back-grain` → double border → `card-back-content` (numeral + mini sigil + name + sub + rule + body + "tap to close")
- Animations: `wc-drift` (10s ease-in-out infinite alternate — scale + micro-rotate), `hint-pulse` (2.4s opacity + border-color breathe)
- Person-specific watercolor backgrounds added as `<style>` in each file

**Jordan — "The Cartographer at the Seam" (VII):**
- Watercolor: burnt amber, plum-crimson, cobalt, crimson-rose (Sag + Scorpio + Gemini palette)
- Sigil: map coordinate grid (5×6 lines inside arch), diagonal crimson seam cutting through territory, 8-point compass rose at seam × grid intersection

**Marina — "The Generous Light" (XIX):**
- Watercolor: warm amber, solar gold, dusty rose-mauve (Leo + Libra + Sag palette)
- Sigil: radiant sun disk with 8 primary rays (extending past arch posts) + 8 secondary rays; golden halo glow with inner bright core

**Dasha — "The Threshold Keeper" (XII):**
- Watercolor: deep violet, midnight blue, amber warmth (Sag + Pisces + Scorpio palette)
- Sigil: Gothic arch divided into violet (left) and amber (right) zones; luminous gold threshold line running full vertical height with feGaussianBlur glow; asymmetric post diamonds (violet left, amber right)

All three: shared Gothic arch framework (stone post columns, 3-layer tracery arch, crossbar with diamond, apex ornament with radiating spines, corner 4-point stars, Art Nouveau side flourishes). Mini sigil on back face.

---

## 2026-06-12 — Session 16: Workspace rename (the stars → Pathfinder) + Sky at Work June 15–21

**Theme:** Full workspace identity consolidation + Sky at Work weekly update

### Workspace Rename
- `the stars/` → `pathfinder/`, `the build/` → `app/` across all workspace files and memory
- Vault CLAUDE.md, pathfinder CLAUDE.md, build-digest.md, CLAUDE-BUILD.md, natal readings README, workplace readings README, READING-FORMAT.md, routine instructions — all updated
- Memory files updated: 14 files patched including astrology workspace, sops, dasha, Netlify references, cross-workspace protocol, build log protocol, alias resolution, sky at work architecture, astrology business plan (fully rewritten to reflect Pathfinder as final product name)
- CLAUDE.md opening rewritten: builder identity leads; astrologer-as-channel framing; not two equal roles

### Sky at Work — June 15–21
**Voice canon rewrite:** All copy across all 4 insight cards rewritten from scratch. No hedging language, no em dashes, no "it's not X it's Y" constructions, implication-first structure throughout. 12 sign notes rewritten for this specific week's sky.

**New content (June 15–21):**
- New Moon in Gemini (opened June 14) — fresh 28-day cycle
- Venus ingress Leo (exact June 13) — visibility as currency
- Uranus square North Node tightening (0.31° orb mid-week) — course correction signal
- Sun into Cancer / Summer Solstice (Friday June 20) — seasonal turn + timing hinge
- Mercury approaching Jupiter in Cancer (~6° applying) — expansive communication arc

**Structural improvements:**
- `week-thesis` line added (italic Cormorant below headline)
- "For You" tab renamed "Your Sign" in all nav (mobile + desktop)
- Placeholder "request" cards removed; replaced with clean go-deeper CTA
- Bigger headline (2.2rem mobile / 2.8rem desktop)
- Planet strip updated to June 15 estimates
- Signal board: 5 rows rewritten for current transits

**Visual system (session continued):**
- Collective wheel: 5 hardcoded transit-to-transit aspect lines at `R.zodIn` radius using ASP_STYLE colors (Uranus sq NNode rose dashed, Mercury sxt Mars cerulean, Venus cnj Jupiter gold, Venus tri Neptune teal, Uranus tri Pluto teal dim)
- 12 custom SVG path sign icons in the Your Sign tab — replaced iOS emoji glyphs with hand-drawn vector art
- Element arc rim: 12 arcs at radius 113 between zodiac outer edge and wheel boundary, fire/earth/air/water colored
- Atmospheric blooms: 4 blurred radial circles at cardinal positions inside center fill (blur filter in SVG defs)
- Sacred geometry: `geo-bg` SVG panels added to all three tabs — This Week gets nested octagons + cross-axis lines (cerulean, natal-chart opacity), The Sky gets two interlocked hexagons (Star of David) + three concentric rings centered on the collective wheel, Your Sign gets minimal concentric rings + 3 spokes
- Request a Reading modal: bottom sheet slides up on button tap, drag handle, cerulean top accent line, 3-item birth data checklist (date / time + note / city), "DM Jordan on Slack" CTA. Backdrop or ✕ closes. Placeholder until Supabase intake is built.

---

## 2026-06-12 — Session 15: Transit UI polish + Natal chart restructure + Voice canon copy rewrite

**Theme:** Transit UI refinements, 9-tab natal restructure, full voice canon copy rewrite across all three charts

### Transit UI (pathfinder-core.js / pathfinder-core.css)
Seven items from `transit-ui-design-scope-2026-06-12.md`:
1. Transit detail prose → Cormorant Garamond 1.0rem, weight 300
2. Summary pull-quote reordered above keywords in transit detail panel
3. "Pull the thread" fold added to transit detail (`td-prose-fold`, amber variant)
4. Season pills → amber accent class (`d-t-pill-season`)
5. Section label opacity bump + border separator between pill tiers
6. Biwheel label font size bump on selection (`bw-has-sel`)
7. Applying row left-border accent (cerulean 38%)

### Natal chart restructure (jordan.html, marina.html, dasha.html)
All three charts restructured from 4 sub-tabs (Identity/Depth/Roots/Soul) → 9 tabs: Chart | Portrait | Signature | Constitution | Formative | Shadow | Arc | Archetype | Poem. Architecture preserved: sec-card/dive-wrap components throughout, subnav scroll on mobile.

### Voice canon copy rewrite
Full copy rewrite across all three charts:
- **Voice**: name throughout (Jordan/Marina/Dasha, never "you"), plain-language-first, em dash near-zero
- **Arc**: rebuilt as two sec-cards (South Node/past mastery + North Node/direction) in all three charts
- **Poems**: tightened to 10 lines, present tense, open question closing
- **Archetype names**: Jordan = "The Cartographer at the Seam" (kept), Marina = "The Generous Light" (kept), Dasha = renamed to "The Threshold Keeper"
- **Marina Shadow**: full rebuild — Aries DSC projection + Gemini SN pattern (was wrong material previously)
- **Dasha synastry section**: preserved exactly

### Build planning items flagged
- Archetype flip card redesign: front (name + compass visual) / back (body description) — HTML comment in all three archetype sections
- Any placements identified during copy work that could support additional dive cards: noted inline

---

## SESSION 16 PLAN — June 12 afternoon

1. **Archetype flip card design** — all three charts have `<!-- BUILD: flip card redesign pending -->` comments. Front: archetype name + compass SVG. Back: body description. CSS `rotateY` flip on tap. Apply to jordan/marina/dasha.html and push.

2. **Voice canon copy drafts for all remaining charts** — no more standalone scrolling chart builds. All future natal builds are Pathfinder app format only. Write voice canon copy as `.md` draft files for all 8 charts not yet in Pathfinder format: **carina, mimi, hazel, iza, kate, su, yvonne** (have old scrolling HTMLs) + **cat** (birth data only). Name-throughout, plain-language-first, 9-section structure (Portrait/Signature/Constitution/Formative/Shadow/Arc/Archetype/Poem). Files go in `charts/` alongside birth data. Ready to drop into app builds when Jordan decides to build each chart.

3. **Reddit astrology vocabulary research** — structured pass to expand voice-canon.md Vocabulary Library. Target: r/astrology, r/AskAstrologers, r/astrologyreadings. One planet or aspect type per session. Route findings to voice-canon.md + relevant transit library files.

4. **Sky at Work — scope + plan the rewrite/restructure** — read the current `sky-at-work.html` and `CLAUDE-WORKPLACE-HTML.md`, identify what needs to change to bring it up to the current Pathfinder design standard and voice canon, and produce a scoped design document for the full rewrite. What's the right architecture, what sections need rebuilding, what copy needs voice canon treatment. Output: a `the build/sky-at-work-rewrite-scope.md` ready to execute in a future session.

5. **Routine live update** — Jordan to paste updated ROUTINE-UPDATE-INSTRUCTIONS.md into the live routine at claude.ai/code/routines (em dash ban + June 12 additions).

---

## 2026-06-12 (session 15, cont.) — Em dash pass + routine update

**Em dash pass: transit library + daily readings June 5–12**
- Transit library: zero em dashes across all 17 files (section headers, frontmatter, INDEX table cells all cleaned)
- Daily readings June 5–12: full pass (agent running at session close); prose, table status cells, and today blocks all cleaned; Moon placeholder `| — |` rows preserved as structural
- Routine prompt: explicit EM DASH RULE added to BANNED CONSTRUCTIONS section in ROUTINE-UPDATE-INSTRUCTIONS.md — zero em dashes in prose, table cells, or today blocks; Moon placeholder row is the only permitted exception

**Inbox processed:**
- Reddit astrology vocabulary research idea → filed to app-vision.md as "Research Sessions — Astrology Vocabulary Expansion" with session structure; inbox cleared

---

## 2026-06-11 — Session 14 Overview

**Theme:** Synastry infrastructure + friend build polish

The big move this session was building the synastry module as the Variable tab for friend builds. Jordan's natal is now baked into the core as `JORDAN_CHART` — a static constant that every future friend build can draw against. The biwheel renders immediately (friend chart inner, Jordan outer, aspect lines by orb weight), and a `calcSynastryAspects()` engine dynamically computes the contacts so nothing is hardcoded. Synastry reading copy was written for both Marina and Dasha: four sections each, voice-canon compliant, personal and specific.

The session also resolved three bugs caught in post-deploy testing. The pre-fetch IIFE was overwriting the "Synastry with Jordan" home card title with today's reading title — fixed by adding an IS_FRIEND_BUILD early-return. The lunar phase then disappeared (same IIFE was blocked entirely) — fixed by letting friend builds fetch today.json but calling `updateHomeFromDaily(d, true)` to skip the title/transit overwrite. Finally, ♑ ⚷ ♐ in the natal subnav were rendering as iOS color emoji — fixed with `font-variant-emoji:text` on `.sn-icon`.

Two parallel audit agents ran at end of session: design (CSS polish on synastry panel — padding, orb column anchoring, trailing borders) and copy (em dash sweep + floating noun openers across both friend HTMLs).

**What's now live at pathfinderastro.vercel.app:**
- Marina: full synastry biwheel + contacts list + 4-section reading copy
- Dasha: same — plus subtitle updated to "Sun at the world's edge"
- Both: lunar phase loads correctly from today.json; subnav icons render as glyphs

**Architecture note for Phase 2:** IS_FRIEND_BUILD is the foundation. When friend transit data is built, the flag will route to a friend-specific today.json path rather than short-circuiting to synastry. JORDAN_CHART stays as the permanent synastry anchor across all friend builds.

---

## 2026-06-11 (session 14, cont.) — Lunar Phase Fix

**Bug:** Lunar phase not loading on friend builds (Marina, Dasha).

**Root cause:** Pre-fetch IIFE returned early on IS_FRIEND_BUILD to prevent daily title overwrite — but that also blocked the `today.json` fetch that populates `#home-moon`.

**Fix:**
- Added `omitTitle=false` parameter to `updateHomeFromDaily()`
- Friend builds now fetch `today.json`, set `dailyData`, and call `updateHomeFromDaily(d, true)` — moon phase populates, title/transit fields untouched
- Jordan's build unchanged

---

## 2026-06-11 (session 14) — Synastry Variable Tab · Reading Copy · Audit Pass

**Audit pass (two parallel agents — design + copy):**

*Design fixes (pathfinder-core.css):*
- Removed double lateral padding from `.synastry-contacts` and `.syn-reading` — `reading-inner` already provides 18px gutters
- `.syn-orb`: added `flex-shrink:0; text-align:right; min-width:32px` so orb column holds its position
- `.syn-row:last-child { border-bottom:none }` — removed orphan trailing border
- `.syn-reading-section:last-child { margin-bottom:0 }` — removed dead space before bottom spacer

*Copy fixes (marina.html + dasha.html):*
- Marina: floating noun opener rewritten in Identity dive; "soul path" replaced twice; Venus-Chiron tagline em dash → colon; two em dashes in Roots body → colons
- Dasha: double-em-dash parenthetical → actual parentheses; one em dash split into two declarative sentences; two additive-aside em dashes → commas; Scorpio Moon floating noun opener rewritten
- All synastry copy confirmed clean (no em dashes, no flagged patterns)
- Two remaining `&mdash;` in Dasha's prose kept — both genuine contrast pivots per voice canon

---

## 2026-06-11 (session 14) — Synastry Variable Tab (Marina + Dasha)

**Synastry module — prototype:**
- `JORDAN_CHART` constant added to `pathfinder-core.js` (Jordan's natal, static, drives all future friend builds)
- `calcSynastryAspects(jPlanets, fPlanets)` — dynamic aspect engine, 6 types (conjunction, opposition, trine, square, sextile, inconjunct), orbs 3–8° by type
- `renderSynastryBiwheel(svgId)` — biwheel SVG: friend chart inner ring (gold tones), Jordan outer ring (violet/purple), aspect lines scaled by orb tightness (tight = visible, wide = ambient 0.22)
- `renderSynastryPanel()` — populates `#daily-body` with biwheel + "Contacts by orb" list (top 12, glyph/symbol/glyph/type/orb columns)
- `loadDaily()` branches on `IS_FRIEND_BUILD` flag — Jordan's own app unchanged
- Marina and Dasha scripts: added `const IS_FRIEND_BUILD=true; const PERSON_NAME='...'`
- Home Variable card updated: removed opacity:0.55, title = "Synastry with Jordan", desc = "natal charts · exact contacts"
- Pathfinder-core.css: `.synastry-contacts`, `.syn-row`, `.syn-glyph`, `.syn-sym`, `.syn-label`, `.syn-orb` styles added
- Deployed + CDN refresh; both builds live at `pathfinderastro.vercel.app/natal%20readings/marina.html` and `.../dasha.html`

**Architecture note:** this module is the prototype for the full synastry feature (Phase 2). When friend transit infrastructure is built, `IS_FRIEND_BUILD` will expand to include a friend-specific `today.json` path rather than short-circuiting to synastry.

---

## 2026-06-11 (session 13) — Shared Layer Migration · First Friend Builds (Marina + Dasha)

**Shared layer extraction:**
- Extracted all CSS from `jordan.html` into `pathfinder-core.css` (~660 lines, all design tokens, accent system, component styles)
- Extracted all JS from `jordan.html` into `pathfinder-core.js` (~700 lines, all rendering logic, IIFE functions, biwheel, daily fetch, scroll observer)
- `jordan.html` personal layer now: CHART constant + natal reading HTML only
- `dailyData` TDZ fix: moved `let dailyData=null;` to top of `pathfinder-core.js`
- Friend build pattern established: `[name].html` = head + personal HTML + `<script>const T; const CHART;</script>` + `<script src="/pathfinder-core.js"></script>`
- Any CSS or JS change now propagates to all builds automatically

**Marina LaRusso build (`natal readings/marina.html`):**
- Placidus cusps via pyswisseph (Jul 28 1993, 11:03 AM CDT, Winfield IL) — ASC Libra 7°01', MC Cancer 8°12' confirmed
- 13 planets + 6 aspects; Venus sextile Chiron 0.05° is the chart's most exact aspect
- Reading: Identity (Leo Sun H10, Jupiter conjunct ASC 2.26°, Sag Moon + NNode H3), Depth (Capricorn H4 Uranus/Neptune Rx, Pluto H2), Roots (Venus-Chiron exact, Mercury opposite outer planets), Soul
- Archetype: The Generous Light · Leo · Libra · Sagittarius

**Dasha Shareiko build (`natal readings/dasha.html`):**
- Placidus cusps via pyswisseph (Dec 20 2000, noon ECT, Quito Ecuador) — ASC Pisces 25°44', MC Sag 26°24'; noon chart caveat in Big Three
- Sun at 29° Sag confirmed H10 (2.72° from MC), correcting source data "9th house" entry
- 13 planets + 6 aspects; Sun conj Mercury + Moon sq Neptune as key aspects
- Reading: Identity (Sag stellium near MC, Pisces ASC, Scorpio Moon H8), Depth (Aquarius stellium H11, Mars Libra H7 28°), Roots (NNode Cancer H4, Saturn Taurus H2 Rx, Moon-Neptune sq), Soul
- Archetype: The Keeper of Deep Waters · Sagittarius · Scorpio · Aquarius

**Both friend builds:**
- Variable tab greyed (opacity 0.55); daily panel shows "personalized readings coming"; biwheel renders live against today's sky
- Deployed via git push → Vercel autodeploy

---

## 2026-06-11 (session 12) — Design Audit · Polish Pass · Product Principle Locked

**Design audit (Playwright, full pass):**
- Full iPhone viewport audit across all 5 panels — 17 issues identified and resolved
- Nav tabs: `flex:1` so The Constant / The Variable stay on one line on mobile
- Home sky strip: brighter gold tint, 0.58rem
- Home greeting sub: 0.62rem, gold tint
- Banner: removed birth meta from persistent chrome — moved to The Constant card
- Biwheel: moved after pull quote in The Variable (reading first, visual anchor second)
- Transit Library eyebrow: ISO date → "June 11" human-readable format
- Wheel tab: Rituals placeholder coming-soon card removed
- Daily moon glyph: Unicode ☽ → inline SVG (fixes ")" rendering on iPhone)

**Polish pass (from research synthesis):**
- Pill tap transitions: added `transform/opacity` to transition list (eased scale, was snapping)
- Daily prose: 0.88rem → 1.0rem (16px, mobile readability minimum)
- Skeleton screen: shimmer loading placeholders on The Variable first load — date, title, block, prose lines, pills — teal-tinted, animated, replaced by reading on fetch resolve

**Product principle locked:**
- "Every data element is a door" — Time Passages structural depth + Co-Star/The Pattern visual language
- Documented in product-decisions.md as resolved decision with build implications
- Current gap: The Constant has no tappable planets yet — that's the next structural priority

---

## 2026-06-11 (session 11) — Vercel Migration · Pathfinder Name · Reading Format Redesign · App Architecture

**Infrastructure:**
- Diagnosed Netlify build credit exhaustion — migrated entirely to Vercel
- Created `vercel.json` with cache headers (no-cache HTML/JSON, immutable images)
- Updated all 49 URL references across workspace from `astrologyos.netlify.app` → `pathfinderastro.vercel.app`
- Added `.claude/` to `.gitignore` — prevents Claude Code internals from committing
- Added `vercel/vercel-plugin` via npx — 28 skills, MCP integration
- Deleted Netlify account

**App name: Pathfinder — decided**
- Named after ST:Voyager "Pathfinder" (S6) — Reg Barclay's basement signal to Voyager
- Jordan/Barclay parallel: passion for connection as the mechanism that brings people home
- Internal section names locked: The Constant (natal, Lost S4) · The Variable (transits, Lost S4/5)
- Updated: CLAUDE.md, app-vision.md, product-decisions.md, live-links.md, sky-at-work.html, all architecture files

**Reading format redesign — voice interview session:**
- Conducted structured voice interview with Jordan: philosophy, prose moves, voice register, negative spec
- Core product thesis: recognition not validation. "Acceptable" not "accepted." Give readers the framework to recognize themselves, not just a description.
- Voice reference locked: Sally Rooney — stripped back, precision not decoration, beauty through exactness
- Three-layer architecture confirmed: Surface (plain, felt sense) · Middle (psychological depth) · Technical (full mechanics, always present, never hidden)
- Competitive gap confirmed by research agent: CHANI = warm/no ladder, Time Passages = technical/no onramp, Pathfinder = both layers present simultaneously
- Mission statement candidate: "Pathfinder gives you the framework to recognize yourself — not just a description of your chart."
- Big Three Portrait specimen drafted + approved (Sag Sun/Aries Moon/29° Gem Rising)
- Canonical prose specimen logged from Jordan's journal (the "locate Jordan" / "first serious bid" lines)
- Negative spec logged: floating nouns, paradox structures, performed profundity

**Reading system migration:**
- Jordan is now her own first beta user — personal reading system = Pathfinder format
- Old hyper-personalized system (life-context weaving, KNOWLEDGE.md required load) archived
- READING-FORMAT.md restructured: Pathfinder three-layer format is primary SOP
- CLAUDE.md session start protocol simplified: KNOWLEDGE.md demoted to optional reference
- Life Context Filter archived (no longer default behavior)

**App architecture locked — four tabs:**
- Home (✦) · The Constant (◯) · The Variable (☽) · The Wheel (✧)
- The Wheel: triple resonance — zodiac wheel · Wheel of the Year · Lost's Frozen Donkey Wheel
- The Variable: Daily + Transits collapsed into one tab, two levels deep max
- The Wheel: lunar rituals · wheel of year · collective transit-to-transit sky reading
- Synastry: confirmed on roadmap, Phase 2+
- app-architecture-v2.md updated with full section map

**Files committed and pushed:** CLAUDE.md · READING-FORMAT.md · voice-canon.md · app-vision.md · product-decisions.md · app-architecture-v2.md · vercel.json · live-links.md · .gitignore

**Pending (manual):** Update routine prompt at `claude.ai/code/routines → trig_01Rtm1xSST2GbdCZh896F2vP` to write in Pathfinder three-layer format.

---

## 2026-06-10 (session 10g) — Sky at Work: Visual Polish + Full Audit

**Visual polish pass:**
- Insight cards: 2px top accent gradient line per card color via `::before` — premium, intentional, not just left-bordered
- Teal card: removed `opacity:0.85` hack, replaced with `var(--surface-2)` + dimmed border — properly contextual rather than broken-looking
- `ic-mechanism` opacity 0.48 → 0.65 — reveals are now actually readable
- Desktop 2×2 insight card grid (was single column of 4) — cuts scroll depth, uses 800px canvas properly
- `readings-headline` + `sky-headline` scaled up to 1.80rem (were 1.55rem) — consistent hierarchy weight across all three tabs
- `week-headline` letter-spacing zeroed at 2.5rem display size

**Playwright audit (accessibility snapshots):**
- Uranus signal row was showing ♇ (Pluto's glyph) — fixed to ♅
- `ic-mechanism` max-height 100px → 150px — mech1 was hitting the exact limit, would have clipped future content
- Removed `font-style:normal` override on desktop `readings-headline` (inconsistent with `sky-headline`)
- All interactive states verified: mechanism expand/collapse, sign chip + localStorage, signal row expand, panel switching sync on both navs, biwheel SVG rendering, desktop responsive breakpoint

**Copy + structure audit:**
- Cut: week progress bar (HTML + JS + CSS), "This week in plain language" sub, "tap to expand" planet strip hint
- Card 3 body rewritten — was restating the headline; now leads with the specific action
- Card 4 headline: em dash → period ("Plans may shift. Lean in.")
- mech4: "collective direction node" → "the North Node — the point of collective momentum" (non-astrologers can parse it)
- Sky eyebrow: "Astrological Mechanisms" → "What's Driving the Week"
- Uranus sig-note: "plans can pivot" → "active all week" (plain-language insight lives on This Week, not The Sky)
- Venus-Jupiter detail: "peak window this month" added for specificity
- For You intro: "select below" → "pick your sign"
- Go Deeper body: two-sentence pitch compressed to one clean line
- Taurus + Libra sign notes tightened

**Stale file cleanup:** `slack-draft.md`, `og-sky-at-work.jpg`, `README.md` (old Slack-text format guide) removed from `workplace readings/`

---

## 2026-06-10 (session 10e–f) — Sky at Work: Tab Restructure + Responsive Desktop

**For You tab:** Sign picker moved off This Week onto its own tab. Three-act structure now clean — collective (This Week) → mechanism (The Sky) → personal (For You). Active Dasha/Yvonne reading links removed from the app entirely. Privacy architecture: natal charts will link OUT to Sky at Work, not the reverse. Faded request cards remain as the reading invitation.

**Responsive desktop layout:** Slack-shared link → desktop browser is the primary use case. Added sticky top header (hidden on mobile) with brand left + tab links right, underline active indicator. Bottom nav hidden at ≥680px. Content opens to 800px max-width. Week headline scales up. Sign chips go 6-column. `switchPanel` now syncs all `[data-target]` buttons simultaneously so both navs stay in sync on resize.

---

## 2026-06-10 (session 10d) — Sky at Work: Plain Language Inversion

**Philosophy shift: built from the technical, not shown as the technical.**

The content hierarchy was inverted to serve a corporate audience with no astrology background. The astrological mechanisms are still fully present — they now live one tap deeper, not on the surface.

**This Week tab:**
- Week headline leads: "Warmth opens. Words need care." — no symbols, no jargon
- 4 insight cards (Connections open / Write before you send / A week to finish not start / Plans may shift — lean in) — plain-English headline + practical body + hidden "What's driving this?" disclosure revealing the transit mechanism
- Sun sign picker replaces rising sign picker — everyone knows their sun sign; rising is an upsell after trust is established
- Sign notes written entirely in plain language (no astrological vocabulary)
- Biwheel removed from entry tab (now lives on The Sky for the curious)

**The Sky tab:**
- Explicit bridge text at top: "These are the planetary alignments behind this week's themes — the insights are translated on the This Week tab"
- Full signal board + biwheel + planet strip stays intact for astrology-fluent users

**Tab labels:** This Week / The Sky / Readings

**Why this matters for the product:** Establishes the pattern for how Astrology OS will eventually onboard non-astrologers — spiritual and energetic truth in precise, practical language, with the technical layer available for those who want it.

---

## 2026-06-10 (session 10c) — Sky at Work UX Restructure

---

## 2026-06-10 (session 10b) — Sky at Work Full App Rebuild

**sky-at-work.html rebuilt as proper mobile app** — matching jordan.html's architecture exactly.

**App shell:** `100dvh` fixed height, 3 panels with opacity crossfade, fixed bottom nav (Home ✦ / Sky ☽ / Readings ◯), `safe-area-inset-bottom` padding, cerulean as primary accent.

**Home tab:** Collective sky biwheel (zodiac ring + transiting planets from `today.json`, ASC=0 natural zodiac, no natal ring), trio signal cards (Venus☌Jupiter gold, Mercury□Saturn rose, Last Quarter cerulean), rising sign picker with `localStorage` persistence + "Don't know yours? → natal reading from Jordan" link.

**Sky tab:** Full signal board (5 rows, click to expand — Uranus□NNode, Venus☌Jupiter, Mercury□Saturn, Saturn∥Neptune, Last Quarter), pulse paragraph, 3 deep dives with read-more expand, IBM Plex Mono monospace, planet strip with tap-to-expand tooltips (12 bodies).

**Readings tab:** Intro text + natal card grid — Dasha + Yvonne active with links to their chart HTMLs, 3 faded dashed "request" placeholders (visual only, pointer-events:none).

Architecture: every page in the same Netlify deploy, interconnected via root-relative paths. This is the foundation the final product will build on.

---

## 2026-06-10 (session 10) — Sky at Work Connected + Daily Biwheel

**Biwheel on Daily tab:** Same SVG renderer, rendered non-interactive (`renderBiwheel(svgId, false)`) so the visual sits above the prose without introducing a second selection state.

**Sky at Work connected to the app ecosystem:**
- Rising sign picker now has "Don't know yours? A natal chart reading from Jordan will tell you →" — links to jordan.html, converts curiosity into reading requests
- Natal Chart Readings section added before footer: active cards for Dasha + Yvonne (link directly to their chart HTMLs), 3 faded "request" placeholders (visual only for now — conversion funnel for Phase 2 cohort)
- Home panel workplace card unlocked — was disabled/Soon, now opens `sky-at-work.html` in new tab
- Footer links updated to Netlify URLs

Architecture note: all three pages (jordan.html, sky-at-work.html, dasha.html, yvonne.html) are now interconnected within the same Netlify deploy. Foundation for the final product's unified app.

---

## 2026-06-10 (session 9b) — Bug Fixes (3)

1. **SVG hit circles not receiving taps:** `fill:transparent` circles need `pointer-events:all` — SVG default `visiblePainted` ignores transparent fills. Added attribute.
2. **PWA "page not found" + today.json 404:** Manual deploys had been running from `natal readings/` instead of the `the stars/` root, stripping `today.json` and `transits.json` from the site. Fixed deploy path — all future deploys must run from repo root (same as the 4am routine).
3. **Transit rows not opening detail view:** `fmtNP()` was a closure inside `renderTransitTabContent()` but `openTransitDetail()` called it from outside that scope — `ReferenceError`. Hoisted `fmtNP` to top level.

---

## 2026-06-10 (session 9) — Biwheel Interactivity (Session 2 of 2)

**The headline:** Tap any transiting planet glyph on the biwheel → aspect lines for that planet come alive, all others dim, a gold selection ring appears, and a detail panel slides in below the chart showing the planet's degree + every active aspect. Tap again (or the label) to dismiss. Biwheel is now fully interactive.

### What Changed

**`window.bwState`:** Module-level state object (`{selected, lines, planets, selRing}`) initialized on every `renderBiwheel()` call. Stores refs to all aspect line elements and planet positions for direct DOM manipulation (no re-render on selection).

**All aspect lines now drawn at ambient opacity (0.14)** — all mappable `active_transits` rendered, not just top 6. On tap: matching lines jump to full color opacity + 1.2px stroke. All others drop to 0.05. Gives the chart a "latent geometry → activated" feel.

**Invisible hit circles (r=10)** behind each transiting planet glyph — reliable ~21px touch targets on mobile. `onclick` with `stopPropagation` so the SVG background tap-to-dismiss doesn't fire.

**Gold selection ring** (`stroke: rgba(208,168,64,0.60)`) moves to the tapped planet's spread position. Initially transparent, appears on selection.

**Detail panel (`#bw-detail`):** Slides open below the biwheel (max-height transition). Shows planet glyph + name + formatted degree + Rx badge if retrograde. Each aspect row: aspect symbol (color-coded by type) + "natal X (HN)" + "0.00° · app/sep".

**Label updates:** "natal · live sky" → "tap to dismiss" (gold, cursor:pointer) when planet is selected. Clicking the label also clears selection.

**`pointer-events:none`** on all non-interactive SVG groups (background, zodiac, natal fill, aspect lines, natal planets, axis, center) so taps propagate cleanly to hit circles or the SVG background.

**Deployed:** commit `90c1d75` → Netlify production `6a29b6a6`.

**Next session:** TBD — chart is feature-complete at this milestone. Candidates: natal planet tap (show interpretation snippet), biwheel for friends' charts, print/share button.

---

## 2026-06-10 (session 8) — Biwheel SVG Renderer (Session 1 of 2)

**The headline:** The biwheel placeholder in the Transits panel is replaced with a live SVG renderer. Natal chart inner ring + transiting sky outer ring + aspect lines. Renders from `today.json` `transiting_positions` data that has been live since session 6.

### What Changed

**`renderBiwheel()` function added (~150 lines JS):**
- Clears and re-renders `#t-biwheel-svg` on every call
- Background: dark `#09102a` fill with subtle amber/blue ellipse glows
- Zodiac ring (r=88–108): 12 sign sectors with element fill colors + accent arc strokes + sign glyphs at r=98
- Degree ticks at the 12 sign boundaries between outer circle and zodiac
- Natal inner fill + separator ring at r=82
- Aspect lines (top 6 by tightest orb): drawn at r=78 between transiting and natal planet positions. Colors: teal=trine, cerulean=sextile, rose=square/opposition, amber=sesquiquadrate, muted=quincunx. Parsed from `active_transits` label strings
- Natal planets (inner ring, r=73): tick dots on separator + glyphs spread via existing `spread()` function. Element color coding (luminary/personal/social/outer/point)
- Transiting planets (outer ring, r=116): tick dots just outside zodiac + glyphs spread. Retrograde planets in ice-blue with small ℞ subscript
- ASC/DSC/MC/IC axis: tick lines + 4.2px uppercase labels in natal zone
- Center: three concentric circles with gold accent dot

**Hookup:** `renderBiwheel()` called in pre-fetch IIFE (page load) and `loadDaily()` fallback. Renders as soon as `dailyData` is available, before user taps Transits.

**CSS:** `.t-biwheel-wrap` max-width increased from 160px → 280px. Renders at full 280px on mobile.

**Label:** "biwheel · coming soon" → "natal · live sky"

**Deployed:** commit `29de726` → Netlify production `6a29b2a4`.

**Next session:** Session 2 — interactivity. Tap a transiting planet → highlight its aspect lines + show aspect detail tooltip. Possible: tap a natal planet → show natal interpretation snippet.

---

## 2026-06-10 (session 7) — Full Visual Audit + Polish Pass

**The headline:** Playwright screenshot audit across every panel and state, desktop and mobile. Three issues found and fixed: sticky tab nav, biwheel placeholder oversized, "LotOfFortune" label spacing.

### What Changed

**Sticky transit tabs:** `.t-tabs` now has `position:sticky;top:0` within the `#t-list` scroll container — NOW/RETURNING/ARCHIVE always visible when scrolling through the transit list.

**Biwheel placeholder resized:** `max-width` reduced from 260px → 160px. Was eating ~40% of the panel viewport; now a subtle decorative element.

**"Lot Of Fortune" label fix:** Added `fmtNP()` helper that splits camelCase natal point names (`LotOfFortune` → `Lot Of Fortune`). Applied to all four render sites: current row, returning row, detail title, aria-label.

**Audit findings (all panels passing):** Home live data correct · Daily two-tier pills (slow + mini) rendering cleanly · Daily TODAY tags (WORK/CREATIVE/BODY) visible · Transits Now/Returning/Archive tabs functional · Archive empty state correct · Mobile home 2-column grid perfect · Mobile Daily single-column clean.

**Daily pills redesign (same session):** Daily tab was showing 18+ slow-planet pills stacked one-per-row — unusable on mobile. Redesigned: top 5 by tightest orb shown, rest collapsed behind "+N more · See all in Transits →" ghost pill that navigates directly to the Transits panel. Philosophy: Daily is a reading, Transits is where the full list lives.

**Deployed:** → Netlify production via API restore (deploy `6a2998d4515f00d4c5623231`, `6a299a9ab7cbf6d7bdc8787f`).

**Next session:** Build the actual biwheel SVG renderer in JS — natal positions hardcoded in JS (static) + live `transiting_positions` from today.json outer ring (dynamic). Two sessions estimated. Outer ring = 12 transiting planets at live degrees. Inner ring = natal chart. Aspect lines between rings for active transits.

---

## 2026-06-10 (session 6) — Biwheel Data Layer + Tab Nav Infrastructure

**The headline:** Transits panel restructured from a flat list to a three-tab layout (Now / Returning / Archive) with a biwheel placeholder at the top. All 12 transiting planet positions now written to `today.json` nightly — the data layer the biwheel renderer needs is live.

### What Changed

**Three-tab nav:** Now (applying + separating) · Returning (between passes) · Archive (complete). `switchTransitTab()` re-renders list body on click. Empty state message for tabs with no entries. `renderTransitList()` slimmed down; all rendering logic moved to `renderTransitTabContent()`.

**Biwheel placeholder:** Orbital ring SVG at the top of the Transits panel — three concentric rings + axis lines + "CHART / biwheel · coming soon" label. Holds the space for the real renderer.

**`transiting_positions` in today.json:** All 12 bodies (Sun through NNode) with absolute degree (0–360), sign, formatted string, retrograde flag. Routine patched to write this field every night. today.json manually seeded with June 10 positions for immediate testing.

**Next session:** Build the actual biwheel SVG renderer in JS using the natal chart hardcoded positions + live `transiting_positions` from today.json.

**Deployed:** commit `e549a17` → Netlify production via API restore.

---

## 2026-06-10 (session 5) — Transit Library Complete + Four-Section UI

**The headline:** All transit library stubs replaced with full breakdowns. Transits panel redesigned with four labeled sections replacing the flat list. Infrastructure is now deeper and scales cleanly as transits move through their lifecycle.

### What Changed

**Transits panel — four-section UI:** Applying · Separating · Between Passes · Complete. Each section has a label + count pill header. JS-driven: sections only appear if they have entries. Removed the old separate `t-historical-section` HTML div — everything now flows through a single `t-list-body` container. Section headers use `.t-sec` / `.t-sec-label` / `.t-sec-count` CSS.

**Transit library — 3 stubs → full breakdowns:**
- `neptune-sesquiquadrate-venus.md`: Neptune at 4° Aries □/ natal Venus 19° Scorpio 5th. First pass complete May 15. Eleanor arc documented as the real-time correlation. Retrograde 2nd pass possible November 2026.
- `neptune-trine-northnode.md`: Neptune △ natal NNode 3° Sag 6th. Separating. Business pivot (Etsy → full product) and #astroflow-weekly launch documented as transit-timed activations. The inspired work IS the on-path work.
- `nnode-square-sun.md`: Transiting NNode 2.89° Pisces □ natal Sun 1.82° Sag 6th (and simultaneously □ natal NNode). Exact June 15–17. Full context of the June 11–17 transit stack (NNode△Jupiter, Uranus⚻Jupiter, NNode□Sun).

**passes patched:** All three transits updated in transits.json.

**All 13 transit library files now fully written.** No stubs remain.

**Deployed:** commit `bbae97b` → Netlify production via API restore.

---

## 2026-06-10 (session 4) — Home Panel: Live Data Wiring

**The headline:** Home panel now populates with real live data on every load. Moon phase is pulled from today.json instead of a math approximation. Daily card shows today's reading title + key transit preview. Transits card shows active transit count once transits load.

### What Changed

**Sky strip moon:** Replaced 29.53-day cycle approximation with a fetch from today.json. `home-moon` now shows `moon_phase · moon_sign` exactly as written by the 4am routine.

**Daily card live state:** Added `id="home-daily-title"` — shows today's reading title the moment today.json loads, replaces static "Today's reading." Added `.hc-preview` pill (`id="home-daily-transit"`) that surfaces `key_transit` text in cerulean uppercase below the title. Hidden when key_transit is absent.

**Transits card count:** `id="home-transit-count"` updates to "N active" when the Transits tab loads (or when user visits the Transits panel). Falls back gracefully to "Current sky" if transits haven't loaded yet.

**Pre-fetch on startup:** Added an async IIFE at page load that fetches today.json immediately and calls `updateHomeFromDaily(d)`. Home panel is populated before the user ever taps Daily. `loadDaily()` updated to call `renderDaily()` instead of returning early when `dailyData` is already set.

**Deployed:** commit `2c040b8` → Netlify production via API restore.

---

## 2026-06-10 (session 3) — Transit Library Expansion + Historical Archive

**The headline:** Four full transit library breakdowns written (replacing stubs), historical archive feature built end-to-end, Saturn conjunct Moon installed as the first historical entry.

### What Changed

**Transit library — 4 stubs → full breakdowns:** `nnode-trine-jupiter.md` (exact June 11–12, the soul path confirmation window), `uranus-inconjunct-jupiter.md` (exact June 14, creative work form pivot, 2 passes), `uranus-opposition-northnode.md` (exact June 20–22, nodal axis rewire, 3 passes through April 2027), `saturn-inconjunct-mercury.md` (just past exact, the direct-version adjustment, 3 passes). Each file: opening line + full "What This Is" + "The Arc" with bolded exact dates + "In Real Time" table + "Working With It" section + "Current Status."

**transits.json patches:** passes fields manually updated for 5 transits (NNode△Jupiter, Uranus⚻Jupiter, Uranus☍NNode, Uranus☌SNode, Saturn⚻Mercury) so they appear immediately in the app without waiting for 4am routine.

**Historical archive — UI built:** Historical rows now show a status badge ("between passes" amber pill / "complete" muted pill), active date range, next pass date, and correctly de-emphasized glyph + name. The detail view header adapts to historical status — "between passes" entries show a badge + next pass date instead of the orb pill. Status is determined by `t.status` field on each historical entry.

**Saturn conjunct Moon installed:** First historical entry. Status: `between_passes`. Active dates: March–April 2026 (first pass complete April 12). Next pass: ~October 2026. Full reading, keywords, 3-pass timeline. The Tony situation, Associate Director title, and first-pass grey sky all documented.

**Deployed:** commit `8c54b97` → Netlify production via API restore.

---

## 2026-06-10 (session 2) — Visual Polish: Daily + Transits Panels

**The headline:** Daily panel refined, transit pills now link directly to transit detail views, passes bug fixed, applying/separating color-coded throughout.

### What Changed

**Daily panel — visual upgrades:** Title enlarged to 1.85rem for stronger hero presence. Header section gets a bottom border divider (cerulean 10%) separating title/moon from the reading body. Key transit pill redesigned: removed box border, added a 3px cerulean left-border accent (matches pull quote treatment) with slightly elevated background — makes the day's starred transit visually primary.

**Today block — category labels:** Work / Creative / Body labels upgraded from plain text to small pill badges (cerulean border + background, rounded 20px). Reads as a scannable labeled list rather than three indistinct rows.

**Transit pills → transit detail links:** All 26 active_transit pills in the Daily panel are now tappable. Tap any pill → switches to the Transits panel → if the transit has a library file, opens the full detail view. Matching logic uses `normPlanet()` normalization (NorthNode → nnode, SouthNode → snode, LotOfFortune → fortune, etc.) plus glyph matching. Applying transits get a slightly elevated cerulean border for emphasis. Implemented via data attributes + event listeners (clean, no inline onclick escaping issues).

**Transit list — direction color coding:** The `applying` direction label in transit rows is now cerulean-tinted. `separating` stays muted. Applies/separating distinction is now visually scannable.

**Passes bug fixed:** Transit detail view was rendering an empty "Passes" heading for transits with `passes: []` (empty array is truthy in JS). Fixed to `t.passes && t.passes.length`. The passes display format itself (the passes timeline strip) is unchanged — kept the format as-is. Only 4 of 23 active transits have pass data; the section is now hidden for the rest.

**New functions:** `normPlanet(s)` — normalizes planet name strings for matching. `openTransitFromPill(label, glyph)` — loads transit data if needed, switches to Transits panel, opens detail on match.

**Deployed:** commit `1ba3d71` → Netlify production via API restore.

---

## 2026-06-10 — Daily + Transits Live: JSON Pipeline + Netlify Direct Deploy

**The headline:** The app is now fully data-driven. The Daily tab renders a real reading from `today.json` (title, pulse, key transit pill, prose, pull quote, today block). The Transits tab renders all active slow-planet transits from `transits.json` with a list→detail slide navigation. The 4am routine now writes both JSON files every night and deploys directly to Netlify — no GitHub webhook required.

### What Changed

**`today.json` + `transits.json` at repo root:** Both files committed to root and served by Netlify. `today.json` holds the daily reading (title, moon, pulse, key transit, prose paragraphs, pull quote, today block, active transit pills). `transits.json` holds all slow-planet transits with full detail-view prose, passes timeline, keywords, and orb data. Served with `no-cache` headers so nightly updates are always fresh.

**Daily panel — live render:** Fetches `today.json` on first activation (lazy-load, cached after). Renders: date eyebrow, Cormorant italic title, moon glyph + phase + sign, italic pulse block, key transit pill (planet + aspect + natal point, orb + direction), full prose paragraphs, pull quote block, today action items (Business · Creative · Body).

**Transits panel — list + detail:** Fetches `transits.json` on first activation. List view: each transit as a row (planet glyph, aspect name + natal point, transiting planet + sign + house, orb + direction chevron). Detail view: slides in from right on tap — back button, passes timeline strip, keyword pills, summary pull quote, full prose. `closeTransitDetail()` slides list back in.

**Netlify direct deploy pipeline:** Free-plan build minutes are finite and the GitHub webhook is unreliable. Switch to `netlify deploy --dir . --site [id]` + API restore call. Token pulled from `~/Library/Preferences/netlify/config.json`. `netlify-cli` installed globally. No build minutes consumed. Step 12 of `ROUTINE-UPDATE-INSTRUCTIONS.md` updated with the full sequence.

**Bug fixed — recursive `switchPanel`:** The override pattern (`const _origSwitchPanel=switchPanel; function switchPanel(...)`) caused infinite recursion because `function` declarations are hoisted — `_origSwitchPanel` captured the new function, not the original. Fixed by removing the override and adding `loadTransits()` / `loadDaily()` calls directly into the original `switchPanel` body.

**`netlify.toml`:** Added no-cache headers for `/*.json` so CDN never serves stale daily data.

### Files Changed
- `natal readings/jordan.html` — Daily + Transits live render, switchPanel fix
- `today.json` — first live daily reading (June 9: "the fire crosses over")
- `transits.json` — 4 active transits with full readings and passes
- `netlify.toml` — no-cache headers for JSON files
- `routine/ROUTINE-UPDATE-INSTRUCTIONS.md` — step 12 updated with direct deploy sequence
- `.gitignore` — added `.netlify` folder

**Commits:** `a2d8ed4` (wire panels to JSON), `d68a589` (switchPanel fix), `8ae6a31` (no-cache headers), `665bf74` (routine step 12)

---

## 2026-06-09 — App Shell Restructure: Home + 4-Tab Nav + Architecture v2

**The headline:** The app now has a real architecture. Home screen with artistic nav cards, a 4-tab bottom nav (Home · Natal · Transits · Daily), and the full 5-section Natal reading nested inside its own sub-navigation. The foundation for the 7-section product vision is in place.

### What Changed

**Home panel:** Full-width Natal hero card with generative SVG compass art, 2-column row for Daily + Transits, 2-column row for Synastry + Workplace (coming soon), full-width Wheel & Moon (coming soon). Live date and lunar phase displayed in header strip. `goNatal()` navigates directly into the Natal chart.

**New 4-tab bottom nav:** Replaced the old 7-tab scrollable nav with a clean 4-tab nav — Home (✦) · Natal (◯) · Transits (♄) · Daily (☽). Synastry, Workplace, and Wheel & Moon are represented on the Home screen until they have content.

**Natal sub-navigation:** All 5 natal reading sections (Chart · Identity · Depth · Roots · Soul) moved inside `#panel-natal` with a dedicated `.natal-subnav` pill row. The chart wheel and all reading content are now sub-panels within the Natal section, not top-level tabs.

**Panel architecture:** `panel-chart` → `sp-chart`, `panel-identity` → `sp-identity`, etc. All sub-panels use `.subpanel` + `.natal-body` flex container. New `switchSub()` function handles sub-navigation. Chart key button now shows only when on Natal > Chart.

**Arch doc:** `the build/app-architecture-v2.md` — the full 7-section product map, section specs, build phases, and governing design principle.

**Commits:** `22526ab` (architecture doc), `df599fe` (full shell restructure)

---

## 2026-06-09 — Mobile Polish: Fluid Layout + Scroll Fix

**The headline:** Chart fills edge-to-edge on all iPhone sizes. Accidental horizontal scroll drift on reading panels eliminated. Shell confirmed beautiful on SE, 11, 14 Pro Max.

### What Changed

**Fluid chart layout:** Chart side padding reduced from 10px to 4px, size formula updated to `min(calc(100dvh - 190px), calc(100dvw - 8px))`. Chart fills 98% of screen width on iPhone 11 (was 95%). Big Three cards: removed `max-width:120px` cap so they stretch to fill full width on any phone. Responsive breakpoints added for small phones (<380px) and large phones (>414px).

**Horizontal scroll drift fix:** Added `overflow-x:hidden`, `overscroll-behavior-x:none`, and `touch-action:pan-y` to `.panel`. Accidental thumb drift no longer shifts reading content sideways. Chart panel keeps `touch-action:none` to preserve pinch-to-zoom.

**PWA icon fix:** iOS ignores SVG for apple-touch-icon. Rasterized icon to `apple-touch-icon.png` (512×512 PNG, gold compass rose on navy), linked in jordan.html head.

---

## 2026-06-09 — Natal Shell v2: Tier 3 Complete + Netlify Hosting

**The headline:** Shell is now fully installable as a home-screen web app (PWA). Transits and Daily tabs unlocked with real content — 4 live transit data cards + a date-wired daily reading slot. Hosting permanently migrated from GitHub Pages to Netlify (`pathfinderastro.vercel.app`) with HTTP-level cache headers. The shell is ready to port to friends' charts.

### What Changed

**T3-A — PWA manifest:** `manifest.json` and `icon.svg` (8-pointed compass rose, gold/navy) already in `natal readings/`. Updated manifest to Jordan-specific name and `start_url`. Added `<link rel="manifest">` + `<link rel="apple-touch-icon">` to jordan.html head.

**T3-B — Transits panel live data:** Replaced blank empty state with 4 real active transit cards (Jupiter trine Pluto 0.02° separating, Pluto sextile Moon 0.29° applying, Uranus inconjunct Jupiter 0.32° applying, Jupiter sesquiquadrate Mars 0.08° applying). Real planet glyphs, real degrees, real orbs and directions, real keyword pills. "reading · phase 2" pill as body — intentional product preview, not broken placeholder.

**T3-C — Daily panel skeleton:** Date-card + reading body slot replace empty state. JS populates full date string (e.g. "Tuesday, June 9, 2026") into eyebrow on load. Ghosted italic placeholder prose shows the exact reading architecture phase 2 will fill.

**Nav tabs unlocked:** Transits and Daily were locked (`pointer-events:none`). Removed lock — both tabs now fully navigable.

**Netlify migration:** GitHub Pages forces `cache-control: max-age=600`, unoverridable, breaking mobile Safari updates. Netlify with `netlify.toml` sets `no-cache, no-store, must-revalidate` at HTTP level. Deploy time ~30s on push.

### Files Changed
- `natal readings/jordan.html` — T3 implementation, manifest links, nav unlock
- `natal readings/manifest.json` — Jordan-specific name + start_url
- `netlify.toml` — cache headers
- All live-links.md / chart-links.md / README.md → Netlify URLs

---

## 2026-06-09 — Natal Shell v2: Tier 2 Complete

**The headline:** Visual depth layer fully matched to mimi.html quality bar. Watercolor blooms, 3-layer card gradients, pull quotes, and crossfade transitions all live. Shell now visually complete and ready to port.

### What Changed (4 items)

**T2-C — Watercolor section blooms:** `reading-inner::before` and `::after` pseudo-elements — large radial gradient blobs, `filter:blur(65-72px)`, accent-colored and positioned top-left + bottom-right. Each panel has its own ambient color atmosphere.

**T2-B — 3-layer card header gradient:** Upgraded `sec-head::before` from a single radial gradient to three overlapping ones — strong bloom from the left edge (0.30 opacity), faint one from top-right, trace from below. Cards now feel lit from within rather than flat.

**T2-A — Pull quotes:** `.pull` CSS class (accent-colored left border, 2px, Cormorant Garamond italic, accent-matched text). 5 quotes placed across all 4 panels: Identity has two (anaretic degree + soul purpose), Depth has one (the Scorpio door), Roots has one (wound and vocation), Soul has one (chart not asking).

**T2-F — Tab crossfade:** Replaced `display:none`/`display:block` toggle with `opacity` + `visibility` + `pointer-events` — 0.22s ease transition. Panels now fade in/out instead of snapping.

### Files Changed
- `natal readings/jordan.html` — Tier 2 implementation
- `the build/natal-shell-v2-brief.md` — Tier 2 marked complete

---

## 2026-06-09 — Natal Shell v2: Tier 1 Complete

**The headline:** Tier 1 of the natal-shell-v2-brief.md fully implemented on jordan.html. CSS token system, per-panel accent color signatures, scrollable 7-tab nav, and panel slot architecture are all live. Shell is now structurally ready to port to other charts.

### What Changed (4 items)

**T1-A — CSS custom properties:** Full `:root` token system introduced. 22 variables covering `--bg`, `--gold/rose/cerulean/teal/amber` (each with `-dim`/`-mid`/`-brt`/`-alpha` variants), `--text`, `--muted`, `--muted-2`, `--muted-3`, `--surface`, `--border`. Every hardcoded `rgba(201,168,76,...)` string replaced with `var(--accent-alpha)` references.

**T1-B — Accent color system:** 5 accent classes (`.accent-gold`, `.accent-cerulean`, `.accent-teal`, `.accent-rose`, `.accent-amber`). Each overrides the `--accent` family via CSS cascade. Applied: Identity → gold, Depth → cerulean, Roots → teal, Soul → rose. Accent drives: 3px gradient top strip on every sec-card, left radial glow on sec-head, colored eyebrow/glyph/pills/sep lines/dive toggles/panel title — all panels have a distinct visual identity.

**T1-C — Scrollable nav:** Nav is now `overflow-x:auto; scroll-snap-type:x mandatory`. Each tab is `min-width:72px; flex:none`. Two new locked tabs added — Transits (♄, amber-locked) and Daily (☽, locked) — visible but ghosted with "soon" badge. Nav holds 7 tabs cleanly at 390px width with scroll.

**T1-D — Panel slot architecture:** Consistent inner template introduced: `.panel-slot > .panel-slot-head + .panel-slot-body + .panel-slot-empty`. Two new placeholder panels (`panel-transits`, `panel-daily`) built with this structure — each has geo-bg, accent class, panel-slot, and a visible `.panel-slot-empty` state card.

### Files Changed
- `natal readings/jordan.html` — Tier 1 implementation
- `the build/natal-shell-v2-brief.md` — Tier 1 marked complete (see brief)

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
