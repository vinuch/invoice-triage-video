import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../../design-tokens';

const ITEMS = [
  'Environment setup', 'Real inbox ingestion', 'Extraction prompt, line by line',
  'Validation engine', 'Review queue', 'Dashboard', 'Deployment',
];

export const RoadmapRecap: React.FC<{frameIn?: number}> = ({frameIn = 0}) => {
  const frame = useCurrentFrame() - frameIn;
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start'}}>
        <div style={{fontFamily: fonts.display, fontSize: 32, fontWeight: 700, color: colors.text, opacity: headerOpacity, marginBottom: 8}}>
          This is the foundation. From here, every lesson builds the real thing:
        </div>
        {ITEMS.map((item, i) => {
          const fIn = 30 + i * 45;
          const opacity = interpolate(frame, [fIn, fIn + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const tx = interpolate(frame, [fIn, fIn + 15], [12, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={item} style={{display: 'flex', alignItems: 'center', gap: 16, opacity, transform: `translateX(${tx}px)`}}>
              <div style={{width: 8, height: 8, borderRadius: 4, backgroundColor: colors.approved}} />
              <div style={{fontFamily: fonts.mono, fontSize: 24, color: colors.text}}>{item}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
