export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Parse hex (#rgb, #rrggbb), rgb(r,g,b), rgba(r,g,b,a), or extract first stop from linear-gradient.
 */
export function parseColor(input: string): RGBA | null {
  if (!input || typeof input !== 'string') return null;
  const s = input.trim();

  if (s.startsWith('linear-gradient')) {
    const hexMatches = s.match(/#[0-9a-fA-F]{3,6}/g);
    if (hexMatches && hexMatches.length > 0) {
      return parseColor(hexMatches[0]);
    }
  }

  if (s.startsWith('#')) {
    let hex = s.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    if (hex.length === 6 && /^[0-9a-fA-F]{6}$/.test(hex)) {
      const num = parseInt(hex, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
        a: 1,
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
      a: rgbaMatch[4] !== undefined ? Math.min(1, Math.max(0, Number(rgbaMatch[4]))) : 1,
    };
  }

  return null;
}

/**
 * Alpha-composite foreground RGBA over an opaque background RGBA.
 */
export function compositeOver(fg: RGBA, bg: RGBA): RGBA {
  const a = fg.a;
  return {
    r: Math.round(fg.r * a + bg.r * (1 - a)),
    g: Math.round(fg.g * a + bg.g * (1 - a)),
    b: Math.round(fg.b * a + bg.b * (1 - a)),
    a: 1,
  };
}

/**
 * Compute WCAG 2.1 relative luminance for an opaque RGB color.
 */
export function relativeLuminance(color: RGBA): number {
  const toLinear = (c: number): number => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const R = toLinear(color.r);
  const G = toLinear(color.g);
  const B = toLinear(color.b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Compute WCAG 2.1 contrast ratio between two opaque colors (returns 1..21).
 */
export function contrastRatio(c1: RGBA, c2: RGBA): number {
  const l1 = relativeLuminance(c1);
  const l2 = relativeLuminance(c2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Resolve a potentially translucent surface color against a solid fallback background.
 */
export function resolveOpaqueSurface(
  surfaceStr: string,
  solidFallbackStr?: string,
  mode: 'light' | 'dark' = 'light'
): RGBA | null {
  const defaultBackdrop: RGBA =
    mode === 'dark' ? { r: 14, g: 18, b: 24, a: 1 } : { r: 251, g: 250, b: 247, a: 1 };
  const fallback = (solidFallbackStr && parseColor(solidFallbackStr)) || defaultBackdrop;
  const parsed = parseColor(surfaceStr);
  if (!parsed) return null;
  if (parsed.a < 1) {
    return compositeOver(parsed, fallback);
  }
  return parsed;
}

/**
 * Given a new hex accent color, pick the highest-contrast ink (#ffffff or #04100a)
 * and generate accentSoft and accentLine tokens.
 */
export function deriveAccentTokens(accentHex: string, preferredInk?: string): {
  accent: string;
  accentInk: string;
  accentSoft: string;
  accentLine: string;
  focusRing: string;
  contrast: number;
} | null {
  const parsed = parseColor(accentHex);
  if (!parsed) return null;

  const white: RGBA = { r: 255, g: 255, b: 255, a: 1 };
  const darkInk: RGBA = { r: 10, g: 16, b: 20, a: 1 };

  let inkHex = '#ffffff';
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
          inkHex = '#0a1014';
          bestRatio = darkRatio;
        }
      }
    }
  } else {
    const darkRatio = contrastRatio(darkInk, parsed);
    if (darkRatio > bestRatio) {
      inkHex = '#0a1014';
      bestRatio = darkRatio;
    }
  }

  return {
    accent: accentHex,
    accentInk: inkHex,
    accentSoft: `rgba(${parsed.r},${parsed.g},${parsed.b},0.14)`,
    accentLine: `rgba(${parsed.r},${parsed.g},${parsed.b},0.38)`,
    focusRing: accentHex,
    contrast: bestRatio,
  };
}

