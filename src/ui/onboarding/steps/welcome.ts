export function renderWelcomeStepHtml(): string {
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
