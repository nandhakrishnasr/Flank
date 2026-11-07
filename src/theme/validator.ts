import { type FlankTheme, PAPER_THEME } from './schema.ts';
import { contrastRatio, parseColor, resolveOpaqueSurface } from './contrast.ts';

export interface FailingContrastPair {
  pair: string;
  foreground: string;
  background: string;
  ratio: number;
  required: number;
}

export interface ValidationResult {
  valid: boolean;
  theme: FlankTheme;
  fellBackToPaper: boolean;
  errors: string[];
  failingPairs: FailingContrastPair[];
}

const ALLOWED_FONT_FAMILIES = new Set([
  'inter',
  'fraunces',
  'jetbrains mono',
  'segoe ui variable',
  'segoe ui',
  'cascadia mono',
  'consolas',
  'georgia',
  'system-ui',
  'sans-serif',
  'serif',
  'monospace',
]);

function parsePx(val: string): number | null {
  const m = String(val)
    .trim()
    .match(/^(-?\d+(?:\.\d+)?)px$/i);
  return m ? Number(m[1]) : null;
}

export function getShadowMaxReach(shadowStr: string): number {
  if (!shadowStr || typeof shadowStr !== 'string' || shadowStr.trim() === 'none') return 0;
  // A box-shadow can be comma-separated: e.g. "inset 0 1px 0 rgba(...), 0 10px 28px rgba(...)"
  const parts = shadowStr.split(/,(?![^(]*\))/);
  let maxReach = 0;
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || trimmed === 'none' || trimmed.includes('inset')) {
      continue;
    }
    const tokens = trimmed.split(/\s+/).filter((t) => !t.startsWith('rgb') && !t.startsWith('#') && !t.startsWith('hsl'));
    const lengths: number[] = [];
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

function containsUnsafeString(obj: unknown): string | null {
  if (typeof obj === 'string') {
    const lower = obj.toLowerCase();
    if (
      lower.includes('http://') ||
      lower.includes('https://') ||
      lower.includes('javascript:') ||
      lower.includes('<script') ||
      lower.includes('@import') ||
      lower.includes('expression(')
    ) {
      return obj;
    }
    return null;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const hit = containsUnsafeString(item);
      if (hit) return hit;
    }
  } else if (obj && typeof obj === 'object') {
    for (const val of Object.values(obj as Record<string, unknown>)) {
      const hit = containsUnsafeString(val);
      if (hit) return hit;
    }
  }
  return null;
}

function validateFontStack(stack: string): boolean {
  if (!stack || typeof stack !== 'string') return false;
  const parts = stack
    .split(',')
    .map((p) => p.trim().replace(/^['"]|['"]$/g, '').toLowerCase())
    .filter(Boolean);
  if (parts.length === 0) return false;
  return parts.every((f) => ALLOWED_FONT_FAMILIES.has(f));
}

/**
 * Merge a candidate raw JSON object onto PAPER_THEME so missing keys fall back to Paper,
 * while ignoring unknown keys.
 */
export function normalizeThemeWithPaperFallback(raw: Record<string, any>): FlankTheme {
  const layoutRaw = (raw.layout && typeof raw.layout === 'object' ? raw.layout : {}) as Record<string, any>;
  const surfaceRaw = (raw.surface && typeof raw.surface === 'object' ? raw.surface : {}) as Record<string, any>;
  const colorRaw = (raw.color && typeof raw.color === 'object' ? raw.color : {}) as Record<string, any>;
  const typeRaw = (raw.type && typeof raw.type === 'object' ? raw.type : {}) as Record<string, any>;
  const iconsRaw = (raw.icons && typeof raw.icons === 'object' ? raw.icons : {}) as Record<string, any>;
  const motionRaw = (raw.motion && typeof raw.motion === 'object' ? raw.motion : {}) as Record<string, any>;

  const theme: FlankTheme = {
    schema: typeof raw.schema === 'number' ? raw.schema : PAPER_THEME.schema,
    id: typeof raw.id === 'string' && raw.id.trim() ? raw.id.trim() : PAPER_THEME.id,
    name: typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim() : PAPER_THEME.name,
    mode: raw.mode === 'dark' || raw.mode === 'light' ? raw.mode : PAPER_THEME.mode,
    default: typeof raw.default === 'boolean' ? raw.default : false,
    description: typeof raw.description === 'string' ? raw.description : PAPER_THEME.description,
    layout: {
      edge: layoutRaw.edge === 'top' ? 'right' : ['left', 'right'].includes(layoutRaw.edge) ? layoutRaw.edge : PAPER_THEME.layout.edge,
      orientation: ['vertical', 'horizontal'].includes(layoutRaw.orientation)
        ? layoutRaw.orientation
        : PAPER_THEME.layout.orientation,
      shape: ['pill', 'strip', 'rail', 'capsule'].includes(layoutRaw.shape)
        ? layoutRaw.shape
        : PAPER_THEME.layout.shape,
      widgetStyle: ['tile', 'row', 'value', 'pill'].includes(layoutRaw.widgetStyle)
        ? layoutRaw.widgetStyle
        : PAPER_THEME.layout.widgetStyle,
      labels: typeof layoutRaw.labels === 'boolean' ? layoutRaw.labels : PAPER_THEME.layout.labels,
      inset: typeof layoutRaw.inset === 'string' ? layoutRaw.inset : PAPER_THEME.layout.inset,
      dockWidth: typeof layoutRaw.dockWidth === 'string' ? layoutRaw.dockWidth : PAPER_THEME.layout.dockWidth,
      ...(typeof layoutRaw.dockHeight === 'string' ? { dockHeight: layoutRaw.dockHeight } : {}),
      dockPadding: typeof layoutRaw.dockPadding === 'string' ? layoutRaw.dockPadding : PAPER_THEME.layout.dockPadding,
      dockGap: typeof layoutRaw.dockGap === 'string' ? layoutRaw.dockGap : PAPER_THEME.layout.dockGap,
      dockRadius: typeof layoutRaw.dockRadius === 'string' ? layoutRaw.dockRadius : PAPER_THEME.layout.dockRadius,
      tileSize: typeof layoutRaw.tileSize === 'string' ? layoutRaw.tileSize : PAPER_THEME.layout.tileSize,
      tileRadius: typeof layoutRaw.tileRadius === 'string' ? layoutRaw.tileRadius : PAPER_THEME.layout.tileRadius,
      iconSize: typeof layoutRaw.iconSize === 'string' ? layoutRaw.iconSize : PAPER_THEME.layout.iconSize,
      ...(typeof layoutRaw.hitAreaMin === 'string' ? { hitAreaMin: layoutRaw.hitAreaMin } : {}),
      ...(typeof layoutRaw.tileHeight === 'string' ? { tileHeight: layoutRaw.tileHeight } : {}),
      ...(typeof layoutRaw.valueTileHeight === 'string' ? { valueTileHeight: layoutRaw.valueTileHeight } : {}),
      windowPadding:
        typeof layoutRaw.windowPadding === 'number' || typeof layoutRaw.windowPadding === 'string'
          ? (typeof layoutRaw.windowPadding === 'number' ? `${layoutRaw.windowPadding}px` : layoutRaw.windowPadding)
          : PAPER_THEME.layout.windowPadding ?? '64px',
      maxItems: typeof layoutRaw.maxItems === 'number' ? layoutRaw.maxItems : PAPER_THEME.layout.maxItems,
    },
    surface: {
      dockBg: typeof surfaceRaw.dockBg === 'string' ? surfaceRaw.dockBg : PAPER_THEME.surface.dockBg,
      dockBorder: typeof surfaceRaw.dockBorder === 'string' ? surfaceRaw.dockBorder : PAPER_THEME.surface.dockBorder,
      dockShadow: typeof surfaceRaw.dockShadow === 'string' ? surfaceRaw.dockShadow : PAPER_THEME.surface.dockShadow,
      backdropBlur:
        typeof surfaceRaw.backdropBlur === 'string' ? surfaceRaw.backdropBlur : PAPER_THEME.surface.backdropBlur,
      backdropSaturate:
        typeof surfaceRaw.backdropSaturate === 'string'
          ? surfaceRaw.backdropSaturate
          : PAPER_THEME.surface.backdropSaturate,
      cardBg: typeof surfaceRaw.cardBg === 'string' ? surfaceRaw.cardBg : PAPER_THEME.surface.cardBg,
      cardBorder: typeof surfaceRaw.cardBorder === 'string' ? surfaceRaw.cardBorder : PAPER_THEME.surface.cardBorder,
      cardShadow: typeof surfaceRaw.cardShadow === 'string' ? surfaceRaw.cardShadow : PAPER_THEME.surface.cardShadow,
      cardRadius: typeof surfaceRaw.cardRadius === 'string' ? surfaceRaw.cardRadius : PAPER_THEME.surface.cardRadius,
      cardPadding:
        typeof surfaceRaw.cardPadding === 'string' ? surfaceRaw.cardPadding : PAPER_THEME.surface.cardPadding,
      cardWidth: typeof surfaceRaw.cardWidth === 'string' ? surfaceRaw.cardWidth : PAPER_THEME.surface.cardWidth,
      cardGap: typeof surfaceRaw.cardGap === 'string' ? surfaceRaw.cardGap : PAPER_THEME.surface.cardGap,
      cardOffset: typeof surfaceRaw.cardOffset === 'string' ? surfaceRaw.cardOffset : PAPER_THEME.surface.cardOffset,
      ...(typeof surfaceRaw.solidFallbackBg === 'string' ? { solidFallbackBg: surfaceRaw.solidFallbackBg } : {}),
      opacity: typeof surfaceRaw.opacity === 'number' ? surfaceRaw.opacity : (PAPER_THEME.surface.opacity ?? 1),
      highlight:
        typeof surfaceRaw.highlight === 'string'
          ? surfaceRaw.highlight
          : (PAPER_THEME.surface.highlight || 'none'),
      hover:
        typeof surfaceRaw.hover === 'string'
          ? surfaceRaw.hover
          : typeof surfaceRaw.surfaceHover === 'string'
            ? surfaceRaw.surfaceHover
            : (PAPER_THEME.surface.hover || '#f4f0e8'),
      active:
        typeof surfaceRaw.active === 'string'
          ? surfaceRaw.active
          : typeof surfaceRaw.surfaceActive === 'string'
            ? surfaceRaw.surfaceActive
            : (PAPER_THEME.surface.active || '#ebe5d8'),
      selected:
        typeof surfaceRaw.selected === 'string'
          ? surfaceRaw.selected
          : typeof surfaceRaw.surfaceSelected === 'string'
            ? surfaceRaw.surfaceSelected
            : (PAPER_THEME.surface.selected || '#e4ded0'),
    },
    color: {
      text: typeof colorRaw.text === 'string' ? colorRaw.text : PAPER_THEME.color.text,
      textMuted: typeof colorRaw.textMuted === 'string' ? colorRaw.textMuted : PAPER_THEME.color.textMuted,
      tileBg: typeof colorRaw.tileBg === 'string' ? colorRaw.tileBg : PAPER_THEME.color.tileBg,
      tileBgHover: typeof colorRaw.tileBgHover === 'string' ? colorRaw.tileBgHover : PAPER_THEME.color.tileBgHover,
      tileBgPressed:
        typeof colorRaw.tileBgPressed === 'string' ? colorRaw.tileBgPressed : PAPER_THEME.color.tileBgPressed,
      tileIcon: typeof colorRaw.tileIcon === 'string' ? colorRaw.tileIcon : PAPER_THEME.color.tileIcon,
      tileActiveBg: typeof colorRaw.tileActiveBg === 'string' ? colorRaw.tileActiveBg : PAPER_THEME.color.tileActiveBg,
      tileActiveIcon:
        typeof colorRaw.tileActiveIcon === 'string' ? colorRaw.tileActiveIcon : PAPER_THEME.color.tileActiveIcon,
      divider: typeof colorRaw.divider === 'string' ? colorRaw.divider : PAPER_THEME.color.divider,
      dividerSoft: typeof colorRaw.dividerSoft === 'string' ? colorRaw.dividerSoft : PAPER_THEME.color.dividerSoft,
      trackBg: typeof colorRaw.trackBg === 'string' ? colorRaw.trackBg : PAPER_THEME.color.trackBg,
      accent: typeof colorRaw.accent === 'string' ? colorRaw.accent : PAPER_THEME.color.accent,
      ...(typeof colorRaw.accent2 === 'string' ? { accent2: colorRaw.accent2 } : {}),
      ...(typeof colorRaw.accentCyan === 'string' ? { accentCyan: colorRaw.accentCyan } : {}),
      ...(typeof colorRaw.accentPink === 'string' ? { accentPink: colorRaw.accentPink } : {}),
      ...(typeof colorRaw.accentGradient === 'string' ? { accentGradient: colorRaw.accentGradient } : {}),
      ...(typeof colorRaw.tileActiveShadow === 'string' ? { tileActiveShadow: colorRaw.tileActiveShadow } : {}),
      ...(typeof colorRaw.chipBg === 'string' ? { chipBg: colorRaw.chipBg } : {}),
      ...(typeof colorRaw.chipActiveBg === 'string' ? { chipActiveBg: colorRaw.chipActiveBg } : {}),
      accentInk: typeof colorRaw.accentInk === 'string' ? colorRaw.accentInk : PAPER_THEME.color.accentInk,
      accentSoft: typeof colorRaw.accentSoft === 'string' ? colorRaw.accentSoft : PAPER_THEME.color.accentSoft,
      accentLine: typeof colorRaw.accentLine === 'string' ? colorRaw.accentLine : PAPER_THEME.color.accentLine,
      focusRing: typeof colorRaw.focusRing === 'string' ? colorRaw.focusRing : PAPER_THEME.color.focusRing,
    },
    type: {
      ui: typeof typeRaw.ui === 'string' ? typeRaw.ui : PAPER_THEME.type.ui,
      display: typeof typeRaw.display === 'string' ? typeRaw.display : PAPER_THEME.type.display,
      mono: typeof typeRaw.mono === 'string' ? typeRaw.mono : PAPER_THEME.type.mono,
      ...(typeof typeRaw.displayUse === 'string' ? { displayUse: typeRaw.displayUse } : {}),
      ...(Array.isArray(typeRaw.weights) ? { weights: typeRaw.weights } : {}),
    },
    icons: {
      strokeWidth:
        typeof iconsRaw.strokeWidth === 'number' ? iconsRaw.strokeWidth : PAPER_THEME.icons.strokeWidth,
      viewBox: typeof iconsRaw.viewBox === 'string' ? iconsRaw.viewBox : PAPER_THEME.icons.viewBox,
      caps: typeof iconsRaw.caps === 'string' ? iconsRaw.caps : PAPER_THEME.icons.caps,
      joins: typeof iconsRaw.joins === 'string' ? iconsRaw.joins : PAPER_THEME.icons.joins,
    },
    motion: {
      cardInMs: typeof motionRaw.cardInMs === 'number' ? motionRaw.cardInMs : PAPER_THEME.motion.cardInMs,
      tileMs: typeof motionRaw.tileMs === 'number' ? motionRaw.tileMs : PAPER_THEME.motion.tileMs,
      easing: typeof motionRaw.easing === 'string' ? motionRaw.easing : PAPER_THEME.motion.easing,
      cardTravelPx:
        typeof motionRaw.cardTravelPx === 'number' ? motionRaw.cardTravelPx : PAPER_THEME.motion.cardTravelPx,
      ...(typeof motionRaw.springEasing === 'string' ? { springEasing: motionRaw.springEasing } : {}),
      ...(typeof motionRaw.cardScaleFrom === 'number' ? { cardScaleFrom: motionRaw.cardScaleFrom } : {}),
      ...(typeof motionRaw.tilePressScale === 'number' ? { tilePressScale: motionRaw.tilePressScale } : {}),
    },
    ...(raw.glass && typeof raw.glass === 'object'
      ? {
          glass: {
            mode: ['wallpaper-sampled', 'flat', 'css-only'].includes(raw.glass.mode)
              ? raw.glass.mode
              : 'wallpaper-sampled',
            ...(typeof raw.glass.modeNote === 'string' ? { modeNote: raw.glass.modeNote } : {}),
            tintRgb: typeof raw.glass.tintRgb === 'string' ? raw.glass.tintRgb : '16,20,42',
            tintAlpha: typeof raw.glass.tintAlpha === 'number' ? raw.glass.tintAlpha : 0.42,
            tintAlphaMin: typeof raw.glass.tintAlphaMin === 'number' ? raw.glass.tintAlphaMin : 0.34,
            tintAlphaMax: typeof raw.glass.tintAlphaMax === 'number' ? raw.glass.tintAlphaMax : 0.70,
            blur: typeof raw.glass.blur === 'string' ? raw.glass.blur : '30px',
            saturate:
              typeof raw.glass.saturate === 'string' || typeof raw.glass.saturate === 'number'
                ? String(raw.glass.saturate)
                : '1.8',
            rimWidth: typeof raw.glass.rimWidth === 'string' ? raw.glass.rimWidth : '1.5px',
            rim: typeof raw.glass.rim === 'string' ? raw.glass.rim : '',
            sheen: typeof raw.glass.sheen === 'string' ? raw.glass.sheen : '',
            sheenHeight: typeof raw.glass.sheenHeight === 'string' ? raw.glass.sheenHeight : '130px',
            ...(typeof raw.glass.sheenRadiusRule === 'string' ? { sheenRadiusRule: raw.glass.sheenRadiusRule } : {}),
            ...(typeof raw.glass.textShadowWhenLowContrast === 'string'
              ? { textShadowWhenLowContrast: raw.glass.textShadowWhenLowContrast }
              : {}),
          },
        }
      : {}),
  };

  return theme;
}

/**
 * Validate a raw theme JSON object according to DESIGN.md section 8.
 */
export function validateTheme(rawInput: unknown): ValidationResult {
  const errors: string[] = [];
  const failingPairs: FailingContrastPair[] = [];

  if (!rawInput || typeof rawInput !== 'object' || Array.isArray(rawInput)) {
    return {
      valid: false,
      theme: structuredClone(PAPER_THEME),
      fellBackToPaper: true,
      errors: ['Theme must be a JSON object.'],
      failingPairs: [],
    };
  }

  const raw = rawInput as Record<string, any>;

  // Rule 1: Data only, no remote URLs or script payloads
  const unsafeHit = containsUnsafeString(raw);
  if (unsafeHit) {
    errors.push(`Theme contains disallowed remote URL or script expression: "${unsafeHit}"`);
  }

  // Rule 2: Schema version check
  if (raw.schema !== undefined && raw.schema !== 1) {
    errors.push(`Unsupported theme schema version: ${String(raw.schema)} (expected 1)`);
  }

  const candidate = normalizeThemeWithPaperFallback(raw);

  // Rule 1b: Font stacks must only use bundled/system fonts
  if (!validateFontStack(candidate.type.ui)) {
    errors.push(`Invalid or non-bundled UI font stack: ${candidate.type.ui}`);
  }
  if (!validateFontStack(candidate.type.display)) {
    errors.push(`Invalid or non-bundled Display font stack: ${candidate.type.display}`);
  }
  if (!validateFontStack(candidate.type.mono)) {
    errors.push(`Invalid or non-bundled Mono font stack: ${candidate.type.mono}`);
  }

  // Rule 4: Size limits (tile 28..56px, dockWidth 32..260px or "auto", cardWidth 240..360px)
  const tilePx = parsePx(candidate.layout.tileSize);
  if (tilePx === null || tilePx < 28 || tilePx > 56) {
    errors.push(`tileSize (${candidate.layout.tileSize}) must be between 28px and 56px.`);
  }

  if (candidate.layout.dockWidth !== 'auto') {
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

  // Rule 4b: Shadow room vs layout.windowPadding (offsetY + blur <= windowPadding)
  const windowPaddingRaw = candidate.layout.windowPadding;
  const windowPaddingPx = parsePx(
    typeof windowPaddingRaw === 'number' ? `${windowPaddingRaw}px` : String(windowPaddingRaw)
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

  // Rule 4c: Glass tokens validation (if glass group is present)
  if (candidate.glass) {
    if (!['wallpaper-sampled', 'flat', 'css-only'].includes(candidate.glass.mode)) {
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

  // Rule 3: Contrast check on load (4.5:1 minimum for text/surface, textMuted/surface, accentInk/accent)
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
    errors.push('One or more required color tokens could not be parsed.');
  } else {
    const textDockRatio = contrastRatio(textColor, dockSurface);
    if (textDockRatio < 4.5) {
      failingPairs.push({
        pair: 'text on dockBg',
        foreground: candidate.color.text,
        background: candidate.surface.dockBg,
        ratio: Number(textDockRatio.toFixed(2)),
        required: 4.5,
      });
    }

    const textCardRatio = contrastRatio(textColor, cardSurface);
    if (textCardRatio < 4.5) {
      failingPairs.push({
        pair: 'text on cardBg',
        foreground: candidate.color.text,
        background: candidate.surface.cardBg,
        ratio: Number(textCardRatio.toFixed(2)),
        required: 4.5,
      });
    }

    const mutedDockRatio = contrastRatio(textMutedColor, dockSurface);
    if (mutedDockRatio < 4.5) {
      failingPairs.push({
        pair: 'textMuted on dockBg',
        foreground: candidate.color.textMuted,
        background: candidate.surface.dockBg,
        ratio: Number(mutedDockRatio.toFixed(2)),
        required: 4.5,
      });
    }

    const mutedCardRatio = contrastRatio(textMutedColor, cardSurface);
    if (mutedCardRatio < 4.5) {
      failingPairs.push({
        pair: 'textMuted on cardBg',
        foreground: candidate.color.textMuted,
        background: candidate.surface.cardBg,
        ratio: Number(mutedCardRatio.toFixed(2)),
        required: 4.5,
      });
    }

    // Check accentInk on accent (or active gradient surface if theme uses tileActiveBg gradient for active pills)
    let effectiveAccentRatio = contrastRatio(accentInkColor, accentColor);
    if (effectiveAccentRatio < 4.5 && candidate.color.tileActiveBg.startsWith('linear-gradient')) {
      const gradStop = parseColor(candidate.color.tileActiveBg);
      if (gradStop) {
        effectiveAccentRatio = Math.max(effectiveAccentRatio, contrastRatio(accentInkColor, gradStop));
      }
    }
    if (effectiveAccentRatio < 4.5) {
      failingPairs.push({
        pair: 'accentInk on accent',
        foreground: candidate.color.accentInk,
        background: candidate.color.accent,
        ratio: Number(effectiveAccentRatio.toFixed(2)),
        required: 4.5,
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
      failingPairs,
    };
  }

  return {
    valid: true,
    theme: candidate,
    fellBackToPaper: false,
    errors: [],
    failingPairs: [],
  };
}
