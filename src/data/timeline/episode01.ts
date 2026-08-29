import type {TimelineScene} from './types';

export const episode01Timeline: TimelineScene[] = [
  {
    "id": "Scene-OpeningHook",
    "component": "SceneOpeningHook",
    "startSec": 0,
    "endSec": 16.74
  },
  {
    "id": "Diagram-Extract",
    "component": "PipelineDiagram",
    "startSec": 16.74,
    "endSec": 35.56,
    "props": {
      "highlight": "extract"
    }
  },
  {
    "id": "Diagram-Validate",
    "component": "PipelineDiagram",
    "startSec": 35.56,
    "endSec": 43.3,
    "props": {
      "highlight": "validate"
    }
  },
  {
    "id": "Diagram-Both",
    "component": "PipelineDiagram",
    "startSec": 43.3,
    "endSec": 47,
    "props": {
      "highlight": "both"
    }
  },
  {
    "id": "Terminal-Invoice01-Approved",
    "component": "TerminalReveal",
    "startSec": 47,
    "endSec": 52.22
  },
  {
    "id": "Terminal-Invoice02-MathMismatch",
    "component": "TerminalReveal",
    "startSec": 52.22,
    "endSec": 59.68
  },
  {
    "id": "Terminal-Invoice03-MissingPO",
    "component": "TerminalReveal",
    "startSec": 59.68,
    "endSec": 64.66
  },
  {
    "id": "Terminal-Invoice04-HighValue",
    "component": "TerminalReveal",
    "startSec": 64.66,
    "endSec": 72.48
  },
  {
    "id": "Terminal-Invoice05-Duplicate",
    "component": "TerminalReveal",
    "startSec": 72.48,
    "endSec": 80.8
  },
  {
    "id": "BatchSummary",
    "component": "BatchSummary",
    "startSec": 80.8,
    "endSec": 82.56
  },
  {
    "id": "Scene-ClosingRecap",
    "component": "SceneClosingRecap",
    "startSec": 82.56,
    "endSec": 92.36
  },
  {
    "id": "Scene-ClosingCTA",
    "component": "SceneClosingCTA",
    "startSec": 92.36,
    "endSec": 100.32
  }
];
