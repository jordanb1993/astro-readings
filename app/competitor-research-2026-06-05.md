# Competitor Research — 2026-06-05
*Agent 4 output. Screenshots taken via Playwright. Sources: live homepages.*

---

## The Six

### Co-Star

**Aesthetic:** Pure black and white. Editorial, stark, almost clinical. Phone mockups on white backgrounds. Zero warmth.

**Tone:** Science-credentialing ("real data," "actual NASA information"). Positions itself as the antidote to vague horoscope content.

**Features:** Daily push notifications, real-time transit insight, synastry/compatibility pairing, birth chart.

**UX Pole:** Analytical (Pole B), but delivered in soundbite format. Short sentences, opaque language — users report interpretations often feel random or mysteriously harsh. The data is rigorous; the interpretation feels algorithmic.

**Market position:** Broke astrology into mainstream culture via design credibility alone. Millions of users. Became a cultural moment.

**Gap:** Emotionally cold. No beauty. No depth. Users know how to use it but don't feel seen by it. The aesthetic is borrowed from fashion/editorial, not from the actual visual history of astrology.

---

### The Pattern

**Aesthetic:** Also black and white, minimal. Nearly indistinguishable from Co-Star in visual language.

**Tone:** Psychological self-help. "Understand Yourself on a Deeper Level." Personality patterns, relationship dynamics, self-awareness framing.

**Features:** "Your Pattern" (personality profile from chart), "Your Bonds" (synastry), transit overlays, time travel (past pattern review).

**UX Pole:** Leans Pole A. More interested in how you function than what your chart says technically. But it's not conversational — it presents interpretations as statements, not invitations.

**Market position:** Co-Star's psychologically softer sibling.

**Gap:** Still monochrome. No artist's hand anywhere. The psychology is genuine but the delivery is flat. No ritual, no beauty, no sense of the sacred.

---

### CHANI

**Aesthetic:** Illustrated, collaged, handwritten-feel. Warm. Distinctly queer and feminist. Editorial blog with art direction — thinks of itself as a media brand.

**Tone:** Activist, empowering, politically conscious. Strong author voice (Chani Nicholas). The writing is genuinely good.

**Features:** App with natal readings, daily horoscopes ("what's in the sky"), new moon rituals, blog, recommended resources.

**UX Pole:** Pole A strongly. Therapeutic, narrative, emotionally resonant. The readings are meant to make you feel something.

**Market position:** The premium spiritual brand. Has a worldview, not just a feature set.

**Gap:** The aesthetic is illustration-driven, not celestial or sacred geometry. It's cozy and hand-drawn, not strange or otherworldly. Also very tied to one person's voice — not a system you could run without Chani Nicholas in it. Walled off to users who don't share her politics (a feature for her audience, but a ceiling elsewhere).

---

### Sanctuary

**Aesthetic:** Purple/navy, photo-heavy, marketplace UI. Star ratings, reader profiles, gift card promotions.

**Tone:** Service-oriented, transactional. "Expert Psychic Readings Online — Get Clarity in 5 Minutes."

**Features:** Live human reader marketplace (astrology, tarot, psychic), daily horoscopes, mobile app.

**UX Pole:** Pole A via human intermediary. The "conversation" is with a paid reader, not the app.

**Market position:** Psychic services modernized. Astrology as a concierge product.

**Gap:** Impersonal despite promising intimacy. The marketplace model is a paradox — you're buying a connection, which undermines it. Feels like a service directory. No beauty, no art.

---

### Time Passages

**Aesthetic:** Traditional software UI. Dark navy with teal accents. Feature comparison tables, desktop screenshots, tiered pricing.

**Tone:** Technical, professional. Sold on accuracy and comprehensiveness.

**Features:** Full chart calculation software (desktop + iOS), transit and progression timelines, solar arc directions, AI report add-on, synastry grids. Tiered pricing from $28 to $489.

**UX Pole:** Deep Pole B. Made for practitioners, not newcomers.

**Market position:** The professional's tool. The thing serious hobbyists and working astrologers use.

**Gap:** Unattractive. Designed for function, not experience. Not discoverable or shareable. Nothing about it invites non-practitioners in.

---

### Astro.com (Astrodienst)

**Aesthetic:** Web 1.0. Dense, information-first, utilitarian layout. Planet data tables, educational article lists, small thumbnails.

**Tone:** Academic, authoritative. The gold standard for technical accuracy. Has been the reference site since the 1990s.

**Features:** Free chart calculation (multiple house systems, multiple chart types), ephemeris, educational content, psychological horoscope reports (AstroCom), community.

**UX Pole:** Extreme Pole B. This is reference infrastructure, not a reading experience.

**Market position:** The library. Free, comprehensive, trusted by professionals worldwide.

**Gap:** No experience design at all. Completely inaccessible to newcomers without guidance. Has enormous data but no soul. A tool, not a companion.

---

## The White Space

After looking at all six, here is what does not exist in the market:

1. **Sacred geometry + warm color** — nobody. Co-Star/Pattern use editorial minimalism. CHANI uses hand-illustration. Time Passages/Astro.com use software UI. No one is working in the visual language of the actual tradition — celestial maps, alchemical illustration, sacred geometry, illuminated manuscript energy.

2. **Technical precision + emotional warmth** — nobody does both. CHANI has warmth, not precision. Time Passages has precision, not warmth. The reading scroll already occupies this space.

3. **A reading as artifact** — the competitors all deliver information in feeds, cards, notifications, reports. None of them create something you'd want to return to as an object. The natal chart HTML is an art object. That's uncrowded territory.

4. **Strange + beautiful** — the inspo aesthetic (sacred geometry + watercolor + weird) is genuinely not present anywhere in this market. This is not an accident. It's a harder target. Most apps optimize for clean and legible. Leaning strange and artistic is a real differentiator.

---

## UX Pole Decision

See `product-decisions.md` for the ruling. Short version here:

**The pole framing is a false binary for this product.** The reading isn't a chatbot (Pole A) or a data dashboard (Pole B). It's a third thing: **a contemplative artifact.** You read it slowly. You come back to it. The experience is immersion, not interaction.

If the app ever develops interactivity, it should follow CHANI's model (narrative, empowering, author-voiced) rather than The Pattern's (personality quiz + card format). But the natal reading itself — the core deliverable — should stay a scroll. An art object. A thing that was made for you specifically.

The open question isn't pole A vs. B. It's: **what do users do on days 2, 3, 10?** The scroll works beautifully as a first encounter. The return visit problem (flagged in app-vision.md as the main anti-pattern) is what still needs to be solved.

---

## User Pain Points Observed Across Competitors

*From homepage copy, testimonials, and implied positioning gaps:*

- **"I don't understand my chart"** — Co-Star and Astro.com give you data without context for what it means.
- **"It doesn't feel like me"** — The Pattern and Co-Star interpretations are algorithmically flat; users feel mis-described.
- **"I've outgrown the daily horoscope"** — Co-Star's push notifications are the main retention mechanic but intermediate users find them shallow.
- **"I want depth, not a personality quiz"** — The Pattern's "pattern" framing reduces the chart to traits.
- **"The design feels like a tech product, not something sacred"** — The aesthetic of Co-Star/Pattern has been widely noted as cold; users who care about ritual and beauty go elsewhere (usually to Instagram astrologers, not apps).
- **"I had to pay for a reading from someone I don't know"** — Sanctuary's model creates transactional anxiety; people want intimacy but can't trust a stranger to know them.

---

*Files saved: competitor-research-2026-06-05.md*
*Next: update product-decisions.md with UX pole ruling*
