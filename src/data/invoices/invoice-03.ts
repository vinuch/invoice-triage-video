import {TerminalScript} from '../../compositions/TerminalReveal';

export const invoice03: TerminalScript = {
  title: 'invoice_03.json',
  lines: [
    {type: 'command', text: 'python -m app.run invoice_03.pdf', frameIn: 0},
    {type: 'output', text: 'vendor: Northgate Logistics', frameIn: 45},
    {type: 'output', text: 'amount: $4,481.00', frameIn: 60},
    {type: 'output', text: 'po_number: null', frameIn: 90},
    {type: 'output', text: 'validation: PO number missing ✗', frameIn: 120},
    {type: 'status', text: 'FLAG: MISSING_PO', status: 'review', frameIn: 150},
  ],
};
