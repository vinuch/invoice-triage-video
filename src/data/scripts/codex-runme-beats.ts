import {Beat} from '../../compositions/SceneBeats';

export const problemBeats: Beat[] = [
  {
    type: 'cardStack',
    origin: {top: 200, left: 200},
    direction: 'vertical',
    gap: 20,
    cards: [
      {label: 'Slack threads', frameIn: 0},
      {label: 'Runbooks', frameIn: 20},
      {label: "One guy's terminal history", frameIn: 40},
    ],
  },
];

export const coreConceptBeats: Beat[] = [
  {
    type: 'cardStack',
    origin: {top: 200, left: 200},
    direction: 'horizontal',
    gap: 24,
    cards: [
      {label: 'You write the goal', frameIn: 0},
      {label: 'Codex writes the plan', frameIn: 20},
      {label: 'You approve it', frameIn: 40},
    ],
  },
];
