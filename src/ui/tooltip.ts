/**
 * Flank Dock Tooltip Component (Step 5)
 * - 500 ms show delay, instant after the first while warm (400 ms cooldown)
 * - 100 ms fade on screen-interior side of the dock
 * - Shows item label and optional shortcut in a muted chip
 * - pointer-events: none, never blocks pointer or covers flyout
 */

let tooltipEl: HTMLElement | null = null;
let showTimer: number | null = null;
let cooldownTimer: number | null = null;
let isWarm = false;
let isSuppressed = false;

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getOrCreateTooltip(): HTMLElement {
  if (!tooltipEl || !tooltipEl.isConnected) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'flank-dock-tooltip';
    tooltipEl.className = 'flank-tooltip';
    tooltipEl.setAttribute('role', 'tooltip');
    tooltipEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tooltipEl);
  }
  return tooltipEl;
}

export interface TooltipTargetInfo {
  label: string;
  shortcut?: string;
  rect: DOMRect;
  edge: 'left' | 'right';
}

export function showDockTooltip(info: TooltipTargetInfo): void {
  if (isSuppressed) return;

  if (showTimer !== null) {
    clearTimeout(showTimer);
    showTimer = null;
  }
  if (cooldownTimer !== null) {
    clearTimeout(cooldownTimer);
    cooldownTimer = null;
  }

  const el = getOrCreateTooltip();
  const shortcutHtml = info.shortcut
    ? `<kbd class="flank-tooltip-kbd">${escapeHtml(info.shortcut)}</kbd>`
    : '';
  el.innerHTML = `<span class="flank-tooltip-label">${escapeHtml(info.label)}</span>${shortcutHtml}`;

  const renderPosition = () => {
    if (!el || !el.isConnected) return;
    const ttRect = el.getBoundingClientRect();
    const targetCenterY = info.rect.top + info.rect.height / 2;
    const top = Math.max(
      8,
      Math.min(window.innerHeight - ttRect.height - 8, Math.round(targetCenterY - ttRect.height / 2))
    );

    let left = 0;
    if (info.edge === 'left') {
      left = Math.round(info.rect.right + 10);
    } else {
      left = Math.round(info.rect.left - ttRect.width - 10);
    }

    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.classList.add('is-visible');
    isWarm = true;
  };

  const delay = isWarm ? 0 : 500;
  if (delay === 0) {
    renderPosition();
  } else {
    showTimer = window.setTimeout(() => {
      showTimer = null;
      renderPosition();
    }, delay);
  }
}

export function hideDockTooltip(): void {
  if (showTimer !== null) {
    clearTimeout(showTimer);
    showTimer = null;
  }
  if (tooltipEl) {
    tooltipEl.classList.remove('is-visible');
  }

  if (cooldownTimer !== null) {
    clearTimeout(cooldownTimer);
  }
  // Cooldown window: remain warm for 400ms so moving between neighbouring tiles shows tooltip instantly
  cooldownTimer = window.setTimeout(() => {
    cooldownTimer = null;
    isWarm = false;
  }, 400);
}

export function suppressDockTooltip(suppress: boolean): void {
  isSuppressed = suppress;
  if (suppress) {
    hideDockTooltip();
    isWarm = false;
  }
}

