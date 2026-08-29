import {TerminalScript} from '../../compositions/TerminalReveal';

export const auditTrailScript: TerminalScript = {
  title: 'triage output',
  lines: [
    {type: 'output', text: 'invoice_01  →  APPROVED   → written to invoices', frameIn: 10},
    {type: 'output', text: 'invoice_02  →  FLAG       → written to invoices', frameIn: 45},
    {type: 'output', text: 'invoice_03  →  FLAG       → written to invoices', frameIn: 80},
    {type: 'output', text: 'invoice_04  →  REVIEW     → written to invoices', frameIn: 115},
    {type: 'output', text: 'invoice_05  →  DUPLICATE  → written to invoices', frameIn: 150},
    {type: 'status', text: 'EVERYTHING WRITTEN — THIS IS YOUR AUDIT TRAIL', status: 'approved', frameIn: 190},
  ],
};
