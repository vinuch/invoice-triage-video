import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from brief 5AwsU (Section 1: The Build)
// "Base Resume + Job Description enter an AI Resume Optimizer agent. The
//  agent outputs a stack of distinct tailored resumes, one per job. Outputs
//  pass through two checkpoints: ATS screening and Human skim. One agent,
//  many job-specific resumes."

const accent = '#a371f7';
const good = '#3fb950';

const defaultLabels = ['Backend Eng.', 'Platform Lead', 'Senior SWE'];

type ResumeOptimizerPipelineProps = {
  outputLabels?: string[];
  startFrame?: number;
};

export const ResumeOptimizerPipeline: React.FC<ResumeOptimizerPipelineProps> = ({
  outputLabels = defaultLabels,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;

  const inputOpacity = interpolate(t, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrow1Width = interpolate(t, [20, 40], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const agentOpacity = interpolate(t, [42, 62], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const agentScale = interpolate(t, [42, 62], [0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const agentPulse = 1 + Math.sin(t / 10) * 0.015;

  const arrow2Width = interpolate(t, [70, 90], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const stackStagger = 14;
  const stackStart = 95;

  const checkpointsStart = stackStart + outputLabels.length * stackStagger + 20;
  const checkpointOpacity = interpolate(
    t,
    [checkpointsStart, checkpointsStart + 20],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

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
        gap: 0,
      }}
    >
      {/* Inputs */}
      <div style={{opacity: inputOpacity, display: 'flex', flexDirection: 'column', gap: 18}}>
        {['Base Resume', 'Job Description'].map((label) => (
          <div
            key={label}
            style={{
              width: 190,
              padding: '18px 20px',
              borderRadius: 12,
              background: '#161b22',
              border: '1px solid #30363d',
              color: '#e6edf3',
              fontSize: 17,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {label}
          </div>
        ))}
      </div>

      <div style={{width: arrow1Width, height: 2, background: '#30363d', margin: '0 12px'}} />

      {/* Agent core */}
      <div
        style={{
          opacity: agentOpacity,
          transform: `scale(${agentScale * agentPulse})`,
          width: 220,
          height: 220,
          borderRadius: 24,
          background: '#161b22',
          border: `2px solid ${accent}`,
          boxShadow: `0 0 40px ${accent}44`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <div style={{color: accent, fontSize: 15, fontWeight: 700, letterSpacing: 0.5}}>
          AI RESUME
        </div>
        <div style={{color: accent, fontSize: 15, fontWeight: 700, letterSpacing: 0.5}}>
          OPTIMIZER
        </div>
        <div style={{color: '#8b949e', fontSize: 12, marginTop: 6, textAlign: 'center'}}>
          analyzes each role,
          <br />
          adapts the resume
        </div>
      </div>

      <div style={{width: arrow2Width, height: 2, background: '#30363d', margin: '0 12px'}} />

      {/* Output stack */}
      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        {outputLabels.map((label, i) => {
          const revealAt = stackStart + i * stackStagger;
          const opacity = interpolate(t, [revealAt, revealAt + 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const x = interpolate(t, [revealAt, revealAt + 14], [-16, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={label}
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                width: 170,
                padding: '10px 14px',
                borderRadius: 8,
                background: '#161b22',
                border: `1px solid ${accent}88`,
                color: '#e6edf3',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Resume · {label}
            </div>
          );
        })}
      </div>

      {/* Checkpoints */}
      <div
        style={{
          opacity: checkpointOpacity,
          marginLeft: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {['ATS screening', 'Human skim'].map((label) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 16px',
              borderRadius: 8,
              background: `${good}18`,
              border: `1px solid ${good}66`,
            }}
          >
            <span style={{color: good, fontSize: 16}}>✓</span>
            <span style={{color: '#e6edf3', fontSize: 14, fontWeight: 600}}>{label}</span>
          </div>
        ))}
        <div style={{color: '#8b949e', fontSize: 13, maxWidth: 200, marginTop: 4}}>
          One agent. Many job-specific resumes.
        </div>
      </div>
    </div>
  );
};
