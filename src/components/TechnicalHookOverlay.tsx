import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from brief V--dUbsZ / UUzJe (reusable overlay)
// "Animated hook overlay emphasizing: 'Real AI agents. Built on camera.'
//  Smaller supporting line: 'Direct. Technical. No fluff.' with a brief
//  scan-line or underline reveal. Clean technical HUD-style, bold white
//  typography, electric-blue accents, dark charcoal background."

const blue = '#58a6ff';

type TechnicalHookOverlayProps = {
  mainText?: string;
  supportingText?: string;
  startFrame?: number;
};

export const TechnicalHookOverlay: React.FC<TechnicalHookOverlayProps> = ({
  mainText = 'Real AI agents. Built on camera.',
  supportingText = 'Direct. Technical. No fluff.',
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;

  const mainOpacity = interpolate(t, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scan-line sweeps left to right across the main text once
  const scanX = interpolate(t, [4, 34], [-10, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const underlineWidth = interpolate(t, [18, 38], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const supportingOpacity = interpolate(t, [34, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#12161b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      }}
    >
      <div
        style={{
          position: 'relative',
          opacity: mainOpacity,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            color: '#f0f4f8',
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: -0.5,
          }}
        >
          {mainText}
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${scanX}%`,
            width: 3,
            background: blue,
            boxShadow: `0 0 16px ${blue}`,
          }}
        />
      </div>

      <div
        style={{
          width: `${underlineWidth}%`,
          maxWidth: 600,
          height: 2,
          background: blue,
          margin: '20px 0',
        }}
      />

      <div
        style={{
          opacity: supportingOpacity,
          color: blue,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        {supportingText}
      </div>
    </div>
  );
};
