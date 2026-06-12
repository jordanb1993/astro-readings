# Natal Shell v2 — Build Brief
*Written June 9, 2026. Purpose: define what jordan.html needs to become before we apply it to others.*
*This document is the architectural contract for the chart-centric hub shell.*

---

## What This Is

`jordan.html` is the prototype. Everything built here becomes the template every other chart inherits. The goal of this shell build is not polish for its own sake — it's building a foundation solid enough to hold the full connected library vision (daily readings, transits, future tabs) without structural debt.

Two questions drive every decision:
1. Will this scale cleanly when we add dynamic content tabs?
2. Does this look as good as mimi.html — the visual benchmark?

---

## Gap Analysis — jordan.html vs mimi.html

After full review of both files, here is what mimi has that jordan's shell currently lacks:

### Visual gaps

**1. CSS custom properties (design tokens)**
mimi.html uses `:root { --bg, --gold, --surface, --rose, --cerulean, --teal... }` throughout. jordan.html hardcodes every color as a raw hex or rgba string. This means:
- Theming is impossible (the Phase 3 skins feature requires CSS variables)
- Global changes require find-and-replace across hundreds of declarations
- Inconsistency accumulates silently

**2. Accent color system on section cards**
mimi.html's `dive-section` cards have four distinct accent variants: `accent-gold`, `accent-rose`, `accent-plum`, `accent-teal`. Each variant gets:
- A colored top border strip (3px gradient across full card width)
- A colored glow in the card header (`radial-gradient` from left edge)
- Colored icon, eyebrow text, title, tags, and pull quotes — all inheriting from the accent class
- A left border on the card matching the accent color

jordan.html has one card style. Every section looks identical. This is the biggest visual gap.

**3. Pull quotes (`.pull`)**
mimi.html uses accent-colored left-border pull quotes inside dive bodies — a `1.2rem` italic Cormorant Garamond line that breaks the prose and creates visual rhythm. jordan.html has no pull quote pattern at all. This is a significant quality gap in the reading panels.

**4. Watercolor section blooms**
mimi.html has `dive-wrap::before` and `dive-wrap::after` — large `radial-gradient` blobs, `filter: blur(50-70px)`, subtly tinting the section background with the accent color. jordan.html has the sacred geometry but lacks this warmer, organic layer. The blooms make sections feel distinct without hard borders.

**5. Card header gradient depth**
mimi.html's `.dive-head` variants (gold-head, rose-head, plum-head, teal-head) use multi-stop `radial-gradient` with 3 overlapping gradients — a strong color bloom from the left, a faint one from top-right, a trace from bottom. The result is a card header that feels lit from within. jordan.html's `sec-head` has a single faint radial gradient. Low depth by comparison.

**6. Animated glyph float on trio cards**
mimi.html's Big Three glyphs use `animation: floatUp 4s ease-in-out infinite` with staggered delays. The Big Three strip on jordan.html is static. Small detail, high perceived quality difference.

**7. Top accent strip on section cards**
mimi.html cards all have a 3px gradient accent strip at the very top (`dive-section::before`). The gradient starts transparent, peaks at the accent color, fades back. jordan.html cards have no top strip.

**8. Tab transitions**
Currently panels just snap on/off (`display:none` → `display:block`). mimi.html is a scroll page so this doesn't apply — but in a nav shell, the panel switch should feel like a swipe or a crossfade. No transition animation currently exists.

**9. Header is underdeveloped**
The current header shows `born into the threshold` and birth data. mimi.html's hero has a full-viewport treatment with the name at `clamp(68px, 10vw, 118px)`. In a nav shell, the hero concept doesn't apply the same way — but the header could hold more visual presence: a subtle radial gradient, the name more prominent, a micro-ornament element.

**10. CSS variables not wired to the planet/element system**
The chart wheel uses named colors for planets and elements. The reading panels don't inherit those colors. When we eventually want to, say, tint the Identity tab slightly fire-gold (Sagittarius) or the Depth tab slightly water-blue (Scorpio), there's no variable system to do it cleanly.

### Structural gaps (for scalability)

**11. No slot architecture for dynamic tabs**
Right now every tab's content is baked into the HTML. To add a Transits or Daily tab later, we'd insert a new `<div class="panel">` and new nav button. That works, but the panels currently have no consistent internal structure — each one is just a `reading-inner` div with arbitrary content. Dynamic tabs need a defined inner template:
- A panel header zone (title, date stamp, eyebrow)
- A content zone (where JSON-driven cards would render)
- A loading state (skeleton or spinner for async fetch)
- An empty state (if no data)

**12. Nav can't scale past 5 tabs**
The current 5-tab nav fills the bar. Adding Transits + Daily = 7 tabs. The bottom nav needs to be scrollable (horizontal scroll-snap) or needs a "more" overflow pattern. Decision needed before we add tabs.

**13. No CSS variable for accent-per-panel**
Each reading panel could have its own accent color (Identity = gold/Sagittarius fire, Depth = deep blue/Scorpio water, Roots = earth green/Virgo, Soul = teal/synthesis). This would tie the visual system to the astrological content directly. Currently there's no way to do this without rewriting each panel's styles individually.

**14. No manifest.json / PWA layer**
mimi.html references `manifest.json` and `icon.svg`. jordan.html has the meta tags but no companion files. The chart isn't installable as a home-screen app yet. This is a one-session add.

---

## v2 Build Plan — Priority Order

### Tier 1 — Foundation (must do before applying to others)
These are structural. Skipping them means rebuilding when we scale.

**T1-A: CSS custom properties**
Migrate all hardcoded colors to `:root` variables. Pattern: `--gold`, `--gold-dim`, `--gold-mid`, `--gold-bright`, `--rose`, `--cerulean`, `--teal`, `--bg`, `--surface`, `--text`, `--muted`. Then replace all raw values throughout. ~30min but pays off every session after.

**T1-B: Accent color system**
Assign each reading panel an accent:
- Identity → gold (Sagittarius Sun, fire)
- Depth → cerulean/deep blue (Scorpio water, 7th house Capricorn)
- Roots → teal-green (Virgo Chiron, earth)
- Soul → rose/plum (synthesis, poem)

Add four accent classes: `.accent-gold`, `.accent-cerulean`, `.accent-teal`, `.accent-rose`.
Apply to `sec-card` so each card inherits: top border strip, left glow, colored eyebrow/title.

**T1-C: Scrollable nav**
Replace fixed 5-tab nav with a horizontally scrollable nav that can hold 7-8 tabs cleanly. Each tab is a fixed min-width, container scrolls with scroll-snap. Active dot indicator follows. Placeholder "Transits" and "Daily" tabs (visible but locked, with a subtle `coming soon` state) to show the infrastructure intention.

**T1-D: Panel slot architecture**
Add a consistent inner template to each panel:
```html
<div class="panel-slot">
  <div class="panel-slot-head">  <!-- title, eyebrow, date -->
  <div class="panel-slot-body">  <!-- cards render here -->
  <div class="panel-slot-empty hidden"> <!-- empty state -->
</div>
```
This is invisible to the user today but means future dynamic tabs slot in cleanly.

### Tier 2 — Visual depth (match mimi's quality bar)

**T2-A: Pull quotes**
Add `.pull` pattern to dive body content. One pull quote per major dive section, using the panel's accent color. Already identified which lines in the reading prose are pull-quote material.

**T2-B: Card header gradient depth**
Upgrade `sec-head` to use 3-layer radial gradient (matching mimi's gold-head / rose-head pattern) per the panel accent.

**T2-C: Watercolor section blooms**
Add `::before` / `::after` pseudo-elements on the reading panels creating large blurred color blooms behind the card stack. Accent-colored, subtle. Makes sections feel distinct and organic.

**T2-D: Top accent strip on sec-cards**
3px gradient strip at top of every `sec-card`. Transparent → accent color → transparent.

**T2-E: Animated Big Three glyphs**
Add `floatUp` keyframe animation to the Big Three glyph elements on the chart panel. Stagger by 1.3s each. Very low effort, high perceived quality.

**T2-F: Tab crossfade transition**
Replace snap on/off with a 200ms opacity crossfade on panel switch. CSS only — add `.panel { opacity: 0; transition: opacity 0.2s }` and `.panel.active { opacity: 1 }`.

### Tier 3 — Infrastructure (Phase 2 prep, do last)

**T3-A: PWA manifest**
Create `manifest.json` and `icon.svg` in the natal readings directory. Adds installability with no visual change.

**T3-B: Placeholder Transits tab**
Add the tab to the nav, add the panel with a "Coming soon" state card that describes what it will hold. No data yet — but the shell shows the intention.

**T3-C: Placeholder Daily tab**
Same pattern. One placeholder card with a date and `—` where the reading will go.

---

## Accent Color Map — Jordan's Chart

| Tab | Accent | Rationale |
|-----|--------|-----------|
| Chart | — | Chart panel stays jewel navy, no accent |
| Identity | Gold `#d0a840` | Sagittarius Sun, North Node — fire, Jupiter-ruled, the soul path direction |
| Depth | Cerulean `#4a9fd4` | Scorpio stellium (water) + Capricorn 7th house (earth/cold) — the deep well |
| Roots | Teal-green `#5ab8a8` | Virgo Chiron/IC — earth, the wound, the root system, Chiron's healing register |
| Soul | Rose `#d4a0b5` | Synthesis + poem — the softer register, the closing, rose as love/wound both |
| Transits (future) | Amber `#d48040` | Active sky, current motion, the changing — warm and urgent |
| Daily (future) | Cerulean-light `#6ab8d4` | Today, present tense, water |

---

## What "Apply to Others" Means

When this shell is ready to port to mimi, carina, and eventually subscribers:

**What changes:** The `CHART` data object, the eyebrow chains, the reading content, the header name, and the accent colors (mapped to their chart rather than Jordan's).

**What stays identical:** The entire CSS system, the nav architecture, the panel slot structure, the chart rendering pipeline, the key drawer, the animation system.

**The test for "ready to port":** Can Jordan copy jordan.html, do a find-replace on the name, swap in the chart data object, update the reading content, and have a complete, correct chart? If yes, the shell is ready. If it requires structural surgery, it isn't.

---

## Files This Brief Informs

| File | How it uses this brief |
|------|----------------------|
| `natal readings/jordan.html` | The prototype — built to this spec |
| `natal readings/mimi.html` | Will be rebuilt on this shell when ready |
| `natal readings/carina.html` | Same |
| `natal readings/[friend].html` | Future builds all inherit this |
| `app/app-vision.md` | Hub architecture section references this |

---

*Brief written June 9, 2026. **Tier 1 complete June 9, 2026. Tier 2 complete June 9, 2026. Tier 3 complete June 9, 2026.** Shell is ready to port to friends' charts.*
