import {TerminalScript} from '../../compositions/TerminalReveal';

export const pollingQueryScript: TerminalScript = {
  title: 'gmail_ingest.py',
  lines: [
    {type: 'output', text: 'QUERY = (', frameIn: 15},
    {type: 'output', text: '    "is:unread has:attachment "', frameIn: 45, dim: true},
    {type: 'output', text: '    "(filename:pdf OR filename:png OR filename:jpg)"', frameIn: 75, dim: true},
    {type: 'output', text: ')', frameIn: 100, dim: true},
    {type: 'output', text: '', frameIn: 120},
    {type: 'output', text: 'for msg_meta in messages:', frameIn: 145},
    {type: 'output', text: '    attachment = fetch_attachment(msg_id, attachment_id)', frameIn: 180, dim: true},
    {type: 'output', text: '    png_path = normalize_to_png(tmp_path)', frameIn: 215, dim: true},
    {type: 'output', text: '    result = triage(extract_invoice(png_path))', frameIn: 250, dim: true},
    {type: 'output', text: '    mark_as_read(msg_id)  # next poll skips it', frameIn: 285, dim: true},
    {type: 'status', text: 'UNREAD + ATTACHMENT ONLY — NOT THE WHOLE INBOX', status: 'approved', frameIn: 340},
  ],
};
