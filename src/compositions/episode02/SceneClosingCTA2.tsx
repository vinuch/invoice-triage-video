// TODO: placeholder character asset — copyrighted (Rick Sanchez). Replace with original mascot before shipping.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {SceneWrapper} from '../SceneWrapper';
import {SceneBeats} from '../SceneBeats';
import {colors, fonts} from '../../design-tokens';

export const SceneClosingCTA2: React.FC<{selarUrl: string}> = ({selarUrl}) => {
  return (
    <SceneWrapper characterSrc="mascot-placeholder.png" characterSide="right">
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center', marginLeft: -200}}>
          <div style={{fontFamily: fonts.display, fontSize: 56, fontWeight: 700, color: colors.text}}>
            Full build, code, test set
          </div>
          <div style={{fontFamily: fonts.mono, fontSize: 28, color: colors.approved, marginTop: 16}}>
            [{selarUrl}]
          </div>
        </div>
      </AbsoluteFill>
      <SceneBeats
        beats={[
          {type: 'caption', frameIn: 10, text: "Full build, code, test set — **Selar**, link below. Let's keep building."},
        ]}
      />
    </SceneWrapper>
  );
};
