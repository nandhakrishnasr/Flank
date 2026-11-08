import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DockCollapseMachine,
  FlyoutCardMachine,
  PointerInteractionMachine,
  ShortcutRecorderMachine,
  FocusTimerMachine,
  flankMachines,
} from '../src/state/machines.ts';

test('DockCollapseMachine: preserves manual collapse when fullscreen exits', () => {
  const dock = new DockCollapseMachine();
  assert.equal(dock.getSnapshot().phase, 'expanded');
  assert.equal(dock.canShowFlyout(), true);

  // User manually collapses the dock
  dock.send({ type: 'COLLAPSE', reason: 'manual' });
  assert.equal(dock.getSnapshot().phase, 'collapsing');
  assert.equal(dock.getSnapshot().reason, 'manual');
  assert.equal(dock.canShowFlyout(), false);

  dock.send({ type: 'COLLAPSE_ANIMATION_DONE' });
  assert.equal(dock.getSnapshot().phase, 'collapsed');

  // Exiting a fullscreen game should NOT auto-expand a manually collapsed dock
  dock.send({ type: 'EXPAND', trigger: 'fullscreen_exit' });
  assert.equal(dock.getSnapshot().phase, 'collapsed');
  assert.equal(dock.getSnapshot().reason, 'manual');

  // User manually expands
  dock.send({ type: 'EXPAND', trigger: 'manual' });
  assert.equal(dock.getSnapshot().phase, 'expanding');
  dock.send({ type: 'EXPAND_ANIMATION_DONE' });
  assert.equal(dock.getSnapshot().phase, 'expanded');
  assert.equal(dock.getSnapshot().reason, 'none');
});

test('DockCollapseMachine: auto-expands on fullscreen exit when collapsed by fullscreen', () => {
  const dock = new DockCollapseMachine();
  dock.send({ type: 'COLLAPSE', reason: 'fullscreen' });
  dock.send({ type: 'COLLAPSE_ANIMATION_DONE' });
  assert.equal(dock.getSnapshot().phase, 'collapsed');
  assert.equal(dock.getSnapshot().reason, 'fullscreen');

  dock.send({ type: 'EXPAND', trigger: 'fullscreen_exit' });
  assert.equal(dock.getSnapshot().phase, 'expanding');
  dock.send({ type: 'EXPAND_ANIMATION_DONE' });
  assert.equal(dock.getSnapshot().phase, 'expanded');
});

test('FlyoutCardMachine: blocks hover when dock is collapsed or pointer is busy, and protects pinned cards', () => {
  const card = new FlyoutCardMachine();
  assert.equal(card.getSnapshot().phase, 'closed');

  // Ignored when dockExpanded is false
  card.send({
    type: 'HOVER_TILE',
    widget: 'weather',
    dockExpanded: false,
    modalOpen: false,
    pointerBusy: false,
  });
  assert.equal(card.getSnapshot().phase, 'closed');

  // Opens when dockExpanded is true and pointer is idle
  card.send({
    type: 'HOVER_TILE',
    widget: 'weather',
    dockExpanded: true,
    modalOpen: false,
    pointerBusy: false,
  });
  assert.equal(card.getSnapshot().phase, 'hovering');
  assert.equal(card.getSnapshot().widget, 'weather');

  // Leaving dock enters grace_closing
  card.send({ type: 'LEAVE_DOCK_OR_CARD' });
  assert.equal(card.getSnapshot().phase, 'grace_closing');

  // Entering card cancels grace close
  card.send({ type: 'ENTER_CARD' });
  assert.equal(card.getSnapshot().phase, 'hovering');

  // Pinning the card locks it against accidental hover changes or pointerout
  card.send({ type: 'TOGGLE_PIN', widget: 'weather', dockExpanded: true, modalOpen: false });
  assert.equal(card.getSnapshot().phase, 'pinned');
  assert.equal(card.isPinned(), true);

  card.send({
    type: 'HOVER_TILE',
    widget: 'clock',
    dockExpanded: true,
    modalOpen: false,
    pointerBusy: false,
  });
  assert.equal(card.getSnapshot().phase, 'pinned');
  assert.equal(card.getSnapshot().widget, 'weather');

  card.send({ type: 'LEAVE_DOCK_OR_CARD' });
  assert.equal(card.getSnapshot().phase, 'pinned');

  // Force close (e.g. dock collapsing or modal opening) closes even pinned cards
  card.send({ type: 'FORCE_CLOSE' });
  assert.equal(card.getSnapshot().phase, 'closed');
  assert.equal(card.getSnapshot().widget, null);
});

test('PointerInteractionMachine: prevents window drag and hover cards during slider scrub or tile reorder', () => {
  const pointer = new PointerInteractionMachine();
  assert.equal(pointer.canTriggerHoverCard(), true);
  assert.equal(pointer.canStartWindowDrag(), true);

  pointer.send({ type: 'START_SLIDER_SCRUB', controlId: 'flank-hue-slider' });
  assert.equal(pointer.getSnapshot().mode, 'scrubbing_slider');
  assert.equal(pointer.canTriggerHoverCard(), false);
  assert.equal(pointer.canStartWindowDrag(), false);

  // Attempting to start window drag while scrubbing slider is rejected
  pointer.send({ type: 'START_WINDOW_DRAG' });
  assert.equal(pointer.getSnapshot().mode, 'scrubbing_slider');

  pointer.send({ type: 'END_INTERACTION' });
  assert.equal(pointer.getSnapshot().mode, 'idle');
  assert.equal(pointer.canStartWindowDrag(), true);
});

test('ShortcutRecorderMachine: transitions through listening, validating, conflict, and commit/cancel', () => {
  const rec = new ShortcutRecorderMachine();
  assert.equal(rec.isActive(), false);

  rec.send({ type: 'START_RECORDING', targetId: 'tile-clipboard' });
  assert.equal(rec.getSnapshot().phase, 'listening');
  assert.equal(rec.shouldConsumeEscapeKey(), true);

  rec.send({ type: 'CAPTURE_COMBO', combo: 'Ctrl+Alt+V' });
  assert.equal(rec.getSnapshot().phase, 'validating');
  assert.equal(rec.getSnapshot().candidateCombo, 'Ctrl+Alt+V');

  rec.send({ type: 'MARK_CONFLICT', message: 'Already assigned' });
  assert.equal(rec.getSnapshot().phase, 'conflict');
  assert.equal(rec.shouldConsumeEscapeKey(), true);

  // User presses another key combo after conflict
  rec.send({ type: 'CAPTURE_COMBO', combo: 'Ctrl+Shift+V' });
  assert.equal(rec.getSnapshot().phase, 'validating');

  rec.send({ type: 'COMMIT_SUCCESS' });
  assert.equal(rec.getSnapshot().phase, 'idle');
  assert.equal(rec.isActive(), false);
});

test('FocusTimerMachine: deterministic Pomodoro focus/break lifecycle and auto-transition on tick zero', () => {
  const timer = new FocusTimerMachine(1, 0);
  assert.equal(timer.getSnapshot().phase, 'idle');
  assert.equal(timer.getSnapshot().remainingSec, 60);

  timer.send({ type: 'TOGGLE' });
  assert.equal(timer.getSnapshot().phase, 'running_focus');

  for (let i = 0; i < 59; i++) {
    timer.send({ type: 'TICK' });
  }
  assert.equal(timer.getSnapshot().remainingSec, 1);

  // Final tick completes focus session
  timer.send({ type: 'TICK' });
  assert.equal(timer.getSnapshot().phase, 'idle');
  assert.equal(timer.getSnapshot().sessionsCompleted, 1);
  assert.equal(timer.getSnapshot().remainingSec, 60);
});

test('flankMachines: getDiagnostics returns complete AX/DX snapshot', () => {
  const diag = flankMachines.getDiagnostics();
  assert.equal(typeof diag.dockCollapse.phase, 'string');
  assert.equal(typeof diag.flyoutCard.phase, 'string');
  assert.equal(typeof diag.pointerInteraction.mode, 'string');
  assert.equal(typeof diag.shortcutRecorder.phase, 'string');
  assert.equal(typeof diag.focusTimer.phase, 'string');
});
