import os
import zipfile
import shutil

repo_dir = r"C:\Users\NANDHA KRISHNA\Documents\GitHub\Flank"
staging_dir = os.path.join(repo_dir, "package_staging")

if os.path.exists(staging_dir):
    shutil.rmtree(staging_dir)
os.makedirs(staging_dir)

files_to_copy = [
    # Host & Windowing
    ("host/main.py", "host/main.py"),
    ("host/wallpaper.py", "host/wallpaper.py"),
    
    # Frontend TypeScript
    ("src/main.ts", "src/main.ts"),
    ("src/ui/dock.ts", "src/ui/dock.ts"),
    ("src/ui/cards.ts", "src/ui/cards.ts"),
    ("src/ui/magnification.ts", "src/ui/magnification.ts"),
    ("src/ui/windows.ts", "src/ui/windows.ts"),
    ("src/ui/icons.ts", "src/ui/icons.ts"),
    
    # Theme Engine
    ("src/theme/engine.ts", "src/theme/engine.ts"),
    ("src/theme/flattener.ts", "src/theme/flattener.ts"),
    ("src/theme/schema.ts", "src/theme/schema.ts"),
    ("src/theme/validator.ts", "src/theme/validator.ts"),
    ("src/theme/contrast.ts", "src/theme/contrast.ts"),
    
    # Web / CSS Assets
    ("public/index.html", "public/index.html"),
    ("public/components.css", "public/components.css"),
    ("public/tokens.css", "public/tokens.css"),
    
    # Themes
    ("themes/liquid-glass.json", "themes/liquid-glass.json"),
    ("themes/glass.json", "themes/glass.json"),
    ("themes/paper.json", "themes/paper.json"),
    ("themes/aurora.json", "themes/aurora.json"),
    ("themes/terminal.json", "themes/terminal.json"),
    ("themes/rail.json", "themes/rail.json"),
    ("themes/nord.json", "themes/nord.json"),
    
    # Design Docs & Decisions
    ("docs/design/DECISIONS.md", "docs/design/DECISIONS.md"),
    ("docs/design/DESIGN.md", "docs/design/DESIGN.md"),
    ("docs/design/ANTIGRAVITY_PROMPT.md", "docs/design/ANTIGRAVITY_PROMPT.md"),
    ("README.md", "README.md"),
    ("package.json", "package.json"),
    ("tsconfig.json", "tsconfig.json"),
]

for src, dst in files_to_copy:
    src_path = os.path.join(repo_dir, src)
    dst_path = os.path.join(staging_dir, dst)
    if os.path.exists(src_path):
        os.makedirs(os.path.dirname(dst_path), exist_ok=True)
        shutil.copy2(src_path, dst_path)

# Copy relevant screenshots
user_media_dir = r"C:\Users\NANDHA KRISHNA\.gemini\antigravity\brain\197882d8-da8e-4a6a-96e1-9fcb71435b9f\.user_uploaded"
screenshot_mapping = [
    ("media_1793814453775_7feb1357.jpg", "screenshots/issue-black-corners-dock.jpg"),
    ("media_1793807893986_cc1f1490.jpg", "screenshots/issue-black-background-flyout.jpg"),
    ("media_1793788228294_7295a3fe.jpg", "screenshots/issue-white-vignette-edges.jpg"),
    ("media_1793785337601_f91a78b0.jpg", "screenshots/desired-liquid-glass-reference.jpg"),
]
for src_name, dst_name in screenshot_mapping:
    s_path = os.path.join(user_media_dir, src_name)
    if os.path.exists(s_path):
        d_path = os.path.join(staging_dir, dst_name)
        os.makedirs(os.path.dirname(d_path), exist_ok=True)
        shutil.copy2(s_path, d_path)

context_claude = """# Flank UI, Transparency, and Windowing Context for Claude

## Overview
Flank is a lightweight vertical second dock and widget flyout system for Windows 11.
It is built with:
- **Backend / Host**: Python 3.14 (`host/main.py`) using `pywebview` with `gui="edgechromium"` (Microsoft Edge WebView2 hosted in a WinForms window).
- **Frontend**: Vanilla TypeScript + modern CSS, bundled with esbuild into `public/bundle.js` and loaded in `public/index.html`.
- **Styling & Theming**: CSS custom properties driven by JSON themes (`themes/liquid-glass.json`, `themes/glass.json`, etc.) flattened via `src/theme/flattener.ts`.

---

## The Core Problems

### 1. Black / Dark Corners Around the Rounded Pill Dock
- **Symptom**: See `screenshots/issue-black-corners-dock.jpg`. When the vertical dock renders on the desktop, the corners outside the rounded pill boundary show black triangles/pixels instead of being completely transparent to the desktop wallpaper.
- **What is currently in `host/main.py`**:
  - `os.environ["WEBVIEW2_DEFAULT_BACKGROUND_COLOR"] = "0"` (sets WebView2 default background to 0x00000000 transparent).
  - In `setup_transparency()`:
    ```python
    form.BackColor = Drawing.Color.Fuchsia
    form.TransparencyKey = Drawing.Color.Fuchsia
    ```
  - In `set_dock_bounds()` and `on_dock_shown()`:
    ```python
    user32.SetWindowPos(hwnd, 0, px, py, pw, ph, SWP_NOZORDER | SWP_NOACTIVATE | SWP_FRAMECHANGED)
    rgn = gdi32.CreateRoundRectRgn(0, 0, pw, ph, pw, pw)
    user32.SetWindowRgn(hwnd, rgn, True)
    gdi32.DeleteObject(rgn)
    ```
  - DWM attributes configured:
    - `DWMWA_WINDOW_CORNER_PREFERENCE = 1` (`DWMWCP_DONOTROUND` to avoid DWM square chrome)
    - `DWMWA_BORDER_COLOR = 0xFFFFFFFE` (`DWMWA_COLOR_NONE` to suppress DWM 1px border)
    - `DWMWA_SYSTEMBACKDROP_TYPE = 3` (Acrylic blur)

### 2. Live Transparent Glass Effect (Liquid Glass)
- **Desired Visual**: See `screenshots/desired-liquid-glass-reference.jpg`. A sleek, translucent frosted glass capsule with subtle rim highlights and soft reflections, revealing the live desktop behind it.
- **Symptom**: See `screenshots/issue-black-background-flyout.jpg` and `screenshots/issue-white-vignette-edges.jpg`. In some states or cards, the window renders with an opaque black or white background, or white vignette edges around cards.
- **Relevant files**:
  - `public/components.css`: `.flank-dock` and `.flank-card` classes with `backdrop-filter: blur(...)`.
  - `themes/liquid-glass.json`: Token values (`dockBg`, `cardBg`, `tintAlpha`, `radii`).
  - `src/main.ts`: Wallpaper sampler / backdrop updates in `window.flankUpdateBackdrop`.

### 3. Flyout Cards Interaction
- The dock has widgets (audio mixer, battery, wifi, weather, notes).
- Hovering or clicking should open the corresponding card (`card_window`) positioned directly adjacent to the dock item.
- The card window is a secondary PyWebView window that gets positioned and shown/hidden via `host/main.py` (`show_hover_card` / `hide_hover_card`).

---

## Directory Structure in this Package

```
host/
  main.py               # WinForms / WebView2 host window setup, transparency, DWM, Win32 calls
  wallpaper.py          # Wallpaper detection and sampling
src/
  main.ts               # Frontend entry, dock lifecycle, hover/click card triggers
  ui/
    dock.ts             # Dock layout and tile rendering
    cards.ts            # Flyout card content templates
    magnification.ts    # macOS-style dock hover magnification
    windows.ts          # Modals & settings window
  theme/
    engine.ts           # Theme application and runtime switching
    flattener.ts        # JSON tokens to CSS variables
    schema.ts           # Theme types
    validator.ts        # Contrast and token validation
    contrast.ts         # WCAG contrast calculator
public/
  index.html            # App root
  components.css        # Dock and card styling, backdrop-filter, borders, highlights
  tokens.css            # Base CSS tokens
themes/
  liquid-glass.json     # Liquid Glass theme specification
  glass.json            # Glass theme
  paper.json            # Base paper theme
docs/design/
  DECISIONS.md          # Prior diagnosis and decisions on DWM, GDI, and WinForms
  DESIGN.md             # Architecture and design system specification
screenshots/
  issue-black-corners-dock.jpg       # Visual of the black corner artifact
  issue-black-background-flyout.jpg  # Visual of the black background on cards
  issue-white-vignette-edges.jpg     # Visual of white edge halos
  desired-liquid-glass-reference.jpg # Desired target reference design
```

---

## Questions for Claude
1. In Windows 11 with `pywebview` (WinForms + EdgeChromium WebView2), what is the most reliable way to achieve a completely borderless, rounded capsule window with zero black corner pixels/triangles? Is `TransparencyKey` + `SetWindowRgn` optimal, or should `DwmExtendFrameIntoClientArea` with `MARGINS(-1)` / WS_EX_LAYERED be configured differently?
2. How to ensure WebView2 properly composites translucency with `backdrop-filter` over the desktop wallpaper when DWM Acrylic (`DWMWA_SYSTEMBACKDROP_TYPE = 3`) is active?
3. What causes WebView2 / WinForms flyout windows to occasionally draw a solid black background or lose transparency when hidden and reshown?
"""

with open(os.path.join(staging_dir, "CONTEXT_FOR_CLAUDE.md"), "w", encoding="utf-8") as f:
    f.write(context_claude)

# Create the zip file
zip_path = os.path.join(repo_dir, "flank-ui-transparency.zip")
if os.path.exists(zip_path):
    os.remove(zip_path)

with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(staging_dir):
        for file in files:
            full_file_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_file_path, staging_dir)
            zf.write(full_file_path, rel_path)

# Also copy to user desktop for convenience
desktop_dir = os.path.join(os.path.expanduser("~"), "Desktop")
desktop_zip = os.path.join(desktop_dir, "flank-ui-transparency.zip")
try:
    shutil.copy2(zip_path, desktop_zip)
    print(f"Copied to desktop: {desktop_zip}")
except Exception as e:
    print(f"Could not copy to desktop: {e}")

shutil.rmtree(staging_dir)
print(f"Created zip successfully at: {zip_path}")
print(f"Zip size: {os.path.getsize(zip_path):,} bytes ({os.path.getsize(zip_path)/1024:.1f} KB)")

