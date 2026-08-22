// TODO: placeholder character asset — copyrighted (Rick Sanchez). Replace with original mascot before shipping.
import React from 'react';
import {SceneWrapper} from './SceneWrapper';
import {SceneBeats} from './SceneBeats';

export const SceneOpeningHookV2: React.FC = () => {
  return (
    <SceneWrapper characterSrc="mascot-placeholder.png" characterSide="right">
      <SceneBeats
        beats={[
          {
            type: 'cardStack',
            origin: {top: 340, left: 280},
            direction: 'horizontal',
            gap: 40,
            cards: [
              {label: '[INVOICE_01]', sub: '$4,200 — total', frameIn: 0, variant: 'default'},
              {label: '[INVOICE_02]', sub: '$100,000 — total', frameIn: 15, variant: 'danger'},
            ],
          },
          {
            type: 'caption',
            frameIn: 5,
            text: "This invoice says **$4,200**. This one — same vendor, same format — says **$100,000**.",
          },
        ]}
      />
    </SceneWrapper>
  );
};
