// TODO: placeholder character asset — copyrighted (Rick Sanchez). Replace with original mascot before shipping.
import React from 'react';
import {SceneWrapper} from './SceneWrapper';
import {SceneBeats} from './SceneBeats';

export const SceneJobOne: React.FC = () => {
  return (
    <SceneWrapper characterSrc="mascot-placeholder.png" characterSide="right">
      <SceneBeats
        beats={[
          {type: 'card', label: '[extract.py]', sub: 'vendor · amount · due date', frameIn: 0, top: 340, left: 400, variant: 'accent'},
          {
            type: 'caption',
            frameIn: 5,
            text: "Every invoice agent has two jobs. Job one: **read the document.** That's language — an LLM is genuinely good at it.",
          },
        ]}
      />
    </SceneWrapper>
  );
};
