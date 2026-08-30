import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {FPS} from '../design-tokens';
import {episode04Timeline} from '../data/timeline/episode04';
import {componentMap} from '../componentMap';

import {normalizeScript} from '../data/scripts/episode04-normalize';
import {uploadAPIScript} from '../data/scripts/episode04-upload-api';
import {runUploadScript} from '../data/scripts/episode04-run-upload';
import {gmailOAuthSetupScript} from '../data/scripts/episode04-gmail-oauth-setup';
import {oauthHeadlessScript} from '../data/scripts/episode04-oauth-headless';
import {pollingQueryScript} from '../data/scripts/episode04-polling-query';
import {runGmailScript} from '../data/scripts/episode04-run-gmail';

// TerminalReveal scenes need their script wired in via props,
// since that data isn't derivable from narration timing.
const scriptByScene: Record<string, unknown> = {
  'Ep4-Normalize': normalizeScript,
  'Ep4-UploadAPI': uploadAPIScript,
  'Ep4-RunUpload': runUploadScript,
  'Ep4-GmailOAuthSetup': gmailOAuthSetupScript,
  'Ep4-OAuthHeadless': oauthHeadlessScript,
  'Ep4-PollingQuery': pollingQueryScript,
  'Ep4-RunGmail': runGmailScript,
};

export const FinalVideoEp4: React.FC = () => {
  let frameCursor = 0;

  return (
    <>
      <Audio src={staticFile('episode04_vo.wav')} />

      {episode04Timeline.map((scene) => {
        const durationInFrames = Math.round((scene.endSec - scene.startSec) * FPS);
        const from = frameCursor;
        frameCursor += durationInFrames;

        const Component = componentMap[scene.component as keyof typeof componentMap];
        const props = {
          ...(scene.props ?? {}),
          ...(scriptByScene[scene.id] ? {script: scriptByScene[scene.id]} : {}),
          ...(scene.id === 'Ep4-ClosingCTA' ? {selarUrl: 'selar.co/invoice-triage'} : {}),
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
