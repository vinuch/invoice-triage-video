import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../design-tokens';

type NodeState = 'dim' | 'lit';

const Node: React.FC<{label: string; sub: string; state: NodeState}> = ({label, sub, state}) => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame % 60, [0, 30, 60], [0.6, 1, 0.6]);

  return (
    <div
      style={{
        border: `2px solid ${state === 'lit' ? colors.approved : colors.border}`,
        borderRadius: 12,
        padding: '32px 48px',
        backgroundColor: colors.bgRaised,
        boxShadow: state === 'lit' ? `0 0 ${40 * glow}px rgba(95,217,138,0.35)` : 'none',
        transition: 'border-color 0.3s',
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 34,
          fontWeight: 700,
          color: state === 'lit' ? colors.approved : colors.textDim,
          marginBottom: 8,
        }}
      >
        [{label}]
      </div>
      <div style={{fontFamily: fonts.display, fontSize: 20, color: colors.text, opacity: 0.8}}>{sub}</div>
    </div>
  );
};

export const PipelineDiagram: React.FC<{
  highlight: 'extract' | 'validate' | 'both';
}> = ({highlight}) => {
  const extractState: NodeState = highlight === 'extract' || highlight === 'both' ? 'lit' : 'dim';
  const validateState: NodeState = highlight === 'validate' || highlight === 'both' ? 'lit' : 'dim';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 60,
        flexDirection: 'row',
      }}
    >
      <Node label="extract.py" sub="reads the document — language" state={extractState} />
      <div style={{fontFamily: fonts.mono, fontSize: 40, color: colors.textDim}}>→</div>
      <Node label="validate.py" sub="checks the number — code" state={validateState} />
    </AbsoluteFill>
  );
};
