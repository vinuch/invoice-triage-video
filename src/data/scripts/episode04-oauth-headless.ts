import {TerminalScript} from '../../compositions/TerminalReveal';

export const oauthHeadlessScript: TerminalScript = {
  title: 'gmail_ingest.py — headless OAuth',
  lines: [
    {type: 'output', text: 'flow.redirect_uri = "http://localhost"', frameIn: 15},
    {type: 'output', text: 'auth_url, _ = flow.authorization_url(prompt="consent")', frameIn: 50},
    {type: 'output', text: 'print(auth_url)', frameIn: 85, dim: true},
    {type: 'output', text: '', frameIn: 110},
    {type: 'output', text: '# open the URL on any device, approve access,', frameIn: 130, dim: true},
    {type: 'output', text: '# then paste the redirect link back into the terminal', frameIn: 160, dim: true},
    {type: 'output', text: '', frameIn: 190},
    {type: 'output', text: 'redirect_response = input("Paste the full redirect URL here: ")', frameIn: 210},
    {type: 'output', text: 'flow.fetch_token(authorization_response=redirect_response)', frameIn: 250},
    {type: 'status', text: 'NO BROWSER? NO PROBLEM — TOKEN CACHES AFTER THIS', status: 'approved', frameIn: 310},
  ],
};
