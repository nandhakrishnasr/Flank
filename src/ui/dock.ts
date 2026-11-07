import { type FlankTheme } from '../theme/schema.ts';
import { type DockItem, type FlankState, type WidgetKind } from '../providers/types.ts';
import { iconSvg, flankGlyphSvg } from './icons.ts';

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDuration(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const rem = s % 60;
  if (h > 0) {
    return `${h}:${m < 10 ? '0' : ''}${m}:${rem < 10 ? '0' : ''}${rem}`;
  }
  return `${m}:${rem < 10 ? '0' : ''}${rem}`;
}

function renderAiRingSvg(percent: number, compact: boolean): string {
  const clamped = Math.max(0, Math.min(100, percent));
  const circumference = 62.83;
  const dash = ((clamped / 100) * circumference).toFixed(1);
  if (compact) {
    return `<svg viewBox="0 0 28 28" fill="none" aria-hidden="true" style="width: var(--flank-scale-icon-20); height: var(--flank-scale-icon-20)">
      <circle cx="14" cy="14" r="10" stroke="var(--flank-color-track-bg)" stroke-width="3"/>
      <circle cx="14" cy="14" r="10" stroke="var(--flank-color-accent)" stroke-width="3" stroke-linecap="round" stroke-dasharray="${dash} 62.8" transform="rotate(-90 14 14)"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 28 28" fill="none" aria-hidden="true" style="width: var(--flank-scale-ring-tile); height: var(--flank-scale-ring-tile)">
    <circle cx="14" cy="14" r="10" stroke="var(--flank-color-track-bg)" stroke-width="3"/>
    <circle cx="14" cy="14" r="10" stroke="var(--flank-color-accent)" stroke-width="3" stroke-linecap="round" stroke-dasharray="${dash} 62.8" transform="rotate(-90 14 14)"/>
    <text x="14" y="17.2" text-anchor="middle" font-size="8.5" font-weight="700" fill="currentColor">${Math.round(clamped)}</text>
  </svg>`;
}

function renderBadge(count: number): string {
  if (count <= 0) return '';
  const text = count > 9 ? '9+' : String(count);
  return `<span class="flank-badge" aria-hidden="true">${text}</span>`;
}

function truncateValue(val: string, maxLen = 5): string {
  if (!val) return '';
  return val.length > maxLen ? val.slice(0, maxLen) : val;
}

/**
 * 8 curated muted palette hues for letter badges (Step 3).
 * WCAG AA compliant with white text.
 */
export const LETTER_BADGE_PALETTE = [
  '#475569', // Slate
  '#4F46E5', // Indigo
  '#0891B2', // Cyan
  '#059669', // Emerald
  '#D97706', // Amber
  '#E11D48', // Rose
  '#7C3AED', // Violet
  '#2563EB', // Blue
];

export function getLetterBadgeProps(label: string): { letter: string; bg: string; color: string } {
  const clean = (label || '?').trim();
  const letter = (clean.charAt(0) || '?').toUpperCase();
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % LETTER_BADGE_PALETTE.length;
  return { letter, bg: LETTER_BADGE_PALETTE[idx], color: '#ffffff' };
}

export function renderItemIcon(item: DockItem, sizePx?: number): string {
  const isAppOrLink = item.group === 'apps' || item.kind === 'app' || item.kind === 'link' || item.id.startsWith('custom-');

  if (!isAppOrLink) {
    // Built-in widgets and system items: mono line icon, 20px optical size, NO plate
    return iconSvg(item.icon, sizePx || 20);
  }

  // Apps and website shortcuts: full-colour icons on 32px plate (radius 8)
  if (item.iconUri) {
    return `<div class="flank-icon-plate"><img src="${escapeHtml(item.iconUri)}" alt="" class="flank-plate-icon" draggable="false" /></div>`;
  }

  // Fallback: Letter badge on identical 32px plate
  const badge = getLetterBadgeProps(item.label || item.id);
  return `<div class="flank-icon-plate flank-letter-badge" style="background: ${badge.bg}; color: ${badge.color};"><span>${escapeHtml(badge.letter)}</span></div>`;
}

function renderWidgetTileInner(
  kind: WidgetKind,
  state: FlankState,
  theme: FlankTheme,
  item: DockItem,
  isActive: boolean
): { html: string; ariaLabel: string; extraClass: string } {
  const style = theme.layout.widgetStyle;
  const railIndicator =
    theme.layout.shape === 'rail' && isActive ? `<span class="flank-rail-indicator" aria-hidden="true"></span>` : '';

  if (style === 'row') {
    // Terminal row style
    switch (kind) {
      case 'clipboard':
        return {
          ariaLabel: `Clipboard history, ${state.clipboard.count} items`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">clip</span><span>history</span></span><span class="flank-row-right is-accent">${state.clipboard.count}</span>`,
        };
      case 'weather':
        return {
          ariaLabel: `Weather, ${state.weather.city} ${state.weather.tempC} degrees`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">wthr</span><span>${escapeHtml(state.weather.city.toLowerCase())}</span></span><span class="flank-row-right">${state.weather.tempC}°</span>`,
        };
      case 'stats':
        return {
          ariaLabel: `System CPU ${state.stats.cpuPercent} percent`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">cpu</span><span>usage</span></span><span class="flank-row-right">${state.stats.cpuPercent}%</span>`,
        };
      case 'battery':
        return {
          ariaLabel: `Battery ${state.battery.percent} percent, ${state.battery.stateText}`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">bat</span><span>${state.battery.charging ? 'charging' : 'charge'}</span></span><span class="flank-row-right is-accent">${state.battery.percent}%</span>`,
        };
      case 'player':
        return {
          ariaLabel: `Mini player, ${state.player.title}`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">play</span><span>${escapeHtml(state.player.title.toLowerCase())}</span></span><span class="flank-row-right is-accent">${iconSvg('play', 12)} ${formatDuration(state.player.positionSec)}</span>`,
        };
      case 'focus':
        return {
          ariaLabel: `Focus timer, ${formatDuration(state.focus?.remainingSec ?? 1500)}`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">fcs</span><span>${state.focus?.mode || 'focus'}</span></span><span class="flank-row-right is-accent">${formatDuration(state.focus?.remainingSec ?? 1500)}</span>`,
        };
      case 'clock':
        return {
          ariaLabel: `World clock, ${state.clock?.localTimeText || '12:00 PM'}`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">clk</span><span>clock</span></span><span class="flank-row-right">${escapeHtml(state.clock?.localTimeText || '12:00 PM')}</span>`,
        };
      case 'scratchpad':
        return {
          ariaLabel: `Quick scratchpad, ${state.scratchpad?.notes?.length ?? 1} notes`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">pad</span><span>notes</span></span><span class="flank-row-right">${state.scratchpad?.notes?.length ?? 1}</span>`,
        };
      case 'colorpicker':
        return {
          ariaLabel: `Color picker, ${state.colorpicker?.currentHex || '#2F4BFF'}`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">clr</span><span>picker</span></span><span class="flank-row-right is-accent">${escapeHtml(state.colorpicker?.currentHex || '#2F4BFF')}</span>`,
        };
      case 'calendar':
        return {
          ariaLabel: `Agenda, ${state.calendar?.nextSummary || 'Today'}`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">cal</span><span>agenda</span></span><span class="flank-row-right">${escapeHtml(state.calendar?.nextSummary || 'Today')}</span>`,
        };
      case 'audio':
        return {
          ariaLabel: `Audio volume ${state.audio?.muted ? 'muted' : `${state.audio?.volumePercent ?? 68}%`}`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">vol</span><span>audio</span></span><span class="flank-row-right">${state.audio?.muted ? 'MUTE' : `${state.audio?.volumePercent ?? 68}%`}</span>`,
        };
      case 'network':
        return {
          ariaLabel: `Network ${state.network?.pingMs ?? 14}ms`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">net</span><span>ports</span></span><span class="flank-row-right">${state.network?.pingMs ?? 14}ms</span>`,
        };
      case 'ai':
        return {
          ariaLabel: `AI usage, ${state.ai.totalPercent} percent`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">ai</span><span>usage</span></span><span class="flank-row-right">${state.ai.totalPercent}%</span>`,
        };
      case 'activity':
        return {
          ariaLabel: `AI activity, ${state.activity?.activeCount ?? 0} active sessions`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">act</span><span>agents</span></span><span class="flank-row-right is-accent">${state.activity?.activeCount ?? 0}</span>`,
        };
      case 'bluetooth':
        return {
          ariaLabel: `Bluetooth, ${state.bluetooth?.connectedCount ?? 0} connected devices`,
          extraClass: '',
          html: `<span class="flank-row-left"><span class="flank-row-code">bt</span><span>devices</span></span><span class="flank-row-right is-accent">${state.bluetooth?.connectedCount ?? 0}</span>`,
        };
    }
  }

  if (style === 'value') {
    // Rail ultra-thin value style
    switch (kind) {
      case 'clipboard':
        return {
          ariaLabel: `Clipboard history, ${state.clipboard.count} items`,
          extraClass: '',
          html: `${iconSvg('clipboard')}<span class="flank-rail-dot" aria-hidden="true"></span>${railIndicator}`,
        };
      case 'weather':
        return {
          ariaLabel: `Weather, ${state.weather.tempC} degrees`,
          extraClass: '',
          html: `<span class="flank-tile-value">${state.weather.tempC}°</span>${railIndicator}`,
        };
      case 'stats':
        return {
          ariaLabel: `CPU ${state.stats.cpuPercent} percent`,
          extraClass: '',
          html: `<span class="flank-tile-value">${state.stats.cpuPercent}%</span>${railIndicator}`,
        };
      case 'battery':
        return {
          ariaLabel: `Battery ${state.battery.percent} percent`,
          extraClass: '',
          html: `<span class="flank-tile-value">${state.battery.percent}%</span>${railIndicator}`,
        };
      case 'player':
        return {
          ariaLabel: `Mini player, ${state.player.playing ? 'playing' : 'paused'}`,
          extraClass: state.player.playing ? 'flank-tile-accent-icon is-playing' : '',
          html: `${iconSvg('equalizer')}${railIndicator}`,
        };
      case 'focus':
        return {
          ariaLabel: `Focus timer, ${Math.ceil((state.focus?.remainingSec ?? 1500) / 60)}m`,
          extraClass: state.focus?.running ? 'flank-tile-accent-icon' : '',
          html: `<span class="flank-tile-value">${Math.ceil((state.focus?.remainingSec ?? 1500) / 60)}m</span>${railIndicator}`,
        };
      case 'clock':
        return {
          ariaLabel: `World clock, ${state.clock?.localTimeText || '12:00 PM'}`,
          extraClass: '',
          html: `${iconSvg('clock')}${railIndicator}`,
        };
      case 'scratchpad':
        return {
          ariaLabel: `Quick scratchpad`,
          extraClass: '',
          html: `${iconSvg('scratchpad')}${railIndicator}`,
        };
      case 'colorpicker':
        return {
          ariaLabel: `Color picker, ${state.colorpicker?.currentHex || '#2F4BFF'}`,
          extraClass: '',
          html: `${iconSvg('eyedropper')}${railIndicator}`,
        };
      case 'calendar':
        return {
          ariaLabel: `Agenda, ${state.calendar?.nextSummary || 'Today'}`,
          extraClass: '',
          html: `${iconSvg('calendar')}${railIndicator}`,
        };
      case 'audio':
        return {
          ariaLabel: `Audio ${state.audio?.muted ? 'muted' : `${state.audio?.volumePercent ?? 68}%`}`,
          extraClass: '',
          html: `<span class="flank-tile-value">${state.audio?.muted ? 'M' : `${state.audio?.volumePercent ?? 68}%`}</span>${railIndicator}`,
        };
      case 'network':
        return {
          ariaLabel: `Network ${state.network?.pingMs ?? 14}ms`,
          extraClass: '',
          html: `<span class="flank-tile-value">${state.network?.pingMs ?? 14}ms</span>${railIndicator}`,
        };
      case 'ai':
        return {
          ariaLabel: `AI usage, ${state.ai.totalPercent} percent`,
          extraClass: '',
          html: `${renderAiRingSvg(state.ai.totalPercent, true)}${railIndicator}`,
        };
      case 'activity':
        return {
          ariaLabel: `AI activity, ${state.activity?.activeCount ?? 0} active`,
          extraClass: '',
          html: `${iconSvg('activity')}${railIndicator}`,
        };
      case 'bluetooth':
        return {
          ariaLabel: `Bluetooth, ${state.bluetooth?.connectedCount ?? 0} devices`,
          extraClass: '',
          html: `${iconSvg('bluetooth')}${railIndicator}`,
        };
    }
  }

  if (style === 'pill') {
    // Aurora horizontal pill style
    switch (kind) {
      case 'clipboard':
        return {
          ariaLabel: `Clipboard history, ${state.clipboard.count} items`,
          extraClass: '',
          html: `${iconSvg('clipboard')}${state.clipboard.count > 0 ? `<span class="flank-badge">${state.clipboard.count}</span>` : ''}`,
        };
      case 'weather':
        return {
          ariaLabel: `Weather, ${state.weather.city} ${state.weather.tempC} degrees`,
          extraClass: 'is-widget-pill',
          html: `${iconSvg(state.weather.icon)}${state.weather.tempC}° ${escapeHtml(state.weather.city)}`,
        };
      case 'stats':
        return {
          ariaLabel: `CPU ${state.stats.cpuPercent} percent`,
          extraClass: '',
          html: renderAiRingSvg(state.stats.cpuPercent, false),
        };
      case 'battery':
        return {
          ariaLabel: `Battery ${state.battery.percent} percent`,
          extraClass: 'is-widget-pill',
          html: `${iconSvg(state.battery.charging ? 'battery-charging' : 'battery')}${state.battery.percent}%`,
        };
      case 'player':
        return {
          ariaLabel: `Now playing, ${state.player.title}`,
          extraClass: 'is-widget-pill',
          html: `<span class="flank-tile-accent-icon" style="display:flex">${iconSvg('equalizer')}</span>${escapeHtml(state.player.title)}`,
        };
      case 'focus':
        return {
          ariaLabel: `Focus timer, ${formatDuration(state.focus?.remainingSec ?? 1500)}`,
          extraClass: 'is-widget-pill',
          html: `${iconSvg('focus')}${formatDuration(state.focus?.remainingSec ?? 1500)}`,
        };
      case 'clock':
        return {
          ariaLabel: `World clock, ${state.clock?.localTimeText || '12:00 PM'}`,
          extraClass: 'is-widget-pill',
          html: `${iconSvg('clock')}${escapeHtml(state.clock?.localTimeText || '12:00 PM')}`,
        };
      case 'scratchpad':
        return {
          ariaLabel: `Quick scratchpad`,
          extraClass: 'is-widget-pill',
          html: `${iconSvg('scratchpad')}Notes (${state.scratchpad?.notes?.length ?? 1})`,
        };
      case 'colorpicker':
        return {
          ariaLabel: `Color picker, ${state.colorpicker?.currentHex || '#2F4BFF'}`,
          extraClass: 'is-widget-pill',
          html: `${iconSvg('eyedropper')}${escapeHtml(state.colorpicker?.currentHex || '#2F4BFF')}`,
        };
      case 'calendar':
        return {
          ariaLabel: `Agenda, ${state.calendar?.nextSummary || 'Today'}`,
          extraClass: 'is-widget-pill',
          html: `${iconSvg('calendar')}${escapeHtml(state.calendar?.nextSummary || 'Today')}`,
        };
      case 'audio':
        return {
          ariaLabel: `Audio ${state.audio?.muted ? 'muted' : `${state.audio?.volumePercent ?? 68}%`}`,
          extraClass: 'is-widget-pill',
          html: `${iconSvg(state.audio?.muted ? 'volume-mute' : 'volume')}${state.audio?.muted ? 'Muted' : `${state.audio?.volumePercent ?? 68}%`}`,
        };
      case 'network':
        return {
          ariaLabel: `Network ${state.network?.pingMs ?? 14}ms`,
          extraClass: 'is-widget-pill',
          html: `${iconSvg('wifi')}${state.network?.pingMs ?? 14}ms`,
        };
      case 'ai':
        return {
          ariaLabel: `AI usage, ${state.ai.totalPercent} percent`,
          extraClass: 'is-widget-pill',
          html: `${renderAiRingSvg(state.ai.totalPercent, true)}${state.ai.totalPercent}%`,
        };
      case 'activity':
        return {
          ariaLabel: `AI activity, ${state.activity?.activeCount ?? 0} active sessions`,
          extraClass: 'is-widget-pill',
          html: `${iconSvg('activity')}Agents (${state.activity?.activeCount ?? 0})`,
        };
      case 'bluetooth':
        return {
          ariaLabel: `Bluetooth, ${state.bluetooth?.connectedCount ?? 0} devices`,
          extraClass: 'is-widget-pill',
          html: `${iconSvg('bluetooth')}BT (${state.bluetooth?.connectedCount ?? 0})`,
        };
    }
  }

  // Default: "tile" style (Paper & Glass) - unified glanceable layout
  switch (kind) {
    case 'clipboard':
      return {
        ariaLabel: `Clipboard history, ${state.clipboard.count} items`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg('clipboard', 20)}</span><span class="flank-widget-value flank-num">${truncateValue(String(state.clipboard.count || 0))}</span></span>${renderBadge(state.clipboard.count)}`,
      };
    case 'weather': {
      const temp = `${state.weather.tempC}°`;
      return {
        ariaLabel: `Weather, ${state.weather.tempC} degrees${isActive ? ', open' : ''}`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg(state.weather.icon, 20)}</span><span class="flank-widget-value flank-num">${truncateValue(temp)}</span></span>`,
      };
    }
    case 'stats': {
      const cpu = `${state.stats.cpuPercent}%`;
      return {
        ariaLabel: `CPU ${state.stats.cpuPercent} percent${isActive ? ', open' : ''}`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg('cpu', 20)}</span><span class="flank-widget-value flank-num">${truncateValue(cpu)}</span></span>`,
      };
    }
    case 'battery': {
      const bat = `${state.battery.percent}%`;
      return {
        ariaLabel: `Battery ${state.battery.percent} percent, ${state.battery.stateText}${isActive ? ', open' : ''}`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg(state.battery.charging ? 'battery-charging' : 'battery', 20)}</span><span class="flank-widget-value flank-num">${truncateValue(bat)}</span></span>`,
      };
    }
    case 'player': {
      return {
        ariaLabel: `Mini player, ${state.player.playing ? 'playing' : 'paused'}`,
        extraClass: state.player.playing ? 'flank-tile-accent-icon is-playing' : '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg('equalizer', 20)}</span><span class="flank-widget-value flank-num">${state.player.playing ? 'Play' : 'Pau'}</span></span>`,
      };
    }
    case 'focus': {
      const focusVal = state.focus?.running ? formatDuration(state.focus.remainingSec).slice(0, 5) : `${state.focus?.durationMinutes ?? 25}m`;
      return {
        ariaLabel: `Focus timer, ${formatDuration(state.focus?.remainingSec ?? 1500)}`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg('focus', 20)}</span><span class="flank-widget-value flank-num">${truncateValue(focusVal)}</span></span>`,
      };
    }
    case 'clock': {
      const timeStr = (state.clock?.localTimeText || '12:00 PM').replace(/\s?[AP]M/i, '').trim();
      return {
        ariaLabel: `World clock, ${timeStr}`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg('clock', 20)}</span><span class="flank-widget-value flank-num">${truncateValue(timeStr)}</span></span>`,
      };
    }
    case 'scratchpad': {
      const count = state.scratchpad?.notes?.length ?? 1;
      return {
        ariaLabel: `Quick scratchpad, ${count} notes`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg('scratchpad', 20)}</span><span class="flank-widget-value flank-num">${count}n</span></span>${renderBadge(count)}`,
      };
    }
    case 'colorpicker': {
      const hex = state.colorpicker?.currentHex || '#2F4BFF';
      return {
        ariaLabel: `Color picker, ${hex}`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg('eyedropper', 20)}</span><span class="flank-widget-value flank-num"><span style="display:inline-block; width: 14px; height: 3px; border-radius: var(--flank-scale-radius-full); background: ${escapeHtml(hex)}"></span></span></span>`,
      };
    }
    case 'calendar': {
      const summary = (state.calendar?.nextSummary || 'Today').replace(/^in\s+/i, '').trim();
      return {
        ariaLabel: `Agenda, ${summary}`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg('calendar', 20)}</span><span class="flank-widget-value flank-num">${truncateValue(summary)}</span></span>`,
      };
    }
    case 'audio': {
      const muted = state.audio?.muted ?? false;
      const vol = state.audio?.volumePercent ?? 68;
      const val = muted ? 'Off' : `${vol}%`;
      return {
        ariaLabel: `Audio ${muted ? 'muted' : `${vol}%`}`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg(muted ? 'volume-mute' : 'volume', 20)}</span><span class="flank-widget-value flank-num">${truncateValue(val)}</span></span>`,
      };
    }
    case 'network': {
      const ping = `${state.network?.pingMs ?? 14}ms`;
      return {
        ariaLabel: `Network ${state.network?.pingMs ?? 14}ms`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg('wifi', 20)}</span><span class="flank-widget-value flank-num">${truncateValue(ping)}</span></span>`,
      };
    }
    case 'ai': {
      const aiVal = `${state.ai.totalPercent}%`;
      return {
        ariaLabel: `AI usage, ${state.ai.totalPercent} percent`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon" style="width: 20px; height: 20px">${renderAiRingSvg(state.ai.totalPercent, true)}</span><span class="flank-widget-value flank-num">${truncateValue(aiVal)}</span></span>`,
      };
    }
    case 'activity': {
      const cnt = state.activity?.activeCount ?? 0;
      return {
        ariaLabel: `AI activity, ${cnt} active sessions`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg('activity', 20)}</span><span class="flank-widget-value flank-num">${cnt}a</span></span>${renderBadge(cnt)}`,
      };
    }
    case 'bluetooth':
    default: {
      const cnt = state.bluetooth?.connectedCount ?? 0;
      return {
        ariaLabel: `Bluetooth, ${cnt} connected devices`,
        extraClass: '',
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg('bluetooth', 20)}</span><span class="flank-widget-value flank-num">${cnt}d</span></span>${renderBadge(cnt)}`,
      };
    }
  }
}

export function renderDockHtml(state: FlankState, theme: FlankTheme): string {
  const enabledItems = state.items.filter((i) => i.enabled);
  const appItems = enabledItems.filter((i) => i.group === 'apps' || (!i.group && i.kind !== 'widget'));
  const widgetItems = enabledItems.filter((i) => i.group === 'widgets' || (!i.group && i.kind === 'widget'));
  const isRow = theme.layout.widgetStyle === 'row';
  const edge = (state.edgeOverride || theme.layout.edge) === 'left' ? 'left' : 'right';

  const middleItems: string[] = [];

  if (isRow) {
    middleItems.push(
      `<div class="flank-strip-header" aria-hidden="true"><span>FLANK</span><span class="flank-strip-header-sub">dock</span></div>`
    );
  }

  // 1. App items
  appItems.forEach((item, idx) => {
    const code = item.shortCode || `0${idx + 1}`;
    const shortcutLabel = item.shortcut ? item.shortcut.replace(/\+/g, ' ') : '';
    const iconContent = renderItemIcon(item);

    if (isRow) {
      middleItems.push(
        `<button type="button" class="flank-tile" draggable="true" data-item-id="${escapeHtml(item.id)}" data-item-kind="${escapeHtml(item.kind)}" data-target="${escapeHtml(item.target || '')}" aria-label="${escapeHtml(item.label)}">
          <span class="flank-row-left"><span class="flank-row-code">${escapeHtml(code)}</span><span>${escapeHtml(item.label.toLowerCase())}</span></span>
          <span class="flank-row-right">${escapeHtml(shortcutLabel)}</span>
        </button>`
      );
    } else {
      middleItems.push(
        `<button type="button" class="flank-tile" draggable="true" data-item-id="${escapeHtml(item.id)}" data-item-kind="${escapeHtml(item.kind)}" data-target="${escapeHtml(item.target || '')}" aria-label="${escapeHtml(item.label)}">
          ${iconContent}
        </button>`
      );
    }
  });

  // 2. Divider between apps and widgets (with collapse chevron for widgets)
  if (appItems.length > 0 && widgetItems.length > 0) {
    if (isRow) {
      middleItems.push(
        `<div class="flank-strip-section" aria-hidden="true"><span>widgets</span><span class="flank-strip-section-line"></span></div>`
      );
    } else {
      middleItems.push(`
        <div class="flank-group-header">
          <div class="flank-group-divider" aria-hidden="true"></div>
          <button type="button" class="flank-group-chevron-btn" data-action="toggle-widgets-collapse" aria-label="${state.widgetsCollapsed ? 'Expand widgets group' : 'Collapse widgets into summary tile'}" title="${state.widgetsCollapsed ? 'Expand widgets' : 'Collapse widgets'}">
            ${iconSvg(state.widgetsCollapsed ? 'chevron-down' : 'chevron-up', 12)}
          </button>
        </div>
      `);
    }
  }

  // 3. Widget items (or summary tile if widgetsCollapsed)
  if (state.widgetsCollapsed && widgetItems.length > 0) {
    const isWidgetsActive = state.activeWidget === 'widgets';
    middleItems.push(`
      <button type="button" class="flank-tile flank-widget-summary-tile${isWidgetsActive ? ' is-active' : ''}" data-widget="widgets" aria-label="Widgets summary, ${widgetItems.length} active widgets" aria-expanded="${isWidgetsActive ? 'true' : 'false'}">
        <span class="flank-widget-glance">
          <span class="flank-widget-icon">${iconSvg('grid', 20)}</span>
          <span class="flank-widget-value flank-num">${widgetItems.length}</span>
        </span>
      </button>
    `);
  } else {
    widgetItems.forEach((item) => {
      const wKind = (item.widgetKind || (item as unknown as { widget?: WidgetKind }).widget) as WidgetKind | undefined;
      if (!wKind) return;
      const isActive = state.activeWidget === wKind;
      const rendered = renderWidgetTileInner(wKind, state, theme, item, isActive);
      if (!rendered) return;
      middleItems.push(
        `<button type="button" class="flank-tile ${rendered.extraClass}${isActive ? ' is-active' : ''}" draggable="true" data-item-id="${escapeHtml(item.id)}" data-widget="${escapeHtml(wKind)}" aria-label="${escapeHtml(rendered.ariaLabel)}" aria-expanded="${isActive ? 'true' : 'false'}">
          ${rendered.html}
        </button>`
      );
    });
  }

  // Fixed top collapse handle
  const collapseHandleIcon =
    edge === 'right'
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`;
  const collapseHandle = `<button type="button" class="flank-dock-collapse-handle" data-action="collapse-dock" aria-label="Hide Flank" title="Hide Flank">
    ${collapseHandleIcon}
  </button>`;

  // Fixed bottom Settings tile
  const settingsActive = state.activeFullWindow === 'settings';
  let settingsTile = '';
  if (isRow) {
    settingsTile = `
      <button type="button" class="flank-tile${settingsActive ? ' is-active' : ''}" data-action="open-settings" aria-label="Flank settings and themes">
        <span class="flank-row-left"><span class="flank-row-code">cfg</span><span>settings</span></span>
        <span class="flank-row-right">Alt ,</span>
      </button>`;
  } else {
    settingsTile = `
      <div class="flank-group-divider" aria-hidden="true"></div>
      <button type="button" class="flank-tile${settingsActive ? ' is-active' : ''}" data-action="open-settings" aria-label="Flank settings and themes">
        ${iconSvg('settings', 20)}
      </button>`;
  }

  // Collapsed edge tab button (iOS Picture-in-Picture style tab)
  const tabChevronIcon =
    edge === 'right'
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>`;
  const tabHtml = `<button type="button" class="flank-dock-tab${state.showLogoOnTab ? ' has-logo' : ''}" data-action="expand-dock" aria-label="Show Flank" title="Show Flank">
    ${state.showLogoOnTab ? `<span class="flank-tab-glyph" style="margin-bottom: 6px">${flankGlyphSvg(24, 'tab')}</span>` : ''}
    <span class="flank-tab-chevron">${tabChevronIcon}</span>
  </button>`;

  return `<nav class="flank-dock${state.showLogoOnTab ? ' has-logo' : ''}" id="flank-dock" aria-label="Flank dock" data-edge="${edge}">
    <div class="flank-glass-backdrop" aria-hidden="true"></div>
    <div class="flank-glass-sheen" aria-hidden="true"></div>
    <div class="flank-glass-rim" aria-hidden="true"></div>
    <div class="flank-dock-content flank-dock-items">
      ${collapseHandle}
      <div class="flank-dock-scrollable">
        ${middleItems.join('')}
      </div>
      ${settingsTile}
    </div>
    ${tabHtml}
  </nav>`;
}

