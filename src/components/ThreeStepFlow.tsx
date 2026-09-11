import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from AssetBrief 0NOh2mp6
// "script doc -> Asset Forge processing panel -> organized asset cards (diagram/overlay/b-roll)"
type ThreeStepFlowProps = {
  startFrame?: number;
};

const Card: React.FC<{
  x: number;
  label: string;
  sublabel: string;
  revealAt: number;
  frame: number;
  accent: string;
}> = ({x, label, sublabel, revealAt, frame, accent}) => {
  const opacity = interpolate(frame, [revealAt, revealAt + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [revealAt, revealAt + 12], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: '50%',
        transform: `translate(0, calc(-50% + ${y}px))`,
        opacity,
        width: 220,
        padding: '24px 20px',
        borderRadius: 16,
        background: '#161b22',
        border: `1px solid ${accent}55`,
        boxShadow: `0 0 24px ${accent}22`,
      }}
    >
      <div style={{color: accent, fontSize: 14, fontWeight: 700, letterSpacing: 1}}>
        {sublabel}
      </div>
      <div style={{color: '#e6edf3', fontSize: 20, fontWeight: 600, marginTop: 6}}>
        {label}
      </div>
    </div>
  );
};

export const ThreeStepFlow: React.FC<ThreeStepFlowProps> = ({startFrame = 0}) => {
  const frame = useCurrentFrame();

  const arrow1 = interpolate(frame, [startFrame + 15, startFrame + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arrow2 = interpolate(frame, [startFrame + 55, startFrame + 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const clockOpacity = interpolate(frame, [startFrame + 90, startFrame + 105], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const clockRotation = interpolate(frame, [startFrame + 90, startFrame + 180], [0, 360]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0d1117',
        position: 'relative',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <Card
        x={80}
        label="Script.md"
        sublabel="INPUT"
        revealAt={startFrame}
        frame={frame}
        accent="#58a6ff"
      />

      {/* Arrow 1 */}
      <div
        style={{
          position: 'absolute',
          left: 330,
          top: '50%',
          width: 120 * arrow1,
          height: 2,
          background: '#30363d',
          transform: 'translateY(-50%)',
        }}
      />

      <Card
        x={470}
        label="Asset Forge"
        sublabel="PROCESSING"
        revealAt={startFrame + 30}
        frame={frame}
        accent="#7c3aed"
      />

      {/* Arrow 2 */}
      <div
        style={{
          position: 'absolute',
          left: 720,
          top: '50%',
          width: 120 * arrow2,
          height: 2,
          background: '#30363d',
          transform: 'translateY(-50%)',
        }}
      />

      <Card
        x={860}
        label="Diagram"
        sublabel="OUTPUT"
        revealAt={startFrame + 70}
        frame={frame}
        accent="#3fb950"
      />
      <Card
        x={860}
        label="Overlay"
        sublabel="OUTPUT"
        revealAt={startFrame + 80}
        frame={frame}
        accent="#3fb950"
      />
      <Card
        x={860}
        label="B-roll"
        sublabel="OUTPUT"
        revealAt={startFrame + 90}
        frame={frame}
        accent="#3fb950"
      />

      {/* Time-saving clock indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 80,
          opacity: clockOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '2px solid #8b949e',
            position: 'relative',
            transform: `rotate(${clockRotation}deg)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 10,
              height: 2,
              background: '#8b949e',
              transformOrigin: 'left center',
            }}
          />
        </div>
        <span style={{color: '#8b949e', fontSize: 16}}>Time saved, automatically</span>
      </div>
    </div>
  );
};
