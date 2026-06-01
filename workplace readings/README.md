# Workplace Digest — Format Guide

**What this is:** A weekly sky-weather note for coworkers — transit-to-transit aspects only, framed entirely through the workplace lens. No natal charts required. No personal analysis. Just practical guidance on the week's collective energy.

**Audience:** Dasha, Yvonne, Krista, and any coworker who's open. Optional, never imposed.

**Cadence:** Monday morning. Covers Monday through Sunday.

**Length:** ~300 words. Slack-friendly. Could go in a team channel or be sent as a DM.

**The constraint that makes it work:**
Transit-to-transit only — this means:
- No one's personal chart is analyzed
- Nothing feels invasive or presumptuous
- It's collective weather, like a forecast, not a personality reading
- Anyone can find themselves in it without having shared birth data

---

## Format

```markdown
# ☿ Sky at Work — Week of [Month Day]
*[Transit-to-transit aspects only — collective weather for the week]*

---

## The Headline
[One sentence naming the dominant energy this week]

---

## At a Glance
| Aspect | Exact | Energy |
|--------|-------|--------|
[top 4-5 transit-to-transit aspects with approximate dates they peak]

---

## For [Theme 1 — e.g., Communication]
[2-3 sentences. Mercury-specific or communication-relevant aspects. Practical advice.]

## For [Theme 2 — e.g., Decisions & Momentum]
[2-3 sentences. Mars, Saturn, or action-oriented aspects.]

## For [Theme 3 — e.g., Collaboration]
[2-3 sentences. Venus, Jupiter, or relational aspects.]

## Watch For
- [one-line flag — a tension or friction point worth knowing]
- [one-line flag]

---

*Transit-to-transit aspects — no natal charts used. Everyone's in this weather.*
*Full sky context: the stars workspace*
```

---

## Tone

- Practical, not mystical
- Specific ("Mercury trine Saturn = strong week for documentation and contracts") not vague ("big changes ahead")
- Empowering, not fatalistic — the sky describes the weather; you choose what to build in it
- One or two degrees of woo is fine; three is too many for a work context

---

## The Business Angle

This format is a proof of concept for something bigger:
- **Workplace astrology packages** — weekly digests for a whole team, $X/month
- **Corporate women's career astrology** — using transits to navigate performance reviews, negotiations, launches, asks
- **"The sky at work" as a product** — transit forecasting through the career and leadership lens, AI-automated

The workplace digest is both a generous thing to offer coworkers AND a live demo of a product that doesn't exist yet but should.

---

## Slack Format Spec (for the weekly channel post)

The `.md` file in this folder is the source reading — detailed, with tables, kept for the archive. The Slack post is a reformatted version of it: tighter, more conversational, designed for the channel.

**The table problem:** Slack doesn't render markdown tables. The replacement is **stacked blockquotes** (`> text`). Each row becomes its own blockquote line — Slack renders these as a visual strip with a left border, which reads like a signal board. One row per aspect.

### Slack post template

```
*☿ sky at work — week of [Month Day]* ✦

[1-sentence pulse. Plain language. The dominant energy, what it means for the week.]

*at a glance*
> [emoji] *[Day]* — [aspect] — [what it means in one line]
> [emoji] *[Day/range]* — [aspect] — [what it means in one line]
> [emoji] *[Day]* — [aspect] — [what it means in one line]
> [emoji] *[All week]* — [background condition] — [effect]

*for communication*
[2-3 sentences. Sharp and practical. What to do and when.]

*for bold moves*
[2-3 sentences. The action window — when to push, when to hold.]

*watch for*
• [One-line flag — a tension or timing note]
• [One-line flag]

— _transit-to-transit weather only. no birth charts required. just the sky we're all in._ ✦
```

### Emoji signal key (use these consistently)
*Note: Unicode planet symbols (☿ ♃ ♄ ♅ ♆) break in Slack. Use emoji substitutes below.*

| Emoji | Planet | Use for |
|-------|--------|---------|
| 💬 | Mercury | Communication, writing, contracts |
| ♀ | Venus | Connection, asks, creative pitches (♀ works fine) |
| 🔥 | Mars | Drive, action, friction |
| 🌟 | Jupiter | Expansion, goodwill, meetings |
| 🏗️ | Saturn | Structure, discipline, limits |
| ⚡ | Uranus / Sun-Uranus | Disruption, breakthrough, tech, wildcards |
| 🌊 | Neptune | Intuition, fog, vision |
| ☉ | Sun | Identity, visibility, leadership (☉ works fine) |
| 🌙 | Moon | Mood, emotional field, team energy |
| ✦ | Header/footer | Branding element — consistent each week |

### Channel name
**`#astroflow-weekly`** — confirmed and live as of May 21, 2026

### Automated Sunday workflow (added May 21, 2026)

Every Sunday, the existing 4am CDT routine now also generates three additional files:

1. **`readings/sky-at-work.html`** — the public, fully-formatted workplace weekly page
   Live URL: `https://jordanb1993.github.io/astro-readings/workplace%20readings/sky-at-work.html`
   Transit-to-transit only. Sections: Pulse, At a Glance, Communication, Momentum, Collaboration, Watch For.

2. **`readings/week-ahead.html`** — Jordan's personal week-ahead transit reading (private bookmark)
   Live URL: `https://jordanb1993.github.io/astro-readings/readings/week-ahead.html`
   Transit-to-natal, day-by-day exact aspects, active transits strip.

3. **`readings/workplace/slack-draft.md`** — Monday morning Slack message, ready to copy-paste
   Tight format, links to sky-at-work URL, follows the template below.

**Monday morning routine:** Open slack-draft.md in Obsidian, copy the text, paste into `#astroflow-weekly`.

---

## sky-at-work.html — Interactive App Format (canonical as of May 26, 2026)

`readings/sky-at-work.html` is the live public page. **Same URL every week — overwrite the file, push to GitHub, done.** The URL never changes.

### Design system
- Palette: deep plum `#0a0614`, gold `#c9a84c`, rose `#d4a0b5`, plum-bright `#b482d2`, teal `#5ab4a0`
- Fonts: Cormorant Garamond (display) + Inter (sans) — loaded from Google Fonts
- Matches the natal chart HTML design system (not the retro terminal `_template.html`)

### Interactive features (rebuild these every week)

**Sticky status bar** (top, z-index 200): channel name + week label on the left, "Your sign" picker button on the right.

**Week progress bar** (below status bar, z-index 190): Mon–Fri dots, today's day highlighted in gold. Update `weekStart` in JS each Sunday:
```js
const weekStart = new Date(2026, 4, 25); // month is 0-indexed — May = 4
```

**Signal board** (At a Glance section): one row per transit aspect. Each row is clickable — expands a plain-English detail panel below it. Only one panel open at a time. Rows follow a 3-column grid: left stripe (color-coded by planet type), center content, right timing pill.

**Sign personalization** (added May 26, 2026):
- Status bar button opens a 12-sign grid panel
- On selection, a "For you this week" banner appears in Communication, Momentum, and Collaboration sections
- Each banner has a one-sentence sign-specific callout written fresh each week
- Selection persists via `localStorage` key `saw_sign`
- **Sun sign is the current lens** — accurate enough for a collective/workplace context
- **Future upgrade:** add rising sign as the primary picker, sun sign as fallback. Rising sign is more accurate for transit work because it determines house placement. Framing: "rising sign = most accurate / sun sign = good starting point"

**Read-more dropdowns** (4 section cards): teaser paragraph visible by default, full content expands on button click. Uses `max-height` + `opacity` CSS transition, toggled via `toggleCard()` JS.

**Scroll fade-in**: `.fade-in` class + IntersectionObserver — elements animate in as they enter the viewport.

### Weekly rebuild checklist

Each Sunday when generating the new week's file:
- [ ] Update `weekStart` date in JS
- [ ] Update headline text + week label in the hero
- [ ] Update the At a Glance signal board rows (aspect name, orb, timing pill, detail panel copy)
- [ ] Update teaser + expanded content in all 4 section cards
- [ ] Update all 36 sign-specific callout lines in `SIGN_COPY` (12 signs × 3 sections: comms, momentum, collab)
- [ ] Update Watch For bullets
- [ ] Push to GitHub: `git add readings/sky-at-work.html && git commit -m "sky at work: week of [date]" && git push origin main`
- [ ] Update `slack-draft.md` with new week's content + pbcopy

### Distribution
- Post `slack-draft.md` content to `#astroflow-weekly` Monday morning
- Keep it optional and low-pressure — anyone can join or ignore
- The post itself is the pitch; no explanation needed
- Eventually: a Substack or paid weekly send
