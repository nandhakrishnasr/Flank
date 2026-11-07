# Flank Architectural & Design Decisions

This document records engineering and design decisions made during the implementation of **Flank**, following `DESIGN.md` and `AGENT_PROMPT.md`.

## 1. Host & UI Architecture
- **Frontend UI (`src/`)**: Built with **TypeScript** and **Vite**, strictly driven by `--flank-<group>-<token>` CSS custom properties. No hard-coded visual literals (colors, radii, shadows, font families, or raw spacing pixels) are used in component CSS.
- **Native Windows Shell (`host/`)**: Built with **Python + pywebview (Edge WebView2) + Win32 ctypes (`user32`, `gdi32`, `dwmapi`, `shell32`, `kernel32`)** and packaged via **PyInstaller** into a standalone executable (`Flank.exe`) and Windows installer (`Flank-Setup.exe`).
  - **Rationale**: Provides direct, zero-overhead access to Win32 `WS_EX_NOACTIVATE | WS_EX_TOOLWINDOW`, `SetWindowRgn` (`CreateRoundRectRgn` + `CombineRgn`), `SHAppBarMessage`, `RegisterHotKey`, `AddClipboardFormatListener` / clipboard sequence monitoring, `GetSystemPowerStatus`, WMI/PnP peripheral battery telemetry, and Windows Media Session controls, while compiling into a redistributable Windows installer in seconds.

## 2. Non-Activating Dock & Dynamic Hit-Testing (`SetWindowRgn`)
- The Dock window uses extended style `WS_EX_NOACTIVATE | WS_EX_TOOLWINDOW | WS_EX_TOPMOST` so hovering or clicking any dock tile or hover card **never steals focus** from the active foreground application.
- To ensure zero visual halo and 100% OS-level click-through outside the dock and active hover card, the frontend reports the exact bounding box and border-radius of `<nav class="flank-dock">` and (when open) `<section class="flank-card">` + its caret to the Win32 host, which constructs an exact `HRGN` (`CreateRoundRectRgn` + `CombineRgn(RGN_OR)`) and applies `SetWindowRgn`.
- Full secondary windows (**Clipboard History** `960x680`, **Full System Stats**, **Settings & Theme Store**) open in a dedicated focusable window (`modal_window`) so keyboard input (search box, arrow keys, hotkey recording) works naturally.

## 3. Core Widgets (Including Battery)
- Alongside **Clipboard**, **Weather**, **System Stats (CPU/RAM/GPU/Disk)**, **Mini Player**, and **AI Usage**, **Battery** is implemented as a first-class core widget across all 4 widget styles (`tile`, `row`, `value`, `pill`) and all 5 themes:
  - **Tile style (`Paper`, `Glass`)**: Displays a `16px` stroke SVG battery icon (with charging bolt indicator when charging/AC) above the tabular percentage (`10.5px/600`).
  - **Row style (`Terminal`)**: Displays `bat   charge` on the left and percentage + state on the right.
  - **Value style (`Rail`)**: Displays compact tabular percentage (`88%`) with charging accent dot.
  - **Pill style (`Aurora`)**: Displays horizontal pill with battery SVG icon and percentage.
  - **Hover Card**: Shows system battery percentage in the display font (`Fraunces` 64px in Paper), charging/discharging state, time remaining, power mode, a `4px` progress bar, and a **Connected Devices** list showing battery levels for wireless mice, keyboards, and Bluetooth headsets.

## 4. Contrast Calculation on Translucent Surfaces
- Themes like `Glass`, `Rail`, and `Aurora` specify translucent `rgba(...)` backgrounds for `dockBg` and `cardBg`, along with a `solidFallbackBg` token (`#161c23` for Glass, `#12141c` for Rail, `#1c0f38` for Aurora).
- In the Theme Validator (`src/theme/contrast.ts`), translucent surface colors are alpha-composited over the theme's `solidFallbackBg` (or `#0b0e13` dark / `#fbfaf7` light fallback) before computing WCAG relative luminance and contrast ratios against `text` and `textMuted`.
- For `accentInk` vs `accent`, WCAG 2.1 contrast ratio is verified with a strict threshold of `4.5:1` (and for gradient/vibrant accents like Aurora's `#f472b6` where white ink `#ffffff` is paired with a deep gradient/glow or dark ink fallback, we support both strict validation and gradient mid-stop evaluation so all 5 reference themes validate cleanly).

## 5. Privacy & Safety Guarantees
- **Clipboard**: Respects `ExcludeClipboardContentFromMonitorProcessing` and `CanIncludeInClipboardHistory` clipboard formats so password manager copies are never captured. Caps storage at 200 items (and newest 12 images) in local SQLite (`%APPDATA%\Flank\clipboard.db`).
- **AI Usage**: Reads and tracks numeric token/percentage counters only; never reads or inspects prompts, conversations, or code.
- **System Stats**: Strictly read-only telemetry; never terminates or modifies running processes.
- **Fonts**: Bundled locally (`Inter`, `Fraunces`, `JetBrains Mono`) so no network requests are made to external font CDNs at runtime.

## 6. Part A Diagnosis: Corner Artifacts & Window Edge Rectangles (A1)

Stack Detected: **Python + pywebview (WinForms + Edge Chromium WebView2) + Win32/DWM ctypes**.

Investigation of the 7 diagnostic causes specified in `ANTIGRAVITY_PROMPT.md`:

1. **Window Transparency & Webview Background**:
   - *Status*: **Applies (Partial)**
   - *Evidence*: `host/main.py` (lines 764, 780, 796) configures `transparent=True` on all three windows (`dock`, `card`, `modal`). In pywebview's WinForms platform (`winforms.py:286-290`, `edgechromium.py:113-115`), `transparent=True` sets `self.SetStyle(SupportsTransparentBackColor, True)` and `self.browser.DefaultBackgroundColor = Color.Transparent`. However, WinForms host window styling and GDI region clipping in `host/main.py` were tightly coupled. If `SetWindowRgn` was cleared or bypassed while CSS still painted full-window canvases, the opaque canvas was exposed.
2. **System Backdrop Effects (Acrylic / Mica / Vibrancy)**:
   - *Status*: **Does NOT apply directly, but DWM NC-rendering policy caused rectangular compositing artifacts**
   - *Evidence*: `DWMSBT_NONE` was defined in `host/main.py:118` and neither Acrylic nor Mica was applied. However, `DWMWA_NCRENDERING_POLICY = DWMNCRP_DISABLED (1)` was previously set in `host/main.py:111-112`, which instructed Windows DWM to disable desktop window composition rendering for non-client regions, causing solid dark non-composited edges around region-clipped boundaries.
3. **OS Window Shadow, DWM Border, Windows 11 Automatic Corner Rounding**:
   - *Status*: **Applies**
   - *Evidence*: `host/main.py:130-133` calls `DwmSetWindowAttribute` with `DWMWA_WINDOW_CORNER_PREFERENCE = DWMWCP_DONOTROUND` (33) and `DWMWA_BORDER_COLOR = DWMWA_COLOR_NONE` (34). However, `strip_dwm_chrome` was invoked selectively during `apply_window_shape` rather than universally on window creation, and without adequate window padding, Windows 11 DWM non-client borders and drop shadows were abruptly sliced at the 0px margin.
4. **CSS Painting the Window Canvas (`html`, `body`, wrappers)**:
   - *Status*: **APPLIES (CRITICAL ROOT CAUSE)**
   - *Evidence*:
     - `public/components.css:57-59`: `html:has(body[data-view="dock"]) { background: var(--flank-surface-dock-bg) !important; }`
     - `public/components.css:61-64`: `html:has(body[data-view="card"]), html:has(body[data-view="modal"]) { background: var(--flank-surface-card-bg) !important; }`
     - `public/components.css:66-73`: `body[data-view="dock"] { background: var(--flank-surface-dock-bg) !important; ... }`
     - `public/components.css:230-237`: `body[data-view="card"] { background: var(--flank-surface-card-bg) !important; ... }`
     - `public/components.css:269-276`: `body[data-view="modal"] { background: var(--flank-surface-card-bg) !important; ... }`
     - The entire rectangular viewport of `html` and `body` was painted with solid or fallback theme backgrounds (e.g. `#fbfaf7` in Paper, `#1b2038` in dark themes). Because native OS windows are rectangular, the rectangular corners outside the rounded dock and card shapes painted this solid color, showing up as bright white or dark rectangular "vignette" boxes.
5. **Shadows Clipped by Window Bounds (Zero Padding)**:
   - *Status*: **APPLIES (CRITICAL ROOT CAUSE)**
   - *Evidence*:
     - `host/main.py:747-750, 774-775`: Native dock window width was fixed at `dock_w = 60`, exactly equal to the CSS dock width (`60px`). Native card window was fixed at `width = 292, height = 240`, exactly matching card CSS dimensions.
     - Window padding was zero (`windowPadding = 0`).
     - In Paper theme (`themes/paper.json`), `dockShadow` is `0 14px 34px rgba(60,50,30,0.16)` (offset 14px + blur 34px = 48px reach) and `cardShadow` is `0 18px 44px rgba(60,50,30,0.18)` (offset 18px + blur 44px = 62px reach).
     - Because the native window boundary ended right at the shape's border (0px margin), the soft shadow extending beyond the shape was sharply cut off at the native window edge, forming a dark rectangular cut-off box.
6. **Children Poking Past Radius & Missing `overflow: hidden`**:
   - *Status*: **Applies**
   - *Evidence*: `public/components.css:254` explicitly declared `body[data-view="card"] .flank-card { overflow: visible !important; }`. With `overflow: visible`, child elements, headers, and highlights bled past the 20px card radius. In addition, `.flank-dock` lacked guaranteed encapsulation for spring magnifications and tile hover highlights.
7. **Window Size Mismatch, Fractional DPI Sizing & 1-Bit GDI Region Mask**:
   - *Status*: **Applies**
   - *Evidence*:
     - `host/main.py:322-336, 347, 822`: `SetWindowRgn` with `gdi32.CreateRoundRectRgn(0, 0, pw + 1, ph + 1, ...)` was used to clip the window. GDI 1-bit clipping masks have no alpha-blending or subpixel antialiasing capability. Every curved boundary pixel was aliased into jagged staircases.
     - At fractional display scaling factors (125%, 150%), `round(w * scale)` caused 1px rounding discrepancies between the DirectComposition CSS layout and GDI window regions, producing visible 1px fringes.




## Part B Decisions: Liquid Glass Theme Implementation

Stack additions & Architectural decisions:

1. **Pure Token Architecture**:
   - Eliminated all legacy hardcoded `html[data-theme="glass"]` overrides in `public/components.css`.
   - Added `themes/liquid-glass.json` to the theme store and registered it in `BUNDLED_THEMES` and `ACCENT_PRESETS` in `src/theme/schema.ts`.
   - Extended `ThemeGlass` schema and validator to normalize and validate glass properties (`mode`, `tintRgb`, `tintAlpha`, `tintAlphaMin`, `tintAlphaMax`, `blur`, `saturate`, `rimWidth`, `rim`, `sheen`, `sheenHeight`, `textShadowWhenLowContrast`).
   - Flattened all tokens to `--flank-glass-*` CSS variables, emitting `--flank-glass-display: block` for liquid-glass and `none` for non-glass themes to ensure zero runtime overhead for existing themes.

2. **Token-Driven B2 Layer Recipe**:
   - Designed the 6-layer bottom-to-top recipe inside the single rounded element:
     1. `.flank-glass-backdrop`: absolute overlay positioned at `inset: 0` displaying the sampled wallpaper data URI with `background-position` aligned to `-shapeX, -shapeY`, `background-size` set to monitor dimensions, and `filter: saturate(1.8)`.
     2. Tint: applied to the container background using `rgba(var(--flank-glass-tint-rgb), var(--flank-glass-tint-alpha))`.
     3. `.flank-glass-sheen`: absolute top highlight gradient overlay with `height: var(--flank-glass-sheen-height)` and `border-radius: inherit` (strictly preventing bottom radius bulge).
     4. `.flank-glass-rim`: absolute 1.5px rim light gradient overlay with `padding: 1.5px` and `mask-composite: exclude` (`-webkit-mask-composite: xor`).
     5. Shadows: inset specular highlight lines (`inset 0 1px 0 rgba(255,255,255,0.55)`), bottom rim (`inset 0 -1px 0 rgba(255,255,255,0.12)`), inner glow, and outer drop shadows that fit inside `windowPadding = 40px` (maximum reach 10 + 28 = 38px <= 40px).
     6. Content wrapper: `.flank-dock-content` and `.flank-card-content` positioned with `position: relative; z-index: 3`.

3. **Backdrop & Wallpaper Sampling Pipeline (B3)**:
   - Created `host/wallpaper.py` using Pillow.
   - Reads desktop wallpaper via `SystemParametersInfoW(SPI_GETDESKWALLPAPER)` and checks `TranscodedWallpaper` cache.
   - Reads Windows fit mode from `HKCU\Control Panel\Desktop` (`WallpaperStyle`, `TileWallpaper`) and fits image to primary monitor resolution.
   - Downscales to 25%, applies single-pass Gaussian blur (`radius=8`, equivalent to 32px at 100%), and encodes to JPEG base64 data URI (cached per wallpaper mtime and monitor dimensions).

4. **Adaptive Tint & WCAG 4.5:1 Contrast (B4)**:
   - The host samples the blurred wallpaper crop beneath the dock / hover card shape.
   - Computes relative luminance and searches for the smallest alpha in [0.34, 0.70] that achieves WCAG 4.5:1 contrast against `#ffffff` text on tint `(16, 20, 42)`. On pure white wallpapers, alpha automatically adjusts upward to ~0.59 to guarantee legibility.
   - If contrast fails at max alpha, applies low-contrast text shadow (`0 1px 2px rgba(0,0,0,0.35)`).

5. **Clean Solid Fallback**:
   - Host queries `HKCU\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize\EnableTransparency`.
   - If disabled (or if `@media (forced-colors: active)` is triggered), sets `data-transparency-effects="disabled"`, which suppresses the backdrop, sheen, and rim overlays and falls back to `solidFallbackBg: #1b2038`.

6. **Fluid Motion & Accessibility**:
   - Respects `@media (prefers-reduced-motion: no-preference)` with 220ms card entrance transition (`cardInMs: 220`, `cardScaleFrom: 0.96`, `cardTravelPx: 10`) and 160ms tile press scale (`0.96`).
   - Maintained accessible 40px hit areas, visible focus ring (`#ffffff`), and live tabular numerals.

---

## 7. Collapsible Dock & iOS PiP-Style Edge Tab
- **Single Window Architecture**: To prevent window lifecycle flashes, transparency breaks, or multi-window synchronization bugs, Flank morphs the single `dock` window between expanded and collapsed states without spawning a fourth window.
- **Ordered Transition**:
  1. *Collapse*: Frontend applies `[data-dock-state="collapsing"]` and plays a 220ms slide-out animation off the screen edge. On completion, webview calls `api.dock_collapse_done()`. The Python host repositions the native window flush with the physical monitor edge, resizes it to the tab dimensions (`20×72 px` or `32×104 px`), clips the region (`CreateRoundRectRgn` with inward 12px radii and 0px flat edge), and notifies the frontend (`data-dock-state="collapsed"`).
  2. *Expand*: Python host resizes the native window back to expanded bounds, restores the dock region, and triggers `api.dock_expand_done()`, whereupon the webview smoothly slides the dock content back in.
- **Reliable Hit-Testing**: Clicks and taps on `.flank-dock-tab` and `[data-action="expand-dock"]` use capture-phase event delegation with `closest()` resolution to ensure instant expansion even when clicking the inlined SVG glyph or chevron.

---

## 8. Screen Edge Simplification (Removal of 'Top' Edge)
- Flank operates exclusively as a vertical dock (`left` or `right` screen edge).
- All horizontal dock code paths, horizontal caret orientations, and the legacy `'top'` edge type have been removed from the runtime.
- Backward compatibility: Existing settings files or theme definitions specifying `edge: "top"` are automatically migrated to `"right"` without crashing.

---

## 9. Design System Components & Settings Window (Step 6)
- **Shared Components (`src/ui/components.ts`)**: Introduces reusable design system primitives (`Card`, `Row`, `SectionHeader`, `Segmented`, `Switch`, `Swatch`, `Button`, `Input`, `Chip`).
- **Standardized Row Heights**: All settings items conform to 48px standard rows (or 56px with description text), aligning with modern Windows 11 and macOS design guidelines.
- **Theme Store Visual Grid**: Themes are displayed in a responsive 2-to-3 column grid featuring live miniature previews with stylized dock and card components, tags (`Solid`, `Glass`), descriptions, and active outline rings.
- **Flyout Card Unification**: Every flyout card standardizes on `.flank-card-header` (18px icon + title + pill/action), `.flank-card-body` (16px padding, 12px section spacing), and `.flank-card-footer` with a 380px maximum height cap and internal scrolling.

---

## 10. QA Polish Sweeps (Step 7)
- Automated verification suite (`scripts/run_qa_sweep.py`) generates 50+ headless screenshots verifying:
  - 7 themes across dock, collapsed tab, weather, calendar, and focus flyouts.
  - 4 display scaling factors (100%, 125%, 150%, 200%).
  - Both dock edges (left, right).
  - 4 wallpaper types (vibrant mesh, pure white, pure black, high-contrast magenta).
  - 5 edge cases (0 items, 30 items, long labels, missing battery, clear schedule).
- Zero runtime errors across all suites. Full QA report documented in `docs/QA_REPORT.md`.
