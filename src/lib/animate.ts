import {interpolate, Easing} from 'remotion';

// Extracted from the repeated inline `interpolate(t, [a, a+16], [0,1], {...})`
// pattern hand-rolled in ChapterTitle, HookConsequenceOverlay, and every
// Resume*Diagram component. Same math, one place — new components get
// shorter, and a timing tweak here doesn't require touching six files.
//
// Convention: `t` is frame count already relative to the scene/component's
// own start (i.e. `useCurrentFrame() - startFrame`, not the raw timeline frame).

const clampOpts = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** 0 -> 1 opacity ramp starting at `at`, over `dur` frames (default 16). */
export function fadeIn(t: number, at: number, dur = 16): number {
  return interpolate(t, [at, at + dur], [0, 1], clampOpts);
}

/** 1 -> 0 opacity ramp starting at `at`, over `dur` frames. */
export function fadeOut(t: number, at: number, dur = 16): number {
  return interpolate(t, [at, at + dur], [1, 0], clampOpts);
}

/**
 * Vertical rise-in offset (px) starting at `at`, over `dur` frames.
 * Returns the translateY value — 0 once settled. Pair with fadeIn using the
 * same `at`/`dur` for the standard "fade + rise" reveal used throughout.
 */
export function riseIn(t: number, at: number, dur = 16, distance = 14): number {
  return interpolate(t, [at, at + dur], [distance, 0], clampOpts);
}

/** Horizontal slide-in offset (px) starting at `at`, over `dur` frames. Positive `distance` starts from the right. */
export function slideIn(t: number, at: number, dur = 16, distance = -30): number {
  return interpolate(t, [at, at + dur], [distance, 0], clampOpts);
}

/** Scale-in from `from` (default 0.9) to 1, starting at `at`. */
export function scaleIn(t: number, at: number, dur = 16, from = 0.9): number {
  return interpolate(t, [at, at + dur], [from, 1], clampOpts);
}

/** Width/progress ramp 0 -> `to` (default 100), for bars and underlines. */
export function growIn(t: number, at: number, dur = 16, to = 100): number {
  return interpolate(t, [at, at + dur], [0, to], clampOpts);
}

/** Fade in, hold, fade out — for beats with a fixed hold duration (end cards, etc). */
export function fadeInHold(
  t: number,
  at: number,
  holdDur: number,
  fadeDur = 16
): number {
  return interpolate(
    t,
    [at, at + fadeDur, at + fadeDur + holdDur, at + fadeDur * 2 + holdDur],
    [0, 1, 1, 0],
    clampOpts
  );
}

/** Gentle continuous pulse (e.g. for an "active" agent core), amplitude in scale units. */
export function pulse(t: number, amplitude = 0.015, speed = 10): number {
  return 1 + Math.sin(t / speed) * amplitude;
}

/**
 * Reveal times for a staggered list — item `i` of a set becomes visible at
 * `start + i * stagger`. Returns just the frame number; pass into fadeIn/riseIn.
 */
export function staggerAt(index: number, start: number, stagger = 14): number {
  return start + index * stagger;
}

/** Ease-out variant of fadeIn for a snappier settle on emphasized elements. */
export function fadeInEased(t: number, at: number, dur = 16): number {
  return interpolate(t, [at, at + dur], [0, 1], {
    ...clampOpts,
    easing: Easing.out(Easing.cubic),
  });
}
