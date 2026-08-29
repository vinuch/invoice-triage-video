import {TerminalScript} from '../../compositions/TerminalReveal';

// PLACEHOLDER — replace with real validate.py diff once Adelle syncs
export const validatePlugScript: TerminalScript = {
  title: 'validate.py',
  lines: [
    {type: 'output', text: '- if invoice_id in seen_ids:  # Python set, resets on restart', frameIn: 10, dim: true},
    {type: 'output', text: '+ if is_duplicate(vendor, invoice_number):  # Postgres, persists', frameIn: 50},
    {type: 'status', text: 'DUPLICATE CHECK NOW ASKS POSTGRES', status: 'approved', frameIn: 110},
  ],
};
