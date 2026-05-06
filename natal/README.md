# natal/ — Birth Chart Readings

This folder contains full natal chart reading HTMLs in the v2 whimsigoth vaporwave W95 aesthetic.

## Template

**`jordan.html`** is the canonical template. When building a friend's chart, copy this structure and swap in their placements and interpretive content.

## Structure of a natal reading HTML

1. **Identity Trio** — 3-column grid: Sun card / Moon card / Rising card (sign, degree, house)
2. **Chart Signature panel** — chart ruler, stelliums, anaretic degrees, 7th house notes
3. **Natal Planets strip** — all placements at a glance
4. **Key Natal Aspects strip** — tightest natal aspects with orb tightness bars
5. **Collapsible sections** (one per major planet/axis) — same v2 collapse/reveal mechanics as transit readings; each has a theme tag
6. **Summary section** — overall chart synthesis

## What's needed for a friend's chart

- Full name (or nickname)
- Birth date (month, day, year)
- Birth time (as exact as possible — Ascendant and house placements change with time)
- Birth city/location

Without birth time: Sun, Moon, and all outer planet placements are still accurate. Rising sign, houses, and Midheaven cannot be calculated.

## Friends with pending charts

| Name | Status |
|------|--------|
| Kate | Birth data needed |
| Marina | Birth data needed |
| Cat | Birth data needed |
| Mimi | Birth data needed |
| Carina | Birth data needed |

Chart data files (sign/degree breakdowns for synastry) live in `charts/` — separate from the HTML readings here.
