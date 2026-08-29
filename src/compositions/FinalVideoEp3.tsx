import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';

import {ArchitectureDiagram} from './ArchitectureDiagram';
import {TerminalReveal} from './TerminalReveal';
import {RoadmapRecap} from './episode02/RoadmapRecap';
import {SceneClosingCTA2} from './episode02/SceneClosingCTA2';

import {dockerUpScript} from '../data/scripts/episode03-docker-up';
import {composeFileScript} from '../data/scripts/episode03-compose-file';
import {schemaScript} from '../data/scripts/episode03-schema';
import {dbPyScript} from '../data/scripts/episode03-dbpy';
import {validatePlugScript} from '../data/scripts/episode03-validate-plug';
import {auditTrailScript} from '../data/scripts/episode03-audit-trail';
import {rerunScript} from '../data/scripts/episode03-rerun';

export const FinalVideoEp3: React.FC = () => {
  return (
    <>
      <Audio src={staticFile('episode03_vo.wav')} />

      {/* 0–3.8s: recap — reuse RoadmapRecap-style text, or swap for a simple Caption scene */}
      <Sequence from={0} durationInFrames={114}>
        <ArchitectureDiagram />
      </Sequence>

      {/* 3.8–9.5s hook — folded into same ArchitectureDiagram scene for now */}
      <Sequence from={114} durationInFrames={172}>
        <ArchitectureDiagram />
      </Sequence>

      {/* 9.5–22.8s: two infra pieces */}
      <Sequence from={286} durationInFrames={397}>
        <ArchitectureDiagram />
      </Sequence>

      {/* 22.8–31s: docker compose up */}
      <Sequence from={683} durationInFrames={248}>
        <TerminalReveal script={dockerUpScript} />
      </Sequence>

      {/* 31–48.6s: compose file walkthrough */}
      <Sequence from={931} durationInFrames={527}>
        <TerminalReveal script={composeFileScript} />
      </Sequence>

      {/* 48.6–59.6s + 59.6–79s: schema mounted + fields */}
      <Sequence from={1458} durationInFrames={528}>
        <TerminalReveal script={schemaScript} />
      </Sequence>

      {/* 79–100.6s: db.py */}
      <Sequence from={1986} durationInFrames={646}>
        <TerminalReveal script={dbPyScript} />
      </Sequence>

      {/* 100.6–118.8s: plugs into validate.py */}
      <Sequence from={2632} durationInFrames={546}>
        <TerminalReveal script={validatePlugScript} />
      </Sequence>

      {/* 118.8–135s: run batch, audit trail */}
      <Sequence from={3178} durationInFrames={486}>
        <TerminalReveal script={auditTrailScript} />
      </Sequence>

      {/* 135–145.2s: rerun / duplicate caught */}
      <Sequence from={3664} durationInFrames={306}>
        <TerminalReveal script={rerunScript} />
      </Sequence>

      {/* 145.2–160.7s: next lesson teaser + CTA */}
      <Sequence from={3970} durationInFrames={465}>
        <RoadmapRecap />
      </Sequence>

      <Sequence from={4435} durationInFrames={130}>
        <SceneClosingCTA2 selarUrl="selar.co/invoice-triage" />
      </Sequence>
    </>
  );
};
