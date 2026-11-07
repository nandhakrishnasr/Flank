"""
Capture Layout Verification Screenshots for Flank
- Paper theme at 100% scale (all 26 screens)
- Paper theme at 150% scale (all 26 screens)
- Liquid Glass theme at 100% scale (14 flyouts + 4 settings tabs)
Saves outputs to docs/screens/ and artifact directory.
"""

import os
import sys
import shutil
import subprocess

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
REPO_DIR = r"C:\Users\NANDHA KRISHNA\Documents\GitHub\Flank"
HARNESS_URL = f"file:///{REPO_DIR.replace(os.sep, '/')}/public/_screenshot_harness.html"
OUT_BASE = os.path.join(REPO_DIR, "docs", "screens")
ARTIFACT_DIR = r"C:\Users\NANDHA KRISHNA\.gemini\antigravity\brain\197882d8-da8e-4a6a-96e1-9fcb71435b9f\screenshots"

os.makedirs(OUT_BASE, exist_ok=True)
os.makedirs(ARTIFACT_DIR, exist_ok=True)

SCREENS = [
    # 1. Dock & Collapsed States (3)
    {
        "category": "Dock States",
        "filename": "dock_expanded.png",
        "title": "Expanded Vertical Dock",
        "url_path": "view=dock&dockState=expanded",
        "width": 260,
        "height": 780,
    },
    {
        "category": "Dock States",
        "filename": "dock_collapsed_plain.png",
        "title": "Collapsed Edge Tab (Plain Notch)",
        "url_path": "view=dock&dockState=collapsed&showLogoOnTab=false",
        "width": 180,
        "height": 260,
    },
    {
        "category": "Dock States",
        "filename": "dock_collapsed_logo.png",
        "title": "Collapsed Edge Tab (Brand Logo)",
        "url_path": "view=dock&dockState=collapsed&showLogoOnTab=true",
        "width": 180,
        "height": 300,
    },

    # 2. Flyout Cards (14 Widgets)
    {
        "category": "Widget Flyouts",
        "filename": "flyout_weather.png",
        "title": "Weather & Forecast",
        "url_path": "view=card&widget=weather",
        "width": 420,
        "height": 380,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_calendar.png",
        "title": "Agenda & Upcoming Meetings",
        "url_path": "view=card&widget=calendar",
        "width": 420,
        "height": 490,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_focus.png",
        "title": "Focus Timer (Pomodoro)",
        "url_path": "view=card&widget=focus",
        "width": 420,
        "height": 400,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_stats.png",
        "title": "System Diagnostics",
        "url_path": "view=card&widget=stats",
        "width": 420,
        "height": 460,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_battery.png",
        "title": "Battery & Power Health",
        "url_path": "view=card&widget=battery",
        "width": 420,
        "height": 460,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_player.png",
        "title": "Mini Media Player",
        "url_path": "view=card&widget=player",
        "width": 420,
        "height": 400,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_clock.png",
        "title": "World Clock & Timezones",
        "url_path": "view=card&widget=clock",
        "width": 420,
        "height": 460,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_scratchpad.png",
        "title": "Quick Scratchpad",
        "url_path": "view=card&widget=scratchpad",
        "width": 420,
        "height": 450,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_colorpicker.png",
        "title": "Screen Color Picker",
        "url_path": "view=card&widget=colorpicker",
        "width": 420,
        "height": 420,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_audio.png",
        "title": "Audio & Mic Mixer",
        "url_path": "view=card&widget=audio",
        "width": 420,
        "height": 450,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_network.png",
        "title": "Network & Dev Ports",
        "url_path": "view=card&widget=network",
        "width": 420,
        "height": 460,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_ai.png",
        "title": "AI Usage Tracker",
        "url_path": "view=card&widget=ai",
        "width": 420,
        "height": 430,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_clipboard.png",
        "title": "Clipboard Quick Flyout",
        "url_path": "view=card&widget=clipboard",
        "width": 420,
        "height": 480,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_widgets.png",
        "title": "Active Widgets Grid",
        "url_path": "view=card&widget=widgets",
        "width": 420,
        "height": 440,
    },

    # 3. Settings Window Tabs (4)
    {
        "category": "Settings Window",
        "filename": "settings_appearance.png",
        "title": "Settings — Appearance & Themes",
        "url_path": "view=modal&modal=settings&tab=appearance",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Settings Window",
        "filename": "settings_items.png",
        "title": "Settings — Items & Shortcuts",
        "url_path": "view=modal&modal=settings&tab=items",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Settings Window",
        "filename": "settings_widgets.png",
        "title": "Settings — Widgets & Modules",
        "url_path": "view=modal&modal=settings&tab=widgets",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Settings Window",
        "filename": "settings_about.png",
        "title": "Settings — About & Credits",
        "url_path": "view=modal&modal=settings&tab=about",
        "width": 1040,
        "height": 780,
    },

    # 4. Secondary Full Windows (4)
    {
        "category": "Secondary Windows",
        "filename": "modal_clipboard.png",
        "title": "Full Clipboard History Manager",
        "url_path": "view=modal&modal=clipboard",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Secondary Windows",
        "filename": "modal_stats.png",
        "title": "Full System Diagnostics Dashboard",
        "url_path": "view=modal&modal=stats",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Secondary Windows",
        "filename": "modal_battery.png",
        "title": "Full Battery & Peripherals Dashboard",
        "url_path": "view=modal&modal=battery",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Secondary Windows",
        "filename": "modal_clock.png",
        "title": "Full World Clock & Timezone Explorer",
        "url_path": "view=modal&modal=clock",
        "width": 1040,
        "height": 780,
    },
]

def capture_suite(screens, theme_name, scale_factor, target_subfolder):
    target_dir = os.path.join(OUT_BASE, target_subfolder) if target_subfolder else OUT_BASE
    os.makedirs(target_dir, exist_ok=True)

    print(f"\n--- Capturing Suite: Theme='{theme_name}', Scale={scale_factor}x -> {target_subfolder or 'root'} ({len(screens)} screens) ---")

    for idx, screen in enumerate(screens, 1):
        fn = screen["filename"]
        out_path = os.path.join(target_dir, fn)
        url = f"{HARNESS_URL}?{screen['url_path']}&theme={theme_name}"

        cmd = [
            EDGE_PATH,
            "--headless=new",
            "--allow-file-access-from-files",
            "--enable-local-file-accesses",
            "--disable-gpu",
            "--hide-scrollbars",
            f"--force-device-scale-factor={scale_factor}",
            f"--window-size={screen['width']},{screen['height']}",
            f"--screenshot={out_path}",
            url,
        ]

        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

        if fn == "settings_appearance.png":
            modal_extra = os.path.join(target_dir, "modal_settings_appearance.png")
            shutil.copy2(out_path, modal_extra)
            if scale_factor == 1.0 and theme_name == "paper":
                shutil.copy2(out_path, os.path.join(OUT_BASE, "modal_settings_appearance.png"))
                shutil.copy2(out_path, os.path.join(ARTIFACT_DIR, "modal_settings_appearance.png"))

        # Also copy primary 100% paper shots to root docs/screens and artifact directory
        if scale_factor == 1.0 and theme_name == "paper":
            shutil.copy2(out_path, os.path.join(OUT_BASE, fn))
            shutil.copy2(out_path, os.path.join(ARTIFACT_DIR, fn))
            shutil.copy2(out_path, os.path.join(ARTIFACT_DIR, fn))

        size_kb = os.path.getsize(out_path) / 1024
        print(f"[{idx:02d}/{len(screens)}] {fn:28} | {screen['width']}x{screen['height']} | {size_kb:6.1f} KB | OK")

def main():
    print("=== Flank Layout Verification Screenshot Capture ===")
    
    # 1. Paper theme at 100% (all 26 screens)
    capture_suite(SCREENS, "paper", 1.0, "paper_100")

    # 2. Paper theme at 150% (all 26 screens)
    capture_suite(SCREENS, "paper", 1.5, "paper_150")

    # 3. Liquid Glass theme at 100% (14 flyouts + 4 settings = 18 screens)
    liquid_glass_screens = [s for s in SCREENS if s["category"] in ("Widget Flyouts", "Settings Window")]
    capture_suite(liquid_glass_screens, "liquid-glass", 1.0, "liquid_glass_100")

    print("\n=== Verification Capture Complete ===")
    print(f"Saved into {OUT_BASE}:")
    print("  - docs/screens/*.png (Paper 100% base set)")
    print("  - docs/screens/paper_100/*.png (26 screens)")
    print("  - docs/screens/paper_150/*.png (26 screens)")
    print("  - docs/screens/liquid_glass_100/*.png (18 screens)")

if __name__ == "__main__":
    main()
