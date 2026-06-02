#!/usr/bin/env python3
"""
generate-positions.py:Astro workspace position calculator
Outputs all planet positions + aspect data for the Claude reading routine.

Produces:
  1. positions-today.json   :today's full planet data (transit-to-natal + transit-to-transit aspects)
  2. positions-week.json    :next 7 days of aspect data (for week-ahead file)
  3. active-transits.txt    :one-liner for CLAUDE.md auto-patch
  4. workspace-digest.txt   :5-line cross-workspace snapshot for the bones

Run: python3 generate-positions.py
"""

import json
import sys
import os
import urllib.request
from datetime import datetime, timedelta, timezone

# ─── Swiss Ephemeris Setup ────────────────────────────────────────────────────

def setup_swisseph():
    """Install pyswisseph and download Chiron ephemeris file if needed."""
    try:
        import swisseph as swe
    except ImportError:
        os.system(f"{sys.executable} -m pip install pyswisseph -q")
        import swisseph as swe

    # Chiron requires seas_18.se1 (small asteroids, 1800-2400)
    # Download to local ephe/ folder if not present
    ephe_dir = os.path.join(os.path.dirname(__file__), "ephe")
    os.makedirs(ephe_dir, exist_ok=True)

    chiron_file = os.path.join(ephe_dir, "seas_18.se1")
    if not os.path.exists(chiron_file):
        print("Downloading Chiron ephemeris file (seas_18.se1)...")
        try:
            url = "https://raw.githubusercontent.com/aloistr/swisseph/master/ephe/seas_18.se1"
            urllib.request.urlretrieve(url, chiron_file)
            print("Chiron ephemeris downloaded successfully.")
        except Exception as e:
            print(f"Could not download Chiron ephe file: {e}:will use Moshier fallback")
            chiron_file = None

    swe.set_ephe_path(ephe_dir if chiron_file else "")
    return swe


# ─── Jordan's Natal Chart ─────────────────────────────────────────────────────

NATAL = {
    "Sun":          {"deg": 241.8167, "sign": "Sagittarius", "house": "6th"},   # 1°49' Sag
    "Moon":         {"deg": 4.9667,   "sign": "Aries",       "house": "10th"},  # 4°58' Aries
    "Mercury":      {"deg": 222.2833, "sign": "Scorpio",     "house": "5th"},   # 12°17' Sco
    "Venus":        {"deg": 228.8333, "sign": "Scorpio",     "house": "5th"},   # 18°50' Sco
    "Mars":         {"deg": 250.7667, "sign": "Sagittarius", "house": "6th"},   # 10°46' Sag
    "Jupiter":      {"deg": 212.8667, "sign": "Scorpio",     "house": "5th"},   # 2°52' Sco
    "Saturn":       {"deg": 324.25,   "sign": "Aquarius",    "house": "9th"},   # 24°15' Aqu
    "Uranus":       {"deg": 289.5667, "sign": "Capricorn",   "house": "7th"},   # 19°34' Cap
    "Neptune":      {"deg": 289.1833, "sign": "Capricorn",   "house": "7th"},   # 19°11' Cap
    "Pluto":        {"deg": 235.6667, "sign": "Scorpio",     "house": "6th"},   # 25°40' Sco
    "Chiron":       {"deg": 158.4833, "sign": "Virgo",       "house": "4th"},   # 8°29' Vir
    "NorthNode":    {"deg": 243.0333, "sign": "Sagittarius", "house": "6th"},   # 3°02' Sag ℞
    "SouthNode":    {"deg": 63.0333,  "sign": "Gemini",      "house": "12th"},  # 3°02' Gem ℞
    "Ascendant":    {"deg": 89.3667,  "sign": "Gemini",      "house": "1st"},   # 29°22' Gem
    "Midheaven":    {"deg": 338.2667, "sign": "Pisces",      "house": "10th"},  # 8°16' Pis
    "LotOfFortune": {"deg": 326.2167, "sign": "Aquarius",    "house": "9th"},   # 26°13' Aqu
}

# Planet IDs in Swiss Ephemeris
SE_PLANETS = {
    "Sun":     0,
    "Moon":    1,
    "Mercury": 2,
    "Venus":   3,
    "Mars":    4,
    "Jupiter": 5,
    "Saturn":  6,
    "Uranus":  7,
    "Neptune": 8,
    "Pluto":   9,
    "Chiron":  15,     # SE_CHIRON
    "NNode":   11,     # True node
}

# ─── Aspect Definitions ───────────────────────────────────────────────────────

ASPECTS = [
    ("conjunction",    "☌",   0,   8.0),
    ("opposition",     "☍", 180,   8.0),
    ("trine",          "△", 120,   8.0),
    ("square",         "□",  90,   7.0),
    ("sextile",        "✶",  60,   6.0),
    ("inconjunct",     "⚻", 150,   3.0),
    ("sesquiquadrate", "□/", 135,   3.0),
    ("semi-square",    "∠",  45,   3.0),
    ("semi-sextile",   "⚺",  30,   2.0),
]


def find_aspect(deg1, deg2):
    """Return (aspect_name, symbol, orb) or None."""
    diff = abs(deg1 - deg2) % 360
    if diff > 180:
        diff = 360 - diff
    for name, sym, angle, orb in ASPECTS:
        if abs(diff - angle) <= orb:
            return name, sym, round(abs(diff - angle), 2)
    return None


def is_applying(pos1, speed1, pos2, speed2, aspect_angle):
    """Return True if the aspect is applying (orb shrinking toward exact).

    Uses a 1-day lookahead so the result is correct for all aspect types,
    not just conjunctions. The old sign-based shortcut was only valid for
    aspect_angle == 0 and produced wrong applying/separating labels for
    oppositions, trines, squares, sextiles, etc.
    """
    def _orb(p1, p2):
        diff = (p1 - p2) % 360
        if diff > 180:
            diff = 360 - diff
        return abs(diff - aspect_angle)

    current_orb = _orb(pos1, pos2)
    future_orb  = _orb(pos1 + speed1 * 0.5, pos2 + speed2 * 0.5)
    return future_orb < current_orb


# ─── Planet Calculation ───────────────────────────────────────────────────────

def calc_positions(swe, dt):
    """Calculate all transiting planet positions for a given datetime."""
    jd = swe.julday(dt.year, dt.month, dt.day,
                    dt.hour + dt.minute / 60.0 + dt.second / 3600.0)

    positions = {}
    for name, pid in SE_PLANETS.items():
        try:
            result, _ = swe.calc_ut(jd, pid, swe.FLG_SWIEPH | swe.FLG_SPEED)
            positions[name] = {
                "deg": round(result[0], 4),
                "speed": round(result[3], 4),  # degrees/day; negative = retrograde
                "retrograde": result[3] < 0,
            }
        except Exception as e:
            # Fallback: try Moshier if Swiss ephe file missing
            try:
                result, _ = swe.calc_ut(jd, pid, swe.FLG_MOSEPH | swe.FLG_SPEED)
                positions[name] = {
                    "deg": round(result[0], 4),
                    "speed": round(result[3], 4),
                    "retrograde": result[3] < 0,
                }
            except Exception as e2:
                positions[name] = {"deg": None, "speed": 0, "retrograde": False,
                                   "error": str(e2)}

    return positions


def deg_to_sign(deg):
    signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo",
             "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"]
    sign_idx = int(deg / 30)
    sign_deg = deg % 30
    return f"{sign_deg:.2f}° {signs[sign_idx]}"


# ─── Aspect Calculation ───────────────────────────────────────────────────────

def transit_to_natal_aspects(transit_positions):
    """Find all transit-to-natal aspects within orb."""
    aspects_found = []
    for t_name, t_data in transit_positions.items():
        if t_data.get("deg") is None:
            continue
        for n_name, n_data in NATAL.items():
            result = find_aspect(t_data["deg"], n_data["deg"])
            if result:
                asp_name, sym, orb = result
                applying = is_applying(
                    t_data["deg"], t_data["speed"],
                    n_data["deg"], 0,
                    ASPECTS[[a[0] for a in ASPECTS].index(asp_name)][2]
                )
                aspects_found.append({
                    "transit": t_name,
                    "natal": n_name,
                    "natal_sign": n_data["sign"],
                    "natal_house": n_data["house"],
                    "aspect": asp_name,
                    "symbol": sym,
                    "orb": orb,
                    "applying": applying,
                    "retrograde": t_data.get("retrograde", False),
                })
    return sorted(aspects_found, key=lambda x: x["orb"])


def transit_to_transit_aspects(positions):
    """Find all transit-to-transit aspects (for workplace digest)."""
    planets = list(positions.items())
    aspects_found = []
    for i, (n1, d1) in enumerate(planets):
        if d1.get("deg") is None:
            continue
        for n2, d2 in planets[i+1:]:
            if d2.get("deg") is None:
                continue
            result = find_aspect(d1["deg"], d2["deg"])
            if result:
                asp_name, sym, orb = result
                aspects_found.append({
                    "planet1": n1,
                    "planet2": n2,
                    "aspect": asp_name,
                    "symbol": sym,
                    "orb": orb,
                    "p1_sign": deg_to_sign(d1["deg"]),
                    "p2_sign": deg_to_sign(d2["deg"]),
                    "p1_retro": d1.get("retrograde", False),
                    "p2_retro": d2.get("retrograde", False),
                })
    return sorted(aspects_found, key=lambda x: x["orb"])


# ─── Week-Ahead Aspect Calendar ───────────────────────────────────────────────

def days_to_exact(transit_deg, transit_speed, natal_deg, aspect_angle):
    """Estimate days until a transit is exact to a natal point."""
    if transit_speed == 0:
        return None
    diff = (transit_deg - natal_deg) % 360
    if diff > 180:
        diff -= 360
    target = aspect_angle if diff > 0 else -aspect_angle
    days = (target - diff) / transit_speed
    if days < 0:
        days += 360 / abs(transit_speed)
    return round(days, 1) if 0 <= days <= 14 else None


def week_ahead_aspects(swe, today):
    """Calculate which transit-to-natal aspects become exact in the next 7 days."""
    upcoming = []
    for day_offset in range(1, 8):
        dt = today + timedelta(days=day_offset)
        positions = calc_positions(swe, dt)
        for t_name, t_data in positions.items():
            if t_data.get("deg") is None:
                continue
            for n_name, n_data in NATAL.items():
                result = find_aspect(t_data["deg"], n_data["deg"])
                if result:
                    asp_name, sym, orb = result
                    if orb <= 0.5:  # Will be very close to exact on this day
                        upcoming.append({
                            "date": dt.strftime("%Y-%m-%d"),
                            "day": dt.strftime("%A"),
                            "transit": t_name,
                            "natal": n_name,
                            "natal_house": n_data["house"],
                            "aspect": asp_name,
                            "symbol": sym,
                            "orb": orb,
                        })
    return sorted(upcoming, key=lambda x: (x["date"], x["orb"]))


# ─── Active Transits Summary (for CLAUDE.md auto-patch) ──────────────────────

def active_transits_summary(positions, today_aspects):
    """Generate a one-liner summary of the top active transits for CLAUDE.md."""
    # Filter to outer planets only, tight orb
    major_planets = ["Uranus", "Neptune", "Saturn", "Jupiter", "Pluto"]
    tight = [a for a in today_aspects
             if a["transit"] in major_planets and a["orb"] <= 2.0]
    tight_sorted = sorted(tight, key=lambda x: x["orb"])[:4]

    lines = []
    for a in tight_sorted:
        t = a["transit"]
        deg = positions.get(t, {}).get("deg")
        sign_str = deg_to_sign(deg) if deg else "?"
        retro = " Rx" if a.get("retrograde") else ""
        direction = "applying" if a["applying"] else "separating"
        lines.append(
            f"{t} {sign_str}{retro}:{a['orb']}° {direction} {a['aspect']} "
            f"natal {a['natal']} ({a['natal_house']})"
        )
    return " | ".join(lines)


# ─── Sunday Weekly Generators ────────────────────────────────────────────────

PLANET_GLYPHS = {
    "Sun": "☉", "Moon": "☽", "Mercury": "☿", "Venus": "♀",
    "Mars": "♂", "Jupiter": "♃", "Saturn": "♄", "Uranus": "♅",
    "Neptune": "♆", "Pluto": "♇", "Chiron": "⚷", "NNode": "☊",
}

SIGN_SYMBOLS = {
    "Aries": "♈", "Taurus": "♉", "Gemini": "♊", "Cancer": "♋",
    "Leo": "♌", "Virgo": "♍", "Libra": "♎", "Scorpio": "♏",
    "Sagittarius": "♐", "Capricorn": "♑", "Aquarius": "♒", "Pisces": "♓",
}

WORK_MEANINGS = {
    ("Mercury", "Saturn"): {
        "conjunction": "precision counts:double-check everything before sending",
        "trine": "strong week for documentation, contracts, and structured writing",
        "sextile": "methodical thinking pays off:edit, refine, commit to paper",
        "square": "miscommunication risk:slow down and verify before deciding",
        "opposition": "pressure to respond faster than is wise:hold for clarity",
    },
    ("Mercury", "Jupiter"): {
        "conjunction": "big-picture thinking is sharp:pitch the idea, make the ask",
        "trine": "communication flows:presentations and proposals land well",
        "sextile": "good week to expand the scope and think strategically",
        "square": "overconfidence in plans:verify the details before committing",
        "opposition": "ambition outpaces specifics:ground the vision in data",
    },
    ("Mercury", "Mars"): {
        "conjunction": "sharp and direct:strong for hard conversations and firm asks",
        "trine": "words carry force:good for pitches and negotiations",
        "sextile": "quick decisive communication works well this week",
        "square": "friction in conversations:watch tone, choose words carefully",
        "opposition": "conflict in communication:cool before responding",
    },
    ("Mercury", "Pluto"): {
        "conjunction": "penetrating clarity:strong for research, audits, and deep strategy",
        "trine": "see beneath the surface:good for deep dives and honest talks",
        "sextile": "read the room:you notice what others miss",
        "square": "power in communication:stay strategic, not reactive",
        "opposition": "pressure to back down:hold your position with evidence",
    },
    ("Mercury", "Neptune"): {
        "conjunction": "inspired thinking, foggy details:brainstorm yes, finalize later",
        "trine": "creative language and brand voice are strong",
        "sextile": "vision and words connect:good week for storytelling",
        "square": "fog in communication:re-read before sending, verify plans",
        "opposition": "intent and reception diverge:follow up everything in writing",
    },
    ("Mercury", "Venus"): {
        "conjunction": "smooth and diplomatic:good for relationship asks and presentations",
        "trine": "rapport comes easily:strong for negotiations and pitches",
        "sextile": "social energy supports work:lean into connection",
        "square": "tension between what you want to say and what lands well",
        "opposition": "differing values in dialogue:find the shared ground",
    },
    ("Sun", "Jupiter"): {
        "conjunction": "visibility and goodwill are high:good for asks and presentations",
        "trine": "momentum builds naturally:show up, say yes",
        "sextile": "growth is available:bring confidence",
        "square": "overreach risk:expand, but check your foundations",
        "opposition": "confidence meets reality:back the ambition with specifics",
    },
    ("Sun", "Saturn"): {
        "conjunction": "accountability is high:structures are being tested",
        "trine": "earned authority shows:good week for decisions requiring sign-off",
        "sextile": "credibility supports action:trust the track record",
        "square": "friction between vision and limits:work within constraints",
        "opposition": "external pressure on your approach:stay grounded",
    },
    ("Sun", "Mars"): {
        "conjunction": "high energy, high drive:strong week for launching and pushing through",
        "trine": "action and intention are aligned:move",
        "sextile": "productive momentum:good for execution-heavy work",
        "square": "drive meets friction:channel the tension into output",
        "opposition": "direct conflict possible:choose battles carefully",
    },
    ("Sun", "Pluto"): {
        "conjunction": "power dynamics are active:something structural is shifting",
        "trine": "depth and authority align:strong for high-stakes moves",
        "sextile": "quiet influence:use it",
        "square": "power dynamics are live:stay visible and strategic",
        "opposition": "external pressure intensifies:hold ground with evidence",
    },
    ("Sun", "Uranus"): {
        "conjunction": "disruption and innovation:expect the unexpected, stay flexible",
        "trine": "breakthrough energy:take the creative risk",
        "sextile": "fresh ideas land:good week to experiment",
        "square": "instability in plans:build in flexibility",
        "opposition": "tension between stability and change:adapt without losing your footing",
    },
    ("Mars", "Jupiter"): {
        "conjunction": "strong drive, big ambitions:excellent for pushing projects forward",
        "trine": "momentum and optimism:productive, expansive week",
        "sextile": "initiative pays off:take the first step",
        "square": "overextension risk:big energy, watch scope",
        "opposition": "ambition vs. reality:narrow your focus",
    },
    ("Mars", "Saturn"): {
        "conjunction": "disciplined action:slow and deliberate wins here",
        "trine": "structure supports drive:execute with precision",
        "sextile": "methodical progress:steady work pays off",
        "square": "frustration and delays are likely:work the system, not against it",
        "opposition": "pressure and blockage:stay the course",
    },
    ("Mars", "Pluto"): {
        "conjunction": "intense drive:powerful for difficult conversations and deep work",
        "trine": "strategic action with depth:strong for research and high-stakes execution",
        "sextile": "influence through action:move with quiet intention",
        "square": "power struggles possible:stay strategic and grounded",
        "opposition": "confrontation energy:choose the hill carefully",
    },
    ("Mars", "Uranus"): {
        "conjunction": "electric and unpredictable:breakthroughs possible, watch impulsiveness",
        "trine": "innovation through action:bold moves land",
        "sextile": "creative bursts:experiment and move fast",
        "square": "sudden disruptions:build contingency into plans",
        "opposition": "instability and tension:stay grounded",
    },
    ("Venus", "Jupiter"): {
        "conjunction": "generosity and goodwill:strong for partnership asks and collaborations",
        "trine": "collaboration flows easily:good for creative pitches",
        "sextile": "pleasant and productive:lean into connection",
        "square": "overcommitment risk:stay realistic about capacity",
        "opposition": "tension in shared values:clarify expectations upfront",
    },
    ("Venus", "Saturn"): {
        "conjunction": "commitment aligns with value:serious agreements and long-term decisions",
        "trine": "lasting agreements:what you commit to now holds",
        "sextile": "practical connection:structure supports relationship",
        "square": "tension between want and reality:work within constraints",
        "opposition": "cold pressure on relationships:stay grounded in what's real",
    },
    ("Venus", "Mars"): {
        "conjunction": "drive and desire are high:bold creative pitches and strong asks",
        "trine": "creative momentum is high:launch, pitch, collaborate",
        "sextile": "attractive energy:show up, make the connection",
        "square": "friction between wanting and doing:direct the energy",
        "opposition": "tension between relationship needs and drive:find the balance",
    },
    ("Jupiter", "Saturn"): {
        "conjunction": "expansion meets structure:what you build now is meant to last",
        "trine": "growth within systems:institutional momentum is available",
        "sextile": "practical expansion:build it right",
        "square": "tension between growth and limits:prioritize carefully",
        "opposition": "vision vs. reality:ground the plan in evidence",
    },
    ("Saturn", "Uranus"): {
        "conjunction": "old meets new:tension between tradition and innovation",
        "trine": "disciplined innovation:structure enables the breakthrough",
        "sextile": "calculated change:progress within form",
        "square": "friction between stability and change:navigate both",
        "opposition": "tension between freedom and structure:find the balance",
    },
    ("Saturn", "Neptune"): {
        "conjunction": "structure meets vision:where dreams and systems intersect",
        "trine": "discipline supports creativity:build what was imagined",
        "sextile": "practical vision:implement with structure",
        "square": "tension between ideal and real:work with what exists",
        "opposition": "reality-testing of dreams:get honest about what's achievable",
    },
}


def get_work_meaning(p1, p2, aspect_name):
    """Look up work interpretation for a planet pair, trying both orderings."""
    import re
    meanings = WORK_MEANINGS.get((p1, p2)) or WORK_MEANINGS.get((p2, p1))
    if meanings:
        text = meanings.get(aspect_name, "")
        text = re.sub(r':([^\s])', r': \1', text)
        return text
    return ""


def categorize_t2t(t2t_aspects):
    """Sort t2t aspects into work-theme buckets."""
    comm, momentum, connection, watch_for = [], [], [], []
    for a in t2t_aspects[:20]:  # cap to keep output manageable
        p1, p2, asp = a["planet1"], a["planet2"], a["aspect"]
        if asp in ("square", "opposition") and a["orb"] < 5.0:
            watch_for.append(a)
        if "Mercury" in (p1, p2):
            comm.append(a)
        elif p1 in ("Sun", "Mars") or p2 in ("Sun", "Mars"):
            momentum.append(a)
        elif p1 in ("Venus", "Jupiter") or p2 in ("Venus", "Jupiter"):
            connection.append(a)
    return {
        "communication": comm[:3],
        "momentum": momentum[:3],
        "connection": connection[:3],
        "watch_for": watch_for[:2],
    }


def dominant_pulse(t2t_aspects):
    """Derive a one-line pulse sentence from the tightest aspect."""
    if not t2t_aspects:
        return "A relatively quiet sky this week:steady, unrushed work."
    top = t2t_aspects[0]
    p1, p2, asp = top["planet1"], top["planet2"], top["aspect"]
    g1 = PLANET_GLYPHS.get(p1, p1)
    g2 = PLANET_GLYPHS.get(p2, p2)
    meaning = get_work_meaning(p1, p2, asp)
    tone = "flows" if asp in ("trine", "sextile", "conjunction") else "creates friction"
    if meaning:
        return f"{g1} {p1} {top['symbol']} {g2} {p2} ({top['orb']}°). {meaning.capitalize()}"
    return f"{g1} {p1} {top['symbol']} {g2} {p2} {tone} this week ({top['orb']}° orb)."


WHIMSIGOTH_CSS = """
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --bg: #0a0614; --surface: #150a25; --surface-2: #1e1038;
      --gold: #c9a84c; --gold-dim: rgba(201,168,76,0.11); --gold-mid: rgba(201,168,76,0.28);
      --rose: #d4a0b5; --rose-dim: rgba(212,160,181,0.11); --rose-mid: rgba(212,160,181,0.28);
      --plum: #7b4fa6; --plum-dim: rgba(123,79,166,0.20); --plum-bright: #b482d2;
      --teal: #5bb8a8; --teal-dim: rgba(91,184,168,0.11); --teal-bright: #7ecfc2;
      --text: #fdf6e8; --muted: rgba(253,246,232,0.58); --muted-2: rgba(253,246,232,0.30);
      --muted-3: rgba(253,246,232,0.12); --border: rgba(180,130,210,0.18);
    }
    html { background: var(--bg); color: var(--text); }
    body { background: var(--bg); font-family: 'Inter', sans-serif; line-height: 1.6;
           max-width: 720px; margin: 0 auto; padding: 0 0 60px; }
    p { color: var(--muted); font-size: 0.90rem; line-height: 1.75; margin: 0; }
    strong { color: var(--rose); font-weight: 600; }
    .hero { position: relative; width: 100%; padding: 72px 56px 64px; text-align: center;
            overflow: hidden;
            background: radial-gradient(ellipse at 38% 28%, #2a1245 0%, #150a25 42%, #0a0614 100%); }
    .hero-stars { position: absolute; inset: 0; pointer-events: none; }
    .hero-border-outer { position: absolute; top: 18px; left: 18px; right: 18px; bottom: 18px;
                         border: 1px solid rgba(180,130,210,0.30); pointer-events: none; }
    .hero-border-inner { position: absolute; top: 28px; left: 28px; right: 28px; bottom: 28px;
                         border: 1px solid rgba(180,130,210,0.13); pointer-events: none; }
    .corner { position: absolute; font-family: 'Cormorant Garamond', serif; font-size: 15px;
              color: var(--gold); opacity: 0.78; }
    .corner.tl { top: 10px; left: 10px; } .corner.tr { top: 10px; right: 10px; }
    .corner.bl { bottom: 10px; left: 10px; } .corner.br { bottom: 10px; right: 10px; }
    .hero-col { position: absolute; top: 50%; transform: translateY(-50%); pointer-events: none; }
    .hero-col.left { left: 36px; } .hero-col.right { right: 36px; }
    .hero-label { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 600;
                  letter-spacing: 0.32em; text-transform: uppercase; color: var(--rose);
                  opacity: 0.72; margin-bottom: 22px; position: relative; }
    .hero-name { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px,7vw,72px);
                 font-weight: 300; line-height: 1.0; color: var(--text); letter-spacing: 0.05em;
                 margin-bottom: 16px; position: relative; }
    .hero-ornament { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem;
                     letter-spacing: 0.55em; color: var(--gold); opacity: 0.55;
                     margin-bottom: 28px; position: relative; padding-left: 0.55em; }
    .hero-data { display: flex; justify-content: center; gap: 28px; flex-wrap: wrap; position: relative; }
    .hero-datum-label { font-family: 'Inter', sans-serif; font-size: 0.58rem; letter-spacing: 0.22em;
                        text-transform: uppercase; color: var(--muted-2); margin-bottom: 4px; }
    .hero-datum-value { font-family: 'Cormorant Garamond', serif; font-size: 1.0rem;
                        color: var(--gold); letter-spacing: 0.06em; }
    .cel-divider { display: flex; align-items: center; gap: 12px; margin: 36px 44px 0; }
    .cel-rule { flex: 1; height: 1px; }
    .cel-rule.left { background: linear-gradient(90deg, transparent, var(--gold-mid)); }
    .cel-rule.right { background: linear-gradient(90deg, var(--gold-mid), transparent); }
    .cel-mark { font-family: 'Cormorant Garamond', serif; font-size: 0.80rem; letter-spacing: 0.55em;
                color: var(--gold); opacity: 0.50; padding-left: 0.55em; }
    .section-wrap { padding: 32px 44px 0; }
    .section-eyebrow { font-family: 'Inter', sans-serif; font-size: 0.60rem; font-weight: 600;
                       letter-spacing: 0.28em; text-transform: uppercase; color: var(--plum-bright);
                       margin-bottom: 6px; }
    .section-title { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 400;
                     color: var(--gold); letter-spacing: 0.04em; margin-bottom: 18px; }
    .pulse-card { background: radial-gradient(ellipse at 0% 50%, rgba(201,168,76,0.14) 0%, rgba(21,10,37,0.85) 60%);
                  border: 1px solid rgba(201,168,76,0.22); border-radius: 10px; padding: 22px 26px; }
    .pulse-card p { font-family: 'Cormorant Garamond', serif; font-style: italic;
                    font-size: 1.08rem; color: var(--text); line-height: 1.75; }
    .signal-board { display: flex; flex-direction: column; gap: 6px; }
    .signal-row { display: flex; align-items: baseline; gap: 10px; background: var(--surface);
                  padding: 10px 14px; border-radius: 6px; border-left: 2px solid; }
    .signal-row.gold { border-color: var(--gold); }
    .signal-row.rose { border-color: var(--rose); }
    .signal-row.plum { border-color: var(--plum-bright); }
    .signal-row.teal { border-color: var(--teal-bright); }
    .signal-row.muted { border-color: rgba(253,246,232,0.20); }
    .sig-aspect { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--text); min-width: 150px; }
    .sig-orb { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--gold); min-width: 36px; }
    .sig-note { font-size: 12px; color: var(--muted); flex: 1; }
    .dive-section { margin-bottom: 14px; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
    .dive-section::before { content: ''; display: block; height: 2px; width: 100%; }
    .dive-section.accent-gold::before { background: linear-gradient(90deg, transparent 0%, var(--gold) 40%, var(--gold) 60%, transparent 100%); }
    .dive-section.accent-rose::before { background: linear-gradient(90deg, transparent 0%, var(--rose) 40%, var(--rose) 60%, transparent 100%); }
    .dive-section.accent-plum::before { background: linear-gradient(90deg, transparent 0%, var(--plum-bright) 40%, var(--plum-bright) 60%, transparent 100%); }
    .dive-section.accent-teal::before { background: linear-gradient(90deg, transparent 0%, var(--teal-bright) 40%, var(--teal-bright) 60%, transparent 100%); }
    .dive-head { padding: 18px 22px 14px; display: flex; align-items: flex-start; gap: 14px; }
    .dive-head.gold-head { background: radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.18) 0%, rgba(42,18,69,0.80) 55%, #0a0614 100%);
                           border-bottom: 1px solid rgba(201,168,76,0.14); }
    .dive-head.rose-head { background: radial-gradient(ellipse at 20% 50%, rgba(212,160,181,0.16) 0%, rgba(42,18,69,0.80) 55%, #0a0614 100%);
                           border-bottom: 1px solid rgba(212,160,181,0.14); }
    .dive-head.plum-head { background: radial-gradient(ellipse at 20% 50%, rgba(123,79,166,0.22) 0%, rgba(42,18,69,0.80) 55%, #0a0614 100%);
                           border-bottom: 1px solid rgba(123,79,166,0.16); }
    .dive-head.teal-head { background: radial-gradient(ellipse at 20% 50%, rgba(91,184,168,0.18) 0%, rgba(42,18,69,0.80) 55%, #0a0614 100%);
                           border-bottom: 1px solid rgba(91,184,168,0.14); }
    .dive-icon { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; flex-shrink: 0; line-height: 1; margin-top: 2px; }
    .accent-gold .dive-icon { color: var(--gold); }
    .accent-rose .dive-icon { color: var(--rose); }
    .accent-plum .dive-icon { color: var(--plum-bright); }
    .accent-teal .dive-icon { color: var(--teal-bright); }
    .dive-eyebrow { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 600;
                    letter-spacing: 0.26em; text-transform: uppercase; margin-bottom: 5px; }
    .accent-gold .dive-eyebrow { color: rgba(201,168,76,0.65); }
    .accent-rose .dive-eyebrow { color: rgba(212,160,181,0.65); }
    .accent-plum .dive-eyebrow { color: rgba(180,130,210,0.65); }
    .accent-teal .dive-eyebrow { color: rgba(91,184,168,0.65); }
    .dive-title { font-family: 'Cormorant Garamond', serif; font-size: 1.28rem; font-weight: 400;
                  line-height: 1.2; letter-spacing: 0.03em; }
    .accent-gold .dive-title { color: var(--gold); }
    .accent-rose .dive-title { color: var(--rose); }
    .accent-plum .dive-title { color: var(--plum-bright); }
    .accent-teal .dive-title { color: var(--teal-bright); }
    .dive-body { padding: 18px 22px 16px; background: rgba(10,6,20,0.55);
                 display: flex; flex-direction: column; gap: 8px; }
    .dive-body p { font-size: 0.88rem; line-height: 1.80; color: var(--muted); }
    .dive-body strong { color: var(--rose); }
    .watch-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 6px; }
    .watch-list li { font-size: 0.88rem; color: var(--muted); line-height: 1.65;
                     padding-left: 16px; position: relative; }
    .watch-list li::before { content: "\\2022"; color: var(--rose); position: absolute; left: 0; }
    .planet-strip { display: flex; flex-wrap: wrap; gap: 8px; }
    .planet-pill { background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
                   padding: 5px 12px; font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--muted); }
    .planet-pill .glyph { color: var(--gold); margin-right: 4px; }
    .planet-pill .retro { color: var(--rose); margin-left: 3px; font-size: 9px; }
    .day-block { background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
                 padding: 14px 18px; margin-bottom: 10px; }
    .day-block:last-child { margin-bottom: 0; }
    .day-label { font-family: 'Inter', sans-serif; font-size: 0.60rem; font-weight: 600;
                 letter-spacing: 0.24em; text-transform: uppercase; color: var(--gold);
                 opacity: 0.85; margin-bottom: 10px; }
    .day-aspect { font-size: 0.88rem; color: var(--text); margin-bottom: 5px; line-height: 1.5; }
    .day-aspect:last-child { margin-bottom: 0; }
    .day-aspect span { color: var(--muted); font-style: italic; font-size: 0.82rem; }
    .page-footer { margin: 40px 44px 0; padding-top: 18px; border-top: 1px solid var(--border);
                   font-family: 'Inter', sans-serif; font-size: 0.62rem; color: var(--muted-2);
                   letter-spacing: 0.10em; line-height: 1.8; text-align: center; }
    @media (max-width: 680px) {
      .hero { padding: 48px 20px 42px; }
      .hero-col { display: none; }
      .hero-border-outer { top: 12px; left: 12px; right: 12px; bottom: 12px; }
      .hero-border-inner { top: 20px; left: 20px; right: 20px; bottom: 20px; }
      .hero-name { font-size: clamp(28px,9vw,44px); }
      .cel-divider { margin: 26px 18px 0; }
      .section-wrap { padding: 22px 18px 0; }
      .dive-head { padding: 14px 16px 12px; }
      .dive-body { padding: 14px 16px 12px; }
      .page-footer { margin: 28px 18px 0; }
      .sig-aspect { min-width: 110px; font-size: 10px; }
    }
"""

GOOGLE_FONTS = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400;500&display=swap" rel="stylesheet">'


def _signal_color(aspect_name, i):
    """Assign a border color class to a signal row."""
    if aspect_name in ("trine", "sextile"):
        return ["gold", "teal", "gold", "teal"][i % 4]
    if aspect_name == "conjunction":
        return "plum"
    if aspect_name in ("square", "opposition"):
        return "rose"
    return "muted"


def _aspect_label(a):
    g1 = PLANET_GLYPHS.get(a["planet1"], a["planet1"])
    g2 = PLANET_GLYPHS.get(a["planet2"], a["planet2"])
    r1 = " Rx" if a.get("p1_retro") else ""
    r2 = " Rx" if a.get("p2_retro") else ""
    return f"{g1} {a['planet1']}{r1} {a['symbol']} {g2} {a['planet2']}{r2}"


def generate_sky_at_work_html(t2t_aspects, today_positions, week_start_str):
    """Generate the public workplace weekly HTML."""

    cat = categorize_t2t(t2t_aspects)
    pulse = dominant_pulse(t2t_aspects)

    # At a glance: top 5 signal rows
    glance_rows = ""
    for i, a in enumerate(t2t_aspects[:5]):
        color = _signal_color(a["aspect"], i)
        label = _aspect_label(a)
        meaning = get_work_meaning(a["planet1"], a["planet2"], a["aspect"])
        note = meaning if meaning else a["aspect"]
        glance_rows += f"""
        <div class="signal-row {color}">
          <span class="sig-aspect">{label}</span>
          <span class="sig-orb">{a['orb']}&deg;</span>
          <span class="sig-note">{note}</span>
        </div>"""

    def dive_section(aspects, eyebrow, title, icon, accent):
        if not aspects:
            return ""
        rows = ""
        for a in aspects:
            label = _aspect_label(a)
            meaning = get_work_meaning(a["planet1"], a["planet2"], a["aspect"])
            text = meaning if meaning else f"{a['aspect']} active this week"
            rows += f'<p><strong>{label}</strong> ({a["orb"]}&deg;) &mdash; {text}</p>'
        return (
            f'<div class="dive-section accent-{accent}">'
            f'<div class="dive-head {accent}-head">'
            f'<div class="dive-icon">{icon}</div>'
            f'<div><div class="dive-eyebrow">{eyebrow}</div>'
            f'<div class="dive-title">{title}</div></div></div>'
            f'<div class="dive-body">{rows}</div></div>'
        )

    comm_html     = dive_section(cat["communication"], "Mercury &middot; communication", "For Communication", "&#9791;", "gold")
    momentum_html = dive_section(cat["momentum"],      "Mars &middot; Sun &middot; action", "For Momentum", "&#9794;", "rose")
    conn_html     = dive_section(cat["connection"],    "Venus &middot; Jupiter &middot; connection", "For Collaboration", "&#9792;", "teal")

    watch_items = ""
    for a in cat["watch_for"]:
        label = _aspect_label(a)
        meaning = get_work_meaning(a["planet1"], a["planet2"], a["aspect"])
        note = meaning if meaning else a["aspect"]
        watch_items += f'<li><strong>{label}</strong> ({a["orb"]}&deg;): {note}</li>'
    watch_html = (
        '<div class="dive-section accent-plum">'
        '<div class="dive-head plum-head">'
        '<div class="dive-icon">&#9812;</div>'
        '<div><div class="dive-eyebrow">friction &middot; tension &middot; pressure</div>'
        '<div class="dive-title">Watch For</div></div></div>'
        f'<div class="dive-body"><ul class="watch-list">{watch_items}</ul></div></div>'
    ) if watch_items else ""

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sky at Work &middot; Week of {week_start_str}</title>
  {GOOGLE_FONTS}
  <style>{WHIMSIGOTH_CSS}</style>
</head>
<body>

<div class="hero">
  <svg class="hero-stars" viewBox="0 0 720 440" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <circle cx="52"  cy="62"  r="1.1" fill="#fff8ee" opacity="0.48"/>
    <circle cx="168" cy="38"  r="0.9" fill="#fff8ee" opacity="0.36"/>
    <circle cx="290" cy="55"  r="1.2" fill="#c9a84c" opacity="0.42"/>
    <circle cx="420" cy="24"  r="0.8" fill="#fff8ee" opacity="0.36"/>
    <circle cx="542" cy="50"  r="1.0" fill="#fff8ee" opacity="0.38"/>
    <circle cx="654" cy="72"  r="1.1" fill="#c9a84c" opacity="0.44"/>
    <circle cx="700" cy="32"  r="0.8" fill="#d4a0b5" opacity="0.38"/>
    <circle cx="22"  cy="240" r="0.8" fill="#c9a84c" opacity="0.32"/>
    <circle cx="698" cy="224" r="0.7" fill="#fff8ee" opacity="0.34"/>
    <circle cx="360" cy="408" r="0.7" fill="#d4a0b5" opacity="0.28"/>
    <text x="100" y="108" font-size="10" fill="#c9a84c" opacity="0.55" text-anchor="middle" font-family="serif">&#10022;</text>
    <text x="612" y="126" font-size="7"  fill="#fff8ee" opacity="0.38" text-anchor="middle" font-family="serif">&#10023;</text>
    <text x="364" y="18"  font-size="7"  fill="#c9a84c" opacity="0.48" text-anchor="middle" font-family="serif">&#10022;</text>
    <circle cx="640" cy="90"  r="70" fill="#c9a84c" opacity="0.04"/>
    <circle cx="70"  cy="340" r="80" fill="#9b59b6" opacity="0.05"/>
  </svg>
  <div class="hero-border-outer"></div>
  <div class="hero-border-inner"></div>
  <div class="corner tl">&#10022;</div>
  <div class="corner tr">&#10022;</div>
  <div class="corner bl">&#10022;</div>
  <div class="corner br">&#10022;</div>
  <svg class="hero-col left" width="22" height="380" viewBox="0 0 22 380" xmlns="http://www.w3.org/2000/svg">
    <line x1="11" y1="0" x2="11" y2="380" stroke="#b482d2" stroke-width="0.8" opacity="0.22"/>
    <text x="11" y="44"  text-anchor="middle" font-size="13" fill="#c9a84c" opacity="0.62" font-family="serif">&#9789;</text>
    <text x="11" y="90"  text-anchor="middle" font-size="9"  fill="#fff8ee" opacity="0.42" font-family="serif">&#10022;</text>
    <text x="11" y="140" text-anchor="middle" font-size="12" fill="#c9a84c" opacity="0.52" font-family="serif">&#9737;</text>
    <circle cx="11" cy="180" r="1.3" fill="#d4a0b5" opacity="0.40"/>
    <text x="11" y="228" text-anchor="middle" font-size="9"  fill="#d4a0b5" opacity="0.48" font-family="serif">&#10023;</text>
    <text x="11" y="276" text-anchor="middle" font-size="13" fill="#fff8ee" opacity="0.28" font-family="serif">&#9790;</text>
    <text x="11" y="330" text-anchor="middle" font-size="9"  fill="#c9a84c" opacity="0.42" font-family="serif">&#10022;</text>
  </svg>
  <svg class="hero-col right" width="22" height="380" viewBox="0 0 22 380" xmlns="http://www.w3.org/2000/svg">
    <line x1="11" y1="0" x2="11" y2="380" stroke="#b482d2" stroke-width="0.8" opacity="0.22"/>
    <text x="11" y="44"  text-anchor="middle" font-size="9"  fill="#fff8ee" opacity="0.42" font-family="serif">&#10022;</text>
    <text x="11" y="90"  text-anchor="middle" font-size="13" fill="#c9a84c" opacity="0.58" font-family="serif">&#9790;</text>
    <text x="11" y="140" text-anchor="middle" font-size="9"  fill="#d4a0b5" opacity="0.48" font-family="serif">&#10023;</text>
    <circle cx="11" cy="180" r="1.3" fill="#c9a84c" opacity="0.36"/>
    <text x="11" y="228" text-anchor="middle" font-size="12" fill="#c9a84c" opacity="0.52" font-family="serif">&#9737;</text>
    <text x="11" y="276" text-anchor="middle" font-size="13" fill="#fff8ee" opacity="0.26" font-family="serif">&#9789;</text>
    <text x="11" y="330" text-anchor="middle" font-size="9"  fill="#c9a84c" opacity="0.48" font-family="serif">&#10022;</text>
  </svg>
  <div class="hero-label">Transit-to-Transit &middot; Collective Sky</div>
  <h1 class="hero-name">Sky at Work</h1>
  <div class="hero-ornament">&#9789; &#10022; &#9737; &#10022; &#9790;</div>
  <div class="hero-data">
    <div>
      <div class="hero-datum-label">Week of</div>
      <div class="hero-datum-value">{week_start_str}</div>
    </div>
    <div>
      <div class="hero-datum-label">Aspects</div>
      <div class="hero-datum-value">Transit &middot; Transit</div>
    </div>
  </div>
</div>

<div class="cel-divider"><div class="cel-rule left"></div><div class="cel-mark">&#10022; &#10022; &#10022;</div><div class="cel-rule right"></div></div>

<div class="section-wrap">
  <div class="section-eyebrow">The Weather This Week</div>
  <div class="section-title">The Pulse</div>
  <div class="pulse-card"><p>{pulse}</p></div>
</div>

<div class="cel-divider"><div class="cel-rule left"></div><div class="cel-mark">&#10022; &#10022; &#10022;</div><div class="cel-rule right"></div></div>

<div class="section-wrap">
  <div class="section-eyebrow">Sorted by Exactness</div>
  <div class="section-title">At a Glance</div>
  <div class="signal-board">{glance_rows}
  </div>
</div>

<div class="cel-divider"><div class="cel-rule left"></div><div class="cel-mark">&#10022; &#10022; &#10022;</div><div class="cel-rule right"></div></div>

<div class="section-wrap">
  {comm_html}
  {momentum_html}
  {conn_html}
  {watch_html}
</div>

<div class="page-footer">
  transit-to-transit aspects only &middot; no natal charts used &middot; everyone's in this weather<br>
  generated via pyswisseph &middot; swiss ephemeris
</div>

</body>
</html>"""


def generate_week_ahead_html(week_aspects, t2n_aspects, today_positions, week_start_str, week_end_str):
    """Generate Jordan's personal week-ahead reading HTML."""

    # Planet strip
    planet_pills = ""
    for name, pid in [("Sun",0),("Moon",1),("Mercury",2),("Venus",3),("Mars",4),
                      ("Jupiter",5),("Saturn",6),("Uranus",7),("Neptune",8)]:
        data = today_positions.get(name)
        if data and data.get("deg") is not None:
            sign_str = deg_to_sign(data["deg"])
            glyph = PLANET_GLYPHS.get(name, name[0])
            retro = '<span class="retro">Rx</span>' if data.get("retrograde") else ""
            planet_pills += f'<div class="planet-pill"><span class="glyph">{glyph}</span>{sign_str}{retro}</div>'

    # Day-by-day from week_aspects
    days_seen = {}
    for a in week_aspects:
        d = a["day"]
        if d not in days_seen:
            days_seen[d] = []
        days_seen[d].append(a)

    day_blocks = ""
    if days_seen:
        for day, aspects in days_seen.items():
            items = ""
            for a in aspects:
                t_glyph = PLANET_GLYPHS.get(a["transit"], a["transit"])
                n_name = a["natal"]
                n_house = a["natal_house"]
                items += f'<div class="day-aspect">{t_glyph} {a["transit"]} {a["symbol"]} natal {n_name} ({n_house}) <span>&middot; {a["orb"]}&deg; &middot; exact</span></div>'
            day_blocks += f'<div class="day-block"><div class="day-label">{day} &middot; {a["date"]}</div>{items}</div>'
    else:
        day_blocks = '<p style="color:var(--muted-2);font-size:0.88rem;">No aspects exact within 0.5&deg; this week. A spacious sky.</p>'

    # Active transits signal board
    active_rows = ""
    for a in t2n_aspects[:8]:
        if a["orb"] <= 3.0:
            t_glyph = PLANET_GLYPHS.get(a["transit"], "")
            direction = "applying" if a["applying"] else "separating"
            color = "gold" if a["aspect"] in ("trine","sextile") else "rose" if a["aspect"] in ("square","opposition") else "plum"
            active_rows += f"""
        <div class="signal-row {color}">
          <span class="sig-aspect">{t_glyph} {a['transit']} {a['symbol']} natal {a['natal']} ({a['natal_house']})</span>
          <span class="sig-orb">{a['orb']}&deg;</span>
          <span class="sig-note">{direction}</span>
        </div>"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Week Ahead &middot; {week_start_str}</title>
  {GOOGLE_FONTS}
  <style>{WHIMSIGOTH_CSS}</style>
</head>
<body>

<div class="hero">
  <svg class="hero-stars" viewBox="0 0 720 440" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <circle cx="52"  cy="62"  r="1.1" fill="#fff8ee" opacity="0.48"/>
    <circle cx="168" cy="38"  r="0.9" fill="#fff8ee" opacity="0.36"/>
    <circle cx="290" cy="55"  r="1.2" fill="#c9a84c" opacity="0.42"/>
    <circle cx="420" cy="24"  r="0.8" fill="#fff8ee" opacity="0.36"/>
    <circle cx="542" cy="50"  r="1.0" fill="#d4a0b5" opacity="0.38"/>
    <circle cx="654" cy="72"  r="1.1" fill="#c9a84c" opacity="0.44"/>
    <circle cx="700" cy="32"  r="0.8" fill="#fff8ee" opacity="0.38"/>
    <circle cx="22"  cy="240" r="0.8" fill="#c9a84c" opacity="0.32"/>
    <circle cx="698" cy="224" r="0.7" fill="#fff8ee" opacity="0.34"/>
    <circle cx="360" cy="408" r="0.7" fill="#d4a0b5" opacity="0.28"/>
    <text x="100" y="108" font-size="10" fill="#c9a84c" opacity="0.55" text-anchor="middle" font-family="serif">&#10022;</text>
    <text x="612" y="126" font-size="7"  fill="#fff8ee" opacity="0.38" text-anchor="middle" font-family="serif">&#10023;</text>
    <text x="364" y="18"  font-size="7"  fill="#c9a84c" opacity="0.48" text-anchor="middle" font-family="serif">&#10022;</text>
    <circle cx="640" cy="90"  r="70" fill="#c9a84c" opacity="0.04"/>
    <circle cx="70"  cy="340" r="80" fill="#9b59b6" opacity="0.05"/>
    <circle cx="80"  cy="70"  r="50" fill="#d4a0b5" opacity="0.04"/>
  </svg>
  <div class="hero-border-outer"></div>
  <div class="hero-border-inner"></div>
  <div class="corner tl">&#10022;</div>
  <div class="corner tr">&#10022;</div>
  <div class="corner bl">&#10022;</div>
  <div class="corner br">&#10022;</div>
  <svg class="hero-col left" width="22" height="380" viewBox="0 0 22 380" xmlns="http://www.w3.org/2000/svg">
    <line x1="11" y1="0" x2="11" y2="380" stroke="#b482d2" stroke-width="0.8" opacity="0.22"/>
    <text x="11" y="44"  text-anchor="middle" font-size="13" fill="#c9a84c" opacity="0.62" font-family="serif">&#9789;</text>
    <text x="11" y="90"  text-anchor="middle" font-size="9"  fill="#fff8ee" opacity="0.42" font-family="serif">&#10022;</text>
    <text x="11" y="140" text-anchor="middle" font-size="12" fill="#c9a84c" opacity="0.52" font-family="serif">&#9737;</text>
    <circle cx="11" cy="180" r="1.3" fill="#d4a0b5" opacity="0.40"/>
    <text x="11" y="228" text-anchor="middle" font-size="9"  fill="#d4a0b5" opacity="0.48" font-family="serif">&#10023;</text>
    <text x="11" y="276" text-anchor="middle" font-size="13" fill="#fff8ee" opacity="0.28" font-family="serif">&#9790;</text>
    <text x="11" y="330" text-anchor="middle" font-size="9"  fill="#c9a84c" opacity="0.42" font-family="serif">&#10022;</text>
  </svg>
  <svg class="hero-col right" width="22" height="380" viewBox="0 0 22 380" xmlns="http://www.w3.org/2000/svg">
    <line x1="11" y1="0" x2="11" y2="380" stroke="#b482d2" stroke-width="0.8" opacity="0.22"/>
    <text x="11" y="44"  text-anchor="middle" font-size="9"  fill="#fff8ee" opacity="0.42" font-family="serif">&#10022;</text>
    <text x="11" y="90"  text-anchor="middle" font-size="13" fill="#c9a84c" opacity="0.58" font-family="serif">&#9790;</text>
    <text x="11" y="140" text-anchor="middle" font-size="9"  fill="#d4a0b5" opacity="0.48" font-family="serif">&#10023;</text>
    <circle cx="11" cy="180" r="1.3" fill="#c9a84c" opacity="0.36"/>
    <text x="11" y="228" text-anchor="middle" font-size="12" fill="#c9a84c" opacity="0.52" font-family="serif">&#9737;</text>
    <text x="11" y="276" text-anchor="middle" font-size="13" fill="#fff8ee" opacity="0.26" font-family="serif">&#9789;</text>
    <text x="11" y="330" text-anchor="middle" font-size="9"  fill="#c9a84c" opacity="0.48" font-family="serif">&#10022;</text>
  </svg>
  <div class="hero-label">Personal Transit Reading &middot; Jordan</div>
  <h1 class="hero-name">Your Week Ahead</h1>
  <div class="hero-ornament">&#9789; &#10022; &#9737; &#10022; &#9790;</div>
  <div class="hero-data">
    <div>
      <div class="hero-datum-label">From</div>
      <div class="hero-datum-value">{week_start_str}</div>
    </div>
    <div>
      <div class="hero-datum-label">Through</div>
      <div class="hero-datum-value">{week_end_str}</div>
    </div>
    <div>
      <div class="hero-datum-label">Aspects</div>
      <div class="hero-datum-value">Transit &middot; Natal</div>
    </div>
  </div>
</div>

<div class="cel-divider"><div class="cel-rule left"></div><div class="cel-mark">&#10022; &#10022; &#10022;</div><div class="cel-rule right"></div></div>

<div class="section-wrap">
  <div class="section-eyebrow">Transiting Planets</div>
  <div class="section-title">Sky Now</div>
  <div class="planet-strip">{planet_pills}</div>
</div>

<div class="cel-divider"><div class="cel-rule left"></div><div class="cel-mark">&#10022; &#10022; &#10022;</div><div class="cel-rule right"></div></div>

<div class="section-wrap">
  <div class="section-eyebrow">Transit-to-Natal &middot; Sorted by Exactness</div>
  <div class="section-title">Active Transits This Week</div>
  <div class="signal-board">{active_rows}
  </div>
</div>

<div class="cel-divider"><div class="cel-rule left"></div><div class="cel-mark">&#10022; &#10022; &#10022;</div><div class="cel-rule right"></div></div>

<div class="section-wrap">
  <div class="section-eyebrow">Within 0.5&deg; Orb</div>
  <div class="section-title">Exact This Week</div>
  {day_blocks}
</div>

<div class="page-footer">
  generated via pyswisseph &middot; swiss ephemeris<br>
  personal reading &middot; jordan natal &middot; transit-to-natal
</div>

</body>
</html>"""


def generate_slack_draft(t2t_aspects, week_start_str, today_positions):
    """Generate the Monday morning Slack message draft."""
    cat = categorize_t2t(t2t_aspects)
    pulse = dominant_pulse(t2t_aspects)

    # At a glance lines (top 4)
    glance_lines = ""
    day_labels = ["Mon", "Mon–Fri", "Tue", "All week"]
    emoji_map = {
        "Mercury": "💬", "Sun": "☉", "Moon": "🌙", "Venus": "♀",
        "Mars": "🔥", "Jupiter": "🌟", "Saturn": "🏗️",
        "Uranus": "⚡", "Neptune": "🌊", "Pluto": "♇",
    }
    for i, a in enumerate(t2t_aspects[:4]):
        em = emoji_map.get(a["planet1"], "✦")
        day = day_labels[i] if i < len(day_labels) else "This week"
        meaning = get_work_meaning(a["planet1"], a["planet2"], a["aspect"])
        note = meaning if meaning else a["aspect"]
        glance_lines += f"> {em} *{day}* · {a['planet1']} {a['symbol']} {a['planet2']} · {note}\n"

    # Communication section (first Mercury aspect)
    comm_text = ""
    if cat["communication"]:
        a = cat["communication"][0]
        meaning = get_work_meaning(a["planet1"], a["planet2"], a["aspect"])
        if meaning:
            comm_text = f"*for communication*\n{meaning.capitalize()}. ({a['planet1']} {a['symbol']} {a['planet2']}, {a['orb']}°)"

    # Momentum section (first Mars/Sun aspect)
    momentum_text = ""
    if cat["momentum"]:
        a = cat["momentum"][0]
        meaning = get_work_meaning(a["planet1"], a["planet2"], a["aspect"])
        if meaning:
            momentum_text = f"*for bold moves*\n{meaning.capitalize()}. ({a['planet1']} {a['symbol']} {a['planet2']}, {a['orb']}°)"

    # Watch for (first friction aspect)
    watch_text = ""
    if cat["watch_for"]:
        a = cat["watch_for"][0]
        meaning = get_work_meaning(a["planet1"], a["planet2"], a["aspect"])
        note = meaning if meaning else a["aspect"]
        watch_text = f"• {a['planet1']} {a['symbol']} {a['planet2']} ({a['orb']}°): {note}"

    url = "https://jordanb1993.github.io/astro-readings/workplace%20readings/sky-at-work.html"

    sections = [f"*☿ sky at work · week of {week_start_str}* ✦\n",
                f"{pulse}\n",
                f"*at a glance*\n{glance_lines}"]
    if comm_text:
        sections.append(comm_text + "\n")
    if momentum_text:
        sections.append(momentum_text + "\n")
    if watch_text:
        sections.append(f"*watch for*\n{watch_text}\n")
    sections.append(f"— _transit-to-transit weather only. no birth charts required. just the sky we're all in._ ✦\n")
    sections.append(f"fuller reading: {url}")

    return "\n".join(sections)


# ─── Life Snapshot (from the bones → for reading context) ─────────────

PERSONAL_HQ_PATH = os.path.expanduser(
    "~/Library/Mobile Documents/iCloud~md~obsidian/Documents/the bones"
)

def read_life_snapshot(date_str):
    """
    Read spoke-digest.md from the bones and distill into life context
    that meaningfully informs an astrology reading.

    Pulls: recent events (Cleared This Month), identity/emotional spoke status.
    Omits: admin to-dos, logistical flags:these carry low astrological charge.
    """
    digest_path = os.path.join(PERSONAL_HQ_PATH, "spoke-digest.md")
    if not os.path.exists(digest_path):
        return f"# Life Snapshot | {date_str}\n\n*spoke-digest.md not found:reading continues without life context*\n"

    with open(digest_path, "r") as f:
        content = f.read()

    lines = content.split("\n")
    snapshot_lines = [
        f"# Jordan's Life Snapshot for Today's Reading | {date_str}",
        "",
        "> Use this to ground the reading in Jordan's actual life:what's alive, in motion,",
        "> recently completed, or emotionally charged. Admin tasks are excluded intentionally.",
        "",
    ]

    # ── 1. Recent events: Cleared This Month ─────────────────────────────────
    # These are completed actions/decisions/events:the most astrologically
    # resonant content because they show what's actually manifesting.
    in_cleared = False
    cleared_items = []
    for line in lines:
        if "## ✅ Cleared This Month" in line:
            in_cleared = True
            continue
        if in_cleared:
            if line.startswith("## "):
                break
            # Table rows: | Item | Date |
            if line.startswith("|") and not line.startswith("| Item") and not line.startswith("|---"):
                parts = [p.strip() for p in line.split("|") if p.strip()]
                if len(parts) >= 2:
                    cleared_items.append((parts[0], parts[1]))  # (item, date)

    if cleared_items:
        snapshot_lines.append("## What's happened recently (last 30 days)")
        snapshot_lines.append("*These are completed events:what's manifesting in Jordan's life right now.*")
        snapshot_lines.append("")
        for item, date in cleared_items:
            snapshot_lines.append(f"- {item} ({date})")
        snapshot_lines.append("")

    # ── 2. Spoke status:identity/emotional/relational spokes only ───────────
    # Growth & Craft, People, Work, Body carry the most astrological meaning.
    # Money and Home status lines included only if they carry emotional weight.
    high_resonance_spokes = [
        "## 🌱 Growth & Craft",
        "## 💛 People",
        "## 💼 Work",
        "## 🌿 Body",
        "## 🧭 Culture & Adventure",
    ]

    snapshot_lines.append("## What's alive in Jordan's life right now")
    snapshot_lines.append("*Narrative status per spoke:the emotional and identity context.*")
    snapshot_lines.append("")

    for header in high_resonance_spokes:
        in_spoke = False
        spoke_name = header.split(" ", 2)[-1]
        for line in lines:
            if line.strip() == header.strip():
                in_spoke = True
                continue
            if in_spoke:
                if line.startswith("## "):
                    break
                # Accept **Status:** or **Travel:** as the summary line
                if line.strip().startswith("**Status:**") or line.strip().startswith("**Travel:**"):
                    status_text = line.strip().replace("**Status:**", "").replace("**Travel:**", "Travel —").strip()
                    snapshot_lines.append(f"**{spoke_name}:** {status_text}")
                    break

    snapshot_lines += [
        "",
        "---",
        "",
        "*Admin flags (forms, calls, logistics) omitted:low astrological charge.*",
        "*Full spoke detail: the bones/spoke-digest.md*",
    ]

    return "\n".join(snapshot_lines)


# ─── Cross-Workspace Digest (for the bones) ───────────────────────────

def workspace_digest(positions, today_aspects, date_str):
    """5-line digest for the bones the-stars-daily.md"""
    # Moon phase (approx from Sun-Moon angle)
    sun_deg = positions.get("Sun", {}).get("deg", 0)
    moon_deg = positions.get("Moon", {}).get("deg", 0)
    if sun_deg and moon_deg:
        phase_angle = (moon_deg - sun_deg) % 360
        if phase_angle < 45:
            phase = "New Moon / Waxing Crescent"
        elif phase_angle < 90:
            phase = "Waxing Crescent"
        elif phase_angle < 135:
            phase = "First Quarter"
        elif phase_angle < 180:
            phase = "Waxing Gibbous"
        elif phase_angle < 225:
            phase = "Full Moon / Waning Gibbous"
        elif phase_angle < 270:
            phase = "Waning Gibbous"
        elif phase_angle < 315:
            phase = "Last Quarter"
        else:
            phase = "Waning Crescent"
    else:
        phase = "unknown"

    moon_sign = deg_to_sign(moon_deg) if moon_deg else "?"
    top_3 = [a for a in today_aspects if a["orb"] <= 1.5][:3]

    lines = [
        f"# The Stars:Daily Digest | {date_str}",
        "",
        f"**Moon:** {moon_sign} | {phase}",
        "",
        "**Top active transits (tight orb):**",
    ]
    for a in top_3:
        direction = "applying" if a["applying"] else "separating"
        lines.append(
            f"- {a['transit']} {a['symbol']} natal {a['natal']} "
            f"({a['natal_house']}):{a['orb']}° {direction}"
        )

    lines += ["", f"*Full reading: the stars/daily readings/{date_str[:7]}/{date_str}.md*"]
    return "\n".join(lines)


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    swe = setup_swisseph()
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")

    print(f"Calculating positions for {date_str} UTC...")

    # 1. Today's positions
    today_positions = calc_positions(swe, now)

    # 2. Aspects
    t2n_aspects = transit_to_natal_aspects(today_positions)
    t2t_aspects = transit_to_transit_aspects(today_positions)

    # 3. Week-ahead
    week_aspects = week_ahead_aspects(swe, now)

    # 4. Active transits summary
    active_summary = active_transits_summary(today_positions, t2n_aspects)

    # 5. Cross-workspace digest
    digest = workspace_digest(today_positions, t2n_aspects, date_str)

    # 6. Life snapshot (the bones → Stars)
    life_snapshot = read_life_snapshot(date_str)

    # ── Output files ─────────────────────────────────────────────────────────

    out_dir = os.path.dirname(__file__)

    # positions-today.json
    with open(os.path.join(out_dir, "positions-today.json"), "w") as f:
        json.dump({
            "date": date_str,
            "weekday": now.strftime("%A"),   # e.g. "Tuesday" — use this, never compute it
            "positions": {k: {**v, "formatted": deg_to_sign(v["deg"]) if v.get("deg") else None}
                         for k, v in today_positions.items()},
            "transit_to_natal": t2n_aspects,
            "transit_to_transit": t2t_aspects,
        }, f, indent=2)

    # positions-week.json
    with open(os.path.join(out_dir, "positions-week.json"), "w") as f:
        json.dump({
            "generated": date_str,
            "upcoming_exact_aspects": week_aspects,
        }, f, indent=2)

    # active-transits.txt
    with open(os.path.join(out_dir, "active-transits.txt"), "w") as f:
        f.write(f"Active transits as of {date_str}: {active_summary}\n")

    # workspace-digest.txt → the bones
    with open(os.path.join(out_dir, "workspace-digest.txt"), "w") as f:
        f.write(digest)

    personal_hq_digest_path = os.path.join(PERSONAL_HQ_PATH, "the-stars-daily.md")
    try:
        with open(personal_hq_digest_path, "w") as f:
            f.write(digest)
        print(f"Cross-workspace digest written to the bones")
    except Exception as e:
        print(f"Could not write to the bones: {e}")

    # life-snapshot.txt → Stars (the bones → Stars direction)
    with open(os.path.join(out_dir, "life-snapshot.txt"), "w") as f:
        f.write(life_snapshot)
    print(f"Life snapshot pulled from the bones spoke-digest")

    # ── Sunday: generate week-ahead + workplace HTML + Slack draft ───────────
    if now.weekday() == 6:  # 0=Mon … 6=Sun
        week_start = now + timedelta(days=1)
        week_end   = now + timedelta(days=7)
        week_start_str = week_start.strftime("%B %-d")
        week_end_str   = week_end.strftime("%B %-d")

        stars_root = os.path.join(out_dir, "..")

        sky_html = generate_sky_at_work_html(t2t_aspects, today_positions, week_start_str)
        sky_path = os.path.join(stars_root, "workplace readings", "sky-at-work.html")
        with open(sky_path, "w") as f:
            f.write(sky_html)

        week_html = generate_week_ahead_html(
            week_aspects, t2n_aspects, today_positions, week_start_str, week_end_str)
        week_dir = os.path.join(stars_root, "weekly readings")
        os.makedirs(week_dir, exist_ok=True)
        week_path = os.path.join(week_dir, f"{date_str}-week-ahead.html")
        with open(week_path, "w") as f:
            f.write(week_html)

        slack = generate_slack_draft(t2t_aspects, week_start_str, today_positions)
        slack_path = os.path.join(stars_root, "workplace readings", "slack-draft.md")
        with open(slack_path, "w") as f:
            f.write(slack)

        print(f"Sunday files written: sky-at-work.html, {date_str}-week-ahead.html, slack-draft.md")

    print("Done. Output files written to routine/")
    print(f"Active transits: {active_summary}")

    swe.close()


if __name__ == "__main__":
    main()
