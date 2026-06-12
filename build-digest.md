---
cssclasses: stars-reading
tags:
  - build
  - digest
---

# Build Digest — Pathfinder App
*Cold-start synthesis. Load at the start of any build or business session. Updated at session end.*
*Last updated: 2026-06-12 (Session 16)*

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

---

## In Progress / Next Up

| Item | Priority | Notes |
|------|----------|-------|
| Supabase intake form for readings | 🟢 Low urgency | Jordan wants it; Vercel + Supabase + GitHub is target infra stack |
| Sky at Work weekly content cadence | 🟡 Ongoing | Update dates + planet data + voice canon rewrite each week — full template now solid |
| Voice canon drafts — 8 remaining charts | 🟡 Ongoing | Carina, Mimi, Hazel, Iza, Kate, Su, Yvonne + Cat — `.md` draft files in `charts/` |
| Reddit vocabulary research | 🟢 Low urgency | r/astrology, r/AskAstrologers, r/astrologyreadings → voice-canon.md |
| Routine live update | 🔴 Jordan action | Paste updated ROUTINE-UPDATE-INSTRUCTIONS.md into claude.ai/code/routines — **includes new health-log write step (step 12)** + em dash ban + June 12 additions. Go to claude.ai/code/routines → find `trig_01Rtm1xSST2GbdCZh896F2vP` → replace prompt. |

---

## Beta Pipeline

See `app/beta-users.md` for full detail.

| Person | Chart | Birth Data | Features Seen |
|--------|-------|-----------|---------------|
| Jordan | ✅ Built | ✅ On file | Everything |
| Marina | ✅ Built | ✅ On file | Natal chart (scrolling HTML format, pre-Pathfinder) |
| Dasha | ✅ Built | ✅ On file | Natal, daily reads, transit library, Sky at Work |
| Krista Kellogg | ⏳ Waiting | ❌ Needed | #astroflow-weekly, full app demo June 12 |
| Kristen Bell | ⏳ Waiting | ⏳ Sending | Full app demo June 12 (~noon birth time, checking certificate) |

---

## Open Loops

> [!abstract] Waiting On
> - **Krista Kellogg** — birth date, time, city still needed → DM or ask at next sync
> - **Kristen Bell** — birth info promised after lunch June 12 → check Slack/messages
> - **Routine live update** — Jordan action: paste updated ROUTINE-UPDATE-INSTRUCTIONS.md into live routine at `claude.ai/code/routines` → routine ID `trig_01Rtm1xSST2GbdCZh896F2vP`. Includes health-log write step — **routine won't log runs until this is done.**

> [!note] Keep in View
> - **Natal reading structure decision** — open in `product-decisions.md`; 9-tab is implemented but the deeper Liz Greene therapeutic arc sequence (Portrait → Signature → Constitution → Formative → Shadow → Arc → Archetype → Poem) is the next structural evolution. Not urgent — current builds are clean.
> - **All future natal builds = Pathfinder app format only** — no more standalone scrolling HTML chart builds (decided June 12)
> - **Phase 2 planning** — closed subscriber cohort ~20 people at $20–35/mo; not yet started; Phase 1 (build + internal beta) still in progress
> - **Marina chart** — currently scrolling HTML format (pre-Pathfinder); will need Pathfinder rebuild eventually

---

## Recent Wins
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
