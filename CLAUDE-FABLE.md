# CLAUDE-FABLE.md — Fable 5 Strategy for Pathfinder
*Load this file at the start of any Fable session. It defines what Fable is for, what it isn't for, and exactly how to deploy it.*
*Last updated: June 12, 2026*

---

## The Core Principle

**Fable sets ceilings. Sonnet builds on floors.**

Every Fable session should produce a reference artifact — something that permanently raises the standard for one layer of the product. Not just a good output. A new benchmark that every future Sonnet session inherits and maintains.

Fable is most valuable when the quality of thinking IS the output. If a session has a clear spec with defined steps, Sonnet can execute it. Fable is for sessions where the highest possible interpretation, architecture, or prose is the whole point.

---

## Decision Matrix — Fable vs. Sonnet

| Task | Use | Why |
|------|-----|-----|
| New natal chart deep read (1st pass) | **Fable** | Archetypal interpretation is the product's IP — ceiling matters |
| Transit library deep dives | **Fable** | Long-form psychological prose where nuance compounds |
| Voice canon elevation / critique | **Fable** | Calibrating the standard requires standing at the ceiling |
| Phase 2 architecture design | **Fable** | Holistic system thinking with many competing constraints |
| Sky at Work product concept development | **Fable** | Novel positioning that needs original framing, not templating |
| All CSS / HTML / JS build work | Sonnet | Craft + spec work — capability ceiling doesn't change the output |
| Weekly Sky at Work content | Sonnet | Well-defined format, iterative, speed matters |
| Daily readings | Sonnet (routine) | Automated or fast — Fable would be over-deployed |
| Build log / digest / memory updates | Sonnet | Operational, not interpretive |
| Any task with a clear step-by-step spec | Sonnet | Spec work doesn't benefit from higher reasoning ceiling |

**The fast test:** Does the quality of the thinking determine the quality of the output? → Fable. Does the spec determine the quality? → Sonnet.

---

## Session Types

### Session Type 1 — Natal Chart Foundation Read

**When:** Every time new birth data arrives for a person getting a full chart.

**What it produces:** The definitive interpretive layer for that chart — archetypes, through-line, psychological core, key aspect dynamics, wound + fortune synthesis. This becomes the voice canon for that person's chart. All future Sonnet sessions build from this document.

**Files to load:**
- `CLAUDE.md`
- `NATAL.md` (orb table, calculation rules)
- `KNOWLEDGE.md` (accumulated patterns — load selectively if needed)
- The person's birth data from `charts/[name].md`
- Live planet data for context (optional — natal read doesn't require transits)
- `natal readings/mimi.html` or `dasha.html` as voice reference (read before writing)

**Session prompt template:**
```
I'm doing the foundational natal chart read for [NAME], [DATE/TIME/LOCATION].

You are Claudia, an astrologer building the Pathfinder app — a premium AI-powered natal chart reading product. The charts produced here are the product. The reading quality is the IP.

Before interpreting, calculate all major aspects from scratch using the orb table in NATAL.md. State the degree positions first, then move into interpretation.

I want the full interpretive foundation:
- Archetype: the one resonant image that holds the chart's core tension and gift (this becomes the card). Avoid mythological archetypes unless they're exact. Find language that feels alive, not categorized.
- Signature: 3-4 planetary signatures that define how this person operates. Not keyword lists — how they compound.
- Wound + Fortune: Chiron and Lot of Fortune as a pair. What's the invitation in the wound, and where is the fortune pointing?
- Through-line: 2-3 short paragraphs. What is the central arc of this life? What is being asked of this person that can't be avoided?
- Key dynamics: 3-5 aspects that carry the most interpretive weight. Exact orbs, houses, how they interact.
- Shadow: what does this chart avoid, suppress, or project? Not pathologizing — the part of the self that hasn't been claimed yet.

Voice: psychologically precise, warm, non-platitudinous. No hedging. No "you may find yourself..." No positivity-washing the hard stuff. Implication-first — let the insight land before explaining it. See dasha.html as a reference for register and depth.

This becomes the foundation document. Future sessions will build the HTML from it. Write for the depth of the source material, not for length.
```

**Output protocol:** Save the full Fable output to `charts/[name]-foundation.md`. This is read-only source material — Sonnet builds the HTML from it, never replaces it.

---

### Session Type 2 — Voice Canon Elevation

**When:** Quarterly, or when reading quality feels like it's drifted or plateaued.

**What it produces:** A critique + elevated voice canon — a set of concrete standards with annotated examples that permanently raises Sonnet's reading quality.

**Files to load:**
- `CLAUDE.md`
- `NATAL.md`
- `app/voice-canon.md` (current standards)
- 2-3 recent readings (sample `.md` files from `daily readings/`)
- The archetype body text from all 3 current charts (jordan, marina, dasha)

**Session prompt template:**
```
I'm doing a voice canon elevation session for Pathfinder.

Pathfinder is a premium AI-powered astrology app. The reading voice is the core product differentiator. I want to work at the ceiling of what astrological prose can be — not vague spiritual language, not keyword astrology, not therapy-speak, but something that reads like precise poetry: grounded in technique, resonant as literature.

Read the attached samples. Then do three things:

1. **Critique:** Where is the voice falling short? Be specific. What patterns recur that flatten the writing? What does the best moment in these samples do that the rest doesn't?

2. **Elevation:** Rewrite 2-3 of the weakest passages at full power. Show what the ceiling looks like.

3. **Voice canon update:** Add to or revise the voice canon rules based on what you found. Be specific enough that a different AI could follow them. Not "be more lyrical" — name the actual techniques.

The canon I'm working toward: each sentence earns its existence. The reader feels precisely seen, not generally affirmed. The astrology is the structure, not the decoration.
```

**Output protocol:** Extract the updated voice canon rules into `app/voice-canon.md`. Save the elevated sample rewrites as examples in that same file under `## Elevated Reference Passages`.

---

### Session Type 3 — Transit Library Deep Dive

**When:** When writing or significantly expanding a long-term transit breakdown file in `transit library/`.

**What it produces:** A full psychological interpretation of a major transit that can stand alone as a document — applying, exact, separating, returning phases; house dynamics; how it compounds with natal placements; the invitation and the resistance.

**Files to load:**
- `CLAUDE.md`
- `NATAL.md`
- `transit library/INDEX.md`
- The specific transit's current file (if it exists)
- KNOWLEDGE.md (the section relevant to this transit's themes)

**Session prompt template:**
```
I'm writing the deep-dive breakdown for [TRANSIT NAME] in the Pathfinder transit library.

This file is one of the definitive interpretive resources for the app. It will be read by users when they want to understand what a long transit actually means for their chart.

Transit details:
- [PLANET] [ASPECT] natal [PLANET/POINT] at [DEGREE/HOUSE]
- Orb entered: [DATE]. Exact: [DATE]. Orb exits: [DATE].
- Returning contact: [DATE if applicable]

Jordan's natal context: [relevant natal placements and house cusps]

Write the full breakdown using the template structure in `transit library/_template.md`. I want real depth in the applying vs. separating vs. returning distinction — this is where most transit writing is shallow. The house dynamics should be specific to Jordan's chart, not generic. The "invitation vs. resistance" framing should feel earned, not imposed.

Voice: same register as the natal readings. Grounded, precise, no positivity-washing. The resistance is as important as the gift.
```

**Output protocol:** Save directly to `transit library/[transit-name].md` and update `transit library/INDEX.md` to reflect the new breakdown is complete.

---

### Session Type 4 — Phase 2 Architecture

**When:** Before building anything for the subscriber cohort — Supabase, auth, intake, delivery.

**What it produces:** A complete system design document covering the data model, user flows, and technical decisions for Phase 2 (closed subscriber cohort).

**Files to load:**
- `CLAUDE.md`
- `build-digest.md`
- `CLAUDE-BUILD.md`
- `app/app-vision.md`
- `app/product-decisions.md`
- `app/beta-users.md`

**Session prompt template:**
```
I'm designing the Phase 2 infrastructure for Pathfinder — the shift from internal beta to a closed subscriber cohort of ~20 people at $20-35/month.

Current stack: Vercel (hosting, auto-deploy from GitHub), GitHub (private repo: jordanb1993/astro-readings), Obsidian (source files). No Supabase yet.

Phase 2 needs:
- Intake form (birth data collection) → stored in Supabase
- Reading request queue / delivery mechanism
- User accounts (or link-based access — up for discussion)
- Payment (Stripe?)
- The chart HTMLs are currently static files on Vercel — how does a subscriber access theirs?

I want you to design the full system. Specifically:
1. What does the Supabase schema look like? (tables, relationships, key fields)
2. How does the intake-to-reading pipeline work? (from form submission to delivered chart)
3. How does the subscriber access their reading? (auth model — full accounts vs. magic link vs. unique URL?)
4. What's the simplest possible implementation that's still production-grade for 20 users?
5. What decisions need to be made before building starts — flag these explicitly.

Design for ~20 users, not 200. Optimize for Jordan being able to operate this solo. The workflow should be: user submits form → Jordan gets notified → Jordan builds the chart in Claude Code → reading is delivered. Automation is secondary to reliability.

Be concrete. Give me schema DDL if it helps. Flag the decisions I need to make before we write any code.
```

**Output protocol:** Save the architecture document to `app/phase-2-architecture.md`. Extract open decisions into `app/product-decisions.md`.

---

### Session Type 5 — Sky at Work Product Concept

**When:** Before building out the Sky at Work product for a broader audience beyond Everflow.

**What it produces:** The defining document for what Sky at Work is, what it's for, how it's positioned, and what makes it different from generic workplace wellness tools.

**Files to load:**
- `CLAUDE.md`
- `CLAUDE-WORKPLACE-HTML.md`
- `app/app-vision.md`
- `app/market-strategy-2026-06-05.md`
- The current `workplace readings/sky-at-work.html` (have Fable read it)
- `app/testimonials.md` (especially Krista's endorsement)

**Session prompt template:**
```
I'm developing Sky at Work — a workplace collective transit channel inside the Pathfinder app. Right now it lives at pathfinderastro.vercel.app/workplace readings/sky-at-work.html and is live at Everflow (where I work) as a Slack channel called #astroflow-weekly.

Context: Krista Kellogg (VP-level, strong instincts, initially skeptical of woo) endorsed it within 24 minutes of the first post. The format works. The question is: what is this product, really?

I want you to develop the full product concept:

1. **What is the core insight?** Why does collective astrology work in a professional context when individual astrology often doesn't?
2. **Who is this for?** Not just "companies" — what kind of company, what kind of person inside it, what problem are they already trying to solve?
3. **What makes it different?** There are horoscopes everywhere. Why does the weekly transit digest format work when daily horoscopes don't?
4. **What is the positioning?** One sentence that a skeptic finds interesting. Not "astrology for business" — what's the actual framing?
5. **What's the product arc?** If Sky at Work is a standalone product, what does it look like? If it's a feature of Pathfinder, how does it relate?
6. **What are the 3 questions the product has to answer** before it can be pitched to any company?

Be direct. The astrology content is already good. The question is whether there's a product here, and if so what it actually is.
```

**Output protocol:** Save to `app/sky-at-work-concept.md`. Relevant positioning → update `app/market-strategy-2026-06-05.md`.

---

## Sequencing — How to Use the Two Weeks

Ranked by leverage on the product:

| Priority | Session | Why Now |
|----------|---------|---------|
| 1 | **Voice Canon Elevation** | Every future reading inherits this. Do it first — it raises the floor for everything else. |
| 2 | **Krista Natal Chart Foundation** (if data arrives) | First paying-tier user. Her reading sets the bar for subscriber-facing quality. |
| 3 | **Transit Library — 2 key transits** | Pluto sextile Moon + Uranus opp North Node are your most active transits. Deep breakdowns here improve daily reads immediately. |
| 4 | **Phase 2 Architecture** | Do before writing any Supabase code. Getting the schema right is much cheaper than fixing it. |
| 5 | **Sky at Work Concept** | Only if you're actively planning to pitch or expand it. |

---

## Session Hygiene

**Before every Fable session:**
- Pull latest from GitHub: `git -C "[pathfinder path]" pull`
- Load files in order specified for that session type
- Tell Fable: "You are Claudia, the astrologer building Pathfinder. Read [listed files] before beginning."

**During:**
- Let Fable run long. Don't interrupt mid-interpretation.
- If output is going in the wrong direction, stop and restate the constraint rather than redirecting incrementally.

**After every Fable session:**
- Save the full output to the appropriate file immediately.
- Note what the session produced that Sonnet should now maintain.
- If voice standards changed, update `app/voice-canon.md`.
- Run the session-end protocol in `CLAUDE.md`.

**What Fable is not for:**
- Fixing bugs
- CSS/HTML/JS implementation
- Routine build tasks
- Any session where you'd know the answer is right or wrong from a spec

---

## The Two-Week Window — Use It Asymmetrically

Don't spread it evenly. Do 2-3 deep sessions rather than 6 shallow ones. The value is in going all the way down on a specific layer. A Fable session that runs 45 minutes on one transit breakdown is worth more than five 10-minute sessions on different things.

The foundation you're building: Fable sets the archetypal depth and voice ceiling for each layer of the product. Sonnet — across unlimited future sessions — builds everything on top of it.

---

*This file is the instruction set for Fable sessions. Load it alongside the session-specific files listed above.*
*Update it after each session with what worked, what didn't, and any prompt refinements.*
