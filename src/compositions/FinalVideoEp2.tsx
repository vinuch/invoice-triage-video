import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';

import {SceneRecapHook} from './episode02/SceneRecapHook';
import {CrossedOutConcept} from './CrossedOutConcept';
import {PullQuote} from './PullQuote';
import {JobSplitDetail} from './episode02/JobSplitDetail';
import {BeforeAfterFlow} from './BeforeAfterFlow';
import {SceneLayoutAwareness} from './episode02/SceneLayoutAwareness';
import {ProviderSwap} from './episode02/ProviderSwap';
import {SchemaEnforcement} from './episode02/SchemaEnforcement';
import {RoadmapRecap} from './episode02/RoadmapRecap';
import {SceneClosingCTA2} from './episode02/SceneClosingCTA2';

export const FinalVideoEp2: React.FC = () => {
  return (
    <>
      <Audio src={staticFile('episode02_vo.wav')} />

      {/* 0.00–12.62s */}
      <Sequence from={0} durationInFrames={379}>
        <SceneRecapHook />
      </Sequence>

      {/* 12.62–43.18s */}
      <Sequence from={379} durationInFrames={879}>
        <CrossedOutConcept labels={['Read Agent', 'Math Agent', 'Decide Agent']} />
      </Sequence>

      {/* 43.18–51.16s */}
      <Sequence from={1258} durationInFrames={212}>
        <PullQuote text="The fastest way to make an AI system unreliable is to let a model make a decision **a five-line if-statement could make correctly** every single time." />
      </Sequence>

      {/* 51.16–68.28s */}
      <Sequence from={1470} durationInFrames={498}>
        <JobSplitDetail />
      </Sequence>

      {/* 68.28–79.06s */}
      <Sequence from={1968} durationInFrames={323}>
        <BeforeAfterFlow
          beforeSteps={[{label: '[Image]'}, {label: 'OCR'}, {label: 'text'}, {label: 'LLM'}]}
          afterSteps={[{label: '[Image]'}, {label: 'LLM'}]}
        />
      </Sequence>

      {/* 79.06–90.48s */}
      <Sequence from={2291} durationInFrames={329}>
        <SceneLayoutAwareness />
      </Sequence>

      {/* 90.48–107.32s */}
      <Sequence from={2620} durationInFrames={480}>
        <ProviderSwap />
      </Sequence>

      {/* 107.32–135.52s */}
      <Sequence from={3100} durationInFrames={811}>
        <SchemaEnforcement />
      </Sequence>

      {/* 135.52–174.88s */}
      <Sequence from={3911} durationInFrames={1181}>
        <RoadmapRecap />
      </Sequence>

      {/* 174.88–179.20s */}
      <Sequence from={5092} durationInFrames={130}>
        <SceneClosingCTA2 selarUrl="selar.co/invoice-triage" />
      </Sequence>
    </>
  );
};
