import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {FPS} from '../design-tokens';
import type {TimelineScene} from '../data/timeline/types';
import {componentMap} from '../componentMap';

// Generalizes the pattern hand-rolled in FinalVideo.tsx / FinalVideoEp2-6.tsx:
// walk a TimelineScene[] (startSec/endSec derived from real narration word
// timestamps via scripts/parse-timestamps.ts), convert to frames, and mount
// the right component from componentMap for each Sequence.
//
// Each episode previously needed its own FinalVideoEpN.tsx just to do this
// loop plus wire in per-scene extra props (invoice scripts, a CTA URL, etc).
// That per-scene prop wiring is the only part that's genuinely episode-
// specific — so it's the one thing callers still provide, via `resolveProps`.
//
// Usage (replaces the body of a FinalVideoEpN.tsx):
//
//   export const FinalVideoEp7: React.FC = () => (
//     <TimelineComposition
//       timeline={episode07Timeline}
//       audioSrc="episode07_script_narration.wav"
//       resolveProps={(scene) => ({
//         ...(scene.id === 'Scene-ClosingCTA' ? {selarUrl: 'selar.co/...'} : {}),
//       })}
//     />
//   );

export type TimelineCompositionProps = {
  timeline: TimelineScene[];
  audioSrc?: string;
  resolveProps?: (scene: TimelineScene) => Record<string, unknown>;
};

export const TimelineComposition: React.FC<TimelineCompositionProps> = ({
  timeline,
  audioSrc,
  resolveProps,
}) => {
  let frameCursor = 0;

  return (
    <>
      {audioSrc && <Audio src={staticFile(audioSrc)} />}

      {timeline.map((scene) => {
        const durationInFrames = Math.round((scene.endSec - scene.startSec) * FPS);
        const from = frameCursor;
        frameCursor += durationInFrames;

        const Component = componentMap[scene.component as keyof typeof componentMap];
        if (!Component) {
          throw new Error(
            `TimelineComposition: no component registered in componentMap for "${scene.component}" (scene "${scene.id}")`
          );
        }

        const props = {
          ...(scene.props ?? {}),
          ...(resolveProps ? resolveProps(scene) : {}),
        };

        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <Component {...props} />
          </Sequence>
        );
      })}
    </>
  );
};

/** Sum of a timeline's total duration in frames — for registering the Composition in Root.tsx. */
export function timelineDurationInFrames(timeline: TimelineScene[]): number {
  const last = timeline[timeline.length - 1];
  return Math.round((last.endSec - timeline[0].startSec) * FPS);
}
