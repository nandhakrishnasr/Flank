import { escapeHtml } from '../../components.ts';

export interface ThemeTileOption {
  id: string;
  label: string;
  swatchClass: string;
}

export const PRIMARY_THEME_TILES: ThemeTileOption[] = [
  { id: 'paper', label: 'Paper', swatchClass: 'flank-ob-theme-swatch--paper' },
  { id: 'liquid-glass', label: 'Liquid Glass', swatchClass: 'flank-ob-theme-swatch--liquid-glass' },
  { id: 'aurora', label: 'Aurora', swatchClass: 'flank-ob-theme-swatch--aurora' },
  { id: 'nord', label: 'Nord', swatchClass: 'flank-ob-theme-swatch--nord' },
  { id: 'terminal', label: 'Terminal', swatchClass: 'flank-ob-theme-swatch--terminal' },
];

export const EXTRA_THEME_TILES: ThemeTileOption[] = [
  { id: 'rail', label: 'Rail', swatchClass: 'flank-ob-theme-swatch--rail' },
  { id: 'glass', label: 'Glass', swatchClass: 'flank-ob-theme-swatch--glass' },
];

export interface AccentSwatchOption {
  id: string;
  label: string;
  hex: string;
  swatchClass: string;
}

export const ONBOARDING_ACCENT_SWATCHES: AccentSwatchOption[] = [
  { id: 'terracotta', label: 'Terracotta', hex: '#D95D39', swatchClass: 'flank-ob-swatch--terracotta' },
  { id: 'blue', label: 'Blue', hex: '#2F4BFF', swatchClass: 'flank-ob-swatch--blue' },
  { id: 'violet', label: 'Violet', hex: '#7C5CFF', swatchClass: 'flank-ob-swatch--violet' },
  { id: 'pink', label: 'Pink', hex: '#FF4FA3', swatchClass: 'flank-ob-swatch--pink' },
  { id: 'green', label: 'Green', hex: '#1FB57A', swatchClass: 'flank-ob-swatch--green' },
];

export interface LookStepProps {
  themeId: string;
  themesExpanded: boolean;
  accent: string;
  customColorPopoverOpen: boolean;
}

export function renderLookStepHtml(props: LookStepProps): string {
  const visibleThemes = props.themesExpanded
    ? [...PRIMARY_THEME_TILES, ...EXTRA_THEME_TILES]
    : PRIMARY_THEME_TILES;

  const activeThemeId = visibleThemes.some((t) => t.id === props.themeId)
    ? props.themeId
    : 'paper';

  const themeTilesHtml = visibleThemes
    .map((t) => {
      const checked = t.id === activeThemeId;
      return `
        <button type="button" class="flank-ob-theme-tile" role="radio" aria-checked="${checked ? 'true' : 'false'}" tabindex="${checked ? '0' : '-1'}" data-ob-theme="${escapeHtml(t.id)}">
          <span class="flank-ob-theme-swatch ${t.swatchClass}">
            <i class="flank-ob-theme-swatch-dock"></i>
          </span>
          <span class="flank-ob-theme-name">${escapeHtml(t.label)}</span>
        </button>
      `;
    })
    .join('');

  const moreBtnHtml = props.themesExpanded
    ? ''
    : `<button type="button" class="flank-ob-theme-more" data-ob-action="expand-themes">+ 2 more</button>`;

  const normalizedAccent = (props.accent || '').toUpperCase();
  const matchedPreset = ONBOARDING_ACCENT_SWATCHES.find((s) => s.hex.toUpperCase() === normalizedAccent);
  const isCustomActive = !matchedPreset && Boolean(props.accent);

  const swatchesHtml = ONBOARDING_ACCENT_SWATCHES.map((s, idx) => {
    const checked = matchedPreset ? matchedPreset.id === s.id : false;
    const roveZero = checked || (!matchedPreset && !isCustomActive && idx === 1);
    return `<button type="button" class="flank-ob-swatch ${s.swatchClass}" role="radio" aria-checked="${checked ? 'true' : 'false'}" tabindex="${roveZero ? '0' : '-1'}" aria-label="${escapeHtml(s.label)}" data-ob-accent="${escapeHtml(s.hex)}"></button>`;
  }).join('');

  const popoverHtml = props.customColorPopoverOpen
    ? `
      <div class="flank-ob-color-popover" role="dialog" aria-label="Custom accent colour" id="flank-ob-color-popover">
        <div class="flank-ob-color-popover-row">
          <input type="color" id="flank-ob-color-native" value="${escapeHtml(props.accent)}" aria-label="Colour picker" style="width: 30px; height: 30px; padding: 0; border: 0; background: none; cursor: pointer;" />
          <input type="text" id="flank-ob-color-hex" class="flank-ob-color-input" value="${escapeHtml(props.accent)}" maxlength="7" aria-label="Hex colour code" />
          <button type="button" class="flank-ob-color-apply" data-ob-action="apply-custom-accent">Apply</button>
        </div>
      </div>
    `
    : '';

  return `
    <div class="flank-ob-header">
      <span class="flank-ob-eyebrow">Step 3 of 5 · Look</span>
      <h1 class="flank-ob-h1" tabindex="-1" id="flank-ob-step-heading">Choose a look.</h1>
      <p class="flank-ob-lead">Start with a theme. More are in Settings.</p>
    </div>
    <div class="flank-ob-theme-grid${props.themesExpanded ? ' is-expanded' : ''}" role="radiogroup" aria-label="Theme" data-ob-radiogroup="theme">
      ${themeTilesHtml}
      ${moreBtnHtml}
    </div>
    <div class="flank-ob-accent-section">
      <div class="flank-ob-accent-label">Accent colour</div>
      <div class="flank-ob-accent-row" role="radiogroup" aria-label="Accent colour" data-ob-radiogroup="accent">
        ${swatchesHtml}
        <button type="button" class="flank-ob-swatch-custom${isCustomActive ? ' is-active' : ''}" aria-label="Pick a custom colour" aria-expanded="${props.customColorPopoverOpen ? 'true' : 'false'}" data-ob-action="toggle-custom-accent" ${isCustomActive ? `style="background: ${escapeHtml(props.accent)};"` : ''}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${isCustomActive ? 'var(--flank-ob-accent-ink)' : 'var(--flank-ob-text-muted)'}" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>
        </button>
      </div>
      ${popoverHtml}
    </div>
  `;
}
