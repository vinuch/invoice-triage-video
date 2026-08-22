import React from 'react';
import {Composition} from 'remotion';
import {FPS, WIDTH, HEIGHT} from './design-tokens';
import {PipelineDiagram} from './compositions/PipelineDiagram';
import {TerminalReveal} from './compositions/TerminalReveal';
import {BatchSummary} from './compositions/BatchSummary';
import {ArchitectureDiagram} from './compositions/ArchitectureDiagram';
import {EndCard} from './compositions/EndCard';
import {FinalVideo} from './compositions/FinalVideo';
import {SceneOpeningHook} from './compositions/SceneOpeningHook';
import {SceneOpeningHookV2} from './compositions/SceneOpeningHookV2';
import {SceneJobOne} from './compositions/SceneJobOne';
import {SceneJobTwo} from './compositions/SceneJobTwo';
import {SceneBothJobs} from './compositions/SceneBothJobs';
import {SceneClosingRecap} from './compositions/SceneClosingRecap';
import {SceneClosingCTA} from './compositions/SceneClosingCTA';
import {SceneRecapHook} from './compositions/episode02/SceneRecapHook';
import {SceneClosingCTA2} from './compositions/episode02/SceneClosingCTA2';
import {PullQuote} from './compositions/PullQuote';
import {CrossedOutConcept} from './compositions/CrossedOutConcept';
import {BeforeAfterFlow} from './compositions/BeforeAfterFlow';
import {SceneLayoutAwareness} from './compositions/episode02/SceneLayoutAwareness';
import {providerSwapScript} from './data/scripts/provider-swap';
import {SceneClosingCTA2} from './compositions/episode02/SceneClosingCTA2';
import {PullQuote} from './compositions/PullQuote';
import {CrossedOutConcept} from './compositions/CrossedOutConcept';
import {BeforeAfterFlow} from './compositions/BeforeAfterFlow';
import {SceneLayoutAwareness} from './compositions/episode02/SceneLayoutAwareness';
import {providerSwapScript} from './data/scripts/provider-swap';
import {invoice01} from './data/invoices/invoice-01';
import {invoice02} from './data/invoices/invoice-02';
import {invoice03} from './data/invoices/invoice-03';
import {invoice04} from './data/invoices/invoice-04';
import {invoice05} from './data/invoices/invoice-05';

// durationInFrames = script segment length (seconds) * FPS
const sec = (s: number) => Math.round(s * FPS);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FinalVideo"
        component={FinalVideo}
        durationInFrames={210 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* 0:00–0:08 (character bookend) */}
      <Composition
        id="Scene-OpeningHook"
        component={SceneOpeningHook}
        durationInFrames={sec(10)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
<Composition
  id="Scene-OpeningHookV2"
  component={SceneOpeningHookV2}
  durationInFrames={sec(10)}
  fps={FPS}
  width={WIDTH}
  height={HEIGHT}
/>

      {/* 0:20–0:45 (25s) */}
      <Composition
        id="Diagram-Extract"
        component={PipelineDiagram}
        durationInFrames={sec(25)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{highlight: 'extract'}}
      />
      {/* 0:45–1:10 (25s) */}
      <Composition
        id="Diagram-Validate"
        component={PipelineDiagram}
        durationInFrames={sec(25)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{highlight: 'validate'}}
      />
      {/* 1:10–1:25 (15s) */}
      <Composition
        id="Diagram-Both"
        component={PipelineDiagram}
        durationInFrames={sec(15)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{highlight: 'both'}}
      />

      {/* Unused alt versions of the diagram beats (character-driven, not wired into FinalVideo) */}
      <Composition
        id="Scene-JobOne"
        component={SceneJobOne}
        durationInFrames={sec(25)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene-JobTwo"
        component={SceneJobTwo}
        durationInFrames={sec(25)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene-BothJobs"
        component={SceneBothJobs}
        durationInFrames={sec(15)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* 1:35–1:45 (10s) */}
      <Composition
        id="Terminal-Invoice01-Approved"
        component={TerminalReveal}
        durationInFrames={sec(10)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{script: invoice01}}
      />
      {/* 1:45–1:58 (13s) */}
      <Composition
        id="Terminal-Invoice02-MathMismatch"
        component={TerminalReveal}
        durationInFrames={sec(13)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{script: invoice02}}
      />
      {/* 1:58–2:10 (12s) */}
      <Composition
        id="Terminal-Invoice03-MissingPO"
        component={TerminalReveal}
        durationInFrames={sec(12)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{script: invoice03}}
      />
      {/* 2:10–2:20 (10s) */}
      <Composition
        id="Terminal-Invoice04-HighValue"
        component={TerminalReveal}
        durationInFrames={sec(10)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{script: invoice04}}
      />
      {/* 2:20–2:35 (15s) */}
      <Composition
        id="Terminal-Invoice05-Duplicate"
        component={TerminalReveal}
        durationInFrames={sec(15)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{script: invoice05}}
      />

      {/* 2:35–2:45 (10s) */}
      <Composition
        id="BatchSummary"
        component={BatchSummary}
        durationInFrames={sec(10)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* 2:45–3:10 (25s) — original, unused in FinalVideo, kept for reference */}
      <Composition
        id="ArchitectureDiagram"
        component={ArchitectureDiagram}
        durationInFrames={sec(25)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      {/* 2:45–3:10 (25s) — character bookend, wired into FinalVideo */}
      <Composition
        id="Scene-ClosingRecap"
        component={SceneClosingRecap}
        durationInFrames={sec(25)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* 3:10–3:30 (20s) — original, unused in FinalVideo, kept for reference */}
      <Composition
        id="EndCard"
        component={EndCard}
        durationInFrames={sec(20)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{selarUrl: 'selar.co/invoice-triage'}}
      />
      {/* 3:10–3:30 (20s) — character bookend, wired into FinalVideo */}
      <Composition
        id="Scene-ClosingCTA"
        component={SceneClosingCTA}
        durationInFrames={sec(20)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{selarUrl: 'selar.co/invoice-triage'}}
      />

{/* Episode 2 — hook + close (bookend pattern, matching Episode 1) */}
<Composition
  id="Ep2-RecapHook"
  component={SceneRecapHook}
  durationInFrames={sec(20)}
  fps={FPS}
  width={WIDTH}
  height={HEIGHT}
/>
<Composition
  id="Ep2-PullQuote-Reliability"
  component={PullQuote}
  durationInFrames={sec(30)}
  fps={FPS}
  width={WIDTH}
  height={HEIGHT}
  defaultProps={{text: "The fastest way to make an AI system unreliable is to let a model make a decision **a five-line if-statement could make correctly** every single time."}}
/>
<Composition
  id="Ep2-CrossedOut-MultiAgent"
  component={CrossedOutConcept}
  durationInFrames={sec(45)}
  fps={FPS}
  width={WIDTH}
  height={HEIGHT}
  defaultProps={{labels: ['Read Agent', 'Math Agent', 'Decide Agent']}}
/>
<Composition
  id="Ep2-ClosingCTA"
  component={SceneClosingCTA2}
  durationInFrames={sec(30)}
  fps={FPS}
  width={WIDTH}
  height={HEIGHT}
  defaultProps={{selarUrl: 'selar.co/invoice-triage'}}
/>
<Composition
  id="Ep2-OCR-BeforeAfter"
  component={BeforeAfterFlow}
  durationInFrames={sec(50)}
  fps={FPS}
  width={WIDTH}
  height={HEIGHT}
  defaultProps={{
    beforeSteps: [{label: '[Image]'}, {label: 'OCR'}, {label: 'text'}, {label: 'LLM'}],
    afterSteps: [{label: '[Image]'}, {label: 'LLM'}],
  }}
/>
<Composition
  id="Ep2-LayoutAwareness"
  component={SceneLayoutAwareness}
  durationInFrames={sec(45)}
  fps={FPS}
  width={WIDTH}
  height={HEIGHT}
/>

    </>
  );
};
