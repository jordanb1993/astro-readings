# natal readings/ — Birth Chart Readings

This folder contains full natal chart reading HTMLs in the whimsigoth aesthetic. Each chart is also hosted live on GitHub Pages at `jordanb1993.github.io/astro-readings/natal%20readings/[name].html`.

## Completed charts

| Name | File | Live URL | Notes |
|------|------|----------|-------|
| Jordan | `jordan-natal.html` | `jordanb1993.github.io/astro-readings/natal%20readings/jordan-natal.html` | Canonical visual template (original build) |
| Dasha | `dasha.html` | `jordanb1993.github.io/astro-readings/natal%20readings/dasha.html` | Noon chart, time unconfirmed |
| Iza | `iza.html` | `jordanb1993.github.io/astro-readings/natal%20readings/iza.html` | Confirmed birth time |
| Su | `su.html` | `jordanb1993.github.io/astro-readings/natal%20readings/su.html` | Confirmed birth time |
| Marina | `marina.html` | `jordanb1993.github.io/astro-readings/natal%20readings/marina.html` | Leo Sun · Sagittarius Moon · Libra Rising |
| Kate | `kate.html` | `jordanb1993.github.io/astro-readings/natal%20readings/kate.html` | Libra Sun · Scorpio Moon · Libra Rising |
| Hazel | `hazel.html` | `jordanb1993.github.io/astro-readings/natal%20readings/hazel.html` | Taurus Sun · Virgo Moon · 29° Aquarius Rising |
| Yvonne | `yvonne.html` | `jordanb1993.github.io/astro-readings/natal%20readings/yvonne.html` | Cancer Sun · Libra Moon · Sagittarius Rising · coworker |
| Carina | `carina.html` | `jordanb1993.github.io/astro-readings/natal%20readings/carina.html` | Gemini Sun · Pisces Moon · Scorpio Rising · Jupiter on MC |

---

## Build guide — how to make a friend's natal chart

### What you need

- Full name (or preferred nickname)
- Birth date (month, day, year)
- Birth time (as exact as possible — Ascendant and houses change with time)
- Birth city/location

Without birth time: Sun, Moon, and planetary placements are still accurate. Rising sign, house positions, Midheaven, and the MC/IC axis cannot be calculated. Use a noon chart and note the caveat in the hero section with `.hero-note`.

### Step 1 — Calculate the chart

Run `routine/generate-positions.py` with the birth data. It uses Swiss Ephemeris (pyswisseph) and outputs:
- All planet positions in sign/degree
- Ascendant and MC (if birth time known)
- House placements (Placidus)
- Retrograde flags

### Step 2 — Calculate key aspects

With the planet degrees in hand, check all standard aspect types against each planet pair. Sort by orb exactness. The most important aspects:
- Conjunctions (0°), oppositions (180°), squares (90°), trines (120°), sextiles (60°)
- Orb guidelines: 8° for Sun/Moon conjunctions, 6° for major planets, 4° for outer planets, 2° for Chiron/Nodes
- Always check Chiron and the Nodes against the Angles (ASC, MC)

### Step 3 — Read the chart before writing

Identify:
- The chart's dominant element/modality and what that means for the person
- The 5 most structurally significant placements or patterns (these become Chart Signature items)
- 4-5 deep dive topics: choose the aspects/placements with the most psychological richness, not just the most exact
- Synastry: calculate aspects between their chart and Jordan's natal (see INSTRUCTIONS.md for her degrees)

### Step 4 — Use dasha.html as the base template

`dasha.html` (or `iza.html` / `su.html`) has all current session edits incorporated:
- Cream text palette (`--text: #fdf6e8`, `--muted: rgba(253, 246, 232, 0.58)`)
- Warm cream SVG star fills (`#fff8ee`)
- Full mobile CSS block (`@media (max-width: 680px)`)
- Teal synastry section (`.accent-teal`, `.dive-head.teal-head`, `.synastry-contact`)
- No `.hero-note` unless birth time is unconfirmed

Copy the file, rename it `[name].html`, then swap all content.

### Step 5 — Content structure to fill in

**Hero section**
- Name (`.hero-name`)
- Date, time, place (`.hero-datum-value`)
- Add `.hero-note` only if birth time unconfirmed: `⚠ Birth time unconfirmed — noon chart used. House positions and Ascendant are approximate.`

**Identity Trio** — one card each for Sun, Moon, Rising
- Sign + degree + house
- A 1-line tagline written for the person to read (first-person friendly, not clinical)

**Chart Signature** — 5 bullets
- Lead with the most structurally important patterns: stelliums, anaretic degrees, angular planets, Node axis, chart ruler
- Each item: bold label, then 1-2 sentences of meaning

**Planets table** — all placements including Chiron, Nodes, MC

**Aspects table** — top 7 aspects sorted by orb exactness

**Deep Dives** — 4 content dives + 1 synastry section (always last, always teal)
- Each dive: `accent-gold`, `accent-rose`, or `accent-plum` — vary the colors across the 4
- Structure per dive: eyebrow / title / subtitle / tags / 2 paragraphs / 1 pull quote
- Synastry: 3-5 contacts sorted by exactness, written for the friend to read (not Jordan)

**Through-Line** — 3 short paragraphs synthesizing the whole chart. Close with the line: "The chart doesn't predict what happens. It describes the terrain and the nature of the person walking it."

**Footer** — name, birthdate, location, Big 3, house system

### Step 6 — Writing style

The full style guide lives in `CLAUDE.md → Writing Style Guide: All Reading Types`. Universal rules (plain over poetic, don't perform "astrologer," pull-quotes earned not produced, vary opening moves, let minor content be short) apply here too. Natal-specific additions:

- Written for the friend to read, not as a report about them. Second-person where possible.
- Friends' charts: warm, accessible, written to land emotionally. Jordan's own readings: clean, technical, no emojis.
- Lead with implication, not description: "The motivation moves below the surface" not "Mars in Pisces is often internalized"
- Write to this specific person, not the archetype. Draw on what you know about them — every Scorpio Moon is different.
- State exact degrees in the technical lines (subtitle, aspects table) but let the prose breathe
- Em dash rule applies: rare, no spaces (`word—word`), `&mdash;` in HTML. Default to comma, colon, or new sentence.
- Pull quotes: one sentence that holds the section's truth. Cormorant Garamond italic. Should feel like something to write on a mirror. Not every section needs one.
- No section eyebrow/title above deep-dive cards (creates double title). No emojis in section titles.
- Through-Line synthesizes, doesn't list. Close with: *"The chart doesn't predict what happens. It describes the terrain and the nature of the person walking it."*

### Step 7 — After writing

1. Run `open "[filepath]"` to open in browser and check visually
2. Commit to GitHub: `git add "natal readings/[name].html" && git commit -m "Add [Name] natal chart" && git push origin main`
3. Share the live URL: `jordanb1993.github.io/astro-readings/natal%20readings/[name].html`
4. GitHub Pages goes live within ~2 minutes of push

---

---

## Chart Wheel SOP — `chart-wheel.html`

*Built June 4, 2026 · Fully mobile-audited June 4, 2026 · Template: Carina's chart*

**What it is:** A procedurally generated SVG natal chart wheel. Self-contained HTML file. Standalone page OR embeddable via `?embed=1`. Works on desktop, tablet, and mobile. Each new chart = copy the file, replace the CHART constant, update the title.

---

### Aesthetic: Whimsigoth Sacred Geometry

The design language is locked. Do not deviate without Jordan's explicit instruction.

- **Background:** jewel navy `#08162e` — NOT purple, NOT cold black
- **Primary accent:** warm gold `#d0a840`
- **Element arcs on outer rim:** fire amber `#c87840`, earth sage `#58925a`, air periwinkle `#5878c8`, water cerulean `#3880b8`
- **Aspect lines:** conjunction gold, sextile cerulean `#3e8fc0`, trine teal `#5ab8a8`, square rose `#c89898` dashed, inconjunct ivory dotted
- **Watercolor house fills:** alternating houses get element-tinted blurred circles inside the inner wheel — soft and loose, not geometric
- **Center:** 16-ray golden sunburst (sacred geometry / whimsigoth sun motif)
- **Ribbons:** diagonal amber + cerulean ellipses in the background — Practical Magic energy
- **Fonts:** Cormorant Garamond (display), Inter (labels), Apple Symbols / Segoe UI Symbol / Noto Sans Symbols (glyphs)
- **The feeling:** Practical Magic meets star chart. Willow from Buffy. Phoebe Buffay's apartment wall. Sacred geometry precision + watercolor warmth + whimsigoth celestial energy.

---

### What you need

- Birth date, time, place
- Planet absolute degrees (0–360) from Swiss Ephemeris
- House cusps (Placidus) — 12 absolute degrees
- Retrograde flags (negative speed = retrograde)
- Top 7 natal aspects (sorted by exactness)

---

### Step 1 — Calculate natal chart data

Run from the routine folder:

```bash
cd "/Users/jordanashleybarney/Library/Mobile Documents/iCloud~md~obsidian/Documents/the stars/routine"
python3 - << 'EOF'
import sys, os
os.makedirs("ephe", exist_ok=True)
try:
    import swisseph as swe
except ImportError:
    os.system(f"{sys.executable} -m pip install pyswisseph -q")
    import swisseph as swe
swe.set_ephe_path("ephe")
from datetime import datetime, timezone

# ── UPDATE THESE FOR EACH PERSON ──────────────────────────────────────────
jd = swe.julday(YEAR, MONTH, DAY, UTC_HOUR_DECIMAL)  # birth time in UTC
lat, lon = LATITUDE, LONGITUDE
# ──────────────────────────────────────────────────────────────────────────

SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
         'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']

planets = [(swe.SUN,'Sun'),(swe.MOON,'Moon'),(swe.MERCURY,'Mercury'),
           (swe.VENUS,'Venus'),(swe.MARS,'Mars'),(swe.JUPITER,'Jupiter'),
           (swe.SATURN,'Saturn'),(swe.URANUS,'Uranus'),(swe.NEPTUNE,'Neptune'),
           (swe.PLUTO,'Pluto'),(swe.CHIRON,'Chiron')]

print("=== PLANET DATA ===")
for pid, name in planets:
    r, _ = swe.calc_ut(jd, pid, swe.FLG_SWIEPH|swe.FLG_SPEED)
    si = int(r[0]//30)%12
    sd = int(r[0]%30)
    retro = "true" if r[3]<0 else "false"
    print(f"  {{id:'{name.lower()}', gl:'{name[0]}'+T, deg:{r[0]:.2f}, retro:{retro}, si:{si}, sd:{sd}}},")

nn, _ = swe.calc_ut(jd, swe.MEAN_NODE, swe.FLG_SWIEPH)
si = int(nn[0]//30)%12
print(f"  {{id:'nnode',  gl:'☊'+T, deg:{nn[0]:.2f}, retro:true, si:{si}, sd:{int(nn[0]%30)}}},")

houses, ascmc = swe.houses(jd, lat, lon, b'P')
print(f"\n=== ANGLES ===")
print(f"asc: {ascmc[0]:.2f},  mc: {ascmc[1]:.2f}")
print("cusps:", [round(c,2) for c in houses])
'EOF'
```

**CDT → UTC:** subtract 5h (CDT). E.g., 6:30 PM CDT = 23:30 UTC = 23.5 decimal.

---

### Step 2 — Build the wheel file

Copy `chart-wheel.html` → `natal readings/[name]-wheel.html`.

Open the copy and find the `CHART` constant (near the top of the `<script>` block). Replace it entirely:

```javascript
const CHART = {
  // ── ANGLES ─────────────────────────────────────────────────────────────
  asc: [ASC absolute degree],   // Ascendant — sits at 9 o'clock (left)
  mc:  [MC absolute degree],    // Midheaven — sits near 12 o'clock (top)

  // ── HOUSE CUSPS (Placidus) — 12 values, H1 first ─────────────────────
  cusps: [H1, H2, H3, H4, H5, H6, H7, H8, H9, H10, H11, H12],

  // ── PLANETS ────────────────────────────────────────────────────────────
  // id: internal key (used for aspect lookups)
  // gl: planet glyph + T (T = text variation selector — prevents emoji)
  // deg: absolute ecliptic degree (0–360)
  // retro: true if planet is retrograde (negative speed from swisseph)
  // grp: color group — 'luminary' | 'personal' | 'social' | 'outer' | 'point'
  // si: sign index (0=Aries, 1=Taurus, 2=Gemini ... 11=Pisces)
  // sd: degree within sign (integer, floor of deg%30)
  planets: [
    {id:'sun',     gl:'☉'+T, deg:XX.XX, retro:false, grp:'luminary', si:X,  sd:XX},
    {id:'moon',    gl:'☽'+T, deg:XX.XX, retro:false, grp:'luminary', si:X,  sd:XX},
    {id:'mercury', gl:'☿'+T, deg:XX.XX, retro:false, grp:'personal', si:X,  sd:XX},
    {id:'venus',   gl:'♀'+T, deg:XX.XX, retro:false, grp:'personal', si:X,  sd:XX},
    {id:'mars',    gl:'♂'+T, deg:XX.XX, retro:false, grp:'personal', si:X,  sd:XX},
    {id:'jupiter', gl:'♃'+T, deg:XX.XX, retro:false, grp:'social',   si:X,  sd:XX},
    {id:'saturn',  gl:'♄'+T, deg:XX.XX, retro:false, grp:'social',   si:X,  sd:XX},
    {id:'uranus',  gl:'♅'+T, deg:XX.XX, retro:false, grp:'outer',    si:X,  sd:XX},
    {id:'neptune', gl:'♆'+T, deg:XX.XX, retro:false, grp:'outer',    si:X,  sd:XX},
    {id:'pluto',   gl:'♇'+T, deg:XX.XX, retro:false, grp:'outer',    si:X,  sd:XX},
    {id:'chiron',  gl:'⚷'+T, deg:XX.XX, retro:false, grp:'point',    si:X,  sd:XX},
    {id:'nnode',   gl:'☊'+T, deg:XX.XX, retro:true,  grp:'point',    si:X,  sd:XX},
  ],

  // ── ASPECTS — top 7 natal aspects by orb exactness ────────────────────
  // p1/p2: planet id (or 'mc' / 'asc' for angles)
  // type: 'conjunction' | 'sextile' | 'trine' | 'square' | 'opposition' | 'inconjunct'
  // orb: degrees from exact (float)
  aspects: [
    {p1:'[planet]', p2:'[planet]', type:'[aspect]', orb:X.XX},
    // ... 6 more
  ],
};
```

Also update the page `<title>` and the `.chart-label` / `.chart-sub` text in the HTML body.

---

### Step 3 — Geometry reference (do not change without reason)

The SVG coordinate space is 720×720, center at (360,360). All positions calculated relative to this center.

| Constant | Value | What it is |
|---|---|---|
| `R.rim3` | 354 | Outermost decorative ring |
| `R.elArc` | 347 | Element color arc centerline (7px stroke) |
| `R.rim1` | 340 | Inner decorative ring |
| `R.zodOut` | 328 | Outer edge of zodiac sign band |
| `R.zodMid` | 302 | Sign glyph placement radius |
| `R.zodIn` | 276 | Inner edge of zodiac band |
| `R.cuspLbl` | 265 | House cusp degree labels |
| `R.hNum` | 162 | House numbers (center zone) |
| `R.sepRing` | 240 | Separator ring + cusp marker dots |
| `R.pGlyph` | 244 | Planet glyph placement |
| `R.pLbl` | 258 | Planet degree+sign label |
| `R.asp` | 218 | Inner circle / aspect line endpoints |
| `R.cRing` | 18 | Center rosette ring |
| `R.cDot` | 11 | Center dot |

**ViewBox:** `-22 -22 764 764` — expanded 22px on each side so ASC/MC axis labels don't clip at the edges.

---

### Step 4 — Verify visually

```bash
open "natal readings/[name]-wheel.html"
```

**Checklist:**
- [ ] All 12 sign glyphs visible, colored by element
- [ ] Element arcs on outer rim clearly distinct (fire amber / earth green / air blue / water cerulean)
- [ ] Planets in roughly correct positions — order matters more than exact angle
- [ ] Degree labels and Rx markers readable
- [ ] House cusp lines visible with alternating watercolor fills
- [ ] House numbers visible in the center zone
- [ ] ASC and MC labels fully visible (not clipping)
- [ ] ✦ key button opens side drawer with correct planet/sign data
- [ ] Swipe right on drawer (mobile) closes it
- [ ] Pinch-to-zoom on chart works (mobile)

---

### Step 5 — Commit and push

```bash
cd "/Users/jordanashleybarney/Library/Mobile Documents/iCloud~md~obsidian/Documents/the stars"
git add "natal readings/[name]-wheel.html"
git commit -m "Add [Name] natal chart wheel"
git push origin main
```

**Live URL:** `https://jordanb1993.github.io/astro-readings/natal%20readings/[name]-wheel.html`
GitHub Pages goes live within ~2 minutes of push.

---

### Embedding in natal reading HTML (iframe method)

When ready to integrate the wheel into a natal reading page, add this above the Identity Trio section:

```html
<div style="width:100%;max-width:680px;aspect-ratio:1;margin:0 auto 48px;display:block;">
  <iframe
    src="[name]-wheel.html?embed=1"
    style="width:100%;height:100%;border:none;display:block;"
    loading="lazy"
    title="[Name] Natal Chart Wheel">
  </iframe>
</div>
```

The `?embed=1` parameter hides the page chrome (title, subtitle) and makes the background transparent so it sits naturally inside the reading page.

---

### Mobile capabilities (all built in)

| Feature | How it works |
|---|---|
| Responsive sizing | `min(720px, 96vw)` — fills screen on any device |
| Pinch-to-zoom | `touch-action: pan-x pan-y pinch-zoom` on chart |
| Swipe-to-close key | Swipe right ≥80px on the drawer |
| Momentum scroll in drawer | `-webkit-overflow-scrolling: touch` |
| Body scroll lock | `body.drawer-open` class applied on open |
| Safe area support | `env(safe-area-inset-*)` on button position |
| Touch tap targets | All interactive elements ≥44×44px |
| Landscape mode | Auto-layout: chart left, no chrome |
| iOS backdrop blur | `-webkit-backdrop-filter` on drawer header |
| 300ms tap delay prevention | `touch-action: manipulation` on buttons |
| Embed mode | `?embed=1` strips chrome for iframe use |

---

### Planned Tier 2+ enhancements

- Embed wheel in each natal reading HTML above Identity Trio
- Hover/tap tooltips on planet glyphs (name, sign, degree, house, keyword)
- Aspect line draw animation on load
- Degree tick marks in zodiac band (0°, 10°, 20° per sign)
- Biwheel mode for transit charts

---
## Friends with pending charts

| Name | Birth data status |
|------|-------------------|
| Cat | Needed |
| Mimi | Needed |

Chart data files (sign/degree breakdowns for synastry work) live in `charts/` — separate from the HTML readings here.
