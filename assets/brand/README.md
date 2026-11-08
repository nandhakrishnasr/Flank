# Flank capsule F: brand package

The mark is a capital F inside a vertical capsule, the same shape as the dock. It replaces the bird mascot as the Flank logo.

## Files

| File | Use |
|---|---|
| `flank.ico` | Windows icon: exe, installer, window and taskbar icon. Frames 16, 24, 32, 48, 64, 128, 256. 16, 24 and 32 use the small variant. |
| `svg/flank-app-icon.svg` | Full app icon (blue tile, outlined capsule). Use at 48 px and up. |
| `svg/flank-app-icon-small.svg` | Small app icon (solid capsule, bigger F). Use below 48 px. |
| `svg/flank-glyph.svg` | Outlined capsule F, one colour via `currentColor`. For UI at 24 px and up. Inline it. |
| `svg/flank-glyph-solid.svg` | Solid capsule with the F cut out, `currentColor`. For UI below 24 px (tab, title bar, tray). Inline it. |
| `svg/flank-wordmark.svg` | "flank" with amber dot, text converted to outlines, `currentColor` (the dot stays amber). |
| `svg/flank-lockup.svg`, `flank-lockup-light.svg` | App icon plus wordmark, for light and dark backgrounds. |
| `png/flank-app-icon-{1024..16}.png` | Raster app icons. Sizes below 48 use the small variant. |
| `png/flank-glyph-ink-512.png`, `flank-glyph-white-512.png` | Raster glyph on transparent. |
| `png/flank-lockup-1600.png` | Raster lockup. |
| `tray/flank-tray-{16,20,24,32}-{dark,light}.png` | Tray icons. `dark` is a dark glyph for a light taskbar, `light` is a white glyph for a dark taskbar. |

## Colours

| Name | Hex |
|---|---|
| Flank blue | `#2F4BFF` |
| Deep blue | `#1E34C9` |
| Amber accent | `#F5A524` |
| Ink | `#1F1E1B` |
| Paper | `#FBFAF7` |

## Rules

- Below 48 px always use the small variant. The outline gets too thin to read.
- Glyph and wordmark are one colour. In the UI use the theme text token. Never recolour the amber dot.
- Clear space around the icon or glyph: at least 25% of its width.
- Minimum sizes: icon 16 px, glyph 14 px tall, wordmark 64 px wide.
- Do not stretch, rotate, outline, add shadows to the glyph, or place the app icon on a rectangular background (corners are transparent).
- The wordmark is outlined from Inter Display ExtraBold. Do not retype it in another font.
