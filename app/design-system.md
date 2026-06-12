---
cssclasses: stars-reading
tags:
  - build
  - design
---

# Pathfinder Design System
*Component library and token reference. Live preview: open `natal readings/design-system.html` in browser.*
*Last updated: 2026-06-12*

---

## Design Tokens

### Color Palette

| Token | Value | Use |
|-------|-------|-----|
| Background | `#0a0614` | App background, card backgrounds |
| Text | `rgba(240,228,200,0.94)` | Primary body text |
| Muted | `rgba(240,228,200,0.58)` | Body copy in cards |
| Muted-2 | `rgba(240,228,200,0.40)` | Secondary labels, .b3-sign |
| Muted-3 | `rgba(240,228,200,0.22)` | Tertiary / inactive |
| Gold | `#c9a84c` / `--gold-alpha: 201,168,76` | Borders, accents, active states |
| Teal | `rgba(90,184,168,…)` / `--teal-alpha: 90,184,168` | Wheel, Sky sections |
| Rose | `rgba(212,160,181,…)` / `--rose-alpha: 212,160,181` | Accent, diagonal compass points |
| Cerulean | `rgba(74,184,232,…)` / `--cerulean-alpha: 74,184,232` | Moon strip, accent |
| Plum-bright | `#b482d2` | Archetype card accents |

### Typography

| Role | Font | Size | Weight | Class/Context |
|------|------|------|--------|--------------|
| Display title | Cormorant Garamond | 1.9rem | 300 | Panel headers |
| Section title | Cormorant Garamond | 1.5rem | 300 | Card titles |
| Body | Cormorant Garamond | 1.0–1.1rem | 300 | Card italic quote |
| Body prose | Inter (or unset) | 0.82–0.84rem | 400 | Reading paragraphs |
| Eyebrow | Inter | 0.48–0.52rem | 400 | Uppercase, tracked 0.18–0.22em |
| Section label | Inter | 0.41–0.44rem | 400 | Uppercase, tracked 0.14–0.18em |
| Pill/badge | Inter | 0.41rem | 400 | Uppercase, tracked 0.10em |
| b3-role | Inter | 0.50rem | 400 | Nav card role label |
| b3-sign | Inter | 0.54rem | 400 | Nav card sign/annotation |
| Nav label | Inter | 0.52rem | 400 | Bottom nav, tracked 0.11em |

### CSS Variables (pathfinder-core.css)

```css
--text:   rgba(240,228,200,0.94);
--muted:  rgba(240,228,200,0.58);
--muted-2:rgba(240,228,200,0.40);
--muted-3:rgba(240,228,200,0.22);
--gold-alpha:   201,168,76;
--teal-alpha:   90,184,168;
--rose-alpha:   212,160,181;
--cerulean-alpha:74,184,232;
```

---

## UI Components

### Section Eyebrow

Used above every major section in panels.

```html
<!-- Teal (Wheel/Sky sections) -->
<div style="font-size:0.48rem;letter-spacing:0.20em;text-transform:uppercase;
  font-family:'Inter',sans-serif;color:rgba(90,184,168,0.55);margin-bottom:12px">
  ☽ Moon
</div>

<!-- Gold (Ritual sections) -->
<div style="font-size:0.48rem;letter-spacing:0.20em;text-transform:uppercase;
  font-family:'Inter',sans-serif;color:rgba(201,168,76,0.65);margin-bottom:12px">
  ☽ Personal Ritual
</div>
```

### Section Divider

Thin 1px horizontal line used between ritual card sections.

```html
<div style="margin:0 20px;height:1px;background:rgba(201,168,76,0.08)"></div>
```

### Teal Card

Used for Moon, Seasons, Sky sections in the Wheel panel.

```html
<div style="background:rgba(90,184,168,0.06);border:1px solid rgba(90,184,168,0.18);
  border-radius:14px;padding:20px 18px">
  <!-- content -->
</div>
```

### Teal Card (highlighted/next)

Used for "Next Sabbat" spotlight.

```html
<div style="background:rgba(90,184,168,0.08);border:1px solid rgba(90,184,168,0.25);
  border-radius:14px;padding:20px 18px">
  <!-- content -->
</div>
```

### Gold Ritual Card

Full ritual card container with gradient, used for personal lunar rituals.

```html
<div style="background:linear-gradient(155deg,rgba(201,168,76,0.05) 0%,rgba(10,6,20,0) 55%);
  border:1px solid rgba(201,168,76,0.22);border-radius:16px;overflow:hidden">
  <!-- header, sections, dividers, question -->
</div>
```

### Natal Anchor Pill

Used in ritual card headers to show which natal placements are activated.

```html
<span style="font-size:0.41rem;letter-spacing:0.10em;text-transform:uppercase;
  font-family:'Inter',sans-serif;color:rgba(201,168,76,0.65);
  background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.18);
  border-radius:4px;padding:3px 8px">
  ASC 29° ♊︎
</span>
```

### Left-Border Step (Ritual Practice Steps)

The vertical gold bar indicating each ritual step.

```html
<div style="margin-bottom:16px;padding-left:14px;border-left:1px solid rgba(201,168,76,0.30)">
  <div style="font-size:0.43rem;letter-spacing:0.14em;text-transform:uppercase;
    font-family:'Inter',sans-serif;color:rgba(201,168,76,0.55);margin-bottom:6px">
    i · The Ledger
  </div>
  <p style="font-size:0.81rem;color:var(--muted);line-height:1.70;margin:0">
    Step body text here.
  </p>
</div>
```

### Closing Question (Italic Cormorant)

Used as the final element in ritual cards.

```html
<p style="font-family:'Cormorant Garamond',serif;font-size:1.10rem;font-weight:300;
  color:rgba(240,228,200,0.90);line-height:1.65;margin:0;font-style:italic">
  Where does the Gemini self take over…?
</p>
```

### Sky at Work Home Card

Reusable card for the home screen Sky at Work button.

```html
<button class="home-card hc-wheel"
  onclick="window.open('/workplace%20readings/sky-at-work.html','_blank')"
  style="min-height:90px">
  <div class="hc-top">
    <div>
      <div class="hc-label">The Sky</div>
      <div class="hc-title">Sky at Work</div>
    </div>
    <svg class="hc-hero-art" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(90,184,168,0.22)" stroke-width="0.7"/>
      <circle cx="11" cy="15" r="1.5" fill="rgba(90,184,168,0.60)"/>
      <circle cx="38" cy="11" r="1"   fill="rgba(90,184,168,0.42)"/>
      <circle cx="43" cy="32" r="1.5" fill="rgba(90,184,168,0.55)"/>
      <circle cx="18" cy="41" r="1"   fill="rgba(90,184,168,0.38)"/>
      <circle cx="34" cy="37" r="2"   fill="rgba(90,184,168,0.62)"/>
      <circle cx="26" cy="19" r="1.2" fill="rgba(90,184,168,0.48)"/>
      <line x1="11" y1="15" x2="26" y2="19" stroke="rgba(90,184,168,0.16)" stroke-width="0.4"/>
      <line x1="26" y1="19" x2="38" y2="11" stroke="rgba(90,184,168,0.16)" stroke-width="0.4"/>
      <line x1="26" y1="19" x2="34" y2="37" stroke="rgba(90,184,168,0.16)" stroke-width="0.4"/>
      <line x1="11" y1="15" x2="43" y2="32" stroke="rgba(90,184,168,0.10)" stroke-width="0.3"/>
    </svg>
  </div>
  <div class="hc-desc">collective transit reading · weekly</div>
</button>
```

---

## Chart Elements

### Big Three Card

The three-card strip showing Sun/Moon/Rising above the chart wheel.

```html
<div class="big-three">
  <div class="big-three-card">
    <div class="b3-role">Sun</div>
    <div class="b3-glyph">☉︎</div>
    <div class="b3-deg">1°51'</div>
    <div class="b3-sign">Sagittarius · H6</div>
  </div>
  <div class="big-three-card">
    <div class="b3-role">Moon</div>
    <div class="b3-glyph">☽︎</div>
    <div class="b3-deg">4°59'</div>
    <div class="b3-sign">Aries · H10</div>
  </div>
  <div class="big-three-card">
    <div class="b3-role">Rising</div>
    <div class="b3-glyph">♊︎</div>
    <div class="b3-deg">29°37'</div>
    <div class="b3-sign">Gemini · Anaretic</div>
  </div>
</div>
```

**Key CSS rules (in pathfinder-core.css):**
- `.big-three` — flex row, gap:6px, padding:8px 10px
- `.big-three-card` — flex:1, min-width:0, overflow:hidden, radius:10px, gold border
- `.b3-sign` — 0.54rem, white-space:nowrap, overflow:hidden, text-overflow:ellipsis ← prevents two-line wrap

### Wheel Home Card SVG Art

The concentric circles + cross SVG used on the Wheel home card.

```html
<svg class="hc-hero-art" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
  <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(90,184,168,0.35)" stroke-width="0.7"/>
  <circle cx="26" cy="26" r="14" fill="none" stroke="rgba(90,184,168,0.18)" stroke-width="0.5"/>
  <line x1="26" y1="4"  x2="26" y2="48" stroke="rgba(90,184,168,0.14)" stroke-width="0.4"/>
  <line x1="4"  y1="26" x2="48" y2="26" stroke="rgba(90,184,168,0.14)" stroke-width="0.4"/>
  <circle cx="26" cy="4"  r="2" fill="rgba(90,184,168,0.55)"/>
  <circle cx="26" cy="26" r="3" fill="none" stroke="rgba(90,184,168,0.40)" stroke-width="0.7"/>
</svg>
```

### New Moon SVG Icon

Used in ritual card headers.

```html
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
  <circle cx="18" cy="18" r="15" fill="#0a0614" stroke="rgba(201,168,76,0.45)" stroke-width="1"/>
  <circle cx="18" cy="18" r="9"  fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.15)" stroke-width="0.5"/>
  <circle cx="18" cy="18" r="4"  fill="rgba(201,168,76,0.06)"/>
</svg>
```

### Compass Rose SVG (PWA icon / decorative)

The Pathfinder navigation compass. Cardinal points = gold, diagonal = rose.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="114" fill="#0a0614"/>
  <circle cx="256" cy="256" r="210" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.35"/>
  <circle cx="256" cy="256" r="158" fill="none" stroke="#c9a84c" stroke-width="1"   opacity="0.20"/>
  <g transform="translate(256,256)" fill="#c9a84c">
    <polygon points="0,-148  11,-28  0,-6  -11,-28"/>
    <polygon points="0,148   11,28   0,6   -11,28"/>
    <polygon points="148,0   28,11   6,0   28,-11"/>
    <polygon points="-148,0 -28,11  -6,0  -28,-11"/>
  </g>
  <g transform="translate(256,256)" fill="#d4a0b5">
    <polygon points="0,-92 7,-18 0,0 -7,-18" opacity="0.85" transform="rotate(45)"/>
    <polygon points="0,-92 7,-18 0,0 -7,-18" opacity="0.85" transform="rotate(135)"/>
    <polygon points="0,-92 7,-18 0,0 -7,-18" opacity="0.85" transform="rotate(225)"/>
    <polygon points="0,-92 7,-18 0,0 -7,-18" opacity="0.85" transform="rotate(315)"/>
  </g>
  <circle cx="256" cy="256" r="14" fill="#c9a84c"/>
  <circle cx="256" cy="256" r="7"  fill="#0a0614"/>
</svg>
```

---

## Nav Icons

| Tab | Icon | Unicode | Notes |
|-----|------|---------|-------|
| Home | `✦` | U+2736 | `nav-icon-t` class (Cormorant font) |
| The Constant | `⊙` | U+2299 | `nav-icon` class (Apple Symbols) |
| The Variable | `☽︎` | U+263D + U+FE0E | VS15 prevents iOS emoji rendering |
| The Wheel | `⊕` | U+2295 | `nav-icon` class (Apple Symbols) |

**VS15 (text variation selector)** = `&#xFE0E;` — append after any zodiac or Miscellaneous Symbol glyph (U+2600–U+26FF) to prevent iOS emoji rendering.

---

## Zodiac Glyphs with VS15

Always append `&#xFE0E;` after each glyph in HTML.

| Sign | Glyph | HTML |
|------|-------|------|
| Aries | ♈︎ | `&#x2648;&#xFE0E;` |
| Taurus | ♉︎ | `&#x2649;&#xFE0E;` |
| Gemini | ♊︎ | `&#x264A;&#xFE0E;` |
| Cancer | ♋︎ | `&#x264B;&#xFE0E;` |
| Leo | ♌︎ | `&#x264C;&#xFE0E;` |
| Virgo | ♍︎ | `&#x264D;&#xFE0E;` |
| Libra | ♎︎ | `&#x264E;&#xFE0E;` |
| Scorpio | ♏︎ | `&#x264F;&#xFE0E;` |
| Sagittarius | ♐︎ | `&#x2650;&#xFE0E;` |
| Capricorn | ♑︎ | `&#x2651;&#xFE0E;` |
| Aquarius | ♒︎ | `&#x2652;&#xFE0E;` |
| Pisces | ♓︎ | `&#x2653;&#xFE0E;` |

---

*Live preview: `natal readings/design-system.html`*
