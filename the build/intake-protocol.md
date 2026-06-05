---
cssclasses: stars-reading
date: 2026-06-05
type: protocol
---

# Intake Protocol — Large Data Drops
*For: Gemini conversations, ChatGPT sessions, articles, research, product thinking, AI-generated analysis, long copy*
*Last updated: June 5, 2026*

---

## When to Use This Protocol

Any time Jordan drops a large piece of external content into `_inbox/capture.md` or shares it directly in session:
- Full conversations with another AI (Gemini, ChatGPT, etc.)
- Research articles or analysis
- Product thinking documents
- Astrological analysis from another source
- Technical architecture writing
- UI/UX inspiration or spec

Do not skim. Every large drop contains material across multiple categories. The first pass is comprehension, not routing.

---

## The Two-Pass Rule

**Pass 1 — Full read for comprehension.** No routing yet. Read the entire piece as a coherent argument. What is the source actually saying? What does it believe about the app, the chart, the architecture? What questions is it raising? Hold the whole thing before sorting any of it.

**Pass 2 — Categorical extraction.** Go back through and pull material into the eight categories below. Be specific — quote or paraphrase the exact claim, don't summarize loosely.

---

## The Eight Categories

### 1. Astrological Framing
New interpretations of Jordan's transits, natal placements, or timing. Includes: transit-to-build mappings, house placements, aspect framings, timing windows.

**Verification rule:** Before accepting or filing any astrological claim, run independent verification:
- Aspect type and orb: calculate from natal chart in INSTRUCTIONS.md
- House placement of transiting planets: requires full house cusp table, not just natal point table. Do not assume — calculate or confirm with Jordan.
- Never claim another source made an error without completing this check first.

**Files:** KNOWLEDGE.md (new correlation or pattern) · daily reading context if time-sensitive

---

### 2. Agent Architecture
Technical specifications for how the app works internally: agent types, agent behaviors, routing logic, pipeline design, data flow, backend principles.

**Extraction prompts:**
- What specific agents or agent behaviors are named?
- Is the architecture described as linear or non-linear?
- Is modularity mentioned? How?
- What does the backend need to do that the current workspace doesn't?

**File:** `the build/agent-architecture.md`

---

### 3. Product Decisions
Business model choices, feature scope, platform decisions, pricing, launch sequence, open questions requiring Jordan's explicit choice.

**Extraction prompts:**
- Is this a resolved decision (already decided) or an open question?
- What are the options being weighed?
- What new constraints or considerations does this introduce?

**File:** `the build/product-decisions.md`

---

### 4. UX / Interface Design
How the app looks and feels to users: interaction patterns, visual design direction, navigation, emotional tone of the experience, gamification, discovery vs. report delivery.

**Extraction prompts:**
- What visual or interaction principles are stated?
- What is the app NOT supposed to feel like (anti-patterns)?
- What existing elements (chart wheel, signal board, natal HTML) does this relate to?

**File:** `app-vision.md` (visual polish queue or new interface section)

---

### 5. Agent Training / Calibration
How the AI agents should be prompted, calibrated, or fine-tuned: tone, register, emotional intelligence, what the agent knows about users, what it should never do.

**Extraction prompts:**
- What emotional or therapeutic behaviors are specified?
- How should the agent handle distress vs. curiosity vs. data requests?
- What existing workspace training (voice-canon.md, KNOWLEDGE.md patterns) does this extend?

**File:** `the build/agent-architecture.md` (training section) · `the build/voice-canon.md`

---

### 6. Voice / Reading Quality
Standards for the reading voice: prose quality, what makes a reading land, tone calibration, anti-patterns to cut, Jordan's voice DNA.

**File:** `the build/voice-canon.md`

---

### 7. Business / Market
Revenue, pricing, platform, marketing, competitor positioning, target customer, brand name. Anything about the business as a business rather than as a product.

**Cross-workspace:** `the bones/Money/astrology-business-plan.md` · `the bones/Money/astrology-business-scope.md`
**Local:** `app-vision.md` revenue/market section

---

### 8. Research Queue
Things I need to research before responding properly. Technical questions I can't answer from existing context. Things to web-fetch, look up, or think through in more depth.

**What to do:** Surface immediately. Name the specific question and why I can't answer it from current context. Do not file or summarize until research is done.

---

## Open Decisions vs. Resolved Decisions

Every product decision extracted in Category 3 gets one of two labels:

**OPEN** — Jordan hasn't decided yet. Surface it explicitly. Hold it in `product-decisions.md` until resolved. Never assume a default.

**RESOLVED** — Jordan has made this call, either in session or in a prior document. File it to `product-decisions.md` as resolved and don't re-open it.

---

## After Intake: What Gets Cleared

Once all material has been routed:
- Clear the entries from `_inbox/capture.md` (keep the header and any `%%` archive comments, remove the content below `---`)
- Add a processing note to the `%%` archive block: date, source, what was filed where
- If significant updates were made to multiple files, surface a brief intake summary to Jordan: what was filed, what decisions are now open, what research is queued

---

## The Build + Astrology Connection

When material contains both astrological framing AND build implications for the same topic, cross-link them. The chart is the design system. The transits time the build phases. This isn't metaphor — it's operational. The SPARK/FUEL/ENGINE/CODE framework (from June 5, 2026 intake session) is the model for how to hold this.

When an astrological timing note is directly relevant to a build decision (e.g., Jupiter-Pluto trine exact June 9 = plant architecture seeds this week), note the transit and the timing in `product-decisions.md` or `agent-architecture.md` alongside the decision it informs.

---

## Source Credibility Notes

**Gemini / other AI sources:** Useful for brainstorming, transit framing, and product questions. Not authoritative on Jordan's chart — always verify against INSTRUCTIONS.md natal placements and full house cusp table before accepting house or placement claims.

**Jordan's direct input:** Always authoritative on her own chart experience and product vision. If she corrects a claim, update the source document and log the correction in KNOWLEDGE.md if it's astrologically significant.

**This workspace's own files:** INSTRUCTIONS.md and KNOWLEDGE.md are the authoritative ground truth for Jordan's chart. When outside sources conflict, verify from here first, then surface the discrepancy.

---

*Protocol created: June 5, 2026 — first applied to Gemini conversation on app-build transits*
*Review and update when new source types appear or routing decisions become repetitive*
