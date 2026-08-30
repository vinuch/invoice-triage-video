import {TerminalScript} from '../../compositions/TerminalReveal';

export const dbPyScript: TerminalScript = {
  title: 'db.py',
  lines: [
    {type: 'output', text: 'def is_duplicate(vendor_name, invoice_number):', frameIn: 10},
    {type: 'output', text: '    with _connect() as conn, conn.cursor() as cur:', frameIn: 35, dim: true},
    {type: 'output', text: '        cur.execute(', frameIn: 60, dim: true},
    {type: 'output', text: '            "SELECT 1 FROM invoices WHERE vendor_name=%s AND invoice_number=%s",', frameIn: 85, dim: true},
    {type: 'output', text: '            (vendor_name, invoice_number),', frameIn: 105, dim: true},
    {type: 'output', text: '        )', frameIn: 120, dim: true},
    {type: 'output', text: '        return cur.fetchone() is not None', frameIn: 140, dim: true},
    {type: 'output', text: '', frameIn: 155},
    {type: 'output', text: 'def record_invoice(vendor_name, invoice_number, total, status):', frameIn: 170},
    {type: 'output', text: '    cur.execute("INSERT INTO invoices ... ON CONFLICT DO NOTHING")', frameIn: 205, dim: true},
    {type: 'status', text: 'NO ORM — RAW SQL, TWO QUERIES', status: 'approved', frameIn: 250},
  ],
};
