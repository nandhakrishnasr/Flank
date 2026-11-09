import { type DockItem, type FlankState, type WidgetKind } from '../../providers/types.ts';
import { createSampleState } from '../../providers/sample.ts';
import { renderWelcomeStepHtml } from './steps/welcome.ts';
import { renderEdgeStepHtml } from './steps/edge.ts';
import { renderLookStepHtml, EXTRA_THEME_TILES } from './steps/look.ts';
import { renderWidgetsStepHtml, ONBOARDING_WIDGET_OPTIONS } from './steps/widgets.ts';
import { renderReadyStepHtml } from './steps/ready.ts';
import { renderOnboardingPreviewHtml } from './preview.ts';

export type OnboardingStep = 1 | 2 | 3 | 4 | 5;

export interface OnboardingPersistRecord {
  completed: boolean;
  version: 1;
  completedAt?: string;
}

export interface OnboardingSnapshot {
  step: OnboardingStep;
  direction: 'next' | 'back' | 'none';
  replay: boolean;
  completed: boolean;
  skipped: boolean;
  edge: 'left' | 'right';
  themeId: string;
  themesExpanded: boolean;
  accent: string;
  customColorPopoverOpen: boolean;
  selectedWidgets: WidgetKind[];
  baseItemCount: number;
  maxDockItems: number;
  capReachedWarning: boolean;
  autostart: boolean;
  hideHotkey: string;
  clipboardHotkey: string;
}

export interface OnboardingInitOptions {
  replay?: boolean;
  edge?: 'left' | 'right' | null;
  themeId?: string | null;
  accent?: string | null;
  selectedWidgets?: WidgetKind[];
  items?: DockItem[];
  baseItemCount?: number;
  maxDockItems?: number;
  autostart?: boolean;
  hideHotkey?: string;
  clipboardHotkey?: string;
}

export const DEFAULT_ONBOARDING_WIDGETS: WidgetKind[] = ONBOARDING_WIDGET_OPTIONS
  .filter((w) => w.defaultOn)
  .map((w) => w.kind);

export const ALL_ONBOARDING_WIDGET_KINDS: WidgetKind[] = ONBOARDING_WIDGET_OPTIONS.map((w) => w.kind);

/**
 * Checks whether a parsed settings object represents a first run (onboarding not completed).
 */
export function isFirstRunSettings(raw: unknown): boolean {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return true;
  }
  const obj = raw as Record<string, unknown>;
  const ob = obj.onboarding;
  if (!ob || typeof ob !== 'object' || Array.isArray(ob)) {
    return true;
  }
  return (ob as Record<string, unknown>).completed !== true;
}

/**
 * Safely parses `settings.json` content. Missing, empty, or corrupt JSON is treated as first run.
 */
export function parseSettingsStore(jsonText: string | null | undefined): {
  settings: Record<string, unknown>;
  isFirstRun: boolean;
  corrupt: boolean;
} {
  if (jsonText === null || jsonText === undefined || String(jsonText).trim() === '') {
    return { settings: {}, isFirstRun: true, corrupt: false };
  }
  try {
    const parsed = JSON.parse(String(jsonText));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { settings: {}, isFirstRun: true, corrupt: true };
    }
    const settings = parsed as Record<string, unknown>;
    return {
      settings,
      isFirstRun: isFirstRunSettings(settings),
      corrupt: false,
    };
  } catch {
    return { settings: {}, isFirstRun: true, corrupt: true };
  }
}

/**
 * Builds the updated `DockItem[]` list applying the selected onboarding widgets.
 * When `replay` is false (first run or skip), secondary non-onboarding widgets default to disabled
 * so the dock starts clean and within the 12-item cap. When `replay` is true, non-onboarding items
 * keep their existing `enabled` state untouched.
 */
export function applyOnboardingWidgetsToItems(
  existingItems: DockItem[] | undefined,
  selectedWidgets: WidgetKind[],
  replay = false
): DockItem[] {
  const baseList =
    Array.isArray(existingItems) && existingItems.length > 0
      ? structuredClone(existingItems)
      : structuredClone(createSampleState().items);

  const selectedSet = new Set<WidgetKind>(selectedWidgets);
  const onboardingSet = new Set<WidgetKind>(ALL_ONBOARDING_WIDGET_KINDS);

  for (const item of baseList) {
    if (item.kind === 'widget' || item.group === 'widgets') {
      const wKind = item.widgetKind;
      if (wKind && onboardingSet.has(wKind)) {
        item.enabled = selectedSet.has(wKind);
      } else if (!replay) {
        item.enabled = false;
      }
    } else if (!replay && (item.kind === 'app' || item.group === 'apps')) {
      item.enabled = true;
    }
  }

  return baseList;
}

export class OnboardingMachine {
  private state: OnboardingSnapshot;
  private sourceItems: DockItem[];

  constructor(options: OnboardingInitOptions = {}) {
    const replay = Boolean(options.replay);
    const sample = createSampleState();
    this.sourceItems =
      Array.isArray(options.items) && options.items.length > 0
        ? structuredClone(options.items)
        : structuredClone(sample.items);

    const maxDockItems = options.maxDockItems ?? 12;

    let initialWidgets: WidgetKind[];
    if (Array.isArray(options.selectedWidgets)) {
      initialWidgets = [...options.selectedWidgets];
    } else if (replay && Array.isArray(options.items) && options.items.length > 0) {
      const onboardingSet = new Set<WidgetKind>(ALL_ONBOARDING_WIDGET_KINDS);
      initialWidgets = options.items
        .filter((it) => it.enabled && it.widgetKind && onboardingSet.has(it.widgetKind))
        .map((it) => it.widgetKind as WidgetKind);
      if (initialWidgets.length === 0) {
        initialWidgets = [...DEFAULT_ONBOARDING_WIDGETS];
      }
    } else {
      initialWidgets = [...DEFAULT_ONBOARDING_WIDGETS];
    }

    const baseItemCount =
      options.baseItemCount !== undefined
        ? options.baseItemCount
        : replay
          ? this.sourceItems.filter(
              (it) =>
                it.enabled &&
                !(it.kind === 'widget' && it.widgetKind && ALL_ONBOARDING_WIDGET_KINDS.includes(it.widgetKind))
            ).length
          : this.sourceItems.filter((it) => it.enabled && (it.kind === 'app' || it.group === 'apps')).length;

    // Enforce 12-item cap on initial selection
    const maxAllowedWidgets = Math.max(0, Math.min(maxDockItems, maxDockItems - baseItemCount));
    if (initialWidgets.length > maxAllowedWidgets) {
      initialWidgets = initialWidgets.slice(0, maxAllowedWidgets);
    }

    const themeId = (options.themeId || 'paper').replace(/_/g, '-');
    const isExtraTheme = EXTRA_THEME_TILES.some((t) => t.id === themeId);

    const clipItem = this.sourceItems.find(
      (it) => it.id === 'widget-clipboard' || it.widgetKind === 'clipboard'
    );

    this.state = {
      step: 1,
      direction: 'none',
      replay,
      completed: false,
      skipped: false,
      edge: options.edge === 'left' ? 'left' : 'right',
      themeId,
      themesExpanded: isExtraTheme,
      accent: options.accent || '#2F4BFF',
      customColorPopoverOpen: false,
      selectedWidgets: initialWidgets,
      baseItemCount,
      maxDockItems,
      capReachedWarning: false,
      autostart: options.autostart !== undefined ? Boolean(options.autostart) : true,
      hideHotkey: options.hideHotkey || 'Ctrl+Alt+F',
      clipboardHotkey: options.clipboardHotkey || clipItem?.shortcut || 'Ctrl+Alt+V',
    };
  }

  public getSnapshot(): OnboardingSnapshot {
    return {
      ...this.state,
      selectedWidgets: [...this.state.selectedWidgets],
    };
  }

  public canContinue(): boolean {
    if (this.state.step === 4) {
      return (
        this.state.selectedWidgets.length >= 1 &&
        this.state.baseItemCount + this.state.selectedWidgets.length <= this.state.maxDockItems
      );
    }
    return true;
  }

  public next(): OnboardingSnapshot {
    if (!this.canContinue()) {
      return this.getSnapshot();
    }
    if (this.state.step < 5) {
      this.state.step = (this.state.step + 1) as OnboardingStep;
      this.state.direction = 'next';
      this.state.customColorPopoverOpen = false;
    }
    return this.getSnapshot();
  }

  public back(): OnboardingSnapshot {
    if (this.state.step > 1) {
      this.state.step = (this.state.step - 1) as OnboardingStep;
      this.state.direction = 'back';
      this.state.customColorPopoverOpen = false;
    }
    return this.getSnapshot();
  }

  public goToStep(step: OnboardingStep): OnboardingSnapshot {
    if (step === this.state.step) return this.getSnapshot();
    this.state.direction = step > this.state.step ? 'next' : 'back';
    this.state.step = step;
    this.state.customColorPopoverOpen = false;
    return this.getSnapshot();
  }

  public setEdge(edge: 'left' | 'right'): OnboardingSnapshot {
    this.state.edge = edge === 'left' ? 'left' : 'right';
    this.state.direction = 'none';
    return this.getSnapshot();
  }

  public setTheme(themeId: string): OnboardingSnapshot {
    const normalized = (themeId || 'paper').replace(/_/g, '-');
    this.state.themeId = normalized;
    if (EXTRA_THEME_TILES.some((t) => t.id === normalized)) {
      this.state.themesExpanded = true;
    }
    this.state.direction = 'none';
    return this.getSnapshot();
  }

  public expandThemes(): OnboardingSnapshot {
    this.state.themesExpanded = true;
    this.state.direction = 'none';
    return this.getSnapshot();
  }

  public setAccent(hex: string): OnboardingSnapshot {
    let cleaned = (hex || '').trim();
    if (!cleaned.startsWith('#')) cleaned = `#${cleaned}`;
    if (/^#[0-9A-Fa-f]{3}$/.test(cleaned)) {
      cleaned = `#${cleaned[1]}${cleaned[1]}${cleaned[2]}${cleaned[2]}${cleaned[3]}${cleaned[3]}`;
    }
    if (/^#[0-9A-Fa-f]{6}$/.test(cleaned)) {
      this.state.accent = cleaned.toUpperCase();
    }
    this.state.direction = 'none';
    return this.getSnapshot();
  }

  public toggleCustomColorPopover(open?: boolean): OnboardingSnapshot {
    this.state.customColorPopoverOpen =
      open !== undefined ? Boolean(open) : !this.state.customColorPopoverOpen;
    this.state.direction = 'none';
    return this.getSnapshot();
  }

  public handleEscape(): { closedPopover: boolean; skipped: boolean } {
    if (this.state.customColorPopoverOpen) {
      this.state.customColorPopoverOpen = false;
      this.state.direction = 'none';
      return { closedPopover: true, skipped: false };
    }
    return { closedPopover: false, skipped: false };
  }

  public toggleWidget(kind: WidgetKind): {
    ok: boolean;
    reason?: 'cap_reached';
    snapshot: OnboardingSnapshot;
  } {
    this.state.direction = 'none';
    const idx = this.state.selectedWidgets.indexOf(kind);
    if (idx >= 0) {
      this.state.selectedWidgets.splice(idx, 1);
      this.state.capReachedWarning = false;
      return { ok: true, snapshot: this.getSnapshot() };
    }

    const totalItems = this.state.baseItemCount + this.state.selectedWidgets.length;
    if (
      totalItems >= this.state.maxDockItems ||
      this.state.selectedWidgets.length >= this.state.maxDockItems
    ) {
      this.state.capReachedWarning = true;
      return { ok: false, reason: 'cap_reached', snapshot: this.getSnapshot() };
    }

    const nextSet = new Set([...this.state.selectedWidgets, kind]);
    this.state.selectedWidgets = ALL_ONBOARDING_WIDGET_KINDS.filter((k) => nextSet.has(k));
    // Also preserve any custom widget kind passed in tests that isn't in ALL_ONBOARDING_WIDGET_KINDS
    if (!this.state.selectedWidgets.includes(kind)) {
      this.state.selectedWidgets.push(kind);
    }
    this.state.capReachedWarning = false;
    return { ok: true, snapshot: this.getSnapshot() };
  }

  public setAutostart(enabled: boolean): OnboardingSnapshot {
    this.state.autostart = Boolean(enabled);
    this.state.direction = 'none';
    return this.getSnapshot();
  }

  /**
   * Skip setup (steps 1-4 or closing window with X before finishing):
   * Applies defaults (Right edge, Paper, blue accent #2F4BFF, recommended widgets),
   * sets onboarding.completed = true, and shows the dock.
   */
  public skip(): { prefsPatch: Record<string, unknown>; snapshot: OnboardingSnapshot } {
    this.state.edge = 'right';
    this.state.themeId = 'paper';
    this.state.accent = '#2F4BFF';
    this.state.selectedWidgets = [...DEFAULT_ONBOARDING_WIDGETS];
    this.state.completed = true;
    this.state.skipped = true;
    this.state.customColorPopoverOpen = false;
    this.state.direction = 'none';

    const updatedItems = applyOnboardingWidgetsToItems(
      this.sourceItems,
      this.state.selectedWidgets,
      false
    );
    const onboardingRecord: OnboardingPersistRecord = {
      completed: true,
      version: 1,
      completedAt: new Date().toISOString(),
    };

    const prefsPatch: Record<string, unknown> = {
      themeId: 'paper',
      edgeOverride: 'right',
      accentOverride: '#2F4BFF',
      items: updatedItems,
      dockState: 'expanded',
      onboarding: onboardingRecord,
    };

    return { prefsPatch, snapshot: this.getSnapshot() };
  }

  /**
   * Open my dock (Step 5):
   * Writes all choices in one settings write, sets onboarding.completed = true,
   * and starts the dock in its normal expanded state.
   */
  public finish(): { prefsPatch: Record<string, unknown>; snapshot: OnboardingSnapshot } {
    this.state.completed = true;
    this.state.skipped = false;
    this.state.customColorPopoverOpen = false;
    this.state.direction = 'none';

    const updatedItems = applyOnboardingWidgetsToItems(
      this.sourceItems,
      this.state.selectedWidgets,
      this.state.replay
    );
    const onboardingRecord: OnboardingPersistRecord = {
      completed: true,
      version: 1,
      completedAt: new Date().toISOString(),
    };

    const prefsPatch: Record<string, unknown> = {
      themeId: this.state.themeId,
      edgeOverride: this.state.edge,
      accentOverride: this.state.accent,
      autostart: this.state.autostart,
      items: updatedItems,
      dockState: 'expanded',
      onboarding: onboardingRecord,
    };

    return { prefsPatch, snapshot: this.getSnapshot() };
  }
}

export function renderOnboardingBrandIconHtml(): string {
  return `<svg class="flank-ob-logo" width="32" height="32" viewBox="0 0 128 128" role="img" aria-label="Flank"><rect width="128" height="128" rx="30" fill="var(--flank-ob-accent)"></rect><g transform="translate(28 17.92) scale(0.72)"><path d="M12 44 a38 38 0 0 1 76 0 V84 a38 38 0 0 1 -76 0 Z" fill="none" stroke="var(--flank-ob-accent-ink)" stroke-width="9"></path><path d="M37 42 a4 4 0 0 1 4 -4 H62 a7 7 0 0 1 0 14 H51 V60 H60 a6 6 0 0 1 0 12 H51 V86 a4 4 0 0 1 -4 4 H41 a4 4 0 0 1 -4 -4 Z" fill="var(--flank-ob-accent-ink)"></path></g></svg>`;
}

export function renderOnboardingStepBodyHtml(snap: OnboardingSnapshot): string {
  switch (snap.step) {
    case 1:
      return renderWelcomeStepHtml();
    case 2:
      return renderEdgeStepHtml(snap.edge);
    case 3:
      return renderLookStepHtml({
        themeId: snap.themeId,
        themesExpanded: snap.themesExpanded,
        accent: snap.accent,
        customColorPopoverOpen: snap.customColorPopoverOpen,
      });
    case 4:
      return renderWidgetsStepHtml({
        selectedWidgets: snap.selectedWidgets,
        capReachedWarning: snap.capReachedWarning,
      });
    case 5:
      return renderReadyStepHtml({
        autostart: snap.autostart,
        hideHotkey: snap.hideHotkey,
        clipboardHotkey: snap.clipboardHotkey,
      });
  }
}

export function renderOnboardingFooterHtml(
  snap: OnboardingSnapshot,
  canContinue: boolean
): string {
  const dotsHtml = [1, 2, 3, 4, 5]
    .map((idx) => {
      const cls =
        idx === snap.step
          ? 'flank-ob-dot is-active'
          : idx < snap.step
            ? 'flank-ob-dot is-done'
            : 'flank-ob-dot';
      return `<i class="${cls}"></i>`;
    })
    .join('');

  const progressGroup = `<div class="flank-ob-dots" role="img" aria-label="Step ${snap.step} of 5">${dotsHtml}</div>`;

  if (snap.step === 1) {
    return `
      ${progressGroup}
      <button type="button" class="flank-ob-btn-primary" data-ob-action="next">
        <span>Get started</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--flank-ob-accent-ink)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
      </button>
    `;
  }

  const primaryLabel = snap.step === 5 ? 'Open my dock' : 'Continue';
  const primaryAction = snap.step === 5 ? 'finish' : 'next';

  return `
    <button type="button" class="flank-ob-btn-back" data-ob-action="back">Back</button>
    ${progressGroup}
    <button type="button" class="flank-ob-btn-primary" data-ob-action="${primaryAction}" ${canContinue ? '' : 'disabled'}>${primaryLabel}</button>
  `;
}

export function renderOnboardingHtml(
  machine: OnboardingMachine,
  liveState?: FlankState
): string {
  const snap = machine.getSnapshot();
  const canContinue = machine.canContinue();
  const animClass =
    snap.direction === 'next'
      ? ' is-anim-next'
      : snap.direction === 'back'
        ? ' is-anim-back'
        : '';

  const skipButtonHtml =
    snap.step <= 4
      ? `<button type="button" class="flank-ob-skip" data-ob-action="skip">Skip setup</button>`
      : '';

  const previewHtml = renderOnboardingPreviewHtml({
    step: snap.step,
    edge: snap.edge,
    themeId: snap.themeId,
    accent: snap.accent,
    selectedWidgets: snap.selectedWidgets,
    hideHotkey: snap.hideHotkey,
    liveState,
  });

  return `
    <div class="flank-ob-shell" data-ob-step="${snap.step}">
      <div class="flank-ob-left">
        <div class="flank-ob-topbar" id="flank-ob-topbar">
          ${renderOnboardingBrandIconHtml()}
          ${skipButtonHtml}
        </div>
        <div class="flank-ob-step-body${animClass}" id="flank-ob-step-body">
          ${renderOnboardingStepBodyHtml(snap)}
        </div>
        <div class="flank-ob-footer" id="flank-ob-footer">
          ${renderOnboardingFooterHtml(snap, canContinue)}
        </div>
      </div>
      ${previewHtml}
    </div>
  `;
}
