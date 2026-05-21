# natal/ — Birth Chart Readings

This folder contains full natal chart reading HTMLs in the whimsigoth aesthetic. Each chart is also hosted live on GitHub Pages at `jordanb1993.github.io/astro-readings/natal/[name].html`.

## Completed charts

| Name | File | Live URL | Notes |
|------|------|----------|-------|
| Jordan | `jordan-natal.html` | — | Canonical visual template (original build) |
| Dasha | `dasha.html` | `jordanb1993.github.io/astro-readings/natal/dasha.html` | Noon chart, time unconfirmed |
| Iza | `iza.html` | `jordanb1993.github.io/astro-readings/natal/iza.html` | Confirmed birth time |
| Su | `su.html` | `jordanb1993.github.io/astro-readings/natal/su.html` | Confirmed birth time |

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

- Written for the friend to read, not as a report about them
- Lead with implication, not description: "The motivation moves below the surface" not "Mars in Pisces is often internalized"
- State exact degrees in the technical lines (subtitle, aspects table) but let the prose breathe
- No em dashes unless they earn it. Use colons for elaboration, commas for appositives, periods when in doubt
- Pull quotes: one sentence that holds the whole section's truth. Cormorant Garamond italic. Should feel like something to write on a mirror.
- Friends' charts: warm, accessible, written to land emotionally. Jordan's own readings: clean, technical, no emojis.

### Step 7 — After writing

1. Run `open "[filepath]"` to open in browser and check visually
2. Commit to GitHub: `git add natal/[name].html && git commit -m "Add [Name] natal chart" && git push origin main`
3. Share the live URL: `jordanb1993.github.io/astro-readings/natal/[name].html`
4. GitHub Pages goes live within ~2 minutes of push

---

## Friends with pending charts

| Name | Birth data status |
|------|-------------------|
| Kate | Needed |
| Marina | Needed |
| Cat | Needed |
| Mimi | Needed |
| Carina | Needed |

Chart data files (sign/degree breakdowns for synastry work) live in `charts/` — separate from the HTML readings here.
