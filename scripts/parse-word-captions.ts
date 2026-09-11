import fs from 'fs';

type WordTiming = {start: number; end: number; word: string};

function parseTimestamps(filePath: string): WordTiming[] {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw
    .replace(/\r/g, '')
    .split('\n')
    .filter((l) => l.includes(' - ') && l.includes(':'));

  const timings: WordTiming[] = [];
  for (const line of lines) {
    // Strip ANSI escape codes before matching -- same rationale as
    // parse-timestamps.ts: files captured with stdout+stderr merged can
    // contain color-coded CLI noise that would otherwise fail silently.
    const clean = line.replace(/\x1b\[[0-9;]*m/g, '');
    const match = clean.match(/^([\d.]+)\s*-\s*([\d.]+):\s*(.+)$/);
    if (!match) continue;
    const [, start, end, word] = match;
    timings.push({start: parseFloat(start), end: parseFloat(end), word: word.trim()});
  }

  if (timings.length === 0) {
    throw new Error(
      `No word timings parsed from ${filePath}. Check the file actually contains ` +
        `"0.00 - 0.32: word" style lines and isn't just captured stderr/pip noise.`
    );
  }

  return timings;
}

function parseArgs(argv: string[]) {
  const positional = argv.filter((a) => !a.startsWith('--'));
  const [, , timestampsPath, exportName] = positional;
  const outIdx = argv.indexOf('--out');
  const outPath = outIdx !== -1 ? argv[outIdx + 1] : undefined;
  return {timestampsPath, exportName, outPath};
}

const {timestampsPath, exportName, outPath} = parseArgs(process.argv);

if (!timestampsPath || !exportName) {
  console.error(
    'Usage: tsx scripts/parse-word-captions.ts <timestamps_file> <exportName> [--out <file>]'
  );
  process.exit(1);
}

const timings = parseTimestamps(timestampsPath);

const output = `import type {WordTiming} from './types';\n\nexport const ${exportName}: WordTiming[] = ${JSON.stringify(
  timings,
  null,
  2
)};\n`;

if (outPath) {
  fs.writeFileSync(outPath, output);
  console.error(`Wrote ${timings.length} word timings to ${outPath}`);
} else {
  console.log(output);
}
