import {TerminalScript} from '../../compositions/TerminalReveal';

export const runMessyScript: TerminalScript = {
  title: 'invoice_02_math_error.png',
  lines: [
    {type: 'command', text: 'python -m app.run invoice_02_math_error.png', frameIn: 0},
    {type: 'output', text: 'subtotal: $1,000.00  tax: $80.00  stated_total: $100,000.00', frameIn: 60},
    {type: 'output', text: 'financials.confidence: 0.9', frameIn: 110},
    {type: 'output', text: '# extraction did NOT correct the math or flag the error', frameIn: 150},
    {type: 'status', text: 'extraction reads, it does not judge — that is job two', status: 'review', frameIn: 200},
  ],
};
