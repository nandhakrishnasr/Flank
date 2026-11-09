<p align="center">
  <img src="assets/brand/png/flank-lockup-1600.png" alt="Flank" width="340" />
</p>

<p align="center">
  <strong>The second dock Windows never shipped.</strong><br/>
  Apps, shortcuts, clipboard history, and live interactive widgets on the edge of your Windows 11 screen.
</p>

---

## Flank in Action

<p align="center">
  <a href="docs/screens/showcase/flank-promo.mp4" title="Watch Full 1080p60 Launch Film with Audio (MP4)">
    <img src="docs/screens/showcase/flank-promo.gif" alt="Flank — 35s Launch Film" width="840" />
  </a>
  <br/>
  <sub>🎬 <a href="docs/screens/showcase/flank-promo.mp4"><strong>Watch the full 1080p60 launch film with audio (MP4)</strong></a></sub>
</p>

### Desktop Overview & Themes

| Aurora / Liquid Glass Desktop | Settings & Live Weather Flyout |
| :---: | :---: |
| <img src="docs/screens/showcase/flank_desktop_aurora_weather.jpg" alt="Flank on Windows 11 Desktop" width="460" /> | <img src="docs/screens/showcase/flank_settings_glass.jpg" alt="Flank Settings and Glass Theme" width="460" /> |

| Media Player Flyout | Agenda & One-Click Meeting Join | Focus Timer Flyout |
| :---: | :---: | :---: |
| <img src="docs/screens/showcase/flank_widget_media_player.jpg" alt="Media Player Flyout" width="300" /> | <img src="docs/screens/showcase/flank_widget_agenda.jpg" alt="Agenda Flyout" width="300" /> | <img src="docs/screens/showcase/flank_widget_focus_timer.jpg" alt="Focus Timer Flyout" width="220" /> |

---

### Dock & Edge Collapse (`Ctrl+Alt+F`)

Flank sits cleanly on the left or right monitor edge and tucks away into an iOS Picture-in-Picture style edge tab (`32×104 px` with capsule glyph or `20×72 px` minimal tab) in one click—or automatically when a full-screen game or presentation starts.

| Expanded Dock (Paper) | Expanded Dock (Liquid Glass) | Collapsed Edge Tab (Paper) | Collapsed Edge Tab (Liquid Glass) |
| :---: | :---: | :---: | :---: |
| <img src="docs/screens/brand/brand_dock_face_paper.png" alt="Expanded Dock Paper" height="320" /> | <img src="docs/screens/brand/brand_dock_face_liquid_glass.png" alt="Expanded Dock Liquid Glass" height="320" /> | <img src="docs/screens/brand/brand_collapsed_tab_paper.png" alt="Collapsed Tab Paper" height="180" /> | <img src="docs/screens/brand/brand_collapsed_tab_liquid_glass.png" alt="Collapsed Tab Liquid Glass" height="180" /> |

---

### Live Widget Flyout Cards

Hovering any widget tile on the dock slides out its interactive flyout card without stealing window focus (`SWP_NOACTIVATE`) from your active game, editor, or browser.

| Weather Forecast | Audio & Mic Mixer | Focus Timer | Agenda & Calendar |
| :---: | :---: | :---: | :---: |
| <img src="docs/screens/flyout_weather.png" alt="Weather Flyout" width="210" /> | <img src="docs/screens/flyout_audio.png" alt="Audio Flyout" width="210" /> | <img src="docs/screens/flyout_focus.png" alt="Focus Flyout" width="210" /> | <img src="docs/screens/flyout_calendar.png" alt="Agenda Flyout" width="210" /> |

| Media Player | System Telemetry | Battery & Devices | World Clock |
| :---: | :---: | :---: | :---: |
| <img src="docs/screens/flyout_player.png" alt="Player Flyout" width="210" /> | <img src="docs/screens/flyout_stats.png" alt="System Stats Flyout" width="210" /> | <img src="docs/screens/flyout_battery.png" alt="Battery Flyout" width="210" /> | <img src="docs/screens/flyout_clock.png" alt="World Clock Flyout" width="210" /> |

| Quick Clipboard | Scratchpad Notes | Screen Color Picker | Network Monitor |
| :---: | :---: | :---: | :---: |
| <img src="docs/screens/flyout_clipboard.png" alt="Clipboard Flyout" width="210" /> | <img src="docs/screens/flyout_scratchpad.png" alt="Scratchpad Flyout" width="210" /> | <img src="docs/screens/flyout_colorpicker.png" alt="Color Picker Flyout" width="210" /> | <img src="docs/screens/flyout_network.png" alt="Network Flyout" width="210" /> |

---

### Clipboard History, Settings & Theme Store

| Appearance & 7 Themes | Dock Items & Global Hotkeys |
| :---: | :---: |
| <img src="docs/screens/settings_appearance.png" alt="Settings Appearance" width="440" /> | <img src="docs/screens/settings_items.png" alt="Settings Items and Shortcuts" width="440" /> |

| Clipboard History (`Ctrl+Alt+V`) | Widgets Configuration |
| :---: | :---: |
| <img src="docs/screens/modal_clipboard.png" alt="Clipboard History Modal" width="440" /> | <img src="docs/screens/settings_widgets.png" alt="Settings Widgets" width="440" /> |

| About Flank (Paper Theme) | About Flank (Liquid Glass Theme) |
| :---: | :---: |
| <img src="docs/screens/brand/brand_about_paper.png" alt="About Flank Paper" width="440" /> | <img src="docs/screens/brand/brand_about_liquid_glass.png" alt="About Flank Liquid Glass" width="440" /> |

<p align="center">
  <img src="docs/screens/showcase/flank_settings_accent_slider.png" alt="Custom Accent Override and Hue Slider" width="680" />
</p>

---

## Architecture

- **Host:** `host/main.py`, Python 3.14 + pywebview (`gui="edgechromium"`), WinForms + Edge WebView2, Win32 via ctypes (`user32`, `gdi32`, `dwmapi`, `shell32`, `kernel32`), system tray icon (`ITaskbarList` taskbar suppression), global hotkeys (`RegisterHotKey`), high-res favicon fetcher, and executable icon extractor. Also `host/clipboard_service.py`, `host/wallpaper.py`, `host/providers.py`.
- **Three windows, one HTML entry** (`public/index.html`, routed by `body[data-view]`):
  - `#dock` (`view=dock`): Vertical dock and collapsible edge tab (the same window resized via `SetWindowPos` and native region clipping).
  - `#card` (`view=card`): Widget flyout hover card with caret pointing to the active dock tile.
  - `#modal` (`view=modal`): Standalone focusable Settings & Theme Store dialog (`960×680`).
- **Frontend:** Vanilla TypeScript bundled by esbuild into `public/bundle.js`. Strict `--flank-<group>-<token>` CSS custom properties.
- **7 Bundled Themes:** Paper (default), Glass, Liquid Glass, Terminal, Rail, Nord, Aurora.

---

## Core Features & Widgets

1. **Collapsible Dock to Edge Tab (`Ctrl+Alt+F`)**:
   - iOS Picture-in-Picture style tab (`20×72 px`, inward `12px` radii, flush with screen edge, or `32×104 px` with capsule logo glyph).
   - Slides toward the screen edge in 220 ms and morphs into a discreet edge tab with an inward chevron (`<` on right, `>` on left). Clicking expands the full dock.
   - Configurable auto-collapse on idle (3–60s) and full-screen app detection (`SHQueryUserNotificationState`).
2. **Clipboard History (`Ctrl+Alt+V`)**:
   - Dock tile with live item counter badge and full `960×680` Clipboard History window.
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

Download the latest `Flank-Setup.exe` from [Releases](https://github.com/nandhakrishnasr/Flank/releases).

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
