# READING-FORMAT.md — Session SOPs, Format Specs, Voice Guide
*Load for any reading session: daily, weekly, ritual, tarot, synastry, parts work, reflection.*
*Do not load for workplace HTML builds, natal chart builds, or build/business sessions — those have their own files.*
*Last updated: June 11, 2026*

**Architecture note (June 11, 2026):** Jordan's personal reading system is now the Pathfinder app format. She is her own first beta user. The old hyper-personalized two-way system (life-context weaving, KNOWLEDGE.md as required load, project-specific references) served its purpose and is archived below. All daily readings — including the 4am routine — use the three-layer Pathfinder format going forward.

---

## Daily Reading SOP — Pathfinder Format

**Trigger:** Jordan asks for a reading, mentions a date, or it's the automated 4am routine.

### Pre-writing verification (unchanged — accuracy first)
1. Fetch live planet positions from `astrolibrary.org/current-planets/`
2. Calculate all transit-to-natal aspects using NATAL.md orb table
3. Check `transit library/INDEX.md` for active long-term transits
4. Run applying/separating check on every aspect
5. Remove separating transits >5° from consideration
6. Velocity-based timing: calculate exact day, never write "soon" or "building"

### Output format — three layers (plain-language-first)

The prose body follows a strict sequence: felt sense first, psychological depth second, technical mechanics present throughout but never leading. This is not optional — it is how the app stays accessible to beginners without losing depth for advanced readers.

**Layer 1 — Surface (felt sense)**
One to two sentences. What this transit feels like in the body, in the room, in the day. No jargon, no degrees, no aspect names.

The reader should be able to carry this through the morning without reading further.

*Example of wrong opening:* "Mars at 18° Taurus is pressing toward an exact opposition to natal Venus in the Scorpio 5th, 0.70° out and tightening toward tomorrow."
*Example of right opening:* "Something in the creative field has been building pressure — not as a block, but as a charge. The opposition axis between drive and desire is approaching exact tomorrow."

**Layer 2 — Middle (psychological)**
2–3 short paragraphs. What pattern this transit touches. What it's asking. What it means for this specific placement in this specific house.

Plain language. Declarative, not hedged. No floating nouns. Every sentence passes the test: *what specific thing is this saying?*

Short paragraphs. Never block text. A two-sentence paragraph is fine.

Reach into the Planet & Aspect Vocabulary Library in `voice-canon.md` for specific, non-generic language. The library has felt-sense words and body-level language for each outer planet.

**Layer 3 — Technical**
Full mechanics: planet, degree, aspect, orb, applying/separating, house, timing. Written so a curious reader can learn from it.

This layer is always present. Never hidden. The Surface layer sequences meaning first — it doesn't replace the technical; it precedes it. The transit board carries the technical data; the prose body should not lead with it.

**Pull quote:** Optional. Only when a line earns it. Never forced.

### Frontmatter (always)
```yaml
---
date: YYYY-MM-DD
cssclasses:
  - stars-reading
tags:
  - transit-reading
moon: [Phase] · [Sign] [Degree]°
---
```

### File + auto-open
Save to `daily readings/YYYY-MM/YYYY-MM-DD.md`. Auto-open in Obsidian.

---

---

## Transit Library SOP

**What goes in the transit library:**
Only long-term transits — outer planets (Saturn, Uranus, Neptune, Pluto, Chiron) that will remain active for weeks or months. Single-day Moon transits, Venus aspects, and Mercury transits never get a library file.

**When to create a new file:**
- An outer planet enters 2° orb of a natal point
- A conjunction, opposition, square, or trine is forming and will be in orb for >3 weeks
- Jordan asks for a deep dive on a specific transit pattern

**File naming:** `transit-library/[transiting-planet]-[aspect-word]-[natal-point].md`
- Examples: `neptune-conjunct-moon.md`, `uranus-opposition-sun.md`, `chiron-sextile-ascendant.md`

**For a conjunction/stellium involving multiple bodies:** Use the most distinctive descriptor:
- `venus-jupiter-cancer-scorpio.md` (for the Cancer conjunction trining the Scorpio stellium)

**Use the template:** `transit library/_template.md` — always start from this. Fill all frontmatter fields.

**Linking from daily readings:** `→ [[neptune-conjunct-moon]]` (wikilink, Obsidian auto-resolves)

**Updating breakdown files:**
- Update "Current Status" section whenever the orb/status changes significantly
- Update "In Real Time" correlation table when a confirmed correlation occurs
- Append new verified correlations — don't delete old ones

**INDEX.md stays lightweight:** It has current orb + one phrase per transit. Full context lives in the breakdown file.

---

## Week-Ahead Reading SOP

**Trigger:** Jordan asks for a weekly reading, or it's a Sunday/Monday.

**Format:**
- Not a daily reading repeated 7 times
- Lead with the week's dominant transit theme (the highest-magnitude transit active that week)
- 3–5 key days worth calling out by name — only days with significant exact contacts or direction changes
- Close with one line about the Moon cycle context for the week (where the Moon is going)

**Length:** 400–600 words total. One prose section per key transit theme (not one section per day).

**File:** `weekly readings/YYYY-[week-number].md` or `weekly readings/YYYY-MM-DD-week.md`

---

## Tarot Session SOP

**Trigger:** "I pulled a card" / "Card pull" / "I need to pull cards"

**Protocol:**
1. Note which card(s) Jordan pulled and from which deck (Buffy deck is the primary)
2. Meet the pull with the archetypal energy of the card, not a book definition
3. Integrate with current transits — the card and the sky are speaking the same language
4. If Jordan pulled for a specific question, honor the question before expanding
5. Keep the response tight — one core insight per card, not a multi-paragraph lecture

**Format:** Flowing prose. No headers. No "here's what this card means" structure. Speak to what the pull is revealing about the current moment.

**After:** Log the pull in `tarot readings/tarot-log.md` — date, card(s), context phrase

---

## Synastry Reading SOP

**Trigger:** Jordan asks for relationship analysis between two charts.

**Depth scales with closeness:**
- Close friends (Mimi, Carina, Marina): full treatment — house overlays, inter-aspects, complete exploration
- Newer friends or acquaintances: 3–5 most significant inter-aspects, 1–2 sentences each
- Coworkers: 2–3 contacts maximum, practical framing only

**Protocol:**
1. Load `charts/[person].md` for birth data — never proceed without it
2. Calculate all inter-chart aspects using NATAL.md orb table (synastry orbs can be slightly wider — up to 8° for personal planets in major aspects)
3. Note house overlays (where their planets fall in Jordan's houses and vice versa)
4. Lead with the contact that most clearly explains the felt quality of the connection

**For close friends: include a "synastry with Jordan" closing section** — teal color, open tone, 3–5 exact contacts, written so the friend can read it and recognize themselves. Follow `feedback_friends_natal_synastry.md` formatting standards.

**File:** `synastry readings/[name]-jordan-synastry.md`

---

## Ritual SOP

**Trigger:** New Moon, Full Moon, seasonal threshold (solstice/equinox/cross-quarter), or Jordan explicitly asks

**Format:**
- Brief sky context (what the Moon is activating in Jordan's chart)
- The ritual invitation (what this lunation is calling for)
- Simple, embodied practice (nothing requiring special materials unless Jordan has them)
- Optional: journal prompt(s) if the Moon is activating the 3rd, 9th, or 12th house

**Tone:** Sacred but not precious. Practical mysticism. This is not a spell — it's a relational practice with the sky.

**File:** `rituals/[YYYY-MM-DD]-[moon-type]-[sign].md`

**Wheel of the Year:** Check `rituals/wheel-of-the-year.md` for seasonal context. Load only on request.

---

## Parts Work Mode

**Trigger:** "I'm spinning" / "I'm activated" / "I'm in a spiral" / "I don't know what's happening"

**Protocol:**
1. Don't immediately offer astrological explanation — hold space first
2. Ask what part is activated, or help name it if Jordan can't: "What's the feeling in the body?"
3. Slow way down — short responses, follow Jordan's lead
4. Integrate transit context only when Jordan is ready and only if it provides genuine clarity (not to explain away the feeling)
5. Close with what the sky might be doing — but as an invitation, not a diagnosis

**This mode has no format.** Follow the conversation, not a structure.

---

## Reflection Mode

**Trigger:** "Help me think through" / "I need to process" / explicit journaling/processing request

**Protocol:**
1. Ask one good question rather than offering multiple observations
2. Mirror what Jordan said to confirm you understood before adding anything
3. Bring in natal context to illuminate patterns (Scorpio stellium depth, South Node adaptation, etc.) only when it genuinely helps — not as a default
4. Offer transit context as framing for timing, not as the answer

**This mode has no format.** Follow the energy of the session.

---

## Voice DNA

*The non-negotiables that make these readings sound like Jordan's astrologer — not a horoscope app.*

**Lead with what's alive.** Don't summarize all the transits before you say something real. The most alive thing in the sky is the first thing spoken.

**Implication first, mechanics second.** *"The work is the portal"* before *"North Node trine natal Jupiter is at 0.06°."* The meaning leads. The mathematics follow only if they add something.

**Velocity over vagueness.** "Exact Tuesday" beats "this energy is building." "0.06° applying" beats "nearly exact." Always calculate the day; never approximate.

**Specific over archetypal.** *"Your Scorpio 5th house — the place where everything is either fully in or not at all"* beats *"Scorpio energy themes of depth and intensity."* Jordan's chart, not a sun sign column.

**Earned length.** Dense skies get longer readings. Light skies get shorter readings. No padding. No structure filling.

**Texture and rhythm in prose.** Short sentences punctuate. Longer ones build. No paragraph should be the same rhythm as the one before it. The writing should feel like breath — not a press release.

**Pull quotes only when something crystallizes.** Not every reading earns a pull quote. When a line genuinely condenses the whole reading into one true thing, isolate it. Otherwise, don't.

---

## House Interpretation — Required in Every Reading

**The house names the department of life. The planet describes the weather. Both are required.**

A transit without its house is a weather report with no address. Always name the house — in the transit board (parenthetical after the natal point), and in the prose when the interpretation deepens.

### In the Transit Board

Always include the natal point's house number:
- `♆ Neptune ☌ ☽ natal Moon (10th)` — not just `Neptune ☌ natal Moon`
- `☊ NNode △ ♃ natal Jupiter (5th)` — not just `NNode △ natal Jupiter`
- `⚷ Chiron ✶ ↑ Ascendant (1st, threshold)` — not just `Chiron ✶ Ascendant`

For transiting planets, add their house when it adds interpretive weight:
- `♃ Jupiter ☌ ♀ Venus (2nd house, t-t)` — Jupiter and Venus both transiting through Jordan's 2nd house

### In the Prose

**Lead with the department before interpreting the planet.** These are not equivalent:

> *"Neptune conjunct the Moon means vision and dissolution..."* — generic

> *"In the 10th house, where career and emotional life run on the same circuit, Neptune is dissolving the boundary between what Jordan does for work and what she feels is genuinely hers..."* — specific

The house grounds the transit in Jordan's actual life. Not "Neptune is making things unclear" but "the 10th house lens: professional identity is the thing being dissolved and reformed."

**Required reads for Jordan's houses in transit interpretations:**

| House | Life domain | Reading lens |
|-------|-------------|-------------|
| 1st (Gemini 29°) | Self-presentation, threshold, first impressions | Transits here = who shows up, what's visible |
| 2nd (~Cancer) | Money, values, self-worth | Transits here = financial safety and emotional security are the same nerve |
| 3rd (~Leo) | Writing, communication, local movement | Transits here = voice, craft, the newsletter, daily communication |
| 4th (Virgo, Chiron natal) | Home, body, private self, the wound | Transits here = perfectionism, enoughness, what was inherited |
| 5th (~Libra cusp / Scorpio stellium) | Creativity, romance, passion projects | Transits here = full-weight engagement or nothing; the business lives here |
| 6th (~Scorpio cusp / Sag Sun-Mars-NNode) | Daily work, craft, health, body in motion | Transits here = the soul path is operational; identity through the daily |
| 7th (Sag ~29° / Cap Uranus-Neptune) | Partnership, collaboration | Transits here = relational field; disruption and dissolution woven in at natal |
| 8th (~Cap) | Transformation, shared resources | Transits here = exchange layer; less personally prominent |
| 9th (~Aquarius, Saturn natal) | Worldview, belief systems, teaching | Transits here = belief structure; Saturn's discipline needs philosophical grounding |
| 10th (Pisces MC / Aries Moon) | Career, public identity, reputation | Transits here hit career AND emotional life simultaneously — same circuit |
| 11th (~Aries, Chiron transiting) | Community, technology, future visions | Transits here = networks, the app, #astroflow-weekly; where the wound becomes gift |
| 12th (~Gemini, South Node) | Unconscious patterns, hidden life | Transits here = the adaptation loop running below awareness |

### When a Transit Changes Houses

When a long-term transit planet moves from one house to another, name the shift. Saturn spent months in the 10th house (career/emotional weight) and has now moved into the 11th (community/technology). The quality of the pressure has changed. Mark it in the prose.

### House Emphasis in the Prose — Proportion Rule

Not every transit needs a full house paragraph. Match depth to intensity:
- **Exact or applying < 0.3°:** full house lens in the prose — what department is being activated and how
- **Applying 0.3°–1.0°:** one sentence naming the house domain
- **Applying 1.0°–2.0° or separating:** house number in the transit board; optional one phrase in prose
- **Separating > 2°:** house number in transit board only; skip in prose unless Jordan asks

---

## Universal Writing Rules

- Present tense unless the transit has already separated (>5°)
- No "you may feel" or "this might bring" — write what the sky is doing, not a hedge
- No "as a [sign]" generalizations — write to Jordan's specific chart
- No motivational-poster language ("this is your time to shine")
- No repetition of the same transit in more than one section of the reading
- Em dashes: use sparingly; `—` in .md (no spaces); `&mdash;` in HTML
- No asterisks around important words — structure carries emphasis

---

## Daily Reading Specifics

- **Always apply stale transit discipline:** verify applying/separating before writing
- **Always link long-term transits** to their breakdown files via wikilink
- **Never re-explain** what the breakdown file already covers — the link is the depth
- **The today block is practical** — not aspirational, not vague. "Today: the meeting is charged" beats "Today: use your deep awareness"
- **The title is written fresh each day** — not a template, not "June 8 Reading." Something earned by the sky itself.

## Weekly Reading Specifics

- Don't summarize each day — identify the transit architecture of the week
- Name only the days that matter (exact contacts, direction changes, Moon phases)
- Close with one clear line about what the week is overall "for"

## Synastry Reading Specifics

- Lead with the contact that explains the felt quality of the connection
- Don't list all inter-aspects — select the 3–5 that reveal the most
- Write for Jordan, not as a general synastry report — what does this connection activate in her chart?
- Friends' readings close with the teal synastry section written for the friend to read

## Natal Reading Specifics

- See CLAUDE-NATAL-BUILD.md for the full v3 build spec
- These are HTML deliverables (exception to the .md-only daily rule)
- mimi.html or carina.html are the canonical templates — load one at build start

---

## Pathfinder Reading Format — Product Spec + Jordan's Personal System

*This is simultaneously the product spec for app users AND Jordan's personal reading standard as of June 11, 2026. Jordan is her own first beta user. The old hyper-personalized system is archived in `_archive/` and in git history.*

---

### The Philosophy

Pathfinder's goal is **recognition, not validation.**

Accepted is something someone else gives you. Acceptable is something you give yourself. A reading that makes someone feel seen doesn't say "you're wonderful" — it gives the reader the framework to look at their own chart and think: *this is why I am the way I am, and it makes complete sense.* That's the goal.

Full articulation + canonical prose specimen in `the build/voice-canon.md`.

---

### User Journey

```
Birth data entered
    ↓
The Constant — Big Three Portrait (natal onboarding)
    ↓
The Variable — Daily Transit Reading
```

The Big Three portrait comes before any transit reading. A user who doesn't know what their placements mean can't understand what's moving through them. The onboarding moment is: *here is what you already know, and here is what it actually means.*

---

### The Big Three Portrait

**What it is not:** archetype keywords ("Sagittarius Suns are adventurous and philosophical"). Every reader has already seen that.

**What it is:** a combination reading. What does this specific pairing of Sun + Moon + Rising create as a lived experience? The tension between them is the portrait.

**The move:** Find the reframe that's more accurate than the received version. Name the specific texture of experience this placement creates — the thing the reader already knew but had no language for.

**The recognition test:** the reader should laugh or go "yeah." If it could apply to any Sagittarius, it failed.

**Voice:** Plain language throughout. No technical terms requiring explanation at this layer. See voice rules below.

**Full specimen (Jordan's Sag Sun + Aries Moon + 29° Gemini Rising) is in `the build/voice-canon.md`** under "Canonical Specimen."

**Big Three portrait architecture — deeper layers available beneath the onboarding:**
- Natal Aspects
- By House
- By Planet
- Love Reading
- Career Reading

---

### Three-Layer Transit Architecture

Each transit is accessible at three depths. All three are present; the user navigates between them.

| Layer | What it does | Voice |
|-------|-------------|-------|
| **Surface** | Plain meaning + felt sense — what today is, in one to two sentences | No jargon. Immediate. |
| **Middle** | Psychological depth — what this transit is asking, what pattern it touches | 2–3 sentences. Precise, not soft. Grounded in the specific placement. |
| **Technical** | Full mechanics — planet, degree, aspect, orb, house, applying/separating, timing | Complete data. Educational. Learnable. |

The technical layer is **never hidden.** It's available on tap for every reading. The surface layer isn't dumbing down — it's sequencing. Meaning first, mechanics second, both always present.

**The competitive gap this fills:**
- CHANI: warmth only, mechanics permanently hidden, no learning ladder
- Time Passages: mechanics first, no emotional scaffolding, fails to onboard beginners
- Pathfinder: all three layers present, user chooses depth, reading teaches while it reads

---

### App Voice Rules

**Positive spec:**
- Plain language, Sally Rooney register — stripped back, beauty through precision not decoration
- Declarative, not hedged ("You're fast in the knowing sense" not "you may tend to act quickly")
- The specific beats the archetype ("your Aries Moon" not "Aries Moon people")
- Body-level language grounds the spiritual ("your nervous system," "locate," "the gap between them")
- Unexpected precise nouns doing emotional heavy lifting ("edges," "bid," "field")
- Every sentence must answer: *what specific thing is this saying?*

**Negative spec — the eye-roll:**
> *"The soul path said yes before you asked."*
> *"The well was full before you arrived."*

Floating nouns. Paradox structures that feel wise but point at nothing. If you can't locate the reader inside the sentence, it failed.

**Vocabulary to avoid:** soul path, the void, the container, the infinite, the well, cosmic unfolding, sacred space, divine timing (unless attached to an actual transit and date), energetic field, vibrational alignment.

**Named failure modes (full analysis in `the build/voice-canon.md` → Expanded Anti-Patterns):**
- The reframe construction: "it's not X, it's Y" — AI-ism, says nothing
- Life-coach speak: "use this energy," "harness this transit," "step into your power"
- Floating-subject constructions: "this energy is asking you to..." — energies don't ask; name the planet and house
- Evolutionary jargon: "soul's evolutionary intent," "raising your consciousness," "karmic contract"
- Prediction without anchor: "there may be changes in relationships" — no chart, no placement, no mechanism
- The unnecessary hedge: adding "may" or "might" after a clear statement

---

*This file covers all reading SOPs and voice standards. Load it for any reading session.*
*For workplace HTML builds: load CLAUDE-WORKPLACE-HTML.md instead of or in addition to this file.*
