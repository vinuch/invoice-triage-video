#!/usr/bin/env tsx
/**
 * Cross-checks each timeline scene's allotted duration (derived from real
 * narration word timestamps) against how long its component's own animation
 * actually takes to finish revealing, by statically scanning the component
 * source for animate.ts primitive calls and raw interpolate() calls.
 *
 * This targets the two failure modes already hit on this project:
 *   - "audio sync drift during rendering" (invoice-triage, deferred)
 *   - "frameIn values are hand-estimated rather than derived from real word
 *      timestamps" (Episode 3, open item)
 *
 * It can't catch everything statically (a staggered reveal whose count
 * depends on a runtime array length, e.g. `jobs.length`, can't be resolved
 * without executing the component) — those are reported as "unresolved,
 * check manually" rather than silently guessed at.
 *
 * Usage:
 *   npx tsx scripts/check-scene-timing.ts src/data/timeline/episode01.ts
 *   npx tsx scripts/check-scene-timing.ts src/compositions/FinalVideoBuild21.tsx
 *
 * Exit code is non-zero if any scene has a clear overrun (component still
 * animating in when the scene's Sequence would already have cut away).
 */
import fs from 'fs';
import path from 'path';
import {FPS} from '../src/design-tokens';

type SceneTiming = {
  id: string;
  component: string;
  durationInFrames: number;
};

type ComponentEstimate = {
  maxFrame: number | null;
  hasUnresolvedDynamicReveal: boolean;
  fileFound: boolean;
  hasOnlyComputedArgs: boolean;
};

const COMPONENTS_DIR = path.resolve('src/components');
const OVERRUN_THRESHOLD = 1.0; // component's last reveal frame > scene duration
const UNDERRUN_THRESHOLD = 0.5; // component finishes revealing before this fraction of the scene

// --- Extract scenes from either a TimelineScene[] file (startSec/endSec) or
// a Sequence-based composition file (durationInFrames literals in a `beats` array,
// as in FinalVideoBuild21.tsx) ---
function extractScenesFromTimelineFile(source: string): SceneTiming[] {
  const scenes: SceneTiming[] = [];
  const sceneBlockRe = /\{\s*"id":\s*"([^"]+)"[\s\S]*?"component":\s*"([^"]+)"[\s\S]*?"startSec":\s*([\d.]+)[\s\S]*?"endSec":\s*([\d.]+)/g;
  let m: RegExpExecArray | null;
  while ((m = sceneBlockRe.exec(source))) {
    const [, id, component, startSec, endSec] = m;
    scenes.push({
      id,
      component,
      durationInFrames: Math.round((parseFloat(endSec) - parseFloat(startSec)) * FPS),
    });
  }
  return scenes;
}

function extractScenesFromBeatsFile(source: string): SceneTiming[] {
  const scenes: SceneTiming[] = [];

  // Resolve simple `const NAME = 90;` declarations so durationInFrames can
  // reference a named constant (as FinalVideoBuild21.tsx's CHAPTER_DURATION
  // does) instead of only recognizing inline numeric literals. Without this,
  // every beat using the constant is silently dropped rather than checked —
  // that actually happened while building this tool.
  const constants = new Map<string, number>();
  const constRe = /const\s+(\w+)\s*=\s*(\d+)\s*;/g;
  let cm: RegExpExecArray | null;
  while ((cm = constRe.exec(source))) {
    constants.set(cm[1], parseInt(cm[2], 10));
  }

  const beatStartRe = /\{\s*id:\s*'([^']+)'/g;
  const starts: {index: number; id: string}[] = [];
  let m: RegExpExecArray | null;
  while ((m = beatStartRe.exec(source))) {
    starts.push({index: m.index, id: m[1]});
  }

  for (let i = 0; i < starts.length; i++) {
    const chunkStart = starts[i].index;
    const chunkEnd = i + 1 < starts.length ? starts[i + 1].index : source.length;
    const chunk = source.slice(chunkStart, chunkEnd);

    const componentMatch = chunk.match(/node:\s*(?:\(\s*)?<(\w+)/);
    if (!componentMatch) continue;

    const durLiteral = chunk.match(/durationInFrames:\s*(\d+)/);
    const durIdent = chunk.match(/durationInFrames:\s*(\w+)/);

    let durationInFrames: number | undefined;
    if (durLiteral) {
      durationInFrames = parseInt(durLiteral[1], 10);
    } else if (durIdent && constants.has(durIdent[1])) {
      durationInFrames = constants.get(durIdent[1]);
    }

    if (durationInFrames === undefined) {
      console.log(
        `  ?  ${starts[i].id.padEnd(28)} durationInFrames not resolvable statically ` +
          `(not a literal or a recognized top-level const) — skipped, check manually`
      );
      continue;
    }

    scenes.push({id: starts[i].id, component: componentMatch[1], durationInFrames});
  }
  return scenes;
}

function extractScenes(filePath: string): SceneTiming[] {
  const source = fs.readFileSync(filePath, 'utf-8');
  if (source.includes('"startSec"')) return extractScenesFromTimelineFile(source);
  if (source.includes('durationInFrames:')) return extractScenesFromBeatsFile(source);
  throw new Error(
    `Don't recognize ${filePath} as either a TimelineScene[] file or a beats-array composition file.`
  );
}

// --- Estimate how many frames a component's own reveal animation needs ---
function findComponentFile(componentName: string): string | null {
  const guess = path.join(COMPONENTS_DIR, `${componentName}.tsx`);
  if (fs.existsSync(guess)) return guess;
  return null;
}

function estimateComponentDuration(componentName: string): ComponentEstimate {
  const file = findComponentFile(componentName);
  if (!file) return {maxFrame: null, hasUnresolvedDynamicReveal: false, fileFound: false, hasOnlyComputedArgs: false};

  const source = fs.readFileSync(file, 'utf-8');
  let maxFrame = 0;
  let hasUnresolvedDynamicReveal = false;

  // animate.ts primitives: fadeIn/riseIn/slideIn/growIn/scaleIn/fadeInEased(t, AT, DUR?)
  const primitiveRe =
    /\b(?:fadeIn|riseIn|slideIn|growIn|scaleIn|fadeInEased)\(\s*t\s*,\s*(\d+)\s*(?:,\s*(\d+))?/g;
  let m: RegExpExecArray | null;
  while ((m = primitiveRe.exec(source))) {
    const at = parseInt(m[1], 10);
    const dur = m[2] ? parseInt(m[2], 10) : 16; // matches animate.ts defaults
    maxFrame = Math.max(maxFrame, at + dur);
  }

  // fadeInHold(t, AT, HOLD, FADE=16) -> ends at AT + FADE*2 + HOLD
  const holdRe = /\bfadeInHold\(\s*t\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+))?/g;
  while ((m = holdRe.exec(source))) {
    const at = parseInt(m[1], 10);
    const hold = parseInt(m[2], 10);
    const fade = m[3] ? parseInt(m[3], 10) : 16;
    maxFrame = Math.max(maxFrame, at + fade * 2 + hold);
  }

  // Raw interpolate(t, [A, B], ...) calls with numeric literals
  const interpolateRe = /interpolate\(\s*t\s*,\s*\[\s*(\d+)\s*,\s*(\d+)\s*\]/g;
  while ((m = interpolateRe.exec(source))) {
    maxFrame = Math.max(maxFrame, parseInt(m[2], 10));
  }

  // Locally-defined reveal/rise-style closures — the dominant pattern in
  // this codebase (ChapterTitle, HookConsequenceOverlay, and every
  // Resume*Diagram except ResumeMismatchDiagram define their own
  // `const reveal = (at, dur = 16) => interpolate(t, [at, at + dur], ...)`
  // instead of calling animate.ts directly). A literal interpolate() scan
  // can't see through these — the call sites only pass `at`, with `t` and
  // `dur` closed over — so resolve them as a second pass: find each local
  // helper's default `dur`, then find its call sites.
  let foundLocalHelper = false;
  let helperHasOnlyComputedArgs = false;
  const localHelperRe = /const\s+(\w+)\s*=\s*\(\s*\w+(?::\s*number)?\s*,?\s*(?:\w+(?::\s*number)?\s*=\s*(\d+))?\s*\)\s*=>\s*interpolate\(\s*t\s*,/g;
  while ((m = localHelperRe.exec(source))) {
    foundLocalHelper = true;
    const helperName = m[1];
    const defaultDur = m[2] ? parseInt(m[2], 10) : 0;

    const callRe = new RegExp(`\\b${helperName}\\(\\s*(\\d+)\\s*(?:,\\s*(\\d+))?`, 'g');
    let cm: RegExpExecArray | null;
    let helperResolvedAnyCall = false;
    while ((cm = callRe.exec(source))) {
      helperResolvedAnyCall = true;
      const at = parseInt(cm[1], 10);
      const dur = cm[2] ? parseInt(cm[2], 10) : defaultDur;
      maxFrame = Math.max(maxFrame, at + dur);
    }
    // The helper exists but every call site passes a computed variable
    // (e.g. `reveal(gapsStart)` where gapsStart = rowStart + n * rowStagger)
    // rather than a literal — genuinely unresolvable without evaluating the
    // component, not a "no pattern found" case.
    if (!helperResolvedAnyCall) helperHasOnlyComputedArgs = true;
  }

  // Detect staggered reveals we can't fully resolve statically (array.length
  // driving a variable number of staggered items) — flag rather than guess.
  if (/staggerAt\(\s*i\s*,/.test(source) || /\w+Start\s*\+\s*i\s*\*\s*\w+/.test(source)) {
    hasUnresolvedDynamicReveal = true;
  }

  return {
    maxFrame: maxFrame > 0 ? maxFrame : null,
    hasUnresolvedDynamicReveal,
    fileFound: true,
    hasOnlyComputedArgs: foundLocalHelper && helperHasOnlyComputedArgs,
  };
}

function main() {
  const target = process.argv[2];
  if (!target) {
    console.error('Usage: tsx scripts/check-scene-timing.ts <timeline-or-composition-file>');
    process.exit(1);
  }

  const scenes = extractScenes(path.resolve(target));
  if (scenes.length === 0) {
    console.error(`No scenes recognized in ${target} — check the file format.`);
    process.exit(1);
  }

  console.log(`Checking ${scenes.length} scene(s) from ${target}\n`);

  let overrunCount = 0;

  for (const scene of scenes) {
    const {maxFrame, hasUnresolvedDynamicReveal, fileFound, hasOnlyComputedArgs} =
      estimateComponentDuration(scene.component);

    if (!fileFound) {
      console.log(`  ?  ${scene.id.padEnd(28)} ${scene.component} — component file not found in src/components/, skipped`);
      continue;
    }

    if (maxFrame === null) {
      if (hasOnlyComputedArgs) {
        console.log(
          `  ?  ${scene.id.padEnd(28)} ${scene.component} — found a local reveal/rise ` +
            `helper, but every call site passes a computed variable (e.g. ` +
            `\`reveal(gapsStart)\` where gapsStart is derived from earlier values), ` +
            `not a literal — can't resolve statically without evaluating the component. Check manually.`
        );
      } else {
        console.log(
          `  ?  ${scene.id.padEnd(28)} ${scene.component} — no recognizable ` +
            `reveal pattern (animate.ts primitive, raw interpolate(), or local reveal/rise ` +
            `closure) detected — likely a static component, or uses a pattern this tool ` +
            `doesn't parse yet. Check manually.`
        );
      }
      continue;
    }

    const ratio = maxFrame / scene.durationInFrames;
    const flagOverrun = ratio > OVERRUN_THRESHOLD;
    const flagUnderrun = ratio < UNDERRUN_THRESHOLD;
    const caveat = hasUnresolvedDynamicReveal ? ' (has a dynamic/staggered reveal — verify manually)' : '';

    if (flagOverrun) {
      overrunCount++;
      console.log(
        `  ✕ OVERRUN  ${scene.id.padEnd(28)} ${scene.component} — animates to frame ${maxFrame}, ` +
          `scene is only ${scene.durationInFrames}f (cuts away mid-animation)${caveat}`
      );
    } else if (flagUnderrun) {
      console.log(
        `  ! DEAD AIR ${scene.id.padEnd(28)} ${scene.component} — finishes revealing at frame ${maxFrame} ` +
          `of ${scene.durationInFrames}f (${Math.round(ratio * 100)}%), rest is static${caveat}`
      );
    } else {
      console.log(
        `  ✓ OK       ${scene.id.padEnd(28)} ${scene.component} — ${maxFrame}/${scene.durationInFrames}f${caveat}`
      );
    }
  }

  console.log('');
  if (overrunCount > 0) {
    console.log(`${overrunCount} scene(s) with a clear overrun — component is still animating in when the scene cuts.`);
    process.exit(1);
  }
  console.log('No clear overruns detected.');
}

main();
