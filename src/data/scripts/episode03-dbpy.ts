import {TerminalScript} from '../../compositions/TerminalReveal';

// PLACEHOLDER — replace with real db.py content once Adelle syncs
export const dbPyScript: TerminalScript = {
  title: 'db.py',
  lines: [
    {type: 'output', text: 'def is_duplicate(vendor, invoice_number):', frameIn: 10},
    {type: 'output', text: '    return db.execute(', frameIn: 35, dim: true},
    {type: 'output', text: '        "SELECT 1 FROM invoices WHERE vendor_name=%s AND invoice_number=%s",', frameIn: 60, dim: true},
    {type: 'output', text: '        (vendor, invoice_number)', frameIn: 90, dim: true},
    {type: 'output', text: '    ).fetchone() is not None', frameIn: 115, dim: true},
    {type: 'output', text: '', frameIn: 140},
    {type: 'output', text: 'def record_invoice(vendor, invoice_number, total, status):', frameIn: 155},
    {type: 'output', text: '    db.execute("INSERT INTO invoices ... ")', frameIn: 190, dim: true},
    {type: 'status', text: 'NO ORM — RAW SQL, TWO QUERIES', status: 'approved', frameIn: 240},
  ],
};
