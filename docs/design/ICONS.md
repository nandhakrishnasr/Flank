# Flank Icon Language Specification (Step 3)

## 1. Overview & Principles

Flank enforces a strict **Single Icon Language** across all components. Previously, the dock mixed raw full-colour favicons with thin mono line icons at inconsistent stroke weights and optical sizes. Under this system:

1. **One Stroke, One Grid:** Built-in widgets and system icons share a single stroke weight (`1.75`), round line caps, round line joins, `currentColor`, and a 24x24 grid.
2. **Plated Apps & Shortcuts:** All third-party apps, exe targets, and website shortcuts sit on an identical **32px rounded square plate** (`radius-8`), providing a unified silhouette and visual baseline.
3. **Plateless Widgets:** Built-in glanceable widgets never sit on a plate; they remain lightweight mono line art.
4. **Automated Quality Gate:** The host icon extraction and favicon pipeline rejects blurry, low-detail, or disproportional icons before they reach the UI, seamlessly substituting an accessible, curated letter badge.

---

## 2. Built-in Widgets & System Icons

All built-in glyphs are managed exclusively through `src/ui/icons.ts`, backed by the open-source **Lucide** icon library ([docs/design/LUCIDE_LICENSE.txt](file:///docs/design/LUCIDE_LICENSE.txt)):

| Property | Value | Description |
|---|---|---|
| **Grid / ViewBox** | `0 0 24 24` | 24px coordinate system with 2px padding. |
| **Default Optical Size** | `20px` (`var(--flank-scale-icon-md)`) | Scaled via CSS variable; compact items scale to `16px`. |
| **Stroke Width** | `1.75` (`var(--flank-scale-icon-stroke)`) | Uniform stroke weight across all themes and views. |
| **Caps & Joins** | `round`, `round` | Soft, modern corners matching Windows 11 aesthetics. |
| **Fill** | `none` | Pure mono line art; media markers (`play`, `pause`) follow the same outline system. |
| **Color** | `currentColor` | Inherits parent tile/text state tokens (`--flank-color-tile-icon`, `--flank-color-tile-active-icon`). |

---

## 3. App & Website Shortcut Icon Plates

Every external item (browser links, desktop executables, custom dock items) is rendered on a standardised plate:

- **Dimensions:** Exactly `32px × 32px` (`min-width: 32px; min-height: 32px;`).
- **Corner Radius:** `8px` (`var(--flank-scale-radius-8)`).
- **Surface Fill:** `--flank-color-icon-plate` (Pure white `#FFFFFF` in light themes; subtle elevated surface e.g. `rgba(255, 255, 255, 0.08)` in dark themes).
- **Hairline Border:** `1px solid var(--flank-color-icon-plate-border)` (`rgba(31, 30, 27, 0.08)` in light themes; translucent white in dark themes).
- **Elevation / Shadow:** Soft, shallow drop shadow (`var(--flank-color-icon-plate-shadow)`: `0 1px 3px rgba(31, 30, 27, 0.08)`).
- **Inner Icon Sizing:** Transparent icons are optically centered at `20px` to `24px` with at least `4px` padding on all sides (`max-width: 24px; max-height: 24px; object-fit: contain`).
- **Squircle / Full-bleed Icons:** Icons that already possess their own solid background (squircle app icons) fill the 32px plate edge-to-edge, cleanly clipped by the plate's `8px` corner radius.
- **Widgets:** Built-in widgets **never** have a plate.

---

## 4. Host Quality Gate & Fallback Pipeline

Favicon retrieval and executable icon extraction run through `_process_and_cache_image` in `host/main.py`:

```
Input (Web HTML / Exe HICON / Custom File)
  │
  ▼
Multi-frame selection (select largest frame from ICO/GIF)
  │
  ▼
Alpha Margin Trim (pil_img.crop(pil_img.getbbox()))
  │
  ▼
[Quality Gate 1] Short side >= 32px? ─── No ───► Reject (Letter Badge)
  │ Yes
  ▼
[Quality Gate 2] Aspect ratio 0.5 .. 2.0? ─── No ───► Reject (Letter Badge)
  │ Yes
  ▼
[Quality Gate 3] Color stddev >= 8.0? ─── No ───► Reject (Letter Badge)
  │ Yes
  ▼
Downscale with PIL LANCZOS to 128x128 (never upscale small icons)
  │
  ▼
Cache to %LOCALAPPDATA%\Flank\icons\{sha1}.png & emit data URI
```

### Quality Gate Thresholds
1. **Short Side Minimum:** Rejects any icon smaller than `32px` on the short side to prevent pixelation on modern high-DPI displays.
2. **Aspect Ratio:** Rejects banner/strip icons with aspect ratio worse than `1:2` (must fall between `0.5` and `2.0`).
3. **Detail & Color Variance:** Calculates standard deviation across RGB channels (`ImageStat.Stat(rgb_copy).stddev`). If maximum standard deviation is below `8.0`, the icon is rejected as an unreadable flat color blob.
4. **Source Priority:** In web scraping, prefers `apple-touch-icon` (180x180/192x192), then largest `<link rel="icon">`, then Google s2 128px high-resolution favicon fallback.

---

## 5. Letter Badge Design

When an icon fails the quality gate or has no favicon:

- **Plate:** Identical 32px × 32px rounded square (`radius-8`).
- **Typography:** First letter of item label, uppercase, 15px font size, weight 600 (`title` weight), centered with line-height 1.
- **Palette Hashing:** The background color is deterministically hashed from the item label to one of 8 curated muted palette hues:
  1. `Slate` (`#475569`)
  2. `Indigo` (`#4F46E5`)
  3. `Cyan` (`#0891B2`)
  4. `Emerald` (`#059669`)
  5. `Amber` (`#D97706`)
  6. `Rose` (`#E11D48`)
  7. `Violet` (`#7C3AED`)
  8. `Blue` (`#2563EB`)
- **Contrast:** Pure white text (`#FFFFFF`) guarantees WCAG 2.1 AA compliance (> 4.5:1 contrast) against all 8 hues.

---

## 6. Icon Example Table

| Item | Category | Visual Representation | Plate Used? | Specs |
|---|---|---|---|---|
| **World Clock** | Built-in Widget | Lucide `clock` line SVG | No | 20px, stroke 1.75, round caps, `currentColor` |
| **Weather** | Built-in Widget | Lucide `sun` line SVG | No | 20px, stroke 1.75, round caps, `currentColor` |
| **Laptop Battery** | Built-in Widget | Lucide `battery` line SVG | No | 20px, stroke 1.75, round caps, `currentColor` |
| **Focus Timer** | Built-in Widget | Lucide `focus` line SVG | No | 20px, stroke 1.75, round caps, `currentColor` |
| **Settings** | System Tile | Lucide `settings` line SVG | No | 20px, stroke 1.75, round caps, `currentColor` |
| **Terminal** | App Shortcut | Windows Terminal icon on plate / "T" badge | Yes | 32px plate, 8px radius, `--flank-color-icon-plate` |
| **YouTube** | Web Shortcut | YouTube 128px favicon on plate / "Y" badge | Yes | 32px plate, 8px radius, `--flank-color-icon-plate` |
| **Custom Link** | Custom Shortcut | Full-colour favicon or hashed letter badge | Yes | 32px plate, 8px radius, `--flank-color-icon-plate` |
| **Collapse Handle** | Dock Navigation | Directional chevron (`<` / `>`) | No | 14px, stroke 2.4, round caps, 28px tall handle |
| **Collapsed Tab** | Edge Morph Tab | Inward chevron (`<` / `>`) + optional logo | No | 14px chevron + 24px inlined Flank bird glyph |
| **Settings Titlebar**| Window Chrome | Flank mascot glyph | No | 18px inlined SVG, `currentColor` |

---

## 7. High-DPI Scaling Verification

- **Vector SVGs:** Built-in icons are purely mathematical vector paths rendered by WebView2 with `shape-rendering="geometricPrecision"`. They remain sharp at 100%, 125%, 150%, and 200% Windows scaling.
- **128px Plate Sources:** All raster icons are extracted and cached at 128px. At 150% scaling, the 32px plate spans 48 physical device pixels, meaning the 128px source PNG provides over 2.5× supersampling downscaled with bicubic filtering by the Chromium rendering engine.

