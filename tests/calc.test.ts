import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateExpression } from '../src/ui/calc.ts';

test('evaluateExpression arithmetic, precedence, and functions', () => {
  assert.equal(evaluateExpression('120 * 1.18'), '141.6');
  assert.equal(evaluateExpression('sqrt(256) * 4'), '64');
  assert.equal(evaluateExpression('2 ^ 3 ^ 2'), '512');
  assert.equal(evaluateExpression('-3 + (4 * 5) / 2'), '7');
  assert.equal(evaluateExpression('16 GB to MB'), '16,384 MB');
  assert.equal(evaluateExpression('15% of 240'), '36');
  assert.equal(evaluateExpression('log(1000)'), '3');
});

test('evaluateExpression rejects non-math identifiers without dynamic eval', () => {
  assert.equal(evaluateExpression('this'), '...');
  assert.equal(evaluateExpression('constructor'), '...');
  assert.equal(evaluateExpression('process.exit(1)'), '...');
  assert.equal(evaluateExpression('alert(1)'), '...');
});
