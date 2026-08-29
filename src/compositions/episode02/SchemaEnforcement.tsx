import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {SceneBeats} from '../SceneBeats';
import {colors, fonts} from '../../design-tokens';

const STAGES = ['Image', 'JSON', 'Checks', 'Status'];

export const SchemaEnforcement: React.FC<{frameIn?: number}> = ({frameIn = 0}) => {
  const frame = useCurrentFrame() - frameIn;
  const lockOpacity = interpolate(frame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  const strikeConfidence = interpolate(frame, [180, 210], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pipelineStart = 510;

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center'}}>
      {frame < pipelineStart && (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, opacity: lockOpacity}}>
          <div style={{border: `1px solid ${colors.border}`, borderRadius: 10, padding: '20px 36px', backgroundColor: colors.bgRaised, fontFamily: fonts.mono, fontSize: 22, color: colors.text}}>
            {'{ vendor, amount, due_date, confidence }'}
          </div>
          <div style={{position: 'relative', display: 'flex', gap: 32}}>
            <div style={{border: `1px solid ${colors.review}`, borderRadius: 10, padding: '16px 28px', backgroundColor: colors.bgRaised, fontFamily: fonts.mono, fontSize: 20, color: colors.review}}>
              confidence: 0.94
            </div>
            <div style={{position: 'absolute', top: '50%', left: 0, width: `${strikeConfidence * 100}%`, height: 3, backgroundColor: colors.mismatch, transform: 'translateY(-50%) rotate(-2deg)'}} />
          </div>
        </div>
      )}
      {frame >= pipelineStart && (
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          {STAGES.map((stage, i) => {
            const sf = frame - pipelineStart;
            const opacity = interpolate(sf, [i * 40, i * 40 + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            return (
              <React.Fragment key={stage}>
                {i > 0 && <div style={{color: colors.textDim, fontSize: 24, opacity}}>→</div>}
                <div style={{border: `1px solid ${colors.border}`, borderRadius: 10, padding: '16px 24px', backgroundColor: colors.bgRaised, fontFamily: fonts.mono, fontSize: 20, color: colors.text, opacity}}>
                  {stage}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}
      <SceneBeats beats={[
        {type: 'caption', frameIn: 5, frameOut: 175, text: "Strict JSON schema every time — the model doesn't get to freelance the shape of its output."},
        {type: 'caption', frameIn: 185, frameOut: 340, text: '**Confidence scores are not a substitute for validation.**'},
        {type: 'caption', frameIn: 350, frameOut: 505, text: "That's why job two exists independently of job one."},
        {type: 'caption', frameIn: 515, text: 'Image in, structured JSON out, deterministic checks applied, status out.'},
      ]} />
    </AbsoluteFill>
  );
};
