/**
 * Shared UI Components (Step 6)
 * Design System tokens, unified row heights, card radii, and controls:
 * - Card (standard container)
 * - Row (48px / 56px with description)
 * - SectionHeader
 * - Segmented (segmented controls)
 * - Switch (smooth toggle switch)
 * - Swatch (color swatch)
 * - Button (primary, secondary, ghost, danger)
 * - Input
 * - Chip (for tags/badges only)
 */

export function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export interface CardProps {
  children: string;
  className?: string;
  style?: string;
}

export function Card(props: CardProps): string {
  const cls = `flank-ui-card${props.className ? ` ${props.className}` : ''}`;
  const styleAttr = props.style ? ` style="${props.style}"` : '';
  return `<div class="${cls}"${styleAttr}>${props.children}</div>`;
}

export interface RowProps {
  label: string;
  controlHtml: string;
  description?: string;
  iconHtml?: string;
  className?: string;
  actionAttr?: string;
  style?: string;
}

export function Row(props: RowProps): string {
  const hasDesc = Boolean(props.description);
  const cls = `flank-ui-row${hasDesc ? ' has-desc' : ''}${props.className ? ` ${props.className}` : ''}`;
  const action = props.actionAttr ? ` ${props.actionAttr}` : '';
  const styleAttr = props.style ? ` style="${props.style}"` : '';

  const iconMarkup = props.iconHtml
    ? `<span class="flank-ui-row-icon" aria-hidden="true">${props.iconHtml}</span>`
    : '';

  const descMarkup = props.description
    ? `<span class="flank-ui-row-desc">${escapeHtml(props.description)}</span>`
    : '';

  return `<div class="${cls}"${action}${styleAttr}>
    <div class="flank-ui-row-left">
      ${iconMarkup}
      <div class="flank-ui-row-texts">
        <span class="flank-ui-row-label">${escapeHtml(props.label)}</span>
        ${descMarkup}
      </div>
    </div>
    <div class="flank-ui-row-right">
      ${props.controlHtml}
    </div>
  </div>`;
}

export interface SectionHeaderProps {
  title: string;
  description?: string;
  actionHtml?: string;
  className?: string;
}

export function SectionHeader(props: SectionHeaderProps): string {
  const cls = `flank-ui-section-header${props.className ? ` ${props.className}` : ''}`;
  const descMarkup = props.description
    ? `<p class="flank-ui-section-desc">${escapeHtml(props.description)}</p>`
    : '';
  const actionMarkup = props.actionHtml
    ? `<div class="flank-ui-section-action">${props.actionHtml}</div>`
    : '';

  return `<div class="${cls}">
    <div class="flank-ui-section-title-wrap">
      <h3 class="flank-ui-section-title">${escapeHtml(props.title)}</h3>
      ${actionMarkup}
    </div>
    ${descMarkup}
  </div>`;
}

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
  iconHtml?: string;
}

export interface SegmentedProps<T extends string = string> {
  options: SegmentedOption<T>[];
  activeValue: T;
  actionAttr: string; // attribute name, e.g. "data-set-edge"
  className?: string;
}

export function Segmented<T extends string = string>(props: SegmentedProps<T>): string {
  const cls = `flank-ui-segmented${props.className ? ` ${props.className}` : ''}`;
  const buttons = props.options
    .map((opt) => {
      const isSelected = opt.value === props.activeValue;
      const icon = opt.iconHtml ? `<span class="flank-ui-segmented-icon" aria-hidden="true">${opt.iconHtml}</span>` : '';
      return `<button type="button" class="flank-ui-segmented-btn${isSelected ? ' is-selected' : ''}" ${props.actionAttr}="${escapeHtml(opt.value)}" aria-pressed="${isSelected ? 'true' : 'false'}">
        ${icon}<span>${escapeHtml(opt.label)}</span>
      </button>`;
    })
    .join('');

  return `<div class="${cls}" role="group">${buttons}</div>`;
}

export interface SwitchProps {
  checked: boolean;
  actionAttr: string; // e.g. 'data-toggle-item="custom-1"'
  label?: string;
  disabled?: boolean;
  id?: string;
}

export function Switch(props: SwitchProps): string {
  const checkedAttr = props.checked ? ' aria-checked="true" class="flank-ui-switch is-checked"' : ' aria-checked="false" class="flank-ui-switch"';
  const labelAttr = props.label ? ` aria-label="${escapeHtml(props.label)}"` : '';
  const disabledAttr = props.disabled ? ' disabled' : '';
  const idAttr = props.id ? ` id="${escapeHtml(props.id)}"` : '';

  return `<button type="button" role="switch"${idAttr}${checkedAttr}${labelAttr}${disabledAttr} ${props.actionAttr}>
    <span class="flank-ui-switch-track">
      <span class="flank-ui-switch-thumb"></span>
    </span>
  </button>`;
}

export interface SwatchProps {
  hex: string;
  isActive: boolean;
  actionAttr: string;
  title?: string;
  size?: number;
}

export function Swatch(props: SwatchProps): string {
  const sz = props.size || 22;
  const isAct = props.isActive ? ' is-active' : '';
  const title = props.title || props.hex;

  return `<button type="button" class="flank-ui-swatch${isAct}" ${props.actionAttr}="${escapeHtml(props.hex)}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}" style="--swatch-color: ${escapeHtml(props.hex)}; width: ${sz}px; height: ${sz}px;">
    <span class="flank-ui-swatch-inner"></span>
  </button>`;
}

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  actionAttr?: string;
  iconHtml?: string;
  title?: string;
  disabled?: boolean;
  className?: string;
}

export function Button(props: ButtonProps): string {
  const v = props.variant || 'secondary';
  const cls = `flank-ui-btn is-${v}${props.className ? ` ${props.className}` : ''}`;
  const action = props.actionAttr ? ` ${props.actionAttr}` : '';
  const titleAttr = props.title ? ` title="${escapeHtml(props.title)}"` : '';
  const disabledAttr = props.disabled ? ' disabled' : '';
  const icon = props.iconHtml ? `<span class="flank-ui-btn-icon" aria-hidden="true">${props.iconHtml}</span>` : '';

  return `<button type="button" class="${cls}"${action}${titleAttr}${disabledAttr}>
    ${icon}<span>${escapeHtml(props.label)}</span>
  </button>`;
}

export interface InputProps {
  id?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  style?: string;
  disabled?: boolean;
}

export function Input(props: InputProps): string {
  const type = props.type || 'text';
  const idAttr = props.id ? ` id="${escapeHtml(props.id)}"` : '';
  const valAttr = props.value !== undefined ? ` value="${escapeHtml(props.value)}"` : '';
  const phAttr = props.placeholder ? ` placeholder="${escapeHtml(props.placeholder)}"` : '';
  const cls = `flank-ui-input${props.className ? ` ${props.className}` : ''}`;
  const styleAttr = props.style ? ` style="${props.style}"` : '';
  const disabledAttr = props.disabled ? ' disabled' : '';

  return `<input type="${type}"${idAttr} class="${cls}"${valAttr}${phAttr}${styleAttr}${disabledAttr} />`;
}

export interface ChipProps {
  label: string;
  variant?: 'muted' | 'accent' | 'solid' | 'glass';
  className?: string;
  iconHtml?: string;
}

export function Chip(props: ChipProps): string {
  const v = props.variant || 'muted';
  const cls = `flank-ui-chip is-${v}${props.className ? ` ${props.className}` : ''}`;
  const icon = props.iconHtml ? `<span class="flank-ui-chip-icon" aria-hidden="true">${props.iconHtml}</span>` : '';
  return `<span class="${cls}">${icon}${escapeHtml(props.label)}</span>`;
}

