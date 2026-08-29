import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../../design-tokens';

const PROVIDERS = [
  {name: 'anthropic', accent: colors.approved},
  {name: 'openai', accent: colors.text},
  {name: 'gemini', accent: colors.review},
];

export const ProviderSwap: React.FC<{frameIn?: number}> = ({frameIn = 0}) => {
  const frame = useCurrentFrame() - frameIn;
  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  const interfaceOpacity = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  const activeIndex = Math.min(2, Math.floor(frame / 60));
  const schemaOpacity = interpolate(frame, [80, 95], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', opacity: sceneOpacity}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48}}>
        <div style={{fontFamily: fonts.mono, fontSize: 24, color: colors.textDim, opacity: interfaceOpacity}}>
          extract_invoice(provider=
          <span style={{color: PROVIDERS[activeIndex].accent, fontWeight: 700}}>"{PROVIDERS[activeIndex].name}"</span>)
        </div>
        <div style={{display: 'flex', gap: 32}}>
          {PROVIDERS.map((p, i) => {
            const cardOpacity = interpolate(frame, [i * 60, i * 60 + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const isActive = i === activeIndex;
            return (
              <div key={p.name} style={{
                border: `1px solid ${isActive ? p.accent : colors.border}`,
                borderRadius: 10, padding: '16px 28px', backgroundColor: colors.bgRaised,
                fontFamily: fonts.mono, fontSize: 20, color: isActive ? p.accent : colors.textDim,
                opacity: cardOpacity, transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}>
                {p.name}
              </div>
            );
          })}
        </div>
        <div style={{border: `1px solid ${colors.border}`, borderRadius: 10, padding: '14px 24px', backgroundColor: colors.bgRaised, fontFamily: fonts.mono, fontSize: 18, color: colors.approved, opacity: schemaOpacity}}>
          → same JSON schema
        </div>
      </div>
    </AbsoluteFill>
  );
};
