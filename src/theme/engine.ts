import { BUNDLED_THEMES, type FlankTheme, PAPER_THEME } from './schema.ts';
import { deriveAccentTokens } from './contrast.ts';
import { flattenThemeToCssVars } from './flattener.ts';
import { validateTheme, type ValidationResult } from './validator.ts';

export interface ThemeLogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  details?: unknown;
}

export class ThemeEngine {
  private currentTheme: FlankTheme = structuredClone(PAPER_THEME);
  private customThemes: Map<string, FlankTheme> = new Map();
  private logs: ThemeLogEntry[] = [];
  private listeners: Array<(theme: FlankTheme, vars: Record<string, string>) => void> = [];

  constructor() {
    // Validate and register all 5 bundled themes on initialization
    for (const [id, raw] of Object.entries(BUNDLED_THEMES)) {
      const res = validateTheme(raw);
      if (res.valid) {
        this.customThemes.set(id, res.theme);
      } else {
        this.log('error', `Bundled theme "${id}" failed validation; using Paper fallback.`, res.errors);
      }
    }
  }

  private log(level: 'info' | 'warn' | 'error', message: string, details?: unknown): void {
    const entry: ThemeLogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      details,
    };
    this.logs.push(entry);
    if (this.logs.length > 100) {
      this.logs.shift();
    }
  }

  public getLogs(): ThemeLogEntry[] {
    return [...this.logs];
  }

  public getAvailableThemes(): FlankTheme[] {
    return Array.from(this.customThemes.values());
  }

  public getCurrentTheme(): FlankTheme {
    return this.currentTheme;
  }

  public getCurrentCssVars(): Record<string, string> {
    return flattenThemeToCssVars(this.currentTheme);
  }

  public onChange(cb: (theme: FlankTheme, vars: Record<string, string>) => void): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  /**
   * Load and validate an external or bundled theme JSON object.
   * On any validation or contrast failure, silently falls back to Paper and logs locally.
   */
  public applyThemeObject(
    rawTheme: unknown,
    overrides?: { edge?: 'left' | 'right'; accent?: string }
  ): ValidationResult {
    const candidate = structuredClone(rawTheme) as Record<string, any>;
    if (candidate && typeof candidate === 'object') {
      let edgeOverride = overrides?.edge as string | undefined;
      if (edgeOverride === 'top') {
        edgeOverride = 'right';
      }
      if (edgeOverride && ['left', 'right'].includes(edgeOverride)) {
        candidate.layout = { ...(candidate.layout || {}), edge: edgeOverride as 'left' | 'right', orientation: 'vertical' };
      }
      if (overrides?.accent) {
        const derived = deriveAccentTokens(overrides.accent);
        if (derived) {
          candidate.color = {
            ...(candidate.color || {}),
            accent: derived.accent,
            accentInk: derived.accentInk,
            accentSoft: derived.accentSoft,
            accentLine: derived.accentLine,
            focusRing: derived.focusRing,
          };
        }
      }
    }

    const res = validateTheme(candidate);
    if (!res.valid) {
      this.log('warn', `Theme validation failed; falling back to Paper.`, {
        errors: res.errors,
        failingPairs: res.failingPairs,
      });
    } else {
      this.customThemes.set(res.theme.id, res.theme);
      this.log('info', `Applied theme "${res.theme.name}" (${res.theme.id}).`);
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
  public switchTheme(
    themeId: string,
    overrides?: { edge?: 'left' | 'right'; accent?: string }
  ): ValidationResult {
    const normalizedId = themeId.replace(/_/g, '-');
    const base =
      this.customThemes.get(themeId) ??
      this.customThemes.get(normalizedId) ??
      BUNDLED_THEMES[themeId] ??
      BUNDLED_THEMES[normalizedId];
    if (!base) {
      this.log('warn', `Unknown theme ID "${themeId}"; falling back to Paper.`);
      return this.applyThemeObject(PAPER_THEME, overrides);
    }
    return this.applyThemeObject(base, overrides);
  }

  /**
   * Revert immediately to the default Paper theme.
   */
  public revertToPaper(): ValidationResult {
    return this.applyThemeObject(PAPER_THEME);
  }

  /**
   * Write `--flank-<group>-<token>` CSS custom properties directly onto target element (defaults to document.documentElement).
   */
  public writeToDom(
    theme: FlankTheme = this.currentTheme,
    vars: Record<string, string> = flattenThemeToCssVars(theme),
    rootEl?: HTMLElement | null
  ): void {
    const el = rootEl ?? (typeof document !== 'undefined' ? document.documentElement : null);
    if (!el) return;

    el.setAttribute('data-theme', theme.id);
    el.setAttribute('data-mode', theme.mode);
    el.setAttribute('data-edge', theme.layout.edge);
    el.setAttribute('data-orientation', theme.layout.orientation);
    el.setAttribute('data-shape', theme.layout.shape);
    el.setAttribute('data-widget-style', theme.layout.widgetStyle);
    el.setAttribute('data-labels', theme.layout.labels ? 'true' : 'false');

    // Clear previous --flank-* custom properties so optional tokens from previous themes do not leak
    const style = el.style;
    const toRemove: string[] = [];
    for (let i = 0; i < style.length; i++) {
      const prop = style.item(i);
      if (prop && prop.startsWith('--flank-')) {
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
}
