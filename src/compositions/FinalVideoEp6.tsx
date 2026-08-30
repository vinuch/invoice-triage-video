import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {FPS} from '../design-tokens';
import {episode06Timeline} from '../data/timeline/episode06';
import {componentMap} from '../componentMap';
import {invoice02} from '../data/invoices/invoice-02';
import {invoice03} from '../data/invoices/invoice-03';
import {invoice04} from '../data/invoices/invoice-04';
import {invoice05} from '../data/invoices/invoice-05';
import {confidenceFloorScript} from '../data/scripts/episode06-confidence-floor';
import {fiveChecksBeats} from '../data/scripts/episode06-five-checks';

const propsByScene: Record<string, Record<string, unknown>> = {
  'Ep6-DeterministicPrinciple': {
    text: 'Every check in this file is deterministic. Same input, same output, every single time.',
  },
  'Ep6-FiveChecks': {beats: fiveChecksBeats},
  'Ep6-SeverityLogic': {
    text: "Severity matters more than it looks like it should. High severity means the pipeline can't trust this invoice at all.",
  },
  'Ep6-MathCheck': {script: invoice02},
  'Ep6-DuplicateCheck': {script: invoice05},
  'Ep6-ConfidenceFloor': {script: confidenceFloorScript},
  'Ep6-MissingPO': {script: invoice03},
  'Ep6-HighValue': {script: invoice04},
  'Ep6-Thesis': {
    text: 'Five checks, three possible outcomes, zero model cost.',
  },
  'Ep6-ClosingCTA': {selarUrl: 'selar.co/invoice-triage'},
};

export const FinalVideoEp6: React.FC = () => {
  let frameCursor = 0;

  return (
    <>
      <Audio src={staticFile('episode06_vo.wav')} />

      {episode06Timeline.map((scene) => {
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
