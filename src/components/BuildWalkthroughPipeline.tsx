import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from brief QrzW5 (Section 4: Build Walkthrough)
// Generic, reusable for any build video: input -> API/library calls ->
// transform -> validation -> error handling -> output. Real specifics
// are placeholders until an actual implementation exists.
type WalkthroughStage = {
  label: string;
  detail: string;
};

const defaultStages: WalkthroughStage[] = [
  {label: 'Input', detail: '[NEEDS REAL CODE/OUTPUT: input format]'},
  {label: 'API / Library Call', detail: '[NEEDS REAL CODE/OUTPUT: which API/library]'},
  {label: 'Transform', detail: '[NEEDS REAL CODE/OUTPUT: transformation logic]'},
  {label: 'Validation', detail: '[NEEDS REAL CODE/OUTPUT: validation rules]'},
  {label: 'Error Handling', detail: '[NEEDS REAL CODE/OUTPUT: failure modes]'},
  {label: 'Output', detail: '[NEEDS REAL CODE/OUTPUT: final output shape]'},
];

type BuildWalkthroughPipelineProps = {
  stages?: WalkthroughStage[];
  startFrame?: number;
  stageStagger?: number;
};

export const BuildWalkthroughPipeline: React.FC<BuildWalkthroughPipelineProps> = ({
  stages = defaultStages,
  startFrame = 0,
  stageStagger = 20,
}) => {
  const frame = useCurrentFrame();
  const accent = '#58a6ff';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0d1117',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '0 140px',
        fontFamily: 'Menlo, Consolas, monospace',
        gap: 18,
      }}
    >
      {stages.map((stage, i) => {
        const revealAt = startFrame + i * stageStagger;
        const opacity = interpolate(frame, [revealAt, revealAt + 12], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const x = interpolate(frame, [revealAt, revealAt + 12], [-16, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={stage.label}
            style={{
              opacity,
              transform: `translateX(${x}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: `${accent}22`,
                border: `1px solid ${accent}66`,
                color: accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{color: '#e6edf3', fontSize: 22, fontWeight: 600}}>
                {stage.label}
              </div>
              <div style={{color: '#8b949e', fontSize: 15, marginTop: 2}}>
                {stage.detail}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
