# Prompt for Antigravity IDE

Paste everything below the line into the agent. Put this folder in the repo (for example `docs/design/liquid-glass/`) and fix the paths if you use another location.

---

You are working on **Flank**, my Windows second-dock app (a dock on a screen edge with app tiles, live widgets and hover cards). There are two jobs. Do **Part A first**, verify it, then do **Part B**. The existing design package in `docs/design/` (DESIGN.md, themes, tokens) still applies; this folder adds to it.

## Problem (Part A)

The dock, the hover cards and the other windows do not look fully rounded. Square or dark edges show around the rounded shapes, like a rectangle or vignette behind them. The visible shape is rounded in CSS, but something paints the window rectangle (or clips the shadow into one). `reference/corner-anatomy.png` shows the before and after.

### A1. Diagnose before changing anything
Detect the stack (look for `src-tauri/`, an Electron main process, `.csproj`/WinUI/WPF with WebView2). Then check each cause below and write down which ones apply, with file and line evidence, in `docs/design/DECISIONS.md`:

1. Window not truly transparent: transparency flag off, window decorations on, or the webview default background colour left opaque (white or black).
2. A system backdrop effect (acrylic, mica, vibrancy, `SetWindowCompositionAttribute`, `DwmExtendFrameIntoClientArea`) applied to the window. These always paint the full rectangle and ignore CSS `border-radius`.
3. OS window shadow, DWM border or Windows 11 automatic corner rounding on the borderless window (rectangular dark edge or a 1px outline).
4. CSS painting the window: any background, gradient, vignette, outline, `filter: drop-shadow` or large `box-shadow` on `html`, `body`, the app root or a full-size wrapper; a `color-scheme` that makes the canvas opaque.
5. Shadows clipped by the window bounds. A soft shadow larger than the free space between the shape and the window edge is cut off into a dark rectangular edge. This is the most likely source of a "black vignette".
6. Children with square backgrounds poking past the radius (hover fills, highlight overlays, badges) because the shape has no `overflow: hidden`, or an overlay uses a different radius than the shape.
7. Window size not matching the shape plus padding, or fractional pixel sizes at 125% / 150% DPI.

### A2. Fix
1. **Window**: transparent, no decorations, no OS shadow, no system backdrop effect, not resizable by the user, skip taskbar, always on top, no focus stealing. Make the webview background fully transparent (alpha 0).
   - Tauri v2: in the window config set `transparent: true`, `decorations: false`, `shadow: false`, and a transparent background colour if the option exists in the version used. Remove any `window-vibrancy` call on these windows.
   - Electron: `transparent: true`, `frame: false`, `backgroundColor: '#00000000'`, `hasShadow: false`, `thickFrame: false`, and no `backgroundMaterial`.
   - WebView2 host (WPF, WinUI, native): `AllowsTransparency` with `WindowStyle=None` and `Background=Transparent` where relevant, and `DefaultBackgroundColor` of the WebView2 set to transparent.
   - Any stack, Windows 11: call `DwmSetWindowAttribute` with `DWMWA_WINDOW_CORNER_PREFERENCE = DWMWCP_DONOTROUND` and `DWMWA_BORDER_COLOR = DWMWA_COLOR_NONE` on every Flank window, so the OS does not round or outline the window.
2. **Page**: `html, body, #root { background: transparent !important; margin: 0; overflow: hidden; }`. Remove every full-window background, gradient, vignette, outline and shadow.
3. **Shape**: the dock, each card and each window panel is one element with `border-radius` from the theme tokens and `overflow: hidden`. Everything visual lives inside it. Overlays (highlights, rims, hover fills) use the same radius or are clipped by the shape.
4. **Shadow room**: add a token `layout.windowPadding` (px) to every theme. The native window size is the shape size plus `windowPadding` on all four sides. Rule: for every shadow, `offsetY + blur <= windowPadding`. The theme validator must reject themes that break this. Set Paper, Glass, Terminal, Rail and Aurora to the smallest padding that fits their shadows (Terminal has none, so a small padding of 8px is enough).
5. **Positioning and sizing**: because the window is now larger than the shape, anchor using the shape: window origin = shape origin minus padding. Recompute on every resize (dock item count change, card content change), monitor change and DPI change. Use logical pixels and round to whole device pixels.
6. **Click-through (only if needed)**: if clicks in the transparent padding are blocked from apps underneath, make the padding pass through mouse input (the host's ignore-cursor-events or hit-test API, toggled from pointer enter and leave on the shape), or shrink the padding. Do not add this unless the problem is real.
7. Apply this to every window type: dock, hover cards, clipboard history, stats, settings.

### A3. Verify (do not skip)
Screenshot tools often fill transparent areas with white or black, which looks like the bug. So verify on a bright magenta (#FF00FF) wallpaper, then on pure white and pure black. At 100%, 125%, 150% and 200% display scaling, for every theme, the pixels outside the shape's radius must show the wallpaper, with no rectangle, outline or dark fringe, including around shadows. Attach the screenshots in your report.

## Part B: Liquid Glass theme

Add a new theme **Liquid Glass** (iOS-style liquid glass). Paper stays the default. Reference: `reference/liquid-glass.png` and `reference/liquid-glass.standalone.html` (plain HTML and CSS you can open in a browser, with exact measurements). Ignore the wallpaper, the colourful window behind and the taskbar; they are only context. Tokens: `themes/liquid-glass.json`.

### B1. Theme system changes
- Add `themes/liquid-glass.json` to the store. Extend the schema and validator with the new `glass` group and `layout.windowPadding`, `layout.tileHeight`, `layout.valueTileHeight`. Flatten to `--flank-glass-*` CSS variables as before. Missing keys fall back to Paper.
- Components must not hard-code anything glass-specific; they read tokens only.

### B2. Layer recipe (inside the single rounded shape, bottom to top)
1. Backdrop layer (see B3).
2. Tint: `rgba(tintRgb, tintAlpha)`.
3. Sheen: top highlight gradient, height `sheenHeight`, **same border radius as the shape** (a larger bottom radius makes CSS scale all radii down and the corners bulge outside the shape).
4. Rim light: a 1.5px gradient border drawn with an overlay that uses `padding: 1.5px` and `mask-composite: exclude`, pointer-events none.
5. Inset shadows for the top specular line, bottom line and inner glow, plus the outer shadow that fits inside `windowPadding`.
6. Content, in a `position: relative` wrapper so overlays never paint over text.

Active tile: lighter inner capsule (`tileActiveBg`, `tileActiveShadow`). Badges use the accent with `accentInk`. Hourly chips in the weather card use `chipBg`, and the current hour uses `chipActiveBg`.

### B3. Backdrop (important limitation)
The window is transparent, so CSS `backdrop-filter` only blurs Flank's own page, not the desktop. Implement `glass.mode`:
- `wallpaper-sampled` (default): read the current wallpaper (Windows `SystemParametersInfo(SPI_GETDESKWALLPAPER)`, and the transcoded wallpaper cache for slideshows), apply the fit mode (fill, fit, stretch, tile, span) per monitor, downscale to about 25%, blur once, cache per monitor. Draw it as the glass layer's background with `background-size` equal to the monitor size and `background-position` equal to minus the shape's screen position, and apply `saturate(glass.saturate)`. Update when the window moves, the monitor or DPI changes, or the wallpaper changes. This keeps perfectly rounded corners. It does not blur other app windows behind the dock, which is an accepted limit.
- `flat`: tint only, no blur. Used when sampling fails.
- Do not use acrylic or mica for this theme; they paint a rectangle. If you want to try real live blur later, do it as a separate opt-in experiment behind a rounded region, and test its edge quality first.

### B4. Legibility, accessibility, performance
- Adaptive tint: compute the mean colour of the blurred wallpaper under the shape and choose the smallest alpha between `tintAlphaMin` and `tintAlphaMax` that gives white text at least 4.5:1 on the mixed colour. If even the max fails, use the max and apply `textShadowWhenLowContrast`. The user's "Glass tint" setting can raise the alpha but never go below the computed minimum.
- If Windows "Transparency effects" is off, or forced colours is on, use `solidFallbackBg` with no blur and no translucency.
- Keep the visible focus ring, 40px hit areas, accessible names with live values, and reduced-motion support.
- Motion: card in with 220ms, scale from 0.96 and 10px travel; tile press scales to 0.96; no animated blur radius. Respect reduced motion.
- Only the dock and the open card get glass layers; keep the number of blurred layers low.

## Definition of done
- Part A: all windows, all themes, no square or dark edges on magenta, white and black wallpapers at 100%, 125%, 150%, 200%.
- Part B: Liquid Glass matches the reference within a few pixels, switches in and out at runtime without a reload, passes the contrast check against light and dark wallpapers, and falls back cleanly.
- No visual literals in component code. Notes on anything you decided yourself go in `docs/design/DECISIONS.md`.

Report after Part A (with screenshots and the diagnosis), then after Part B.
