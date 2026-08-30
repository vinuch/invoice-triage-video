import {TerminalScript} from '../../compositions/TerminalReveal';

export const runGmailScript: TerminalScript = {
  title: 'terminal',
  lines: [
    {type: 'output', text: '$ python -m app.gmail_ingest', frameIn: 15},
    {type: 'output', text: 'Found 1 matching message(s).', frameIn: 55, dim: true},
    {type: 'output', text: '', frameIn: 80},
    {type: 'output', text: 'Processing: Invoice test', frameIn: 100},
    {type: 'output', text: '  Vendor:  Acme Consulting Partners LLC', frameIn: 140, dim: true},
    {type: 'output', text: '  Invoice: INV-4521', frameIn: 170, dim: true},
    {type: 'output', text: '  Status:  FLAGGED', frameIn: 200},
    {type: 'output', text: '    [HIGH] duplicate: already processed.', frameIn: 240, dim: true},
    {type: 'output', text: '  Marked read.', frameIn: 280, dim: true},
    {type: 'status', text: 'SAME DB, SAME CHECK — UPLOAD OR EMAIL, NO DIFFERENCE', status: 'approved', frameIn: 340},
  ],
};
