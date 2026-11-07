# Flank design package

A design kit for building Flank, a second dock for Windows.

## What is inside

| Path | What it is |
|---|---|
| `DESIGN.md` | The design specification. Source of truth. |
| `AGENT_PROMPT.md` | Prompt to paste into your coding agent. |
| `themes/paper.json` | Default theme tokens (light, warm, editorial). |
| `themes/glass.json`, `terminal.json`, `rail.json`, `aurora.json` | Alternate themes for the theme store. |
| `themes/tokens.css` | Every theme as CSS custom properties (`--flank-<group>-<token>`), one `[data-theme="<id>"]` block per theme. |
| `reference/` | Mockup markup for each theme, plus the clipboard window. |

## How to use it

1. Copy this folder into your repo, for example `docs/design/`.
2. Open `AGENT_PROMPT.md`, paste the part below the line into your coding agent, and adjust the path if you used a different folder.
3. Let the agent build the theme engine first, then the components.

## Reading the reference files

The `reference/*.dc.html` files come from a design tool. They are HTML with inline styles, so every measurement is exact. When reading them:

- Ignore the `<script src="./support.js">` tag, the `<x-dc>` wrapper, the `<helmet>` tag and the final `<script type="text/x-dc">` block.
- `{{accent}}`, `{{accentSoft}}` and `{{accentLine}}` are theme accent placeholders. Use the token values in `themes/*.json`.
- Wallpapers, background windows and taskbars in the mockups are context only. Do not build them.
- The files will not render as-is in a normal browser because the design tool's runtime is not included. Treat them as readable specifications, not as code to ship.

## Note on screenshots

This package has no screenshots. If your agent can render or compare images, export the artboards from the design canvas (Share, then Export) into a `reference/screenshots/` folder and mention it in the prompt.
