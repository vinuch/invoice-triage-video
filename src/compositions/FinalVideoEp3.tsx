import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {FPS} from '../design-tokens';
import {episode03Timeline} from '../data/timeline/episode03';
import {componentMap} from '../componentMap';

import {dockerUpScript} from '../data/scripts/episode03-docker-up';
import {composeFileScript} from '../data/scripts/episode03-compose-file';
import {schemaScript} from '../data/scripts/episode03-schema';
import {dbPyScript} from '../data/scripts/episode03-dbpy';
import {validatePlugScript} from '../data/scripts/episode03-validate-plug';
import {auditTrailScript} from '../data/scripts/episode03-audit-trail';
import {rerunScript} from '../data/scripts/episode03-rerun';

// TerminalReveal scenes need their script wired in via props,
// since that data isn't derivable from narration timing.
const scriptByScene: Record<string, unknown> = {
  'Ep3-ComposeFile': composeFileScript,
  'Ep3-Schema': schemaScript,
  'Ep3-DockerUp': dockerUpScript,
  'Ep3-DbPy': dbPyScript,
  'Ep3-ValidatePlug': validatePlugScript,
  'Ep3-AuditTrail': auditTrailScript,
  'Ep3-Rerun': rerunScript,
};

export const FinalVideoEp3: React.FC = () => {
  let frameCursor = 0;

  return (
    <>
      <Audio src={staticFile('episode03_vo.wav')} />

      {episode03Timeline.map((scene) => {
        const durationInFrames = Math.round((scene.endSec - scene.startSec) * FPS);
        const from = frameCursor;
        frameCursor += durationInFrames;

        const Component = componentMap[scene.component as keyof typeof componentMap];
        const props = {
          ...(scene.props ?? {}),
          ...(scriptByScene[scene.id] ? {script: scriptByScene[scene.id]} : {}),
          ...(scene.id === 'Ep3-ClosingCTA' ? {selarUrl: 'selar.co/invoice-triage'} : {}),
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
