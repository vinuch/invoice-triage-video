import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {colors, fonts} from '../design-tokens';

const built = [
  {label: 'extract.py', sub: 'VLM extraction'},
  {label: 'validate.py', sub: 'validation engine'},
];

const future = [
  {label: 'inbox_ingest.py', sub: 'real inbox ingestion'},
  {label: 'review_ui/', sub: 'review dashboard'},
  {label: 'benchmark.py', sub: 'real-invoice benchmark'},
];

export const ArchitectureDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        alignItems: "center",
        justifyContent: "center",
        translate: "-0.1px -0.1px",
      }}
    >
      <div style={{display: 'flex', gap: 32}}>
        {built.map((n) => (
          <div
            key={n.label}
            style={{
              border: `2px solid ${colors.approved}`,
              borderRadius: 12,
              padding: '24px 32px',
              backgroundColor: colors.bgRaised,
            }}
          >
            <div style={{fontFamily: fonts.mono, fontSize: 24, fontWeight: 700, color: colors.approved}}>
              [{n.label}]
            </div>
            <div style={{fontFamily: fonts.display, fontSize: 16, color: colors.text, opacity: 0.8}}>{n.sub}</div>
          </div>
        ))}
        {future.map((n, i) => {
          const delay = 30 + i * 20;
          const p = spring({frame: frame - delay, fps, config: {damping: 200}});
          return (
            <div
              key={n.label}
              style={{
                border: `2px dashed ${colors.border}`,
                borderRadius: 12,
                padding: '24px 32px',
                backgroundColor: colors.bgRaised,
                opacity: p * 0.6,
                transform: `translateY(${(1 - p) * 16}px)`,
              }}
            >
              <div style={{fontFamily: fonts.mono, fontSize: 24, fontWeight: 700, color: colors.textDim}}>
                [{n.label}]
              </div>
              <div style={{fontFamily: fonts.display, fontSize: 16, color: colors.textDim}}>{n.sub}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
