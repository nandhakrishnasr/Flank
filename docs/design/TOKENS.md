# Flank Design Foundations & Token System (Step 1)

This document establishes the canonical design foundation tokens for **Flank**, covering spacing on a 4 px grid, dock metrics, typography, radii, icons, motion, and elevation.

All components, stylesheets, and themes must consume these variables only.

---

## 1. Spacing Scale (4 px Grid)

Spacing is strictly defined on a 4 px grid with half-step increments (2 px, 6 px, 10 px) for compact UI density:

| Token | Value | Recommended Usage |
|---|---|---|
| `--flank-scale-space-2` | `2px` | Micro hairline offsets, tight ring paddings |
| `--flank-scale-space-4` | `4px` | Badge insets, compact icon gaps |
| `--flank-scale-space-6` | `6px` | Tile gaps (`tile.gap`), small element paddings |
| `--flank-scale-space-8` | `8px` | Default compact padding, chip vertical padding |
| `--flank-scale-space-10` | `10px` | Dock container horizontal padding (`dock.padding`) |
| `--flank-scale-space-12` | `12px` | Standard button and chip horizontal padding |
| `--flank-scale-space-16` | `16px` | Group gaps (`group.gap`), card section padding |
| `--flank-scale-space-20` | `20px` | Flyout card outer margins, modal padding |
| `--flank-scale-space-24` | `24px` | Wide container margins, header separation |
| `--flank-scale-space-32` | `32px` | Large dialog layout padding |

---

## 2. Dock Metrics Tokens

The vertical dock dimensions derive entirely from tokens:

| Metric | Token | Value | Formula / Details |
|---|---|---|---|
| Dock Padding | `--flank-scale-dock-padding` | `10px` | Inset from dock edges |
| Tile Size | `--flank-scale-tile-size` | `40px` | App launcher & widget base size |
| Tile Gap | `--flank-scale-tile-gap` | `6px` | Gap between sequential items in dock |
| Group Gap | `--flank-scale-group-gap` | `16px` | Gap separating app launchers from widgets |
| Handle Height | `--flank-scale-handle-height` | `28px` | Collapse chevron handle at top of dock |
| Dock Width | `--flank-scale-dock-width` | `64px` | `calc(tile.size + 2 * dock.padding + 4px)` |

*Note: The Python host calculates dynamic window bounds from the frontend's measured bounding rect, ensuring the host and UI remain synchronized.*

---

## 3. Typography Scale

Fonts are bundled locally (WOFF2) in `public/fonts/` (`Inter`, `Fraunces`, `JetBrains Mono`) so Flank functions 100% offline.

| Role | Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|---|
| `caption` | `--flank-scale-font-caption` | `11px` | `400` / `500` | `1.35` | Timestamps, micro badges, status chips |
| `label` | `--flank-scale-font-label` | `12px` | `500` / `600` | `1.35` | Form labels, small button labels, sub-items |
| `body-sm` | `--flank-scale-font-body-sm` | `13px` | `400` / `500` | `1.35` | Compact descriptions, flyout list items |
| `body` | `--flank-scale-font-body` | `14px` | `400` / `500` | `1.35` | Default body copy, settings item titles |
| `title` | `--flank-scale-font-title` | `16px` | `600` | `1.35` | Card titles, modal section headers |
| `heading` | `--flank-scale-font-heading` | `20px` | `600` | `1.35` | Window main titles, modal headers |
| `display` | `--flank-scale-font-display` | `28px` | `600` / `700` | `1.20` | Hero numerals (clock time, focus timer) |

- **Font Family**: `Inter, "Segoe UI Variable", "Segoe UI", system-ui, sans-serif` (`--flank-font-stack`)
- **Tabular Numbers**: `.flank-num` (`font-variant-numeric: tabular-nums`) ensures digits do not shift width during live updates.

---

## 4. Radii Scale

To prevent bulging corners and irregular curvature, elements adhere to these strict radii:

| Role | Token | Value | Target Components |
|---|---|---|---|
| `radius-6` | `--flank-scale-radius-6` | `6px` | Progress bars, switch knobs, collapse handle |
| `radius-8` | `--flank-scale-radius-8` | `8px` | Small buttons, status badges, chips, tabs |
| `radius-12` | `--flank-scale-radius-12` | `12px` | Dock tiles, card content sub-blocks |
| `radius-16` | `--flank-scale-radius-16` | `16px` | Flyout cards (`--flank-surface-card-radius`) |
| `radius-20` | `--flank-scale-radius-20` | `20px` | Windows, settings dialogs |
| `radius-full` | `--flank-scale-radius-full`| `9999px` | Capsule dock container (`--flank-layout-dock-radius`) |

*Rule: Never allow sum of corner radii to exceed element width or height.*

---

## 5. Icon System Tokens

| Role | Token | Value | Usage |
|---|---|---|---|
| Small | `--flank-scale-icon-sm` | `16px` | Trailing chevron, secondary actions, tray |
| Medium | `--flank-scale-icon-md` | `20px` | Dock tiles, card action buttons |
| Large | `--flank-scale-icon-lg` | `24px` | Edge tab logo, modal category headers |
| Stroke Width | `--flank-scale-icon-stroke` | `1.75` | Unified hairline stroke width for inlined SVGs |

---

## 6. Motion Tokens

Transitions and spring physics for magnification and slide morphing:

| Token | Value | Purpose |
|---|---|---|
| `--flank-motion-fast` | `120ms` | Hover states, icon highlights, tab expansion |
| `--flank-motion-base` | `180ms` | Tile clicks, button activation, card cross-fades |
| `--flank-motion-slow` | `240ms` | Dock slide-in / slide-out collapse transition |
| `--flank-motion-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Standard natural deceleration |
| `--flank-motion-easing-emphasized` | `cubic-bezier(0.3, 0, 0, 1)` | Expressive popouts and flyout appearances |
| Spring Stiffness | `300` | Dock hover magnification spring responsiveness |
| Spring Damping | `24` | Damped settling without overshoot oscillation |

### Reduced Motion
When `prefers-reduced-motion: reduce` or `[data-reduce-motion="true"]` is active, all durations immediately collapse to `0ms` and transitions/animations evaluate instantly.

---

## 7. Elevation Tokens

Two-layer shadows (tight contact + soft ambient) designed to stay safely within `windowPadding` (`offsetY + blur <= windowPadding`):

| Token | Definition | Reach (`offsetY + blur`) | Target |
|---|---|---|---|
| `--flank-elevation-0` | `none` | `0px` | Flat surfaces (Terminal theme) |
| `--flank-elevation-1` | `0 1px 3px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.05)` | `9px` | Tiles, badges, small buttons |
| `--flank-elevation-2` | `0 2px 6px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.10)` | `28px` | Flyout cards (fits 40px/64px padding) |
| `--flank-elevation-3` | `0 4px 12px rgba(0,0,0,0.10), 0 16px 32px rgba(0,0,0,0.14)` | `48px` | Modal settings window (fits 64px padding) |

