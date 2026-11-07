/**
 * Flank Collapsible Dock State Manager (Part B)
 * Controls transitions between expanded dock and collapsed edge tab.
 */

export type DockState = 'expanded' | 'collapsing' | 'collapsed' | 'expanding';

let currentDockState: DockState = 'expanded';
let isReducedMotion = false;
let collapseTimer: number | null = null;

export function getDockState(): DockState {
  return currentDockState;
}

export function isDockCollapsed(): boolean {
  return currentDockState === 'collapsed' || currentDockState === 'collapsing';
}

export function initDockState(initialState: DockState = 'expanded'): void {
  currentDockState = initialState;
  isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const root = document.documentElement;
  root.setAttribute('data-dock-state', currentDockState);

  // Expose global for Python host communication
  (window as any).flankSetDockState = (state: DockState) => {
    setDockState(state);
  };
  (window as any).flankGetDockState = () => currentDockState;
}

export function setDockState(next: DockState): void {
  if (currentDockState === next) return;

  const root = document.documentElement;
  currentDockState = next;
  root.setAttribute('data-dock-state', next);

  if (collapseTimer !== null) {
    clearTimeout(collapseTimer);
    collapseTimer = null;
  }

  const duration = isReducedMotion ? 0 : 220;

  if (next === 'collapsing') {
    try {
      (window as any).pywebview?.api?.close_hover_card?.();
    } catch { }
    // Play slide-out animation, then notify host
    collapseTimer = window.setTimeout(() => {
      collapseTimer = null;
      try {
        (window as any).pywebview?.api?.dock_collapse_done?.();
      } catch {
        // Dev fallback
        setDockState('collapsed');
      }
    }, duration);
  } else if (next === 'expanding') {
    // Play slide-in animation, then notify host
    collapseTimer = window.setTimeout(() => {
      collapseTimer = null;
      try {
        (window as any).pywebview?.api?.dock_expand_done?.();
      } catch {
        // Dev fallback
        setDockState('expanded');
      }
    }, duration);
  }
}

export function toggleDockCollapse(): void {
  if (currentDockState === 'expanded' || currentDockState === 'expanding') {
    setDockState('collapsing');
  } else {
    try {
      (window as any).pywebview?.api?.expand_dock?.();
    } catch {
      setDockState('expanding');
    }
  }
}

