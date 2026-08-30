import React from 'react';
import {Composition} from 'remotion';
import {FPS, WIDTH, HEIGHT} from './design-tokens';
import {ArchitectureDiagram} from './compositions/ArchitectureDiagram';
import {EndCard} from './compositions/EndCard';
import {FinalVideo} from './compositions/FinalVideo';
import {FinalVideoEp2} from './compositions/FinalVideoEp2';
import {FinalVideoEp3} from './compositions/FinalVideoEp3';
import {FinalVideoEp4} from './compositions/FinalVideoEp4';
import {SceneOpeningHookV2} from './compositions/SceneOpeningHookV2';
import {SceneJobOne} from './compositions/SceneJobOne';
import {SceneJobTwo} from './compositions/SceneJobTwo';
import {SceneBothJobs} from './compositions/SceneBothJobs';
import {episode02Timeline} from './data/timeline/episode02';
import {episode03Timeline} from './data/timeline/episode03';
import {episode04Timeline} from './data/timeline/episode04';
import {episode01Timeline} from './data/timeline/episode01';
import {componentMap} from './componentMap';

// durationInFrames = script segment length (seconds) * FPS
const sec = (s: number) => Math.round(s * FPS);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FinalVideo"
        component={FinalVideo}
        durationInFrames={3010}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="FinalVideoEp2"
        component={FinalVideoEp2}
        durationInFrames={5222}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="FinalVideoEp3"
        component={FinalVideoEp3}
        durationInFrames={4817}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="FinalVideoEp4"
        component={FinalVideoEp4}
        durationInFrames={5735}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

{/* Episode 1 — driven by episode01Timeline (word-timestamp derived) */}
{episode01Timeline.map((scene) => (
  <Composition
    key={scene.id}
    id={scene.id}
    component={componentMap[scene.component as keyof typeof componentMap]}
    durationInFrames={Math.round((scene.endSec - scene.startSec) * FPS)}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    defaultProps={scene.props}
  />
))}
<Composition
  id="Scene-OpeningHookV2"
  component={SceneOpeningHookV2}
  durationInFrames={sec(10)}
  fps={FPS}
  width={WIDTH}
  height={HEIGHT}
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

      {/* 2:45–3:10 (25s) — original, unused in FinalVideo, kept for reference */}
      <Composition
        id="ArchitectureDiagram"
        component={ArchitectureDiagram}
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

{/* Episode 2 — driven by episode02Timeline (word-timestamp derived) */}
{episode02Timeline.map((scene) => (
  <Composition
    key={scene.id}
    id={scene.id}
    component={componentMap[scene.component as keyof typeof componentMap]}
    durationInFrames={Math.round((scene.endSec - scene.startSec) * FPS)}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    defaultProps={scene.props}
  />
))}
{/* Episode 3 -- driven by episode03Timeline (word-timestamp derived) */}
{episode03Timeline.map((scene) => (
  <Composition
    key={scene.id}
    id={scene.id}
    component={componentMap[scene.component as keyof typeof componentMap]}
    durationInFrames={Math.round((scene.endSec - scene.startSec) * FPS)}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    defaultProps={scene.props}
  />
))}
{/* Episode 4 -- driven by episode04Timeline (word-timestamp derived) */}
{episode04Timeline.map((scene) => (
  <Composition
    key={scene.id}
    id={scene.id}
    component={componentMap[scene.component as keyof typeof componentMap]}
    durationInFrames={Math.round((scene.endSec - scene.startSec) * FPS)}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    defaultProps={scene.props}
  />
))}

    </>
  );
};
