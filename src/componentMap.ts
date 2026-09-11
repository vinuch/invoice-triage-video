import type {ComponentType} from 'react';
import {PipelineFlow3D} from './compositions/PipelineFlow3D';
import {DiffReveal} from './compositions/DiffReveal';
import {MetricCounter} from './compositions/MetricCounter';
import {ThreeStepFlow} from './components/ThreeStepFlow';
import {LunaPipelineFlow} from './components/LunaPipelineFlow';
import {HookConsequenceOverlay} from './components/HookConsequenceOverlay';
import {ChapterTitle} from './components/ChapterTitle';
import {AgentArchitecturePipeline} from './components/AgentArchitecturePipeline';
import {BuildWalkthroughPipeline} from './components/BuildWalkthroughPipeline';
import {ResumeMismatchDiagram} from './components/ResumeMismatchDiagram';
import {ResumeOptimizerPipeline} from './components/ResumeOptimizerPipeline';
import {ResumeArchitectureDiagram} from './components/ResumeArchitectureDiagram';
import {ResumeBuildWalkthroughDiagram} from './components/ResumeBuildWalkthroughDiagram';
import {ResumeProofItWorksDiagram} from './components/ResumeProofItWorksDiagram';
import {ResumeAdaptiveCloseDiagram} from './components/ResumeAdaptiveCloseDiagram';
import {TechnicalHookOverlay} from './components/TechnicalHookOverlay';
import {RestrainedClosingOverlay} from './components/RestrainedClosingOverlay';
import {FocusSpotlight} from './components/FocusSpotlight';
import {CoverLetterWorkflowDiagram} from './components/CoverLetterWorkflowDiagram';
import {CoverLetterArchitectureDiagram} from './components/CoverLetterArchitectureDiagram';
import {CoverLetterBuildWalkthroughDiagram} from './components/CoverLetterBuildWalkthroughDiagram';
import {CoverLetterProofItWorksDiagram} from './components/CoverLetterProofItWorksDiagram';
import {HookBroll} from './components/HookBroll';
import {CloseBroll} from './components/CloseBroll';
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
import {SceneBeats} from './compositions/SceneBeats';
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
  SceneBeats,
  PipelineFlow3D,
  DiffReveal,
  MetricCounter,
  ThreeStepFlow,
  LunaPipelineFlow,
  HookConsequenceOverlay,
  ChapterTitle,
  AgentArchitecturePipeline,
  BuildWalkthroughPipeline,
  ResumeMismatchDiagram,
  ResumeOptimizerPipeline,
  ResumeArchitectureDiagram,
  ResumeBuildWalkthroughDiagram,
  ResumeProofItWorksDiagram,
  ResumeAdaptiveCloseDiagram,
  TechnicalHookOverlay,
  RestrainedClosingOverlay,
  FocusSpotlight,
  CoverLetterWorkflowDiagram,
  CoverLetterArchitectureDiagram,
  CoverLetterBuildWalkthroughDiagram,
  CoverLetterProofItWorksDiagram,
  HookBroll,
  CloseBroll,
};
