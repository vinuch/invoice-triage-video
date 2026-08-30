import {TerminalScript} from '../../compositions/TerminalReveal';

// Illustrative — these are the three named failure modes from the narration,
// not captured output from a real failing run.
export const failureModesScript: TerminalScript = {
  title: 'failure modes (illustrative)',
  lines: [
    {type: 'command', text: '# 1. Invalid JSON — throws loudly, call fails immediately', frameIn: 0},
    {type: 'output', text: 'json.decoder.JSONDecodeError: Expecting value', frameIn: 50},
    {type: 'command', text: '# 2. Hallucinated value — returns wrong answer, high confidence', frameIn: 130},
    {type: 'output', text: '"total": 999.00, "financials": {"confidence": 1.0}  # fabricated', frameIn: 180},
    {type: 'command', text: '# 3. Image quality — confidence drops on blurry/angled scans', frameIn: 260},
    {type: 'output', text: 'overall_confidence: 0.62', frameIn: 310},
  ],
};
