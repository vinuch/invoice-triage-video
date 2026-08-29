import {TerminalScript} from '../../compositions/TerminalReveal';

// PLACEHOLDER — replace with real docker-compose.yml content once Adelle syncs
export const composeFileScript: TerminalScript = {
  title: 'docker-compose.yml',
  lines: [
    {type: 'output', text: 'services:', frameIn: 10},
    {type: 'output', text: '  postgres:', frameIn: 25, dim: true},
    {type: 'output', text: '    image: postgres:16', frameIn: 45, dim: true},
    {type: 'output', text: '    environment:', frameIn: 65, dim: true},
    {type: 'output', text: '      POSTGRES_USER: invoice_app', frameIn: 85, dim: true},
    {type: 'output', text: '      POSTGRES_PASSWORD: ${DB_PASSWORD}', frameIn: 105, dim: true},
    {type: 'output', text: '      POSTGRES_DB: invoice_triage', frameIn: 125, dim: true},
    {type: 'output', text: '    volumes:', frameIn: 150, dim: true},
    {type: 'output', text: '      - pgdata:/var/lib/postgresql/data', frameIn: 170, dim: true},
    {type: 'output', text: '    healthcheck:', frameIn: 195, dim: true},
    {type: 'output', text: '      test: ["CMD-SHELL", "pg_isready"]', frameIn: 215, dim: true},
    {type: 'output', text: '  redis:', frameIn: 245},
    {type: 'output', text: '    image: redis:7-alpine', frameIn: 265, dim: true},
    {type: 'output', text: '    ports: ["6379:6379"]', frameIn: 285, dim: true},
    {type: 'output', text: '    healthcheck:', frameIn: 305, dim: true},
    {type: 'output', text: '      test: ["CMD", "redis-cli", "ping"]', frameIn: 325, dim: true},
  ],
};
