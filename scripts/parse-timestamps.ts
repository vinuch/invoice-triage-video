import fs from 'fs';

type WordTiming = {start: number; end: number; word: string};

type SceneBoundary = {
  id: string;
  component: string;
  startWord: string;
  startOccurrence?: number;
  props?: Record<string, unknown>;
};

function parseTimestamps(filePath: string): WordTiming[] {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw
    .replace(/\r/g, '')
    .split('\n')
    .filter((l) => l.includes(' - ') && l.includes(':'));

  const timings: WordTiming[] = [];
  for (const line of lines) {
    // Strip ANSI escape codes before matching — files captured with stdout+stderr
    // merged (e.g. `whisper ... > out.txt 2>&1`) can contain pip/CLI noise with
    // color codes that would otherwise silently fail the regex, which is fine,
    // but a truncated capture (see below) won't fail loudly on its own.
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

function findWordTime(
  timings: WordTiming[],
  word: string,
  occurrence: number = 1
): number {
  const target = word.replace(/[.,!?;:]$/, '').toLowerCase();
  let count = 0;
  for (const t of timings) {
    const clean = t.word.replace(/[.,!?;:]$/, '');
    if (clean.toLowerCase() === target) {
      count++;
      if (count === occurrence) return t.start;
    }
  }

  // The failure mode that actually bit ep2: a truncated timestamps file (CLI
  // noise mixed into stdout, or the transcription run got cut off) has far
  // fewer words than the real narration, so a boundary word from later in the
  // script is never found. The generic "not found" error gives no signal
  // about *why* — so surface the last word actually captured and how many
  // words total, which makes a truncated-capture failure obvious immediately
  // instead of looking like a typo in the scene config.
  const last = timings[timings.length - 1];
  throw new Error(
    `Word "${word}" (occurrence ${occurrence}) not found in timestamps.\n` +
      `  Parsed ${timings.length} words total; last word captured: ` +
      `"${last.word}" ending at ${last.end}s.\n` +
      `  If your script is longer than that, the timestamps file is likely ` +
      `truncated (check for CLI/pip noise mixed into the capture, or a run ` +
      `that got cut off) — re-run the transcription and confirm the full ` +
      `narration duration is covered before re-parsing.`
  );
}

function buildTimeline(timings: WordTiming[], boundaries: SceneBoundary[]) {
  const lastWordEnd = timings[timings.length - 1].end;

  return boundaries.map((b, i) => {
    const startSec = findWordTime(timings, b.startWord, b.startOccurrence ?? 1);
    const nextStart =
      i + 1 < boundaries.length
        ? findWordTime(timings, boundaries[i + 1].startWord, boundaries[i + 1].startOccurrence ?? 1)
        : lastWordEnd;

    if (nextStart <= startSec) {
      console.error(
        `Warning: scene "${b.id}" has zero or negative duration ` +
          `(${startSec}s -> ${nextStart}s). Check startOccurrence for a ` +
          `repeated word, or that boundaries are in narration order.`
      );
    }

    return {
      id: b.id,
      component: b.component,
      startSec: Number(startSec.toFixed(2)),
      endSec: Number(nextStart.toFixed(2)),
      props: b.props,
    };
  });
}

function parseArgs(argv: string[]) {
  const positional = argv.filter((a) => !a.startsWith('--'));
  const [, , timestampsPath, configPath, exportName] = positional;
  const outIdx = argv.indexOf('--out');
  const outPath = outIdx !== -1 ? argv[outIdx + 1] : undefined;
  return {timestampsPath, configPath, exportName, outPath};
}

const {timestampsPath, configPath, exportName, outPath} = parseArgs(process.argv);

if (!timestampsPath || !configPath || !exportName) {
  console.error(
    'Usage: tsx scripts/parse-timestamps.ts <timestamps_file> <scene-config_file> <exportName> [--out <file>]'
  );
  process.exit(1);
}

const timings = parseTimestamps(timestampsPath);
const boundaries: SceneBoundary[] = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const timeline = buildTimeline(timings, boundaries);

const output = `import type {TimelineScene} from './types';\n\nexport const ${exportName}: TimelineScene[] = ${JSON.stringify(
  timeline,
  null,
  2
)};\n`;

if (outPath) {
  fs.writeFileSync(outPath, output);
  console.error(`Wrote ${timeline.length} scenes to ${outPath}`);
} else {
  console.log(output);
}
