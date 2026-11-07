import { type FlankTheme } from './schema.ts';

function camelToKebab(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

const IGNORED_KEYS: Record<string, Set<string>> = {
  layout: new Set(['dockWidthNote']),
  glass: new Set(['modeNote', 'sheenRadiusRule']),
  color: new Set(['activeEdgeIndicator']),
  type: new Set(['displayUse', 'weights']),
  icons: new Set(['viewBox', 'caps', 'joins']),
};

/**
 * Flatten a validated FlankTheme into exact `--flank-<group>-<token>` CSS custom properties
 * matching `themes/tokens.css`.
 */
export function flattenThemeToCssVars(theme: FlankTheme): Record<string, string> {
  const vars: Record<string, string> = {};

  const groups: Array<keyof Pick<FlankTheme, 'layout' | 'surface' | 'glass' | 'color' | 'type' | 'icons' | 'motion'>> = [
    'layout',
    'surface',
    'glass',
    'color',
    'type',
    'icons',
    'motion',
  ];

  vars['--flank-glass-display'] = theme.glass ? 'block' : 'none';

  for (const group of groups) {
    const groupObj = theme[group] as unknown as Record<string, unknown>;
    if (!groupObj || typeof groupObj !== 'object') continue;
    const ignored = IGNORED_KEYS[group] ?? new Set<string>();

    for (const [rawKey, rawVal] of Object.entries(groupObj)) {
      if (rawVal === undefined || rawVal === null || ignored.has(rawKey)) continue;

      if (group === 'surface') {
        if (rawKey === 'surfaceHover' || rawKey === 'hover') {
          vars['--flank-surface-hover'] = String(rawVal);
          continue;
        }
        if (rawKey === 'surfaceActive' || rawKey === 'active') {
          vars['--flank-surface-active'] = String(rawVal);
          continue;
        }
        if (rawKey === 'surfaceSelected' || rawKey === 'selected') {
          vars['--flank-surface-selected'] = String(rawVal);
          continue;
        }
      }

      const varName = `--flank-${group}-${camelToKebab(rawKey)}`;

      if (group === 'layout' && rawKey === 'labels') {
        vars[varName] = rawVal ? '1' : '0';
      } else if (group === 'layout' && rawKey === 'windowPadding') {
        vars[varName] = typeof rawVal === 'number' ? `${rawVal}px` : (String(rawVal).endsWith('px') ? String(rawVal) : `${rawVal}px`);
      } else if (group === 'motion' && (rawKey === 'cardInMs' || rawKey === 'tileMs')) {
        vars[varName] = typeof rawVal === 'number' ? `${rawVal}ms` : String(rawVal);
      } else if (group === 'motion' && rawKey === 'cardTravelPx') {
        vars[varName] = typeof rawVal === 'number' ? `${rawVal}px` : String(rawVal);
      } else {
        vars[varName] = String(rawVal);
      }
    }
  }

  return vars;
}
