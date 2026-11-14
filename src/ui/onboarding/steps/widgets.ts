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
    kind: 'bluetooth',
    itemId: 'widget-bluetooth',
    label: 'Bluetooth',
    defaultOn: true,
    svgPaths: `<path d="m7 7 10 10-5 5V2l5 5L7 17"></path>`,
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
  {
    kind: 'player',
    itemId: 'widget-player',
    label: 'Mini player',
    defaultOn: false,
    svgPaths: `<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>`,
  },
  {
    kind: 'tasks',
    itemId: 'widget-tasks',
    label: 'Quick to-do',
    defaultOn: false,
    svgPaths: `<rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="m9 12 2 2 4-4"></path>`,
  },
  {
    kind: 'calculator',
    itemId: 'widget-calculator',
    label: 'Calculator',
    defaultOn: false,
    svgPaths: `<rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M8 7h8M8 11h2M12 11h4M8 15h2M12 15h4"></path>`,
  },
  {
    kind: 'storage',
    itemId: 'widget-storage',
    label: 'Storage',
    defaultOn: false,
    svgPaths: `<path d="M4 14h16v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path><path d="M4 14 6.5 5.5A2 2 0 0 1 8.4 4h7.2a2 2 0 0 1 1.9 1.5L20 14"></path><circle cx="8" cy="17.5" r="0.8"></circle>`,
  },
  {
    kind: 'display',
    itemId: 'widget-display',
    label: 'Display',
    defaultOn: false,
    svgPaths: `<rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M8 20h8M12 16v4"></path>`,
  },
  {
    kind: 'gpu',
    itemId: 'widget-gpu',
    label: 'GPU stats',
    defaultOn: false,
    svgPaths: `<path d="M3 12h4l3-7 4 14 3-7h4"></path>`,
  },
  {
    kind: 'ambient',
    itemId: 'widget-ambient',
    label: 'Ambiance',
    defaultOn: false,
    svgPaths: `<path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0"></path><path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"></path>`,
  },
  {
    kind: 'privacy',
    itemId: 'widget-privacy',
    label: 'Privacy guard',
    defaultOn: false,
    svgPaths: `<path d="M12 3 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z"></path><path d="m9.5 12 1.8 1.8 3.5-3.6"></path>`,
  },
  {
    kind: 'runner',
    itemId: 'widget-runner',
    label: 'Command runner',
    defaultOn: false,
    svgPaths: `<rect x="3" y="4" width="18" height="16" rx="2.5"></rect><path d="m7 9 3 3-3 3M13 15h4"></path>`,
  },
  {
    kind: 'github',
    itemId: 'widget-github',
    label: 'GitHub',
    defaultOn: false,
    svgPaths: `<circle cx="12" cy="12" r="9"></circle><path d="M9 19v-2.2c-2.5.5-3-1.2-3-1.2-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.4 0-1 .3-1.8.9-2.4-.1-.2-.4-1.1.1-2.3 0 0 .8-.2 2.5.9a8.5 8.5 0 0 1 4.6 0c1.7-1.1 2.5-.9 2.5-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.8.6 1.7V19"></path>`,
  },
  {
    kind: 'scratchpad',
    itemId: 'widget-scratchpad',
    label: 'Scratchpad',
    defaultOn: false,
    svgPaths: `<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"></path>`,
  },
  {
    kind: 'colorpicker',
    itemId: 'widget-colorpicker',
    label: 'Color picker',
    defaultOn: false,
    svgPaths: `<path d="m19 5-4-4-2.5 2.5 4 4z"></path><path d="m14.5 5.5-9 9L4 19l4.5-1.5 9-9"></path>`,
  },
  {
    kind: 'network',
    itemId: 'widget-network',
    label: 'Network',
    defaultOn: false,
    svgPaths: `<path d="M5 12.5a10 10 0 0 1 14 0"></path><path d="M8.5 16a5 5 0 0 1 7 0"></path><circle cx="12" cy="19" r="1"></circle>`,
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

  let counterText = `${count} of ${ONBOARDING_WIDGET_OPTIONS.length} widgets selected.`;
  let isWarn = false;
  if (count === 0) {
    counterText = 'Turn on at least one widget';
    isWarn = true;
  } else if (props.capReachedWarning) {
    counterText = `${count} of ${ONBOARDING_WIDGET_OPTIONS.length} selected · Dock limit reached.`;
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
