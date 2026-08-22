import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../design-tokens';

type FlowStep = {label: string};

type BeforeAfterFlowProps = {
  beforeSteps: FlowStep[]; // the rejected approach
  afterSteps: FlowStep[]; // the kept approach
  frameIn?: number;
  strikeFrame?: number; // when the "before" row gets struck through
  afterFrame?: number; // when the "after" row fades in
};

const FlowRow: React.FC<{steps: FlowStep[]; dimmed?: boolean; accent?: boolean}> = ({steps, dimmed, accent}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
    {steps.map((step, i) => (
      <React.Fragment key={i}>
        <div
          style={{
            border: `1px solid ${accent ? colors.approved : colors.border}`,
            borderRadius: 10,
            padding: '18px 28px',
            backgroundColor: colors.bgRaised,
            fontFamily: fonts.mono,
            fontSize: 22,
            color: dimmed ? colors.textDim : accent ? colors.approved : colors.text,
          }}
        >
          {step.label}
        </div>
        {i < steps.length - 1 && (
          <div style={{fontFamily: fonts.mono, fontSize: 28, color: colors.textDim}}>→</div>
        )}
      </React.Fragment>
    ))}
  </div>
);

// Shows a rejected pipeline (struck through) stacked above the kept pipeline.
// Reusable any time a script says "not this, but this" — OCR-vs-direct-vision,
// multi-agent-vs-two-functions, etc.
export const BeforeAfterFlow: React.FC<BeforeAfterFlowProps> = ({
  beforeSteps,
  afterSteps,
  frameIn = 0,
  strikeFrame = 20,
  afterFrame = 45,
}) => {
  const frame = useCurrentFrame();
  const beforeOpacity = interpolate(frame - frameIn, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  const strikeProgress = interpolate(frame - strikeFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const afterOpacity = interpolate(frame - afterFrame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: 80}}>
      <div style={{position: 'relative', opacity: beforeOpacity}}>
        <FlowRow steps={beforeSteps} dimmed />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: `${strikeProgress * 100}%`,
            height: 3,
            backgroundColor: colors.mismatch,
            transform: 'translateY(-50%) rotate(-1.5deg)',
          }}
        />
      </div>
      <div style={{opacity: afterOpacity}}>
        <FlowRow steps={afterSteps} accent />
      </div>
    </AbsoluteFill>
  );
};
