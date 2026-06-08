# CLAUDE-WORKPLACE-HTML.md — Workplace Transit Reading + sky-at-work.html Spec
*Load only for workplace reading sessions and sky-at-work.html rebuild/update tasks.*
*Do not load for personal daily readings or natal chart builds.*
*Last updated: June 8, 2026*

---

## What This Is

Two connected deliverables managed here:

1. **#astroflow-weekly content** — weekly transit reading written for Jordan's Everflow colleagues. Shared in Slack. Collective sky (no birth charts). Professional framing. Jordan writes these under her own name.

2. **sky-at-work.html** — the HTML deliverable version of the workplace reading. More detailed than the Slack drop. Canonical template built through sessions Apr–June 2026. Located at `workplace readings/sky-at-work.html`.

The Slack drop is a short extract from the HTML reading — not a separate piece. Write the HTML first, then extract the Slack version.

---

## Workplace Transit Reading SOP

**Trigger:** Jordan asks for a workplace reading, it's Monday, or she's building the weekly Slack post.

**Target audience:** Everflow colleagues — predominantly professional, sales + marketing + partnerships context. Most have zero astrology background. Nobody has shared their birth chart. This is collective sky only.

**Frame:** The sky is a shared weather system. These transits are affecting everyone in the Northern Hemisphere this week. Jordan isn't telling them what their personal chart means — she's describing what the weather is and how to navigate it professionally.

**Pre-writing steps:**
1. Fetch live planet positions (same source: astrolibrary.org/current-planets/)
2. Identify the 2–4 most professionally relevant transits for the week
3. Exclude: highly personal transits (Moon-Chiron, Neptune-personal-planet), anything requiring chart context to make sense
4. Include: Venus/Mars/Mercury ingresses, major outer planet stations, Sun aspects, significant conjunctions visible to the collective

**Tone:** Grounded, curious, slightly playful. Not woo-coded. Not a corporate horoscope. Professionally intelligent people who are interested in patterns and timing — meet them there. The goal is "huh, interesting, I'm going to think about that" not "the stars say."

**Professional framing examples:**
- "Mercury direct this week — good time to finalize contracts you've been sitting on"
- "Venus into Cancer: the care you put into client relationships registers this week more than usual"
- "Mars in Leo: big energy for pitches and presentations — match the room's readiness"

**What to avoid:**
- Generic "big changes are coming" language
- Anything that sounds like a fortune (predictive claims without grounding)
- Personal emotional content (this is work-Jordan)
- Long philosophical asides about the nature of astrology

---

## Signal Board Format

The Signal Board is the core visual element of sky-at-work.html. It shows the week's top transits at a glance.

**Format (HTML table rendered as styled signal board):**

| Planet | Transit | Days Active | Professional Read |
|--------|---------|-------------|-------------------|
| [symbol] [planet] | [aspect or ingress] | [Mon–Fri or specific days] | [one-line professional implication] |

**Selection rules:**
- 3–5 rows maximum
- Only include transits with clear professional implications
- Exact contacts (0–1° orb): always include
- Applying within 2°: include with timing note
- Separating >3°: exclude from signal board (already peaked)
- Moon is included only for the week's most significant Moon phase/sign
- Always list by decreasing weight (most significant transit first)

**Signal board visual indicators (HTML classes):**
- `signal-exact` — 0–0.5° orb: amber row highlight
- `signal-applying` — 0.5–2° orb: default
- `signal-separating` — 2–5° orb: dimmed row
- Chiron contacts: amber signal row regardless of orb (Chiron signals are tracked distinctly)

---

## Deep Dive Sections

After the signal board, sky-at-work.html has 2–3 deep dive sections: one per major transit being covered that week.

**Deep dive format:**
```html
<section class="transit-dive">
  <div class="dive-header">
    <span class="planet-glyph">[symbol]</span>
    <h3>[Transit Name]</h3>
    <span class="orb-badge">[X.X° applying/separating]</span>
  </div>
  <div class="dive-body">
    <p>[3–5 sentences: what this transit is, what it means for the week]</p>
    <p>[Professional implication: specific, actionable]</p>
  </div>
</section>
```

**Dive writing rules:**
- Lead with implication, then mechanics (same as personal readings — WHY before HOW)
- Professional tone throughout — no mystical language
- Specific examples grounded in a typical workday context (meetings, decisions, communications, creative work)
- No jargon without a one-phrase definition on first use

---

## sky-at-work.html Design Specification

**Canonical template file:** `workplace readings/sky-at-work.html`
**Always read this file at the start of any rebuild or update session** — it is the living spec.

### Visual Identity

**Palette:**
```css
:root {
  --bg-primary: #0d0d1a;           /* deep navy */
  --bg-card: #141428;              /* card background */
  --bg-signal: #1a1a35;           /* signal board row */
  --accent-gold: #c9a84c;          /* primary accent */
  --accent-rose: #c47fa0;          /* secondary accent */
  --accent-teal: #4db8a8;          /* Chiron / amber signal */
  --text-primary: #f0eaff;         /* primary text */
  --text-secondary: #a89bc8;       /* muted text */
  --border-subtle: rgba(201,168,76,0.15);
}
```

**Typography:**
- Display/headers: Cormorant Garamond (Google Fonts)
- Body: Inter (Google Fonts)
- Planet glyphs: rendered as text characters (☉ ☽ ☿ ♀ ♂ ♃ ♄ ♅ ♆ ♇ ⚷ ☊ ↑)

**Layout:**
- Max-width: 900px, centered
- Hero section: radial gradient + star field SVG
- Section dividers: thin gold line `rgba(201,168,76,0.3)`
- Cards: border `1px solid var(--border-subtle)`, border-radius: 8px, padding: 24px
- Responsive: breakpoint at 600px — single column on mobile

### Hero Section
- Full-width header with week range (e.g., "June 9–15, 2026")
- Subtitle: the week's dominant transit theme (one evocative phrase)
- Moon phase indicator: current phase + sign
- No image — typography + star field SVG only

### Signal Board HTML Pattern
```html
<div class="signal-board">
  <div class="signal-row signal-exact">
    <span class="signal-planet">♃</span>
    <span class="signal-transit">Jupiter △ [natal implication]</span>
    <span class="signal-days">Mon–Wed</span>
    <span class="signal-read">Expansion of [professional theme]</span>
  </div>
  <!-- additional rows -->
</div>
```

### PDF / Print
sky-at-work.html includes a print stylesheet:
- Print background: white
- Print text: #0d0d1a
- `@media print` inverts palette for readability

### File Management
- **Do not overwrite sky-at-work.html** — this is a living document updated weekly
- New week = update the dates, signal board, and dive sections in place
- Archive old weeks if Jordan asks — otherwise the file is always the current week

---

## Slack Draft Format

After writing the HTML reading, extract a Slack version:

**Structure:**
- Opening line: one hook tied to the week's dominant transit (not generic)
- Signal board as plain text: 3–4 bullets, planet → professional implication
- Close: one line invitation ("full breakdown at [link] if you want more")
- No markdown headers in Slack (renders as plain text)
- No bullet-within-bullet nesting

**Tone:** Casual, curious, Jordan's own voice. This is a Slack message from a coworker who happens to know astrology, not an astrologer broadcasting to followers.

**Example format:**
```
Mercury stationed direct today after three weeks in retrograde — if you've been sitting on 
something waiting for clarity, this week's the window.

This week's sky:
• Mercury direct (Mon): communications clear up, good week to send that delayed email
• Venus enters Cancer (Tue): client relationships and warmth up — good week for QBRs
• Jupiter △ Mars (Thu): big energy for pitches, proposals, things requiring confidence
• New Moon in Gemini (Sat): information, strategy, new messaging cycles beginning

Full breakdown in #astroflow-weekly if you want the extended version.
```

**After writing the Slack draft:** Run `pbcopy` so Jordan can paste directly.

**Slack drop protocol:**
- Post in #astroflow-weekly (Jordan's channel)
- One casual line + the bullets + the link
- Never use bold, never use emoji in the professional drop (unless Jordan's norm has shifted)

---

## Writing Style — Workplace-Specific

| Rule | Why |
|------|-----|
| Collective sky only — no birth chart content | Colleagues haven't shared charts; chart-specific content would be confusing or intrusive |
| Professional implications are specific | "Good for client calls" is useful; "Jupiter expands your abundance" is not |
| Conversational register — not mystical | Jordan's credibility at work depends on this landing as intelligent, not new-agey |
| Avoid predictive language | "This might help with X" is fine; "X will happen" is not |
| Short sentences for Slack | Slack renders without paragraph context — each sentence has to stand alone |
| Implication leads — mechanics follow | Same as personal readings, but even more so here: nobody at work needs the degrees |

---

## Workflow Summary

```
1. Fetch live positions
2. Identify 3–5 professionally relevant transits for the week
3. Write signal board rows
4. Write 2–3 deep dives (implication-first)
5. Assemble sky-at-work.html (update dates, replace content in existing template)
6. Open html in browser: open "workplace readings/sky-at-work.html"
7. Extract Slack draft from the HTML content
8. pbcopy the Slack draft
9. If Jordan confirms — post to #astroflow-weekly
```

---

*This file contains the full workplace reading spec. Load it alongside READING-FORMAT.md for workplace sessions if Jordan's personal chart is also being referenced.*
