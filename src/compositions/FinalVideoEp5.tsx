import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {FPS} from '../design-tokens';
import {episode05Timeline} from '../data/timeline/episode05';
import {componentMap} from '../componentMap';
import {schemaContractScript} from '../data/scripts/episode05-schema-contract';
import {nullRuleScript} from '../data/scripts/episode05-null-rule';
import {threeProvidersScript} from '../data/scripts/episode05-three-providers';
import {providerAbstractionScript} from '../data/scripts/episode05-provider-abstraction';
import {runCleanScript} from '../data/scripts/episode05-run-clean';
import {runMessyScript} from '../data/scripts/episode05-run-messy';
import {failureModesScript} from '../data/scripts/episode05-failure-modes';

const propsByScene: Record<string, Record<string, unknown>> = {
  'Ep5-Recap': {
    built: [
      {label: 'ingestion', sub: 'gets invoices to this point'},
      {label: 'extraction', sub: 'image → structured data (this lesson)'},
      {label: 'validation', sub: 'decides what happens after this'},
    ],
    future: [],
  },
  'Ep5-SchemaContract': {script: schemaContractScript},
  'Ep5-ConfidenceFields': {
    text: 'Four separate scores, not one. Collapsing that into one number throws away information you need for routing later.',
  },
  'Ep5-NullRule': {script: nullRuleScript},
  'Ep5-ThreeProviders': {script: threeProvidersScript},
  'Ep5-ProviderAbstraction': {script: providerAbstractionScript},
  'Ep5-RunClean': {script: runCleanScript},
  'Ep5-RunMessy': {script: runMessyScript},
  'Ep5-FailureModes': {script: failureModesScript},
  'Ep5-Thesis': {
    text: "None of these failure modes are solved by a better prompt alone. They're solved by treating extraction as unreliable by design and building validation that doesn't trust it blindly.",
  },
  'Ep5-ClosingCTA': {selarUrl: 'selar.co/invoice-triage'},
};

export const FinalVideoEp5: React.FC = () => {
  let frameCursor = 0;

  return (
    <>
      <Audio src={staticFile('episode05_vo.wav')} />

      {episode05Timeline.map((scene) => {
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
