import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../design-tokens';
import {SceneBeats} from './SceneBeats';

const LINES = [
  '+ if (response.status !== 200) {',
  '+   retryQueue.push(job);',
  '- const timeout = 3000;',
  '+ const timeout = 8000;',
  '  return job.complete();',
];

const FOCUS_INDICES = [1, 3];

export const DiffReveal: React.FC<{frameIn?: number}> = ({frameIn = 0}) => {
  const frame = useCurrentFrame() - frameIn;

  const settleStart = 40;
  const settleEnd = 65;

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          backgroundColor: colors.bgRaised,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: '32px 40px',
          minWidth: 760,
        }}
      >
        {LINES.map((line, i) => {
          const isFocus = FOCUS_INDICES.includes(i);

          const blur = isFocus
            ? interpolate(frame, [settleStart, settleEnd], [6, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : interpolate(frame, [settleStart, settleEnd], [2, 4], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

          const opacity = isFocus
            ? 1
            : interpolate(frame, [settleStart, settleEnd], [0.8, 0.35], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

          const entryOpacity = interpolate(frame, [i * 6, i * 6 + 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const color = line.startsWith('+')
            ? colors.approved
            : line.startsWith('-')
              ? colors.mismatch
              : colors.textDim;

          return (
            <div
              key={i}
              style={{
                fontFamily: fonts.mono,
                fontSize: 24,
                lineHeight: 1.6,
                color,
                opacity: Math.min(entryOpacity, opacity),
                filter: `blur(${blur}px)`,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
      <SceneBeats
        beats={[
          {
            type: 'caption',
            frameIn: 8,
            frameOut: settleStart,
            text: "Most reviews aren't five hundred lines. They're one or two real decisions.",
          },
          {
            type: 'caption',
            frameIn: settleStart + 5,
            text: "A phone can surface **just those two** — enough to unblock the work.",
          },
        ]}
      />
    </AbsoluteFill>
  );
};
