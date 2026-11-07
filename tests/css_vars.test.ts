import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

describe('Flank CSS Custom Properties (Design Tokens)', () => {
  it('reports zero undefined or cyclic CSS variables across CSS, TS and Themes', () => {
    const scriptPath = path.resolve('scripts', 'check_css_vars.py');
    const res = spawnSync('python', [scriptPath], { encoding: 'utf-8' });
    assert.equal(
      res.status,
      0,
      `check_css_vars.py failed (exit ${res.status}):\n${res.stdout}\n${res.stderr}`
    );
  });
});
