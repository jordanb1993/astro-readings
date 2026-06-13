---
cssclasses: stars-reading
tags:
  - build
  - backlog
---

# Pathfinder Backlog
*Single source of truth for build priorities, queue, and ideas.*
*Updated at the end of every build session. Loaded alongside build-digest.md at build session start.*
*Last updated: 2026-06-13 (Session 19)*

---

## 🟢 Now — Active Sprint
*Max 5 items. What we're building this session or this week.*

- [ ] Tappable natal planets → interpretation slide-in panel (The Constant) — the one remaining gap in "every element is a door"
- [ ] Daily push notification (return signal) — pull pulse line from today.json, surface as morning notification. The retention mechanic for days 2-3-10.
- [ ] Sky at Work June 22–28 content update — time-pressured, week starts Monday

---

## 🔵 Next — Decided & Queued
*Priority ordered. Ready to build when Now clears.*

1. **Deliver chart URLs to Mimi, Carina, Kate** — all three are deployed and live on Vercel. Phase 1 success requires charts in hands, not just built.
2. **Follow up Kristen Bell birth data** — she committed to sending after lunch June 12. Check Slack. Voice canon draft + chart build pending once received.
3. **Get Cat's birth data** — `charts/cat.md` is a blank template. No DOB, time, or location on file. Nothing can happen until Jordan asks Cat directly.
4. **Get Krista Kellogg birth data** — two prior requests unanswered. DM or ask at next sync.
5. **Friend daily transit JSON** — IS_FRIEND_BUILD flag and architecture are live. Friends currently see synastry in their Variable tab, not today's sky in their chart. Routine needs to write `[name]-live.json` per friend nightly. This is the Phase 2 unlock.
6. **Tappable Wheel elements** — same "every element is a door" principle applied to The Wheel. Lunar phases, seasonal cards → detail panels.
7. **Voice audit: older natal prose** — carina + marina natal content predates the plain-language-first protocol and expanded anti-patterns. Targeted spot-check and rewrite pass.

---

## ⚪ Radar — On Deck, Decision Pending
*Solid ideas. Need a choice before they move up. Blocking question noted.*

- **Big Three Portrait as interactive entry layer** — currently written prose in Portrait tab. Could be a reveal mechanic (tap each placement for its recognition reframe). Blocking question: does this get built pre- or post-Phase 2 launch?
- **Natal reading temporal layers** — natal sections accumulate time-stamped notes when specific transits illuminate them ("Your Chiron section, June 2026: when Chiron sextiled your ASC, this section read differently"). Makes The Constant feel alive over time. Blocking question: Phase 2 or Phase 3 scope?
- **Historical transit archive (personal autobiography)** — past transits don't disappear; they become an autobiography in transit form. Data structure exists; needs decision on where it lives at scale.
- **Routine → three-layer today.json format** — write the full three-layer reading structure directly into today.json; eliminate the `fetchPositions()` bridge. Blocking question: does this break any current JS field parsing?
- **Reddit vocabulary research sessions** — monthly, one planet per session, per voice-canon.md protocol (already written). Needs scheduling cadence.
- **Marina Pathfinder rebuild** — currently scrolling HTML (pre-Pathfinder format). Will need 9-tab migration. No urgency; voice canon draft exists.
- **Phase 2 start criteria — write the explicit threshold** — when exactly does Phase 2 begin? *(freemium + corporate brand both RESOLVED June 13 — two fewer blockers)*
- **Ephemeris: astrolibrary.org → direct pyswisseph in app** — current routine uses pyswisseph but live app data fetches from astrolibrary.org (fragile scrape). Blocking question: when does production reliability require a self-hosted ephemeris endpoint?
- **Phase 2 start criteria — write the explicit threshold** — when exactly does Phase 2 begin? Specific conditions needed: all reading types templated, N friend charts delivered, Jordan confident handing to strangers. Blocking question: what is the actual bar?

---

## 💡 Ideas — Captured, Not Yet Triaged
*Raw from sessions and inbox. Triage into Radar or archive at session end. Source + date noted.*

- **Persistent glossary key** (June 13 inbox) — Chart Key becomes a floating overlay anchored top-right, persists across all panels regardless of navigation state. Current ✦ button already exists; drawer just needs to survive panel switches. Implementation: floating card with z-index above panels, toggles on/off independently.
- **Supabase intake form** (ongoing) — replace the Request a Reading modal placeholder with a real Supabase-backed intake. Phase 2 infrastructure. Free tier available.
- **Area-specific readings** — love / career / money / body / creativity through the natal chart lens. One reading template per area. Phase 2 reading type expansion.
- **Workplace synastry / compatibility matching** — select self + coworker → practical guidance on working-together dynamics. Dasha's explicit request (June 9). Phase 2: manual first, automated interface later.
- **South Node / past life readings** — dedicated natal section on South Node, 12th house, karmic indicators. Steven Forrest "Yesterday's Sky" as primary research source. Phase 2 depth expansion.
- **Interface skins / theming** — user-selectable visual skins: Whimsigoth (default), Y2K hot pink, earth tones, clean minimal, seasonal auto-shift. Phase 3 endgame. Architecture already supports it (CSS vars in place).
- **Transit-to-transit library: societal layer** — what Venus conjunct Jupiter means collectively, for culture and zeitgeist. Extends the workplace transit-to-transit work. Phase 3 content + SEO fodder.
- **SEO / AEO content structure** — transit library + natal interpretation pages as passive acquisition channel. `llms.txt` at root (same pattern Dasha built for AI Playbook). Phase 2-3.
- **Competitive intelligence session** — Playwright MCP to visit Co-Star, CHANI, The Pattern, Sanctuary, Time Passages, Astro.com. Screenshot key screens, scrape help desk/FAQ. Not yet run. Spec exists in `app/agent-architecture.md`.
- **Voice training corpus** — TCD MFA creative writing, workspace readings archive, short written interviews ("How do I talk about Chiron?"), voice notes for rhythm. Phase 2-3 formalization.
- **Resend email delivery** — Phase 2 subscriber email infrastructure. Free tier. API-accessible. Dasha uses it. Pairs with Supabase for the full Phase 2 delivery stack.
- **People switcher / multi-chart support** — switch between saved charts within the app. Phase 3 architecture change.
- **New moon / full moon ritual template formalized** — Jordan + Marina rituals exist and are the template. Write the generation spec so future rituals aren't rebuilt from scratch.
- **Visual Polish Queue** (app-vision.md) — 12+ queued chart wheel + reading refinements not yet built: hover tooltips on chart wheel planet glyphs (name/sign/degree/house/1-line meaning), aspect lines animate in on page load, degree tick marks in zodiac band, scroll-based color shift through natal reading (IntersectionObserver), section header mini-dividers (`· ✦ ·`), glassmorphism iridescent shimmer on scroll, responsive hero name sizing, hover-expand aspect rows, through-line SVG constellation behind text, chart wheel `?embed=1` param for iframe use. Full queue in `app/app-vision.md`.
- **Corporate product pricing template** (app-vision.md) — career transit reading ($85–125), negotiation/timing consult ($55 add-on), team Sky at Work package ($200–400/mo). Pricing architecture to lock before first corporate customer.
- **"Business casual whimsigoth" aesthetic for Sky at Work** (the bones, seeded May 20) — distinct visual register for the corporate product line: cleaner, more professional, same design DNA as Pathfinder but adapted for Slack and workplace contexts.
- **Macro narratives in workplace readings** (the bones, seeded May 20) — weave big-picture transit themes (AI disruption era, tech cycles, market shifts) alongside personal transits in Sky at Work content. Makes it culturally resonant, not just personal scheduling intelligence.
- **Dasha business/money synastry** (the bones, seeded May 20) — run Jordan + Dasha chart comparison for business partnership indicators. She's asked for it directly; also a test case for the workplace synastry feature.
- **Intake form design specification** (agent-architecture.md) — Phase 2 needs real intake beyond birth data: focus area (love/career/body), current life chapter, emotional context. What questions does Jordan actually need to generate a great reading? Write the spec before building the form.
- **Service worker / offline PWA support** (app-vision.md) — makes natal chart builds work without a network connection; especially valuable for The Constant (all static content). Optional Phase 1, high value Phase 3.
- **Routing agent emotional register detection** (agent-architecture.md) — Phase 2 multi-reading architecture: which reading type to generate, and how; rule-based keyword detection vs. LLM-based intent detection. Needs spec before Phase 2 automation.
- **Written interview corpus** (app-vision.md) — short pieces answering "How do I talk about Chiron?", "What do I notice first in a chart?", "What's my take on Neptune?" — foundational voice training material for Phase 3 voice layer.
- **Audio voice notes for rhythm training** (app-vision.md) — Jordan recording herself reading passages naturally; lets AI absorb her speech rhythm and register for Phase 3. The TCD MFA writing is the written corpus; audio is the spoken one.
- **Social content strategy** (product-decisions.md) — TikTok, Instagram Reels, or neither until Phase 2. Open decision; revisit when there's product to demonstrate.
- **Apple App Store trademark check** — verify "Pathfinder" clears before Phase 3 public launch (different class from Pathfinder RPG and Nissan Pathfinder, but worth confirming).

---

## ✅ Shipped — Last 3 Sessions

### Session 19 — June 13, 2026
- Quality audit: 4 parallel agents on hazel, iza, su, yvonne — all passed 23-item checklist clean
- Archetype card copy trimmed to Kate's shape across 7 builds: 3 short paras, P3 = one-liner kicker, CSS scroll rejected
- Patch script live: `app/patch.py` — decorator registry, `--change/--dry-run/--only/--list`; 3 starter patches (geo-bg-check, og-title-check, card-back-padding)
- OG preview redesigned: 600×600 square, `twitter:card` → `summary`, centered compass rose, no edge cropping on share
- Mimi + Carina geo-bg fixed to 12/12 (caught immediately by patch script — proof of tool value)

### Session 18 — June 13, 2026
- Hazel ("The Signal Reader"), Iza ("The Interior Architect"), Su ("The Interior Press"), Yvonne ("The Interior Witness") — all full 9-tab Pathfinder builds with voice canon + unique sigils
- Rose-gold compass rose icon redesign: plum gradient bg, 24 tick marks, glow filters, bright north tip
- Sky at Work distinct icon: night city at dawn, crescent + stars, golden sun arc, navy-teal (contrasts Pathfinder plum)
- PWA + OG/Twitter meta across all 10 builds; per-person manifest files
- Synastry duplicate removed from Arc tab — now lives only in Variable panel

### Session 17 — June 13, 2026
- Mimi: "The Deep Channel" — crimson/midnight two-pillar sigil, numeral II, 5 synastry contacts with Jordan
- Carina: "The Cartographer" — parchment gold/ink blue compass rose sigil, numeral IX, 6 synastry contacts
- Kate: "The Keeper of the Veil" — rose/teal veil + crescent sigil, numeral XVIII, 8 synastry contacts
- All three: full 9-tab Pathfinder app format, voice canon complete, synastry in Arc panel
- Old scrolling mimi.html archived to `_archive/mimi-scrolling-v3.html`

---

*Items flow one direction: 💡 Ideas → ⚪ Radar → 🔵 Next → 🟢 Now → ✅ Shipped*
*Shipped keeps last 3 sessions visible. Older completions live in `app/build-log.md`.*
*Build session start: load this file alongside `build-digest.md` for full orientation.*
