import {TerminalScript} from '../../compositions/TerminalReveal';

export const invoice04: TerminalScript = {
  title: 'invoice_04.json',
  lines: [
    {type: 'command', text: 'python -m app.run invoice_04.pdf', frameIn: 0},
    {type: 'output', text: 'vendor: Summit Materials', frameIn: 45},
    {type: 'output', text: 'amount: $7,900.00', frameIn: 60},
    {type: 'output', text: 'validation: amount > review_threshold ($5,000) ✗', frameIn: 90},
    {type: 'status', text: 'FLAG: HIGH_VALUE', status: 'review', frameIn: 120},
  ],
};
