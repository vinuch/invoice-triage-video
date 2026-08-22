import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {colors, fonts} from '../design-tokens';

export const EndCard: React.FC<{selarUrl?: string}> = ({selarUrl = 'selar.co/invoice-triage'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 200}});

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 48,
          fontWeight: 700,
          color: colors.text,
          opacity: p,
          transform: `translateY(${(1 - p) * 20}px)`,
        }}
      >
        Build the full pipeline
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 28,
          color: colors.approved,
          opacity: p,
        }}
      >
        [{selarUrl}]
      </div>
    </AbsoluteFill>
  );
};
