/**
 * Flank Collapsible Dock State Manager (Part B)
 * Backed by DockCollapseMachine & FlyoutCardMachine for deterministic transitions.
 */

import { flankMachines, type DockPhase, type CollapseReason } from '../state/machines.ts';

export type DockState = DockPhase;

let isReducedMotion = false;
let collapseTimer: number | null = null;
let stateChangeListener: ((state: DockState) => void) | null = null;

export function onDockStateChange(listener: (state: DockState) => void): void {
  stateChangeListener = listener;
}

export function getDockState(): DockState {
  return flankMachines.dockCollapse.getPhase();
}

export function isDockCollapsed(): boolean {
  return flankMachines.dockCollapse.isCollapsedOrCollapsing();
}

export function initDockState(initialState: DockState = 'expanded'): void {
  flankMachines.dockCollapse.send({ type: 'SYNC_HOST', phase: initialState });
  isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const root = document.documentElement;
  root.setAttribute('data-dock-state', getDockState());

  // Expose global for Python host communication & AX diagnostics
  (window as any).flankSetDockState = (state: DockState, reason?: CollapseReason) => {
    setDockState(state, reason);
  };
  (window as any).flankGetDockState = () => getDockState();
  (window as any).flankGetStateMachines = () => flankMachines.getDiagnostics();
}

export function setDockState(next: DockState, reason?: CollapseReason): void {
  const prev = getDockState();
  const root = document.documentElement;
  const domState = root.getAttribute('data-dock-state');

  flankMachines.dockCollapse.send({ type: 'SYNC_HOST', phase: next, reason });
  root.setAttribute('data-dock-state', next);

  if (prev === next && domState === next) {
    return;
  }

  if (collapseTimer !== null) {
    clearTimeout(collapseTimer);
    collapseTimer = null;
  }

  const duration = isReducedMotion ? 0 : 220;

  if (next === 'collapsing' || next === 'collapsed') {
    // UX Invariant: Collapsing the dock immediately closes any open or pinned flyout card
    flankMachines.flyoutCard.send({ type: 'FORCE_CLOSE' });
  }

  if (next === 'collapsing') {
    try {
      (window as any).pywebview?.api?.close_hover_card?.();
    } catch { }
    collapseTimer = window.setTimeout(() => {
      collapseTimer = null;
      setDockState('collapsed', reason);
      try {
        (window as any).pywebview?.api?.dock_collapse_done?.();
      } catch { }
    }, duration);
  } else if (next === 'expanding') {
    collapseTimer = window.setTimeout(() => {
      collapseTimer = null;
      setDockState('expanded');
      try {
        (window as any).pywebview?.api?.dock_expand_done?.();
      } catch { }
    }, duration);
  }

  stateChangeListener?.(next);
}

export function collapseDock(reason: CollapseReason = 'manual'): void {
  const phase = getDockState();
  if (phase === 'collapsed' || phase === 'collapsing') return;
  setDockState('collapsing', reason);
}

export function expandDock(): void {
  const phase = getDockState();
  if (phase === 'expanded' || phase === 'expanding') return;
  setDockState('expanding');
  try {
    (window as any).pywebview?.api?.expand_dock?.();
  } catch { }
}

export function toggleDockCollapse(): void {
  const phase = getDockState();
  if (phase === 'expanded' || phase === 'expanding') {
    collapseDock('manual');
  } else {
    expandDock();
  }
}
