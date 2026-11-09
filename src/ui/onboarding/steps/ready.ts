import { escapeHtml } from '../../components.ts';

export interface ReadyStepProps {
  autostart: boolean;
  hideHotkey: string;
  clipboardHotkey: string;
}

export function renderHotkeyKeycapsHtml(combo: string): string {
  const parts = (combo || '')
    .split('+')
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return '';
  return `<span class="flank-ob-kbd-group">${parts
    .map((part) => `<kbd class="flank-ob-kbd">${escapeHtml(part)}</kbd>`)
    .join('')}</span>`;
}

export function renderReadyStepHtml(props: ReadyStepProps): string {
  const hideKbd = renderHotkeyKeycapsHtml(props.hideHotkey || 'Ctrl+Alt+F');
  const clipKbd = renderHotkeyKeycapsHtml(props.clipboardHotkey || 'Ctrl+Alt+V');

  return `
    <div class="flank-ob-header">
      <span class="flank-ob-eyebrow flank-ob-eyebrow--done">Step 5 of 5 · Done</span>
      <h1 class="flank-ob-h1" tabindex="-1" id="flank-ob-step-heading">You're all set.</h1>
      <p class="flank-ob-lead">Three things worth knowing before you start.</p>
    </div>
    <ul class="flank-ob-info-list">
      <li class="flank-ob-info-item">
        <span class="flank-ob-info-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"></path></svg>
        </span>
        <span class="flank-ob-info-text">
          <b class="flank-ob-info-title">Hide it with one click</b>
          <span class="flank-ob-info-sub">Use the arrow, or press the hotkey</span>
        </span>
        ${hideKbd}
      </li>
      <li class="flank-ob-info-item">
        <span class="flank-ob-info-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="4" width="12" height="17" rx="2.5"></rect><path d="M9 4h6v3H9z"></path></svg>
        </span>
        <span class="flank-ob-info-text">
          <b class="flank-ob-info-title">Open clipboard history</b>
          <span class="flank-ob-info-sub">From any app, any time</span>
        </span>
        ${clipKbd}
      </li>
      <li class="flank-ob-info-item">
        <span class="flank-ob-info-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"></path></svg>
        </span>
        <span class="flank-ob-info-text">
          <b class="flank-ob-info-title">Change anything later</b>
          <span class="flank-ob-info-sub">Use the gear at the bottom of the dock</span>
        </span>
      </li>
    </ul>
    <div class="flank-ob-autostart-row" data-ob-action="toggle-autostart">
      <button type="button" class="flank-ob-switch flank-ob-switch--lg" role="switch" aria-checked="${props.autostart ? 'true' : 'false'}" aria-label="Start Flank when Windows starts" data-ob-action="toggle-autostart">
        <i class="flank-ob-switch-thumb"></i>
      </button>
      <span>Start Flank when Windows starts</span>
    </div>
  `;
}
