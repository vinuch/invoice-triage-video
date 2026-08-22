import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../design-tokens';

type PullQuoteProps = {
  text: string;
  frameIn?: number;
};

const renderBold = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} style={{color: colors.approved, fontWeight: 700}}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

export const PullQuote: React.FC<PullQuoteProps> = ({text, frameIn = 0}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - frameIn, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  const scale = interpolate(frame - frameIn, [0, 15], [0.97, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: 160}}>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 56,
          lineHeight: 1.4,
          color: colors.text,
          textAlign: 'center',
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {renderBold(text)}
      </div>
    </AbsoluteFill>
  );
};
