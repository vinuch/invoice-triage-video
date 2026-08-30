import {TerminalScript} from '../../compositions/TerminalReveal';

export const schemaScript: TerminalScript = {
  title: 'schema.sql',
  lines: [
    {type: 'output', text: 'CREATE TABLE IF NOT EXISTS invoices (', frameIn: 10},
    {type: 'output', text: '    id SERIAL PRIMARY KEY,', frameIn: 35, dim: true},
    {type: 'output', text: '    vendor_name TEXT NOT NULL,', frameIn: 55, dim: true},
    {type: 'output', text: '    invoice_number TEXT NOT NULL,', frameIn: 75, dim: true},
    {type: 'output', text: '    total NUMERIC(12, 2) NOT NULL,', frameIn: 95, dim: true},
    {type: 'output', text: '    status TEXT NOT NULL,', frameIn: 115, dim: true},
    {type: 'output', text: '    processed_at TIMESTAMPTZ NOT NULL DEFAULT now(),', frameIn: 135, dim: true},
    {type: 'output', text: '    UNIQUE (vendor_name, invoice_number)', frameIn: 160},
    {type: 'output', text: ');', frameIn: 185},
    {type: 'status', text: 'TABLE EXISTS ON CONTAINER START', status: 'approved', frameIn: 220},
  ],
};
