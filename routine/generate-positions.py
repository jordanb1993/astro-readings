#!/usr/bin/env python3
"""
generate-positions.py — Astro workspace position calculator
Outputs all planet positions + aspect data for the Claude reading routine.

Produces:
  1. positions-today.json    — today's full planet data (transit-to-natal + transit-to-transit aspects)
  2. positions-week.json     — next 7 days of aspect data (for week-ahead file)
  3. active-transits.txt     — one-liner for CLAUDE.md auto-patch
  4. workspace-digest.txt    — 5-line cross-workspace snapshot for Personal Life HQ

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
            print(f"Could not download Chiron ephe file: {e} — will use Moshier fallback")
            chiron_file = None

    swe.set_ephe_path(ephe_dir if chiron_file else "")
    return swe


# ─── Jordan's Natal Chart ─────────────────────────────────────────────────────

NATAL = {
    "Sun":         {"deg": 241.0,  "sign": "Sagittarius", "house": "6th"},   # 1° Sag
    "Moon":        {"deg": 4.0,    "sign": "Aries",       "house": "10th"},  # 4° Aries
    "Mercury":     {"deg": 222.0,  "sign": "Scorpio",     "house": "5th"},   # 12° Sco
    "Venus":       {"deg": 228.0,  "sign": "Scorpio",     "house": "5th"},   # 18° Sco
    "Mars":        {"deg": 250.0,  "sign": "Sagittarius", "house": "6th"},   # 10° Sag
    "Jupiter":     {"deg": 212.0,  "sign": "Scorpio",     "house": "5th"},   # 2° Sco
    "Saturn":      {"deg": 324.0,  "sign": "Aquarius",    "house": "9th"},   # 24° Aqu
    "Uranus":      {"deg": 289.0,  "sign": "Capricorn",   "house": "7th"},   # 19° Cap
    "Neptune":     {"deg": 289.0,  "sign": "Capricorn",   "house": "7th"},   # 19° Cap
    "Pluto":       {"deg": 235.0,  "sign": "Scorpio",     "house": "6th"},   # 25° Sco
    "Chiron":      {"deg": 158.0,  "sign": "Virgo",       "house": "4th"},   # 8° Vir
    "NorthNode":   {"deg": 243.0,  "sign": "Sagittarius", "house": "6th"},   # 3° Sag
    "SouthNode":   {"deg": 63.0,   "sign": "Gemini",      "house": "12th"},  # 3° Gem
    "Ascendant":   {"deg": 89.0,   "sign": "Gemini",      "house": "1st"},   # 29° Gem
    "Midheaven":   {"deg": 338.0,  "sign": "Pisces",      "house": "10th"},  # 8° Pis
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
    """Return True if the aspect is applying (getting more exact)."""
    diff = (pos1 - pos2) % 360
    if diff > 180:
        diff -= 360
    relative_speed = speed1 - speed2
    # Applying if moving toward exact angle
    return (diff * relative_speed) < 0


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
            f"{t} {sign_str}{retro} — {a['orb']}° {direction} {a['aspect']} "
            f"natal {a['natal']} ({a['natal_house']})"
        )
    return " | ".join(lines)


# ─── Cross-Workspace Digest (for Personal Life HQ) ───────────────────────────

def workspace_digest(positions, today_aspects, date_str):
    """5-line digest for Personal Life HQ the-stars-daily.md"""
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
        f"# The Stars — Daily Digest | {date_str}",
        "",
        f"**Moon:** {moon_sign} | {phase}",
        "",
        "**Top active transits (tight orb):**",
    ]
    for a in top_3:
        direction = "applying" if a["applying"] else "separating"
        lines.append(
            f"- {a['transit']} {a['symbol']} natal {a['natal']} "
            f"({a['natal_house']}) — {a['orb']}° {direction}"
        )

    lines += ["", f"*Full reading: the stars/readings/{date_str}.md*"]
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

    # ── Output files ─────────────────────────────────────────────────────────

    out_dir = os.path.dirname(__file__)

    # positions-today.json
    with open(os.path.join(out_dir, "positions-today.json"), "w") as f:
        json.dump({
            "date": date_str,
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

    # workspace-digest.txt
    with open(os.path.join(out_dir, "workspace-digest.txt"), "w") as f:
        f.write(digest)

    print("Done. Output files written to routine/")
    print(f"Active transits: {active_summary}")

    swe.close()


if __name__ == "__main__":
    main()
