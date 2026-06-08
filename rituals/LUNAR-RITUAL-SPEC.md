# Lunar Ritual Routine — Build Spec
*Ready to implement next session. This file is the brief.*

---

## What This Is

A routine addition that detects New Moons and Full Moons and generates a personalized ritual file using Jordan's natal chart and current sky. Not a generic moon ritual — a specific one, rooted in what house the lunation falls in, what natal points it contacts, and what the current major transits are doing at the same time.

---

## Trigger Logic

Add to `routine/generate-positions.py` (or as a separate step in ROUTINE-UPDATE-INSTRUCTIONS.md):

**Detect:** Is today within 48 hours of a New Moon or Full Moon?
- New Moon = Sun and Moon within 1° of each other (conjunction)
- Full Moon = Sun and Moon within 1° of opposition (180°)
- Use `positions-today.json` Moon and Sun positions to check

**If yes:** generate ritual file before the daily reading. Save to `rituals/YYYY-MM-DD-[new|full]-moon-[sign].md`. Open automatically.

**If no:** skip entirely.

---

## What Goes in the Ritual File

### Frontmatter
```yaml
---
date: YYYY-MM-DD
cssclasses:
  - stars-reading
tags:
  - ritual
  - [new-moon|full-moon]
moon: [Phase] · [Sign] [Degree]°
house: [house number — which of Jordan's houses this lunation falls in]
natal_contact: [closest natal point within 5°, if any]
---
```

### Structure (in this order)

**1. The Sky (2–3 sentences)**
What sign and house is this lunation in? What is the house's domain in Jordan's chart? If it contacts a natal point within 5°, name it. Keep it grounded and specific — not "the Aries Full Moon invites bold new beginnings" but "this Full Moon lands in your 11th house, Aries 22° — close to your natal Lot of Fortune... wait, Fortune is Aquarius. Better: "this Full Moon in Aries 22° lands in your 11th house of community and technology, the house where Lilith lives."

**2. The Thread (1–2 sentences)**
For Full Moons: what was seeded at the New Moon two weeks ago in the opposite sign? What is being revealed or completed now?
For New Moons: what chapter is opening? What house is being activated for the next 6 months (until the corresponding Full Moon)?

**3. The Ritual Invitation (3–5 sentences)**
What does this lunation specifically ask for, given the house and natal contacts? Ground it in Jordan's actual life. Name the specific projects, relationships, or inner work that this house touches.

Examples:
- 11th house New Moon: "The invitation is to initiate something collective — the app, the community reading, something you build for more than yourself."
- 10th house Full Moon: "Something in the career-emotional circuit is completing. This is not the moment to start; it is the moment to release what has served its purpose."
- 5th house: "What creative work has been held back? The 5th house ritual is permission to make the thing without justifying it."

**4. A Practice (simple, embodied, no special materials)**
One specific thing to do. Not vague ("journal about your feelings"). Specific:
- "Write down the thing the inner critic says most often about the work. Burn it or tear it up."
- "Name one person who belongs in the community you're building. Send them something real."
- "Spend 20 minutes on the transit library with no task attached — pure pleasure of the system."
- "Walk without the podcast. Let the Pisces moon do what it does."

**5. Journal Prompts (2–3 questions)**
Personalized to the house and Jordan's current life context. Pull from `life-snapshot.txt` if available to make them specific.

**6. Sky Note (optional — only if a major transit is exact within 3 days of the lunation)**
One paragraph connecting the lunation to the active transit weather. Example: "This Full Moon falls within 3 days of Neptune exact on your natal Moon — the emotional field is unusually porous right now. The ritual is stronger and the boundaries are thinner. Both are true."

---

## House Identification for Lunations

Use `natal-chart.json` house cusps + the Moon's absolute degree from `positions-today.json` to calculate which house the lunation falls in. This is the same `get_house()` logic already in `generate-positions.py`.

---

## Naming Convention

```
rituals/2026-07-10-new-moon-cancer.md
rituals/2026-07-24-full-moon-capricorn.md
```

---

## New Moon / Full Moon Pairs to Track

Each New Moon seeds something; the Full Moon in the same axis 6 months later is the harvest. Log these pairs in a running table in `rituals/wheel-of-the-year.md` as they're generated — so the thread between seed and harvest is visible over time.

---

## Tone

Same voice standards as daily readings: specific over archetypal, implication first, no "you may feel" hedging, present tense, economy. The ritual should feel like it was written by someone who knows Jordan's chart and looked at the sky this morning — not a template completed for the occasion.

---

*Build this next session. All the infrastructure is ready: natal-chart.json has house cusps, generate-positions.py calculates Moon/Sun positions, READING-FORMAT.md has the Ritual SOP stub. This spec fills in the personalization layer.*
