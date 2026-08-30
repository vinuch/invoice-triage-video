import {TerminalScript} from '../../compositions/TerminalReveal';

export const composeFileScript: TerminalScript = {
  title: 'docker-compose.yml',
  lines: [
    {type: 'output', text: 'services:', frameIn: 10},
    {type: 'output', text: '  postgres:', frameIn: 25, dim: true},
    {type: 'output', text: '    image: postgres:16', frameIn: 45, dim: true},
    {type: 'output', text: '    environment:', frameIn: 65, dim: true},
    {type: 'output', text: '      POSTGRES_USER: ${POSTGRES_USER}', frameIn: 85, dim: true},
    {type: 'output', text: '      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}', frameIn: 105, dim: true},
    {type: 'output', text: '      POSTGRES_DB: ${POSTGRES_DB}', frameIn: 125, dim: true},
    {type: 'output', text: '    ports:', frameIn: 145, dim: true},
    {type: 'output', text: '      - "${POSTGRES_PORT:-5432}:5432"', frameIn: 165, dim: true},
    {type: 'output', text: '    volumes:', frameIn: 185, dim: true},
    {type: 'output', text: '      - pgdata:/var/lib/postgresql/data', frameIn: 205, dim: true},
    {type: 'output', text: '      - ./db/schema.sql:/docker-entrypoint-initdb.d/schema.sql', frameIn: 225, dim: true},
    {type: 'output', text: '    healthcheck:', frameIn: 250, dim: true},
    {type: 'output', text: '      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]', frameIn: 270, dim: true},
    {type: 'output', text: '  redis:', frameIn: 300},
    {type: 'output', text: '    image: redis:7', frameIn: 320, dim: true},
    {type: 'output', text: '    healthcheck:', frameIn: 340, dim: true},
    {type: 'output', text: '      test: ["CMD", "redis-cli", "ping"]', frameIn: 360, dim: true},
  ],
};
