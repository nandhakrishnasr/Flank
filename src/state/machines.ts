/**
 * Flank Explicit Finite State Machines (UX + DX + AX)
 *
 * Centralizes the 5 core interactive lifecycles that were previously
 * represented as implicit booleans and timers across the host and UI:
 *   1. DockCollapseMachine      — expanded <-> collapsing <-> collapsed <-> expanding (+ reason)
 *   2. FlyoutCardMachine        — closed <-> hovering <-> grace_closing <-> pinned
 *   3. PointerInteractionMachine — idle | scrubbing_slider | reordering_dock | reordering_settings | dragging_window
 *   4. ShortcutRecorderMachine  — idle | listening | validating | conflict
 *   5. FocusTimerMachine        — idle | running_focus | paused_focus | running_break | paused_break
 */

import { type WidgetKind } from '../providers/types.ts';

// ============================================================================
// 1. DOCK COLLAPSE STATE MACHINE
// ============================================================================

export type DockPhase = 'expanded' | 'collapsing' | 'collapsed' | 'expanding';
export type CollapseReason = 'none' | 'manual' | 'idle' | 'fullscreen';

export interface DockCollapseSnapshot {
  phase: DockPhase;
  reason: CollapseReason;
}

export type DockCollapseEvent =
  | { type: 'COLLAPSE'; reason?: Exclude<CollapseReason, 'none'> }
  | { type: 'COLLAPSE_ANIMATION_DONE' }
  | { type: 'EXPAND'; trigger?: 'manual' | 'fullscreen_exit' }
  | { type: 'EXPAND_ANIMATION_DONE' }
  | { type: 'SYNC_HOST'; phase: DockPhase; reason?: CollapseReason };

export class DockCollapseMachine {
  private state: DockCollapseSnapshot = { phase: 'expanded', reason: 'none' };

  constructor(initialPhase: DockPhase = 'expanded', initialReason: CollapseReason = 'none') {
    this.state = {
      phase: initialPhase,
      reason: initialPhase === 'expanded' ? 'none' : initialReason === 'none' ? 'manual' : initialReason,
    };
  }

  getSnapshot(): DockCollapseSnapshot {
    return { ...this.state };
  }

  getPhase(): DockPhase {
    return this.state.phase;
  }

  isCollapsedOrCollapsing(): boolean {
    return this.state.phase === 'collapsed' || this.state.phase === 'collapsing';
  }

  canShowFlyout(): boolean {
    return this.state.phase === 'expanded';
  }

  send(event: DockCollapseEvent): DockCollapseSnapshot {
    switch (event.type) {
      case 'COLLAPSE': {
        if (this.state.phase === 'collapsed' || this.state.phase === 'collapsing') {
          return this.getSnapshot();
        }
        this.state = {
          phase: 'collapsing',
          reason: event.reason ?? 'manual',
        };
        break;
      }
      case 'COLLAPSE_ANIMATION_DONE': {
        if (this.state.phase === 'collapsing') {
          this.state = {
            phase: 'collapsed',
            reason: this.state.reason === 'none' ? 'manual' : this.state.reason,
          };
        }
        break;
      }
      case 'EXPAND': {
        // UX invariant: If fullscreen exited, only auto-expand if fullscreen was what collapsed the dock
        if (event.trigger === 'fullscreen_exit' && this.state.reason !== 'fullscreen') {
          return this.getSnapshot();
        }
        if (this.state.phase === 'expanded' || this.state.phase === 'expanding') {
          return this.getSnapshot();
        }
        this.state = { phase: 'expanding', reason: 'none' };
        break;
      }
      case 'EXPAND_ANIMATION_DONE': {
        if (this.state.phase === 'expanding') {
          this.state = { phase: 'expanded', reason: 'none' };
        }
        break;
      }
      case 'SYNC_HOST': {
        this.state = {
          phase: event.phase,
          reason:
            event.phase === 'expanded' || event.phase === 'expanding'
              ? 'none'
              : event.reason ?? (this.state.reason === 'none' ? 'manual' : this.state.reason),
        };
        break;
      }
    }
    return this.getSnapshot();
  }
}

// ============================================================================
// 2. FLYOUT CARD STATE MACHINE
// ============================================================================

export type FlyoutPhase = 'closed' | 'hovering' | 'grace_closing' | 'pinned';

export interface FlyoutCardSnapshot {
  phase: FlyoutPhase;
  widget: WidgetKind | null;
}

export type FlyoutCardEvent =
  | { type: 'HOVER_TILE'; widget: WidgetKind; dockExpanded?: boolean; modalOpen?: boolean; pointerBusy?: boolean }
  | { type: 'ENTER_CARD' }
  | { type: 'LEAVE_DOCK_OR_CARD' }
  | { type: 'GRACE_TIMEOUT' }
  | { type: 'TOGGLE_PIN'; widget: WidgetKind; dockExpanded?: boolean; modalOpen?: boolean }
  | { type: 'FORCE_CLOSE' };

export class FlyoutCardMachine {
  private state: FlyoutCardSnapshot = { phase: 'closed', widget: null };

  getSnapshot(): FlyoutCardSnapshot {
    return { ...this.state };
  }

  isOpen(): boolean {
    return this.state.phase !== 'closed' && this.state.widget !== null;
  }

  isPinned(): boolean {
    return this.state.phase === 'pinned' && this.state.widget !== null;
  }

  send(event: FlyoutCardEvent): FlyoutCardSnapshot {
    switch (event.type) {
      case 'HOVER_TILE': {
        if (event.dockExpanded === false || event.modalOpen === true || event.pointerBusy === true) {
          return this.getSnapshot();
        }
        // If already pinned on a tile, hovering another tile keeps it pinned on the original tile
        // unless not pinned, in which case it switches immediately
        if (this.state.phase === 'pinned') {
          return this.getSnapshot();
        }
        this.state = { phase: 'hovering', widget: event.widget };
        break;
      }
      case 'ENTER_CARD': {
        if (this.state.phase === 'grace_closing' && this.state.widget) {
          this.state = { phase: 'hovering', widget: this.state.widget };
        }
        break;
      }
      case 'LEAVE_DOCK_OR_CARD': {
        if (this.state.phase === 'hovering' && this.state.widget) {
          this.state = { phase: 'grace_closing', widget: this.state.widget };
        }
        break;
      }
      case 'GRACE_TIMEOUT': {
        if (this.state.phase === 'grace_closing') {
          this.state = { phase: 'closed', widget: null };
        }
        break;
      }
      case 'TOGGLE_PIN': {
        if (event.dockExpanded === false || event.modalOpen === true) {
          this.state = { phase: 'closed', widget: null };
          return this.getSnapshot();
        }
        if (this.state.phase === 'pinned' && this.state.widget === event.widget) {
          this.state = { phase: 'closed', widget: null };
        } else {
          this.state = { phase: 'pinned', widget: event.widget };
        }
        break;
      }
      case 'FORCE_CLOSE': {
        this.state = { phase: 'closed', widget: null };
        break;
      }
    }
    return this.getSnapshot();
  }
}

// ============================================================================
// 3. POINTER INTERACTION STATE MACHINE
// ============================================================================

export type PointerMode =
  | 'idle'
  | 'scrubbing_slider'
  | 'reordering_dock_tile'
  | 'reordering_settings_row'
  | 'dragging_modal_window';

export interface PointerInteractionSnapshot {
  mode: PointerMode;
  activeId: string | null;
}

export type PointerInteractionEvent =
  | { type: 'START_SLIDER_SCRUB'; controlId?: string }
  | { type: 'START_DOCK_REORDER'; itemId: string }
  | { type: 'START_SETTINGS_REORDER'; itemId: string }
  | { type: 'START_WINDOW_DRAG' }
  | { type: 'END_INTERACTION' };

export class PointerInteractionMachine {
  private state: PointerInteractionSnapshot = { mode: 'idle', activeId: null };

  getSnapshot(): PointerInteractionSnapshot {
    return { ...this.state };
  }

  isBusy(): boolean {
    return this.state.mode !== 'idle';
  }

  canStartWindowDrag(): boolean {
    return this.state.mode === 'idle';
  }

  canTriggerHoverCard(): boolean {
    return this.state.mode === 'idle';
  }

  send(event: PointerInteractionEvent): PointerInteractionSnapshot {
    switch (event.type) {
      case 'START_SLIDER_SCRUB': {
        this.state = { mode: 'scrubbing_slider', activeId: event.controlId ?? 'slider' };
        break;
      }
      case 'START_DOCK_REORDER': {
        if (this.state.mode === 'scrubbing_slider') return this.getSnapshot();
        this.state = { mode: 'reordering_dock_tile', activeId: event.itemId };
        break;
      }
      case 'START_SETTINGS_REORDER': {
        if (this.state.mode === 'scrubbing_slider') return this.getSnapshot();
        this.state = { mode: 'reordering_settings_row', activeId: event.itemId };
        break;
      }
      case 'START_WINDOW_DRAG': {
        // UX invariant: Never drag the native window if the user is scrubbing a slider or reordering items
        if (this.state.mode !== 'idle') return this.getSnapshot();
        this.state = { mode: 'dragging_modal_window', activeId: null };
        break;
      }
      case 'END_INTERACTION': {
        this.state = { mode: 'idle', activeId: null };
        break;
      }
    }
    return this.getSnapshot();
  }
}

// ============================================================================
// 4. SHORTCUT RECORDER STATE MACHINE
// ============================================================================

export type ShortcutRecorderPhase = 'idle' | 'listening' | 'validating' | 'conflict';

export interface ShortcutRecorderSnapshot {
  phase: ShortcutRecorderPhase;
  targetId: string | null;
  candidateCombo: string | null;
  conflictMessage: string | null;
}

export type ShortcutRecorderEvent =
  | { type: 'START_RECORDING'; targetId: string }
  | { type: 'CAPTURE_COMBO'; combo: string }
  | { type: 'MARK_CONFLICT'; message: string }
  | { type: 'COMMIT_SUCCESS' }
  | { type: 'CANCEL' };

export class ShortcutRecorderMachine {
  private state: ShortcutRecorderSnapshot = {
    phase: 'idle',
    targetId: null,
    candidateCombo: null,
    conflictMessage: null,
  };

  getSnapshot(): ShortcutRecorderSnapshot {
    return { ...this.state };
  }

  isActive(): boolean {
    return this.state.phase !== 'idle';
  }

  shouldConsumeEscapeKey(): boolean {
    return this.state.phase !== 'idle';
  }

  send(event: ShortcutRecorderEvent): ShortcutRecorderSnapshot {
    switch (event.type) {
      case 'START_RECORDING': {
        this.state = {
          phase: 'listening',
          targetId: event.targetId,
          candidateCombo: null,
          conflictMessage: null,
        };
        break;
      }
      case 'CAPTURE_COMBO': {
        if (this.state.phase === 'listening' || this.state.phase === 'conflict') {
          this.state = {
            ...this.state,
            phase: 'validating',
            candidateCombo: event.combo,
            conflictMessage: null,
          };
        }
        break;
      }
      case 'MARK_CONFLICT': {
        if (this.state.targetId) {
          this.state = {
            ...this.state,
            phase: 'conflict',
            conflictMessage: event.message,
          };
        }
        break;
      }
      case 'COMMIT_SUCCESS':
      case 'CANCEL': {
        this.state = {
          phase: 'idle',
          targetId: null,
          candidateCombo: null,
          conflictMessage: null,
        };
        break;
      }
    }
    return this.getSnapshot();
  }
}

// ============================================================================
// 5. FOCUS TIMER STATE MACHINE
// ============================================================================

export type FocusTimerPhase = 'idle' | 'running_focus' | 'paused_focus' | 'running_break' | 'paused_break';

export interface FocusTimerSnapshot {
  phase: FocusTimerPhase;
  mode: 'focus' | 'break';
  running: boolean;
  remainingSec: number;
  totalSec: number;
  sessionsCompleted: number;
}

export type FocusTimerEvent =
  | { type: 'TOGGLE' }
  | { type: 'RESET' }
  | { type: 'SELECT_PRESET'; minutes: number }
  | { type: 'START_BREAK'; minutes?: number }
  | { type: 'TICK' };

export class FocusTimerMachine {
  private state: FocusTimerSnapshot;

  constructor(initialMinutes = 25, sessionsCompleted = 0) {
    const sec = Math.max(1, initialMinutes) * 60;
    this.state = {
      phase: 'idle',
      mode: 'focus',
      running: false,
      remainingSec: sec,
      totalSec: sec,
      sessionsCompleted,
    };
  }

  getSnapshot(): FocusTimerSnapshot {
    return { ...this.state };
  }

  send(event: FocusTimerEvent): FocusTimerSnapshot {
    switch (event.type) {
      case 'TOGGLE': {
        if (this.state.phase === 'idle' || this.state.phase === 'paused_focus') {
          this.state = { ...this.state, phase: 'running_focus', mode: 'focus', running: true };
        } else if (this.state.phase === 'running_focus') {
          this.state = { ...this.state, phase: 'paused_focus', running: false };
        } else if (this.state.phase === 'paused_break') {
          this.state = { ...this.state, phase: 'running_break', mode: 'break', running: true };
        } else if (this.state.phase === 'running_break') {
          this.state = { ...this.state, phase: 'paused_break', running: false };
        }
        break;
      }
      case 'RESET': {
        this.state = {
          ...this.state,
          phase: 'idle',
          running: false,
          remainingSec: this.state.totalSec,
        };
        break;
      }
      case 'SELECT_PRESET': {
        const sec = Math.max(1, event.minutes) * 60;
        this.state = {
          ...this.state,
          phase: 'idle',
          mode: 'focus',
          running: false,
          totalSec: sec,
          remainingSec: sec,
        };
        break;
      }
      case 'START_BREAK': {
        const sec = Math.max(1, event.minutes ?? 5) * 60;
        this.state = {
          ...this.state,
          phase: 'running_break',
          mode: 'break',
          running: true,
          totalSec: sec,
          remainingSec: sec,
        };
        break;
      }
      case 'TICK': {
        if (!this.state.running) return this.getSnapshot();
        const nextSec = Math.max(0, this.state.remainingSec - 1);
        if (nextSec === 0) {
          const completed =
            this.state.mode === 'focus' ? this.state.sessionsCompleted + 1 : this.state.sessionsCompleted;
          this.state = {
            ...this.state,
            phase: 'idle',
            running: false,
            remainingSec: this.state.totalSec,
            sessionsCompleted: completed,
          };
        } else {
          this.state = {
            ...this.state,
            remainingSec: nextSec,
          };
        }
        break;
      }
    }
    return this.getSnapshot();
  }
}

// ============================================================================
// SINGLETON REGISTRY (AX/DX Diagnostic Inspection)
// ============================================================================

export const flankMachines = {
  dockCollapse: new DockCollapseMachine(),
  flyoutCard: new FlyoutCardMachine(),
  pointerInteraction: new PointerInteractionMachine(),
  shortcutRecorder: new ShortcutRecorderMachine(),
  focusTimer: new FocusTimerMachine(),
  getDiagnostics() {
    return {
      dockCollapse: this.dockCollapse.getSnapshot(),
      flyoutCard: this.flyoutCard.getSnapshot(),
      pointerInteraction: this.pointerInteraction.getSnapshot(),
      shortcutRecorder: this.shortcutRecorder.getSnapshot(),
      focusTimer: this.focusTimer.getSnapshot(),
    };
  },
};
