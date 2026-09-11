import React from 'react';
import {Sequence} from 'remotion';
import {build22Timeline} from '../data/timeline/build22';
import {TimelineComposition, timelineDurationInFrames} from '../lib/timelineComposition';
import {FocusSpotlight} from '../components/FocusSpotlight';
import {FPS} from '../design-tokens';
import {build22Captions} from '../data/captions/build22';
import {Captions} from '../components/Captions';

// Frame offset of a scene's own Sequence, computed the same way
// TimelineComposition derives it (cumulative rounded per-scene durations) so
// overlay Sequences land in perfect sync with the diagram beneath them.
function sceneFrameStart(sceneId: string): number {
  let frameCursor = 0;
  for (const scene of build22Timeline) {
    if (scene.id === sceneId) return frameCursor;
    frameCursor += Math.round((scene.endSec - scene.startSec) * FPS);
  }
  throw new Error(`sceneFrameStart: scene "${sceneId}" not found in build22Timeline`);
}

function sceneDurationFrames(sceneId: string): number {
  const scene = build22Timeline.find((s) => s.id === sceneId);
  if (!scene) throw new Error(`sceneDurationFrames: scene "${sceneId}" not found`);
  return Math.round((scene.endSec - scene.startSec) * FPS);
}

type SubBeat = {label: string; startSec: number; x: number; y: number; width: number; height: number};

// Renders a stack of FocusSpotlight Sequences over one diagram's Sequence,
// one per sub-beat, each running from its anchor word to the next beat's
// anchor (or to the end of the scene for the last one). startSec values in
// each beats[] array are ABSOLUTE (matching timestamps_build22.txt), not
// scene-relative -- converted below.
const SubBeatOverlay: React.FC<{sceneId: string; sceneStartSec: number; beats: SubBeat[]}> = ({
  sceneId,
  sceneStartSec,
  beats,
}) => {
  const from = sceneFrameStart(sceneId);
  const sceneDur = sceneDurationFrames(sceneId);
  return (
    <>
      {beats.map((beat, i) => {
        const startFrame = Math.round((beat.startSec - sceneStartSec) * FPS);
        const nextStartFrame = beats[i + 1]
          ? Math.round((beats[i + 1].startSec - sceneStartSec) * FPS)
          : sceneDur;
        return (
          <Sequence
            key={beat.label}
            from={from + startFrame}
            durationInFrames={nextStartFrame - startFrame}
          >
            <FocusSpotlight x={beat.x} y={beat.y} width={beat.width} height={beat.height} label={beat.label} />
          </Sequence>
        );
      })}
    </>
  );
};

// --- TheBuildDiagram (25.66s-47.26s): source cards named late, then Agent ---
const THE_BUILD_BEATS: SubBeat[] = [
  {label: 'Your Resume', startSec: 42.16, x: 15, y: 28, width: 16, height: 12},
  {label: 'Job Description', startSec: 42.96, x: 15, y: 46, width: 16, height: 12},
  {label: 'Company Website', startSec: 44.04, x: 15, y: 64, width: 16, height: 12},
  {label: 'Fuse + Ground', startSec: 45.48, x: 41, y: 37, width: 16, height: 19},
];

// --- ArchitectureDiagram (48.48s-187.54s): Ingestion -> Research -> Fusion -> Generation -> Grounding ---
const ARCHITECTURE_BEATS: SubBeat[] = [
  {label: 'Ingestion', startSec: 48.86, x: 21, y: 42, width: 14, height: 18},
  {label: 'Research', startSec: 77.32, x: 36, y: 42, width: 14, height: 18},
  {label: 'Fusion', startSec: 102.96, x: 50, y: 42, width: 14, height: 18},
  {label: 'Generation', startSec: 126.06, x: 64, y: 42, width: 13, height: 18},
  {label: 'Grounding', startSec: 163.52, x: 50, y: 77, width: 44, height: 11},
];

// --- BuildWalkthroughDiagram (189s-419.24s): 6 pipeline stage nodes, Progress discussed first ---
const BUILD_WALKTHROUGH_BEATS: SubBeat[] = [
  {label: '6. Progress', startSec: 190.66, x: 81, y: 44, width: 13, height: 16},
  {label: '1. Ingestion', startSec: 203.54, x: 8, y: 44, width: 13, height: 16},
  {label: '2. Research', startSec: 258.16, x: 22, y: 44, width: 13, height: 16},
  {label: '3. Fusion', startSec: 289.70, x: 37, y: 44, width: 13, height: 16},
  {label: '4. Generation', startSec: 321.32, x: 52, y: 44, width: 13, height: 16},
  {label: '5. Grounding', startSec: 357.96, x: 66, y: 44, width: 13, height: 16},
];

// --- ProofItWorksDiagram (420.18s-621.74s): Inputs -> Ingestion+Research -> Fusion -> Outputs -> Grounding Check ---
const PROOF_IT_WORKS_BEATS: SubBeat[] = [
  {label: 'Inputs', startSec: 421.22, x: 8, y: 36, width: 15, height: 34},
  {label: 'Ingestion + Research', startSec: 433.98, x: 26, y: 36, width: 15, height: 34},
  {label: 'Fusion', startSec: 469.52, x: 43, y: 36, width: 15, height: 34},
  {label: 'Outputs', startSec: 505.42, x: 61, y: 36, width: 15, height: 34},
  {label: 'Grounding Check', startSec: 525.12, x: 78, y: 36, width: 15, height: 34},
];

export const FinalVideoBuild22: React.FC = () => (
  <>
    <TimelineComposition timeline={build22Timeline} audioSrc="build22_final.wav" />

    <SubBeatOverlay sceneId="TheBuildDiagram" sceneStartSec={25.66} beats={THE_BUILD_BEATS} />
    <SubBeatOverlay sceneId="ArchitectureDiagram" sceneStartSec={48.48} beats={ARCHITECTURE_BEATS} />
    <SubBeatOverlay sceneId="BuildWalkthroughDiagram" sceneStartSec={189} beats={BUILD_WALKTHROUGH_BEATS} />
    <SubBeatOverlay sceneId="ProofItWorksDiagram" sceneStartSec={420.18} beats={PROOF_IT_WORKS_BEATS} />

  <Captions words={build22Captions} />
  </>
);

export const finalVideoBuild22DurationInFrames = timelineDurationInFrames(build22Timeline);
