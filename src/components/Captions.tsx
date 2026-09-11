	import React, {useMemo} from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts, FPS} from '../design-tokens';
import type {WordTiming} from '../data/captions/types';

/**
 * Word-by-word highlighted captions, driven directly by whisper-style word
 * timestamps (the same "start - end: word" data used to build
 * src/data/timeline/*.ts via scripts/parse-timestamps.ts). Mount this once,
 * as a top-level sibling alongside <Audio>/<TimelineComposition> -- NOT
 * inside a per-scene <Sequence> -- so useCurrentFrame() reads the absolute
 * composition frame and lines up with the words' absolute start/end seconds.
 *
 * Style: word-by-word karaoke highlight rather than static full-line
 * subtitles, matching the HUD/technical visual language already established
 * by TechnicalHookOverlay and FocusSpotlight (mono font, colors.agent glow
 * accent on the "active" element, dark translucent backing). Lives in a
 * fixed lower-third strip so it never competes with ChapterTitle's big
 * centered title text or a diagram's own on-canvas labels.
 *
 * Usage:
 *   <Captions words={build21Captions} />
 */

type CaptionsProps = {
  words: WordTiming[];
  maxWordsPerLine?: number; // group boundary: hard cap on words per caption line
  maxGapSec?: number; // group boundary: a pause longer than this starts a new line
  fadeFrames?: number; // fade in/out duration at each line transition
};

function groupIntoLines(
  words: WordTiming[],
  maxWordsPerLine: number,
  maxGapSec: number
): WordTiming[][] {
  const lines: WordTiming[][] = [];
  let current: WordTiming[] = [];

  for (const w of words) {
    const prev = current[current.length - 1];
    const gap = prev ? w.start - prev.end : 0;
    if (current.length > 0 && (current.length >= maxWordsPerLine || gap > maxGapSec)) {
      lines.push(current);
      current = [];
    }
    current.push(w);
  }
  if (current.length > 0) lines.push(current);
  return lines;
}

export const Captions: React.FC<CaptionsProps> = ({
  words,
  maxWordsPerLine = 7,
  maxGapSec = 0.6,
  fadeFrames = 8,
}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const lines = useMemo(
    () => groupIntoLines(words, maxWordsPerLine, maxGapSec),
    [words, maxWordsPerLine, maxGapSec]
  );

  // Each line stays visible from its own first word until the NEXT line's
  // first word starts, so there's no blank flicker during a mid-sentence
  // pause -- except a small trailing hold after the very last line.
  let activeLineIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    const from = lines[i][0].start;
    const to =
      i + 1 < lines.length
        ? lines[i + 1][0].start
        : lines[i][lines[i].length - 1].end + 1.2;
    if (t >= from && t < to) {
      activeLineIndex = i;
      break;
    }
  }

  if (activeLineIndex === -1) return null;

  const line = lines[activeLineIndex];
  const lineStartFrame = Math.round(line[0].start * FPS);
  const opacity = interpolate(frame, [lineStartFrame, lineStartFrame + fadeFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: '8%',
        right: '8%',
        bottom: '9%',
        opacity,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.45em',
          background: `${colors.bg}E6`,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: '14px 28px',
          maxWidth: '90%',
        }}
      >
        {line.map((w, i) => {
          const spoken = t >= w.end;
          const active = t >= w.start && t < w.end;
          const color = active ? colors.agent : spoken ? colors.text : colors.textDim;
          return (
            <span
              key={`${w.word}-${i}-${w.start}`}
              style={{
                fontFamily: fonts.mono,
                fontSize: 36,
                fontWeight: 700,
                color,
                textShadow: active ? `0 0 18px ${colors.agent}99` : 'none',
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
