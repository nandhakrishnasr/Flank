import { type FlankState, type WidgetKind } from '../../providers/types.ts';
import { BUNDLED_THEMES, PAPER_THEME, type FlankTheme } from '../../theme/schema.ts';
import { deriveAccentTokens } from '../../theme/contrast.ts';
import { flattenThemeToCssVars } from '../../theme/flattener.ts';
import { escapeHtml } from '../components.ts';
import { ONBOARDING_WIDGET_OPTIONS } from './steps/widgets.ts';

export interface OnboardingPreviewProps {
  step: 1 | 2 | 3 | 4 | 5;
  edge: 'left' | 'right';
  themeId: string;
  accent: string;
  selectedWidgets: WidgetKind[];
  hideHotkey: string;
  liveState?: FlankState;
}

export function buildScopedThemeVars(
  themeId: string,
  edge: 'left' | 'right',
  accent: string
): { theme: FlankTheme; styleAttr: string; backdropKind: string } {
  const normalizedId = (themeId || 'paper').replace(/_/g, '-');
  const rawBase = BUNDLED_THEMES[normalizedId] || BUNDLED_THEMES.paper || PAPER_THEME;
  const candidate = structuredClone(rawBase) as FlankTheme;

  candidate.layout.edge = edge;
  if (accent) {
    const derived = deriveAccentTokens(accent);
    if (derived) {
      candidate.color.accent = derived.accent;
      candidate.color.accentGradient = derived.accentGradient;
      candidate.color.accentInk = derived.accentInk;
      candidate.color.accentSoft = derived.accentSoft;
      candidate.color.accentLine = derived.accentLine;
      candidate.color.focusRing = derived.focusRing;
    }
  }

  const vars = flattenThemeToCssVars(candidate);
  const styleParts = Object.entries(vars).map(([k, v]) => `${k}: ${v}`);

  let backdropKind = 'light';
  if (normalizedId === 'liquid-glass' || normalizedId === 'glass') {
    backdropKind = 'vivid';
  } else if (normalizedId === 'aurora') {
    backdropKind = 'aurora';
  } else if (normalizedId === 'terminal') {
    backdropKind = 'terminal';
  } else if (normalizedId === 'nord' || normalizedId === 'rail') {
    backdropKind = 'dark';
  }

  return {
    theme: candidate,
    styleAttr: styleParts.join('; '),
    backdropKind,
  };
}

function getWidgetMockValue(kind: WidgetKind, _liveState?: FlankState): string {
  switch (kind) {
    case 'weather':
      return '24°';
    case 'battery':
      return '80%';
    case 'audio':
      return '68%';
    case 'focus':
      return '25m';
    case 'clock':
      return '17:20';
    case 'clipboard':
      return '8';
    case 'calendar':
      return '14:00';
    case 'stats':
      return '18%';
    default:
      return '—';
  }
}

export function renderOnboardingPreviewHtml(props: OnboardingPreviewProps): string {
  const { theme, styleAttr, backdropKind } = buildScopedThemeVars(
    props.themeId,
    props.edge,
    props.accent
  );

  const isRight = props.edge === 'right';

  // Faux window dimensions and placement per step
  let fauxLeft = 22;
  let fauxTop = 26;
  let fauxWidth = 230;
  let fauxHeight = 250;
  let lineCount = 3;

  if (props.step === 2) {
    fauxLeft = 84;
    fauxTop = 50;
    fauxWidth = 240;
    fauxHeight = 300;
    lineCount = 3;
  } else if (props.step === 3) {
    fauxLeft = isRight ? 22 : 124;
    fauxTop = 26;
    fauxWidth = 230;
    fauxHeight = 220;
    lineCount = 2;
  } else if (props.step === 4) {
    fauxLeft = isRight ? 22 : 124;
    fauxTop = 26;
    fauxWidth = 230;
    fauxHeight = 250;
    lineCount = 2;
  } else if (props.step === 5) {
    fauxLeft = isRight ? 22 : 104;
    fauxTop = 26;
    fauxWidth = 260;
    fauxHeight = 290;
    lineCount = 4;
  }

  const lineWidths = ['92%', '80%', '86%', '70%'];
  const skeletonLinesHtml = lineWidths
    .slice(0, lineCount)
    .map((w) => `<i class="flank-ob-faux-line" style="width: ${w};"></i>`)
    .join('');

  const fauxWindowHtml = `
    <div class="flank-ob-faux-window" style="left: ${fauxLeft}px; top: ${fauxTop}px; width: ${fauxWidth}px; height: ${fauxHeight}px;">
      <div class="flank-ob-faux-dots">
        <i class="flank-ob-faux-dot"></i>
        <i class="flank-ob-faux-dot"></i>
        <i class="flank-ob-faux-dot"></i>
      </div>
      <i class="flank-ob-faux-line flank-ob-faux-line--title"></i>
      ${skeletonLinesHtml}
    </div>
  `;

  // Step 5 shows the collapsed edge tab + dark callout instead of the expanded dock
  if (props.step === 5) {
    const formattedHotkey = (props.hideHotkey || 'Ctrl+Alt+F')
      .split('+')
      .map((s) => s.trim())
      .filter(Boolean)
      .join(' ');
    const tabStyle = isRight
      ? 'right: 0px; border-radius: 12px 0 0 12px; border-right: 0;'
      : 'left: 0px; border-radius: 0 12px 12px 0; border-left: 0;';
    const tabChevronPath = isRight ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7';
    const calloutPosStyle = isRight ? 'right: 34px;' : 'left: 34px;';

    return `
      <div class="flank-ob-right" aria-hidden="true">
        <div class="flank-ob-preview-desktop" data-theme="${escapeHtml(theme.id)}" data-mode="${escapeHtml(theme.mode)}" data-edge="${escapeHtml(props.edge)}" data-shape="${escapeHtml(theme.layout.shape)}" data-preview-backdrop="${escapeHtml(backdropKind)}" style="${escapeHtml(styleAttr)}">
          ${fauxWindowHtml}
          <div class="flank-ob-callout" style="${calloutPosStyle}">
            Click the tab to bring Flank back.<br />
            <span class="flank-ob-callout-sub">Or press ${escapeHtml(formattedHotkey)}.</span>
          </div>
          <div class="flank-ob-mock-tab" style="${tabStyle}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${tabChevronPath}"></path></svg>
          </div>
        </div>
      </div>
    `;
  }

  // Steps 1-4: Expanded dock
  const previewWidgetKinds: WidgetKind[] =
    props.step === 4
      ? props.selectedWidgets
      : ['weather', 'battery', 'audio', 'focus'];

  const activeCardKind: WidgetKind | null =
    props.step === 1 ? 'weather' : props.step === 3 ? 'focus' : null;

  const isCompactDock = previewWidgetKinds.length > 6;
  const tileHeight = isCompactDock ? 36 : 42;
  const dockGap = isCompactDock ? 4 : 6;

  const widgetTilesHtml = previewWidgetKinds
    .map((kind) => {
      const opt = ONBOARDING_WIDGET_OPTIONS.find((o) => o.kind === kind);
      if (!opt) return '';
      const isActive = activeCardKind === kind;
      const valText = getWidgetMockValue(kind, props.liveState);
      return `
        <span class="flank-ob-mock-tile${isActive ? ' is-active' : ''}" style="height: ${tileHeight}px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${opt.svgPaths}</svg>
          <b class="flank-ob-mock-tile-val">${escapeHtml(valText)}</b>
        </span>
      `;
    })
    .join('');

  const nTiles = previewWidgetKinds.length;
  const dockHeight =
    nTiles === 4 && !isCompactDock
      ? 340
      : nTiles === 6 && !isCompactDock
        ? 424
        : Math.min(500, 128 + nTiles * (tileHeight + dockGap));
  const dockMarginTop = -Math.round(dockHeight / 2);

  // Use `left` for both edges so changing edge animates smoothly over 240ms
  const dockLeftCss = isRight ? 'calc(100% - 68px)' : '12px';
  const collapseChevronPath = isRight ? 'm9 5 7 7-7 7' : 'm15 5-7 7 7 7';

  // Step 1 Weather card or Step 3 Focus timer card
  let openCardHtml = '';
  if (props.step === 1) {
    const cardPos = isRight ? 'right: 84px;' : 'left: 84px;';
    openCardHtml = `
      <div class="flank-ob-mock-card" style="${cardPos} top: 130px; width: 170px; gap: 8px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600;">
          <span>Kyoto</span>
          <span style="color: var(--flank-color-text-muted); font-weight: 500;">Now</span>
        </div>
        <div style="display: flex; align-items: flex-end; justify-content: space-between;">
          <span style="font-size: 32px; line-height: 1; font-weight: 600; letter-spacing: -0.03em;">24°</span>
          <span style="font-size: 11px; color: var(--flank-color-text-muted); text-align: right;">Partly cloudy<br />H 27° L 18°</span>
        </div>
      </div>
    `;
  } else if (props.step === 3) {
    const cardPos = isRight ? 'right: 84px;' : 'left: 84px;';
    openCardHtml = `
      <div class="flank-ob-mock-card" style="${cardPos} top: 150px; width: 190px; gap: 10px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600;">
          <span>Focus timer</span>
          <span style="color: var(--flank-color-text-muted); font-weight: 500; display: flex; align-items: center; gap: 5px;">
            <i style="width: 6px; height: 6px; border-radius: 3px; background: var(--flank-color-accent);"></i>Ready
          </span>
        </div>
        <div style="font-size: 36px; line-height: 1; font-weight: 600; letter-spacing: -0.04em; text-align: center; padding: 4px 0;">25:00</div>
        <div style="height: 34px; border-radius: 10px; background: var(--flank-color-accent); color: var(--flank-color-accent-ink); font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center;">Start focus</div>
      </div>
    `;
  }

  // Step 2 ghost outline on opposite edge + pill
  let step2ExtrasHtml = '';
  if (props.step === 2) {
    const ghostSide = isRight ? 'left: 12px;' : 'right: 12px;';
    const pillPos = isRight ? 'left: 84px;' : 'right: 84px;';
    const pillText = isRight ? 'Moves to the right edge' : 'Moves to the left edge';
    step2ExtrasHtml = `
      <div class="flank-ob-ghost-dock" style="${ghostSide}"></div>
      <span class="flank-ob-edge-pill" style="${pillPos}">${escapeHtml(pillText)}</span>
    `;
  }

  return `
    <div class="flank-ob-right" aria-hidden="true">
      <div class="flank-ob-preview-desktop" data-theme="${escapeHtml(theme.id)}" data-mode="${escapeHtml(theme.mode)}" data-edge="${escapeHtml(props.edge)}" data-shape="${escapeHtml(theme.layout.shape)}" data-preview-backdrop="${escapeHtml(backdropKind)}" style="${escapeHtml(styleAttr)}">
        ${fauxWindowHtml}
        ${step2ExtrasHtml}
        ${openCardHtml}
        <div class="flank-ob-mock-dock" style="left: ${dockLeftCss}; margin-top: ${dockMarginTop}px; height: ${dockHeight}px; gap: ${dockGap}px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--flank-color-text-muted)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${collapseChevronPath}"></path></svg>
          <span class="flank-ob-mock-app flank-ob-mock-app--terminal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--flank-ob-accent-ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 7 5 5-5 5"></path><path d="M12 18h7"></path></svg>
          </span>
          <span class="flank-ob-mock-app flank-ob-mock-app--browser">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--flank-color-accent-ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c3.2 3.2 3.2 14.8 0 18M12 3c-3.2 3.2-3.2 14.8 0 18"></path></svg>
          </span>
          <span class="flank-ob-mock-divider"></span>
          ${widgetTilesHtml}
        </div>
      </div>
    </div>
  `;
}
