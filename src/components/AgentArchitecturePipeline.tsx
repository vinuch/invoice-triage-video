import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from brief VSred (Section 3: Architecture)
// "Input Reading -> Processing and Reasoning -> Output Generation,
//  each module with a short WHY label beneath it"
type Module = {
  label: string;
  why: string;
};

const defaultModules: Module[] = [
  {label: 'Input Reading', why: 'resume + job description, parsed structurally'},
  {label: 'Processing & Reasoning', why: 'gap analysis, ATS scoring, skill matching'},
  {label: 'Output Generation', why: 'tailored resume, ranked by interview odds'},
];

type AgentArchitecturePipelineProps = {
  modules?: Module[];
  startFrame?: number;
  stageStagger?: number;
};

export const AgentArchitecturePipeline: React.FC<AgentArchitecturePipelineProps> = ({
  modules = defaultModules,
  startFrame = 0,
  stageStagger = 40,
}) => {
  const frame = useCurrentFrame();
  const accent = '#a371f7';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0d1117',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {modules.map((mod, i) => {
        const revealAt = startFrame + i * stageStagger;
        const opacity = interpolate(frame, [revealAt, revealAt + 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const y = interpolate(frame, [revealAt, revealAt + 15], [24, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const arrowRevealAt = revealAt + 18;
        const arrowWidth = interpolate(
          frame,
          [arrowRevealAt, arrowRevealAt + 15],
          [0, 90],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
        );

        return (
          <React.Fragment key={mod.label}>
            <div
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                width: 340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '100%',
                  padding: '28px 24px',
                  borderRadius: 20,
                  background: '#161b22',
                  border: `1px solid ${accent}66`,
                  boxShadow: `0 0 24px ${accent}22`,
                  textAlign: 'center',
                }}
              >
                <div style={{color: '#e6edf3', fontSize: 26, fontWeight: 700}}>
                  {mod.label}
                </div>
              </div>
              <div
                style={{
                  color: '#8b949e',
                  fontSize: 17,
                  marginTop: 14,
                  textAlign: 'center',
                  maxWidth: 280,
                }}
              >
                {mod.why}
              </div>
            </div>

            {i < modules.length - 1 && (
              <div
                style={{
                  width: arrowWidth,
                  height: 2,
                  background: '#30363d',
                  flexShrink: 0,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
