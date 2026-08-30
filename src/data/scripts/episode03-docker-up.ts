import {TerminalScript} from '../../compositions/TerminalReveal';

export const dockerUpScript: TerminalScript = {
  title: 'terminal',
  lines: [
    {type: 'command', text: 'docker compose up -d', frameIn: 10},
    {type: 'output', text: '[+] Running 2/2', frameIn: 40, dim: true},
    {type: 'output', text: ' ✔ Container invoice-triage-postgres-1  Healthy', frameIn: 55},
    {type: 'output', text: ' ✔ Container invoice-triage-redis-1     Healthy', frameIn: 70},
  ],
};
