/**
 * Flank Lucide Icon Set (https://lucide.dev/)
 * Official Lucide SVG vector glyphs adhering to Flank icon language (Step 3):
 * - 24x24 grid & viewBox
 * - stroke="currentColor"
 * - stroke-width="var(--flank-scale-icon-stroke, var(--flank-icons-stroke-width, 1.75))"
 * - stroke-linecap="round" stroke-linejoin="round"
 * - fill="none"
 * - optical size md (20px) by default
 * - ISC Licence in docs/design/LUCIDE_LICENSE.txt
 */

export function iconSvg(name: string, sizePx?: number | string): string {
  const sizeStyle = sizePx
    ? (typeof sizePx === 'number' ? `width="${sizePx}" height="${sizePx}"` : `style="width:${sizePx}; height:${sizePx}"`)
    : `style="width: var(--flank-scale-icon-md, 20px); height: var(--flank-scale-icon-md, 20px)"`;
  const strokeAttr = `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="var(--flank-scale-icon-stroke, var(--flank-icons-stroke-width, 1.75))" stroke-linecap="round" stroke-linejoin="round" shape-rendering="geometricPrecision" aria-hidden="true"`;

  switch (name) {
    // ------------------------------------------------------------------------
    // Apps (Lucide: Terminal, Globe, Folder, FileText)
    // ------------------------------------------------------------------------
    case 'terminal':
      return `<svg ${sizeStyle} ${strokeAttr}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`;

    case 'globe':
    case 'browser':
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;

    case 'folder':
    case 'files':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`;

    case 'notes':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`;

    case 'bookmark':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`;

    // ------------------------------------------------------------------------
    // Widgets (Lucide: ClipboardList, Sun, Moon, Cloud, CloudRain)
    // ------------------------------------------------------------------------
    case 'clipboard':
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`;

    case 'sun':
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;

    case 'moon':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

    case 'cloud':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`;

    case 'rain':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`;

    case 'battery':
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/><line x1="6" x2="6" y1="11" y2="13"/><line x1="10" x2="10" y1="11" y2="13"/></svg>`;

    case 'battery-charging':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"/><path d="m11 7-3 5h4l-3 5"/><line x1="22" x2="22" y1="11" y2="13"/></svg>`;

    case 'equalizer':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>`;

    case 'focus':
    case 'target':
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;

    case 'clock':
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

    case 'scratchpad':
    case 'sticky':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M18.4 2.6a2.12 2.12 0 1 1 3 3L16 11l-4 1 1-4Z"/></svg>`;

    case 'eyedropper':
    case 'colorpicker':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"/></svg>`;

    case 'calendar':
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`;

    case 'volume':
    case 'audio':
      return `<svg ${sizeStyle} ${strokeAttr}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;

    case 'volume-mute':
      return `<svg ${sizeStyle} ${strokeAttr}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`;

    case 'mic':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`;

    case 'mic-off':
      return `<svg ${sizeStyle} ${strokeAttr}><line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`;

    case 'wifi':
    case 'network':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>`;

    case 'settings':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;

    // ------------------------------------------------------------------------
    // Media & Control Glyphs (Mono Line Art, Round Caps & Joins)
    // ------------------------------------------------------------------------
    case 'play':
      return `<svg ${sizeStyle} ${strokeAttr}><polygon points="6 3 20 12 6 21 6 3"/></svg>`;

    case 'pause':
      return `<svg ${sizeStyle} ${strokeAttr}><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>`;

    case 'previous':
    case 'skip-back':
      return `<svg ${sizeStyle} ${strokeAttr}><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>`;

    case 'next':
    case 'skip-forward':
      return `<svg ${sizeStyle} ${strokeAttr}><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>`;

    case 'search':
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`;

    case 'pin':
      return `<svg ${sizeStyle} ${strokeAttr}><line x1="12" x2="12" y1="17" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>`;

    case 'trash':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`;

    case 'link':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

    case 'code':
      return `<svg ${sizeStyle} ${strokeAttr}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;

    case 'file':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>`;

    case 'text':
      return `<svg ${sizeStyle} ${strokeAttr}><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>`;

    case 'arrow-up-right':
    case 'external-link':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`;

    case 'chevron-up':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m18 15-6-6-6 6"/></svg>`;

    case 'chevron-down':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m6 9 6 6 6-6"/></svg>`;

    case 'chevron-left':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m15 18-6-6 6-6"/></svg>`;

    case 'chevron-right':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m9 18 6-6-6-6"/></svg>`;

    case 'plus':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;

    case 'check':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M20 6 9 17l-5-5"/></svg>`;

    case 'x':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

    case 'grid':
      return `<svg ${sizeStyle} ${strokeAttr}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`;

    case 'mouse':
      return `<svg ${sizeStyle} ${strokeAttr}><rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 6v4"/></svg>`;

    case 'keyboard':
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M7 16h10"/></svg>`;

    case 'headphones':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>`;

    case 'cpu':
    case 'processor':
    case 'chip':
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`;

    case 'gauge':
    case 'speedometer':
    case 'dashboard':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`;

    case 'pulse':
    case 'activity-wave':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;

    case 'bluetooth':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m7 7 10 10-5 5V2l5 5L7 17"/></svg>`;

    case 'activity':
    case 'agent':
    case 'bot':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>`;

    case 'reset':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`;

    case 'refresh':
    case 'refresh-cw':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`;

    case 'image':
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;

    case 'win-min':
      return `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M1 6h10"/></svg>`;

    case 'win-max':
      return `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="1.5" y="1.5" width="9" height="9" rx="1.5"/></svg>`;

    case 'win-close':
      return `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M1.5 1.5l9 9M10.5 1.5l-9 9"/></svg>`;

    case 'flank-mark':
    case 'flank-glyph':
      return flankGlyphSvg(sizePx ? (typeof sizePx === 'number' ? sizePx : parseInt(sizePx, 10)) : 18);

    default:
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="8"/></svg>`;
  }
}

export function flankGlyphSvg(size: number = 18, idSuffix: string = ''): string {
  const maskId = `flankGlyphCut${idSuffix || Math.random().toString(36).substring(2, 7)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}" role="img" aria-label="Flank glyph" style="display:inline-block; vertical-align:middle; flex-shrink:0;">
  <defs>
    <mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512">
      <rect width="512" height="512" fill="#fff"/>
      <circle cx="318" cy="226" r="21" fill="#000"/>
      <path d="M168 226 C150 296 190 366 264 372 C272 300 242 232 168 226 Z" fill="none" stroke="#000" stroke-width="10" stroke-linejoin="round"/>
    </mask>
  </defs>
  <g mask="url(#${maskId})" fill="currentColor" stroke="none">
    <rect x="96" y="402" width="320" height="28" rx="14"/>
    <path d="M158 296 C112 322 84 356 70 396 C108 388 140 374 180 348 Z"/>
    <ellipse cx="250" cy="262" rx="124" ry="130"/>
    <path d="M232 148 C224 116 242 94 268 86 C262 110 276 126 290 140 Z"/>
    <path d="M366 232 Q424 248 424 261 Q424 274 366 286 Z" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>
  </g>
  <path d="M212 380 V402 M256 380 V402" stroke="currentColor" stroke-width="9" stroke-linecap="round" fill="none"/>
</svg>`;
}
