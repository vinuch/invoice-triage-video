import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {FPS} from '../design-tokens';
import {episode01Timeline} from '../data/timeline/episode01';
import {componentMap} from '../componentMap';
import {invoice01} from '../data/invoices/invoice-01';
import {invoice02} from '../data/invoices/invoice-02';
import {invoice03} from '../data/invoices/invoice-03';
import {invoice04} from '../data/invoices/invoice-04';
import {invoice05} from '../data/invoices/invoice-05';

// Terminal-Invoice scenes need their invoice script wired in via props,
// since that data isn't derivable from narration timing.
const invoiceScriptByScene: Record<string, unknown> = {
  'Terminal-Invoice01-Approved': invoice01,
  'Terminal-Invoice02-MathMismatch': invoice02,
  'Terminal-Invoice03-MissingPO': invoice03,
  'Terminal-Invoice04-HighValue': invoice04,
  'Terminal-Invoice05-Duplicate': invoice05,
};

export const FinalVideo: React.FC = () => {
  let frameCursor = 0;

  return (
    <>
      {/* Voiceover */}
      <Audio src={staticFile('episode01_script_narration.wav')} />

      {episode01Timeline.map((scene) => {
        const durationInFrames = Math.round((scene.endSec - scene.startSec) * FPS);
        const from = frameCursor;
        frameCursor += durationInFrames;

        const Component = componentMap[scene.component as keyof typeof componentMap];
        const props = {
          ...(scene.props ?? {}),
          ...(invoiceScriptByScene[scene.id] ? {script: invoiceScriptByScene[scene.id]} : {}),
          ...(scene.id === 'Scene-ClosingCTA' ? {selarUrl: 'selar.co/invoice-triage'} : {}),
        };

        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <Component {...props} />
          </Sequence>
        );
      })}
    </>
  );
};
