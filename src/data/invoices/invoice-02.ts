import {TerminalScript} from '../../compositions/TerminalReveal';

export const invoice02: TerminalScript = {
  title: 'invoice_02.json',
  lines: [
    {type: 'command', text: 'python -m app.run invoice_02.pdf', frameIn: 0},
    {type: 'output', text: 'vendor: Acme Supply Co.', frameIn: 45},
    {type: 'output', text: 'subtotal: $1,000.00', frameIn: 60},
    {type: 'output', text: 'tax: $80.00', frameIn: 75},
    {type: 'output', text: 'stated_total: $100,000.00', frameIn: 90},
    {type: 'output', text: 'validation: subtotal + tax ($1,080.00) != stated_total ✗', frameIn: 120},
    {type: 'status', text: 'FLAG: MATH_MISMATCH', status: 'mismatch', frameIn: 150},
  ],
};
