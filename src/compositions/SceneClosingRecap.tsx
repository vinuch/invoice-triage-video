// TODO: placeholder character asset — copyrighted (Rick Sanchez). Replace with original mascot before shipping.
import React from 'react';
import {SceneWrapper} from './SceneWrapper';
import {SceneBeats} from './SceneBeats';

export const SceneClosingRecap: React.FC = () => {
  return (
    <SceneWrapper characterSrc="mascot-placeholder.png" characterSide="right">
      <SceneBeats
        beats={[
          {
            type: 'cardStack',
            origin: {top: 220, left: 260},
            direction: 'horizontal',
            gap: 40,
            cards: [
              {label: '[extract.py]', sub: 'VLM extraction', frameIn: 0, variant: 'accent'},
              {label: '[validate.py]', sub: 'validation engine', frameIn: 0, variant: 'danger'},
            ],
          },
          {
            type: 'cardStack',
            origin: {top: 380, left: 260},
            direction: 'horizontal',
            gap: 40,
            cards: [
              {label: '[inbox_ingest.py]', sub: 'real inbox ingestion', frameIn: 20, variant: 'ghost'},
              {label: '[review_ui/]', sub: 'review dashboard', frameIn: 30, variant: 'ghost'},
              {label: '[benchmark.py]', sub: 'real-invoice benchmark', frameIn: 40, variant: 'ghost'},
            ],
          },
          {
            type: 'caption',
            frameIn: 10,
            text: "This is extraction plus validation — **the foundation.** From here the full build adds real inbox ingestion, a review dashboard, and a benchmark against real invoices.",
          },
        ]}
      />
    </SceneWrapper>
  );
};
