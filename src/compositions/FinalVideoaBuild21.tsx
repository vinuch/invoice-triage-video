import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {FPS} from '../design-tokens';
import {build21Timeline} from '../data/timeline/build21';
import {componentMap} from '../componentMap';

export const FinalVideoBuild21: React.FC = () => {
  let frameCursor = 0;

  return (
    <>
      {/* Voiceover */}
      <Audio src={staticFile('build21_final_v2.wav')} />

      {build21Timeline.map((scene) => {
        const durationInFrames = Math.round((scene.endSec - scene.startSec) * FPS);
        const from = frameCursor;
        frameCursor += durationInFrames;

        const Component = componentMap[scene.component as keyof typeof componentMap];
        const props = scene.props ?? {};

        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <Component {...props} />
          </Sequence>
        );
      })}
    </>
  );
};

// Total duration in frames, exported so Root.tsx doesn't have to re-sum the timeline.
export const finalVideoBuild21DurationInFrames = build21Timeline.length
  ? Math.round(build21Timeline[build21Timeline.length - 1].endSec * FPS)
  : 0;
