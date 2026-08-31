import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

type DiffLine = {
  text: string;
  type: 'remove' | 'add' | 'context';
};

type DiffRevealProps = {
  lines: DiffLine[];
  title?: string;
  startFrame?: number;
  lineStagger?: number;
};

export const DiffReveal: React.FC<DiffRevealProps> = ({
  lines,
  title,
  startFrame = 0,
  lineStagger = 8,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 120px',
        backgroundColor: '#0d1117',
        fontFamily: 'Menlo, Consolas, monospace',
      }}
    >
      {title && (
        <div
          style={{
            color: '#8b949e',
            fontSize: 28,
            marginBottom: 24,
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          backgroundColor: '#161b22',
          borderRadius: 12,
          padding: '32px 40px',
          border: '1px solid #30363d',
        }}
      >
        {lines.map((line, i) => {
          const revealAt = startFrame + i * lineStagger;
          const opacity = interpolate(frame, [revealAt, revealAt + 6], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const translateX = interpolate(
            frame,
            [revealAt, revealAt + 6],
            [line.type === 'remove' ? 0 : -12, 0],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
          );

          const bg =
            line.type === 'add'
              ? 'rgba(46, 160, 67, 0.15)'
              : line.type === 'remove'
              ? 'rgba(248, 81, 73, 0.15)'
              : 'transparent';
          const color =
            line.type === 'add' ? '#3fb950' : line.type === 'remove' ? '#f85149' : '#c9d1d9';
          const prefix = line.type === 'add' ? '+ ' : line.type === 'remove' ? '- ' : '  ';
          const strike = line.type === 'remove' && frame > revealAt + 20;

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                backgroundColor: bg,
                color,
                fontSize: 26,
                lineHeight: 1.6,
                padding: '2px 12px',
                whiteSpace: 'pre',
                textDecoration: strike ? 'line-through' : 'none',
              }}
            >
              {prefix}
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
