import { type FlankTheme } from '../theme/schema.ts';
import { type FlankState, type WidgetKind } from '../providers/types.ts';
import { iconSvg } from './icons.ts';

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderEmptyState(title: string, subtitle?: string): string {
  return `
    <div class="flank-empty-state" style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding: var(--flank-scale-space-16) var(--flank-scale-space-12); gap: var(--flank-scale-space-xs); pointer-events:none;">
      <img src="brand/flank-mascot.svg" alt="" width="72" height="72" style="width: 72px; height: 72px; opacity: 0.55; pointer-events: none;" />
      <span style="font-size: var(--flank-scale-font-body-sm); font-weight: 500; color: var(--flank-color-text); line-height: 1.3">${escapeHtml(title)}</span>
      ${subtitle ? `<span style="font-size: var(--flank-scale-font-caption); color: var(--flank-color-text-muted); line-height: 1.2">${escapeHtml(subtitle)}</span>` : ''}
    </div>
  `;
}

export function formatRate(bytesPerSec: number): string {
  if (bytesPerSec >= 1024 * 1024) {
    return `${(bytesPerSec / (1024 * 1024)).toFixed(1)} MB/s`;
  }
  if (bytesPerSec >= 1024) {
    return `${Math.round(bytesPerSec / 1024)} KB/s`;
  }
  return `${Math.round(bytesPerSec)} B/s`;
}

export function formatDuration(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const rem = s % 60;
  if (h > 0) {
    return `${h}:${m < 10 ? '0' : ''}${m}:${rem < 10 ? '0' : ''}${rem}`;
  }
  return `${m}:${rem < 10 ? '0' : ''}${rem}`;
}

export function buildSparklineSvg(history: number[], ariaLabel = 'CPU usage over the last 60 seconds'): string {
  const pts = history.length >= 2 ? history : [20, 24, 22, 28, 23];
  const width = 264;
  const height = 52;
  const stepX = width / Math.max(1, pts.length - 1);
  const coords = pts.map((val, idx) => {
    const x = Math.round(idx * stepX);
    const clamped = Math.max(0, Math.min(100, val));
    const y = Math.round(height - 6 - (clamped / 100) * (height - 14));
    return `${x} ${y}`;
  });
  const linePath = `M${coords.join(' L')}`;
  const areaPath = `${linePath} L${width} ${height} L0 ${height} Z`;
  return `<svg width="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="${escapeHtml(ariaLabel)}" style="height: var(--flank-scale-sparkline-height)">
    <path d="${areaPath}" fill="var(--flank-color-accent-soft)"/>
    <path d="${linePath}" fill="none" stroke="var(--flank-color-accent)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
}

function buildAsciiBar(percent: number, totalCols = 20): string {
  const clamped = Math.max(0, Math.min(100, percent));
  const filled = Math.round((clamped / 100) * totalCols);
  const empty = Math.max(0, totalCols - filled);
  return `<span aria-hidden="true"><span style="color: var(--flank-color-accent)">${'&#9608;'.repeat(filled)}</span><span style="color: var(--flank-color-track-bg)">${'&#9617;'.repeat(empty)}</span></span>`;
}

function renderWeatherSkeleton(): string {
  return `
    <div class="flank-card-row-between" style="margin-bottom: 8px">
      <div class="flank-skeleton" style="width: 80px; height: 16px;"></div>
      <div class="flank-skeleton" style="width: 32px; height: 14px;"></div>
    </div>
    <div class="flank-card-row-between" style="align-items: flex-end; margin-bottom: 12px">
      <div class="flank-skeleton" style="width: 72px; height: 36px; border-radius: 6px;"></div>
      <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-end">
        <div class="flank-skeleton" style="width: 60px; height: 14px;"></div>
        <div class="flank-skeleton" style="width: 84px; height: 12px;"></div>
      </div>
    </div>
    <div class="flank-hourly-row" style="display:flex; justify-content:space-between; gap:6px">
      ${Array.from({ length: 5 }).map(() => `
        <div style="display:flex; flex-direction:column; align-items:center; gap:6px; flex:1">
          <div class="flank-skeleton" style="width: 24px; height: 12px;"></div>
          <div class="flank-skeleton" style="width: 20px; height: 20px; border-radius: 50%;"></div>
          <div class="flank-skeleton" style="width: 20px; height: 12px;"></div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderWeatherCardInner(state: FlankState): string {
  const w = state.weather;
  if (!w || !w.city || !Array.isArray(w.hourly)) {
    return renderWeatherSkeleton();
  }
  const hourlyCols = w.hourly
    .slice(0, 5)
    .map(
      (h, idx) => `<div class="flank-hourly-col${idx === 0 ? ' is-current' : ''}" style="flex: 1; text-align: center;">
        <span>${escapeHtml(h.label)}</span>
        <span style="display:flex; justify-content:center; color: var(--flank-color-text); width: 16px; height: 16px; margin: 4px auto">${iconSvg(h.icon, 16)}</span>
        <span class="flank-hourly-temp tabular-nums" style="font-variant-numeric: tabular-nums;">${h.tempC}°</span>
      </div>`
    )
    .join('');

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">${escapeHtml(w.city)}</span>
      <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Now</span>
    </div>
    <div class="flank-hero" style="margin: 4px 0 8px;">
      <span class="flank-hero__value">${w.tempC}°</span>
      <div class="flank-hero__secondary">
        <div style="font-size: 14px; font-weight: 500; color: var(--flank-color-text);">${escapeHtml(w.condition)}</div>
        <div class="tabular-nums" style="font-size: 11px; color: var(--flank-color-text-muted);">H ${w.highC}° &nbsp;L ${w.lowC}°</div>
      </div>
    </div>
    <div class="flank-hourly-row" style="display: flex; justify-content: space-between; border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding-top: 10px;">
      ${hourlyCols}
    </div>
  `;
}

function renderStatsCardInner(state: FlankState, theme: FlankTheme): string {
  const s = state.stats;

  if (theme.layout.widgetStyle === 'row') {
    return `
      <div style="color: var(--flank-color-accent); font-weight: 700; font-size: var(--flank-scale-font-caption)">$ flank stats --live</div>
      <div class="flank-stat-list" style="font-size: var(--flank-scale-font-caption)">
        <div class="flank-card-row-between"><span class="flank-stat-label">cpu</span>${buildAsciiBar(s.cpuPercent)}<span class="tabular-nums">${s.cpuPercent}%</span></div>
        <div class="flank-card-row-between"><span class="flank-stat-label">mem</span>${buildAsciiBar(s.memPercent)}<span class="tabular-nums">${s.memPercent}%</span></div>
        <div class="flank-card-row-between"><span class="flank-stat-label">gpu</span>${buildAsciiBar(s.gpuPercent)}<span class="tabular-nums">${s.gpuPercent}%</span></div>
        <div class="flank-card-row-between"><span class="flank-stat-label">disk</span>${buildAsciiBar(s.diskPercent)}<span class="tabular-nums">${s.diskPercent}%</span></div>
        <div class="flank-card-row-between"><span class="flank-stat-label">bat</span>${buildAsciiBar(state.battery.percent)}<span class="tabular-nums">${state.battery.percent}%</span></div>
      </div>
      <div class="flank-card-row-between" style="font-size: var(--flank-scale-font-caption); color: var(--flank-color-text-muted); border-top: var(--flank-scale-hairline) solid var(--flank-color-divider); padding-top: var(--flank-scale-space-10)">
        <span class="tabular-nums">down ${formatRate(s.netDownBps)}</span>
        <span class="tabular-nums">up ${formatRate(s.netUpBps)}</span>
      </div>
      <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center;" data-action="open-full-stats">[enter] open full &nbsp;[esc] close</button>
    `;
  }

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">System Diagnostics</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${s.paused ? 'Paused' : `Live · ${s.refreshSec}s`}
      </span>
    </div>
    <div style="display:flex; flex-direction:column; gap: 6px;">
      <div class="flank-meter">
        <div class="flank-meter__header">
          <span class="flank-meter__header-label">CPU</span>
          <span class="flank-meter__header-val">${s.cpuPercent}%</span>
        </div>
        <div class="flank-meter__bar"><div class="flank-meter__fill" style="width: ${s.cpuPercent}%"></div></div>
      </div>
      <div class="flank-meter">
        <div class="flank-meter__header">
          <span class="flank-meter__header-label">Memory</span>
          <span class="flank-meter__header-val">${s.memUsedGb.toFixed(1)} / ${Math.round(s.memTotalGb)} GB</span>
        </div>
        <div class="flank-meter__bar"><div class="flank-meter__fill" style="width: ${s.memPercent}%"></div></div>
      </div>
      <div class="flank-meter">
        <div class="flank-meter__header">
          <span class="flank-meter__header-label">GPU</span>
          <span class="flank-meter__header-val">${s.gpuPercent}%</span>
        </div>
        <div class="flank-meter__bar"><div class="flank-meter__fill" style="width: ${s.gpuPercent}%"></div></div>
      </div>
      <div class="flank-meter">
        <div class="flank-meter__header">
          <span class="flank-meter__header-label">Disk (${escapeHtml(s.diskMount)})</span>
          <span class="flank-meter__header-val">${Math.round(s.diskUsedGb)} / ${Math.round(s.diskTotalGb)} GB</span>
        </div>
        <div class="flank-meter__bar"><div class="flank-meter__fill" style="width: ${s.diskPercent}%"></div></div>
      </div>
    </div>
    <div class="flank-subcard" style="padding: 10px 12px; border-radius: 10px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; flex-direction:column; gap: 6px;">
      <span class="flank-card-muted" style="font-size: 11px;">CPU, last 60 seconds</span>
      ${buildSparklineSvg(s.cpuHistory)}
    </div>
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px;">
      <div style="padding: 8px 10px; border-radius: 8px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; flex-direction:column; gap: 2px;">
        <span class="flank-card-muted" style="font-size: 11px;">Download</span>
        <span class="flank-stat-val tabular-nums" style="font-size: 13px; font-weight: 600;">${formatRate(s.netDownBps)}</span>
      </div>
      <div style="padding: 8px 10px; border-radius: 8px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; flex-direction:column; gap: 2px;">
        <span class="flank-card-muted" style="font-size: 11px;">Upload</span>
        <span class="flank-stat-val tabular-nums" style="font-size: 13px; font-weight: 600;">${formatRate(s.netUpBps)}</span>
      </div>
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center;" data-action="open-full-stats">
      <span>Open full stats</span>
      <span style="display:flex; width: 14px; height: 14px">${iconSvg('arrow-up-right', 14)}</span>
    </button>
  `;
}

function renderBatteryCardInner(state: FlankState): string {
  const b = state.battery;
  const peripheralRows = b.peripherals
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
      return `<div class="flank-meter">
        <div class="flank-meter__header">
          <span class="flank-meter__header-label" style="display:flex; align-items:center; gap: 6px;">
            <span style="display:flex; color: var(--flank-color-text-muted); width: 14px; height: 14px;">${iconSvg(iconName, 14)}</span>
            <span>${escapeHtml(p.name)}</span>
          </span>
          <span class="flank-meter__header-val">${p.percent}%${p.charging ? ' · Chg' : ''}</span>
        </div>
        <div class="flank-meter__bar"><div class="flank-meter__fill" style="width: ${Math.max(0, Math.min(100, p.percent))}%"></div></div>
      </div>`;
    })
    .join('');

  const statusLine = `${escapeHtml(b.stateText)}${b.timeRemainingText ? `, ${escapeHtml(b.timeRemainingText)}` : ''}`;

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Laptop Battery</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${escapeHtml(b.powerMode)}
      </span>
    </div>
    <div class="flank-hero" style="margin: 4px 0 8px;">
      <span class="flank-hero__value">${b.percent}%</span>
      <div class="flank-hero__secondary" style="font-size: 12px; font-weight: 500; color: var(--flank-color-text-muted); max-width: 65%;">
        ${statusLine}
      </div>
    </div>
    <div class="flank-meter" style="margin-bottom: 8px;">
      <div class="flank-meter__bar" style="height: 8px; margin-bottom: 0;"><div class="flank-meter__fill" style="width: ${Math.max(0, Math.min(100, b.percent))}%"></div></div>
    </div>
    <div style="display:flex; flex-direction:column; gap: 6px; padding-top: 8px; border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft);">
      ${peripheralRows}
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center;" data-action="open-battery-window">
      <span>Power &amp; battery details</span>
      <span style="display:flex; width: 14px; height: 14px">${iconSvg('arrow-up-right', 14)}</span>
    </button>
  `;
}

function renderPlayerCardInner(state: FlankState): string {
  const p = state.player;
  const pct = p.durationSec > 0 ? Math.min(100, Math.round((p.positionSec / p.durationSec) * 100)) : 0;
  const sourceLabel = p.sourceApp ? `${p.sourceApp} · ` : '';
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Media Player</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${p.playing ? 'Playing' : 'Paused'}
      </span>
    </div>
    <div style="display:flex; gap: 12px; align-items: center; width: 100%;">
      <span class="flank-player-art${p.playing ? ' is-playing' : ''}" style="width: 44px; height: 44px; flex-shrink: 0; border-radius: 8px; background: var(--flank-color-tile-bg); display:flex; align-items:center; justify-content:center; color: var(--flank-color-accent); border: 1px solid var(--flank-color-divider-soft); transition: box-shadow 0.3s ease, border-color 0.3s ease;" aria-hidden="true">${iconSvg('equalizer', 22)}</span>
      <div style="display:flex; flex-direction:column; gap: 2px; min-width: 0; flex: 1;">
        <div style="font-size: 13px; font-weight: 600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color: var(--flank-color-text);" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</div>
        <div style="font-size: 12px; color: var(--flank-color-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(p.artist)}</div>
        <div style="font-size: 10px; color: var(--flank-color-text-muted);">${escapeHtml(sourceLabel)}${p.playing ? 'Now playing' : 'Paused'}</div>
      </div>
    </div>
    <div class="flank-meter">
      <div class="flank-meter__bar" style="height: 4px; margin-bottom: 4px;"><div class="flank-meter__fill" style="width: ${pct}%"></div></div>
      <div class="flank-row tabular-nums" style="min-height: auto; font-size: 11px; color: var(--flank-color-text-muted);">
        <span>${formatDuration(p.positionSec)}</span>
        <span>${p.durationSec > 0 ? formatDuration(p.durationSec) : 'Live'}</span>
      </div>
    </div>
    <div class="flank-actions" style="justify-content: center; gap: 12px;">
      <button type="button" class="flank-btn is-secondary" style="flex: none; width: 34px; height: 34px; padding: 0; border-radius: 50%;" data-media-action="previous" aria-label="Previous track">
        ${iconSvg('previous', 15)}
      </button>
      <button type="button" class="flank-btn is-primary${p.playing ? ' is-playing-btn' : ''}" style="flex: none; width: 38px; height: 38px; padding: 0; border-radius: 50%;" data-media-action="play-pause" aria-label="${p.playing ? 'Pause' : 'Play'}">
        ${iconSvg(p.playing ? 'pause' : 'play', 16)}
      </button>
      <button type="button" class="flank-btn is-secondary" style="flex: none; width: 34px; height: 34px; padding: 0; border-radius: 50%;" data-media-action="next" aria-label="Next track">
        ${iconSvg('next', 15)}
      </button>
    </div>
  `;
}

function renderFocusCardInner(state: FlankState): string {
  const f = state.focus;
  const elapsed = Math.max(0, f.totalSec - f.remainingSec);
  const pct = f.totalSec > 0 ? Math.min(100, Math.round((elapsed / f.totalSec) * 100)) : 0;
  const presets = [15, 25, 45, 60];
  const presetButtons = presets
    .map(
      (mins) =>
        `<button type="button" class="flank-chip${f.durationMinutes === mins && f.mode === 'focus' ? ' is-active' : ''}" style="flex: 1; justify-content: center; height: 28px;" data-focus-duration="${mins}">${mins}m</button>`
    )
    .join('');

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Focus Timer</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${f.running ? (f.mode === 'focus' ? 'Focusing' : 'Break') : f.mode === 'focus' ? 'Deep focus' : 'Break'}
      </span>
    </div>
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 4px; padding: 6px 0;">
      <span class="tabular-nums" style="text-align:center; font-family: var(--flank-font-stack); font-variant-numeric: tabular-nums; line-height: 1; font-size: 34px; font-weight: 700; color: var(--flank-color-text);">${formatDuration(f.remainingSec)}</span>
      <span style="text-align:center; font-size: 11px; color: var(--flank-color-text-muted);">${f.mode === 'focus' ? 'Focus session' : 'Rest break'} · ${f.completedSessions} done · ${f.focusedMinutesToday}m today</span>
    </div>
    <div class="flank-meter__bar" style="height: 6px; margin-bottom: 4px;"><div class="flank-meter__fill" style="width: ${pct}%"></div></div>
    <div style="display: flex; gap: 6px; width: 100%;">
      ${presetButtons}
    </div>
    <div style="display: flex; width: 100%;">
      <button type="button" class="flank-chip${f.mode === 'break' ? ' is-active' : ''}" style="width: 100%; justify-content: center; height: 28px;" data-focus-action="switch-mode">${f.mode === 'break' ? 'Switch to focus' : 'Break 5m'}</button>
    </div>
    <div class="flank-actions">
      <button type="button" class="flank-btn is-primary" style="flex: 1; justify-content: center;" data-focus-action="toggle">
        <span>${f.running ? 'Pause' : 'Start focus'}</span>
      </button>
      <button type="button" class="flank-btn is-secondary" style="width: 32px; min-width: 32px; padding: 0; justify-content: center;" data-focus-action="reset" aria-label="Reset timer" title="Reset timer">
        ${iconSvg('reset', 16)}
      </button>
    </div>
  `;
}

function renderClockCardInner(state: FlankState): string {
  const c = state.clock;
  const cityRows = c.cities
    .map(
      (item) => `<div class="flank-row" style="padding: 4px 0; border-bottom: var(--flank-scale-hairline) solid var(--flank-color-divider-soft);">
        <span style="display:flex; align-items:center; gap: 8px; min-width: 0; flex: 1;">
          <span style="display:flex; color: var(--flank-color-text-muted); width: 14px; height: 14px;">${iconSvg(item.isDay ? 'sun' : 'moon', 14)}</span>
          <span style="display:flex; flex-direction:column; min-width: 0;">
            <span style="font-size: 12px; font-weight: 600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(item.city)}</span>
            <span style="font-size: 11px; color: var(--flank-color-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(item.country ? `${item.country} · ${item.offsetText}` : item.offsetText)}</span>
          </span>
        </span>
        <span style="display:flex; align-items:center; gap: 6px; flex-shrink: 0;">
          <span class="tabular-nums" style="font-size: 12px; font-weight: 600; font-family: var(--flank-font-stack);">${escapeHtml(item.timeText)}</span>
          <button type="button" class="flank-win-btn" style="width: 20px; height: 20px;" data-clock-remove="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.city)}" title="Remove ${escapeHtml(item.city)}">
            ${iconSvg('x', 11)}
          </button>
        </span>
      </div>`
    )
    .join('');

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">World Clock</span>
      <span class="flank-card__chip" style="font-size: 11px; color: var(--flank-color-text-muted);">${escapeHtml(c.localZoneText)}</span>
    </div>
    <div class="flank-hero" style="margin: 4px 0 8px;">
      <span class="flank-hero__value tabular-nums" style="font-family: var(--flank-font-stack); font-size: 26px;">${escapeHtml(c.localTimeText)}</span>
      <div class="flank-hero__secondary">
        <div style="font-size: 13px; font-weight: 500; color: var(--flank-color-text);">Local time</div>
        <div style="font-size: 11px; color: var(--flank-color-text-muted);">${escapeHtml(c.localDateText)}</div>
      </div>
    </div>
    <div style="display:flex; flex-direction:column; max-height: 130px; overflow-y: auto;">
      ${cityRows || `<span style="font-size: 12px; color: var(--flank-color-text-muted);">Add any city below to track its live time.</span>`}
    </div>
    <div style="display:flex; gap: 8px; align-items:center; padding-top: 6px; border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft);">
      <input type="text" id="flank-clock-city-input" class="flank-input" placeholder="Add city (e.g. Dubai, Paris)..." />
      <button type="button" class="flank-btn is-primary" style="padding: 0 14px;" data-action="add-world-clock">Add</button>
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center;" data-action="open-clock-window">
      <span>Manage world clocks</span>
      <span style="display:flex; width: 14px; height: 14px">${iconSvg('arrow-up-right', 14)}</span>
    </button>
  `;
}

function tryEvalMathSnippet(text: string): string | null {
  if (!text || text.length > 150) return null;
  const lines = text.trim().split('\n');
  const lastLine = lines[lines.length - 1].trim();
  if (!lastLine) return null;
  const cleanExpr = lastLine.replace(/,/g, '');
  if (/^[\d\s+\-*/%().]+$/.test(cleanExpr) && /[+\-*/%]/.test(cleanExpr)) {
    try {
      const val = Function(`"use strict"; return (${cleanExpr});`)();
      if (typeof val === 'number' && Number.isFinite(val)) {
        const formatted = Number.isInteger(val) ? val.toLocaleString() : parseFloat(val.toFixed(4)).toLocaleString();
        return `${lastLine} = ${formatted}`;
      }
    } catch {
      return null;
    }
  }
  return null;
}

function renderScratchpadCardInner(state: FlankState): string {
  const sp = state.scratchpad || { activeNoteId: 'note-1', notes: [{ id: 'note-1', title: 'Note 1', content: '', updatedAt: 'Now' }] };
  const notes = sp.notes.length > 0 ? sp.notes : [{ id: 'note-1', title: 'Note 1', content: '', updatedAt: 'Now' }];
  const active = notes.find((n) => n.id === sp.activeNoteId) || notes[0];
  const mathHint = tryEvalMathSnippet(active.content);
  const charCount = active.content.length;
  const wordCount = active.content.trim() ? active.content.trim().split(/\s+/).length : 0;

  const tabChips = notes
    .map(
      (n, idx) =>
        `<button type="button" class="flank-chip${n.id === active.id ? ' is-active' : ''}" style="height: 24px; padding: 0 8px; font-size: 11px;" data-scratch-select="${escapeHtml(n.id)}">${escapeHtml(n.title || `Note ${idx + 1}`)}</button>`
    )
    .join('');

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Quick Scratchpad</span>
      <span class="flank-card__chip" style="font-size: 11px; color: var(--flank-color-text-muted);">${wordCount}w · ${charCount}c</span>
    </div>
    <div style="display:flex; gap: 6px; flex-wrap: wrap; width: 100%;">
      ${tabChips}
      <button type="button" class="flank-chip" style="height: 24px; padding: 0 8px; font-size: 11px;" data-action="scratch-new-note" title="New note tab">+ New</button>
    </div>
    <textarea id="flank-scratchpad-textarea" class="flank-input" rows="4" style="width: 100%; height: 86px; resize: none; border-radius: 8px; padding: 8px; font-family: var(--flank-type-mono); font-size: 12px; line-height: 1.45; box-sizing: border-box;" placeholder="Jot down notes, snippets, or math (e.g. 1450 * 12)...">${escapeHtml(active.content)}</textarea>
    ${
      mathHint
        ? `<div class="flank-row" style="padding: 4px 8px; border-radius: 6px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft);">
            <span class="tabular-nums" style="font-family: var(--flank-type-mono); font-size: 12px; font-weight: 600; color: var(--flank-color-accent)">${escapeHtml(mathHint)}</span>
            <button type="button" class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 10px;" data-copy-raw="${escapeHtml(mathHint.split('=')[1]?.trim() || '')}">Copy</button>
          </div>`
        : ''
    }
    <div class="flank-actions">
      <button type="button" class="flank-btn is-primary" style="flex: 1; justify-content: center;" data-action="scratch-copy">
        <span>Copy note</span>
      </button>
      <button type="button" class="flank-btn is-secondary" style="flex: 0 0 auto; padding: 0 12px;" data-action="scratch-clear">
        <span>Clear</span>
      </button>
      ${
        notes.length > 1
          ? `<button type="button" class="flank-btn is-ghost" style="flex: 0 0 auto; width: 32px; padding: 0;" data-scratch-delete="${escapeHtml(active.id)}" aria-label="Delete note tab" title="Delete note tab">${iconSvg('trash', 14)}</button>`
          : ''
      }
    </div>
  `;
}

function renderColorPickerCardInner(state: FlankState): string {
  const cp = state.colorpicker || {
    currentHex: '#2F4BFF',
    rgbText: 'rgb(47, 75, 255)',
    hslText: 'hsl(232, 100%, 59%)',
    cssVarText: '--color-accent: #2F4BFF;',
    contrastWhite: 5.56,
    contrastDark: 3.41,
    history: ['#2F4BFF', '#0369A1', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'],
  };

  const wPass = cp.contrastWhite >= 7 ? 'AAA' : cp.contrastWhite >= 4.5 ? 'AA' : 'Low';
  const dPass = cp.contrastDark >= 7 ? 'AAA' : cp.contrastDark >= 4.5 ? 'AA' : 'Low';

  const swatches = (cp.history || [])
    .slice(0, 6)
    .map(
      (hex) =>
        `<button type="button" class="flank-swatch${hex.toUpperCase() === cp.currentHex.toUpperCase() ? ' is-selected' : ''}" style="width: 24px; height: 24px; border-radius: 6px; background: ${escapeHtml(hex)}; border: 1px solid var(--flank-color-divider); cursor: pointer;" data-color-select="${escapeHtml(hex)}" aria-label="Select ${escapeHtml(hex)}" title="${escapeHtml(hex)}"></button>`
    )
    .join('');

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Color Picker</span>
      <button type="button" class="flank-chip is-active" style="height: 24px; padding: 0 8px; font-size: 11px;" data-action="pick-screen-color">
        <span style="display:inline-flex; width: 12px; height: 12px; margin-right: 4px;">${iconSvg('eyedropper', 12)}</span>
        Pick screen
      </button>
    </div>
    <div style="display:flex; align-items:center; gap: 10px; width: 100%;">
      <label style="width: 36px; height: 36px; border-radius: 8px; background: ${escapeHtml(cp.currentHex)}; border: 1px solid var(--flank-color-divider); cursor: pointer; flex-shrink: 0; display:flex; align-items:center; justify-content:center" title="Click to open color palette">
        <input type="color" id="flank-native-color-input" value="${escapeHtml(cp.currentHex)}" style="opacity:0; width:1px; height:1px; position:absolute" />
      </label>
      <div class="flank-row" style="flex: 1; min-width: 0;">
        <span class="tabular-nums" style="font-family: var(--flank-type-mono); font-size: 14px; font-weight: 700; color: var(--flank-color-text);">${escapeHtml(cp.currentHex)}</span>
        <button type="button" class="flank-chip" style="height: 24px; padding: 0 8px; font-size: 11px;" data-copy-raw="${escapeHtml(cp.currentHex)}">Copy HEX</button>
      </div>
    </div>
    <div style="display:flex; flex-direction:column; gap: 6px; border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding-top: 8px;">
      <div class="flank-row">
        <span class="tabular-nums" style="font-family: var(--flank-type-mono); font-size: 11px; color: var(--flank-color-text-muted);">${escapeHtml(cp.rgbText)}</span>
        <button type="button" class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;" data-copy-raw="${escapeHtml(cp.rgbText)}">Copy RGB</button>
      </div>
      <div class="flank-row">
        <span class="tabular-nums" style="font-family: var(--flank-type-mono); font-size: 11px; color: var(--flank-color-text-muted);">${escapeHtml(cp.hslText)}</span>
        <button type="button" class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;" data-copy-raw="${escapeHtml(cp.hslText)}">Copy HSL</button>
      </div>
      <div style="display:flex; flex-direction:column; gap: 2px; font-size: 11px; color: var(--flank-color-text-muted); padding-top: 4px;">
        <span class="tabular-nums">Against White: ${cp.contrastWhite.toFixed(1)}:1 (${wPass})</span>
        <span class="tabular-nums">Against Dark: ${cp.contrastDark.toFixed(1)}:1 (${dPass})</span>
      </div>
    </div>
    <div style="display:flex; align-items:center; justify-content:space-between; gap: 6px; padding-top: 4px;">
      ${swatches}
    </div>
  `;
}

function renderCalendarSkeleton(): string {
  return `
    <div class="flank-card-row-between" style="margin-bottom: 8px">
      <div class="flank-skeleton" style="width: 100px; height: 16px;"></div>
      <div class="flank-skeleton" style="width: 48px; height: 14px;"></div>
    </div>
    <div style="display:flex; flex-direction:column; gap:8px; margin-top:8px">
      ${Array.from({ length: 3 }).map(() => `
        <div style="display:flex; align-items:center; gap:8px; height:28px">
          <div class="flank-skeleton" style="width: 48px; height: 14px;"></div>
          <div class="flank-skeleton" style="flex:1; height: 14px;"></div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderCalendarCardInner(state: FlankState): string {
  if (!state.calendar) {
    return renderCalendarSkeleton();
  }
  const cal = state.calendar || { nextSummary: 'Today', todayDateText: 'Today', events: [] };
  const events = cal.events || [];
  const nextEvt = events[0];

  const eventRows = events.length > 0
    ? events.map((evt) => {
        return `<div class="flank-cal-row" style="display:flex; align-items:center; min-height: 32px; gap: 8px; padding: 4px 0; border-bottom: var(--flank-scale-hairline) solid var(--flank-color-divider-soft);">
          <span class="flank-cal-time tabular-nums" style="width: 64px; min-width: 64px; flex-shrink: 0; font-size: 11px; font-weight: 500; color: var(--flank-color-text-muted); font-variant-numeric: tabular-nums;">${escapeHtml(evt.timeText)}</span>
          <span class="flank-cal-content" style="flex: 1; min-width: 0; display:flex; flex-direction:column; justify-content:center;">
            <span class="flank-cal-title" style="font-size: 12px; font-weight: 600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml(evt.title)}">${escapeHtml(evt.title)}</span>
            <span class="flank-row-meta" style="font-size: 11px; color: var(--flank-color-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(evt.relativeText)}${evt.provider ? ` · ${escapeHtml(evt.provider)}` : ''}</span>
          </span>
          <span style="flex-shrink: 0; display:flex; align-items:center; gap: 4px;">
            ${
              evt.joinUrl
                ? `<button type="button" class="flank-chip is-active" style="padding: 2px 8px; height: 22px; font-size: 11px; font-weight: 600;" data-item-kind="link" data-item-id="${escapeHtml(evt.id)}" data-target="${escapeHtml(evt.joinUrl)}">Join</button>`
                : ''
            }
            <button type="button" class="flank-win-btn" style="width: 20px; height: 20px; display:flex; align-items:center; justify-content:center;" data-cal-delete="${escapeHtml(evt.id)}" aria-label="Remove event" title="Remove event">${iconSvg('x', 11)}</button>
          </span>
        </div>`;
      }).join('')
    : renderEmptyState('No upcoming meetings', 'Your schedule is clear for today');

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Agenda</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${escapeHtml(cal.nextSummary)}
      </span>
    </div>
    ${
      nextEvt
        ? `<div class="flank-subcard" style="padding: 10px 12px; border-radius: 10px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; flex-direction:column; gap: 6px;">
            <span class="flank-card-muted" style="font-size: 11px;">Up next · ${escapeHtml(nextEvt.timeText)} (${escapeHtml(nextEvt.relativeText)})</span>
            <span style="font-size: 13px; font-weight: 600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml(nextEvt.title)}">${escapeHtml(nextEvt.title)}</span>
            ${
              nextEvt.joinUrl
                ? `<button type="button" class="flank-btn is-primary" style="width: 100%; justify-content:center; margin-top: 4px;" data-item-kind="link" data-item-id="${escapeHtml(nextEvt.id)}" data-target="${escapeHtml(nextEvt.joinUrl)}">
                    <span>Join ${escapeHtml(nextEvt.provider || 'Meeting')}</span>
                    <span style="display:flex; width: 14px; height: 14px">${iconSvg('arrow-up-right', 14)}</span>
                  </button>`
                : ''
            }
          </div>`
        : ''
    }
    <div style="display:flex; flex-direction:column; max-height: 130px; overflow-y: auto;">
      ${eventRows}
    </div>
    <div style="display:flex; flex-direction:column; gap: 6px; border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding-top: 8px;">
      <input type="text" id="flank-cal-title-input" class="flank-input" placeholder="Event title..." />
      <div style="display:flex; gap: 8px;">
        <input type="text" id="flank-cal-time-input" class="flank-input" style="flex: 1;" placeholder="4:00 PM" />
        <button type="button" class="flank-btn is-primary" style="flex: 0 0 auto; padding: 0 14px;" data-action="cal-add-event">+ Add</button>
      </div>
    </div>
  `;
}

function renderAudioCardInner(state: FlankState): string {
  const au = state.audio || {
    volumePercent: 68,
    muted: false,
    micMuted: false,
    outputDevice: 'System Speakers',
    inputDevice: 'Default Microphone',
  };
  const presets = [0, 25, 50, 75, 100];
  const presetChips = presets
    .map(
      (v) =>
        `<button type="button" class="flank-chip${!au.muted && Math.abs(au.volumePercent - v) <= 5 ? ' is-active' : ''}" style="justify-content: center; height: 26px; padding: 0 2px; font-size: 11px; min-width: 0;" data-audio-set="${v}">${v}%</button>`
    )
    .join('');

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Audio &amp; Mic Mixer</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${au.muted ? 'Muted' : 'Active'}
      </span>
    </div>
    <div class="flank-hero" style="margin: 4px 0 8px;">
      <span class="flank-hero__value tabular-nums" style="font-family: var(--flank-font-stack); font-variant-numeric: tabular-nums;">${au.muted ? 'Mute' : `${au.volumePercent}%`}</span>
      <div class="flank-hero__secondary">
        <div style="font-size: 13px; font-weight: 500; color: var(--flank-color-text);">Master output</div>
        <div style="font-size: 11px; color: var(--flank-color-text-muted); max-width: 150px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(au.outputDevice)}</div>
      </div>
    </div>
    <div class="flank-meter__bar" style="height: 6px; margin-bottom: 8px;"><div class="flank-meter__fill" style="width: ${au.muted ? 0 : Math.max(0, Math.min(100, au.volumePercent))}%"></div></div>
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; width: 100%;">
      ${presetChips}
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1.4fr 1fr; gap: 6px; width: 100%;">
      <button type="button" class="flank-btn is-secondary is-compact" style="justify-content: center; height: 32px; font-size: 11px; padding: 0 4px;" data-audio-action="vol-down">-10%</button>
      <button type="button" class="flank-btn is-compact ${au.muted ? 'is-secondary' : 'is-primary'}" style="justify-content: center; height: 32px; font-size: 11px; padding: 0 6px; gap: 4px;" data-audio-action="toggle-mute">
        <span style="display: flex; align-items: center; width: 14px; height: 14px; flex-shrink: 0;">${iconSvg(au.muted ? 'volume-mute' : 'volume', 14)}</span>
        <span>${au.muted ? 'Unmute' : 'Mute'}</span>
      </button>
      <button type="button" class="flank-btn is-secondary is-compact" style="justify-content: center; height: 32px; font-size: 11px; padding: 0 4px;" data-audio-action="vol-up">+10%</button>
    </div>
    <div class="flank-row" style="border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding-top: 8px;">
      <span style="display:flex; align-items:center; gap: 6px; min-width: 0; flex: 1;">
        <span style="display:flex; width: 14px; height: 14px; color: var(--flank-color-text-muted); flex-shrink: 0;">${iconSvg(au.micMuted ? 'mic-off' : 'mic', 14)}</span>
        <span style="font-size: 12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(au.inputDevice)}</span>
      </span>
      <button type="button" class="flank-chip${au.micMuted ? '' : ' is-active'}" style="height: 24px; padding: 0 8px; font-size: 11px; flex-shrink: 0;" data-audio-action="toggle-mic">
        ${au.micMuted ? 'Mic Muted' : 'Mic Live'}
      </button>
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center; height: 32px; gap: 6px;" data-item-kind="link" data-item-id="win-sound-mixer" data-target="ms-settings:apps-volume">
      <span>Volume mixer</span>
      <span style="display:flex; width: 14px; height: 14px; flex-shrink: 0;">${iconSvg('arrow-up-right', 14)}</span>
    </button>
  `;
}

function renderNetworkCardInner(state: FlankState): string {
  const net = state.network || {
    connected: true,
    ssid: 'Connected',
    localIp: '127.0.0.1',
    pingMs: 14,
    downMbps: 12.5,
    upMbps: 4.1,
    ports: [],
  };

  const portRows = (net.ports || [])
    .slice(0, 4)
    .map(
      (p) => `<div class="flank-row" style="padding: 4px 0; border-bottom: var(--flank-scale-hairline) solid var(--flank-color-divider-soft);">
        <span style="display:flex; align-items:center; gap: 6px; min-width: 0; flex: 1;">
          <span class="tabular-nums" style="font-family: var(--flank-type-mono); font-weight: 700; font-size: 12px; color: var(--flank-color-accent)">:${p.port}</span>
          <span style="font-size: 11px; color: var(--flank-color-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(p.processName)} (PID ${p.pid})</span>
        </span>
        <span style="display:flex; align-items:center; gap: 4px; flex-shrink: 0;">
          <button type="button" class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;" data-item-kind="link" data-item-id="port-${p.port}" data-target="${escapeHtml(p.url)}" title="Open ${escapeHtml(p.url)}">Open</button>
          <button type="button" class="flank-win-btn" style="width: 20px; height: 20px;" data-kill-pid="${p.pid}" title="Stop process PID ${p.pid}">${iconSvg('x', 11)}</button>
        </span>
      </div>`
    )
    .join('');

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Network &amp; Ports</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${escapeHtml(net.ssid)}
      </span>
    </div>
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px;">
      <div style="padding: 8px 10px; border-radius: 8px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; flex-direction:column; gap: 2px;">
        <span style="font-size: 11px; color: var(--flank-color-text-muted);">Ping latency</span>
        <span class="tabular-nums" style="font-size: 13px; font-weight: 600; font-family: var(--flank-font-stack);">${net.pingMs} ms</span>
      </div>
      <div style="padding: 8px 10px; border-radius: 8px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; flex-direction:column; gap: 2px;">
        <span style="font-size: 11px; color: var(--flank-color-text-muted);">Local IPv4</span>
        <button type="button" class="tabular-nums" style="font-size: 12px; background:none; border:none; padding:0; text-align:left; font-family: var(--flank-type-mono); color: var(--flank-color-text); cursor: pointer;" data-copy-raw="${escapeHtml(net.localIp)}" title="Click to copy IP">${escapeHtml(net.localIp)}</button>
      </div>
    </div>
    <div style="display:flex; flex-direction:column; gap: 4px; border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding-top: 8px;">
      <div class="flank-row" style="min-height: 24px;">
        <span style="font-size: 11px; font-weight: 600; color: var(--flank-color-text-muted); text-transform: uppercase;">Listening dev ports</span>
        <button type="button" class="flank-chip" style="height: 20px; padding: 0 6px; font-size: 10px;" data-action="net-refresh">Refresh</button>
      </div>
      <div style="display:flex; flex-direction:column; max-height: 120px; overflow-y: auto;">
        ${portRows || `<span style="font-size: 11px; color: var(--flank-color-text-muted);">No active dev servers on common ports.</span>`}
      </div>
    </div>
  `;
}

function renderAiCardInner(state: FlankState): string {
  const ai = state.ai || {
    totalPercent: 37,
    planName: 'Google AI Pro Plan',
    connected: true,
    resetText: 'Resets in 23 days',
    categories: [
      { label: 'Gemini 2.0 Flash', percent: 42 },
      { label: 'Gemini 1.5 Pro', percent: 28 },
      { label: 'Coding Agents & Tools', percent: 19 },
    ],
  };
  const clamped = Math.max(0, Math.min(100, ai.totalPercent));
  const circumference = 213.6;
  const dash = ((clamped / 100) * circumference).toFixed(1);

  const catRows = (ai.categories || [])
    .map(
      (c) => `<div class="flank-meter">
        <div class="flank-meter__header">
          <span class="flank-meter__header-label">${escapeHtml(c.label)}</span>
          <span class="flank-meter__header-val">${c.percent}%</span>
        </div>
        <div class="flank-meter__bar"><div class="flank-meter__fill" style="width: ${c.percent}%"></div></div>
      </div>`
    )
    .join('');

  return `
    <div class="flank-card__header">
      <div style="display:flex; align-items:center; gap: 8px; min-width: 0;">
        <span class="flank-card__title">AI Usage</span>
        <span class="flank-live-dot" style="background: ${ai.connected !== false ? '#10B981' : '#F59E0B'}; flex-shrink: 0;"></span>
      </div>
      <span class="flank-chip" style="height: 22px; padding: 0 10px; font-size: 11px; flex-shrink: 0; white-space: nowrap;">
        ${escapeHtml(ai.planName || 'Google AI Pro')}
      </span>
    </div>
    <div style="display:flex; align-items:center; gap: 14px; padding: 4px 0;">
      <svg viewBox="0 0 88 88" fill="none" role="img" aria-label="${clamped} percent of usage limit used" style="width: 64px; height: 64px; flex-shrink: 0;">
        <circle cx="44" cy="44" r="34" stroke="var(--flank-color-track-bg)" stroke-width="7"/>
        <circle cx="44" cy="44" r="34" stroke="var(--flank-color-accent)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${dash} 213.6" transform="rotate(-90 44 44)"/>
        <text x="44" y="49" text-anchor="middle" font-size="17" font-weight="700" fill="currentColor">${clamped}%</text>
      </svg>
      <div style="display:flex; flex-direction:column; gap: 2px; min-width: 0;">
        <span style="font-size: 13px; font-weight: 600; color: var(--flank-color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Model Consumption</span>
        <span style="font-size: 11px; color: var(--flank-color-text-muted);">${escapeHtml(ai.resetText || 'Monthly quota')}</span>
      </div>
    </div>
    <div style="display:flex; flex-direction:column; gap: 6px;">
      ${catRows}
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center; height: 30px; font-size: 11px; margin-top: 4px; gap: 6px;" data-action="open-settings" data-settings-tab="widgets">
      <span>Connect / Adjust AI Plan</span>
      <span style="display:flex; width: 12px; height: 12px; flex-shrink: 0;">${iconSvg('arrow-up-right', 12)}</span>
    </button>
  `;
}

function renderClipboardCardInner(state: FlankState): string {
  const recent = state.clipboard.items.slice(0, 3);
  const rows = recent
    .map(
      (item) => `<button type="button" class="flank-list-row" style="height: 44px; padding: 0 8px; border-radius: 8px; border: 1px solid var(--flank-color-divider-soft);" data-copy-id="${escapeHtml(item.id)}">
        <span class="flank-row-chip" style="width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0;">${iconSvg(item.kind === 'link' ? 'link' : item.kind === 'code' ? 'code' : item.kind === 'file' ? 'file' : 'text', 14)}</span>
        <span class="flank-row-text" style="min-width: 0; flex: 1;">
          <span class="flank-row-title" style="font-size: 12px;">${escapeHtml(item.title)}</span>
          <span class="flank-row-meta" style="font-size: 10px;">${escapeHtml(item.relativeTime)}</span>
        </span>
      </button>`
    )
    .join('');

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Clipboard</span>
      <span class="flank-card__chip" style="font-size: 11px; color: var(--flank-color-text-muted);">${state.clipboard.count} saved</span>
    </div>
    <div style="display:flex; flex-direction:column; gap: 6px; width: 100%;">
      ${rows || renderEmptyState('No clipboard history', 'Copy text, links, or files to view them here')}
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center;" data-action="open-clipboard-window">
      <span>Open clipboard history</span>
      <span style="display:flex; width: 14px; height: 14px">${iconSvg('arrow-up-right', 14)}</span>
    </button>
  `;
}

function renderWidgetsGridCardInner(state: FlankState): string {
  const enabledWidgets = state.items.filter(
    (i) => i.enabled && (i.group === 'widgets' || (!i.group && i.kind === 'widget'))
  );
  const widgetTiles = enabledWidgets
    .map((item) => {
      const wKind = (item.widgetKind || (item as unknown as { widget?: WidgetKind }).widget) as WidgetKind | undefined;
      if (!wKind) return '';
      return `
        <button type="button" class="flank-widget-grid-item" data-widget="${escapeHtml(wKind)}" aria-label="${escapeHtml(item.label)}">
          <span class="flank-widget-grid-icon">${iconSvg(item.icon, 18)}</span>
          <span class="flank-widget-grid-label">${escapeHtml(item.label)}</span>
        </button>
      `;
    })
    .join('');

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Active widgets (${enabledWidgets.length})</span>
      <button type="button" class="flank-chip" style="height: 24px; padding: 0 8px; font-size: 11px;" data-action="toggle-widgets-collapse">Expand dock</button>
    </div>
    <div class="flank-widgets-grid">
      ${widgetTiles}
    </div>
  `;
}

function renderActivityCardInner(state: FlankState): string {
  const act = state.activity || {
    runningCount: 0,
    waitingCount: 0,
    activeSessions: [],
  };
  const sessions = act.activeSessions || [];
  const total = sessions.length;

  const sessionRows = sessions.map((s) => {
    const statusColor = s.status === 'running' ? '#10B981' : s.status === 'waiting' ? '#F59E0B' : '#64748B';
    const statusLabel = s.status === 'running' ? 'Active' : s.status === 'waiting' ? 'Waiting' : 'Idle';
    return `
      <div class="flank-subcard" style="padding: 10px 12px; border-radius: 10px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; flex-direction:column; gap: 6px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap: 6px; min-width: 0;">
            <span style="display:flex; width: 14px; height: 14px; color: var(--flank-color-accent); flex-shrink: 0;">${iconSvg('activity', 14)}</span>
            <span style="font-size: 13px; font-weight: 600; color: var(--flank-color-text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(s.agentName)}</span>
          </div>
          <span class="flank-chip" style="height: 20px; padding: 0 6px; font-size: 10px; display:flex; align-items:center; gap: 4px;">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: ${statusColor};"></span>
            ${statusLabel}
          </span>
        </div>
        <div style="font-size: 11px; color: var(--flank-color-text-muted); display:flex; justify-content:space-between; align-items:center;">
          <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width: 170px;" title="${escapeHtml(s.projectPath || s.projectName)}">${escapeHtml(s.projectName || 'Active Task')}</span>
          <span class="tabular-nums">${s.memoryMb ? `${Math.round(s.memoryMb)} MB` : `PID ${s.pid}`}</span>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="flank-card__header">
      <div style="display:flex; align-items:center; gap: 8px;">
        <span class="flank-card__title">AI Agent Activity</span>
        <span class="flank-live-pill">
          <span class="flank-live-dot"></span>
          ${total} ${total === 1 ? 'task' : 'tasks'}
        </span>
      </div>
    </div>
    ${total === 0 ? renderEmptyState('No AI agent tasks active', 'Coding agents & CLI tasks will appear here') : `
      <div style="display:flex; flex-direction:column; gap: 8px;">
        ${sessionRows}
      </div>
    `}
  `;
}

function renderBluetoothCardInner(state: FlankState): string {
  const bt = state.bluetooth || {
    connectedCount: 0,
    devices: [],
  };
  const devices = bt.devices || [];

  const deviceRows = devices.map((d) => {
    const iconName = d.type === 'headphones' ? 'headphones' : d.type === 'mouse' ? 'mouse' : d.type === 'keyboard' ? 'keyboard' : 'bluetooth';
    const isConn = d.connected;
    const statusPill = isConn
      ? `<span class="flank-chip is-active" style="height: 20px; padding: 0 6px; font-size: 10px;">Connected</span>`
      : `<span class="flank-chip" style="height: 20px; padding: 0 6px; font-size: 10px; opacity: 0.65;">Paired</span>`;
    const batMeter = d.batteryLevel !== undefined && d.batteryLevel !== null && d.batteryLevel >= 0
      ? `<div style="display:flex; align-items:center; gap: 4px; font-size: 11px; color: var(--flank-color-text-muted);">
          <span class="tabular-nums">${d.batteryLevel}%</span>
        </div>`
      : '';

    return `
      <div class="flank-row" style="padding: 6px 8px; border-radius: 8px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap: 8px; min-width: 0; flex: 1;">
          <span style="display:flex; width: 16px; height: 16px; color: var(--flank-color-text-muted); flex-shrink: 0;">${iconSvg(iconName, 16)}</span>
          <div style="display:flex; flex-direction:column; min-width: 0;">
            <span style="font-size: 12px; font-weight: 500; color: var(--flank-color-text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml(d.name)}">${escapeHtml(d.name)}</span>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap: 6px; flex-shrink: 0;">
          ${batMeter}
          ${statusPill}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Bluetooth &amp; Peripherals</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${bt.connectedCount} connected
      </span>
    </div>
    <div style="display:flex; flex-direction:column; gap: 6px;">
      ${deviceRows.length > 0 ? deviceRows : renderEmptyState('No Bluetooth peripherals found', 'Pair devices in Windows Bluetooth settings')}
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center; height: 32px; gap: 6px;" data-item-kind="link" data-item-id="win-bluetooth-settings" data-target="ms-settings:bluetooth">
      <span>Windows Bluetooth settings</span>
      <span style="display:flex; width: 14px; height: 14px; flex-shrink: 0;">${iconSvg('arrow-up-right', 14)}</span>
    </button>
  `;
}

export function renderHoverCardHtml(state: FlankState, theme: FlankTheme): string {
  const active = state.activeWidget;
  if (!active || state.activeFullWindow) return '';

  let inner = '';
  let label = '';
  switch (active) {
    case 'widgets':
      label = 'Active widgets';
      inner = renderWidgetsGridCardInner(state);
      break;
    case 'weather':
      label = 'Weather';
      inner = renderWeatherCardInner(state);
      break;
    case 'stats':
      label = 'System stats';
      inner = renderStatsCardInner(state, theme);
      break;
    case 'battery':
      label = 'Battery and power';
      inner = renderBatteryCardInner(state);
      break;
    case 'player':
      label = 'Mini player';
      inner = renderPlayerCardInner(state);
      break;
    case 'focus':
      label = 'Focus timer';
      inner = renderFocusCardInner(state);
      break;
    case 'clock':
      label = 'World clock';
      inner = renderClockCardInner(state);
      break;
    case 'scratchpad':
      label = 'Quick scratchpad';
      inner = renderScratchpadCardInner(state);
      break;
    case 'colorpicker':
      label = 'Color picker';
      inner = renderColorPickerCardInner(state);
      break;
    case 'calendar':
      label = 'Agenda and meetings';
      inner = renderCalendarCardInner(state);
      break;
    case 'audio':
      label = 'Audio and mic mixer';
      inner = renderAudioCardInner(state);
      break;
    case 'network':
      label = 'Network and dev ports';
      inner = renderNetworkCardInner(state);
      break;
    case 'ai':
      label = 'AI usage';
      inner = renderAiCardInner(state);
      break;
    case 'clipboard':
      label = 'Clipboard history';
      inner = renderClipboardCardInner(state);
      break;
    case 'activity':
      label = 'AI Agent Activity';
      inner = renderActivityCardInner(state);
      break;
    case 'bluetooth':
      label = 'Bluetooth & Peripherals';
      inner = renderBluetoothCardInner(state);
      break;
  }

  if (!inner) {
    inner = `
      <div class="flank-card-empty-state" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:var(--flank-scale-space-16) 0; gap:var(--flank-scale-space-8); text-align:center;">
        <img src="brand/flank-mascot.svg" alt="" width="56" height="56" style="opacity:0.65;" draggable="false" />
        <span style="font-size:var(--flank-scale-font-caption); color:var(--flank-color-text-muted);">No activity to display</span>
      </div>
    `;
  }

  return `<section class="flank-card" id="flank-hover-card" aria-label="${escapeHtml(label)}">
    <div class="flank-glass-backdrop" aria-hidden="true"></div>
    <div class="flank-glass-sheen" aria-hidden="true"></div>
    <div class="flank-glass-rim" aria-hidden="true"></div>
    <div class="flank-caret" id="flank-card-caret" aria-hidden="true"></div>
    <div class="flank-card-content" id="flank-card-content">
      ${inner}
    </div>
  </section>`;
}

