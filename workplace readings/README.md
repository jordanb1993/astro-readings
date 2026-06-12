# Sky at Work — Workplace Reading App

**What this is:** A weekly collective sky reading for Everflow coworkers, delivered as a web app at `pathfinderastro.vercel.app/workplace readings/sky-at-work.html`.

Built for a corporate audience with no astrology background. Plain language on the surface. Astrological mechanism as optional depth.

---

## Three-tab structure

| Tab | Purpose |
|-----|---------|
| **This Week** | 4 plain-English insight cards. Each has a "What's driving this?" disclosure that reveals the transit notation. No setup required. |
| **The Sky** | Collective biwheel (transiting sky, natural zodiac) + signal board (clickable aspect rows with full detail). For the curious. |
| **For You** | Sun sign picker → personalized note for the week. Go Deeper section with reading request cards. |

## Architecture notes

- Mobile-first app shell (`100dvh`, opacity crossfade panels, bottom nav)
- Responsive at ≥680px: sticky top header, bottom nav hidden, 2×2 insight card grid
- `switchPanel()` syncs both mobile and desktop navs simultaneously
- Sign selection persists via `localStorage` key `saw-sign`
- Biwheel renders from `today.json` (transiting positions); no natal ring
- Privacy: no active links to personal natal charts. Natal charts will eventually link OUT to this app, not the reverse.

## Weekly update checklist

When rebuilding for a new week:
1. Update eyebrow date + meta date in desktop header
2. Update `og:title` and `og:description` meta tags
3. Rewrite the 4 insight cards (headline, body, badge, mechanism)
4. Update the 5 signal board rows (aspects, orbs, notes, detail text)
5. Update planet strip positions
6. Update `today.json` (biwheel data source)
7. Update sign notes in `SIGN_NOTES` JS object
8. Update week progress bar start/end dates — or remove if not using
9. Push to Netlify + force CDN refresh with empty commit

## Deployed

`pathfinderastro.vercel.app` — deployed on Vercel, auto-deploys on every `git push origin main` from `pathfinder/` root.
