# Routine Update Instructions
_Current prompt for the daily 4am reading routine — last updated May 30, 2026_

---

## Where to update

Go to `claude.ai/code/routines` → find routine `trig_01Rtm1xSST2GbdCZh896F2vP`

---

## Full routine prompt (replace existing with this)

```
1. Clone the repo:
   cd /tmp && rm -rf stars && git clone https://github.com/jordanb1993/astro-readings.git stars
   cd stars

2. Run the position calculator:
   pip install pyswisseph -q
   python3 routine/generate-positions.py

3. Read the output files from routine/:
   - positions-today.json     → full planet positions + transit-to-natal + t2t aspects
   - positions-week.json      → aspects approaching exact in next 7 days
   - active-transits.txt      → one-liner for CLAUDE.md patch
   - workspace-digest.txt     → 5-line digest for the bones
   - life-snapshot.txt        → Jordan's current life context (spoke status from the bones)
                                READ THIS before writing the reading — ground Practical Application
                                in what's actually happening in her life right now

4. Write "daily readings/YYYY-MM/YYYY-MM-DD.md" using positions-today.json data.
   Create the directory first:
     mkdir -p "daily readings/YYYY-MM"
   (substitute real year-month, e.g. "daily readings/2026-05")
   Follow the format in CLAUDE.md exactly.
   Transit-to-natal aspects from positions-today.json → transit_to_natal array.
   Transit-to-transit observations from transit_to_transit array.
   Chiron is calculated precisely — no estimates needed.

   CRITICAL — applying/separating verification (do this before writing):
   The JSON "applying" field is computed by generate-positions.py. Before using it,
   independently verify EVERY slow-planet aspect (Saturn, Uranus, Neptune, Pluto, Chiron)
   by comparing today's orb to the most recent previous reading:
     - If today's orb is SMALLER than yesterday's → applying ✓
     - If today's orb is LARGER than yesterday's → separating ✓
   If the JSON label and the orb trend disagree, trust the orb trend. Correct the label
   in your reading. Never write "applying" and "wider than yesterday" in the same sentence —
   those are contradictory; that contradiction means the JSON label is wrong.

   LANGUAGE VARIETY — do not repeat phrases across consecutive readings:
   Read the most recent previous reading (step 4 of CLAUDE.md session protocol) and
   avoid repeating its distinctive phrases, metaphors, or structural patterns. Each
   reading should feel like a fresh voice even when covering the same ongoing transits.
   Ongoing transits (Uranus-Sun, Neptune-Moon, etc.) need a new angle each day:
   different facet of the meaning, different house emphasis, different practical hook.
   Do not open consecutive readings with the same transit or the same framing.

   CORRELATIONS TO TRACK — no-repeat rule:
   The "Correlations to Track" section must NOT re-list correlations that already appeared
   in the previous reading unchanged. Rules:
     - If a correlation was listed yesterday and nothing has changed (same orb band, same
       theme), skip it or upgrade it: name what has changed, what's been observed, or
       what the next marker to watch for is.
     - Ongoing slow transits (Neptune-Moon, Uranus-Sun) should generate AT MOST one
       correlation entry per week, not one per day. If it was listed yesterday, drop it
       today unless the orb crossed a meaningful threshold or something happened.
     - Correlations should be FORWARD-LOOKING and SPECIFIC to today: what exactly to
       watch for IN THE NEXT 24 HOURS, not a standing order to "track over weeks."
     - If there's nothing new to track for a given transit today, omit it rather than
       repeating the same prompt with slightly different wording.

5. Write "weekly readings/YYYY-MM-DD-week-ahead.md" using positions-week.json.
   Use the date of the COMING Monday as the filename date (e.g. "weekly readings/2026-06-01-week-ahead.md").
   Only write this file on Sundays — skip on other days.
   Format: see template below.

6. Patch CLAUDE.md active transits line:
   Replace the line beginning with "Active transits as of" in CLAUDE.md with the
   content of active-transits.txt. The line is inside the "Current Situation Snapshot" section.

7. Commit and push:
   git add -A && git commit -m "reading + week-ahead + patches YYYY-MM-DD" && git push origin main
```

---

## Week-ahead file format ("weekly readings/YYYY-MM-DD-week-ahead.md")

```markdown
---
cssclasses: stars-reading
date: YYYY-MM-DD
type: week-ahead
---

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

*Generated: [date] | Full daily readings in "daily readings/YYYY-MM/YYYY-MM-DD.md"*
```

---

## CLAUDE.md active transits auto-patch rule

Find the line beginning with `Active transits as of` in CLAUDE.md (inside the Current Situation Snapshot section) and replace the entire line with the content of `active-transits.txt`.

---

## Monday workplace digest

On Mondays only, after writing the personal reading, also generate:
`"workplace readings/YYYY-MM-DD-week.md"`
and
`"workplace readings/YYYY-MM-DD-week-slack.md"`

Use the transit-to-transit aspects from `positions-today.json → transit_to_transit`.
Format documented in `"workplace readings/README.md"`.

---

## Chiron note

`generate-positions.py` downloads `seas_18.se1` from GitHub on first run and caches it in `routine/ephe/`. Subsequent runs use the cached file. Chiron appears as a real calculated value — no estimates.

---

## Important: shell quoting

All folder names with spaces must be quoted in shell commands:
- `"daily readings/YYYY-MM/"`
- `"natal readings/"`
- `"weekly readings/"`
- `"workplace readings/"`
- `"synastry readings/"`
- `"tarot readings/"`
- `"the build/"`

The `git add -A` command handles all files regardless of spaces — no per-file quoting needed for the commit step.
