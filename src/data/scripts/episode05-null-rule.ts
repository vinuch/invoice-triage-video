import {TerminalScript} from '../../compositions/TerminalReveal';

export const nullRuleScript: TerminalScript = {
  title: 'EXTRACTION_PROMPT (rules)',
  lines: [
    {type: 'command', text: 'Rules:', frameIn: 0},
    {type: 'output', text: '- If a field is not visible or not present, use null (never invent a value).', frameIn: 45},
    {type: 'output', text: '- confidence reflects certainty, not whether the field exists.', frameIn: 90},
    {type: 'output', text: '- Respond with ONLY the JSON object. No markdown, no commentary.', frameIn: 135},
  ],
};
