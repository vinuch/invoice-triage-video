import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../design-tokens';

type CrossedOutConceptProps = {
  labels: string[];
  frameIn?: number;
  strikeFrame?: number;
};

export const CrossedOutConcept: React.FC<CrossedOutConceptProps> = ({labels, frameIn = 0, strikeFrame = 20}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - frameIn, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  const strikeProgress = interpolate(frame - strikeFrame, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'relative', display: 'flex', gap: 40, opacity}}>
        {labels.map((label) => (
          <div
            key={label}
            style={{
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              padding: '20px 32px',
              backgroundColor: colors.bgRaised,
              fontFamily: fonts.mono,
              fontSize: 22,
              color: colors.textDim,
            }}
          >
            {label}
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: `${strikeProgress * 100}%`,
            height: 3,
            backgroundColor: colors.mismatch,
            transform: 'translateY(-50%) rotate(-2deg)',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
