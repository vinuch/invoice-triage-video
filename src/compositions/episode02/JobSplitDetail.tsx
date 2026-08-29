import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../../design-tokens';

export const JobSplitDetail: React.FC<{frameIn?: number}> = ({frameIn = 0}) => {
  const frame = useCurrentFrame() - frameIn;
  const opacity = interpolate(frame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', gap: 48, opacity}}>
        <div style={{border: `1px solid ${colors.border}`, borderRadius: 10, padding: '24px 32px', backgroundColor: colors.bgRaised, textAlign: 'center', maxWidth: 320}}>
          <div style={{fontFamily: fonts.mono, fontSize: 20, color: colors.text, fontWeight: 700}}>Job one</div>
          <div style={{fontFamily: fonts.display, fontSize: 16, color: colors.textDim, marginTop: 8}}>
            Read the invoice — language problem. The model earns its keep here.
          </div>
        </div>
        <div style={{border: `1px solid ${colors.approved}`, borderRadius: 10, padding: '24px 32px', backgroundColor: colors.bgRaised, textAlign: 'center', maxWidth: 320}}>
          <div style={{fontFamily: fonts.mono, fontSize: 20, color: colors.approved, fontWeight: 700}}>Job two</div>
          <div style={{fontFamily: fonts.display, fontSize: 16, color: colors.textDim, marginTop: 8}}>
            Is the number correct? — arithmetic, deterministic Python.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
