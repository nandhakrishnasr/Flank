# Prompt for the coding agent

Copy everything below the line into your coding agent. Put this package folder in the repo (for example `docs/design/`) so the agent can read it.

---

You are building **Flank**, a second dock for Windows (an edge-attached bar of apps, links, clipboard history and live widgets such as weather, music, system stats and AI usage). A complete design package is in `docs/design/` (adjust the path if it lives elsewhere). Treat it as the source of truth for how Flank looks and behaves.

## Read first, in this order

1. `docs/design/DESIGN.md`: the design specification.
2. `docs/design/themes/paper.json`: the default theme tokens. Also read the other four theme files.
3. `docs/design/themes/tokens.css`: the tokens as CSS variables.
4. `docs/design/reference/*.dc.html`: mockup markup for each theme. Inline styles are exact measurements. Ignore the `support.js` script tag, the `<x-dc>` wrapper, the `<helmet>` tag, the `{{accent}}` placeholders and the trailing script block; they belong to the design tool. Never ship these files.

## Rules

1. **Paper is the default theme** and must look like `reference/paper.dc.html` when run with sample data.
2. **No hard-coded visual values in components.** Every colour, radius, shadow, font, spacing and motion value comes from theme tokens exposed as `--flank-<group>-<token>` CSS variables. Switching a theme means swapping the token set at runtime, with no reload.
3. **Build the theme engine first**, then components. Load a theme JSON, validate it against the schema in `DESIGN.md` section 8, flatten it to CSS variables, apply it, and fall back to Paper on any failure.
4. **The dock component must support all four shapes** (`pill`, `strip`, `rail`, `capsule`), all three edges (`left`, `right`, `top`), both orientations, and all four widget styles (`tile`, `row`, `value`, `pill`) from the start, because the theme store will switch between them. Verify by rendering each of the five themes.
5. **Follow the component specs** in `DESIGN.md` for tile states, badges, rings, bars, hover cards (with caret), the clipboard window, the stats card, the mini player card and the AI usage card.
6. **Icons** are inline SVG: 24x24 viewBox, `currentColor` stroke, theme-controlled stroke width, round caps and joins. No emoji. Bundle Inter, Fraunces and JetBrains Mono locally.
7. **Accessibility is required**: real buttons with accessible names that include live values, visible focus ring from the `focusRing` token, 40px minimum hit area, 4.5:1 text contrast, keyboard navigation, reduced-motion support, forced-colors support.
8. **Windows behaviour** from `DESIGN.md` section 7 applies: never steal focus, DPI and multi-monitor aware, system backdrop with the solid fallback token, registered hotkeys (default clipboard shortcut Ctrl+Alt+V, not Win+V), permissions requested only when the related widget is added, no telemetry.
9. **Do not copy any other product's name, copy, icons or screenshots.** The design is original.
10. **Use sample data only behind a clearly named preview/mock data source**, so real data providers can replace it without touching the UI.
11. If the spec and the reference disagree, follow the spec, except for pixel measurements, where the reference wins. If something is missing or ambiguous, choose the simplest option that matches the spec, record it in `docs/design/DECISIONS.md`, and keep going. Ask me only if the choice is hard to reverse.

## Work plan

1. Theme engine: schema, loader, validator (including the contrast check), CSS variable writer, runtime switcher, Paper fallback. Add unit tests for the validator and the contrast check.
2. Dock shell: window creation, edge docking, no-focus behaviour, layout driven by tokens. Render all five themes with static tiles.
3. Tiles and widgets with sample data: clipboard, weather, CPU, mini player, AI usage.
4. Hover cards with the slide-out motion and caret.
5. Clipboard history window.
6. Stats window.
7. Settings: Items (reorder, shortcuts), Appearance (theme picker with live preview, edge, accent override).
8. Real data providers, replacing the sample data source.

Do not start step N+1 until step N renders correctly in Paper and at least one alternate theme.

## Definition of done for each step

- Matches the reference for Paper within a few pixels (compare screenshots at 100% scale and at 150% DPI).
- Switching to Glass, Terminal, Rail and Aurora changes the look and layout with no code changes and no reload.
- No colour, radius, shadow, font-family or px spacing literal in component code (search for them).
- Keyboard-only use works. Contrast check passes for all five themes.
- A short note in `docs/design/DECISIONS.md` for anything you decided on your own.

At the end of each step, tell me what you built, what you decided, and what is next.
