"""
scripts/check_css_vars.py
Scans public/*.css, src/**/*.ts, and themes/*.json to verify:
1. Every var(--flank-*) used in CSS and TypeScript has a valid definition or fallback.
2. No CSS variable has a self-referencing cyclic definition (e.g. --x: var(--x)).
3. Reports undefined or broken variables.
"""

import os
import re
import sys
import json
import glob

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(REPO_DIR, "public")
SRC_DIR = os.path.join(REPO_DIR, "src")
THEMES_DIR = os.path.join(REPO_DIR, "themes")

def camel_to_kebab(s):
    return re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', s).lower()

def get_defined_vars():
    defined = set()
    cyclic = set()

    # Known dynamically injected or system variables
    defined.update([
        "--flank-glass-wallpaper-url",
        "--flank-glass-wallpaper-size",
        "--flank-glass-wallpaper-pos",
        "--flank-glass-display",
    ])

    # 1. Parse public/*.css, themes/*.css, and src/**/*.css
    var_def_pattern = re.compile(r'(--flank-[a-zA-Z0-9_-]+)\s*:\s*([^;]+);')
    css_sources = list(glob.glob(os.path.join(PUBLIC_DIR, "*.css"))) + list(glob.glob(os.path.join(THEMES_DIR, "*.css")))
    for root, _, files in os.walk(SRC_DIR):
        for f in files:
            if f.endswith(".css"):
                css_sources.append(os.path.join(root, f))
    for css_file in css_sources:
        with open(css_file, "r", encoding="utf-8") as f:
            content = f.read()
            for match in var_def_pattern.finditer(content):
                var_name = match.group(1).strip()
                val = match.group(2).strip()
                # Check for self-referential cycle: --foo: var(--foo)
                if re.search(r'var\(\s*' + re.escape(var_name) + r'\s*\)', val):
                    cyclic.add((var_name, os.path.basename(css_file)))
                defined.add(var_name)

    # 2. Parse themes/*.json
    groups = ['layout', 'surface', 'glass', 'color', 'type', 'icons', 'motion']
    for theme_file in glob.glob(os.path.join(THEMES_DIR, "*.json")):
        with open(theme_file, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
            except Exception:
                continue
            for g in groups:
                obj = data.get(g, {})
                if not isinstance(obj, dict):
                    continue
                for k in obj.keys():
                    if g == 'surface' and k in ('surfaceHover', 'hover'):
                        defined.add('--flank-surface-hover')
                    elif g == 'surface' and k in ('surfaceActive', 'active'):
                        defined.add('--flank-surface-active')
                    elif g == 'surface' and k in ('surfaceSelected', 'selected'):
                        defined.add('--flank-surface-selected')
                    else:
                        defined.add(f"--flank-{g}-{camel_to_kebab(k)}")

    return defined, cyclic

def get_used_vars():
    used = {}  # var_name -> list of (file, line_num, full_match, has_fallback)

    # Pattern matching var(--flank-foo) or var(--flank-foo, fallback)
    var_use_pattern = re.compile(r'var\(\s*(--flank-[a-zA-Z0-9_-]+)(?:\s*,\s*([^)]+))?\s*\)')

    files_to_check = []
    for ext in ("*.css",):
        files_to_check.extend(glob.glob(os.path.join(PUBLIC_DIR, ext)))
        files_to_check.extend(glob.glob(os.path.join(THEMES_DIR, ext)))
    for root, _, files in os.walk(SRC_DIR):
        for f in files:
            if f.endswith((".ts", ".tsx", ".js", ".mjs", ".css")):
                files_to_check.append(os.path.join(root, f))

    for fpath in files_to_check:
        rel_path = os.path.relpath(fpath, REPO_DIR)
        with open(fpath, "r", encoding="utf-8") as f:
            for idx, line in enumerate(f, 1):
                for match in var_use_pattern.finditer(line):
                    var_name = match.group(1).strip()
                    fallback = match.group(2)
                    has_fallback = bool(fallback and fallback.strip())
                    if var_name not in used:
                        used[var_name] = []
                    used[var_name].append((rel_path, idx, match.group(0), has_fallback))

    return used

def main():
    print("=== Checking Flank CSS Custom Properties (Design Tokens) ===\n")
    defined, cyclic = get_defined_vars()
    used = get_used_vars()

    errors = 0

    if cyclic:
        print("❌ CRITICAL: Cyclic self-referencing CSS variables detected (invalid at computed-value time):")
        for var_name, source in sorted(cyclic):
            print(f"   - {var_name} in {source} (resolves to unset/dropped!)")
            errors += 1
        print()

    undefined_vars = {}
    for var_name, usages in used.items():
        if var_name not in defined:
            # Check if all usages have fallbacks
            no_fallback = [u for u in usages if not u[3]]
            if no_fallback:
                undefined_vars[var_name] = no_fallback

    if undefined_vars:
        print(f"❌ Undefined CSS variables without fallback ({len(undefined_vars)}):")
        for var_name, usages in sorted(undefined_vars.items()):
            first_u = usages[0]
            print(f"   - {var_name} ({len(usages)} uses, first at {first_u[0]}:{first_u[1]})")
            errors += len(usages)
        print()
    else:
        print("✅ No undefined CSS variables used without fallback.")

    print(f"Summary: {len(defined)} defined tokens, {len(used)} distinct tokens used.")
    if errors > 0:
        print(f"\nFAILED with {errors} issue(s).")
        return 1
    else:
        print("\nALL CSS VARIABLE CHECKS PASSED.")
        return 0

if __name__ == "__main__":
    sys.exit(main())
