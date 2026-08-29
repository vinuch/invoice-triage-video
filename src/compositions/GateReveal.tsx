// TODO: placeholder illustration — swap for the real Gemini-generated
// "permission-gate-illustration.png" once it's dropped into public/.
import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {colors} from '../design-tokens';
import {SceneBeats} from './SceneBeats';

export const GateReveal: React.FC<{frameIn?: number}> = ({frameIn = 0}) => {
  const frame = useCurrentFrame() - frameIn;

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [40, 150], [1, 1.04], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center'}}>
      <Img
        src={staticFile('permission-gate-illustration.png')}
        style={{
          width: '70%',
          opacity,
          transform: `scale(${scale})`,
        }}
      />
      <SceneBeats
        beats={[
          {
            type: 'caption',
            frameIn: 10,
            text: "Approve the **least** you can, not the most you can.",
          },
        ]}
      />
    </AbsoluteFill>
  );
};
