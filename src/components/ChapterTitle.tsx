import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from briefs tYNM2 + If1gb (both "The Build" section-intro cards)
// Reusable chapter marker: title + optional subtitle/thesis line
type ChapterTitleProps = {
  title: string;
  subtitle?: string;
  startFrame?: number;
};

export const ChapterTitle: React.FC<ChapterTitleProps> = ({
  title,
  subtitle,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [startFrame, startFrame + 18], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lineWidth = interpolate(frame, [startFrame + 15, startFrame + 35], [0, 80], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(
    frame,
    [startFrame + 30, startFrame + 48],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0d1117',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          color: '#e6edf3',
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        {title}
      </div>

      <div
        style={{
          width: lineWidth,
          height: 3,
          background: '#a371f7',
          margin: '24px 0',
          borderRadius: 2,
        }}
      />

      {subtitle && (
        <div
          style={{
            opacity: subtitleOpacity,
            color: '#8b949e',
            fontSize: 28,
            maxWidth: 900,
            textAlign: 'center',
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
