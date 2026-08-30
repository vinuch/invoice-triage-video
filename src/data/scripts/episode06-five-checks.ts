import {Beat} from '../../compositions/SceneBeats';

export const fiveChecksBeats: Beat[] = [
  {
    type: 'cardStack',
    origin: {top: 200, left: 200},
    direction: 'vertical',
    gap: 20,
    cards: [
      {label: 'Math verification', frameIn: 0},
      {label: 'Duplicate detection', frameIn: 20},
      {label: 'Confidence floor', frameIn: 40},
      {label: 'Missing PO', frameIn: 60},
      {label: 'High value', frameIn: 80},
    ],
  },
];
