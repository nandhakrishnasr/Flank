/**
 * macOS-style Dock Magnification on Hover (Step 5)
 * Spring-driven distance-based icon scaling matching tokens:
 * - Spring stiffness = 300, damping = 24
 * - Max scale = 1.25 for tile under cursor, ~1.12 for neighbours, ~1.04 for next ones
 * - Edge-anchored transform origin (right center on right edge, left center on left edge)
 *   so tiles expand into the screen interior and never push past the dock boundary.
 * - Run on requestAnimationFrame without layout thrash (transform only).
 * - Fully disabled under reduced motion.
 */

interface SpringTileState {
  el: HTMLElement;
  currentScale: number;
  targetScale: number;
  velocity: number;
}

let activeDockEl: HTMLElement | null = null;
let tileStates: SpringTileState[] = [];
let animFrameId: number | null = null;
let lastTimestamp: number = 0;
let dockEdge: 'left' | 'right' = 'right';

const SPRING_STIFFNESS = 300;
const SPRING_DAMPING = 24;
const MAX_SCALE = 1.25;
const DISTANCE_THRESHOLD = 112; // px threshold (covers ~2 neighbours each side)

function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.getAttribute('data-reduced-motion') === 'true' ||
    document.documentElement.getAttribute('data-reduce-motion') === 'true'
  );
}

function updateSprings(timestamp: number): void {
  if (isReducedMotion()) {
    resetDockMagnification();
    return;
  }

  if (!lastTimestamp) lastTimestamp = timestamp;
  const dt = Math.min(0.032, (timestamp - lastTimestamp) / 1000);
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

    if (Math.abs(displacement) > 0.001 || Math.abs(item.velocity) > 0.001) {
      isAnyMoving = true;
      const s = item.currentScale.toFixed(3);
      item.el.style.transform = `scale(${s}) translateZ(0)`;
      item.el.style.zIndex = item.currentScale > 1.04 ? '12' : '';
    } else {
      item.currentScale = item.targetScale;
      item.velocity = 0;
      if (item.targetScale === 1.0) {
        item.el.style.transform = '';
        item.el.style.zIndex = '';
      } else {
        const s = item.targetScale.toFixed(3);
        item.el.style.transform = `scale(${s}) translateZ(0)`;
        item.el.style.zIndex = item.targetScale > 1.04 ? '12' : '';
      }
    }
  }

  if (isAnyMoving) {
    animFrameId = requestAnimationFrame(updateSprings);
  } else {
    animFrameId = null;
  }
}

function startSpringLoop(): void {
  if (animFrameId === null) {
    lastTimestamp = performance.now();
    animFrameId = requestAnimationFrame(updateSprings);
  }
}

/**
 * Computes target scale based on vertical distance:
 * - dist = 0: 1.25
 * - dist = 44px (1 neighbour): ~1.12
 * - dist = 88px (2 neighbours): ~1.04
 * - dist >= 112px: 1.0
 */
function calculateTargetScale(mouseCoord: number, tileCenter: number): number {
  const dist = Math.abs(mouseCoord - tileCenter);
  if (dist >= DISTANCE_THRESHOLD) return 1.0;
  // Gaussian curve matching 1.25 -> 1.13 -> 1.03 -> 1.0 falloff
  const factor = Math.exp(-(dist * dist) / 3200);
  const scale = 1.0 + (MAX_SCALE - 1.0) * factor;
  return scale < 1.01 ? 1.0 : scale;
}

export function attachDockMagnification(dockEl: HTMLElement, edge: 'left' | 'right' = 'right'): void {
  if (activeDockEl === dockEl && dockEdge === edge) return;
  resetDockMagnification();
  activeDockEl = dockEl;
  dockEdge = edge;

  const tiles = Array.from(dockEl.querySelectorAll<HTMLElement>('.flank-tile'));
  const origin = edge === 'left' ? 'left center' : 'right center';

  tileStates = tiles.map((el) => {
    // Scale strictly from the screen edge toward the interior
    el.style.transformOrigin = origin;
    return {
      el,
      currentScale: 1.0,
      targetScale: 1.0,
      velocity: 0,
    };
  });

  const onPointerMove = (e: PointerEvent): void => {
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

  const onPointerLeave = (): void => {
    for (const item of tileStates) {
      item.targetScale = 1.0;
    }
    startSpringLoop();
  };

  dockEl.removeEventListener('pointermove', onPointerMove as EventListener);
  dockEl.removeEventListener('pointerleave', onPointerLeave as EventListener);

  dockEl.addEventListener('pointermove', onPointerMove, { passive: true });
  dockEl.addEventListener('pointerleave', onPointerLeave, { passive: true });
}

export function resetDockMagnification(): void {
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
  for (const item of tileStates) {
    item.el.style.transform = '';
    item.el.style.zIndex = '';
    item.currentScale = 1.0;
    item.targetScale = 1.0;
    item.velocity = 0;
  }
  tileStates = [];
  activeDockEl = null;
}

