---
cssclasses: stars-reading
---

# Stars Inbox

_Drop anything here. Business ideas, reading requests, app features, astro insights, name ideas, friend chart data, anything that belongs to this world. Claudia routes it._

---

## FOR CLAUDIA — next session start (Playwright is live)

**Session order:**
1. Visual audit pass on carina.html + chart-wheel.html using Playwright (screenshots first, then fix)
2. Verify Jupiter/MC flag in carina.html
3. Competitive intelligence research (second, after the build is locked)

---

### PART 1 — Visual audit with Playwright (do this first)

Playwright can take real screenshots of the live pages. Use it to do what a code-only audit can't: see exactly what Carina sees, catch rendering issues, lock in the design before it goes out.

**Pages to screenshot and audit:**
- `https://jordanb1993.github.io/astro-readings/natal%20readings/carina.html` — full desktop pass: hero, chart wheel embed, identity trio, planet pills, sig panel, deep dive cards, synastry section, through-line. Then mobile viewport (375px wide).
- `https://jordanb1993.github.io/astro-readings/natal%20readings/chart-wheel.html` — standalone wheel: full render, key overlay open, mobile viewport.

**What to look for:**
- Chart wheel iframe: does it render fully at 680px height, or does it clip? Does the background blend?
- Celestial columns: do they now run full viewport height after the SVG fix?
- Planet pill detail strip: does it have enough height when text is long?
- Chart Key button + Save as PDF button: spacing, overlap risk on small screens?
- Mobile: hero section, trio cards, dive cards — anything cramped or broken at 375px?
- Typography: pull quotes at 1.20rem, pill labels at 0.70rem — do they read well?
- Constellation background: visible and atmospheric, or too subtle / too heavy?
- Any layout shifts, broken gradients, clipped elements

Fix whatever needs fixing. Jordan wants this locked before Carina gets the link.

**Also verify:** "Jupiter in Libra on the Midheaven" in the sig-panel and through-line. If MC is ~11° Virgo (as suggested by the NNode square MC aspect at 0.25° orb in Sag/Virgo), change to "in the 10th house." Needs a Time Passages spot-check or chart data verification.

---

### PART 2 — Competitive intelligence (after visual pass is done)

Use Playwright to visit each competitor, screenshot key screens, scrape help desk content for user pain points. Full spec in `the build/agent-architecture.md` → "Agent 4."

**Targets:** Co-Star · The Pattern · CHANI · Sanctuary · Time Passages · Astro.com (+ their help desks)

**Goal:** Answer the open UX decision — conversational/therapeutic (Pole A) vs. analytical/technical (Pole B). File findings to `the build/competitor-research-[date].md`, update `product-decisions.md`, surface answer to Jordan.

---


%%
PROCESSED May 22, 2026:
- Tarot reading → readings/2026-05-22-tarot.md + tarot-log.md entry added
- Creative writing voice idea → filed to app-vision.md (pending — flag for next app vision session)
- Round natal chart with map key + houses + degrees → filed to app-vision.md (pending)
- Marina's response to her natal chart → noted ✅ (positive feedback on reading quality)

PROCESSED June 5, 2026:
Source: Gemini conversation — app-build transit mapping + multi-agent architecture
- Astrological framing (Chiron 11th house, Uranus/South Node 12th, Jupiter-Pluto, NNode-Jupiter, Neptune-Moon) → KNOWLEDGE.md Part Thirteen
- Agent architecture (3 agents, non-linear routing, modular build, 12th house invisible thinker) → the build/agent-architecture.md
- Product decisions (UX pole OPEN, business model OPEN, stealth mode RESOLVED) → the build/product-decisions.md
- SPARK/FUEL/ENGINE/CODE framework → app-vision.md + agent-architecture.md
- Interface design principles (gamified/joyful, not dry data blocks, conversational vs. analytical open) → agent-architecture.md
- Intake protocol created → the build/intake-protocol.md
- Co-builder dual role formalized → CLAUDE.md
%%
