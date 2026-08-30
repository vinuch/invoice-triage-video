import {TerminalScript} from '../../compositions/TerminalReveal';

export const validatePlugScript: TerminalScript = {
  title: 'validate.py',
  lines: [
    {type: 'output', text: '- if key in _SEEN_INVOICES:  # Python set, resets on restart', frameIn: 10, dim: true},
    {type: 'output', text: '+ if db.is_duplicate(vendor, number):  # Postgres, persists', frameIn: 55},
    {type: 'status', text: 'DUPLICATE CHECK NOW ASKS POSTGRES', status: 'approved', frameIn: 115},
  ],
};
