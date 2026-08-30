import {TerminalScript} from '../../compositions/TerminalReveal';

export const providerAbstractionScript: TerminalScript = {
  title: 'extract.py — one interface',
  lines: [
    {type: 'command', text: 'def extract_invoice(image_path: str, provider: str = "anthropic") -> Extraction:', frameIn: 0},
    {type: 'output', text: '  ...  # provider-specific call happens inside', frameIn: 50},
    {type: 'output', text: '  data = json.loads(raw_json)', frameIn: 90},
    {type: 'output', text: '  return Extraction(**data)', frameIn: 130},
    {type: 'command', text: 'extract_invoice("invoice.png", provider="openai")', frameIn: 190},
  ],
};
