---
cssclasses: stars-reading
tags:
  - build
  - digest
---

# Build Digest — Pathfinder App
*Cold-start synthesis. Load at the start of any build or business session. Updated at session end.*
*Last updated: 2026-06-12 (Session 16 continued)*

---

## What's Live

| Feature | Status | Notes |
|---------|--------|-------|
| Jordan natal chart (jordan.html) | ✅ Live | 9-tab, voice canon complete, Archetype: "The Cartographer at the Seam" — flip card + compass rose sigil |
| Marina natal chart (marina.html) | ✅ Live | 9-tab, voice canon complete, Archetype: "The Generous Light" — flip card + radiant sun sigil |
| Dasha natal chart (dasha.html) | ✅ Live | 9-tab, voice canon complete, Archetype: "The Threshold Keeper" — flip card + threshold sigil |
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

## In Progress / Next Up

| Item | Priority | Notes |
|------|----------|-------|
| Supabase intake form for readings | 🟢 Low urgency | Jordan wants it; Vercel + Supabase + GitHub is target infra stack |
| Sky at Work weekly content cadence | 🟡 Ongoing | Update dates + planet data + voice canon rewrite each week — full template now solid |
| Voice canon drafts | 🟢 7 of 9 done | ✅ Carina, Kate, Mimi, Hazel, Iza, Su, Yvonne — `.md` drafts in `charts/`. ⏳ Cat (birth data on file, reading not written) |
| Reddit vocabulary research | 🟢 Low urgency | r/astrology, r/AskAstrologers, r/astrologyreadings → voice-canon.md |

---

## Beta Pipeline

See `app/beta-users.md` for full detail.

| Person | Chart | Birth Data | Features Seen |
|--------|-------|-----------|---------------|
| Jordan | ✅ Built | ✅ On file | Everything |
| Marina | ✅ Built | ✅ On file | Natal chart (scrolling HTML format, pre-Pathfinder) |
| Dasha | ✅ Built | ✅ On file | Natal, daily reads, transit library, Sky at Work |
| Krista Kellogg | ⏳ Waiting | ❌ Needed | #astroflow-weekly, full app demo June 12 |
| Kristen Yim Bell | ✅ Chart filed | ✅ On file | Full app demo June 12 — chart at `charts/kristen-bell.md` |

---

## Open Loops

> [!abstract] Waiting On
> - **Krista Kellogg** — birth date, time, city still needed → DM or ask at next sync
> - **Kristen Bell** — birth info promised after lunch June 12 → check Slack/messages
> - ~~Routine live update~~ ✅ Done June 12 — steps 2–13 live in `trig_01Rtm1xSST2GbdCZh896F2vP`; health-log will auto-write starting tomorrow's 4am run

> [!note] Keep in View
> - **Natal reading structure decision** — open in `product-decisions.md`; 9-tab is implemented but the deeper Liz Greene therapeutic arc sequence (Portrait → Signature → Constitution → Formative → Shadow → Arc → Archetype → Poem) is the next structural evolution. Not urgent — current builds are clean.
> - **All future natal builds = Pathfinder app format only** — no more standalone scrolling HTML chart builds (decided June 12)
> - **Phase 2 planning** — closed subscriber cohort ~20 people at $20–35/mo; not yet started; Phase 1 (build + internal beta) still in progress
> - **Marina chart** — currently scrolling HTML format (pre-Pathfinder); will need Pathfinder rebuild eventually

---

## Recent Wins
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
