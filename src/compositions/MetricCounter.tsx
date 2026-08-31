import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

type MetricCounterProps = {
  from: number;
  to: number;
  label?: string;
  unit?: string;
  prefix?: string;
  startFrame?: number;
  durationFrames?: number;
  decimals?: number;
  color?: string;
};

export const MetricCounter: React.FC<MetricCounterProps> = ({
  from,
  to,
  label,
  unit = '',
  prefix = '',
  startFrame = 0,
  durationFrames = 45,
  decimals = 0,
  color = '#7c3aed',
}) => {
  const frame = useCurrentFrame();

  const value = interpolate(frame, [startFrame, startFrame + durationFrames], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(
    frame,
    [startFrame, startFrame + 10, startFrame + durationFrames],
    [0.9, 1.05, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 140,
          fontWeight: 800,
          color,
          transform: `scale(${scale})`,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {prefix}
        {value.toFixed(decimals)}
        {unit}
      </div>
      {label && (
        <div
          style={{
            fontSize: 32,
            color: '#8b949e',
            marginTop: 16,
            letterSpacing: 1,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
