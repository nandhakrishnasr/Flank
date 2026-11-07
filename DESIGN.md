# Flank Design Specification

Flank is a second dock for Windows. It lives on a screen edge and holds apps, links, clipboard history and small live widgets (weather, music, system stats, AI usage). This document is the source of truth for how it looks and behaves. The default theme is **Paper**. Four alternates (Glass, Terminal, Rail, Aurora) exist to prove the theme system and will ship through a theme store plugin.

Files in this package:

- `themes/*.json`: design tokens per theme (the values below come from these).
- `themes/tokens.css`: the same tokens as CSS custom properties, one block per theme.
- `reference/`: the mockup markup. Inline styles are the exact measurements. See README for how to read them.
- `AGENT_PROMPT.md`: instructions for the coding agent.

---

## 1. Principles

1. **Glanceable.** A widget answers one question in under a second (what is the temperature, how busy is the CPU). Detail lives in the hover card, never in the dock.
2. **Quiet until needed.** The dock is small, calm and never steals focus. Motion is short and purposeful.
3. **Theme-driven everything.** No colour, radius, shadow, font or spacing value is hard-coded in a component. Components read tokens only. A theme is data, not code.
4. **Honest and plain.** Sentence case, real labels, no filler. Sample content appears only in previews and empty states, and is clearly sample.
5. **Original.** Flank is inspired by the idea of a second dock. Do not copy any other product's name, copy, icons, screenshots or branding.

## 2. Anatomy

- **Dock**: the always-visible bar attached to a screen edge. Holds up to 12 items.
- **Tile**: one item in the dock. Three kinds: **app**, **link**, **widget**.
- **Divider**: separates pinned apps/links from widgets.
- **Hover card**: slides out from the hovered widget tile. Carries the widget's detail and controls.
- **Full window**: opens from a card (Clipboard history, full System stats).
- **Settings**: Items (order, shortcuts), Appearance (theme, edge, size), Widgets, About.

## 3. Default theme: Paper

### 3.1 Dock (vertical pill, right edge)

| Property | Value |
|---|---|
| Edge / inset | right, 14px from the screen edge, vertically centered in the work area |
| Width | 60px (tile 40 + padding 10 each side) |
| Padding / gap | 10px / 8px |
| Radius | 20px |
| Surface | solid `#fbfaf7`, border 1px `#e2ded4` |
| Shadow | `0 14px 34px rgba(60,50,30,0.16)` |
| Blur | none |

### 3.2 Tile

| State | Spec |
|---|---|
| Default | 40x40, radius 12, background `#f1eee7`, icon 18px `#34322e` |
| Hover | background `#e9e5db` (derived, not in the mockup) |
| Pressed | background `#e0dbcf` (derived) |
| Active (card or window open) | background `#1f1e1b`, icon/text `#ffffff` |
| Focus-visible | 2px ring `#2F4BFF`, 2px offset |

Divider: 24px wide, 1px, `#e2ded4`, centered.

### 3.3 Widget tiles

- **Clipboard**: clipboard icon, count badge at top-right (offset -5px). Badge: min 18x18, radius 9, padding 0 5px, 10px/700, accent background, accent-ink text.
- **Weather**: 16px sun/moon icon over the temperature (10.5px/600), 1px gap.
- **CPU**: percentage (10.5px/600) over a 22x3 bar, 4px gap. Track `#dcd7ca`, fill accent.
- **Mini player**: accent equalizer icon (3 rounded bars), 20px.
- **AI usage**: 28px ring, 3px stroke, accent progress on a translucent track, value inside when it fits.

### 3.4 Hover card

| Property | Value |
|---|---|
| Position | to the left of the dock, 10px gap, vertically centered on the hovered tile, clamped inside the work area |
| Size | width 292px, padding 18px, internal gap 14px |
| Surface | `#fbfaf7`, border 1px `#e2ded4`, radius 20 |
| Shadow | `0 18px 44px rgba(60,50,30,0.18)` |
| Caret | 12px square rotated 45deg on the dock-facing edge, same fill, border on the two outer sides, centered on the tile |

Weather card contents: city (13px/600 muted) and "Now" (12px muted) on one row; big temperature in the display font (Fraunces, 64px, weight 400, line-height 0.95, letter-spacing -0.02em) with condition (15px/500) and high/low (12.5px muted) right-aligned; a divider (`#e8e4da`); five hourly columns (hour 12px muted, icon 16px, temp 13px/600).

### 3.5 Colour tokens

Text `#1f1e1b`, muted text `#6b665c`, accent `#2F4BFF` (accent ink `#ffffff`), accent soft `rgba(47,75,255,0.10)`, accent line `rgba(47,75,255,0.35)`. Muted text must stay at or above 4.5:1 on its surface.

### 3.6 Typography

- UI: Inter 400/500/600/700 (fallback Segoe UI Variable, Segoe UI).
- Display: Fraunces 400, large numerals only.
- Mono: JetBrains Mono (Terminal theme and code snippets).
- Scale (px): 10.5, 11.5, 12, 12.5, 13, 13.5, 14, 15, 20, 64. Use tabular numerals for every live number.
- Bundle the fonts with the app. Do not load them from a CDN at runtime.

### 3.7 Iconography

Inline SVG, 24x24 viewBox, stroke `currentColor`, stroke width 1.8, round caps and joins, no fills except the equalizer. Icons used: terminal, globe, folder, notes, bookmark, clipboard, sun, moon, search, pin, trash, arrow-up-right, play, pause, previous, next, window controls. No emoji. Do not import another product's icon set without checking its licence.

### 3.8 Spacing, radius, elevation

8px base unit (4px for tight pairs). Radius scale: 8, 12, 16, 20, 24. Two elevations only: dock, and card/window.

## 4. Other windows

### 4.1 Clipboard history window (mocked in Glass; re-skin with tokens)

Window 960x680, radius 14, title bar 44px with window controls. Two columns:

- **List column**, 420px: search field (42px high, radius 12), filter chips (All, Text, Links, Images, Files; 30px high, pill), then 60px rows (36px icon chip, title 13.5px/500 single-line ellipsis, meta 11.5px muted such as "Link · 2 min ago"). Selected row uses accent soft background with accent line border.
- **Preview column**: type chip and time, title 20px/600, preview area, metadata rows (Copied, From, Length), then actions: primary "Copy to clipboard" (44px, accent), Pin, Delete (44px icon buttons).
- **Footer**, 40px: "148 of 200 saved on this PC" and keyboard hints.

Behaviour: keeps up to 200 entries including the newest 12 images; persists across restarts on the local machine; skips items marked private by password managers; arrow keys move, Enter copies, Delete removes.

### 4.2 Stats card and full stats window

Card: CPU, Memory, GPU, Disk rows (label, value, 4px bar), a 60-second CPU sparkline, download and upload tiles, and an "Open full stats" button. Refresh every 1, 2 or 5 seconds; pausable. Read-only: never terminate processes.

### 4.3 Mini player card, AI usage card

Mini player: 60px artwork, title 14px/600, artist 12.5px muted, 4px progress bar with times, previous / play-pause (44px accent) / next.
AI usage: ring with total percent, then per-tool bars and a reset line. It must never read conversations, prompts or generated code; show usage numbers only.

## 5. Motion

- Hover card in: 160ms, opacity 0 to 1 and translateX(8px) to 0, easing `cubic-bezier(0.2,0.8,0.2,1)`. Out: 100ms.
- Tile hover/press: 120ms background change. No scaling or bouncing.
- Respect reduced motion: when the system prefers reduced motion, drop all transforms and use opacity only (or nothing).

## 6. Accessibility

- Every tile is a real `button` (or link) with an accessible name that includes live values ("Weather, 24 degrees").
- Hit targets are at least 40px. Where a theme draws smaller tiles (Rail, 32px), pad the clickable area to 40px.
- Text contrast 4.5:1 minimum (3:1 for 24px and larger). The theme validator enforces this (section 8).
- Never rely on colour alone for state. Active tiles also change background lightness.
- Full keyboard support: Tab through tiles, Enter/Space opens the card, Esc closes it, per-item global shortcuts.
- Windows high contrast / forced-colors mode overrides theme colours with system colours.

## 7. Windows behaviour notes

- Dock to any edge (right default), per monitor, DPI-aware, repositioned on resolution or monitor changes.
- Never take keyboard focus from the active app when the dock or a card is hovered or clicked (use a no-activate window style).
- Optionally reserve screen space as an app bar so maximized windows do not sit under the dock; default is overlay with auto-hide off.
- Hide over exclusive full-screen apps.
- Glass and Rail use a system backdrop (Acrylic/Mica) where available; otherwise use the theme's `solidFallbackBg`.
- Clipboard capture uses the clipboard-change listener, not polling. Global shortcuts use registered hotkeys, which need no keyboard hook and no elevated permissions. Do not default to Win+V (taken by Windows). Suggested default: Ctrl+Alt+V, configurable.
- Per-item shortcut assignment: record the keys as pressed and warn on conflicts.
- Request permissions (location for weather, Bluetooth, media control) only when the user adds the widget that needs them.
- No telemetry. Network calls are limited to what a widget needs (weather, update check, licence check if paid).

## 8. Theme system and the theme store plugin

A theme is a JSON file matching `themes/*.json` (schema version 1). It contains `layout`, `surface`, `color`, `type`, `icons` and `motion` groups.

**CSS variables.** At runtime, flatten each token to a variable named `--flank-<group>-<token>` (kebab-case), for example `--flank-color-accent`, `--flank-surface-card-shadow`, `--flank-layout-tile-size`. `themes/tokens.css` shows the exact output. Components use these variables only.

**Layout tokens drive structure, not just paint.** `edge` (left, right, top), `orientation` (vertical, horizontal), `shape` (pill, strip, rail, capsule), `widgetStyle` (tile, row, value, pill) and `labels` change how the dock is composed. The dock component must support all four shapes from day one, even though Paper uses only `pill`.

**Rules for theme files (the store must enforce these):**

1. Themes are data only. No scripts, no remote URLs, no embedded fonts from the network. Fonts must be from the bundled list or a local font file shipped in the theme package and validated.
2. Validate against the schema. Unknown keys are ignored, missing keys fall back to Paper.
3. Contrast check on load: text on surface and accent-ink on accent must pass 4.5:1, muted text on surface 4.5:1. Failing themes cannot be applied and show the failing pair.
4. Size limits: tile 28 to 56px, dock width 32 to 260px, card width 240 to 360px.
5. If anything fails, fall back to Paper silently and log it locally.
6. Live preview in the store before applying. One click to revert to Paper.
7. Accent override: users can change the accent of any theme; the contrast check runs again.

## 9. Content rules

Sentence case ("Copy to clipboard", not "Copy To Clipboard"). Short labels. Numbers with units ("2.4 MB/s", "412 / 953 GB"). Relative times ("2 min ago"). Empty states say what to do next. No lorem ipsum, no invented statistics outside clearly marked preview data.

## 10. Do not

- Do not hard-code colours, radii, shadows or fonts in components.
- Do not copy another product's name, copy, icons, screenshots or look.
- Do not use emoji as icons.
- Do not put a coloured stripe on one side of a card as decoration (the Rail's active-edge indicator is the one defined exception).
- Do not add gradients or glow to Paper. Gradient accents belong to Aurora.
- Do not show AI conversation content anywhere.

## 11. Reference map

| Theme | Reference file |
|---|---|
| Glass (dark, original) | `reference/glass-desktop.dc.html` |
| Clipboard window (Glass) | `reference/clipboard-window.dc.html` |
| Paper (default) | `reference/paper.dc.html` |
| Terminal | `reference/terminal.dc.html` |
| Rail | `reference/rail.dc.html` |
| Aurora | `reference/aurora.dc.html` |

Where the reference and this document disagree, this document wins, except for pixel measurements, where the reference markup wins.
