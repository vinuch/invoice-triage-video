import {TerminalScript} from '../../compositions/TerminalReveal';

export const uploadAPIScript: TerminalScript = {
  title: 'upload_api.py',
  lines: [
    {type: 'output', text: '@app.post("/triage")', frameIn: 15},
    {type: 'output', text: 'async def triage_invoice(file: UploadFile):', frameIn: 45},
    {type: 'output', text: '    ext = os.path.splitext(file.filename)[1].lower()', frameIn: 80, dim: true},
    {type: 'output', text: '    tmp_path = None', frameIn: 110, dim: true},
    {type: 'output', text: '    try:', frameIn: 135, dim: true},
    {type: 'output', text: '        tmp_path = save_to_temp(file, ext)', frameIn: 165, dim: true},
    {type: 'output', text: '        png_path = normalize_to_png(tmp_path)', frameIn: 200, dim: true},
    {type: 'output', text: '        extraction = extract_invoice(png_path)', frameIn: 235, dim: true},
    {type: 'output', text: '        result = triage(extraction)', frameIn: 270, dim: true},
    {type: 'output', text: '        return result.model_dump()', frameIn: 305, dim: true},
    {type: 'output', text: '    finally:', frameIn: 335, dim: true},
    {type: 'output', text: '        cleanup(tmp_path)  # runs no matter what happens above', frameIn: 365, dim: true},
    {type: 'status', text: 'FIVE LINES OF LOGIC, ONE THIN WRAPPER', status: 'approved', frameIn: 420},
  ],
};
