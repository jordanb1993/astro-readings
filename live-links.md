---
cssclasses: stars-reading
---

# Live Links — Hosted on Netlify

All pages live at `astrologyos.netlify.app` — open in any browser, always fresh, mobile-friendly. No cache issues.

---

## Weekly Live Pages

These auto-update every Sunday at 4am CDT via the daily routine. Same URL every week, new content.

**Your Week Ahead** *(personal, transit-to-natal)*
[week-ahead.html](https://astrologyos.netlify.app/readings/week-ahead.html)
Day-by-day exact aspects · active transit strip · Jordan's natal chart only · private bookmark

**Sky at Work** *(public, transit-to-transit)*
[sky-at-work.html](https://astrologyos.netlify.app/workplace%20readings/sky-at-work.html)
Collective sky · work framing · shareable with anyone · links in Monday Slack message

---

## Natal Chart Readings

Static pages — updated only when a new chart is built or revised.

**Jordan** *(v3 — Tier 1 shell, June 9 2026)*
[jordan.html](https://astrologyos.netlify.app/natal%20readings/jordan.html)
Sagittarius Sun · Aries Moon · 29° Gemini Rising · Scorpio stellium · scrollable nav · accent color system

**Jordan** *(v1 — kept for reference only)*
[jordan-natal.html](https://astrologyos.netlify.app/natal%20readings/jordan-natal.html)

**Dasha Shareyko**
[dasha.html](https://astrologyos.netlify.app/natal%20readings/dasha.html)
Sagittarius Sun · Scorpio Moon · Pisces Rising (approx.) · noon chart

**Iza**
[iza.html](https://astrologyos.netlify.app/natal%20readings/iza.html)
Pisces Sun · Aries Moon · Sagittarius Rising · Chiron exact on MC

**Su**
[su.html](https://astrologyos.netlify.app/natal%20readings/su.html)
Gemini Sun · Aries Moon · Taurus Rising · Venus in 1st

**Marina LaRusso**
[marina.html](https://astrologyos.netlify.app/natal%20readings/marina.html)
Leo Sun · Sagittarius Moon · Libra Rising · Jupiter conjunct ASC

**Kate Penkethman**
[kate.html](https://astrologyos.netlify.app/natal%20readings/kate.html)
Libra Sun · Scorpio Moon · Libra Rising · Sun in 12th house

**Hazel Grace**
[hazel.html](https://astrologyos.netlify.app/natal%20readings/hazel.html)
Taurus Sun · Virgo Moon · 29° Aquarius Rising

**Yvonne** *(coworker)*
[yvonne.html](https://astrologyos.netlify.app/natal%20readings/yvonne.html)
Cancer Sun · Libra Moon · Sagittarius Rising · Sun opposite Neptune exact

**Carina**
[carina.html](https://astrologyos.netlify.app/natal%20readings/carina.html)
Gemini Sun · Pisces Moon · Scorpio Rising · Jupiter in 10th

**Mimi**
[mimi.html](https://astrologyos.netlify.app/natal%20readings/mimi.html)
Aries Sun · Leo Moon · Scorpio Rising · fire grand trine · NNode exact sextile MC · Venus/Saturn Pisces H4

---

## Chart Wheels

**Carina — Chart Wheel**
[chart-wheel.html](https://astrologyos.netlify.app/natal%20readings/chart-wheel.html)
Gemini Sun · Pisces Moon · Scorpio Rising

---

## Pending Charts

Birth data still needed: Cat, Krista

---

## Build Notes

- **New natal chart (v3):** use `jordan.html` as template — it is the current shell standard (Tier 1: CSS tokens, accent colors, scrollable nav, slot architecture). Follow `natal readings/README.md` for SOP.
- **Hosting:** Netlify (`astrologyos.netlify.app`) — auto-deploys on every push to `main`, no-cache headers on all HTML, always fresh on all devices
- **GitHub repo:** `github.com/jordanb1993/astro-readings` (private)
- **Deploy time:** ~30 seconds after push
- **Monday Slack draft:** auto-generated to `workplace readings/slack-draft.md` each Sunday
