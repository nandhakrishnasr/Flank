<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/brand/png/flank-lockup-white-text-1600.png" />
    <source media="(prefers-color-scheme: light)" srcset="assets/brand/png/flank-lockup-1600.png" />
    <img src="assets/brand/png/flank-lockup-1600.png" alt="Flank" width="320" />
  </picture>

  <h3>The second dock Windows never shipped.</h3>
  <p>
    Pinned apps, global shortcuts, clipboard history, and <strong>22 live interactive widgets</strong> anchored cleanly to the edge of your Windows 11 screen.
  </p>

  <p>
    <a href="https://github.com/nandhakrishnasr/Flank/releases"><strong>Download Flank-Setup.exe</strong></a>
    &nbsp;·&nbsp;
    <a href="#live-widget-flyout-cards">Widgets</a>
    &nbsp;·&nbsp;
    <a href="#7-bundled-themes">Themes</a>
    &nbsp;·&nbsp;
    <a href="#keyboard-shortcuts">Shortcuts</a>
    &nbsp;·&nbsp;
    <a href="#create-your-own-widget">Build a Widget</a>
    &nbsp;·&nbsp;
    <a href="docs/wiki/Home.md">Wiki</a>
    &nbsp;·&nbsp;
    <a href="#development">Development</a>
  </p>
</div>

---

## Flank in Action

<div align="center">
  <a href="docs/screens/showcase/flank-promo.mp4" title="Watch Full 1080p60 Launch Film with Audio (MP4)">
    <img src="docs/screens/showcase/flank-promo.gif" alt="Flank — 35s Launch Film" width="840" />
  </a>
  <br />
  <sub><a href="docs/screens/showcase/flank-promo.mp4"><strong>Watch the full 1080p60 launch film with audio (MP4)</strong></a></sub>
</div>

<br />

- **Never steals focus** — Flyout cards open on hover using `SWP_NOACTIVATE`, so active games, editors, and browsers stay uninterrupted.
- **Tucks away cleanly** — Collapses into a flush Picture-in-Picture screen-edge tab in one click (`Ctrl+Alt+F`) or automatically when full-screen apps run.
- **100% local & zero telemetry** — Clipboard history, notes, settings, and Win32 telemetry stay on your PC; GitHub tokens are encrypted locally via Windows **DPAPI**.

---

## Installation

Download the latest `Flank-Setup.exe` from [GitHub Releases](https://github.com/nandhakrishnasr/Flank/releases) and launch the installer.

> [!NOTE]
> **Windows SmartScreen**: Because Flank is an open-source utility without an enterprise code-signing certificate, Windows Defender SmartScreen may display *"Windows protected your PC — Unknown publisher"*. Select **More info → Run anyway** to proceed. Flank runs completely locally and collects zero telemetry.

---

## What's New

- **Expanded 22-Widget Dock Suite** — Includes **Calc** (safe recursive-descent expression parser & history), **Focus Ambiance** (multi-layer Web Audio **Café**, Rain, Fire, Forest & Noise soundscapes), **Tasks To-Do**, **Command Runner** (with inline terminate), **GitHub**, **GPU Telemetry**, **Storage Drives**, **Bluetooth**, **Network**, **Display & Brightness**, and **Privacy Controls**.
- **UI & Telemetry Fixes** — Fixed **World Clock** header layout spacing, resolved `NaN MB` memory formatting in **Top 30 Processes**, renamed the calculator tile label to **Calc**, and streamlined **Display & Brightness** (removed Habits/Hydration widgets and refresh-rate switching).
- **Local Security Hardening** — Encrypted GitHub personal access tokens with Windows **DPAPI** (`CryptProtectData` / `CryptUnprotectData`), scrubbed plaintext secrets from config storage, and honored Windows clipboard privacy flags.

---

## Desktop & Collapsible Dock

| Aurora / Liquid Glass Desktop | Settings & Live Weather Flyout |
| :---: | :---: |
| <img src="docs/screens/showcase/flank_desktop_aurora_weather.jpg" alt="Flank on Windows 11 Desktop" width="460" /> | <img src="docs/screens/showcase/flank_settings_glass.jpg" alt="Flank Settings and Glass Theme" width="460" /> |

| Expanded Dock (Paper) | Expanded Dock (Liquid Glass) | Collapsed Tab (Paper) | Collapsed Tab (Liquid Glass) |
| :---: | :---: | :---: | :---: |
| <img src="docs/screens/brand/brand_dock_face_paper.png" alt="Expanded Dock Paper" height="300" /> | <img src="docs/screens/brand/brand_dock_face_liquid_glass.png" alt="Expanded Dock Liquid Glass" height="300" /> | <img src="docs/screens/brand/brand_collapsed_tab_paper.png" alt="Collapsed Tab Paper" height="170" /> | <img src="docs/screens/brand/brand_collapsed_tab_liquid_glass.png" alt="Collapsed Tab Liquid Glass" height="170" /> |

---

## Live Widget Flyout Cards

Hovering any tile opens its live interactive card beside the dock—or open the **Widgets** drawer for quick access to all 22 modules.

| Weather Forecast | Audio & Mic Mixer | Focus Timer | Calc |
| :---: | :---: | :---: | :---: |
| <img src="docs/screens/flyout_weather.png" alt="Weather Flyout" width="210" /> | <img src="docs/screens/flyout_audio.png" alt="Audio Flyout" width="210" /> | <img src="docs/screens/flyout_focus.png" alt="Focus Flyout" width="210" /> | <img src="docs/screens/flyout_calculator.png" alt="Calc Flyout" width="210" /> |

| Tasks To-Do | System Telemetry | Focus Ambiance | GitHub Activity |
| :---: | :---: | :---: | :---: |
| <img src="docs/screens/flyout_tasks.png" alt="Tasks To-Do Flyout" width="210" /> | <img src="docs/screens/flyout_stats.png" alt="System Stats Flyout" width="210" /> | <img src="docs/screens/flyout_ambient.png" alt="Focus Ambiance Flyout" width="210" /> | <img src="docs/screens/flyout_github.png" alt="GitHub Activity Flyout" width="210" /> |

<details>
<summary><strong>Browse all remaining widget flyouts &amp; Active Widgets drawer (15 cards)</strong></summary>
<br />

| Agenda & Calendar | Media Player | Battery & Devices | World Clock |
| :---: | :---: | :---: | :---: |
| <img src="docs/screens/flyout_calendar.png" alt="Agenda Flyout" width="210" /> | <img src="docs/screens/flyout_player.png" alt="Player Flyout" width="210" /> | <img src="docs/screens/flyout_battery.png" alt="Battery Flyout" width="210" /> | <img src="docs/screens/flyout_clock.png" alt="World Clock Flyout" width="210" /> |

| Quick Clipboard | Scratchpad Notes | Screen Color Picker | Network Monitor |
| :---: | :---: | :---: | :---: |
| <img src="docs/screens/flyout_clipboard.png" alt="Clipboard Flyout" width="210" /> | <img src="docs/screens/flyout_scratchpad.png" alt="Scratchpad Flyout" width="210" /> | <img src="docs/screens/flyout_colorpicker.png" alt="Color Picker Flyout" width="210" /> | <img src="docs/screens/flyout_network.png" alt="Network Flyout" width="210" /> |

| Bluetooth Devices | Storage Drives | Display & Brightness | Privacy Controls |
| :---: | :---: | :---: | :---: |
| <img src="docs/screens/flyout_bluetooth.png" alt="Bluetooth Flyout" width="210" /> | <img src="docs/screens/flyout_storage.png" alt="Storage Flyout" width="210" /> | <img src="docs/screens/flyout_display.png" alt="Display & Brightness Flyout" width="210" /> | <img src="docs/screens/flyout_privacy.png" alt="Privacy Flyout" width="210" /> |

| Command Runner | GPU Telemetry | Active Widgets Drawer |
| :---: | :---: | :---: |
| <img src="docs/screens/flyout_runner.png" alt="Command Runner Flyout" width="210" /> | <img src="docs/screens/flyout_gpu.png" alt="GPU Telemetry Flyout" width="210" /> | <img src="docs/screens/flyout_widgets.png" alt="Active Widgets Drawer" width="210" /> |

</details>

### Feature Breakdown

| Area | Capabilities |
| :--- | :--- |
| **Productivity & Focus** | **Clipboard** (`Ctrl+Alt+V`, search, pins & Windows privacy flags), **Calc** (live math, unit conversions & history), **Tasks To-Do**, **Focus Timer** (`15m` / `25m` / `45m` / `Break 5m`), **Focus Ambiance** (synthesized Café, Rain, Fire, Forest & Noise), **Agenda & Meetings** (one-click Zoom/Teams/Meet join), **World Clock**, **Scratchpad Notes**, **Color Picker** |
| **Media & Developer** | **Media Player** (album art & YouTube thumbnails), **Command Runner** (quick presets & inline process termination), **GitHub** (PRs & notifications with DPAPI token storage) |
| **System & Hardware** | **System Stats** (`Alt+S`) & **GPU** (CPU, RAM, Top 30 Processes & GPU load), **Display & Brightness** (slider, presets & Night Light), **Audio & Mic Mixer**, **Battery & Devices**, **Storage**, **Network**, **Bluetooth**, **Weather**, **Privacy Controls** |
| **Launchers & Edge Tab** | Custom apps & URLs with auto favicon/EXE icon extraction; collapses to `32×104 px` branded tab or `20×72 px` minimal tab on left or right edge |

---

## Settings, Clipboard & Themes

| Appearance & 7 Themes | Dock Items & Global Hotkeys |
| :---: | :---: |
| <img src="docs/screens/settings_appearance.png" alt="Settings Appearance" width="440" /> | <img src="docs/screens/settings_items.png" alt="Settings Items and Shortcuts" width="440" /> |

| Clipboard History (`Ctrl+Alt+V`) | Widgets Configuration |
| :---: | :---: |
| <img src="docs/screens/modal_clipboard.png" alt="Clipboard History Modal" width="440" /> | <img src="docs/screens/settings_widgets.png" alt="Settings Widgets" width="440" /> |

<details>
<summary><strong>More Settings &amp; Accent Override previews</strong></summary>
<br />

| About Flank (Paper Theme) | About Flank (Liquid Glass Theme) |
| :---: | :---: |
| <img src="docs/screens/brand/brand_about_paper.png" alt="About Flank Paper" width="440" /> | <img src="docs/screens/brand/brand_about_liquid_glass.png" alt="About Flank Liquid Glass" width="440" /> |

<div align="center">
  <img src="docs/screens/showcase/flank_settings_accent_slider.png" alt="Custom Accent Override and Hue Slider" width="680" />
</div>

</details>

---

## 7 Bundled Themes

| Theme | Style | Highlights |
| :--- | :--- | :--- |
| **Paper** *(Default)* | Warm Stone & Ink | `#fbfaf7` surface, cobalt accent (`#2F4BFF`), Fraunces display numerals |
| **Glass** | Translucent Acrylic | Dark translucent acrylic (`rgba(22, 23, 28, 0.72)`), crisp cool accent |
| **Liquid Glass** | Specular Frosted Glass | Multi-layer sheen, rim highlight, adaptive wallpaper backdrop sampling |
| **Aurora** | Vibrant Night Sky | Deep night surface with luminous aurora gradients |
| **Nord** | Arctic Slate | Cool slate palette with frost blue accents |
| **Terminal** | Monospace Strip | Monospace dark background, phosphor green text, ASCII progress bars |
| **Rail** | Ultra-Thin Spine | Minimal `38px` icon spine with high-contrast gold accent |

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl+Alt+F` | Toggle dock expand / edge-tab collapse |
| `Ctrl+Alt+V` | Open Clipboard History explorer (`960×680`) |
| `Alt+1` – `Alt+4` | Launch pinned dock apps (`Terminal`, `Browser`, `Files`, `Notes`) |
| `Alt+C` / `Alt+W` / `Alt+S` | Open **World Clock** / **Weather** / **System Stats** |
| Custom hotkeys | Assign or rebind any dock item inside **Settings → Items** |

---

## Architecture

- **Native Windows Host** — `host/main.py` (Python 3.14 + `pywebview` Edge WebView2 + WinForms), Win32 `ctypes` (`user32`, `gdi32`, `dwmapi`, `shell32`, `kernel32`), tray integration (`ITaskbarList` taskbar suppression), global hotkeys (`RegisterHotKey`), high-res favicon fetching, and EXE icon extraction. Supporting services live in `host/clipboard_service.py`, `host/wallpaper.py`, and `host/providers.py`.
- **Single-Entry Three-Window UI** — `public/index.html` routed by `body[data-view]`:
  - `#dock` (`view=dock`): Vertical dock and collapsible edge tab resized cleanly via `SetWindowPos`.
  - `#card` (`view=card`): Hover flyout card aligned to the active dock tile.
  - `#modal` (`view=modal`): Focusable Settings, Clipboard History, World Clock, and System Telemetry dialogs (`960×680`).
- **Frontend & Design Tokens** — Vanilla TypeScript bundled via `esbuild` into `public/bundle.js`, styled strictly with `--flank-<group>-<token>` custom properties (`themes/` + `public/components.css`).

---

## Create Your Own Widget

Flank widgets follow a clean, modular pattern across the TypeScript UI and Python Windows host. You can build a new widget manually using the checklist below—or paste the prompt directly into any AI coding agent (**Claude Code**, **Cursor**, **Antigravity**, **Codex**, **GitHub Copilot**, etc.).

### Step-by-Step Checklist

1. **Define types & sample state**
   - Add your widget key to `WidgetKind` and add its optional state payload to `FlankState` in `src/providers/types.ts`.
   - Provide offline preview data and a default `DockItem` (`kind: 'widget'`, `widgetKind: '<id>'`) in `createSampleState()` in `src/providers/sample.ts`.
2. **Add an icon, dock tile & flyout card**
   - Add a `24×24` stroke icon (or reuse an existing one) in `src/ui/icons.ts` (`iconSvg`).
   - Add the dock tile compact badge/text and accessible ARIA label in `renderWidgetTileInner` inside `src/ui/dock.ts`.
   - Implement `render<Name>CardInner(state)` and wire it into `renderCardBody` in `src/ui/cards.ts`. Use Flank's shared components (`.flank-card__hdr`, `.flank-pill`, `.flank-chip`, `.flank-btn`) and `--flank-*` CSS variables (`public/components.css`) so all 7 themes work automatically.
3. **Wire interactivity & optional host data**
   - Handle card button clicks/inputs via `data-action="..."` in `src/main.ts` and declare any new `window.pywebview?.api` methods.
   - If the widget needs live OS data, background polling, or commands, add provider helpers in `host/providers.py`, register the default item in `DEFAULT_ITEMS`, hydrate initial state in `get_initial_state()`, set the card height hint in `show_hover_card()`, and expose the bridge method on the API class in `host/main.py`.
   - *(Optional)* Expose user preferences in `src/ui/windows.ts` (**Settings → Widgets**). Store any user secrets via Windows **DPAPI** (`CryptProtectData` / `CryptUnprotectData`), never plaintext JSON.
4. **Bundle, test & visually preview**
   - Rebundle with `npm run build:ui` and verify all tests/token checks pass with `npm test`.
   - Inspect your card across themes in any browser via `public/_screenshot_harness.html?view=card&theme=paper&widget=<id>` (and `liquid-glass`, `terminal`, etc.), then launch `python host/main.py --smoke-test` and `python host/main.py`.

### Ready-to-Use AI Agent Prompt

Copy this prompt into your preferred coding agent inside the `Flank` repository and fill in the bracketed section at the top:

```text
Add a new widget to Flank:
- Widget name: [e.g., Pomodoro Tasks / Spotify / Disk Usage]
- Widget ID (widgetKind): [e.g., mywidget]
- Dock badge / short text: [e.g., 2-4 chars or status metric]
- Features & interactions: [describe what the flyout card displays and what buttons/inputs do]
- Data source: [UI-only / local Windows command or API / web API]

Follow Flank's exact architecture and conventions:
1. Update `src/providers/types.ts` (add to `WidgetKind` and define the payload interface on `FlankState`) and `src/providers/sample.ts` (add realistic offline sample data and default `DockItem`).
2. Add or reuse an SVG icon in `src/ui/icons.ts` (`iconSvg`), render the dock tile in `src/ui/dock.ts` (`renderWidgetTileInner`), and implement the flyout card in `src/ui/cards.ts` (`renderCardBody`) reusing `.flank-card__hdr`, `.flank-chip`, `.flank-btn`, `.flank-pill`, and `--flank-*` CSS tokens so all 7 themes (`paper`, `glass`, `liquid-glass`, `aurora`, `nord`, `terminal`, `rail`) work with proper WCAG contrast. Escape all dynamic strings with `escapeHtml` and never use `eval()` or unsafe inline handlers.
3. Handle UI actions cleanly in `src/main.ts` (`data-action`). If Windows OS data, background fetching, or host actions are needed, implement them in `host/providers.py` and expose the bridge + `DEFAULT_ITEMS` + `get_initial_state` + flyout height hint in `host/main.py`. If the widget stores any API token/secret, encrypt it locally using Windows DPAPI rather than plaintext JSON.
4. Add unit tests if introducing parsing/state logic, run `npm run build:ui` and `npm test`, verify the rendered card visually via `public/_screenshot_harness.html?view=card&theme=paper&widget=<widgetKind>`, and run `python host/main.py --smoke-test` to confirm zero startup regressions.
```

---

## Development

```bash
# Run unit & design-token tests
npm test

# Bundle TypeScript frontend into public/bundle.js
npm run build:ui

# Launch Flank from source
python host/main.py

# Run startup smoke test
python host/main.py --smoke-test

# Run automated QA screenshot sweep
python scripts/run_qa_sweep.py

# Build standalone executable and installer (dist/Flank/Flank.exe & dist/Flank-Setup.exe)
python scripts/build_executable.py
```

For the full standalone showcase and visual gallery, see the [Flank Wiki](docs/wiki/Home.md).
