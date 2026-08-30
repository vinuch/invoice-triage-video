import {TerminalScript} from '../../compositions/TerminalReveal';

export const gmailOAuthSetupScript: TerminalScript = {
  title: 'Google Cloud Console — one-time setup',
  lines: [
    {type: 'output', text: '1. Enable the Gmail API', frameIn: 20},
    {type: 'output', text: '2. Configure the OAuth consent screen', frameIn: 70},
    {type: 'output', text: '3. Create OAuth credentials — Desktop app', frameIn: 120},
    {type: 'output', text: '4. Download gmail_credentials.json', frameIn: 170},
    {type: 'output', text: '', frameIn: 210},
    {type: 'output', text: '# credentials/  -> gitignored, never committed', frameIn: 230, dim: true},
    {type: 'output', text: '', frameIn: 260},
    {type: 'output', text: 'SCOPES = ["https://www.googleapis.com/auth/gmail.modify"]', frameIn: 290},
    {type: 'status', text: 'READ + MARK READ ONLY — NOT FULL ACCESS', status: 'approved', frameIn: 340},
  ],
};
