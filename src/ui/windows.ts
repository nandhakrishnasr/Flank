import { ACCENT_PRESETS, BUNDLED_THEMES, type FlankTheme } from '../theme/schema.ts';
import { type ClipboardEntry, type FlankState } from '../providers/types.ts';
import { buildSparklineSvg, formatDuration, formatRate, renderEmptyState } from './cards.ts';
import { iconSvg, flankGlyphSvg } from './icons.ts';
import { renderItemIcon, getLetterBadgeProps } from './dock.ts';
import { APP_VERSION } from '../version.ts';
import { deriveAccentTokens, parseColor, contrastRatio, resolveOpaqueSurface } from '../theme/contrast.ts';
import {
  Card,
  Row,
  SectionHeader,
  Segmented,
  Switch,
  Swatch,
  Button,
  Input,
  Chip,
} from './components.ts';

export interface WindowUiState {
  clipboardQuery: string;
  clipboardFilter: 'all' | 'text' | 'link' | 'image' | 'file';
  selectedClipboardId: string | null;
  settingsTab: 'appearance' | 'items' | 'widgets' | 'about';
  statsTab?: 'telemetry' | 'processes';
  processQuery?: string;
  recordingItemId: string | null;
  shortcutConflictMsg: string | null;
  themeValidationMsg: string | null;
  customColorPickerOpen?: boolean;
  customColorHex?: string;
  customColorContrastWarning?: string | null;
}

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderTitleBar(title: string): string {
  return `
    <div class="flank-window__titlebar flank-titlebar">
      <div class="flank-titlebar-brand" style="display:flex; align-items:center; gap: var(--flank-scale-space-12); color: var(--flank-color-text)">
        <span class="flank-titlebar-glyph" style="display:flex; align-items:center; color: currentColor">${flankGlyphSvg(18, 'titlebar')}</span>
        <span class="flank-titlebar-title" style="font-weight: 600; font-size: 14px;">${escapeHtml(title)}</span>
      </div>
      <div class="flank-win-controls">
        <button type="button" class="flank-win-btn" data-action="close-full-window" aria-label="Minimize window">${iconSvg('win-min', 12)}</button>
        <button type="button" class="flank-win-btn" data-action="close-full-window" aria-label="Maximize window">${iconSvg('win-max', 12)}</button>
        <button type="button" class="flank-win-btn" data-action="close-full-window" aria-label="Close window">${iconSvg('win-close', 12)}</button>
      </div>
    </div>
  `;
}

export function getFilteredClipboardItems(state: FlankState, ui: WindowUiState): ClipboardEntry[] {
  const q = ui.clipboardQuery.trim().toLowerCase();
  return state.clipboard.items.filter((item) => {
    if (ui.clipboardFilter === 'text' && item.kind !== 'text' && item.kind !== 'code') return false;
    if (ui.clipboardFilter === 'link' && item.kind !== 'link') return false;
    if (ui.clipboardFilter === 'image' && item.kind !== 'image') return false;
    if (ui.clipboardFilter === 'file' && item.kind !== 'file') return false;
    if (q && !item.title.toLowerCase().includes(q) && !item.content.toLowerCase().includes(q)) {
      return false;
    }
    return true;
  });
}

function renderClipboardRowChip(item: ClipboardEntry): string {
  if (item.monogram) {
    const badge = getLetterBadgeProps(item.monogram);
    return `<span class="flank-row-chip is-monogram" style="background: ${badge.bg}; color: ${badge.color}; border-radius: var(--flank-scale-radius-8); font-size: 11px; font-weight: 600;">${escapeHtml(item.monogram)}</span>`;
  }
  if (item.kind === 'image') {
    return `<span class="flank-row-chip" style="background: var(--flank-color-accent-soft); border: var(--flank-scale-hairline) solid var(--flank-color-accent-line)" aria-hidden="true">${iconSvg('file', 17)}</span>`;
  }
  const iconName =
    item.kind === 'link' ? 'link' : item.kind === 'code' ? 'code' : item.kind === 'file' ? 'file' : 'text';
  return `<span class="flank-row-chip">${iconSvg(iconName, 17)}</span>`;
}

function formatKindLabel(kind: ClipboardEntry['kind']): string {
  switch (kind) {
    case 'link':
      return 'Link';
    case 'image':
      return 'Image';
    case 'file':
      return 'File';
    case 'code':
      return 'Text';
    default:
      return 'Text';
  }
}

export function renderClipboardWindowHtml(state: FlankState, ui: WindowUiState): string {
  const filtered = getFilteredClipboardItems(state, ui);
  const selected =
    filtered.find((i) => i.id === ui.selectedClipboardId) || filtered[0] || null;

  const chips: Array<{ id: WindowUiState['clipboardFilter']; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'text', label: 'Text' },
    { id: 'link', label: 'Links' },
    { id: 'image', label: 'Images' },
    { id: 'file', label: 'Files' },
  ];

  const chipsHtml = chips
    .map(
      (c) =>
        `<button type="button" class="flank-chip${ui.clipboardFilter === c.id ? ' is-active' : ''}" data-cb-filter="${c.id}">${c.label}</button>`
    )
    .join('');

  const rowsHtml = filtered
    .map((item) => {
      const isSel = selected?.id === item.id;
      const pinPrefix = item.pinned ? 'Pinned · ' : '';
      return `<button type="button" class="flank-list-row${isSel ? ' is-selected' : ''}" aria-pressed="${isSel ? 'true' : 'false'}" data-cb-select="${escapeHtml(item.id)}" style="gap: 12px;">
        ${renderClipboardRowChip(item)}
        <span class="flank-row-text">
          <span class="flank-row-title" style="color: var(--flank-color-text);">${escapeHtml(item.title)}</span>
          <span class="flank-row-meta" style="color: var(--flank-color-text-muted);">${pinPrefix}${formatKindLabel(item.kind)} · ${escapeHtml(item.relativeTime)}</span>
        </span>
      </button>`;
    })
    .join('');

  const rowsListHtml = rowsHtml || renderEmptyState('No items in clipboard', 'Copied text and files will appear here');

  const previewHtml = selected
    ? `
      <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items:center;">
        <span class="flank-type-badge">${formatKindLabel(selected.kind)}</span>
        <span class="flank-card-muted">${escapeHtml(selected.relativeTime)}</span>
      </div>
      <div style="display:flex; flex-direction:column; gap: var(--flank-scale-space-sm)">
        <span class="flank-preview-heading" style="color: var(--flank-color-text);">${escapeHtml(selected.title)}</span>
        <span style="font-size: var(--flank-scale-font-body); color: var(--flank-color-text-muted)">${escapeHtml(selected.previewSubtitle || (selected.kind === 'link' ? 'Opens in your default browser' : 'Ready to paste'))}</span>
      </div>
      <div class="flank-preview-box" style="padding: 14px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
        ${
          selected.imageDataUrl
            ? `<img src="${escapeHtml(selected.imageDataUrl)}" alt="${escapeHtml(selected.title)}" style="max-width: 100%; max-height: var(--flank-scale-ai-ring-lg); border-radius: var(--flank-scale-radius-8)" />`
            : (() => {
                const mono = selected.monogram || selected.title.slice(0, 1).toUpperCase();
                const badge = getLetterBadgeProps(mono);
                return `<span class="flank-row-chip is-monogram" style="width: 36px; height: 36px; border-radius: var(--flank-scale-radius-8); background: ${badge.bg}; color: ${badge.color}; font-size: 13px; font-weight: 600;">${escapeHtml(mono)}</span>
               <span style="display:flex; flex-direction:column; gap: var(--flank-scale-bar-thin); min-width: var(--flank-scale-zero); margin-left: 12px;">
                 <span style="font-size: var(--flank-scale-font-title-sm); font-weight: 600; word-break: break-word; color: var(--flank-color-text);">${escapeHtml(selected.content)}</span>
                 <span style="font-size: var(--flank-scale-font-body-sm); color: var(--flank-color-text-muted)">${escapeHtml(selected.previewSubtitle || 'Captured on this PC')}</span>
               </span>`;
              })()
        }
      </div>
      <div style="display:flex; flex-direction:column">
        <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;"><span class="flank-stat-label">Copied</span><span>${escapeHtml(selected.copiedAt)}</span></div>
        <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;"><span class="flank-stat-label">From</span><span>${escapeHtml(selected.sourceApp)}</span></div>
        <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;"><span class="flank-stat-label">Length</span><span class="tabular-nums">${escapeHtml(selected.lengthLabel)}</span></div>
      </div>
      <div style="flex: 1"></div>
      <div class="flank-action-bar" style="display:flex; gap: 10px;">
        <button type="button" class="flank-primary-btn" data-cb-copy="${escapeHtml(selected.id)}">
          Copy to clipboard
          <span class="flank-kbd-hint">Enter</span>
        </button>
        <button type="button" class="flank-icon-btn" data-cb-pin="${escapeHtml(selected.id)}" aria-label="${selected.pinned ? 'Unpin item' : 'Pin item'}">
          ${iconSvg('pin', 17)}
        </button>
        <button type="button" class="flank-icon-btn" data-cb-delete="${escapeHtml(selected.id)}" aria-label="Delete item">
          ${iconSvg('trash', 17)}
        </button>
      </div>
    `
    : renderEmptyState('No items found', 'Copy text, links or images to preview them here');

  return `<div class="flank-window-backdrop" id="flank-full-window">
    <div class="flank-window" role="dialog" aria-label="Clipboard History">
      ${renderTitleBar('Clipboard History')}
      <div class="flank-window__body flank-win-body" style="padding: 24px; gap: 16px; box-sizing: border-box; flex: 1; min-height: 0; display: flex; overflow: hidden;">
        <div class="flank-list-col" style="width: 340px; min-width: 340px; max-width: 340px; border-right: none; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px; min-height: 0;">
          <label class="flank-search-box">
            ${iconSvg('search', 16)}
            <input type="text" id="flank-cb-search" class="flank-search-input" aria-label="Search clipboard history" placeholder="Search ${state.clipboard.count} items" value="${escapeHtml(ui.clipboardQuery)}">
          </label>
          <div class="flank-chip-row" style="gap: 6px; flex-wrap: wrap;">${chipsHtml}</div>
          <div class="flank-list-scroll">${rowsListHtml}</div>
        </div>
        <div class="flank-preview-col" style="flex: 1; min-width: 0; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;">
          ${previewHtml}
        </div>
      </div>
      <div class="flank-window__footer flank-win-footer">
        <span>${state.clipboard.count} of ${state.clipboard.maxItems} saved on this PC</span>
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">↑↓ to move</span>
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Enter to copy</span>
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Del to remove</span>
        </div>
      </div>
    </div>
  </div>`;
}

export function renderFullStatsWindowHtml(state: FlankState, ui?: WindowUiState): string {
  const s = state.stats;
  const b = state.battery;
  const currentTab = ui?.statsTab || 'telemetry';
  const procs = state.topProcesses || [];
  const q = (ui?.processQuery || '').trim().toLowerCase();
  const filteredProcs = q ? procs.filter((p) => p.name.toLowerCase().includes(q) || String(p.pid).includes(q)) : procs;
  const maxMem = procs.length > 0 ? Math.max(...procs.map((p) => p.memoryMb || 1), 100) : 100;

  const coreBars = s.cores
    .map(
      (pct, idx) => `<div class="flank-stat-item">
        <div class="flank-stat-header"><span class="flank-stat-label">Core ${idx + 1}</span><span class="flank-stat-val" style="margin-left: 12px;">${pct}%</span></div>
        <div class="flank-progress-track" style="margin-top: 4px; margin-bottom: 8px;"><div class="flank-progress-fill" style="width: ${pct}%"></div></div>
      </div>`
    )
    .join('');

  const diskRows = s.disks
    .map(
      (d) => `<div class="flank-stat-item">
        <div class="flank-stat-header"><span class="flank-stat-label">Drive (${escapeHtml(d.mount)})</span><span class="flank-stat-val" style="margin-left: 12px;">${Math.round(d.usedGb)} / ${Math.round(d.totalGb)} GB (${d.percent}%)</span></div>
        <div class="flank-progress-track" style="margin-top: 4px; margin-bottom: 8px;"><div class="flank-progress-fill" style="width: ${d.percent}%"></div></div>
      </div>`
    )
    .join('');

  const periphRows = b.peripherals
    .map(
      (p) => `<div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
        <span>${escapeHtml(p.name)} <span class="flank-card-muted">(${escapeHtml(p.detail || p.kind)})</span></span>
        <span class="flank-stat-val">${p.percent}%${p.charging ? ' · Charging' : ''}</span>
      </div>`
    )
    .join('');

  const timeRem = b.timeRemainingText && !b.stateText.includes(b.timeRemainingText) ? ` (${escapeHtml(b.timeRemainingText)})` : '';

  const procTableRows = filteredProcs
    .map(
      (p, idx) => `
        <tr style="border-bottom: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); height: 32px; font-size: 12px;">
          <td style="padding: 6px 12px; color: var(--flank-color-text-muted); font-size: 11px; width: 32px;">${idx + 1}</td>
          <td style="padding: 6px 12px; font-weight: 600; color: var(--flank-color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">
            <div style="display:flex; align-items:center; gap: 6px;">
              <span style="display:flex; width: 14px; height: 14px; color: var(--flank-color-accent); flex-shrink: 0;">${iconSvg('settings', 14)}</span>
              <span>${escapeHtml(p.name)}</span>
            </div>
          </td>
          <td class="tabular-nums" style="padding: 6px 12px; color: var(--flank-color-text-muted); font-size: 11px;">${p.pid}</td>
          <td style="padding: 6px 12px; width: 220px;">
            <div style="display:flex; align-items:center; gap: 8px;">
              <div class="flank-meter__bar" style="height: 6px; flex: 1; margin: 0; background: var(--flank-color-track-bg);"><div class="flank-meter__fill" style="width: ${Math.min(100, Math.round((p.memoryMb / maxMem) * 100))}%"></div></div>
              <span class="tabular-nums" style="font-weight: 600; font-size: 12px; min-width: 60px; text-align: right;">${Math.round(p.memoryMb)} MB</span>
            </div>
          </td>
          <td class="tabular-nums" style="padding: 6px 12px; color: var(--flank-color-text-muted); text-align: right;">${p.threads || 1}</td>
        </tr>
      `
    )
    .join('');

  let bodyContent = '';

  if (currentTab === 'processes') {
    bodyContent = `
      <div style="flex: 1; min-width: 0; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px; overflow: hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap: 12px; flex-shrink: 0;">
          <div style="display:flex; align-items:center; gap: 8px;">
            <span class="flank-card-title">Top 30 Processes by Memory</span>
            <span class="flank-live-pill"><span class="flank-live-dot"></span>Live · 2s</span>
          </div>
          <div style="display:flex; align-items:center; gap: 8px;">
            <input type="search" id="flank-proc-search" class="flank-input" style="width: 220px; height: 32px; font-size: 12px;" placeholder="Filter processes..." value="${escapeHtml(ui?.processQuery || '')}" />
          </div>
        </div>
        <div style="flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; scrollbar-width: none; border-radius: 8px; border: 1px solid var(--flank-color-divider-soft);">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--flank-color-divider); background: var(--flank-surface-card-bg); font-size: 11px; color: var(--flank-color-text-muted); position: sticky; top: 0; z-index: 2;">
                <th style="padding: 8px 12px; font-weight: 500;">#</th>
                <th style="padding: 8px 12px; font-weight: 500;">Process Name</th>
                <th style="padding: 8px 12px; font-weight: 500;">PID</th>
                <th style="padding: 8px 12px; font-weight: 500;">Memory Usage</th>
                <th style="padding: 8px 12px; font-weight: 500; text-align: right;">Threads</th>
              </tr>
            </thead>
            <tbody>
              ${procTableRows.length > 0 ? procTableRows : `<tr><td colspan="5" style="padding: 32px; text-align: center; color: var(--flank-color-text-muted);">No matching processes found</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else {
    bodyContent = `
      <div class="flank-list-col" style="flex: 1; min-width: 0; border-right: none; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; scrollbar-width: none;">
        <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items:center;">
          <span class="flank-card-title">Refresh interval</span>
          <div class="flank-chip-row" style="gap: 6px;">
            <button type="button" class="flank-chip${!s.paused && s.refreshSec === 1 ? ' is-active' : ''}" data-stats-rate="1">1s</button>
            <button type="button" class="flank-chip${!s.paused && s.refreshSec === 2 ? ' is-active' : ''}" data-stats-rate="2">2s</button>
            <button type="button" class="flank-chip${!s.paused && s.refreshSec === 5 ? ' is-active' : ''}" data-stats-rate="5">5s</button>
            <button type="button" class="flank-chip${s.paused ? ' is-active' : ''}" data-stats-pause="toggle">${s.paused ? 'Paused' : 'Pause'}</button>
          </div>
        </div>
        <div class="flank-preview-box" style="flex-direction:column; align-items:stretch; gap: 10px; padding: 14px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
          <span class="flank-card-title">Overview</span>
          <div class="flank-stat-item">
            <div class="flank-stat-header"><span class="flank-stat-label">CPU Total</span><span class="flank-stat-val" style="margin-left: 12px;">${s.cpuPercent}%</span></div>
            <div class="flank-progress-track" style="margin-top: 4px;"><div class="flank-progress-fill" style="width: ${s.cpuPercent}%"></div></div>
          </div>
          <div class="flank-stat-item">
            <div class="flank-stat-header"><span class="flank-stat-label">Memory</span><span class="flank-stat-val" style="margin-left: 12px;">${s.memUsedGb.toFixed(1)} / ${Math.round(s.memTotalGb)} GB (${s.memPercent}%)</span></div>
            <div class="flank-progress-track" style="margin-top: 4px;"><div class="flank-progress-fill" style="width: ${s.memPercent}%"></div></div>
          </div>
          <div class="flank-stat-item">
            <div class="flank-stat-header"><span class="flank-stat-label">GPU Engine</span><span class="flank-stat-val" style="margin-left: 12px;">${s.gpuPercent}%</span></div>
            <div class="flank-progress-track" style="margin-top: 4px;"><div class="flank-progress-fill" style="width: ${s.gpuPercent}%"></div></div>
          </div>
        </div>
        <div class="flank-preview-box" style="flex-direction:column; align-items:stretch; gap: 10px; padding: 14px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
          <span class="flank-card-title">Storage volumes</span>
          ${diskRows}
        </div>
        <div class="flank-rate-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div class="flank-rate-box" style="padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10); display:flex; flex-direction:column; gap: 4px;"><span class="flank-card-muted" style="font-size: 11px;">Download</span><span class="flank-stat-val" style="font-size: 14px;">${formatRate(s.netDownBps)}</span></div>
          <div class="flank-rate-box" style="padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10); display:flex; flex-direction:column; gap: 4px;"><span class="flank-card-muted" style="font-size: 11px;">Upload</span><span class="flank-stat-val" style="font-size: 14px;">${formatRate(s.netUpBps)}</span></div>
        </div>
      </div>
      <div class="flank-preview-col" style="flex: 1; min-width: 0; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; scrollbar-width: none;">
        <span class="flank-card-title">Logical processors</span>
        <div class="flank-stat-list" style="display:flex; flex-direction:column; gap: 6px;">${coreBars}</div>
        <span class="flank-card-title" style="margin-top: var(--flank-scale-space-md)">Battery &amp; connected peripherals</span>
        <div style="display:flex; flex-direction:column; gap: 4px;">
          <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;"><span class="flank-stat-label">System battery</span><span class="flank-stat-val">${b.percent}% · ${escapeHtml(b.stateText)}${timeRem}</span></div>
          <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;"><span class="flank-stat-label">Power plan</span><span>${escapeHtml(b.powerMode)} · Health ${b.healthPercent}%</span></div>
          ${periphRows}
        </div>
      </div>
    `;
  }

  return `<div class="flank-window-backdrop" id="flank-full-window">
    <div class="flank-window" role="dialog" aria-label="System Stats">
      <div class="flank-window__titlebar flank-titlebar" style="display:flex; justify-content:space-between; align-items:center;">
        <div class="flank-titlebar-brand" style="display:flex; align-items:center; gap: var(--flank-scale-space-12); color: var(--flank-color-text)">
          <span class="flank-titlebar-glyph" style="display:flex; align-items:center; color: currentColor">${flankGlyphSvg(18, 'titlebar')}</span>
          <span class="flank-titlebar-title" style="font-size: var(--flank-scale-font-body); font-weight: 600;">System Stats</span>
          <div class="flank-chip-row" style="gap: 6px; margin-left: 12px;">
            <button type="button" class="flank-chip${currentTab === 'telemetry' ? ' is-active' : ''}" data-stats-tab="telemetry">Hardware Overview</button>
            <button type="button" class="flank-chip${currentTab === 'processes' ? ' is-active' : ''}" data-stats-tab="processes">Top 30 Processes (${procs.length})</button>
          </div>
        </div>
        <div class="flank-titlebar-controls" style="display:flex; align-items:center; gap: var(--flank-scale-space-6)">
          <button type="button" class="flank-chip is-accent" data-action="close-modal" aria-label="Close window">Esc</button>
        </div>
      </div>
      <div class="flank-window__body flank-win-body" style="padding: 24px; gap: 16px; box-sizing: border-box; flex: 1; min-height: 0; display: flex; overflow: hidden;">
        ${bodyContent}
      </div>
      <div class="flank-window__footer flank-win-footer">
        <span>${currentTab === 'processes' ? 'Live process list sorted by working set memory · Read-only' : 'Read-only system telemetry · Never terminates processes'}</span>
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Press Esc to close</span>
        </div>
      </div>
    </div>
  </div>`;
}

export function renderBatteryWindowHtml(state: FlankState): string {
  const b = state.battery;
  const model = b.model || 'Laptop battery';
  const remWh = b.remainingWh ?? Number((65.5 * (b.percent / 100)).toFixed(1));
  const fullWh = b.fullChargedWh ?? 65.5;
  const designWh = b.designWh ?? 68.0;
  const voltV = b.voltageV ?? 16.1;
  const rateW = b.powerRateW ?? 0.0;
  const history = b.history && b.history.length >= 2 ? b.history : [b.percent, b.percent, b.percent, b.percent];

  const deviceCards = b.peripherals
    .map((p) => {
      const iconName =
        p.kind === 'mouse'
          ? 'mouse'
          : p.kind === 'keyboard'
            ? 'keyboard'
            : p.kind === 'headphones'
              ? 'headphones'
              : p.charging
                ? 'battery-charging'
                : 'battery';
      const statusBadge = p.charging
        ? 'Charging'
        : p.kind === 'system'
          ? b.stateText
          : p.connected
            ? 'Connected'
            : 'Standby';
      return `<div class="flank-preview-box" style="flex-direction:column; align-items:stretch; gap: var(--flank-scale-space-sm); padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
        <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items:center;">
          <span style="display:flex; align-items:center; gap: var(--flank-scale-space-10)">
            <span class="flank-row-chip" style="width: var(--flank-scale-ring-tile); height: var(--flank-scale-ring-tile)">${iconSvg(iconName, 16)}</span>
            <span style="display:flex; flex-direction:column; gap: var(--flank-scale-bar-thin)">
              <span style="font-size: var(--flank-scale-font-body-sm); font-weight: 600; color: var(--flank-color-text);">${escapeHtml(p.name)}</span>
              <span class="flank-row-meta">${escapeHtml(p.detail || statusBadge)}</span>
            </span>
          </span>
          <span style="display:flex; flex-direction:column; align-items:flex-end; gap: var(--flank-scale-bar-thin)">
            <span class="flank-stat-val" style="font-size: var(--flank-scale-font-body-sm)">${p.percent}%</span>
            <span class="flank-row-meta">${escapeHtml(statusBadge)}</span>
          </span>
        </div>
        <div class="flank-progress-track" style="margin-top: 4px;"><div class="flank-progress-fill" style="width: ${Math.max(0, Math.min(100, p.percent))}%"></div></div>
      </div>`;
    })
    .join('');

  const timeRem = b.timeRemainingText && !b.stateText.includes(b.timeRemainingText) ? `, ${escapeHtml(b.timeRemainingText)}` : '';

  return `<div class="flank-window-backdrop" id="flank-full-window">
    <div class="flank-window" role="dialog" aria-label="Power and Battery Details">
      ${renderTitleBar('Power & Battery Details')}
      <div class="flank-window__body flank-win-body" style="padding: 24px; gap: 16px; box-sizing: border-box; flex: 1; min-height: 0; display: flex; overflow: hidden;">
        <div class="flank-list-col" style="flex: 1; min-width: 0; border-right: none; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 16px 16px 24px 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; overflow-x: hidden; scrollbar-width: none;">
          <div class="flank-preview-box" style="flex-direction:column; align-items:stretch; gap: 8px; padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items:center;">
              <span class="flank-card-title">Laptop battery</span>
              <span class="flank-live-pill">
                <span class="flank-live-dot"></span>
                ${escapeHtml(b.powerMode)}
              </span>
            </div>
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items: flex-end;">
              <span style="font-family: var(--flank-font-stack); font-variant-numeric: tabular-nums; font-size: 32px; font-weight: 700; line-height: 1; color: var(--flank-color-text); margin: 0;">${b.percent}%</span>
              <span class="flank-hero-meta" style="text-align: right;">
                <span class="flank-hero-condition">${escapeHtml(b.stateText)}${timeRem}</span>
              </span>
            </div>
            <div class="flank-progress-track" style="margin-top: 4px;"><div class="flank-progress-fill" style="width: ${Math.max(0, Math.min(100, b.percent))}%"></div></div>
          </div>

          <div class="flank-preview-box" style="flex-direction:column; align-items:stretch; padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
            <span class="flank-card-title" style="margin-bottom: 8px;">Battery telemetry</span>
            <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
              <span class="flank-stat-label">Remaining energy</span>
              <span class="flank-stat-val">${remWh.toFixed(1)} / ${fullWh.toFixed(1)} Wh</span>
            </div>
            <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
              <span class="flank-stat-label">Battery health</span>
              <span class="flank-stat-val">${b.healthPercent}% (${fullWh.toFixed(1)} / ${designWh.toFixed(1)} Wh)</span>
            </div>
            <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
              <span class="flank-stat-label">Pack model</span>
              <span class="flank-stat-val">${escapeHtml(model)}</span>
            </div>
            <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
              <span class="flank-stat-label">Terminal voltage</span>
              <span class="flank-stat-val">${voltV.toFixed(2)} V</span>
            </div>
            <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
              <span class="flank-stat-label">Power source</span>
              <span class="flank-stat-val">${b.acConnected ? 'AC adapter connected' : 'Battery power'}</span>
            </div>
            <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
              <span class="flank-stat-label">Charge / draw rate</span>
              <span class="flank-stat-val">${rateW > 0 ? `${rateW.toFixed(1)} W` : b.acConnected ? '0.0 W (Holding charge)' : 'Discharging'}</span>
            </div>
          </div>

          <button type="button" class="flank-btn is-secondary" data-item-kind="link" data-item-id="win-power-settings" data-target="ms-settings:powersleep" style="width: 100%; justify-content: space-between; height: 36px; padding: 0 14px; margin-top: auto; flex-shrink: 0;">
            <span style="font-size: 12px; font-weight: 500;">Open Windows Power &amp; Battery settings</span>
            <span style="display:flex; width: 14px; height: 14px; flex-shrink: 0;">${iconSvg('arrow-up-right', 14)}</span>
          </button>
        </div>

        <div class="flank-preview-col" style="flex: 1; min-width: 0; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 16px 16px 24px 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; overflow-x: hidden; scrollbar-width: none;">
          <span class="flank-card-title">Laptop &amp; peripheral batteries</span>
          <div style="display:flex; flex-direction:column; gap: var(--flank-scale-space-10)">
            ${deviceCards}
          </div>
          <div class="flank-subcard" style="margin-top: var(--flank-scale-space-sm); padding: 14px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
              <span class="flank-card-muted">Laptop charge level history</span>
              <span class="flank-stat-val">${b.percent}%</span>
            </div>
            ${buildSparklineSvg(history, 'Laptop battery charge level history')}
          </div>
        </div>
      </div>
      <div class="flank-window__footer flank-win-footer">
        <span>Laptop battery (${escapeHtml(model)}) · ${b.peripherals.length} power sources monitored</span>
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Press Esc to close</span>
        </div>
      </div>
    </div>
  </div>`;
}

export function renderClockWindowHtml(state: FlankState): string {
  const c = state.clock;
  const f = state.focus;
  const elapsed = Math.max(0, f.totalSec - f.remainingSec);
  const focusPct = f.totalSec > 0 ? Math.min(100, Math.round((elapsed / f.totalSec) * 100)) : 0;

  const quickCities = ['Tokyo', 'London', 'New York', 'Dubai', 'Singapore', 'San Francisco', 'Sydney', 'Berlin'];
  const quickChips = quickCities
    .map(
      (city) =>
        `<button type="button" class="flank-chip" data-clock-quick-add="${escapeHtml(city)}">+ ${escapeHtml(city)}</button>`
    )
    .join('');

  const cityCards = c.cities
    .map(
      (item) => `<div class="flank-preview-box" style="justify-content: space-between; align-items: center; padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
        <span style="display:flex; align-items:center; gap: var(--flank-scale-space-10)">
          <span class="flank-row-chip" style="width: var(--flank-scale-ring-tile); height: var(--flank-scale-ring-tile)">${iconSvg(item.isDay ? 'sun' : 'moon', 16)}</span>
          <span style="display:flex; flex-direction:column; gap: var(--flank-scale-bar-thin)">
            <span style="font-size: var(--flank-scale-font-body-sm); font-weight: 600; color: var(--flank-color-text);">${escapeHtml(item.city)}</span>
            <span class="flank-row-meta">${escapeHtml(item.country ? `${item.country} · ${item.timezone}` : item.timezone)} · ${escapeHtml(item.offsetText)}</span>
          </span>
        </span>
        <span style="display:flex; align-items:center; gap: var(--flank-scale-space-10)">
          <span style="display:flex; flex-direction:column; align-items:flex-end; gap: var(--flank-scale-bar-thin)">
            <span class="flank-stat-val tabular-nums" style="font-size: var(--flank-scale-font-body-sm)">${escapeHtml(item.timeText)}</span>
            <span class="flank-row-meta">${escapeHtml(item.dateText)}</span>
          </span>
          <button type="button" class="flank-ui-btn is-ghost" data-clock-remove="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.city)}" title="Remove ${escapeHtml(item.city)}" style="width: 28px; height: 28px; padding: 0;">
            ${iconSvg('trash', 14)}
          </button>
        </span>
      </div>`
    )
    .join('');

  return `<div class="flank-window-backdrop" id="flank-full-window">
    <div class="flank-window" role="dialog" aria-label="World Clock and Focus">
      ${renderTitleBar('World Clock & Focus Timer')}
      <div class="flank-window__body flank-win-body" style="padding: 24px; gap: 16px; box-sizing: border-box; flex: 1; min-height: 0; display: flex; overflow: hidden;">
        <div class="flank-list-col" style="flex: 1; min-width: 0; border-right: none; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;">
          <div class="flank-preview-box" style="flex-direction:column; align-items:stretch; gap: var(--flank-scale-space-sm); padding: 14px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items:center;">
              <span class="flank-card-title">Local time</span>
              <span class="flank-live-pill">
                <span class="flank-live-dot"></span>
                ${escapeHtml(c.localZoneText)}
              </span>
            </div>
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items: flex-end">
              <span class="flank-display-hero tabular-nums">${escapeHtml(c.localTimeText)}</span>
              <span class="flank-hero-meta" style="text-align: right;">
                <span class="flank-hero-condition">${escapeHtml(c.localDateText)}</span>
                <span class="flank-hero-hl">${c.cities.length} cities tracked</span>
              </span>
            </div>
          </div>

          <div class="flank-preview-box" style="flex-direction:column; align-items:stretch; gap: var(--flank-scale-space-sm); padding: 14px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
            <span class="flank-card-title">Add any city to World Clock</span>
            <div style="display:flex; gap: var(--flank-scale-space-sm)">
              <input type="text" id="flank-clock-city-input" class="flank-ui-input" style="flex: 1;" placeholder="Enter any city name (e.g. Paris, Toronto, Seoul)..." />
              <button type="button" class="flank-ui-btn is-primary" data-action="add-world-clock">Add city</button>
            </div>
            <span class="flank-row-meta" style="margin-top: 4px;">Quick add popular hubs:</span>
            <div class="flank-chip-row" style="gap: 6px; flex-wrap: wrap;">${quickChips}</div>
          </div>

          <div class="flank-preview-box" style="flex-direction:column; align-items:stretch; gap: var(--flank-scale-space-sm); padding: 14px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items:center;">
              <span class="flank-card-title">Focus timer</span>
              <span class="flank-card-muted">${f.completedSessions} sessions · ${f.focusedMinutesToday}m today</span>
            </div>
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items: center">
              <span class="flank-display-hero tabular-nums" style="font-size: var(--flank-scale-font-title)">${formatDuration(f.remainingSec)}</span>
              <div class="flank-chip-row" style="gap: 6px;">
                <button type="button" class="flank-chip${f.durationMinutes === 15 && f.mode === 'focus' ? ' is-active' : ''}" data-focus-duration="15">15m</button>
                <button type="button" class="flank-chip${f.durationMinutes === 25 && f.mode === 'focus' ? ' is-active' : ''}" data-focus-duration="25">25m</button>
                <button type="button" class="flank-chip${f.durationMinutes === 45 && f.mode === 'focus' ? ' is-active' : ''}" data-focus-duration="45">45m</button>
                <button type="button" class="flank-chip${f.mode === 'break' ? ' is-active' : ''}" data-focus-action="switch-mode">Break 5m</button>
              </div>
            </div>
            <div class="flank-progress-track" style="margin-top: 4px;"><div class="flank-progress-fill" style="width: ${focusPct}%"></div></div>
            <div style="display:flex; gap: var(--flank-scale-space-sm); margin-top: 6px;">
              <button type="button" class="flank-ui-btn is-primary" style="flex: 1; justify-content: center" data-focus-action="toggle">${f.running ? 'Pause session' : 'Start focus session'}</button>
              <button type="button" class="flank-ui-btn is-ghost" data-focus-action="reset" aria-label="Reset timer" style="width: 32px; height: 32px; padding: 0;">${iconSvg('reset', 16)}</button>
            </div>
          </div>
        </div>

        <div class="flank-preview-col" style="flex: 1; min-width: 0; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;">
          <span class="flank-card-title">Saved world clocks</span>
          <div style="display:flex; flex-direction:column; gap: var(--flank-scale-space-10)">
            ${cityCards || `<div class="flank-preview-box" style="padding: 16px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);"><span class="flank-card-muted">No world clocks added yet. Search or click a quick-add city on the left.</span></div>`}
          </div>
        </div>
      </div>
      <div class="flank-window__footer flank-win-footer">
        <span>World clock &amp; Focus timer · Automatic IANA timezone resolution</span>
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Press Esc to close</span>
        </div>
      </div>
    </div>
  </div>`;
}

export function renderSettingsWindowHtml(
  state: FlankState,
  currentTheme: FlankTheme,
  ui: WindowUiState
): string {
  const tabs: Array<{ id: WindowUiState['settingsTab']; label: string }> = [
    { id: 'appearance', label: 'Appearance & Themes' },
    { id: 'items', label: 'Items & Shortcuts' },
    { id: 'widgets', label: 'Widgets' },
    { id: 'about', label: 'About' },
  ];

  const navHtml = tabs
    .map(
      (t) => `<button type="button" class="flank-list-row${ui.settingsTab === t.id ? ' is-selected' : ''}" data-settings-tab="${t.id}" style="gap: 10px;">
        <span class="flank-row-chip" style="width: 28px; height: 28px;">${iconSvg(t.id === 'appearance' ? 'sun' : t.id === 'items' ? 'clipboard' : t.id === 'widgets' ? 'battery' : 'globe', 16)}</span>
        <span class="flank-row-text"><span class="flank-row-title" style="color: var(--flank-color-text); font-weight: 500;">${t.label}</span></span>
      </button>`
    )
    .join('');

  let contentHtml = '';

  if (ui.settingsTab === 'appearance') {
    const themeCards = Object.values(BUNDLED_THEMES)
      .map((t, idx) => {
        const isCurrent = currentTheme.id === t.id;
        const isFeatured = idx === 0;
        const isGlass = t.layout.variant === 'glass' || t.id.includes('glass') || t.id === 'aurora';
        const previewBg = isGlass
          ? 'radial-gradient(circle at 20% 20%, rgba(255,86,150,0.85), transparent 70%), radial-gradient(circle at 80% 10%, rgba(122,92,255,0.9), transparent 70%), #0b1030'
          : t.color.surface;
        const miniDockBg = isGlass ? 'rgba(255, 255, 255, 0.2)' : t.color.surface;
        const miniDockBorder = isGlass ? '1px solid rgba(255, 255, 255, 0.4)' : `1px solid ${t.color.divider}`;
        const miniCardBg = isGlass ? 'rgba(255, 255, 255, 0.25)' : t.color.tileBg;
        const miniAccent = t.color.accent;

        return `
          <div class="flank-theme-card${isFeatured ? ' is-featured' : ''}${isCurrent ? ' is-active' : ''}">
            <div class="flank-theme-preview" style="background: ${previewBg}; color: ${t.color.text}">
              <div class="flank-theme-mini-card" style="background: ${miniCardBg}; border: ${miniDockBorder};">
                <div class="flank-theme-mini-line" style="width: 40%; background: ${miniAccent}; opacity: 1;"></div>
                <div class="flank-theme-mini-line" style="width: 70%;"></div>
                <div class="flank-theme-mini-line" style="width: 55%;"></div>
              </div>
              <div class="flank-theme-mini-dock" style="background: ${miniDockBg}; border: ${miniDockBorder};">
                <div class="flank-theme-mini-dot" style="background: ${miniAccent}; opacity: 1;"></div>
                <div class="flank-theme-mini-dot"></div>
                <div class="flank-theme-mini-dot"></div>
                <div class="flank-theme-mini-dot"></div>
              </div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 10px;">
              <span style="font-weight: 600; font-size: 14px; color: var(--flank-color-text);">${escapeHtml(t.name)}</span>
              <div style="display:flex; gap: 4px;">
                ${Chip({ label: isGlass ? 'Glass' : 'Solid', variant: isGlass ? 'glass' : 'solid' })}
                ${t.default ? Chip({ label: 'Default', variant: 'accent' }) : ''}
              </div>
            </div>
            <p style="font-size: 12px; color: var(--flank-color-text-muted); margin: 4px 0 10px; line-height: 1.4; flex: 1;">
              ${escapeHtml(t.description)}
            </p>
            <button type="button" class="flank-ui-btn ${isCurrent ? 'is-ghost' : 'is-secondary'}" ${isCurrent ? 'disabled' : `data-apply-theme="${escapeHtml(t.id)}"`} style="width: 100%;">
              ${isCurrent ? 'Active Theme' : 'Apply Theme'}
            </button>
          </div>
        `;
      })
      .join('');

    const currentEdge = state.edgeOverride || currentTheme.layout.edge;
    const presets = ACCENT_PRESETS;
    const recent = (state.recentAccents || []).filter((h) => !presets.includes(h)).slice(0, 5);
    const allAccents = [...presets, ...recent];

    const accentSwatches = allAccents
      .map((hex) =>
        Swatch({
          hex,
          isActive: currentTheme.color.accent.toLowerCase() === hex.toLowerCase(),
          actionAttr: 'data-set-accent',
        })
      )
      .join('');

    const recentChips = (state.recentAccents || [])
      .map(
        (hex) =>
          `<button type="button" class="flank-chip${state.accentOverride?.toLowerCase() === hex.toLowerCase() ? ' is-active' : ''}" data-set-accent="${hex}" style="display:inline-flex; align-items:center; gap: 4px"><span style="width: 8px; height: 8px; border-radius: 50%; background: ${hex}; display:inline-block"></span>${hex}</button>`
      )
      .join('');

    const currentAccentColor = state.accentOverride || currentTheme.color.accent;
    const customPickerBox = ui.customColorPickerOpen
      ? `
        <div class="flank-subcard" style="margin-top: 8px; gap: 8px; padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
          <div style="display:flex; align-items:center; gap: 10px; flex-wrap:wrap">
            <span id="flank-custom-swatch-preview" style="width: 24px; height: 24px; border-radius: 6px; background: ${currentAccentColor}; display:inline-block; border: 1px solid var(--flank-color-divider)"></span>
            <span style="font-size: 12px; font-weight: 500; color: var(--flank-color-text);">Hue:</span>
            <input type="range" id="flank-hue-slider" min="0" max="360" value="230" style="flex: 1; min-width: 120px; accent-color: var(--flank-color-accent); height: 6px; border-radius: 4px; cursor: pointer; background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)" />
            <input type="text" id="flank-accent-hex-input" class="flank-ui-input" style="width: 90px; padding: 4px 8px; font-family: var(--flank-type-mono); font-size: 12px" value="${escapeHtml(currentAccentColor)}" placeholder="#2F4BFF" />
            <button type="button" class="flank-chip is-active" data-action="apply-custom-hex">Apply</button>
          </div>
          ${recentChips ? `<div style="display:flex; align-items:center; gap: 6px; flex-wrap:wrap"><span style="font-size: 11px; color: var(--flank-color-text-muted)">Recent:</span>${recentChips}</div>` : ''}
          ${ui.customColorContrastWarning ? `<span style="font-size: 11px; color: var(--flank-color-accent-pink, #FF5B7A)">${escapeHtml(ui.customColorContrastWarning)}</span>` : ''}
        </div>
      `
      : '';

    contentHtml = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        ${SectionHeader({
          title: 'Theme Store',
          description: 'Choose a visual style for Flank. Solid themes offer high-contrast legibility, while Glass themes blend dynamically with your desktop wallpaper.',
          actionHtml: '<button type="button" class="flank-chip" data-action="revert-paper">Revert to Paper</button>',
        })}
        ${ui.themeValidationMsg ? `<div class="flank-subcard" style="padding: 10px;"><span style="font-size: 12px; color: var(--flank-color-text);">${escapeHtml(ui.themeValidationMsg)}</span></div>` : ''}
        <div class="flank-theme-grid">
          ${themeCards}
        </div>

        ${SectionHeader({
          title: 'Screen Edge & Accent',
          description: 'Choose dock position and customizable accent color.',
        })}
        ${Row({
          label: 'Screen edge override',
          description: 'Position the vertical dock on the left or right screen border.',
          controlHtml: Segmented({
            options: [
              { value: 'right', label: 'Right Edge' },
              { value: 'left', label: 'Left Edge' },
            ],
            activeValue: currentEdge as 'left' | 'right',
            actionAttr: 'data-set-edge',
          }),
        })}
        ${Row({
          label: 'Accent override (4.5:1 verified)',
          description: 'Select an accent swatch or enter a custom hex color.',
          controlHtml: `
            <div style="display:flex; align-items:center; gap: 8px; flex-wrap:wrap;">
              ${accentSwatches}
              <button type="button" class="flank-chip${ui.customColorPickerOpen ? ' is-active' : ''}" data-action="toggle-custom-color" style="display:inline-flex; align-items:center; gap: 4px">
                <span style="width: 10px; height: 10px; border-radius: 50%; background: ${currentTheme.color.accent}; display:inline-block"></span>Custom...
              </button>
              ${state.accentOverride ? `<button type="button" class="flank-chip" data-action="reset-accent">Reset</button>` : ''}
            </div>
          `,
        })}
        ${customPickerBox}

        ${SectionHeader({
          title: 'Hide & Collapsible Dock',
          description: 'Configure automatic collapse behaviors and edge tab appearance.',
        })}
        ${Row({
          label: 'Collapse automatically when idle',
          description: 'Smoothly morphs the dock into an edge tab after inactivity.',
          controlHtml: `
            <div style="display:flex; align-items:center; gap: 8px;">
              ${state.autoCollapse ? `
                <input type="range" id="flank-auto-collapse-slider" min="3" max="60" value="${state.autoCollapseSeconds || 10}" style="width: 80px; accent-color: var(--flank-color-accent); cursor: pointer;" />
                <span id="flank-auto-collapse-val" style="font-size: 12px; color: var(--flank-color-text-muted); min-width: 24px">${state.autoCollapseSeconds || 10}s</span>
              ` : ''}
              ${Switch({ checked: Boolean(state.autoCollapse), actionAttr: 'data-action="toggle-auto-collapse"' })}
            </div>
          `,
        })}
        ${Row({
          label: 'Collapse on full-screen apps',
          description: 'Automatically hides dock when gaming or viewing full-screen media.',
          controlHtml: Switch({ checked: Boolean(state.collapseOnFullscreen), actionAttr: 'data-action="toggle-collapse-fullscreen"' }),
        })}
        ${Row({
          label: 'Show logo on collapsed tab',
          description: 'Shows the Flank bird mascot glyph on the edge tab.',
          controlHtml: Switch({ checked: Boolean(state.showLogoOnTab), actionAttr: 'data-action="toggle-logo-on-tab"' }),
        })}
        ${Row({
          label: 'Start Flank collapsed',
          description: 'Launches directly into the edge tab on startup.',
          controlHtml: Switch({ checked: Boolean(state.startCollapsed), actionAttr: 'data-action="toggle-start-collapsed"' }),
        })}
        ${Row({
          label: 'Reserve screen space (AppBar)',
          description: 'Prevents maximized windows from overlapping the dock.',
          controlHtml: Switch({ checked: Boolean(state.reserveScreenSpace), actionAttr: 'data-toggle-appbar="1"' }),
        })}
      </div>
    `;
  } else if (ui.settingsTab === 'items') {
    const appItems = state.items.filter((i) => i.kind === 'app' || i.kind === 'link' || i.group === 'apps');
    const widgetItems = state.items.filter((i) => i.kind === 'widget' || i.group === 'widgets');
    const otherItems = state.items.filter((i) => !appItems.includes(i) && !widgetItems.includes(i));

    const renderItemRow = (item: typeof state.items[0], idx: number) => {
      const isRec = ui.recordingItemId === item.id;
      const isCustom = item.id.startsWith('custom-') || item.kind === 'link' || (item.target && (item.target.startsWith('http') || item.target.endsWith('.exe')));
      const iconMarkup = renderItemIcon(item);

      return Row({
        label: item.label,
        description: `${item.kind}${item.target ? ` · ${item.target}` : ''}`,
        dragHandleHtml: `<span class="flank-drag-handle" title="Reorder" style="color: var(--flank-color-text-muted); cursor: grab; font-size: 14px; user-select: none;">⋮⋮</span>`,
        iconHtml: iconMarkup,
        controlHtml: `
          <div style="display:flex; align-items:center; gap: 8px;">
            ${isCustom ? `
              <button type="button" class="flank-ui-btn is-ghost" data-action="refresh-item-icon" data-item-id="${escapeHtml(item.id)}" title="Refresh icon">
                ${iconSvg('refresh-cw', 12)}
              </button>
              <button type="button" class="flank-ui-btn is-ghost" data-action="choose-item-icon" data-item-id="${escapeHtml(item.id)}" title="Choose image...">
                ${iconSvg('image', 12)}
              </button>
            ` : ''}
            <button type="button" class="flank-chip${isRec ? ' is-active' : ''}" data-record-shortcut="${escapeHtml(item.id)}" title="Set shortcut">
              ${isRec ? 'Press keys...' : escapeHtml(item.shortcut || 'Set shortcut')}
            </button>
            <button type="button" class="flank-ui-btn is-ghost" data-move-up="${idx}" aria-label="Move up">
              ${iconSvg('chevron-up', 12)}
            </button>
            <button type="button" class="flank-ui-btn is-ghost" data-move-down="${idx}" aria-label="Move down">
              ${iconSvg('chevron-down', 12)}
            </button>
            ${item.id.startsWith('custom-') ? `
              <button type="button" class="flank-ui-btn is-danger" data-delete-item="${escapeHtml(item.id)}" aria-label="Delete item">
                ${iconSvg('trash', 12)}
              </button>
            ` : ''}
            ${Switch({ checked: Boolean(item.enabled), actionAttr: `data-toggle-item="${escapeHtml(item.id)}"` })}
          </div>
        `,
      });
    };

    contentHtml = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        ${SectionHeader({
          title: 'Dock Items & Shortcuts',
          description: 'Toggle items on or off, configure global shortcuts, and reorder tiles.',
          actionHtml: `
            <div style="display:flex; gap: 8px;">
              <button type="button" class="flank-chip" data-action="reset-recommended-items">Recommended</button>
              <button type="button" class="flank-chip" data-action="reset-default-items">Defaults</button>
            </div>
          `,
        })}
        ${ui.shortcutConflictMsg ? `<div class="flank-subcard" style="padding: 10px;"><span>${escapeHtml(ui.shortcutConflictMsg)}</span></div>` : ''}

        ${Row({
          label: 'Collapse / Expand Flank Dock',
          description: 'Global hotkey to toggle dock visibility.',
          iconHtml: iconSvg('chevron-right', 16),
          controlHtml: `<button type="button" class="flank-chip${ui.recordingItemId === 'collapse-hotkey' ? ' is-active' : ''}" data-record-shortcut="collapse-hotkey">${ui.recordingItemId === 'collapse-hotkey' ? 'Press keys...' : escapeHtml(state.collapseHotkey || 'Ctrl+Alt+F')}</button>`,
        })}

        ${Card({
          children: `
            <div style="display:flex; flex-direction:column; gap: 10px; padding: 14px;">
              <span style="font-weight: 600; font-size: 13px; color: var(--flank-color-text);">Add custom app or website shortcut</span>
              <div style="display:flex; gap: 8px; align-items:center;">
                ${Input({ id: 'flank-new-item-label', placeholder: 'Label (e.g. VS Code, GitHub)', style: 'flex: 1;' })}
                ${Input({ id: 'flank-new-item-target', placeholder: 'Command or URL (e.g. code, https://github.com)', style: 'flex: 2;' })}
                ${Button({ label: '+ Add to dock', variant: 'primary', actionAttr: 'data-action="add-custom-item"' })}
              </div>
            </div>
          `,
        })}

        <div style="display:flex; flex-direction:column; gap: 6px;">
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--flank-color-text-muted); padding: 8px 0 4px;">Apps &amp; Links</span>
          ${appItems.map((item, idx) => renderItemRow(item, state.items.indexOf(item))).join('')}

          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--flank-color-text-muted); padding: 16px 0 4px;">Widgets</span>
          ${widgetItems.map((item, idx) => renderItemRow(item, state.items.indexOf(item))).join('')}

          ${otherItems.length > 0 ? `
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--flank-color-text-muted); padding: 16px 0 4px;">System</span>
            ${otherItems.map((item, idx) => renderItemRow(item, state.items.indexOf(item))).join('')}
          ` : ''}
        </div>
      </div>
    `;
  } else if (ui.settingsTab === 'widgets') {
    const clockChips = state.clock.cities
      .map(
        (c) =>
          `<button type="button" class="flank-chip" data-clock-remove="${escapeHtml(c.id)}" title="Click to remove ${escapeHtml(c.city)}">${escapeHtml(c.city)} (${escapeHtml(c.timeText)}) ×</button>`
      )
      .join('');

    contentHtml = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        ${SectionHeader({
          title: 'Widget Preferences',
          description: 'Configure weather location, multiple world clocks, and clipboard storage.',
        })}
        ${Row({
          label: 'Weather city',
          description: 'Location for weather and hourly forecast.',
          controlHtml: `
            <div style="display:flex; gap: 8px;">
              ${Input({ id: 'flank-weather-city-input', value: state.weather.city, style: 'width: 140px;' })}
              ${Button({ label: 'Update', variant: 'primary', actionAttr: 'data-action="save-weather-city"' })}
            </div>
          `,
        })}
        ${Row({
          label: 'Add World Clock city',
          description: 'Search any city to track local time.',
          controlHtml: `
            <div style="display:flex; gap: 8px;">
              ${Input({ id: 'flank-clock-city-input', placeholder: 'e.g. Tokyo, London, Dubai...', style: 'width: 160px;' })}
              ${Button({ label: 'Add city', variant: 'primary', actionAttr: 'data-action="add-world-clock"' })}
            </div>
          `,
        })}
        ${Row({
          label: 'Saved World Clocks',
          controlHtml: `<div class="flank-chip-row" style="flex-wrap: wrap; max-width: 320px; justify-content: flex-end; gap: 6px;">${clockChips || '<span class="flank-card-muted">None</span>'}</div>`,
        })}
        ${Row({
          label: 'Clipboard history',
          description: 'Removes all unpinned entries from local database.',
          controlHtml: Button({ label: 'Clear unpinned items', variant: 'secondary', actionAttr: 'data-action="clear-clipboard"' }),
        })}
        ${Row({
          label: 'Launch Flank on Windows sign-in',
          description: 'Automatically starts Flank in background.',
          controlHtml: Switch({ checked: Boolean(state.autostart), actionAttr: 'data-action="toggle-autostart"' }),
        })}
        <div style="border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); margin: 8px 0;"></div>
        ${SectionHeader({
          title: 'AI Model Usage & Plan Connection',
          description: 'Connect your Google AI Pro / Gemini API key to track real token limits, models, and usage.',
        })}
        ${Row({
          label: 'AI Subscription / Plan',
          description: 'Provider to monitor in the AI widget.',
          controlHtml: `
            <select id="flank-ai-provider-select" class="flank-input" style="width: 220px; height: 32px; background: var(--flank-color-icon-plate); color: var(--flank-color-text);">
              <option value="google" selected>Google AI Pro (Gemini 2.0 / 1.5)</option>
              <option value="google-one">Google One AI Premium</option>
              <option value="openai">OpenAI ChatGPT Plus</option>
              <option value="claude">Anthropic Claude Pro</option>
            </select>
          `,
        })}
        ${Row({
          label: 'Google Gemini API Key',
          description: 'Used to verify connection and query model quota.',
          controlHtml: `
            <div style="display:flex; gap: 8px; width: 260px;">
              <input type="password" id="flank-ai-apikey-input" class="flank-input" style="flex: 1; height: 32px;" placeholder="AIzaSy..." value="${escapeHtml(state.ai?.apiKey || '')}" />
              <button type="button" class="flank-btn is-secondary" data-action="test-ai-key" style="height: 32px; padding: 0 10px; font-size: 11px;">Test</button>
            </div>
          `,
        })}
        ${Row({
          label: 'Plan Quota Tier',
          description: 'Configures model breakdown and monthly cycle.',
          controlHtml: `
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap: 8px;">
              <select id="flank-ai-plan-select" class="flank-input" style="width: 260px; height: 32px; background: var(--flank-color-icon-plate); color: var(--flank-color-text);">
                <option value="pro" selected>Google AI Pro (2,000,000 tokens)</option>
                <option value="premium">Google One AI Premium (2M context)</option>
                <option value="flash">Gemini Flash Pay-as-you-go</option>
                <option value="free">Free Tier (15 RPM / 1M TPM)</option>
              </select>
              <button type="button" class="flank-btn is-primary" data-action="save-ai-settings" style="height: 32px; padding: 0 14px;">Save AI Settings</button>
            </div>
          `,
        })}
      </div>
    `;
  } else {
    contentHtml = `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display:flex; flex-direction:column; align-items:center; text-align:center; padding: 24px 0 12px; gap: 8px;">
          <img src="brand/flank-mascot.svg" alt="Flank Mascot" width="120" height="120" style="width: 120px; height: 120px; pointer-events: none;" />
          <span style="font-size: 20px; font-weight: 700; color: var(--flank-color-text);">Flank</span>
          <span class="flank-card-muted" style="color: var(--flank-color-text-muted);">Version ${APP_VERSION}</span>
          <span style="max-width: 440px; font-size: 13px; color: var(--flank-color-text-muted); line-height: 1.5;">
            A slim, vertical second dock for Windows with live widgets, instant clipboard history, and fluid themes.
          </span>
          <div style="display:flex; gap: 10px; margin-top: 6px;">
            ${Button({ label: 'Website', variant: 'ghost', actionAttr: 'data-action="open-link-website"' })}
            ${Button({ label: 'GitHub Issues', variant: 'ghost', actionAttr: 'data-action="open-link-issues"' })}
            ${Button({ label: 'MIT License', variant: 'ghost', actionAttr: 'data-action="open-link-license"' })}
          </div>
          ${Button({ label: 'Check for updates', variant: 'secondary', actionAttr: 'data-action="check-updates"', style: 'margin-top: 6px;' })}
        </div>

        ${Card({
          children: `
            <div style="display:flex; flex-direction:column; gap: 8px; padding: 16px;">
              <span style="font-weight: 600; font-size: 13px; color: var(--flank-color-text);">Design &amp; Privacy Principles</span>
              <span class="flank-card-muted" style="color: var(--flank-color-text-muted); line-height: 1.4;">1. Glanceable widgets that never steal focus from your active window.</span>
              <span class="flank-card-muted" style="color: var(--flank-color-text-muted); line-height: 1.4;">2. 100% theme-driven tokens with WCAG 4.5:1 contrast verification.</span>
              <span class="flank-card-muted" style="color: var(--flank-color-text-muted); line-height: 1.4;">3. Local-only clipboard SQLite storage; skips password manager copies automatically.</span>
              <span class="flank-card-muted" style="color: var(--flank-color-text-muted); line-height: 1.4;">4. Zero telemetry. Numeric counters only; never reads private conversations.</span>
            </div>
          `,
        })}
      </div>
    `;
  }

  return `<div class="flank-window-backdrop" id="flank-full-window">
    <div class="flank-window" role="dialog" aria-label="Flank Settings">
      ${renderTitleBar('Flank Settings')}
      <div class="flank-window__body flank-win-body">
        <div class="flank-window__nav flank-list-col is-nav">
          ${navHtml}
        </div>
        <div class="flank-window__content flank-preview-col">
          <div style="max-width: 640px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 24px;">
            ${contentHtml}
          </div>
        </div>
      </div>
      <div class="flank-window__footer flank-win-footer">
        <span>Active theme: ${escapeHtml(currentTheme.name)} (${escapeHtml(currentTheme.id)})</span>
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Press Esc to close</span>
        </div>
      </div>
    </div>
  </div>`;
}
