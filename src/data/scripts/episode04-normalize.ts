import {TerminalScript} from '../../compositions/TerminalReveal';

export const normalizeScript: TerminalScript = {
  title: 'normalize.py',
  lines: [
    {type: 'output', text: 'IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg"}', frameIn: 15},
    {type: 'output', text: '', frameIn: 40},
    {type: 'output', text: 'def normalize_to_png(file_path: str) -> str:', frameIn: 55},
    {type: 'output', text: '    ext = os.path.splitext(file_path)[1].lower()', frameIn: 90, dim: true},
    {type: 'output', text: '    if ext in IMAGE_EXTENSIONS:', frameIn: 120, dim: true},
    {type: 'output', text: '        return file_path  # already a PNG-compatible image', frameIn: 150, dim: true},
    {type: 'output', text: '', frameIn: 175},
    {type: 'output', text: '    # PDF path: render page 1 at 200 DPI', frameIn: 190, dim: true},
    {type: 'output', text: '    pages = convert_from_path(file_path, dpi=200)', frameIn: 225, dim: true},
    {type: 'output', text: '    png_path = file_path + ".png"', frameIn: 260, dim: true},
    {type: 'output', text: '    pages[0].save(png_path, "PNG")', frameIn: 290, dim: true},
    {type: 'output', text: '    return png_path', frameIn: 320, dim: true},
    {type: 'status', text: 'PDF OR IMAGE IN — CLEAN PNG OUT', status: 'approved', frameIn: 360},
  ],
};
