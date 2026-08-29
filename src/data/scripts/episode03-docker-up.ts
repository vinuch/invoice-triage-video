import {TerminalScript} from '../../compositions/TerminalReveal';

// PLACEHOLDER — replace lines with real docker compose up output once Adelle syncs
export const dockerUpScript: TerminalScript = {
  title: 'terminal',
  lines: [
    {type: 'command', text: 'docker compose up -d', frameIn: 10},
    {type: 'output', text: '[+] Running 2/2', frameIn: 40, dim: true},
    {type: 'output', text: ' ✔ Container invoice-postgres  Healthy', frameIn: 55},
    {type: 'output', text: ' ✔ Container invoice-redis     Healthy', frameIn: 70},
  ],
};
