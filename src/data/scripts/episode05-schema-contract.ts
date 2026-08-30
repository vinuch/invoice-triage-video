import {TerminalScript} from '../../compositions/TerminalReveal';

export const schemaContractScript: TerminalScript = {
  title: 'EXTRACTION_PROMPT (schema)',
  lines: [
    {type: 'command', text: '"vendor": {"name": ..., "confidence": 0.0-1.0}', frameIn: 0},
    {type: 'output', text: '"invoice": {"number": ..., "po_number": "... or null", "confidence": 0.0-1.0}', frameIn: 40},
    {type: 'output', text: '"financials": {"subtotal": 0.0, "total": 0.0, "confidence": 0.0-1.0}', frameIn: 80},
    {type: 'output', text: '"line_items": [{"description": ..., "quantity": 1, "unit_price": 0.0}]', frameIn: 120},
    {type: 'output', text: '"overall_confidence": 0.0-1.0', frameIn: 160},
  ],
};
