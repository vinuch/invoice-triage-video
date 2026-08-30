import {TerminalScript} from '../../compositions/TerminalReveal';

export const runUploadScript: TerminalScript = {
  title: 'terminal',
  lines: [
    {type: 'output', text: '$ curl -F "file=@test_invoice.pdf" localhost:8000/triage', frameIn: 15},
    {type: 'output', text: '{', frameIn: 60, dim: true},
    {type: 'output', text: '  "vendor": "Acme Consulting Partners LLC",', frameIn: 90, dim: true},
    {type: 'output', text: '  "invoice_number": "INV-4521",', frameIn: 115, dim: true},
    {type: 'output', text: '  "status": "APPROVED"', frameIn: 140, dim: true},
    {type: 'output', text: '}', frameIn: 160, dim: true},
    {type: 'status', text: 'PATH ONE — DONE, WORKING', status: 'approved', frameIn: 195},
  ],
};
