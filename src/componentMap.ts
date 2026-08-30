import type {ComponentType} from 'react';
// Central registry mapping timeline component names -> actual React components.
// Add an entry here whenever a new component is used in a timeline config.
import {SceneRecapHook} from './compositions/episode02/SceneRecapHook';
import {CrossedOutConcept} from './compositions/CrossedOutConcept';
import {PullQuote} from './compositions/PullQuote';
import {JobSplitDetail} from './compositions/episode02/JobSplitDetail';
import {BeforeAfterFlow} from './compositions/BeforeAfterFlow';
import {SceneLayoutAwareness} from './compositions/episode02/SceneLayoutAwareness';
import {ProviderSwap} from './compositions/episode02/ProviderSwap';
import {SchemaEnforcement} from './compositions/episode02/SchemaEnforcement';
import {RoadmapRecap} from './compositions/episode02/RoadmapRecap';
import {SceneClosingCTA2} from './compositions/episode02/SceneClosingCTA2';

import {SceneOpeningHook} from './compositions/SceneOpeningHook';
import {PipelineDiagram} from './compositions/PipelineDiagram';
import {TerminalReveal} from './compositions/TerminalReveal';
import {BatchSummary} from './compositions/BatchSummary';
import {SceneClosingRecap} from './compositions/SceneClosingRecap';
import {SceneClosingCTA} from './compositions/SceneClosingCTA';
import {ArchitectureDiagram} from './compositions/ArchitectureDiagram';
export const componentMap: Record<string, ComponentType<any>> = {
  SceneRecapHook,
  CrossedOutConcept,
  PullQuote,
  JobSplitDetail,
  BeforeAfterFlow,
  SceneLayoutAwareness,
  ProviderSwap,
  SchemaEnforcement,
  RoadmapRecap,
  SceneClosingCTA2,
  SceneOpeningHook,
  PipelineDiagram,
  TerminalReveal,
  BatchSummary,
  SceneClosingRecap,
  SceneClosingCTA,
  ArchitectureDiagram,
};
