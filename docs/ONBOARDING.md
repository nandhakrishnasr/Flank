# Flank First-Run Onboarding (5 Screens)

When Flank launches for the first time, it opens a 5-step setup window (`880 x 600` logical px, centered on the primary display) before revealing the dock. The onboarding chrome is always styled with warm **Paper** tokens (`--flank-*`), while the right-hand DOM preview panel updates live to reflect the user's chosen screen edge, theme, accent colour, and widgets.

---

## 1. Settings Keys (`%APPDATA%/Flank/settings.json`)

Onboarding state and user choices are persisted in `%APPDATA%/Flank/settings.json` (and mirrored to `%APPDATA%/Flank/config.json` for backward compatibility):

```json
{
  "themeId": "paper",
  "edgeOverride": "right",
  "accentOverride": "#2F4BFF",
  "autostart": true,
  "dockState": "expanded",
  "collapseHotkey": "Ctrl+Alt+F",
  "onboarding": {
    "completed": true,
    "version": 1,
    "completedAt": "2026-11-08T18:30:00Z"
  },
  "items": [
    "...DockItem[]"
  ]
}
```

### First-Run Rules
- **Startup check**: If `onboarding.completed !== true`, or if `settings.json` is missing or contains corrupt JSON, Flank treats the launch as a first run, keeps `#dock` hidden, and opens `#modal` with `body[data-view="onboarding"]`.
- **Skip setup** (Steps 1–4 or closing the window with `X` / `Alt+F4` before finishing): Applies defaults (`Right` edge, `Paper` theme, `#2F4BFF` blue accent, 6 recommended widgets), sets `onboarding.completed = true`, hides `#modal`, and shows `#dock` in its expanded state.
- **Open my dock** (Step 5): Writes all selected preferences (`themeId`, `edgeOverride`, `accentOverride`, `autostart`, `items`, `dockState: "expanded"`, `onboarding.completed: true`) in a single settings write, applies the Windows autostart registry entry (`HKCU\Software\Microsoft\Windows\CurrentVersion\Run\Flank`) via `winreg`, hides `#modal`, and shows `#dock` in its expanded state.
- **Replay setup** (`Settings > About > Replay setup`): Reopens onboarding with the user's current settings pre-selected. Finishing updates the selected preferences without resetting custom dock items or unrelated settings.

---

## 2. CLI Flag & Environment Variable

To force the onboarding flow for QA without modifying `%APPDATA%/Flank/settings.json`:

```powershell
# Using the CLI flag
python host/main.py --onboarding

# Or using the environment variable
$env:FLANK_FORCE_ONBOARDING="1"
python host/main.py
```

For standalone browser/Playwright inspection, `public/index.html` also supports URL query parameters:
- `?view=onboarding&step=1..5`
- `&edge=left|right`
- `&obTheme=paper|liquid-glass|aurora|nord|terminal|rail|glass`
- `&obAccent=%232F4BFF`
- `&expanded=1` (expands the `+ 2 more` theme tiles on Step 3)
- `&replay=1`

---

## 3. File Layout

```text
src/ui/onboarding/
├── onboarding.ts        # OnboardingMachine state machine, settings parser, shell & footer renderer
├── onboarding.css       # Scoped onboarding styles (copied to public/onboarding.css on build)
├── preview.ts           # Live right-hand DOM preview mock (scoped --flank-* theme & accent vars)
└── steps/
    ├── welcome.ts       # Step 1: Welcome
    ├── edge.ts          # Step 2: Screen edge (Left / Right radiogroup)
    ├── look.ts          # Step 3: Look (Theme grid + "+ 2 more" + Accent swatches + custom picker)
    ├── widgets.ts       # Step 4: Widgets (8 popular widgets, live counter, 12-item cap)
    └── ready.ts         # Step 5: All set (Hotkeys from settings, Windows autostart switch)

tests/
└── onboarding.test.ts   # Unit tests for first-run detection, skip, finish, replay, 0-widget guard, 12-item cap

docs/screens/onboarding/
├── step-1-welcome-100pct.png
├── step-2-edge-right-100pct.png
├── step-2-edge-left-100pct.png
├── step-3-look-paper-100pct.png
├── step-3-look-terminal-100pct.png
├── step-4-widgets-100pct.png
├── step-5-ready-100pct.png
├── step-1-welcome-150pct.png
├── step-2-edge-right-150pct.png
├── step-2-edge-left-150pct.png
├── step-3-look-paper-150pct.png
├── step-3-look-terminal-150pct.png
├── step-4-widgets-150pct.png
└── step-5-ready-150pct.png
```

---

## 4. QA Checklist

- [ ] **First-run detection**: Delete or corrupt `%APPDATA%/Flank/settings.json` and launch `python host/main.py`. Confirm the dock stays hidden and the `880 x 600` onboarding window opens centered on the primary display.
- [ ] **CLI override**: Run `python host/main.py --onboarding` when `onboarding.completed` is already `true`. Confirm onboarding opens.
- [ ] **Paper chrome invariance**: On Step 3, switch between `Paper`, `Liquid Glass`, `Aurora`, `Nord`, `Terminal`, `Rail`, and `Glass`. Confirm the left column chrome remains in `Paper` while the right-hand preview switches theme and accent live (`160 ms`).
- [ ] **Edge animation**: On Step 2, switch between `Left edge` and `Right edge`. Confirm the preview dock animates across in `240 ms` and the opposite edge shows the dashed ghost outline and `"Moves to the right/left edge"` pill.
- [ ] **Widget counter & guards**: On Step 4, toggle widgets and confirm `"X of 8 selected. The dock holds up to 12 items."` updates live and rebuilds the preview dock. Turn all 8 widgets off and confirm `"Turn on at least one widget"` appears and `Continue` is disabled.
- [ ] **Hotkeys & autostart on Step 5**: Confirm Step 5 displays the configured hide hotkey (`Ctrl+Alt+F`) and clipboard hotkey (`Ctrl+Alt+V`) as keycaps, and shows the collapsed edge tab with the dark callout in the preview.
- [ ] **Keyboard-only navigation**:
  - `Enter` triggers the primary button (`Get started` / `Continue` / `Open my dock`).
  - `Alt+Left` navigates `Back`.
  - Arrow keys navigate `role="radiogroup"` controls with roving `tabindex`.
  - `Escape` closes the custom colour popover on Step 3 and never accidentally skips onboarding.
  - On every step change, focus moves to the step `H1` (`tabindex="-1"`).
- [ ] **Skip setup & X close**: Click `Skip setup` on Steps 1–4 (or close the window with `X` / `Alt+F4`) and confirm defaults (`Right` edge, `Paper` theme, `#2F4BFF` accent, 6 default widgets) are applied and the dock opens.
- [ ] **Subsequent launch & Replay**: Relaunch Flank and confirm it goes straight to the dock. Open `Settings > About > Replay setup` and confirm onboarding reopens with current settings pre-selected.
