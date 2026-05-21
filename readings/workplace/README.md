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
   Live URL: `https://jordanb1993.github.io/astro-readings/readings/sky-at-work.html`
   Transit-to-transit only. Sections: Pulse, At a Glance, Communication, Momentum, Collaboration, Watch For.

2. **`readings/week-ahead.html`** — Jordan's personal week-ahead transit reading (private bookmark)
   Live URL: `https://jordanb1993.github.io/astro-readings/readings/week-ahead.html`
   Transit-to-natal, day-by-day exact aspects, active transits strip.

3. **`readings/workplace/slack-draft.md`** — Monday morning Slack message, ready to copy-paste
   Tight format, links to sky-at-work URL, follows the template below.

**Monday morning routine:** Open slack-draft.md in Obsidian, copy the text, paste into `#astroflow-weekly`.

### Distribution
- Create the Slack channel, post Monday morning
- Keep it optional and low-pressure — anyone can join or ignore
- The post itself is the pitch; no explanation needed
- Eventually: a Substack or paid weekly send
