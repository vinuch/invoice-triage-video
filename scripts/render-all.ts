#!/usr/bin/env tsx
/**
 * Renders every composition registered in Root.tsx (or a filtered subset)
 * into out/<compositionId>.mp4, logging progress and failures to
 * render_all.log instead of losing them in scrollback. Replaces rendering
 * compositions one at a time by hand.
 *
 * Usage:
 *   npx tsx scripts/render-all.ts                 # render everything
 *   npx tsx scripts/render-all.ts --filter Resume  # only IDs containing "Resume"
 *   npx tsx scripts/render-all.ts --skip FinalVideoBuild21  # exclude one
 *   npx tsx scripts/render-all.ts --dry-run        # list what would render, don't render
 *
 * Continues past individual failures (a broken 3D composition shouldn't stop
 * the other 20 renders) and prints a summary + non-zero exit code if any
 * composition failed, so this is CI/cron-safe.
 */
import {execSync, spawnSync} from 'child_process';
import fs from 'fs';
import path from 'path';

const LOG_PATH = path.resolve('render_all.log');
const OUT_DIR = path.resolve('out');

type Args = {filter?: string; skip?: string; dryRun: boolean};

function parseArgs(argv: string[]): Args {
  const args: Args = {dryRun: false};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--filter') args.filter = argv[++i];
    else if (argv[i] === '--skip') args.skip = argv[++i];
    else if (argv[i] === '--dry-run') args.dryRun = true;
  }
  return args;
}

function log(line: string) {
  const stamped = `[${new Date().toISOString()}] ${line}`;
  console.log(stamped);
  fs.appendFileSync(LOG_PATH, stamped + '\n');
}

function listCompositionIds(): string[] {
  // `remotion compositions` prints a table; the composition ID is the first
  // column. This stays correct even as Root.tsx grows, unlike a hardcoded list.
  const raw = execSync('npx remotion compositions src/index.ts', {encoding: 'utf-8'});
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);

  const ids: string[] = [];
  for (const line of lines) {
    // Skip header/separator lines from the CLI table output.
    if (/^(ID|-+)/i.test(line)) continue;
    const firstCol = line.split(/\s{2,}/)[0]?.trim();
    if (firstCol && /^[A-Za-z][A-Za-z0-9_-]*$/.test(firstCol)) {
      ids.push(firstCol);
    }
  }
  return ids;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  fs.mkdirSync(OUT_DIR, {recursive: true});

  log('--- render-all start ---');

  let ids: string[];
  try {
    ids = listCompositionIds();
  } catch (err) {
    log(`FATAL: could not list compositions — ${(err as Error).message}`);
    process.exit(1);
  }

  if (args.filter) {
    ids = ids.filter((id) => id.includes(args.filter!));
  }
  if (args.skip) {
    ids = ids.filter((id) => id !== args.skip);
  }

  if (ids.length === 0) {
    log('No compositions matched — nothing to render.');
    return;
  }

  log(`Found ${ids.length} composition(s): ${ids.join(', ')}`);

  if (args.dryRun) {
    log('--dry-run set, not rendering.');
    return;
  }

  const results: {id: string; ok: boolean; ms: number}[] = [];

  for (const id of ids) {
    const outFile = path.join(OUT_DIR, `${id}.mp4`);
    const start = Date.now();
    log(`Rendering ${id} -> ${outFile} ...`);

    const result = spawnSync('npx', ['remotion', 'render', 'src/index.ts', id, outFile], {
      encoding: 'utf-8',
    });

    const ms = Date.now() - start;
    const ok = result.status === 0;
    results.push({id, ok, ms});

    if (ok) {
      log(`OK   ${id} (${(ms / 1000).toFixed(1)}s)`);
    } else {
      log(`FAIL ${id} (${(ms / 1000).toFixed(1)}s)`);
      // Keep the full stderr in the log so a failure is diagnosable without
      // re-running by hand — this is the whole point of not doing this manually.
      const tail = (result.stderr || result.stdout || '').split('\n').slice(-25).join('\n');
      log(`  --- last 25 lines of output for ${id} ---\n${tail}`);
    }
  }

  const failed = results.filter((r) => !r.ok);
  log('--- render-all summary ---');
  log(`${results.length - failed.length}/${results.length} succeeded.`);
  if (failed.length > 0) {
    log(`Failed: ${failed.map((f) => f.id).join(', ')}`);
  }
  log('--- render-all end ---');

  if (failed.length > 0) process.exit(1);
}

main();
