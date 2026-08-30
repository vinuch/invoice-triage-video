import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {FPS} from '../design-tokens';
import {codexRunmeTimeline} from '../data/timeline/codex-runme';
import {componentMap} from '../componentMap';
import {problemBeats, coreConceptBeats} from '../data/scripts/codex-runme-beats';

const propsByScene: Record<string, Record<string, unknown>> = {
  'CodexRunme-Hook': {
    text: 'An engineer spent years babysitting Kubernetes clusters by hand, one week per batch, forever. This is his redemption arc.',
  },
  'CodexRunme-Problem': {beats: problemBeats},
  'CodexRunme-CoreConcept': {beats: coreConceptBeats},
  'CodexRunme-Architecture': {
    built: [
      {label: 'run.me', sub: 'static website, no backend'},
      {label: 'web MCP', sub: 'tools exposed from the browser'},
      {label: 'sandbox.js', sub: 'agent runs code here'},
      {label: 'Google Drive', sub: 'where every run gets saved'},
    ],
    future: [],
  },
  'CodexRunme-Payoff': {
    text: 'Every run lays behind a paper trail — decisions, dead ends, option A vs option B. Compounding interest, but for institutional memory.',
  },
  'CodexRunme-Caveat': {labels: ['Fire the engineer']},
  'CodexRunme-Thesis': {
    text: "AI doesn't replace engineers — it replaces the parts of the job you already hated.",
  },
};

export const FinalVideoCodexRunme: React.FC = () => {
  let frameCursor = 0;

  return (
    <>
      <Audio src={staticFile('codex_runme_vo.wav')} />

      {codexRunmeTimeline.map((scene) => {
        const durationInFrames = Math.round((scene.endSec - scene.startSec) * FPS);
        const from = frameCursor;
        frameCursor += durationInFrames;

        const Component = componentMap[scene.component as keyof typeof componentMap];
        const props = {...(scene.props ?? {}), ...(propsByScene[scene.id] ?? {})};

        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <Component {...props} />
          </Sequence>
        );
      })}
    </>
  );
};
