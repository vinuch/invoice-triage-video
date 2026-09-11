import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from brief lnloZ (Section 1: Hook)
// "visceral problem statement overlay ... outcome emphasized in red"
type HookConsequenceOverlayProps = {
  leadText?: string;
  consequenceText?: string;
  startFrame?: number;
};

export const HookConsequenceOverlay: React.FC<HookConsequenceOverlayProps> = ({
  leadText = 'You miss the deadline',
  consequenceText = 'and lose the client.',
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();

  const leadOpacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const underlineWidth = interpolate(
    frame,
    [startFrame + 20, startFrame + 40],
    [0, 100],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const consequenceOpacity = interpolate(
    frame,
    [startFrame + 35, startFrame + 55],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const consequenceShake =
    frame > startFrame + 55 && frame < startFrame + 62
      ? Math.sin((frame - startFrame - 55) * 4) * 2
      : 0;

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
          opacity: leadOpacity,
          color: '#e6edf3',
          fontSize: 52,
          fontWeight: 600,
        }}
      >
        {leadText}
      </div>

      <div
        style={{
          width: `${underlineWidth}%`,
          maxWidth: 500,
          height: 2,
          background: '#f85149',
          margin: '20px 0',
        }}
      />

      <div
        style={{
          opacity: consequenceOpacity,
          transform: `translateX(${consequenceShake}px)`,
          color: '#f85149',
          fontSize: 64,
          fontWeight: 800,
          textAlign: 'center',
        }}
      >
        {consequenceText}
      </div>
    </div>
  );
};
