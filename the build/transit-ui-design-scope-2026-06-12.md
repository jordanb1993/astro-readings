---
cssclasses: stars-reading
date: 2026-06-12
type: build-doc
---

# Pathfinder Transit UI — Design Scope
**Session:** June 12, 2026 | **Status:** Ready to execute

---

## Overview

The transit copy rewrite and two-tier pill split (The Season / Passing Weather) represent a shift in editorial register. The design has not yet caught up in several specific places. All gaps are small complexity — closeable in a single focused session.

---

## Priority Order

| Priority | Item | Complexity | File |
|---|---|---|---|
| 1 | Prose typography in transit detail (`t-detail-prose p` → Cormorant, 1.0rem) | Small | `pathfinder-core.css` |
| 2 | Reorder summary pull-quote above keywords in detail panel | Small | `pathfinder-core.js` `openTransitDetail()` |
| 3 | "Pull the thread" in transit detail panel | Small | `pathfinder-core.js` `openTransitDetail()` |
| 4 | Season pill color → amber accent | Small | `pathfinder-core.js` `renderDaily()` + CSS |
| 5 | Section label opacity bump + border separator between tiers | Small | `pathfinder-core.css` `.d-pills-section-label`, `.d-pills-section` |
| 6 | Biwheel label size bump on selection state | Small | `pathfinder-core.css` `.t-biwheel-label.bw-has-sel` |
| 7 | Applying t-row left-border accent (optional) | Small | `pathfinder-core.css` + `renderTransitTabContent()` |

Items 1–3 are the core voice-alignment work. Items 4–5 are pill tier visual differentiation. Items 6–7 are polish.

---

## 1. Transit Pill Visual Differentiation (The Season vs. Passing Weather)

### Current State
Both pill tiers share cerulean color scheme. "The Season" uses `.d-t-pill` (full pill, interactive). "Passing Weather" uses `.d-t-pill-mini` (dimmer, lower-contrast, non-interactive). The only visual distinction is opacity/size — the section labels do the work the pills themselves should reinforce.

### The Gap
Season pills represent outer/slow planets — multi-month arcs, the primary library content. They should declare themselves as the weightier tier. A user who doesn't read the eyebrow won't understand the hierarchy.

### Proposal
**A. Color accent.** Shift Season pills to amber (`--amber-alpha`) — same color as the transit library / Variable tab. Creates cross-panel coherence: Season pills feel like entries in the transit library (which they are — they're the clickable gateway). Add modifier class `.d-t-pill-season` in CSS.

**B. Size/weight.** Season pills: `padding: 5px 11px` (from `4px 10px`), glyph at `0.88rem` (from `0.80rem`). Small lift reinforces the tier.

**Do NOT:** Add icons/badges or glow/animation. The structural difference (full pill vs. mini strip) is enough.

### Section Label Refinements
- Bump label opacity: `rgba(var(--gold-alpha), 0.52)` (from 0.38) — these are meaningful navigational labels
- Add separator between tiers: `.d-pills-section` (non-first-child) gets `padding-top:12px; border-top:1px solid rgba(var(--gold-alpha),0.07)`
- Passing Weather label: slightly lighter (0.28 opacity) or smaller (0.40rem) to signal lower weight

---

## 2. Transit Detail Panel — Voice Alignment

### Current State
`openTransitDetail()` order: header (technical) → keyword pills → summary pull-quote → prose body → pass history

### The Gap
New transit library prose leads with felt sense. But the detail panel shows technical data first. The `t.summary` pull-quote — which *is* the felt-sense opener in the new voice — sits third, after the keywords. The prose body is `.t-detail-prose p` at `0.88rem` Inter — cramped, documentation-feel, fights the new register.

### Proposal
**A. Reorder.** Move `t.summary` block immediately after `.t-detail-header`, before keyword pills. The felt-sense statement should be the first prose element encountered.

**B. Typography upgrade.** Change `.t-detail-prose p`:
```css
font-family: 'Cormorant Garamond', serif;
font-size: 1.0rem;
font-weight: 300;
line-height: 1.85;
```
This matches the daily reading body copy register exactly.

**C. Keywords stay between summary and prose.** After moving summary up, keywords serve as a quick-scan tonal frame before the full reading — correct placement.

---

## 3. "Pull the Thread" in Transit Detail Panel

### Proposal
Same pattern as daily panel. Split `t.reading` at `\n\n`, show first paragraph, fold the rest.

Implementation in `openTransitDetail()`:
```js
const proseParas = (t.reading||'').split('\n\n').filter(Boolean);
const proseFirst = proseParas.length ? `<p>${proseParas[0]}</p>` : '';
const proseRest = proseParas.length > 1 
  ? proseParas.slice(1).map(p=>`<p>${p}</p>`).join('') : '';
const proseHtml = proseFirst + (proseRest
  ? `<div class="d-prose-fold" id="td-prose-fold">${proseRest}</div>
     <button class="d-pull-thread" 
       style="border-color:rgba(212,128,64,0.20);color:rgba(212,128,64,0.65)"
       onclick="document.getElementById('td-prose-fold').classList.add('open');this.style.display='none'">
       Pull the thread <span>→</span></button>`
  : '');
```

Use `td-prose-fold` (not `d-prose-fold`) to avoid ID conflict with daily panel fold.

---

## 4. Transit List (The Variable Tab)

### Recommendation: Keep Technical Meta
The list is a navigation surface. Its job is fast identification of which transit to open. "Jupiter 26° Cancer · H9" is faster to scan than a prose snippet. Felt-sense lives in the detail panel.

**Optional enhancement:** Add `t.summary` as a second line below meta, truncated one line, muted-3 style. Scent trail without replacing functional data. Not required.

---

## 5. The Variable Tab — Architecture Review

### What Works
- Sticky tab nav `.t-tabs` — good
- `.t-row-orb-dir.t-applying` cerulean for applying rows — clear signal, keep as-is
- The biwheel tap-to-select → aspect lines → `#bw-detail` — working
- Now/Returning/Archive structure — no gaps from copy shift

### Minor Polish Items
**Applying row accent (optional):** Add cerulean left-border to applying `.t-row` items, similar to `.d-key-transit`. Makes applying/separating distinction spatial, not just typographic.

**Biwheel label on selection:** `.t-biwheel-label.bw-has-sel` — bump to `0.42rem` and slightly higher opacity. "tap to dismiss" is missable at current size.

**Tab background:** `.t-tabs` background is hardcoded `#0a0614` vs `--bg` (#09102a) — minor seam on OLED. Low priority.

---

## What Does NOT Need Changing

- The `.t-row` list layout — technical meta is correct for navigation surfaces
- The biwheel render architecture
- The Now/Returning/Archive tab structure
- The `d-t-pill-mini` treatment for Passing Weather — near-invisible is correct
- The transit detail technical header (eyebrow/title/subtitle/orb) — technical anchoring appropriate at top
- The daily prose fold pattern — already implemented correctly
