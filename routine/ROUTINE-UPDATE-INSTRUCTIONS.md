# Routine Update Instructions
_How to upgrade the daily 4am reading routine with all 4 improvements_

---

## Where to update

Go to `claude.ai/code/routines` → find routine `trig_01Rtm1xSST2GbdCZh896F2vP`

---

## What the updated routine should do (replace existing prompt with this)

```
1. Clone the repo:
   cd /tmp && git clone https://github.com/jordanb1993/astro-readings.git stars
   cd stars

2. Run the position calculator:
   pip install pyswisseph -q
   python3 routine/generate-positions.py

3. Read the output files from routine/:
   - positions-today.json     → full planet positions + transit-to-natal + t2t aspects
   - positions-week.json      → aspects approaching exact in next 7 days
   - active-transits.txt      → one-liner for CLAUDE.md patch
   - workspace-digest.txt     → 5-line digest for Personal Life HQ
   - life-snapshot.txt        → Jordan's current life context (flags + spoke status pulled from Personal Life HQ)
                                READ THIS before writing the reading — use it to ground Practical Application
                                in what's actually happening in her life right now

4. Write readings/daily/YYYY-MM/YYYY-MM-DD.md using positions-today.json data.
   First create the directory: mkdir -p readings/daily/YYYY-MM (substitute real year-month, e.g. readings/daily/2026-05)
   Follow the format in CLAUDE.md exactly.
   Transit-to-natal aspects from positions-today.json → transit_to_natal array.
   Transit-to-transit aspects from transit_to_transit array.
   Chiron is now exact (no more estimates — the ephe file downloads automatically).

5. Write readings/week-ahead.md using positions-week.json.
   Format: see template below.

6. Patch CLAUDE.md active transits line:
   Replace the "Active transits as of [date]:" line with the content of active-transits.txt.

7. Write workspace-digest.txt content to:
   /Users/jordanashleybarney/Library/Mobile Documents/iCloud~md~obsidian/Documents/Personal Life HQ/the-stars-daily.md
   (this is the iCloud path — write directly, Obsidian picks it up automatically)

8. On Mondays only: also write readings/workplace/YYYY-MM-DD-week.md
   (see workplace digest format in readings/workplace/README.md)

9. git add -A && git commit -m "reading + week-ahead + patches YYYY-MM-DD" && git push origin main
```

---

## Week-ahead file format (readings/week-ahead.md)

```markdown
# Week Ahead — [Mon Date] through [Sun Date]

> [2-sentence overview of the week's dominant energy — what themes the sky is running]

---

## Approaching Exact This Week

| Date | Day | Transit | Aspect | Natal Point | Orb at Peak |
|------|-----|---------|--------|-------------|-------------|
[pulled from positions-week.json → upcoming_exact_aspects]

---

## The Week's Dominant Themes

**[Theme 1 title]** — [2-3 sentences: what it means, when it peaks, practical application]

**[Theme 2 title]** — [2-3 sentences]

**[Theme 3 title]** — [2-3 sentences]

---

## Day-by-Day Texture

**Monday:** [one sentence — transit weather]
**Tuesday:** [one sentence]
**Wednesday:** [one sentence]
**Thursday:** [one sentence]
**Friday:** [one sentence]
**Weekend:** [one sentence covering both days]

---

*Generated: [date] | Full daily readings in readings/daily/YYYY-MM/YYYY-MM-DD.md*
```

---

## CLAUDE.md auto-patch rule

Find the line beginning with `**Active transits as of` in CLAUDE.md and replace the entire line (up to the next blank line) with the content of `active-transits.txt`.

---

## Personal Life HQ cross-workspace file

Write to:
`/Users/jordanashleybarney/Library/Mobile Documents/iCloud~md~obsidian/Documents/Personal Life HQ/the-stars-daily.md`

This file is automatically picked up by Obsidian in the Personal Life HQ vault.
Format is already written by `workspace-digest.txt` — write it verbatim.

---

## Chiron fix note

`generate-positions.py` downloads `seas_18.se1` from astro.com on first run and caches it in `routine/ephe/`. Subsequent runs use the cached file. If the download fails, it falls back to the Moshier ephemeris (less precise but no estimate needed). Chiron should now appear as a real calculated value in every reading.

---

## Monday workplace digest

On Mondays only, after writing the personal reading, also generate:
`readings/workplace/YYYY-MM-DD-week.md`

Use the transit-to-transit aspects from `positions-today.json → transit_to_transit`.
Format documented in `readings/workplace/README.md`.
