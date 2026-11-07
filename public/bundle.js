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
  mode: "light",
  default: false,
  description: "Apple Liquid Glass (iOS 26 Control Center UI) with iridescent specular reflections and frosted depth.",
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
    iconSize: "19px",
    maxItems: 12,
    windowPadding: "48px"
  },
  surface: {
    dockBg: "rgba(255,255,255,0.72)",
    dockBorder: "rgba(255,255,255,0.70)",
    dockShadow: "inset 0 1px 0 rgba(255,255,255,0.65), 0 2px 6px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.08)",
    backdropBlur: "30px",
    backdropSaturate: "1.8",
    cardBg: "rgba(255,255,255,0.82)",
    cardBorder: "rgba(255,255,255,0.70)",
    cardShadow: "inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 12px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.10)",
    cardRadius: "16px",
    cardPadding: "18px",
    cardWidth: "292px",
    cardGap: "14px",
    cardOffset: "10px",
    solidFallbackBg: "#f8fafc",
    opacity: 0.72,
    highlight: "inset 0 1px 0 rgba(255,255,255,0.65)",
    hover: "rgba(255,255,255,0.18)",
    active: "rgba(255,255,255,0.28)",
    selected: "rgba(255,255,255,0.38)"
  },
  glass: {
    mode: "wallpaper-sampled",
    tintRgb: "255,255,255",
    tintAlpha: 0.72,
    tintAlphaMin: 0.4,
    tintAlphaMax: 0.85,
    blur: "30px",
    saturate: "1.8",
    rimWidth: "1px",
    rim: "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.15))",
    sheen: "linear-gradient(180deg, rgba(255,255,255,0.30), rgba(255,255,255,0))",
    sheenHeight: "120px",
    textShadowWhenLowContrast: "0 1px 2px rgba(0,0,0,0.35)"
  },
  color: {
    text: "#0f172a",
    textMuted: "#334155",
    tileBg: "rgba(255,255,255,0.65)",
    tileBgHover: "rgba(255,255,255,0.90)",
    tileBgPressed: "rgba(255,255,255,0.95)",
    tileIcon: "#0f172a",
    tileActiveBg: "rgba(3,105,161,0.18)",
    tileActiveIcon: "#0369a1",
    divider: "rgba(15,23,42,0.10)",
    dividerSoft: "rgba(15,23,42,0.06)",
    trackBg: "rgba(0,0,0,0.08)",
    accent: "#0369a1",
    accentGradient: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
    accentInk: "#ffffff",
    accentSoft: "rgba(3,105,161,0.14)",
    accentLine: "rgba(3,105,161,0.40)",
    focusRing: "#0369a1",
    iconPlate: "rgba(255,255,255,0.90)",
    iconPlateBorder: "rgba(255,255,255,0.40)",
    iconPlateShadow: "0 1px 3px rgba(0,0,0,0.12)"
  },
  type: {
    ui: "'Inter','Segoe UI Variable','Segoe UI',system-ui,sans-serif",
    display: "'Inter','Segoe UI Variable',system-ui,sans-serif",
    mono: "'JetBrains Mono','Cascadia Mono',Consolas,monospace",
    displayUse: "tabular numerals for stats",
    weights: [400, 500, 600, 700]
  },
  icons: { strokeWidth: 1.75, viewBox: "0 0 24 24", caps: "round", joins: "round" },
  motion: { cardInMs: 160, tileMs: 120, easing: "cubic-bezier(0.2,0.8,0.2,1)", cardTravelPx: 8 }
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
    dockBg: "#160a2e",
    dockBorder: "rgba(255,255,255,0.20)",
    dockShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 10px rgba(0,0,0,0.35)",
    backdropBlur: "26px",
    backdropSaturate: "1.5",
    cardBg: "#1c0f38",
    cardBorder: "rgba(255,255,255,0.20)",
    cardShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 10px rgba(0,0,0,0.40)",
    cardRadius: "16px",
    cardPadding: "18px",
    cardWidth: "292px",
    cardGap: "14px",
    cardOffset: "10px",
    solidFallbackBg: "#160a2e",
    opacity: 1,
    highlight: "inset 0 1px 0 rgba(255,255,255,0.25)",
    hover: "rgba(255,255,255,0.08)",
    active: "rgba(255,255,255,0.16)",
    selected: "rgba(255,255,255,0.24)"
  },
  color: {
    text: "#ffffff",
    textMuted: "#ddd3f5",
    tileBg: "rgba(255,255,255,0.12)",
    tileBgHover: "rgba(255,255,255,0.20)",
    tileBgPressed: "rgba(255,255,255,0.28)",
    tileIcon: "#ffffff",
    tileActiveBg: "linear-gradient(135deg,#db2777,#7c3aed)",
    tileActiveIcon: "#ffffff",
    divider: "rgba(255,255,255,0.10)",
    dividerSoft: "rgba(255,255,255,0.06)",
    trackBg: "rgba(255,255,255,0.14)",
    accent: "#f472b6",
    accent2: "#8b5cf6",
    accentCyan: "#67e8f9",
    accentPink: "#f0abfc",
    accentGradient: "linear-gradient(90deg,#f472b6,#8b5cf6)",
    accentInk: "#ffffff",
    accentSoft: "rgba(244,114,182,0.16)",
    accentLine: "rgba(244,114,182,0.4)",
    focusRing: "#f0abfc",
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
  description: "iOS-style liquid glass: tinted translucent capsule, bright rim light, soft inner glow, large radii, fluid motion. Fully rounded silhouette on a transparent window.",
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
    dockBg: "rgba(16,20,42,0.42)",
    dockBorder: "transparent",
    dockShadow: "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.12), inset 0 0 22px rgba(255,255,255,0.10), 0 8px 24px rgba(6,8,24,0.38), 0 2px 6px rgba(6,8,24,0.22)",
    backdropBlur: "30px",
    backdropSaturate: "1.8",
    cardBg: "rgba(16,20,42,0.42)",
    cardBorder: "transparent",
    cardShadow: "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.12), inset 0 0 26px rgba(255,255,255,0.08), 0 8px 24px rgba(6,8,24,0.38), 0 2px 6px rgba(6,8,24,0.22)",
    cardRadius: "16px",
    cardPadding: "20px",
    cardWidth: "320px",
    cardGap: "14px",
    cardOffset: "14px",
    solidFallbackBg: "#1b2038",
    opacity: 0.42,
    highlight: "inset 0 1px 0 rgba(255,255,255,0.55)",
    hover: "rgba(255,255,255,0.08)",
    active: "rgba(255,255,255,0.15)",
    selected: "rgba(255,255,255,0.22)"
  },
  glass: {
    mode: "wallpaper-sampled",
    modeNote: "css-only | wallpaper-sampled (default) | flat. See ANTIGRAVITY_PROMPT.md part B.",
    tintRgb: "16,20,42",
    tintAlpha: 0.42,
    tintAlphaMin: 0.16,
    tintAlphaMax: 0.42,
    blur: "30px",
    saturate: "1.8",
    rimWidth: "1px",
    rim: "linear-gradient(135deg, rgba(255,255,255,0.80), rgba(255,255,255,0.12) 60%, rgba(255,255,255,0.35))",
    sheen: "linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0))",
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
    accentGradient: "linear-gradient(135deg, #7CF0C8 0%, #38bdf8 100%)",
    accentInk: "#06231f",
    accentSoft: "rgba(124,240,200,0.16)",
    accentLine: "rgba(124,240,200,0.40)",
    focusRing: "#ffffff",
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
    const res = validateTheme(candidate);
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
        enabled: false
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
        id: "widget-ai",
        group: "widgets",
        kind: "widget",
        label: "AI usage",
        shortCode: "ai",
        icon: "globe",
        widgetKind: "ai",
        shortcut: "Alt+A",
        enabled: false
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
    ai: {
      totalPercent: 68,
      planName: "Google AI Pro Plan",
      connected: true,
      resetText: "Resets in 12 days",
      categories: [
        { label: "Claude 3.7 Sonnet", percent: 74 },
        { label: "Gemini 2.5 Pro", percent: 45 },
        { label: "GPT-4.5 Preview", percent: 32 }
      ]
    },
    activity: {
      activeCount: 2,
      sessions: [
        {
          id: "agent-1",
          name: "AI Coding Assistant",
          project: "Workspace Engine",
          status: "running",
          statusText: "Active session \xB7 code generation",
          memoryMb: 412.5,
          pid: 14208
        },
        {
          id: "agent-2",
          name: "Research & Context Agent",
          project: "Knowledge Graph RAG",
          status: "waiting",
          statusText: "Awaiting telemetry validation",
          memoryMb: 285.3,
          pid: 21840
        },
        {
          id: "agent-3",
          name: "Task & Build Worker",
          project: "Automation Pipeline",
          status: "idle",
          statusText: "Standby \xB7 watching changes",
          memoryMb: 92.4,
          pid: 10564
        }
      ]
    },
    bluetooth: {
      connectedCount: 3,
      devices: [
        { id: "wh-1000xm5", name: "WH-1000XM5", type: "headphones", connected: true, batteryLevel: 90 },
        { id: "airpods", name: "Wireless ANC Earbuds", type: "headphones", connected: true, batteryLevel: 85 },
        { id: "dragonfly", name: "Dragonfly R1 Pro", type: "mouse", connected: true, batteryLevel: 85 },
        { id: "cidoo", name: "CIDOO URX Core 75", type: "keyboard", connected: true, batteryLevel: 85 },
        { id: "orochi", name: "Orochi V2", type: "mouse", connected: true, batteryLevel: 70 }
      ]
    },
    topProcesses: [
      { pid: 27532, name: "Dia.exe", memMb: 612.6, threads: 42 },
      { pid: 6268, name: "agy.exe", memMb: 552, threads: 35 },
      { pid: 25852, name: "Antigravity IDE.exe", memMb: 405.3, threads: 68 },
      { pid: 31316, name: "explorer.exe", memMb: 331.6, threads: 84 },
      { pid: 17792, name: "Raycast.exe", memMb: 285.8, threads: 32 }
    ]
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
      return flankGlyphSvg(sizePx ? typeof sizePx === "number" ? sizePx : parseInt(sizePx, 10) : 18);
    default:
      return `<svg ${sizeStyle} ${strokeAttr}><circle cx="12" cy="12" r="8"/></svg>`;
  }
}
function flankGlyphSvg(size = 18, idSuffix = "") {
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
function renderAiRingSvg(percent, compact) {
  const clamped = Math.max(0, Math.min(100, percent));
  const circumference = 62.83;
  const dash = (clamped / 100 * circumference).toFixed(1);
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
      case "ai":
        return {
          ariaLabel: `AI usage, ${state2.ai.totalPercent} percent`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">ai</span><span>usage</span></span><span class="flank-row-right">${state2.ai.totalPercent}%</span>`
        };
      case "activity":
        return {
          ariaLabel: `AI activity, ${state2.activity?.activeCount ?? 0} active sessions`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">act</span><span>agents</span></span><span class="flank-row-right is-accent">${state2.activity?.activeCount ?? 0}</span>`
        };
      case "bluetooth":
        return {
          ariaLabel: `Bluetooth, ${state2.bluetooth?.connectedCount ?? 0} connected devices`,
          extraClass: "",
          html: `<span class="flank-row-left"><span class="flank-row-code">bt</span><span>devices</span></span><span class="flank-row-right is-accent">${state2.bluetooth?.connectedCount ?? 0}</span>`
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
          html: `${iconSvg("equalizer")}${railIndicator}`
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
      case "ai":
        return {
          ariaLabel: `AI usage, ${state2.ai.totalPercent} percent`,
          extraClass: "",
          html: `${renderAiRingSvg(state2.ai.totalPercent, true)}${railIndicator}`
        };
      case "activity":
        return {
          ariaLabel: `AI activity, ${state2.activity?.activeCount ?? 0} active`,
          extraClass: "",
          html: `${iconSvg("activity")}${railIndicator}`
        };
      case "bluetooth":
        return {
          ariaLabel: `Bluetooth, ${state2.bluetooth?.connectedCount ?? 0} devices`,
          extraClass: "",
          html: `${iconSvg("bluetooth")}${railIndicator}`
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
          html: renderAiRingSvg(state2.stats.cpuPercent, false)
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
          html: `<span class="flank-tile-accent-icon" style="display:flex">${iconSvg("equalizer")}</span>${escapeHtml(state2.player.title)}`
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
      case "ai":
        return {
          ariaLabel: `AI usage, ${state2.ai.totalPercent} percent`,
          extraClass: "is-widget-pill",
          html: `${renderAiRingSvg(state2.ai.totalPercent, true)}${state2.ai.totalPercent}%`
        };
      case "activity":
        return {
          ariaLabel: `AI activity, ${state2.activity?.activeCount ?? 0} active sessions`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("activity")}Agents (${state2.activity?.activeCount ?? 0})`
        };
      case "bluetooth":
        return {
          ariaLabel: `Bluetooth, ${state2.bluetooth?.connectedCount ?? 0} devices`,
          extraClass: "is-widget-pill",
          html: `${iconSvg("bluetooth")}BT (${state2.bluetooth?.connectedCount ?? 0})`
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
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("equalizer", 20)}</span><span class="flank-widget-value flank-num">${state2.player.playing ? "Play" : "Pau"}</span></span>`
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
    case "ai": {
      const aiVal = `${state2.ai.totalPercent}%`;
      return {
        ariaLabel: `AI usage, ${state2.ai.totalPercent} percent`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon" style="width: 20px; height: 20px">${renderAiRingSvg(state2.ai.totalPercent, true)}</span><span class="flank-widget-value flank-num">${truncateValue(aiVal)}</span></span>`
      };
    }
    case "activity": {
      const cnt = state2.activity?.activeCount ?? 0;
      return {
        ariaLabel: `AI activity, ${cnt} active sessions`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("activity", 20)}</span><span class="flank-widget-value flank-num">${cnt}a</span></span>${renderBadge(cnt)}`
      };
    }
    case "bluetooth":
    default: {
      const cnt = state2.bluetooth?.connectedCount ?? 0;
      return {
        ariaLabel: `Bluetooth, ${cnt} connected devices`,
        extraClass: "",
        html: `<span class="flank-widget-glance"><span class="flank-widget-icon">${iconSvg("bluetooth", 20)}</span><span class="flank-widget-value flank-num">${cnt}d</span></span>${renderBadge(cnt)}`
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
    ${state2.showLogoOnTab ? `<span class="flank-tab-glyph" style="margin-bottom: 6px">${flankGlyphSvg(24, "tab")}</span>` : ""}
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
      <img src="brand/flank-mascot.svg" alt="" width="72" height="72" style="width: 72px; height: 72px; opacity: 0.55; pointer-events: none;" />
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
      <span class="flank-player-art${p.playing ? " is-playing" : ""}" style="width: 44px; height: 44px; flex-shrink: 0; border-radius: 8px; background: var(--flank-color-tile-bg); display:flex; align-items:center; justify-content:center; color: var(--flank-color-accent); border: 1px solid var(--flank-color-divider-soft); transition: box-shadow 0.3s ease, border-color 0.3s ease;" aria-hidden="true">${iconSvg("equalizer", 22)}</span>
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
function renderAiCardInner(state2) {
  const ai = state2.ai || {
    totalPercent: 37,
    planName: "Google AI Pro Plan",
    connected: true,
    resetText: "Resets in 23 days",
    categories: [
      { label: "Gemini 2.0 Flash", percent: 42 },
      { label: "Gemini 1.5 Pro", percent: 28 },
      { label: "Coding Agents & Tools", percent: 19 }
    ]
  };
  const clamped = Math.max(0, Math.min(100, ai.totalPercent));
  const circumference = 213.6;
  const dash = (clamped / 100 * circumference).toFixed(1);
  const catRows = (ai.categories || []).map(
    (c) => `<div class="flank-meter">
        <div class="flank-meter__header">
          <span class="flank-meter__header-label">${escapeHtml2(c.label)}</span>
          <span class="flank-meter__header-val">${c.percent}%</span>
        </div>
        <div class="flank-meter__bar"><div class="flank-meter__fill" style="width: ${c.percent}%"></div></div>
      </div>`
  ).join("");
  return `
    <div class="flank-card__header">
      <div style="display:flex; align-items:center; gap: 8px; min-width: 0;">
        <span class="flank-card__title">AI Usage</span>
        <span class="flank-live-dot" style="background: ${ai.connected !== false ? "#10B981" : "#F59E0B"}; flex-shrink: 0;"></span>
      </div>
      <span class="flank-chip" style="height: 22px; padding: 0 10px; font-size: 11px; flex-shrink: 0; white-space: nowrap;">
        ${escapeHtml2(ai.planName || "Google AI Pro")}
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
        <span style="font-size: 11px; color: var(--flank-color-text-muted);">${escapeHtml2(ai.resetText || "Monthly quota")}</span>
      </div>
    </div>
    <div style="display:flex; flex-direction:column; gap: 6px;">
      ${catRows}
    </div>
    <button type="button" class="flank-btn is-secondary" style="width: 100%; justify-content: center; height: 30px; font-size: 11px; margin-top: 4px; gap: 6px;" data-action="open-settings" data-settings-tab="widgets">
      <span>Connect / Adjust AI Plan</span>
      <span style="display:flex; width: 12px; height: 12px; flex-shrink: 0;">${iconSvg("arrow-up-right", 12)}</span>
    </button>
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
function renderActivityCardInner(state2) {
  const act = state2.activity || {
    runningCount: 0,
    waitingCount: 0,
    activeSessions: []
  };
  const sessions = act.activeSessions || [];
  const total = sessions.length;
  const sessionRows = sessions.map((s) => {
    const statusColor = s.status === "running" ? "#10B981" : s.status === "waiting" ? "#F59E0B" : "#64748B";
    const statusLabel = s.status === "running" ? "Active" : s.status === "waiting" ? "Waiting" : "Idle";
    return `
      <div class="flank-subcard" style="padding: 10px 12px; border-radius: 10px; background: var(--flank-color-tile-bg); border: 1px solid var(--flank-color-divider-soft); display:flex; flex-direction:column; gap: 6px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap: 6px; min-width: 0;">
            <span style="display:flex; width: 14px; height: 14px; color: var(--flank-color-accent); flex-shrink: 0;">${iconSvg("activity", 14)}</span>
            <span style="font-size: 13px; font-weight: 600; color: var(--flank-color-text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml2(s.agentName)}</span>
          </div>
          <span class="flank-chip" style="height: 20px; padding: 0 6px; font-size: 10px; display:flex; align-items:center; gap: 4px;">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: ${statusColor};"></span>
            ${statusLabel}
          </span>
        </div>
        <div style="font-size: 11px; color: var(--flank-color-text-muted); display:flex; justify-content:space-between; align-items:center;">
          <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width: 170px;" title="${escapeHtml2(s.projectPath || s.projectName)}">${escapeHtml2(s.projectName || "Active Task")}</span>
          <span class="tabular-nums">${s.memoryMb ? `${Math.round(s.memoryMb)} MB` : `PID ${s.pid}`}</span>
        </div>
      </div>
    `;
  }).join("");
  return `
    <div class="flank-card__header">
      <div style="display:flex; align-items:center; gap: 8px;">
        <span class="flank-card__title">AI Agent Activity</span>
        <span class="flank-live-pill">
          <span class="flank-live-dot"></span>
          ${total} ${total === 1 ? "task" : "tasks"}
        </span>
      </div>
    </div>
    ${total === 0 ? renderEmptyState("No AI agent tasks active", "Coding agents & CLI tasks will appear here") : `
      <div style="display:flex; flex-direction:column; gap: 8px;">
        ${sessionRows}
      </div>
    `}
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
    case "ai":
      label = "AI usage";
      inner = renderAiCardInner(state2);
      break;
    case "clipboard":
      label = "Clipboard history";
      inner = renderClipboardCardInner(state2);
      break;
    case "activity":
      label = "AI Agent Activity";
      inner = renderActivityCardInner(state2);
      break;
    case "bluetooth":
      label = "Bluetooth & Peripherals";
      inner = renderBluetoothCardInner(state2);
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

// src/ui/dockState.ts
var currentDockState = "expanded";
var isReducedMotion2 = false;
var collapseTimer = null;
function getDockState() {
  return currentDockState;
}
function isDockCollapsed() {
  return currentDockState === "collapsed" || currentDockState === "collapsing";
}
function initDockState(initialState = "expanded") {
  currentDockState = initialState;
  isReducedMotion2 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  root.setAttribute("data-dock-state", currentDockState);
  window.flankSetDockState = (state2) => {
    setDockState(state2);
  };
  window.flankGetDockState = () => currentDockState;
}
function setDockState(next) {
  if (currentDockState === next) return;
  const root = document.documentElement;
  currentDockState = next;
  root.setAttribute("data-dock-state", next);
  if (collapseTimer !== null) {
    clearTimeout(collapseTimer);
    collapseTimer = null;
  }
  const duration = isReducedMotion2 ? 0 : 220;
  if (next === "collapsing") {
    try {
      window.pywebview?.api?.close_hover_card?.();
    } catch {
    }
    collapseTimer = window.setTimeout(() => {
      collapseTimer = null;
      try {
        window.pywebview?.api?.dock_collapse_done?.();
      } catch {
        setDockState("collapsed");
      }
    }, duration);
  } else if (next === "expanding") {
    collapseTimer = window.setTimeout(() => {
      collapseTimer = null;
      try {
        window.pywebview?.api?.dock_expand_done?.();
      } catch {
        setDockState("expanded");
      }
    }, duration);
  }
}
function toggleDockCollapse() {
  if (currentDockState === "expanded" || currentDockState === "expanding") {
    setDockState("collapsing");
  } else {
    try {
      window.pywebview?.api?.expand_dock?.();
    } catch {
      setDockState("expanding");
    }
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
        <span class="flank-titlebar-glyph" style="display:flex; align-items:center; color: currentColor">${flankGlyphSvg(18, "titlebar")}</span>
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
  const maxMem = procs.length > 0 ? Math.max(...procs.map((p) => p.memoryMb || 1), 100) : 100;
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
              <div class="flank-meter__bar" style="height: 6px; flex: 1; margin: 0; background: var(--flank-color-track-bg);"><div class="flank-meter__fill" style="width: ${Math.min(100, Math.round(p.memoryMb / maxMem * 100))}%"></div></div>
              <span class="tabular-nums" style="font-weight: 600; font-size: 12px; min-width: 60px; text-align: right;">${Math.round(p.memoryMb)} MB</span>
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
    (item) => `<div class="flank-preview-box" style="justify-content: space-between; align-items: center; padding: 12px; background: var(--flank-surface-card-bg); border-radius: var(--flank-scale-radius-10);">
        <span style="display:flex; align-items:center; gap: var(--flank-scale-space-10)">
          <span class="flank-row-chip" style="width: var(--flank-scale-ring-tile); height: var(--flank-scale-ring-tile)">${iconSvg(item.isDay ? "sun" : "moon", 16)}</span>
          <span style="display:flex; flex-direction:column; gap: var(--flank-scale-bar-thin)">
            <span style="font-size: var(--flank-scale-font-body-sm); font-weight: 600; color: var(--flank-color-text);">${escapeHtml5(item.city)}</span>
            <span class="flank-row-meta">${escapeHtml5(item.country ? `${item.country} \xB7 ${item.timezone}` : item.timezone)} \xB7 ${escapeHtml5(item.offsetText)}</span>
          </span>
        </span>
        <span style="display:flex; align-items:center; gap: var(--flank-scale-space-10)">
          <span style="display:flex; flex-direction:column; align-items:flex-end; gap: var(--flank-scale-bar-thin)">
            <span class="flank-stat-val tabular-nums" style="font-size: var(--flank-scale-font-body-sm)">${escapeHtml5(item.timeText)}</span>
            <span class="flank-row-meta">${escapeHtml5(item.dateText)}</span>
          </span>
          <button type="button" class="flank-ui-btn is-ghost" data-clock-remove="${escapeHtml5(item.id)}" aria-label="Remove ${escapeHtml5(item.city)}" title="Remove ${escapeHtml5(item.city)}" style="width: 28px; height: 28px; padding: 0;">
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
          <span class="flank-card-title">Saved world clocks</span>
          <div style="display:flex; flex-direction:column; gap: var(--flank-scale-space-10)">
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
      description: "Shows the Flank bird mascot glyph on the edge tab.",
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
      <div style="display: flex; flex-direction: column; gap: 20px;">
        ${SectionHeader({
      title: "Widget Preferences",
      description: "Configure weather location, multiple world clocks, and clipboard storage."
    })}
        ${Row({
      label: "Weather city",
      description: "Location for weather and hourly forecast.",
      controlHtml: `
            <div style="display:flex; gap: 8px;">
              ${Input({ id: "flank-weather-city-input", value: state2.weather.city, style: "width: 140px;" })}
              ${Button({ label: "Update", variant: "primary", actionAttr: 'data-action="save-weather-city"' })}
            </div>
          `
    })}
        ${Row({
      label: "Add World Clock city",
      description: "Search any city to track local time.",
      controlHtml: `
            <div style="display:flex; gap: 8px;">
              ${Input({ id: "flank-clock-city-input", placeholder: "e.g. Tokyo, London, Dubai...", style: "width: 160px;" })}
              ${Button({ label: "Add city", variant: "primary", actionAttr: 'data-action="add-world-clock"' })}
            </div>
          `
    })}
        ${Row({
      label: "Saved World Clocks",
      controlHtml: `<div class="flank-chip-row" style="flex-wrap: wrap; max-width: 320px; justify-content: flex-end; gap: 6px;">${clockChips || '<span class="flank-card-muted">None</span>'}</div>`
    })}
        ${Row({
      label: "Clipboard history",
      description: "Removes all unpinned entries from local database.",
      controlHtml: Button({ label: "Clear unpinned items", variant: "secondary", actionAttr: 'data-action="clear-clipboard"' })
    })}
        ${Row({
      label: "Launch Flank on Windows sign-in",
      description: "Automatically starts Flank in background.",
      controlHtml: Switch({ checked: Boolean(state2.autostart), actionAttr: 'data-action="toggle-autostart"' })
    })}
        <div style="border-top: var(--flank-scale-hairline) solid var(--flank-color-divider-soft); margin: 8px 0;"></div>
        ${SectionHeader({
      title: "AI Model Usage & Plan Connection",
      description: "Connect your Google AI Pro / Gemini API key to track real token limits, models, and usage."
    })}
        ${Row({
      label: "AI Subscription / Plan",
      description: "Provider to monitor in the AI widget.",
      controlHtml: `
            <select id="flank-ai-provider-select" class="flank-input" style="width: 220px; height: 32px; background: var(--flank-color-icon-plate); color: var(--flank-color-text);">
              <option value="google" selected>Google AI Pro (Gemini 2.0 / 1.5)</option>
              <option value="google-one">Google One AI Premium</option>
              <option value="openai">OpenAI ChatGPT Plus</option>
              <option value="claude">Anthropic Claude Pro</option>
            </select>
          `
    })}
        ${Row({
      label: "Google Gemini API Key",
      description: "Used to verify connection and query model quota.",
      controlHtml: `
            <div style="display:flex; gap: 8px; width: 260px;">
              <input type="password" id="flank-ai-apikey-input" class="flank-input" style="flex: 1; height: 32px;" placeholder="AIzaSy..." value="${escapeHtml5(state2.ai?.apiKey || "")}" />
              <button type="button" class="flank-btn is-secondary" data-action="test-ai-key" style="height: 32px; padding: 0 10px; font-size: 11px;">Test</button>
            </div>
          `
    })}
        ${Row({
      label: "Plan Quota Tier",
      description: "Configures model breakdown and monthly cycle.",
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
          `
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
            ${Button({ label: "Website", variant: "ghost", actionAttr: 'data-action="open-link-website"' })}
            ${Button({ label: "GitHub Issues", variant: "ghost", actionAttr: 'data-action="open-link-issues"' })}
            ${Button({ label: "MIT License", variant: "ghost", actionAttr: 'data-action="open-link-license"' })}
          </div>
          ${Button({ label: "Check for updates", variant: "secondary", actionAttr: 'data-action="check-updates"', style: "margin-top: 6px;" })}
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
var uiState = {
  clipboardQuery: "",
  clipboardFilter: "all",
  selectedClipboardId: "cb-2",
  settingsTab: "appearance",
  recordingItemId: null,
  shortcutConflictMsg: null,
  themeValidationMsg: null
};
window.flankOpenModal = (win) => {
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
  if (!data || data.solidFallback || !data.enabled) {
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
    const curTheme = themeEngine.getCurrentTheme();
    if (curTheme.glass) {
      const tintRgb = curTheme.glass.tintRgb || "16,20,42";
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
        const naturalWidth = Math.max(Math.ceil(rect.width), dockEl.scrollWidth, dockEl.offsetWidth);
        const naturalHeight = Math.max(Math.ceil(rect.height), dockEl.scrollHeight, dockEl.offsetHeight);
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
  const res = themeEngine.switchTheme(state.themeId, {
    edge: state.edgeOverride ?? void 0,
    accent: state.accentOverride ?? void 0
  });
  if (!res.valid) {
    uiState.themeValidationMsg = `Theme fell back to Paper: ${res.errors.join(" ")}`;
  } else {
    uiState.themeValidationMsg = null;
  }
}
function setupEventDelegation() {
  document.addEventListener(
    "pointerdown",
    (ev) => {
      const target = ev.target;
      const expandBtn = target?.closest('[data-action="expand-dock"], .flank-dock-tab');
      if (expandBtn) {
        ev.preventDefault();
        ev.stopPropagation();
        toggleDockCollapse();
      }
    },
    true
  );
  document.addEventListener(
    "click",
    (ev) => {
      const target = ev.target;
      const expandBtn = target?.closest('[data-action="expand-dock"], .flank-dock-tab');
      if (expandBtn) {
        ev.preventDefault();
        ev.stopPropagation();
        toggleDockCollapse();
      }
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
  });
  stage.addEventListener("dragend", () => {
    draggedItemId = null;
    stage.querySelectorAll(".flank-tile").forEach((el) => {
      el.classList.remove("is-dragging", "is-drag-over");
    });
  });
  let lastHoverWidget = null;
  stage.addEventListener("pointerover", (ev) => {
    const target = ev.target;
    if (!target) return;
    if (currentView === "dock") {
      const widgetTile2 = target.closest("[data-widget]");
      if (widgetTile2) {
        const wKind = widgetTile2.getAttribute("data-widget");
        if (wKind && wKind !== lastHoverWidget) {
          lastHoverWidget = wKind;
          const rect = widgetTile2.getBoundingClientRect();
          const centerY = Math.round(rect.top + rect.height / 2);
          suppressDockTooltip(true);
          hideDockTooltip();
          window.pywebview?.api?.show_hover_card?.(wKind, centerY);
        }
      } else {
        if (lastHoverWidget !== null) {
          lastHoverWidget = null;
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
      if (state.activeWidget !== wKind) {
        state.activeWidget = wKind;
        renderApp();
      }
    } else if (insideCard) {
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
        window.pywebview?.api?.hide_hover_card?.();
      }
      return;
    }
    if (currentView === "card") {
      const related2 = ev.relatedTarget;
      if (!related2 || !related2.closest("#flank-hover-card")) {
        window.pywebview?.api?.hide_hover_card?.();
      }
      return;
    }
    const related = ev.relatedTarget;
    if (related && (related.closest("#flank-dock") || related.closest("#flank-hover-card"))) {
      return;
    }
    if (state.activeWidget && !state.activeFullWindow) {
      if (hoverCloseTimer) clearTimeout(hoverCloseTimer);
      hoverCloseTimer = setTimeout(() => {
        state.activeWidget = null;
        renderApp();
      }, 180);
    }
  });
  stage.addEventListener("pointerdown", (ev) => {
    const target = ev.target;
    if (!target) return;
    if (currentView === "modal") {
      const titlebar = target.closest(".flank-titlebar");
      if (titlebar && !target.closest("button, input, a, select, textarea, [data-action]")) {
        window.pywebview?.api?.drag_modal_window?.();
      }
    }
  });
  stage.addEventListener("click", async (ev) => {
    const target = ev.target;
    if (!target) return;
    const expandBtn = target.closest('[data-action="expand-dock"], .flank-dock-tab');
    if (expandBtn) {
      ev.preventDefault();
      ev.stopPropagation();
      toggleDockCollapse();
      return;
    }
    const collapseBtn = target.closest('[data-action="collapse-dock"], .flank-dock-collapse-handle');
    if (collapseBtn) {
      ev.preventDefault();
      ev.stopPropagation();
      toggleDockCollapse();
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
      toggleDockCollapse();
      return;
    }
    if (action === "expand-dock") {
      toggleDockCollapse();
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
    if (action === "test-ai-key") {
      const keyInput = document.getElementById("flank-ai-apikey-input");
      const keyVal = keyInput?.value.trim() || "";
      btn.textContent = "Testing...";
      try {
        const res = await window.pywebview?.api?.test_ai_key?.(keyVal);
        if (res?.ok) {
          alert(res.message || "Connected to Google Gemini API successfully!");
        } else {
          alert(res?.message || "Connection check failed. Please verify API key.");
        }
      } catch (e) {
        alert("Error connecting: " + String(e));
      } finally {
        btn.textContent = "Test";
      }
      return;
    }
    if (action === "save-ai-settings") {
      const keyInput = document.getElementById("flank-ai-apikey-input");
      const provSelect = document.getElementById("flank-ai-provider-select");
      const planSelect = document.getElementById("flank-ai-plan-select");
      const payload = {
        apiKey: keyInput?.value.trim() || "",
        provider: provSelect?.value || "google",
        plan: planSelect?.value || "pro"
      };
      btn.textContent = "Saving...";
      try {
        const res = await window.pywebview?.api?.save_ai_settings?.(payload);
        if (res?.ai) {
          state.ai = res.ai;
        }
      } catch (e) {
        console.error("Failed to save AI settings:", e);
      } finally {
        btn.textContent = "Saved!";
        setTimeout(() => {
          renderApp();
        }, 600);
      }
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
      uiState.recordingItemId = uiState.recordingItemId === recordItemId ? null : recordItemId;
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
    if (ev.ctrlKey && ev.altKey && (ev.code === "KeyF" || ev.key.toLowerCase() === "f")) {
      ev.preventDefault();
      toggleDockCollapse();
      return;
    }
    if (uiState.recordingItemId) {
      ev.preventDefault();
      if (ev.key === "Escape") {
        uiState.recordingItemId = null;
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
      const duplicate = state.items.find(
        (i) => i.id !== uiState.recordingItemId && i.shortcut?.toLowerCase() === combo.toLowerCase()
      );
      if (duplicate) {
        uiState.shortcutConflictMsg = `Conflict: ${combo} is already assigned to ${duplicate.label}.`;
        renderApp();
        return;
      }
      const hostCheck = await window.pywebview?.api?.register_item_shortcut?.(
        uiState.recordingItemId,
        combo
      );
      if (hostCheck && !hostCheck.ok) {
        uiState.shortcutConflictMsg = hostCheck.conflict || `Conflict: ${combo} is reserved by another app.`;
        renderApp();
        return;
      }
      const item = state.items.find((i) => i.id === uiState.recordingItemId);
      if (item) {
        item.shortcut = combo;
      }
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
  if (patch.ai) {
    state.ai = { ...state.ai, ...patch.ai };
  }
  if (patch.clipboard) {
    state.clipboard = { ...state.clipboard, ...patch.clipboard };
  }
  if (patch.activity) {
    state.activity = { ...state.activity, ...patch.activity };
  }
  if (patch.bluetooth) {
    state.bluetooth = { ...state.bluetooth, ...patch.bluetooth };
  }
  if (patch.topProcesses) {
    state.topProcesses = patch.topProcesses;
  }
  state.dataSource = "live";
  if (currentView === "modal" && state.activeFullWindow === "settings" && !prefsChanged && !patch.clock && !patch.weather) {
    return;
  }
  if (currentView === "card" && state.activeWidget && !prefsChanged) {
    const w = state.activeWidget;
    const hasWidgetUpdate = w === "stats" && !!patch.stats || w === "battery" && !!patch.battery || w === "weather" && !!patch.weather || w === "player" && !!patch.player || w === "focus" && !!patch.focus || w === "clock" && !!patch.clock || w === "scratchpad" && !!patch.scratchpad || w === "colorpicker" && !!patch.colorpicker || w === "calendar" && !!patch.calendar || w === "audio" && !!patch.audio || w === "network" && !!patch.network || w === "ai" && !!patch.ai || w === "clipboard" && !!patch.clipboard || w === "activity" && !!patch.activity || w === "bluetooth" && !!patch.bluetooth;
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
  initDockState(state.dockState || (state.startCollapsed ? "collapsed" : "expanded"));
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
