import {TerminalScript} from '../../compositions/TerminalReveal';

export const rerunScript: TerminalScript = {
  title: 'terminal',
  lines: [
    {type: 'command', text: 'python run_batch.py --kill-mid-run', frameIn: 10},
    {type: 'output', text: 'invoice_01  →  APPROVED', frameIn: 60, dim: true},
    {type: 'output', text: 'invoice_02  →  FLAG', frameIn: 90, dim: true},
    {type: 'output', text: '--- process killed, restarted ---', frameIn: 140, dim: true},
    {type: 'output', text: 'invoice_05  →', frameIn: 190},
    {type: 'status', text: 'DUPLICATE — RECORD ISN\'T IN MEMORY, IT\'S IN POSTGRES', status: 'duplicate', frameIn: 240},
  ],
};
