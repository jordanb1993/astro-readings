---
cssclasses: stars-reading
tags:
  - build
  - digest
---

# Build Digest — Pathfinder App
*Cold-start synthesis. Load at the start of any build or business session. Updated at session end.*
*Last updated: 2026-06-13 (Session 19)*

---

## What's Live

| Feature | Status | Notes |
|---------|--------|-------|
| Jordan natal chart (jordan.html) | ✅ Live | 9-tab, voice canon complete, Archetype: "The Cartographer at the Seam" — flip card + compass rose sigil |
| Marina natal chart (marina.html) | ✅ Live | 9-tab, voice canon complete, Archetype: "The Generous Light" — flip card + radiant sun sigil |
| Dasha natal chart (dasha.html) | ✅ Live | 9-tab, voice canon complete, Archetype: "The Threshold Keeper" — flip card + threshold sigil |
| Mimi natal chart (mimi.html) | ✅ Live | 9-tab Pathfinder, voice canon complete, Archetype: "The Deep Channel" — crimson/midnight two-pillar sigil, numeral II, 5 synastry contacts |
| Carina natal chart (carina.html) | ✅ Live | 9-tab Pathfinder, voice canon complete, Archetype: "The Cartographer" — parchment gold/ink blue compass rose sigil, numeral IX, 6 synastry contacts |
| Kate natal chart (kate.html) | ✅ Live | 9-tab Pathfinder, voice canon complete, Archetype: "The Keeper of the Veil" — rose/teal veil + crescent sigil, numeral XVIII, 8 synastry contacts |
| Hazel natal chart (hazel.html) | ✅ Live | 9-tab Pathfinder, voice canon complete, Archetype: "The Signal Reader" — antenna sigil, numeral XVII, 3 synastry contacts (niece scope) |
| Iza natal chart (iza.html) | ✅ Live | 9-tab Pathfinder, voice canon complete, Archetype: "The Interior Architect" — compass dividers sigil, numeral XI, 3 synastry contacts |
| Su natal chart (su.html) | ✅ Live | 9-tab Pathfinder, voice canon complete, Archetype: "The Interior Press" — quill sigil, numeral I, 4 synastry contacts |
| Yvonne natal chart (yvonne.html) | ✅ Live | 9-tab Pathfinder, voice canon complete, Archetype: "The Interior Witness" — witnessing eye sigil, numeral XX, 8 synastry contacts (close friend) |
| PWA icon (rose-gold) | ✅ Live | Bright compass rose, 24 tick marks, rose/gold gradient bg, glow filters — all friend builds + jordan.html |
| Social preview system | ✅ Live | OG + Twitter card meta on all 10 charts; per-person manifests; og-preview.png **600×600 square** (twitter:card=summary) — no edge cropping when shared |
| Patch script | ✅ Live | `app/patch.py` — decorator registry, --change/--dry-run/--only/--list; 3 starter patches (geo-bg-check, og-title-check, card-back-padding) |
| Sky at Work icon + PWA | ✅ Live | Night-city-at-dawn cityscape icon, standalone manifest, distinct from Pathfinder compass rose |
| Daily reads | ✅ Live | Overnight automation running ✓ — first run June 12 |
| Transit library | ✅ Live | Applying / separating / returning states, accordion detail, first/second pass timing |
| Wheel of the year | ✅ Live | Lunar cycles + pagan calendar, natal-personalized mini-reads |
| Sky at Work | ✅ Live | June 15–21 shipped June 12 — full voice canon rewrite, week thesis line, Your Sign tab, updated planet strip + signal board |
| New Moon in Gemini ritual — Jordan | ✅ Live | "The Threshold Crossing" — gold ritual card, natal anchor pills (ASC 29° Gem, S.Node H12, Sun opp Sag), 3 practice steps + closing question |
| New Moon in Gemini ritual — Marina | ✅ Live | "The Speaking True" — gold ritual card, Venus 25° Gem H9 + Venus-Chiron exact sextile axis, 3 practice steps + closing question |
| Sky at Work — Dasha + Marina | ✅ Live | Home card + Wheel tab added to both apps — all 3 charts now have full Sky at Work integration |
| PWA rebrand | ✅ Live | manifest.json → "Pathfinder" name/short_name, compass rose icon.svg redrawn (brighter, gold cardinal points), apple-touch-icon.png regenerated |
| Nav icons + alignment | ✅ Live | ⊙ (Constant) · ☽︎ (Variable) · ⊕ (Wheel) — semantic icons, VS15 on Variable; 22px flex container fixes baseline alignment across all 3 apps |
| Design system library | ✅ Live | `app/design-system.md` (Obsidian token + code reference) + `natal readings/design-system.html` (live browser preview of all components) |

---

## Priorities + Queue

→ See [`app/backlog.md`](app/backlog.md) — Now sprint, Next queue, Radar, Ideas, and recent Shipped log.

---

## Beta Pipeline

See `app/beta-users.md` for full detail.

| Person | Chart | Birth Data | Features Seen |
|--------|-------|-----------|---------------|
| Jordan | ✅ Built | ✅ On file | Everything |
| Marina | ✅ Built | ✅ On file | Natal chart (scrolling HTML format, pre-Pathfinder) |
| Dasha | ✅ Built | ✅ On file | Natal, daily reads, transit library, Sky at Work |
| Mimi | ✅ Built | ✅ On file | New Pathfinder app — pending delivery |
| Carina | ✅ Built | ✅ On file | New Pathfinder app — pending delivery |
| Kate | ✅ Built | ✅ On file | New Pathfinder app — pending delivery |
| Krista Kellogg | ⏳ Waiting | ❌ Needed | #astroflow-weekly, full app demo June 12 |
| Kristen Yim Bell | ✅ Chart filed | ✅ On file | Full app demo June 12 — chart at `charts/kristen-bell.md` |

---

## Open Loops

> [!abstract] Waiting On
> - **Krista Kellogg** — birth date, time, city still needed → DM or ask at next sync
> - **Kristen Bell** — birth info promised after lunch June 12 → check Slack/messages
> - **Cat** — birth data never collected; `charts/cat.md` is a blank template. Jordan needs to ask Cat directly.

> [!note] Keep in View
> - **All future natal builds = Pathfinder app format only** — no more standalone scrolling HTML chart builds (decided June 12)
> - **Phase 2 approaching** — closed subscriber cohort ~20 people at $20–35/mo; Phase 1 (build + internal beta) still in progress; delivering to Mimi/Carina/Kate is next milestone
> - **Marina chart** — currently scrolling HTML format (pre-Pathfinder); rebuild queued in `app/backlog.md`
> - **Mimi, Carina, Kate** — charts built and live on Vercel; not yet delivered to them

---

## Recent Wins
- Session 19 (June 13): All-builds quality pass — 4 audit agents clean, archetype card copy trimmed to Kate's shape across 7 builds, patch script live, OG preview redesigned as 600×600 square, mimi+carina geo-bg fixed (both now 12/12).
- Session 18 (June 13): Hazel, Iza, Su, Yvonne all migrated to 9-tab Pathfinder app — all 8 active friend builds now live. Rose-gold icon redesign shipped. Social preview system (OG + per-person PWA manifests) deployed across all charts. Sky at Work gets its own icon + PWA manifest.
- Session 17 (June 13): Mimi, Carina, Kate all migrated to 9-tab Pathfinder app format — full voice canon, unique archetype flip cards with personal sigils + palettes, synastry-with-Jordan in Arc panel. Deployed to Vercel. Old scrolling mimi.html archived.
- Session 16 continued (June 12): New Moon rituals written + shipped for Jordan and Marina (natal-personalized, gold card format); all 3 apps now have ⊙/☽/⊕ nav icons + compass rose PWA icon; design system library launched (md + HTML)
- Session 15 (June 12): Full voice canon rewrite across all 3 charts, 9-tab restructure, transit UI polish — all in one session
- First overnight automation run June 12 — app generated Jordan's daily read while she slept
- Dasha, Krista, and Kristen Bell all reacted to the app in real time on June 12 calls — strong beta pull → see `app/testimonials.md`
- Sky at Work beginner pivot confirmed: cards interface + "What's driving this?" reveal is the right architecture

---

## Business Context (quick ref)
- **Phase 1:** Build + internal beta (Jordan + close friends) — current
- **Phase 2:** Closed subscriber cohort ~20 people at $20–35/mo
- **Phase 3:** Public app
- **Product name:** Pathfinder (Voyager/Barclay ref)
- **Natal reading name:** The Constant
- **Transit/daily reading name:** The Variable
- **Deploy:** Vercel (`pathfinderastro.vercel.app`) · always deploy from `pathfinder/` root
- **Sky at Work:** Sub-product of Pathfinder — workplace collective transit channel, hosted within the same app
