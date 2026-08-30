import {TerminalScript} from '../../compositions/TerminalReveal';

export const threeProvidersScript: TerminalScript = {
  title: 'extract.py — three providers',
  lines: [
    {type: 'command', text: '# Anthropic — image + text in one content array', frameIn: 0},
    {type: 'output', text: '{"type": "image", "source": {...}}, {"type": "text", "text": PROMPT}', frameIn: 45},
    {type: 'command', text: '# OpenAI — data URL, response_format forces JSON', frameIn: 110},
    {type: 'output', text: 'image_url: f"data:{media_type};base64,{image_b64}"', frameIn: 155},
    {type: 'output', text: 'response_format={"type": "json_object"}', frameIn: 190},
    {type: 'command', text: '# Gemini — typed Part, response_mime_type forces JSON', frameIn: 260},
    {type: 'output', text: 'types.Part.from_bytes(data=..., mime_type=media_type)', frameIn: 305},
    {type: 'output', text: 'response_mime_type="application/json"', frameIn: 340},
  ],
};
