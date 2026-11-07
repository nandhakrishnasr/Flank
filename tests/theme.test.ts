import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { BUNDLED_THEMES, PAPER_THEME } from '../src/theme/schema.ts';
import { contrastRatio, deriveAccentTokens, parseColor } from '../src/theme/contrast.ts';
import { validateTheme } from '../src/theme/validator.ts';
import { flattenThemeToCssVars } from '../src/theme/flattener.ts';
import { ThemeEngine } from '../src/theme/engine.ts';

describe('Flank Theme Engine & Validator', () => {
  it('validates all 7 bundled themes from JSON files without errors', () => {
    const themeFiles = [
      'paper.json',
      'glass.json',
      'nord.json',
      'terminal.json',
      'rail.json',
      'aurora.json',
      'liquid-glass.json',
    ];
    for (const file of themeFiles) {
      const fullPath = path.resolve('themes', file);
      const rawJson = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
      const res = validateTheme(rawJson);
      assert.equal(res.valid, true, `Expected ${file} to pass validation, got errors: ${res.errors.join('; ')}`);
      assert.equal(res.fellBackToPaper, false);
      assert.equal(res.failingPairs.length, 0);
    }
  });

  it('flattens liquid-glass tokens with glass group variables', () => {
    const raw = JSON.parse(fs.readFileSync(path.resolve('themes', 'liquid-glass.json'), 'utf-8'));
    const res = validateTheme(raw);
    assert.equal(res.valid, true);
    const vars = flattenThemeToCssVars(res.theme);
    assert.equal(vars['--flank-glass-display'], 'block');
    assert.equal(vars['--flank-glass-mode'], 'wallpaper-sampled');
    assert.equal(vars['--flank-glass-tint-rgb'], '16,20,42');
    assert.equal(vars['--flank-glass-blur'], '30px');
    assert.equal(vars['--flank-layout-window-padding'], '40px');
  });

  it('computes accurate WCAG 2.1 contrast ratios', () => {
    const black = parseColor('#000000')!;
    const white = parseColor('#ffffff')!;
    assert.equal(Number(contrastRatio(black, white).toFixed(2)), 21.0);

    const paperText = parseColor('#1f1e1b')!;
    const paperBg = parseColor('#fbfaf7')!;
    assert.ok(contrastRatio(paperText, paperBg) >= 15.0);

    const paperMuted = parseColor('#6b665c')!;
    assert.ok(contrastRatio(paperMuted, paperBg) >= 4.5);
  });

  it('rejects themes with low contrast and reports the exact failing pair, falling back to Paper', () => {
    const broken = structuredClone(PAPER_THEME);
    broken.id = 'low-contrast';
    broken.color.textMuted = '#e5e2dc'; // Too light on #fbfaf7
    broken.color.accent = '#ffffaa';
    broken.color.accentInk = '#ffffff'; // White on pale yellow < 4.5:1

    const res = validateTheme(broken);
    assert.equal(res.valid, false);
    assert.equal(res.fellBackToPaper, true);
    assert.equal(res.theme.id, 'paper');
    assert.ok(res.failingPairs.some((p) => p.pair === 'textMuted on dockBg'));
    assert.ok(res.failingPairs.some((p) => p.pair === 'accentInk on accent'));
  });

  it('enforces size limits (tile 28..56px, dockWidth 32..260px, cardWidth 240..360px)', () => {
    const oversized = structuredClone(PAPER_THEME);
    oversized.layout.tileSize = '72px';
    oversized.layout.dockWidth = '400px';
    oversized.surface.cardWidth = '500px';

    const res = validateTheme(oversized);
    assert.equal(res.valid, false);
    assert.equal(res.fellBackToPaper, true);
    assert.equal(res.theme.id, 'paper');
    assert.equal(res.errors.length, 3);
  });

  it('rejects remote URLs or script payloads in theme tokens', () => {
    const malicious = structuredClone(PAPER_THEME);
    malicious.surface.dockBg = 'url(https://evil.example.com/bg.png)';
    const res = validateTheme(malicious);
    assert.equal(res.valid, false);
    assert.equal(res.fellBackToPaper, true);
  });

  it('ignores unknown keys and fills missing keys from Paper', () => {
    const partial = {
      schema: 1,
      id: 'custom-minimal',
      name: 'Minimal Custom',
      mode: 'light',
      unknownTopLevelKey: 'ignored',
      layout: {
        edge: 'left',
        extraUnknownLayoutKey: 999,
      },
    };
    const res = validateTheme(partial);
    assert.equal(res.valid, true);
    assert.equal(res.theme.layout.edge, 'left');
    assert.equal(res.theme.layout.tileSize, '40px'); // From Paper fallback
    assert.equal(res.theme.color.accent, '#2F4BFF'); // From Paper fallback
  });

  it('flattens tokens to exact --flank-<group>-<token> CSS variables matching tokens.css', () => {
    const vars = flattenThemeToCssVars(BUNDLED_THEMES.paper);
    assert.equal(vars['--flank-layout-edge'], 'right');
    assert.equal(vars['--flank-layout-shape'], 'pill');
    assert.equal(vars['--flank-layout-labels'], '0');
    assert.equal(vars['--flank-layout-tile-size'], '40px');
    assert.equal(vars['--flank-surface-dock-bg'], '#fbfaf7');
    assert.equal(vars['--flank-color-accent'], '#2F4BFF');
    assert.equal(vars['--flank-motion-card-in-ms'], '160ms');
    assert.equal(vars['--flank-motion-card-travel-px'], '8px');

    const auroraVars = flattenThemeToCssVars(BUNDLED_THEMES.aurora);
    assert.equal(auroraVars['--flank-layout-labels'], '1');
    assert.equal(auroraVars['--flank-layout-window-padding'], '16px');
    assert.equal(auroraVars['--flank-color-accent2'], '#8b5cf6');
    assert.equal(auroraVars['--flank-color-accent-gradient'], 'linear-gradient(90deg,#f472b6,#8b5cf6)');
  });

  it('enforces shadow room rule: offsetY + blur <= layout.windowPadding', () => {
    const shadowExceeding = structuredClone(PAPER_THEME);
    shadowExceeding.id = 'huge-shadow';
    shadowExceeding.layout.windowPadding = '20px';
    // Paper cardShadow is '0 18px 44px rgba(60,50,30,0.18)' -> reach 62px > 20px
    const res = validateTheme(shadowExceeding);
    assert.equal(res.valid, false);
    assert.equal(res.fellBackToPaper, true);
    assert.ok(res.errors.some((e) => e.includes('cardShadow reach (62px) exceeds layout.windowPadding (20px)')));
  });

  it('supports runtime theme switching and accent overrides via ThemeEngine', () => {
    const engine = new ThemeEngine();
    assert.equal(engine.getCurrentTheme().id, 'paper');

    const glassRes = engine.switchTheme('glass');
    assert.equal(glassRes.valid, true);
    assert.equal(engine.getCurrentTheme().id, 'glass');

    const accentRes = engine.switchTheme('paper', { accent: '#0F766E', edge: 'left' });
    assert.equal(accentRes.valid, true);
    assert.equal(engine.getCurrentTheme().color.accent, '#0F766E');
    assert.equal(engine.getCurrentTheme().layout.edge, 'left');

    const derived = deriveAccentTokens('#5EEAD4');
    assert.ok(derived);
    assert.ok(derived.contrast >= 4.5);
  });
});

