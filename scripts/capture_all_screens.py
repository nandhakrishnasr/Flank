"""
Capture All Screens for Flank (Paper Theme)
Captures all dock states, all 14 flyout widgets, all 4 settings tabs,
and all 4 full modal secondary windows.
Copies outputs to the artifact screenshots directory for user viewing.
"""

import os
import sys
import shutil
import subprocess

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
REPO_DIR = r"C:\Users\NANDHA KRISHNA\Documents\GitHub\Flank"
HARNESS_URL = f"file:///{REPO_DIR.replace(os.sep, '/')}/public/_screenshot_harness.html"
OUT_DIR = os.path.join(REPO_DIR, "docs", "screenshots")
ARTIFACT_DIR = r"C:\Users\NANDHA KRISHNA\.gemini\antigravity\brain\197882d8-da8e-4a6a-96e1-9fcb71435b9f\screenshots"

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(ARTIFACT_DIR, exist_ok=True)

SCREENS = [
    # 1. Dock & Collapsed States (3)
    {
        "category": "Dock States",
        "filename": "dock_expanded.png",
        "title": "Expanded Vertical Dock",
        "description": "Full vertical dock with app launchers, status widgets, and action controls",
        "url": f"{HARNESS_URL}?view=dock&theme=paper&dockState=expanded",
        "width": 260,
        "height": 780,
    },
    {
        "category": "Dock States",
        "filename": "dock_collapsed_plain.png",
        "title": "Collapsed Edge Tab (Plain Notch)",
        "description": "Minimal edge tab tucked against the desktop bezel",
        "url": f"{HARNESS_URL}?view=dock&theme=paper&dockState=collapsed&showLogoOnTab=false",
        "width": 180,
        "height": 260,
    },
    {
        "category": "Dock States",
        "filename": "dock_collapsed_logo.png",
        "title": "Collapsed Edge Tab (Brand Logo)",
        "description": "Branded edge tab displaying the Flank geometric logomark",
        "url": f"{HARNESS_URL}?view=dock&theme=paper&dockState=collapsed&showLogoOnTab=true",
        "width": 180,
        "height": 300,
    },

    # 2. Flyout Cards (14 Widgets)
    {
        "category": "Widget Flyouts",
        "filename": "flyout_weather.png",
        "title": "Weather & Forecast",
        "description": "Current conditions, hero temperature, high/low, and 5-hour forecast",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=weather",
        "width": 420,
        "height": 380,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_calendar.png",
        "title": "Agenda & Upcoming Meetings",
        "description": "Next meeting countdown, one-click Join button, and day schedule",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=calendar",
        "width": 420,
        "height": 490,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_focus.png",
        "title": "Focus Timer (Pomodoro)",
        "description": "Active session timer, cycle completion pills, and quick duration presets",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=focus",
        "width": 420,
        "height": 400,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_stats.png",
        "title": "System Diagnostics",
        "description": "Live CPU sparkline chart, RAM meter, Disk gauge, and network throughput",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=stats",
        "width": 420,
        "height": 460,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_battery.png",
        "title": "Battery & Power Health",
        "description": "Primary battery percentage, charge status, wattage, and connected peripherals",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=battery",
        "width": 420,
        "height": 460,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_player.png",
        "title": "Mini Media Player",
        "description": "Track thumbnail, artist/title metadata, timeline scrubber, and playback controls",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=player",
        "width": 420,
        "height": 400,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_clock.png",
        "title": "World Clock & Timezones",
        "description": "Multi-timezone clocks with daylight indicators and hour offsets",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=clock",
        "width": 420,
        "height": 460,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_scratchpad.png",
        "title": "Quick Scratchpad",
        "description": "Fast memo notepad with multi-note tabs and auto-save",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=scratchpad",
        "width": 420,
        "height": 450,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_colorpicker.png",
        "title": "Screen Color Picker",
        "description": "Eyedropper tool, HEX/RGB/HSL conversion, and recent swatch palette",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=colorpicker",
        "width": 420,
        "height": 420,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_audio.png",
        "title": "Audio & Mic Mixer",
        "description": "Speaker output volume, microphone sensitivity, and device switching",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=audio",
        "width": 420,
        "height": 450,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_network.png",
        "title": "Network & Dev Ports",
        "description": "Active dev servers (3000, 5173, 8080), kill process action, and IP info",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=network",
        "width": 420,
        "height": 460,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_ai.png",
        "title": "AI Usage Tracker",
        "description": "Claude, GPT, and Gemini API token consumption and monthly budget tracker",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=ai",
        "width": 420,
        "height": 430,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_clipboard.png",
        "title": "Clipboard Quick Flyout",
        "description": "Quick history flyout with recent clips, pin toggles, and copy shortcuts",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=clipboard",
        "width": 420,
        "height": 480,
    },
    {
        "category": "Widget Flyouts",
        "filename": "flyout_widgets.png",
        "title": "Active Widgets Grid",
        "description": "Overview launcher grid showing all available widget modules",
        "url": f"{HARNESS_URL}?view=card&theme=paper&widget=widgets",
        "width": 420,
        "height": 440,
    },

    # 3. Settings Window Tabs (4)
    {
        "category": "Settings Window",
        "filename": "settings_appearance.png",
        "title": "Settings — Appearance & Themes",
        "description": "Theme gallery (Paper, Glass, Terminal, etc.), accent picker, and size controls",
        "url": f"{HARNESS_URL}?view=modal&theme=paper&modal=settings&tab=appearance",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Settings Window",
        "filename": "settings_items.png",
        "title": "Settings — Items & Shortcuts",
        "description": "Pinned applications list, global shortcut manager, and custom icon overrides",
        "url": f"{HARNESS_URL}?view=modal&theme=paper&modal=settings&tab=items",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Settings Window",
        "filename": "settings_widgets.png",
        "title": "Settings — Widgets & Modules",
        "description": "Toggle visibility for all 13 widgets, auto-collapse timings, and order",
        "url": f"{HARNESS_URL}?view=modal&theme=paper&modal=settings&tab=widgets",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Settings Window",
        "filename": "settings_about.png",
        "title": "Settings — About & Credits",
        "description": "Flank brand lockup, version 1.0.0 info, open-source licenses, and links",
        "url": f"{HARNESS_URL}?view=modal&theme=paper&modal=settings&tab=about",
        "width": 1040,
        "height": 780,
    },

    # 4. Secondary Full Windows (4)
    {
        "category": "Secondary Windows",
        "filename": "modal_clipboard.png",
        "title": "Full Clipboard History Manager",
        "description": "2-column history explorer with search, type filters, preview pane, and pinned items",
        "url": f"{HARNESS_URL}?view=modal&theme=paper&modal=clipboard",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Secondary Windows",
        "filename": "modal_stats.png",
        "title": "Full System Diagnostics Dashboard",
        "description": "Comprehensive performance monitor with per-core CPU, RAM breakdown, and processes",
        "url": f"{HARNESS_URL}?view=modal&theme=paper&modal=stats",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Secondary Windows",
        "filename": "modal_battery.png",
        "title": "Full Battery & Peripherals Dashboard",
        "description": "Battery health degradation, discharge rates, connected Bluetooth devices, and runtime",
        "url": f"{HARNESS_URL}?view=modal&theme=paper&modal=battery",
        "width": 1040,
        "height": 780,
    },
    {
        "category": "Secondary Windows",
        "filename": "modal_clock.png",
        "title": "Full World Clock & Timezone Explorer",
        "description": "Dual clock faces, time slider for international meeting scheduling, and city cards",
        "url": f"{HARNESS_URL}?view=modal&theme=paper&modal=clock",
        "width": 1040,
        "height": 780,
    },
]

def main():
    print(f"=== Capturing {len(SCREENS)} Flank Screens (Paper Theme) ===\n")
    results = []

    for idx, screen in enumerate(SCREENS, 1):
        fn = screen["filename"]
        out_path = os.path.join(OUT_DIR, fn)
        artifact_path = os.path.join(ARTIFACT_DIR, fn)

        cmd = [
            EDGE_PATH,
            "--headless=new",
            "--allow-file-access-from-files",
            "--enable-local-file-accesses",
            "--disable-gpu",
            "--force-device-scale-factor=1.0",
            f"--window-size={screen['width']},{screen['height']}",
            f"--screenshot={out_path}",
            screen["url"],
        ]

        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        shutil.copy2(out_path, artifact_path)

        size_kb = os.path.getsize(out_path) / 1024
        print(f"[{idx:02d}/{len(SCREENS)}] {screen['category']:18} | {fn:28} | {screen['width']}x{screen['height']} | {size_kb:6.1f} KB | OK")
        results.append({**screen, "size_kb": size_kb})

    print(f"\nAll {len(SCREENS)} screenshots successfully saved to:")
    print(f"  Repo:     {OUT_DIR}")
    print(f"  Artifact: {ARTIFACT_DIR}")

if __name__ == "__main__":
    main()
