---
cssclasses: stars-reading
---

# Live Links — Hosted on Netlify

All pages live at `astrologyos.netlify.app` — open in any browser, always fresh, mobile-friendly.

---

## The App

**Astrology OS** *(your full personal app)*
[jordan.html](https://astrologyos.netlify.app/natal%20readings/jordan.html)
Home · Daily · Transits · Natal Chart — live data from 4am routine · Sagittarius Sun · Aries Moon · 29° Gemini Rising

---

## Weekly Live Pages

Auto-update every Sunday at 4am CDT via the daily routine. Same URL every week, new content.

**Sky at Work** *(public, transit-to-transit)*
[sky-at-work.html](https://astrologyos.netlify.app/workplace%20readings/sky-at-work.html)
Collective sky · work framing · shareable with anyone · links in Monday Slack message

---

## Natal Chart Readings — Friends

Static pages — updated only when a chart is built or revised.

**Dasha Shareyko** — [dasha.html](https://astrologyos.netlify.app/natal%20readings/dasha.html)
Sagittarius Sun · Scorpio Moon · Pisces Rising (approx.) · noon chart

**Iza** — [iza.html](https://astrologyos.netlify.app/natal%20readings/iza.html)
Pisces Sun · Aries Moon · Sagittarius Rising · Chiron exact on MC

**Su** — [su.html](https://astrologyos.netlify.app/natal%20readings/su.html)
Gemini Sun · Aries Moon · Taurus Rising · Venus in 1st

**Marina LaRusso** — [marina.html](https://astrologyos.netlify.app/natal%20readings/marina.html)
Leo Sun · Sagittarius Moon · Libra Rising · Jupiter conjunct ASC

**Kate Penkethman** — [kate.html](https://astrologyos.netlify.app/natal%20readings/kate.html)
Libra Sun · Scorpio Moon · Libra Rising · Sun in 12th

**Hazel Grace** — [hazel.html](https://astrologyos.netlify.app/natal%20readings/hazel.html)
Taurus Sun · Virgo Moon · 29° Aquarius Rising

**Yvonne** *(coworker)* — [yvonne.html](https://astrologyos.netlify.app/natal%20readings/yvonne.html)
Cancer Sun · Libra Moon · Sagittarius Rising · Sun opposite Neptune exact

**Carina** — [carina.html](https://astrologyos.netlify.app/natal%20readings/carina.html)
Gemini Sun · Pisces Moon · Scorpio Rising · Jupiter in 10th

**Mimi** *(canonical v3 template)* — [mimi.html](https://astrologyos.netlify.app/natal%20readings/mimi.html)
Aries Sun · Leo Moon · Scorpio Rising · fire grand trine · NNode exact sextile MC

---

## Chart Wheels

**Carina** — [chart-wheel.html](https://astrologyos.netlify.app/natal%20readings/chart-wheel.html)

---

## Pending Charts

Birth data still needed: **Cat**, **Krista** (have Sun + Rising, need birth date/time/location)

---

## Build Notes

- **New natal chart:** use `mimi.html` as the template — canonical v3 as of June 2026
- **Hosting:** Netlify (`astrologyos.netlify.app`) · deploy via 4am routine (CLI + API restore)
- **GitHub repo:** `github.com/jordanb1993/astro-readings` (private)
- **App data:** `today.json` + `transits.json` at repo root — written nightly by routine
- **Routine:** `claude.ai/code/routines` → `trig_01Rtm1xSST2GbdCZh896F2vP`
