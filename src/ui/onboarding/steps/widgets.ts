import { type WidgetKind } from '../../../providers/types.ts';
import { escapeHtml } from '../../components.ts';

export interface OnboardingWidgetOption {
  kind: WidgetKind;
  itemId: string;
  label: string;
  defaultOn: boolean;
  svgPaths: string;
}

export const ONBOARDING_WIDGET_OPTIONS: OnboardingWidgetOption[] = [
  {
    kind: 'weather',
    itemId: 'widget-weather',
    label: 'Weather',
    defaultOn: true,
    svgPaths: `<path d="M7 18a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17 8.6 4.7 4.7 0 0 1 17 18z"></path>`,
  },
  {
    kind: 'battery',
    itemId: 'widget-battery',
    label: 'Battery',
    defaultOn: true,
    svgPaths: `<rect x="2" y="7" width="17" height="10" rx="2.5"></rect><path d="M22 11v2"></path>`,
  },
  {
    kind: 'audio',
    itemId: 'widget-audio',
    label: 'Audio',
    defaultOn: true,
    svgPaths: `<path d="M11 5 6 9H3v6h3l5 4z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path>`,
  },
  {
    kind: 'focus',
    itemId: 'widget-focus',
    label: 'Focus timer',
    defaultOn: true,
    svgPaths: `<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle>`,
  },
  {
    kind: 'clock',
    itemId: 'widget-clock',
    label: 'World clock',
    defaultOn: true,
    svgPaths: `<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>`,
  },
  {
    kind: 'clipboard',
    itemId: 'widget-clipboard',
    label: 'Clipboard',
    defaultOn: true,
    svgPaths: `<rect x="6" y="4" width="12" height="17" rx="2.5"></rect><path d="M9 4h6v3H9z"></path>`,
  },
  {
    kind: 'calendar',
    itemId: 'widget-calendar',
    label: 'Agenda',
    defaultOn: false,
    svgPaths: `<rect x="4" y="5" width="16" height="15" rx="2.5"></rect><path d="M4 10h16M9 3v4M15 3v4"></path>`,
  },
  {
    kind: 'stats',
    itemId: 'widget-stats',
    label: 'System stats',
    defaultOn: false,
    svgPaths: `<rect x="6" y="6" width="12" height="12" rx="2.5"></rect><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"></path>`,
  },
];

export interface WidgetsStepProps {
  selectedWidgets: WidgetKind[];
  capReachedWarning?: boolean;
}

export function renderWidgetsStepHtml(props: WidgetsStepProps): string {
  const selectedSet = new Set(props.selectedWidgets);
  const count = props.selectedWidgets.length;

  const rowsHtml = ONBOARDING_WIDGET_OPTIONS.map((w) => {
    const isOn = selectedSet.has(w.kind);
    return `
      <div class="flank-ob-widget-row${isOn ? ' is-on' : ''}" data-ob-widget-row="${escapeHtml(w.kind)}">
        <svg class="flank-ob-widget-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${w.svgPaths}</svg>
        <span class="flank-ob-widget-name">${escapeHtml(w.label)}</span>
        <button type="button" class="flank-ob-switch" role="switch" aria-checked="${isOn ? 'true' : 'false'}" aria-label="${escapeHtml(w.label)}" data-ob-widget="${escapeHtml(w.kind)}">
          <i class="flank-ob-switch-thumb"></i>
        </button>
      </div>
    `;
  }).join('');

  let counterText = `${count} of ${ONBOARDING_WIDGET_OPTIONS.length} selected. The dock holds up to 12 items.`;
  let isWarn = false;
  if (count === 0) {
    counterText = 'Turn on at least one widget';
    isWarn = true;
  } else if (props.capReachedWarning) {
    counterText = `${count} of ${ONBOARDING_WIDGET_OPTIONS.length} selected. The dock holds up to 12 items (limit reached).`;
    isWarn = true;
  }

  return `
    <div class="flank-ob-header">
      <span class="flank-ob-eyebrow">Step 4 of 5 · Widgets</span>
      <h1 class="flank-ob-h1" tabindex="-1" id="flank-ob-step-heading">Pick your widgets.</h1>
      <p class="flank-ob-lead">Each one shows a live value on the dock and opens a card on hover.</p>
    </div>
    <div class="flank-ob-widgets-grid">
      ${rowsHtml}
    </div>
    <p class="flank-ob-widgets-counter${isWarn ? ' is-warn' : ''}" id="flank-ob-widgets-counter">${escapeHtml(counterText)}</p>
  `;
}
