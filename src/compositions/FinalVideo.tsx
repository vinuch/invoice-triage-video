import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';

import {PipelineDiagram} from './PipelineDiagram';
import {SceneOpeningHook} from './SceneOpeningHook';
import {TerminalReveal} from './TerminalReveal';
import {BatchSummary} from './BatchSummary';
import {SceneClosingRecap} from './SceneClosingRecap';
import {SceneClosingCTA} from './SceneClosingCTA';

import {invoice01} from '../data/invoices/invoice-01';
import {invoice02} from '../data/invoices/invoice-02';
import {invoice03} from '../data/invoices/invoice-03';
import {invoice04} from '../data/invoices/invoice-04';
import {invoice05} from '../data/invoices/invoice-05';

export const FinalVideo: React.FC = () => {
  return (
    <>
      {/* Voiceover */}
      <Audio src={staticFile('episode01_script_narration.wav')} />

      {/* 0:00–0:08 */}
      <Sequence from={0} durationInFrames={8 * 30}>
        <SceneOpeningHook />
      </Sequence>

      {/* 0:20–0:45 */}
      <Sequence from={20 * 30} durationInFrames={25 * 30}>
        <PipelineDiagram highlight="extract" />
      </Sequence>

      {/* 0:45–1:10 */}
      <Sequence from={45 * 30} durationInFrames={25 * 30}>
        <PipelineDiagram highlight="validate" />
      </Sequence>

      {/* 1:10–1:25 */}
      <Sequence from={70 * 30} durationInFrames={15 * 30}>
        <PipelineDiagram highlight="both" />
      </Sequence>

      {/* 1:35–1:45 */}
      <Sequence from={95 * 30} durationInFrames={10 * 30}>
        <TerminalReveal script={invoice01} />
      </Sequence>

      {/* 1:45–1:58 */}
      <Sequence from={105 * 30} durationInFrames={13 * 30}>
        <TerminalReveal script={invoice02} />
      </Sequence>

      {/* 1:58–2:10 */}
      <Sequence from={118 * 30} durationInFrames={12 * 30}>
        <TerminalReveal script={invoice03} />
      </Sequence>

      {/* 2:10–2:20 */}
      <Sequence from={130 * 30} durationInFrames={10 * 30}>
        <TerminalReveal script={invoice04} />
      </Sequence>

      {/* 2:20–2:35 */}
      <Sequence from={140 * 30} durationInFrames={15 * 30}>
        <TerminalReveal script={invoice05} />
      </Sequence>

      {/* 2:35–2:45 */}
      <Sequence from={155 * 30} durationInFrames={10 * 30}>
        <BatchSummary />
      </Sequence>

      {/* 2:45–3:10 */}
      <Sequence from={165 * 30} durationInFrames={25 * 30}>
        <SceneClosingRecap />
      </Sequence>

      {/* 3:10–3:30 */}
      <Sequence from={190 * 30} durationInFrames={20 * 30}>
        <SceneClosingCTA selarUrl="selar.co/invoice-triage" />
      </Sequence>
    </>
  );
};
