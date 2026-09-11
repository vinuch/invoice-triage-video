import type {TimelineScene} from './types';

export const build22Timeline: TimelineScene[] = [
  {
    "id": "HookOverlay",
    "component": "TechnicalHookOverlay",
    "startSec": 0,
    "endSec": 4.44
  },
  {
    "id": "HookDiagram",
    "component": "HookBroll",
    "startSec": 4.44,
    "endSec": 23.8
  },
  {
    "id": "Chapter-TheBuild",
    "component": "ChapterTitle",
    "startSec": 23.8,
    "endSec": 25.66,
    "props": {
      "title": "The Build",
      "subtitle": "It gets the material — resume, job posting, company site — before it writes a word."
    }
  },
  {
    "id": "TheBuildDiagram",
    "component": "CoverLetterWorkflowDiagram",
    "startSec": 25.66,
    "endSec": 47.26
  },
  {
    "id": "Chapter-Architecture",
    "component": "ChapterTitle",
    "startSec": 47.26,
    "endSec": 48.48,
    "props": {
      "title": "Architecture",
      "subtitle": "Resume, job posting, and company site — fused into one grounded argument."
    }
  },
  {
    "id": "ArchitectureDiagram",
    "component": "CoverLetterArchitectureDiagram",
    "startSec": 48.48,
    "endSec": 187.54
  },
  {
    "id": "Chapter-BuildWalkthrough",
    "component": "ChapterTitle",
    "startSec": 187.54,
    "endSec": 189,
    "props": {
      "title": "Build Walkthrough",
      "subtitle": "Ingestion, research, fusion, generation, grounding — six stages, end to end."
    }
  },
  {
    "id": "BuildWalkthroughDiagram",
    "component": "CoverLetterBuildWalkthroughDiagram",
    "startSec": 189,
    "endSec": 419.24
  },
  {
    "id": "Chapter-ProofItWorks",
    "component": "ChapterTitle",
    "startSec": 419.24,
    "endSec": 420.18,
    "props": {
      "title": "Proof It Works",
      "subtitle": "One resume, one real job posting — Stripe, no shortcuts."
    }
  },
  {
    "id": "ProofItWorksDiagram",
    "component": "CoverLetterProofItWorksDiagram",
    "startSec": 420.18,
    "endSec": 621.74
  },
  {
    "id": "Chapter-Close",
    "component": "ChapterTitle",
    "startSec": 621.74,
    "endSec": 622.4,
    "props": {
      "title": "Close",
      "subtitle": "One resume. Every application. Always grounded."
    }
  },
  {
    "id": "CloseDiagram",
    "component": "CloseBroll",
    "startSec": 622.4,
    "endSec": 631
  },
  {
    "id": "ClosingOverlay",
    "component": "RestrainedClosingOverlay",
    "startSec": 631,
    "endSec": 634.54,
    "props": {
      "valueRecap": "One resume, four documents, every claim grounded and checked.",
      "cta": "Full build, code, grounding engine — Selar, link's below."
    }
  }
];
