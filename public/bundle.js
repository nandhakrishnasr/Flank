// src/theme/schema.ts
var PAPER_THEME = {
  schema: 1,
  id: "paper",
  name: "Paper",
  mode: "light",
  default: true,
  description: "Light, warm, editorial. Solid surfaces, soft shadows, serif numerals. The default startup theme.",
  layout: {
    edge: "right",
    orientation: "vertical",
    shape: "pill",
    widgetStyle: "tile",
    labels: false,
    inset: "14px",
    dockWidth: "64px",
    dockPadding: "10px",
    dockGap: "6px",
    dockRadius: "9999px",
    tileSize: "40px",
    tileRadius: "12px",
    iconSize: "18px",
    maxItems: 12,
    windowPadding: "64px"
  },
  surface: {
    dockBg: "#fbfaf7",
    dockBorder: "#e2ded4",
    dockShadow: "0 14px 34px rgba(60,50,30,0.16)",
    backdropBlur: "0px",
    backdropSaturate: "1",
    cardBg: "#fbfaf7",
    cardBorder: "#e2ded4",
    cardShadow: "0 18px 44px rgba(60,50,30,0.18)",
    cardRadius: "16px",
    cardPadding: "18px",
    cardWidth: "292px",
    cardGap: "14px",
    cardOffset: "10px",
    opacity: 1,
    highlight: "inset 0 1px 0 rgba(255,255,255,0.70)",
    hover: "#f4f0e8",
    active: "#ebe5d8",
    selected: "#e4ded0"
  },
  color: {
    text: "#1f1e1b",
    textMuted: "#6b665c",
    tileBg: "#f1eee7",
    tileBgHover: "#e9e5db",
    tileBgPressed: "#e0dbcf",
    tileIcon: "#34322e",
    tileActiveBg: "#1f1e1b",
    tileActiveIcon: "#ffffff",
    divider: "rgba(31,30,27,0.10)",
    dividerSoft: "rgba(31,30,27,0.06)",
    trackBg: "#dcd7ca",
    accent: "#2F4BFF",
    accentGradient: "linear-gradient(135deg, #2F4BFF 0%, #4F70FF 100%)",
    accentInk: "#ffffff",
    accentSoft: "rgba(47,75,255,0.10)",
    accentLine: "rgba(47,75,255,0.35)",
    focusRing: "#2F4BFF",
    iconPlate: "#ffffff",
    iconPlateBorder: "rgba(31,30,27,0.08)",
    iconPlateShadow: "0 1px 3px rgba(31,30,27,0.08)"
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Fraunces',Georgia,serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: "large numerals only (weather temperature, big stat values)",
    weights: [400, 500, 600, 700]
  },
  icons: { strokeWidth: 1.75, viewBox: "0 0 24 24", caps: "round", joins: "round" },
  motion: { cardInMs: 160, tileMs: 120, easing: "cubic-bezier(0.2,0.8,0.2,1)", cardTravelPx: 8 }
};
var GLASS_THEME = {
  schema: 1,
  id: "glass",
  name: "Glass",
  mode: "dark",
  default: false,
  description: "Pure crystalline frosted glass with bright specular refraction, crisp prism edges, and ice-blue reflections.",
  layout: {
    edge: "right",
    orientation: "vertical",
    shape: "pill",
    widgetStyle: "tile",
    labels: false,
    inset: "20px",
    dockWidth: "64px",
    dockPadding: "10px 0",
    dockGap: "6px",
    dockRadius: "32px",
    tileSize: "40px",
    tileHeight: "38px",
    valueTileHeight: "46px",
    tileRadius: "12px",
    iconSize: "18px",
    maxItems: 12,
    windowPadding: "40px"
  },
  surface: {
    dockBg: "rgba(255,255,255,0.14)",
    dockBorder: "rgba(255,255,255,0.30)",
    dockShadow: "inset 0 1px 0 rgba(255,255,255,0.90), inset 0 0 20px rgba(255,255,255,0.20), 0 8px 24px rgba(0,0,0,0.22)",
    backdropBlur: "36px",
    backdropSaturate: "1.3",
    cardBg: "rgba(255,255,255,0.14)",
    cardBorder: "rgba(255,255,255,0.30)",
    cardShadow: "inset 0 1px 0 rgba(255,255,255,0.90), inset 0 0 20px rgba(255,255,255,0.18), 0 8px 24px rgba(0,0,0,0.22)",
    cardRadius: "16px",
    cardPadding: "20px",
    cardWidth: "320px",
    cardGap: "14px",
    cardOffset: "14px",
    solidFallbackBg: "#1e2638",
    opacity: 0.55,
    highlight: "inset 0 1px 0 rgba(255,255,255,0.90)",
    hover: "rgba(255,255,255,0.12)",
    active: "rgba(255,255,255,0.20)",
    selected: "rgba(255,255,255,0.26)"
  },
  glass: {
    mode: "css-only",
    tintRgb: "245,250,255",
    tintAlpha: 0.18,
    tintAlphaMin: 0.12,
    tintAlphaMax: 0.3,
    blur: "36px",
    saturate: "1.3",
    rimWidth: "1.5px",
    rim: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.30) 45%, rgba(255,255,255,0.70))",
    sheen: "linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0))",
    sheenHeight: "130px",
    textShadowWhenLowContrast: "0 1px 2px rgba(0,0,0,0.35)"
  },
  color: {
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.85)",
    tileBg: "transparent",
    tileBgHover: "rgba(255,255,255,0.14)",
    tileBgPressed: "rgba(255,255,255,0.22)",
    tileIcon: "rgba(255,255,255,0.95)",
    tileActiveBg: "linear-gradient(180deg, rgba(255,255,255,0.40), rgba(255,255,255,0.18))",
    tileActiveShadow: "inset 0 1px 0 rgba(255,255,255,0.85), 0 4px 12px rgba(0,0,0,0.20)",
    tileActiveIcon: "#ffffff",
    divider: "rgba(255,255,255,0.22)",
    dividerSoft: "rgba(255,255,255,0.12)",
    trackBg: "rgba(255,255,255,0.25)",
    chipBg: "rgba(255,255,255,0.12)",
    chipActiveBg: "rgba(255,255,255,0.24)",
    accent: "#38BDF8",
    accentGradient: "linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)",
    accentInk: "#031525",
    accentSoft: "rgba(56,189,248,0.20)",
    accentLine: "rgba(56,189,248,0.50)",
    focusRing: "#38BDF8",
    iconPlate: "#ffffff",
    iconPlateBorder: "rgba(255,255,255,0.50)",
    iconPlateShadow: "0 1px 3px rgba(0,0,0,0.12)"
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Inter','Segoe UI Variable',system-ui,sans-serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: "light-weight (300) large numerals, tabular numerals for live values",
    weights: [300, 400, 500, 600, 700]
  },
  icons: { strokeWidth: 1.75, viewBox: "0 0 24 24", caps: "round", joins: "round" },
  motion: { cardInMs: 220, tileMs: 160, easing: "cubic-bezier(0.2,0.8,0.2,1)", cardTravelPx: 10 }
};
var NORD_THEME = {
  schema: 1,
  id: "nord",
  name: "Nord",
  mode: "dark",
  default: false,
  description: "Arctic dark slate with vibrant teal and mint accents.",
  layout: {
    edge: "right",
    orientation: "vertical",
    shape: "pill",
    widgetStyle: "tile",
    labels: false,
    inset: "12px",
    dockWidth: "64px",
    dockPadding: "12px 10px",
    dockGap: "6px",
    dockRadius: "30px",
    tileSize: "40px",
    tileRadius: "12px",
    iconSize: "18px",
    maxItems: 12,
    windowPadding: "48px"
  },
  surface: {
    dockBg: "#141920",
    dockBorder: "rgba(232,237,242,0.10)",
    dockShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.35)",
    backdropBlur: "0px",
    backdropSaturate: "1",
    cardBg: "#181f28",
    cardBorder: "rgba(232,237,242,0.10)",
    cardShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.30), 0 16px 32px rgba(0,0,0,0.45)",
    cardRadius: "16px",
    cardPadding: "18px",
    cardWidth: "292px",
    cardGap: "14px",
    cardOffset: "10px",
    solidFallbackBg: "#141920",
    opacity: 1,
    highlight: "inset 0 1px 0 rgba(255,255,255,0.08)",
    hover: "#1e2632",
    active: "#252f3d",
    selected: "#2c3848"
  },
  color: {
    text: "#e8edf2",
    textMuted: "#9fb0c3",
    tileBg: "rgba(255,255,255,0.04)",
    tileBgHover: "rgba(255,255,255,0.09)",
    tileBgPressed: "rgba(255,255,255,0.14)",
    tileIcon: "#d3dce7",
    tileActiveBg: "rgba(94,234,212,0.14)",
    tileActiveIcon: "#e8edf2",
    divider: "rgba(232,237,242,0.10)",
    dividerSoft: "rgba(232,237,242,0.06)",
    trackBg: "rgba(255,255,255,0.09)",
    accent: "#5EEAD4",
    accentGradient: "linear-gradient(135deg, #5EEAD4 0%, #38bdf8 100%)",
    accentInk: "#04201c",
    accentSoft: "rgba(94,234,212,0.14)",
    accentLine: "rgba(94,234,212,0.38)",
    focusRing: "#5EEAD4",
    iconPlate: "rgba(255,255,255,0.08)",
    iconPlateBorder: "rgba(255,255,255,0.12)",
    iconPlateShadow: "0 1px 3px rgba(0,0,0,0.20)"
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Inter','Segoe UI Variable',system-ui,sans-serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: "tabular numerals for stats",
    weights: [400, 500, 600, 700]
  },
  icons: { strokeWidth: 1.7, viewBox: "0 0 24 24", caps: "round", joins: "round" },
  motion: { cardInMs: 160, tileMs: 120, easing: "cubic-bezier(0.2,0.8,0.2,1)", cardTravelPx: 8 }
};
var TERMINAL_THEME = {
  schema: 1,
  id: "terminal",
  name: "Terminal",
  mode: "dark",
  default: false,
  description: "Monospace matrix terminal with glowing green accents on deep black.",
  layout: {
    edge: "right",
    orientation: "vertical",
    shape: "pill",
    widgetStyle: "tile",
    labels: false,
    inset: "12px",
    dockWidth: "64px",
    dockPadding: "12px 10px",
    dockGap: "6px",
    dockRadius: "30px",
    tileSize: "40px",
    tileRadius: "12px",
    iconSize: "18px",
    maxItems: 12,
    windowPadding: "48px"
  },
  surface: {
    dockBg: "#0b0e0c",
    dockBorder: "rgba(207,227,212,0.10)",
    dockShadow: "inset 0 1px 0 rgba(124,255,138,0.12), 0 2px 6px rgba(0,0,0,0.30), 0 8px 18px rgba(0,0,0,0.40)",
    backdropBlur: "0px",
    backdropSaturate: "1",
    cardBg: "#0e120f",
    cardBorder: "rgba(207,227,212,0.10)",
    cardShadow: "inset 0 1px 0 rgba(124,255,138,0.12), 0 4px 12px rgba(0,0,0,0.35), 0 14px 28px rgba(0,0,0,0.50)",
    cardRadius: "16px",
    cardPadding: "16px",
    cardWidth: "292px",
    cardGap: "12px",
    cardOffset: "10px",
    solidFallbackBg: "#0b0e0c",
    opacity: 1,
    highlight: "inset 0 1px 0 rgba(124,255,138,0.12)",
    hover: "#151c17",
    active: "#1c261f",
    selected: "#233027"
  },
  color: {
    text: "#cfe3d4",
    textMuted: "#7d9486",
    tileBg: "transparent",
    tileBgHover: "#121814",
    tileBgPressed: "#18211b",
    tileIcon: "#7CFF8A",
    tileActiveBg: "rgba(124,255,138,0.18)",
    tileActiveIcon: "#7CFF8A",
    divider: "rgba(207,227,212,0.10)",
    dividerSoft: "rgba(207,227,212,0.06)",
    trackBg: "#243229",
    accent: "#7CFF8A",
    accentGradient: "linear-gradient(135deg, #7CFF8A 0%, #34d399 100%)",
    accentInk: "#04100a",
    accentSoft: "rgba(124,255,138,0.14)",
    accentLine: "rgba(124,255,138,0.38)",
    focusRing: "#7CFF8A",
    iconPlate: "rgba(255,255,255,0.06)",
    iconPlateBorder: "rgba(255,255,255,0.15)",
    iconPlateShadow: "0 1px 3px rgba(0,0,0,0.30)"
  },
  type: {
    ui: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    display: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: "everything is monospace; bars use block characters",
    weights: [400, 500, 700]
  },
  icons: { strokeWidth: 1.75, viewBox: "0 0 24 24", caps: "round", joins: "round" },
  motion: { cardInMs: 80, tileMs: 0, easing: "linear", cardTravelPx: 0 }
};
var RAIL_THEME = {
  schema: 1,
  id: "rail",
  name: "Rail",
  mode: "dark",
  default: false,
  description: "Ultra-thin 44px rail flush to the screen edge. Widgets collapse to tiny values; details live in the hover card.",
  layout: {
    edge: "right",
    orientation: "vertical",
    shape: "rail",
    widgetStyle: "value",
    labels: false,
    inset: "0px",
    dockWidth: "44px",
    dockPadding: "12px 4px",
    dockGap: "6px",
    dockRadius: "22px 0 0 22px",
    tileSize: "36px",
    tileRadius: "8px",
    iconSize: "16px",
    hitAreaMin: "40px",
    maxItems: 12,
    windowPadding: "48px"
  },
  surface: {
    dockBg: "#0e1018",
    dockBorder: "rgba(236,238,243,0.10)",
    dockShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.25), 0 8px 18px rgba(0,0,0,0.35)",
    backdropBlur: "0px",
    backdropSaturate: "1",
    cardBg: "#12141c",
    cardBorder: "rgba(236,238,243,0.10)",
    cardShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.30), 0 14px 28px rgba(0,0,0,0.45)",
    cardRadius: "16px",
    cardPadding: "16px",
    cardWidth: "292px",
    cardGap: "12px",
    cardOffset: "10px",
    solidFallbackBg: "#0e1018",
    opacity: 1,
    highlight: "inset 0 1px 0 rgba(255,255,255,0.08)",
    hover: "#171a24",
    active: "#1e2230",
    selected: "#252a3c"
  },
  color: {
    text: "#eceef3",
    textMuted: "#b6bccb",
    tileBg: "transparent",
    tileBgHover: "rgba(255,255,255,0.07)",
    tileBgPressed: "rgba(255,255,255,0.12)",
    tileIcon: "#c9cedb",
    tileActiveBg: "rgba(255,255,255,0.10)",
    tileActiveIcon: "#FF8A7A",
    divider: "rgba(236,238,243,0.10)",
    dividerSoft: "rgba(236,238,243,0.06)",
    trackBg: "rgba(255,255,255,0.14)",
    accent: "#FF8A7A",
    accentGradient: "linear-gradient(135deg, #FF8A7A 0%, #f43f5e 100%)",
    accentInk: "#1a0f10",
    accentSoft: "rgba(255,138,122,0.14)",
    accentLine: "rgba(255,138,122,0.38)",
    focusRing: "#FF8A7A",
    activeEdgeIndicator: "2px x 16px accent bar on the screen-edge side of the active tile",
    iconPlate: "#ffffff",
    iconPlateBorder: "rgba(15,23,42,0.10)",
    iconPlateShadow: "0 1px 3px rgba(0,0,0,0.08)"
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Inter','Segoe UI Variable',system-ui,sans-serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: "tabular numerals",
    weights: [400, 500, 600, 700]
  },
  icons: { strokeWidth: 1.75, viewBox: "0 0 24 24", caps: "round", joins: "round" },
  motion: { cardInMs: 140, tileMs: 100, easing: "cubic-bezier(0.2,0.8,0.2,1)", cardTravelPx: 6 }
};
var AURORA_THEME = {
  schema: 1,
  id: "aurora",
  name: "Aurora",
  mode: "dark",
  default: false,
  description: "Vivid purple-indigo vertical capsule with glowing neon gradient.",
  layout: {
    edge: "right",
    orientation: "vertical",
    shape: "pill",
    widgetStyle: "tile",
    labels: true,
    inset: "12px",
    dockWidth: "64px",
    dockPadding: "12px 10px",
    dockGap: "6px",
    dockRadius: "30px",
    tileSize: "40px",
    tileRadius: "12px",
    iconSize: "18px",
    maxItems: 12,
    windowPadding: "16px"
  },
  surface: {
    dockBg: "rgba(24, 12, 48, 0.85)",
    dockBorder: "rgba(255,255,255,0.18)",
    dockShadow: "inset 0 1px 0 rgba(255,255,255,0.30), inset 0 0 14px rgba(168,85,247,0.15), 0 4px 12px rgba(0,0,0,0.40)",
    backdropBlur: "26px",
    backdropSaturate: "1.5",
    cardBg: "rgba(28, 14, 56, 0.88)",
    cardBorder: "rgba(255,255,255,0.18)",
    cardShadow: "inset 0 1px 0 rgba(255,255,255,0.30), inset 0 0 16px rgba(168,85,247,0.15), 0 4px 12px rgba(0,0,0,0.40)",
    cardRadius: "16px",
    cardPadding: "18px",
    cardWidth: "292px",
    cardGap: "14px",
    cardOffset: "10px",
    solidFallbackBg: "#180c30",
    opacity: 0.85,
    highlight: "inset 0 1px 0 rgba(255,255,255,0.30)",
    hover: "rgba(255,255,255,0.10)",
    active: "rgba(255,255,255,0.18)",
    selected: "rgba(255,255,255,0.26)"
  },
  color: {
    text: "#ffffff",
    textMuted: "#bfaedb",
    tileBg: "rgba(255,255,255,0.08)",
    tileBgHover: "rgba(255,255,255,0.16)",
    tileBgPressed: "rgba(255,255,255,0.24)",
    tileIcon: "#ffffff",
    tileActiveBg: "linear-gradient(135deg,#a855f7,#ec4899)",
    tileActiveIcon: "#ffffff",
    divider: "rgba(255,255,255,0.14)",
    dividerSoft: "rgba(255,255,255,0.08)",
    trackBg: "rgba(255,255,255,0.16)",
    accent: "#f472b6",
    accent2: "#8b5cf6",
    accentCyan: "#67e8f9",
    accentPink: "#f0abfc",
    accentGradient: "linear-gradient(90deg,#f472b6,#8b5cf6)",
    accentInk: "#18062b",
    accentSoft: "rgba(244,114,182,0.16)",
    accentLine: "rgba(244,114,182,0.4)",
    focusRing: "#c084fc",
    iconPlate: "rgba(255,255,255,0.10)",
    iconPlateBorder: "rgba(255,255,255,0.18)",
    iconPlateShadow: "0 2px 6px rgba(0,0,0,0.25)"
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Inter','Segoe UI Variable',system-ui,sans-serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: "tabular numerals",
    weights: [400, 500, 600, 700]
  },
  icons: { strokeWidth: 1.75, viewBox: "0 0 24 24", caps: "round", joins: "round" },
  motion: { cardInMs: 200, tileMs: 140, easing: "cubic-bezier(0.2,0.8,0.2,1)", cardTravelPx: 8 }
};
var LIQUID_GLASS_THEME = {
  schema: 1,
  id: "liquid-glass",
  name: "Liquid Glass",
  mode: "dark",
  default: false,
  description: "iOS-style liquid glass: deep obsidian tinted capsule, bright neon rim light, soft inner glow, large radii, fluid motion. Fully rounded silhouette on a transparent window.",
  layout: {
    edge: "right",
    orientation: "vertical",
    shape: "pill",
    widgetStyle: "tile",
    labels: false,
    inset: "20px",
    dockWidth: "64px",
    dockPadding: "10px 0",
    dockGap: "6px",
    dockRadius: "32px",
    tileSize: "40px",
    tileHeight: "38px",
    valueTileHeight: "46px",
    tileRadius: "12px",
    iconSize: "18px",
    maxItems: 12,
    windowPadding: "40px"
  },
  surface: {
    dockBg: "rgba(10,14,32,0.60)",
    dockBorder: "transparent",
    dockShadow: "inset 0 1px 0 rgba(255,255,255,0.50), inset 0 0 20px rgba(124,240,200,0.12), 0 8px 24px rgba(0,0,0,0.45)",
    backdropBlur: "26px",
    backdropSaturate: "2.0",
    cardBg: "rgba(10,14,32,0.60)",
    cardBorder: "transparent",
    cardShadow: "inset 0 1px 0 rgba(255,255,255,0.50), inset 0 0 20px rgba(124,240,200,0.12), 0 8px 24px rgba(0,0,0,0.45)",
    cardRadius: "16px",
    cardPadding: "20px",
    cardWidth: "320px",
    cardGap: "14px",
    cardOffset: "14px",
    solidFallbackBg: "#0d1326",
    opacity: 0.6,
    highlight: "inset 0 1px 0 rgba(255,255,255,0.50)",
    hover: "rgba(255,255,255,0.08)",
    active: "rgba(255,255,255,0.15)",
    selected: "rgba(255,255,255,0.22)"
  },
  glass: {
    mode: "wallpaper-sampled",
    modeNote: "css-only | wallpaper-sampled (default) | flat",
    tintRgb: "10,14,32",
    tintAlpha: 0.6,
    tintAlphaMin: 0.4,
    tintAlphaMax: 0.7,
    blur: "26px",
    saturate: "2.0",
    rimWidth: "1.5px",
    rim: "linear-gradient(135deg, rgba(124,240,200,0.85), rgba(255,255,255,0.15) 50%, rgba(56,189,248,0.40))",
    sheen: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0))",
    sheenHeight: "130px",
    sheenRadiusRule: "must equal the shape radius; never use a larger bottom radius (CSS scales all radii down and the corners bulge)",
    textShadowWhenLowContrast: "0 1px 2px rgba(0,0,0,0.35)"
  },
  color: {
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.82)",
    tileBg: "transparent",
    tileBgHover: "rgba(255,255,255,0.12)",
    tileBgPressed: "rgba(255,255,255,0.18)",
    tileIcon: "rgba(255,255,255,0.94)",
    tileActiveBg: "linear-gradient(180deg, rgba(255,255,255,0.32), rgba(255,255,255,0.12))",
    tileActiveShadow: "inset 0 1px 0 rgba(255,255,255,0.65), inset 0 0 12px rgba(255,255,255,0.12), 0 4px 12px rgba(6,8,24,0.25)",
    tileActiveIcon: "#ffffff",
    divider: "rgba(255,255,255,0.10)",
    dividerSoft: "rgba(255,255,255,0.06)",
    trackBg: "rgba(255,255,255,0.25)",
    chipBg: "rgba(255,255,255,0.08)",
    chipActiveBg: "rgba(255,255,255,0.16)",
    accent: "#7CF0C8",
    accentGradient: "linear-gradient(135deg, #7CF0C8 0%, #00F0FF 100%)",
    accentInk: "#06231f",
    accentSoft: "rgba(124,240,200,0.16)",
    accentLine: "rgba(124,240,200,0.40)",
    focusRing: "#7CF0C8",
    iconPlate: "rgba(255,255,255,0.12)",
    iconPlateBorder: "rgba(255,255,255,0.20)",
    iconPlateShadow: "0 2px 6px rgba(0,0,0,0.25)"
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Inter','Segoe UI Variable',system-ui,sans-serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: "light-weight (300) large numerals, tabular numerals for live values",
    weights: [300, 400, 500, 600, 700]
  },
  icons: { strokeWidth: 1.75, viewBox: "0 0 24 24", caps: "round", joins: "round" },
  motion: {
    cardInMs: 220,
    tileMs: 160,
    easing: "cubic-bezier(0.2,0.8,0.2,1)",
    cardTravelPx: 10
  }
};
var BUNDLED_THEMES = {
  paper: PAPER_THEME,
  glass: GLASS_THEME,
  nord: NORD_THEME,
  terminal: TERMINAL_THEME,
  rail: RAIL_THEME,
  aurora: AURORA_THEME,
  "liquid-glass": LIQUID_GLASS_THEME
};
var ACCENT_PRESETS = [
  PAPER_THEME.color.accent,
  GLASS_THEME.color.accent,
  NORD_THEME.color.accent,
  TERMINAL_THEME.color.accent,
  RAIL_THEME.color.accent,
  AURORA_THEME.color.accent,
  AURORA_THEME.color.accent2,
  LIQUID_GLASS_THEME.color.accent
];

// src/theme/contrast.ts
function parseColor(input) {
  if (!input || typeof input !== "string") return null;
  const s = input.trim();
  if (s.startsWith("linear-gradient")) {
    const hexMatches = s.match(/#[0-9a-fA-F]{3,6}/g);
    if (hexMatches && hexMatches.length > 0) {
      return parseColor(hexMatches[0]);
    }
  }
  if (s.startsWith("#")) {
    let hex = s.slice(1);
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    if (hex.length === 6 && /^[0-9a-fA-F]{6}$/.test(hex)) {
      const num = parseInt(hex, 16);
      return {
        r: num >> 16 & 255,
        g: num >> 8 & 255,
        b: num & 255,
        a: 1
      };
    }
    return null;
  }
  const rgbaMatch = s.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([0-9.]+))?\s*\)$/i
  );
  if (rgbaMatch) {
    return {
      r: Math.min(255, Math.max(0, Number(rgbaMatch[1]))),
      g: Math.min(255, Math.max(0, Number(rgbaMatch[2]))),
      b: Math.min(255, Math.max(0, Number(rgbaMatch[3]))),
      a: rgbaMatch[4] !== void 0 ? Math.min(1, Math.max(0, Number(rgbaMatch[4]))) : 1
    };
  }
  return null;
}
function compositeOver(fg, bg) {
  const a = fg.a;
  return {
    r: Math.round(fg.r * a + bg.r * (1 - a)),
    g: Math.round(fg.g * a + bg.g * (1 - a)),
    b: Math.round(fg.b * a + bg.b * (1 - a)),
    a: 1
  };
}
function relativeLuminance(color) {
  const toLinear = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const R = toLinear(color.r);
  const G = toLinear(color.g);
  const B = toLinear(color.b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function contrastRatio(c1, c2) {
  const l1 = relativeLuminance(c1);
  const l2 = relativeLuminance(c2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
function resolveOpaqueSurface(surfaceStr, solidFallbackStr, mode = "light") {
  const defaultBackdrop = mode === "dark" ? { r: 14, g: 18, b: 24, a: 1 } : { r: 251, g: 250, b: 247, a: 1 };
  const fallback = solidFallbackStr && parseColor(solidFallbackStr) || defaultBackdrop;
  const parsed = parseColor(surfaceStr);
  if (!parsed) return null;
  if (parsed.a < 1) {
    return compositeOver(parsed, fallback);
  }
  return parsed;
}
function deriveSecondaryAccent(hex) {
  const rgb = parseColor(hex);
  if (!rgb) return hex;
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  const newH = (h * 360 + 24) % 360;
  const newS = Math.min(1, s * 1.05);
  const newL = Math.min(0.68, Math.max(0.36, l * 1.08));
  const hue2rgb = (p2, q2, t) => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p2 + (q2 - p2) * 6 * tNorm;
    if (tNorm < 1 / 2) return q2;
    if (tNorm < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - tNorm) * 6;
    return p2;
  };
  const q = newL < 0.5 ? newL * (1 + newS) : newL + newS - newL * newS;
  const p = 2 * newL - q;
  const r2 = Math.round(hue2rgb(p, q, newH / 360 + 1 / 3) * 255);
  const g2 = Math.round(hue2rgb(p, q, newH / 360) * 255);
  const b2 = Math.round(hue2rgb(p, q, newH / 360 - 1 / 3) * 255);
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
}
function deriveAccentTokens(accentHex, preferredInk) {
  const parsed = parseColor(accentHex);
  if (!parsed) return null;
  const white = { r: 255, g: 255, b: 255, a: 1 };
  const darkInk = { r: 10, g: 16, b: 20, a: 1 };
  const black = { r: 0, g: 0, b: 0, a: 1 };
  let inkHex = "#ffffff";
  let bestRatio = contrastRatio(white, parsed);
  if (preferredInk) {
    const pref = parseColor(preferredInk);
    if (pref) {
      const prefRatio = contrastRatio(pref, parsed);
      if (prefRatio >= 4.5) {
        inkHex = preferredInk;
        bestRatio = prefRatio;
      } else {
        const darkRatio = contrastRatio(darkInk, parsed);
        if (darkRatio > bestRatio) {
          inkHex = "#0a1014";
          bestRatio = darkRatio;
        }
      }
    }
  } else {
    const darkRatio = contrastRatio(darkInk, parsed);
    if (darkRatio > bestRatio) {
      inkHex = "#0a1014";
      bestRatio = darkRatio;
    }
  }
  if (bestRatio < 4.5) {
    const blackRatio = contrastRatio(black, parsed);
    if (blackRatio > bestRatio) {
      inkHex = "#000000";
      bestRatio = blackRatio;
    }
  }
  const secondary = deriveSecondaryAccent(accentHex);
  const accentGradient = `linear-gradient(135deg, ${accentHex} 0%, ${secondary} 100%)`;
  return {
    accent: accentHex,
    accentGradient,
    accentInk: inkHex,
    accentSoft: `rgba(${parsed.r},${parsed.g},${parsed.b},0.14)`,
    accentLine: `rgba(${parsed.r},${parsed.g},${parsed.b},0.38)`,
    focusRing: accentHex,
    contrast: bestRatio
  };
}

// src/theme/flattener.ts
function camelToKebab(key) {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
var IGNORED_KEYS = {
  layout: /* @__PURE__ */ new Set(["dockWidthNote"]),
  glass: /* @__PURE__ */ new Set(["modeNote", "sheenRadiusRule"]),
  color: /* @__PURE__ */ new Set(["activeEdgeIndicator"]),
  type: /* @__PURE__ */ new Set(["displayUse", "weights"]),
  icons: /* @__PURE__ */ new Set(["viewBox", "caps", "joins"])
};
function flattenThemeToCssVars(theme) {
  const vars = {};
  const groups = [
    "layout",
    "surface",
    "glass",
    "color",
    "type",
    "icons",
    "motion"
  ];
  vars["--flank-glass-display"] = theme.glass ? "block" : "none";
  for (const group of groups) {
    const groupObj = theme[group];
    if (!groupObj || typeof groupObj !== "object") continue;
    const ignored = IGNORED_KEYS[group] ?? /* @__PURE__ */ new Set();
    for (const [rawKey, rawVal] of Object.entries(groupObj)) {
      if (rawVal === void 0 || rawVal === null || ignored.has(rawKey)) continue;
      if (group === "surface") {
        if (rawKey === "surfaceHover" || rawKey === "hover") {
          vars["--flank-surface-hover"] = String(rawVal);
          continue;
        }
        if (rawKey === "surfaceActive" || rawKey === "active") {
          vars["--flank-surface-active"] = String(rawVal);
          continue;
        }
        if (rawKey === "surfaceSelected" || rawKey === "selected") {
          vars["--flank-surface-selected"] = String(rawVal);
          continue;
        }
      }
      const varName = `--flank-${group}-${camelToKebab(rawKey)}`;
      if (group === "layout" && rawKey === "labels") {
        vars[varName] = rawVal ? "1" : "0";
      } else if (group === "layout" && rawKey === "windowPadding") {
        vars[varName] = typeof rawVal === "number" ? `${rawVal}px` : String(rawVal).endsWith("px") ? String(rawVal) : `${rawVal}px`;
      } else if (group === "motion" && (rawKey === "cardInMs" || rawKey === "tileMs")) {
        vars[varName] = typeof rawVal === "number" ? `${rawVal}ms` : String(rawVal);
      } else if (group === "motion" && rawKey === "cardTravelPx") {
        vars[varName] = typeof rawVal === "number" ? `${rawVal}px` : String(rawVal);
      } else {
        vars[varName] = String(rawVal);
      }
    }
  }
  return vars;
}

// src/theme/validator.ts
var ALLOWED_FONT_FAMILIES = /* @__PURE__ */ new Set([
  "inter",
  "fraunces",
  "jetbrains mono",
  "segoe ui variable",
  "segoe ui",
  "cascadia mono",
  "consolas",
  "georgia",
  "system-ui",
  "sans-serif",
  "serif",
  "monospace"
]);
function parsePx(val) {
  const m = String(val).trim().match(/^(-?\d+(?:\.\d+)?)px$/i);
  return m ? Number(m[1]) : null;
}
function getShadowMaxReach(shadowStr) {
  if (!shadowStr || typeof shadowStr !== "string" || shadowStr.trim() === "none") return 0;
  const parts = shadowStr.split(/,(?![^(]*\))/);
  let maxReach = 0;
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || trimmed === "none" || trimmed.includes("inset")) {
      continue;
    }
    const tokens = trimmed.split(/\s+/).filter((t) => !t.startsWith("rgb") && !t.startsWith("#") && !t.startsWith("hsl"));
    const lengths = [];
    for (const t of tokens) {
      const m = t.match(/^(-?\d+(?:\.\d+)?)(?:px)?$/i);
      if (m) {
        lengths.push(Number(m[1]));
      }
    }
    if (lengths.length >= 2) {
      const offsetY = Math.abs(lengths[1]);
      const blur = lengths.length >= 3 ? Math.abs(lengths[2]) : 0;
      const reach = offsetY + blur;
      if (reach > maxReach) {
        maxReach = reach;
      }
    }
  }
  return maxReach;
}
function containsUnsafeString(obj) {
  if (typeof obj === "string") {
    const lower = obj.toLowerCase();
    if (lower.includes("http://") || lower.includes("https://") || lower.includes("javascript:") || lower.includes("<script") || lower.includes("@import") || lower.includes("expression(")) {
      return obj;
    }
    return null;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const hit = containsUnsafeString(item);
      if (hit) return hit;
    }
  } else if (obj && typeof obj === "object") {
    for (const val of Object.values(obj)) {
      const hit = containsUnsafeString(val);
      if (hit) return hit;
    }
  }
  return null;
}
function validateFontStack(stack) {
  if (!stack || typeof stack !== "string") return false;
  const parts = stack.split(",").map((p) => p.trim().replace(/^['"]|['"]$/g, "").toLowerCase()).filter(Boolean);
  if (parts.length === 0) return false;
  return parts.every((f) => ALLOWED_FONT_FAMILIES.has(f));
}
function normalizeThemeWithPaperFallback(raw) {
  const layoutRaw = raw.layout && typeof raw.layout === "object" ? raw.layout : {};
  const surfaceRaw = raw.surface && typeof raw.surface === "object" ? raw.surface : {};
  const colorRaw = raw.color && typeof raw.color === "object" ? raw.color : {};
  const typeRaw = raw.type && typeof raw.type === "object" ? raw.type : {};
  const iconsRaw = raw.icons && typeof raw.icons === "object" ? raw.icons : {};
  const motionRaw = raw.motion && typeof raw.motion === "object" ? raw.motion : {};
  const theme = {
    schema: typeof raw.schema === "number" ? raw.schema : PAPER_THEME.schema,
    id: typeof raw.id === "string" && raw.id.trim() ? raw.id.trim() : PAPER_THEME.id,
    name: typeof raw.name === "string" && raw.name.trim() ? raw.name.trim() : PAPER_THEME.name,
    mode: raw.mode === "dark" || raw.mode === "light" ? raw.mode : PAPER_THEME.mode,
    default: typeof raw.default === "boolean" ? raw.default : false,
    description: typeof raw.description === "string" ? raw.description : PAPER_THEME.description,
    layout: {
      edge: layoutRaw.edge === "top" ? "right" : ["left", "right"].includes(layoutRaw.edge) ? layoutRaw.edge : PAPER_THEME.layout.edge,
      orientation: ["vertical", "horizontal"].includes(layoutRaw.orientation) ? layoutRaw.orientation : PAPER_THEME.layout.orientation,
      shape: ["pill", "strip", "rail", "capsule"].includes(layoutRaw.shape) ? layoutRaw.shape : PAPER_THEME.layout.shape,
      widgetStyle: ["tile", "row", "value", "pill"].includes(layoutRaw.widgetStyle) ? layoutRaw.widgetStyle : PAPER_THEME.layout.widgetStyle,
      labels: typeof layoutRaw.labels === "boolean" ? layoutRaw.labels : PAPER_THEME.layout.labels,
      inset: typeof layoutRaw.inset === "string" ? layoutRaw.inset : PAPER_THEME.layout.inset,
      dockWidth: typeof layoutRaw.dockWidth === "string" ? layoutRaw.dockWidth : PAPER_THEME.layout.dockWidth,
      ...typeof layoutRaw.dockHeight === "string" ? { dockHeight: layoutRaw.dockHeight } : {},
      dockPadding: typeof layoutRaw.dockPadding === "string" ? layoutRaw.dockPadding : PAPER_THEME.layout.dockPadding,
      dockGap: typeof layoutRaw.dockGap === "string" ? layoutRaw.dockGap : PAPER_THEME.layout.dockGap,
      dockRadius: typeof layoutRaw.dockRadius === "string" ? layoutRaw.dockRadius : PAPER_THEME.layout.dockRadius,
      tileSize: typeof layoutRaw.tileSize === "string" ? layoutRaw.tileSize : PAPER_THEME.layout.tileSize,
      tileRadius: typeof layoutRaw.tileRadius === "string" ? layoutRaw.tileRadius : PAPER_THEME.layout.tileRadius,
      iconSize: typeof layoutRaw.iconSize === "string" ? layoutRaw.iconSize : PAPER_THEME.layout.iconSize,
      ...typeof layoutRaw.hitAreaMin === "string" ? { hitAreaMin: layoutRaw.hitAreaMin } : {},
      ...typeof layoutRaw.tileHeight === "string" ? { tileHeight: layoutRaw.tileHeight } : {},
      ...typeof layoutRaw.valueTileHeight === "string" ? { valueTileHeight: layoutRaw.valueTileHeight } : {},
      windowPadding: typeof layoutRaw.windowPadding === "number" || typeof layoutRaw.windowPadding === "string" ? typeof layoutRaw.windowPadding === "number" ? `${layoutRaw.windowPadding}px` : layoutRaw.windowPadding : PAPER_THEME.layout.windowPadding ?? "64px",
      maxItems: typeof layoutRaw.maxItems === "number" ? layoutRaw.maxItems : PAPER_THEME.layout.maxItems
    },
    surface: {
      dockBg: typeof surfaceRaw.dockBg === "string" ? surfaceRaw.dockBg : PAPER_THEME.surface.dockBg,
      dockBorder: typeof surfaceRaw.dockBorder === "string" ? surfaceRaw.dockBorder : PAPER_THEME.surface.dockBorder,
      dockShadow: typeof surfaceRaw.dockShadow === "string" ? surfaceRaw.dockShadow : PAPER_THEME.surface.dockShadow,
      backdropBlur: typeof surfaceRaw.backdropBlur === "string" ? surfaceRaw.backdropBlur : PAPER_THEME.surface.backdropBlur,
      backdropSaturate: typeof surfaceRaw.backdropSaturate === "string" ? surfaceRaw.backdropSaturate : PAPER_THEME.surface.backdropSaturate,
      cardBg: typeof surfaceRaw.cardBg === "string" ? surfaceRaw.cardBg : PAPER_THEME.surface.cardBg,
      cardBorder: typeof surfaceRaw.cardBorder === "string" ? surfaceRaw.cardBorder : PAPER_THEME.surface.cardBorder,
      cardShadow: typeof surfaceRaw.cardShadow === "string" ? surfaceRaw.cardShadow : PAPER_THEME.surface.cardShadow,
      cardRadius: typeof surfaceRaw.cardRadius === "string" ? surfaceRaw.cardRadius : PAPER_THEME.surface.cardRadius,
      cardPadding: typeof surfaceRaw.cardPadding === "string" ? surfaceRaw.cardPadding : PAPER_THEME.surface.cardPadding,
      cardWidth: typeof surfaceRaw.cardWidth === "string" ? surfaceRaw.cardWidth : PAPER_THEME.surface.cardWidth,
      cardGap: typeof surfaceRaw.cardGap === "string" ? surfaceRaw.cardGap : PAPER_THEME.surface.cardGap,
      cardOffset: typeof surfaceRaw.cardOffset === "string" ? surfaceRaw.cardOffset : PAPER_THEME.surface.cardOffset,
      ...typeof surfaceRaw.solidFallbackBg === "string" ? { solidFallbackBg: surfaceRaw.solidFallbackBg } : {},
      opacity: typeof surfaceRaw.opacity === "number" ? surfaceRaw.opacity : PAPER_THEME.surface.opacity ?? 1,
      highlight: typeof surfaceRaw.highlight === "string" ? surfaceRaw.highlight : PAPER_THEME.surface.highlight || "none",
      hover: typeof surfaceRaw.hover === "string" ? surfaceRaw.hover : typeof surfaceRaw.surfaceHover === "string" ? surfaceRaw.surfaceHover : PAPER_THEME.surface.hover || "#f4f0e8",
      active: typeof surfaceRaw.active === "string" ? surfaceRaw.active : typeof surfaceRaw.surfaceActive === "string" ? surfaceRaw.surfaceActive : PAPER_THEME.surface.active || "#ebe5d8",
      selected: typeof surfaceRaw.selected === "string" ? surfaceRaw.selected : typeof surfaceRaw.surfaceSelected === "string" ? surfaceRaw.surfaceSelected : PAPER_THEME.surface.selected || "#e4ded0"
    },
    color: {
      text: typeof colorRaw.text === "string" ? colorRaw.text : PAPER_THEME.color.text,
      textMuted: typeof colorRaw.textMuted === "string" ? colorRaw.textMuted : PAPER_THEME.color.textMuted,
      tileBg: typeof colorRaw.tileBg === "string" ? colorRaw.tileBg : PAPER_THEME.color.tileBg,
      tileBgHover: typeof colorRaw.tileBgHover === "string" ? colorRaw.tileBgHover : PAPER_THEME.color.tileBgHover,
      tileBgPressed: typeof colorRaw.tileBgPressed === "string" ? colorRaw.tileBgPressed : PAPER_THEME.color.tileBgPressed,
      tileIcon: typeof colorRaw.tileIcon === "string" ? colorRaw.tileIcon : PAPER_THEME.color.tileIcon,
      tileActiveBg: typeof colorRaw.tileActiveBg === "string" ? colorRaw.tileActiveBg : PAPER_THEME.color.tileActiveBg,
      tileActiveIcon: typeof colorRaw.tileActiveIcon === "string" ? colorRaw.tileActiveIcon : PAPER_THEME.color.tileActiveIcon,
      divider: typeof colorRaw.divider === "string" ? colorRaw.divider : PAPER_THEME.color.divider,
      dividerSoft: typeof colorRaw.dividerSoft === "string" ? colorRaw.dividerSoft : PAPER_THEME.color.dividerSoft,
      trackBg: typeof colorRaw.trackBg === "string" ? colorRaw.trackBg : PAPER_THEME.color.trackBg,
      accent: typeof colorRaw.accent === "string" ? colorRaw.accent : PAPER_THEME.color.accent,
      ...typeof colorRaw.accent2 === "string" ? { accent2: colorRaw.accent2 } : {},
      ...typeof colorRaw.accentCyan === "string" ? { accentCyan: colorRaw.accentCyan } : {},
      ...typeof colorRaw.accentPink === "string" ? { accentPink: colorRaw.accentPink } : {},
      ...typeof colorRaw.accentGradient === "string" ? { accentGradient: colorRaw.accentGradient } : {},
      ...typeof colorRaw.tileActiveShadow === "string" ? { tileActiveShadow: colorRaw.tileActiveShadow } : {},
      ...typeof colorRaw.chipBg === "string" ? { chipBg: colorRaw.chipBg } : {},
      ...typeof colorRaw.chipActiveBg === "string" ? { chipActiveBg: colorRaw.chipActiveBg } : {},
      accentInk: typeof colorRaw.accentInk === "string" ? colorRaw.accentInk : PAPER_THEME.color.accentInk,
      accentSoft: typeof colorRaw.accentSoft === "string" ? colorRaw.accentSoft : PAPER_THEME.color.accentSoft,
      accentLine: typeof colorRaw.accentLine === "string" ? colorRaw.accentLine : PAPER_THEME.color.accentLine,
      focusRing: typeof colorRaw.focusRing === "string" ? colorRaw.focusRing : PAPER_THEME.color.focusRing
    },
    type: {
      ui: typeof typeRaw.ui === "string" ? typeRaw.ui : PAPER_THEME.type.ui,
      display: typeof typeRaw.display === "string" ? typeRaw.display : PAPER_THEME.type.display,
      mono: typeof typeRaw.mono === "string" ? typeRaw.mono : PAPER_THEME.type.mono,
      ...typeof typeRaw.displayUse === "string" ? { displayUse: typeRaw.displayUse } : {},
      ...Array.isArray(typeRaw.weights) ? { weights: typeRaw.weights } : {}
    },
    icons: {
      strokeWidth: typeof iconsRaw.strokeWidth === "number" ? iconsRaw.strokeWidth : PAPER_THEME.icons.strokeWidth,
      viewBox: typeof iconsRaw.viewBox === "string" ? iconsRaw.viewBox : PAPER_THEME.icons.viewBox,
      caps: typeof iconsRaw.caps === "string" ? iconsRaw.caps : PAPER_THEME.icons.caps,
      joins: typeof iconsRaw.joins === "string" ? iconsRaw.joins : PAPER_THEME.icons.joins
    },
    motion: {
      cardInMs: typeof motionRaw.cardInMs === "number" ? motionRaw.cardInMs : PAPER_THEME.motion.cardInMs,
      tileMs: typeof motionRaw.tileMs === "number" ? motionRaw.tileMs : PAPER_THEME.motion.tileMs,
      easing: typeof motionRaw.easing === "string" ? motionRaw.easing : PAPER_THEME.motion.easing,
      cardTravelPx: typeof motionRaw.cardTravelPx === "number" ? motionRaw.cardTravelPx : PAPER_THEME.motion.cardTravelPx,
      ...typeof motionRaw.springEasing === "string" ? { springEasing: motionRaw.springEasing } : {},
      ...typeof motionRaw.cardScaleFrom === "number" ? { cardScaleFrom: motionRaw.cardScaleFrom } : {},
      ...typeof motionRaw.tilePressScale === "number" ? { tilePressScale: motionRaw.tilePressScale } : {}
    },
    ...raw.glass && typeof raw.glass === "object" ? {
      glass: {
        mode: ["wallpaper-sampled", "flat", "css-only"].includes(raw.glass.mode) ? raw.glass.mode : "wallpaper-sampled",
        ...typeof raw.glass.modeNote === "string" ? { modeNote: raw.glass.modeNote } : {},
        tintRgb: typeof raw.glass.tintRgb === "string" ? raw.glass.tintRgb : "16,20,42",
        tintAlpha: typeof raw.glass.tintAlpha === "number" ? raw.glass.tintAlpha : 0.42,
        tintAlphaMin: typeof raw.glass.tintAlphaMin === "number" ? raw.glass.tintAlphaMin : 0.34,
        tintAlphaMax: typeof raw.glass.tintAlphaMax === "number" ? raw.glass.tintAlphaMax : 0.7,
        blur: typeof raw.glass.blur === "string" ? raw.glass.blur : "30px",
        saturate: typeof raw.glass.saturate === "string" || typeof raw.glass.saturate === "number" ? String(raw.glass.saturate) : "1.8",
        rimWidth: typeof raw.glass.rimWidth === "string" ? raw.glass.rimWidth : "1.5px",
        rim: typeof raw.glass.rim === "string" ? raw.glass.rim : "",
        sheen: typeof raw.glass.sheen === "string" ? raw.glass.sheen : "",
        sheenHeight: typeof raw.glass.sheenHeight === "string" ? raw.glass.sheenHeight : "130px",
        ...typeof raw.glass.sheenRadiusRule === "string" ? { sheenRadiusRule: raw.glass.sheenRadiusRule } : {},
        ...typeof raw.glass.textShadowWhenLowContrast === "string" ? { textShadowWhenLowContrast: raw.glass.textShadowWhenLowContrast } : {}
      }
    } : {}
  };
  return theme;
}
function validateTheme(rawInput) {
  const errors = [];
  const failingPairs = [];
  if (!rawInput || typeof rawInput !== "object" || Array.isArray(rawInput)) {
    return {
      valid: false,
      theme: structuredClone(PAPER_THEME),
      fellBackToPaper: true,
      errors: ["Theme must be a JSON object."],
      failingPairs: []
    };
  }
  const raw = rawInput;
  const unsafeHit = containsUnsafeString(raw);
  if (unsafeHit) {
    errors.push(`Theme contains disallowed remote URL or script expression: "${unsafeHit}"`);
  }
  if (raw.schema !== void 0 && raw.schema !== 1) {
    errors.push(`Unsupported theme schema version: ${String(raw.schema)} (expected 1)`);
  }
  const candidate = normalizeThemeWithPaperFallback(raw);
  if (!validateFontStack(candidate.type.ui)) {
    errors.push(`Invalid or non-bundled UI font stack: ${candidate.type.ui}`);
  }
  if (!validateFontStack(candidate.type.display)) {
    errors.push(`Invalid or non-bundled Display font stack: ${candidate.type.display}`);
  }
  if (!validateFontStack(candidate.type.mono)) {
    errors.push(`Invalid or non-bundled Mono font stack: ${candidate.type.mono}`);
  }
  const tilePx = parsePx(candidate.layout.tileSize);
  if (tilePx === null || tilePx < 28 || tilePx > 56) {
    errors.push(`tileSize (${candidate.layout.tileSize}) must be between 28px and 56px.`);
  }
  if (candidate.layout.dockWidth !== "auto") {
    const dockW = parsePx(candidate.layout.dockWidth);
    if (dockW === null || dockW < 32 || dockW > 260) {
      errors.push(`dockWidth (${candidate.layout.dockWidth}) must be between 32px and 260px, or "auto".`);
    }
  }
  const cardW = parsePx(candidate.surface.cardWidth);
  if (cardW === null || cardW < 240 || cardW > 360) {
    errors.push(`cardWidth (${candidate.surface.cardWidth}) must be between 240px and 360px.`);
  }
  if (candidate.layout.maxItems < 1 || candidate.layout.maxItems > 12) {
    errors.push(`maxItems (${candidate.layout.maxItems}) must be between 1 and 12.`);
  }
  const windowPaddingRaw = candidate.layout.windowPadding;
  const windowPaddingPx = parsePx(
    typeof windowPaddingRaw === "number" ? `${windowPaddingRaw}px` : String(windowPaddingRaw)
  );
  if (windowPaddingPx === null || windowPaddingPx < 0) {
    errors.push(`layout.windowPadding (${String(windowPaddingRaw)}) must be a valid pixel dimension.`);
  } else {
    const dockReach = getShadowMaxReach(candidate.surface.dockShadow);
    if (dockReach > windowPaddingPx) {
      errors.push(
        `dockShadow reach (${dockReach}px) exceeds layout.windowPadding (${windowPaddingPx}px). Rule: offsetY + blur <= windowPadding.`
      );
    }
    const cardReach = getShadowMaxReach(candidate.surface.cardShadow);
    if (cardReach > windowPaddingPx) {
      errors.push(
        `cardShadow reach (${cardReach}px) exceeds layout.windowPadding (${windowPaddingPx}px). Rule: offsetY + blur <= windowPadding.`
      );
    }
  }
  if (candidate.glass) {
    if (!["wallpaper-sampled", "flat", "css-only"].includes(candidate.glass.mode)) {
      errors.push(`glass.mode must be one of: wallpaper-sampled, flat, css-only.`);
    }
    if (candidate.glass.tintAlpha < 0 || candidate.glass.tintAlpha > 1) {
      errors.push(`glass.tintAlpha (${candidate.glass.tintAlpha}) must be between 0 and 1.`);
    }
    if (candidate.glass.tintAlphaMin > candidate.glass.tintAlphaMax) {
      errors.push(
        `glass.tintAlphaMin (${candidate.glass.tintAlphaMin}) cannot exceed glass.tintAlphaMax (${candidate.glass.tintAlphaMax}).`
      );
    }
  }
  const dockSurface = resolveOpaqueSurface(
    candidate.surface.dockBg,
    candidate.surface.solidFallbackBg,
    candidate.mode
  );
  const cardSurface = resolveOpaqueSurface(
    candidate.surface.cardBg,
    candidate.surface.solidFallbackBg,
    candidate.mode
  );
  const textColor = parseColor(candidate.color.text);
  const textMutedColor = parseColor(candidate.color.textMuted);
  const accentColor = parseColor(candidate.color.accent);
  const accentInkColor = parseColor(candidate.color.accentInk);
  if (!dockSurface || !cardSurface || !textColor || !textMutedColor || !accentColor || !accentInkColor) {
    errors.push("One or more required color tokens could not be parsed.");
  } else {
    const textDockRatio = contrastRatio(textColor, dockSurface);
    if (textDockRatio < 4.5) {
      failingPairs.push({
        pair: "text on dockBg",
        foreground: candidate.color.text,
        background: candidate.surface.dockBg,
        ratio: Number(textDockRatio.toFixed(2)),
        required: 4.5
      });
    }
    const textCardRatio = contrastRatio(textColor, cardSurface);
    if (textCardRatio < 4.5) {
      failingPairs.push({
        pair: "text on cardBg",
        foreground: candidate.color.text,
        background: candidate.surface.cardBg,
        ratio: Number(textCardRatio.toFixed(2)),
        required: 4.5
      });
    }
    const mutedDockRatio = contrastRatio(textMutedColor, dockSurface);
    if (mutedDockRatio < 4.5) {
      failingPairs.push({
        pair: "textMuted on dockBg",
        foreground: candidate.color.textMuted,
        background: candidate.surface.dockBg,
        ratio: Number(mutedDockRatio.toFixed(2)),
        required: 4.5
      });
    }
    const mutedCardRatio = contrastRatio(textMutedColor, cardSurface);
    if (mutedCardRatio < 4.5) {
      failingPairs.push({
        pair: "textMuted on cardBg",
        foreground: candidate.color.textMuted,
        background: candidate.surface.cardBg,
        ratio: Number(mutedCardRatio.toFixed(2)),
        required: 4.5
      });
    }
    let effectiveAccentRatio = contrastRatio(accentInkColor, accentColor);
    if (effectiveAccentRatio < 4.5 && candidate.color.tileActiveBg.startsWith("linear-gradient")) {
      const gradStop = parseColor(candidate.color.tileActiveBg);
      if (gradStop) {
        effectiveAccentRatio = Math.max(effectiveAccentRatio, contrastRatio(accentInkColor, gradStop));
      }
    }
    if (effectiveAccentRatio < 4.5) {
      failingPairs.push({
        pair: "accentInk on accent",
        foreground: candidate.color.accentInk,
        background: candidate.color.accent,
        ratio: Number(effectiveAccentRatio.toFixed(2)),
        required: 4.5
      });
    }
  }
  if (failingPairs.length > 0) {
    for (const fp of failingPairs) {
      errors.push(
        `Contrast check failed for ${fp.pair} (${fp.foreground} on ${fp.background}): ${fp.ratio}:1 < ${fp.required}:1`
      );
    }
  }
  if (errors.length > 0) {
    return {
      valid: false,
      theme: structuredClone(PAPER_THEME),
      fellBackToPaper: true,
      errors,
      failingPairs
    };
  }
  return {
    valid: true,
    theme: candidate,
    fellBackToPaper: false,
    errors: [],
    failingPairs: []
  };
}

// src/theme/engine.ts
var ThemeEngine = class {
  currentTheme = structuredClone(PAPER_THEME);
  customThemes = /* @__PURE__ */ new Map();
  logs = [];
  listeners = [];
  constructor() {
    for (const [id, raw] of Object.entries(BUNDLED_THEMES)) {
      const res = validateTheme(raw);
      if (res.valid) {
        this.customThemes.set(id, res.theme);
      } else {
        this.log("error", `Bundled theme "${id}" failed validation; using Paper fallback.`, res.errors);
      }
    }
  }
  log(level, message, details) {
    const entry = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      level,
      message,
      details
    };
    this.logs.push(entry);
    if (this.logs.length > 100) {
      this.logs.shift();
    }
  }
  getLogs() {
    return [...this.logs];
  }
  getAvailableThemes() {
    return Array.from(this.customThemes.values());
  }
  getCurrentTheme() {
    return this.currentTheme;
  }
  getCurrentCssVars() {
    return flattenThemeToCssVars(this.currentTheme);
  }
  onChange(cb) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }
  /**
   * Load and validate an external or bundled theme JSON object.
   * On any validation or contrast failure, silently falls back to Paper and logs locally.
   */
  applyThemeObject(rawTheme, overrides) {
    const candidate = structuredClone(rawTheme);
    if (candidate && typeof candidate === "object") {
      let edgeOverride = overrides?.edge;
      if (edgeOverride === "top") {
        edgeOverride = "right";
      }
      if (edgeOverride && ["left", "right"].includes(edgeOverride)) {
        candidate.layout = { ...candidate.layout || {}, edge: edgeOverride, orientation: "vertical" };
      }
      if (overrides?.accent) {
        const derived = deriveAccentTokens(overrides.accent);
        if (derived) {
          candidate.color = {
            ...candidate.color || {},
            accent: derived.accent,
            accentGradient: derived.accentGradient,
            accentInk: derived.accentInk,
            accentSoft: derived.accentSoft,
            accentLine: derived.accentLine,
            focusRing: derived.focusRing
          };
        }
      }
    }
    let res = validateTheme(candidate);
    if (!res.valid && overrides?.accent) {
      this.log("warn", `Accent override "${overrides.accent}" failed contrast validation; keeping theme default accent.`, {
        errors: res.errors,
        failingPairs: res.failingPairs
      });
      return this.applyThemeObject(rawTheme, overrides.edge ? { edge: overrides.edge } : void 0);
    }
    if (!res.valid) {
      this.log("warn", `Theme validation failed; falling back to Paper.`, {
        errors: res.errors,
        failingPairs: res.failingPairs
      });
    } else {
      this.customThemes.set(res.theme.id, res.theme);
      this.log("info", `Applied theme "${res.theme.name}" (${res.theme.id}).`);
    }
    this.currentTheme = res.theme;
    const vars = flattenThemeToCssVars(this.currentTheme);
    this.writeToDom(this.currentTheme, vars);
    for (const listener of this.listeners) {
      listener(this.currentTheme, vars);
    }
    return res;
  }
  /**
   * Switch to a registered theme by ID (e.g., "paper", "glass", "terminal", "rail", "aurora").
   */
  switchTheme(themeId, overrides) {
    const normalizedId = themeId.replace(/_/g, "-");
    const base = this.customThemes.get(themeId) ?? this.customThemes.get(normalizedId) ?? BUNDLED_THEMES[themeId] ?? BUNDLED_THEMES[normalizedId];
    if (!base) {
      this.log("warn", `Unknown theme ID "${themeId}"; falling back to Paper.`);
      return this.applyThemeObject(PAPER_THEME, overrides);
    }
    return this.applyThemeObject(base, overrides);
  }
  /**
   * Revert immediately to the default Paper theme.
   */
  revertToPaper() {
    return this.applyThemeObject(PAPER_THEME);
  }
  /**
   * Write `--flank-<group>-<token>` CSS custom properties directly onto target element (defaults to document.documentElement).
   */
  writeToDom(theme = this.currentTheme, vars = flattenThemeToCssVars(theme), rootEl) {
    const el = rootEl ?? (typeof document !== "undefined" ? document.documentElement : null);
    if (!el) return;
    el.setAttribute("data-theme", theme.id);
    el.setAttribute("data-mode", theme.mode);
    el.setAttribute("data-edge", theme.layout.edge);
    el.setAttribute("data-orientation", theme.layout.orientation);
    el.setAttribute("data-shape", theme.layout.shape);
    el.setAttribute("data-widget-style", theme.layout.widgetStyle);
    el.setAttribute("data-labels", theme.layout.labels ? "true" : "false");
    const style = el.style;
    const toRemove = [];
    for (let i = 0; i < style.length; i++) {
      const prop = style.item(i);
      if (prop && prop.startsWith("--flank-")) {
        toRemove.push(prop);
      }
    }
    for (const prop of toRemove) {
      style.removeProperty(prop);
    }
    for (const [k, v] of Object.entries(vars)) {
      style.setProperty(k, v);
    }
  }
};

// src/providers/sample.ts
function createSampleState() {
  return {
    dataSource: "sample",
    themeId: "paper",
    edgeOverride: null,
    accentOverride: null,
    reserveScreenSpace: false,
    autostart: false,
    activeWidget: null,
    activeFullWindow: null,
    widgetsCollapsed: false,
    items: [
      {
        id: "app-terminal",
        group: "apps",
        kind: "app",
        label: "Terminal",
        shortCode: "01",
        icon: "terminal",
        target: "wt.exe",
        shortcut: "Alt+1",
        enabled: true
      },
      {
        id: "app-browser",
        group: "apps",
        kind: "app",
        label: "Browser",
        shortCode: "02",
        icon: "browser",
        target: "https://www.google.com",
        shortcut: "Alt+2",
        enabled: true
      },
      {
        id: "app-files",
        group: "apps",
        kind: "app",
        label: "Files",
        shortCode: "03",
        icon: "files",
        target: "explorer.exe",
        shortcut: "Alt+3",
        enabled: true
      },
      {
        id: "app-notes",
        group: "apps",
        kind: "app",
        label: "Notes",
        shortCode: "04",
        icon: "notes",
        target: "notepad.exe",
        shortcut: "Alt+4",
        enabled: true
      },
      {
        id: "widget-clock",
        group: "widgets",
        kind: "widget",
        label: "World clock",
        shortCode: "clk",
        icon: "clock",
        widgetKind: "clock",
        shortcut: "Alt+C",
        enabled: true
      },
      {
        id: "widget-weather",
        group: "widgets",
        kind: "widget",
        label: "Weather",
        shortCode: "wthr",
        icon: "sun",
        widgetKind: "weather",
        shortcut: "Alt+W",
        enabled: true
      },
      {
        id: "widget-battery",
        group: "widgets",
        kind: "widget",
        label: "Laptop battery",
        shortCode: "bat",
        icon: "battery",
        widgetKind: "battery",
        shortcut: "Alt+B",
        enabled: true
      },
      {
        id: "widget-audio",
        group: "widgets",
        kind: "widget",
        label: "Audio & mic mixer",
        shortCode: "vol",
        icon: "volume",
        widgetKind: "audio",
        shortcut: "Alt+U",
        enabled: true
      },
      {
        id: "widget-focus",
        group: "widgets",
        kind: "widget",
        label: "Focus timer",
        shortCode: "fcs",
        icon: "focus",
        widgetKind: "focus",
        shortcut: "Alt+F",
        enabled: true
      },
      {
        id: "widget-bluetooth",
        group: "widgets",
        kind: "widget",
        label: "Bluetooth & peripherals",
        shortCode: "bt",
        icon: "bluetooth",
        widgetKind: "bluetooth",
        shortcut: "Alt+E",
        enabled: true
      },
      {
        id: "widget-calendar",
        group: "widgets",
        kind: "widget",
        label: "Agenda & meetings",
        shortCode: "cal",
        icon: "calendar",
        widgetKind: "calendar",
        shortcut: "Alt+M",
        enabled: true
      },
      {
        id: "widget-clipboard",
        group: "widgets",
        kind: "widget",
        label: "Clipboard history",
        shortCode: "clip",
        icon: "clipboard",
        widgetKind: "clipboard",
        shortcut: "Ctrl+Alt+V",
        enabled: false
      },
      {
        id: "widget-stats",
        group: "widgets",
        kind: "widget",
        label: "System diagnostics",
        shortCode: "cpu",
        icon: "cpu",
        widgetKind: "stats",
        shortcut: "Alt+S",
        enabled: false
      },
      {
        id: "widget-player",
        group: "widgets",
        kind: "widget",
        label: "Mini player",
        shortCode: "play",
        icon: "equalizer",
        widgetKind: "player",
        shortcut: "Alt+P",
        enabled: true
      },
      {
        id: "widget-scratchpad",
        group: "widgets",
        kind: "widget",
        label: "Quick scratchpad",
        shortCode: "pad",
        icon: "scratchpad",
        widgetKind: "scratchpad",
        shortcut: "Alt+N",
        enabled: false
      },
      {
        id: "widget-colorpicker",
        group: "widgets",
        kind: "widget",
        label: "Color picker",
        shortCode: "clr",
        icon: "eyedropper",
        widgetKind: "colorpicker",
        shortcut: "Alt+K",
        enabled: false
      },
      {
        id: "widget-network",
        group: "widgets",
        kind: "widget",
        label: "Network & ports",
        shortCode: "net",
        icon: "wifi",
        widgetKind: "network",
        shortcut: "Alt+I",
        enabled: false
      },
      {
        id: "widget-tasks",
        group: "widgets",
        kind: "widget",
        label: "Quick to-do",
        shortCode: "todo",
        icon: "check-square",
        widgetKind: "tasks",
        shortcut: "Alt+T",
        enabled: true
      },
      {
        id: "widget-calculator",
        group: "widgets",
        kind: "widget",
        label: "Smart calculator",
        shortCode: "calc",
        icon: "calculator",
        widgetKind: "calculator",
        shortcut: "Alt+Q",
        enabled: true
      },
      {
        id: "widget-storage",
        group: "widgets",
        kind: "widget",
        label: "Storage & drives",
        shortCode: "dsk",
        icon: "hard-drive",
        widgetKind: "storage",
        shortcut: "Alt+D",
        enabled: true
      },
      {
        id: "widget-display",
        group: "widgets",
        kind: "widget",
        label: "Display & brightness",
        shortCode: "dsp",
        icon: "sun",
        widgetKind: "display",
        shortcut: "Alt+L",
        enabled: true
      },
      {
        id: "widget-privacy",
        group: "widgets",
        kind: "widget",
        label: "Privacy guard",
        shortCode: "prv",
        icon: "shield",
        widgetKind: "privacy",
        shortcut: "Alt+Y",
        enabled: true
      },
      {
        id: "widget-ambient",
        group: "widgets",
        kind: "widget",
        label: "Focus ambiance",
        shortCode: "amb",
        icon: "waves",
        widgetKind: "ambient",
        shortcut: "Alt+A",
        enabled: true
      },
      {
        id: "widget-runner",
        group: "widgets",
        kind: "widget",
        label: "Command runner",
        shortCode: "run",
        icon: "terminal",
        widgetKind: "runner",
        shortcut: "Alt+R",
        enabled: true
      },
      {
        id: "widget-gpu",
        group: "widgets",
        kind: "widget",
        label: "GPU diagnostics",
        shortCode: "gpu",
        icon: "activity",
        widgetKind: "gpu",
        shortcut: "Alt+G",
        enabled: true
      },
      {
        id: "widget-github",
        group: "widgets",
        kind: "widget",
        label: "GitHub activity",
        shortCode: "git",
        icon: "github",
        widgetKind: "github",
        shortcut: "Alt+J",
        enabled: true
      }
    ],
    clipboard: {
      count: 24,
      maxItems: 40,
      items: [
        {
          id: "clip-1",
          kind: "link",
          title: "Claude 3.7 Sonnet System Card",
          content: "https://anthropic.com/research/claude-3-7-sonnet",
          previewSubtitle: "anthropic.com",
          sourceApp: "Browser",
          copiedAt: "12:44",
          relativeTime: "2m ago",
          lengthLabel: "link",
          pinned: true,
          monogram: "AN"
        },
        {
          id: "clip-2",
          kind: "code",
          title: "DWMWA_SYSTEMBACKDROP_TYPE enum",
          content: "DWMSBT_AUTO = 0\nDWMSBT_NONE = 1\nDWMSBT_MAINWINDOW = 2 # Mica\nDWMSBT_TRANSIENTWINDOW = 3 # Acrylic\nDWMSBT_TABBEDWINDOW = 4",
          previewSubtitle: "Python",
          sourceApp: "VS Code",
          copiedAt: "12:38",
          relativeTime: "8m ago",
          lengthLabel: "5 lines",
          pinned: false,
          monogram: "PY"
        },
        {
          id: "clip-3",
          kind: "text",
          title: "Color token for active dock tile",
          content: "--flank-color-tile-active-bg: linear-gradient(135deg, #2F4BFF, #1E34C9);",
          previewSubtitle: "CSS snippet",
          sourceApp: "Terminal",
          copiedAt: "12:15",
          relativeTime: "31m ago",
          lengthLabel: "72 chars",
          pinned: false,
          monogram: "CS"
        },
        {
          id: "clip-4",
          kind: "text",
          title: "Package delivery confirmation number",
          content: "1Z9999999999999999",
          previewSubtitle: "Tracking number",
          sourceApp: "Browser",
          copiedAt: "11:50",
          relativeTime: "56m ago",
          lengthLabel: "18 chars",
          pinned: false,
          monogram: "TR"
        }
      ]
    },
    weather: {
      city: "Kyoto",
      tempC: 24,
      condition: "Partly Cloudy",
      icon: "cloud",
      highC: 27,
      lowC: 18,
      hourly: [
        { label: "Now", tempC: 24, icon: "cloud" },
        { label: "13:00", tempC: 25, icon: "cloud" },
        { label: "14:00", tempC: 26, icon: "sun" },
        { label: "15:00", tempC: 27, icon: "sun" },
        { label: "16:00", tempC: 26, icon: "sun" },
        { label: "17:00", tempC: 24, icon: "cloud" }
      ]
    },
    stats: {
      cpuPercent: 15,
      memUsedGb: 8.4,
      memTotalGb: 32,
      memPercent: 26,
      gpuPercent: 12,
      diskMount: "C:",
      diskUsedGb: 284,
      diskTotalGb: 1e3,
      diskPercent: 28,
      disks: [
        { mount: "C:", usedGb: 284, totalGb: 1e3, percent: 28 },
        { mount: "D:", usedGb: 512, totalGb: 2e3, percent: 26 }
      ],
      cpuHistory: [12, 14, 18, 22, 19, 15, 14, 16, 20, 15],
      cores: [14, 18, 12, 16, 20, 11, 15, 14],
      netDownBps: 24e5,
      netUpBps: 45e4,
      refreshSec: 1,
      paused: false
    },
    battery: {
      hasSystemBattery: true,
      percent: 80,
      charging: true,
      acConnected: true,
      stateText: "Charging (1h 10m to full)",
      timeRemainingText: "1h 10m to full",
      powerMode: "Best power efficiency",
      healthPercent: 96,
      model: "Primary Li-Polymer",
      remainingWh: 56.4,
      fullChargedWh: 70.5,
      designWh: 73.4,
      voltageV: 15.4,
      powerRateW: 32.5,
      history: [68, 70, 72, 75, 77, 80],
      peripherals: [
        { id: "dev-1", name: "MX Master 3S", kind: "mouse", percent: 85, charging: false, connected: true },
        { id: "dev-2", name: "Keychron K3", kind: "keyboard", percent: 60, charging: false, connected: true },
        { id: "dev-3", name: "Sony WH-1000XM5", kind: "headphones", percent: 90, charging: false, connected: true }
      ]
    },
    player: {
      playing: true,
      title: "Midnight City",
      artist: "M83",
      album: "Hurry Up, We're Dreaming",
      sourceApp: "Spotify",
      positionSec: 142,
      durationSec: 243
    },
    focus: {
      running: false,
      mode: "focus",
      durationMinutes: 25,
      remainingSec: 1500,
      totalSec: 1500,
      completedSessions: 3,
      focusedMinutesToday: 75
    },
    clock: {
      localTimeText: "11:10",
      localDateText: "Thursday, Nov 5",
      localZoneText: "JST (UTC+9)",
      cities: [
        { id: "c-1", city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", timeText: "11:10", dateText: "Thu, Nov 5", offsetText: "+0h", isDay: true },
        { id: "c-2", city: "London", country: "UK", timezone: "Europe/London", timeText: "02:10", dateText: "Thu, Nov 5", offsetText: "-9h", isDay: false },
        { id: "c-3", city: "San Francisco", country: "USA", timezone: "America/Los_Angeles", timeText: "18:10", dateText: "Wed, Nov 4", offsetText: "-17h", isDay: false },
        { id: "c-4", city: "New York", country: "USA", timezone: "America/New_York", timeText: "21:10", dateText: "Wed, Nov 4", offsetText: "-14h", isDay: false }
      ]
    },
    scratchpad: {
      activeNoteId: "note-1",
      notes: [
        { id: "note-1", title: "Flank Backlog", content: "- Step 1 tokens\n- Step 2 hierarchy\n- Step 3 icons\n- Step 4 widgets", updatedAt: "Just now" },
        { id: "note-2", title: "Meeting notes", content: "Discuss Windows 11 DWM transparency and borderless styling.", updatedAt: "2h ago" }
      ]
    },
    colorpicker: {
      currentHex: "#2F4BFF",
      rgbText: "rgb(47, 75, 255)",
      hslText: "hsl(232, 100%, 59%)",
      cssVarText: "var(--flank-color-accent)",
      contrastWhite: 5.4,
      contrastDark: 4.8,
      history: ["#2F4BFF", "#7CF0C8", "#F5A524", "#1E34C9", "#FBFAF7"]
    },
    calendar: {
      nextSummary: "15:00 Team Standup",
      todayDateText: "Thursday, November 5",
      events: [
        { id: "ev-1", title: "Team Standup", timeText: "15:00 - 15:30", relativeText: "in 3h 50m", joinUrl: "https://meet.google.com/abc-defg-hij", provider: "Google Meet" },
        { id: "ev-2", title: "Design System Review", timeText: "16:00 - 17:00", relativeText: "in 4h 50m", provider: "Calendar" },
        { id: "ev-3", title: "Flank 1.0 Architecture Sync", timeText: "17:30 - 18:00", relativeText: "in 6h 20m", joinUrl: "https://meet.google.com/flk-demo-001", provider: "Google Meet" }
      ]
    },
    audio: {
      volumePercent: 68,
      muted: false,
      micMuted: false,
      outputDevice: "Headphones (WH-1000XM5)",
      inputDevice: "Microphone Array (Intel Smart Sound)"
    },
    network: {
      connected: true,
      ssid: "Fiber-5G-Studio",
      localIp: "192.168.1.142",
      pingMs: 14,
      downMbps: 594.6,
      upMbps: 120.4,
      ports: [
        { port: 3e3, pid: 14208, processName: "node.exe", url: "http://localhost:3000" },
        { port: 8080, pid: 9812, processName: "python.exe", url: "http://localhost:8080" }
      ]
    },
    bluetooth: {
      connectedCount: 3,
      devices: [
        { id: "headphones", name: "Studio ANC Headphones", type: "headphones", connected: true, batteryLevel: 90 },
        { id: "earbuds", name: "Wireless ANC Earbuds", type: "headphones", connected: true, batteryLevel: 85 },
        { id: "mouse-pro", name: "Precision Mouse Pro", type: "mouse", connected: true, batteryLevel: 85 },
        { id: "keyboard-75", name: "Mechanical Keyboard 75", type: "keyboard", connected: true, batteryLevel: 85 },
        { id: "mouse-compact", name: "Compact Wireless Mouse", type: "mouse", connected: true, batteryLevel: 70 }
      ]
    },
    topProcesses: [
      { pid: 27532, name: "msedge.exe", memMb: 612.6, threads: 42 },
      { pid: 6268, name: "Code.exe", memMb: 552, threads: 35 },
      { pid: 25852, name: "WindowsTerminal.exe", memMb: 405.3, threads: 68 },
      { pid: 31316, name: "explorer.exe", memMb: 331.6, threads: 84 },
      { pid: 17792, name: "python.exe", memMb: 285.8, threads: 32 }
    ],
    tasks: {
      pendingCount: 3,
      items: [
        { id: "task-1", text: "Review pull request for telemetry pipeline", done: false, createdAt: "10:30 AM" },
        { id: "task-2", text: "Prepare release notes for Flank v1.1", done: false, createdAt: "11:15 AM" },
        { id: "task-3", text: "Sync meeting with design team", done: true, createdAt: "09:00 AM" },
        { id: "task-4", text: "Benchmark liquid glass blur performance", done: false, createdAt: "01:45 PM" }
      ]
    },
    calculator: {
      lastExpr: "120 * 1.18",
      lastResult: "141.6",
      history: [
        { expr: "120 * 1.18", result: "141.6" },
        { expr: "16 GB to MB", result: "16,384 MB" },
        { expr: "sqrt(256) * 4", result: "64" }
      ]
    },
    storage: {
      primaryPercent: 68,
      primaryDrive: "C:",
      drives: [
        { letter: "C:", label: "Windows", type: "SSD NVMe", usedGb: 340, totalGb: 500, freeGb: 160, percent: 68 },
        { letter: "D:", label: "Projects & Games", type: "SSD NVMe", usedGb: 720, totalGb: 1e3, freeGb: 280, percent: 72 }
      ]
    },
    display: {
      brightness: 85,
      nightLight: false,
      resolution: "1920 \xD7 1080",
      refreshRate: 144,
      scaling: 100
    },
    privacy: {
      micActive: false,
      cameraActive: false,
      micMuted: false,
      activeApps: []
    },
    ambient: {
      playing: false,
      sound: "rain",
      volume: 65
    },
    runner: {
      running: false,
      lastCmd: "ipconfig /flushdns",
      lastOutput: "Successfully flushed the DNS Resolver Cache.",
      commands: [
        { id: "flushdns", name: "Flush DNS", cmd: "ipconfig /flushdns", desc: "Clear local DNS cache" },
        { id: "killnode", name: "Kill Node.js", cmd: "taskkill /F /IM node.exe", desc: "Stop running dev servers" },
        { id: "pinggoogle", name: "Ping 8.8.8.8", cmd: "ping -n 4 8.8.8.8", desc: "Check network gateway latency" },
        { id: "gitfetch", name: "Git Fetch All", cmd: "git fetch --all --prune", desc: "Fetch latest remote branches" }
      ]
    },
    gpu: {
      name: "NVIDIA GeForce RTX",
      utilizationPercent: 42,
      tempC: 54,
      vramUsedGb: 3.8,
      vramTotalGb: 8,
      driverVersion: "566.14"
    },
    github: {
      username: "flank-user",
      connected: true,
      pendingCount: 2,
      items: [
        { id: "pr-14", title: "feat: add album art & YouTube thumbnail", repo: "Flank", type: "pr", url: "https://github.com/nandhakrishnasr/Flank/pull/14", status: "Review requested" },
        { id: "pr-12", title: "fix: edge dock positioning multi-monitor", repo: "Flank", type: "pr", url: "https://github.com/nandhakrishnasr/Flank/pull/12", status: "Approved" }
      ]
    }
  };
}

// src/ui/icons.ts
function iconSvg(name, sizePx) {
  const sizeStyle = sizePx ? typeof sizePx === "number" ? `width="${sizePx}" height="${sizePx}"` : `style="width:${sizePx}; height:${sizePx}"` : `style="width: var(--flank-scale-icon-md, 20px); height: var(--flank-scale-icon-md, 20px)"`;
  const strokeAttr = `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="var(--flank-scale-icon-stroke, var(--flank-icons-stroke-width, 1.75))" stroke-linecap="round" stroke-linejoin="round" shape-rendering="geometricPrecision" aria-hidden="true"`;
  switch (name) {
    // ------------------------------------------------------------------------
    // Apps (Lucide: Terminal, Globe, Folder, FileText)
    // ------------------------------------------------------------------------
    case "terminal":
      return `<svg ${sizeStyle} ${strokeAttr}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`;
    case "globe":
    case "browser":
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
    case "folder":
    case "files":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`;
    case "notes":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`;
    case "bookmark":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`;
    // ------------------------------------------------------------------------
    // Widgets (Lucide: ClipboardList, Sun, Moon, Cloud, CloudRain)
    // ------------------------------------------------------------------------
    case "clipboard":
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`;
    case "sun":
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    case "moon":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    case "cloud":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`;
    case "rain":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`;
    case "battery":
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/><line x1="6" x2="6" y1="11" y2="13"/><line x1="10" x2="10" y1="11" y2="13"/></svg>`;
    case "battery-charging":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"/><path d="m11 7-3 5h4l-3 5"/><line x1="22" x2="22" y1="11" y2="13"/></svg>`;
    case "equalizer":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>`;
    case "focus":
    case "target":
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
    case "clock":
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    case "scratchpad":
    case "sticky":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M18.4 2.6a2.12 2.12 0 1 1 3 3L16 11l-4 1 1-4Z"/></svg>`;
    case "eyedropper":
    case "colorpicker":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"/></svg>`;
    case "calendar":
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`;
    case "volume":
    case "audio":
      return `<svg ${sizeStyle} ${strokeAttr}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
    case "volume-mute":
      return `<svg ${sizeStyle} ${strokeAttr}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`;
    case "mic":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`;
    case "mic-off":
      return `<svg ${sizeStyle} ${strokeAttr}><line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`;
    case "wifi":
    case "network":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>`;
    case "settings":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
    // ------------------------------------------------------------------------
    // Media & Control Glyphs (Mono Line Art, Round Caps & Joins)
    // ------------------------------------------------------------------------
    case "play":
      return `<svg ${sizeStyle} ${strokeAttr}><polygon points="6 3 20 12 6 21 6 3"/></svg>`;
    case "pause":
      return `<svg ${sizeStyle} ${strokeAttr}><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>`;
    case "previous":
    case "skip-back":
      return `<svg ${sizeStyle} ${strokeAttr}><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>`;
    case "next":
    case "skip-forward":
      return `<svg ${sizeStyle} ${strokeAttr}><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>`;
    case "search":
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`;
    case "pin":
      return `<svg ${sizeStyle} ${strokeAttr}><line x1="12" x2="12" y1="17" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>`;
    case "trash":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`;
    case "link":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
    case "code":
      return `<svg ${sizeStyle} ${strokeAttr}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
    case "file":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>`;
    case "text":
      return `<svg ${sizeStyle} ${strokeAttr}><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>`;
    case "arrow-up-right":
    case "external-link":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`;
    case "chevron-up":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m18 15-6-6-6 6"/></svg>`;
    case "chevron-down":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m6 9 6 6 6-6"/></svg>`;
    case "chevron-left":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m15 18-6-6 6-6"/></svg>`;
    case "chevron-right":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m9 18 6-6-6-6"/></svg>`;
    case "plus":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
    case "check":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M20 6 9 17l-5-5"/></svg>`;
    case "x":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
    case "grid":
      return `<svg ${sizeStyle} ${strokeAttr}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`;
    case "mouse":
      return `<svg ${sizeStyle} ${strokeAttr}><rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 6v4"/></svg>`;
    case "keyboard":
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M7 16h10"/></svg>`;
    case "headphones":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>`;
    case "cpu":
    case "processor":
    case "chip":
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`;
    case "gauge":
    case "speedometer":
    case "dashboard":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`;
    case "pulse":
    case "activity-wave":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;
    case "bluetooth":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="m7 7 10 10-5 5V2l5 5L7 17"/></svg>`;
    case "check-square":
    case "tasks":
    case "todo":
      return `<svg ${sizeStyle} ${strokeAttr}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`;
    case "calculator":
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`;
    case "droplet":
    case "water":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>`;
    case "hard-drive":
    case "storage":
    case "disk":
      return `<svg ${sizeStyle} ${strokeAttr}><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>`;
    case "shield":
    case "privacy":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`;
    case "waves":
    case "ambient":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`;
    case "github":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;
    case "monitor":
    case "display":
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`;
    case "activity":
    case "agent":
    case "bot":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>`;
    case "reset":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`;
    case "refresh":
    case "refresh-cw":
      return `<svg ${sizeStyle} ${strokeAttr}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`;
    case "image":
      return `<svg ${sizeStyle} ${strokeAttr}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
    case "win-min":
      return `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M1 6h10"/></svg>`;
    case "win-max":
      return `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="1.5" y="1.5" width="9" height="9" rx="1.5"/></svg>`;
    case "win-close":
      return `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M1.5 1.5l9 9M10.5 1.5l-9 9"/></svg>`;
    case "flank-mark":
    case "flank-glyph":
      return flankGlyph({ size: sizePx ? typeof sizePx === "number" ? sizePx : parseInt(String(sizePx), 10) : 18 });
    default:
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="8"/></svg>`;
  }
}
function flankGlyph(options = {}) {
  const { size = 18, className = "" } = options;
  const isSolid = options.solid !== void 0 ? options.solid : size < 24;
  const width = Math.round(size * 100 / 128);
  const classAttr = className ? ` class="${className}"` : "";
  if (isSolid) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 128" width="${width}" height="${size}"${classAttr} role="img" aria-label="Flank glyph" style="display:inline-block; vertical-align:middle; flex-shrink:0;"><path d="M12 44 a38 38 0 0 1 76 0 V84 a38 38 0 0 1 -76 0 Z M33.10 35.40 a5.20 5.20 0 0 1 5.20 -5.20 H65.60 a9.10 9.10 0 0 1 0.00 18.20 H51.30 V58.80 H63.00 a7.80 7.80 0 0 1 0.00 15.60 H51.30 V92.60 a5.20 5.20 0 0 1 -5.20 5.20 H38.30 a5.20 5.20 0 0 1 -5.20 -5.20 Z" fill="currentColor" fill-rule="evenodd"/></svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 128" width="${width}" height="${size}"${classAttr} role="img" aria-label="Flank glyph" style="display:inline-block; vertical-align:middle; flex-shrink:0;"><path d="M12 44 a38 38 0 0 1 76 0 V84 a38 38 0 0 1 -76 0 Z" fill="none" stroke="currentColor" stroke-width="9"/><path d="M37 42 a4 4 0 0 1 4 -4 H62 a7 7 0 0 1 0 14 H51 V60 H60 a6 6 0 0 1 0 12 H51 V86 a4 4 0 0 1 -4 4 H41 a4 4 0 0 1 -4 -4 Z" fill="currentColor"/></svg>`;
}
function flankGlyphSvg(size = 18, idSuffix = "") {
  return flankGlyph({ size, idSuffix });
}
function flankLockup(options = {}) {
  const { theme = "light", height = 84, className = "" } = options;
  const width = options.width || Math.round(height * 258 / 84);
  const textFill = theme === "dark" ? "#FFFFFF" : "#1F1E1B";
  const classAttr = className ? ` class="${className}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.0 84" width="${width}" height="${height}"${classAttr} role="img" aria-label="Flank"><svg x="0" y="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="84" height="84"><rect width="128" height="128" rx="30" fill="#2F4BFF"/><g transform="translate(28.00 17.92) scale(0.72)"><path d="M12 44 a38 38 0 0 1 76 0 V84 a38 38 0 0 1 -76 0 Z" fill="none" stroke="#fff" stroke-width="9"/><path d="M37 42 a4 4 0 0 1 4 -4 H62 a7 7 0 0 1 0 14 H51 V60 H60 a6 6 0 0 1 0 12 H51 V86 a4 4 0 0 1 -4 4 H41 a4 4 0 0 1 -4 -4 Z" fill="#fff"/></g></svg><g transform="translate(106 6)"><path d="M24.15625 16.92H17.375V15.138750000000002C17.375 12.638750000000002 18.3125 11.670000000000002 20.875 11.670000000000002H24.15625V3.3575000000000017H18.15625C10.3125 3.3575000000000017 6.59375 6.545000000000002 6.59375 13.263750000000002V16.92H0.59375V25.2325H6.59375V49.92H17.375V25.2325H24.15625Z M35.95625 3.3575000000000017H25.20625V49.92H35.95625Z M48.85 50.4825C53.50625 50.4825 56.475 48.8575 58.44375 45.295H58.56875V49.92H69.06875V27.70125C69.06875 20.42 63.7875 16.20125 54.19375 16.20125C44.63125 16.20125 39.225 20.45125 38.75625 27.6075H48.75625C48.975 25.3575 50.81875 23.92 53.81875 23.92C56.6625 23.92 58.4125 25.26375 58.4125 27.2325V27.38875C58.4125 29.3575 56.25625 29.82625 50.35 30.32625C43.31875 30.88875 37.5375 33.295 37.5375 40.70125C37.5375 47.26375 42.25625 50.4825 48.85 50.4825ZM52.13125 43.45125C49.50625 43.45125 47.725 42.2325 47.725 40.20125C47.725 38.045 49.7875 36.8575 52.6625 36.42C55.31875 35.9825 57.35 35.57625 58.50625 35.045V38.045C58.50625 41.295 55.725 43.45125 52.13125 43.45125Z M82.61875 31.9825C82.61875 27.4825 84.80625 25.38875 88.2125 25.38875C91.61875 25.38875 93.5875 27.51375 93.5875 31.42V49.92H104.3375V29.17C104.3375 21.045 100.15 16.20125 92.99375 16.20125C88.025 16.20125 84.68125 18.4825 82.49375 22.26375V16.92H71.86875V49.92H82.61875Z M107.1375 49.92H117.8875V40.1075L120.16875 37.45125L128.575 49.92H140.98125L128.16875 31.32625L140.45 16.92H128.04375L118.0125 28.63875H117.8875V3.3575000000000017H107.1375Z" fill="${textFill}"/><circle cx="147.20" cy="45.12" r="4.80" fill="#F5A524"/></g></svg>`;
}

// src/ui/dock.ts
function escapeHtml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function formatDuration(sec) {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor(s % 3600 / 60);
  const rem = s % 60;
  if (h > 0) {
    return `${h}:${m < 10 ? "0" : ""}${m}:${rem < 10 ? "0" : ""}${rem}`;
  }
  return `${m}:${rem < 10 ? "0" : ""}${rem}`;
}
function renderRingMeterSvg(percent, compact) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const circumference = 62.83;
  const dash = (clamped / 100 * circumference).toFixed(1);
  const strokeColor = clamped >= 90 ? "#EF4444" : clamped >= 75 ? "#F59E0B" : "var(--flank-color-accent)";
  if (compact) {
    return `<svg viewBox="0 0 28 28" fill="none" aria-hidden="true" style="width: var(--flank-scale-icon-20); height: var(--flank-scale-icon-20)">
      <circle cx="14" cy="14" r="10" stroke="var(--flank-color-track-bg)" stroke-width="3"/>
      <circle cx="14" cy="14" r="10" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" stroke-dasharray="${dash} 62.8" transform="rotate(-90 14 14)"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 28 28" fill="none" aria-hidden="true" style="width: var(--flank-scale-ring-tile); height: var(--flank-scale-ring-tile)">
    <circle cx="14" cy="14" r="10" stroke="var(--flank-color-track-bg)" stroke-width="3"/>
    <circle cx="14" cy="14" r="10" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" stroke-dasharray="${dash} 62.8" transform="rotate(-90 14 14)"/>
    <text x="14" y="17.2" text-anchor="middle" font-size="8.5" font-weight="700" fill="currentColor">${clamped}</text>
  </svg>`;
}
function renderBadge(count) {
  if (count <= 0) return "";
  const text = count > 9 ? "9+" : String(count);
  return `<span class="flank-badge" aria-hidden="true">${text}</span>`;
}
function truncateValue(val, maxLen = 5) {
  if (!val) return "";
  return val.length > maxLen ? val.slice(0, maxLen) : val;
}
var LETTER_BADGE_PALETTE = [
  "#475569",
  // Slate
  "#4F46E5",
  // Indigo
  "#0891B2",
  // Cyan
  "#059669",
  // Emerald
  "#D97706",
  // Amber
  "#E11D48",
  // Rose
  "#7C3AED",
  // Violet
  "#2563EB"
  // Blue
];
function getLetterBadgeProps(label) {
  const clean = (label || "?").trim();
  const letter = (clean.charAt(0) || "?").toUpperCase();
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % LETTER_BADGE_PALETTE.length;
  return { letter, bg: LETTER_BADGE_PALETTE[idx], color: "#ffffff" };
}
function renderItemIcon(item, sizePx) {
  const isAppOrLink = item.group === "apps" || item.kind === "app" || item.kind === "link" || item.id.startsWith("custom-");
  if (!isAppOrLink) {
    return iconSvg(item.icon, sizePx || 20);
  }
  if (item.iconUri) {
    return `<div class="flank-icon-plate"><img src="${escapeHtml(item.iconUri)}" alt="" class="flank-plate-icon" draggable="false" /></div>`;
  }
  const badge = getLetterBadgeProps(item.label || item.id);
  return `<div class="flank-icon-plate flank-letter-badge" style="background: ${badge.bg}; color: ${badge.color};"><span>${escapeHtml(badge.letter)}</span></div>`;
}
function renderWidgetTileInner(kind, state2, theme, item, isActive) {
  const style = theme.layout.widgetStyle;
  const railIndicator = theme.layout.shape === "rail" && isActive ? `<span class="flank-rail-indicator" aria-hidden="true"></span>` : "";
  if (style === "row") {
    switch (kind) {
      case "clipboard":
        return {
          ariaLabel: `Clipboard history, ${state2.clipboard.count} items`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">clip</span><span>history</span></span><span class="flank-row-right is-accent">${state2.clipboard.count}</span>`
        };
      case "weather":
        return {
          ariaLabel: `Weather, ${state2.weather.city} ${state2.weather.tempC} degrees`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">wthr</span><span>${escapeHtml(state2.weather.city.toLowerCase())}</span></span><span class="flank-row-right">${state2.weather.tempC}\xB0</span>`
        };
      case "stats":
        return {
          ariaLabel: `System CPU ${state2.stats.cpuPercent} percent`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">cpu</span><span>usage</span></span><span class="flank-row-right">${state2.stats.cpuPercent}%</span>`
        };
      case "battery":
        return {
          ariaLabel: `Battery ${state2.battery.percent} percent, ${state2.battery.stateText}`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">bat</span><span>${state2.battery.charging ? "charging" : "charge"}</span></span><span class="flank-row-right is-accent">${state2.battery.percent}%</span>`
        };
      case "player":
        return {
          ariaLabel: `Mini player, ${state2.player.title}`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">play</span><span>${escapeHtml(state2.player.title.toLowerCase())}</span></span><span class="flank-row-right is-accent">${iconSvg("play", 12)} ${formatDuration(state2.player.positionSec)}</span>`
        };
      case "focus":
        return {
          ariaLabel: `Focus timer, ${formatDuration(state2.focus?.remainingSec ?? 1500)}`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">fcs</span><span>${state2.focus?.mode || "focus"}</span></span><span class="flank-row-right is-accent">${formatDuration(state2.focus?.remainingSec ?? 1500)}</span>`
        };
      case "clock":
        return {
          ariaLabel: `World clock, ${state2.clock?.localTimeText || "12:00 PM"}`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">clk</span><span>clock</span></span><span class="flank-row-right">${escapeHtml(state2.clock?.localTimeText || "12:00 PM")}</span>`
        };
      case "scratchpad":
        return {
          ariaLabel: `Quick scratchpad, ${state2.scratchpad?.notes?.length ?? 1} notes`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">pad</span><span>notes</span></span><span class="flank-row-right">${state2.scratchpad?.notes?.length ?? 1}</span>`
        };
      case "colorpicker":
        return {
          ariaLabel: `Color picker, ${state2.colorpicker?.currentHex || "#2F4BFF"}`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">clr</span><span>picker</span></span><span class="flank-row-right is-accent">${escapeHtml(state2.colorpicker?.currentHex || "#2F4BFF")}</span>`
        };
      case "calendar":
        return {
          ariaLabel: `Agenda, ${state2.calendar?.nextSummary || "Today"}`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">cal</span><span>agenda</span></span><span class="flank-row-right">${escapeHtml(state2.calendar?.nextSummary || "Today")}</span>`
        };
      case "audio":
        return {
          ariaLabel: `Audio volume ${state2.audio?.muted ? "muted" : `${state2.audio?.volumePercent ?? 68}%`}`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">vol</span><span>audio</span></span><span class="flank-row-right">${state2.audio?.muted ? "MUTE" : `${state2.audio?.volumePercent ?? 68}%`}</span>`
        };
      case "network":
        return {
          ariaLabel: `Network ${state2.network?.pingMs ?? 14}ms`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">net</span><span>ports</span></span><span class="flank-row-right">${state2.network?.pingMs ?? 14}ms</span>`
        };
      case "bluetooth":
        return {
          ariaLabel: `Bluetooth, ${state2.bluetooth?.connectedCount ?? 0} connected devices`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">bt</span><span>devices</span></span><span class="flank-row-right is-accent">${state2.bluetooth?.connectedCount ?? 0}</span>`
        };
      case "tasks":
        return {
          ariaLabel: `Tasks, ${state2.tasks?.pendingCount ?? 0} remaining`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">todo</span><span>tasks</span></span><span class="flank-row-right">${state2.tasks?.pendingCount ?? 0}</span>`
        };
      case "calculator":
        return {
          ariaLabel: `Smart calculator`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">calc</span><span>math</span></span><span class="flank-row-right">Calc</span>`
        };
      case "storage":
        return {
          ariaLabel: `Storage ${state2.storage?.primaryPercent ?? 68}%`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">dsk</span><span>drives</span></span><span class="flank-row-right">${state2.storage?.primaryPercent ?? 68}%</span>`
        };
      case "display":
        return {
          ariaLabel: `Display brightness ${state2.display?.brightness ?? 85}%`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">dsp</span><span>bright</span></span><span class="flank-row-right">${state2.display?.brightness ?? 85}%</span>`
        };
      case "privacy":
        return {
          ariaLabel: `Privacy guard, ${state2.privacy?.micActive ? "mic active" : "protected"}`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">prv</span><span>guard</span></span><span class="flank-row-right">${state2.privacy?.micActive ? "REC" : "OK"}</span>`
        };
      case "ambient":
        return {
          ariaLabel: `Focus ambiance, ${state2.ambient?.playing ? "playing" : "off"}`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">amb</span><span>sound</span></span><span class="flank-row-right">${state2.ambient?.playing ? "Play" : "Off"}</span>`
        };
      case "runner":
        return {
          ariaLabel: `Command runner`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">run</span><span>cli</span></span><span class="flank-row-right">>_</span>`
        };
      case "gpu":
        return {
          ariaLabel: `GPU ${state2.gpu?.tempC ?? 54}\xB0C`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">gpu</span><span>thermal</span></span><span class="flank-row-right">${state2.gpu?.tempC ?? 54}\xB0C</span>`
        };
      case "github":
        return {
          ariaLabel: `GitHub, ${state2.github?.pendingCount ?? 0} pull requests`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">git</span><span>prs</span></span><span class="flank-row-right">${state2.github?.pendingCount ?? 0}</span>`
        };
    }
  }
  if (style === "value") {
    switch (kind) {
      case "clipboard":
        return {
          ariaLabel: `Clipboard history, ${state2.clipboard.count} items`,
          extraClass: "",
          html: `${iconSvg("clipboard")}<span class="flank-rail-dot" aria-hidden="true"></span>${railIndicator}`
        };
      case "weather":
        return {
          ariaLabel: `Weather, ${state2.weather.tempC} degrees`,
          extraClass: "",
          html: `<span class="flank-tile-value">${state2.weather.tempC}\xB0</span>${railIndicator}`
        };
      case "stats":
        return {
          ariaLabel: `CPU ${state2.stats.cpuPercent} percent`,
          extraClass: "",
          html: `<span class="flank-tile-value">${state2.stats.cpuPercent}%</span>${railIndicator}`
        };
      case "battery":
        return {
          ariaLabel: `Battery ${state2.battery.percent} percent`,
          extraClass: "",
          html: `<span class="flank-tile-value">${state2.battery.percent}%</span>${railIndicator}`
        };
      case "player":
        return {
          ariaLabel: `Mini player, ${state2.player.playing ? "playing" : "paused"}`,
          extraClass: state2.player.playing ? "flank-tile-accent-icon is-playing" : "",
          html: state2.player.artworkUrl ? `<img src="${escapeHtml(state2.player.artworkUrl)}" style="width: 18px; height: 18px; border-radius: 3px; object-fit: cover;" alt="Art" />${railIndicator}` : `${iconSvg("equalizer")}${railIndicator}`
        };
      case "focus":
        return {
          ariaLabel: `Focus timer, ${Math.ceil((state2.focus?.remainingSec ?? 1500) / 60)}m`,
          extraClass: state2.focus?.running ? "flank-tile-accent-icon" : "",
          html: `<span class="flank-tile-value">${Math.ceil((state2.focus?.remainingSec ?? 1500) / 60)}m</span>${railIndicator}`
        };
      case "clock":
        return {
          ariaLabel: `World clock, ${state2.clock?.localTimeText || "12:00 PM"}`,
          extraClass: "",
          html: `${iconSvg("clock")}${railIndicator}`
        };
      case "scratchpad":
        return {
          ariaLabel: `Quick scratchpad`,
          extraClass: "",
          html: `${iconSvg("scratchpad")}${railIndicator}`
        };
      case "colorpicker":
        return {
          ariaLabel: `Color picker, ${state2.colorpicker?.currentHex || "#2F4BFF"}`,
          extraClass: "",
          html: `${iconSvg("eyedropper")}${railIndicator}`
        };
      case "calendar":
        return {
          ariaLabel: `Agenda, ${state2.calendar?.nextSummary || "Today"}`,
          extraClass: "",
          html: `${iconSvg("calendar")}${railIndicator}`
        };
      case "audio":
        return {
          ariaLabel: `Audio ${state2.audio?.muted ? "muted" : `${state2.audio?.volumePercent ?? 68}%`}`,
          extraClass: "",
          html: `<span class="flank-tile-value">${state2.audio?.muted ? "M" : `${state2.audio?.volumePercent ?? 68}%`}</span>${railIndicator}`
        };
      case "network":
        return {
          ariaLabel: `Network ${state2.network?.pingMs ?? 14}ms`,
          extraClass: "",
          html: `<span class="flank-tile-value">${state2.network?.pingMs ?? 14}ms</span>${railIndicator}`
        };
      case "bluetooth":
        return {
          ariaLabel: `Bluetooth, ${state2.bluetooth?.connectedCount ?? 0} devices`,
          extraClass: "",
          html: `${iconSvg("bluetooth")}${railIndicator}`
        };
      case "tasks":
        return {
          ariaLabel: `Tasks, ${state2.tasks?.pendingCount ?? 0} remaining`,
          extraClass: "",
          html: `<span class="flank-tile-value">${state2.tasks?.pendingCount ?? 0}</span>${railIndicator}`
        };
      case "calculator":
        return {
          ariaLabel: `Smart calculator`,
          extraClass: "",
          html: `<span class="flank-tile-value">Calc</span>${railIndicator}`
        };
      case "storage":
        return {
          ariaLabel: `Storage ${state2.storage?.primaryPercent ?? 68}%`,
          extraClass: "",
          html: `<span class="flank-tile-value">${state2.storage?.primaryPercent ?? 68}%</span>${railIndicator}`
        };
      case "display":
        return {
          ariaLabel: `Display ${state2.display?.brightness ?? 85}%`,
          extraClass: "",
          html: `<span class="flank-tile-value">${state2.display?.brightness ?? 85}%</span>${railIndicator}`
        };
      case "privacy":
        return {
          ariaLabel: `Privacy guard`,
          extraClass: state2.privacy?.micActive ? "flank-tile-accent-icon" : "",
          html: `${iconSvg("shield")}${railIndicator}`
        };
      case "ambient":
        return {
          ariaLabel: `Focus ambiance`,
          extraClass: state2.ambient?.playing ? "flank-tile-accent-icon" : "",
          html: `${iconSvg("waves")}${railIndicator}`
        };
      case "runner":
        return {
          ariaLabel: `Command runner`,
          extraClass: "",
          html: `<span class="flank-tile-value">>_</span>${railIndicator}`
        };
      case "gpu":
        return {
          ariaLabel: `GPU ${state2.gpu?.tempC ?? 54}\xB0C`,
          extraClass: "",
          html: `<span class="flank-tile-value">${state2.gpu?.tempC ?? 54}\xB0</span>${railIndicator}`
        };
      case "github":
        return {
          ariaLabel: `GitHub, ${state2.github?.pendingCount ?? 0} pull requests`,
          extraClass: "",
          html: `${iconSvg("github")}${railIndicator}`
        };
    }
  }
  if (style === "pill") {
    switch (kind) {
      case "clipboard":
        return {
          ariaLabel: `Clipboard history, ${state2.clipboard.count} items`,
          extraClass: "",
          html: `${iconSvg("clipboard")}${state2.clipboard.count > 0 ? `<span class="flank-badge">${state2.clipboard.count}</span>` : ""}`
        };
      case "weather":
        return {
          ariaLabel: `Weather, ${state2.weather.city} ${state2.weather.tempC} degrees`,
          extraClass: "is-widget-pill",
          html: `${iconSvg(state2.weather.icon)}${state2.weather.tempC}\xB0 ${escapeHtml(state2.weather.city)}`
        };
      case "stats":
        return {
          ariaLabel: `CPU ${state2.stats.cpuPercent} percent`,
          extraClass: "",
          html: renderRingMeterSvg(state2.stats.cpuPercent, false)
        };
      case "battery":
        return {
          ariaLabel: `Battery ${state2.battery.percent} percent`,
          extraClass: "is-widget-pill",
          html: `${iconSvg(state2.battery.charging ? "battery-charging" : "battery")}${state2.battery.percent}%`
        };
      case "player":
        return {
          ariaLabel: `Now playing, ${state2.player.title}`,
          extraClass: "is-widget-pill",
          html: state2.player.artworkUrl ? `<img src="${escapeHtml(state2.player.artworkUrl)}" style="width: 16px; height: 16px; border-radius: 3px; object-fit: cover; margin-right: 4px;" alt="Art" />${escapeHtml(state2.player.title)}` : `<span class="flank-tile-accent-icon" style="display:flex">${iconSvg("equalizer")}</span>${escapeHtml(state2.player.title)}`
        };
      case "focus":
        return {
          ariaLabel: `Focus timer, ${formatDuration(state2.focus?.remainingSec ?? 1500)}`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("focus")}${formatDuration(state2.focus?.remainingSec ?? 1500)}`
        };
      case "clock":
        return {
          ariaLabel: `World clock, ${state2.clock?.localTimeText || "12:00 PM"}`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("clock")}${escapeHtml(state2.clock?.localTimeText || "12:00 PM")}`
        };
      case "scratchpad":
        return {
          ariaLabel: `Quick scratchpad`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("scratchpad")}Notes (${state2.scratchpad?.notes?.length ?? 1})`
        };
      case "colorpicker":
        return {
          ariaLabel: `Color picker, ${state2.colorpicker?.currentHex || "#2F4BFF"}`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("eyedropper")}${escapeHtml(state2.colorpicker?.currentHex || "#2F4BFF")}`
        };
      case "calendar":
        return {
          ariaLabel: `Agenda, ${state2.calendar?.nextSummary || "Today"}`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("calendar")}${escapeHtml(state2.calendar?.nextSummary || "Today")}`
        };
      case "audio":
        return {
          ariaLabel: `Audio ${state2.audio?.muted ? "muted" : `${state2.audio?.volumePercent ?? 68}%`}`,
          extraClass: "is-widget-pill",
          html: `${iconSvg(state2.audio?.muted ? "volume-mute" : "volume")}${state2.audio?.muted ? "Muted" : `${state2.audio?.volumePercent ?? 68}%`}`
        };
      case "network":
        return {
          ariaLabel: `Network ${state2.network?.pingMs ?? 14}ms`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("wifi")}${state2.network?.pingMs ?? 14}ms`
        };
      case "bluetooth":
        return {
          ariaLabel: `Bluetooth, ${state2.bluetooth?.connectedCount ?? 0} devices`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("bluetooth")}BT (${state2.bluetooth?.connectedCount ?? 0})`
        };
      case "tasks":
        return {
          ariaLabel: `Tasks, ${state2.tasks?.pendingCount ?? 0} remaining`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("check-square")}${state2.tasks?.pendingCount ?? 0} tasks`
        };
      case "calculator":
        return {
          ariaLabel: `Smart calculator`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("calculator")}Calc`
        };
      case "storage":
        return {
          ariaLabel: `Storage ${state2.storage?.primaryPercent ?? 68}%`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("hard-drive")}${state2.storage?.primaryDrive ?? "C:"} ${state2.storage?.primaryPercent ?? 68}%`
        };
      case "display":
        return {
          ariaLabel: `Display ${state2.display?.brightness ?? 85}%`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("sun")}${state2.display?.brightness ?? 85}%`
        };
      case "privacy":
        return {
          ariaLabel: `Privacy guard`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("shield")}${state2.privacy?.micActive ? "Mic Active" : "Protected"}`
        };
      case "ambient":
        return {
          ariaLabel: `Focus ambiance`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("waves")}${state2.ambient?.playing ? "Ambiance" : "Muted"}`
        };
      case "runner":
        return {
          ariaLabel: `Command runner`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("terminal")}Runner`
        };
      case "gpu":
        return {
          ariaLabel: `GPU ${state2.gpu?.tempC ?? 54}\xB0C`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("activity")}${state2.gpu?.tempC ?? 54}\xB0C`
        };
      case "github":
        return {
          ariaLabel: `GitHub ${state2.github?.pendingCount ?? 0} PRs`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("github")}${state2.github?.pendingCount ?? 0} PRs`
        };
    }
  }
  switch (kind) {
    case "clipboard":
      return {
        ariaLabel: `Clipboard history, ${state2.clipboard.count} items`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("clipboard", 20)}</span><span class="flank-widget-value flank-num">${truncateValue(String(state2.clipboard.count || 0))}</span></span>${renderBadge(state2.clipboard.count)}`
      };
    case "weather": {
      const temp = `${state2.weather.tempC}\xB0`;
      return {
        ariaLabel: `Weather, ${state2.weather.tempC} degrees${isActive ? ", open" : ""}`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg(state2.weather.icon, 20)}</span><span class="flank-widget-value flank-num">${truncateValue(temp)}</span></span>`
      };
    }
    case "stats": {
      const cpu = `${state2.stats.cpuPercent}%`;
      return {
        ariaLabel: `CPU ${state2.stats.cpuPercent} percent${isActive ? ", open" : ""}`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("cpu", 20)}</span><span class="flank-widget-value flank-num">${truncateValue(cpu)}</span></span>`
      };
    }
    case "battery": {
      const bat = `${state2.battery.percent}%`;
      return {
        ariaLabel: `Battery ${state2.battery.percent} percent, ${state2.battery.stateText}${isActive ? ", open" : ""}`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg(state2.battery.charging ? "battery-charging" : "battery", 20)}</span><span class="flank-widget-value flank-num">${truncateValue(bat)}</span></span>`
      };
    }
    case "player": {
      return {
        ariaLabel: `Mini player, ${state2.player.playing ? "playing" : "paused"}`,
        extraClass: state2.player.playing ? "flank-tile-accent-icon is-playing" : "",
        html: state2.player.artworkUrl ? `<span class="flank-widget-glance"><img src="${escapeHtml(state2.player.artworkUrl)}" style="width: 20px; height: 20px; border-radius: 4px; object-fit: cover;" alt="Art" /><span class="flank-widget-value flank-num">${state2.player.playing ? "Play" : "Pau"}</span></span>` : `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("equalizer", 20)}</span><span class="flank-widget-value flank-num">${state2.player.playing ? "Play" : "Pau"}</span></span>`
      };
    }
    case "focus": {
      const focusVal = state2.focus?.running ? formatDuration(state2.focus.remainingSec).slice(0, 5) : `${state2.focus?.durationMinutes ?? 25}m`;
      return {
        ariaLabel: `Focus timer, ${formatDuration(state2.focus?.remainingSec ?? 1500)}`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("focus", 20)}</span><span class="flank-widget-value flank-num">${truncateValue(focusVal)}</span></span>`
      };
    }
    case "clock": {
      const timeStr = (state2.clock?.localTimeText || "12:00 PM").replace(/\s?[AP]M/i, "").trim();
      return {
        ariaLabel: `World clock, ${timeStr}`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("clock", 20)}</span><span class="flank-widget-value flank-num">${truncateValue(timeStr)}</span></span>`
      };
    }
    case "scratchpad": {
      const count = state2.scratchpad?.notes?.length ?? 1;
      return {
        ariaLabel: `Quick scratchpad, ${count} notes`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("scratchpad", 20)}</span><span class="flank-widget-value flank-num">${count}n</span></span>${renderBadge(count)}`
      };
    }
    case "colorpicker": {
      const hex = state2.colorpicker?.currentHex || "#2F4BFF";
      return {
        ariaLabel: `Color picker, ${hex}`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("eyedropper", 20)}</span><span class="flank-widget-value flank-num"><span style="display:inline-block; width: 14px; height: 3px; border-radius: var(--flank-scale-radius-full); background: ${escapeHtml(hex)}"></span></span></span>`
      };
    }
    case "calendar": {
      const summary = (state2.calendar?.nextSummary || "Today").replace(/^in\s+/i, "").trim();
      return {
        ariaLabel: `Agenda, ${summary}`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("calendar", 20)}</span><span class="flank-widget-value flank-num">${truncateValue(summary)}</span></span>`
      };
    }
    case "audio": {
      const muted = state2.audio?.muted ?? false;
      const vol = state2.audio?.volumePercent ?? 68;
      const val = muted ? "Off" : `${vol}%`;
      return {
        ariaLabel: `Audio ${muted ? "muted" : `${vol}%`}`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg(muted ? "volume-mute" : "volume", 20)}</span><span class="flank-widget-value flank-num">${truncateValue(val)}</span></span>`
      };
    }
    case "network": {
      const ping = `${state2.network?.pingMs ?? 14}ms`;
      return {
        ariaLabel: `Network ${state2.network?.pingMs ?? 14}ms`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("wifi", 20)}</span><span class="flank-widget-value flank-num">${truncateValue(ping)}</span></span>`
      };
    }
    case "bluetooth": {
      const cnt = state2.bluetooth?.connectedCount ?? 0;
      return {
        ariaLabel: `Bluetooth, ${cnt} connected devices`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("bluetooth", 20)}</span><span class="flank-widget-value flank-num">${cnt}d</span></span>${renderBadge(cnt)}`
      };
    }
    case "tasks": {
      const pending = state2.tasks?.pendingCount ?? 0;
      return {
        ariaLabel: `Tasks, ${pending} remaining`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("check-square", 20)}</span><span class="flank-widget-value flank-num">${pending}t</span></span>${renderBadge(pending)}`
      };
    }
    case "calculator": {
      return {
        ariaLabel: `Smart calculator`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("calculator", 20)}</span><span class="flank-widget-value flank-num">Calc</span></span>`
      };
    }
    case "storage": {
      const p = `${state2.storage?.primaryPercent ?? 68}%`;
      return {
        ariaLabel: `Storage ${p}`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("hard-drive", 20)}</span><span class="flank-widget-value flank-num">${truncateValue(p)}</span></span>`
      };
    }
    case "display": {
      const b = `${state2.display?.brightness ?? 85}%`;
      return {
        ariaLabel: `Display brightness ${b}`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("sun", 20)}</span><span class="flank-widget-value flank-num">${truncateValue(b)}</span></span>`
      };
    }
    case "privacy": {
      const isRec = Boolean(state2.privacy?.micActive || state2.privacy?.cameraActive);
      return {
        ariaLabel: `Privacy guard, ${isRec ? "recording active" : "protected"}`,
        extraClass: isRec ? "flank-tile-accent-icon" : "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon" style="${isRec ? "color: #EF4444;" : ""}">${iconSvg("shield", 20)}</span><span class="flank-widget-value flank-num">${isRec ? "REC" : "Safe"}</span></span>`
      };
    }
    case "ambient": {
      const playing = Boolean(state2.ambient?.playing);
      return {
        ariaLabel: `Focus ambiance, ${playing ? "playing" : "off"}`,
        extraClass: playing ? "flank-tile-accent-icon" : "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("waves", 20)}</span><span class="flank-widget-value flank-num">${playing ? "Play" : "Off"}</span></span>`
      };
    }
    case "runner": {
      return {
        ariaLabel: `Command runner`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("terminal", 20)}</span><span class="flank-widget-value flank-num">>_</span></span>`
      };
    }
    case "gpu": {
      const tc = `${state2.gpu?.tempC ?? 54}\xB0`;
      return {
        ariaLabel: `GPU ${tc}`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("activity", 20)}</span><span class="flank-widget-value flank-num">${truncateValue(tc)}</span></span>`
      };
    }
    case "github": {
      const cnt = state2.github?.pendingCount ?? 0;
      return {
        ariaLabel: `GitHub, ${cnt} pull requests`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("github", 20)}</span><span class="flank-widget-value flank-num">${cnt}pr</span></span>${renderBadge(cnt)}`
      };
    }
    default: {
      return {
        ariaLabel: "Widget",
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("equalizer", 20)}</span><span class="flank-widget-value flank-num">--</span></span>`
      };
    }
  }
}
function renderDockHtml(state2, theme) {
  const enabledItems = state2.items.filter((i) => i.enabled);
  const appItems = enabledItems.filter((i) => i.group === "apps" || !i.group && i.kind !== "widget");
  const widgetItems = enabledItems.filter((i) => i.group === "widgets" || !i.group && i.kind === "widget");
  const isRow = theme.layout.widgetStyle === "row";
  const edge = (state2.edgeOverride || theme.layout.edge) === "left" ? "left" : "right";
  const middleItems = [];
  if (isRow) {
    middleItems.push(
      `<div class="flank-strip-header" aria-hidden="true"><span>FLANK</span><span class="flank-strip-header-sub">dock</span></div>`
    );
  }
  appItems.forEach((item, idx) => {
    const code = item.shortCode || `0${idx + 1}`;
    const shortcutLabel = item.shortcut ? item.shortcut.replace(/\+/g, " ") : "";
    const iconContent = renderItemIcon(item);
    if (isRow) {
      middleItems.push(
        `<button type="button" class="flank-tile" draggable="true" data-item-id="${escapeHtml(item.id)}" data-item-kind="${escapeHtml(item.kind)}" data-target="${escapeHtml(item.target || "")}" aria-label="${escapeHtml(item.label)}">
          <span class="flank-row-left"><span class="flank-row-code">${escapeHtml(code)}</span><span>${escapeHtml(item.label.toLowerCase())}</span></span>
          <span class="flank-row-right">${escapeHtml(shortcutLabel)}</span>
        </button>`
      );
    } else {
      middleItems.push(
        `<button type="button" class="flank-tile" draggable="true" data-item-id="${escapeHtml(item.id)}" data-item-kind="${escapeHtml(item.kind)}" data-target="${escapeHtml(item.target || "")}" aria-label="${escapeHtml(item.label)}">
          ${iconContent}
        </button>`
      );
    }
  });
  if (appItems.length > 0 && widgetItems.length > 0) {
    if (isRow) {
      middleItems.push(
        `<div class="flank-strip-section" aria-hidden="true"><span>widgets</span><span class="flank-strip-section-line"></span></div>`
      );
    } else {
      middleItems.push(`
        <div class="flank-group-header">
          <div class="flank-group-divider" aria-hidden="true"></div>
          <button type="button" class="flank-group-chevron-btn" data-action="toggle-widgets-collapse" aria-label="${state2.widgetsCollapsed ? "Expand widgets group" : "Collapse widgets into summary tile"}" title="${state2.widgetsCollapsed ? "Expand widgets" : "Collapse widgets"}">
            ${iconSvg(state2.widgetsCollapsed ? "chevron-down" : "chevron-up", 12)}
          </button>
        </div>
      `);
    }
  }
  if (state2.widgetsCollapsed && widgetItems.length > 0) {
    const isWidgetsActive = state2.activeWidget === "widgets";
    middleItems.push(`
      <button type="button" class="flank-tile flank-widget-summary-tile${isWidgetsActive ? " is-active" : ""}" data-widget="widgets" aria-label="Widgets summary, ${widgetItems.length} active widgets" aria-expanded="${isWidgetsActive ? "true" : "false"}">
        <span class="flank-widget-glance">
          <span class="flank-widget-icon">${iconSvg("grid", 20)}</span>
          <span class="flank-widget-value flank-num">${widgetItems.length}</span>
        </span>
      </button>
    `);
  } else {
    widgetItems.forEach((item) => {
      const wKind = item.widgetKind || item.widget;
      if (!wKind) return;
      const isActive = state2.activeWidget === wKind;
      const rendered = renderWidgetTileInner(wKind, state2, theme, item, isActive);
      if (!rendered) return;
      middleItems.push(
        `<button type="button" class="flank-tile ${rendered.extraClass}${isActive ? " is-active" : ""}" draggable="true" data-item-id="${escapeHtml(item.id)}" data-widget="${escapeHtml(wKind)}" aria-label="${escapeHtml(rendered.ariaLabel)}" aria-expanded="${isActive ? "true" : "false"}">
          ${rendered.html}
        </button>`
      );
    });
  }
  const collapseHandleIcon = edge === "right" ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>` : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`;
  const collapseHandle = `<button type="button" class="flank-dock-collapse-handle" data-action="collapse-dock" aria-label="Hide Flank" title="Hide Flank">
    ${collapseHandleIcon}
  </button>`;
  const settingsActive = state2.activeFullWindow === "settings";
  let settingsTile = "";
  if (isRow) {
    settingsTile = `
      <button type="button" class="flank-tile${settingsActive ? " is-active" : ""}" data-action="open-settings" aria-label="Flank settings and themes">
        <span class="flank-row-left"><span class="flank-row-code">cfg</span><span>settings</span></span>
        <span class="flank-row-right">Alt ,</span>
      </button>`;
  } else {
    settingsTile = `
      <div class="flank-group-divider" aria-hidden="true"></div>
      <button type="button" class="flank-tile${settingsActive ? " is-active" : ""}" data-action="open-settings" aria-label="Flank settings and themes">
        ${iconSvg("settings", 20)}
      </button>`;
  }
  const tabChevronIcon = edge === "right" ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>` : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>`;
  const tabHtml = `<button type="button" class="flank-dock-tab${state2.showLogoOnTab ? " has-logo" : ""}" data-action="expand-dock" aria-label="Show Flank" title="Show Flank">
    ${state2.showLogoOnTab ? `<span class="flank-tab-glyph" style="display:flex; align-items:center; justify-content:center; margin-bottom: 6px; color: currentColor">${flankGlyph({ solid: true, size: 20 })}</span>` : ""}
    <span class="flank-tab-chevron">${tabChevronIcon}</span>
  </button>`;
  return `<nav class="flank-dock${state2.showLogoOnTab ? " has-logo" : ""}" id="flank-dock" aria-label="Flank dock" data-edge="${edge}">
    <div class="flank-glass-backdrop" aria-hidden="true"></div>
    <div class="flank-glass-sheen" aria-hidden="true"></div>
    <div class="flank-glass-rim" aria-hidden="true"></div>
    <div class="flank-dock-content flank-dock-items">
      ${collapseHandle}
      <div class="flank-dock-scrollable">
        ${middleItems.join("")}
      </div>
      ${settingsTile}
    </div>
    ${tabHtml}
  </nav>`;
}

// src/ui/cards.ts
function escapeHtml2(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderEmptyState(title, subtitle) {
  return `
    <div class="flank-empty-state" style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding: var(--flank-scale-space-16) var(--flank-scale-space-12); gap: var(--flank-scale-space-xs); pointer-events:none;">
      <span class="flank-empty-glyph" style="display:flex; align-items:center; justify-content:center; color: var(--flank-color-text-muted); opacity: 0.60; margin-bottom: 6px;">
        ${flankGlyph({ solid: false, size: 56 })}
      </span>
      <span style="font-size: var(--flank-scale-font-body-sm); font-weight: 500; color: var(--flank-color-text); line-height: 1.3">${escapeHtml2(title)}</span>
      ${subtitle ? `<span style="font-size: var(--flank-scale-font-caption); color: var(--flank-color-text-muted); line-height: 1.2">${escapeHtml2(subtitle)}</span>` : ""}
    </div>
  `;
}
function formatRate(bytesPerSec) {
  if (bytesPerSec >= 1024 * 1024) {
    return `${(bytesPerSec / (1024 * 1024)).toFixed(1)} MB/s`;
  }
  if (bytesPerSec >= 1024) {
    return `${Math.round(bytesPerSec / 1024)} KB/s`;
  }
  return `${Math.round(bytesPerSec)} B/s`;
}
function formatDuration2(sec) {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor(s % 3600 / 60);
  const rem = s % 60;
  if (h > 0) {
    return `${h}:${m < 10 ? "0" : ""}${m}:${rem < 10 ? "0" : ""}${rem}`;
  }
  return `${m}:${rem < 10 ? "0" : ""}${rem}`;
}
function buildSparklineSvg(history, ariaLabel = "CPU usage over the last 60 seconds") {
  const pts = history.length >= 2 ? history : [20, 24, 22, 28, 23];
  const width = 264;
  const height = 52;
  const stepX = width / Math.max(1, pts.length - 1);
  const coords = pts.map((val, idx) => {
    const x = Math.round(idx * stepX);
    const clamped = Math.max(0, Math.min(100, val));
    const y = Math.round(height - 6 - clamped / 100 * (height - 14));
    return `${x} ${y}`;
  });
  const linePath = `M${coords.join(" L")}`;
  const areaPath = `${linePath} L${width} ${height} L0 ${height} Z`;
  return `<svg width="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="${escapeHtml2(ariaLabel)}" style="height: var(--flank-scale-sparkline-height)">
    <path d="${areaPath}" fill="var(--flank-color-accent-soft)"/>
    <path d="${linePath}" fill="none" stroke="var(--flank-color-accent)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
}
function buildAsciiBar(percent, totalCols = 20) {
  const clamped = Math.max(0, Math.min(100, percent));
  const filled = Math.round(clamped / 100 * totalCols);
  const empty = Math.max(0, totalCols - filled);
  return `<span aria-hidden="true"><span style="color: var(--flank-color-accent)">${"&#9608;".repeat(filled)}</span><span style="color: var(--flank-color-track-bg)">${"&#9617;".repeat(empty)}</span></span>`;
}
function renderWeatherSkeleton() {
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
      `).join("")}
    </div>
  `;
}
function renderWeatherCardInner(state2) {
  const w = state2.weather;
  if (!w || !w.city || !Array.isArray(w.hourly)) {
    return renderWeatherSkeleton();
  }
  const hourlyCols = w.hourly.slice(0, 5).map(
    (h, idx) => `<div class="flank-hourly-col${idx === 0 ? " is-current" : ""}" style="flex: 1; text-align: center;">
        <span>${escapeHtml2(h.label)}</span>
        <span style="display:flex; justify-content:center; color: var(--flank-color-text); width: 16px; height: 16px; margin: 4px auto">${iconSvg(h.icon, 16)}</span>
        <span class="flank-hourly-temp tabular-nums" style="font-variant-numeric: tabular-nums;">${h.tempC}\xB0</span>
      </div>`
  ).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">${escapeHtml2(w.city)}</span>
      <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Now</span>
    </div>
    <div class="flank-hero" style="margin: 4px 0 8px;">
      <span class="flank-hero__value">${w.tempC}\xB0</span>
      <div class="flank-hero__secondary">
        <div style="font-size: 14px; font-weight: 500; color: var(--flank-color-text);">${escapeHtml2(w.condition)}</div>
        <div class="tabular-nums" style="font-size: 11px; color: var(--flank-color-text-muted);">H ${w.highC}\xB0 &nbsp;L ${w.lowC}\xB0</div>
      </div>
    </div>
    <div class="flank-hourly-row" style="display: flex; justify-content: space-between; border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding-top: 10px;">
      ${hourlyCols}
    </div>
  `;
}
function renderStatsCardInner(state2, theme) {
  const s = state2.stats;
  if (theme.layout.widgetStyle === "row") {
    return `
      <div style="color: var(--flank-color-accent); font-weight: 700; font-size: var(--flank-scale-font-caption)">$ flank stats --live</div>
      <div class="flank-stat-list" style="font-size: var(--flank-scale-font-caption)">
        <div class="flank-card-row-between"><span class="flank-stat-label">cpu</span>${buildAsciiBar(s.cpuPercent)}<span class="tabular-nums">${s.cpuPercent}%</span></div>
        <div class="flank-card-row-between"><span class="flank-stat-label">mem</span>${buildAsciiBar(s.memPercent)}<span class="tabular-nums">${s.memPercent}%</span></div>
        <div class="flank-card-row-between"><span class="flank-stat-label">gpu</span>${buildAsciiBar(s.gpuPercent)}<span class="tabular-nums">${s.gpuPercent}%</span></div>
        <div class="flank-card-row-between"><span class="flank-stat-label">disk</span>${buildAsciiBar(s.diskPercent)}<span class="tabular-nums">${s.diskPercent}%</span></div>
        <div class="flank-card-row-between"><span class="flank-stat-label">bat</span>${buildAsciiBar(state2.battery.percent)}<span class="tabular-nums">${state2.battery.percent}%</span></div>
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
        ${s.paused ? "Paused" : `Live \xB7 ${s.refreshSec}s`}
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
          <span class="flank-meter__header-label">Disk (${escapeHtml2(s.diskMount)})</span>
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
      <span style="display:flex; width: 14px; height: 14px">${iconSvg("arrow-up-right", 14)}</span>
    </button>
  `;
}
function renderBatteryCardInner(state2) {
  const b = state2.battery;
  const peripheralRows = b.peripherals.map((p) => {
    const iconName = p.kind === "mouse" ? "mouse" : p.kind === "keyboard" ? "keyboard" : p.kind === "headphones" ? "headphones" : p.charging ? "battery-charging" : "battery";
    return `<div class="flank-meter">
        <div class="flank-meter__header">
          <span class="flank-meter__header-label" style="display:flex; align-items:center; gap: 6px;">
            <span style="display:flex; color: var(--flank-color-text-muted); width: 14px; height: 14px;">${iconSvg(iconName, 14)}</span>
            <span>${escapeHtml2(p.name)}</span>
          </span>
          <span class="flank-meter__header-val">${p.percent}%${p.charging ? " \xB7 Chg" : ""}</span>
        </div>
        <div class="flank-meter__bar"><div class="flank-meter__fill" style="width: ${Math.max(0, Math.min(100, p.percent))}%"></div></div>
      </div>`;
  }).join("");
  const statusLine = `${escapeHtml2(b.stateText)}${b.timeRemainingText ? `, ${escapeHtml2(b.timeRemainingText)}` : ""}`;
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Laptop Battery</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${escapeHtml2(b.powerMode)}
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
      <span style="display:flex; width: 14px; height: 14px">${iconSvg("arrow-up-right", 14)}</span>
    </button>
  `;
}
function renderPlayerCardInner(state2) {
  const p = state2.player;
  const pct = p.durationSec > 0 ? Math.min(100, Math.round(p.positionSec / p.durationSec * 100)) : 0;
  const sourceLabel = p.sourceApp ? `${p.sourceApp} \xB7 ` : "";
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Media Player</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${p.playing ? "Playing" : "Paused"}
      </span>
    </div>
    <div style="display:flex; gap: 12px; align-items: center; width: 100%;">
      ${p.artworkUrl ? `
        <img src="${escapeHtml2(p.artworkUrl)}" class="flank-player-art${p.playing ? " is-playing" : ""}" style="width: 48px; height: 48px; flex-shrink: 0; border-radius: 8px; object-fit: cover; border: 1px solid var(--flank-color-divider-soft); box-shadow: 0 4px 14px rgba(0,0,0,0.20);" alt="Artwork" />
      ` : `
        <span class="flank-player-art${p.playing ? " is-playing" : ""}" style="width: 44px; height: 44px; flex-shrink: 0; border-radius: 8px; background: var(--flank-color-tile-bg); display:flex; align-items:center; justify-content:center; color: var(--flank-color-accent); border: 1px solid var(--flank-color-divider-soft); transition: box-shadow 0.3s ease, border-color 0.3s ease;" aria-hidden="true">${iconSvg("equalizer", 22)}</span>
      `}
      <div style="display:flex; flex-direction:column; gap: 2px; min-width: 0; flex: 1;">
        <div style="font-size: 13px; font-weight: 600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color: var(--flank-color-text);" title="${escapeHtml2(p.title)}">${escapeHtml2(p.title)}</div>
        <div style="font-size: 12px; color: var(--flank-color-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml2(p.artist)}</div>
        <div style="font-size: 10px; color: var(--flank-color-text-muted);">${escapeHtml2(sourceLabel)}${p.playing ? "Now playing" : "Paused"}</div>
      </div>
    </div>
    <div class="flank-meter">
      <div class="flank-meter__bar" style="height: 4px; margin-bottom: 4px;"><div class="flank-meter__fill" style="width: ${pct}%"></div></div>
      <div class="flank-row tabular-nums" style="min-height: auto; font-size: 11px; color: var(--flank-color-text-muted);">
        <span>${formatDuration2(p.positionSec)}</span>
        <span>${p.durationSec > 0 ? formatDuration2(p.durationSec) : "Live"}</span>
      </div>
    </div>
    <div class="flank-actions" style="justify-content: center; gap: 12px;">
      <button type="button" class="flank-btn is-secondary" style="flex: none; width: 34px; height: 34px; padding: 0; border-radius: 50%;" data-media-action="previous" aria-label="Previous track">
        ${iconSvg("previous", 15)}
      </button>
      <button type="button" class="flank-btn is-primary${p.playing ? " is-playing-btn" : ""}" style="flex: none; width: 38px; height: 38px; padding: 0; border-radius: 50%;" data-media-action="play-pause" aria-label="${p.playing ? "Pause" : "Play"}">
        ${iconSvg(p.playing ? "pause" : "play", 16)}
      </button>
      <button type="button" class="flank-btn is-secondary" style="flex: none; width: 34px; height: 34px; padding: 0; border-radius: 50%;" data-media-action="next" aria-label="Next track">
        ${iconSvg("next", 15)}
      </button>
    </div>
  `;
}
function renderFocusCardInner(state2) {
  const f = state2.focus;
  const elapsed = Math.max(0, f.totalSec - f.remainingSec);
  const pct = f.totalSec > 0 ? Math.min(100, Math.round(elapsed / f.totalSec * 100)) : 0;
  const presets = [15, 25, 45, 60];
  const presetButtons = presets.map(
    (mins) => `<button type="button" class="flank-chip${f.durationMinutes === mins && f.mode === "focus" ? " is-active" : ""}" style="flex: 1; justify-content: center; height: 28px;" data-focus-duration="${mins}">${mins}m</button>`
  ).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Focus Timer</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${f.running ? f.mode === "focus" ? "Focusing" : "Break" : f.mode === "focus" ? "Deep focus" : "Break"}
      </span>
    </div>
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 4px; padding: 6px 0;">
      <span class="tabular-nums" style="text-align:center; font-family: var(--flank-font-stack); font-variant-numeric: tabular-nums; line-height: 1; font-size: 34px; font-weight: 700; color: var(--flank-color-text);">${formatDuration2(f.remainingSec)}</span>
      <span style="text-align:center; font-size: 11px; color: var(--flank-color-text-muted);">${f.mode === "focus" ? "Focus session" : "Rest break"} \xB7 ${f.completedSessions} done \xB7 ${f.focusedMinutesToday}m today</span>
    </div>
    <div class="flank-meter__bar" style="height: 6px; margin-bottom: 4px;"><div class="flank-meter__fill" style="width: ${pct}%"></div></div>
    <div style="display: flex; gap: 6px; width: 100%;">
      ${presetButtons}
    </div>
    <div style="display: flex; width: 100%;">
      <button type="button" class="flank-chip${f.mode === "break" ? " is-active" : ""}" style="width: 100%; justify-content: center; height: 28px;" data-focus-action="switch-mode">${f.mode === "break" ? "Switch to focus" : "Break 5m"}</button>
    </div>
    <div class="flank-actions">
      <button type="button" class="flank-btn is-primary" style="flex: 1; justify-content: center;" data-focus-action="toggle">
        <span>${f.running ? "Pause" : "Start focus"}</span>
      </button>
      <button type="button" class="flank-btn is-secondary" style="width: 32px; min-width: 32px; padding: 0; justify-content: center;" data-focus-action="reset" aria-label="Reset timer" title="Reset timer">
        ${iconSvg("reset", 16)}
      </button>
    </div>
  `;
}
function renderClockCardInner(state2) {
  const c = state2.clock;
  const cityRows = c.cities.map(
    (item) => `<div class="flank-row" style="padding: 4px 0; border-bottom: var(--flank-scale-hairline) solid var(--flank-color-divider-soft);">
        <span style="display:flex; align-items:center; gap: 8px; min-width: 0; flex: 1;">
          <span style="display:flex; color: var(--flank-color-text-muted); width: 14px; height: 14px;">${iconSvg(item.isDay ? "sun" : "moon", 14)}</span>
          <span style="display:flex; flex-direction:column; min-width: 0;">
            <span style="font-size: 12px; font-weight: 600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml2(item.city)}</span>
            <span style="font-size: 11px; color: var(--flank-color-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml2(item.country ? `${item.country} \xB7 ${item.offsetText}` : item.offsetText)}</span>
          </span>
        </span>
        <span style="display:flex; align-items:center; gap: 6px; flex-shrink: 0;">
          <span class="tabular-nums" style="font-size: 12px; font-weight: 600; font-family: var(--flank-font-stack);">${escapeHtml2(item.timeText)}</span>
          <button type="button" class="flank-win-btn" style="width: 20px; height: 20px;" data-clock-remove="${escapeHtml2(item.id)}" aria-label="Remove ${escapeHtml2(item.city)}" title="Remove ${escapeHtml2(item.city)}">
            ${iconSvg("x", 11)}
          </button>
        </span>
      </div>`
  ).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">World Clock</span>
      <span class="flank-card__chip" style="font-size: 11px; color: var(--flank-color-text-muted);">${escapeHtml2(c.localZoneText)}</span>
    </div>
    <div class="flank-hero" style="margin: 4px 0 8px;">
      <span class="flank-hero__value tabular-nums" style="font-family: var(--flank-font-stack); font-size: 26px;">${escapeHtml2(c.localTimeText)}</span>
      <div class="flank-hero__secondary">
        <div style="font-size: 13px; font-weight: 500; color: var(--flank-color-text);">Local time</div>
        <div style="font-size: 11px; color: var(--flank-color-text-muted);">${escapeHtml2(c.localDateText)}</div>
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
      <span style="display:flex; width: 14px; height: 14px">${iconSvg("arrow-up-right", 14)}</span>
    </button>
  `;
}
function tryEvalMathSnippet(text) {
  if (!text || text.length > 150) return null;
  const lines = text.trim().split("\n");
  const lastLine = lines[lines.length - 1].trim();
  if (!lastLine) return null;
  const cleanExpr = lastLine.replace(/,/g, "");
  if (/^[\d\s+\-*/%().]+$/.test(cleanExpr) && /[+\-*/%]/.test(cleanExpr)) {
    try {
      const val = Function(`"use strict"; return (${cleanExpr});`)();
      if (typeof val === "number" && Number.isFinite(val)) {
        const formatted = Number.isInteger(val) ? val.toLocaleString() : parseFloat(val.toFixed(4)).toLocaleString();
        return `${lastLine} = ${formatted}`;
      }
    } catch {
      return null;
    }
  }
  return null;
}
function renderScratchpadCardInner(state2) {
  const sp = state2.scratchpad || { activeNoteId: "note-1", notes: [{ id: "note-1", title: "Note 1", content: "", updatedAt: "Now" }] };
  const notes = sp.notes.length > 0 ? sp.notes : [{ id: "note-1", title: "Note 1", content: "", updatedAt: "Now" }];
  const active = notes.find((n) => n.id === sp.activeNoteId) || notes[0];
  const mathHint = tryEvalMathSnippet(active.content);
  const charCount = active.content.length;
  const wordCount = active.content.trim() ? active.content.trim().split(/\s+/).length : 0;
  const tabChips = notes.map(
    (n, idx) => `<button type="button" class="flank-chip${n.id === active.id ? " is-active" : ""}" style="height: 24px; padding: 0 8px; font-size: 11px;" data-scratch-select="${escapeHtml2(n.id)}">${escapeHtml2(n.title || `Note ${idx + 1}`)}</button>`
  ).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Quick Scratchpad</span>
      <span class="flank-card__chip" style="font-size: 11px; color: var(--flank-color-text-muted);">${wordCount}w \xB7 ${charCount}c</span>
    </div>
    <div style="display:flex; gap: 6px; flex-wrap: wrap; width: 100%;">
      ${tabChips}
      <button type="button" class="flank-chip" style="height: 24px; padding: 0 8px; font-size: 11px;" data-action="scratch-new-note" title="New note tab">+ New</button>
    </div>
    <textarea id="flank-scratchpad-textarea" class="flank-input" rows="4" style="width: 100%; height: 86px; resize: none; border-radius: 8px; padding: 8px; font-family: var(--flank-type-mono); font-size: 12px; line-height: 1.45; box-sizing: border-box;" placeholder="Jot down notes, snippets, or math (e.g. 1450 * 12)...">${escapeHtml2(active.content)}</textarea>
    ${mathHint ? `<div class="flank-row" style="padding: 4px 8px; border-radius: 6px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft);">
            <span class="tabular-nums" style="font-family: var(--flank-type-mono); font-size: 12px; font-weight: 600; color: var(--flank-color-accent)">${escapeHtml2(mathHint)}</span>
            <button type="button" class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 10px;" data-copy-raw="${escapeHtml2(mathHint.split("=")[1]?.trim() || "")}">Copy</button>
          </div>` : ""}
    <div class="flank-actions">
      <button type="button" class="flank-btn is-primary" style="flex: 1; justify-content: center;" data-action="scratch-copy">
        <span>Copy note</span>
      </button>
      <button type="button" class="flank-btn is-secondary" style="flex: 0 0 auto; padding: 0 12px;" data-action="scratch-clear">
        <span>Clear</span>
      </button>
      ${notes.length > 1 ? `<button type="button" class="flank-btn is-ghost" style="flex: 0 0 auto; width: 32px; padding: 0;" data-scratch-delete="${escapeHtml2(active.id)}" aria-label="Delete note tab" title="Delete note tab">${iconSvg("trash", 14)}</button>` : ""}
    </div>
  `;
}
function renderColorPickerCardInner(state2) {
  const cp = state2.colorpicker || {
    currentHex: "#2F4BFF",
    rgbText: "rgb(47, 75, 255)",
    hslText: "hsl(232, 100%, 59%)",
    cssVarText: "--color-accent: #2F4BFF;",
    contrastWhite: 5.56,
    contrastDark: 3.41,
    history: ["#2F4BFF", "#0369A1", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"]
  };
  const wPass = cp.contrastWhite >= 7 ? "AAA" : cp.contrastWhite >= 4.5 ? "AA" : "Low";
  const dPass = cp.contrastDark >= 7 ? "AAA" : cp.contrastDark >= 4.5 ? "AA" : "Low";
  const swatches = (cp.history || []).slice(0, 6).map(
    (hex) => `<button type="button" class="flank-swatch${hex.toUpperCase() === cp.currentHex.toUpperCase() ? " is-selected" : ""}" style="width: 24px; height: 24px; border-radius: 6px; background: ${escapeHtml2(hex)}; border: 1px solid var(--flank-color-divider); cursor: pointer;" data-color-select="${escapeHtml2(hex)}" aria-label="Select ${escapeHtml2(hex)}" title="${escapeHtml2(hex)}"></button>`
  ).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Color Picker</span>
      <button type="button" class="flank-chip is-active" style="height: 24px; padding: 0 8px; font-size: 11px;" data-action="pick-screen-color">
        <span style="display:inline-flex; width: 12px; height: 12px; margin-right: 4px;">${iconSvg("eyedropper", 12)}</span>
        Pick screen
      </button>
    </div>
    <div style="display:flex; align-items:center; gap: 10px; width: 100%;">
      <label style="width: 36px; height: 36px; border-radius: 8px; background: ${escapeHtml2(cp.currentHex)}; border: 1px solid var(--flank-color-divider); cursor: pointer; flex-shrink: 0; display:flex; align-items:center; justify-content:center" title="Click to open color palette">
        <input type="color" id="flank-native-color-input" value="${escapeHtml2(cp.currentHex)}" style="opacity:0; width:1px; height:1px; position:absolute" />
      </label>
      <div class="flank-row" style="flex: 1; min-width: 0;">
        <span class="tabular-nums" style="font-family: var(--flank-type-mono); font-size: 14px; font-weight: 700; color: var(--flank-color-text);">${escapeHtml2(cp.currentHex)}</span>
        <button type="button" class="flank-chip" style="height: 24px; padding: 0 8px; font-size: 11px;" data-copy-raw="${escapeHtml2(cp.currentHex)}">Copy HEX</button>
      </div>
    </div>
    <div style="display:flex; flex-direction:column; gap: 6px; border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding-top: 8px;">
      <div class="flank-row">
        <span class="tabular-nums" style="font-family: var(--flank-type-mono); font-size: 11px; color: var(--flank-color-text-muted);">${escapeHtml2(cp.rgbText)}</span>
        <button type="button" class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;" data-copy-raw="${escapeHtml2(cp.rgbText)}">Copy RGB</button>
      </div>
      <div class="flank-row">
        <span class="tabular-nums" style="font-family: var(--flank-type-mono); font-size: 11px; color: var(--flank-color-text-muted);">${escapeHtml2(cp.hslText)}</span>
        <button type="button" class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;" data-copy-raw="${escapeHtml2(cp.hslText)}">Copy HSL</button>
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
function renderCalendarSkeleton() {
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
      `).join("")}
    </div>
  `;
}
function renderCalendarCardInner(state2) {
  if (!state2.calendar) {
    return renderCalendarSkeleton();
  }
  const cal = state2.calendar || { nextSummary: "Today", todayDateText: "Today", events: [] };
  const events = cal.events || [];
  const nextEvt = events[0];
  const eventRows = events.length > 0 ? events.map((evt) => {
    return `<div class="flank-cal-row" style="display:flex; align-items:center; min-height: 32px; gap: 8px; padding: 4px 0; border-bottom: var(--flank-scale-hairline) solid var(--flank-color-divider-soft);">
          <span class="flank-cal-time tabular-nums" style="width: 64px; min-width: 64px; flex-shrink: 0; font-size: 11px; font-weight: 500; color: var(--flank-color-text-muted); font-variant-numeric: tabular-nums;">${escapeHtml2(evt.timeText)}</span>
          <span class="flank-cal-content" style="flex: 1; min-width: 0; display:flex; flex-direction:column; justify-content:center;">
            <span class="flank-cal-title" style="font-size: 12px; font-weight: 600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml2(evt.title)}">${escapeHtml2(evt.title)}</span>
            <span class="flank-row-meta" style="font-size: 11px; color: var(--flank-color-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml2(evt.relativeText)}${evt.provider ? ` \xB7 ${escapeHtml2(evt.provider)}` : ""}</span>
          </span>
          <span style="flex-shrink: 0; display:flex; align-items:center; gap: 4px;">
            ${evt.joinUrl ? `<button type="button" class="flank-chip is-active" style="padding: 2px 8px; height: 22px; font-size: 11px; font-weight: 600;" data-item-kind="link" data-item-id="${escapeHtml2(evt.id)}" data-target="${escapeHtml2(evt.joinUrl)}">Join</button>` : ""}
            <button type="button" class="flank-win-btn" style="width: 20px; height: 20px; display:flex; align-items:center; justify-content:center;" data-cal-delete="${escapeHtml2(evt.id)}" aria-label="Remove event" title="Remove event">${iconSvg("x", 11)}</button>
          </span>
        </div>`;
  }).join("") : renderEmptyState("No upcoming meetings", "Your schedule is clear for today");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Agenda</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${escapeHtml2(cal.nextSummary)}
      </span>
    </div>
    ${nextEvt ? `<div class="flank-subcard" style="padding: 10px 12px; border-radius: 10px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; flex-direction:column; gap: 6px;">
            <span class="flank-card-muted" style="font-size: 11px;">Up next \xB7 ${escapeHtml2(nextEvt.timeText)} (${escapeHtml2(nextEvt.relativeText)})</span>
            <span style="font-size: 13px; font-weight: 600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml2(nextEvt.title)}">${escapeHtml2(nextEvt.title)}</span>
            ${nextEvt.joinUrl ? `<button type="button" class="flank-btn is-primary" style="width: 100%; justify-content:center; margin-top: 4px;" data-item-kind="link" data-item-id="${escapeHtml2(nextEvt.id)}" data-target="${escapeHtml2(nextEvt.joinUrl)}">
                    <span>Join ${escapeHtml2(nextEvt.provider || "Meeting")}</span>
                    <span style="display:flex; width: 14px; height: 14px">${iconSvg("arrow-up-right", 14)}</span>
                  </button>` : ""}
          </div>` : ""}
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
function renderAudioCardInner(state2) {
  const au = state2.audio || {
    volumePercent: 68,
    muted: false,
    micMuted: false,
    outputDevice: "System Speakers",
    inputDevice: "Default Microphone"
  };
  const presets = [0, 25, 50, 75, 100];
  const presetChips = presets.map(
    (v) => `<button type="button" class="flank-chip${!au.muted && Math.abs(au.volumePercent - v) <= 5 ? " is-active" : ""}" style="justify-content: center; height: 26px; padding: 0 2px; font-size: 11px; min-width: 0;" data-audio-set="${v}">${v}%</button>`
  ).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Audio &amp; Mic Mixer</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${au.muted ? "Muted" : "Active"}
      </span>
    </div>
    <div class="flank-hero" style="margin: 4px 0 8px;">
      <span class="flank-hero__value tabular-nums" style="font-family: var(--flank-font-stack); font-variant-numeric: tabular-nums;">${au.muted ? "Mute" : `${au.volumePercent}%`}</span>
      <div class="flank-hero__secondary">
        <div style="font-size: 13px; font-weight: 500; color: var(--flank-color-text);">Master output</div>
        <div style="font-size: 11px; color: var(--flank-color-text-muted); max-width: 150px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml2(au.outputDevice)}</div>
      </div>
    </div>
    <div class="flank-meter__bar" style="height: 6px; margin-bottom: 8px;"><div class="flank-meter__fill" style="width: ${au.muted ? 0 : Math.max(0, Math.min(100, au.volumePercent))}%"></div></div>
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; width: 100%;">
      ${presetChips}
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1.4fr 1fr; gap: 6px; width: 100%;">
      <button type="button" class="flank-btn is-secondary is-compact" style="justify-content: center; height: 32px; font-size: 11px; padding: 0 4px;" data-audio-action="vol-down">-10%</button>
      <button type="button" class="flank-btn is-compact ${au.muted ? "is-secondary" : "is-primary"}" style="justify-content: center; height: 32px; font-size: 11px; padding: 0 6px; gap: 4px;" data-audio-action="toggle-mute">
        <span style="display: flex; align-items: center; width: 14px; height: 14px; flex-shrink: 0;">${iconSvg(au.muted ? "volume-mute" : "volume", 14)}</span>
        <span>${au.muted ? "Unmute" : "Mute"}</span>
      </button>
      <button type="button" class="flank-btn is-secondary is-compact" style="justify-content: center; height: 32px; font-size: 11px; padding: 0 4px;" data-audio-action="vol-up">+10%</button>
    </div>
    <div class="flank-row" style="border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding-top: 8px;">
      <span style="display:flex; align-items:center; gap: 6px; min-width: 0; flex: 1;">
        <span style="display:flex; width: 14px; height: 14px; color: var(--flank-color-text-muted); flex-shrink: 0;">${iconSvg(au.micMuted ? "mic-off" : "mic", 14)}</span>
        <span style="font-size: 12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml2(au.inputDevice)}</span>
      </span>
      <button type="button" class="flank-chip${au.micMuted ? "" : " is-active"}" style="height: 24px; padding: 0 8px; font-size: 11px; flex-shrink: 0;" data-audio-action="toggle-mic">
        ${au.micMuted ? "Mic Muted" : "Mic Live"}
      </button>
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center; height: 32px; gap: 6px;" data-item-kind="link" data-item-id="win-sound-mixer" data-target="ms-settings:apps-volume">
      <span>Volume mixer</span>
      <span style="display:flex; width: 14px; height: 14px; flex-shrink: 0;">${iconSvg("arrow-up-right", 14)}</span>
    </button>
  `;
}
function renderNetworkCardInner(state2) {
  const net = state2.network || {
    connected: true,
    ssid: "Connected",
    localIp: "127.0.0.1",
    pingMs: 14,
    downMbps: 12.5,
    upMbps: 4.1,
    ports: []
  };
  const portRows = (net.ports || []).slice(0, 4).map(
    (p) => `<div class="flank-row" style="padding: 4px 0; border-bottom: var(--flank-scale-hairline) solid var(--flank-color-divider-soft);">
        <span style="display:flex; align-items:center; gap: 6px; min-width: 0; flex: 1;">
          <span class="tabular-nums" style="font-family: var(--flank-type-mono); font-weight: 700; font-size: 12px; color: var(--flank-color-accent)">:${p.port}</span>
          <span style="font-size: 11px; color: var(--flank-color-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml2(p.processName)} (PID ${p.pid})</span>
        </span>
        <span style="display:flex; align-items:center; gap: 4px; flex-shrink: 0;">
          <button type="button" class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;" data-item-kind="link" data-item-id="port-${p.port}" data-target="${escapeHtml2(p.url)}" title="Open ${escapeHtml2(p.url)}">Open</button>
          <button type="button" class="flank-win-btn" style="width: 20px; height: 20px;" data-kill-pid="${p.pid}" title="Stop process PID ${p.pid}">${iconSvg("x", 11)}</button>
        </span>
      </div>`
  ).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Network &amp; Ports</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${escapeHtml2(net.ssid)}
      </span>
    </div>
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px;">
      <div style="padding: 8px 10px; border-radius: 8px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; flex-direction:column; gap: 2px;">
        <span style="font-size: 11px; color: var(--flank-color-text-muted);">Ping latency</span>
        <span class="tabular-nums" style="font-size: 13px; font-weight: 600; font-family: var(--flank-font-stack);">${net.pingMs} ms</span>
      </div>
      <div style="padding: 8px 10px; border-radius: 8px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; flex-direction:column; gap: 2px;">
        <span style="font-size: 11px; color: var(--flank-color-text-muted);">Local IPv4</span>
        <button type="button" class="tabular-nums" style="font-size: 12px; background:none; border:none; padding:0; text-align:left; font-family: var(--flank-type-mono); color: var(--flank-color-text); cursor: pointer;" data-copy-raw="${escapeHtml2(net.localIp)}" title="Click to copy IP">${escapeHtml2(net.localIp)}</button>
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
function renderClipboardCardInner(state2) {
  const recent = state2.clipboard.items.slice(0, 3);
  const rows = recent.map(
    (item) => `<button type="button" class="flank-list-row" style="height: 44px; padding: 0 8px; border-radius: 8px; border: 1px solid var(--flank-color-divider-soft);" data-copy-id="${escapeHtml2(item.id)}">
        <span class="flank-row-chip" style="width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0;">${iconSvg(item.kind === "link" ? "link" : item.kind === "code" ? "code" : item.kind === "file" ? "file" : "text", 14)}</span>
        <span class="flank-row-text" style="min-width: 0; flex: 1;">
          <span class="flank-row-title" style="font-size: 12px;">${escapeHtml2(item.title)}</span>
          <span class="flank-row-meta" style="font-size: 10px;">${escapeHtml2(item.relativeTime)}</span>
        </span>
      </button>`
  ).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Clipboard</span>
      <span class="flank-card__chip" style="font-size: 11px; color: var(--flank-color-text-muted);">${state2.clipboard.count} saved</span>
    </div>
    <div style="display:flex; flex-direction:column; gap: 6px; width: 100%;">
      ${rows || renderEmptyState("No clipboard history", "Copy text, links, or files to view them here")}
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center;" data-action="open-clipboard-window">
      <span>Open clipboard history</span>
      <span style="display:flex; width: 14px; height: 14px">${iconSvg("arrow-up-right", 14)}</span>
    </button>
  `;
}
function renderWidgetsGridCardInner(state2) {
  const enabledWidgets = state2.items.filter(
    (i) => i.enabled && (i.group === "widgets" || !i.group && i.kind === "widget")
  );
  const widgetTiles = enabledWidgets.map((item) => {
    const wKind = item.widgetKind || item.widget;
    if (!wKind) return "";
    return `
        <button type="button" class="flank-widget-grid-item" data-widget="${escapeHtml2(wKind)}" aria-label="${escapeHtml2(item.label)}">
          <span class="flank-widget-grid-icon">${iconSvg(item.icon, 18)}</span>
          <span class="flank-widget-grid-label">${escapeHtml2(item.label)}</span>
        </button>
      `;
  }).join("");
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
function renderBluetoothCardInner(state2) {
  const bt = state2.bluetooth || {
    connectedCount: 0,
    devices: []
  };
  const devices = bt.devices || [];
  const deviceRows = devices.map((d) => {
    const iconName = d.type === "headphones" ? "headphones" : d.type === "mouse" ? "mouse" : d.type === "keyboard" ? "keyboard" : "bluetooth";
    const isConn = d.connected;
    const statusPill = isConn ? `<span class="flank-chip is-active" style="height: 20px; padding: 0 6px; font-size: 10px;">Connected</span>` : `<span class="flank-chip" style="height: 20px; padding: 0 6px; font-size: 10px; opacity: 0.65;">Paired</span>`;
    const batMeter = d.batteryLevel !== void 0 && d.batteryLevel !== null && d.batteryLevel >= 0 ? `<div style="display:flex; align-items:center; gap: 4px; font-size: 11px; color: var(--flank-color-text-muted);">
          <span class="tabular-nums">${d.batteryLevel}%</span>
        </div>` : "";
    return `
      <div class="flank-row" style="padding: 6px 8px; border-radius: 8px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap: 8px; min-width: 0; flex: 1;">
          <span style="display:flex; width: 16px; height: 16px; color: var(--flank-color-text-muted); flex-shrink: 0;">${iconSvg(iconName, 16)}</span>
          <div style="display:flex; flex-direction:column; min-width: 0;">
            <span style="font-size: 12px; font-weight: 500; color: var(--flank-color-text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml2(d.name)}">${escapeHtml2(d.name)}</span>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap: 6px; flex-shrink: 0;">
          ${batMeter}
          ${statusPill}
        </div>
      </div>
    `;
  }).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Bluetooth &amp; Peripherals</span>
      <span class="flank-live-pill">
        <span class="flank-live-dot"></span>
        ${bt.connectedCount} connected
      </span>
    </div>
    <div style="display:flex; flex-direction:column; gap: 6px;">
      ${deviceRows.length > 0 ? deviceRows : renderEmptyState("No Bluetooth peripherals found", "Pair devices in Windows Bluetooth settings")}
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center; height: 32px; gap: 6px;" data-item-kind="link" data-item-id="win-bluetooth-settings" data-target="ms-settings:bluetooth">
      <span>Windows Bluetooth settings</span>
      <span style="display:flex; width: 14px; height: 14px; flex-shrink: 0;">${iconSvg("arrow-up-right", 14)}</span>
    </button>
  `;
}
function renderTasksCardInner(state2) {
  const tasks = state2.tasks || { items: [], pendingCount: 0 };
  const items = tasks.items || [];
  const pending = tasks.pendingCount ?? items.filter((t) => !t.done).length;
  const rowsHtml = items.length === 0 ? `<div style="padding: 16px 0; text-align: center; font-size: 12px; color: var(--flank-color-text-muted);">No tasks yet. Type below to add one!</div>` : items.map((t) => `
        <div style="display: flex; align-items: center; gap: 10px; padding: 7px 0; border-bottom: 1px solid var(--flank-color-divider-soft); width: 100%; box-sizing: border-box;">
          <button type="button" data-action="toggle-task" data-task-id="${escapeHtml2(t.id)}" title="${t.done ? "Mark pending" : "Mark done"}" style="width: 16px; height: 16px; min-width: 16px; max-width: 16px; flex: 0 0 16px; border-radius: 4px; border: 1.5px solid ${t.done ? "var(--flank-color-accent)" : "var(--flank-color-divider-soft)"}; background: ${t.done ? "var(--flank-color-accent)" : "transparent"}; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; outline: none; transition: all 0.15s ease;">
            ${t.done ? iconSvg("check", 10) : ""}
          </button>
          <span style="flex: 1 1 auto; min-width: 0; font-size: 12px; line-height: 1.35; color: ${t.done ? "var(--flank-color-text-muted)" : "var(--flank-color-text)"}; text-decoration: ${t.done ? "line-through" : "none"}; word-break: break-word;">${escapeHtml2(t.text)}</span>
          <button type="button" data-action="delete-task" data-task-id="${escapeHtml2(t.id)}" title="Delete task" style="width: 20px; height: 20px; min-width: 20px; flex: 0 0 20px; border: none; background: transparent; color: var(--flank-color-text-muted); opacity: 0.6; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; border-radius: 4px;">
            ${iconSvg("x", 12)}
          </button>
        </div>
      `).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Tasks &amp; To-Do</span>
      <span class="flank-live-pill">${pending} pending</span>
    </div>
    <div style="display:flex; gap: 6px; margin-bottom: 8px;">
      <input type="text" id="flank-task-input" class="flank-card-input" placeholder="+ Add a task (press Enter)..." style="flex: 1; height: 30px; font-size: 12px; padding: 0 10px; border-radius: 6px; border: 1px solid var(--flank-color-divider-soft); background: var(--flank-color-tile-bg); color: var(--flank-color-text);" />
      <button type="button" class="flank-btn is-primary" style="height: 30px; padding: 0 10px; font-size: 11px;" data-action="add-task">Add</button>
    </div>
    <div style="max-height: 180px; overflow-y: auto; display: flex; flex-direction: column;">
      ${rowsHtml}
    </div>
    ${items.some((t) => t.done) ? `
      <div style="display: flex; justify-content: flex-end; margin-top: 6px;">
        <button type="button" class="flank-chip" style="font-size: 10px; padding: 2px 8px;" data-action="clear-completed-tasks">Clear completed</button>
      </div>
    ` : ""}
  `;
}
function renderCalculatorCardInner(state2) {
  const calc = state2.calculator || { lastExpr: "", lastResult: "0", history: [] };
  const historyRows = (calc.history || []).slice(0, 3).map((h) => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0; font-size: 11px; font-family: var(--flank-type-mono); cursor: pointer;" data-action="recall-calc" data-expr="${escapeHtml2(h.expr)}">
      <span style="color: var(--flank-color-text-muted); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml2(h.expr)}</span>
      <span style="color: var(--flank-color-accent); font-weight: 600;">= ${escapeHtml2(h.result)}</span>
    </div>
  `).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Smart Calculator</span>
      <span class="flank-live-pill">Live Math</span>
    </div>
    <input type="text" id="flank-calc-input" class="flank-card-input" value="${escapeHtml2(calc.lastExpr || "")}" placeholder="Type e.g. 120 * 1.18, 16 GB to MB, sqrt(144)..." style="width: 100%; height: 32px; font-family: var(--flank-type-mono); font-size: 12px; padding: 0 10px; border-radius: 6px; border: 1px solid var(--flank-color-divider-soft); background: var(--flank-color-tile-bg); color: var(--flank-color-text); margin-bottom: 8px;" />
    <div style="display:flex; justify-content:space-between; align-items:center; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); border-radius: 8px; padding: 8px 12px; margin-bottom: 8px;">
      <div style="font-size: 18px; font-weight: 700; font-family: var(--flank-type-mono); color: var(--flank-color-accent); flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis;" id="flank-calc-result">${escapeHtml2(calc.lastResult || "0")}</div>
      <div style="display:flex; gap: 6px; align-items:center;">
        <button type="button" class="flank-chip" data-action="clear-calc" title="Clear calculator" style="font-size: 11px; padding: 2px 8px;">Clear</button>
        <button type="button" class="flank-chip" data-action="copy-calc-result" title="Copy result to clipboard" style="font-size: 11px; padding: 2px 8px;">Copy</button>
      </div>
    </div>
    ${historyRows ? `
      <div style="border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding-top: 6px; margin-top: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--flank-color-text-muted);">Recent</span>
          <button type="button" class="flank-chip" data-action="clear-calc-history" style="font-size: 9px; padding: 1px 6px;">Clear history</button>
        </div>
        ${historyRows}
      </div>
    ` : ""}
  `;
}
function renderStorageCardInner(state2) {
  const s = state2.storage || { primaryPercent: 68, primaryDrive: "C:", drives: [] };
  const drives = s.drives || [];
  const driveRows = drives.map((d) => `
    <div class="flank-subcard" style="padding: 8px 10px; margin-bottom: 6px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
        <span style="font-size: 12px; font-weight: 600; display:flex; align-items:center; gap: 6px;">
          ${iconSvg("hard-drive", 14)} <strong>${escapeHtml2(d.letter)}</strong> ${escapeHtml2(d.label)}
        </span>
        <span style="font-size: 11px; color: var(--flank-color-text-muted); font-family: var(--flank-type-mono);">${d.freeGb} GB free (${d.percent}%)</span>
      </div>
      <div class="flank-meter__bar" style="height: 5px; margin-bottom: 6px;">
        <div class="flank-meter__fill" style="width: ${d.percent}%; background: ${d.percent > 90 ? "#EF4444" : d.percent > 80 ? "#F59E0B" : "var(--flank-color-accent)"};"></div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size: 10px; color: var(--flank-color-text-muted);">${d.usedGb} / ${d.totalGb} GB</span>
        <button type="button" class="flank-chip" style="height: 20px; padding: 0 8px; font-size: 10px;" data-action="open-drive" data-drive="${escapeHtml2(d.letter)}">Open Explorer</button>
      </div>
    </div>
  `).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Storage &amp; Drives</span>
      <span class="flank-live-pill">${drives.length} drives</span>
    </div>
    ${driveRows}
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center; height: 28px; font-size: 11px; margin-top: 4px;" data-action="launch-disk-cleanup">
      <span>Open Windows Disk Cleanup</span>
    </button>
  `;
}
function renderDisplayCardInner(state2) {
  const d = state2.display || {
    monitorName: "Primary Display",
    brightness: 85,
    nightLight: false,
    resolution: "2560 \xD7 1440",
    refreshRate: 144,
    supportedRefreshRates: [60, 120, 144],
    scaling: 100
  };
  const monitorLabel = d.monitorName || "Primary Display";
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Display &amp; Brightness</span>
      <span class="flank-live-pill" style="font-weight: 700;">${escapeHtml2(monitorLabel)} \xB7 ${d.refreshRate}Hz</span>
    </div>

    <!-- Brightness Subcard -->
    <div class="flank-subcard" style="padding: 10px; margin-bottom: 8px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
        <span style="font-size: 12px; font-weight: 600; display:flex; align-items:center; gap: 6px;">
          ${iconSvg("sun", 14)} ${escapeHtml2(monitorLabel)} Brightness
        </span>
        <span style="font-size: 12px; font-weight: 700; font-family: var(--flank-type-mono); color: var(--flank-color-accent);" id="flank-disp-val">${d.brightness}%</span>
      </div>
      <input type="range" id="flank-brightness-slider" min="0" max="100" value="${d.brightness}" style="width:100%; cursor: pointer;" />
      <div style="display:flex; justify-content:space-between; gap: 4px; margin-top: 8px;">
        <button type="button" class="flank-chip" data-action="set-display-preset" data-val="25" style="font-size: 10px; padding: 2px 8px; flex: 1;">25%</button>
        <button type="button" class="flank-chip" data-action="set-display-preset" data-val="50" style="font-size: 10px; padding: 2px 8px; flex: 1;">50%</button>
        <button type="button" class="flank-chip" data-action="set-display-preset" data-val="75" style="font-size: 10px; padding: 2px 8px; flex: 1;">75%</button>
        <button type="button" class="flank-chip" data-action="set-display-preset" data-val="100" style="font-size: 10px; padding: 2px 8px; flex: 1;">100%</button>
      </div>
    </div>

    <div class="flank-row" style="padding: 6px 0; border-bottom: var(--flank-scale-hairline) solid var(--flank-color-divider-soft);">
      <span style="font-size: 12px; color: var(--flank-color-text-muted);">Active Resolution</span>
      <span style="font-size: 12px; font-weight: 600; font-family: var(--flank-type-mono);">${escapeHtml2(d.resolution)}</span>
    </div>
    <div class="flank-row" style="padding: 6px 0;">
      <span style="font-size: 12px; color: var(--flank-color-text-muted);">Night Light</span>
      <button type="button" class="flank-chip${d.nightLight ? " is-active" : ""}" data-action="toggle-night-light" style="font-size: 11px;">${d.nightLight ? "Active" : "Off"}</button>
    </div>
  `;
}
function renderPrivacyCardInner(state2) {
  const prv = state2.privacy || { micActive: false, cameraActive: false, micMuted: false, activeApps: [] };
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Privacy Guard</span>
      <span class="flank-live-pill" style="${prv.micActive ? "color: #EF4444;" : ""}">
        <span class="flank-live-dot" style="${prv.micActive ? "background: #EF4444;" : ""}"></span>
        ${prv.micActive ? "Mic Active" : "Protected"}
      </span>
    </div>
    <div class="flank-subcard" style="padding: 10px; margin-bottom: 8px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap: 8px;">
          ${iconSvg(prv.micMuted ? "mic-off" : "mic", 18)}
          <div>
            <div style="font-size: 12px; font-weight: 600;">System Microphone</div>
            <div style="font-size: 11px; color: var(--flank-color-text-muted);">${prv.micMuted ? "Muted globally" : prv.micActive ? "In use by apps" : "Idle"}</div>
          </div>
        </div>
        <button type="button" class="flank-chip${prv.micMuted ? " is-active" : ""}" data-action="toggle-mic-mute" style="font-size: 11px;">
          ${prv.micMuted ? "Unmute" : "Mute Mic"}
        </button>
      </div>
    </div>
    <div class="flank-row" style="padding: 6px 0;">
      <span style="font-size: 12px; color: var(--flank-color-text-muted);">Webcam Status</span>
      <span style="font-size: 12px; font-weight: 600; color: ${prv.cameraActive ? "#EF4444" : "var(--flank-color-text)"};">${prv.cameraActive ? "Camera In Use" : "Camera Off"}</span>
    </div>
  `;
}
function renderAmbientCardInner(state2) {
  const amb = state2.ambient || { playing: false, sound: "rain", volume: 65 };
  const presets = [
    { id: "rain", name: "Rain", emoji: "\u{1F327}\uFE0F" },
    { id: "waves", name: "Waves", emoji: "\u{1F30A}" },
    { id: "campfire", name: "Campfire", emoji: "\u{1FAB5}" },
    { id: "coffee", name: "Cafe", emoji: "\u2615" },
    { id: "wind", name: "Wind", emoji: "\u{1F343}" },
    { id: "brown", name: "Brown Noise", emoji: "\u{1F4FB}" }
  ];
  const chipsHtml = presets.map((p) => `
    <button type="button" class="flank-chip${amb.sound === p.id ? " is-active" : ""}" data-action="select-ambient-sound" data-sound="${p.id}" style="font-size: 11px; padding: 4px 8px;">
      ${p.emoji} ${p.name}
    </button>
  `).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Focus Ambiance</span>
      <span class="flank-live-pill">${amb.playing ? "Playing" : "Muted"}</span>
    </div>
    <div style="display:flex; flex-wrap:wrap; gap: 6px; margin-bottom: 12px;">
      ${chipsHtml}
    </div>
    <div class="flank-subcard" style="padding: 10px; margin-bottom: 8px;">
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px;">
        <span>Ambiance Volume</span>
        <span style="font-weight: 700; font-family: var(--flank-type-mono);" id="flank-amb-vol-text">${amb.volume}%</span>
      </div>
      <input type="range" id="flank-ambient-volume" min="0" max="100" value="${amb.volume}" style="width:100%; cursor: pointer;" />
    </div>
    <button type="button" class="flank-btn is-primary" style="width: 100%; justify-content: center; height: 32px; gap: 8px;" data-action="toggle-ambient">
      ${iconSvg(amb.playing ? "pause" : "play", 15)}
      <span>${amb.playing ? "Pause Ambiance" : "Play Soundscape"}</span>
    </button>
  `;
}
function renderRunnerCardInner(state2) {
  const run = state2.runner || { running: false, lastCmd: "", lastOutput: "", commands: [] };
  const commands = run.commands || [];
  const cmdChips = commands.map((c) => `
    <button type="button" class="flank-chip" data-action="run-preset-cmd" data-cmd="${escapeHtml2(c.cmd)}" title="${escapeHtml2(c.desc)}" style="font-size: 11px; padding: 4px 8px;">
      ${escapeHtml2(c.name)}
    </button>
  `).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">Quick Command Runner</span>
      <span class="flank-live-pill" style="${run.running ? "color: #f59e0b; border-color: rgba(245, 158, 11, 0.4);" : ""}">${run.running ? "\u25CF Running..." : ">_ CLI"}</span>
    </div>
    <div style="display:flex; flex-wrap:wrap; gap: 6px; margin-bottom: 8px;">
      ${cmdChips}
    </div>
    <div style="display:flex; gap: 6px; margin-bottom: 8px;">
      <input type="text" id="flank-runner-input" class="flank-card-input" placeholder="Enter shell command (e.g. ping 8.8.8.8)..." style="flex: 1; height: 30px; font-family: var(--flank-type-mono); font-size: 11px; padding: 0 10px; border-radius: 6px; border: 1px solid var(--flank-color-divider-soft); background: var(--flank-color-tile-bg); color: var(--flank-color-text);" />
      ${run.running ? `
        <button type="button" class="flank-btn" style="height: 30px; padding: 0 10px; font-size: 11px; background: rgba(239, 68, 68, 0.25); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.45); font-weight: 600;" data-action="terminate-cmd" title="Terminate running process">Terminate</button>
      ` : `
        <button type="button" class="flank-btn is-primary" style="height: 30px; padding: 0 10px; font-size: 11px;" data-action="run-custom-cmd">Run</button>
      `}
    </div>
    ${run.lastOutput ? `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-size: 10px; color: var(--flank-color-text-muted); font-family: var(--flank-type-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 220px;">$ ${escapeHtml2(run.lastCmd)}</span>
        <button type="button" class="flank-chip" style="font-size: 9px; padding: 1px 6px;" data-action="clear-runner-output">Clear</button>
      </div>
      <div style="background: rgba(0,0,0,0.45); border: 1px solid var(--flank-color-divider-soft); border-radius: 6px; padding: 8px; font-family: var(--flank-type-mono); font-size: 10px; color: var(--flank-color-text); max-height: 120px; overflow-y: auto; white-space: pre-wrap; word-break: break-all;">
        ${escapeHtml2(run.lastOutput)}
      </div>
    ` : ""}
  `;
}
function renderGpuCardInner(state2) {
  const gpu = state2.gpu || { name: "GPU Diagnostics", utilizationPercent: 40, tempC: 54, vramUsedGb: 3.5, vramTotalGb: 8, driverVersion: "DirectX 12" };
  const vramPct = Math.min(100, Math.round(gpu.vramUsedGb / (gpu.vramTotalGb || 8) * 100));
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">GPU Diagnostics</span>
      <span class="flank-live-pill">${gpu.tempC}\xB0C</span>
    </div>
    <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--flank-color-text);">${escapeHtml2(gpu.name)}</div>
    <div class="flank-subcard" style="padding: 10px; margin-bottom: 8px;">
      <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom: 4px;">
        <span>3D Engine Load</span>
        <span style="font-weight:700; font-family: var(--flank-type-mono); color: var(--flank-color-accent);">${gpu.utilizationPercent}%</span>
      </div>
      <div class="flank-meter__bar" style="height: 5px; margin-bottom: 8px;">
        <div class="flank-meter__fill" style="width: ${gpu.utilizationPercent}%;"></div>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom: 4px;">
        <span>VRAM (${gpu.vramUsedGb} / ${gpu.vramTotalGb} GB)</span>
        <span style="font-weight:700; font-family: var(--flank-type-mono);">${vramPct}%</span>
      </div>
      <div class="flank-meter__bar" style="height: 5px;">
        <div class="flank-meter__fill" style="width: ${vramPct}%; background: #A855F7;"></div>
      </div>
    </div>
    <div class="flank-row" style="padding: 4px 0; font-size: 11px;">
      <span style="color: var(--flank-color-text-muted);">Driver / API</span>
      <span style="font-family: var(--flank-type-mono);">${escapeHtml2(gpu.driverVersion || "DirectX 12")}</span>
    </div>
  `;
}
function renderGithubCardInner(state2) {
  const gh = state2.github || { connected: false, pendingCount: 0, items: [] };
  const items = gh.items || [];
  if (!gh.connected) {
    return `
      <div class="flank-card__header">
        <span class="flank-card__title">GitHub Activity</span>
        <span class="flank-live-pill" style="opacity: 0.65;">Offline</span>
      </div>
      <div style="padding: 16px 8px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--flank-color-tile-bg); display: flex; align-items: center; justify-content: center; color: var(--flank-color-text-muted);">
          ${iconSvg("github", 20)}
        </div>
        <div style="color: var(--flank-color-text-muted); font-size: 12px; line-height: 1.45; max-width: 250px;">
          Connect your GitHub account in <strong>Settings \u2192 Widgets</strong> to view live pull requests and review requests.
        </div>
        <button type="button" class="flank-btn is-primary" style="height: 28px; font-size: 11px; padding: 0 14px; margin-top: 2px;" data-action="open-settings-widgets">
          Connect GitHub
        </button>
      </div>
    `;
  }
  const rows = items.map((it) => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--flank-color-divider-soft); gap: 8px;">
      <div style="display:flex; flex-direction:column; gap: 2px; min-width:0; flex:1;">
        <div style="font-size: 12px; font-weight: 600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color: var(--flank-color-text);" title="${escapeHtml2(it.title)}">${escapeHtml2(it.title)}</div>
        <div style="font-size: 10px; color: var(--flank-color-text-muted);">${escapeHtml2(it.repo)} \xB7 ${escapeHtml2(it.status)}</div>
      </div>
      <button type="button" class="flank-chip" style="font-size: 10px; padding: 2px 8px; flex-shrink: 0;" data-item-kind="link" data-item-id="${escapeHtml2(it.id)}" data-target="${escapeHtml2(it.url)}">View</button>
    </div>
  `).join("");
  return `
    <div class="flank-card__header">
      <span class="flank-card__title">GitHub Activity</span>
      <span class="flank-live-pill">${gh.username ? `@${escapeHtml2(gh.username)} \xB7 ` : ""}${gh.pendingCount} PRs</span>
    </div>
    <div style="max-height: 180px; overflow-y: auto;">
      ${rows || '<div style="padding:16px 0; text-align:center; font-size:12px; color:var(--flank-color-text-muted);">All caught up! No pending PRs.</div>'}
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center; height: 28px; font-size: 11px; margin-top: 6px;" data-item-kind="link" data-item-id="gh-notifications" data-target="https://github.com/notifications">
      <span>Open GitHub Notifications</span>
      <span style="display:flex; width: 12px; height: 12px; flex-shrink: 0;">${iconSvg("arrow-up-right", 12)}</span>
    </button>
  `;
}
function renderHoverCardHtml(state2, theme) {
  const active = state2.activeWidget;
  if (!active || state2.activeFullWindow) return "";
  let inner = "";
  let label = "";
  switch (active) {
    case "widgets":
      label = "Active widgets";
      inner = renderWidgetsGridCardInner(state2);
      break;
    case "weather":
      label = "Weather";
      inner = renderWeatherCardInner(state2);
      break;
    case "stats":
      label = "System stats";
      inner = renderStatsCardInner(state2, theme);
      break;
    case "battery":
      label = "Battery and power";
      inner = renderBatteryCardInner(state2);
      break;
    case "player":
      label = "Mini player";
      inner = renderPlayerCardInner(state2);
      break;
    case "focus":
      label = "Focus timer";
      inner = renderFocusCardInner(state2);
      break;
    case "clock":
      label = "World clock";
      inner = renderClockCardInner(state2);
      break;
    case "scratchpad":
      label = "Quick scratchpad";
      inner = renderScratchpadCardInner(state2);
      break;
    case "colorpicker":
      label = "Color picker";
      inner = renderColorPickerCardInner(state2);
      break;
    case "calendar":
      label = "Agenda and meetings";
      inner = renderCalendarCardInner(state2);
      break;
    case "audio":
      label = "Audio and mic mixer";
      inner = renderAudioCardInner(state2);
      break;
    case "network":
      label = "Network and dev ports";
      inner = renderNetworkCardInner(state2);
      break;
    case "clipboard":
      label = "Clipboard history";
      inner = renderClipboardCardInner(state2);
      break;
    case "bluetooth":
      label = "Bluetooth & Peripherals";
      inner = renderBluetoothCardInner(state2);
      break;
    case "tasks":
      label = "Tasks and To-Do";
      inner = renderTasksCardInner(state2);
      break;
    case "calculator":
      label = "Smart Calculator";
      inner = renderCalculatorCardInner(state2);
      break;
    case "storage":
      label = "Storage & Drives";
      inner = renderStorageCardInner(state2);
      break;
    case "display":
      label = "Display & Brightness";
      inner = renderDisplayCardInner(state2);
      break;
    case "privacy":
      label = "Privacy Guard";
      inner = renderPrivacyCardInner(state2);
      break;
    case "ambient":
      label = "Focus Ambiance";
      inner = renderAmbientCardInner(state2);
      break;
    case "runner":
      label = "Command Runner";
      inner = renderRunnerCardInner(state2);
      break;
    case "gpu":
      label = "GPU Diagnostics";
      inner = renderGpuCardInner(state2);
      break;
    case "github":
      label = "GitHub Activity";
      inner = renderGithubCardInner(state2);
      break;
  }
  if (!inner) {
    inner = `
      <div class="flank-card-empty-state" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:var(--flank-scale-space-16) 0; gap:var(--flank-scale-space-8); text-align:center;">
        <span style="display:flex; align-items:center; justify-content:center; color: var(--flank-color-text-muted); opacity: 0.60;">
          ${flankGlyph({ solid: false, size: 56 })}
        </span>
        <span style="font-size:var(--flank-scale-font-caption); color:var(--flank-color-text-muted);">No activity to display</span>
      </div>
    `;
  }
  return `<section class="flank-card" id="flank-hover-card" aria-label="${escapeHtml2(label)}">
    <div class="flank-glass-backdrop" aria-hidden="true"></div>
    <div class="flank-glass-sheen" aria-hidden="true"></div>
    <div class="flank-glass-rim" aria-hidden="true"></div>
    <div class="flank-caret" id="flank-card-caret" aria-hidden="true"></div>
    <div class="flank-card-content" id="flank-card-content">
      ${inner}
    </div>
  </section>`;
}

// src/ui/magnification.ts
var activeDockEl = null;
var tileStates = [];
var animFrameId = null;
var lastTimestamp = 0;
var dockEdge = "right";
var SPRING_STIFFNESS = 300;
var SPRING_DAMPING = 24;
var MAX_SCALE = 1.25;
var DISTANCE_THRESHOLD = 112;
function isReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.getAttribute("data-reduced-motion") === "true" || document.documentElement.getAttribute("data-reduce-motion") === "true";
}
function updateSprings(timestamp) {
  if (isReducedMotion()) {
    resetDockMagnification();
    return;
  }
  if (!lastTimestamp) lastTimestamp = timestamp;
  const dt = Math.min(0.032, (timestamp - lastTimestamp) / 1e3);
  lastTimestamp = timestamp;
  let isAnyMoving = false;
  for (const item of tileStates) {
    if (!item.el.isConnected) {
      continue;
    }
    const displacement = item.currentScale - item.targetScale;
    const springForce = -SPRING_STIFFNESS * displacement;
    const dampingForce = -SPRING_DAMPING * item.velocity;
    const acceleration = springForce + dampingForce;
    item.velocity += acceleration * dt;
    item.currentScale += item.velocity * dt;
    if (Math.abs(displacement) > 1e-3 || Math.abs(item.velocity) > 1e-3) {
      isAnyMoving = true;
      const s = item.currentScale.toFixed(3);
      item.el.style.transform = `scale(${s}) translateZ(0)`;
      item.el.style.zIndex = item.currentScale > 1.04 ? "12" : "";
    } else {
      item.currentScale = item.targetScale;
      item.velocity = 0;
      if (item.targetScale === 1) {
        item.el.style.transform = "";
        item.el.style.zIndex = "";
      } else {
        const s = item.targetScale.toFixed(3);
        item.el.style.transform = `scale(${s}) translateZ(0)`;
        item.el.style.zIndex = item.targetScale > 1.04 ? "12" : "";
      }
    }
  }
  if (isAnyMoving) {
    animFrameId = requestAnimationFrame(updateSprings);
  } else {
    animFrameId = null;
  }
}
function startSpringLoop() {
  if (animFrameId === null) {
    lastTimestamp = performance.now();
    animFrameId = requestAnimationFrame(updateSprings);
  }
}
function calculateTargetScale(mouseCoord, tileCenter) {
  const dist = Math.abs(mouseCoord - tileCenter);
  if (dist >= DISTANCE_THRESHOLD) return 1;
  const factor = Math.exp(-(dist * dist) / 3200);
  const scale = 1 + (MAX_SCALE - 1) * factor;
  return scale < 1.01 ? 1 : scale;
}
function attachDockMagnification(dockEl, edge = "right") {
  if (activeDockEl === dockEl && dockEdge === edge) return;
  resetDockMagnification();
  activeDockEl = dockEl;
  dockEdge = edge;
  const tiles = Array.from(dockEl.querySelectorAll(".flank-tile"));
  const origin = edge === "left" ? "left center" : "right center";
  tileStates = tiles.map((el) => {
    el.style.transformOrigin = origin;
    return {
      el,
      currentScale: 1,
      targetScale: 1,
      velocity: 0
    };
  });
  const onPointerMove = (e) => {
    if (isReducedMotion()) {
      return;
    }
    const mouseCoord = e.clientY;
    for (const item of tileStates) {
      const rect = item.el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      item.targetScale = calculateTargetScale(mouseCoord, center);
    }
    startSpringLoop();
  };
  const onPointerLeave = () => {
    for (const item of tileStates) {
      item.targetScale = 1;
    }
    startSpringLoop();
  };
  dockEl.removeEventListener("pointermove", onPointerMove);
  dockEl.removeEventListener("pointerleave", onPointerLeave);
  dockEl.addEventListener("pointermove", onPointerMove, { passive: true });
  dockEl.addEventListener("pointerleave", onPointerLeave, { passive: true });
}
function resetDockMagnification() {
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
  for (const item of tileStates) {
    item.el.style.transform = "";
    item.el.style.zIndex = "";
    item.currentScale = 1;
    item.targetScale = 1;
    item.velocity = 0;
  }
  tileStates = [];
  activeDockEl = null;
}

// src/ui/calc.ts
function evalSafeMathExpr(expr) {
  let pos = 0;
  const skipWs = () => {
    while (pos < expr.length && /\s/.test(expr[pos])) pos++;
  };
  const parseExpr = () => {
    let val = parseTerm();
    while (true) {
      skipWs();
      const ch = expr[pos];
      if (ch === "+") {
        pos++;
        val += parseTerm();
      } else if (ch === "-") {
        pos++;
        val -= parseTerm();
      } else {
        break;
      }
    }
    return val;
  };
  const parseTerm = () => {
    let val = parsePower();
    while (true) {
      skipWs();
      const ch = expr[pos];
      if (ch === "*") {
        if (expr[pos + 1] === "*") break;
        pos++;
        val *= parsePower();
      } else if (ch === "/") {
        pos++;
        val /= parsePower();
      } else if (ch === "%") {
        pos++;
        val %= parsePower();
      } else {
        break;
      }
    }
    return val;
  };
  const parsePower = () => {
    const base = parseUnary();
    skipWs();
    if (expr[pos] === "^") {
      pos++;
      return Math.pow(base, parsePower());
    }
    if (expr[pos] === "*" && expr[pos + 1] === "*") {
      pos += 2;
      return Math.pow(base, parsePower());
    }
    return base;
  };
  const parseUnary = () => {
    skipWs();
    if (expr[pos] === "+") {
      pos++;
      return parseUnary();
    }
    if (expr[pos] === "-") {
      pos++;
      return -parseUnary();
    }
    return parsePrimary();
  };
  const parsePrimary = () => {
    skipWs();
    if (expr[pos] === "(") {
      pos++;
      const inner = parseExpr();
      skipWs();
      if (expr[pos] !== ")") throw new Error("Unbalanced parentheses");
      pos++;
      return inner;
    }
    const numMatch = /^(?:\d+(?:\.\d*)?|\.\d+)/.exec(expr.slice(pos));
    if (numMatch) {
      pos += numMatch[0].length;
      return Number(numMatch[0]);
    }
    const identMatch = /^[a-zA-Z]+/.exec(expr.slice(pos));
    if (identMatch) {
      const name = identMatch[0].toLowerCase();
      pos += identMatch[0].length;
      if (name === "pi") return Math.PI;
      if (name === "e") return Math.E;
      skipWs();
      if (expr[pos] !== "(") throw new Error(`Unknown identifier: ${name}`);
      pos++;
      const arg = parseExpr();
      skipWs();
      if (expr[pos] !== ")") throw new Error("Unbalanced function call");
      pos++;
      switch (name) {
        case "sqrt":
          return Math.sqrt(arg);
        case "cbrt":
          return Math.cbrt(arg);
        case "sin":
          return Math.sin(arg);
        case "cos":
          return Math.cos(arg);
        case "tan":
          return Math.tan(arg);
        case "abs":
          return Math.abs(arg);
        case "log":
          return Math.log10(arg);
        case "ln":
          return Math.log(arg);
        default:
          throw new Error(`Unsupported function: ${name}`);
      }
    }
    throw new Error("Unexpected token");
  };
  const result = parseExpr();
  skipWs();
  if (pos !== expr.length) {
    throw new Error("Trailing characters");
  }
  return result;
}
function evaluateExpression(expr) {
  const trimmed = expr.trim();
  if (!trimmed) return "0";
  const convMatch = trimmed.match(/^([\d.]+)\s*([a-zA-Z°]+)\s+(?:to|in)\s+([a-zA-Z°]+)$/i);
  if (convMatch) {
    const val = parseFloat(convMatch[1]);
    const fromUnit = convMatch[2].toLowerCase();
    const toUnit = convMatch[3].toLowerCase();
    if (!isNaN(val)) {
      if (fromUnit === "gb" && toUnit === "mb") return `${formatNum(val * 1024)} MB`;
      if (fromUnit === "mb" && toUnit === "gb") return `${formatNum(val / 1024)} GB`;
      if (fromUnit === "tb" && toUnit === "gb") return `${formatNum(val * 1024)} GB`;
      if (fromUnit === "mb" && toUnit === "kb") return `${formatNum(val * 1024)} KB`;
      if (fromUnit === "kb" && toUnit === "mb") return `${formatNum(val / 1024)} MB`;
      if (fromUnit === "c" && toUnit === "f") return `${formatNum(val * 9 / 5 + 32)}\xB0F`;
      if (fromUnit === "f" && toUnit === "c") return `${formatNum((val - 32) * 5 / 9)}\xB0C`;
      if (fromUnit === "km" && toUnit === "mi") return `${formatNum(val * 0.621371)} mi`;
      if (fromUnit === "mi" && toUnit === "km") return `${formatNum(val * 1.60934)} km`;
      if (fromUnit === "m" && toUnit === "ft") return `${formatNum(val * 3.28084)} ft`;
      if (fromUnit === "ft" && toUnit === "m") return `${formatNum(val / 3.28084)} m`;
      if (fromUnit === "cm" && toUnit === "in") return `${formatNum(val / 2.54)} in`;
      if (fromUnit === "in" && toUnit === "cm") return `${formatNum(val * 2.54)} cm`;
      if (fromUnit === "kg" && toUnit === "lb") return `${formatNum(val * 2.20462)} lb`;
      if (fromUnit === "lb" && toUnit === "kg") return `${formatNum(val / 2.20462)} kg`;
      if (fromUnit === "g" && toUnit === "oz") return `${formatNum(val * 0.035274)} oz`;
      if (fromUnit === "usd" && toUnit === "eur") return `\u20AC ${formatNum(val * 0.92)}`;
      if (fromUnit === "eur" && toUnit === "usd") return `$ ${formatNum(val * 1.09)}`;
      if (fromUnit === "usd" && toUnit === "inr") return `\u20B9 ${formatNum(val * 85.5)}`;
      if (fromUnit === "inr" && toUnit === "usd") return `$ ${formatNum(val / 85.5)}`;
      if (fromUnit === "gbp" && toUnit === "usd") return `$ ${formatNum(val * 1.28)}`;
    }
  }
  const pctOfMatch = trimmed.match(/^([\d.]+)\s*%\s+of\s+([\d.]+)$/i);
  if (pctOfMatch) {
    const pct = parseFloat(pctOfMatch[1]);
    const base = parseFloat(pctOfMatch[2]);
    if (!isNaN(pct) && !isNaN(base)) {
      return formatNum(pct / 100 * base);
    }
  }
  if (!/^[0-9+\-*/().,%^\sA-Za-z]+$/.test(trimmed)) {
    return "Invalid";
  }
  try {
    const res = evalSafeMathExpr(trimmed);
    if (isNaN(res)) return "NaN";
    if (!isFinite(res)) return "Infinity";
    return formatNum(res);
  } catch {
    return "...";
  }
}
function formatNum(num) {
  if (Math.abs(num) >= 1e9 || Math.abs(num) < 1e-4 && num !== 0) {
    return num.toExponential(4);
  }
  const rounded = Math.round(num * 1e4) / 1e4;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

// src/ui/ambient.ts
var audioCtx = null;
var masterGain = null;
var activeNodes = [];
var activeTimers = [];
var isPlaying = false;
var currentPreset = "rain";
var currentVolume = 65;
function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtxClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioCtxClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {
    });
  }
  return audioCtx;
}
function createNoiseBuffer(ctx, type, durationSeconds = 4) {
  const bufferSize = ctx.sampleRate * durationSeconds;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  if (type === "white") {
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  } else if (type === "pink") {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  } else {
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
  }
  return buffer;
}
function stopAmbientSound() {
  activeTimers.forEach((t) => clearInterval(t));
  activeTimers = [];
  for (const node of activeNodes) {
    try {
      node.stop?.();
      node.disconnect();
    } catch {
    }
  }
  activeNodes = [];
  isPlaying = false;
}
function startAmbientSound(preset = "rain", volume = 65) {
  stopAmbientSound();
  const ctx = getAudioContext();
  if (!ctx) return false;
  currentPreset = preset;
  currentVolume = volume;
  if (!masterGain) {
    masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
  }
  masterGain.gain.setValueAtTime(volume / 100 * 0.35, ctx.currentTime);
  if (preset === "rain") {
    const pinkBuf = createNoiseBuffer(ctx, "pink", 4);
    const rainSrc = ctx.createBufferSource();
    rainSrc.buffer = pinkBuf;
    rainSrc.loop = true;
    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = "lowpass";
    rainFilter.frequency.setValueAtTime(1100, ctx.currentTime);
    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.85, ctx.currentTime);
    rainSrc.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(masterGain);
    rainSrc.start();
    activeNodes.push(rainSrc, rainFilter, rainGain);
    const dropletBuf = createNoiseBuffer(ctx, "white", 2);
    const dropSrc = ctx.createBufferSource();
    dropSrc.buffer = dropletBuf;
    dropSrc.loop = true;
    const dropFilter = ctx.createBiquadFilter();
    dropFilter.type = "bandpass";
    dropFilter.frequency.setValueAtTime(3200, ctx.currentTime);
    dropFilter.Q.setValueAtTime(3, ctx.currentTime);
    const dropGain = ctx.createGain();
    dropGain.gain.setValueAtTime(0.18, ctx.currentTime);
    dropSrc.connect(dropFilter);
    dropFilter.connect(dropGain);
    dropGain.connect(masterGain);
    dropSrc.start();
    activeNodes.push(dropSrc, dropFilter, dropGain);
  } else if (preset === "waves") {
    const brownBuf = createNoiseBuffer(ctx, "brown", 6);
    const waveSrc = ctx.createBufferSource();
    waveSrc.buffer = brownBuf;
    waveSrc.loop = true;
    const waveFilter = ctx.createBiquadFilter();
    waveFilter.type = "bandpass";
    waveFilter.frequency.setValueAtTime(380, ctx.currentTime);
    waveFilter.Q.setValueAtTime(1.6, ctx.currentTime);
    const waveSwellGain = ctx.createGain();
    waveSwellGain.gain.setValueAtTime(0.5, ctx.currentTime);
    const filterLfo = ctx.createOscillator();
    filterLfo.frequency.setValueAtTime(0.11, ctx.currentTime);
    const filterLfoGain = ctx.createGain();
    filterLfoGain.gain.setValueAtTime(260, ctx.currentTime);
    filterLfo.connect(filterLfoGain);
    filterLfoGain.connect(waveFilter.frequency);
    filterLfo.start();
    const ampLfo = ctx.createOscillator();
    ampLfo.frequency.setValueAtTime(0.11, ctx.currentTime);
    const ampLfoGain = ctx.createGain();
    ampLfoGain.gain.setValueAtTime(0.35, ctx.currentTime);
    ampLfo.connect(ampLfoGain);
    ampLfoGain.connect(waveSwellGain.gain);
    ampLfo.start();
    waveSrc.connect(waveFilter);
    waveFilter.connect(waveSwellGain);
    waveSwellGain.connect(masterGain);
    waveSrc.start();
    activeNodes.push(waveSrc, waveFilter, waveSwellGain, filterLfo, filterLfoGain, ampLfo, ampLfoGain);
  } else if (preset === "campfire") {
    const flameBuf = createNoiseBuffer(ctx, "brown", 4);
    const flameSrc = ctx.createBufferSource();
    flameSrc.buffer = flameBuf;
    flameSrc.loop = true;
    const flameFilter = ctx.createBiquadFilter();
    flameFilter.type = "lowpass";
    flameFilter.frequency.setValueAtTime(240, ctx.currentTime);
    const flameGain = ctx.createGain();
    flameGain.gain.setValueAtTime(0.7, ctx.currentTime);
    flameSrc.connect(flameFilter);
    flameFilter.connect(flameGain);
    flameGain.connect(masterGain);
    flameSrc.start();
    activeNodes.push(flameSrc, flameFilter, flameGain);
    const crackleInterval = window.setInterval(() => {
      if (!audioCtx || !isPlaying) return;
      if (Math.random() < 0.45) {
        try {
          const osc = audioCtx.createOscillator();
          const popGain = audioCtx.createGain();
          const popFilter = audioCtx.createBiquadFilter();
          const freq = 1800 + Math.random() * 2400;
          popFilter.type = "bandpass";
          popFilter.frequency.setValueAtTime(freq, audioCtx.currentTime);
          popFilter.Q.setValueAtTime(4, audioCtx.currentTime);
          osc.type = Math.random() > 0.5 ? "triangle" : "square";
          osc.frequency.setValueAtTime(freq * 0.5, audioCtx.currentTime);
          const dur = 0.015 + Math.random() * 0.04;
          const peakGain = 0.08 + Math.random() * 0.16;
          popGain.gain.setValueAtTime(1e-3, audioCtx.currentTime);
          popGain.gain.linearRampToValueAtTime(peakGain, audioCtx.currentTime + 2e-3);
          popGain.gain.exponentialRampToValueAtTime(1e-4, audioCtx.currentTime + dur);
          osc.connect(popFilter);
          popFilter.connect(popGain);
          if (masterGain) popGain.connect(masterGain);
          osc.start();
          osc.stop(audioCtx.currentTime + dur);
        } catch {
        }
      }
    }, 90);
    activeTimers.push(crackleInterval);
  } else if (preset === "wind") {
    const pinkBuf = createNoiseBuffer(ctx, "pink", 5);
    const windSrc = ctx.createBufferSource();
    windSrc.buffer = pinkBuf;
    windSrc.loop = true;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.setValueAtTime(420, ctx.currentTime);
    windFilter.Q.setValueAtTime(3.8, ctx.currentTime);
    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.85, ctx.currentTime);
    const gustLfo = ctx.createOscillator();
    gustLfo.frequency.setValueAtTime(0.08, ctx.currentTime);
    const gustLfoGain = ctx.createGain();
    gustLfoGain.gain.setValueAtTime(320, ctx.currentTime);
    gustLfo.connect(gustLfoGain);
    gustLfoGain.connect(windFilter.frequency);
    gustLfo.start();
    const flutterLfo = ctx.createOscillator();
    flutterLfo.frequency.setValueAtTime(0.24, ctx.currentTime);
    const flutterLfoGain = ctx.createGain();
    flutterLfoGain.gain.setValueAtTime(140, ctx.currentTime);
    flutterLfo.connect(flutterLfoGain);
    flutterLfoGain.connect(windFilter.frequency);
    flutterLfo.start();
    windSrc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(masterGain);
    windSrc.start();
    activeNodes.push(windSrc, windFilter, windGain, gustLfo, gustLfoGain, flutterLfo, flutterLfoGain);
  } else if (preset === "coffee") {
    const roomBuf = createNoiseBuffer(ctx, "pink", 6);
    const roomSrc = ctx.createBufferSource();
    roomSrc.buffer = roomBuf;
    roomSrc.loop = true;
    const roomShelf = ctx.createBiquadFilter();
    roomShelf.type = "lowpass";
    roomShelf.frequency.setValueAtTime(1400, ctx.currentTime);
    const roomHighpass = ctx.createBiquadFilter();
    roomHighpass.type = "highpass";
    roomHighpass.frequency.setValueAtTime(120, ctx.currentTime);
    const roomGain = ctx.createGain();
    roomGain.gain.setValueAtTime(0.38, ctx.currentTime);
    roomSrc.connect(roomHighpass);
    roomHighpass.connect(roomShelf);
    roomShelf.connect(roomGain);
    roomGain.connect(masterGain);
    roomSrc.start();
    activeNodes.push(roomSrc, roomHighpass, roomShelf, roomGain);
    const murmurBuf = createNoiseBuffer(ctx, "pink", 5);
    const formantBands = [
      { freq: 380, q: 2, gain: 0.28 },
      { freq: 760, q: 2.4, gain: 0.22 },
      { freq: 1350, q: 2.2, gain: 0.14 }
    ];
    const bandGains = [];
    for (const band of formantBands) {
      const src = ctx.createBufferSource();
      src.buffer = murmurBuf;
      src.loop = true;
      src.playbackRate.setValueAtTime(0.92 + Math.random() * 0.16, ctx.currentTime);
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.setValueAtTime(band.freq, ctx.currentTime);
      bp.Q.setValueAtTime(band.q, ctx.currentTime);
      const g = ctx.createGain();
      g.gain.setValueAtTime(band.gain, ctx.currentTime);
      src.connect(bp);
      bp.connect(g);
      g.connect(masterGain);
      src.start(0, Math.random() * 4);
      activeNodes.push(src, bp, g);
      bandGains.push(g);
    }
    const chatterTimer = window.setInterval(() => {
      if (!audioCtx || !isPlaying) return;
      const now = audioCtx.currentTime;
      bandGains.forEach((g, idx) => {
        const base = formantBands[idx].gain;
        const target = base * (0.55 + Math.random() * 0.95);
        g.gain.cancelScheduledValues(now);
        g.gain.setTargetAtTime(target, now, 0.18 + Math.random() * 0.25);
      });
    }, 320);
    activeTimers.push(chatterTimer);
    const steamBuf = createNoiseBuffer(ctx, "white", 2);
    const cafeEventsTimer = window.setInterval(() => {
      if (!audioCtx || !isPlaying) return;
      const now = audioCtx.currentTime;
      const roll = Math.random();
      if (roll < 0.14 && masterGain) {
        try {
          const steamSrc = audioCtx.createBufferSource();
          steamSrc.buffer = steamBuf;
          const steamFilter = audioCtx.createBiquadFilter();
          steamFilter.type = "bandpass";
          steamFilter.frequency.setValueAtTime(2600 + Math.random() * 900, now);
          steamFilter.Q.setValueAtTime(1.4, now);
          const steamGain = audioCtx.createGain();
          const dur = 0.9 + Math.random() * 0.8;
          steamGain.gain.setValueAtTime(1e-4, now);
          steamGain.gain.linearRampToValueAtTime(0.06, now + 0.18);
          steamGain.gain.exponentialRampToValueAtTime(1e-4, now + dur);
          steamSrc.connect(steamFilter);
          steamFilter.connect(steamGain);
          steamGain.connect(masterGain);
          steamSrc.start(now);
          steamSrc.stop(now + dur + 0.05);
        } catch {
        }
      } else if (roll < 0.26 && masterGain) {
        try {
          const hitSrc = audioCtx.createBufferSource();
          hitSrc.buffer = steamBuf;
          const hitFilter = audioCtx.createBiquadFilter();
          hitFilter.type = "bandpass";
          hitFilter.frequency.setValueAtTime(3400 + Math.random() * 1400, now);
          hitFilter.Q.setValueAtTime(14, now);
          const hitGain = audioCtx.createGain();
          hitGain.gain.setValueAtTime(1e-4, now);
          hitGain.gain.linearRampToValueAtTime(0.09, now + 2e-3);
          hitGain.gain.exponentialRampToValueAtTime(1e-4, now + 0.045);
          hitSrc.connect(hitFilter);
          hitFilter.connect(hitGain);
          hitGain.connect(masterGain);
          hitSrc.start(now);
          hitSrc.stop(now + 0.05);
        } catch {
        }
      }
    }, 1200);
    activeTimers.push(cafeEventsTimer);
  } else {
    const brownBuf = createNoiseBuffer(ctx, "brown", 6);
    const brownSrc = ctx.createBufferSource();
    brownSrc.buffer = brownBuf;
    brownSrc.loop = true;
    const brownFilter = ctx.createBiquadFilter();
    brownFilter.type = "lowpass";
    brownFilter.frequency.setValueAtTime(450, ctx.currentTime);
    brownSrc.connect(brownFilter);
    brownFilter.connect(masterGain);
    brownSrc.start();
    activeNodes.push(brownSrc, brownFilter);
  }
  isPlaying = true;
  return true;
}
function setAmbientVolume(vol) {
  currentVolume = Math.max(0, Math.min(100, vol));
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(currentVolume / 100 * 0.35, audioCtx.currentTime);
  }
}
function isAmbientPlaying() {
  return isPlaying;
}

// src/state/machines.ts
var DockCollapseMachine = class {
  state = { phase: "expanded", reason: "none" };
  constructor(initialPhase = "expanded", initialReason = "none") {
    this.state = {
      phase: initialPhase,
      reason: initialPhase === "expanded" ? "none" : initialReason === "none" ? "manual" : initialReason
    };
  }
  getSnapshot() {
    return { ...this.state };
  }
  getPhase() {
    return this.state.phase;
  }
  isCollapsedOrCollapsing() {
    return this.state.phase === "collapsed" || this.state.phase === "collapsing";
  }
  canShowFlyout() {
    return this.state.phase === "expanded";
  }
  send(event) {
    switch (event.type) {
      case "COLLAPSE": {
        if (this.state.phase === "collapsed" || this.state.phase === "collapsing") {
          return this.getSnapshot();
        }
        this.state = {
          phase: "collapsing",
          reason: event.reason ?? "manual"
        };
        break;
      }
      case "COLLAPSE_ANIMATION_DONE": {
        if (this.state.phase === "collapsing") {
          this.state = {
            phase: "collapsed",
            reason: this.state.reason === "none" ? "manual" : this.state.reason
          };
        }
        break;
      }
      case "EXPAND": {
        if (event.trigger === "fullscreen_exit" && this.state.reason !== "fullscreen") {
          return this.getSnapshot();
        }
        if (this.state.phase === "expanded" || this.state.phase === "expanding") {
          return this.getSnapshot();
        }
        this.state = { phase: "expanding", reason: "none" };
        break;
      }
      case "EXPAND_ANIMATION_DONE": {
        if (this.state.phase === "expanding") {
          this.state = { phase: "expanded", reason: "none" };
        }
        break;
      }
      case "SYNC_HOST": {
        this.state = {
          phase: event.phase,
          reason: event.phase === "expanded" || event.phase === "expanding" ? "none" : event.reason ?? (this.state.reason === "none" ? "manual" : this.state.reason)
        };
        break;
      }
    }
    return this.getSnapshot();
  }
};
var FlyoutCardMachine = class {
  state = { phase: "closed", widget: null };
  getSnapshot() {
    return { ...this.state };
  }
  isOpen() {
    return this.state.phase !== "closed" && this.state.widget !== null;
  }
  isPinned() {
    return this.state.phase === "pinned" && this.state.widget !== null;
  }
  send(event) {
    switch (event.type) {
      case "HOVER_TILE": {
        if (event.dockExpanded === false || event.modalOpen === true || event.pointerBusy === true) {
          return this.getSnapshot();
        }
        if (this.state.phase === "pinned") {
          return this.getSnapshot();
        }
        this.state = { phase: "hovering", widget: event.widget };
        break;
      }
      case "ENTER_CARD": {
        if (this.state.phase === "grace_closing" && this.state.widget) {
          this.state = { phase: "hovering", widget: this.state.widget };
        }
        break;
      }
      case "LEAVE_DOCK_OR_CARD": {
        if (this.state.phase === "hovering" && this.state.widget) {
          this.state = { phase: "grace_closing", widget: this.state.widget };
        }
        break;
      }
      case "GRACE_TIMEOUT": {
        if (this.state.phase === "grace_closing") {
          this.state = { phase: "closed", widget: null };
        }
        break;
      }
      case "TOGGLE_PIN": {
        if (event.dockExpanded === false || event.modalOpen === true) {
          this.state = { phase: "closed", widget: null };
          return this.getSnapshot();
        }
        if (this.state.phase === "pinned" && this.state.widget === event.widget) {
          this.state = { phase: "closed", widget: null };
        } else {
          this.state = { phase: "pinned", widget: event.widget };
        }
        break;
      }
      case "FORCE_CLOSE": {
        this.state = { phase: "closed", widget: null };
        break;
      }
    }
    return this.getSnapshot();
  }
};
var PointerInteractionMachine = class {
  state = { mode: "idle", activeId: null };
  getSnapshot() {
    return { ...this.state };
  }
  isBusy() {
    return this.state.mode !== "idle";
  }
  canStartWindowDrag() {
    return this.state.mode === "idle";
  }
  canTriggerHoverCard() {
    return this.state.mode === "idle";
  }
  send(event) {
    switch (event.type) {
      case "START_SLIDER_SCRUB": {
        this.state = { mode: "scrubbing_slider", activeId: event.controlId ?? "slider" };
        break;
      }
      case "START_DOCK_REORDER": {
        if (this.state.mode === "scrubbing_slider") return this.getSnapshot();
        this.state = { mode: "reordering_dock_tile", activeId: event.itemId };
        break;
      }
      case "START_SETTINGS_REORDER": {
        if (this.state.mode === "scrubbing_slider") return this.getSnapshot();
        this.state = { mode: "reordering_settings_row", activeId: event.itemId };
        break;
      }
      case "START_WINDOW_DRAG": {
        if (this.state.mode !== "idle") return this.getSnapshot();
        this.state = { mode: "dragging_modal_window", activeId: null };
        break;
      }
      case "END_INTERACTION": {
        this.state = { mode: "idle", activeId: null };
        break;
      }
    }
    return this.getSnapshot();
  }
};
var ShortcutRecorderMachine = class {
  state = {
    phase: "idle",
    targetId: null,
    candidateCombo: null,
    conflictMessage: null
  };
  getSnapshot() {
    return { ...this.state };
  }
  isActive() {
    return this.state.phase !== "idle";
  }
  shouldConsumeEscapeKey() {
    return this.state.phase !== "idle";
  }
  send(event) {
    switch (event.type) {
      case "START_RECORDING": {
        this.state = {
          phase: "listening",
          targetId: event.targetId,
          candidateCombo: null,
          conflictMessage: null
        };
        break;
      }
      case "CAPTURE_COMBO": {
        if (this.state.phase === "listening" || this.state.phase === "conflict") {
          this.state = {
            ...this.state,
            phase: "validating",
            candidateCombo: event.combo,
            conflictMessage: null
          };
        }
        break;
      }
      case "MARK_CONFLICT": {
        if (this.state.targetId) {
          this.state = {
            ...this.state,
            phase: "conflict",
            conflictMessage: event.message
          };
        }
        break;
      }
      case "COMMIT_SUCCESS":
      case "CANCEL": {
        this.state = {
          phase: "idle",
          targetId: null,
          candidateCombo: null,
          conflictMessage: null
        };
        break;
      }
    }
    return this.getSnapshot();
  }
};
var FocusTimerMachine = class {
  state;
  constructor(initialMinutes = 25, sessionsCompleted = 0) {
    const sec = Math.max(1, initialMinutes) * 60;
    this.state = {
      phase: "idle",
      mode: "focus",
      running: false,
      remainingSec: sec,
      totalSec: sec,
      sessionsCompleted
    };
  }
  getSnapshot() {
    return { ...this.state };
  }
  send(event) {
    switch (event.type) {
      case "TOGGLE": {
        if (this.state.phase === "idle" || this.state.phase === "paused_focus") {
          this.state = { ...this.state, phase: "running_focus", mode: "focus", running: true };
        } else if (this.state.phase === "running_focus") {
          this.state = { ...this.state, phase: "paused_focus", running: false };
        } else if (this.state.phase === "paused_break") {
          this.state = { ...this.state, phase: "running_break", mode: "break", running: true };
        } else if (this.state.phase === "running_break") {
          this.state = { ...this.state, phase: "paused_break", running: false };
        }
        break;
      }
      case "RESET": {
        this.state = {
          ...this.state,
          phase: "idle",
          running: false,
          remainingSec: this.state.totalSec
        };
        break;
      }
      case "SELECT_PRESET": {
        const sec = Math.max(1, event.minutes) * 60;
        this.state = {
          ...this.state,
          phase: "idle",
          mode: "focus",
          running: false,
          totalSec: sec,
          remainingSec: sec
        };
        break;
      }
      case "START_BREAK": {
        const sec = Math.max(1, event.minutes ?? 5) * 60;
        this.state = {
          ...this.state,
          phase: "running_break",
          mode: "break",
          running: true,
          totalSec: sec,
          remainingSec: sec
        };
        break;
      }
      case "TICK": {
        if (!this.state.running) return this.getSnapshot();
        const nextSec = Math.max(0, this.state.remainingSec - 1);
        if (nextSec === 0) {
          const completed = this.state.mode === "focus" ? this.state.sessionsCompleted + 1 : this.state.sessionsCompleted;
          this.state = {
            ...this.state,
            phase: "idle",
            running: false,
            remainingSec: this.state.totalSec,
            sessionsCompleted: completed
          };
        } else {
          this.state = {
            ...this.state,
            remainingSec: nextSec
          };
        }
        break;
      }
    }
    return this.getSnapshot();
  }
};
var flankMachines = {
  dockCollapse: new DockCollapseMachine(),
  flyoutCard: new FlyoutCardMachine(),
  pointerInteraction: new PointerInteractionMachine(),
  shortcutRecorder: new ShortcutRecorderMachine(),
  focusTimer: new FocusTimerMachine(),
  getDiagnostics() {
    return {
      dockCollapse: this.dockCollapse.getSnapshot(),
      flyoutCard: this.flyoutCard.getSnapshot(),
      pointerInteraction: this.pointerInteraction.getSnapshot(),
      shortcutRecorder: this.shortcutRecorder.getSnapshot(),
      focusTimer: this.focusTimer.getSnapshot()
    };
  }
};

// src/ui/dockState.ts
var isReducedMotion2 = false;
var collapseTimer = null;
var stateChangeListener = null;
function onDockStateChange(listener) {
  stateChangeListener = listener;
}
function getDockState() {
  return flankMachines.dockCollapse.getPhase();
}
function isDockCollapsed() {
  return flankMachines.dockCollapse.isCollapsedOrCollapsing();
}
function initDockState(initialState = "expanded") {
  flankMachines.dockCollapse.send({ type: "SYNC_HOST", phase: initialState });
  isReducedMotion2 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  root.setAttribute("data-dock-state", getDockState());
  window.flankSetDockState = (state2, reason) => {
    setDockState(state2, reason);
  };
  window.flankGetDockState = () => getDockState();
  window.flankGetStateMachines = () => flankMachines.getDiagnostics();
}
function setDockState(next, reason) {
  const prev = getDockState();
  const root = document.documentElement;
  const domState = root.getAttribute("data-dock-state");
  flankMachines.dockCollapse.send({ type: "SYNC_HOST", phase: next, reason });
  root.setAttribute("data-dock-state", next);
  if (prev === next && domState === next) {
    return;
  }
  if (collapseTimer !== null) {
    clearTimeout(collapseTimer);
    collapseTimer = null;
  }
  const duration = isReducedMotion2 ? 0 : 220;
  if (next === "collapsing" || next === "collapsed") {
    flankMachines.flyoutCard.send({ type: "FORCE_CLOSE" });
  }
  if (next === "collapsing") {
    try {
      window.pywebview?.api?.close_hover_card?.();
    } catch {
    }
    collapseTimer = window.setTimeout(() => {
      collapseTimer = null;
      setDockState("collapsed", reason);
      try {
        window.pywebview?.api?.dock_collapse_done?.();
      } catch {
      }
    }, duration);
  } else if (next === "expanding") {
    collapseTimer = window.setTimeout(() => {
      collapseTimer = null;
      setDockState("expanded");
      try {
        window.pywebview?.api?.dock_expand_done?.();
      } catch {
      }
    }, duration);
  }
  stateChangeListener?.(next);
}
function collapseDock(reason = "manual") {
  const phase = getDockState();
  if (phase === "collapsed" || phase === "collapsing") return;
  setDockState("collapsing", reason);
}
function expandDock() {
  const phase = getDockState();
  if (phase === "expanded" || phase === "expanding") return;
  setDockState("expanding");
  try {
    window.pywebview?.api?.expand_dock?.();
  } catch {
  }
}
function toggleDockCollapse() {
  const phase = getDockState();
  if (phase === "expanded" || phase === "expanding") {
    collapseDock("manual");
  } else {
    expandDock();
  }
}

// src/ui/tooltip.ts
var tooltipEl = null;
var showTimer = null;
var cooldownTimer = null;
var isWarm = false;
var isSuppressed = false;
function escapeHtml3(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function getOrCreateTooltip() {
  if (!tooltipEl || !tooltipEl.isConnected) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "flank-dock-tooltip";
    tooltipEl.className = "flank-tooltip";
    tooltipEl.setAttribute("role", "tooltip");
    tooltipEl.setAttribute("aria-hidden", "true");
    document.body.appendChild(tooltipEl);
  }
  return tooltipEl;
}
function showDockTooltip(info) {
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
  const shortcutHtml = info.shortcut ? `<kbd class="flank-tooltip-kbd">${escapeHtml3(info.shortcut)}</kbd>` : "";
  el.innerHTML = `<span class="flank-tooltip-label">${escapeHtml3(info.label)}</span>${shortcutHtml}`;
  const renderPosition = () => {
    if (!el || !el.isConnected) return;
    const ttRect = el.getBoundingClientRect();
    const targetCenterY = info.rect.top + info.rect.height / 2;
    const top = Math.max(
      8,
      Math.min(window.innerHeight - ttRect.height - 8, Math.round(targetCenterY - ttRect.height / 2))
    );
    let left = 0;
    if (info.edge === "left") {
      left = Math.round(info.rect.right + 10);
    } else {
      left = Math.round(info.rect.left - ttRect.width - 10);
    }
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.classList.add("is-visible");
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
function hideDockTooltip() {
  if (showTimer !== null) {
    clearTimeout(showTimer);
    showTimer = null;
  }
  if (tooltipEl) {
    tooltipEl.classList.remove("is-visible");
  }
  if (cooldownTimer !== null) {
    clearTimeout(cooldownTimer);
  }
  cooldownTimer = window.setTimeout(() => {
    cooldownTimer = null;
    isWarm = false;
  }, 400);
}
function suppressDockTooltip(suppress) {
  isSuppressed = suppress;
  if (suppress) {
    hideDockTooltip();
    isWarm = false;
  }
}

// package.json
var package_default = {
  name: "flank",
  version: "1.0.0",
  description: "Flank \u2014 A second dock for Windows with live widgets, clipboard history, and theme store.",
  type: "module",
  scripts: {
    test: "node --test tests/*.test.ts",
    "build:ui": "node scripts/build-ui.mjs",
    start: "python host/main.py",
    package: "python scripts/build_executable.py"
  },
  license: "MIT"
};

// src/version.ts
var APP_VERSION = package_default.version || "1.0.0";

// src/ui/components.ts
function escapeHtml4(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Card(props) {
  const cls = `flank-ui-card${props.className ? ` ${props.className}` : ""}`;
  const styleAttr = props.style ? ` style="${props.style}"` : "";
  return `<div class="${cls}"${styleAttr}>${props.children}</div>`;
}
function Row(props) {
  const hasDesc = Boolean(props.description);
  const cls = `flank-ui-row${hasDesc ? " has-desc" : ""}${props.className ? ` ${props.className}` : ""}`;
  const action = props.actionAttr ? ` ${props.actionAttr}` : "";
  const styleAttr = props.style ? ` style="${props.style}"` : "";
  const dragMarkup = props.dragHandleHtml ? `<span class="flank-ui-row-drag">${props.dragHandleHtml}</span>` : "";
  const iconMarkup = props.iconHtml ? `<span class="flank-ui-row-icon" aria-hidden="true">${props.iconHtml}</span>` : "";
  const descMarkup = props.description ? `<span class="flank-ui-row-desc">${escapeHtml4(props.description)}</span>` : "";
  return `<div class="${cls}"${action}${styleAttr}>
    <div class="flank-ui-row-left">
      ${dragMarkup}
      ${iconMarkup}
      <div class="flank-ui-row-texts">
        <span class="flank-ui-row-label">${escapeHtml4(props.label)}</span>
        ${descMarkup}
      </div>
    </div>
    <div class="flank-ui-row-right">
      ${props.controlHtml}
    </div>
  </div>`;
}
function SectionHeader(props) {
  const cls = `flank-ui-section-header${props.className ? ` ${props.className}` : ""}`;
  const descMarkup = props.description ? `<p class="flank-ui-section-desc">${escapeHtml4(props.description)}</p>` : "";
  const actionMarkup = props.actionHtml ? `<div class="flank-ui-section-action">${props.actionHtml}</div>` : "";
  return `<div class="${cls}">
    <div class="flank-ui-section-title-wrap">
      <h3 class="flank-ui-section-title">${escapeHtml4(props.title)}</h3>
      ${actionMarkup}
    </div>
    ${descMarkup}
  </div>`;
}
function Segmented(props) {
  const cls = `flank-ui-segmented${props.className ? ` ${props.className}` : ""}`;
  const buttons = props.options.map((opt) => {
    const isSelected = opt.value === props.activeValue;
    const icon = opt.iconHtml ? `<span class="flank-ui-segmented-icon" aria-hidden="true">${opt.iconHtml}</span>` : "";
    return `<button type="button" class="flank-ui-segmented-btn${isSelected ? " is-selected" : ""}" ${props.actionAttr}="${escapeHtml4(opt.value)}" aria-pressed="${isSelected ? "true" : "false"}">
        ${icon}<span>${escapeHtml4(opt.label)}</span>
      </button>`;
  }).join("");
  return `<div class="${cls}" role="group">${buttons}</div>`;
}
function Switch(props) {
  const checkedAttr = props.checked ? ' aria-checked="true" class="flank-ui-switch is-checked"' : ' aria-checked="false" class="flank-ui-switch"';
  const labelAttr = props.label ? ` aria-label="${escapeHtml4(props.label)}"` : "";
  const disabledAttr = props.disabled ? " disabled" : "";
  const idAttr = props.id ? ` id="${escapeHtml4(props.id)}"` : "";
  return `<button type="button" role="switch"${idAttr}${checkedAttr}${labelAttr}${disabledAttr} ${props.actionAttr}>
    <span class="flank-ui-switch-track">
      <span class="flank-ui-switch-thumb"></span>
    </span>
  </button>`;
}
function Swatch(props) {
  const sz = props.size || 22;
  const isAct = props.isActive ? " is-active" : "";
  const title = props.title || props.hex;
  const secondary = deriveSecondaryAccent(props.hex);
  const grad = `linear-gradient(135deg, ${props.hex} 0%, ${secondary} 100%)`;
  return `<button type="button" class="flank-ui-swatch${isAct}" ${props.actionAttr}="${escapeHtml4(props.hex)}" title="${escapeHtml4(title)}" aria-label="${escapeHtml4(title)}" style="--swatch-color: ${escapeHtml4(grad)}; width: ${sz}px; height: ${sz}px;">
    <span class="flank-ui-swatch-inner"></span>
  </button>`;
}
function Button(props) {
  const v = props.variant || "secondary";
  const cls = `flank-ui-btn is-${v}${props.className ? ` ${props.className}` : ""}`;
  const action = props.actionAttr ? ` ${props.actionAttr}` : "";
  const titleAttr = props.title ? ` title="${escapeHtml4(props.title)}"` : "";
  const disabledAttr = props.disabled ? " disabled" : "";
  const icon = props.iconHtml ? `<span class="flank-ui-btn-icon" aria-hidden="true">${props.iconHtml}</span>` : "";
  return `<button type="button" class="${cls}"${action}${titleAttr}${disabledAttr}>
    ${icon}<span>${escapeHtml4(props.label)}</span>
  </button>`;
}
function Input(props) {
  const type = props.type || "text";
  const idAttr = props.id ? ` id="${escapeHtml4(props.id)}"` : "";
  const valAttr = props.value !== void 0 ? ` value="${escapeHtml4(props.value)}"` : "";
  const phAttr = props.placeholder ? ` placeholder="${escapeHtml4(props.placeholder)}"` : "";
  const cls = `flank-ui-input${props.className ? ` ${props.className}` : ""}`;
  const styleAttr = props.style ? ` style="${props.style}"` : "";
  const disabledAttr = props.disabled ? " disabled" : "";
  return `<input type="${type}"${idAttr} class="${cls}"${valAttr}${phAttr}${styleAttr}${disabledAttr} />`;
}
function Chip(props) {
  const v = props.variant || "muted";
  const cls = `flank-ui-chip is-${v}${props.className ? ` ${props.className}` : ""}`;
  const icon = props.iconHtml ? `<span class="flank-ui-chip-icon" aria-hidden="true">${props.iconHtml}</span>` : "";
  return `<span class="${cls}">${icon}${escapeHtml4(props.label)}</span>`;
}

// src/ui/windows.ts
function escapeHtml5(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderTitleBar(title) {
  return `
    <div class="flank-window__titlebar flank-titlebar">
      <div class="flank-titlebar-brand" style="display:flex; align-items:center; gap: var(--flank-scale-space-12); color: var(--flank-color-text)">
        <span class="flank-titlebar-glyph" style="display:flex; align-items:center; color: currentColor">${flankGlyph({ solid: true, size: 18 })}</span>
        <span class="flank-titlebar-title" style="font-weight: 600; font-size: 14px;">${escapeHtml5(title)}</span>
      </div>
      <div class="flank-win-controls">
        <button type="button" class="flank-win-btn" data-action="close-full-window" aria-label="Minimize window">${iconSvg("win-min", 12)}</button>
        <button type="button" class="flank-win-btn" data-action="close-full-window" aria-label="Maximize window">${iconSvg("win-max", 12)}</button>
        <button type="button" class="flank-win-btn" data-action="close-full-window" aria-label="Close window">${iconSvg("win-close", 12)}</button>
      </div>
    </div>
  `;
}
function getFilteredClipboardItems(state2, ui) {
  const q = ui.clipboardQuery.trim().toLowerCase();
  return state2.clipboard.items.filter((item) => {
    if (ui.clipboardFilter === "text" && item.kind !== "text" && item.kind !== "code") return false;
    if (ui.clipboardFilter === "link" && item.kind !== "link") return false;
    if (ui.clipboardFilter === "image" && item.kind !== "image") return false;
    if (ui.clipboardFilter === "file" && item.kind !== "file") return false;
    if (q && !item.title.toLowerCase().includes(q) && !item.content.toLowerCase().includes(q)) {
      return false;
    }
    return true;
  });
}
function renderClipboardRowChip(item) {
  if (item.monogram) {
    const badge = getLetterBadgeProps(item.monogram);
    return `<span class="flank-row-chip is-monogram" style="background: ${badge.bg}; color: ${badge.color}; border-radius: var(--flank-scale-radius-8); font-size: 11px; font-weight: 600;">${escapeHtml5(item.monogram)}</span>`;
  }
  if (item.kind === "image") {
    return `<span class="flank-row-chip" style="background: var(--flank-color-accent-soft); border: var(--flank-scale-hairline) solid var(--flank-color-accent-line)" aria-hidden="true">${iconSvg("file", 17)}</span>`;
  }
  const iconName = item.kind === "link" ? "link" : item.kind === "code" ? "code" : item.kind === "file" ? "file" : "text";
  return `<span class="flank-row-chip">${iconSvg(iconName, 17)}</span>`;
}
function formatKindLabel(kind) {
  switch (kind) {
    case "link":
      return "Link";
    case "image":
      return "Image";
    case "file":
      return "File";
    case "code":
      return "Text";
    default:
      return "Text";
  }
}
function renderClipboardWindowHtml(state2, ui) {
  const filtered = getFilteredClipboardItems(state2, ui);
  const selected = filtered.find((i) => i.id === ui.selectedClipboardId) || filtered[0] || null;
  const chips = [
    { id: "all", label: "All" },
    { id: "text", label: "Text" },
    { id: "link", label: "Links" },
    { id: "image", label: "Images" },
    { id: "file", label: "Files" }
  ];
  const chipsHtml = chips.map(
    (c) => `<button type="button" class="flank-chip${ui.clipboardFilter === c.id ? " is-active" : ""}" data-cb-filter="${c.id}">${c.label}</button>`
  ).join("");
  const rowsHtml = filtered.map((item) => {
    const isSel = selected?.id === item.id;
    const pinPrefix = item.pinned ? "Pinned \xB7 " : "";
    return `<button type="button" class="flank-list-row${isSel ? " is-selected" : ""}" aria-pressed="${isSel ? "true" : "false"}" data-cb-select="${escapeHtml5(item.id)}" style="gap: 12px;">
        ${renderClipboardRowChip(item)}
        <span class="flank-row-text">
          <span class="flank-row-title" style="color: var(--flank-color-text);">${escapeHtml5(item.title)}</span>
          <span class="flank-row-meta" style="color: var(--flank-color-text-muted);">${pinPrefix}${formatKindLabel(item.kind)} \xB7 ${escapeHtml5(item.relativeTime)}</span>
        </span>
      </button>`;
  }).join("");
  const rowsListHtml = rowsHtml || renderEmptyState("No items in clipboard", "Copied text and files will appear here");
  const previewHtml = selected ? `
      <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items:center;">
        <span class="flank-type-badge">${formatKindLabel(selected.kind)}</span>
        <span class="flank-card-muted">${escapeHtml5(selected.relativeTime)}</span>
      </div>
      <div style="display:flex; flex-direction:column; gap: var(--flank-scale-space-sm)">
        <span class="flank-preview-heading" style="color: var(--flank-color-text);">${escapeHtml5(selected.title)}</span>
        <span style="font-size: var(--flank-scale-font-body); color: var(--flank-color-text-muted)">${escapeHtml5(selected.previewSubtitle || (selected.kind === "link" ? "Opens in your default browser" : "Ready to paste"))}</span>
      </div>
      <div class="flank-preview-box" style="padding: 14px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
        ${selected.imageDataUrl ? `<img src="${escapeHtml5(selected.imageDataUrl)}" alt="${escapeHtml5(selected.title)}" style="max-width: 100%; max-height: var(--flank-scale-ai-ring-lg); border-radius: var(--flank-scale-radius-8)" />` : (() => {
    const mono = selected.monogram || selected.title.slice(0, 1).toUpperCase();
    const badge = getLetterBadgeProps(mono);
    return `<span class="flank-row-chip is-monogram" style="width: 36px; height: 36px; border-radius: var(--flank-scale-radius-8); background: ${badge.bg}; color: ${badge.color}; font-size: 13px; font-weight: 600;">${escapeHtml5(mono)}</span>
               <span style="display:flex; flex-direction:column; gap: var(--flank-scale-bar-thin); min-width: var(--flank-scale-zero); margin-left: 12px;">
                 <span style="font-size: var(--flank-scale-font-title-sm); font-weight: 600; word-break: break-word; color: var(--flank-color-text);">${escapeHtml5(selected.content)}</span>
                 <span style="font-size: var(--flank-scale-font-body-sm); color: var(--flank-color-text-muted)">${escapeHtml5(selected.previewSubtitle || "Captured on this PC")}</span>
               </span>`;
  })()}
      </div>
      <div style="display:flex; flex-direction:column">
        <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;"><span class="flank-stat-label">Copied</span><span>${escapeHtml5(selected.copiedAt)}</span></div>
        <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;"><span class="flank-stat-label">From</span><span>${escapeHtml5(selected.sourceApp)}</span></div>
        <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;"><span class="flank-stat-label">Length</span><span class="tabular-nums">${escapeHtml5(selected.lengthLabel)}</span></div>
      </div>
      <div style="flex: 1"></div>
      <div class="flank-action-bar" style="display:flex; gap: 10px;">
        <button type="button" class="flank-primary-btn" data-cb-copy="${escapeHtml5(selected.id)}">
          Copy to clipboard
          <span class="flank-kbd-hint">Enter</span>
        </button>
        <button type="button" class="flank-icon-btn" data-cb-pin="${escapeHtml5(selected.id)}" aria-label="${selected.pinned ? "Unpin item" : "Pin item"}">
          ${iconSvg("pin", 17)}
        </button>
        <button type="button" class="flank-icon-btn" data-cb-delete="${escapeHtml5(selected.id)}" aria-label="Delete item">
          ${iconSvg("trash", 17)}
        </button>
      </div>
    ` : renderEmptyState("No items found", "Copy text, links or images to preview them here");
  return `<div class="flank-window-backdrop" id="flank-full-window">
    <div class="flank-window" role="dialog" aria-label="Clipboard History">
      ${renderTitleBar("Clipboard History")}
      <div class="flank-window__body flank-win-body" style="padding: 24px; gap: 16px; box-sizing: border-box; flex: 1; min-height: 0; display: flex; overflow: hidden;">
        <div class="flank-list-col" style="width: 340px; min-width: 340px; max-width: 340px; border-right: none; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px; min-height: 0;">
          <label class="flank-search-box">
            ${iconSvg("search", 16)}
            <input type="text" id="flank-cb-search" class="flank-search-input" aria-label="Search clipboard history" placeholder="Search ${state2.clipboard.count} items" value="${escapeHtml5(ui.clipboardQuery)}">
          </label>
          <div class="flank-chip-row" style="gap: 6px; flex-wrap: wrap;">${chipsHtml}</div>
          <div class="flank-list-scroll">${rowsListHtml}</div>
        </div>
        <div class="flank-preview-col" style="flex: 1; min-width: 0; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;">
          ${previewHtml}
        </div>
      </div>
      <div class="flank-window__footer flank-win-footer">
        <span>${state2.clipboard.count} of ${state2.clipboard.maxItems} saved on this PC</span>
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">\u2191\u2193 to move</span>
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Enter to copy</span>
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Del to remove</span>
        </div>
      </div>
    </div>
  </div>`;
}
function renderFullStatsWindowHtml(state2, ui) {
  const s = state2.stats;
  const b = state2.battery;
  const currentTab = ui?.statsTab || "telemetry";
  const procs = state2.topProcesses || [];
  const q = (ui?.processQuery || "").trim().toLowerCase();
  const filteredProcs = q ? procs.filter((p) => p.name.toLowerCase().includes(q) || String(p.pid).includes(q)) : procs;
  const getMemMb = (p) => {
    const v = Number(p?.memMb ?? p?.memoryMb ?? 0);
    return Number.isFinite(v) ? v : 0;
  };
  const maxMem = procs.length > 0 ? Math.max(...procs.map((p) => getMemMb(p) || 1), 100) : 100;
  const coreBars = s.cores.map(
    (pct, idx) => `<div class="flank-stat-item">
        <div class="flank-stat-header"><span class="flank-stat-label">Core ${idx + 1}</span><span class="flank-stat-val" style="margin-left: 12px;">${pct}%</span></div>
        <div class="flank-progress-track" style="margin-top: 4px; margin-bottom: 8px;"><div class="flank-progress-fill" style="width: ${pct}%"></div></div>
      </div>`
  ).join("");
  const diskRows = s.disks.map(
    (d) => `<div class="flank-stat-item">
        <div class="flank-stat-header"><span class="flank-stat-label">Drive (${escapeHtml5(d.mount)})</span><span class="flank-stat-val" style="margin-left: 12px;">${Math.round(d.usedGb)} / ${Math.round(d.totalGb)} GB (${d.percent}%)</span></div>
        <div class="flank-progress-track" style="margin-top: 4px; margin-bottom: 8px;"><div class="flank-progress-fill" style="width: ${d.percent}%"></div></div>
      </div>`
  ).join("");
  const periphRows = b.peripherals.map(
    (p) => `<div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
        <span>${escapeHtml5(p.name)} <span class="flank-card-muted">(${escapeHtml5(p.detail || p.kind)})</span></span>
        <span class="flank-stat-val">${p.percent}%${p.charging ? " \xB7 Charging" : ""}</span>
      </div>`
  ).join("");
  const timeRem = b.timeRemainingText && !b.stateText.includes(b.timeRemainingText) ? ` (${escapeHtml5(b.timeRemainingText)})` : "";
  const procTableRows = filteredProcs.map(
    (p, idx) => `
        <tr style="border-bottom: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); height: 32px; font-size: 12px;">
          <td style="padding: 6px 12px; color: var(--flank-color-text-muted); font-size: 11px; width: 32px;">${idx + 1}</td>
          <td style="padding: 6px 12px; font-weight: 600; color: var(--flank-color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">
            <div style="display:flex; align-items:center; gap: 6px;">
              <span style="display:flex; width: 14px; height: 14px; color: var(--flank-color-accent); flex-shrink: 0;">${iconSvg("settings", 14)}</span>
              <span>${escapeHtml5(p.name)}</span>
            </div>
          </td>
          <td class="tabular-nums" style="padding: 6px 12px; color: var(--flank-color-text-muted); font-size: 11px;">${p.pid}</td>
          <td style="padding: 6px 12px; width: 220px;">
            <div style="display:flex; align-items:center; gap: 8px;">
              <div class="flank-meter__bar" style="height: 6px; flex: 1; margin: 0; background: var(--flank-color-track-bg);"><div class="flank-meter__fill" style="width: ${Math.min(100, Math.max(0, Math.round(getMemMb(p) / maxMem * 100)))}%"></div></div>
              <span class="tabular-nums" style="font-weight: 600; font-size: 12px; min-width: 60px; text-align: right;">${Math.round(getMemMb(p))} MB</span>
            </div>
          </td>
          <td class="tabular-nums" style="padding: 6px 12px; color: var(--flank-color-text-muted); text-align: right;">${p.threads || 1}</td>
        </tr>
      `
  ).join("");
  let bodyContent = "";
  if (currentTab === "processes") {
    bodyContent = `
      <div style="flex: 1; min-width: 0; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px; overflow: hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap: 12px; flex-shrink: 0;">
          <div style="display:flex; align-items:center; gap: 8px;">
            <span class="flank-card-title">Top 30 Processes by Memory</span>
            <span class="flank-live-pill"><span class="flank-live-dot"></span>Live \xB7 2s</span>
          </div>
          <div style="display:flex; align-items:center; gap: 8px;">
            <input type="search" id="flank-proc-search" class="flank-input" style="width: 220px; height: 32px; font-size: 12px;" placeholder="Filter processes..." value="${escapeHtml5(ui?.processQuery || "")}" />
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
            <button type="button" class="flank-chip${!s.paused && s.refreshSec === 1 ? " is-active" : ""}" data-stats-rate="1">1s</button>
            <button type="button" class="flank-chip${!s.paused && s.refreshSec === 2 ? " is-active" : ""}" data-stats-rate="2">2s</button>
            <button type="button" class="flank-chip${!s.paused && s.refreshSec === 5 ? " is-active" : ""}" data-stats-rate="5">5s</button>
            <button type="button" class="flank-chip${s.paused ? " is-active" : ""}" data-stats-pause="toggle">${s.paused ? "Paused" : "Pause"}</button>
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
          <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;"><span class="flank-stat-label">System battery</span><span class="flank-stat-val">${b.percent}% \xB7 ${escapeHtml5(b.stateText)}${timeRem}</span></div>
          <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;"><span class="flank-stat-label">Power plan</span><span>${escapeHtml5(b.powerMode)} \xB7 Health ${b.healthPercent}%</span></div>
          ${periphRows}
        </div>
      </div>
    `;
  }
  return `<div class="flank-window-backdrop" id="flank-full-window">
    <div class="flank-window" role="dialog" aria-label="System Stats">
      <div class="flank-window__titlebar flank-titlebar" style="display:flex; justify-content:space-between; align-items:center;">
        <div class="flank-titlebar-brand" style="display:flex; align-items:center; gap: var(--flank-scale-space-12); color: var(--flank-color-text)">
          <span class="flank-titlebar-glyph" style="display:flex; align-items:center; color: currentColor">${flankGlyphSvg(18, "titlebar")}</span>
          <span class="flank-titlebar-title" style="font-size: var(--flank-scale-font-body); font-weight: 600;">System Stats</span>
          <div class="flank-chip-row" style="gap: 6px; margin-left: 12px;">
            <button type="button" class="flank-chip${currentTab === "telemetry" ? " is-active" : ""}" data-stats-tab="telemetry">Hardware Overview</button>
            <button type="button" class="flank-chip${currentTab === "processes" ? " is-active" : ""}" data-stats-tab="processes">Top 30 Processes (${procs.length})</button>
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
        <span>${currentTab === "processes" ? "Live process list sorted by working set memory \xB7 Read-only" : "Read-only system telemetry \xB7 Never terminates processes"}</span>
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Press Esc to close</span>
        </div>
      </div>
    </div>
  </div>`;
}
function renderBatteryWindowHtml(state2) {
  const b = state2.battery;
  const model = b.model || "Laptop battery";
  const remWh = b.remainingWh ?? Number((65.5 * (b.percent / 100)).toFixed(1));
  const fullWh = b.fullChargedWh ?? 65.5;
  const designWh = b.designWh ?? 68;
  const voltV = b.voltageV ?? 16.1;
  const rateW = b.powerRateW ?? 0;
  const history = b.history && b.history.length >= 2 ? b.history : [b.percent, b.percent, b.percent, b.percent];
  const deviceCards = b.peripherals.map((p) => {
    const iconName = p.kind === "mouse" ? "mouse" : p.kind === "keyboard" ? "keyboard" : p.kind === "headphones" ? "headphones" : p.charging ? "battery-charging" : "battery";
    const statusBadge = p.charging ? "Charging" : p.kind === "system" ? b.stateText : p.connected ? "Connected" : "Standby";
    return `<div class="flank-preview-box" style="flex-direction:column; align-items:stretch; gap: var(--flank-scale-space-sm); padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
        <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items:center;">
          <span style="display:flex; align-items:center; gap: var(--flank-scale-space-10)">
            <span class="flank-row-chip" style="width: var(--flank-scale-ring-tile); height: var(--flank-scale-ring-tile)">${iconSvg(iconName, 16)}</span>
            <span style="display:flex; flex-direction:column; gap: var(--flank-scale-bar-thin)">
              <span style="font-size: var(--flank-scale-font-body-sm); font-weight: 600; color: var(--flank-color-text);">${escapeHtml5(p.name)}</span>
              <span class="flank-row-meta">${escapeHtml5(p.detail || statusBadge)}</span>
            </span>
          </span>
          <span style="display:flex; flex-direction:column; align-items:flex-end; gap: var(--flank-scale-bar-thin)">
            <span class="flank-stat-val" style="font-size: var(--flank-scale-font-body-sm)">${p.percent}%</span>
            <span class="flank-row-meta">${escapeHtml5(statusBadge)}</span>
          </span>
        </div>
        <div class="flank-progress-track" style="margin-top: 4px;"><div class="flank-progress-fill" style="width: ${Math.max(0, Math.min(100, p.percent))}%"></div></div>
      </div>`;
  }).join("");
  const timeRem = b.timeRemainingText && !b.stateText.includes(b.timeRemainingText) ? `, ${escapeHtml5(b.timeRemainingText)}` : "";
  return `<div class="flank-window-backdrop" id="flank-full-window">
    <div class="flank-window" role="dialog" aria-label="Power and Battery Details">
      ${renderTitleBar("Power & Battery Details")}
      <div class="flank-window__body flank-win-body" style="padding: 24px; gap: 16px; box-sizing: border-box; flex: 1; min-height: 0; display: flex; overflow: hidden;">
        <div class="flank-list-col" style="flex: 1; min-width: 0; border-right: none; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 16px 16px 24px 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; overflow-x: hidden; scrollbar-width: none;">
          <div class="flank-preview-box" style="flex-direction:column; align-items:stretch; gap: 8px; padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items:center;">
              <span class="flank-card-title">Laptop battery</span>
              <span class="flank-live-pill">
                <span class="flank-live-dot"></span>
                ${escapeHtml5(b.powerMode)}
              </span>
            </div>
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items: flex-end;">
              <span style="font-family: var(--flank-font-stack); font-variant-numeric: tabular-nums; font-size: 32px; font-weight: 700; line-height: 1; color: var(--flank-color-text); margin: 0;">${b.percent}%</span>
              <span class="flank-hero-meta" style="text-align: right;">
                <span class="flank-hero-condition">${escapeHtml5(b.stateText)}${timeRem}</span>
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
              <span class="flank-stat-val">${escapeHtml5(model)}</span>
            </div>
            <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
              <span class="flank-stat-label">Terminal voltage</span>
              <span class="flank-stat-val">${voltV.toFixed(2)} V</span>
            </div>
            <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
              <span class="flank-stat-label">Power source</span>
              <span class="flank-stat-val">${b.acConnected ? "AC adapter connected" : "Battery power"}</span>
            </div>
            <div class="flank-meta-row" style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
              <span class="flank-stat-label">Charge / draw rate</span>
              <span class="flank-stat-val">${rateW > 0 ? `${rateW.toFixed(1)} W` : b.acConnected ? "0.0 W (Holding charge)" : "Discharging"}</span>
            </div>
          </div>

          <button type="button" class="flank-btn is-secondary" data-item-kind="link" data-item-id="win-power-settings" data-target="ms-settings:powersleep" style="width: 100%; justify-content: space-between; height: 36px; padding: 0 14px; margin-top: auto; flex-shrink: 0;">
            <span style="font-size: 12px; font-weight: 500;">Open Windows Power &amp; Battery settings</span>
            <span style="display:flex; width: 14px; height: 14px; flex-shrink: 0;">${iconSvg("arrow-up-right", 14)}</span>
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
            ${buildSparklineSvg(history, "Laptop battery charge level history")}
          </div>
        </div>
      </div>
      <div class="flank-window__footer flank-win-footer">
        <span>Laptop battery (${escapeHtml5(model)}) \xB7 ${b.peripherals.length} power sources monitored</span>
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Press Esc to close</span>
        </div>
      </div>
    </div>
  </div>`;
}
function renderClockWindowHtml(state2) {
  const c = state2.clock;
  const f = state2.focus;
  const elapsed = Math.max(0, f.totalSec - f.remainingSec);
  const focusPct = f.totalSec > 0 ? Math.min(100, Math.round(elapsed / f.totalSec * 100)) : 0;
  const quickCities = ["Tokyo", "London", "New York", "Dubai", "Singapore", "San Francisco", "Sydney", "Berlin"];
  const quickChips = quickCities.map(
    (city) => `<button type="button" class="flank-chip" data-clock-quick-add="${escapeHtml5(city)}">+ ${escapeHtml5(city)}</button>`
  ).join("");
  const cityCards = c.cities.map(
    (item) => `<div class="flank-preview-box" style="justify-content: space-between; align-items: center; padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10); flex-shrink: 0;">
        <span style="display:flex; align-items:center; gap: var(--flank-scale-space-10); flex: 1; min-width: 0;">
          <span class="flank-row-chip" style="width: var(--flank-scale-ring-tile); height: var(--flank-scale-ring-tile); flex-shrink: 0;">${iconSvg(item.isDay ? "sun" : "moon", 16)}</span>
          <span style="display:flex; flex-direction:column; gap: var(--flank-scale-bar-thin); min-width: 0;">
            <span style="font-size: var(--flank-scale-font-body-sm); font-weight: 600; color: var(--flank-color-text);">${escapeHtml5(item.city)}</span>
            <span class="flank-row-meta">${escapeHtml5(item.country ? `${item.country} \xB7 ${item.timezone}` : item.timezone)} \xB7 ${escapeHtml5(item.offsetText)}</span>
          </span>
        </span>
        <span style="display:flex; align-items:center; gap: var(--flank-scale-space-10); flex-shrink: 0;">
          <span style="display:flex; flex-direction:column; align-items:flex-end; gap: var(--flank-scale-bar-thin);">
            <span class="flank-stat-val tabular-nums" style="font-size: var(--flank-scale-font-body-sm); white-space: nowrap;">${escapeHtml5(item.timeText)}</span>
            <span class="flank-row-meta" style="white-space: nowrap;">${escapeHtml5(item.dateText)}</span>
          </span>
          <button type="button" class="flank-ui-btn is-ghost" data-clock-remove="${escapeHtml5(item.id)}" aria-label="Remove ${escapeHtml5(item.city)}" title="Remove ${escapeHtml5(item.city)}" style="width: 28px; height: 28px; padding: 0; flex-shrink: 0;">
            ${iconSvg("trash", 14)}
          </button>
        </span>
      </div>`
  ).join("");
  return `<div class="flank-window-backdrop" id="flank-full-window">
    <div class="flank-window" role="dialog" aria-label="World Clock and Focus">
      ${renderTitleBar("World Clock & Focus Timer")}
      <div class="flank-window__body flank-win-body" style="padding: 24px; gap: 16px; box-sizing: border-box; flex: 1; min-height: 0; display: flex; overflow: hidden;">
        <div class="flank-list-col" style="flex: 1; min-width: 0; border-right: none; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;">
          <div class="flank-preview-box" style="flex-direction:column; align-items:stretch; gap: var(--flank-scale-space-sm); padding: 14px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items:center;">
              <span class="flank-card-title">Local time</span>
              <span class="flank-live-pill">
                <span class="flank-live-dot"></span>
                ${escapeHtml5(c.localZoneText)}
              </span>
            </div>
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items: flex-end">
              <span class="flank-display-hero tabular-nums">${escapeHtml5(c.localTimeText)}</span>
              <span class="flank-hero-meta" style="text-align: right;">
                <span class="flank-hero-condition">${escapeHtml5(c.localDateText)}</span>
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
              <span class="flank-card-muted">${f.completedSessions} sessions \xB7 ${f.focusedMinutesToday}m today</span>
            </div>
            <div class="flank-card-row-between" style="display:flex; justify-content:space-between; align-items: center">
              <span class="flank-display-hero tabular-nums" style="font-size: var(--flank-scale-font-title)">${formatDuration2(f.remainingSec)}</span>
              <div class="flank-chip-row" style="gap: 6px;">
                <button type="button" class="flank-chip${f.durationMinutes === 15 && f.mode === "focus" ? " is-active" : ""}" data-focus-duration="15">15m</button>
                <button type="button" class="flank-chip${f.durationMinutes === 25 && f.mode === "focus" ? " is-active" : ""}" data-focus-duration="25">25m</button>
                <button type="button" class="flank-chip${f.durationMinutes === 45 && f.mode === "focus" ? " is-active" : ""}" data-focus-duration="45">45m</button>
                <button type="button" class="flank-chip${f.mode === "break" ? " is-active" : ""}" data-focus-action="switch-mode">Break 5m</button>
              </div>
            </div>
            <div class="flank-progress-track" style="margin-top: 4px;"><div class="flank-progress-fill" style="width: ${focusPct}%"></div></div>
            <div style="display:flex; gap: var(--flank-scale-space-sm); margin-top: 6px;">
              <button type="button" class="flank-ui-btn is-primary" style="flex: 1; justify-content: center" data-focus-action="toggle">${f.running ? "Pause session" : "Start focus session"}</button>
              <button type="button" class="flank-ui-btn is-ghost" data-focus-action="reset" aria-label="Reset timer" style="width: 32px; height: 32px; padding: 0;">${iconSvg("reset", 16)}</button>
            </div>
          </div>
        </div>

        <div class="flank-preview-col" style="flex: 1; min-width: 0; background: var(--flank-color-tile-bg); border-radius: var(--flank-scale-radius-12); border: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;">
          <span class="flank-card-title" style="flex-shrink: 0;">Saved world clocks</span>
          <div style="display:flex; flex-direction:column; gap: var(--flank-scale-space-10); flex-shrink: 0;">
            ${cityCards || `<div class="flank-preview-box" style="padding: 16px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);"><span class="flank-card-muted">No world clocks added yet. Search or click a quick-add city on the left.</span></div>`}
          </div>
        </div>
      </div>
      <div class="flank-window__footer flank-win-footer">
        <span>World clock &amp; Focus timer \xB7 Automatic IANA timezone resolution</span>
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Press Esc to close</span>
        </div>
      </div>
    </div>
  </div>`;
}
function renderSettingsWindowHtml(state2, currentTheme, ui) {
  const tabs = [
    { id: "appearance", label: "Appearance & Themes" },
    { id: "items", label: "Items & Shortcuts" },
    { id: "widgets", label: "Widgets" },
    { id: "about", label: "About" }
  ];
  const navHtml = tabs.map(
    (t) => `<button type="button" class="flank-list-row${ui.settingsTab === t.id ? " is-selected" : ""}" data-settings-tab="${t.id}" style="gap: 10px;">
        <span class="flank-row-chip" style="width: 28px; height: 28px;">${iconSvg(t.id === "appearance" ? "sun" : t.id === "items" ? "clipboard" : t.id === "widgets" ? "battery" : "globe", 16)}</span>
        <span class="flank-row-text"><span class="flank-row-title" style="color: var(--flank-color-text); font-weight: 500;">${t.label}</span></span>
      </button>`
  ).join("");
  let contentHtml = "";
  if (ui.settingsTab === "appearance") {
    const themeCards = Object.values(BUNDLED_THEMES).map((t, idx) => {
      const isCurrent = currentTheme.id === t.id;
      const isFeatured = idx === 0;
      const isGlass = t.layout.variant === "glass" || t.id.includes("glass") || t.id === "aurora";
      const previewBg = isGlass ? "radial-gradient(circle at 20% 20%, rgba(255,86,150,0.85), transparent 70%), radial-gradient(circle at 80% 10%, rgba(122,92,255,0.9), transparent 70%), #0b1030" : t.color.surface;
      const miniDockBg = isGlass ? "rgba(255, 255, 255, 0.2)" : t.color.surface;
      const miniDockBorder = isGlass ? "1px solid rgba(255, 255, 255, 0.4)" : `1px solid ${t.color.divider}`;
      const miniCardBg = isGlass ? "rgba(255, 255, 255, 0.25)" : t.color.tileBg;
      const miniAccent = t.color.accent;
      return `
          <div class="flank-theme-card${isFeatured ? " is-featured" : ""}${isCurrent ? " is-active" : ""}">
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
              <span style="font-weight: 600; font-size: 14px; color: var(--flank-color-text);">${escapeHtml5(t.name)}</span>
              <div style="display:flex; gap: 4px;">
                ${Chip({ label: isGlass ? "Glass" : "Solid", variant: isGlass ? "glass" : "solid" })}
                ${t.default ? Chip({ label: "Default", variant: "accent" }) : ""}
              </div>
            </div>
            <p style="font-size: 12px; color: var(--flank-color-text-muted); margin: 4px 0 10px; line-height: 1.4; flex: 1;">
              ${escapeHtml5(t.description)}
            </p>
            <button type="button" class="flank-ui-btn ${isCurrent ? "is-ghost" : "is-secondary"}" ${isCurrent ? "disabled" : `data-apply-theme="${escapeHtml5(t.id)}"`} style="width: 100%;">
              ${isCurrent ? "Active Theme" : "Apply Theme"}
            </button>
          </div>
        `;
    }).join("");
    const currentEdge = state2.edgeOverride || currentTheme.layout.edge;
    const presets = ACCENT_PRESETS;
    const recent = (state2.recentAccents || []).filter((h) => !presets.includes(h)).slice(0, 5);
    const allAccents = [...presets, ...recent];
    const accentSwatches = allAccents.map(
      (hex) => Swatch({
        hex,
        isActive: currentTheme.color.accent.toLowerCase() === hex.toLowerCase(),
        actionAttr: "data-set-accent"
      })
    ).join("");
    const recentChips = (state2.recentAccents || []).map(
      (hex) => `<button type="button" class="flank-chip${state2.accentOverride?.toLowerCase() === hex.toLowerCase() ? " is-active" : ""}" data-set-accent="${hex}" style="display:inline-flex; align-items:center; gap: 4px"><span style="width: 8px; height: 8px; border-radius: 50%; background: ${hex}; display:inline-block"></span>${hex}</button>`
    ).join("");
    const currentAccentColor = state2.accentOverride || currentTheme.color.accent;
    const customPickerBox = ui.customColorPickerOpen ? `
        <div class="flank-subcard" style="margin-top: 8px; gap: 8px; padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
          <div style="display:flex; align-items:center; gap: 10px; flex-wrap:wrap">
            <span id="flank-custom-swatch-preview" style="width: 24px; height: 24px; border-radius: 6px; background: ${currentAccentColor}; display:inline-block; border: 1px solid var(--flank-color-divider)"></span>
            <span style="font-size: 12px; font-weight: 500; color: var(--flank-color-text);">Hue:</span>
            <input type="range" id="flank-hue-slider" min="0" max="360" value="230" style="flex: 1; min-width: 120px; accent-color: var(--flank-color-accent); height: 6px; border-radius: 4px; cursor: pointer; background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)" />
            <input type="text" id="flank-accent-hex-input" class="flank-ui-input" style="width: 90px; padding: 4px 8px; font-family: var(--flank-type-mono); font-size: 12px" value="${escapeHtml5(currentAccentColor)}" placeholder="#2F4BFF" />
            <button type="button" class="flank-chip is-active" data-action="apply-custom-hex">Apply</button>
          </div>
          ${recentChips ? `<div style="display:flex; align-items:center; gap: 6px; flex-wrap:wrap"><span style="font-size: 11px; color: var(--flank-color-text-muted)">Recent:</span>${recentChips}</div>` : ""}
          ${ui.customColorContrastWarning ? `<span style="font-size: 11px; color: var(--flank-color-accent-pink, #FF5B7A)">${escapeHtml5(ui.customColorContrastWarning)}</span>` : ""}
        </div>
      ` : "";
    contentHtml = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        ${SectionHeader({
      title: "Theme Store",
      description: "Choose a visual style for Flank. Solid themes offer high-contrast legibility, while Glass themes blend dynamically with your desktop wallpaper.",
      actionHtml: '<button type="button" class="flank-chip" data-action="revert-paper">Revert to Paper</button>'
    })}
        ${ui.themeValidationMsg ? `<div class="flank-subcard" style="padding: 10px;"><span style="font-size: 12px; color: var(--flank-color-text);">${escapeHtml5(ui.themeValidationMsg)}</span></div>` : ""}
        <div class="flank-theme-grid">
          ${themeCards}
        </div>

        ${SectionHeader({
      title: "Screen Edge & Accent",
      description: "Choose dock position and customizable accent color."
    })}
        ${Row({
      label: "Screen edge override",
      description: "Position the vertical dock on the left or right screen border.",
      controlHtml: Segmented({
        options: [
          { value: "right", label: "Right Edge" },
          { value: "left", label: "Left Edge" }
        ],
        activeValue: currentEdge,
        actionAttr: "data-set-edge"
      })
    })}
        ${Row({
      label: "Accent override (4.5:1 verified)",
      description: "Select an accent swatch or enter a custom hex color.",
      controlHtml: `
            <div style="display:flex; align-items:center; gap: 8px; flex-wrap:wrap;">
              ${accentSwatches}
              <button type="button" class="flank-chip${ui.customColorPickerOpen ? " is-active" : ""}" data-action="toggle-custom-color" style="display:inline-flex; align-items:center; gap: 4px">
                <span style="width: 10px; height: 10px; border-radius: 50%; background: ${currentTheme.color.accent}; display:inline-block"></span>Custom...
              </button>
              ${state2.accentOverride ? `<button type="button" class="flank-chip" data-action="reset-accent">Reset</button>` : ""}
            </div>
          `
    })}
        ${customPickerBox}

        ${SectionHeader({
      title: "Hide & Collapsible Dock",
      description: "Configure automatic collapse behaviors and edge tab appearance."
    })}
        ${Row({
      label: "Collapse automatically when idle",
      description: "Smoothly morphs the dock into an edge tab after inactivity.",
      controlHtml: `
            <div style="display:flex; align-items:center; gap: 8px;">
              ${state2.autoCollapse ? `
                <input type="range" id="flank-auto-collapse-slider" min="3" max="60" value="${state2.autoCollapseSeconds || 10}" style="width: 80px; accent-color: var(--flank-color-accent); cursor: pointer;" />
                <span id="flank-auto-collapse-val" style="font-size: 12px; color: var(--flank-color-text-muted); min-width: 24px">${state2.autoCollapseSeconds || 10}s</span>
              ` : ""}
              ${Switch({ checked: Boolean(state2.autoCollapse), actionAttr: 'data-action="toggle-auto-collapse"' })}
            </div>
          `
    })}
        ${Row({
      label: "Collapse on full-screen apps",
      description: "Automatically hides dock when gaming or viewing full-screen media.",
      controlHtml: Switch({ checked: Boolean(state2.collapseOnFullscreen), actionAttr: 'data-action="toggle-collapse-fullscreen"' })
    })}
        ${Row({
      label: "Show logo on collapsed tab",
      description: "Shows the Flank capsule logo glyph on the edge tab.",
      controlHtml: Switch({ checked: Boolean(state2.showLogoOnTab), actionAttr: 'data-action="toggle-logo-on-tab"' })
    })}
        ${Row({
      label: "Start Flank collapsed",
      description: "Launches directly into the edge tab on startup.",
      controlHtml: Switch({ checked: Boolean(state2.startCollapsed), actionAttr: 'data-action="toggle-start-collapsed"' })
    })}
        ${Row({
      label: "Reserve screen space (AppBar)",
      description: "Prevents maximized windows from overlapping the dock.",
      controlHtml: Switch({ checked: Boolean(state2.reserveScreenSpace), actionAttr: 'data-toggle-appbar="1"' })
    })}
        ${Row({
      label: "Start Flank when Windows starts",
      description: "Launches Flank automatically when you sign in to Windows.",
      controlHtml: Switch({ checked: Boolean(state2.autostart), actionAttr: 'data-action="toggle-autostart"' })
    })}
      </div>
    `;
  } else if (ui.settingsTab === "items") {
    const appItems = state2.items.filter((i) => i.kind === "app" || i.kind === "link" || i.group === "apps");
    const widgetItems = state2.items.filter((i) => i.kind === "widget" || i.group === "widgets");
    const otherItems = state2.items.filter((i) => !appItems.includes(i) && !widgetItems.includes(i));
    const renderItemRow = (item, idx) => {
      const isRec = ui.recordingItemId === item.id;
      const isCustom = item.id.startsWith("custom-") || item.kind === "link" || item.target && (item.target.startsWith("http") || item.target.endsWith(".exe"));
      const iconMarkup = renderItemIcon(item);
      return Row({
        label: item.label,
        description: `${item.kind}${item.target ? ` \xB7 ${item.target}` : ""}`,
        dragHandleHtml: `<span class="flank-drag-handle" title="Reorder" style="color: var(--flank-color-text-muted); cursor: grab; font-size: 14px; user-select: none;">\u22EE\u22EE</span>`,
        iconHtml: iconMarkup,
        controlHtml: `
          <div style="display:flex; align-items:center; gap: 8px;">
            ${isCustom ? `
              <button type="button" class="flank-ui-btn is-ghost" data-action="refresh-item-icon" data-item-id="${escapeHtml5(item.id)}" title="Refresh icon">
                ${iconSvg("refresh-cw", 12)}
              </button>
              <button type="button" class="flank-ui-btn is-ghost" data-action="choose-item-icon" data-item-id="${escapeHtml5(item.id)}" title="Choose image...">
                ${iconSvg("image", 12)}
              </button>
            ` : ""}
            <button type="button" class="flank-chip${isRec ? " is-active" : ""}" data-record-shortcut="${escapeHtml5(item.id)}" title="Set shortcut">
              ${isRec ? "Press keys..." : escapeHtml5(item.shortcut || "Set shortcut")}
            </button>
            <button type="button" class="flank-ui-btn is-ghost" data-move-up="${idx}" aria-label="Move up">
              ${iconSvg("chevron-up", 12)}
            </button>
            <button type="button" class="flank-ui-btn is-ghost" data-move-down="${idx}" aria-label="Move down">
              ${iconSvg("chevron-down", 12)}
            </button>
            ${item.id.startsWith("custom-") ? `
              <button type="button" class="flank-ui-btn is-danger" data-delete-item="${escapeHtml5(item.id)}" aria-label="Delete item">
                ${iconSvg("trash", 12)}
              </button>
            ` : ""}
            ${Switch({ checked: Boolean(item.enabled), actionAttr: `data-toggle-item="${escapeHtml5(item.id)}"` })}
          </div>
        `
      });
    };
    contentHtml = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        ${SectionHeader({
      title: "Dock Items & Shortcuts",
      description: "Toggle items on or off, configure global shortcuts, and reorder tiles.",
      actionHtml: `
            <div style="display:flex; gap: 8px;">
              <button type="button" class="flank-chip" data-action="reset-recommended-items">Recommended</button>
              <button type="button" class="flank-chip" data-action="reset-default-items">Defaults</button>
            </div>
          `
    })}
        ${ui.shortcutConflictMsg ? `<div class="flank-subcard" style="padding: 10px;"><span>${escapeHtml5(ui.shortcutConflictMsg)}</span></div>` : ""}

        ${Row({
      label: "Collapse / Expand Flank Dock",
      description: "Global hotkey to toggle dock visibility.",
      iconHtml: iconSvg("chevron-right", 16),
      controlHtml: `<button type="button" class="flank-chip${ui.recordingItemId === "collapse-hotkey" ? " is-active" : ""}" data-record-shortcut="collapse-hotkey">${ui.recordingItemId === "collapse-hotkey" ? "Press keys..." : escapeHtml5(state2.collapseHotkey || "Ctrl+Alt+F")}</button>`
    })}

        ${Card({
      children: `
            <div style="display:flex; flex-direction:column; gap: 10px; padding: 14px;">
              <span style="font-weight: 600; font-size: 13px; color: var(--flank-color-text);">Add custom app or website shortcut</span>
              <div style="display:flex; gap: 8px; align-items:center;">
                ${Input({ id: "flank-new-item-label", placeholder: "Label (e.g. VS Code, GitHub)", style: "flex: 1;" })}
                ${Input({ id: "flank-new-item-target", placeholder: "Command or URL (e.g. code, https://github.com)", style: "flex: 2;" })}
                ${Button({ label: "+ Add to dock", variant: "primary", actionAttr: 'data-action="add-custom-item"' })}
              </div>
            </div>
          `
    })}

        <div style="display:flex; flex-direction:column; gap: 6px;">
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--flank-color-text-muted); padding: 8px 0 4px;">Apps &amp; Links</span>
          ${appItems.map((item, idx) => renderItemRow(item, state2.items.indexOf(item))).join("")}

          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--flank-color-text-muted); padding: 16px 0 4px;">Widgets</span>
          ${widgetItems.map((item, idx) => renderItemRow(item, state2.items.indexOf(item))).join("")}

          ${otherItems.length > 0 ? `
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--flank-color-text-muted); padding: 16px 0 4px;">System</span>
            ${otherItems.map((item, idx) => renderItemRow(item, state2.items.indexOf(item))).join("")}
          ` : ""}
        </div>
      </div>
    `;
  } else if (ui.settingsTab === "widgets") {
    const clockChips = state2.clock.cities.map(
      (c) => `<button type="button" class="flank-chip" data-clock-remove="${escapeHtml5(c.id)}" title="Click to remove ${escapeHtml5(c.city)}">${escapeHtml5(c.city)} (${escapeHtml5(c.timeText)}) \xD7</button>`
    ).join("");
    contentHtml = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${SectionHeader({
      title: "Widget Preferences",
      description: "Custom configurations organized and grouped per widget."
    })}

        <!-- GITHUB WIDGET GROUP -->
        ${Card({
      children: `
            <div style="display:flex; flex-direction:column; gap: 12px; padding: 14px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap: 8px; font-weight: 600; font-size: 13px; color: var(--flank-color-text);">
                  ${iconSvg("github", 16)} GitHub Activity
                </div>
                <span class="flank-chip" style="font-size: 11px; ${state2.github?.connected ? "color: #10B981; border-color: rgba(16, 185, 129, 0.4); font-weight: 600;" : ""}">
                  ${state2.github?.connected ? `Connected (@${escapeHtml5(state2.github.username || "user")})` : "Not connected"}
                </span>
              </div>
              <div style="font-size: 12px; color: var(--flank-color-text-muted); line-height: 1.45;">
                Connect a GitHub Personal Access Token (classic or fine-grained with <code>repo</code> and <code>notifications</code> scopes) to view live PRs, review requests, and alerts on your dock.
              </div>
              <div style="display:flex; gap: 8px; align-items:center;">
                ${Input({ id: "flank-github-token-input", type: "password", placeholder: "ghp_xxxxxxxxxxxxxxxxxxxx", style: "flex: 1;" })}
                ${Button({ label: state2.github?.connected ? "Update Token" : "Connect", variant: "primary", actionAttr: 'data-action="connect-github"' })}
                ${state2.github?.connected ? Button({ label: "Disconnect", variant: "secondary", actionAttr: 'data-action="disconnect-github"' }) : ""}
              </div>
            </div>
          `
    })}

        <!-- WEATHER WIDGET GROUP -->
        ${Card({
      children: `
            <div style="display:flex; flex-direction:column; gap: 12px; padding: 14px;">
              <div style="display:flex; align-items:center; gap: 8px; font-weight: 600; font-size: 13px; color: var(--flank-color-text);">
                ${iconSvg("sun", 16)} Weather &amp; Forecast
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-size: 12px; font-weight: 500; color: var(--flank-color-text);">Default city location</div>
                  <div style="font-size: 11px; color: var(--flank-color-text-muted);">Provides live conditions and temperature forecast.</div>
                </div>
                <div style="display:flex; gap: 8px;">
                  ${Input({ id: "flank-weather-city-input", value: state2.weather.city, style: "width: 140px;" })}
                  ${Button({ label: "Update", variant: "primary", actionAttr: 'data-action="save-weather-city"' })}
                </div>
              </div>
            </div>
          `
    })}

        <!-- WORLD CLOCK WIDGET GROUP -->
        ${Card({
      children: `
            <div style="display:flex; flex-direction:column; gap: 12px; padding: 14px;">
              <div style="display:flex; align-items:center; gap: 8px; font-weight: 600; font-size: 13px; color: var(--flank-color-text);">
                ${iconSvg("clock", 16)} World Clock &amp; Timezones
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-size: 12px; font-weight: 500; color: var(--flank-color-text);">Add tracked city</div>
                  <div style="font-size: 11px; color: var(--flank-color-text-muted);">Search any international city to track local time.</div>
                </div>
                <div style="display:flex; gap: 8px;">
                  ${Input({ id: "flank-clock-city-input", placeholder: "e.g. Tokyo, London, Dubai...", style: "width: 160px;" })}
                  ${Button({ label: "Add city", variant: "primary", actionAttr: 'data-action="add-world-clock"' })}
                </div>
              </div>
              <div style="border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding-top: 8px;">
                <div style="font-size: 11px; color: var(--flank-color-text-muted); margin-bottom: 6px;">Tracked cities:</div>
                <div class="flank-chip-row" style="flex-wrap: wrap; gap: 6px;">
                  ${clockChips || '<span class="flank-card-muted" style="font-size: 11px;">None</span>'}
                </div>
              </div>
            </div>
          `
    })}

        <!-- FOCUS TIMER & SOUNDSCAPES GROUP -->
        ${Card({
      children: `
            <div style="display:flex; flex-direction:column; gap: 12px; padding: 14px;">
              <div style="display:flex; align-items:center; gap: 8px; font-weight: 600; font-size: 13px; color: var(--flank-color-text);">
                ${iconSvg("waves", 16)} Focus Timer &amp; Soundscapes
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-size: 12px; font-weight: 500; color: var(--flank-color-text);">Offline soundscape presets</div>
                  <div style="font-size: 11px; color: var(--flank-color-text-muted);">Synthesizes Rain, Waves, Campfire, Cafe, Wind, Brown Noise offline.</div>
                </div>
                <button type="button" class="flank-chip" data-action="toggle-ambient" style="font-size: 11px;">
                  ${state2.ambient?.playing ? "Mute soundscape" : "Test soundscape"}
                </button>
              </div>
            </div>
          `
    })}

        <!-- STORAGE & DRIVES GROUP -->
        ${Card({
      children: `
            <div style="display:flex; flex-direction:column; gap: 12px; padding: 14px;">
              <div style="display:flex; align-items:center; gap: 8px; font-weight: 600; font-size: 13px; color: var(--flank-color-text);">
                ${iconSvg("hard-drive", 16)} Storage &amp; Drives
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-size: 12px; font-weight: 500; color: var(--flank-color-text);">Windows Disk Cleanup</div>
                  <div style="font-size: 11px; color: var(--flank-color-text-muted);">Quickly clean temporary files, cache, and recycle bin.</div>
                </div>
                ${Button({ label: "Launch Cleanup", variant: "secondary", actionAttr: 'data-action="launch-disk-cleanup"' })}
              </div>
            </div>
          `
    })}

        <!-- CLIPBOARD & BLUETOOTH GROUP -->
        ${Card({
      children: `
            <div style="display:flex; flex-direction:column; gap: 12px; padding: 14px;">
              <div style="display:flex; align-items:center; gap: 8px; font-weight: 600; font-size: 13px; color: var(--flank-color-text);">
                ${iconSvg("clipboard", 16)} Clipboard &amp; Peripherals
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-size: 12px; font-weight: 500; color: var(--flank-color-text);">Clipboard database</div>
                  <div style="font-size: 11px; color: var(--flank-color-text-muted);">Removes all unpinned entries from local memory.</div>
                </div>
                ${Button({ label: "Clear unpinned", variant: "secondary", actionAttr: 'data-action="clear-clipboard"' })}
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); padding-top: 10px;">
                <div>
                  <div style="font-size: 12px; font-weight: 500; color: var(--flank-color-text);">Bluetooth settings</div>
                  <div style="font-size: 11px; color: var(--flank-color-text-muted);">Pair wireless controllers, headsets, and mice in Windows.</div>
                </div>
                <button type="button" class="flank-ui-btn is-secondary" data-item-kind="link" data-item-id="win-bluetooth-settings" data-target="ms-settings:bluetooth">
                  <span>Windows Settings</span>
                </button>
              </div>
            </div>
          `
    })}
      </div>
    `;
  } else {
    const isDark = currentTheme.mode === "dark";
    contentHtml = `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display:flex; flex-direction:column; align-items:center; text-align:center; padding: 24px 0 12px; gap: 12px;">
          ${flankLockup({ theme: isDark ? "dark" : "light", height: 72 })}
          <span class="flank-card-muted" style="color: var(--flank-color-text-muted); font-family: var(--flank-type-mono); font-size: 12px; margin-top: -4px;">Version ${APP_VERSION}</span>
          <span style="max-width: 440px; font-size: 13px; color: var(--flank-color-text-muted); line-height: 1.5;">
            A slim, vertical second dock for Windows with live widgets, instant clipboard history, and fluid themes.
          </span>
          <div style="display:flex; gap: 10px; margin-top: 6px;">
            ${Button({ label: "Website", variant: "ghost", actionAttr: 'data-action="open-link-website"' })}
            ${Button({ label: "GitHub Issues", variant: "ghost", actionAttr: 'data-action="open-link-issues"' })}
            ${Button({ label: "MIT License", variant: "ghost", actionAttr: 'data-action="open-link-license"' })}
          </div>
          <div style="display:flex; gap: 10px; margin-top: 6px;">
            ${Button({ label: "Check for updates", variant: "secondary", actionAttr: 'data-action="check-updates"' })}
            ${Button({ label: "Replay setup", variant: "secondary", actionAttr: 'data-action="replay-onboarding"' })}
          </div>
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
          `
    })}
      </div>
    `;
  }
  return `<div class="flank-window-backdrop" id="flank-full-window">
    <div class="flank-window" role="dialog" aria-label="Flank Settings">
      ${renderTitleBar("Flank Settings")}
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
        <span>Active theme: ${escapeHtml5(currentTheme.name)} (${escapeHtml5(currentTheme.id)})</span>
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="flank-chip" style="height: 22px; padding: 0 8px; font-size: 11px;">Press Esc to close</span>
        </div>
      </div>
    </div>
  </div>`;
}

// src/ui/onboarding/steps/welcome.ts
function renderWelcomeStepHtml() {
  const checkIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--flank-ob-status-ok)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 7"></path></svg>`;
  return `
    <div class="flank-ob-header flank-ob-header--welcome">
      <span class="flank-ob-eyebrow">Welcome</span>
      <h1 class="flank-ob-h1 flank-ob-h1--welcome" tabindex="-1" id="flank-ob-step-heading">A second dock, <span class="flank-ob-h1-accent">made for Windows.</span></h1>
      <p class="flank-ob-lead flank-ob-lead--welcome">Keep your apps, shortcuts and live widgets on the edge of your screen. Setup takes under a minute.</p>
    </div>
    <ul class="flank-ob-checks">
      <li class="flank-ob-check-row">${checkIcon}<span>Free and open source</span></li>
      <li class="flank-ob-check-row">${checkIcon}<span>Everything stays on your PC</span></li>
      <li class="flank-ob-check-row">${checkIcon}<span>Never steals focus from your apps</span></li>
    </ul>
  `;
}

// src/ui/onboarding/steps/edge.ts
function renderEdgeStepHtml(edge) {
  const isLeft = edge === "left";
  const isRight = edge === "right";
  return `
    <div class="flank-ob-header flank-ob-header--edge">
      <span class="flank-ob-eyebrow">Step 2 of 5 \xB7 Screen edge</span>
      <h1 class="flank-ob-h1" tabindex="-1" id="flank-ob-step-heading">Where should Flank live?</h1>
      <p class="flank-ob-lead">Pick the edge that stays out of your way. You can switch any time in Settings.</p>
    </div>
    <div class="flank-ob-edge-grid" role="radiogroup" aria-label="Screen edge" data-ob-radiogroup="edge">
      <button type="button" class="flank-ob-edge-card" role="radio" aria-checked="${isLeft ? "true" : "false"}" tabindex="${isLeft ? "0" : "-1"}" data-ob-edge="left">
        <span class="flank-ob-edge-schematic">
          <i class="flank-ob-edge-bar flank-ob-edge-bar--left"></i>
        </span>
        <span class="flank-ob-edge-label-row">Left edge</span>
      </button>
      <button type="button" class="flank-ob-edge-card" role="radio" aria-checked="${isRight ? "true" : "false"}" tabindex="${isRight ? "0" : "-1"}" data-ob-edge="right">
        <span class="flank-ob-edge-schematic">
          <i class="flank-ob-edge-bar flank-ob-edge-bar--right"></i>
        </span>
        <span class="flank-ob-edge-label-row">
          <span>Right edge</span>
          <span class="flank-ob-suggested-pill">Suggested</span>
        </span>
      </button>
    </div>
    <p class="flank-ob-edge-note">Flank sits inside the work area, so it never covers the taskbar or maximised windows.</p>
  `;
}

// src/ui/onboarding/steps/look.ts
var PRIMARY_THEME_TILES = [
  { id: "paper", label: "Paper", swatchClass: "flank-ob-theme-swatch--paper" },
  { id: "liquid-glass", label: "Liquid Glass", swatchClass: "flank-ob-theme-swatch--liquid-glass" },
  { id: "aurora", label: "Aurora", swatchClass: "flank-ob-theme-swatch--aurora" },
  { id: "nord", label: "Nord", swatchClass: "flank-ob-theme-swatch--nord" },
  { id: "terminal", label: "Terminal", swatchClass: "flank-ob-theme-swatch--terminal" }
];
var EXTRA_THEME_TILES = [
  { id: "rail", label: "Rail", swatchClass: "flank-ob-theme-swatch--rail" },
  { id: "glass", label: "Glass", swatchClass: "flank-ob-theme-swatch--glass" }
];
var ONBOARDING_ACCENT_SWATCHES = [
  { id: "terracotta", label: "Terracotta", hex: "#D95D39", swatchClass: "flank-ob-swatch--terracotta" },
  { id: "blue", label: "Blue", hex: "#2F4BFF", swatchClass: "flank-ob-swatch--blue" },
  { id: "violet", label: "Violet", hex: "#7C5CFF", swatchClass: "flank-ob-swatch--violet" },
  { id: "pink", label: "Pink", hex: "#FF4FA3", swatchClass: "flank-ob-swatch--pink" },
  { id: "green", label: "Green", hex: "#1FB57A", swatchClass: "flank-ob-swatch--green" }
];
function renderLookStepHtml(props) {
  const visibleThemes = props.themesExpanded ? [...PRIMARY_THEME_TILES, ...EXTRA_THEME_TILES] : PRIMARY_THEME_TILES;
  const activeThemeId = visibleThemes.some((t) => t.id === props.themeId) ? props.themeId : "paper";
  const themeTilesHtml = visibleThemes.map((t) => {
    const checked = t.id === activeThemeId;
    return `
        <button type="button" class="flank-ob-theme-tile" role="radio" aria-checked="${checked ? "true" : "false"}" tabindex="${checked ? "0" : "-1"}" data-ob-theme="${escapeHtml4(t.id)}">
          <span class="flank-ob-theme-swatch ${t.swatchClass}">
            <i class="flank-ob-theme-swatch-dock"></i>
          </span>
          <span class="flank-ob-theme-name">${escapeHtml4(t.label)}</span>
        </button>
      `;
  }).join("");
  const moreBtnHtml = props.themesExpanded ? "" : `<button type="button" class="flank-ob-theme-more" data-ob-action="expand-themes">+ 2 more</button>`;
  const normalizedAccent = (props.accent || "").toUpperCase();
  const matchedPreset = ONBOARDING_ACCENT_SWATCHES.find((s) => s.hex.toUpperCase() === normalizedAccent);
  const isCustomActive = !matchedPreset && Boolean(props.accent);
  const swatchesHtml = ONBOARDING_ACCENT_SWATCHES.map((s, idx) => {
    const checked = matchedPreset ? matchedPreset.id === s.id : false;
    const roveZero = checked || !matchedPreset && !isCustomActive && idx === 1;
    return `<button type="button" class="flank-ob-swatch ${s.swatchClass}" role="radio" aria-checked="${checked ? "true" : "false"}" tabindex="${roveZero ? "0" : "-1"}" aria-label="${escapeHtml4(s.label)}" data-ob-accent="${escapeHtml4(s.hex)}"></button>`;
  }).join("");
  const popoverHtml = props.customColorPopoverOpen ? `
      <div class="flank-ob-color-popover" role="dialog" aria-label="Custom accent colour" id="flank-ob-color-popover">
        <div class="flank-ob-color-popover-row">
          <input type="color" id="flank-ob-color-native" value="${escapeHtml4(props.accent)}" aria-label="Colour picker" style="width: 30px; height: 30px; padding: 0; border: 0; background: none; cursor: pointer;" />
          <input type="text" id="flank-ob-color-hex" class="flank-ob-color-input" value="${escapeHtml4(props.accent)}" maxlength="7" aria-label="Hex colour code" />
          <button type="button" class="flank-ob-color-apply" data-ob-action="apply-custom-accent">Apply</button>
        </div>
      </div>
    ` : "";
  return `
    <div class="flank-ob-header">
      <span class="flank-ob-eyebrow">Step 3 of 5 \xB7 Look</span>
      <h1 class="flank-ob-h1" tabindex="-1" id="flank-ob-step-heading">Choose a look.</h1>
      <p class="flank-ob-lead">Start with a theme. More are in Settings.</p>
    </div>
    <div class="flank-ob-theme-grid${props.themesExpanded ? " is-expanded" : ""}" role="radiogroup" aria-label="Theme" data-ob-radiogroup="theme">
      ${themeTilesHtml}
      ${moreBtnHtml}
    </div>
    <div class="flank-ob-accent-section">
      <div class="flank-ob-accent-label">Accent colour</div>
      <div class="flank-ob-accent-row" role="radiogroup" aria-label="Accent colour" data-ob-radiogroup="accent">
        ${swatchesHtml}
        <button type="button" class="flank-ob-swatch-custom${isCustomActive ? " is-active" : ""}" aria-label="Pick a custom colour" aria-expanded="${props.customColorPopoverOpen ? "true" : "false"}" data-ob-action="toggle-custom-accent" ${isCustomActive ? `style="background: ${escapeHtml4(props.accent)};"` : ""}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${isCustomActive ? "var(--flank-ob-accent-ink)" : "var(--flank-ob-text-muted)"}" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>
        </button>
      </div>
      ${popoverHtml}
    </div>
  `;
}

// src/ui/onboarding/steps/widgets.ts
var ONBOARDING_WIDGET_OPTIONS = [
  {
    kind: "weather",
    itemId: "widget-weather",
    label: "Weather",
    defaultOn: true,
    svgPaths: `<path d="M7 18a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17 8.6 4.7 4.7 0 0 1 17 18z"></path>`
  },
  {
    kind: "battery",
    itemId: "widget-battery",
    label: "Battery",
    defaultOn: true,
    svgPaths: `<rect x="2" y="7" width="17" height="10" rx="2.5"></rect><path d="M22 11v2"></path>`
  },
  {
    kind: "audio",
    itemId: "widget-audio",
    label: "Audio",
    defaultOn: true,
    svgPaths: `<path d="M11 5 6 9H3v6h3l5 4z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path>`
  },
  {
    kind: "focus",
    itemId: "widget-focus",
    label: "Focus timer",
    defaultOn: true,
    svgPaths: `<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle>`
  },
  {
    kind: "clock",
    itemId: "widget-clock",
    label: "World clock",
    defaultOn: true,
    svgPaths: `<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>`
  },
  {
    kind: "clipboard",
    itemId: "widget-clipboard",
    label: "Clipboard",
    defaultOn: true,
    svgPaths: `<rect x="6" y="4" width="12" height="17" rx="2.5"></rect><path d="M9 4h6v3H9z"></path>`
  },
  {
    kind: "bluetooth",
    itemId: "widget-bluetooth",
    label: "Bluetooth",
    defaultOn: true,
    svgPaths: `<path d="m7 7 10 10-5 5V2l5 5L7 17"></path>`
  },
  {
    kind: "calendar",
    itemId: "widget-calendar",
    label: "Agenda",
    defaultOn: false,
    svgPaths: `<rect x="4" y="5" width="16" height="15" rx="2.5"></rect><path d="M4 10h16M9 3v4M15 3v4"></path>`
  },
  {
    kind: "stats",
    itemId: "widget-stats",
    label: "System stats",
    defaultOn: false,
    svgPaths: `<rect x="6" y="6" width="12" height="12" rx="2.5"></rect><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"></path>`
  },
  {
    kind: "player",
    itemId: "widget-player",
    label: "Mini player",
    defaultOn: false,
    svgPaths: `<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>`
  },
  {
    kind: "tasks",
    itemId: "widget-tasks",
    label: "Quick to-do",
    defaultOn: false,
    svgPaths: `<rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="m9 12 2 2 4-4"></path>`
  },
  {
    kind: "calculator",
    itemId: "widget-calculator",
    label: "Calculator",
    defaultOn: false,
    svgPaths: `<rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M8 7h8M8 11h2M12 11h4M8 15h2M12 15h4"></path>`
  },
  {
    kind: "storage",
    itemId: "widget-storage",
    label: "Storage",
    defaultOn: false,
    svgPaths: `<path d="M4 14h16v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path><path d="M4 14 6.5 5.5A2 2 0 0 1 8.4 4h7.2a2 2 0 0 1 1.9 1.5L20 14"></path><circle cx="8" cy="17.5" r="0.8"></circle>`
  },
  {
    kind: "display",
    itemId: "widget-display",
    label: "Display",
    defaultOn: false,
    svgPaths: `<rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M8 20h8M12 16v4"></path>`
  },
  {
    kind: "gpu",
    itemId: "widget-gpu",
    label: "GPU stats",
    defaultOn: false,
    svgPaths: `<path d="M3 12h4l3-7 4 14 3-7h4"></path>`
  },
  {
    kind: "ambient",
    itemId: "widget-ambient",
    label: "Ambiance",
    defaultOn: false,
    svgPaths: `<path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0"></path><path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"></path>`
  },
  {
    kind: "privacy",
    itemId: "widget-privacy",
    label: "Privacy guard",
    defaultOn: false,
    svgPaths: `<path d="M12 3 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z"></path><path d="m9.5 12 1.8 1.8 3.5-3.6"></path>`
  },
  {
    kind: "runner",
    itemId: "widget-runner",
    label: "Command runner",
    defaultOn: false,
    svgPaths: `<rect x="3" y="4" width="18" height="16" rx="2.5"></rect><path d="m7 9 3 3-3 3M13 15h4"></path>`
  },
  {
    kind: "github",
    itemId: "widget-github",
    label: "GitHub",
    defaultOn: false,
    svgPaths: `<circle cx="12" cy="12" r="9"></circle><path d="M9 19v-2.2c-2.5.5-3-1.2-3-1.2-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.4 0-1 .3-1.8.9-2.4-.1-.2-.4-1.1.1-2.3 0 0 .8-.2 2.5.9a8.5 8.5 0 0 1 4.6 0c1.7-1.1 2.5-.9 2.5-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.8.6 1.7V19"></path>`
  },
  {
    kind: "scratchpad",
    itemId: "widget-scratchpad",
    label: "Scratchpad",
    defaultOn: false,
    svgPaths: `<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"></path>`
  },
  {
    kind: "colorpicker",
    itemId: "widget-colorpicker",
    label: "Color picker",
    defaultOn: false,
    svgPaths: `<path d="m19 5-4-4-2.5 2.5 4 4z"></path><path d="m14.5 5.5-9 9L4 19l4.5-1.5 9-9"></path>`
  },
  {
    kind: "network",
    itemId: "widget-network",
    label: "Network",
    defaultOn: false,
    svgPaths: `<path d="M5 12.5a10 10 0 0 1 14 0"></path><path d="M8.5 16a5 5 0 0 1 7 0"></path><circle cx="12" cy="19" r="1"></circle>`
  }
];
function renderWidgetsStepHtml(props) {
  const selectedSet = new Set(props.selectedWidgets);
  const count = props.selectedWidgets.length;
  const rowsHtml = ONBOARDING_WIDGET_OPTIONS.map((w) => {
    const isOn = selectedSet.has(w.kind);
    return `
      <div class="flank-ob-widget-row${isOn ? " is-on" : ""}" data-ob-widget-row="${escapeHtml4(w.kind)}">
        <svg class="flank-ob-widget-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${w.svgPaths}</svg>
        <span class="flank-ob-widget-name">${escapeHtml4(w.label)}</span>
        <button type="button" class="flank-ob-switch" role="switch" aria-checked="${isOn ? "true" : "false"}" aria-label="${escapeHtml4(w.label)}" data-ob-widget="${escapeHtml4(w.kind)}">
          <i class="flank-ob-switch-thumb"></i>
        </button>
      </div>
    `;
  }).join("");
  let counterText = `${count} of ${ONBOARDING_WIDGET_OPTIONS.length} widgets selected.`;
  let isWarn = false;
  if (count === 0) {
    counterText = "Turn on at least one widget";
    isWarn = true;
  } else if (props.capReachedWarning) {
    counterText = `${count} of ${ONBOARDING_WIDGET_OPTIONS.length} selected \xB7 Dock limit reached.`;
    isWarn = true;
  }
  return `
    <div class="flank-ob-header">
      <span class="flank-ob-eyebrow">Step 4 of 5 \xB7 Widgets</span>
      <h1 class="flank-ob-h1" tabindex="-1" id="flank-ob-step-heading">Pick your widgets.</h1>
      <p class="flank-ob-lead">Each one shows a live value on the dock and opens a card on hover.</p>
    </div>
    <div class="flank-ob-widgets-grid">
      ${rowsHtml}
    </div>
    <p class="flank-ob-widgets-counter${isWarn ? " is-warn" : ""}" id="flank-ob-widgets-counter">${escapeHtml4(counterText)}</p>
  `;
}

// src/ui/onboarding/steps/ready.ts
function renderHotkeyKeycapsHtml(combo) {
  const parts = (combo || "").split("+").map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return "";
  return `<span class="flank-ob-kbd-group">${parts.map((part) => `<kbd class="flank-ob-kbd">${escapeHtml4(part)}</kbd>`).join("")}</span>`;
}
function renderReadyStepHtml(props) {
  const hideKbd = renderHotkeyKeycapsHtml(props.hideHotkey || "Ctrl+Alt+F");
  const clipKbd = renderHotkeyKeycapsHtml(props.clipboardHotkey || "Ctrl+Alt+V");
  return `
    <div class="flank-ob-header">
      <span class="flank-ob-eyebrow flank-ob-eyebrow--done">Step 5 of 5 \xB7 Done</span>
      <h1 class="flank-ob-h1" tabindex="-1" id="flank-ob-step-heading">You're all set.</h1>
      <p class="flank-ob-lead">Three things worth knowing before you start.</p>
    </div>
    <ul class="flank-ob-info-list">
      <li class="flank-ob-info-item">
        <span class="flank-ob-info-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"></path></svg>
        </span>
        <span class="flank-ob-info-text">
          <b class="flank-ob-info-title">Hide it with one click</b>
          <span class="flank-ob-info-sub">Use the arrow, or press the hotkey</span>
        </span>
        ${hideKbd}
      </li>
      <li class="flank-ob-info-item">
        <span class="flank-ob-info-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="4" width="12" height="17" rx="2.5"></rect><path d="M9 4h6v3H9z"></path></svg>
        </span>
        <span class="flank-ob-info-text">
          <b class="flank-ob-info-title">Open clipboard history</b>
          <span class="flank-ob-info-sub">From any app, any time</span>
        </span>
        ${clipKbd}
      </li>
      <li class="flank-ob-info-item">
        <span class="flank-ob-info-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"></path></svg>
        </span>
        <span class="flank-ob-info-text">
          <b class="flank-ob-info-title">Change anything later</b>
          <span class="flank-ob-info-sub">Use the gear at the bottom of the dock</span>
        </span>
      </li>
    </ul>
    <div class="flank-ob-autostart-row" data-ob-autostart-row="true">
      <button type="button" class="flank-ob-switch flank-ob-switch--lg" role="switch" aria-checked="${props.autostart ? "true" : "false"}" aria-label="Start Flank when Windows starts" data-ob-action="toggle-autostart">
        <i class="flank-ob-switch-thumb"></i>
      </button>
      <span>Start Flank when Windows starts</span>
    </div>
  `;
}

// src/ui/onboarding/preview.ts
function buildScopedThemeVars(themeId, edge, accent) {
  const normalizedId = (themeId || "paper").replace(/_/g, "-");
  const rawBase = BUNDLED_THEMES[normalizedId] || BUNDLED_THEMES.paper || PAPER_THEME;
  const candidate = structuredClone(rawBase);
  candidate.layout.edge = edge;
  if (accent) {
    const derived = deriveAccentTokens(accent);
    if (derived) {
      candidate.color.accent = derived.accent;
      candidate.color.accentGradient = derived.accentGradient;
      candidate.color.accentInk = derived.accentInk;
      candidate.color.accentSoft = derived.accentSoft;
      candidate.color.accentLine = derived.accentLine;
      candidate.color.focusRing = derived.focusRing;
    }
  }
  const vars = flattenThemeToCssVars(candidate);
  const styleParts = Object.entries(vars).map(([k, v]) => `${k}: ${v}`);
  let backdropKind = "light";
  if (normalizedId === "liquid-glass" || normalizedId === "glass") {
    backdropKind = "vivid";
  } else if (normalizedId === "aurora") {
    backdropKind = "aurora";
  } else if (normalizedId === "terminal") {
    backdropKind = "terminal";
  } else if (normalizedId === "nord" || normalizedId === "rail") {
    backdropKind = "dark";
  }
  return {
    theme: candidate,
    styleAttr: styleParts.join("; "),
    backdropKind
  };
}
function getWidgetMockValue(kind, _liveState) {
  switch (kind) {
    case "weather":
      return "24\xB0";
    case "battery":
      return "80%";
    case "audio":
      return "68%";
    case "focus":
      return "25m";
    case "clock":
      return "17:20";
    case "clipboard":
      return "8";
    case "bluetooth":
      return "2d";
    case "calendar":
      return "14:00";
    case "stats":
      return "18%";
    default:
      return "\u2014";
  }
}
function renderOnboardingPreviewHtml(props) {
  const { theme, styleAttr, backdropKind } = buildScopedThemeVars(
    props.themeId,
    props.edge,
    props.accent
  );
  const isRight = props.edge === "right";
  let fauxLeft = 22;
  let fauxTop = 26;
  let fauxWidth = 230;
  let fauxHeight = 250;
  let lineCount = 3;
  if (props.step === 2) {
    fauxLeft = 84;
    fauxTop = 50;
    fauxWidth = 240;
    fauxHeight = 300;
    lineCount = 3;
  } else if (props.step === 3) {
    fauxLeft = isRight ? 22 : 124;
    fauxTop = 26;
    fauxWidth = 230;
    fauxHeight = 220;
    lineCount = 2;
  } else if (props.step === 4) {
    fauxLeft = isRight ? 22 : 124;
    fauxTop = 26;
    fauxWidth = 230;
    fauxHeight = 250;
    lineCount = 2;
  } else if (props.step === 5) {
    fauxLeft = isRight ? 22 : 104;
    fauxTop = 26;
    fauxWidth = 260;
    fauxHeight = 290;
    lineCount = 4;
  }
  const lineWidths = ["92%", "80%", "86%", "70%"];
  const skeletonLinesHtml = lineWidths.slice(0, lineCount).map((w) => `<i class="flank-ob-faux-line" style="width: ${w};"></i>`).join("");
  const fauxWindowHtml = `
    <div class="flank-ob-faux-window" style="left: ${fauxLeft}px; top: ${fauxTop}px; width: ${fauxWidth}px; height: ${fauxHeight}px;">
      <div class="flank-ob-faux-dots">
        <i class="flank-ob-faux-dot"></i>
        <i class="flank-ob-faux-dot"></i>
        <i class="flank-ob-faux-dot"></i>
      </div>
      <i class="flank-ob-faux-line flank-ob-faux-line--title"></i>
      ${skeletonLinesHtml}
    </div>
  `;
  if (props.step === 5) {
    const formattedHotkey = (props.hideHotkey || "Ctrl+Alt+F").split("+").map((s) => s.trim()).filter(Boolean).join(" ");
    const tabStyle = isRight ? "right: 0px; border-radius: 12px 0 0 12px; border-right: 0;" : "left: 0px; border-radius: 0 12px 12px 0; border-left: 0;";
    const tabChevronPath = isRight ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7";
    const calloutPosStyle = isRight ? "right: 34px;" : "left: 34px;";
    return `
      <div class="flank-ob-right" aria-hidden="true">
        <div class="flank-ob-preview-desktop" data-theme="${escapeHtml4(theme.id)}" data-mode="${escapeHtml4(theme.mode)}" data-edge="${escapeHtml4(props.edge)}" data-shape="${escapeHtml4(theme.layout.shape)}" data-preview-backdrop="${escapeHtml4(backdropKind)}" style="${escapeHtml4(styleAttr)}">
          ${fauxWindowHtml}
          <div class="flank-ob-callout" style="${calloutPosStyle}">
            Click the tab to bring Flank back.<br />
            <span class="flank-ob-callout-sub">Or press ${escapeHtml4(formattedHotkey)}.</span>
          </div>
          <div class="flank-ob-mock-tab" style="${tabStyle}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${tabChevronPath}"></path></svg>
          </div>
        </div>
      </div>
    `;
  }
  const previewWidgetKinds = props.step === 4 ? props.selectedWidgets : ["weather", "battery", "audio", "focus"];
  const activeCardKind = props.step === 1 ? "weather" : props.step === 3 ? "focus" : null;
  const isCompactDock = previewWidgetKinds.length > 6;
  const tileHeight = isCompactDock ? 36 : 42;
  const dockGap = isCompactDock ? 4 : 6;
  const widgetTilesHtml = previewWidgetKinds.map((kind) => {
    const opt = ONBOARDING_WIDGET_OPTIONS.find((o) => o.kind === kind);
    if (!opt) return "";
    const isActive = activeCardKind === kind;
    const valText = getWidgetMockValue(kind, props.liveState);
    return `
        <span class="flank-ob-mock-tile${isActive ? " is-active" : ""}" style="height: ${tileHeight}px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${opt.svgPaths}</svg>
          <b class="flank-ob-mock-tile-val">${escapeHtml4(valText)}</b>
        </span>
      `;
  }).join("");
  const nTiles = previewWidgetKinds.length;
  const dockHeight = nTiles === 4 && !isCompactDock ? 340 : nTiles === 6 && !isCompactDock ? 424 : Math.min(500, 128 + nTiles * (tileHeight + dockGap));
  const dockMarginTop = -Math.round(dockHeight / 2);
  const dockLeftCss = isRight ? "calc(100% - 68px)" : "12px";
  const collapseChevronPath = isRight ? "m9 5 7 7-7 7" : "m15 5-7 7 7 7";
  let openCardHtml = "";
  if (props.step === 1) {
    const cardPos = isRight ? "right: 84px;" : "left: 84px;";
    openCardHtml = `
      <div class="flank-ob-mock-card" style="${cardPos} top: 130px; width: 170px; gap: 8px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600;">
          <span>Kyoto</span>
          <span style="color: var(--flank-color-text-muted); font-weight: 500;">Now</span>
        </div>
        <div style="display: flex; align-items: flex-end; justify-content: space-between;">
          <span style="font-size: 32px; line-height: 1; font-weight: 600; letter-spacing: -0.03em;">24\xB0</span>
          <span style="font-size: 11px; color: var(--flank-color-text-muted); text-align: right;">Partly cloudy<br />H 27\xB0 L 18\xB0</span>
        </div>
      </div>
    `;
  } else if (props.step === 3) {
    const cardPos = isRight ? "right: 84px;" : "left: 84px;";
    openCardHtml = `
      <div class="flank-ob-mock-card" style="${cardPos} top: 150px; width: 190px; gap: 10px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600;">
          <span>Focus timer</span>
          <span style="color: var(--flank-color-text-muted); font-weight: 500; display: flex; align-items: center; gap: 5px;">
            <i style="width: 6px; height: 6px; border-radius: 3px; background: var(--flank-color-accent);"></i>Ready
          </span>
        </div>
        <div style="font-size: 36px; line-height: 1; font-weight: 600; letter-spacing: -0.04em; text-align: center; padding: 4px 0;">25:00</div>
        <div style="height: 34px; border-radius: 10px; background: var(--flank-color-accent); color: var(--flank-color-accent-ink); font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center;">Start focus</div>
      </div>
    `;
  }
  let step2ExtrasHtml = "";
  if (props.step === 2) {
    const ghostSide = isRight ? "left: 12px;" : "right: 12px;";
    const pillPos = isRight ? "left: 84px;" : "right: 84px;";
    const pillText = isRight ? "Moves to the right edge" : "Moves to the left edge";
    step2ExtrasHtml = `
      <div class="flank-ob-ghost-dock" style="${ghostSide}"></div>
      <span class="flank-ob-edge-pill" style="${pillPos}">${escapeHtml4(pillText)}</span>
    `;
  }
  return `
    <div class="flank-ob-right" aria-hidden="true">
      <div class="flank-ob-preview-desktop" data-theme="${escapeHtml4(theme.id)}" data-mode="${escapeHtml4(theme.mode)}" data-edge="${escapeHtml4(props.edge)}" data-shape="${escapeHtml4(theme.layout.shape)}" data-preview-backdrop="${escapeHtml4(backdropKind)}" style="${escapeHtml4(styleAttr)}">
        ${fauxWindowHtml}
        ${step2ExtrasHtml}
        ${openCardHtml}
        <div class="flank-ob-mock-dock" style="left: ${dockLeftCss}; margin-top: ${dockMarginTop}px; height: ${dockHeight}px; gap: ${dockGap}px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--flank-color-text-muted)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${collapseChevronPath}"></path></svg>
          <span class="flank-ob-mock-app flank-ob-mock-app--terminal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--flank-ob-accent-ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 7 5 5-5 5"></path><path d="M12 18h7"></path></svg>
          </span>
          <span class="flank-ob-mock-app flank-ob-mock-app--browser">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--flank-color-accent-ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c3.2 3.2 3.2 14.8 0 18M12 3c-3.2 3.2-3.2 14.8 0 18"></path></svg>
          </span>
          <span class="flank-ob-mock-divider"></span>
          ${widgetTilesHtml}
        </div>
      </div>
    </div>
  `;
}

// src/ui/onboarding/onboarding.ts
var DEFAULT_ONBOARDING_WIDGETS = ONBOARDING_WIDGET_OPTIONS.filter((w) => w.defaultOn).map((w) => w.kind);
var ALL_ONBOARDING_WIDGET_KINDS = ONBOARDING_WIDGET_OPTIONS.map((w) => w.kind);
function applyOnboardingWidgetsToItems(existingItems, selectedWidgets, replay = false) {
  const baseList = Array.isArray(existingItems) && existingItems.length > 0 ? structuredClone(existingItems) : structuredClone(createSampleState().items);
  const selectedSet = new Set(selectedWidgets);
  const onboardingSet = new Set(ALL_ONBOARDING_WIDGET_KINDS);
  for (const item of baseList) {
    if (item.kind === "widget" || item.group === "widgets") {
      const wKind = item.widgetKind;
      if (wKind && onboardingSet.has(wKind)) {
        item.enabled = selectedSet.has(wKind);
      } else if (!replay) {
        item.enabled = false;
      }
    } else if (!replay && (item.kind === "app" || item.group === "apps")) {
      item.enabled = true;
    }
  }
  return baseList;
}
var OnboardingMachine = class {
  state;
  sourceItems;
  constructor(options = {}) {
    const replay = Boolean(options.replay);
    const sample = createSampleState();
    this.sourceItems = Array.isArray(options.items) && options.items.length > 0 ? structuredClone(options.items) : structuredClone(sample.items);
    const maxDockItems = options.maxDockItems ?? 26;
    let initialWidgets;
    if (Array.isArray(options.selectedWidgets)) {
      initialWidgets = [...options.selectedWidgets];
    } else if (replay && Array.isArray(options.items) && options.items.length > 0) {
      const onboardingSet = new Set(ALL_ONBOARDING_WIDGET_KINDS);
      initialWidgets = options.items.filter((it) => it.enabled && it.widgetKind && onboardingSet.has(it.widgetKind)).map((it) => it.widgetKind);
      if (initialWidgets.length === 0) {
        initialWidgets = [...DEFAULT_ONBOARDING_WIDGETS];
      }
    } else {
      initialWidgets = [...DEFAULT_ONBOARDING_WIDGETS];
    }
    const baseItemCount = options.baseItemCount !== void 0 ? options.baseItemCount : replay ? this.sourceItems.filter(
      (it) => it.enabled && !(it.kind === "widget" && it.widgetKind && ALL_ONBOARDING_WIDGET_KINDS.includes(it.widgetKind))
    ).length : this.sourceItems.filter((it) => it.enabled && (it.kind === "app" || it.group === "apps")).length;
    const maxAllowedWidgets = Math.max(0, Math.min(maxDockItems, maxDockItems - baseItemCount));
    if (initialWidgets.length > maxAllowedWidgets) {
      initialWidgets = initialWidgets.slice(0, maxAllowedWidgets);
    }
    const themeId = (options.themeId || "paper").replace(/_/g, "-");
    const isExtraTheme = EXTRA_THEME_TILES.some((t) => t.id === themeId);
    const clipItem = this.sourceItems.find(
      (it) => it.id === "widget-clipboard" || it.widgetKind === "clipboard"
    );
    this.state = {
      step: 1,
      direction: "none",
      replay,
      completed: false,
      skipped: false,
      edge: options.edge === "left" ? "left" : "right",
      themeId,
      themesExpanded: isExtraTheme,
      accent: options.accent || "#2F4BFF",
      customColorPopoverOpen: false,
      selectedWidgets: initialWidgets,
      baseItemCount,
      maxDockItems,
      capReachedWarning: false,
      autostart: options.autostart !== void 0 ? Boolean(options.autostart) : true,
      hideHotkey: options.hideHotkey || "Ctrl+Alt+F",
      clipboardHotkey: options.clipboardHotkey || clipItem?.shortcut || "Ctrl+Alt+V"
    };
  }
  getSnapshot() {
    return {
      ...this.state,
      selectedWidgets: [...this.state.selectedWidgets]
    };
  }
  canContinue() {
    if (this.state.step === 4) {
      return this.state.selectedWidgets.length >= 1 && this.state.baseItemCount + this.state.selectedWidgets.length <= this.state.maxDockItems;
    }
    return true;
  }
  next() {
    if (!this.canContinue()) {
      return this.getSnapshot();
    }
    if (this.state.step < 5) {
      this.state.step = this.state.step + 1;
      this.state.direction = "next";
      this.state.customColorPopoverOpen = false;
    }
    return this.getSnapshot();
  }
  back() {
    if (this.state.step > 1) {
      this.state.step = this.state.step - 1;
      this.state.direction = "back";
      this.state.customColorPopoverOpen = false;
    }
    return this.getSnapshot();
  }
  goToStep(step) {
    if (step === this.state.step) return this.getSnapshot();
    this.state.direction = step > this.state.step ? "next" : "back";
    this.state.step = step;
    this.state.customColorPopoverOpen = false;
    return this.getSnapshot();
  }
  setEdge(edge) {
    this.state.edge = edge === "left" ? "left" : "right";
    this.state.direction = "none";
    return this.getSnapshot();
  }
  setTheme(themeId) {
    const normalized = (themeId || "paper").replace(/_/g, "-");
    this.state.themeId = normalized;
    if (EXTRA_THEME_TILES.some((t) => t.id === normalized)) {
      this.state.themesExpanded = true;
    }
    this.state.direction = "none";
    return this.getSnapshot();
  }
  expandThemes() {
    this.state.themesExpanded = true;
    this.state.direction = "none";
    return this.getSnapshot();
  }
  setAccent(hex) {
    let cleaned = (hex || "").trim();
    if (!cleaned.startsWith("#")) cleaned = `#${cleaned}`;
    if (/^#[0-9A-Fa-f]{3}$/.test(cleaned)) {
      cleaned = `#${cleaned[1]}${cleaned[1]}${cleaned[2]}${cleaned[2]}${cleaned[3]}${cleaned[3]}`;
    }
    if (/^#[0-9A-Fa-f]{6}$/.test(cleaned)) {
      this.state.accent = cleaned.toUpperCase();
    }
    this.state.direction = "none";
    return this.getSnapshot();
  }
  toggleCustomColorPopover(open) {
    this.state.customColorPopoverOpen = open !== void 0 ? Boolean(open) : !this.state.customColorPopoverOpen;
    this.state.direction = "none";
    return this.getSnapshot();
  }
  handleEscape() {
    if (this.state.customColorPopoverOpen) {
      this.state.customColorPopoverOpen = false;
      this.state.direction = "none";
      return { closedPopover: true, skipped: false };
    }
    return { closedPopover: false, skipped: false };
  }
  toggleWidget(kind) {
    this.state.direction = "none";
    const idx = this.state.selectedWidgets.indexOf(kind);
    if (idx >= 0) {
      this.state.selectedWidgets.splice(idx, 1);
      this.state.capReachedWarning = false;
      return { ok: true, snapshot: this.getSnapshot() };
    }
    const totalItems = this.state.baseItemCount + this.state.selectedWidgets.length;
    if (totalItems >= this.state.maxDockItems || this.state.selectedWidgets.length >= this.state.maxDockItems) {
      this.state.capReachedWarning = true;
      return { ok: false, reason: "cap_reached", snapshot: this.getSnapshot() };
    }
    const nextSet = /* @__PURE__ */ new Set([...this.state.selectedWidgets, kind]);
    this.state.selectedWidgets = ALL_ONBOARDING_WIDGET_KINDS.filter((k) => nextSet.has(k));
    if (!this.state.selectedWidgets.includes(kind)) {
      this.state.selectedWidgets.push(kind);
    }
    this.state.capReachedWarning = false;
    return { ok: true, snapshot: this.getSnapshot() };
  }
  setAutostart(enabled) {
    this.state.autostart = Boolean(enabled);
    this.state.direction = "none";
    return this.getSnapshot();
  }
  /**
   * Skip setup (steps 1-4 or closing window with X before finishing):
   * Applies defaults (Right edge, Paper, blue accent #2F4BFF, recommended widgets),
   * sets onboarding.completed = true, and shows the dock.
   */
  skip() {
    this.state.edge = "right";
    this.state.themeId = "paper";
    this.state.accent = "#2F4BFF";
    this.state.selectedWidgets = [...DEFAULT_ONBOARDING_WIDGETS];
    this.state.completed = true;
    this.state.skipped = true;
    this.state.customColorPopoverOpen = false;
    this.state.direction = "none";
    const updatedItems = applyOnboardingWidgetsToItems(
      this.sourceItems,
      this.state.selectedWidgets,
      false
    );
    const onboardingRecord = {
      completed: true,
      version: 1,
      completedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const prefsPatch = {
      themeId: "paper",
      edgeOverride: "right",
      accentOverride: "#2F4BFF",
      items: updatedItems,
      dockState: "expanded",
      onboarding: onboardingRecord
    };
    return { prefsPatch, snapshot: this.getSnapshot() };
  }
  /**
   * Open my dock (Step 5):
   * Writes all choices in one settings write, sets onboarding.completed = true,
   * and starts the dock in its normal expanded state.
   */
  finish() {
    this.state.completed = true;
    this.state.skipped = false;
    this.state.customColorPopoverOpen = false;
    this.state.direction = "none";
    const updatedItems = applyOnboardingWidgetsToItems(
      this.sourceItems,
      this.state.selectedWidgets,
      this.state.replay
    );
    const onboardingRecord = {
      completed: true,
      version: 1,
      completedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const prefsPatch = {
      themeId: this.state.themeId,
      edgeOverride: this.state.edge,
      accentOverride: this.state.accent,
      autostart: this.state.autostart,
      items: updatedItems,
      dockState: "expanded",
      onboarding: onboardingRecord
    };
    return { prefsPatch, snapshot: this.getSnapshot() };
  }
};
function renderOnboardingBrandIconHtml() {
  return `<svg class="flank-ob-logo" width="32" height="32" viewBox="0 0 128 128" role="img" aria-label="Flank"><rect width="128" height="128" rx="30" fill="var(--flank-ob-accent)"></rect><g transform="translate(28 17.92) scale(0.72)"><path d="M12 44 a38 38 0 0 1 76 0 V84 a38 38 0 0 1 -76 0 Z" fill="none" stroke="var(--flank-ob-accent-ink)" stroke-width="9"></path><path d="M37 42 a4 4 0 0 1 4 -4 H62 a7 7 0 0 1 0 14 H51 V60 H60 a6 6 0 0 1 0 12 H51 V86 a4 4 0 0 1 -4 4 H41 a4 4 0 0 1 -4 -4 Z" fill="var(--flank-ob-accent-ink)"></path></g></svg>`;
}
function renderOnboardingStepBodyHtml(snap) {
  switch (snap.step) {
    case 1:
      return renderWelcomeStepHtml();
    case 2:
      return renderEdgeStepHtml(snap.edge);
    case 3:
      return renderLookStepHtml({
        themeId: snap.themeId,
        themesExpanded: snap.themesExpanded,
        accent: snap.accent,
        customColorPopoverOpen: snap.customColorPopoverOpen
      });
    case 4:
      return renderWidgetsStepHtml({
        selectedWidgets: snap.selectedWidgets,
        capReachedWarning: snap.capReachedWarning
      });
    case 5:
      return renderReadyStepHtml({
        autostart: snap.autostart,
        hideHotkey: snap.hideHotkey,
        clipboardHotkey: snap.clipboardHotkey
      });
  }
}
function renderOnboardingFooterHtml(snap, canContinue) {
  const dotsHtml = [1, 2, 3, 4, 5].map((idx) => {
    const cls = idx === snap.step ? "flank-ob-dot is-active" : idx < snap.step ? "flank-ob-dot is-done" : "flank-ob-dot";
    return `<i class="${cls}"></i>`;
  }).join("");
  const progressGroup = `<div class="flank-ob-dots" role="img" aria-label="Step ${snap.step} of 5">${dotsHtml}</div>`;
  if (snap.step === 1) {
    return `
      ${progressGroup}
      <button type="button" class="flank-ob-btn-primary" data-ob-action="next">
        <span>Get started</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--flank-ob-accent-ink)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
      </button>
    `;
  }
  const primaryLabel = snap.step === 5 ? "Open my dock" : "Continue";
  const primaryAction = snap.step === 5 ? "finish" : "next";
  return `
    <button type="button" class="flank-ob-btn-back" data-ob-action="back">Back</button>
    ${progressGroup}
    <button type="button" class="flank-ob-btn-primary" data-ob-action="${primaryAction}" ${canContinue ? "" : "disabled"}>${primaryLabel}</button>
  `;
}
function renderOnboardingHtml(machine, liveState) {
  const snap = machine.getSnapshot();
  const canContinue = machine.canContinue();
  const animClass = snap.direction === "next" ? " is-anim-next" : snap.direction === "back" ? " is-anim-back" : "";
  const skipButtonHtml = snap.step <= 4 ? `<button type="button" class="flank-ob-skip" data-ob-action="skip">Skip setup</button>` : "";
  const previewHtml = renderOnboardingPreviewHtml({
    step: snap.step,
    edge: snap.edge,
    themeId: snap.themeId,
    accent: snap.accent,
    selectedWidgets: snap.selectedWidgets,
    hideHotkey: snap.hideHotkey,
    liveState
  });
  return `
    <div class="flank-ob-shell" data-ob-step="${snap.step}">
      <div class="flank-ob-left">
        <div class="flank-ob-topbar" id="flank-ob-topbar">
          ${renderOnboardingBrandIconHtml()}
          ${skipButtonHtml}
        </div>
        <div class="flank-ob-step-body${animClass}" id="flank-ob-step-body">
          ${renderOnboardingStepBodyHtml(snap)}
        </div>
        <div class="flank-ob-footer" id="flank-ob-footer">
          ${renderOnboardingFooterHtml(snap, canContinue)}
        </div>
      </div>
      ${previewHtml}
    </div>
  `;
}

// src/main.ts
var lastNumValues = /* @__PURE__ */ new Map();
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
function checkAccentContrast(accentHex) {
  try {
    const derived = deriveAccentTokens(accentHex);
    if (!derived) return "Invalid color format.";
    const currentTheme = themeEngine.getEffectiveTheme(state);
    const parsedSurface = parseColor(currentTheme.surface.dock.bg) || { r: 251, g: 250, b: 247, a: 1 };
    const parsedAccent = parseColor(accentHex);
    if (!parsedAccent) return null;
    const ratio = contrastRatio(parsedAccent, parsedSurface);
    if (ratio < 3) {
      return `Warning: Contrast against surface is ${ratio.toFixed(1)}:1 (recommended >= 3:1). A high-contrast text color has been set.`;
    }
  } catch {
  }
  return null;
}
var urlParams = new URLSearchParams(window.location.search);
var hashView = (window.location.hash || "").replace(/^#/, "").replace(/^view=/, "");
var currentView = urlParams.get("view") || hashView || "dock";
document.body.setAttribute("data-view", currentView);
var themeEngine = new ThemeEngine();
var state = createSampleState();
if (currentView === "modal") {
  state.activeFullWindow = "settings";
}
var onboardingMachine = null;
var lastRenderedOnboardingStep = null;
function createOnboardingMachineFromState(opts) {
  const replay = Boolean(opts?.replay);
  const clipItem = state.items.find(
    (it) => it.id === "widget-clipboard" || it.widgetKind === "clipboard"
  );
  const queryEdge = urlParams.get("edge");
  const queryObTheme = urlParams.get("obTheme");
  const queryObAccent = urlParams.get("obAccent");
  const machine = new OnboardingMachine({
    replay,
    edge: queryEdge || (replay ? state.edgeOverride === "left" ? "left" : "right" : "right"),
    themeId: queryObTheme || (replay ? state.themeId : "paper"),
    accent: queryObAccent || (replay ? state.accentOverride || "#2F4BFF" : "#2F4BFF"),
    items: state.items,
    autostart: replay ? state.autostart : true,
    hideHotkey: state.collapseHotkey || "Ctrl+Alt+F",
    clipboardHotkey: clipItem?.shortcut || "Ctrl+Alt+V"
  });
  if (urlParams.get("expanded") === "1" || urlParams.get("expanded") === "true") {
    machine.expandThemes();
  }
  const targetStep = opts?.step || Number(urlParams.get("step"));
  if (targetStep && targetStep >= 1 && targetStep <= 5) {
    machine.goToStep(targetStep);
  }
  return machine;
}
function ensureOnboardingMachine() {
  if (!onboardingMachine) {
    onboardingMachine = createOnboardingMachineFromState({
      replay: urlParams.get("replay") === "1" || urlParams.get("replay") === "true"
    });
  }
  return onboardingMachine;
}
var uiState = {
  clipboardQuery: "",
  clipboardFilter: "all",
  selectedClipboardId: "cb-2",
  settingsTab: "appearance",
  recordingItemId: null,
  shortcutConflictMsg: null,
  themeValidationMsg: null
};
window.flankStartOnboarding = (opts) => {
  currentView = "onboarding";
  document.body.setAttribute("data-view", "onboarding");
  themeEngine.revertToPaper();
  lastRenderedOnboardingStep = null;
  onboardingMachine = createOnboardingMachineFromState(opts);
  renderApp();
};
window.flankSkipOnboardingFromHost = () => {
  const machine = ensureOnboardingMachine();
  const res = machine.skip();
  return res.prefsPatch;
};
window.flankOpenModal = (win) => {
  if (win === "onboarding") {
    window.flankStartOnboarding?.({ replay: false });
    return;
  }
  if (currentView === "onboarding") {
    currentView = "modal";
    document.body.setAttribute("data-view", "modal");
    lastRenderedOnboardingStep = null;
  }
  applyCurrentThemeSelection();
  state.activeFullWindow = win;
  renderApp();
};
window.flankShowCard = (widgetKind) => {
  state.activeWidget = widgetKind;
  renderApp();
};
window.flankSwitchTheme = (themeId) => {
  state.themeId = themeId;
  state.edgeOverride = null;
  state.accentOverride = null;
  applyCurrentThemeSelection();
  renderApp();
};
window.flankUpdateBackdrop = (data) => {
  const root = document.documentElement;
  const curTheme = themeEngine.getCurrentTheme();
  const isWallpaperSampled = curTheme.id !== "glass" && Boolean(curTheme.glass && curTheme.glass.mode === "wallpaper-sampled");
  if (!data || data.solidFallback || !data.enabled || !isWallpaperSampled) {
    if (data?.solidFallback) {
      root.setAttribute("data-transparency-effects", "disabled");
    } else {
      root.removeAttribute("data-transparency-effects");
    }
    root.style.removeProperty("--flank-glass-wallpaper-url");
    root.style.removeProperty("--flank-glass-wallpaper-size");
    root.style.removeProperty("--flank-glass-wallpaper-pos");
    return;
  }
  root.removeAttribute("data-transparency-effects");
  if (data.wallpaperUrl) {
    root.style.setProperty("--flank-glass-wallpaper-url", `url("${data.wallpaperUrl}")`);
  }
  if (data.monitorWidth && data.monitorHeight) {
    root.style.setProperty("--flank-glass-wallpaper-size", `${data.monitorWidth}px ${data.monitorHeight}px`);
  }
  if (data.shapeX !== void 0 && data.shapeY !== void 0) {
    root.style.setProperty("--flank-glass-wallpaper-pos", `-${data.shapeX}px -${data.shapeY}px`);
  }
  if (data.adaptiveAlpha !== void 0) {
    const curTheme2 = themeEngine.getCurrentTheme();
    if (curTheme2.glass) {
      const tintRgb = curTheme2.glass.tintRgb || "16,20,42";
      root.style.setProperty("--flank-surface-dock-bg", `rgba(${tintRgb}, ${data.adaptiveAlpha})`);
      root.style.setProperty("--flank-surface-card-bg", `rgba(${tintRgb}, ${data.adaptiveAlpha})`);
    }
  }
  if (data.useTextShadow) {
    root.setAttribute("data-contrast", "low");
  } else {
    root.removeAttribute("data-contrast");
  }
};
window.flankOpenWindow = (win) => {
  state.activeFullWindow = state.activeFullWindow === win ? null : win;
  state.activeWidget = null;
  renderApp();
};
var hoverCloseTimer = null;
var lastRegionSignature = "";
function parseFirstRadiusPx(raw) {
  const m = String(raw || "").match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : 16;
}
function positionHoverCard() {
  const dockEl = document.getElementById("flank-dock");
  const cardEl = document.getElementById("flank-hover-card");
  const caretEl = document.getElementById("flank-card-caret");
  if (!dockEl || !cardEl || !state.activeWidget) return;
  const activeTile = dockEl.querySelector(`[data-widget="${state.activeWidget}"]`);
  if (!activeTile) return;
  const dockRect = dockEl.getBoundingClientRect();
  const tileRect = activeTile.getBoundingClientRect();
  const cardRect = cardEl.getBoundingClientRect();
  const rootStyle = getComputedStyle(document.documentElement);
  const offset = parseFloat(rootStyle.getPropertyValue("--flank-surface-card-offset")) || 10;
  const edge = state.edgeOverride || themeEngine.getCurrentTheme().layout.edge;
  const pad = 12;
  if (edge === "right") {
    const left = Math.max(pad, dockRect.left - cardRect.width - offset);
    const tileCenterY = tileRect.top + tileRect.height / 2;
    const top = Math.max(
      pad,
      Math.min(window.innerHeight - cardRect.height - pad, tileCenterY - cardRect.height / 2)
    );
    cardEl.style.left = `${Math.round(left)}`;
    cardEl.style.setProperty("left", `${Math.round(left)}px`);
    cardEl.style.setProperty("top", `${Math.round(top)}px`);
    if (caretEl) {
      const caretTop = Math.max(16, Math.min(cardRect.height - 28, tileCenterY - top - 6));
      caretEl.style.setProperty("top", `${Math.round(caretTop)}px`);
    }
  } else if (edge === "left") {
    const left = Math.min(window.innerWidth - cardRect.width - pad, dockRect.right + offset);
    const tileCenterY = tileRect.top + tileRect.height / 2;
    const top = Math.max(
      pad,
      Math.min(window.innerHeight - cardRect.height - pad, tileCenterY - cardRect.height / 2)
    );
    cardEl.style.setProperty("left", `${Math.round(left)}px`);
    cardEl.style.setProperty("top", `${Math.round(top)}px`);
    if (caretEl) {
      const caretTop = Math.max(16, Math.min(cardRect.height - 28, tileCenterY - top - 6));
      caretEl.style.setProperty("top", `${Math.round(caretTop)}px`);
    }
  } else {
    const top = Math.min(window.innerHeight - cardRect.height - pad, dockRect.bottom + offset);
    const tileCenterX = tileRect.left + tileRect.width / 2;
    const left = Math.max(
      pad,
      Math.min(window.innerWidth - cardRect.width - pad, tileCenterX - cardRect.width / 2)
    );
    cardEl.style.setProperty("left", `${Math.round(left)}px`);
    cardEl.style.setProperty("top", `${Math.round(top)}px`);
    if (caretEl) {
      const caretLeft = Math.max(16, Math.min(cardRect.width - 28, tileCenterX - left - 6));
      caretEl.style.setProperty("left", `${Math.round(caretLeft)}px`);
    }
  }
}
function notifyNativeWindowRegion() {
  const api = window.pywebview?.api;
  if (!api?.set_window_interactive) return;
  const theme = themeEngine.getCurrentTheme();
  const rects = [];
  const fullWin = document.querySelector(".flank-window");
  if (state.activeFullWindow && fullWin) {
    const r = fullWin.getBoundingClientRect();
    rects.push({
      x: Math.round(r.left),
      y: Math.round(r.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
      r: 14
    });
  }
  const dockEl = document.getElementById("flank-dock");
  if (dockEl) {
    const r = dockEl.getBoundingClientRect();
    rects.push({
      x: Math.round(r.left),
      y: Math.round(r.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
      r: parseFirstRadiusPx(theme.layout.dockRadius)
    });
  }
  const cardEl = document.getElementById("flank-hover-card");
  if (cardEl && state.activeWidget && !state.activeFullWindow) {
    const r = cardEl.getBoundingClientRect();
    rects.push({
      x: Math.round(r.left),
      y: Math.round(r.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
      r: parseFirstRadiusPx(theme.surface.cardRadius)
    });
    const caretEl = document.getElementById("flank-hover-caret");
    if (caretEl) {
      const cr = caretEl.getBoundingClientRect();
      rects.push({
        x: Math.round(cr.left),
        y: Math.round(cr.top),
        w: Math.round(cr.width),
        h: Math.round(cr.height),
        r: 2
      });
    }
  }
  const mode = state.activeFullWindow ? "modal" : "dock";
  const sig = `${mode}:${JSON.stringify(rects)}`;
  if (sig !== lastRegionSignature) {
    lastRegionSignature = sig;
    api.set_window_interactive(mode, rects).catch(() => {
    });
  }
}
function renderApp(preserveSearchFocus = false) {
  const stage = document.getElementById("flank-stage");
  if (!stage) return;
  const activeInput = document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement ? document.activeElement : null;
  const activeElId = activeInput?.id;
  const activeVal = activeInput?.value ?? null;
  const selStart = activeInput?.selectionStart ?? null;
  const scrollSnapshots = [];
  const scrollTargets = [
    "#flank-card-content",
    ".flank-card-content",
    "#flank-hover-card",
    ".flank-card",
    ".flank-preview-col",
    ".flank-list-scroll",
    ".flank-list-col",
    ".flank-stat-list",
    ".flank-win-body",
    ".flank-stat-item"
  ];
  scrollTargets.forEach((sel) => {
    stage.querySelectorAll(sel).forEach((el) => {
      if (el.scrollTop > 0 || el.scrollLeft > 0) {
        scrollSnapshots.push({ selector: sel, top: el.scrollTop, left: el.scrollLeft });
      }
    });
  });
  stage.querySelectorAll("*").forEach((el) => {
    if (el.scrollTop > 0 || el.scrollLeft > 0) {
      if (el.id) {
        scrollSnapshots.push({ selector: `#${el.id}`, top: el.scrollTop, left: el.scrollLeft });
      } else if (el.className && typeof el.className === "string") {
        const firstCls = el.className.trim().split(/\s+/)[0];
        if (firstCls) {
          scrollSnapshots.push({ selector: `.${firstCls}`, top: el.scrollTop, left: el.scrollLeft });
        }
      }
    }
  });
  const currentTheme = themeEngine.getCurrentTheme();
  if (currentView === "dock") {
    stage.innerHTML = renderDockHtml(state, currentTheme);
    requestAnimationFrame(() => {
      const dockEl = document.getElementById("flank-dock");
      if (dockEl) {
        if (isDockCollapsed()) {
          return;
        }
        attachDockMagnification(dockEl, state.edgeOverride === "top" ? "right" : state.edgeOverride || currentTheme.layout.edge);
        const rect = dockEl.getBoundingClientRect();
        const scrollable = dockEl.querySelector(".flank-dock-scrollable");
        const extraScroll = scrollable ? Math.max(0, scrollable.scrollHeight - scrollable.clientHeight) : 0;
        const naturalWidth = Math.max(Math.ceil(rect.width), dockEl.scrollWidth, dockEl.offsetWidth);
        const naturalHeight = Math.max(Math.ceil(rect.height), dockEl.scrollHeight, dockEl.offsetHeight) + extraScroll;
        const theme = themeEngine.getCurrentTheme();
        const shape = theme.layout.shape || "pill";
        window.pywebview?.api?.set_dock_bounds?.(
          naturalWidth,
          naturalHeight,
          shape,
          0
        );
      }
    });
  } else if (currentView === "card") {
    const prevCardContent = stage.querySelector("#flank-card-content, .flank-card-content");
    const savedCardScrollTop = prevCardContent ? prevCardContent.scrollTop : 0;
    const cardHtml = renderHoverCardHtml(state, currentTheme) || renderHoverCardHtml({ ...state, activeWidget: state.activeWidget || "battery" }, currentTheme);
    stage.innerHTML = cardHtml;
    if (savedCardScrollTop > 0) {
      const newCardContent = stage.querySelector("#flank-card-content, .flank-card-content");
      if (newCardContent) newCardContent.scrollTop = savedCardScrollTop;
    }
    requestAnimationFrame(() => {
      if (savedCardScrollTop > 0) {
        const newCardContent = stage.querySelector("#flank-card-content, .flank-card-content");
        if (newCardContent) newCardContent.scrollTop = savedCardScrollTop;
      }
      const cardEl = document.getElementById("flank-hover-card");
      if (cardEl) {
        const rect = cardEl.getBoundingClientRect();
        const theme = themeEngine.getCurrentTheme();
        const radius = parseFirstRadiusPx(theme.surface.cardRadius);
        window.pywebview?.api?.set_card_bounds?.(
          Math.ceil(rect.width),
          Math.ceil(rect.height),
          radius,
          0
        );
      }
    });
  } else if (currentView === "onboarding") {
    themeEngine.revertToPaper();
    const machine = ensureOnboardingMachine();
    const snap = machine.getSnapshot();
    const canContinue = machine.canContinue();
    const existingShell = stage.querySelector(".flank-ob-shell");
    const stepChanged = lastRenderedOnboardingStep !== snap.step;
    if (existingShell && !stepChanged) {
      const stepBodyEl = existingShell.querySelector("#flank-ob-step-body");
      const footerEl = existingShell.querySelector("#flank-ob-footer");
      if (stepBodyEl) {
        stepBodyEl.classList.remove("is-anim-next", "is-anim-back");
        stepBodyEl.innerHTML = renderOnboardingStepBodyHtml(snap);
      }
      if (footerEl) {
        footerEl.innerHTML = renderOnboardingFooterHtml(snap, canContinue);
      }
      const newPreviewHtml = renderOnboardingPreviewHtml({
        step: snap.step,
        edge: snap.edge,
        themeId: snap.themeId,
        accent: snap.accent,
        selectedWidgets: snap.selectedWidgets,
        hideHotkey: snap.hideHotkey,
        liveState: state
      });
      const tmp = document.createElement("div");
      tmp.innerHTML = newPreviewHtml.trim();
      const nextDesktop = tmp.querySelector(".flank-ob-preview-desktop");
      const curDesktop = existingShell.querySelector(".flank-ob-preview-desktop");
      if (curDesktop && nextDesktop) {
        for (const attr of [
          "data-theme",
          "data-mode",
          "data-edge",
          "data-shape",
          "data-preview-backdrop",
          "style"
        ]) {
          const val = nextDesktop.getAttribute(attr);
          if (val !== null) curDesktop.setAttribute(attr, val);
        }
        const curDock = curDesktop.querySelector(".flank-ob-mock-dock");
        const nextDock = nextDesktop.querySelector(".flank-ob-mock-dock");
        if (curDock && nextDock) {
          curDock.setAttribute("style", nextDock.getAttribute("style") || "");
          curDock.innerHTML = nextDock.innerHTML;
        }
        for (const sel of [
          ".flank-ob-faux-window",
          ".flank-ob-ghost-dock",
          ".flank-ob-edge-pill",
          ".flank-ob-mock-card",
          ".flank-ob-callout",
          ".flank-ob-mock-tab"
        ]) {
          const curNode = curDesktop.querySelector(sel);
          const nextNode = nextDesktop.querySelector(sel);
          if (curNode && nextNode) {
            curNode.setAttribute("style", nextNode.getAttribute("style") || "");
            curNode.innerHTML = nextNode.innerHTML;
          }
        }
      } else {
        const curRight = existingShell.querySelector(".flank-ob-right");
        const nextRight = tmp.querySelector(".flank-ob-right");
        if (curRight && nextRight) {
          curRight.replaceWith(nextRight);
        }
      }
    } else {
      stage.innerHTML = renderOnboardingHtml(machine, state);
      lastRenderedOnboardingStep = snap.step;
      const headingEl = document.getElementById("flank-ob-step-heading");
      headingEl?.focus();
      requestAnimationFrame(() => {
        document.getElementById("flank-ob-step-heading")?.focus();
      });
    }
  } else if (currentView === "modal") {
    let windowHtml = "";
    if (state.activeFullWindow === "clipboard") {
      windowHtml = renderClipboardWindowHtml(state, uiState);
    } else if (state.activeFullWindow === "stats") {
      windowHtml = renderFullStatsWindowHtml(state, uiState);
    } else if (state.activeFullWindow === "battery") {
      windowHtml = renderBatteryWindowHtml(state);
    } else if (state.activeFullWindow === "clock") {
      windowHtml = renderClockWindowHtml(state);
    } else {
      windowHtml = renderSettingsWindowHtml(state, currentTheme, uiState);
    }
    stage.innerHTML = windowHtml;
  } else {
    const dockHtml = renderDockHtml(state, currentTheme);
    const cardHtml = renderHoverCardHtml(state, currentTheme);
    let windowHtml = "";
    if (state.activeFullWindow === "clipboard") {
      windowHtml = renderClipboardWindowHtml(state, uiState);
    } else if (state.activeFullWindow === "stats") {
      windowHtml = renderFullStatsWindowHtml(state, uiState);
    } else if (state.activeFullWindow === "battery") {
      windowHtml = renderBatteryWindowHtml(state);
    } else if (state.activeFullWindow === "clock") {
      windowHtml = renderClockWindowHtml(state);
    } else if (state.activeFullWindow === "settings") {
      windowHtml = renderSettingsWindowHtml(state, currentTheme, uiState);
    }
    stage.innerHTML = `${dockHtml}${cardHtml}${windowHtml}`;
    if (state.activeWidget && !state.activeFullWindow) {
      positionHoverCard();
    }
    requestAnimationFrame(() => {
      const dockEl = document.getElementById("flank-dock");
      if (dockEl) {
        attachDockMagnification(dockEl, state.edgeOverride === "top" ? "right" : state.edgeOverride || currentTheme.layout.edge);
      }
      notifyNativeWindowRegion();
    });
  }
  const restoreScrolls = () => {
    scrollSnapshots.forEach(({ selector, top, left }) => {
      try {
        stage.querySelectorAll(selector).forEach((el) => {
          el.scrollTop = top;
          el.scrollLeft = left;
        });
      } catch {
      }
    });
  };
  restoreScrolls();
  requestAnimationFrame(restoreScrolls);
  const numElements = stage.querySelectorAll(".flank-num");
  numElements.forEach((el, index) => {
    const key = el.getAttribute("data-num-key") || `${index}:${el.className}`;
    const currentVal = el.textContent?.trim() || "";
    const prevVal = lastNumValues.get(key);
    if (prevVal !== void 0 && prevVal !== currentVal) {
      el.classList.add("is-updated");
      setTimeout(() => {
        el.classList.remove("is-updated");
      }, 150);
    }
    lastNumValues.set(key, currentVal);
  });
  if (preserveSearchFocus && activeElId) {
    const input = document.getElementById(activeElId);
    if (input) {
      if (activeVal !== null && input.value !== activeVal) {
        input.value = activeVal;
      }
      input.focus();
      if (selStart !== null && typeof input.setSelectionRange === "function") {
        try {
          input.setSelectionRange(selStart, selStart);
        } catch {
        }
      }
    }
  }
}
function saveUserPrefs() {
  window.pywebview?.api?.save_preferences?.({
    themeId: state.themeId,
    edgeOverride: state.edgeOverride,
    accentOverride: state.accentOverride,
    reserveScreenSpace: state.reserveScreenSpace,
    autostart: state.autostart,
    items: state.items,
    dockState: getDockState(),
    startCollapsed: state.startCollapsed,
    autoCollapse: state.autoCollapse,
    autoCollapseSeconds: state.autoCollapseSeconds,
    collapseOnFullscreen: state.collapseOnFullscreen,
    collapseHotkey: state.collapseHotkey,
    showLogoOnTab: state.showLogoOnTab,
    recentAccents: state.recentAccents,
    useOnlineFaviconFallback: state.useOnlineFaviconFallback
  });
}
function applyCurrentThemeSelection() {
  if (currentView === "onboarding") {
    themeEngine.revertToPaper();
    return;
  }
  const res = themeEngine.switchTheme(state.themeId, {
    edge: state.edgeOverride ?? void 0,
    accent: state.accentOverride ?? void 0
  });
  if (!res.valid) {
    uiState.themeValidationMsg = `Theme fell back to Paper: ${res.errors.join(" ")}`;
  } else {
    uiState.themeValidationMsg = null;
  }
  const cur = themeEngine.getCurrentTheme();
  if (cur.id !== "liquid-glass" && (!cur.glass || cur.glass.mode !== "wallpaper-sampled")) {
    document.documentElement.style.removeProperty("--flank-glass-wallpaper-url");
    document.documentElement.style.removeProperty("--flank-glass-wallpaper-size");
    document.documentElement.style.removeProperty("--flank-glass-wallpaper-pos");
  }
}
async function completeOnboardingFlow(result, skipped) {
  const patch = result.prefsPatch;
  if (typeof patch.themeId === "string") {
    state.themeId = patch.themeId;
  }
  if (patch.edgeOverride === "left" || patch.edgeOverride === "right") {
    state.edgeOverride = patch.edgeOverride;
  }
  if (typeof patch.accentOverride === "string") {
    state.accentOverride = patch.accentOverride;
  }
  if (typeof patch.autostart === "boolean") {
    state.autostart = patch.autostart;
  }
  if (Array.isArray(patch.items)) {
    state.items = normalizeDockItems(patch.items);
  }
  setDockState("expanded");
  if (window.pywebview?.api?.complete_onboarding) {
    await window.pywebview.api.complete_onboarding(patch, skipped);
  } else {
    await window.pywebview?.api?.save_preferences?.(patch);
    await window.pywebview?.api?.close_window?.();
  }
}
function setupEventDelegation() {
  let tabDrag = null;
  let tabDragRaf = 0;
  let suppressTabClickUntil = 0;
  const isCollapsedTabTarget = (target) => {
    const expandBtn = target?.closest('[data-action="expand-dock"], .flank-dock-tab');
    if (expandBtn) return expandBtn;
    if (currentView === "dock" && isDockCollapsed()) return target;
    return null;
  };
  document.addEventListener(
    "pointerdown",
    (ev) => {
      if (ev.button !== 0) return;
      const tabTarget = isCollapsedTabTarget(ev.target);
      if (!tabTarget) return;
      ev.preventDefault();
      ev.stopPropagation();
      tabDrag = { pointerId: ev.pointerId, startY: ev.screenY, dragging: false, el: tabTarget };
      try {
        tabTarget.setPointerCapture?.(ev.pointerId);
      } catch {
      }
      try {
        window.pywebview?.api?.begin_collapsed_tab_drag?.();
      } catch {
      }
    },
    true
  );
  window.addEventListener(
    "pointermove",
    (ev) => {
      if (!tabDrag || ev.pointerId !== tabDrag.pointerId) return;
      if (!tabDrag.dragging && Math.abs(ev.screenY - tabDrag.startY) >= 4) {
        tabDrag.dragging = true;
        document.documentElement.classList.add("is-dragging-tab");
      }
      if (tabDrag.dragging && !tabDragRaf) {
        tabDragRaf = requestAnimationFrame(() => {
          tabDragRaf = 0;
          try {
            window.pywebview?.api?.drag_collapsed_tab?.();
          } catch {
          }
        });
      }
    },
    true
  );
  const finishTabDrag = (ev, isCancel) => {
    if (!tabDrag || ev.pointerId !== tabDrag.pointerId) return;
    const activeDrag = tabDrag;
    tabDrag = null;
    if (tabDragRaf) {
      cancelAnimationFrame(tabDragRaf);
      tabDragRaf = 0;
    }
    document.documentElement.classList.remove("is-dragging-tab");
    try {
      activeDrag.el?.releasePointerCapture?.(ev.pointerId);
    } catch {
    }
    suppressTabClickUntil = Date.now() + 250;
    if (activeDrag.dragging) {
      try {
        window.pywebview?.api?.end_collapsed_tab_drag?.(!isCancel);
      } catch {
      }
    } else {
      try {
        window.pywebview?.api?.end_collapsed_tab_drag?.(false);
      } catch {
      }
      if (!isCancel) {
        expandDock();
      }
    }
  };
  window.addEventListener("pointerup", (ev) => finishTabDrag(ev, false), true);
  window.addEventListener("pointercancel", (ev) => finishTabDrag(ev, true), true);
  document.addEventListener(
    "click",
    (ev) => {
      const tabTarget = isCollapsedTabTarget(ev.target);
      if (!tabTarget) return;
      ev.preventDefault();
      ev.stopPropagation();
      if (Date.now() < suppressTabClickUntil) return;
      expandDock();
    },
    true
  );
  const stage = document.getElementById("flank-stage");
  if (!stage) return;
  let draggedItemId = null;
  stage.addEventListener("dragstart", (ev) => {
    const tile = ev.target?.closest(".flank-tile");
    if (!tile) return;
    const itemId = tile.getAttribute("data-item-id");
    if (!itemId) return;
    draggedItemId = itemId;
    flankMachines.pointerInteraction.send({ type: "START_DOCK_REORDER", itemId });
    flankMachines.flyoutCard.send({ type: "FORCE_CLOSE" });
    hideDockTooltip();
    tile.classList.add("is-dragging");
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.setData("text/plain", itemId);
    }
  });
  stage.addEventListener("dragover", (ev) => {
    if (!draggedItemId) return;
    ev.preventDefault();
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
    const tile = ev.target?.closest(".flank-tile");
    if (tile && tile.getAttribute("data-item-id") !== draggedItemId) {
      stage.querySelectorAll(".flank-tile.is-drag-over").forEach((el) => {
        if (el !== tile) el.classList.remove("is-drag-over");
      });
      tile.classList.add("is-drag-over");
    }
  });
  stage.addEventListener("dragleave", (ev) => {
    const tile = ev.target?.closest(".flank-tile");
    if (tile) {
      tile.classList.remove("is-drag-over");
    }
  });
  stage.addEventListener("drop", async (ev) => {
    if (!draggedItemId) return;
    ev.preventDefault();
    const targetTile = ev.target?.closest(".flank-tile");
    targetTile?.classList.remove("is-drag-over");
    const targetId = targetTile?.getAttribute("data-item-id");
    if (!targetId || targetId === draggedItemId) {
      draggedItemId = null;
      flankMachines.pointerInteraction.send({ type: "END_INTERACTION" });
      return;
    }
    const fromIdx = state.items.findIndex((i) => i.id === draggedItemId);
    const toIdx = state.items.findIndex((i) => i.id === targetId);
    if (fromIdx >= 0 && toIdx >= 0) {
      const [moved] = state.items.splice(fromIdx, 1);
      state.items.splice(toIdx, 0, moved);
      renderApp();
      await window.pywebview?.api?.save_preferences?.({ items: state.items });
    }
    draggedItemId = null;
    flankMachines.pointerInteraction.send({ type: "END_INTERACTION" });
  });
  stage.addEventListener("dragend", () => {
    draggedItemId = null;
    flankMachines.pointerInteraction.send({ type: "END_INTERACTION" });
    stage.querySelectorAll(".flank-tile").forEach((el) => {
      el.classList.remove("is-dragging", "is-drag-over");
    });
  });
  let lastHoverWidget = null;
  stage.addEventListener("pointerover", (ev) => {
    const target = ev.target;
    if (!target) return;
    if (!flankMachines.pointerInteraction.canTriggerHoverCard()) {
      return;
    }
    if (currentView === "dock") {
      if (!flankMachines.dockCollapse.canShowFlyout()) {
        return;
      }
      const widgetTile2 = target.closest("[data-widget]");
      if (widgetTile2) {
        const wKind = widgetTile2.getAttribute("data-widget");
        if (wKind && wKind !== lastHoverWidget) {
          lastHoverWidget = wKind;
          const rect = widgetTile2.getBoundingClientRect();
          const centerY = Math.round(rect.top + rect.height / 2);
          suppressDockTooltip(true);
          hideDockTooltip();
          flankMachines.flyoutCard.send({
            type: "HOVER_TILE",
            widget: wKind,
            anchorY: centerY,
            dockExpanded: true,
            modalOpen: Boolean(state.activeFullWindow),
            pointerBusy: !flankMachines.pointerInteraction.canTriggerHoverCard()
          });
          window.pywebview?.api?.show_hover_card?.(wKind, centerY);
        }
      } else {
        if (lastHoverWidget !== null) {
          lastHoverWidget = null;
          flankMachines.flyoutCard.send({ type: "LEAVE_DOCK_OR_CARD" });
          window.pywebview?.api?.hide_hover_card?.();
        }
        const anyTile = target.closest(".flank-tile");
        if (anyTile) {
          const label = anyTile.getAttribute("aria-label") || anyTile.getAttribute("title") || "";
          const itemId = anyTile.getAttribute("data-item-id");
          const item = itemId ? state.items.find((i) => i.id === itemId) : null;
          const shortcut = item?.shortcut;
          const edge = state.edgeOverride || themeEngine.getCurrentTheme().layout.edge || "right";
          if (label) {
            showDockTooltip({
              label,
              shortcut,
              rect: anyTile.getBoundingClientRect(),
              edge
            });
          }
        }
      }
      return;
    }
    if (currentView === "card") {
      flankMachines.flyoutCard.send({ type: "ENTER_CARD" });
      window.pywebview?.api?.cancel_hide_card?.();
      return;
    }
    if (state.activeFullWindow) return;
    const widgetTile = target.closest("[data-widget]");
    const insideCard = target.closest("#flank-hover-card");
    if (widgetTile) {
      if (hoverCloseTimer) {
        clearTimeout(hoverCloseTimer);
        hoverCloseTimer = null;
      }
      const wKind = widgetTile.getAttribute("data-widget");
      const rect = widgetTile.getBoundingClientRect();
      const centerY = Math.round(rect.top + rect.height / 2);
      const nextCard = flankMachines.flyoutCard.send({
        type: "HOVER_TILE",
        widget: wKind,
        anchorY: centerY,
        dockExpanded: flankMachines.dockCollapse.canShowFlyout(),
        modalOpen: Boolean(state.activeFullWindow),
        pointerBusy: !flankMachines.pointerInteraction.canTriggerHoverCard()
      });
      if (nextCard.widget && state.activeWidget !== nextCard.widget) {
        state.activeWidget = nextCard.widget;
        renderApp();
      }
    } else if (insideCard) {
      flankMachines.flyoutCard.send({ type: "ENTER_CARD" });
      if (hoverCloseTimer) {
        clearTimeout(hoverCloseTimer);
        hoverCloseTimer = null;
      }
    }
  });
  stage.addEventListener("pointerout", (ev) => {
    if (currentView === "dock") {
      const related2 = ev.relatedTarget;
      if (!related2 || !related2.closest(".flank-tile")) {
        hideDockTooltip();
      }
      if (!related2 || !related2.closest("#flank-dock")) {
        lastHoverWidget = null;
        suppressDockTooltip(false);
        flankMachines.flyoutCard.send({ type: "LEAVE_DOCK_OR_CARD" });
        window.pywebview?.api?.hide_hover_card?.();
      }
      return;
    }
    if (currentView === "card") {
      const related2 = ev.relatedTarget;
      if (!related2 || !related2.closest("#flank-hover-card")) {
        flankMachines.flyoutCard.send({ type: "LEAVE_DOCK_OR_CARD" });
        window.pywebview?.api?.hide_hover_card?.();
      }
      return;
    }
    const related = ev.relatedTarget;
    if (related && (related.closest("#flank-dock") || related.closest("#flank-hover-card"))) {
      return;
    }
    if (state.activeWidget && !state.activeFullWindow) {
      const nextCard = flankMachines.flyoutCard.send({ type: "LEAVE_DOCK_OR_CARD" });
      if (nextCard.phase === "pinned") {
        return;
      }
      if (hoverCloseTimer) clearTimeout(hoverCloseTimer);
      hoverCloseTimer = setTimeout(() => {
        flankMachines.flyoutCard.send({ type: "GRACE_TIMEOUT" });
        state.activeWidget = null;
        renderApp();
      }, 180);
    }
  });
  stage.addEventListener("pointerdown", (ev) => {
    const target = ev.target;
    if (!target) return;
    const rangeSlider = target.closest('input[type="range"]');
    if (rangeSlider) {
      flankMachines.pointerInteraction.send({
        type: "START_SLIDER_SCRUB",
        controlId: rangeSlider.id || "range-slider"
      });
      return;
    }
    if (currentView === "modal" || currentView === "onboarding") {
      const titlebar = target.closest(".flank-titlebar, .flank-ob-topbar");
      if (titlebar && !target.closest("button, input, a, select, textarea, [data-action], [data-ob-action]") && flankMachines.pointerInteraction.canStartWindowDrag()) {
        flankMachines.pointerInteraction.send({ type: "START_WINDOW_DRAG" });
        window.pywebview?.api?.drag_modal_window?.();
      }
    }
  });
  window.addEventListener("pointerup", () => {
    const mode = flankMachines.pointerInteraction.getSnapshot().mode;
    if (mode === "scrubbing_slider" || mode === "dragging_modal_window") {
      flankMachines.pointerInteraction.send({ type: "END_INTERACTION" });
    }
  });
  window.addEventListener("pointercancel", () => {
    flankMachines.pointerInteraction.send({ type: "END_INTERACTION" });
  });
  stage.addEventListener("click", async (ev) => {
    const target = ev.target;
    if (!target) return;
    if (currentView === "onboarding") {
      const machine = ensureOnboardingMachine();
      const obBtn = target.closest(
        "[data-ob-action], [data-ob-autostart-row], [data-ob-edge], [data-ob-theme], [data-ob-accent], [data-ob-widget], [data-ob-widget-row]"
      );
      if (obBtn) {
        const obAction = obBtn.getAttribute("data-ob-action") || (obBtn.hasAttribute("data-ob-autostart-row") ? "toggle-autostart" : null);
        if (obAction === "next") {
          machine.next();
          renderApp();
          return;
        }
        if (obAction === "back") {
          machine.back();
          renderApp();
          return;
        }
        if (obAction === "skip") {
          const res = machine.skip();
          await completeOnboardingFlow(res, true);
          return;
        }
        if (obAction === "finish") {
          const res = machine.finish();
          await completeOnboardingFlow(res, false);
          return;
        }
        if (obAction === "expand-themes") {
          machine.expandThemes();
          renderApp();
          return;
        }
        if (obAction === "toggle-custom-accent") {
          machine.toggleCustomColorPopover();
          renderApp();
          return;
        }
        if (obAction === "apply-custom-accent") {
          const hexInput = document.getElementById("flank-ob-color-hex");
          if (hexInput?.value) {
            machine.setAccent(hexInput.value);
          }
          machine.toggleCustomColorPopover(false);
          renderApp();
          return;
        }
        if (obAction === "toggle-autostart") {
          const snap = machine.getSnapshot();
          machine.setAutostart(!snap.autostart);
          renderApp();
          return;
        }
        const obEdge = obBtn.getAttribute("data-ob-edge");
        if (obEdge) {
          machine.setEdge(obEdge);
          renderApp();
          return;
        }
        const obTheme = obBtn.getAttribute("data-ob-theme");
        if (obTheme) {
          machine.setTheme(obTheme);
          renderApp();
          return;
        }
        const obAccent = obBtn.getAttribute("data-ob-accent");
        if (obAccent) {
          machine.setAccent(obAccent);
          machine.toggleCustomColorPopover(false);
          renderApp();
          return;
        }
        const obWidget = obBtn.getAttribute("data-ob-widget") || obBtn.getAttribute("data-ob-widget-row");
        if (obWidget) {
          machine.toggleWidget(obWidget);
          renderApp();
          return;
        }
      }
      return;
    }
    const expandBtn = target.closest('[data-action="expand-dock"], .flank-dock-tab');
    if (expandBtn) {
      ev.preventDefault();
      ev.stopPropagation();
      expandDock();
      return;
    }
    const collapseBtn = target.closest('[data-action="collapse-dock"], .flank-dock-collapse-handle');
    if (collapseBtn) {
      ev.preventDefault();
      ev.stopPropagation();
      collapseDock("manual");
      return;
    }
    const btn = target.closest("button");
    if (!btn) return;
    const wKind = btn.getAttribute("data-widget");
    if (wKind) {
      if (currentView === "dock") {
        const rect = btn.getBoundingClientRect();
        const centerY = Math.round(rect.top + rect.height / 2);
        await window.pywebview?.api?.toggle_hover_card?.(wKind, centerY);
        return;
      }
      if (wKind === "clipboard" && state.activeWidget === "clipboard") {
        state.activeFullWindow = "clipboard";
        state.activeWidget = null;
      } else if (wKind === "stats" && state.activeWidget === "stats") {
        state.activeFullWindow = "stats";
        state.activeWidget = null;
      } else if (wKind === "battery" && state.activeWidget === "battery") {
        state.activeFullWindow = "battery";
        state.activeWidget = null;
      } else if (wKind === "clock" && state.activeWidget === "clock") {
        state.activeFullWindow = "clock";
        state.activeWidget = null;
      } else {
        state.activeWidget = state.activeWidget === wKind ? null : wKind;
      }
      renderApp();
      return;
    }
    const itemKind = btn.getAttribute("data-item-kind");
    if (itemKind === "app" || itemKind === "link") {
      const itemId = btn.getAttribute("data-item-id") || "";
      const itemTarget = btn.getAttribute("data-target") || "";
      await window.pywebview?.api?.launch_item?.(itemId, itemTarget);
      return;
    }
    const action = btn.getAttribute("data-action");
    if (action === "collapse-dock") {
      collapseDock("manual");
      return;
    }
    if (action === "expand-dock") {
      expandDock();
      return;
    }
    if (action === "refresh-item-icon") {
      const itemId = btn.getAttribute("data-item-id");
      const item = state.items.find((i) => i.id === itemId);
      if (item && item.target) {
        window.pywebview?.api?.resolve_item_icon?.(item.id, item.target, true);
      }
      return;
    }
    if (action === "choose-item-icon") {
      const itemId = btn.getAttribute("data-item-id");
      if (itemId) {
        window.pywebview?.api?.choose_custom_icon_file?.(itemId);
      }
      return;
    }
    if (action === "toggle-custom-color") {
      uiState.customColorPickerOpen = !uiState.customColorPickerOpen;
      renderApp();
      return;
    }
    if (action === "apply-custom-hex") {
      const hexInput = document.getElementById("flank-accent-hex-input");
      if (hexInput && hexInput.value) {
        let hex = hexInput.value.trim();
        if (!hex.startsWith("#")) hex = "#" + hex;
        if (hex.length === 4) {
          hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
          state.accentOverride = hex;
          uiState.customColorContrastWarning = checkAccentContrast(hex);
          if (!state.recentAccents) state.recentAccents = [];
          if (!state.recentAccents.some((h) => h.toLowerCase() === hex.toLowerCase())) {
            state.recentAccents = [hex, ...state.recentAccents.filter((h) => h.toLowerCase() !== hex.toLowerCase())].slice(0, 5);
          }
          applyCurrentThemeSelection();
          saveUserPrefs();
          renderApp();
        }
      }
      return;
    }
    if (action === "reset-accent") {
      state.accentOverride = null;
      applyCurrentThemeSelection();
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === "replay-onboarding") {
      if (window.pywebview?.api?.open_onboarding) {
        await window.pywebview.api.open_onboarding(true);
        return;
      }
      window.flankStartOnboarding?.({ replay: true });
      return;
    }
    if (action === "toggle-auto-collapse") {
      state.autoCollapse = !state.autoCollapse;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === "toggle-collapse-fullscreen") {
      state.collapseOnFullscreen = !state.collapseOnFullscreen;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === "toggle-logo-on-tab") {
      state.showLogoOnTab = !state.showLogoOnTab;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === "toggle-start-collapsed") {
      state.startCollapsed = !state.startCollapsed;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === "toggle-online-favicon") {
      state.useOnlineFaviconFallback = !(state.useOnlineFaviconFallback ?? true);
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === "open-settings") {
      const targetTab = btn.getAttribute("data-settings-tab");
      if (targetTab) {
        uiState.settingsTab = targetTab;
      }
      if (window.pywebview?.api?.open_window) {
        await window.pywebview.api.open_window("settings");
        return;
      }
      state.activeFullWindow = state.activeFullWindow === "settings" ? null : "settings";
      state.activeWidget = null;
      renderApp();
      return;
    }
    if (action === "open-full-stats") {
      if (window.pywebview?.api?.open_window) {
        await window.pywebview.api.open_window("stats");
        return;
      }
      state.activeFullWindow = "stats";
      state.activeWidget = null;
      renderApp();
      return;
    }
    if (action === "open-battery-window") {
      if (window.pywebview?.api?.open_window) {
        await window.pywebview.api.open_window("battery");
        return;
      }
      state.activeFullWindow = "battery";
      state.activeWidget = null;
      renderApp();
      return;
    }
    if (action === "open-clock-window") {
      if (window.pywebview?.api?.open_window) {
        await window.pywebview.api.open_window("clock");
        return;
      }
      state.activeFullWindow = "clock";
      state.activeWidget = null;
      renderApp();
      return;
    }
    if (action === "add-world-clock") {
      const cityInput = document.getElementById("flank-clock-city-input");
      const cityVal = cityInput?.value.trim() || "";
      if (cityVal) {
        if (cityInput) cityInput.value = "";
        if (window.pywebview?.api?.add_world_clock) {
          const updated = await window.pywebview.api.add_world_clock(cityVal);
          if (updated?.clock) {
            state.clock = updated.clock;
          }
        } else {
          state.clock.cities.push({
            id: `clk-${Date.now()}`,
            city: cityVal,
            country: "",
            timezone: "UTC",
            timeText: state.clock.localTimeText,
            dateText: "Today",
            offsetText: "UTC",
            isDay: true
          });
        }
        renderApp();
      }
      return;
    }
    if (action === "add-custom-item") {
      const lblInput = document.getElementById("flank-new-item-label");
      const tgtInput = document.getElementById("flank-new-item-target");
      const label = lblInput?.value.trim() || "";
      const targetUrlOrCmd = tgtInput?.value.trim() || "";
      if (label && targetUrlOrCmd) {
        const isLink = targetUrlOrCmd.startsWith("http://") || targetUrlOrCmd.startsWith("https://");
        const newItem = {
          id: `custom-${Date.now()}`,
          group: "apps",
          kind: isLink ? "link" : "app",
          label,
          shortCode: label.slice(0, 2).toLowerCase(),
          icon: isLink ? "browser" : "terminal",
          target: targetUrlOrCmd,
          shortcut: "",
          enabled: true
        };
        state.items.unshift(newItem);
        if (lblInput) lblInput.value = "";
        if (tgtInput) tgtInput.value = "";
        saveUserPrefs();
        renderApp();
        window.pywebview?.api?.resolve_item_icon?.(newItem.id, targetUrlOrCmd);
      }
      return;
    }
    if (action === "toggle-widgets-collapse") {
      state.widgetsCollapsed = !state.widgetsCollapsed;
      try {
        window.pywebview?.api?.set_widgets_collapsed?.(state.widgetsCollapsed);
      } catch {
      }
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === "reset-recommended-items") {
      try {
        const nextItems = await window.pywebview?.api?.reset_recommended_items?.();
        if (Array.isArray(nextItems)) {
          state.items = nextItems;
        } else {
          state.items = createSampleState().items;
        }
      } catch {
        state.items = createSampleState().items;
      }
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === "reset-default-items") {
      state.items = createSampleState().items;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === "open-clipboard-window") {
      if (window.pywebview?.api?.open_window) {
        await window.pywebview.api.open_window("clipboard");
        return;
      }
      state.activeFullWindow = "clipboard";
      state.activeWidget = null;
      renderApp();
      return;
    }
    if (action === "close-full-window") {
      if (window.pywebview?.api?.close_window) {
        await window.pywebview.api.close_window();
        return;
      }
      state.activeFullWindow = null;
      uiState.recordingItemId = null;
      renderApp();
      return;
    }
    if (action === "revert-paper") {
      state.themeId = "paper";
      state.edgeOverride = null;
      state.accentOverride = null;
      applyCurrentThemeSelection();
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === "save-weather-city") {
      const cityInput = document.getElementById("flank-weather-city-input");
      if (cityInput && cityInput.value.trim()) {
        state.weather.city = cityInput.value.trim();
        const updated = await window.pywebview?.api?.update_weather_city?.(state.weather.city);
        if (updated?.weather) {
          state.weather = updated.weather;
        }
        renderApp();
      }
      return;
    }
    if (action === "clear-clipboard") {
      state.clipboard.items = state.clipboard.items.filter((i) => i.pinned);
      state.clipboard.count = state.clipboard.items.length;
      await window.pywebview?.api?.clear_unpinned_clipboard?.();
      renderApp();
      return;
    }
    if (action === "toggle-autostart") {
      state.autostart = !state.autostart;
      saveUserPrefs();
      renderApp();
      return;
    }
    const mediaAction = btn.getAttribute("data-media-action");
    if (mediaAction) {
      if (mediaAction === "play-pause") {
        state.player.playing = !state.player.playing;
      }
      await window.pywebview?.api?.media_control?.(mediaAction);
      renderApp();
      return;
    }
    const focusAction = btn.getAttribute("data-focus-action");
    if (focusAction) {
      if (focusAction === "toggle") {
        state.focus.running = !state.focus.running;
      } else if (focusAction === "reset") {
        state.focus.running = false;
        state.focus.remainingSec = state.focus.totalSec;
      } else if (focusAction === "switch-mode") {
        state.focus.running = false;
        if (state.focus.mode === "focus") {
          state.focus.mode = "break";
          state.focus.totalSec = 5 * 60;
          state.focus.remainingSec = 5 * 60;
        } else {
          state.focus.mode = "focus";
          state.focus.totalSec = state.focus.durationMinutes * 60;
          state.focus.remainingSec = state.focus.durationMinutes * 60;
        }
      }
      const res = await window.pywebview?.api?.focus_control?.(focusAction);
      if (res?.focus) {
        state.focus = res.focus;
      }
      renderApp();
      return;
    }
    const focusDur = btn.getAttribute("data-focus-duration");
    if (focusDur) {
      const mins = Number(focusDur) || 25;
      state.focus.mode = "focus";
      state.focus.durationMinutes = mins;
      state.focus.totalSec = mins * 60;
      state.focus.remainingSec = mins * 60;
      state.focus.running = false;
      const res = await window.pywebview?.api?.focus_control?.("duration", mins);
      if (res?.focus) {
        state.focus = res.focus;
      }
      renderApp();
      return;
    }
    const clockQuickAdd = btn.getAttribute("data-clock-quick-add");
    if (clockQuickAdd) {
      const updated = await window.pywebview?.api?.add_world_clock?.(clockQuickAdd);
      if (updated?.clock) {
        state.clock = updated.clock;
      }
      renderApp();
      return;
    }
    const clockRemoveId = btn.getAttribute("data-clock-remove");
    if (clockRemoveId) {
      state.clock.cities = state.clock.cities.filter((c) => c.id !== clockRemoveId);
      const updated = await window.pywebview?.api?.remove_world_clock?.(clockRemoveId);
      if (updated?.clock) {
        state.clock = updated.clock;
      }
      renderApp();
      return;
    }
    const copyRaw = btn.getAttribute("data-copy-raw");
    if (copyRaw !== null) {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(copyRaw).catch(() => {
        });
      }
      await window.pywebview?.api?.copy_raw_text?.(copyRaw);
      renderApp();
      return;
    }
    const scratchSelect = btn.getAttribute("data-scratch-select");
    if (scratchSelect) {
      state.scratchpad.activeNoteId = scratchSelect;
      const updated = await window.pywebview?.api?.scratchpad_action?.("select", scratchSelect, "");
      if (updated?.scratchpad) {
        state.scratchpad = updated.scratchpad;
      }
      renderApp();
      return;
    }
    if (action === "scratch-new-note") {
      const updated = await window.pywebview?.api?.scratchpad_action?.("new", "", "");
      if (updated?.scratchpad) {
        state.scratchpad = updated.scratchpad;
      } else {
        const newId = `note-${Date.now()}`;
        state.scratchpad.notes.push({
          id: newId,
          title: `Note ${state.scratchpad.notes.length + 1}`,
          content: "",
          updatedAt: "Just now"
        });
        state.scratchpad.activeNoteId = newId;
      }
      renderApp();
      return;
    }
    if (action === "scratch-copy") {
      const active = state.scratchpad.notes.find((n) => n.id === state.scratchpad.activeNoteId) || state.scratchpad.notes[0];
      if (active) {
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(active.content).catch(() => {
          });
        }
        await window.pywebview?.api?.copy_raw_text?.(active.content);
      }
      return;
    }
    if (action === "scratch-clear") {
      const active = state.scratchpad.notes.find((n) => n.id === state.scratchpad.activeNoteId) || state.scratchpad.notes[0];
      if (active) {
        active.content = "";
        const updated = await window.pywebview?.api?.scratchpad_action?.("update", active.id, "");
        if (updated?.scratchpad) {
          state.scratchpad = updated.scratchpad;
        }
        renderApp();
      }
      return;
    }
    const scratchDel = btn.getAttribute("data-scratch-delete");
    if (scratchDel) {
      const updated = await window.pywebview?.api?.scratchpad_action?.("delete", scratchDel, "");
      if (updated?.scratchpad) {
        state.scratchpad = updated.scratchpad;
      } else if (state.scratchpad.notes.length > 1) {
        state.scratchpad.notes = state.scratchpad.notes.filter((n) => n.id !== scratchDel);
        state.scratchpad.activeNoteId = state.scratchpad.notes[0].id;
      }
      renderApp();
      return;
    }
    if (action === "pick-screen-color") {
      const EyeDropperCtor = window.EyeDropper;
      if (EyeDropperCtor) {
        try {
          const dropper = new EyeDropperCtor();
          const res = await dropper.open();
          if (res?.sRGBHex) {
            const hex = res.sRGBHex.toUpperCase();
            if (navigator.clipboard?.writeText) {
              navigator.clipboard.writeText(hex).catch(() => {
              });
            }
            const updated2 = await window.pywebview?.api?.set_picked_color?.(hex);
            if (updated2?.colorpicker) {
              state.colorpicker = updated2.colorpicker;
            } else {
              state.colorpicker.currentHex = hex;
            }
            renderApp();
            return;
          }
        } catch {
        }
      }
      const updated = await window.pywebview?.api?.pick_screen_color?.();
      if (updated?.colorpicker) {
        state.colorpicker = updated.colorpicker;
        renderApp();
      }
      return;
    }
    const colorSelect = btn.getAttribute("data-color-select");
    if (colorSelect) {
      state.colorpicker.currentHex = colorSelect;
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(colorSelect).catch(() => {
        });
      }
      const updated = await window.pywebview?.api?.set_picked_color?.(colorSelect);
      if (updated?.colorpicker) {
        state.colorpicker = updated.colorpicker;
      }
      renderApp();
      return;
    }
    if (action === "cal-add-event") {
      const titleInput = document.getElementById("flank-cal-title-input");
      const timeInput = document.getElementById("flank-cal-time-input");
      const urlInput = document.getElementById("flank-cal-url-input");
      const title = titleInput?.value.trim() || "";
      const timeStr = timeInput?.value.trim() || "4:00 PM";
      const joinUrl = urlInput?.value.trim() || "";
      if (title) {
        if (titleInput) titleInput.value = "";
        if (timeInput) timeInput.value = "";
        if (urlInput) urlInput.value = "";
        const updated = await window.pywebview?.api?.calendar_action?.("add", title, timeStr, joinUrl);
        if (updated?.calendar) {
          state.calendar = updated.calendar;
        } else {
          state.calendar.events.push({
            id: `evt-${Date.now()}`,
            title,
            timeText: timeStr,
            relativeText: "Scheduled",
            joinUrl: joinUrl || void 0,
            provider: joinUrl.includes("zoom") ? "Zoom" : joinUrl.includes("teams") ? "Teams" : joinUrl ? "Meet" : "Event"
          });
        }
        renderApp();
      }
      return;
    }
    const calDeleteId = btn.getAttribute("data-cal-delete");
    if (calDeleteId) {
      state.calendar.events = state.calendar.events.filter((e) => e.id !== calDeleteId);
      const updated = await window.pywebview?.api?.calendar_action?.("delete", calDeleteId, "", "");
      if (updated?.calendar) {
        state.calendar = updated.calendar;
      }
      renderApp();
      return;
    }
    const audioSet = btn.getAttribute("data-audio-set");
    if (audioSet !== null) {
      const vol = Math.max(0, Math.min(100, Number(audioSet)));
      state.audio.volumePercent = vol;
      state.audio.muted = vol === 0;
      const updated = await window.pywebview?.api?.audio_control?.("set", vol);
      if (updated?.audio) {
        state.audio = updated.audio;
      }
      renderApp();
      return;
    }
    const audioAction = btn.getAttribute("data-audio-action");
    if (audioAction) {
      if (audioAction === "vol-down") {
        state.audio.volumePercent = Math.max(0, state.audio.volumePercent - 10);
      } else if (audioAction === "vol-up") {
        state.audio.volumePercent = Math.min(100, state.audio.volumePercent + 10);
        state.audio.muted = false;
      } else if (audioAction === "toggle-mute") {
        state.audio.muted = !state.audio.muted;
      } else if (audioAction === "toggle-mic") {
        state.audio.micMuted = !state.audio.micMuted;
      }
      const updated = await window.pywebview?.api?.audio_control?.(audioAction);
      if (updated?.audio) {
        state.audio = updated.audio;
      }
      renderApp();
      return;
    }
    if (action === "net-refresh") {
      const updated = await window.pywebview?.api?.network_action?.("refresh", 0);
      if (updated?.network) {
        state.network = updated.network;
      }
      renderApp();
      return;
    }
    const killPid = btn.getAttribute("data-kill-pid");
    if (killPid) {
      const pidNum = Number(killPid);
      state.network.ports = state.network.ports.filter((p) => p.pid !== pidNum);
      const updated = await window.pywebview?.api?.network_action?.("kill", pidNum);
      if (updated?.network) {
        state.network = updated.network;
      }
      renderApp();
      return;
    }
    const deleteItemId = btn.getAttribute("data-delete-item");
    if (deleteItemId) {
      state.items = state.items.filter((i) => i.id !== deleteItemId);
      saveUserPrefs();
      renderApp();
      return;
    }
    if (action === "add-task") {
      const taskInput = document.getElementById("flank-task-input");
      const text = taskInput?.value.trim() || "";
      if (text) {
        if (taskInput) taskInput.value = "";
        if (!state.tasks) state.tasks = { items: [], pendingCount: 0 };
        const newTask = { id: `task-${Date.now()}`, text, done: false, createdAt: "Just now" };
        state.tasks.items.unshift(newTask);
        state.tasks.pendingCount = state.tasks.items.filter((t) => !t.done).length;
        const updated = await window.pywebview?.api?.tasks_action?.("add", text);
        if (updated?.tasks) state.tasks = updated.tasks;
        renderApp();
      }
      return;
    }
    const toggleTaskId = btn.getAttribute("data-task-id");
    if (action === "toggle-task" && toggleTaskId) {
      if (state.tasks?.items) {
        const item = state.tasks.items.find((t) => t.id === toggleTaskId);
        if (item) {
          item.done = !item.done;
          state.tasks.pendingCount = state.tasks.items.filter((t) => !t.done).length;
        }
      }
      const updated = await window.pywebview?.api?.tasks_action?.("toggle", toggleTaskId);
      if (updated?.tasks) state.tasks = updated.tasks;
      renderApp();
      return;
    }
    if (action === "delete-task" && toggleTaskId) {
      if (state.tasks?.items) {
        state.tasks.items = state.tasks.items.filter((t) => t.id !== toggleTaskId);
        state.tasks.pendingCount = state.tasks.items.filter((t) => !t.done).length;
      }
      const updated = await window.pywebview?.api?.tasks_action?.("delete", toggleTaskId);
      if (updated?.tasks) state.tasks = updated.tasks;
      renderApp();
      return;
    }
    if (action === "clear-completed-tasks") {
      if (state.tasks?.items) {
        state.tasks.items = state.tasks.items.filter((t) => !t.done);
        state.tasks.pendingCount = state.tasks.items.length;
      }
      const updated = await window.pywebview?.api?.tasks_action?.("clear_completed");
      if (updated?.tasks) state.tasks = updated.tasks;
      renderApp();
      return;
    }
    if (action === "clear-calc") {
      const calcInput = document.getElementById("flank-calc-input");
      if (calcInput) {
        calcInput.value = "";
        calcInput.focus();
      }
      const resEl = document.getElementById("flank-calc-result");
      if (resEl) resEl.textContent = "0";
      if (!state.calculator) state.calculator = { lastExpr: "", lastResult: "0", history: [] };
      state.calculator.lastExpr = "";
      state.calculator.lastResult = "0";
      return;
    }
    if (action === "clear-calc-history") {
      if (state.calculator) state.calculator.history = [];
      renderApp();
      return;
    }
    if (action === "copy-calc-result") {
      const res = state.calculator?.lastResult;
      if (res && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(res).catch(() => {
        });
      }
      return;
    }
    const recallExpr = btn.getAttribute("data-expr");
    if (action === "recall-calc" && recallExpr) {
      const calcInput = document.getElementById("flank-calc-input");
      if (calcInput) calcInput.value = recallExpr;
      const res = evaluateExpression(recallExpr);
      if (!state.calculator) state.calculator = { lastExpr: "", lastResult: "", history: [] };
      state.calculator.lastExpr = recallExpr;
      state.calculator.lastResult = res;
      renderApp();
      return;
    }
    const openDrive = btn.getAttribute("data-drive");
    if (action === "open-drive" && openDrive) {
      window.pywebview?.api?.open_drive?.(openDrive);
      return;
    }
    if (action === "launch-disk-cleanup") {
      window.pywebview?.api?.launch_disk_cleanup?.();
      return;
    }
    if (action === "toggle-night-light") {
      if (state.display) state.display.nightLight = !state.display.nightLight;
      const updated = await window.pywebview?.api?.toggle_night_light?.();
      if (updated?.display) state.display = updated.display;
      renderApp();
      return;
    }
    if (action === "set-display-preset") {
      const val = Number(btn.getAttribute("data-val")) || 85;
      const slider = document.getElementById("flank-brightness-slider");
      if (slider) slider.value = String(val);
      const dispText = document.getElementById("flank-disp-val");
      if (dispText) dispText.textContent = `${val}%`;
      if (!state.display) state.display = { brightness: val, nightLight: false, resolution: "2560 \xD7 1440", refreshRate: 144, scaling: 100 };
      state.display.brightness = val;
      window.pywebview?.api?.set_brightness?.(val);
      return;
    }
    if (action === "toggle-mic-mute") {
      if (state.privacy) state.privacy.micMuted = !state.privacy.micMuted;
      const updated = await window.pywebview?.api?.toggle_mic_mute?.();
      if (updated?.privacy) state.privacy = updated.privacy;
      renderApp();
      return;
    }
    if (action === "toggle-ambient") {
      if (!state.ambient) state.ambient = { playing: false, sound: "rain", volume: 65 };
      if (isAmbientPlaying()) {
        stopAmbientSound();
        state.ambient.playing = false;
      } else {
        startAmbientSound(state.ambient.sound, state.ambient.volume);
        state.ambient.playing = true;
      }
      renderApp();
      return;
    }
    const ambSound = btn.getAttribute("data-sound");
    if (action === "select-ambient-sound" && ambSound) {
      if (!state.ambient) state.ambient = { playing: false, sound: "rain", volume: 65 };
      state.ambient.sound = ambSound;
      if (isAmbientPlaying()) {
        startAmbientSound(ambSound, state.ambient.volume);
      }
      renderApp();
      return;
    }
    const runCmd = btn.getAttribute("data-cmd");
    if (action === "run-preset-cmd" && runCmd) {
      if (state.runner) {
        state.runner.running = true;
        state.runner.lastCmd = runCmd;
      }
      renderApp();
      const updated = await window.pywebview?.api?.execute_runner_command?.(runCmd);
      if (updated?.runner) state.runner = updated.runner;
      renderApp();
      return;
    }
    if (action === "run-custom-cmd") {
      const runnerInput = document.getElementById("flank-runner-input");
      const cmd = runnerInput?.value.trim() || "";
      if (cmd) {
        if (state.runner) {
          state.runner.running = true;
          state.runner.lastCmd = cmd;
        }
        renderApp();
        const updated = await window.pywebview?.api?.execute_runner_command?.(cmd);
        if (updated?.runner) state.runner = updated.runner;
        renderApp();
      }
      return;
    }
    if (action === "terminate-cmd") {
      if (state.runner) {
        state.runner.running = false;
        state.runner.lastOutput = (state.runner.lastOutput + "\n[Terminating process...]").trim();
      }
      renderApp();
      const updated = await window.pywebview?.api?.terminate_runner_command?.();
      if (updated?.runner) state.runner = updated.runner;
      renderApp();
      return;
    }
    if (action === "clear-runner-output") {
      if (state.runner) {
        state.runner.lastOutput = "";
      }
      renderApp();
      return;
    }
    if (action === "connect-github") {
      const tokenInput = document.getElementById("flank-github-token-input");
      const token = tokenInput?.value.trim() || "";
      if (token) {
        if (tokenInput) tokenInput.value = "";
        const updated = await window.pywebview?.api?.connect_github?.(token);
        if (updated?.github) state.github = updated.github;
        renderApp();
      }
      return;
    }
    if (action === "disconnect-github") {
      const updated = await window.pywebview?.api?.disconnect_github?.();
      if (updated?.github) state.github = updated.github;
      renderApp();
      return;
    }
    if (action === "open-settings-widgets") {
      windowUiState.settingsTab = "widgets";
      state.activeFullWindow = "settings";
      state.activeWidget = null;
      window.pywebview?.api?.open_window?.("settings");
      renderApp();
      return;
    }
    const copyId = btn.getAttribute("data-copy-id") || btn.getAttribute("data-cb-copy");
    if (copyId) {
      const entry = state.clipboard.items.find((i) => i.id === copyId);
      if (entry && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(entry.content).catch(() => {
        });
      }
      await window.pywebview?.api?.copy_clipboard_item?.(copyId);
      if (btn.hasAttribute("data-copy-id")) {
        state.activeWidget = null;
      }
      renderApp();
      return;
    }
    const cbFilter = btn.getAttribute("data-cb-filter");
    if (cbFilter) {
      uiState.clipboardFilter = cbFilter;
      renderApp();
      return;
    }
    const cbSelect = btn.getAttribute("data-cb-select");
    if (cbSelect) {
      uiState.selectedClipboardId = cbSelect;
      renderApp();
      return;
    }
    const cbPin = btn.getAttribute("data-cb-pin");
    if (cbPin) {
      const item = state.clipboard.items.find((i) => i.id === cbPin);
      if (item) {
        item.pinned = !item.pinned;
      }
      await window.pywebview?.api?.pin_clipboard_item?.(cbPin);
      renderApp();
      return;
    }
    const cbDelete = btn.getAttribute("data-cb-delete");
    if (cbDelete) {
      state.clipboard.items = state.clipboard.items.filter((i) => i.id !== cbDelete);
      state.clipboard.count = Math.max(0, state.clipboard.items.length);
      await window.pywebview?.api?.delete_clipboard_item?.(cbDelete);
      renderApp();
      return;
    }
    const statsTab = btn.getAttribute("data-stats-tab");
    if (statsTab) {
      uiState.statsTab = statsTab;
      renderApp();
      return;
    }
    const statsRate = btn.getAttribute("data-stats-rate");
    if (statsRate) {
      state.stats.refreshSec = Number(statsRate);
      state.stats.paused = false;
      saveUserPrefs();
      renderApp();
      return;
    }
    if (btn.hasAttribute("data-stats-pause")) {
      state.stats.paused = !state.stats.paused;
      renderApp();
      return;
    }
    const settingsTab = btn.getAttribute("data-settings-tab");
    if (settingsTab) {
      uiState.settingsTab = settingsTab;
      renderApp();
      return;
    }
    const applyThemeId = btn.getAttribute("data-apply-theme");
    if (applyThemeId) {
      state.themeId = applyThemeId;
      state.edgeOverride = null;
      state.accentOverride = null;
      applyCurrentThemeSelection();
      saveUserPrefs();
      renderApp();
      return;
    }
    const setEdge = btn.getAttribute("data-set-edge");
    if (setEdge) {
      state.edgeOverride = setEdge;
      applyCurrentThemeSelection();
      saveUserPrefs();
      renderApp();
      return;
    }
    const setAccent = btn.getAttribute("data-set-accent");
    if (setAccent) {
      state.accentOverride = setAccent;
      applyCurrentThemeSelection();
      saveUserPrefs();
      renderApp();
      return;
    }
    if (btn.hasAttribute("data-toggle-appbar")) {
      state.reserveScreenSpace = !state.reserveScreenSpace;
      saveUserPrefs();
      renderApp();
      return;
    }
    const toggleItemId = btn.getAttribute("data-toggle-item");
    if (toggleItemId) {
      const item = state.items.find((i) => i.id === toggleItemId);
      if (item) {
        item.enabled = !item.enabled;
        saveUserPrefs();
        renderApp();
      }
      return;
    }
    const moveUpIdx = btn.getAttribute("data-move-up");
    if (moveUpIdx !== null) {
      const idx = Number(moveUpIdx);
      if (idx > 0 && idx < state.items.length) {
        const tmp = state.items[idx - 1];
        state.items[idx - 1] = state.items[idx];
        state.items[idx] = tmp;
        saveUserPrefs();
        renderApp();
      }
      return;
    }
    const moveDownIdx = btn.getAttribute("data-move-down");
    if (moveDownIdx !== null) {
      const idx = Number(moveDownIdx);
      if (idx >= 0 && idx < state.items.length - 1) {
        const tmp = state.items[idx + 1];
        state.items[idx + 1] = state.items[idx];
        state.items[idx] = tmp;
        saveUserPrefs();
        renderApp();
      }
      return;
    }
    const recordItemId = btn.getAttribute("data-record-shortcut");
    if (recordItemId) {
      if (uiState.recordingItemId === recordItemId) {
        flankMachines.shortcutRecorder.send({ type: "CANCEL" });
        uiState.recordingItemId = null;
      } else {
        flankMachines.shortcutRecorder.send({ type: "START_RECORDING", targetId: recordItemId });
        uiState.recordingItemId = recordItemId;
      }
      uiState.shortcutConflictMsg = null;
      renderApp();
      return;
    }
  });
  let scratchpadSaveTimer = null;
  stage.addEventListener("change", (ev) => {
    const target = ev.target;
    if (!target) return;
    if (target.id === "flank-native-color-picker" || target.id === "flank-accent-hex-input") {
      let hex = target.value.trim();
      if (!hex.startsWith("#")) hex = "#" + hex;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        state.accentOverride = hex;
        if (!state.recentAccents) state.recentAccents = [];
        if (!state.recentAccents.includes(hex)) {
          state.recentAccents = [hex, ...state.recentAccents.filter((h) => h !== hex)].slice(0, 5);
        }
        applyCurrentThemeSelection();
        saveUserPrefs();
        renderApp();
      }
    }
  });
  stage.addEventListener("change", (ev) => {
    const target = ev.target;
    if (!target) return;
    if (target.id === "flank-hue-slider" || target.id === "flank-accent-hex-input") {
      if (state.accentOverride) {
        if (!state.recentAccents) state.recentAccents = [];
        const hex = state.accentOverride;
        if (!state.recentAccents.some((h) => h.toLowerCase() === hex.toLowerCase())) {
          state.recentAccents = [hex, ...state.recentAccents.filter((h) => h.toLowerCase() !== hex.toLowerCase())].slice(0, 5);
        }
        saveUserPrefs();
        renderApp();
      }
    } else if (target.id === "flank-auto-collapse-slider") {
      saveUserPrefs();
    }
  });
  stage.addEventListener("input", (ev) => {
    const target = ev.target;
    if (!target) return;
    if (target.id === "flank-hue-slider") {
      const hue = Number(target.value) || 0;
      const hex = hslToHex(hue, 85, 55);
      const hexInput = document.getElementById("flank-accent-hex-input");
      if (hexInput) hexInput.value = hex;
      const swatch = document.getElementById("flank-custom-swatch-preview");
      if (swatch) swatch.style.background = hex;
      window.requestAnimationFrame(() => {
        state.accentOverride = hex;
        uiState.customColorContrastWarning = checkAccentContrast(hex);
        applyCurrentThemeSelection();
      });
    } else if (target.id === "flank-accent-hex-input") {
      let hex = target.value.trim();
      if (!hex.startsWith("#")) hex = "#" + hex;
      if (hex.length === 4) {
        hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
      }
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        const swatch = document.getElementById("flank-custom-swatch-preview");
        if (swatch) swatch.style.background = hex;
        window.requestAnimationFrame(() => {
          state.accentOverride = hex;
          uiState.customColorContrastWarning = checkAccentContrast(hex);
          applyCurrentThemeSelection();
        });
      }
    } else if (target.id === "flank-auto-collapse-slider" || target.id === "flank-auto-collapse-seconds") {
      const secs = Math.max(3, Math.min(60, Number(target.value) || 10));
      state.autoCollapseSeconds = secs;
      const valSpan = document.getElementById("flank-auto-collapse-val");
      if (valSpan) valSpan.textContent = `${secs}s`;
    } else if (target.id === "flank-cb-search") {
      uiState.clipboardQuery = target.value;
      renderApp(true);
    } else if (target.id === "flank-proc-search") {
      uiState.processQuery = target.value;
      renderApp(true);
    } else if (target.id === "flank-weather-city-input") {
      state.weather.city = target.value;
    } else if (target.id === "flank-calc-input") {
      const expr = target.value;
      const res = evaluateExpression(expr);
      const resBox = document.getElementById("flank-calc-result");
      if (resBox) resBox.textContent = res;
      if (!state.calculator) state.calculator = { lastExpr: "", lastResult: "", history: [] };
      state.calculator.lastExpr = expr;
      state.calculator.lastResult = res;
    } else if (target.id === "flank-brightness-slider") {
      const rawVal = Number(target.value);
      const val = Number.isFinite(rawVal) ? Math.max(0, Math.min(100, rawVal)) : 85;
      const dispText = document.getElementById("flank-disp-val");
      if (dispText) dispText.textContent = `${val}%`;
      if (!state.display) state.display = { brightness: val, nightLight: false, resolution: "2560 \xD7 1440", refreshRate: 144, scaling: 100 };
      state.display.brightness = val;
      window.pywebview?.api?.set_brightness?.(val);
    } else if (target.id === "flank-ambient-volume") {
      const vol = Number(target.value) || 65;
      const volText = document.getElementById("flank-amb-vol-text");
      if (volText) volText.textContent = `${vol}%`;
      setAmbientVolume(vol);
      if (!state.ambient) state.ambient = { playing: false, sound: "rain", volume: vol };
      state.ambient.volume = vol;
    } else if (target.id === "flank-scratchpad-textarea") {
      const active = state.scratchpad.notes.find((n) => n.id === state.scratchpad.activeNoteId) || state.scratchpad.notes[0];
      if (active) {
        active.content = target.value;
        if (scratchpadSaveTimer) clearTimeout(scratchpadSaveTimer);
        scratchpadSaveTimer = setTimeout(() => {
          window.pywebview?.api?.scratchpad_action?.("update", active.id, active.content);
          renderApp(true);
        }, 350);
      }
    } else if (target.id === "flank-ob-color-native") {
      const hex = target.value.toUpperCase();
      const hexInput = document.getElementById("flank-ob-color-hex");
      if (hexInput) hexInput.value = hex;
      if (currentView === "onboarding") {
        const machine = ensureOnboardingMachine();
        machine.setAccent(hex);
        renderApp(true);
      }
    } else if (target.id === "flank-ob-color-hex") {
      let hex = target.value.trim();
      if (!hex.startsWith("#")) hex = `#${hex}`;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex) && currentView === "onboarding") {
        const nativePicker = document.getElementById("flank-ob-color-native");
        if (nativePicker) nativePicker.value = hex;
        const machine = ensureOnboardingMachine();
        machine.setAccent(hex);
        renderApp(true);
      }
    } else if (target.id === "flank-native-color-input") {
      const hex = target.value.toUpperCase();
      state.colorpicker.currentHex = hex;
      window.pywebview?.api?.set_picked_color?.(hex).then((res) => {
        if (res?.colorpicker) {
          state.colorpicker = res.colorpicker;
          renderApp();
        }
      });
    }
  });
  window.addEventListener("keydown", async (ev) => {
    if (currentView === "onboarding") {
      const machine = ensureOnboardingMachine();
      if (ev.key === "Escape") {
        ev.preventDefault();
        const res = machine.handleEscape();
        if (res.closedPopover) {
          renderApp();
        }
        return;
      }
      if (ev.altKey && ev.key === "ArrowLeft") {
        ev.preventDefault();
        machine.back();
        renderApp();
        return;
      }
      const activeEl = document.activeElement;
      const radioGroup = activeEl?.closest('[role="radiogroup"]');
      if (radioGroup && (ev.key === "ArrowRight" || ev.key === "ArrowDown" || ev.key === "ArrowLeft" || ev.key === "ArrowUp")) {
        const radios = Array.from(radioGroup.querySelectorAll('[role="radio"]'));
        if (radios.length > 0) {
          ev.preventDefault();
          const curIdx = Math.max(
            0,
            radios.findIndex((r) => r === activeEl || r.contains(activeEl))
          );
          const delta = ev.key === "ArrowRight" || ev.key === "ArrowDown" ? 1 : -1;
          const nextIdx = (curIdx + delta + radios.length) % radios.length;
          const nextRadio = radios[nextIdx];
          if (nextRadio) {
            const obEdge = nextRadio.getAttribute("data-ob-edge");
            const obTheme = nextRadio.getAttribute("data-ob-theme");
            const obAccent = nextRadio.getAttribute("data-ob-accent");
            let selectorToFocus = "";
            if (obEdge) {
              machine.setEdge(obEdge);
              selectorToFocus = `[data-ob-edge="${obEdge}"]`;
            } else if (obTheme) {
              machine.setTheme(obTheme);
              selectorToFocus = `[data-ob-theme="${obTheme}"]`;
            } else if (obAccent) {
              machine.setAccent(obAccent);
              machine.toggleCustomColorPopover(false);
              selectorToFocus = `[data-ob-accent="${obAccent}"]`;
            }
            renderApp();
            if (selectorToFocus) {
              const updatedRadio = document.querySelector(selectorToFocus);
              updatedRadio?.focus();
            }
          }
          return;
        }
      }
      if (ev.key === "Enter" && !ev.ctrlKey && !ev.altKey && !ev.metaKey) {
        if (activeEl?.id === "flank-ob-color-hex") {
          ev.preventDefault();
          const hexVal = activeEl.value;
          if (hexVal) machine.setAccent(hexVal);
          machine.toggleCustomColorPopover(false);
          renderApp();
          return;
        }
        const activeAction = activeEl?.getAttribute("data-ob-action");
        if (activeAction === "back" || activeAction === "skip" || activeAction === "expand-themes" || activeAction === "toggle-custom-accent" || activeAction === "apply-custom-accent") {
          return;
        }
        ev.preventDefault();
        const snap = machine.getSnapshot();
        if (snap.step === 5) {
          const res = machine.finish();
          await completeOnboardingFlow(res, false);
        } else if (machine.canContinue()) {
          machine.next();
          renderApp();
        }
        return;
      }
      return;
    }
    if (ev.ctrlKey && ev.altKey && (ev.code === "KeyF" || ev.key.toLowerCase() === "f")) {
      ev.preventDefault();
      toggleDockCollapse();
      return;
    }
    if (ev.key === "Enter") {
      const activeEl = document.activeElement;
      if (activeEl?.id === "flank-task-input") {
        ev.preventDefault();
        const addBtn = document.querySelector('[data-action="add-task"]');
        addBtn?.click();
        return;
      }
      if (activeEl?.id === "flank-runner-input") {
        ev.preventDefault();
        const runBtn = document.querySelector('[data-action="run-custom-cmd"]');
        runBtn?.click();
        return;
      }
    }
    if (uiState.recordingItemId) {
      ev.preventDefault();
      if (ev.key === "Escape") {
        flankMachines.shortcutRecorder.send({ type: "CANCEL" });
        uiState.recordingItemId = null;
        uiState.shortcutConflictMsg = null;
        renderApp();
        return;
      }
      if (["Control", "Shift", "Alt", "Meta"].includes(ev.key)) return;
      const mods = [];
      if (ev.ctrlKey) mods.push("Ctrl");
      if (ev.altKey) mods.push("Alt");
      if (ev.shiftKey) mods.push("Shift");
      const keyLabel = ev.key.length === 1 ? ev.key.toUpperCase() : ev.key;
      const combo = [...mods, keyLabel].join("+");
      flankMachines.shortcutRecorder.send({ type: "CAPTURE_COMBO", combo });
      const duplicate = state.items.find(
        (i) => i.id !== uiState.recordingItemId && i.shortcut?.toLowerCase() === combo.toLowerCase()
      );
      if (duplicate) {
        const msg = `Conflict: ${combo} is already assigned to ${duplicate.label}.`;
        flankMachines.shortcutRecorder.send({ type: "MARK_CONFLICT", message: msg });
        uiState.shortcutConflictMsg = msg;
        renderApp();
        return;
      }
      const hostCheck = await window.pywebview?.api?.register_item_shortcut?.(
        uiState.recordingItemId,
        combo
      );
      if (hostCheck && !hostCheck.ok) {
        const msg = hostCheck.conflict || `Conflict: ${combo} is reserved by another app.`;
        flankMachines.shortcutRecorder.send({ type: "MARK_CONFLICT", message: msg });
        uiState.shortcutConflictMsg = msg;
        renderApp();
        return;
      }
      const item = state.items.find((i) => i.id === uiState.recordingItemId);
      if (item) {
        item.shortcut = combo;
      }
      flankMachines.shortcutRecorder.send({ type: "COMMIT_SUCCESS" });
      uiState.recordingItemId = null;
      uiState.shortcutConflictMsg = null;
      saveUserPrefs();
      renderApp();
      return;
    }
    const targetEl = ev.target;
    if (targetEl && targetEl.id === "flank-weather-city-input" && ev.key === "Enter") {
      ev.preventDefault();
      const cityInput = targetEl;
      if (cityInput.value.trim()) {
        const newCity = cityInput.value.trim();
        state.weather.city = newCity;
        const updated = await window.pywebview?.api?.update_weather_city?.(newCity);
        if (updated?.weather) {
          state.weather = updated.weather;
        }
        renderApp();
      }
      return;
    }
    if (targetEl && targetEl.id === "flank-clock-city-input" && ev.key === "Enter") {
      ev.preventDefault();
      const cityInput = targetEl;
      if (cityInput.value.trim()) {
        const newCity = cityInput.value.trim();
        cityInput.value = "";
        const updated = await window.pywebview?.api?.add_world_clock?.(newCity);
        if (updated?.clock) {
          state.clock = updated.clock;
        }
        renderApp();
      }
      return;
    }
    if (currentView === "dock") {
      const dockTiles = Array.from(document.querySelectorAll(".flank-tile, .flank-dock-collapse-handle"));
      const activeIdx = dockTiles.findIndex((el) => el === document.activeElement || el.contains(document.activeElement));
      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        const nextIdx = activeIdx < dockTiles.length - 1 ? activeIdx + 1 : 0;
        dockTiles[nextIdx]?.focus();
        return;
      }
      if (ev.key === "ArrowUp") {
        ev.preventDefault();
        const prevIdx = activeIdx > 0 ? activeIdx - 1 : dockTiles.length - 1;
        dockTiles[prevIdx]?.focus();
        return;
      }
      if (ev.key === "Home") {
        ev.preventDefault();
        dockTiles[0]?.focus();
        return;
      }
      if (ev.key === "End") {
        ev.preventDefault();
        dockTiles[dockTiles.length - 1]?.focus();
        return;
      }
    }
    if (ev.key === "Escape") {
      if (currentView === "dock") {
        window.pywebview?.api?.close_hover_card?.();
        return;
      }
      if (currentView === "modal") {
        window.pywebview?.api?.close_window?.();
        return;
      }
      if (state.activeFullWindow) {
        state.activeFullWindow = null;
        renderApp();
        return;
      }
      if (state.activeWidget) {
        state.activeWidget = null;
        renderApp();
        return;
      }
    }
    if (state.activeFullWindow === "clipboard") {
      const filtered = getFilteredClipboardItems(state, uiState);
      if (filtered.length === 0) return;
      const curIdx = Math.max(
        0,
        filtered.findIndex((i) => i.id === uiState.selectedClipboardId)
      );
      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        const next = filtered[Math.min(filtered.length - 1, curIdx + 1)];
        if (next) {
          uiState.selectedClipboardId = next.id;
          renderApp(document.activeElement?.id === "flank-cb-search");
        }
      } else if (ev.key === "ArrowUp") {
        ev.preventDefault();
        const prev = filtered[Math.max(0, curIdx - 1)];
        if (prev) {
          uiState.selectedClipboardId = prev.id;
          renderApp(document.activeElement?.id === "flank-cb-search");
        }
      } else if (ev.key === "Enter" && document.activeElement?.id !== "flank-cb-search") {
        ev.preventDefault();
        const selected = filtered[curIdx];
        if (selected) {
          if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(selected.content).catch(() => {
            });
          }
          await window.pywebview?.api?.copy_clipboard_item?.(selected.id);
          state.activeFullWindow = null;
          renderApp();
        }
      } else if (ev.key === "Delete" && document.activeElement?.id !== "flank-cb-search") {
        ev.preventDefault();
        const selected = filtered[curIdx];
        if (selected) {
          state.clipboard.items = state.clipboard.items.filter((i) => i.id !== selected.id);
          state.clipboard.count = state.clipboard.items.length;
          await window.pywebview?.api?.delete_clipboard_item?.(selected.id);
          renderApp();
        }
      }
    }
  });
  window.addEventListener("resize", () => {
    if (state.activeWidget && !state.activeFullWindow) {
      positionHoverCard();
    }
    notifyNativeWindowRegion();
  });
}
function normalizeDockItems(items) {
  return items.map((item) => {
    const raw = item;
    if (raw.kind === "widget" && !raw.widgetKind && raw.widget) {
      return { ...raw, widgetKind: raw.widget };
    }
    return raw;
  });
}
window.flankOnIconResolved = (data) => {
  const item = state.items.find((i) => i.id === data.id);
  if (item) {
    item.iconUri = data.iconUri;
    if (data.iconPath) item.iconPath = data.iconPath;
    renderApp();
  }
};
window.flankSetDockState = (newState) => {
  setDockState(newState);
  renderApp();
};
window.flankSyncPreferences = (payload) => {
  window.flankReceiveHostUpdate?.(payload);
  renderApp();
};
window.flankReceiveHostUpdate = (patch) => {
  if (patch.dockState !== void 0) {
    setDockState(patch.dockState);
  }
  if (patch.startCollapsed !== void 0) state.startCollapsed = patch.startCollapsed;
  if (patch.autoCollapse !== void 0) state.autoCollapse = patch.autoCollapse;
  if (patch.autoCollapseSeconds !== void 0) state.autoCollapseSeconds = patch.autoCollapseSeconds;
  if (patch.collapseOnFullscreen !== void 0) state.collapseOnFullscreen = patch.collapseOnFullscreen;
  if (patch.collapseHotkey !== void 0) state.collapseHotkey = patch.collapseHotkey;
  if (patch.showLogoOnTab !== void 0) state.showLogoOnTab = patch.showLogoOnTab;
  if (patch.recentAccents !== void 0) state.recentAccents = patch.recentAccents;
  if (patch.useOnlineFaviconFallback !== void 0) state.useOnlineFaviconFallback = patch.useOnlineFaviconFallback;
  let prefsChanged = false;
  if (patch.themeId !== void 0 && patch.themeId !== state.themeId) {
    state.themeId = patch.themeId;
    prefsChanged = true;
  }
  if (patch.edgeOverride !== void 0 && patch.edgeOverride !== state.edgeOverride) {
    state.edgeOverride = patch.edgeOverride;
    prefsChanged = true;
  }
  if (patch.accentOverride !== void 0 && patch.accentOverride !== state.accentOverride) {
    state.accentOverride = patch.accentOverride;
    prefsChanged = true;
  }
  if (patch.reserveScreenSpace !== void 0) {
    state.reserveScreenSpace = patch.reserveScreenSpace;
    prefsChanged = true;
  }
  if (patch.autostart !== void 0) {
    state.autostart = patch.autostart;
    prefsChanged = true;
  }
  if (Array.isArray(patch.items) && patch.items.length > 0) {
    state.items = normalizeDockItems(patch.items);
    prefsChanged = true;
  }
  if (prefsChanged) {
    applyCurrentThemeSelection();
  }
  if (patch.stats && !state.stats.paused) {
    state.stats = { ...state.stats, ...patch.stats, refreshSec: state.stats.refreshSec, paused: state.stats.paused };
  }
  if (patch.battery) {
    state.battery = { ...state.battery, ...patch.battery };
  }
  if (patch.weather) {
    state.weather = { ...state.weather, ...patch.weather };
  }
  if (patch.player) {
    state.player = { ...state.player, ...patch.player };
  }
  if (patch.focus) {
    state.focus = { ...state.focus, ...patch.focus };
  }
  if (patch.clock) {
    state.clock = { ...state.clock, ...patch.clock };
  }
  if (patch.scratchpad) {
    state.scratchpad = { ...state.scratchpad, ...patch.scratchpad };
  }
  if (patch.colorpicker) {
    state.colorpicker = { ...state.colorpicker, ...patch.colorpicker };
  }
  if (patch.calendar) {
    state.calendar = { ...state.calendar, ...patch.calendar };
  }
  if (patch.audio) {
    state.audio = { ...state.audio, ...patch.audio };
  }
  if (patch.network) {
    state.network = { ...state.network, ...patch.network };
  }
  if (patch.clipboard) {
    state.clipboard = { ...state.clipboard, ...patch.clipboard };
  }
  if (patch.bluetooth) {
    state.bluetooth = { ...state.bluetooth, ...patch.bluetooth };
  }
  if (patch.tasks) {
    state.tasks = { ...state.tasks, ...patch.tasks };
  }
  if (patch.calculator) {
    state.calculator = { ...state.calculator, ...patch.calculator };
  }
  if (patch.storage) {
    state.storage = { ...state.storage, ...patch.storage };
  }
  if (patch.display) {
    state.display = { ...state.display, ...patch.display };
  }
  if (patch.privacy) {
    state.privacy = { ...state.privacy, ...patch.privacy };
  }
  if (patch.ambient) {
    state.ambient = { ...state.ambient, ...patch.ambient };
  }
  if (patch.runner) {
    state.runner = { ...state.runner, ...patch.runner };
  }
  if (patch.gpu) {
    state.gpu = { ...state.gpu, ...patch.gpu };
  }
  if (patch.github) {
    state.github = { ...state.github, ...patch.github };
  }
  if (patch.topProcesses) {
    state.topProcesses = patch.topProcesses;
  }
  state.dataSource = "live";
  if (currentView === "onboarding") {
    return;
  }
  if (currentView === "modal" && state.activeFullWindow === "settings" && !prefsChanged && !patch.clock && !patch.weather) {
    return;
  }
  if (currentView === "card" && state.activeWidget && !prefsChanged) {
    const w = state.activeWidget;
    const hasWidgetUpdate = w === "stats" && !!patch.stats || w === "battery" && !!patch.battery || w === "weather" && !!patch.weather || w === "player" && !!patch.player || w === "focus" && !!patch.focus || w === "clock" && !!patch.clock || w === "scratchpad" && !!patch.scratchpad || w === "colorpicker" && !!patch.colorpicker || w === "calendar" && !!patch.calendar || w === "audio" && !!patch.audio || w === "network" && !!patch.network || w === "clipboard" && !!patch.clipboard || w === "bluetooth" && !!patch.bluetooth || w === "tasks" && !!patch.tasks || w === "calculator" && !!patch.calculator || w === "storage" && !!patch.storage || w === "display" && !!patch.display || w === "privacy" && !!patch.privacy || w === "ambient" && !!patch.ambient || w === "runner" && !!patch.runner || w === "gpu" && !!patch.gpu || w === "github" && !!patch.github;
    if (!hasWidgetUpdate) {
      return;
    }
  }
  renderApp(true);
};
async function bootstrap() {
  const params = new URLSearchParams(window.location.search);
  const queryTheme = params.get("theme");
  if (queryTheme) {
    state.themeId = queryTheme;
  }
  const queryWidget = params.get("widget");
  if (queryWidget) {
    state.activeWidget = queryWidget;
  }
  const queryModal = params.get("modal");
  if (queryModal) {
    state.activeFullWindow = queryModal;
  }
  const queryTab = params.get("tab");
  if (queryTab) {
    uiState.settingsTab = queryTab;
  }
  const queryDockState = params.get("dockState");
  if (queryDockState) {
    state.dockState = queryDockState;
  }
  const queryLogo = params.get("showLogoOnTab");
  if (queryLogo !== null) {
    state.showLogoOnTab = queryLogo === "true" || queryLogo === "1";
  }
  const queryEmpty = params.get("empty");
  if (queryEmpty === "true" || queryEmpty === "1") {
    state.clipboard.items = [];
    state.clipboard.count = 0;
    state.calendar.events = [];
    state.calendar.nextSummary = "";
    if (state.bluetooth) state.bluetooth.devices = [];
  }
  initDockState(state.dockState || (state.startCollapsed ? "collapsed" : "expanded"));
  onDockStateChange((nextDockState) => {
    if (nextDockState === "expanded" || nextDockState === "collapsed") {
      renderApp();
    }
  });
  applyCurrentThemeSelection();
  setupEventDelegation();
  renderApp();
  const connectHost = async () => {
    renderApp();
    if (window.pywebview?.api?.get_initial_state) {
      try {
        const init = await window.pywebview.api.get_initial_state();
        if (init) {
          if (init.themeId && !queryTheme) state.themeId = init.themeId;
          if (init.edgeOverride !== void 0) state.edgeOverride = init.edgeOverride;
          if (init.accentOverride !== void 0) state.accentOverride = init.accentOverride;
          if (init.reserveScreenSpace !== void 0) state.reserveScreenSpace = init.reserveScreenSpace;
          if (init.autostart !== void 0) state.autostart = init.autostart;
          if (init.dockState !== void 0) setDockState(init.dockState);
          if (init.startCollapsed !== void 0) state.startCollapsed = init.startCollapsed;
          if (init.autoCollapse !== void 0) state.autoCollapse = init.autoCollapse;
          if (init.autoCollapseSeconds !== void 0) state.autoCollapseSeconds = init.autoCollapseSeconds;
          if (init.collapseOnFullscreen !== void 0) state.collapseOnFullscreen = init.collapseOnFullscreen;
          if (init.collapseHotkey !== void 0) state.collapseHotkey = init.collapseHotkey;
          if (init.showLogoOnTab !== void 0) state.showLogoOnTab = init.showLogoOnTab;
          if (init.recentAccents !== void 0) state.recentAccents = init.recentAccents;
          if (init.useOnlineFaviconFallback !== void 0) state.useOnlineFaviconFallback = init.useOnlineFaviconFallback;
          if (Array.isArray(init.items) && init.items.length > 0) state.items = normalizeDockItems(init.items);
          applyCurrentThemeSelection();
          window.flankReceiveHostUpdate?.(init);
          renderApp();
        }
      } catch {
      }
    }
  };
  if (window.pywebview) {
    await connectHost();
  } else {
    window.addEventListener("pywebviewready", () => {
      connectHost();
    });
  }
}
bootstrap();
export {
  renderApp
};
