import {TerminalScript} from '../../compositions/TerminalReveal';

export const confidenceFloorScript: TerminalScript = {
  title: 'validate.py',
  lines: [
    {type: 'command', text: 'CONFIDENCE_FLOOR = 0.90', frameIn: 0},
    {type: 'output', text: 'def check_confidence(extraction):', frameIn: 45},
    {type: 'output', text: '  if extraction.overall_confidence < CONFIDENCE_FLOOR:', frameIn: 75},
    {type: 'output', text: '    return Flag(type="low_confidence", severity="medium", ...)', frameIn: 105},
    {type: 'status', text: 'medium severity — human should glance, not definitely broken', status: 'review', frameIn: 150},
  ],
};
