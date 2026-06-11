---
type: build-doc
date: 2026-06-11
---

# CLAUDE-APP-DESIGN.md — Pathfinder App Design System
*The canonical reference for every build session. Read this before touching jordan.html, sky-at-work.html, or any friend build.*
*Last updated: June 11, 2026*

---

## What This Document Is

This is the locked design system for the Pathfinder app. It covers:
- Color tokens and typography scale
- Component patterns (nav, cards, pills, headers, panels)
- UX principles that govern every build decision
- The propagation architecture — how changes to Jordan's build carry to all friend builds

When you make a design decision that isn't in this doc, add it here before the session ends. This doc is the memory between sessions. Without it, every session re-derives what's already been decided.

---

## Propagation Architecture — How Friend Builds Work

### The Problem
Jordan's build (`jordan.html`) is both the product prototype and the canonical template. As she builds and refines it, those improvements need to carry to friends' builds without manual re-syncing of 2,700-line files.

### The Solution (target state)
Split every build into two layers:

**Shared layer** (in separate files, auto-propagates to all builds):
- `pathfinder-core.css` — all design tokens, component CSS, nav, panel structure, animation
- `pathfinder-core.js` — renderBiwheel, getMoonPhaseSVG, fetchPositions, planet glyphs, sign names, panel switching, biwheel interaction

**Personal layer** (stays inside each person's `.html` file):
- `CHART` constant (natal positions, ASC, MC, houses, aspects)
- Person's name, birth date, birth location
- Natal reading sections (identity, depth, roots, soul, poem, archetype card)
- The natal chart SVG wheel content
- Home panel personalization

**How it works:** Each friend's `.html` file links to the shared files:
```html
<link rel="stylesheet" href="/pathfinder-core.css">
<!-- personal natal content here -->
<script src="/pathfinder-core.js"></script>
<script>
  const CHART = { /* this person's natal data */ };
  // personal initialization
</script>
```

When `pathfinder-core.css` or `pathfinder-core.js` is updated, every live build on Vercel updates automatically. No manual syncing.

### Current State (June 11, 2026)
The shared layer does NOT exist yet as separate files. `jordan.html` is still monolithic. This is the next infrastructure task before friend builds go live.

**Migration plan:**
1. Extract CSS (design tokens + all component styles) into `pathfinder-core.css`
2. Extract JS utilities into `pathfinder-core.js`
3. Update `jordan.html` to link to both files and remove the inline versions
4. Verify Jordan's build is identical after migration
5. Use this as the template for every new friend build from that point on

**Do this migration BEFORE building the first friend build.** Once friend builds exist as monolithic files, the propagation problem is back.

### What Lives In Each File After Migration

| Content | Where |
|---|---|
| Design tokens (CSS variables) | `pathfinder-core.css` |
| Component CSS (nav, panels, cards, pills) | `pathfinder-core.css` |
| Animation keyframes | `pathfinder-core.css` |
| renderBiwheel() | `pathfinder-core.js` |
| getMoonPhaseSVG() | `pathfinder-core.js` |
| fetchPositions() | `pathfinder-core.js` |
| PLANET_GLYPHS, SIGN_NAMES | `pathfinder-core.js` |
| switchToPanel(), loadDaily(), loadTransits() | `pathfinder-core.js` |
| CHART constant (natal positions) | `[name].html` |
| Natal reading HTML sections | `[name].html` |
| Person's home panel content | `[name].html` |
| Person's name, birth data | `[name].html` |

---

## Design Tokens

These are the exact CSS custom property values. Never hardcode colors — always use tokens.

```css
:root {
  /* Backgrounds */
  --bg:          #09102a;   /* deep space navy — page background */
  --surface:     #0d1c38;   /* card/panel surface */
  --surface-2:   #0a1428;   /* deeper surface for nested elements */

  /* Gold — home, natal, The Constant */
  --gold:        #d0a840;
  --gold-alpha:  208,168,64;
  --gold-dim:    rgba(208,168,64,0.10);
  --gold-mid:    rgba(208,168,64,0.30);
  --gold-brt:    rgba(208,168,64,0.75);

  /* Cerulean — transits, The Variable, signal/data */
  --cerulean:    #4a9fd4;
  --cerulean-alpha: 74,159,212;
  --cerulean-dim:rgba(74,159,212,0.09);
  --cerulean-mid:rgba(74,159,212,0.26);

  /* Teal — wheel, moon, seasonal */
  --teal:        #5ab8a8;
  --teal-alpha:  90,184,168;
  --teal-dim:    rgba(90,184,168,0.09);
  --teal-mid:    rgba(90,184,168,0.26);

  /* Rose — depth, Scorpio energy, soul sections */
  --rose:        #c8a090;
  --rose-alpha:  200,160,144;
  --rose-dim:    rgba(200,160,144,0.09);
  --rose-mid:    rgba(200,160,144,0.26);

  /* Amber — body, Chiron, earth sections */
  --amber:       #d48040;
  --amber-alpha: 212,128,64;
  --amber-dim:   rgba(212,128,64,0.09);

  /* Text */
  --text:        #faf4e8;               /* primary — near white warm */
  --muted:       rgba(245,235,210,0.97);/* body prose */
  --muted-2:     rgba(245,235,210,0.82);/* secondary body */
  --muted-3:     rgba(245,235,210,0.54);/* captions, meta */

  /* Accent system — overridden per panel */
  --accent:        var(--gold);
  --accent-alpha:  var(--gold-alpha);
  --accent-dim:    var(--gold-dim);
  --accent-mid:    var(--gold-mid);
  --accent-brt:    var(--gold-brt);
}
```

**Accent classes** — apply to panels to switch the accent color:
```css
.accent-gold     /* home, natal */
.accent-cerulean /* transits, daily */
.accent-teal     /* wheel, moon */
.accent-rose     /* soul, depth sections */
.accent-amber    /* body, earth sections */
```

---

## Typography Scale

**Fonts:**
- Display / headings: `Cormorant Garamond` — loaded from Google Fonts (weights 300, 400, 600 + italic)
- Body / UI: `Inter` — loaded from Google Fonts (weights 300, 400, 500)
- Mono / data: `IBM Plex Mono` (sky-at-work only, for signal board data)

**Scale (all in rem, base = 16px browser default):**

| Use | Size | Weight | Family | Notes |
|---|---|---|---|---|
| Panel title | 1.45rem | 300 italic | Cormorant | `.panel-title-lg` |
| Section headline | 1.22–1.35rem | 400 | Cormorant | Cards, reading sections |
| Card title | 1.0–1.10rem | 400 | Cormorant | `.hc-title`, `.b3-deg` |
| Body prose | **1.0rem** | 400 | Inter | `.d-prose p` — 16px minimum |
| Body secondary | 0.88–0.92rem | 400 | Inter | Card bodies, descriptions |
| Pull quote | 1.08rem | 300 italic | Cormorant | `.d-pull` |
| Pulse / lede | 1.0rem | 300 italic | Cormorant | `.d-pulse` |
| Nav label | 0.50rem | 400 | Inter | Letter-spacing 0.11em |
| Eyebrow / badge | 0.48–0.55rem | 400–500 | Inter | All caps, tracked |
| Caption / meta | 0.44–0.52rem | 400 | Inter | All caps, tracked |

**Line heights:**
- Prose: 1.85
- Cards: 1.70–1.72
- Display: 1.12–1.25
- Lists: 1.60

**Measure:** Never let prose lines exceed ~65ch. Use `max-width` on text containers.

---

## Animation & Transition Standards

All animations use `transform` and `opacity` only — GPU accelerated, no layout thrash.

```css
/* Interactive elements — tap/press response */
transition: transform 0.15s, opacity 0.15s;

/* Panel transitions */
transition: opacity 0.24s ease, visibility 0.24s ease;

/* Color/border state changes */
transition: background 0.16s, border-color 0.16s;

/* Expand/collapse (cards, details) */
transition: max-height 0.28s ease, opacity 0.22s ease 0.04s;
```

**Active states — all tappable elements must have one:**
```css
.home-card:active     { transform: scale(0.97); opacity: 0.85; }
.d-t-pill:active      { transform: scale(0.95); opacity: 0.80; }
.sign-chip:active     { transform: scale(0.94); opacity: 0.68; }
.planet-pill:active   { transform: scale(0.95); opacity: 0.75; }
.signal-row:active    { transform: scale(0.99); opacity: 0.85; }
```

**Shimmer skeleton (loading state):**
```css
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}
.skel {
  border-radius: 8px;
  background: linear-gradient(90deg,
    rgba(90,184,168,0.06) 25%,
    rgba(90,184,168,0.12) 50%,
    rgba(90,184,168,0.06) 75%);
  background-size: 600px 100%;
  animation: shimmer 1.6s infinite linear;
}
```

Use skeleton screens on any panel that fetches remote data. Never show a blank state or a spinner.

---

## Mobile-First Rules

These are non-negotiable for every build:

1. **Safe area insets** — always use `env(safe-area-inset-bottom,0px)` on nav height and bottom padding
2. **Touch targets** — all interactive elements minimum 44×44px
3. **`-webkit-tap-highlight-color: transparent`** — on every tappable element
4. **`overscroll-behavior: none`** on body; `overscroll-behavior-y: contain` on panels
5. **`-webkit-overflow-scrolling: touch`** on all scrollable containers
6. **SVG icons only** — never Unicode symbols for icons that render in the nav or prominent positions. `☽` renders as ")" in iOS system font. Always use inline SVG.
7. **`touch-action: manipulation`** on buttons — eliminates 300ms tap delay
8. **Viewport meta:** `width=device-width, initial-scale=1.0, viewport-fit=cover`

---

## Component Patterns

### Navigation Bar

Fixed bottom nav, 60px + safe area height. Four tabs for jordan.html. Each tab `flex:1` so labels stay on one line.

Active state: gold tint + 4px dot indicator above the tab. No border, no background fill.

Nav icon rule: **always SVG**, never Unicode. Crescent moon SVG:
```html
<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>
```

### Panel Structure

Every panel is `position:absolute;inset:0` — they stack. Only one is `.active` at a time.

Scrollable panels use `.reading-inner` or `.panel-slot` for content padding:
- Padding: `28px 18px calc(60px + env(safe-area-inset-bottom,0px) + 24px)`
- Max width: `680px; margin: 0 auto`

### Home Cards

Two sizes: hero (`.home-card-hero`, `min-height:130px`) and standard.
Active state required. Coming-soon cards: `opacity:0.52; pointer-events:none; transform:none on active`.

### Transit Pills (`.d-t-pill`)

Cerulean-tinted. Applying transits get a slightly brighter border. All pills must have:
- `transition: background 0.15s, border-color 0.15s, transform 0.15s, opacity 0.15s`
- `:active { transform: scale(0.95); opacity: 0.80; }`

Overflow pills: `"+N more · Transit Library →"` button pattern.

### Section Separators (`.sep`)

Horizontal rule with centered text label. Uses `var(--accent-mid)` gradient lines. Always matches panel accent color.

### Biwheel

Two biwheels in jordan.html:
- `t-biwheel-svg` — The Variable (Transits panel), interactive (tap to activate planet)
- `d-biwheel-svg` — The Variable (Daily panel), non-interactive

Both rendered by `renderBiwheel(svgId, interactive)`. Max width 320px on mobile.

Position in daily reading: **immediately after the d-header** (date/title/moon). Chart greets you first, reading unfolds below.

---

## UX Principles (Locked)

These are product decisions, not preferences. Do not deviate without updating `product-decisions.md`.

### 1. Every Data Element Is a Door
*(Locked June 11, 2026)*

Every piece of data in Pathfinder is simultaneously a navigation target. Nothing is a dead end. A transit pill → transit detail. A natal placement → its story. A house cusp → what lives there. A moon phase → personalized ritual.

**Consistency rule:** The drill-down interaction model is the same everywhere:
- Tap → detail slides in from right (or expands in-place for small data)
- Back button returns to list/panel
- No section gets a different interaction model

**Current gap:** The Constant has no tappable natal planets. The Wheel has no tappable elements. Fix this before adding new sections.

### 2. Reading First, Visual Anchor Second
*(Locked June 11, 2026)*

In The Variable daily panel, order is: header → biwheel → pulse → prose → pull → pills → today section. The chart appears immediately but the reading unfolds below it — the biwheel is context, not the destination.

### 3. Plain Language Before Technical
*(Locked June 11, 2026 — see product-decisions.md)*

Surface layer speaks in felt sense and meaning. Technical layer (degrees, aspect names, orbs) is available below that. Never lead with jargon. See sky-at-work.html for the reference implementation: plain insight card on top, "What's driving this?" reveals the mechanism.

### 4. Contemplative, Not Interactive
*(Locked June 5, 2026)*

The natal reading is an art object you receive and return to. It scrolls, it doesn't prompt. Interactivity lives in supplementary layers (transit pills, drill-down, ritual prompts) — never in the reading itself.

### 5. Loading States Are Never Blank
*(Locked June 11, 2026)*

Any panel that fetches remote data shows a shimmer skeleton screen while loading. The skeleton matches the approximate shape of the content that will appear. Error state is a quiet fallback, not a prominent failure message.

### 6. The Sky-at-Work Build Stays In Sync
*(Locked June 11, 2026)*

sky-at-work.html is a sibling build to jordan.html. Every design token update, typography change, animation standard, and SVG icon fix that applies to jordan.html applies to sky-at-work.html. Check both before closing a build session.

Once `pathfinder-core.css` exists, this concern goes away — it becomes automatic.

---

## Panel Map — Jordan's Build

| Panel ID | Tab | Accent | Content |
|---|---|---|---|
| `panel-home` | ✦ Home | gold | Sky strip, hero cards, nav to all sections |
| `panel-chart` | ◯ The Constant | gold | Natal chart wheel (zoomable), Big Three strip |
| `panel-natal` | ◯ The Constant (scroll) | gold | Identity / Depth / Roots / Soul reading sections |
| `panel-daily` | ☽ The Variable | cerulean | Biwheel, pulse, prose, pull, transit pills, today |
| `panel-transits` | ☽ The Variable | cerulean | Transit library: Now / Returning / Archive, biwheel |
| `panel-wheel` | ✧ The Wheel | teal | Moon phase, Wheel of the Year, Seasons |

Panel `panel-chart` and `panel-natal` share the same nav tab — the chart wheel lives on chart, natal reading sections live on natal (separate scroll context).

---

## Build SOP for New Friend Builds

*(Use after the shared layer migration is complete)*

1. Copy `jordan.html` as `[name].html` in `natal readings/`
2. Strip all Jordan-specific content:
   - The `CHART` constant
   - All natal reading section HTML (`.reading-section` divs)
   - Home panel birth data text
3. Insert the new person's `CHART` constant (natal positions from astro.com or Time Passages)
4. Build natal reading sections using `mimi.html` as the v3 template
5. Update the app header eyebrow with their name
6. Update the home Constant card `hc-desc` with their birth data
7. Push to GitHub — Vercel deploys automatically
8. URL: `pathfinderastro.vercel.app/natal%20readings/[name].html`

**Shared file updates carry automatically.** No sync step needed once the propagation architecture is in place.

---

## Open Build Tasks (as of June 11, 2026)

| Priority | Task |
|---|---|
| 🔴 Next | Tappable natal planets in The Constant → interpretation slide-in panel |
| 🔴 Next | Migrate jordan.html to shared `pathfinder-core.css` + `pathfinder-core.js` before first friend build |
| 🟡 Soon | Tappable wheel elements in The Wheel |
| 🟡 Soon | Sky-at-work: apply "every element is a door" — signal rows → full breakdown |
| 🟢 Later | Historical transit archive (past transits don't disappear) |
| 🟢 Later | Routine update: write `today.json` in Pathfinder three-layer format (eliminate `fetchPositions()` bridge) |
| 🟢 Later | Big Three Portrait section in The Constant |
| 🟢 Later | Plain-language entry layer at top of natal reading |

---

*Update this doc whenever a design decision is made or a principle is locked. The build log captures what happened; this doc captures what's decided.*
*Cross-reference: `product-decisions.md` (resolved decisions), `app-architecture-v2.md` (section specs), `agent-architecture.md` (automation layer)*
