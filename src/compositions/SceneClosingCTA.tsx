// TODO: placeholder character asset — copyrighted (Rick Sanchez). Replace with original mascot before shipping.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {SceneWrapper} from './SceneWrapper';
import {SceneBeats} from './SceneBeats';
import {colors, fonts} from '../design-tokens';

export const SceneClosingCTA: React.FC<{selarUrl: string}> = ({selarUrl}) => {
  return (
    <SceneWrapper characterSrc="mascot-placeholder.png" characterSide="right">
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center', marginLeft: -200}}>
          <div style={{fontFamily: fonts.display, fontSize: 56, fontWeight: 700, color: colors.text}}>
            Build the full pipeline
          </div>
          <div style={{fontFamily: fonts.mono, fontSize: 28, color: colors.approved, marginTop: 16}}>
            [{selarUrl}]
          </div>
        </div>
      </AbsoluteFill>
      <SceneBeats
        beats={[
          {
            type: 'caption',
            frameIn: 10,
            text: "This lesson's free. The full build — code, extraction pipeline, validation engine, test set — is on **Selar**. Link's below. Let's go build it.",
          },
        ]}
      />
    </SceneWrapper>
  );
};
