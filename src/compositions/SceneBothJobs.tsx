// TODO: placeholder character asset — copyrighted (Rick Sanchez). Replace with original mascot before shipping.
import React from 'react';
import {SceneWrapper} from './SceneWrapper';
import {SceneBeats} from './SceneBeats';

export const SceneBothJobs: React.FC = () => {
  return (
    <SceneWrapper characterSrc="mascot-placeholder.png" characterSide="right">
      <SceneBeats
        beats={[
          {type: 'card', label: '[extract.py]', sub: 'reads the document', frameIn: 0, top: 280, left: 280, variant: 'accent'},
          {type: 'card', label: '[validate.py]', sub: 'checks the number', frameIn: 12, top: 400, left: 600, variant: 'danger'},
          {
            type: 'caption',
            frameIn: 8,
            text: "Most tutorials ask the same model to do both. **The model extracts. Plain code decides.**",
          },
        ]}
      />
    </SceneWrapper>
  );
};
