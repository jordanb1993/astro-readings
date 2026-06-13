# CLAUDE-BUILD.md — Build + Business Session SOPs
*Load for app architecture, product planning, intake sessions, and business strategy work.*
*Do not load for reading sessions — READING-FORMAT.md handles those.*
*Last updated: June 8, 2026*

---

## What "Build" Means Here

Build sessions are when Jordan is working on the astrology business as a business — not as a reading practice. This includes:
- App architecture decisions
- Product phase planning
- Market strategy and positioning
- Intake protocol work
- Business model and pricing
- Client/user acquisition strategy
- Technical infrastructure (routine, GitHub, agent architecture)
- Voice/brand development work that happens outside of individual readings

The reading practice and the business are the same organism. The readings ARE the product. Every reading quality improvement is product development. Every voice refinement is brand development. Hold both simultaneously.

---

## Current Phase Context — June 2026

**Phase: Build + Beta (active)**

Jordan is building an AI-powered personal astrology app. She is the first beta user. Her friends are the second layer.

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Build + Internal Beta | **✅ Complete — June 13, 2026** | 10 charts live, daily automation running, beta group active |
| Phase 2: Closed Subscriber Cohort | **Active next** | ~20 subscribers, $20–35/mo, deep subscription model |
| Phase 3: Public App | 2027 | Full subscription model |

**Etsy plan:** Dropped June 5. The pivot was right — this is a full product, not a marketplace listing.

**App name: Pathfinder** (decided June 11, 2026 — Star Trek Voyager reference)

**Key architectural decision (June 2026):** The transit library is the app backend seed. Every breakdown file is a future database row. The frontmatter schema is already nearly a database schema. Build with this architecture in mind.

---

## Build Session SOP

**At session start:**
1. Check `app/backlog.md` — current Now sprint, Next queue, and Ideas (single source of truth for priorities)
2. Check `app/product-decisions.md` — prior architecture decisions (don't revisit settled questions)
3. Note any items in `_inbox/capture.md` that are business-relevant
4. Scan `transit library/INDEX.md` for any timing context that affects the build

**During session:**
- If a decision is made, log it in `app/product-decisions.md` immediately
- If a feature idea emerges, add it to `app/backlog.md` Ideas section — don't lose it
- If a market/positioning insight surfaces, add it to `app/market-strategy-2026-06-05.md`
- If a reading quality improvement emerges during a build session, apply it to `app/voice-canon.md`

**File routing during build sessions:**

| Topic | File |
|-------|------|
| Current sprint + priority queue + ideas | `app/backlog.md` |
| App phases, vision, business context | `app/app-vision.md` |
| Architecture decisions (keep/not revisit) | `app/product-decisions.md` |
| Market positioning, ICP, competitive | `app/market-strategy-2026-06-05.md` |
| Reading quality standards | `app/voice-canon.md` |
| Agent architecture + prompt engineering | `app/agent-architecture.md` |
| Early user feedback, testimonials | `app/testimonials.md` |
| Transit data infrastructure | `routine/` folder |

---

## Product Decision Framework

Before proposing a new feature or architectural change, evaluate it against:

1. **Does it serve the reading?** App features exist to make the readings better or more accessible. Features that are clever but don't improve the core reading experience are noise.

2. **Does it scale to Phase 2?** Phase 1 is manual+automated for Jordan. Phase 2 needs to work for 20 people with different birth charts and reading preferences. Don't build Phase 1 things that break at Phase 2.

3. **Is it the transit library pattern or something different?** The transit library is the established architecture for depth. New features should plug into this pattern (transit ID → breakdown file → in-app navigation) rather than creating parallel systems.

4. **What does Jordan's chart say about the timing?** Seriously. Use the transit context. If Uranus is opposing Jordan's Sun (identity disruption), it's not the week to finalize brand decisions. If Jupiter is trining the Scorpio stellium (creative expansion), it's the week to scope Phase 2.

---

## Intake Protocol

When Jordan brings a friend/client's birth data to the workspace, follow this intake:

1. **Create `charts/[name-lowercase].md`** with:
   - Full name (first name only for privacy if preferred)
   - DOB + time + location
   - House system (use Placidus unless otherwise specified)
   - Natal placements table (calculate using NATAL.md Python workflow or Time Passages)
   - Key patterns note (1–2 sentences on the dominant themes)

2. **Verify the data before building anything:**
   - Confirm time zone is correctly applied
   - Confirm house system
   - If birth time is unknown, use noon and note it explicitly

3. **Do not build the natal chart HTML until Jordan confirms the data is correct** — rebuilding the HTML for a data error is expensive time.

4. **After the natal chart is built:**
   - Move source data to `charts/[name].md` if it's not already there
   - File the HTML to `natal readings/[name].html`
   - If synastry work is needed, note it in the chart file

---

## Agent Architecture Context

The long-term vision is a multi-agent system where:
- **Data agent:** Fetches live positions via Swiss Ephemeris, calculates aspects, updates the daily transit board
- **Interpretation agent:** Takes the transit board + natal chart + transit library context, writes the reading
- **Memory agent:** Manages KNOWLEDGE.md correlations, tracks what's been verified over time
- **Personalization agent:** Will eventually adapt readings for users who aren't Jordan (Phase 2+)

Current state: Jordan is running the data layer manually (astrolibrary.org fetch) and Claude is the interpretation agent. The routine automates the daily writing via the 4am CDT Claude.ai routine.

Full architecture spec: `app/agent-architecture.md`

---

## Business + Transit Context (live)

Use transit context to time business decisions:

**Jupiter △ natal Pluto (Scorpio 5th) — June 2026 peak:**
This is the window for bold creative business moves. The creative work feels more powerful and more visible than usual. Phase 2 scoping, brand name decision, and the first paying client setup should happen during this window (through mid-July).

**Uranus ☍ natal Sun — 3-pass, through 2027:**
Identity container is being renovated. The professional self-presentation shift (from "content operations director who does astrology privately" to "someone building a real astrology product") is the transit being lived. The business launch is not separate from the transit — it IS the transit event. Each pass deepens the identity shift.

**Neptune ☌ natal Moon (10th house) — peak late June 2026:**
Creative vision is at maximum height. The business ideas generated now will be more imaginative, more emotionally resonant, and more ambitious than normal. Use this window for vision work. Use Pluto sextile Moon (simultaneously active) to give it structure.

---

## Push After Build Sessions

Any changes to workspace files that should be backed up:
```bash
cd "/Users/jordanashleybarney/Library/Mobile Documents/iCloud~md~obsidian/Documents/pathfinder"
git add -A && git commit -m "build session: [brief description]" && git push origin main
```

---

*This file covers build/business session SOPs. Load READING-FORMAT.md if a build session also involves writing readings or developing voice standards.*
