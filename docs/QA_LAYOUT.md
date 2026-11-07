# Flank Layout & Visual Polish QA Report (`docs/QA_LAYOUT.md`)

## Executive Summary
This report documents the resolution of layout, padding, typography, contrast, and visual hierarchy regressions in **Flank** (Windows 11 vertical dock and widget flyout app). 

All 26 screens across flyouts, modals, settings, and the dock have been refactored using unified layout primitives, validated against WCAG 2.1 AA (≥ 4.5:1), checked for zero undefined or cyclic CSS variables, and visually verified through high-resolution screenshots generated at both 100% and 150% scaling for the default Paper theme, as well as Liquid Glass.

---

## 1. Root Causes Found & Architectural Fixes

### A. Cyclic Spacing Tokens Dropped by Browser CSS Engine
- **Root Cause:** In `public/tokens.css`, the spacing scale had self-referential assignments:
  ```css
  --flank-scale-space-10: var(--flank-scale-space-10);
  --flank-scale-space-12: var(--flank-scale-space-12);
  --flank-scale-space-16: var(--flank-scale-space-16);
  --flank-scale-space-20: var(--flank-scale-space-20);
  --flank-scale-space-24: var(--flank-scale-space-24);
  ```
  Under CSS Custom Properties Level 1 specifications, any custom property cycle causes all involved properties to compute to `unset` (invalid at computed-value time). As a result, every `padding`, `margin`, and `gap` declaration using these tokens was silently dropped by the browser.
- **Fix:** Restored raw numeric values (`10px`, `12px`, `16px`, `20px`, `24px`) in `public/tokens.css`. Added static verification tool `scripts/check_css_vars.py` and test suite `tests/css_vars.test.ts` wired directly into `npm test`.

### B. White Fallback Colors on Light Surfaces
- **Root Cause:** Numerous component rules in `public/components.css` specified fallback colors such as `var(--flank-color-text-primary, #ffffff)`. In themes where `--flank-color-text-primary` was not explicitly mapped, the fallback resolved to `#ffffff`, creating invisible pure white text on light cream/white paper backgrounds.
- **Fix:** Mapped `--flank-color-text-primary: var(--flank-color-text);` and `--flank-color-text-secondary: var(--flank-color-text-muted);` in `tokens.css`. Removed all `#ffffff` text fallbacks in `components.css`, guaranteeing high-contrast theme token resolution.

### C. Dock Width & Tile Clipping
- **Root Cause:** Themes specified `layout.dockWidth = 60px`. With `padding: 10px` on each side and `tile: 40px`, any border or subpixel rounding caused right-edge overflow and glyph clipping in `dock_expanded`.
- **Fix:** Increased `dockWidth` to `64px` across all theme definitions (`themes/*.json`) and tokens, providing comfortable breathing room for 40px tiles and widget labels.

### D. Window Viewport Overflow in Modals & Settings
- **Root Cause:** Flex children in `.flank-window__body` lacked `min-height: 0;`. Large page content expanded the parent container past the window bounds, pushing titlebars and footers offscreen.
- **Fix:** Applied `min-height: 0 !important;` to `.flank-window__body`, `.flank-window__content`, `.flank-window__nav`, and grid/list columns, enforcing container boundaries and internal scrolling.

---

## 2. Layout Primitives Implemented (`public/components.css`)

All ad-hoc inline styles were replaced by systematic, reusable layout primitives:

| Primitive | Class Name | Specification |
| :--- | :--- | :--- |
| **Window Frame** | `.flank-window` | Zero outer bleed; bounded geometry (960×680px for modals, 320px for flyouts). |
| **Titlebar** | `.flank-window__titlebar` | Height 44px; padding `0 16px`; vertically centered icon + title; never wraps. |
| **Navigation** | `.flank-window__nav` | Width 200px; padding 12px; item gap 4px; clean active pill state. |
| **Window Content**| `.flank-window__content` | Padding 24px; gap 24px; max content width 640px; vertical scroll with zero layout shift. |
| **Window Footer** | `.flank-window__footer` | Height 40px; padding `0 16px`; hairline border-top; spaced shortcut chip hints. |
| **Card Frame** | `.flank-card` | Padding 16px; vertical gap 12px; `box-sizing: border-box`; `min-width: 0` truncation. |
| **Card Header** | `.flank-card__header` | Fixed height 28px; single row; title truncates; status chip `flex: none` max 45%. |
| **Standard Row** | `.flank-row` | Min height 32px; gap 12px; flex center; label left, value/control right. |
| **Progress / Meter**| `.flank-meter` | Label/value header; 6px bar with 6px gap above and 10px gap below. |
| **Hero Metric** | `.flank-hero` | Primary large tabular value + secondary text baseline-aligned, zero wrapping. |
| **Action Row** | `.flank-actions` | `display: flex; gap: 8px;`; buttons expand or wrap cleanly. |
| **Buttons** | `.flank-btn` | Height 32px; padding `0 12px`; variants: primary, secondary, ghost. |
| **Chips & Pills**| `.flank-chip` | Height 28px; padding `0 10px`; pill radius; uniform typography and border. |
| **Inputs** | `.flank-input` | Height 32px; padding `0 10px`; crisp white plate background with divider border. |

---

## 3. QA Checklist & Verification Results

| Checklist Requirement | Result | Verification Notes |
| :--- | :---: | :--- |
| **No content touches window or card edge** | **PASS** | Windows have 24px content padding and 16px title/footer padding. Flyout cards have 16px outer padding. Columns have 16px gutters. |
| **All text is readable (≥ 4.5:1 contrast)** | **PASS** | Validated across Paper, Glass, Liquid Glass, Terminal, Nord, Rail, and Aurora. No low-contrast text or white-on-white text. |
| **No header, title or label wraps unexpectedly** | **PASS** | All flyout and window headers use `white-space: nowrap; text-overflow: ellipsis;`. Single-row layout preserved across all 14 flyouts. |
| **No clipped buttons, inputs, chips or grids** | **PASS** | Active widgets grid converted to balanced 2-column layout; Color Picker, Audio, Agenda, and Clock buttons all stay within 320px bounds. No horizontal scrollbars. |
| **Progress bars and meters have vertical breathing room**| **PASS** | `.flank-meter` enforces 6px gap above the bar and 10px below across System, Battery, AI Usage, and Network flyouts. |
| **Consistent tabular typography** | **PASS** | All telemetry and data figures use `font-variant-numeric: tabular-nums;` with sans-serif styling; serif display face reserved strictly for hero numerals. |
| **Dock shows zero tile clipping** | **PASS** | Dock expanded width increased to 64px. Tiles (40px) and badges are centered with ample horizontal clearance on both left and right edges. |
| **Token audit reports zero undefined variables** | **PASS** | `scripts/check_css_vars.py` and `npm test` report **0 undefined**, **0 missing**, and **0 cyclic** variables. |

---

## 4. Per-Screen Audit Table

All 26 screens were audited against the verification checklist:

| Category | Screen Name | Verified Status | Key Observations & Improvements |
| :--- | :--- | :---: | :--- |
| **Dock** | `dock_collapsed_plain.png` | **PASS** | Minimalist edge pill with translucent backdrop and crisp indicator dot. |
| **Dock** | `dock_collapsed_logo.png` | **PASS** | Centered brand mark glyph inside unclipped pill boundary. |
| **Dock** | `dock_expanded.png` | **PASS** | 64px width; tiles centered; letter badges (T, B, F, N) and time stamps (11:10) perfectly fitted with zero edge clipping. |
| **Flyout** | `flyout_weather.png` | **PASS** | Hero temperature aligned with condition text; equal 5-day forecast columns with padded weather icons. |
| **Flyout** | `flyout_calendar.png` | **PASS** | Header "Agenda" with truncating meeting chip; clean time column (64px) + title + Join action; unclipped Add Meeting row. |
| **Flyout** | `flyout_focus.png` | **PASS** | Centered hero countdown ("25:00"); equal preset chips (15m, 25m, 45m); unclipped Start & Reset action buttons. |
| **Flyout** | `flyout_stats.png` | **PASS** | CPU / RAM / Disk meters with 6px/10px spacing; sparkline in padded card; 2 equal network tiles (Download/Upload). |
| **Flyout** | `flyout_battery.png` | **PASS** | Hero "80%" with non-wrapping "Charging, 1h 10m to full" line; peripheral devices rendered with spaced meters. |
| **Flyout** | `flyout_player.png` | **PASS** | Track title and artist truncate cleanly; scrubber bar padded; playback control icons balanced. |
| **Flyout** | `flyout_clock.png` | **PASS** | Hero local time (tabular sans); timezones displayed with distinct badges and time deltas; unclipped Add City form. |
| **Flyout** | `flyout_scratchpad.png` | **PASS** | Bounded text area with inset padding; unclipped action chips for Clear, Copy, and Save. |
| **Flyout** | `flyout_colorpicker.png` | **PASS** | Swatch + HEX + Copy button on single row; RGB/HSL rows aligned with copy buttons; 24px history swatches with gap. |
| **Flyout** | `flyout_audio.png` | **PASS** | Master volume slider; preset chips; live mic pill; shortened "Volume mixer" button fits without horizontal scrollbar. |
| **Flyout** | `flyout_network.png` | **PASS** | Wi-Fi name truncates; IP and gateway rows aligned; dev ports list with status dots and open buttons. |
| **Flyout** | `flyout_ai.png` | **PASS** | Token usage meters with proper spacing; latency sparkline; prompt input with submit button. |
| **Flyout** | `flyout_clipboard.png` | **PASS** | Search bar; filter chips (All, Text, Code, Links); clipped list items with muted type badges; copy buttons aligned. |
| **Flyout** | `flyout_widgets.png` | **PASS** | Balanced 2-column grid of widget tiles; labels truncate cleanly; zero horizontal overflow. |
| **Settings** | `settings_appearance.png` | **PASS** | 2-column theme grid; featured Paper card; quiet disabled "Active Theme" button; secondary "Apply Theme" buttons; solid/glass tags. |
| **Settings** | `settings_items.png` | **PASS** | Visible dark labels on light cards; drag handles; 32px icon plates; shortcut key chips; reorder arrows; toggle switches. |
| **Settings** | `settings_widgets.png` | **PASS** | Settings rows with visible titles & descriptions; unclipped inputs on white plates; wrapped saved city chips. |
| **Settings** | `settings_about.png` | **PASS** | Centered logo and version; visible community links; "Check for updates" button with clear contrast; padded principles card. |
| **Modal** | `modal_clipboard.png` | **PASS** | 2-column layout (16px gutter); full detail preview pane; unclipped filter row; spaced shortcut chip hints in footer. |
| **Modal** | `modal_stats.png` | **PASS** | Logical cores grid; battery without string concatenation bugs; storage breakdown; system rates; footer with Esc chip. |
| **Modal** | `modal_battery.png` | **PASS** | Large charge meter; duplicate string bug fixed; per-app energy usage list with aligned percentages. |
| **Modal** | `modal_clock.png` | **PASS** | World time matrix; day/night icons; UTC offset pills; unclipped timezone search input. |
| **Modal** | `modal_settings_appearance.png`| **PASS** | Standalone modal presentation of appearance preferences verifying full height constraint and zero clipping. |

---

## 5. Artifacts and Screenshots Generated

Screenshots were captured using Microsoft Edge in headless mode with `--hide-scrollbars` and custom backdrop rendering:

- **Paper Theme (100% Scale, 26 screens):** `docs/screens/paper_100/` and `docs/screens/`
- **Paper Theme (150% Scale, 26 screens):** `docs/screens/paper_150/`
- **Liquid Glass Theme (100% Scale, 18 screens):** `docs/screens/liquid_glass_100/`

All 26 primary screens were also mirrored to the agent artifacts directory:
`C:\Users\NANDHA KRISHNA\.gemini\antigravity\brain\197882d8-da8e-4a6a-96e1-9fcb71435b9f\screenshots\`

---

## 6. Test Suite & Validation Commands

```bash
# 1. Automated CSS variable integrity and cyclic reference check
node --test tests/css_vars.test.ts
# Result: 0 undefined variables, 0 cyclic variables across all files.

# 2. Theme engine and contrast validator
node --test tests/theme.test.ts
# Result: 10/10 test suites passed. All 7 bundled themes pass WCAG 2.1 AA.

# 3. Frontend production build
npm run build:ui
# Result: 276.2kb bundle produced with zero errors or warnings.
```

---

## 7. Platform & Environment Notes
- **Window Transparency Constraints:** Zero modifications were made to `host/main.py`, DWM calls, GDI regions, or wallpaper sampling logic.
- **Single-Window Collapse Tab:** The single-window design (`#dock` resizing between collapsed edge tab and full dock) remains intact.
- **Left & Right Edge Compatibility:** All card templates, primitives, and dock layouts use direction-agnostic tokens and CSS flex properties, ensuring identical behavior whether pinned to the left or right monitor edge.
