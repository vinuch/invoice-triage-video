import React from 'react';
import {AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../design-tokens';

type SceneWrapperProps = {
  characterSrc: string; // filename in public/, e.g. 'mascot.png'
  characterSide?: 'left' | 'right' | 'center';
  showGrid?: boolean;
  children?: React.ReactNode;
};

const GridBackground: React.FC = () => {
  const spacing = 48;
  return (
    <svg width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
      <defs>
        <pattern id="dotGrid" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1.4} fill={colors.border} opacity={0.5} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotGrid)" />
    </svg>
  );
};

export const SceneWrapper: React.FC<SceneWrapperProps> = ({
  characterSrc,
  characterSide = 'left',
  showGrid = true,
  children,
}) => {
  const frame = useCurrentFrame();
  const bob = interpolate(frame % 90, [0, 45, 90], [0, -6, 0]);

  const justify =
    characterSide === 'left' ? 'flex-start' : characterSide === 'right' ? 'flex-end' : 'center';

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg}}>
      {showGrid && <GridBackground />}
      <AbsoluteFill style={{alignItems: 'flex-end', justifyContent: justify, padding: '0 120px'}}>
        <Img
          src={staticFile(characterSrc)}
          style={{height: 720, transform: `translateY(${bob}px)`}}
        />
      </AbsoluteFill>
      {children}
    </AbsoluteFill>
  );
};
