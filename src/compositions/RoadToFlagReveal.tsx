// TODO: placeholder illustration — swap for the real Gemini-generated
// "plan-goal-illustration.png" once it's dropped into public/.
import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {colors} from '../design-tokens';
import {SceneBeats} from './SceneBeats';

export const RoadToFlagReveal: React.FC<{frameIn?: number}> = ({frameIn = 0}) => {
  const frame = useCurrentFrame() - frameIn;

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [0, 150], [1.06, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center'}}>
      <Img
        src={staticFile('plan-goal-illustration.png')}
        style={{
          width: '80%',
          opacity,
          transform: `scale(${scale})`,
        }}
      />
      <SceneBeats
        beats={[
          {
            type: 'caption',
            frameIn: 10,
            text: "**Plan** is the path. **Goal** is the finish line — it stays fixed while the path can change.",
          },
        ]}
      />
    </AbsoluteFill>
  );
};
