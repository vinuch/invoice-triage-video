// TODO: placeholder character asset — copyrighted (Rick Sanchez). Replace with original mascot before shipping.
import React from 'react';
import {SceneWrapper} from '../SceneWrapper';
import {SceneBeats} from '../SceneBeats';

export const SceneRecapHook: React.FC = () => {
  return (
    <SceneWrapper characterSrc="mascot-placeholder.png" characterSide="right">
      <SceneBeats
        beats={[
          {
            type: 'cardStack',
            origin: {top: 340, left: 300},
            direction: 'horizontal',
            gap: 40,
            cards: [
              {label: '[extract.py]', sub: 'reads the document', frameIn: 0, variant: 'accent'},
              {label: '[validate.py]', sub: 'checks the number', frameIn: 10, variant: 'danger'},
            ],
          },
          {
            type: 'caption',
            frameIn: 10,
            text: "Last lesson you saw the split — extract, then validate. Now let's **open the hood.** Why it's built this way.",
          },
        ]}
      />
    </SceneWrapper>
  );
};
