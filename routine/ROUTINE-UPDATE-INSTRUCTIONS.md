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

4. Before writing, read three files from the cloned repo:
   - READING-FORMAT.md → the daily reading format spec (sky-responsive format, transit board table,
     length tiers, prose body, today block). Follow this exactly. The format changed June 8, 2026 —
     CLAUDE.md no longer contains the format spec; READING-FORMAT.md is the source of truth.
   - transit library/INDEX.md → the active long-term transit list with breakdown file slugs.
     Use wikilinks in the transit board for any transit that has a breakdown file:
     format: → [[transit-file-slug]]  (e.g. → [[neptune-conjunct-moon]])
   - "the build/voice-canon.md" → Jordan's accumulated reading quality standards and voice rules.
     Read this before writing every reading. It contains the Voice DNA, sentence rhythm rules,
     earned metaphor standards, and all refinements logged from previous readings.
     The reading quality standard is set here — match it.

   Write "daily readings/YYYY-MM/YYYY-MM-DD.md" using positions-today.json data.
   CRITICAL: The reading title format is one evocative phrase written fresh each day — NOT
   "[Weekday], [Month] [Day], [Year]". Use the date in the frontmatter (date: YYYY-MM-DD).
   The file name is the date. The H1 title is a fresh phrase that captures the sky's quality.
   Create the directory first:
     mkdir -p "daily readings/YYYY-MM"
   (substitute real year-month, e.g. "daily readings/2026-06")
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

   LONG-TERM TRANSIT HANDLING — no-repeat rule:
   Long-term transits (Neptune-Moon, Uranus-Sun, Chiron-Ascendant, etc.) appear in the
   transit board as a single row with a wikilink → [[breakdown-file]]. They do NOT get
   re-explained in the prose body — the breakdown file holds the depth. Rules:
     - Transit board row: planet + aspect + natal point + orb + one-phrase essence + wikilink.
       Nothing more in the board.
     - Prose body should NOT re-explain what the breakdown file covers. Interpret what today's
       specific orb/sky adds — a new angle, a specific moment, what today brings that
       yesterday didn't. Not a standing description.
     - If a long-term transit's orb hasn't moved meaningfully (< 0.1° change) and nothing
       in life context connects to it today, put it in the board and leave it out of the prose.
     - Prose earns long-term transit presence by having something genuinely new to say about it today.

5. TRANSIT LIBRARY AUTO-DETECTION — run this before writing the reading:

   a. List all existing breakdown files:
      ls "transit library/"
      This gives you the slugs of what already exists.

   b. From positions-today.json → transit_to_natal array, find every aspect where:
      - transiting planet is one of: Saturn, Uranus, Neptune, Pluto, Chiron, North Node
      - orb ≤ 2.0°

   c. For each such aspect, check if a corresponding file exists in transit library/.
      Naming convention: [transiting-planet-lowercase]-[aspect-word]-[natal-point-lowercase].md
      Examples: neptune-conjunct-moon.md, saturn-conjunct-moon.md, uranus-opposition-sun.md

   d. If a transit meets the 2° threshold AND no file exists:
      - Create the file using transit library/_template.md as the base
      - Fill in all frontmatter fields from the JSON data (transiting planet, natal planet,
        natal house, aspect type, current orb, whether applying/separating)
      - Write a Signal section (1 sentence: what this transit is doing to this natal point)
      - Leave the remaining sections as template stubs — Jordan will flesh them out
      - Add a row to transit library/INDEX.md under "Active Long-Term Transits"
      - Note: the stub file is better than no file — daily readings can wikilink to it immediately

   e. If all transits within 2° already have files: skip this step.

   This step ensures the transit library never falls behind the sky.

6. PATCH transit library/INDEX.md orb values — run this after step 5, before writing the reading:

   For every row in the "Active Long-Term Transits" table in INDEX.md:
   a. Find the matching transit in positions-today.json → transit_to_natal
   b. Read today's orb from the JSON (field: "orb_degrees")
   c. Determine applying/separating by comparing today's orb to the PREVIOUS reading's orb
      (not the JSON "applying" field — verify by trend as in step 4)
   d. Update the INDEX.md row: replace the Orb column value with today's orb + applying/separating
      Example: **0.78° applying** → **0.51° applying**  (or → 0.91° separating if trend reversed)
   e. Update the "(June 8)" or similar date label in the column header to today's date
   f. If a transit's orb has grown past 5° separating: move it to "Recently Completed"
   g. If a transit previously in "Upcoming" has entered 2° orb: move it to "Active"

   The INDEX.md is always-loaded — stale orbs degrade every session's accuracy.
   This patch should take 2–3 minutes and must happen before the reading is written.

7. Write "today.json" to the repo root.

   This powers the Daily tab in the AstroFlow app (pathfinderastro.vercel.app). Write it every day.
   Source all values from the reading you just wrote + positions-today.json. Do NOT skip this step.

   Format — write exactly this structure to "today.json":
   {
     "date": "YYYY-MM-DD",
     "title": "[the H1 title from the daily reading — the evocative phrase, not a date string]",
     "moon_phase": "[phase part of the frontmatter moon field, before the · separator]",
     "moon_sign": "[sign part of the frontmatter moon field, after the · separator]",
     "moon_glyph": "☽",
     "pulse": "[the italic opening paragraph from the reading — the lines between H1 and the first --- divider, stripped of markdown italics markers]",
     "key_transit": "[the highest-priority transit from the reading — the one the prose centers on — formatted as 'Planet △ natal Point' or appropriate aspect glyph]",
     "key_transit_note": "[orb + applying/separating, e.g. '0.02° · exact window is now']",
     "prose": [
       "[paragraph 1 of the prose body — full text, no markdown formatting]",
       "[paragraph 2]",
       "[paragraph 3]",
       "[paragraph 4 if present]"
     ],
     "pull": "[the blockquote text if present, stripped of the > marker and surrounding whitespace. Omit this field if no blockquote in the reading]",
     "today": {
       "business": "[the Business line from the today block, stripped of the '- Business:' prefix]",
       "creative": "[the Creative line, stripped of prefix]",
       "body": "[the Body line, stripped of prefix]"
     },
     "active_transits": [
       // Include ALL transit-to-natal aspects from positions-today.json where orb_degrees ≤ 1.5
       // Sort by orb ascending (tightest first)
       // Each entry:
       { "glyph": "[planet Unicode glyph]", "label": "[Planet △ natal Point (Hnn)]", "orb": "[X.XX°]", "direction": "[applying OR separating]" }
     ],
     "transiting_positions": [
       // ALL 12 bodies from positions-today.json → positions
       // Used by the biwheel chart renderer in the Transits panel
       // Include every planet regardless of whether it forms an aspect
       // Each entry — pull directly from positions-today.json:
       { "planet": "[name]", "glyph": "[Unicode glyph]", "deg": [absolute 0-360 zodiac degree as number], "sign": "[sign name]", "formatted": "[e.g. 19.52° Gemini]", "retrograde": [true or false] }
       // Order: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Chiron, NNode
     ]
   }

   Planet glyphs reference: ☉ Sun, ☽ Moon, ☿ Mercury, ♀ Venus, ♂ Mars, ♃ Jupiter, ♄ Saturn, ♅ Uranus, ♆ Neptune, ♇ Pluto, ⚷ Chiron, ☊ NNode

8. Write "transits.json" to the repo root.

   This powers the Transits tab in the AstroFlow app. Write it every day. The app uses this for
   the list view (all active transits) and detail view (full reading per transit).

   Include ALL slow-planet transit-to-natal aspects from positions-today.json where orb_degrees ≤ 2.5
   and the transiting planet is one of: Jupiter, Saturn, Uranus, Neptune, Pluto, Chiron, North Node.
   Sort by orb ascending.

   For each transit, check if a transit library file exists (transit library/[slug].md).
   Slug format: [transiting-planet-lowercase]-[aspect-word]-[natal-point-lowercase].md
   (e.g. jupiter-trine-pluto.md, pluto-sextile-moon.md)

   If the file EXISTS: extract the reading content from it for the "reading" field (first 3
   substantial paragraphs of prose — skip frontmatter, headers, and any template stubs).
   If NO file exists: write 2–3 original sentences for the "reading" field as a placeholder.

   Format:
   {
     "generated": "YYYY-MM-DD",
     "current": [
       {
         "id": "[transiting-planet-lowercase]-[aspect-word]-[natal-point-lowercase]",
         "glyph": "[planet glyph]",
         "transit_planet": "[e.g. Jupiter]",
         "transit_sign": "[e.g. Cancer]",
         "transit_deg": "[e.g. 25°42']",
         "aspect": "[e.g. Trine]",
         "aspect_glyph": "[△ / ✶ / □ / ☌ / ☍ / ⚻ / □/ etc]",
         "natal_point": "[e.g. Pluto]",
         "natal_sign": "[e.g. Scorpio]",
         "natal_house": "[e.g. H6]",
         "orb": "[e.g. 0.02°]",
         "direction": "[applying OR separating]",
         "exact_date": "[YYYY-MM or YYYY-MM-DD if known from the transit library file or INDEX.md — omit if unknown]",
         "keywords": ["[3–5 keywords from the transit library file, or generate from the aspect meaning]"],
         "summary": "[1–2 sentence essence — the single most important thing about this transit right now]",
         "reading": "[full reading prose for the detail view — 2–4 paragraphs. From transit library file if it exists, otherwise original. No markdown headers. Paragraphs separated by \\n\\n]",
         "passes": [
           // Only include if the transit is multi-pass (retrograde-driven) or has a known exact date
           // Each pass: { "label": "First pass", "date": "Month YYYY", "status": "complete OR exact now OR upcoming" }
           // Leave passes array empty [] or omit entirely for simple direct transits
         ]
       }
     ],
     "historical": []
   }

   The "historical" array stays empty for now. It will be populated in a future phase when
   past transits are archived.

9. Write "weekly readings/YYYY-MM-DD-week-ahead.md" using positions-week.json.
   Use the date of the COMING Monday as the filename date (e.g. "weekly readings/2026-06-01-week-ahead.md").
   Only write this file on Sundays — skip on other days.
   Format: see template below.

10. Patch CLAUDE.md active transits line:
   Replace the line beginning with "Active transits as of" in CLAUDE.md with the
   content of active-transits.txt. The line is inside the "Current Situation Snapshot" section.

11. SELF-CHECK before committing — read your completed reading and verify every item:

   ACCURACY:
   □ Every slow-planet aspect (Saturn/Uranus/Neptune/Pluto/Chiron) has applying/separating
     verified against orb trend — NOT just from the JSON label. If orb is wider than
     yesterday: separating. If narrower: applying. Correct any mismatch.
   □ No separating transit >5° appears in the transit board.
   □ All orb values match positions-today.json — no eyeballed or approximate figures.
   □ Transit-to-transit aspects are labeled "(transit-to-transit)" and derived from Planets
     list — not from the Aspects tab which only shows transit-to-natal.

   FORMAT:
   □ Title (H1) is a fresh evocative phrase, NOT a date string like "Monday, June 9, 2026".
   □ Frontmatter contains: date, cssclasses, tags, moon.
   □ Transit board is a markdown table with columns: transit | orb | [essence/link].
   □ Long-term transits in the board have a wikilink → [[breakdown-slug]], not a full description.
   □ Prose body has no section headers — flowing paragraphs only.
   □ Today block has ≤3 items, each is one line, each has a category label.
   □ Pull quote (if present) is a > blockquote and is genuinely earned — not routine.

   VOICE:
   □ No phrase or framing that appeared in yesterday's reading is repeated today.
   □ Long-term transits in the prose have a NEW angle today — not a re-explanation of the
     breakdown file content.
   □ No "you may feel" / "this might bring" hedging language.
   □ No generic horoscope phrases disconnected from Jordan's specific natal chart.

   APP JSON:
   □ today.json exists at repo root with today's date, non-null title, at least 2 prose paragraphs.
   □ transits.json exists at repo root with "generated" matching today's date.
   □ transits.json "current" array has at least the slow-planet transits listed in INDEX.md.
   □ Every transit in transits.json with an existing library file has prose from that file (not placeholder).

   If any item fails: fix it before proceeding to the commit.

12. Commit and push — Vercel deploys automatically:

   git add -A && git commit -m "reading + today.json + transits.json + patches YYYY-MM-DD" && git push origin main

   That's it. Vercel watches the GitHub repo and deploys within ~30 seconds of every push.
   No CLI, no tokens, no draft/promote dance. The app is live at pathfinder.vercel.app
   (or whatever the project URL is — check live-links.md for the current canonical URL).
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
