import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {fadeIn, riseIn} from '../lib/animate';
import {colors, fonts} from '../design-tokens';

type CoverLetterWorkflowDiagramProps = {
  startFrame?: number;
};

const SOURCES = [
  {label: 'Your Resume', y: 150},
  {label: 'Job Description', y: 290},
  {label: 'Company Website', y: 430},
];

const SOURCE_X = 60;
const SOURCE_W = 220;
const SOURCE_H = 90;

const AGENT_X = 420;
const AGENT_Y = 220;
const AGENT_W = 220;
const AGENT_H = 150;

const OUTPUT_X = 780;
const OUTPUT_Y = 250;
const OUTPUT_W = 240;
const OUTPUT_H = 90;

const SOURCE_STAGGER = 12;
const AGENT_START = 50;
const OUTPUT_START = 110;
const TAG_START = 150;
const BYPASS_START = 190;

export const CoverLetterWorkflowDiagram: React.FC<CoverLetterWorkflowDiagramProps> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;

  const DESIGN_W = 1080;
  const DESIGN_H = 640;
  const SCALE = 1.4;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: colors.bg,
        position: 'relative',
        fontFamily: fonts.display,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: DESIGN_W,
          height: DESIGN_H,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${SCALE})`,
          transformOrigin: 'center',
        }}
      >
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: SOURCE_X,
          opacity: fadeIn(t, 0, 20),
          transform: `translateY(${riseIn(t, 0, 20)}px)`,
        }}
      >
        <div
          style={{
            color: colors.text,
            fontFamily: fonts.mono,
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          Cover Letter Agent — Build 22
        </div>
      </div>

      {/* Relationship tag */}
      {t > TAG_START && (
        <div
          style={{
            position: 'absolute',
            top: 78,
            left: SOURCE_X,
            opacity: fadeIn(t, TAG_START, 15),
            transform: `translateY(${riseIn(t, TAG_START, 15)}px)`,
            display: 'inline-block',
            fontFamily: fonts.mono,
            fontSize: 11,
            padding: '4px 9px',
            borderRadius: 999,
            border: `1px solid ${colors.agent}`,
            color: colors.agent,
            background: `${colors.agent}1a`,
          }}
        >
          Direct follow-on to Resume Optimizer — Build 21
        </div>
      )}

      {/* Source cards */}
      {SOURCES.map((src, i) => {
        const nodeStart = i * SOURCE_STAGGER;
        const opacity = fadeIn(t, nodeStart, 18);
        const x = riseIn(t, nodeStart, 18);

        const midY = AGENT_Y + AGENT_H / 2;
        const connOpacity = interpolate(t, [nodeStart + 15, nodeStart + 30], [0, 0.7], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <React.Fragment key={src.label}>
            <svg
              width={AGENT_X - (SOURCE_X + SOURCE_W)}
              height={Math.abs(midY - (src.y + SOURCE_H / 2)) + 4}
              style={{
                position: 'absolute',
                left: SOURCE_X + SOURCE_W,
                top: Math.min(midY, src.y + SOURCE_H / 2),
                opacity: connOpacity,
                overflow: 'visible',
              }}
            >
              <line
                x1={0}
                y1={src.y + SOURCE_H / 2 > midY ? Math.abs(midY - (src.y + SOURCE_H / 2)) : 0}
                x2={AGENT_X - (SOURCE_X + SOURCE_W)}
                y2={src.y + SOURCE_H / 2 > midY ? 0 : Math.abs(midY - (src.y + SOURCE_H / 2))}
                stroke={colors.agent}
                strokeWidth={2}
              />
            </svg>

            <div
              style={{
                position: 'absolute',
                top: src.y,
                left: SOURCE_X,
                width: SOURCE_W,
                height: SOURCE_H,
                opacity,
                transform: `translateY(${x}px)`,
                background: colors.bgRaised,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
            >
              <div style={{color: colors.text, fontSize: 14, fontWeight: 600}}>{src.label}</div>
            </div>
          </React.Fragment>
        );
      })}

      {/* Agent node */}
      <div
        style={{
          position: 'absolute',
          top: AGENT_Y,
          left: AGENT_X,
          width: AGENT_W,
          height: AGENT_H,
          opacity: fadeIn(t, AGENT_START, 20),
          transform: `translateY(${riseIn(t, AGENT_START, 20)}px)`,
          background: colors.bgRaised,
          border: `1.5px solid ${colors.agent}`,
          borderRadius: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          boxShadow: `0 0 24px ${colors.agent}33`,
        }}
      >
        <div
          style={{
            color: colors.agent,
            fontFamily: fonts.mono,
            fontSize: 12,
            letterSpacing: 0.5,
            marginBottom: 6,
          }}
        >
          AGENT
        </div>
        <div style={{color: colors.text, fontSize: 15, fontWeight: 700, textAlign: 'center'}}>
          Fuse + Ground
        </div>
      </div>

      {/* connector agent -> output */}
      {t > OUTPUT_START && (
        <svg
          width={OUTPUT_X - (AGENT_X + AGENT_W)}
          height={4}
          style={{
            position: 'absolute',
            left: AGENT_X + AGENT_W,
            top: AGENT_Y + AGENT_H / 2 - 1,
            opacity: fadeIn(t, OUTPUT_START, 15),
            overflow: 'visible',
          }}
        >
          <line
            x1={0}
            y1={2}
            x2={OUTPUT_X - (AGENT_X + AGENT_W)}
            y2={2}
            stroke={colors.approved}
            strokeWidth={2}
          />
        </svg>
      )}

      {/* Output card */}
      {t > OUTPUT_START && (
        <div
          style={{
            position: 'absolute',
            top: OUTPUT_Y,
            left: OUTPUT_X,
            width: OUTPUT_W,
            height: OUTPUT_H,
            opacity: fadeIn(t, OUTPUT_START, 20),
            transform: `translateY(${riseIn(t, OUTPUT_START, 20)}px)`,
            background: `${colors.approved}1a`,
            border: `1px solid ${colors.approved}`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            padding: '0 12px',
          }}
        >
          <div style={{color: colors.text, fontSize: 14, fontWeight: 700, textAlign: 'center'}}>
            Grounded Cover Letter
          </div>
        </div>
      )}

      {/* Faded bypassed prompt-only path */}
      {t > BYPASS_START && (
        <div
          style={{
            position: 'absolute',
            top: 560,
            left: SOURCE_X,
            opacity: fadeIn(t, BYPASS_START, 20) * 0.4,
            transform: `translateY(${riseIn(t, BYPASS_START, 20)}px)`,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: SOURCE_W,
              padding: '10px 14px',
              borderRadius: 10,
              border: `1px dashed ${colors.textDim}`,
              color: colors.textDim,
              fontSize: 13,
              fontStyle: 'italic',
            }}
          >
            "Write a cover letter"
          </div>
          <svg width={80} height={2} style={{margin: '0 6px', overflow: 'visible'}}>
            <line
              x1={0}
              y1={1}
              x2={80}
              y2={1}
              stroke={colors.textDim}
              strokeWidth={2}
              strokeDasharray="6 6"
            />
          </svg>
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: `1px dashed ${colors.mismatch}`,
              color: colors.mismatch,
              fontSize: 12,
              fontFamily: fonts.mono,
            }}
          >
            bypassed
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
