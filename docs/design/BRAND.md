# Flank Capsule F: Brand Identity & Guidelines

The mark is a capital F inside a vertical capsule, the same silhouette as the dock. It officially replaces the bird mascot as the Flank logo across all surfaces, windows, documentation, and metadata.

---

## 1. Files & Usage

| File | Use |
|---|---|
| `assets/brand/flank.ico` | Windows icon: exe, installer, window and taskbar icon. Multi-frame format with 16, 24, 32, 48, 64, 128, 256 px. Frames 16, 24, and 32 use the small solid variant. |
| `assets/brand/svg/flank-app-icon.svg` | Full app icon (blue squircle tile, outlined capsule F). Use at 48 px and up. |
| `assets/brand/svg/flank-app-icon-small.svg` | Small app icon (blue squircle tile, solid capsule with cutout F). Use below 48 px. |
| `assets/brand/svg/flank-glyph.svg` | Outlined capsule F, single colour via `currentColor`. For UI at 24 px and up (e.g. empty states at 56 px). Inlined in DOM. |
| `assets/brand/svg/flank-glyph-solid.svg` | Solid capsule with cutout F, `currentColor`. For UI below 24 px (e.g. 18 px title bar, 20 px collapsed edge tab). Inlined in DOM. |
| `assets/brand/svg/flank-wordmark.svg` | "flank" with amber dot, outlined from Inter Display ExtraBold, `currentColor` with `#F5A524` amber dot. |
| `assets/brand/svg/flank-lockup.svg` | Full brand lockup (app icon + wordmark) on light backgrounds (ink text `#1F1E1B`). |
| `assets/brand/svg/flank-lockup-light.svg` | Full brand lockup (app icon + wordmark) on dark backgrounds (white text `#FFFFFF`). |
| `assets/brand/png/flank-app-icon-{1024..16}.png` | Official raster app icons. Sizes below 48 use the small variant. |
| `assets/brand/png/flank-glyph-ink-512.png` | Raster glyph on transparent with ink fill. |
| `assets/brand/png/flank-glyph-white-512.png` | Raster glyph on transparent with white fill. |
| `assets/brand/png/flank-lockup-1600.png` | High-res raster lockup for website headers and documentation. |
| `assets/brand/tray/flank-tray-{16,20,24,32}-{dark,light}.png` | Dynamic Windows system tray icons: pick size from DPI, and dark/light from taskbar personalization. |

---

## 2. Brand Colours

| Name | Hex | Token |
|---|---|---|
| Flank Blue | `#2F4BFF` | `--flank-brand-blue` |
| Deep Blue | `#1E34C9` | `--flank-brand-deep` |
| Amber Accent | `#F5A524` | `--flank-brand-amber` |
| Ink | `#1F1E1B` | `--flank-brand-ink` |
| Paper | `#FBFAF7` | `--flank-brand-paper` |

> [!NOTE]
> Use brand tokens only where a static brand colour is needed (e.g. lockups and About page). All other UI components use theme-driven tokens (`--flank-color-text`, `--flank-color-text-muted`, etc.) with `currentColor`.

---

## 3. Brand Rules & Specifications

1. **Size Rule**:
   - Below 48 px for app icons, always use `flank-app-icon-small.svg`.
   - Below 24 px for glyphs, always use `flank-glyph-solid.svg`. The outline variant gets too thin to read at small sizes.
2. **Theme Adaptability**:
   - Glyph and wordmark use `currentColor` in UI code. They inherit from `--flank-color-text` or `--flank-color-text-muted`.
   - Never recolour the amber dot (`#F5A524`).
3. **Clear Space**:
   - Clear space around the icon or glyph must be at least 25% of its width.
4. **Minimum Sizes**:
   - App icon: 16 px.
   - Glyph: 14 px tall.
   - Wordmark: 64 px wide.
5. **Do and Don't**:
   - **Do NOT** stretch, distort, rotate, outline, or add drop shadows to the glyph.
   - **Do NOT** place the app icon on an opaque rectangular background (corners must remain transparent squircles).
   - **Do NOT** retype the wordmark in another font (it is vector-outlined from Inter Display ExtraBold).
   - **Do NOT** put the logo on the dock face itself (the dock face is reserved exclusively for user shortcuts and active widgets).
