# CLAUDE-NATAL-BUILD.md — Natal Chart Build Spec
*Load only when building a new natal chart HTML or rebuilding an existing one.*
*The v3 template is canonical. mimi.html is the living reference. Do not deviate without instruction.*
*Last updated: June 8, 2026*

---

## What This File Is For

Natal chart builds are HTML deliverables — the only exception to the `.md-only` reading rule. These are beautiful, scrollable single-page charts built in the whimsigoth aesthetic. They serve double duty: personal gifts to friends AND the production template for the eventual paying client pipeline.

Every natal chart HTML must be:
1. Visually matched to the v3 template (mimi.html or carina.html)
2. Interpretively deep — not a trait list, a lived reading
3. Built from accurate calculated placements (verify with NATAL.md Python workflow)
4. Closed with the Archetype Card + free verse poem

---

## Session Start Protocol — Natal Build

1. Read `natal readings/mimi.html` (canonical v3 template) at session start — full read
2. Check `charts/[person].md` for confirmed birth data
3. Run natal chart calculation (Python from NATAL.md or Time Passages)
4. Confirm placements with Jordan before building
5. Only then: begin the HTML structure

If `mimi.html` is unavailable or corrupted, use `carina.html` as the fallback.

---

## v3 Template Architecture

**What mimi.html contains:**
- Fixed HTML/CSS design system (palette, fonts, layout)
- Scrollable single-page layout
- Planet strip (all placements, interactive expand)
- Deep dive cards (one per major placement/pattern)
- Archetype Card section (generated from the chart's dominant signature)
- Free verse poem (closing — non-negotiable)
- Optional synastry taste section (for close friends only)
- PDF/print export button (built-in)

**Palette (identical to CLAUDE-WORKPLACE-HTML.md):**
```css
--bg-primary: #0a0614;
--bg-card: #141428;
--accent-gold: #c9a84c;
--accent-rose: #d4a0b5;
--accent-purple: #b482d2;
--accent-teal: #4db8a8;
--text-primary: #f2ecff;
```

**Fonts:** Cormorant Garamond (display) + Inter (body)

---

## Deep Dive Card Rules

Each card covers one significant placement, pattern, or aspect.

**Card selection:** Lead with what the person will most recognize — the pattern that will make them say "how did you know that?" Not the most technically interesting placement, the most personally true one.

**Section structure per card:**
- Card label (placement name — no section eyebrow/header above it, no emoji in the title)
- Card body: 3–5 short paragraphs with space between them
- No hard paragraph count — write what the chart needs
- Hint pill inside the card label (positioned as flex child, not absolute — see `feedback_natal_card_pill_patterns.md`)

**No double title:** Do not add a section eyebrow AND a section title. The card label IS the header. Confirmed pattern per `feedback_natal_chart_section_headers.md`.

**Planet strip:**
- Shows all placements at a glance
- "Tap each to expand" ghost hint always present
- `cursor: pointer` always set
- Backdrop blur on expanded state

---

## Archetype Card SOP

The Archetype Card is the second-to-last section of the natal chart. It distills the chart into a single archetypal image or figure drawn from the dominant chart signature.

**How to derive the archetype:**
1. Identify the chart's dominant signature: strongest house, most loaded sign, most angular planet, most exact aspect
2. The archetype is not a sun sign label (never "you're a classic Sagittarius") — it's a figure that embodies the chart's specific tension and gift
3. Use mythological, literary, or archetypal references — meet the chart's actual depth

**Format:** One named archetype + 3–5 sentences explaining why this chart, specifically, is this figure. Present tense. Second person (you/your, not "Jordan is").

**Example archetypes:** The Alchemist, The Threshold Guardian, The Wounded Healer Who Builds, The One Who Crossed The Water, The Bridge-Builder at the Border, The Keeper of the Deep Archive

**The card is visual:** Designed to feel like a tarot card within the page. Bold typography. Gold accent. The archetype name is the largest text on the card.

---

## Free Verse Poem SOP

The poem closes the natal chart. It is the last thing on the page. Non-negotiable — every natal chart ends with a poem.

**Non-negotiable rules:**
- **Present tense only** — never past, never future
- **No em dashes** — use line breaks or commas instead
- **No technical language** — no "natal Jupiter," no "Scorpio stellium," no degrees
- **No explanations** — the poem does not explain the chart. It inhabits it.
- **End on an open question** — the last line opens something rather than closing it
- **No title** — the poem has no heading. It arrives.
- **Jordan has an MFA from Trinity College Dublin.** Workshop standards apply. If a line is weak, rewrite it. No filler. No forced rhyme. No greeting card language.

**Structural latitude:** No required line count. Short poems (12–18 lines) usually land best. Long poems (30+) are for extraordinary charts. Match the poem's scale to what the chart actually calls for.

**What makes the poem work:**
- One image that captures the chart's central tension/gift (not a list of images)
- Specific sensory language (not "deep emotion" — something that creates the feeling)
- The chart's actual texture (if the chart is Scorpionic, the poem is dark-warm; if Sagittarian, it breathes wide)
- No motivational language ("you are becoming," "your light shines") — say the true thing

---

## Synastry Taste Section (Close Friends Only)

For friends receiving natal charts, optionally add a synastry taste section at the end — after the poem, in teal styling.

**When to include:**
- Close friends only (Mimi, Carina, Marina — not acquaintances or new clients)
- Only when Jordan has confirmed she wants it included

**Format:**
- Teal visual treatment to distinguish it from the natal content
- 3–5 exact contacts between their chart and Jordan's
- Written for the friend to read — accessible, warm, specific
- Each contact: 1–2 sentences on what it means for the connection
- Open tone — not predictive, not clinical

**Per `feedback_synastry_coworker_scope.md`:** This section is for close friends only. Coworkers and acquaintances don't get the synastry section.

---

## OG Social Preview

Each natal chart HTML includes an `<og:image>` meta tag for social preview (in case Jordan ever shares via link).

**Spec:**
- 1200×630px
- Dark background with person's name in Cormorant Garamond
- Subtle star field
- "natal chart · [their name]" caption
- Jordan doesn't need to generate a separate image — include the meta tag pointing to a placeholder until one is ready

---

## File Naming + Delivery

**File:** `natal readings/[firstname-lowercase].html`
- Examples: `natal readings/mimi.html`, `natal readings/carina.html`

**After building:**
1. Open in browser: `open "natal readings/[name].html"`
2. Test PDF export button — confirm single-scroll works
3. If adding GitHub Pages hosting: commit + push, provide URL to Jordan

**GitHub Pages URLs:** Use `%20` for spaces in file paths (not + or other encoding).

---

## Build Checklist

Before delivering a natal chart:
- [ ] Birth data confirmed (DOB + time + location + timezone)
- [ ] All placements calculated and verified
- [ ] Deep dive cards: leading with what person will recognize, not what's technically interesting
- [ ] No double titles, no emoji in section headers
- [ ] Planet strip: "tap each to expand" hint present, cursor:pointer set
- [ ] Archetype Card: specific figure (not a sun sign label), present tense
- [ ] Poem: present tense, no em dashes, no technical language, ends on open question
- [ ] Synastry section (if included): teal, 3–5 contacts, written for the friend
- [ ] PDF button tested
- [ ] File opened in browser automatically

---

*This file contains the full natal chart build spec. Always read mimi.html at session start before building.*
*For reading content written alongside natal builds: also load READING-FORMAT.md for voice standards.*
