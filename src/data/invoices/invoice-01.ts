import {TerminalScript} from '../../compositions/TerminalReveal';

export const invoice01: TerminalScript = {
  title: 'invoice_01.json',
  lines: [
    {type: 'command', text: 'python -m app.run invoice_01.pdf', frameIn: 0},
    {type: 'output', text: 'vendor: Acme Supply Co.', frameIn: 45},
    {type: 'output', text: 'amount: $4,200.00', frameIn: 60},
    {type: 'output', text: 'due_date: 2026-09-01', frameIn: 75},
    {type: 'output', text: 'validation: subtotal + tax == total ✓', frameIn: 105, dim: true},
    {type: 'output', text: 'validation: PO number present ✓', frameIn: 120, dim: true},
    {type: 'output', text: 'validation: no duplicate found ✓', frameIn: 135, dim: true},
    {type: 'status', text: 'APPROVED', status: 'approved', frameIn: 165},
  ],
};
