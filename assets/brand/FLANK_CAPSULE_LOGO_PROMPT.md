# Prompt for Antigravity: replace the bird logo with the capsule F brand

Attach `flank-capsule-brand.zip` (and `preview.png` from it) to this prompt.

---

You are working on **Flank**, a Windows 11 vertical dock and widget flyout app (Python 3.14 + pywebview/WebView2 host in `host/main.py`, vanilla TypeScript in `src/`, bundled by esbuild to `public/bundle.js`, styles in `public/tokens.css` and `public/components.css`, themes in `themes/*.json`, packaging in `scripts/build_executable.py` and `scripts/generate_icon.py`). One HTML entry serves three windows by `body[data-view]`: `#dock` (dock and collapsed edge tab), `#card` (flyout), `#modal` (Settings and full windows).

**Task:** the app has a new logo, a capital F inside a vertical capsule (the dock shape). It replaces the bird mascot everywhere. Integrate the attached brand package, remove every use of the old bird, and verify each place visually.

Constraints:
- Do not touch window transparency or windowing code (`setup_transparency`, DWM, GDI regions, wallpaper sampling). Never call `DeleteObject()` on a region passed to `SetWindowRgn`.
- Keep the single-window collapse tab, the tray menu, hotkeys, favicons and all settings working.
- Everything must work in all seven themes (Paper, Glass, Liquid Glass, Terminal, Rail, Nord, Aurora) and on both dock edges (left and right).
- Inline SVGs with `currentColor`, never `<img>`, wherever the glyph appears inside the UI, so they follow the theme text token (`--flank-color-text-primary` or `--flank-color-text-muted`).

## 1. Install the assets

Unzip `flank-capsule-brand` and copy files as follows. Keep the file names.

```
assets/brand/                      <- svg/*, png/*, tray/*, flank.ico, README.md
public/brand/                      <- svg/*.svg only (web-loadable copies)
assets/brand/legacy/               <- move the OLD bird files here (mascot, old icon, old glyph, old ico). Do not delete them.
```

Make sure the esbuild step, the PyInstaller spec in `scripts/build_executable.py` and the installer include `assets/brand` and `public/brand`. Replace `scripts/generate_icon.py` so it no longer generates from the bird SVG. It should just verify that `assets/brand/flank.ico` exists, or regenerate it from `flank-app-icon.svg` (frames 256, 128, 64, 48, 32, 24, 16, where 16 to 32 come from `flank-app-icon-small.svg`). Do not redraw or recolour any brand file.

## 2. Which file goes where

Size rule: the outlined versions (`flank-app-icon`, `flank-glyph`) are for 48 px (icon) or 24 px (glyph) and up. Below that always use the small and solid versions (`flank-app-icon-small`, `flank-glyph-solid`), because the outline gets too thin.

| Place | Asset | Notes |
|---|---|---|
| Exe icon, installer icon, uninstaller icon | `assets/brand/flank.ico` | PyInstaller `--icon`, and the installer script's icon setting. |
| Window icon of the dock, card and modal (taskbar, Alt+Tab, title bar of the OS window) | `flank.ico` | Set `form.Icon` from the .ico in the `shown` handlers. Resolve the path with a helper that works from source and from a frozen build. |
| System tray icon (`NotifyIcon`) | `assets/brand/tray/flank-tray-{16,20,24,32}-{dark,light}.png` | Pick the size from the current DPI (16 at 100%, 20 at 125%, 24 at 150%, 32 at 200%). Pick `dark` or `light` from the Windows taskbar theme (`HKCU\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize\SystemUsesLightTheme`): `dark` file when the taskbar is light, `light` file when it is dark. Re-evaluate when the theme changes (listen for `WM_SETTINGCHANGE` or poll every few seconds). Convert PNG to `Icon` with `System.Drawing.Bitmap.GetHicon`, and destroy the old handle when swapping. Fall back to `flank.ico` if anything fails. |
| Settings window title bar (`renderTitleBar` in `src/ui/windows.ts`) and the title bars of the other modal windows | `flank-glyph-solid.svg` inline, 18 px tall | Replace the old bird glyph. Colour from the text token. |
| Collapsed edge tab with "Show logo on tab" on | `flank-glyph-solid.svg` inline, 20 px tall | Replace the old glyph. Keep the 32 x 104 tab size from the earlier design. The chevron stays below it. |
| Settings, About page | `flank-lockup.svg` (or `flank-app-icon.svg` at 96 px above the name and version) | Replace the bird mascot illustration. Use `flank-lockup-light.svg` when the active theme surface is dark. |
| Empty states (clipboard, notes, widgets, agenda, search with no results) | `flank-glyph.svg` inline, 56 px, `--flank-color-text-muted`, 60% opacity | Replace the bird mascot. Keep the same short friendly text. |
| Loading and splash states if any | `flank-glyph-solid.svg` inline, 32 px, with the existing fade pulse | Replace the old logo. |
| `public/index.html` favicon | `flank-app-icon.svg` | `<link rel="icon" type="image/svg+xml" href="brand/flank-app-icon.svg">`, and remove old links. |
| Theme Store thumbnails and any previews that show a logo | `flank-glyph-solid.svg` inline | Only if a logo is shown. |
| README header, docs, GitHub social image | `png/flank-lockup-1600.png` and `png/flank-app-icon-1024.png` | Replace the bird images. |
| Dock itself | none | Do NOT add the logo to the dock face. The dock stays for the user's items. |

Search the whole repo for every remaining use of the old logo: `grep -ri "mascot\|bird\|flank-glyph\|flank-app-icon\|flank.ico" --include=*.{ts,css,html,py,md,json,spec,iss,nsi}` and fix each hit. Also check theme JSON files and docs (`docs/design/`).

## 3. Also add

1. A `Brand` helper in `src/ui/icons.ts` that exports `flankGlyph({ solid, size })` returning the inline SVG string, and a `flankLockup()` helper. All UI uses these helpers, not duplicated SVG strings.
2. A `brand` section in `tokens.css`: `--flank-brand-blue: #2F4BFF; --flank-brand-deep: #1E34C9; --flank-brand-amber: #F5A524; --flank-brand-ink: #1F1E1B; --flank-brand-paper: #FBFAF7`. Use them only where a brand colour (not a theme token) is needed, such as the lockup and the About page.
3. In `docs/design/BRAND.md`, copy the rules from the package README (size rule, clear space, minimum sizes, do and don't).

## 4. Verify (required)

1. Run `npm run build:ui` and `npm test`. Fix errors.
2. Run `python host/main.py` and confirm: the taskbar icon, Alt+Tab icon, tray icon (try both a dark and a light Windows theme, and 100% and 150% scaling), Settings title bar, About page, the collapsed tab with the logo option on, empty states and the favicon all show the new mark. No bird remains anywhere.
3. Build the installer (`python scripts/build_executable.py`) and confirm the exe, the installer and the shortcut show the new icon (note: Windows caches icons, so clear the icon cache or rename the exe if the old icon still shows, and tell me).
4. Screenshot each place above in Paper and Liquid Glass and put them in `docs/screens/brand/`. Check that the glyph is readable on every theme, with no clipped edges and no blurry rendering at 125% and 150% scaling.
5. List anything you could not verify.

Finish with: the files changed, a table of place, asset and size actually used, and the screenshot list.
