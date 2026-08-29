import fs from 'fs';

type WordTiming = { start: number; end: number; word: string };

type SceneBoundary = {
  id: string;
  component: string;
  startWord: string;
  startOccurrence?: number;
  props?: Record<string, unknown>;
};

function parseTimestamps(filePath: string): WordTiming[] {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.replace(/\r/g, '').split('\n').filter((l) => l.includes(' - ') && l.includes(':'));

  const timings: WordTiming[] = [];
  for (const line of lines) {
    const match = line.match(/^([\d.]+)\s*-\s*([\d.]+):\s*(.+)$/);
    if (!match) continue;
    const [, start, end, word] = match;
    timings.push({ start: parseFloat(start), end: parseFloat(end), word: word.trim() });
  }
  return timings;
}

function findWordTime(timings: WordTiming[], word: string, occurrence: number = 1): number {
  let count = 0;
  for (const t of timings) {
    const clean = t.word.replace(/[.,!?;:]$/, '');
    if (clean.toLowerCase() === word.toLowerCase()) {
      count++;
      if (count === occurrence) return t.start;
    }
  }
  throw new Error(`Word "${word}" (occurrence ${occurrence}) not found in timestamps`);
}

function buildTimeline(timings: WordTiming[], boundaries: SceneBoundary[]) {
  const lastWordEnd = timings[timings.length - 1].end;

  return boundaries.map((b, i) => {
    const startSec = findWordTime(timings, b.startWord, b.startOccurrence ?? 1);
    const nextStart = i + 1 < boundaries.length
      ? findWordTime(timings, boundaries[i + 1].startWord, boundaries[i + 1].startOccurrence ?? 1)
      : lastWordEnd;

    return {
      id: b.id,
      component: b.component,
      startSec: Number(startSec.toFixed(2)),
      endSec: Number(nextStart.toFixed(2)),
      props: b.props,
    };
  });
}

const [, , timestampsPath, configPath, exportName] = process.argv;
if (!timestampsPath || !configPath || !exportName) {
  console.error('Usage: tsx scripts/parse-timestamps.ts <timestamps_file> <scene-config_file> <exportName>');
  process.exit(1);
}

const timings = parseTimestamps(timestampsPath);
const boundaries: SceneBoundary[] = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const timeline = buildTimeline(timings, boundaries);

console.log(`import type {TimelineScene} from './types';\n\nexport const ${exportName}: TimelineScene[] = ${JSON.stringify(timeline, null, 2)};`);
