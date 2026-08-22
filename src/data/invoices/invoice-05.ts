import {TerminalScript} from '../../compositions/TerminalReveal';

export const invoice05: TerminalScript = {
  title: 'invoice_05.json',
  lines: [
    {type: 'command', text: 'python -m app.run invoice_05.pdf', frameIn: 0},
    {type: 'output', text: 'vendor: Acme Supply Co.', frameIn: 45},
    {type: 'output', text: 'invoice_number: INV-88213', frameIn: 60},
    {type: 'output', text: 'validation: matches previously processed invoice ✗', frameIn: 120},
    {type: 'status', text: 'FLAG: DUPLICATE', status: 'duplicate', frameIn: 150},
  ],
};
