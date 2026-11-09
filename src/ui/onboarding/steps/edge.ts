export function renderEdgeStepHtml(edge: 'left' | 'right'): string {
  const isLeft = edge === 'left';
  const isRight = edge === 'right';

  return `
    <div class="flank-ob-header flank-ob-header--edge">
      <span class="flank-ob-eyebrow">Step 2 of 5 · Screen edge</span>
      <h1 class="flank-ob-h1" tabindex="-1" id="flank-ob-step-heading">Where should Flank live?</h1>
      <p class="flank-ob-lead">Pick the edge that stays out of your way. You can switch any time in Settings.</p>
    </div>
    <div class="flank-ob-edge-grid" role="radiogroup" aria-label="Screen edge" data-ob-radiogroup="edge">
      <button type="button" class="flank-ob-edge-card" role="radio" aria-checked="${isLeft ? 'true' : 'false'}" tabindex="${isLeft ? '0' : '-1'}" data-ob-edge="left">
        <span class="flank-ob-edge-schematic">
          <i class="flank-ob-edge-bar flank-ob-edge-bar--left"></i>
        </span>
        <span class="flank-ob-edge-label-row">Left edge</span>
      </button>
      <button type="button" class="flank-ob-edge-card" role="radio" aria-checked="${isRight ? 'true' : 'false'}" tabindex="${isRight ? '0' : '-1'}" data-ob-edge="right">
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
