import { ThemeEngine } from './theme/engine.ts';
import { createSampleState } from './providers/sample.ts';
import { type DockItem, type FlankState, type WidgetKind, type TaskItem } from './providers/types.ts';
import { renderDockHtml } from './ui/dock.ts';
import { renderHoverCardHtml } from './ui/cards.ts';
import { attachDockMagnification } from './ui/magnification.ts';
import { evaluateExpression } from './ui/calc.ts';
import { startAmbientSound, stopAmbientSound, setAmbientVolume, isAmbientPlaying } from './ui/ambient.ts';
import {
  initDockState,
  setDockState,
  collapseDock,
  expandDock,
  toggleDockCollapse,
  getDockState,
  isDockCollapsed,
  onDockStateChange,
} from './ui/dockState.ts';
import { flankMachines } from './state/machines.ts';
import { showDockTooltip, hideDockTooltip, suppressDockTooltip } from './ui/tooltip.ts';
import { deriveAccentTokens, parseColor, contrastRatio } from './theme/contrast.ts';

const lastNumValues = new Map<string, string>();
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function checkAccentContrast(accentHex: string): string | null {
  try {
    const derived = deriveAccentTokens(accentHex);
    if (!derived) return 'Invalid color format.';
    const currentTheme = themeEngine.getEffectiveTheme(state);
    const parsedSurface = parseColor(currentTheme.surface.dock.bg) || { r: 251, g: 250, b: 247, a: 1 };
    const parsedAccent = parseColor(accentHex);
    if (!parsedAccent) return null;
    const ratio = contrastRatio(parsedAccent, parsedSurface);
    if (ratio < 3.0) {
      return `Warning: Contrast against surface is ${ratio.toFixed(1)}:1 (recommended >= 3:1). A high-contrast text color has been set.`;
    }
  } catch {}
  return null;
}

import {
  getFilteredClipboardItems,
  renderBatteryWindowHtml,
  renderClipboardWindowHtml,
  renderClockWindowHtml,
  renderFullStatsWindowHtml,
  renderSettingsWindowHtml,
  type WindowUiState,
} from './ui/windows.ts';
import {
  OnboardingMachine,
  renderOnboardingFooterHtml,
  renderOnboardingHtml,
  renderOnboardingStepBodyHtml,
  type OnboardingSnapshot,
  type OnboardingStep,
} from './ui/onboarding/onboarding.ts';
import { renderOnboardingPreviewHtml } from './ui/onboarding/preview.ts';

declare global {
  interface Window {
    pywebview?: {
      api: {
        get_initial_state?: () => Promise<Partial<FlankState>>;
        launch_item?: (itemId: string, target: string) => Promise<boolean>;
        copy_clipboard_item?: (itemId: string) => Promise<boolean>;
        pin_clipboard_item?: (itemId: string) => Promise<boolean>;
        delete_clipboard_item?: (itemId: string) => Promise<boolean>;
        clear_unpinned_clipboard?: () => Promise<boolean>;
        media_control?: (action: string) => Promise<boolean>;
        focus_control?: (action: string, value?: number) => Promise<Partial<FlankState> | null>;
        add_world_clock?: (city: string) => Promise<Partial<FlankState> | null>;
        remove_world_clock?: (clockId: string) => Promise<Partial<FlankState> | null>;
        scratchpad_action?: (action: string, noteId: string, content: string) => Promise<Partial<FlankState> | null>;
        pick_screen_color?: () => Promise<Partial<FlankState> | null>;
        set_picked_color?: (hexColor: string) => Promise<Partial<FlankState> | null>;
        calendar_action?: (
          action: string,
          titleOrId: string,
          timeText: string,
          joinUrl: string
        ) => Promise<Partial<FlankState> | null>;
        audio_control?: (action: string, value?: number) => Promise<Partial<FlankState> | null>;
        network_action?: (action: string, pid?: number) => Promise<Partial<FlankState> | null>;
        copy_raw_text?: (text: string) => Promise<boolean>;
        save_preferences?: (prefs: Record<string, unknown>) => Promise<{ ok: boolean; message?: string }>;
        register_item_shortcut?: (itemId: string, shortcut: string) => Promise<{ ok: boolean; conflict?: string }>;
        update_weather_city?: (city: string) => Promise<Partial<FlankState> | null>;
        show_hover_card?: (kind: string, clientY: number) => Promise<void>;
        toggle_hover_card?: (kind: string, clientY: number) => Promise<void>;
        close_hover_card?: () => Promise<void>;
        drag_modal_window?: () => Promise<void>;
        cancel_hide_card?: () => Promise<void>;
        hide_hover_card?: () => Promise<void>;
        open_window?: (win: string) => Promise<void>;
        close_window?: () => Promise<void>;
        open_onboarding?: (replay?: boolean) => Promise<void>;
        complete_onboarding?: (prefsPatch: Record<string, unknown>, skipped?: boolean) => Promise<{ ok: boolean }>;
        set_dock_bounds?: (width: number, height: number, shape: string, windowPadding?: number) => Promise<void>;
        set_card_bounds?: (width: number, height: number, radius?: number, windowPadding?: number) => Promise<void>;
        set_window_interactive?: (
          mode: 'dock' | 'modal',
          rects: Array<{ x: number; y: number; w: number; h: number; r: number }>
        ) => Promise<void>;
        collapse_dock?: () => Promise<void>;
        expand_dock?: () => Promise<void>;
        dock_collapse_done?: () => Promise<void>;
        dock_expand_done?: () => Promise<void>;
        resolve_item_icon?: (itemId: string, target: string, force?: boolean) => Promise<void>;
        choose_custom_icon_file?: (itemId: string) => Promise<void>;
      };
    };
    flankReceiveHostUpdate?: (patch: Partial<FlankState>) => void;
    flankOpenWindow?: (win: 'clipboard' | 'stats' | 'battery' | 'clock' | 'settings') => void;
    flankSwitchTheme?: (themeId: string) => void;
    flankShowCard?: (widgetKind: WidgetKind) => void;
    flankOpenModal?: (win: 'clipboard' | 'stats' | 'battery' | 'clock' | 'settings' | 'onboarding') => void;
    flankStartOnboarding?: (opts?: { replay?: boolean; step?: OnboardingStep }) => void;
    flankSkipOnboardingFromHost?: () => Record<string, unknown> | null;
    flankSyncPreferences?: (prefs: Partial<FlankState>) => void;
    flankUpdateBackdrop?: (backdrop: any) => void;
    flankSetDockState?: (state: string) => void;
    flankGetDockState?: () => string;
    flankOnIconResolved?: (data: { id: string; iconUri: string; iconPath?: string }) => void;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const hashView = (window.location.hash || '').replace(/^#/, '').replace(/^view=/, '');
let currentView = (urlParams.get('view') || hashView || 'dock') as
  | 'dock'
  | 'card'
  | 'modal'
  | 'onboarding'
  | 'unified';
document.body.setAttribute('data-view', currentView);

const themeEngine = new ThemeEngine();
const state: FlankState = createSampleState();
if (currentView === 'modal') {
  state.activeFullWindow = 'settings';
}

let onboardingMachine: OnboardingMachine | null = null;
let lastRenderedOnboardingStep: OnboardingStep | null = null;

function createOnboardingMachineFromState(opts?: {
  replay?: boolean;
  step?: OnboardingStep;
}): OnboardingMachine {
  const replay = Boolean(opts?.replay);
  const clipItem = state.items.find(
    (it) => it.id === 'widget-clipboard' || it.widgetKind === 'clipboard'
  );
  const queryEdge = urlParams.get('edge') as 'left' | 'right' | null;
  const queryObTheme = urlParams.get('obTheme');
  const queryObAccent = urlParams.get('obAccent');

  const machine = new OnboardingMachine({
    replay,
    edge: queryEdge || (replay ? (state.edgeOverride === 'left' ? 'left' : 'right') : 'right'),
    themeId: queryObTheme || (replay ? state.themeId : 'paper'),
    accent: queryObAccent || (replay ? state.accentOverride || '#2F4BFF' : '#2F4BFF'),
    items: state.items,
    autostart: replay ? state.autostart : true,
    hideHotkey: state.collapseHotkey || 'Ctrl+Alt+F',
    clipboardHotkey: clipItem?.shortcut || 'Ctrl+Alt+V',
  });

  if (urlParams.get('expanded') === '1' || urlParams.get('expanded') === 'true') {
    machine.expandThemes();
  }

  const targetStep = opts?.step || (Number(urlParams.get('step')) as OnboardingStep);
  if (targetStep && targetStep >= 1 && targetStep <= 5) {
    machine.goToStep(targetStep);
  }
  return machine;
}

function ensureOnboardingMachine(): OnboardingMachine {
  if (!onboardingMachine) {
    onboardingMachine = createOnboardingMachineFromState({
      replay: urlParams.get('replay') === '1' || urlParams.get('replay') === 'true',
    });
  }
  return onboardingMachine;
}

const uiState: WindowUiState = {
  clipboardQuery: '',
  clipboardFilter: 'all',
  selectedClipboardId: 'cb-2',
  settingsTab: 'appearance',
  recordingItemId: null,
  shortcutConflictMsg: null,
  themeValidationMsg: null,
};

window.flankStartOnboarding = (opts?: { replay?: boolean; step?: OnboardingStep }) => {
  currentView = 'onboarding';
  document.body.setAttribute('data-view', 'onboarding');
  themeEngine.revertToPaper();
  lastRenderedOnboardingStep = null;
  onboardingMachine = createOnboardingMachineFromState(opts);
  renderApp();
};

window.flankSkipOnboardingFromHost = () => {
  const machine = ensureOnboardingMachine();
  const res = machine.skip();
  return res.prefsPatch;
};

window.flankOpenModal = (win: 'clipboard' | 'stats' | 'battery' | 'clock' | 'settings' | 'onboarding') => {
  if (win === 'onboarding') {
    window.flankStartOnboarding?.({ replay: false });
    return;
  }
  if (currentView === 'onboarding') {
    currentView = 'modal';
    document.body.setAttribute('data-view', 'modal');
    lastRenderedOnboardingStep = null;
  }
  applyCurrentThemeSelection();
  state.activeFullWindow = win;
  renderApp();
};

window.flankShowCard = (widgetKind: WidgetKind) => {
  state.activeWidget = widgetKind;
  renderApp();
};

window.flankSwitchTheme = (themeId: string) => {
  state.themeId = themeId;
  state.edgeOverride = null;
  state.accentOverride = null;
  applyCurrentThemeSelection();
  renderApp();
};

window.flankUpdateBackdrop = (data: {
  enabled?: boolean;
  solidFallback?: boolean;
  wallpaperUrl?: string;
  monitorWidth?: number;
  monitorHeight?: number;
  shapeX?: number;
  shapeY?: number;
  shapeW?: number;
  shapeH?: number;
  adaptiveAlpha?: number;
  useTextShadow?: boolean;
}) => {
  const root = document.documentElement;
  const curTheme = themeEngine.getCurrentTheme();
  const isWallpaperSampled = curTheme.id !== 'glass' && Boolean(curTheme.glass && curTheme.glass.mode === 'wallpaper-sampled');

  if (!data || data.solidFallback || !data.enabled || !isWallpaperSampled) {
    if (data?.solidFallback) {
      root.setAttribute('data-transparency-effects', 'disabled');
    } else {
      root.removeAttribute('data-transparency-effects');
    }
    root.style.removeProperty('--flank-glass-wallpaper-url');
    root.style.removeProperty('--flank-glass-wallpaper-size');
    root.style.removeProperty('--flank-glass-wallpaper-pos');
    return;
  }

  root.removeAttribute('data-transparency-effects');
  if (data.wallpaperUrl) {
    root.style.setProperty('--flank-glass-wallpaper-url', `url("${data.wallpaperUrl}")`);
  }
  if (data.monitorWidth && data.monitorHeight) {
    root.style.setProperty('--flank-glass-wallpaper-size', `${data.monitorWidth}px ${data.monitorHeight}px`);
  }
  if (data.shapeX !== undefined && data.shapeY !== undefined) {
    root.style.setProperty('--flank-glass-wallpaper-pos', `-${data.shapeX}px -${data.shapeY}px`);
  }
  if (data.adaptiveAlpha !== undefined) {
    const curTheme = themeEngine.getCurrentTheme();
    if (curTheme.glass) {
      const tintRgb = curTheme.glass.tintRgb || '16,20,42';
      root.style.setProperty('--flank-surface-dock-bg', `rgba(${tintRgb}, ${data.adaptiveAlpha})`);
      root.style.setProperty('--flank-surface-card-bg', `rgba(${tintRgb}, ${data.adaptiveAlpha})`);
    }
  }
  if (data.useTextShadow) {
    root.setAttribute('data-contrast', 'low');
  } else {
    root.removeAttribute('data-contrast');
  }
};

window.flankOpenWindow = (win: 'clipboard' | 'stats' | 'battery' | 'clock' | 'settings') => {
  state.activeFullWindow = state.activeFullWindow === win ? null : win;
  state.activeWidget = null;
  renderApp();
};

let hoverCloseTimer: ReturnType<typeof setTimeout> | null = null;
let lastRegionSignature = '';

function parseFirstRadiusPx(raw: string): number {
  const m = String(raw || '').match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : 16;
}

function positionHoverCard(): void {
  const dockEl = document.getElementById('flank-dock');
  const cardEl = document.getElementById('flank-hover-card');
  const caretEl = document.getElementById('flank-card-caret');
  if (!dockEl || !cardEl || !state.activeWidget) return;

  const activeTile = dockEl.querySelector<HTMLElement>(`[data-widget="${state.activeWidget}"]`);
  if (!activeTile) return;

  const dockRect = dockEl.getBoundingClientRect();
  const tileRect = activeTile.getBoundingClientRect();
  const cardRect = cardEl.getBoundingClientRect();

  const rootStyle = getComputedStyle(document.documentElement);
  const offset = parseFloat(rootStyle.getPropertyValue('--flank-surface-card-offset')) || 10;
  const edge = state.edgeOverride || themeEngine.getCurrentTheme().layout.edge;
  const pad = 12;

  if (edge === 'right') {
    const left = Math.max(pad, dockRect.left - cardRect.width - offset);
    const tileCenterY = tileRect.top + tileRect.height / 2;
    const top = Math.max(
      pad,
      Math.min(window.innerHeight - cardRect.height - pad, tileCenterY - cardRect.height / 2)
    );
    cardEl.style.left = `${Math.round(left)}`;
    cardEl.style.setProperty('left', `${Math.round(left)}px`);
    cardEl.style.setProperty('top', `${Math.round(top)}px`);
    if (caretEl) {
      const caretTop = Math.max(16, Math.min(cardRect.height - 28, tileCenterY - top - 6));
      caretEl.style.setProperty('top', `${Math.round(caretTop)}px`);
    }
  } else if (edge === 'left') {
    const left = Math.min(window.innerWidth - cardRect.width - pad, dockRect.right + offset);
    const tileCenterY = tileRect.top + tileRect.height / 2;
    const top = Math.max(
      pad,
      Math.min(window.innerHeight - cardRect.height - pad, tileCenterY - cardRect.height / 2)
    );
    cardEl.style.setProperty('left', `${Math.round(left)}px`);
    cardEl.style.setProperty('top', `${Math.round(top)}px`);
    if (caretEl) {
      const caretTop = Math.max(16, Math.min(cardRect.height - 28, tileCenterY - top - 6));
      caretEl.style.setProperty('top', `${Math.round(caretTop)}px`);
    }
  } else {
    const top = Math.min(window.innerHeight - cardRect.height - pad, dockRect.bottom + offset);
    const tileCenterX = tileRect.left + tileRect.width / 2;
    const left = Math.max(
      pad,
      Math.min(window.innerWidth - cardRect.width - pad, tileCenterX - cardRect.width / 2)
    );
    cardEl.style.setProperty('left', `${Math.round(left)}px`);
    cardEl.style.setProperty('top', `${Math.round(top)}px`);
    if (caretEl) {
      const caretLeft = Math.max(16, Math.min(cardRect.width - 28, tileCenterX - left - 6));
      caretEl.style.setProperty('left', `${Math.round(caretLeft)}px`);
    }
  }
}

function notifyNativeWindowRegion(): void {
  const api = window.pywebview?.api;
  if (!api?.set_window_interactive) return;

  const theme = themeEngine.getCurrentTheme();
  const rects: Array<{ x: number; y: number; w: number; h: number; r: number }> = [];

  const fullWin = document.querySelector<HTMLElement>('.flank-window');
  if (state.activeFullWindow && fullWin) {
    const r = fullWin.getBoundingClientRect();
    rects.push({
      x: Math.round(r.left),
      y: Math.round(r.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
      r: 14,
    });
  }

  const dockEl = document.getElementById('flank-dock');
  if (dockEl) {
    const r = dockEl.getBoundingClientRect();
    rects.push({
      x: Math.round(r.left),
      y: Math.round(r.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
      r: parseFirstRadiusPx(theme.layout.dockRadius),
    });
  }

  const cardEl = document.getElementById('flank-hover-card');
  if (cardEl && state.activeWidget && !state.activeFullWindow) {
    const r = cardEl.getBoundingClientRect();
    rects.push({
      x: Math.round(r.left),
      y: Math.round(r.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
      r: parseFirstRadiusPx(theme.surface.cardRadius),
    });
    const caretEl = document.getElementById('flank-hover-caret');
    if (caretEl) {
      const cr = caretEl.getBoundingClientRect();
      rects.push({
        x: Math.round(cr.left),
        y: Math.round(cr.top),
        w: Math.round(cr.width),
        h: Math.round(cr.height),
        r: 2,
      });
    }
  }

  const mode = state.activeFullWindow ? 'modal' : 'dock';
  const sig = `${mode}:${JSON.stringify(rects)}`;
  if (sig !== lastRegionSignature) {
    lastRegionSignature = sig;
    api.set_window_interactive(mode, rects).catch(() => { });
  }
}

export function renderApp(preserveSearchFocus = false): void {
  const stage = document.getElementById('flank-stage');
  if (!stage) return;

  const activeInput =
    document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement
      ? document.activeElement
      : null;
  const activeElId = activeInput?.id;
  const activeVal = activeInput?.value ?? null;
  const selStart = activeInput?.selectionStart ?? null;

  // Snapshot scroll positions before DOM updates
  const scrollSnapshots: Array<{ selector: string; top: number; left: number }> = [];
  const scrollTargets = [
    '#flank-card-content',
    '.flank-card-content',
    '#flank-hover-card',
    '.flank-card',
    '.flank-preview-col',
    '.flank-list-scroll',
    '.flank-list-col',
    '.flank-stat-list',
    '.flank-win-body',
    '.flank-stat-item',
  ];
  scrollTargets.forEach((sel) => {
    stage.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      if (el.scrollTop > 0 || el.scrollLeft > 0) {
        scrollSnapshots.push({ selector: sel, top: el.scrollTop, left: el.scrollLeft });
      }
    });
  });
  stage.querySelectorAll<HTMLElement>('*').forEach((el) => {
    if (el.scrollTop > 0 || el.scrollLeft > 0) {
      if (el.id) {
        scrollSnapshots.push({ selector: `#${el.id}`, top: el.scrollTop, left: el.scrollLeft });
      } else if (el.className && typeof el.className === 'string') {
        const firstCls = el.className.trim().split(/\s+/)[0];
        if (firstCls) {
          scrollSnapshots.push({ selector: `.${firstCls}`, top: el.scrollTop, left: el.scrollLeft });
        }
      }
    }
  });

  const currentTheme = themeEngine.getCurrentTheme();

  if (currentView === 'dock') {
    stage.innerHTML = renderDockHtml(state, currentTheme);
    requestAnimationFrame(() => {
      const dockEl = document.getElementById('flank-dock');
      if (dockEl) {
        if (isDockCollapsed()) {
          return;
        }
        attachDockMagnification(dockEl, (state.edgeOverride === 'top' ? 'right' : state.edgeOverride || currentTheme.layout.edge) as 'left' | 'right');
        const rect = dockEl.getBoundingClientRect();
        const naturalWidth = Math.max(Math.ceil(rect.width), dockEl.scrollWidth, dockEl.offsetWidth);
        const naturalHeight = Math.max(Math.ceil(rect.height), dockEl.scrollHeight, dockEl.offsetHeight);
        const theme = themeEngine.getCurrentTheme();
        const shape = theme.layout.shape || 'pill';
        window.pywebview?.api?.set_dock_bounds?.(
          naturalWidth,
          naturalHeight,
          shape,
          0
        );
      }
    });
  } else if (currentView === 'card') {
    const prevCardContent = stage.querySelector<HTMLElement>('#flank-card-content, .flank-card-content');
    const savedCardScrollTop = prevCardContent ? prevCardContent.scrollTop : 0;
    const cardHtml =
      renderHoverCardHtml(state, currentTheme) ||
      renderHoverCardHtml({ ...state, activeWidget: state.activeWidget || 'battery' }, currentTheme);
    stage.innerHTML = cardHtml;
    if (savedCardScrollTop > 0) {
      const newCardContent = stage.querySelector<HTMLElement>('#flank-card-content, .flank-card-content');
      if (newCardContent) newCardContent.scrollTop = savedCardScrollTop;
    }
    requestAnimationFrame(() => {
      if (savedCardScrollTop > 0) {
        const newCardContent = stage.querySelector<HTMLElement>('#flank-card-content, .flank-card-content');
        if (newCardContent) newCardContent.scrollTop = savedCardScrollTop;
      }
      const cardEl = document.getElementById('flank-hover-card');
      if (cardEl) {
        const rect = cardEl.getBoundingClientRect();
        const theme = themeEngine.getCurrentTheme();
        const radius = parseFirstRadiusPx(theme.surface.cardRadius);
        window.pywebview?.api?.set_card_bounds?.(
          Math.ceil(rect.width),
          Math.ceil(rect.height),
          radius,
          0
        );
      }
    });
  } else if (currentView === 'onboarding') {
    themeEngine.revertToPaper();
    const machine = ensureOnboardingMachine();
    const snap = machine.getSnapshot();
    const canContinue = machine.canContinue();
    const existingShell = stage.querySelector<HTMLElement>('.flank-ob-shell');
    const stepChanged = lastRenderedOnboardingStep !== snap.step;

    if (existingShell && !stepChanged) {
      const stepBodyEl = existingShell.querySelector<HTMLElement>('#flank-ob-step-body');
      const footerEl = existingShell.querySelector<HTMLElement>('#flank-ob-footer');
      if (stepBodyEl) {
        stepBodyEl.classList.remove('is-anim-next', 'is-anim-back');
        stepBodyEl.innerHTML = renderOnboardingStepBodyHtml(snap);
      }
      if (footerEl) {
        footerEl.innerHTML = renderOnboardingFooterHtml(snap, canContinue);
      }

      const newPreviewHtml = renderOnboardingPreviewHtml({
        step: snap.step,
        edge: snap.edge,
        themeId: snap.themeId,
        accent: snap.accent,
        selectedWidgets: snap.selectedWidgets,
        hideHotkey: snap.hideHotkey,
        liveState: state,
      });
      const tmp = document.createElement('div');
      tmp.innerHTML = newPreviewHtml.trim();
      const nextDesktop = tmp.querySelector<HTMLElement>('.flank-ob-preview-desktop');
      const curDesktop = existingShell.querySelector<HTMLElement>('.flank-ob-preview-desktop');

      if (curDesktop && nextDesktop) {
        for (const attr of [
          'data-theme',
          'data-mode',
          'data-edge',
          'data-shape',
          'data-preview-backdrop',
          'style',
        ]) {
          const val = nextDesktop.getAttribute(attr);
          if (val !== null) curDesktop.setAttribute(attr, val);
        }

        const curDock = curDesktop.querySelector<HTMLElement>('.flank-ob-mock-dock');
        const nextDock = nextDesktop.querySelector<HTMLElement>('.flank-ob-mock-dock');
        if (curDock && nextDock) {
          curDock.setAttribute('style', nextDock.getAttribute('style') || '');
          curDock.innerHTML = nextDock.innerHTML;
        }

        for (const sel of [
          '.flank-ob-faux-window',
          '.flank-ob-ghost-dock',
          '.flank-ob-edge-pill',
          '.flank-ob-mock-card',
          '.flank-ob-callout',
          '.flank-ob-mock-tab',
        ]) {
          const curNode = curDesktop.querySelector<HTMLElement>(sel);
          const nextNode = nextDesktop.querySelector<HTMLElement>(sel);
          if (curNode && nextNode) {
            curNode.setAttribute('style', nextNode.getAttribute('style') || '');
            curNode.innerHTML = nextNode.innerHTML;
          }
        }
      } else {
        const curRight = existingShell.querySelector<HTMLElement>('.flank-ob-right');
        const nextRight = tmp.querySelector<HTMLElement>('.flank-ob-right');
        if (curRight && nextRight) {
          curRight.replaceWith(nextRight);
        }
      }
    } else {
      stage.innerHTML = renderOnboardingHtml(machine, state);
      lastRenderedOnboardingStep = snap.step;
      const headingEl = document.getElementById('flank-ob-step-heading');
      headingEl?.focus();
      requestAnimationFrame(() => {
        document.getElementById('flank-ob-step-heading')?.focus();
      });
    }
  } else if (currentView === 'modal') {
    let windowHtml = '';
    if (state.activeFullWindow === 'clipboard') {
      windowHtml = renderClipboardWindowHtml(state, uiState);
    } else if (state.activeFullWindow === 'stats') {
      windowHtml = renderFullStatsWindowHtml(state, uiState);
    } else if (state.activeFullWindow === 'battery') {
      windowHtml = renderBatteryWindowHtml(state);
    } else if (state.activeFullWindow === 'clock') {
      windowHtml = renderClockWindowHtml(state);
    } else {
      windowHtml = renderSettingsWindowHtml(state, currentTheme, uiState);
    }
    stage.innerHTML = windowHtml;
  } else {
    const dockHtml = renderDockHtml(state, currentTheme);
    const cardHtml = renderHoverCardHtml(state, currentTheme);
    let windowHtml = '';
    if (state.activeFullWindow === 'clipboard') {
      windowHtml = renderClipboardWindowHtml(state, uiState);
    } else if (state.activeFullWindow === 'stats') {
      windowHtml = renderFullStatsWindowHtml(state, uiState);
    } else if (state.activeFullWindow === 'battery') {
      windowHtml = renderBatteryWindowHtml(state);
    } else if (state.activeFullWindow === 'clock') {
      windowHtml = renderClockWindowHtml(state);
    } else if (state.activeFullWindow === 'settings') {
      windowHtml = renderSettingsWindowHtml(state, currentTheme, uiState);
    }
    stage.innerHTML = `${dockHtml}${cardHtml}${windowHtml}`;
    if (state.activeWidget && !state.activeFullWindow) {
      positionHoverCard();
    }
    requestAnimationFrame(() => {
      const dockEl = document.getElementById('flank-dock');
      if (dockEl) {
        attachDockMagnification(dockEl, (state.edgeOverride === 'top' ? 'right' : state.edgeOverride || currentTheme.layout.edge) as 'left' | 'right');
      }
      notifyNativeWindowRegion();
    });
  }

  // Restore scroll positions after DOM replacement
  const restoreScrolls = () => {
    scrollSnapshots.forEach(({ selector, top, left }) => {
      try {
        stage.querySelectorAll<HTMLElement>(selector).forEach((el) => {
          el.scrollTop = top;
          el.scrollLeft = left;
        });
      } catch { }
    });
  };
  restoreScrolls();
  requestAnimationFrame(restoreScrolls);

  // Value change cross-fade tracking for .flank-num (Step 5 Task 4)
  const numElements = stage.querySelectorAll<HTMLElement>('.flank-num');
  numElements.forEach((el, index) => {
    const key = el.getAttribute('data-num-key') || `${index}:${el.className}`;
    const currentVal = el.textContent?.trim() || '';
    const prevVal = lastNumValues.get(key);
    if (prevVal !== undefined && prevVal !== currentVal) {
      el.classList.add('is-updated');
      setTimeout(() => {
        el.classList.remove('is-updated');
      }, 150);
    }
    lastNumValues.set(key, currentVal);
  });

  if (preserveSearchFocus && activeElId) {
    const input = document.getElementById(activeElId) as HTMLInputElement | HTMLTextAreaElement | null;
    if (input) {
      if (activeVal !== null && input.value !== activeVal) {
        input.value = activeVal;
      }
      input.focus();
      if (selStart !== null && typeof input.setSelectionRange === 'function') {
        try {
          input.setSelectionRange(selStart, selStart);
        } catch { }
      }
    }
  }
}

function saveUserPrefs(): void {
  window.pywebview?.api?.save_preferences?.({
    themeId: state.themeId,
    edgeOverride: state.edgeOverride,
    accentOverride: state.accentOverride,
    reserveScreenSpace: state.reserveScreenSpace,
    autostart: state.autostart,
    items: state.items,
    dockState: getDockState(),
    startCollapsed: state.startCollapsed,
    autoCollapse: state.autoCollapse,
    autoCollapseSeconds: state.autoCollapseSeconds,
    collapseOnFullscreen: state.collapseOnFullscreen,
    collapseHotkey: state.collapseHotkey,
    showLogoOnTab: state.showLogoOnTab,
    recentAccents: state.recentAccents,
    useOnlineFaviconFallback: state.useOnlineFaviconFallback,
  });
}

function applyCurrentThemeSelection(): void {
  if (currentView === 'onboarding') {
    themeEngine.revertToPaper();
    return;
  }
  const res = themeEngine.switchTheme(state.themeId, {
    edge: state.edgeOverride ?? undefined,
    accent: state.accentOverride ?? undefined,
  });
  if (!res.valid) {
    uiState.themeValidationMsg = `Theme fell back to Paper: ${res.errors.join(' ')}`;
  } else {
    uiState.themeValidationMsg = null;
  }
  const cur = themeEngine.getCurrentTheme();
  if (cur.id !== 'liquid-glass' && (!cur.glass || cur.glass.mode !== 'wallpaper-sampled')) {
    document.documentElement.style.removeProperty('--flank-glass-wallpaper-url');
    document.documentElement.style.removeProperty('--flank-glass-wallpaper-size');
    document.documentElement.style.removeProperty('--flank-glass-wallpaper-pos');
  }
}

async function completeOnboardingFlow(
  result: { prefsPatch: Record<string, unknown>; snapshot: OnboardingSnapshot },
  skipped: boolean
): Promise<void> {
  const patch = result.prefsPatch;
  if (typeof patch.themeId === 'string') {
    state.themeId = patch.themeId;
  }
  if (patch.edgeOverride === 'left' || patch.edgeOverride === 'right') {
    state.edgeOverride = patch.edgeOverride;
  }
  if (typeof patch.accentOverride === 'string') {
    state.accentOverride = patch.accentOverride;
  }
  if (typeof patch.autostart === 'boolean') {
    state.autostart = patch.autostart;
  }
  if (Array.isArray(patch.items)) {
    state.items = normalizeDockItems(patch.items as DockItem[]);
  }
  setDockState('expanded');

  if (window.pywebview?.api?.complete_onboarding) {
    await window.pywebview.api.complete_onboarding(patch, skipped);
  } else {
    await window.pywebview?.api?.save_preferences?.(patch);
    await window.pywebview?.api?.close_window?.();
  }
}

function setupEventDelegation(): void {
  // Capture-phase click & pointerdown listeners on document guarantee clicking the collapsed edge tab always expands dock
  const handleDockExpand = (ev: Event) => {
    const target = ev.target as HTMLElement | null;
    const expandBtn = target?.closest<HTMLElement>('[data-action="expand-dock"], .flank-dock-tab');
    if (expandBtn || (currentView === 'dock' && isDockCollapsed())) {
      ev.preventDefault();
      ev.stopPropagation();
      expandDock();
    }
  };

  document.addEventListener('click', handleDockExpand, true);
  document.addEventListener('pointerdown', handleDockExpand, true);

  const stage = document.getElementById('flank-stage');
  if (!stage) return;

  // Direct Drag-and-Drop Reordering on the Live Dock
  let draggedItemId: string | null = null;

  stage.addEventListener('dragstart', (ev) => {
    const tile = (ev.target as HTMLElement)?.closest<HTMLElement>('.flank-tile');
    if (!tile) return;
    const itemId = tile.getAttribute('data-item-id');
    if (!itemId) return;
    draggedItemId = itemId;
    flankMachines.pointerInteraction.send({ type: 'START_DOCK_REORDER', itemId });
    flankMachines.flyoutCard.send({ type: 'FORCE_CLOSE' });
    hideDockTooltip();
    tile.classList.add('is-dragging');
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = 'move';
      ev.dataTransfer.setData('text/plain', itemId);
    }
  });

  stage.addEventListener('dragover', (ev) => {
    if (!draggedItemId) return;
    ev.preventDefault();
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move';
    const tile = (ev.target as HTMLElement)?.closest<HTMLElement>('.flank-tile');
    if (tile && tile.getAttribute('data-item-id') !== draggedItemId) {
      stage.querySelectorAll('.flank-tile.is-drag-over').forEach((el) => {
        if (el !== tile) el.classList.remove('is-drag-over');
      });
      tile.classList.add('is-drag-over');
    }
  });

  stage.addEventListener('dragleave', (ev) => {
    const tile = (ev.target as HTMLElement)?.closest<HTMLElement>('.flank-tile');
    if (tile) {
      tile.classList.remove('is-drag-over');
    }
  });

  stage.addEventListener('drop', async (ev) => {
    if (!draggedItemId) return;
    ev.preventDefault();
    const targetTile = (ev.target as HTMLElement)?.closest<HTMLElement>('.flank-tile');
    targetTile?.classList.remove('is-drag-over');
    const targetId = targetTile?.getAttribute('data-item-id');
    if (!targetId || targetId === draggedItemId) {
      draggedItemId = null;
      flankMachines.pointerInteraction.send({ type: 'END_INTERACTION' });
      return;
    }

    const fromIdx = state.items.findIndex((i) => i.id === draggedItemId);
    const toIdx = state.items.findIndex((i) => i.id === targetId);
    if (fromIdx >= 0 && toIdx >= 0) {
      const [moved] = state.items.splice(fromIdx, 1);
      state.items.splice(toIdx, 0, moved);
      renderApp();
      await window.pywebview?.api?.save_preferences?.({ items: state.items });
    }
    draggedItemId = null;
    flankMachines.pointerInteraction.send({ type: 'END_INTERACTION' });
  });

  stage.addEventListener('dragend', () => {
    draggedItemId = null;
    flankMachines.pointerInteraction.send({ type: 'END_INTERACTION' });
    stage.querySelectorAll('.flank-tile').forEach((el) => {
      el.classList.remove('is-dragging', 'is-drag-over');
    });
  });

  // Hover handling for widget tiles and card
  let lastHoverWidget: string | null = null;

  stage.addEventListener('pointerover', (ev) => {
    const target = ev.target as HTMLElement | null;
    if (!target) return;

    if (!flankMachines.pointerInteraction.canTriggerHoverCard()) {
      return;
    }

    if (currentView === 'dock') {
      if (!flankMachines.dockCollapse.canShowFlyout()) {
        return;
      }
      const widgetTile = target.closest<HTMLElement>('[data-widget]');
      if (widgetTile) {
        const wKind = widgetTile.getAttribute('data-widget') as WidgetKind;
        if (wKind && wKind !== lastHoverWidget) {
          lastHoverWidget = wKind;
          const rect = widgetTile.getBoundingClientRect();
          const centerY = Math.round(rect.top + rect.height / 2);
          suppressDockTooltip(true);
          hideDockTooltip();
          flankMachines.flyoutCard.send({
            type: 'HOVER_TILE',
            widget: wKind,
            anchorY: centerY,
            dockExpanded: true,
            modalOpen: Boolean(state.activeFullWindow),
            pointerBusy: !flankMachines.pointerInteraction.canTriggerHoverCard(),
          });
          window.pywebview?.api?.show_hover_card?.(wKind, centerY);
        }
      } else {
        if (lastHoverWidget !== null) {
          lastHoverWidget = null;
          flankMachines.flyoutCard.send({ type: 'LEAVE_DOCK_OR_CARD' });
          window.pywebview?.api?.hide_hover_card?.();
        }
        const anyTile = target.closest<HTMLElement>('.flank-tile');
        if (anyTile) {
          const label = anyTile.getAttribute('aria-label') || anyTile.getAttribute('title') || '';
          const itemId = anyTile.getAttribute('data-item-id');
          const item = itemId ? state.items.find((i) => i.id === itemId) : null;
          const shortcut = item?.shortcut;
          const edge = (state.edgeOverride || themeEngine.getCurrentTheme().layout.edge || 'right') as 'left' | 'right';
          if (label) {
            showDockTooltip({
              label,
              shortcut,
              rect: anyTile.getBoundingClientRect(),
              edge,
            });
          }
        }
      }
      return;
    }

    if (currentView === 'card') {
      flankMachines.flyoutCard.send({ type: 'ENTER_CARD' });
      window.pywebview?.api?.cancel_hide_card?.();
      return;
    }

    if (state.activeFullWindow) return;

    const widgetTile = target.closest<HTMLElement>('[data-widget]');
    const insideCard = target.closest<HTMLElement>('#flank-hover-card');

    if (widgetTile) {
      if (hoverCloseTimer) {
        clearTimeout(hoverCloseTimer);
        hoverCloseTimer = null;
      }
      const wKind = widgetTile.getAttribute('data-widget') as WidgetKind;
      const rect = widgetTile.getBoundingClientRect();
      const centerY = Math.round(rect.top + rect.height / 2);
      const nextCard = flankMachines.flyoutCard.send({
        type: 'HOVER_TILE',
        widget: wKind,
        anchorY: centerY,
        dockExpanded: flankMachines.dockCollapse.canShowFlyout(),
        modalOpen: Boolean(state.activeFullWindow),
        pointerBusy: !flankMachines.pointerInteraction.canTriggerHoverCard(),
      });
      if (nextCard.widget && state.activeWidget !== nextCard.widget) {
        state.activeWidget = nextCard.widget;
        renderApp();
      }
    } else if (insideCard) {
      flankMachines.flyoutCard.send({ type: 'ENTER_CARD' });
      if (hoverCloseTimer) {
        clearTimeout(hoverCloseTimer);
        hoverCloseTimer = null;
      }
    }
  });

  stage.addEventListener('pointerout', (ev) => {
    if (currentView === 'dock') {
      const related = (ev as PointerEvent).relatedTarget as HTMLElement | null;
      if (!related || !related.closest('.flank-tile')) {
        hideDockTooltip();
      }
      if (!related || !related.closest('#flank-dock')) {
        lastHoverWidget = null;
        suppressDockTooltip(false);
        flankMachines.flyoutCard.send({ type: 'LEAVE_DOCK_OR_CARD' });
        window.pywebview?.api?.hide_hover_card?.();
      }
      return;
    }

    if (currentView === 'card') {
      const related = (ev as PointerEvent).relatedTarget as HTMLElement | null;
      if (!related || !related.closest('#flank-hover-card')) {
        flankMachines.flyoutCard.send({ type: 'LEAVE_DOCK_OR_CARD' });
        window.pywebview?.api?.hide_hover_card?.();
      }
      return;
    }

    const related = (ev as PointerEvent).relatedTarget as HTMLElement | null;
    if (related && (related.closest('#flank-dock') || related.closest('#flank-hover-card'))) {
      return;
    }
    if (state.activeWidget && !state.activeFullWindow) {
      const nextCard = flankMachines.flyoutCard.send({ type: 'LEAVE_DOCK_OR_CARD' });
      if (nextCard.phase === 'pinned') {
        return;
      }
      if (hoverCloseTimer) clearTimeout(hoverCloseTimer);
      hoverCloseTimer = setTimeout(() => {
        flankMachines.flyoutCard.send({ type: 'GRACE_TIMEOUT' });
        state.activeWidget = null;
        renderApp();
      }, 180);
    }
  });

  // Dedicated titlebar window dragging for frameless modal window + slider scrubbing state
  stage.addEventListener('pointerdown', (ev) => {
    const target = ev.target as HTMLElement | null;
    if (!target) return;

    const rangeSlider = target.closest<HTMLInputElement>('input[type="range"]');
    if (rangeSlider) {
      flankMachines.pointerInteraction.send({
        type: 'START_SLIDER_SCRUB',
        controlId: rangeSlider.id || 'range-slider',
      });
      return;
    }

    if (currentView === 'modal' || currentView === 'onboarding') {
      const titlebar = target.closest<HTMLElement>('.flank-titlebar, .flank-ob-topbar');
      if (
        titlebar &&
        !target.closest('button, input, a, select, textarea, [data-action], [data-ob-action]') &&
        flankMachines.pointerInteraction.canStartWindowDrag()
      ) {
        flankMachines.pointerInteraction.send({ type: 'START_WINDOW_DRAG' });
        window.pywebview?.api?.drag_modal_window?.();
      }
    }
  });

  window.addEventListener('pointerup', () => {
    const mode = flankMachines.pointerInteraction.getSnapshot().mode;
    if (mode === 'scrubbing_slider' || mode === 'dragging_modal_window') {
      flankMachines.pointerInteraction.send({ type: 'END_INTERACTION' });
    }
  });

  window.addEventListener('pointercancel', () => {
    flankMachines.pointerInteraction.send({ type: 'END_INTERACTION' });
  });

  // Click actions
  stage.addEventListener('click', async (ev) => {
    const target = ev.target as HTMLElement | null;
    if (!target) return;

    if (currentView === 'onboarding') {
      const machine = ensureOnboardingMachine();
      const obBtn = target.closest<HTMLElement>(
        '[data-ob-action], [data-ob-autostart-row], [data-ob-edge], [data-ob-theme], [data-ob-accent], [data-ob-widget], [data-ob-widget-row]'
      );
      if (obBtn) {
        const obAction =
          obBtn.getAttribute('data-ob-action') ||
          (obBtn.hasAttribute('data-ob-autostart-row') ? 'toggle-autostart' : null);
        if (obAction === 'next') {
          machine.next();
          renderApp();
          return;
        }
        if (obAction === 'back') {
          machine.back();
          renderApp();
          return;
        }
        if (obAction === 'skip') {
          const res = machine.skip();
          await completeOnboardingFlow(res, true);
          return;
        }
        if (obAction === 'finish') {
          const res = machine.finish();
          await completeOnboardingFlow(res, false);
          return;
        }
        if (obAction === 'expand-themes') {
          machine.expandThemes();
          renderApp();
          return;
        }
        if (obAction === 'toggle-custom-accent') {
          machine.toggleCustomColorPopover();
          renderApp();
          return;
        }
        if (obAction === 'apply-custom-accent') {
          const hexInput = document.getElementById('flank-ob-color-hex') as HTMLInputElement | null;
          if (hexInput?.value) {
            machine.setAccent(hexInput.value);
          }
          machine.toggleCustomColorPopover(false);
          renderApp();
          return;
        }
        if (obAction === 'toggle-autostart') {
          const snap = machine.getSnapshot();
          machine.setAutostart(!snap.autostart);
          renderApp();
          return;
        }

        const obEdge = obBtn.getAttribute('data-ob-edge') as 'left' | 'right' | null;
        if (obEdge) {
          machine.setEdge(obEdge);
          renderApp();
          return;
        }

        const obTheme = obBtn.getAttribute('data-ob-theme');
        if (obTheme) {
          machine.setTheme(obTheme);
          renderApp();
          return;
        }

        const obAccent = obBtn.getAttribute('data-ob-accent');
        if (obAccent) {
          machine.setAccent(obAccent);
          machine.toggleCustomColorPopover(false);
          renderApp();
          return;
        }

        const obWidget = (obBtn.getAttribute('data-ob-widget') ||
          obBtn.getAttribute('data-ob-widget-row')) as WidgetKind | null;
        if (obWidget) {
          machine.toggleWidget(obWidget);
          renderApp();
          return;
        }
      }
      return;
    }

    const expandBtn = target.closest<HTMLElement>('[data-action="expand-dock"], .flank-dock-tab');
    if (expandBtn) {
      ev.preventDefault();
      ev.stopPropagation();
      expandDock();
      return;
    }

    const collapseBtn = target.closest<HTMLElement>('[data-action="collapse-dock"], .flank-dock-collapse-handle');
    if (collapseBtn) {
      ev.preventDefault();
      ev.stopPropagation();
      collapseDock('manual');
      return;
    }

    const btn = target.closest<HTMLElement>('button');
    if (!btn) return;

    // 1. Widget tile click -> show/toggle the flyout card!
    const wKind = btn.getAttribute('data-widget') as WidgetKind | null;
    if (wKind) {
      if (currentView === 'dock') {
        const rect = btn.getBoundingClientRect();
        const centerY = Math.round(rect.top + rect.height / 2);
        await window.pywebview?.api?.toggle_hover_card?.(wKind, centerY);
        return;
      }

      if (wKind === 'clipboard' && state.activeWidget === 'clipboard') {
        state.activeFullWindow = 'clipboard';
        state.activeWidget = null;
      } else if (wKind === 'stats' && state.activeWidget === 'stats') {
        state.activeFullWindow = 'stats';
        state.activeWidget = null;
      } else if (wKind === 'battery' && state.activeWidget === 'battery') {
        state.activeFullWindow = 'battery';
        state.activeWidget = null;
      } else if (wKind === 'clock' && state.activeWidget === 'clock') {
        state.activeFullWindow = 'clock';
        state.activeWidget = null;
      } else {
        state.activeWidget = state.activeWidget === wKind ? null : wKind;
      }
      renderApp();
      return;
    }

    // 2. App or Link tile click
    const itemKind = btn.getAttribute('data-item-kind');
    if (itemKind === 'app' || itemKind === 'link') {
      const itemId = btn.getAttribute('data-item-id') || '';
      const itemTarget = btn.getAttribute('data-target') || '';
      await window.pywebview?.api?.launch_item?.(itemId, itemTarget);
      return;
    }

    // 3. Named actions
    const action = btn.getAttribute('data-action');
    if (action === 'collapse-dock') {
      collapseDock('manual');
      return;
    }
    if (action === 'expand-dock') {
      expandDock();
      return;
    }
    if (action === 'refresh-item-icon') {
      const itemId = btn.getAttribute('data-item-id');
      const item = state.items.find((i) => i.id === itemId);
      if (item && item.target) {
        window.pywebview?.api?.resolve_item_icon?.(item.id, item.target, true);
      }
      return;
    }
    if (action === 'choose-item-icon') {
      const itemId = btn.getAttribute('data-item-id');
      if (itemId) {
        window.pywebview?.api?.choose_custom_icon_file?.(itemId);
      }
      return;
    }
    if (action === 'toggle-custom-color') {
      uiState.customColorPickerOpen = !uiState.customColorPickerOpen;
      renderApp();
      return;
    }
    if (action === 'apply-custom-hex') {
      const hexInput = document.getElementById('flank-accent-hex-input') as HTMLInputElement | null;
      if (hexInput && hexInput.value) {
        let hex = hexInput.value.trim();
        if (!hex.startsWith('#')) hex = '#' + hex;
        if (hex.length === 4) {
          hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
          state.accentOverride = hex;
          uiState.customColorContrastWarning = checkAccentContrast(hex);
          if (!state.recentAccents) state.recentAccents = [];
          if (!state.recentAccents.some((h) => h.toLowerCase() === hex.toLowerCase())) {
            state.recentAccents = [hex, ...state.recentAccents.filter((h) => h.toLowerCase() !== hex.toLowerCase())].slice(0, 5);
          }
          applyCurrentThemeSelection();
          saveUserPrefs();
          renderApp();
        }
      }
      return;
    }
    if (action === 'reset-accent') {
      state.accentOverride = null;
      applyCurrentThemeSelection();
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === 'replay-onboarding') {
      if (window.pywebview?.api?.open_onboarding) {
        await window.pywebview.api.open_onboarding(true);
        return;
      }
      window.flankStartOnboarding?.({ replay: true });
      return;
    }
    if (action === 'toggle-auto-collapse') {
      state.autoCollapse = !state.autoCollapse;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === 'toggle-collapse-fullscreen') {
      state.collapseOnFullscreen = !state.collapseOnFullscreen;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === 'toggle-logo-on-tab') {
      state.showLogoOnTab = !state.showLogoOnTab;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === 'toggle-start-collapsed') {
      state.startCollapsed = !state.startCollapsed;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === 'toggle-online-favicon') {
      state.useOnlineFaviconFallback = !(state.useOnlineFaviconFallback ?? true);
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === 'open-settings') {
      const targetTab = btn.getAttribute('data-settings-tab');
      if (targetTab) {
        uiState.settingsTab = targetTab as any;
      }
      if (window.pywebview?.api?.open_window) {
        await window.pywebview.api.open_window('settings');
        return;
      }
      state.activeFullWindow = state.activeFullWindow === 'settings' ? null : 'settings';
      state.activeWidget = null;
      renderApp();
      return;
    }
    if (action === 'open-full-stats') {
      if (window.pywebview?.api?.open_window) {
        await window.pywebview.api.open_window('stats');
        return;
      }
      state.activeFullWindow = 'stats';
      state.activeWidget = null;
      renderApp();
      return;
    }
    if (action === 'open-battery-window') {
      if (window.pywebview?.api?.open_window) {
        await window.pywebview.api.open_window('battery');
        return;
      }
      state.activeFullWindow = 'battery';
      state.activeWidget = null;
      renderApp();
      return;
    }
    if (action === 'open-clock-window') {
      if (window.pywebview?.api?.open_window) {
        await window.pywebview.api.open_window('clock');
        return;
      }
      state.activeFullWindow = 'clock';
      state.activeWidget = null;
      renderApp();
      return;
    }
    if (action === 'add-world-clock') {
      const cityInput = document.getElementById('flank-clock-city-input') as HTMLInputElement | null;
      const cityVal = cityInput?.value.trim() || '';
      if (cityVal) {
        if (cityInput) cityInput.value = '';
        if (window.pywebview?.api?.add_world_clock) {
          const updated = await window.pywebview.api.add_world_clock(cityVal);
          if (updated?.clock) {
            state.clock = updated.clock;
          }
        } else {
          state.clock.cities.push({
            id: `clk-${Date.now()}`,
            city: cityVal,
            country: '',
            timezone: 'UTC',
            timeText: state.clock.localTimeText,
            dateText: 'Today',
            offsetText: 'UTC',
            isDay: true,
          });
        }
        renderApp();
      }
      return;
    }
    if (action === 'add-custom-item') {
      const lblInput = document.getElementById('flank-new-item-label') as HTMLInputElement | null;
      const tgtInput = document.getElementById('flank-new-item-target') as HTMLInputElement | null;
      const label = lblInput?.value.trim() || '';
      const targetUrlOrCmd = tgtInput?.value.trim() || '';
      if (label && targetUrlOrCmd) {
        const isLink = targetUrlOrCmd.startsWith('http://') || targetUrlOrCmd.startsWith('https://');
        const newItem: DockItem = {
          id: `custom-${Date.now()}`,
          group: 'apps',
          kind: isLink ? 'link' : 'app',
          label,
          shortCode: label.slice(0, 2).toLowerCase(),
          icon: isLink ? 'browser' : 'terminal',
          target: targetUrlOrCmd,
          shortcut: '',
          enabled: true,
        };
        state.items.unshift(newItem);
        if (lblInput) lblInput.value = '';
        if (tgtInput) tgtInput.value = '';
        saveUserPrefs();
        renderApp();
        window.pywebview?.api?.resolve_item_icon?.(newItem.id, targetUrlOrCmd);
      }
      return;
    }
    if (action === 'toggle-widgets-collapse') {
      state.widgetsCollapsed = !state.widgetsCollapsed;
      try {
        window.pywebview?.api?.set_widgets_collapsed?.(state.widgetsCollapsed);
      } catch {}
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === 'reset-recommended-items') {
      try {
        const nextItems = await window.pywebview?.api?.reset_recommended_items?.();
        if (Array.isArray(nextItems)) {
          state.items = nextItems;
        } else {
          state.items = createSampleState().items;
        }
      } catch {
        state.items = createSampleState().items;
      }
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === 'reset-default-items') {
      state.items = createSampleState().items;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === 'open-clipboard-window') {
      if (window.pywebview?.api?.open_window) {
        await window.pywebview.api.open_window('clipboard');
        return;
      }
      state.activeFullWindow = 'clipboard';
      state.activeWidget = null;
      renderApp();
      return;
    }
    if (action === 'close-full-window') {
      if (window.pywebview?.api?.close_window) {
        await window.pywebview.api.close_window();
        return;
      }
      state.activeFullWindow = null;
      uiState.recordingItemId = null;
      renderApp();
      return;
    }
    if (action === 'revert-paper') {
      state.themeId = 'paper';
      state.edgeOverride = null;
      state.accentOverride = null;
      applyCurrentThemeSelection();
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === 'save-weather-city') {
      const cityInput = document.getElementById('flank-weather-city-input') as HTMLInputElement | null;
      if (cityInput && cityInput.value.trim()) {
        state.weather.city = cityInput.value.trim();
        const updated = await window.pywebview?.api?.update_weather_city?.(state.weather.city);
        if (updated?.weather) {
          state.weather = updated.weather;
        }
        renderApp();
      }
      return;
    }
    if (action === 'clear-clipboard') {
      state.clipboard.items = state.clipboard.items.filter((i) => i.pinned);
      state.clipboard.count = state.clipboard.items.length;
      await window.pywebview?.api?.clear_unpinned_clipboard?.();
      renderApp();
      return;
    }
    if (action === 'toggle-autostart') {
      state.autostart = !state.autostart;
      saveUserPrefs();
      renderApp();
      return;
    }

    // 4. Media player, Focus timer, and World Clock controls
    const mediaAction = btn.getAttribute('data-media-action');
    if (mediaAction) {
      if (mediaAction === 'play-pause') {
        state.player.playing = !state.player.playing;
      }
      await window.pywebview?.api?.media_control?.(mediaAction);
      renderApp();
      return;
    }

    const focusAction = btn.getAttribute('data-focus-action');
    if (focusAction) {
      if (focusAction === 'toggle') {
        state.focus.running = !state.focus.running;
      } else if (focusAction === 'reset') {
        state.focus.running = false;
        state.focus.remainingSec = state.focus.totalSec;
      } else if (focusAction === 'switch-mode') {
        state.focus.running = false;
        if (state.focus.mode === 'focus') {
          state.focus.mode = 'break';
          state.focus.totalSec = 5 * 60;
          state.focus.remainingSec = 5 * 60;
        } else {
          state.focus.mode = 'focus';
          state.focus.totalSec = state.focus.durationMinutes * 60;
          state.focus.remainingSec = state.focus.durationMinutes * 60;
        }
      }
      const res = await window.pywebview?.api?.focus_control?.(focusAction);
      if (res?.focus) {
        state.focus = res.focus;
      }
      renderApp();
      return;
    }

    const focusDur = btn.getAttribute('data-focus-duration');
    if (focusDur) {
      const mins = Number(focusDur) || 25;
      state.focus.mode = 'focus';
      state.focus.durationMinutes = mins;
      state.focus.totalSec = mins * 60;
      state.focus.remainingSec = mins * 60;
      state.focus.running = false;
      const res = await window.pywebview?.api?.focus_control?.('duration', mins);
      if (res?.focus) {
        state.focus = res.focus;
      }
      renderApp();
      return;
    }

    const clockQuickAdd = btn.getAttribute('data-clock-quick-add');
    if (clockQuickAdd) {
      const updated = await window.pywebview?.api?.add_world_clock?.(clockQuickAdd);
      if (updated?.clock) {
        state.clock = updated.clock;
      }
      renderApp();
      return;
    }

    const clockRemoveId = btn.getAttribute('data-clock-remove');
    if (clockRemoveId) {
      state.clock.cities = state.clock.cities.filter((c) => c.id !== clockRemoveId);
      const updated = await window.pywebview?.api?.remove_world_clock?.(clockRemoveId);
      if (updated?.clock) {
        state.clock = updated.clock;
      }
      renderApp();
      return;
    }

    // 4b. Scratchpad, Color Picker, Calendar, Audio, Network actions
    const copyRaw = btn.getAttribute('data-copy-raw');
    if (copyRaw !== null) {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(copyRaw).catch(() => { });
      }
      await window.pywebview?.api?.copy_raw_text?.(copyRaw);
      renderApp();
      return;
    }

    const scratchSelect = btn.getAttribute('data-scratch-select');
    if (scratchSelect) {
      state.scratchpad.activeNoteId = scratchSelect;
      const updated = await window.pywebview?.api?.scratchpad_action?.('select', scratchSelect, '');
      if (updated?.scratchpad) {
        state.scratchpad = updated.scratchpad;
      }
      renderApp();
      return;
    }

    if (action === 'scratch-new-note') {
      const updated = await window.pywebview?.api?.scratchpad_action?.('new', '', '');
      if (updated?.scratchpad) {
        state.scratchpad = updated.scratchpad;
      } else {
        const newId = `note-${Date.now()}`;
        state.scratchpad.notes.push({
          id: newId,
          title: `Note ${state.scratchpad.notes.length + 1}`,
          content: '',
          updatedAt: 'Just now',
        });
        state.scratchpad.activeNoteId = newId;
      }
      renderApp();
      return;
    }

    if (action === 'scratch-copy') {
      const active =
        state.scratchpad.notes.find((n) => n.id === state.scratchpad.activeNoteId) || state.scratchpad.notes[0];
      if (active) {
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(active.content).catch(() => { });
        }
        await window.pywebview?.api?.copy_raw_text?.(active.content);
      }
      return;
    }

    if (action === 'scratch-clear') {
      const active =
        state.scratchpad.notes.find((n) => n.id === state.scratchpad.activeNoteId) || state.scratchpad.notes[0];
      if (active) {
        active.content = '';
        const updated = await window.pywebview?.api?.scratchpad_action?.('update', active.id, '');
        if (updated?.scratchpad) {
          state.scratchpad = updated.scratchpad;
        }
        renderApp();
      }
      return;
    }

    const scratchDel = btn.getAttribute('data-scratch-delete');
    if (scratchDel) {
      const updated = await window.pywebview?.api?.scratchpad_action?.('delete', scratchDel, '');
      if (updated?.scratchpad) {
        state.scratchpad = updated.scratchpad;
      } else if (state.scratchpad.notes.length > 1) {
        state.scratchpad.notes = state.scratchpad.notes.filter((n) => n.id !== scratchDel);
        state.scratchpad.activeNoteId = state.scratchpad.notes[0].id;
      }
      renderApp();
      return;
    }

    if (action === 'pick-screen-color') {
      const EyeDropperCtor = (window as unknown as { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } })
        .EyeDropper;
      if (EyeDropperCtor) {
        try {
          const dropper = new EyeDropperCtor();
          const res = await dropper.open();
          if (res?.sRGBHex) {
            const hex = res.sRGBHex.toUpperCase();
            if (navigator.clipboard?.writeText) {
              navigator.clipboard.writeText(hex).catch(() => { });
            }
            const updated = await window.pywebview?.api?.set_picked_color?.(hex);
            if (updated?.colorpicker) {
              state.colorpicker = updated.colorpicker;
            } else {
              state.colorpicker.currentHex = hex;
            }
            renderApp();
            return;
          }
        } catch {
          // User cancelled or fallback to native Win32 pixel sampler
        }
      }
      const updated = await window.pywebview?.api?.pick_screen_color?.();
      if (updated?.colorpicker) {
        state.colorpicker = updated.colorpicker;
        renderApp();
      }
      return;
    }

    const colorSelect = btn.getAttribute('data-color-select');
    if (colorSelect) {
      state.colorpicker.currentHex = colorSelect;
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(colorSelect).catch(() => { });
      }
      const updated = await window.pywebview?.api?.set_picked_color?.(colorSelect);
      if (updated?.colorpicker) {
        state.colorpicker = updated.colorpicker;
      }
      renderApp();
      return;
    }

    if (action === 'cal-add-event') {
      const titleInput = document.getElementById('flank-cal-title-input') as HTMLInputElement | null;
      const timeInput = document.getElementById('flank-cal-time-input') as HTMLInputElement | null;
      const urlInput = document.getElementById('flank-cal-url-input') as HTMLInputElement | null;
      const title = titleInput?.value.trim() || '';
      const timeStr = timeInput?.value.trim() || '4:00 PM';
      const joinUrl = urlInput?.value.trim() || '';
      if (title) {
        if (titleInput) titleInput.value = '';
        if (timeInput) timeInput.value = '';
        if (urlInput) urlInput.value = '';
        const updated = await window.pywebview?.api?.calendar_action?.('add', title, timeStr, joinUrl);
        if (updated?.calendar) {
          state.calendar = updated.calendar;
        } else {
          state.calendar.events.push({
            id: `evt-${Date.now()}`,
            title,
            timeText: timeStr,
            relativeText: 'Scheduled',
            joinUrl: joinUrl || undefined,
            provider: joinUrl.includes('zoom') ? 'Zoom' : joinUrl.includes('teams') ? 'Teams' : joinUrl ? 'Meet' : 'Event',
          });
        }
        renderApp();
      }
      return;
    }

    const calDeleteId = btn.getAttribute('data-cal-delete');
    if (calDeleteId) {
      state.calendar.events = state.calendar.events.filter((e) => e.id !== calDeleteId);
      const updated = await window.pywebview?.api?.calendar_action?.('delete', calDeleteId, '', '');
      if (updated?.calendar) {
        state.calendar = updated.calendar;
      }
      renderApp();
      return;
    }

    const audioSet = btn.getAttribute('data-audio-set');
    if (audioSet !== null) {
      const vol = Math.max(0, Math.min(100, Number(audioSet)));
      state.audio.volumePercent = vol;
      state.audio.muted = vol === 0;
      const updated = await window.pywebview?.api?.audio_control?.('set', vol);
      if (updated?.audio) {
        state.audio = updated.audio;
      }
      renderApp();
      return;
    }

    const audioAction = btn.getAttribute('data-audio-action');
    if (audioAction) {
      if (audioAction === 'vol-down') {
        state.audio.volumePercent = Math.max(0, state.audio.volumePercent - 10);
      } else if (audioAction === 'vol-up') {
        state.audio.volumePercent = Math.min(100, state.audio.volumePercent + 10);
        state.audio.muted = false;
      } else if (audioAction === 'toggle-mute') {
        state.audio.muted = !state.audio.muted;
      } else if (audioAction === 'toggle-mic') {
        state.audio.micMuted = !state.audio.micMuted;
      }
      const updated = await window.pywebview?.api?.audio_control?.(audioAction);
      if (updated?.audio) {
        state.audio = updated.audio;
      }
      renderApp();
      return;
    }

    if (action === 'net-refresh') {
      const updated = await window.pywebview?.api?.network_action?.('refresh', 0);
      if (updated?.network) {
        state.network = updated.network;
      }
      renderApp();
      return;
    }

    const killPid = btn.getAttribute('data-kill-pid');
    if (killPid) {
      const pidNum = Number(killPid);
      state.network.ports = state.network.ports.filter((p) => p.pid !== pidNum);
      const updated = await window.pywebview?.api?.network_action?.('kill', pidNum);
      if (updated?.network) {
        state.network = updated.network;
      }
      renderApp();
      return;
    }

    const deleteItemId = btn.getAttribute('data-delete-item');
    if (deleteItemId) {
      state.items = state.items.filter((i) => i.id !== deleteItemId);
      saveUserPrefs();
      renderApp();
      return;
    }

    // 4c. Tasks, Calculator, Habits, Storage, Display, Privacy, Ambient, Runner
    if (action === 'add-task') {
      const taskInput = document.getElementById('flank-task-input') as HTMLInputElement | null;
      const text = taskInput?.value.trim() || '';
      if (text) {
        if (taskInput) taskInput.value = '';
        if (!state.tasks) state.tasks = { items: [], pendingCount: 0 };
        const newTask: TaskItem = { id: `task-${Date.now()}`, text, done: false, createdAt: 'Just now' };
        state.tasks.items.unshift(newTask);
        state.tasks.pendingCount = state.tasks.items.filter((t) => !t.done).length;
        const updated = await window.pywebview?.api?.tasks_action?.('add', text);
        if (updated?.tasks) state.tasks = updated.tasks;
        renderApp();
      }
      return;
    }

    const toggleTaskId = btn.getAttribute('data-task-id');
    if (action === 'toggle-task' && toggleTaskId) {
      if (state.tasks?.items) {
        const item = state.tasks.items.find((t) => t.id === toggleTaskId);
        if (item) {
          item.done = !item.done;
          state.tasks.pendingCount = state.tasks.items.filter((t) => !t.done).length;
        }
      }
      const updated = await window.pywebview?.api?.tasks_action?.('toggle', toggleTaskId);
      if (updated?.tasks) state.tasks = updated.tasks;
      renderApp();
      return;
    }

    if (action === 'delete-task' && toggleTaskId) {
      if (state.tasks?.items) {
        state.tasks.items = state.tasks.items.filter((t) => t.id !== toggleTaskId);
        state.tasks.pendingCount = state.tasks.items.filter((t) => !t.done).length;
      }
      const updated = await window.pywebview?.api?.tasks_action?.('delete', toggleTaskId);
      if (updated?.tasks) state.tasks = updated.tasks;
      renderApp();
      return;
    }

    if (action === 'clear-completed-tasks') {
      if (state.tasks?.items) {
        state.tasks.items = state.tasks.items.filter((t) => !t.done);
        state.tasks.pendingCount = state.tasks.items.length;
      }
      const updated = await window.pywebview?.api?.tasks_action?.('clear_completed');
      if (updated?.tasks) state.tasks = updated.tasks;
      renderApp();
      return;
    }

    if (action === 'copy-calc-result') {
      const res = state.calculator?.lastResult;
      if (res && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(res).catch(() => {});
      }
      return;
    }

    const recallExpr = btn.getAttribute('data-expr');
    if (action === 'recall-calc' && recallExpr) {
      const calcInput = document.getElementById('flank-calc-input') as HTMLInputElement | null;
      if (calcInput) calcInput.value = recallExpr;
      const res = evaluateExpression(recallExpr);
      if (!state.calculator) state.calculator = { lastExpr: '', lastResult: '', history: [] };
      state.calculator.lastExpr = recallExpr;
      state.calculator.lastResult = res;
      renderApp();
      return;
    }

    if (action === 'habit-water-add') {
      if (!state.habits) state.habits = { waterGlasses: 0, waterGoal: 8, lastStretchMin: 0, streakDays: 1 };
      state.habits.waterGlasses += 1;
      const updated = await window.pywebview?.api?.habits_action?.('add_water', 1);
      if (updated?.habits) state.habits = updated.habits;
      renderApp();
      return;
    }

    if (action === 'habit-water-sub') {
      if (!state.habits) state.habits = { waterGlasses: 0, waterGoal: 8, lastStretchMin: 0, streakDays: 1 };
      state.habits.waterGlasses = Math.max(0, state.habits.waterGlasses - 1);
      const updated = await window.pywebview?.api?.habits_action?.('sub_water', 1);
      if (updated?.habits) state.habits = updated.habits;
      renderApp();
      return;
    }

    if (action === 'habit-log-stretch') {
      if (state.habits) state.habits.lastStretchMin = 0;
      const updated = await window.pywebview?.api?.habits_action?.('log_stretch');
      if (updated?.habits) state.habits = updated.habits;
      renderApp();
      return;
    }

    const openDrive = btn.getAttribute('data-drive');
    if (action === 'open-drive' && openDrive) {
      window.pywebview?.api?.open_drive?.(openDrive);
      return;
    }

    if (action === 'launch-disk-cleanup') {
      window.pywebview?.api?.launch_disk_cleanup?.();
      return;
    }

    if (action === 'toggle-night-light') {
      if (state.display) state.display.nightLight = !state.display.nightLight;
      const updated = await window.pywebview?.api?.toggle_night_light?.();
      if (updated?.display) state.display = updated.display;
      renderApp();
      return;
    }

    if (action === 'toggle-mic-mute') {
      if (state.privacy) state.privacy.micMuted = !state.privacy.micMuted;
      const updated = await window.pywebview?.api?.toggle_mic_mute?.();
      if (updated?.privacy) state.privacy = updated.privacy;
      renderApp();
      return;
    }

    if (action === 'toggle-ambient') {
      if (!state.ambient) state.ambient = { playing: false, sound: 'rain', volume: 65 };
      if (isAmbientPlaying()) {
        stopAmbientSound();
        state.ambient.playing = false;
      } else {
        startAmbientSound(state.ambient.sound, state.ambient.volume);
        state.ambient.playing = true;
      }
      renderApp();
      return;
    }

    const ambSound = btn.getAttribute('data-sound');
    if (action === 'select-ambient-sound' && ambSound) {
      if (!state.ambient) state.ambient = { playing: false, sound: 'rain', volume: 65 };
      state.ambient.sound = ambSound as any;
      if (isAmbientPlaying()) {
        startAmbientSound(ambSound, state.ambient.volume);
      }
      renderApp();
      return;
    }

    const runCmd = btn.getAttribute('data-cmd');
    if (action === 'run-preset-cmd' && runCmd) {
      if (state.runner) {
        state.runner.running = true;
        state.runner.lastCmd = runCmd;
      }
      renderApp();
      const updated = await window.pywebview?.api?.execute_runner_command?.(runCmd);
      if (updated?.runner) state.runner = updated.runner;
      renderApp();
      return;
    }

    if (action === 'run-custom-cmd') {
      const runnerInput = document.getElementById('flank-runner-input') as HTMLInputElement | null;
      const cmd = runnerInput?.value.trim() || '';
      if (cmd) {
        if (state.runner) {
          state.runner.running = true;
          state.runner.lastCmd = cmd;
        }
        renderApp();
        const updated = await window.pywebview?.api?.execute_runner_command?.(cmd);
        if (updated?.runner) state.runner = updated.runner;
        renderApp();
      }
      return;
    }

    // 5. Clipboard quick copy or window actions
    const copyId = btn.getAttribute('data-copy-id') || btn.getAttribute('data-cb-copy');
    if (copyId) {
      const entry = state.clipboard.items.find((i) => i.id === copyId);
      if (entry && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(entry.content).catch(() => { });
      }
      await window.pywebview?.api?.copy_clipboard_item?.(copyId);
      if (btn.hasAttribute('data-copy-id')) {
        state.activeWidget = null;
      }
      renderApp();
      return;
    }

    const cbFilter = btn.getAttribute('data-cb-filter') as WindowUiState['clipboardFilter'] | null;
    if (cbFilter) {
      uiState.clipboardFilter = cbFilter;
      renderApp();
      return;
    }

    const cbSelect = btn.getAttribute('data-cb-select');
    if (cbSelect) {
      uiState.selectedClipboardId = cbSelect;
      renderApp();
      return;
    }

    const cbPin = btn.getAttribute('data-cb-pin');
    if (cbPin) {
      const item = state.clipboard.items.find((i) => i.id === cbPin);
      if (item) {
        item.pinned = !item.pinned;
      }
      await window.pywebview?.api?.pin_clipboard_item?.(cbPin);
      renderApp();
      return;
    }

    const cbDelete = btn.getAttribute('data-cb-delete');
    if (cbDelete) {
      state.clipboard.items = state.clipboard.items.filter((i) => i.id !== cbDelete);
      state.clipboard.count = Math.max(0, state.clipboard.items.length);
      await window.pywebview?.api?.delete_clipboard_item?.(cbDelete);
      renderApp();
      return;
    }

    // 6. Stats refresh rate & pause & tab
    const statsTab = btn.getAttribute('data-stats-tab') as 'telemetry' | 'processes' | null;
    if (statsTab) {
      uiState.statsTab = statsTab;
      renderApp();
      return;
    }
    const statsRate = btn.getAttribute('data-stats-rate');
    if (statsRate) {
      state.stats.refreshSec = Number(statsRate) as 1 | 2 | 5;
      state.stats.paused = false;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (btn.hasAttribute('data-stats-pause')) {
      state.stats.paused = !state.stats.paused;
      renderApp();
      return;
    }

    // 7. Settings navigation & Theme Store controls
    const settingsTab = btn.getAttribute('data-settings-tab') as WindowUiState['settingsTab'] | null;
    if (settingsTab) {
      uiState.settingsTab = settingsTab;
      renderApp();
      return;
    }

    const applyThemeId = btn.getAttribute('data-apply-theme');
    if (applyThemeId) {
      state.themeId = applyThemeId;
      state.edgeOverride = null;
      state.accentOverride = null;
      applyCurrentThemeSelection();
      saveUserPrefs();
      renderApp();
      return;
    }

    const setEdge = btn.getAttribute('data-set-edge') as 'left' | 'right' | null;
    if (setEdge) {
      state.edgeOverride = setEdge;
      applyCurrentThemeSelection();
      saveUserPrefs();
      renderApp();
      return;
    }

    const setAccent = btn.getAttribute('data-set-accent');
    if (setAccent) {
      state.accentOverride = setAccent;
      applyCurrentThemeSelection();
      saveUserPrefs();
      renderApp();
      return;
    }

    if (btn.hasAttribute('data-toggle-appbar')) {
      state.reserveScreenSpace = !state.reserveScreenSpace;
      saveUserPrefs();
      renderApp();
      return;
    }

    const toggleItemId = btn.getAttribute('data-toggle-item');
    if (toggleItemId) {
      const item = state.items.find((i) => i.id === toggleItemId);
      if (item) {
        item.enabled = !item.enabled;
        saveUserPrefs();
        renderApp();
      }
      return;
    }

    const moveUpIdx = btn.getAttribute('data-move-up');
    if (moveUpIdx !== null) {
      const idx = Number(moveUpIdx);
      if (idx > 0 && idx < state.items.length) {
        const tmp = state.items[idx - 1];
        state.items[idx - 1] = state.items[idx];
        state.items[idx] = tmp;
        saveUserPrefs();
        renderApp();
      }
      return;
    }

    const moveDownIdx = btn.getAttribute('data-move-down');
    if (moveDownIdx !== null) {
      const idx = Number(moveDownIdx);
      if (idx >= 0 && idx < state.items.length - 1) {
        const tmp = state.items[idx + 1];
        state.items[idx + 1] = state.items[idx];
        state.items[idx] = tmp;
        saveUserPrefs();
        renderApp();
      }
      return;
    }

    const recordItemId = btn.getAttribute('data-record-shortcut');
    if (recordItemId) {
      if (uiState.recordingItemId === recordItemId) {
        flankMachines.shortcutRecorder.send({ type: 'CANCEL' });
        uiState.recordingItemId = null;
      } else {
        flankMachines.shortcutRecorder.send({ type: 'START_RECORDING', targetId: recordItemId });
        uiState.recordingItemId = recordItemId;
      }
      uiState.shortcutConflictMsg = null;
      renderApp();
      return;
    }
  });

  // Search box and text inputs live typing
  let scratchpadSaveTimer: ReturnType<typeof setTimeout> | null = null;
  stage.addEventListener('change', (ev) => {
    const target = ev.target as HTMLInputElement | null;
    if (!target) return;
    if (target.id === 'flank-native-color-picker' || target.id === 'flank-accent-hex-input') {
      let hex = target.value.trim();
      if (!hex.startsWith('#')) hex = '#' + hex;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        state.accentOverride = hex;
        if (!state.recentAccents) state.recentAccents = [];
        if (!state.recentAccents.includes(hex)) {
          state.recentAccents = [hex, ...state.recentAccents.filter((h) => h !== hex)].slice(0, 5);
        }
        applyCurrentThemeSelection();
        saveUserPrefs();
        renderApp();
      }
    }
  });

  stage.addEventListener('change', (ev) => {
    const target = ev.target as HTMLInputElement | null;
    if (!target) return;
    if (target.id === 'flank-hue-slider' || target.id === 'flank-accent-hex-input') {
      if (state.accentOverride) {
        if (!state.recentAccents) state.recentAccents = [];
        const hex = state.accentOverride;
        if (!state.recentAccents.some((h) => h.toLowerCase() === hex.toLowerCase())) {
          state.recentAccents = [hex, ...state.recentAccents.filter((h) => h.toLowerCase() !== hex.toLowerCase())].slice(0, 5);
        }
        saveUserPrefs();
        renderApp();
      }
    } else if (target.id === 'flank-auto-collapse-slider') {
      saveUserPrefs();
    }
  });

  stage.addEventListener('input', (ev) => {
    const target = ev.target as HTMLInputElement | HTMLTextAreaElement | null;
    if (!target) return;
    if (target.id === 'flank-hue-slider') {
      const hue = Number((target as HTMLInputElement).value) || 0;
      const hex = hslToHex(hue, 85, 55);
      const hexInput = document.getElementById('flank-accent-hex-input') as HTMLInputElement | null;
      if (hexInput) hexInput.value = hex;
      const swatch = document.getElementById('flank-custom-swatch-preview') as HTMLElement | null;
      if (swatch) swatch.style.background = hex;
      window.requestAnimationFrame(() => {
        state.accentOverride = hex;
        uiState.customColorContrastWarning = checkAccentContrast(hex);
        applyCurrentThemeSelection();
      });
    } else if (target.id === 'flank-accent-hex-input') {
      let hex = target.value.trim();
      if (!hex.startsWith('#')) hex = '#' + hex;
      if (hex.length === 4) {
        hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
      }
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        const swatch = document.getElementById('flank-custom-swatch-preview') as HTMLElement | null;
        if (swatch) swatch.style.background = hex;
        window.requestAnimationFrame(() => {
          state.accentOverride = hex;
          uiState.customColorContrastWarning = checkAccentContrast(hex);
          applyCurrentThemeSelection();
        });
      }
    } else if (target.id === 'flank-auto-collapse-slider' || target.id === 'flank-auto-collapse-seconds') {
      const secs = Math.max(3, Math.min(60, Number(target.value) || 10));
      state.autoCollapseSeconds = secs;
      const valSpan = document.getElementById('flank-auto-collapse-val');
      if (valSpan) valSpan.textContent = `${secs}s`;
    } else if (target.id === 'flank-cb-search') {
      uiState.clipboardQuery = target.value;
      renderApp(true);
    } else if (target.id === 'flank-proc-search') {
      uiState.processQuery = target.value;
      renderApp(true);
    } else if (target.id === 'flank-weather-city-input') {
      state.weather.city = target.value;
    } else if (target.id === 'flank-calc-input') {
      const expr = target.value;
      const res = evaluateExpression(expr);
      const resBox = document.getElementById('flank-calc-result');
      if (resBox) resBox.textContent = res;
      if (!state.calculator) state.calculator = { lastExpr: '', lastResult: '', history: [] };
      state.calculator.lastExpr = expr;
      state.calculator.lastResult = res;
    } else if (target.id === 'flank-brightness-slider') {
      const val = Number((target as HTMLInputElement).value) || 85;
      const dispText = document.getElementById('flank-disp-val');
      if (dispText) dispText.textContent = `${val}%`;
      if (!state.display) state.display = { brightness: val, nightLight: false, resolution: '1920 × 1080', refreshRate: 144, scaling: 100 };
      state.display.brightness = val;
      window.pywebview?.api?.set_brightness?.(val);
    } else if (target.id === 'flank-ambient-volume') {
      const vol = Number((target as HTMLInputElement).value) || 65;
      const volText = document.getElementById('flank-amb-vol-text');
      if (volText) volText.textContent = `${vol}%`;
      setAmbientVolume(vol);
      if (!state.ambient) state.ambient = { playing: false, sound: 'rain', volume: vol };
      state.ambient.volume = vol;
    } else if (target.id === 'flank-scratchpad-textarea') {
      const active =
        state.scratchpad.notes.find((n) => n.id === state.scratchpad.activeNoteId) || state.scratchpad.notes[0];
      if (active) {
        active.content = target.value;
        if (scratchpadSaveTimer) clearTimeout(scratchpadSaveTimer);
        scratchpadSaveTimer = setTimeout(() => {
          window.pywebview?.api?.scratchpad_action?.('update', active.id, active.content);
          renderApp(true);
        }, 350);
      }
    } else if (target.id === 'flank-ob-color-native') {
      const hex = target.value.toUpperCase();
      const hexInput = document.getElementById('flank-ob-color-hex') as HTMLInputElement | null;
      if (hexInput) hexInput.value = hex;
      if (currentView === 'onboarding') {
        const machine = ensureOnboardingMachine();
        machine.setAccent(hex);
        renderApp(true);
      }
    } else if (target.id === 'flank-ob-color-hex') {
      let hex = target.value.trim();
      if (!hex.startsWith('#')) hex = `#${hex}`;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex) && currentView === 'onboarding') {
        const nativePicker = document.getElementById('flank-ob-color-native') as HTMLInputElement | null;
        if (nativePicker) nativePicker.value = hex;
        const machine = ensureOnboardingMachine();
        machine.setAccent(hex);
        renderApp(true);
      }
    } else if (target.id === 'flank-native-color-input') {
      const hex = target.value.toUpperCase();
      state.colorpicker.currentHex = hex;
      window.pywebview?.api?.set_picked_color?.(hex).then((res) => {
        if (res?.colorpicker) {
          state.colorpicker = res.colorpicker;
          renderApp();
        }
      });
    }
  });

  // Keyboard navigation (Escape, ArrowUp/Down/Enter/Delete in Clipboard, Shortcut recording)
  window.addEventListener('keydown', async (ev) => {
    if (currentView === 'onboarding') {
      const machine = ensureOnboardingMachine();
      if (ev.key === 'Escape') {
        ev.preventDefault();
        const res = machine.handleEscape();
        if (res.closedPopover) {
          renderApp();
        }
        return;
      }

      if (ev.altKey && ev.key === 'ArrowLeft') {
        ev.preventDefault();
        machine.back();
        renderApp();
        return;
      }

      const activeEl = document.activeElement as HTMLElement | null;
      const radioGroup = activeEl?.closest<HTMLElement>('[role="radiogroup"]');
      if (
        radioGroup &&
        (ev.key === 'ArrowRight' || ev.key === 'ArrowDown' || ev.key === 'ArrowLeft' || ev.key === 'ArrowUp')
      ) {
        const radios = Array.from(radioGroup.querySelectorAll<HTMLElement>('[role="radio"]'));
        if (radios.length > 0) {
          ev.preventDefault();
          const curIdx = Math.max(
            0,
            radios.findIndex((r) => r === activeEl || r.contains(activeEl))
          );
          const delta = ev.key === 'ArrowRight' || ev.key === 'ArrowDown' ? 1 : -1;
          const nextIdx = (curIdx + delta + radios.length) % radios.length;
          const nextRadio = radios[nextIdx];
          if (nextRadio) {
            const obEdge = nextRadio.getAttribute('data-ob-edge') as 'left' | 'right' | null;
            const obTheme = nextRadio.getAttribute('data-ob-theme');
            const obAccent = nextRadio.getAttribute('data-ob-accent');
            let selectorToFocus = '';
            if (obEdge) {
              machine.setEdge(obEdge);
              selectorToFocus = `[data-ob-edge="${obEdge}"]`;
            } else if (obTheme) {
              machine.setTheme(obTheme);
              selectorToFocus = `[data-ob-theme="${obTheme}"]`;
            } else if (obAccent) {
              machine.setAccent(obAccent);
              machine.toggleCustomColorPopover(false);
              selectorToFocus = `[data-ob-accent="${obAccent}"]`;
            }
            renderApp();
            if (selectorToFocus) {
              const updatedRadio = document.querySelector<HTMLElement>(selectorToFocus);
              updatedRadio?.focus();
            }
          }
          return;
        }
      }

      if (ev.key === 'Enter' && !ev.ctrlKey && !ev.altKey && !ev.metaKey) {
        if (activeEl?.id === 'flank-ob-color-hex') {
          ev.preventDefault();
          const hexVal = (activeEl as HTMLInputElement).value;
          if (hexVal) machine.setAccent(hexVal);
          machine.toggleCustomColorPopover(false);
          renderApp();
          return;
        }
        const activeAction = activeEl?.getAttribute('data-ob-action');
        if (
          activeAction === 'back' ||
          activeAction === 'skip' ||
          activeAction === 'expand-themes' ||
          activeAction === 'toggle-custom-accent' ||
          activeAction === 'apply-custom-accent'
        ) {
          return;
        }
        ev.preventDefault();
        const snap = machine.getSnapshot();
        if (snap.step === 5) {
          const res = machine.finish();
          await completeOnboardingFlow(res, false);
        } else if (machine.canContinue()) {
          machine.next();
          renderApp();
        }
        return;
      }
      return;
    }

    if (ev.ctrlKey && ev.altKey && (ev.code === 'KeyF' || ev.key.toLowerCase() === 'f')) {
      ev.preventDefault();
      toggleDockCollapse();
      return;
    }

    if (ev.key === 'Enter') {
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl?.id === 'flank-task-input') {
        ev.preventDefault();
        const addBtn = document.querySelector<HTMLElement>('[data-action="add-task"]');
        addBtn?.click();
        return;
      }
      if (activeEl?.id === 'flank-runner-input') {
        ev.preventDefault();
        const runBtn = document.querySelector<HTMLElement>('[data-action="run-custom-cmd"]');
        runBtn?.click();
        return;
      }
    }
    if (uiState.recordingItemId) {
      ev.preventDefault();
      if (ev.key === 'Escape') {
        flankMachines.shortcutRecorder.send({ type: 'CANCEL' });
        uiState.recordingItemId = null;
        uiState.shortcutConflictMsg = null;
        renderApp();
        return;
      }
      if (['Control', 'Shift', 'Alt', 'Meta'].includes(ev.key)) return;
      const mods: string[] = [];
      if (ev.ctrlKey) mods.push('Ctrl');
      if (ev.altKey) mods.push('Alt');
      if (ev.shiftKey) mods.push('Shift');
      const keyLabel = ev.key.length === 1 ? ev.key.toUpperCase() : ev.key;
      const combo = [...mods, keyLabel].join('+');
      flankMachines.shortcutRecorder.send({ type: 'CAPTURE_COMBO', combo });

      const duplicate = state.items.find(
        (i) => i.id !== uiState.recordingItemId && i.shortcut?.toLowerCase() === combo.toLowerCase()
      );
      if (duplicate) {
        const msg = `Conflict: ${combo} is already assigned to ${duplicate.label}.`;
        flankMachines.shortcutRecorder.send({ type: 'MARK_CONFLICT', message: msg });
        uiState.shortcutConflictMsg = msg;
        renderApp();
        return;
      }

      const hostCheck = await window.pywebview?.api?.register_item_shortcut?.(
        uiState.recordingItemId,
        combo
      );
      if (hostCheck && !hostCheck.ok) {
        const msg = hostCheck.conflict || `Conflict: ${combo} is reserved by another app.`;
        flankMachines.shortcutRecorder.send({ type: 'MARK_CONFLICT', message: msg });
        uiState.shortcutConflictMsg = msg;
        renderApp();
        return;
      }

      const item = state.items.find((i) => i.id === uiState.recordingItemId);
      if (item) {
        item.shortcut = combo;
      }
      flankMachines.shortcutRecorder.send({ type: 'COMMIT_SUCCESS' });
      uiState.recordingItemId = null;
      uiState.shortcutConflictMsg = null;
      saveUserPrefs();
      renderApp();
      return;
    }

    const targetEl = ev.target as HTMLElement | null;
    if (targetEl && targetEl.id === 'flank-weather-city-input' && ev.key === 'Enter') {
      ev.preventDefault();
      const cityInput = targetEl as HTMLInputElement;
      if (cityInput.value.trim()) {
        const newCity = cityInput.value.trim();
        state.weather.city = newCity;
        const updated = await window.pywebview?.api?.update_weather_city?.(newCity);
        if (updated?.weather) {
          state.weather = updated.weather;
        }
        renderApp();
      }
      return;
    }
    if (targetEl && targetEl.id === 'flank-clock-city-input' && ev.key === 'Enter') {
      ev.preventDefault();
      const cityInput = targetEl as HTMLInputElement;
      if (cityInput.value.trim()) {
        const newCity = cityInput.value.trim();
        cityInput.value = '';
        const updated = await window.pywebview?.api?.add_world_clock?.(newCity);
        if (updated?.clock) {
          state.clock = updated.clock;
        }
        renderApp();
      }
      return;
    }

    if (currentView === 'dock') {
      const dockTiles = Array.from(document.querySelectorAll<HTMLElement>('.flank-tile, .flank-dock-collapse-handle'));
      const activeIdx = dockTiles.findIndex((el) => el === document.activeElement || el.contains(document.activeElement));
      if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        const nextIdx = activeIdx < dockTiles.length - 1 ? activeIdx + 1 : 0;
        dockTiles[nextIdx]?.focus();
        return;
      }
      if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        const prevIdx = activeIdx > 0 ? activeIdx - 1 : dockTiles.length - 1;
        dockTiles[prevIdx]?.focus();
        return;
      }
      if (ev.key === 'Home') {
        ev.preventDefault();
        dockTiles[0]?.focus();
        return;
      }
      if (ev.key === 'End') {
        ev.preventDefault();
        dockTiles[dockTiles.length - 1]?.focus();
        return;
      }
    }

    if (ev.key === 'Escape') {
      if (currentView === 'dock') {
        window.pywebview?.api?.close_hover_card?.();
        return;
      }
      if (currentView === 'modal') {
        window.pywebview?.api?.close_window?.();
        return;
      }
      if (state.activeFullWindow) {
        state.activeFullWindow = null;
        renderApp();
        return;
      }
      if (state.activeWidget) {
        state.activeWidget = null;
        renderApp();
        return;
      }
    }

    if (state.activeFullWindow === 'clipboard') {
      const filtered = getFilteredClipboardItems(state, uiState);
      if (filtered.length === 0) return;
      const curIdx = Math.max(
        0,
        filtered.findIndex((i) => i.id === uiState.selectedClipboardId)
      );

      if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        const next = filtered[Math.min(filtered.length - 1, curIdx + 1)];
        if (next) {
          uiState.selectedClipboardId = next.id;
          renderApp(document.activeElement?.id === 'flank-cb-search');
        }
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        const prev = filtered[Math.max(0, curIdx - 1)];
        if (prev) {
          uiState.selectedClipboardId = prev.id;
          renderApp(document.activeElement?.id === 'flank-cb-search');
        }
      } else if (ev.key === 'Enter' && document.activeElement?.id !== 'flank-cb-search') {
        ev.preventDefault();
        const selected = filtered[curIdx];
        if (selected) {
          if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(selected.content).catch(() => { });
          }
          await window.pywebview?.api?.copy_clipboard_item?.(selected.id);
          state.activeFullWindow = null;
          renderApp();
        }
      } else if (ev.key === 'Delete' && document.activeElement?.id !== 'flank-cb-search') {
        ev.preventDefault();
        const selected = filtered[curIdx];
        if (selected) {
          state.clipboard.items = state.clipboard.items.filter((i) => i.id !== selected.id);
          state.clipboard.count = state.clipboard.items.length;
          await window.pywebview?.api?.delete_clipboard_item?.(selected.id);
          renderApp();
        }
      }
    }
  });

  window.addEventListener('resize', () => {
    if (state.activeWidget && !state.activeFullWindow) {
      positionHoverCard();
    }
    notifyNativeWindowRegion();
  });
}

function normalizeDockItems(items: DockItem[]): DockItem[] {
  return items.map((item) => {
    const raw = item as DockItem & { widget?: WidgetKind };
    if (raw.kind === 'widget' && !raw.widgetKind && raw.widget) {
      return { ...raw, widgetKind: raw.widget };
    }
    return raw;
  });
}

// Host integration hooks
window.flankOnIconResolved = (data: { id: string; iconUri: string; iconPath?: string }) => {
  const item = state.items.find((i) => i.id === data.id);
  if (item) {
    item.iconUri = data.iconUri;
    if (data.iconPath) item.iconPath = data.iconPath;
    renderApp();
  }
};

window.flankSetDockState = (newState: string) => {
  setDockState(newState as any);
  renderApp();
};

window.flankSyncPreferences = (payload: Partial<FlankState>) => {
  window.flankReceiveHostUpdate?.(payload);
  renderApp();
};

window.flankReceiveHostUpdate = (patch: Partial<FlankState>) => {
  if (patch.dockState !== undefined) {
    setDockState(patch.dockState as any);
  }
  if (patch.startCollapsed !== undefined) state.startCollapsed = patch.startCollapsed;
  if (patch.autoCollapse !== undefined) state.autoCollapse = patch.autoCollapse;
  if (patch.autoCollapseSeconds !== undefined) state.autoCollapseSeconds = patch.autoCollapseSeconds;
  if (patch.collapseOnFullscreen !== undefined) state.collapseOnFullscreen = patch.collapseOnFullscreen;
  if (patch.collapseHotkey !== undefined) state.collapseHotkey = patch.collapseHotkey;
  if (patch.showLogoOnTab !== undefined) state.showLogoOnTab = patch.showLogoOnTab;
  if (patch.recentAccents !== undefined) state.recentAccents = patch.recentAccents;
  if (patch.useOnlineFaviconFallback !== undefined) state.useOnlineFaviconFallback = patch.useOnlineFaviconFallback;
  let prefsChanged = false;
  if (patch.themeId !== undefined && patch.themeId !== state.themeId) {
    state.themeId = patch.themeId;
    prefsChanged = true;
  }
  if (patch.edgeOverride !== undefined && patch.edgeOverride !== state.edgeOverride) {
    state.edgeOverride = patch.edgeOverride;
    prefsChanged = true;
  }
  if (patch.accentOverride !== undefined && patch.accentOverride !== state.accentOverride) {
    state.accentOverride = patch.accentOverride;
    prefsChanged = true;
  }
  if (patch.reserveScreenSpace !== undefined) {
    state.reserveScreenSpace = patch.reserveScreenSpace;
    prefsChanged = true;
  }
  if (patch.autostart !== undefined) {
    state.autostart = patch.autostart;
    prefsChanged = true;
  }
  if (Array.isArray(patch.items) && patch.items.length > 0) {
    state.items = normalizeDockItems(patch.items);
    prefsChanged = true;
  }
  if (prefsChanged) {
    applyCurrentThemeSelection();
  }

  if (patch.stats && !state.stats.paused) {
    state.stats = { ...state.stats, ...patch.stats, refreshSec: state.stats.refreshSec, paused: state.stats.paused };
  }
  if (patch.battery) {
    state.battery = { ...state.battery, ...patch.battery };
  }
  if (patch.weather) {
    state.weather = { ...state.weather, ...patch.weather };
  }
  if (patch.player) {
    state.player = { ...state.player, ...patch.player };
  }
  if (patch.focus) {
    state.focus = { ...state.focus, ...patch.focus };
  }
  if (patch.clock) {
    state.clock = { ...state.clock, ...patch.clock };
  }
  if (patch.scratchpad) {
    state.scratchpad = { ...state.scratchpad, ...patch.scratchpad };
  }
  if (patch.colorpicker) {
    state.colorpicker = { ...state.colorpicker, ...patch.colorpicker };
  }
  if (patch.calendar) {
    state.calendar = { ...state.calendar, ...patch.calendar };
  }
  if (patch.audio) {
    state.audio = { ...state.audio, ...patch.audio };
  }
  if (patch.network) {
    state.network = { ...state.network, ...patch.network };
  }
  if (patch.clipboard) {
    state.clipboard = { ...state.clipboard, ...patch.clipboard };
  }
  if (patch.bluetooth) {
    state.bluetooth = { ...state.bluetooth, ...patch.bluetooth };
  }
  if (patch.tasks) {
    state.tasks = { ...state.tasks, ...patch.tasks };
  }
  if (patch.calculator) {
    state.calculator = { ...state.calculator, ...patch.calculator };
  }
  if (patch.habits) {
    state.habits = { ...state.habits, ...patch.habits };
  }
  if (patch.storage) {
    state.storage = { ...state.storage, ...patch.storage };
  }
  if (patch.display) {
    state.display = { ...state.display, ...patch.display };
  }
  if (patch.privacy) {
    state.privacy = { ...state.privacy, ...patch.privacy };
  }
  if (patch.ambient) {
    state.ambient = { ...state.ambient, ...patch.ambient };
  }
  if (patch.runner) {
    state.runner = { ...state.runner, ...patch.runner };
  }
  if (patch.gpu) {
    state.gpu = { ...state.gpu, ...patch.gpu };
  }
  if (patch.github) {
    state.github = { ...state.github, ...patch.github };
  }
  if (patch.topProcesses) {
    state.topProcesses = patch.topProcesses;
  }
  state.dataSource = 'live';

  if (currentView === 'onboarding') {
    return;
  }

  // If currently viewing settings in the modal, only re-render when preferences or clock cities changed
  if (currentView === 'modal' && state.activeFullWindow === 'settings' && !prefsChanged && !patch.clock && !patch.weather) {
    return;
  }

  // If in card view, only re-render if the currently displayed card widget has relevant data in this patch
  if (currentView === 'card' && state.activeWidget && !prefsChanged) {
    const w = state.activeWidget;
    const hasWidgetUpdate =
      (w === 'stats' && !!patch.stats) ||
      (w === 'battery' && !!patch.battery) ||
      (w === 'weather' && !!patch.weather) ||
      (w === 'player' && !!patch.player) ||
      (w === 'focus' && !!patch.focus) ||
      (w === 'clock' && !!patch.clock) ||
      (w === 'scratchpad' && !!patch.scratchpad) ||
      (w === 'colorpicker' && !!patch.colorpicker) ||
      (w === 'calendar' && !!patch.calendar) ||
      (w === 'audio' && !!patch.audio) ||
      (w === 'network' && !!patch.network) ||
      (w === 'clipboard' && !!patch.clipboard) ||
      (w === 'bluetooth' && !!patch.bluetooth) ||
      (w === 'tasks' && !!patch.tasks) ||
      (w === 'calculator' && !!patch.calculator) ||
      (w === 'habits' && !!patch.habits) ||
      (w === 'storage' && !!patch.storage) ||
      (w === 'display' && !!patch.display) ||
      (w === 'privacy' && !!patch.privacy) ||
      (w === 'ambient' && !!patch.ambient) ||
      (w === 'runner' && !!patch.runner) ||
      (w === 'gpu' && !!patch.gpu) ||
      (w === 'github' && !!patch.github);
    if (!hasWidgetUpdate) {
      return;
    }
  }

  renderApp(true);
};

async function bootstrap(): Promise<void> {
  // Check URL query parameter for previewing a specific theme (e.g. ?theme=glass)
  const params = new URLSearchParams(window.location.search);
  const queryTheme = params.get('theme');
  if (queryTheme) {
    state.themeId = queryTheme;
  }
  const queryWidget = params.get('widget') as WidgetKind | null;
  if (queryWidget) {
    state.activeWidget = queryWidget;
  }
  const queryModal = params.get('modal');
  if (queryModal) {
    state.activeFullWindow = queryModal as any;
  }
  const queryTab = params.get('tab') as WindowUiState['settingsTab'] | null;
  if (queryTab) {
    uiState.settingsTab = queryTab;
  }
  const queryDockState = params.get('dockState');
  if (queryDockState) {
    state.dockState = queryDockState as any;
  }
  const queryLogo = params.get('showLogoOnTab');
  if (queryLogo !== null) {
    state.showLogoOnTab = queryLogo === 'true' || queryLogo === '1';
  }
  const queryEmpty = params.get('empty');
  if (queryEmpty === 'true' || queryEmpty === '1') {
    state.clipboard.items = [];
    state.clipboard.count = 0;
    state.calendar.events = [];
    state.calendar.nextSummary = '';
    if (state.bluetooth) state.bluetooth.devices = [];
  }

  initDockState((state.dockState as any) || (state.startCollapsed ? 'collapsed' : 'expanded'));
  onDockStateChange((nextDockState) => {
    if (nextDockState === 'expanded' || nextDockState === 'collapsed') {
      renderApp();
    }
  });
  applyCurrentThemeSelection();
  setupEventDelegation();
  renderApp();

  // Connect to native host when pywebview is ready
  const connectHost = async () => {
    // Immediately sync dock/card bounds as soon as pywebview bridge is ready
    renderApp();
    if (window.pywebview?.api?.get_initial_state) {
      try {
        const init = await window.pywebview.api.get_initial_state();
        if (init) {
          if (init.themeId && !queryTheme) state.themeId = init.themeId;
          if (init.edgeOverride !== undefined) state.edgeOverride = init.edgeOverride;
          if (init.accentOverride !== undefined) state.accentOverride = init.accentOverride;
          if (init.reserveScreenSpace !== undefined) state.reserveScreenSpace = init.reserveScreenSpace;
          if (init.autostart !== undefined) state.autostart = init.autostart;
          if (init.dockState !== undefined) setDockState(init.dockState as any);
          if (init.startCollapsed !== undefined) state.startCollapsed = init.startCollapsed;
          if (init.autoCollapse !== undefined) state.autoCollapse = init.autoCollapse;
          if (init.autoCollapseSeconds !== undefined) state.autoCollapseSeconds = init.autoCollapseSeconds;
          if (init.collapseOnFullscreen !== undefined) state.collapseOnFullscreen = init.collapseOnFullscreen;
          if (init.collapseHotkey !== undefined) state.collapseHotkey = init.collapseHotkey;
          if (init.showLogoOnTab !== undefined) state.showLogoOnTab = init.showLogoOnTab;
          if (init.recentAccents !== undefined) state.recentAccents = init.recentAccents;
          if (init.useOnlineFaviconFallback !== undefined) state.useOnlineFaviconFallback = init.useOnlineFaviconFallback;
          if (Array.isArray(init.items) && init.items.length > 0) state.items = normalizeDockItems(init.items);
          applyCurrentThemeSelection();
          window.flankReceiveHostUpdate?.(init);
          renderApp();
        }
      } catch {
        // Running in standalone browser preview mode
      }
    }
  };

  if (window.pywebview) {
    await connectHost();
  } else {
    window.addEventListener('pywebviewready', () => {
      connectHost();
    });
  }
}

bootstrap();
