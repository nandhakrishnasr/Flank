"""
Capture Brand Verification Screenshots for Flank
Captures brand integration across Paper and Liquid Glass themes,
verifying:
- Settings About tab with flankLockup (dark/light variant)
- Collapsed edge tab with 20px solid capsule F glyph
- Window title bar with 18px solid capsule F glyph
- Empty states with 56px outlined capsule F glyph
- Clean dock face (no logo on dock itself)
- High-DPI scaling at 125% and 150%
"""

import os
import shutil
import subprocess

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
REPO_DIR = r"C:\Users\NANDHA KRISHNA\Documents\GitHub\Flank"
HARNESS_URL = f"file:///{REPO_DIR.replace(os.sep, '/')}/public/_screenshot_harness.html"
OUT_DIR = os.path.join(REPO_DIR, "docs", "screens", "brand")
ARTIFACT_DIR = r"C:\Users\NANDHA KRISHNA\.gemini\antigravity\brain\197882d8-da8e-4a6a-96e1-9fcb71435b9f\screenshots"

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(ARTIFACT_DIR, exist_ok=True)

SHOTS = [
    # 1. About Page (Brand Lockup)
    {
        "filename": "brand_about_paper.png",
        "title": "Settings About Page (Paper Theme)",
        "url": f"{HARNESS_URL}?view=modal&theme=paper&modal=settings&tab=about",
        "width": 1040,
        "height": 780,
        "scale": "1.0",
    },
    {
        "filename": "brand_about_liquid_glass.png",
        "title": "Settings About Page (Liquid Glass Theme)",
        "url": f"{HARNESS_URL}?view=modal&theme=liquid-glass&modal=settings&tab=about",
        "width": 1040,
        "height": 780,
        "scale": "1.0",
    },

    # 2. Collapsed Edge Tab with Logo
    {
        "filename": "brand_collapsed_tab_paper.png",
        "title": "Collapsed Tab with Logo (Paper Theme)",
        "url": f"{HARNESS_URL}?view=dock&theme=paper&dockState=collapsed&showLogoOnTab=true",
        "width": 520,
        "height": 360,
        "scale": "1.0",
    },
    {
        "filename": "brand_collapsed_tab_liquid_glass.png",
        "title": "Collapsed Tab with Logo (Liquid Glass Theme)",
        "url": f"{HARNESS_URL}?view=dock&theme=liquid-glass&dockState=collapsed&showLogoOnTab=true",
        "width": 520,
        "height": 360,
        "scale": "1.0",
    },

    # 3. Settings Window Title Bar
    {
        "filename": "brand_titlebar_paper.png",
        "title": "Settings Window Titlebar (Paper Theme)",
        "url": f"{HARNESS_URL}?view=modal&theme=paper&modal=settings&tab=appearance",
        "width": 1040,
        "height": 320,
        "scale": "1.0",
    },
    {
        "filename": "brand_titlebar_liquid_glass.png",
        "title": "Settings Window Titlebar (Liquid Glass Theme)",
        "url": f"{HARNESS_URL}?view=modal&theme=liquid-glass&modal=settings&tab=appearance",
        "width": 1040,
        "height": 320,
        "scale": "1.0",
    },

    # 4. Empty States (Glyph 56px outlined)
    {
        "filename": "brand_empty_state_agenda_paper.png",
        "title": "Empty Agenda Card (Paper Theme)",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=agenda&empty=true",
        "width": 420,
        "height": 380,
        "scale": "1.0",
    },
    {
        "filename": "brand_empty_state_agenda_liquid_glass.png",
        "title": "Empty Agenda Card (Liquid Glass Theme)",
        "url": f"{HARNESS_URL}?view=card&theme=liquid-glass&widget=agenda&empty=true",
        "width": 420,
        "height": 380,
        "scale": "1.0",
    },
    {
        "filename": "brand_empty_state_clipboard_paper.png",
        "title": "Empty Clipboard Card (Paper Theme)",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=clipboard&empty=true",
        "width": 420,
        "height": 420,
        "scale": "1.0",
    },
    {
        "filename": "brand_empty_state_clipboard_liquid_glass.png",
        "title": "Empty Clipboard Card (Liquid Glass Theme)",
        "url": f"{HARNESS_URL}?view=card&theme=liquid-glass&widget=clipboard&empty=true",
        "width": 420,
        "height": 420,
        "scale": "1.0",
    },

    # 5. Dock Face (Confirming NO logo on dock face itself)
    {
        "filename": "brand_dock_face_paper.png",
        "title": "Dock Face (Paper Theme - No Brand Logo on Face)",
        "url": f"{HARNESS_URL}?view=dock&theme=paper&dockState=expanded",
        "width": 260,
        "height": 780,
        "scale": "1.0",
    },
    {
        "filename": "brand_dock_face_liquid_glass.png",
        "title": "Dock Face (Liquid Glass Theme - No Brand Logo on Face)",
        "url": f"{HARNESS_URL}?view=dock&theme=liquid-glass&dockState=expanded",
        "width": 260,
        "height": 780,
        "scale": "1.0",
    },

    # 6. Scaling Checks at 125% and 150%
    {
        "filename": "brand_scaling_125_about.png",
        "title": "Brand About Page at 125% High-DPI",
        "url": f"{HARNESS_URL}?view=modal&theme=paper&modal=settings&tab=about",
        "width": 1040,
        "height": 780,
        "scale": "1.25",
    },
    {
        "filename": "brand_scaling_150_about.png",
        "title": "Brand About Page at 150% High-DPI",
        "url": f"{HARNESS_URL}?view=modal&theme=liquid-glass&modal=settings&tab=about",
        "width": 1040,
        "height": 780,
        "scale": "1.5",
    },
]

def main():
    print(f"=== Capturing {len(SHOTS)} Brand Verification Screenshots ===")
    for idx, s in enumerate(SHOTS, 1):
        fn = s["filename"]
        out_p = os.path.join(OUT_DIR, fn)
        art_p = os.path.join(ARTIFACT_DIR, fn)
        print(f"[{idx}/{len(SHOTS)}] Capturing {fn} ({s['title']})...")
        cmd = [
            EDGE_PATH,
            "--headless=new",
            "--allow-file-access-from-files",
            "--enable-local-file-accesses",
            "--disable-gpu",
            f"--force-device-scale-factor={s['scale']}",
            f"--window-size={s['width']},{s['height']}",
            f"--screenshot={out_p}",
            s["url"],
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        shutil.copy2(out_p, art_p)
        print(f"       -> Saved {out_p}")
    print("\nAll brand verification screenshots captured successfully!")

if __name__ == "__main__":
    main()
