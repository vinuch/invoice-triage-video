// TODO: placeholder character asset — copyrighted (Rick Sanchez). Replace with original mascot before shipping.
import React from 'react';
import {SceneWrapper} from './SceneWrapper';
import {SceneBeats} from './SceneBeats';

export const SceneJobTwo: React.FC = () => {
  return (
    <SceneWrapper characterSrc="mascot-placeholder.png" characterSide="right">
      <SceneBeats
        beats={[
          {type: 'card', label: '[validate.py]', sub: 'is it correct? have we seen it?', frameIn: 0, top: 340, left: 400, variant: 'danger'},
          {
            type: 'caption',
            frameIn: 5,
            text: "Job two: **is this number correct?** That's not language — that's math and lookups.",
          },
        ]}
      />
    </SceneWrapper>
  );
};
