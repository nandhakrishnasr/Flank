<p align="center">
  <img src="assets/brand/png/flank-lockup-1600.png" alt="Flank" width="340" />
</p>

# Flank — A Second Dock for Windows 11

**Flank** is a slim, non-activating vertical dock and widget flyout app for Windows 11 inspired by macOS dock mechanics and iOS Picture-in-Picture edge tabs. Built with an editorial warm-paper default aesthetic (**Paper**) and 7 built-in theme personalities.

---

## Architecture

- **Host:** `host/main.py`, Python 3.14 + pywebview (`gui="edgechromium"`), WinForms + Edge WebView2, Win32 via ctypes (`user32`, `gdi32`, `dwmapi`, `shell32`, `kernel32`), system tray icon, global hotkeys (`RegisterHotKey`), high-res favicon fetcher, and executable icon extractor. Also `host/clipboard_service.py`, `host/wallpaper.py`, `host/providers.py`.
- **Three windows, one HTML entry** (`public/index.html`, routed by `body[data-view]`):
  - `#dock` (`view=dock`): Vertical dock and collapsible edge tab (the same window resized via `SetWindowPos` and native region clipping).
  - `#card` (`view=card`): Widget flyout hover card with caret pointing to the active dock tile.
  - `#modal` (`view=modal`): Standalone focusable Settings & Theme Store dialog (`960x680`).
- **Frontend:** Vanilla TypeScript bundled by esbuild into `public/bundle.js`. Strict `--flank-<group>-<token>` CSS custom properties. Zero hardcoded colors or pixel values in components.
- **7 Bundled Themes:** Paper (default), Glass, Liquid Glass, Terminal, Rail, Nord, Aurora.

---

## Core Features & Widgets

1. **Collapsible Dock to Edge Tab (`Ctrl+Alt+F`)**:
   - iOS Picture-in-Picture style tab (`20×72 px`, inward `12px` radii, flush with screen edge, or `32×104 px` with capsule logo glyph).
   - Slides toward the screen edge in 220 ms and morphs into a discreet edge tab with an inward chevron (`<` on right, `>` on left). Clicking expands the full dock.
   - Configurable auto-collapse on idle (3–60s) and full-screen app detection (`SHQueryUserNotificationState`).
2. **Clipboard History (`Ctrl+Alt+V`)**:
   - Dock tile with live item counter badge and full `960x680` Clipboard History window.
   - Instant search, category chips (`All`, `Pinned`, `Links`, `Images`, `Files`, `Code`), detail preview pane, and keyboard navigation.
   - Respects Windows privacy flags (`ExcludeClipboardContentFromMonitorProcessing`, `CanIncludeInClipboardHistory=0`).
3. **Weather**:
   - Live Open-Meteo geocoding and forecast with condition icon, temperature badge, high/low summary, and 5-hour strip.
4. **Agenda & Meetings**:
   - Upcoming schedule with meeting countdown, join buttons for Zoom/Teams/Meet, and friendly empty state.
5. **Focus Timer**:
   - Deep focus / short break timer with tabular numerals, session presets (15m, 25m, 45m, 60m), and daily stats.
6. **System Stats (`Alt+S`)**:
   - Real-time Win32 telemetry (CPU, RAM, GPU, Disk, Network) with live sparklines (or ASCII bars in Terminal theme).
7. **Battery & Wireless Peripherals**:
   - Displays laptop/UPS battery percentage, charging state, power mode, and wireless peripheral levels (Mouse, Keyboard).
8. **World Clock**:
   - Track local times across multiple custom IANA timezones.
9. **Pinned Apps & Links + Global Shortcuts**:
   - Custom app & website shortcuts with automatic high-res favicon retrieval, executable icon extraction, and letter-badge fallbacks.
   - Global hotkey assignment directly from Settings.

---

## 7 Bundled Themes

| Theme | Personality | Key Characteristics |
|---|---|---|
| **Paper** *(Default)* | Warm Stone & Ink | `#FBFAF7` surface, terracotta accent (`#C85428`), Fraunces serif headings |
| **Glass** | Translucent Acrylic | Dark translucent acrylic (`rgba(22, 23, 28, 0.72)`), electric indigo (`#7C9BFF`) |
| **Liquid Glass** | Specular Apple Glass | Multi-layer sheen, 1.5px rim light, dynamic wallpaper sampling with adaptive alpha |
| **Terminal** | Monospace Strip | Monospace `#0B0D0C` background, phosphor green (`#33FF88`), ASCII gauges |
| **Rail** | Ultra-Thin Spine | `38px` minimalist icon spine (`#121110`), amber gold (`#F59E0B`) |
| **Nord** | Arctic Slate | Cool slate `#2E3440`, frost blue (`#88C0D0`), snow storm accents |
| **Aurora** | Vibrant Night Sky | Deep night `#160A2E`, vibrant neon violet-to-pink glow |

---

## Installation & Release

Download the latest `Flank-Setup.exe` from [Releases](https://github.com/flank-dock/flank/releases).

> **Note on Windows SmartScreen**:
> Because Flank is an independent open-source utility without an expensive enterprise certificate, Windows Defender SmartScreen may display:
> *"Windows protected your PC — Unknown publisher"*.
> Click **"More info"** and then **"Run anyway"** to install. Flank is 100% open source, operates completely locally on your machine, and sends zero personal telemetry.

---

## Development & Build Commands

- **Unit tests**: `npm test` (Runs theme schema validator, contrast calculations, token flattener tests).
- **Bundle UI**: `npm run build:ui` (Bundles `src/main.ts` into `public/bundle.js`).
- **Run from Source**: `python host/main.py`.
- **Smoke test**: `python host/main.py --smoke-test`.
- **QA Sweeps**: `python scripts/run_qa_sweep.py`.
- **Build Standalone App & Installer**: `python scripts/build_executable.py` (Outputs `dist/Flank/Flank.exe` and `dist/Flank-Setup.exe`).
