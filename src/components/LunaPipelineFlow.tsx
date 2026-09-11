import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from AssetBrief (episode: "The Pipeline" section)
// "script -> Luna -> visual briefs (style/format/dims/placement) -> named/tagged/filed assets"
type Stage = {
  label: string;
  sublabel: string;
  icon: 'doc' | 'brain' | 'brief' | 'folder';
};

const stages: Stage[] = [
  {label: 'Script', sublabel: 'raw text', icon: 'doc'},
  {label: 'Luna', sublabel: 'reads & decides', icon: 'brain'},
  {label: 'Brief', sublabel: 'style / format / dims', icon: 'brief'},
  {label: 'Library', sublabel: 'named, tagged, filed', icon: 'folder'},
];

const IconGlyph: React.FC<{icon: Stage['icon']; color: string}> = ({icon, color}) => {
  const common = {width: 56, height: 56, stroke: color, fill: 'none', strokeWidth: 2};
  if (icon === 'doc') {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M15 2v5h5" />
      </svg>
    );
  }
  if (icon === 'brain') {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4v16M4 12h16" opacity={0.4} />
      </svg>
    );
  }
  if (icon === 'brief') {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 2h8v4H8z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M3 7h6l2 2h10v10H3z" />
    </svg>
  );
};

type LunaPipelineFlowProps = {
  startFrame?: number;
  stageStagger?: number;
};

export const LunaPipelineFlow: React.FC<LunaPipelineFlowProps> = ({
  startFrame = 0,
  stageStagger = 35,
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
        gap: 0,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {stages.map((stage, i) => {
        const revealAt = startFrame + i * stageStagger;
        const opacity = interpolate(frame, [revealAt, revealAt + 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const scale = interpolate(frame, [revealAt, revealAt + 15], [0.85, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const lineRevealAt = revealAt + 15;
        const lineWidth = interpolate(frame, [lineRevealAt, lineRevealAt + 15], [0, 120], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <React.Fragment key={stage.label}>
            <div
              style={{
                opacity,
                transform: `scale(${scale})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 280,
              }}
            >
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 32,
                  background: '#161b22',
                  border: `1px solid ${accent}66`,
                  boxShadow: `0 0 20px ${accent}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconGlyph icon={stage.icon} color={accent} />
              </div>
              <div style={{color: '#e6edf3', fontSize: 36, fontWeight: 700, marginTop: 24}}>
                {stage.label}
              </div>
              <div style={{color: '#8b949e', fontSize: 20, marginTop: 8}}>{stage.sublabel}</div>
            </div>

            {i < stages.length - 1 && (
              <div
                style={{
                  width: lineWidth,
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
