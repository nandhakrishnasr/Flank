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

    case 'check-square':
    case 'tasks':
    case 'todo':
      return `<svg ${sizeStyle} ${strokeAttr}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`;

    case 'calculator':
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`;

    case 'droplet':
    case 'water':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>`;

    case 'hard-drive':
    case 'storage':
    case 'disk':
      return `<svg ${sizeStyle} ${strokeAttr}><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>`;

    case 'shield':
    case 'privacy':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`;

    case 'waves':
    case 'ambient':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`;

    case 'github':
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;

    case 'monitor':
    case 'display':
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`;

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
      return flankGlyph({ size: sizePx ? (typeof sizePx === 'number' ? sizePx : parseInt(String(sizePx), 10)) : 18 });

    default:
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="8"/></svg>`;
  }
}

export interface FlankGlyphOptions {
  solid?: boolean;
  size?: number;
  className?: string;
  idSuffix?: string;
}

/**
 * Capsule F brand glyph (dock-shaped capsule with capital F).
 * - Under 24 px: uses solid variant (flank-glyph-solid.svg) for crisp rendering.
 * - 24 px and up: uses outlined variant (flank-glyph.svg).
 * Inlined with currentColor so it seamlessly adapts to theme text tokens.
 */
export function flankGlyph(options: FlankGlyphOptions = {}): string {
  const { size = 18, className = '' } = options;
  const isSolid = options.solid !== undefined ? options.solid : size < 24;
  const width = Math.round((size * 100) / 128);
  const classAttr = className ? ` class="${className}"` : '';

  if (isSolid) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 128" width="${width}" height="${size}"${classAttr} role="img" aria-label="Flank glyph" style="display:inline-block; vertical-align:middle; flex-shrink:0;"><path d="M12 44 a38 38 0 0 1 76 0 V84 a38 38 0 0 1 -76 0 Z M33.10 35.40 a5.20 5.20 0 0 1 5.20 -5.20 H65.60 a9.10 9.10 0 0 1 0.00 18.20 H51.30 V58.80 H63.00 a7.80 7.80 0 0 1 0.00 15.60 H51.30 V92.60 a5.20 5.20 0 0 1 -5.20 5.20 H38.30 a5.20 5.20 0 0 1 -5.20 -5.20 Z" fill="currentColor" fill-rule="evenodd"/></svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 128" width="${width}" height="${size}"${classAttr} role="img" aria-label="Flank glyph" style="display:inline-block; vertical-align:middle; flex-shrink:0;"><path d="M12 44 a38 38 0 0 1 76 0 V84 a38 38 0 0 1 -76 0 Z" fill="none" stroke="currentColor" stroke-width="9"/><path d="M37 42 a4 4 0 0 1 4 -4 H62 a7 7 0 0 1 0 14 H51 V60 H60 a6 6 0 0 1 0 12 H51 V86 a4 4 0 0 1 -4 4 H41 a4 4 0 0 1 -4 -4 Z" fill="currentColor"/></svg>`;
}

export function flankGlyphSvg(size: number = 18, idSuffix: string = ''): string {
  return flankGlyph({ size, idSuffix });
}

export interface FlankLockupOptions {
  theme?: 'light' | 'dark';
  height?: number;
  width?: number;
  className?: string;
}

/**
 * Official Flank Brand Lockup (App Icon + "flank." wordmark with amber dot).
 * Adapts to light/dark background surfaces.
 */
export function flankLockup(options: FlankLockupOptions = {}): string {
  const { theme = 'light', height = 84, className = '' } = options;
  const width = options.width || Math.round((height * 258) / 84);
  const textFill = theme === 'dark' ? '#FFFFFF' : '#1F1E1B';
  const classAttr = className ? ` class="${className}"` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.0 84" width="${width}" height="${height}"${classAttr} role="img" aria-label="Flank"><svg x="0" y="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="84" height="84"><rect width="128" height="128" rx="30" fill="#2F4BFF"/><g transform="translate(28.00 17.92) scale(0.72)"><path d="M12 44 a38 38 0 0 1 76 0 V84 a38 38 0 0 1 -76 0 Z" fill="none" stroke="#fff" stroke-width="9"/><path d="M37 42 a4 4 0 0 1 4 -4 H62 a7 7 0 0 1 0 14 H51 V60 H60 a6 6 0 0 1 0 12 H51 V86 a4 4 0 0 1 -4 4 H41 a4 4 0 0 1 -4 -4 Z" fill="#fff"/></g></svg><g transform="translate(106 6)"><path d="M24.15625 16.92H17.375V15.138750000000002C17.375 12.638750000000002 18.3125 11.670000000000002 20.875 11.670000000000002H24.15625V3.3575000000000017H18.15625C10.3125 3.3575000000000017 6.59375 6.545000000000002 6.59375 13.263750000000002V16.92H0.59375V25.2325H6.59375V49.92H17.375V25.2325H24.15625Z M35.95625 3.3575000000000017H25.20625V49.92H35.95625Z M48.85 50.4825C53.50625 50.4825 56.475 48.8575 58.44375 45.295H58.56875V49.92H69.06875V27.70125C69.06875 20.42 63.7875 16.20125 54.19375 16.20125C44.63125 16.20125 39.225 20.45125 38.75625 27.6075H48.75625C48.975 25.3575 50.81875 23.92 53.81875 23.92C56.6625 23.92 58.4125 25.26375 58.4125 27.2325V27.38875C58.4125 29.3575 56.25625 29.82625 50.35 30.32625C43.31875 30.88875 37.5375 33.295 37.5375 40.70125C37.5375 47.26375 42.25625 50.4825 48.85 50.4825ZM52.13125 43.45125C49.50625 43.45125 47.725 42.2325 47.725 40.20125C47.725 38.045 49.7875 36.8575 52.6625 36.42C55.31875 35.9825 57.35 35.57625 58.50625 35.045V38.045C58.50625 41.295 55.725 43.45125 52.13125 43.45125Z M82.61875 31.9825C82.61875 27.4825 84.80625 25.38875 88.2125 25.38875C91.61875 25.38875 93.5875 27.51375 93.5875 31.42V49.92H104.3375V29.17C104.3375 21.045 100.15 16.20125 92.99375 16.20125C88.025 16.20125 84.68125 18.4825 82.49375 22.26375V16.92H71.86875V49.92H82.61875Z M107.1375 49.92H117.8875V40.1075L120.16875 37.45125L128.575 49.92H140.98125L128.16875 31.32625L140.45 16.92H128.04375L118.0125 28.63875H117.8875V3.3575000000000017H107.1375Z" fill="${textFill}"/><circle cx="147.20" cy="45.12" r="4.80" fill="#F5A524"/></g></svg>`;
}

export interface FlankAppIconOptions {
  size?: number;
  small?: boolean;
  className?: string;
}

/**
 * Official Flank Brand App Icon (Blue squircle tile with capsule F mark).
 * Automatically selects solid variant below 48 px.
 */
export function flankAppIcon(options: FlankAppIconOptions = {}): string {
  const { size = 96, className = '' } = options;
  const isSmall = options.small !== undefined ? options.small : size < 48;
  const classAttr = className ? ` class="${className}"` : '';

  if (isSmall) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="${size}" height="${size}"${classAttr} role="img" aria-label="Flank app icon"><rect width="128" height="128" rx="28" fill="#2F4BFF"/><g transform="translate(24.00 12.80) scale(0.80)"><path d="M12 44 a38 38 0 0 1 76 0 V84 a38 38 0 0 1 -76 0 Z M33.10 35.40 a5.20 5.20 0 0 1 5.20 -5.20 H65.60 a9.10 9.10 0 0 1 0.00 18.20 H51.30 V58.80 H63.00 a7.80 7.80 0 0 1 0.00 15.60 H51.30 V92.60 a5.20 5.20 0 0 1 -5.20 5.20 H38.30 a5.20 5.20 0 0 1 -5.20 -5.20 Z" fill="#fff" fill-rule="evenodd"/></g></svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="${size}" height="${size}"${classAttr} role="img" aria-label="Flank app icon"><rect width="128" height="128" rx="30" fill="#2F4BFF"/><g transform="translate(28.00 17.92) scale(0.72)"><path d="M12 44 a38 38 0 0 1 76 0 V84 a38 38 0 0 1 -76 0 Z" fill="none" stroke="#fff" stroke-width="9"/><path d="M37 42 a4 4 0 0 1 4 -4 H62 a7 7 0 0 1 0 14 H51 V60 H60 a6 6 0 0 1 0 12 H51 V86 a4 4 0 0 1 -4 4 H41 a4 4 0 0 1 -4 -4 Z" fill="#fff"/></g></svg>`;
}
