import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from brief aywOt9D7 / wGeea (reusable overlay)
// "Restrained closing overlay that reinforces the previously stated business
//  value, without inventing metrics or claims. Editable placeholder for the
//  value recap, followed by a standard CTA. Text animates in gently and
//  holds long enough to be read before fading out."

const accent = '#a371f7';

type RestrainedClosingOverlayProps = {
  valueRecap?: string;
  cta?: string;
  startFrame?: number;
  holdFrames?: number;
};

export const RestrainedClosingOverlay: React.FC<RestrainedClosingOverlayProps> = ({
  valueRecap = '[RESTATED BUSINESS VALUE]',
  cta = '[STANDARD CTA — insert existing closing]',
  startFrame = 0,
  holdFrames = 90,
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;

  const fadeInEnd = 24;
  const holdEnd = fadeInEnd + holdFrames;
  const fadeOutEnd = holdEnd + 24;

  const opacity = interpolate(
    t,
    [0, fadeInEnd, holdEnd, fadeOutEnd],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );
  const y = interpolate(t, [0, fadeInEnd], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaOpacity = interpolate(
    t,
    [fadeInEnd + 10, fadeInEnd + 28, holdEnd, fadeOutEnd],
    [0, 1, 1, 0],
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
          opacity,
          transform: `translateY(${y}px)`,
          color: '#e6edf3',
          fontSize: 38,
          fontWeight: 700,
          textAlign: 'center',
          maxWidth: 900,
        }}
      >
        {valueRecap}
      </div>

      <div
        style={{
          opacity: ctaOpacity,
          marginTop: 26,
          padding: '12px 28px',
          borderRadius: 10,
          border: `1px solid ${accent}66`,
          color: accent,
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        {cta}
      </div>
    </div>
  );
};
