/**
 * Flank Collapsible Dock State Manager (Part B)
 * Backed by DockCollapseMachine & FlyoutCardMachine for deterministic transitions.
 */

import { flankMachines, type DockPhase, type CollapseReason } from '../state/machines.ts';

export type DockState = DockPhase;

let isReducedMotion = false;
let collapseTimer: number | null = null;

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
  if (prev === next) return;

  flankMachines.dockCollapse.send({ type: 'SYNC_HOST', phase: next, reason });

  const root = document.documentElement;
  root.setAttribute('data-dock-state', next);

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
      flankMachines.dockCollapse.send({ type: 'COLLAPSE_ANIMATION_DONE' });
      try {
        (window as any).pywebview?.api?.dock_collapse_done?.();
      } catch {
        setDockState('collapsed');
      }
    }, duration);
  } else if (next === 'expanding') {
    collapseTimer = window.setTimeout(() => {
      collapseTimer = null;
      flankMachines.dockCollapse.send({ type: 'EXPAND_ANIMATION_DONE' });
      try {
        (window as any).pywebview?.api?.dock_expand_done?.();
      } catch {
        setDockState('expanded');
      }
    }, duration);
  }
}

export function toggleDockCollapse(): void {
  const phase = getDockState();
  if (phase === 'expanded' || phase === 'expanding') {
    setDockState('collapsing', 'manual');
  } else {
    try {
      (window as any).pywebview?.api?.expand_dock?.();
    } catch {
      setDockState('expanding');
    }
  }
}
