import React from 'react';
import {useCurrentFrame, spring, useVideoConfig} from 'remotion';
import {colors, fonts, variantColor, Variant} from '../design-tokens';

export type UICardProps = {
  label: string;
  sub?: string;
  frameIn: number;
  top: number;
  left: number;
  variant?: Variant;
};

export const UICard: React.FC<UICardProps> = ({label, sub, frameIn, top, left, variant = 'default'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame: frame - frameIn, fps, config: {damping: 200}});

  if (frame < frameIn) return null;

  const accentColor = variantColor(variant);
  const isGhost = variant === 'ghost';

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        backgroundColor: isGhost ? 'transparent' : colors.bgRaised,
        border: isGhost ? `1px dashed ${colors.border}` : `1px solid ${colors.border}`,
        borderRadius: 10,
        padding: '16px 24px',
        opacity: isGhost ? progress * 0.6 : progress,
        transform: `translateY(${(1 - progress) * 16}px)`,
        boxShadow: isGhost ? 'none' : '0 20px 40px rgba(0,0,0,0.4)',
      }}
    >
      <div style={{fontFamily: fonts.mono, fontSize: 20, fontWeight: 700, color: accentColor}}>{label}</div>
      {sub && (
        <div style={{fontFamily: fonts.display, fontSize: 15, color: colors.textDim, marginTop: 4}}>{sub}</div>
      )}
    </div>
  );
};
