import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_ONBOARDING_WIDGETS,
  OnboardingMachine,
  isFirstRunSettings,
  parseSettingsStore,
  renderOnboardingHtml,
} from '../src/ui/onboarding/onboarding.ts';
import { createSampleState } from '../src/providers/sample.ts';

describe('Onboarding State Machine & First-Run Logic', () => {
  it('detects first run when onboarding key is missing or completed !== true', () => {
    assert.equal(isFirstRunSettings(null), true);
    assert.equal(isFirstRunSettings(undefined), true);
    assert.equal(isFirstRunSettings({}), true);
    assert.equal(isFirstRunSettings({ themeId: 'paper' }), true);
    assert.equal(isFirstRunSettings({ onboarding: { completed: false, version: 1 } }), true);
    assert.equal(
      isFirstRunSettings({
        onboarding: { completed: true, version: 1, completedAt: '2026-11-08T18:00:00Z' },
      }),
      false
    );
  });

  it('treats missing, empty, or corrupt settings.json as first run without throwing', () => {
    const missing = parseSettingsStore(null);
    assert.equal(missing.isFirstRun, true);
    assert.equal(missing.corrupt, false);

    const empty = parseSettingsStore('   ');
    assert.equal(empty.isFirstRun, true);
    assert.equal(empty.corrupt, false);

    const corruptJson = parseSettingsStore('{ "themeId": "paper", BAD_JSON ');
    assert.equal(corruptJson.isFirstRun, true);
    assert.equal(corruptJson.corrupt, true);

    const corruptArray = parseSettingsStore('[1, 2, 3]');
    assert.equal(corruptArray.isFirstRun, true);
    assert.equal(corruptArray.corrupt, true);

    const validCompleted = parseSettingsStore(
      JSON.stringify({ onboarding: { completed: true, version: 1 } })
    );
    assert.equal(validCompleted.isFirstRun, false);
    assert.equal(validCompleted.corrupt, false);
  });

  it('skip at each step (steps 1-4) applies defaults and marks onboarding completed', () => {
    for (const step of [1, 2, 3, 4] as const) {
      const m = new OnboardingMachine();
      m.goToStep(step);
      m.setEdge('left');
      m.setTheme('terminal');
      m.setAccent('#2E9B68');

      const { prefsPatch, snapshot } = m.skip();
      assert.equal(snapshot.completed, true);
      assert.equal(snapshot.skipped, true);
      assert.equal(prefsPatch.themeId, 'paper');
      assert.equal(prefsPatch.edgeOverride, 'right');
      assert.equal(prefsPatch.accentOverride, '#2F4BFF');
      assert.equal(prefsPatch.dockState, 'expanded');

      const ob = prefsPatch.onboarding as { completed: boolean; version: number };
      assert.equal(ob.completed, true);
      assert.equal(ob.version, 1);

      const items = prefsPatch.items as Array<{
        id: string;
        kind: string;
        widgetKind?: string;
        enabled: boolean;
      }>;
      const enabledWidgets = items
        .filter((it) => it.kind === 'widget' && it.enabled)
        .map((it) => it.widgetKind);
      assert.deepEqual(
        new Set(enabledWidgets),
        new Set(DEFAULT_ONBOARDING_WIDGETS)
      );
    }
  });

  it('walks through all 5 steps and finishes with user choices in a single patch', () => {
    const m = new OnboardingMachine();
    assert.equal(m.getSnapshot().step, 1);

    m.next();
    assert.equal(m.getSnapshot().step, 2);
    assert.equal(m.getSnapshot().direction, 'next');
    m.setEdge('left');

    m.next();
    assert.equal(m.getSnapshot().step, 3);
    m.setTheme('terminal');
    m.setAccent('#7C4DFF');

    m.next();
    assert.equal(m.getSnapshot().step, 4);
    m.toggleWidget('calendar'); // Turn Agenda on (7 selected)

    m.next();
    assert.equal(m.getSnapshot().step, 5);
    m.setAutostart(false);

    const { prefsPatch, snapshot } = m.finish();
    assert.equal(snapshot.completed, true);
    assert.equal(snapshot.skipped, false);
    assert.equal(prefsPatch.edgeOverride, 'left');
    assert.equal(prefsPatch.themeId, 'terminal');
    assert.equal(prefsPatch.accentOverride, '#7C4DFF');
    assert.equal(prefsPatch.autostart, false);
    assert.equal(prefsPatch.dockState, 'expanded');

    const ob = prefsPatch.onboarding as { completed: boolean; version: number };
    assert.equal(ob.completed, true);
    assert.equal(ob.version, 1);
  });

  it('replay setup pre-selects current settings and preserves non-onboarding items on finish', () => {
    const sample = createSampleState();
    const customApp = {
      id: 'custom-figma',
      group: 'apps' as const,
      kind: 'app' as const,
      label: 'Figma',
      shortCode: 'fg',
      icon: 'browser',
      target: 'https://figma.com',
      shortcut: 'Alt+5',
      enabled: true,
    };
    const itemsWithCustom = [customApp, ...sample.items];

    const m = new OnboardingMachine({
      replay: true,
      edge: 'left',
      themeId: 'rail',
      accent: '#E03E7A',
      autostart: false,
      items: itemsWithCustom,
      hideHotkey: 'Ctrl+Shift+F',
      clipboardHotkey: 'Ctrl+Shift+V',
    });

    const snap = m.getSnapshot();
    assert.equal(snap.replay, true);
    assert.equal(snap.edge, 'left');
    assert.equal(snap.themeId, 'rail');
    assert.equal(snap.themesExpanded, true); // Rail is in "+ 2 more" so it auto-expands
    assert.equal(snap.accent, '#E03E7A');
    assert.equal(snap.autostart, false);
    assert.equal(snap.hideHotkey, 'Ctrl+Shift+F');
    assert.equal(snap.clipboardHotkey, 'Ctrl+Shift+V');

    const { prefsPatch } = m.finish();
    const outItems = prefsPatch.items as typeof itemsWithCustom;
    const preservedCustom = outItems.find((i) => i.id === 'custom-figma');
    assert.ok(preservedCustom);
    assert.equal(preservedCustom.enabled, true);
  });

  it('blocks Continue on Step 4 when all widgets are turned off', () => {
    const m = new OnboardingMachine();
    m.goToStep(4);
    assert.equal(m.canContinue(), true);

    for (const kind of [...m.getSnapshot().selectedWidgets]) {
      m.toggleWidget(kind);
    }

    assert.equal(m.getSnapshot().selectedWidgets.length, 0);
    assert.equal(m.canContinue(), false);

    // Calling next() while all widgets are off must stay on Step 4
    m.next();
    assert.equal(m.getSnapshot().step, 4);

    // Turning at least one widget back on re-enables Continue
    m.toggleWidget('weather');
    assert.equal(m.canContinue(), true);
    m.next();
    assert.equal(m.getSnapshot().step, 5);
  });

  it('enforces the 12-item dock cap when toggling widgets', () => {
    // Suppose user has 6 non-onboarding items (e.g., 6 apps) enabled -> max 6 widgets allowed
    const m = new OnboardingMachine({
      baseItemCount: 6,
      maxDockItems: 12,
      selectedWidgets: ['weather', 'battery', 'audio', 'focus', 'clock', 'clipboard'],
    });
    m.goToStep(4);

    // Trying to enable a 7th widget (which would make 6 + 7 = 13 > 12) must be rejected
    const res = m.toggleWidget('calendar');
    assert.equal(res.ok, false);
    assert.equal(res.reason, 'cap_reached');
    assert.equal(res.snapshot.selectedWidgets.length, 6);
    assert.equal(res.snapshot.capReachedWarning, true);

    // Turning off one widget allows enabling Agenda
    m.toggleWidget('clipboard');
    const res2 = m.toggleWidget('calendar');
    assert.equal(res2.ok, true);
    assert.equal(res2.snapshot.selectedWidgets.length, 6);
  });

  it('Escape closes custom color popover without skipping onboarding', () => {
    const m = new OnboardingMachine();
    m.goToStep(3);
    m.toggleCustomColorPopover(true);
    assert.equal(m.getSnapshot().customColorPopoverOpen, true);

    const esc1 = m.handleEscape();
    assert.equal(esc1.closedPopover, true);
    assert.equal(esc1.skipped, false);
    assert.equal(m.getSnapshot().customColorPopoverOpen, false);
    assert.equal(m.getSnapshot().completed, false);

    const esc2 = m.handleEscape();
    assert.equal(esc2.closedPopover, false);
    assert.equal(esc2.skipped, false);
    assert.equal(m.getSnapshot().completed, false);
  });

  it('renders all 5 steps and scoped preview HTML cleanly', () => {
    const m = new OnboardingMachine();
    for (const step of [1, 2, 3, 4, 5] as const) {
      m.goToStep(step);
      const html = renderOnboardingHtml(m);
      assert.ok(html.includes(`data-ob-step="${step}"`));
      assert.ok(html.includes(`aria-label="Step ${step} of 5"`));
      assert.ok(html.includes('aria-hidden="true"'));
    }
  });
});
