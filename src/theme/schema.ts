export interface ThemeLayout {
  edge: 'left' | 'right';
  orientation: 'vertical' | 'horizontal';
  shape: 'pill' | 'strip' | 'rail' | 'capsule';
  widgetStyle: 'tile' | 'row' | 'value' | 'pill';
  labels: boolean;
  inset: string;
  dockWidth: string;
  dockHeight?: string;
  dockPadding: string;
  dockGap: string;
  dockRadius: string;
  tileSize: string;
  tileHeight?: string;
  valueTileHeight?: string;
  tileRadius: string;
  iconSize: string;
  hitAreaMin?: string;
  maxItems: number;
  windowPadding?: number | string;
  groupGap?: string;
  handleHeight?: string;
}

export interface ThemeSurface {
  dockBg: string;
  dockBorder: string;
  dockShadow: string;
  backdropBlur: string;
  backdropSaturate: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  cardRadius: string;
  cardPadding: string;
  cardWidth: string;
  cardGap: string;
  cardOffset: string;
  solidFallbackBg?: string;
  opacity?: number;
  highlight?: string;
  hover?: string;
  active?: string;
  selected?: string;
  surfaceHover?: string;
  surfaceActive?: string;
  surfaceSelected?: string;
}

export interface ThemeGlass {
  mode: 'wallpaper-sampled' | 'flat' | 'css-only';
  modeNote?: string;
  tintRgb: string;
  tintAlpha: number;
  tintAlphaMin: number;
  tintAlphaMax: number;
  blur: string;
  saturate: string;
  rimWidth: string;
  rim: string;
  sheen: string;
  sheenHeight: string;
  sheenRadiusRule?: string;
  textShadowWhenLowContrast?: string;
}

export interface ThemeColor {
  text: string;
  textMuted: string;
  tileBg: string;
  tileBgHover: string;
  tileBgPressed: string;
  tileIcon: string;
  tileActiveBg: string;
  tileActiveShadow?: string;
  tileActiveIcon: string;
  divider: string;
  dividerSoft?: string;
  trackBg?: string;
  chipBg?: string;
  chipActiveBg?: string;
  accent: string;
  accent2?: string;
  accentCyan?: string;
  accentPink?: string;
  accentGradient?: string;
  accentInk: string;
  accentSoft: string;
  accentLine: string;
  focusRing: string;
  activeEdgeIndicator?: string;
  iconPlate?: string;
  iconPlateBorder?: string;
  iconPlateShadow?: string;
}

export interface ThemeType {
  ui: string;
  display: string;
  mono: string;
  displayUse?: string;
  weights?: number[];
}

export interface ThemeIcons {
  strokeWidth: number;
  viewBox: string;
  caps: string;
  joins: string;
}

export interface ThemeMotion {
  cardInMs: number;
  tileMs: number;
  easing: string;
  cardTravelPx: number;
}

export interface FlankTheme {
  schema: number;
  id: string;
  name: string;
  mode: 'light' | 'dark';
  default?: boolean;
  description: string;
  layout: ThemeLayout;
  surface: ThemeSurface;
  glass?: ThemeGlass;
  color: ThemeColor;
  type: ThemeType;
  icons: ThemeIcons;
  motion: ThemeMotion;
}

export const PAPER_THEME: FlankTheme = {
  schema: 1,
  id: 'paper',
  name: 'Paper',
  mode: 'light',
  default: true,
  description: 'Light, warm, editorial. Solid surfaces, soft shadows, serif numerals. The default startup theme.',
  layout: {
    edge: 'right',
    orientation: 'vertical',
    shape: 'pill',
    widgetStyle: 'tile',
    labels: false,
    inset: '14px',
    dockWidth: '64px',
    dockPadding: '10px',
    dockGap: '6px',
    dockRadius: '9999px',
    tileSize: '40px',
    tileRadius: '12px',
    iconSize: '18px',
    maxItems: 12,
    windowPadding: '64px',
  },
  surface: {
    dockBg: '#fbfaf7',
    dockBorder: '#e2ded4',
    dockShadow: '0 14px 34px rgba(60,50,30,0.16)',
    backdropBlur: '0px',
    backdropSaturate: '1',
    cardBg: '#fbfaf7',
    cardBorder: '#e2ded4',
    cardShadow: '0 18px 44px rgba(60,50,30,0.18)',
    cardRadius: '16px',
    cardPadding: '18px',
    cardWidth: '292px',
    cardGap: '14px',
    cardOffset: '10px',
    opacity: 1,
    highlight: 'inset 0 1px 0 rgba(255,255,255,0.70)',
    hover: '#f4f0e8',
    active: '#ebe5d8',
    selected: '#e4ded0',
  },
  color: {
    text: '#1f1e1b',
    textMuted: '#6b665c',
    tileBg: '#f1eee7',
    tileBgHover: '#e9e5db',
    tileBgPressed: '#e0dbcf',
    tileIcon: '#34322e',
    tileActiveBg: '#1f1e1b',
    tileActiveIcon: '#ffffff',
    divider: 'rgba(31,30,27,0.10)',
    dividerSoft: 'rgba(31,30,27,0.06)',
    trackBg: '#dcd7ca',
    accent: '#2F4BFF',
    accentGradient: 'linear-gradient(135deg, #2F4BFF 0%, #4F70FF 100%)',
    accentInk: '#ffffff',
    accentSoft: 'rgba(47,75,255,0.10)',
    accentLine: 'rgba(47,75,255,0.35)',
    focusRing: '#2F4BFF',
    iconPlate: '#ffffff',
    iconPlateBorder: 'rgba(31,30,27,0.08)',
    iconPlateShadow: '0 1px 3px rgba(31,30,27,0.08)',
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Fraunces',Georgia,serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: 'large numerals only (weather temperature, big stat values)',
    weights: [400, 500, 600, 700],
  },
  icons: { strokeWidth: 1.75, viewBox: '0 0 24 24', caps: 'round', joins: 'round' },
  motion: { cardInMs: 160, tileMs: 120, easing: 'cubic-bezier(0.2,0.8,0.2,1)', cardTravelPx: 8 },
};

export const GLASS_THEME: FlankTheme = {
  schema: 1,
  id: 'glass',
  name: 'Glass',
  mode: 'dark',
  default: false,
  description: 'Pure crystalline frosted glass with bright specular refraction, crisp prism edges, and ice-blue reflections.',
  layout: {
    edge: 'right',
    orientation: 'vertical',
    shape: 'pill',
    widgetStyle: 'tile',
    labels: false,
    inset: '20px',
    dockWidth: '64px',
    dockPadding: '10px 0',
    dockGap: '6px',
    dockRadius: '32px',
    tileSize: '40px',
    tileHeight: '38px',
    valueTileHeight: '46px',
    tileRadius: '12px',
    iconSize: '18px',
    maxItems: 12,
    windowPadding: '40px',
  },
  surface: {
    dockBg: 'rgba(255,255,255,0.14)',
    dockBorder: 'rgba(255,255,255,0.30)',
    dockShadow:
      'inset 0 1px 0 rgba(255,255,255,0.90), inset 0 0 20px rgba(255,255,255,0.20), 0 8px 24px rgba(0,0,0,0.22)',
    backdropBlur: '36px',
    backdropSaturate: '1.3',
    cardBg: 'rgba(255,255,255,0.14)',
    cardBorder: 'rgba(255,255,255,0.30)',
    cardShadow:
      'inset 0 1px 0 rgba(255,255,255,0.90), inset 0 0 20px rgba(255,255,255,0.18), 0 8px 24px rgba(0,0,0,0.22)',
    cardRadius: '16px',
    cardPadding: '20px',
    cardWidth: '320px',
    cardGap: '14px',
    cardOffset: '14px',
    solidFallbackBg: '#1e2638',
    opacity: 0.55,
    highlight: 'inset 0 1px 0 rgba(255,255,255,0.90)',
    hover: 'rgba(255,255,255,0.12)',
    active: 'rgba(255,255,255,0.20)',
    selected: 'rgba(255,255,255,0.26)',
  },
  glass: {
    mode: 'wallpaper-sampled',
    tintRgb: '245,250,255',
    tintAlpha: 0.18,
    tintAlphaMin: 0.12,
    tintAlphaMax: 0.30,
    blur: '36px',
    saturate: '1.3',
    rimWidth: '1.5px',
    rim: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.30) 45%, rgba(255,255,255,0.70))',
    sheen: 'linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0))',
    sheenHeight: '130px',
    textShadowWhenLowContrast: '0 1px 2px rgba(0,0,0,0.35)',
  },
  color: {
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.85)',
    tileBg: 'transparent',
    tileBgHover: 'rgba(255,255,255,0.14)',
    tileBgPressed: 'rgba(255,255,255,0.22)',
    tileIcon: 'rgba(255,255,255,0.95)',
    tileActiveBg: 'linear-gradient(180deg, rgba(255,255,255,0.40), rgba(255,255,255,0.18))',
    tileActiveShadow: 'inset 0 1px 0 rgba(255,255,255,0.85), 0 4px 12px rgba(0,0,0,0.20)',
    tileActiveIcon: '#ffffff',
    divider: 'rgba(255,255,255,0.22)',
    dividerSoft: 'rgba(255,255,255,0.12)',
    trackBg: 'rgba(255,255,255,0.25)',
    chipBg: 'rgba(255,255,255,0.12)',
    chipActiveBg: 'rgba(255,255,255,0.24)',
    accent: '#38BDF8',
    accentGradient: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
    accentInk: '#031525',
    accentSoft: 'rgba(56,189,248,0.20)',
    accentLine: 'rgba(56,189,248,0.50)',
    focusRing: '#38BDF8',
    iconPlate: '#ffffff',
    iconPlateBorder: 'rgba(255,255,255,0.50)',
    iconPlateShadow: '0 1px 3px rgba(0,0,0,0.12)',
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Inter','Segoe UI Variable',system-ui,sans-serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: 'light-weight (300) large numerals, tabular numerals for live values',
    weights: [300, 400, 500, 600, 700],
  },
  icons: { strokeWidth: 1.75, viewBox: '0 0 24 24', caps: 'round', joins: 'round' },
  motion: { cardInMs: 220, tileMs: 160, easing: 'cubic-bezier(0.2,0.8,0.2,1)', cardTravelPx: 10 },
};

export const NORD_THEME: FlankTheme = {
  schema: 1,
  id: 'nord',
  name: 'Nord',
  mode: 'dark',
  default: false,
  description: 'Arctic dark slate with vibrant teal and mint accents.',
  layout: {
    edge: 'right',
    orientation: 'vertical',
    shape: 'pill',
    widgetStyle: 'tile',
    labels: false,
    inset: '12px',
    dockWidth: '64px',
    dockPadding: '12px 10px',
    dockGap: '6px',
    dockRadius: '30px',
    tileSize: '40px',
    tileRadius: '12px',
    iconSize: '18px',
    maxItems: 12,
    windowPadding: '48px',
  },
  surface: {
    dockBg: '#141920',
    dockBorder: 'rgba(232,237,242,0.10)',
    dockShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.35)',
    backdropBlur: '0px',
    backdropSaturate: '1',
    cardBg: '#181f28',
    cardBorder: 'rgba(232,237,242,0.10)',
    cardShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.30), 0 16px 32px rgba(0,0,0,0.45)',
    cardRadius: '16px',
    cardPadding: '18px',
    cardWidth: '292px',
    cardGap: '14px',
    cardOffset: '10px',
    solidFallbackBg: '#141920',
    opacity: 1,
    highlight: 'inset 0 1px 0 rgba(255,255,255,0.08)',
    hover: '#1e2632',
    active: '#252f3d',
    selected: '#2c3848',
  },
  color: {
    text: '#e8edf2',
    textMuted: '#9fb0c3',
    tileBg: 'rgba(255,255,255,0.04)',
    tileBgHover: 'rgba(255,255,255,0.09)',
    tileBgPressed: 'rgba(255,255,255,0.14)',
    tileIcon: '#d3dce7',
    tileActiveBg: 'rgba(94,234,212,0.14)',
    tileActiveIcon: '#e8edf2',
    divider: 'rgba(232,237,242,0.10)',
    dividerSoft: 'rgba(232,237,242,0.06)',
    trackBg: 'rgba(255,255,255,0.09)',
    accent: '#5EEAD4',
    accentGradient: 'linear-gradient(135deg, #5EEAD4 0%, #38bdf8 100%)',
    accentInk: '#04201c',
    accentSoft: 'rgba(94,234,212,0.14)',
    accentLine: 'rgba(94,234,212,0.38)',
    focusRing: '#5EEAD4',
    iconPlate: 'rgba(255,255,255,0.08)',
    iconPlateBorder: 'rgba(255,255,255,0.12)',
    iconPlateShadow: '0 1px 3px rgba(0,0,0,0.20)',
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Inter','Segoe UI Variable',system-ui,sans-serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: 'tabular numerals for stats',
    weights: [400, 500, 600, 700],
  },
  icons: { strokeWidth: 1.7, viewBox: '0 0 24 24', caps: 'round', joins: 'round' },
  motion: { cardInMs: 160, tileMs: 120, easing: 'cubic-bezier(0.2,0.8,0.2,1)', cardTravelPx: 8 },
};

export const TERMINAL_THEME: FlankTheme = {
  schema: 1,
  id: 'terminal',
  name: 'Terminal',
  mode: 'dark',
  default: false,
  description: 'Monospace matrix terminal with glowing green accents on deep black.',
  layout: {
    edge: 'right',
    orientation: 'vertical',
    shape: 'pill',
    widgetStyle: 'tile',
    labels: false,
    inset: '12px',
    dockWidth: '64px',
    dockPadding: '12px 10px',
    dockGap: '6px',
    dockRadius: '30px',
    tileSize: '40px',
    tileRadius: '12px',
    iconSize: '18px',
    maxItems: 12,
    windowPadding: '48px',
  },
  surface: {
    dockBg: '#0b0e0c',
    dockBorder: 'rgba(207,227,212,0.10)',
    dockShadow: 'inset 0 1px 0 rgba(124,255,138,0.12), 0 2px 6px rgba(0,0,0,0.30), 0 8px 18px rgba(0,0,0,0.40)',
    backdropBlur: '0px',
    backdropSaturate: '1',
    cardBg: '#0e120f',
    cardBorder: 'rgba(207,227,212,0.10)',
    cardShadow: 'inset 0 1px 0 rgba(124,255,138,0.12), 0 4px 12px rgba(0,0,0,0.35), 0 14px 28px rgba(0,0,0,0.50)',
    cardRadius: '16px',
    cardPadding: '16px',
    cardWidth: '292px',
    cardGap: '12px',
    cardOffset: '10px',
    solidFallbackBg: '#0b0e0c',
    opacity: 1,
    highlight: 'inset 0 1px 0 rgba(124,255,138,0.12)',
    hover: '#151c17',
    active: '#1c261f',
    selected: '#233027',
  },
  color: {
    text: '#cfe3d4',
    textMuted: '#7d9486',
    tileBg: 'transparent',
    tileBgHover: '#121814',
    tileBgPressed: '#18211b',
    tileIcon: '#7CFF8A',
    tileActiveBg: 'rgba(124,255,138,0.18)',
    tileActiveIcon: '#7CFF8A',
    divider: 'rgba(207,227,212,0.10)',
    dividerSoft: 'rgba(207,227,212,0.06)',
    trackBg: '#243229',
    accent: '#7CFF8A',
    accentGradient: 'linear-gradient(135deg, #7CFF8A 0%, #34d399 100%)',
    accentInk: '#04100a',
    accentSoft: 'rgba(124,255,138,0.14)',
    accentLine: 'rgba(124,255,138,0.38)',
    focusRing: '#7CFF8A',
    iconPlate: 'rgba(255,255,255,0.06)',
    iconPlateBorder: 'rgba(255,255,255,0.15)',
    iconPlateShadow: '0 1px 3px rgba(0,0,0,0.30)',
  },
  type: {
    ui: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    display: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: 'everything is monospace; bars use block characters',
    weights: [400, 500, 700],
  },
  icons: { strokeWidth: 1.75, viewBox: '0 0 24 24', caps: 'round', joins: 'round' },
  motion: { cardInMs: 80, tileMs: 0, easing: 'linear', cardTravelPx: 0 },
};

export const RAIL_THEME: FlankTheme = {
  schema: 1,
  id: 'rail',
  name: 'Rail',
  mode: 'dark',
  default: false,
  description: 'Ultra-thin 44px rail flush to the screen edge. Widgets collapse to tiny values; details live in the hover card.',
  layout: {
    edge: 'right',
    orientation: 'vertical',
    shape: 'rail',
    widgetStyle: 'value',
    labels: false,
    inset: '0px',
    dockWidth: '44px',
    dockPadding: '12px 4px',
    dockGap: '6px',
    dockRadius: '22px 0 0 22px',
    tileSize: '36px',
    tileRadius: '8px',
    iconSize: '16px',
    hitAreaMin: '40px',
    maxItems: 12,
    windowPadding: '48px',
  },
  surface: {
    dockBg: '#0e1018',
    dockBorder: 'rgba(236,238,243,0.10)',
    dockShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.25), 0 8px 18px rgba(0,0,0,0.35)',
    backdropBlur: '0px',
    backdropSaturate: '1',
    cardBg: '#12141c',
    cardBorder: 'rgba(236,238,243,0.10)',
    cardShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.30), 0 14px 28px rgba(0,0,0,0.45)',
    cardRadius: '16px',
    cardPadding: '16px',
    cardWidth: '292px',
    cardGap: '12px',
    cardOffset: '10px',
    solidFallbackBg: '#0e1018',
    opacity: 1,
    highlight: 'inset 0 1px 0 rgba(255,255,255,0.08)',
    hover: '#171a24',
    active: '#1e2230',
    selected: '#252a3c',
  },
  color: {
    text: '#eceef3',
    textMuted: '#b6bccb',
    tileBg: 'transparent',
    tileBgHover: 'rgba(255,255,255,0.07)',
    tileBgPressed: 'rgba(255,255,255,0.12)',
    tileIcon: '#c9cedb',
    tileActiveBg: 'rgba(255,255,255,0.10)',
    tileActiveIcon: '#FF8A7A',
    divider: 'rgba(236,238,243,0.10)',
    dividerSoft: 'rgba(236,238,243,0.06)',
    trackBg: 'rgba(255,255,255,0.14)',
    accent: '#FF8A7A',
    accentGradient: 'linear-gradient(135deg, #FF8A7A 0%, #f43f5e 100%)',
    accentInk: '#1a0f10',
    accentSoft: 'rgba(255,138,122,0.14)',
    accentLine: 'rgba(255,138,122,0.38)',
    focusRing: '#FF8A7A',
    activeEdgeIndicator: '2px x 16px accent bar on the screen-edge side of the active tile',
    iconPlate: '#ffffff',
    iconPlateBorder: 'rgba(15,23,42,0.10)',
    iconPlateShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Inter','Segoe UI Variable',system-ui,sans-serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: 'tabular numerals',
    weights: [400, 500, 600, 700],
  },
  icons: { strokeWidth: 1.75, viewBox: '0 0 24 24', caps: 'round', joins: 'round' },
  motion: { cardInMs: 140, tileMs: 100, easing: 'cubic-bezier(0.2,0.8,0.2,1)', cardTravelPx: 6 },
};

export const AURORA_THEME: FlankTheme = {
  schema: 1,
  id: 'aurora',
  name: 'Aurora',
  mode: 'dark',
  default: false,
  description: 'Vivid purple-indigo vertical capsule with glowing neon gradient.',
  layout: {
    edge: 'right',
    orientation: 'vertical',
    shape: 'pill',
    widgetStyle: 'tile',
    labels: true,
    inset: '12px',
    dockWidth: '64px',
    dockPadding: '12px 10px',
    dockGap: '6px',
    dockRadius: '30px',
    tileSize: '40px',
    tileRadius: '12px',
    iconSize: '18px',
    maxItems: 12,
    windowPadding: '16px',
  },
  surface: {
    dockBg: '#160a2e',
    dockBorder: 'rgba(255,255,255,0.20)',
    dockShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 10px rgba(0,0,0,0.35)',
    backdropBlur: '26px',
    backdropSaturate: '1.5',
    cardBg: '#1c0f38',
    cardBorder: 'rgba(255,255,255,0.20)',
    cardShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 10px rgba(0,0,0,0.40)',
    cardRadius: '16px',
    cardPadding: '18px',
    cardWidth: '292px',
    cardGap: '14px',
    cardOffset: '10px',
    solidFallbackBg: '#160a2e',
    opacity: 1,
    highlight: 'inset 0 1px 0 rgba(255,255,255,0.25)',
    hover: 'rgba(255,255,255,0.08)',
    active: 'rgba(255,255,255,0.16)',
    selected: 'rgba(255,255,255,0.24)',
  },
  color: {
    text: '#ffffff',
    textMuted: '#ddd3f5',
    tileBg: 'rgba(255,255,255,0.12)',
    tileBgHover: 'rgba(255,255,255,0.20)',
    tileBgPressed: 'rgba(255,255,255,0.28)',
    tileIcon: '#ffffff',
    tileActiveBg: 'linear-gradient(135deg,#db2777,#7c3aed)',
    tileActiveIcon: '#ffffff',
    divider: 'rgba(255,255,255,0.10)',
    dividerSoft: 'rgba(255,255,255,0.06)',
    trackBg: 'rgba(255,255,255,0.14)',
    accent: '#f472b6',
    accent2: '#8b5cf6',
    accentCyan: '#67e8f9',
    accentPink: '#f0abfc',
    accentGradient: 'linear-gradient(90deg,#f472b6,#8b5cf6)',
    accentInk: '#ffffff',
    accentSoft: 'rgba(244,114,182,0.16)',
    accentLine: 'rgba(244,114,182,0.4)',
    focusRing: '#f0abfc',
    iconPlate: 'rgba(255,255,255,0.10)',
    iconPlateBorder: 'rgba(255,255,255,0.18)',
    iconPlateShadow: '0 2px 6px rgba(0,0,0,0.25)',
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Inter','Segoe UI Variable',system-ui,sans-serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: 'tabular numerals',
    weights: [400, 500, 600, 700],
  },
  icons: { strokeWidth: 1.75, viewBox: '0 0 24 24', caps: 'round', joins: 'round' },
  motion: { cardInMs: 200, tileMs: 140, easing: 'cubic-bezier(0.2,0.8,0.2,1)', cardTravelPx: 8 },
};

export const LIQUID_GLASS_THEME: FlankTheme = {
  schema: 1,
  id: 'liquid-glass',
  name: 'Liquid Glass',
  mode: 'dark',
  default: false,
  description:
    'iOS-style liquid glass: deep obsidian tinted capsule, bright neon rim light, soft inner glow, large radii, fluid motion. Fully rounded silhouette on a transparent window.',
  layout: {
    edge: 'right',
    orientation: 'vertical',
    shape: 'pill',
    widgetStyle: 'tile',
    labels: false,
    inset: '20px',
    dockWidth: '64px',
    dockPadding: '10px 0',
    dockGap: '6px',
    dockRadius: '32px',
    tileSize: '40px',
    tileHeight: '38px',
    valueTileHeight: '46px',
    tileRadius: '12px',
    iconSize: '18px',
    maxItems: 12,
    windowPadding: '40px',
  },
  surface: {
    dockBg: 'rgba(10,14,32,0.60)',
    dockBorder: 'transparent',
    dockShadow:
      'inset 0 1px 0 rgba(255,255,255,0.50), inset 0 0 20px rgba(124,240,200,0.12), 0 8px 24px rgba(0,0,0,0.45)',
    backdropBlur: '26px',
    backdropSaturate: '2.0',
    cardBg: 'rgba(10,14,32,0.60)',
    cardBorder: 'transparent',
    cardShadow:
      'inset 0 1px 0 rgba(255,255,255,0.50), inset 0 0 20px rgba(124,240,200,0.12), 0 8px 24px rgba(0,0,0,0.45)',
    cardRadius: '16px',
    cardPadding: '20px',
    cardWidth: '320px',
    cardGap: '14px',
    cardOffset: '14px',
    solidFallbackBg: '#0d1326',
    opacity: 0.60,
    highlight: 'inset 0 1px 0 rgba(255,255,255,0.50)',
    hover: 'rgba(255,255,255,0.08)',
    active: 'rgba(255,255,255,0.15)',
    selected: 'rgba(255,255,255,0.22)',
  },
  glass: {
    mode: 'wallpaper-sampled',
    modeNote: 'css-only | wallpaper-sampled (default) | flat. See ANTIGRAVITY_PROMPT.md part B.',
    tintRgb: '10,14,32',
    tintAlpha: 0.60,
    tintAlphaMin: 0.40,
    tintAlphaMax: 0.70,
    blur: '26px',
    saturate: '2.0',
    rimWidth: '1.5px',
    rim: 'linear-gradient(135deg, rgba(124,240,200,0.85), rgba(255,255,255,0.15) 50%, rgba(56,189,248,0.40))',
    sheen: 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0))',
    sheenHeight: '130px',
    sheenRadiusRule:
      'must equal the shape radius; never use a larger bottom radius (CSS scales all radii down and the corners bulge)',
    textShadowWhenLowContrast: '0 1px 2px rgba(0,0,0,0.35)',
  },
  color: {
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.82)',
    tileBg: 'transparent',
    tileBgHover: 'rgba(255,255,255,0.12)',
    tileBgPressed: 'rgba(255,255,255,0.18)',
    tileIcon: 'rgba(255,255,255,0.94)',
    tileActiveBg: 'linear-gradient(180deg, rgba(255,255,255,0.32), rgba(255,255,255,0.12))',
    tileActiveShadow:
      'inset 0 1px 0 rgba(255,255,255,0.65), inset 0 0 12px rgba(255,255,255,0.12), 0 4px 12px rgba(6,8,24,0.25)',
    tileActiveIcon: '#ffffff',
    divider: 'rgba(255,255,255,0.10)',
    dividerSoft: 'rgba(255,255,255,0.06)',
    trackBg: 'rgba(255,255,255,0.25)',
    chipBg: 'rgba(255,255,255,0.08)',
    chipActiveBg: 'rgba(255,255,255,0.16)',
    accent: '#7CF0C8',
    accentGradient: 'linear-gradient(135deg, #7CF0C8 0%, #00F0FF 100%)',
    accentInk: '#06231f',
    accentSoft: 'rgba(124,240,200,0.16)',
    accentLine: 'rgba(124,240,200,0.40)',
    focusRing: '#7CF0C8',
    iconPlate: 'rgba(255,255,255,0.12)',
    iconPlateBorder: 'rgba(255,255,255,0.20)',
    iconPlateShadow: '0 2px 6px rgba(0,0,0,0.25)',
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Inter','Segoe UI Variable',system-ui,sans-serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: 'light-weight (300) large numerals, tabular numerals for live values',
    weights: [300, 400, 500, 600, 700],
  },
  icons: { strokeWidth: 1.75, viewBox: '0 0 24 24', caps: 'round', joins: 'round' },
  motion: {
    cardInMs: 220,
    tileMs: 160,
    easing: 'cubic-bezier(0.2,0.8,0.2,1)',
    cardTravelPx: 10,
  },
};

export const BUNDLED_THEMES: Record<string, FlankTheme> = {
  paper: PAPER_THEME,
  glass: GLASS_THEME,
  nord: NORD_THEME,
  terminal: TERMINAL_THEME,
  rail: RAIL_THEME,
  aurora: AURORA_THEME,
  'liquid-glass': LIQUID_GLASS_THEME,
};

export const ACCENT_PRESETS: string[] = [
  PAPER_THEME.color.accent,
  GLASS_THEME.color.accent,
  NORD_THEME.color.accent,
  TERMINAL_THEME.color.accent,
  RAIL_THEME.color.accent,
  AURORA_THEME.color.accent,
  AURORA_THEME.color.accent2!,
  LIQUID_GLASS_THEME.color.accent,
];
