/**
 * Smart Calculator & Unit Converter Engine for Flank
 * Safely evaluates arithmetic expressions and natural language unit conversions.
 */

function evalSafeMathExpr(expr: string): number {
  let pos = 0;

  const skipWs = (): void => {
    while (pos < expr.length && /\s/.test(expr[pos])) pos++;
  };

  const parseExpr = (): number => {
    let val = parseTerm();
    while (true) {
      skipWs();
      const ch = expr[pos];
      if (ch === '+') {
        pos++;
        val += parseTerm();
      } else if (ch === '-') {
        pos++;
        val -= parseTerm();
      } else {
        break;
      }
    }
    return val;
  };

  const parseTerm = (): number => {
    let val = parsePower();
    while (true) {
      skipWs();
      const ch = expr[pos];
      if (ch === '*') {
        if (expr[pos + 1] === '*') break;
        pos++;
        val *= parsePower();
      } else if (ch === '/') {
        pos++;
        val /= parsePower();
      } else if (ch === '%') {
        pos++;
        val %= parsePower();
      } else {
        break;
      }
    }
    return val;
  };

  const parsePower = (): number => {
    const base = parseUnary();
    skipWs();
    if (expr[pos] === '^') {
      pos++;
      return Math.pow(base, parsePower());
    }
    if (expr[pos] === '*' && expr[pos + 1] === '*') {
      pos += 2;
      return Math.pow(base, parsePower());
    }
    return base;
  };

  const parseUnary = (): number => {
    skipWs();
    if (expr[pos] === '+') {
      pos++;
      return parseUnary();
    }
    if (expr[pos] === '-') {
      pos++;
      return -parseUnary();
    }
    return parsePrimary();
  };

  const parsePrimary = (): number => {
    skipWs();
    if (expr[pos] === '(') {
      pos++;
      const inner = parseExpr();
      skipWs();
      if (expr[pos] !== ')') throw new Error('Unbalanced parentheses');
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
      if (name === 'pi') return Math.PI;
      if (name === 'e') return Math.E;

      skipWs();
      if (expr[pos] !== '(') throw new Error(`Unknown identifier: ${name}`);
      pos++;
      const arg = parseExpr();
      skipWs();
      if (expr[pos] !== ')') throw new Error('Unbalanced function call');
      pos++;

      switch (name) {
        case 'sqrt': return Math.sqrt(arg);
        case 'cbrt': return Math.cbrt(arg);
        case 'sin': return Math.sin(arg);
        case 'cos': return Math.cos(arg);
        case 'tan': return Math.tan(arg);
        case 'abs': return Math.abs(arg);
        case 'log': return Math.log10(arg);
        case 'ln': return Math.log(arg);
        default: throw new Error(`Unsupported function: ${name}`);
      }
    }

    throw new Error('Unexpected token');
  };

  const result = parseExpr();
  skipWs();
  if (pos !== expr.length) {
    throw new Error('Trailing characters');
  }
  return result;
}

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

  // 3. Recursive-descent mathematical expression evaluator (no eval / new Function)
  if (!/^[0-9+\-*/().,%^\sA-Za-z]+$/.test(trimmed)) {
    return 'Invalid';
  }

  try {
    const res = evalSafeMathExpr(trimmed);
    if (isNaN(res)) return 'NaN';
    if (!isFinite(res)) return 'Infinity';
    return formatNum(res);
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
