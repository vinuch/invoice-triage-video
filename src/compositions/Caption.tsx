import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../design-tokens';

type CaptionProps = {
  text: string;
  frameIn: number;
  frameOut?: number;
};

const renderBold = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} style={{color: colors.text, fontWeight: 700}}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

export const Caption: React.FC<CaptionProps> = ({text, frameIn, frameOut}) => {
  const frame = useCurrentFrame();
  if (frame < frameIn) return null;
  if (frameOut && frame > frameOut) return null;

  const opacity = interpolate(frame - frameIn, [0, 8], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 90,
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: 1200,
        width: 'fit-content',
        fontFamily: fonts.display,
        fontSize: 40,
        lineHeight: 1.3,
        color: colors.textDim,
        opacity,
        backgroundColor: 'rgba(11,14,17,0.85)',
        padding: '20px 32px',
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        textAlign: 'center',
      }}
    >
      {renderBold(text)}
    </div>
  );
};
