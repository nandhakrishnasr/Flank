/**
 * Smart Calculator & Unit Converter Engine for Flank
 * Safely evaluates arithmetic expressions and natural language unit conversions.
 */

export function evaluateExpression(expr: string): string {
  const trimmed = expr.trim();
  if (!trimmed) return '0';

  // 1. Check for Unit Conversions: "X unit1 to unit2" or "X unit1 in unit2"
  const convMatch = trimmed.match(/^([\d.]+)\s*([a-zA-Z°]+)\s+(?:to|in)\s+([a-zA-Z°]+)$/i);
  if (convMatch) {
    const val = parseFloat(convMatch[1]);
    const fromUnit = convMatch[2].toLowerCase();
    const toUnit = convMatch[3].toLowerCase();

    if (!isNaN(val)) {
      // Digital Storage
      if (fromUnit === 'gb' && toUnit === 'mb') return `${formatNum(val * 1024)} MB`;
      if (fromUnit === 'mb' && toUnit === 'gb') return `${formatNum(val / 1024)} GB`;
      if (fromUnit === 'tb' && toUnit === 'gb') return `${formatNum(val * 1024)} GB`;
      if (fromUnit === 'mb' && toUnit === 'kb') return `${formatNum(val * 1024)} KB`;
      if (fromUnit === 'kb' && toUnit === 'mb') return `${formatNum(val / 1024)} MB`;

      // Temperature
      if (fromUnit === 'c' && toUnit === 'f') return `${formatNum((val * 9) / 5 + 32)}°F`;
      if (fromUnit === 'f' && toUnit === 'c') return `${formatNum(((val - 32) * 5) / 9)}°C`;

      // Distance
      if (fromUnit === 'km' && toUnit === 'mi') return `${formatNum(val * 0.621371)} mi`;
      if (fromUnit === 'mi' && toUnit === 'km') return `${formatNum(val * 1.60934)} km`;
      if (fromUnit === 'm' && toUnit === 'ft') return `${formatNum(val * 3.28084)} ft`;
      if (fromUnit === 'ft' && toUnit === 'm') return `${formatNum(val / 3.28084)} m`;
      if (fromUnit === 'cm' && toUnit === 'in') return `${formatNum(val / 2.54)} in`;
      if (fromUnit === 'in' && toUnit === 'cm') return `${formatNum(val * 2.54)} cm`;

      // Weight
      if (fromUnit === 'kg' && toUnit === 'lb') return `${formatNum(val * 2.20462)} lb`;
      if (fromUnit === 'lb' && toUnit === 'kg') return `${formatNum(val / 2.20462)} kg`;
      if (fromUnit === 'g' && toUnit === 'oz') return `${formatNum(val * 0.035274)} oz`;

      // Currency approximations
      if (fromUnit === 'usd' && toUnit === 'eur') return `€ ${formatNum(val * 0.92)}`;
      if (fromUnit === 'eur' && toUnit === 'usd') return `$ ${formatNum(val * 1.09)}`;
      if (fromUnit === 'usd' && toUnit === 'inr') return `₹ ${formatNum(val * 85.5)}`;
      if (fromUnit === 'inr' && toUnit === 'usd') return `$ ${formatNum(val / 85.5)}`;
      if (fromUnit === 'gbp' && toUnit === 'usd') return `$ ${formatNum(val * 1.28)}`;
    }
  }

  // 2. Check for Percentage: "X% of Y"
  const pctOfMatch = trimmed.match(/^([\d.]+)\s*%\s+of\s+([\d.]+)$/i);
  if (pctOfMatch) {
    const pct = parseFloat(pctOfMatch[1]);
    const base = parseFloat(pctOfMatch[2]);
    if (!isNaN(pct) && !isNaN(base)) {
      return formatNum((pct / 100) * base);
    }
  }

  // 3. Mathematical Expression Evaluator
  try {
    // Sanitize and replace math functions
    let sanitized = trimmed
      .replace(/\^/g, '**')
      .replace(/sqrt\(/gi, 'Math.sqrt(')
      .replace(/cbrt\(/gi, 'Math.cbrt(')
      .replace(/sin\(/gi, 'Math.sin(')
      .replace(/cos\(/gi, 'Math.cos(')
      .replace(/tan\(/gi, 'Math.tan(')
      .replace(/abs\(/gi, 'Math.abs(')
      .replace(/log\(/gi, 'Math.log10(')
      .replace(/ln\(/gi, 'Math.log(')
      .replace(/pi/gi, 'Math.PI')
      .replace(/e(?![a-zA-Z])/gi, 'Math.E');

    // Only allow safe math tokens
    if (!/^[0-9+\-*/().,%*\sMathPIEsqrtcbsintanblg]+$/.test(sanitized)) {
      return 'Invalid';
    }

    // Evaluate in safe Function context
    const res = new Function(`"use strict"; return (${sanitized});`)();
    if (typeof res === 'number') {
      if (isNaN(res)) return 'NaN';
      if (!isFinite(res)) return 'Infinity';
      return formatNum(res);
    }
    return String(res);
  } catch {
    return '...';
  }
}

function formatNum(num: number): string {
  if (Math.abs(num) >= 1e9 || (Math.abs(num) < 1e-4 && num !== 0)) {
    return num.toExponential(4);
  }
  const rounded = Math.round(num * 10000) / 10000;
  return rounded.toLocaleString('en-US', { maximumFractionDigits: 4 });
}
