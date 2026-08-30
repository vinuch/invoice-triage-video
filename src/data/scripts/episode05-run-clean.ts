import {TerminalScript} from '../../compositions/TerminalReveal';

export const runCleanScript: TerminalScript = {
  title: 'invoice_01_clean.png',
  lines: [
    {type: 'command', text: 'python -m app.run invoice_01_clean.png', frameIn: 0},
    {type: 'output', text: 'vendor.confidence: 1.0', frameIn: 60},
    {type: 'output', text: 'invoice.confidence: 1.0', frameIn: 90},
    {type: 'output', text: 'financials.confidence: 1.0', frameIn: 120},
    {type: 'output', text: 'overall_confidence: 1.0', frameIn: 150},
    {type: 'status', text: 'clean scan, clear text, nothing ambiguous', status: 'approved', frameIn: 190},
  ],
};
