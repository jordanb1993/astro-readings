#!/usr/bin/env python3
"""
patch.py — Pathfinder natal chart batch patcher

Usage:
  python app/patch.py --list
  python app/patch.py --change <name> [--dry-run] [--only name1,name2]
"""

import argparse
import re
import sys
from datetime import date
from pathlib import Path
from typing import Optional

# ─── Paths ────────────────────────────────────────────────────────────────────

ROOT = Path("/Users/jordanashleybarney/Library/Mobile Documents/iCloud~md~obsidian/Documents/pathfinder")
NATAL_DIR = ROOT / "natal readings"
APP_DIR = ROOT / "app"
PATCH_LOG = APP_DIR / "patch-log.md"

# Builds to exclude from all patches
EXCLUDE = {"design-system.html", "chart-wheel.html", "mimi-wheel.html", "jordan-natal.html"}

# Canonical active build order
ACTIVE_BUILDS = [
    "jordan", "dasha", "marina", "mimi", "carina",
    "kate", "hazel", "iza", "su", "yvonne"
]

# ─── Colors ───────────────────────────────────────────────────────────────────

GREEN  = "\033[32m"
RED    = "\033[31m"
YELLOW = "\033[33m"
CYAN   = "\033[36m"
BOLD   = "\033[1m"
RESET  = "\033[0m"

def green(s):  return f"{GREEN}{s}{RESET}"
def red(s):    return f"{RED}{s}{RESET}"
def yellow(s): return f"{YELLOW}{s}{RESET}"
def cyan(s):   return f"{CYAN}{s}{RESET}"
def bold(s):   return f"{BOLD}{s}{RESET}"

# ─── Patch registry ───────────────────────────────────────────────────────────

_registry: dict[str, dict] = {}

def patch(name: str, description: str):
    """Decorator that registers a patch function."""
    def decorator(fn):
        _registry[name] = {"fn": fn, "description": description}
        return fn
    return decorator

# ─── Target file resolution ───────────────────────────────────────────────────

def resolve_targets(only: Optional[list]) -> list:
    """Return list of HTML paths to operate on, respecting --only and EXCLUDE."""
    if only:
        paths = []
        for name in only:
            p = NATAL_DIR / f"{name}.html"
            if not p.exists():
                print(red(f"  ERROR: {name}.html not found in natal readings/"))
                sys.exit(1)
            paths.append(p)
        return paths

    # Default: all active builds, in order
    paths = []
    for name in ACTIVE_BUILDS:
        p = NATAL_DIR / f"{name}.html"
        if p.exists():
            paths.append(p)
    # Also pick up any .html not in EXCLUDE or ACTIVE_BUILDS (forward compat)
    known = {p.name for p in paths}
    for p in sorted(NATAL_DIR.glob("*.html")):
        if p.name not in EXCLUDE and p.name not in known:
            paths.append(p)
    return paths

# ─── Patch log ────────────────────────────────────────────────────────────────

def append_patch_log(change: str, applied_to: list[str], changes_made: int):
    if not PATCH_LOG.exists():
        PATCH_LOG.write_text("# Pathfinder Patch Log\n\n", encoding="utf-8")

    names = ", ".join(applied_to) if applied_to else "none"
    entry = (
        f"## {date.today().isoformat()} — {change}\n"
        f"Applied to: {names}\n"
        f"Changes: {changes_made} file{'s' if changes_made != 1 else ''} modified\n\n"
    )
    existing = PATCH_LOG.read_text(encoding="utf-8")
    # Insert after the header line
    lines = existing.split("\n")
    insert_at = 1
    for i, line in enumerate(lines):
        if line.startswith("## "):
            insert_at = i
            break
    lines.insert(insert_at, entry)
    PATCH_LOG.write_text("\n".join(lines), encoding="utf-8")

# ─── Patches ──────────────────────────────────────────────────────────────────

GEO_BG_SECTIONS = [
    "sp-chart", "sp-portrait", "sp-signature", "sp-constitution",
    "sp-formative", "sp-shadow", "sp-arc", "sp-archetype", "sp-poem",
    "panel-transits", "panel-daily", "panel-wheel"
]

@patch("geo-bg-check", "Audit: report which builds are missing geo-bg SVG in any of the 12 expected sections")
def patch_geo_bg_check(targets: list, dry_run: bool) -> tuple:
    """Read-only audit. Returns (applied_to, changes_made) — always 0 changes."""
    print(bold("\nGeo-bg SVG audit"))
    print(f"  Checking {len(GEO_BG_SECTIONS)} sections: {', '.join(GEO_BG_SECTIONS)}\n")

    any_fail = False
    for path in targets:
        name = path.stem
        html = path.read_text(encoding="utf-8")

        missing = []
        for section_id in GEO_BG_SECTIONS:
            # Find the section div, then look for geo-bg within it
            # Strategy: split on the section id and check if geo-bg appears before the next section
            pattern = rf'id="{re.escape(section_id)}".*?(?=id="(?:{"|".join(GEO_BG_SECTIONS)})"|\Z)'
            m = re.search(pattern, html, re.DOTALL)
            if not m:
                missing.append(section_id)
            elif 'class="geo-bg"' not in m.group(0):
                missing.append(section_id)

        if missing:
            any_fail = True
            print(f"  {red('FAIL')} {bold(name)}: missing geo-bg in → {', '.join(missing)}")
        else:
            print(f"  {green('PASS')} {bold(name)}: all 12 sections have geo-bg")

    print()
    if any_fail:
        sys.exit(1)
    return [], 0


@patch("og-title-check", "Audit: report the current og:title value in each build")
def patch_og_title_check(targets: list, dry_run: bool) -> tuple:
    """Read-only audit. Returns (applied_to, changes_made) — always 0 changes."""
    print(bold("\nog:title audit\n"))

    for path in targets:
        name = path.stem
        html = path.read_text(encoding="utf-8")
        m = re.search(r'<meta\s+property="og:title"\s+content="([^"]*)"', html)
        if m:
            print(f"  {green('FOUND')} {bold(name):20s} → {cyan(m.group(1))}")
        else:
            print(f"  {red('MISS')}  {bold(name):20s} → og:title not found")

    print()
    return [], 0


@patch("card-back-padding", "Structural patch: set .card-back-content padding to 32px 26px in inline <style> blocks")
def patch_card_back_padding(targets: list, dry_run: bool) -> tuple:
    """
    Finds .card-back-content{...} inside <style> blocks and sets padding to 32px 26px.
    Uses regex. Supports dry-run.
    """
    PADDING_VALUE = "32px 26px"
    # Matches: .card-back-content{ ... padding: <anything> ; ... }
    # We target just the padding property line inside the rule.
    # Pattern: inside a .card-back-content rule block, replace the padding declaration.
    RULE_PATTERN = re.compile(
        r'(\.card-back-content\s*\{[^}]*?padding\s*:\s*)([^;]+)(;)',
        re.DOTALL
    )

    print(bold("\ncard-back-padding patch"))
    if dry_run:
        print(yellow("  DRY RUN — no files will be modified\n"))

    applied_to = []
    changes_made = 0

    for path in targets:
        name = path.stem
        html = path.read_text(encoding="utf-8")

        matches = list(RULE_PATTERN.finditer(html))
        if not matches:
            print(f"  {yellow('SKIP')} {bold(name):20s} → no .card-back-content padding found in inline styles")
            continue

        new_html = html
        file_changed = False
        for m in matches:
            old_val = m.group(2).strip()
            if old_val == PADDING_VALUE:
                print(f"  {green('OK')}   {bold(name):20s} → padding already {PADDING_VALUE}")
                continue
            old_line = m.group(0)
            new_line = m.group(1) + PADDING_VALUE + m.group(3)
            if dry_run:
                print(f"  {yellow('DRY')}  {bold(name):20s} → padding: {red(old_val)} → {green(PADDING_VALUE)}")
            else:
                new_html = new_html.replace(old_line, new_line, 1)
                print(f"  {green('PATCHED')} {bold(name):20s} → padding: {old_val} → {PADDING_VALUE}")
            file_changed = True

        if file_changed and not dry_run:
            path.write_text(new_html, encoding="utf-8")
            applied_to.append(name)
            changes_made += 1

    print()
    return applied_to, changes_made

# ─── CLI ──────────────────────────────────────────────────────────────────────

def cmd_list():
    print(bold("\nPathfinder registered patches:\n"))
    for name, info in _registry.items():
        print(f"  {cyan(name):30s} {info['description']}")
    print()


def cmd_change(change: str, dry_run: bool, only: Optional[list]):
    if change not in _registry:
        print(red(f"  ERROR: Unknown patch '{change}'"))
        print(f"  Run {cyan('python app/patch.py --list')} to see available patches.")
        sys.exit(1)

    targets = resolve_targets(only)
    if not targets:
        print(yellow("  No target files found."))
        sys.exit(0)

    print(f"\n{bold('Patch:')} {cyan(change)}")
    print(f"{bold('Targets:')} {', '.join(p.stem for p in targets)}")
    if dry_run:
        print(yellow(f"{bold('Mode:')} dry-run (no files modified)"))
    print()

    fn = _registry[change]["fn"]
    applied_to, changes_made = fn(targets, dry_run)

    if not dry_run and changes_made > 0:
        append_patch_log(change, applied_to, changes_made)
        print(green(f"  Logged to app/patch-log.md"))

    print(bold(f"Done. {changes_made} file(s) modified.\n"))


def main():
    parser = argparse.ArgumentParser(
        description="Pathfinder natal chart batch patcher",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="Examples:\n"
               "  python app/patch.py --list\n"
               "  python app/patch.py --change geo-bg-check\n"
               "  python app/patch.py --change card-back-padding --dry-run\n"
               "  python app/patch.py --change card-back-padding --only jordan,dasha\n"
    )
    parser.add_argument("--change", metavar="NAME", help="Name of patch to run")
    parser.add_argument("--dry-run", action="store_true", help="Print what would change without modifying files")
    parser.add_argument("--only", metavar="NAMES", help="Comma-separated list of build names (no .html extension)")
    parser.add_argument("--list", action="store_true", help="List all registered patches")

    args = parser.parse_args()

    if args.list:
        cmd_list()
        return

    if args.change:
        only = [n.strip() for n in args.only.split(",")] if args.only else None
        cmd_change(args.change, args.dry_run, only)
        return

    parser.print_help()
    sys.exit(1)


if __name__ == "__main__":
    main()
