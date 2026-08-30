import {TerminalScript} from '../../compositions/TerminalReveal';

export const rerunScript: TerminalScript = {
  title: 'terminal',
  lines: [
    {type: 'command', text: 'docker compose restart postgres', frameIn: 10},
    {type: 'output', text: 'Container invoice-triage-postgres-1  Started', frameIn: 45, dim: true},
    {type: 'command', text: 'python -m app.run_batch openrouter', frameIn: 90},
    {type: 'output', text: 'invoice_01_clean.png  →  FLAGGED (duplicate)', frameIn: 140, dim: true},
    {type: 'output', text: 'invoice_02...05       →  FLAGGED (duplicate)', frameIn: 175, dim: true},
    {type: 'status', text: 'DUPLICATE — RECORD ISN\'T IN MEMORY, IT\'S IN POSTGRES', status: 'duplicate', frameIn: 220},
  ],
};
