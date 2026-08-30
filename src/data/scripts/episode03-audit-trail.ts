import {TerminalScript} from '../../compositions/TerminalReveal';

export const auditTrailScript: TerminalScript = {
  title: 'python -m app.run_batch openrouter',
  lines: [
    {type: 'output', text: 'invoice_01_clean.png            →  APPROVED', frameIn: 10},
    {type: 'output', text: 'invoice_02_math_error.png       →  FLAGGED', frameIn: 45},
    {type: 'output', text: 'invoice_03_missing_po.png       →  NEEDS_REVIEW', frameIn: 80},
    {type: 'output', text: 'invoice_04_high_value.png       →  NEEDS_REVIEW', frameIn: 115},
    {type: 'output', text: 'invoice_05_duplicate_of_01.png  →  FLAGGED (duplicate)', frameIn: 150},
    {type: 'status', text: 'EVERY RESULT WRITTEN TO POSTGRES — THIS IS YOUR AUDIT TRAIL', status: 'approved', frameIn: 195},
  ],
};
