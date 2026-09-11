import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {fadeIn, riseIn} from '../lib/animate';
import {colors, fonts} from '../design-tokens';

type CoverLetterBuildWalkthroughDiagramProps = {
  startFrame?: number;
};

const STAGES = [
  {
    title: '1. Ingestion',
    lines: ['Resume + Job Description', 'OpenRouter/LangChain →', 'Pydantic models'],
    badges: ['no inference'],
  },
  {
    title: '2. Research',
    lines: ['URLs → capped, timeout-', 'protected fetch', 'facts + snippets + URLs'],
    badges: ['no crawling', 'source required'],
  },
  {
    title: '3. Fusion',
    lines: ['Candidate + Role +', 'Company Profile →', '3-way overlaps'],
    badges: ['different proof point'],
  },
  {
    title: '4. Generation',
    lines: ['Argument →', '4 document outputs', 'stock-phrase ban'],
    badges: [],
  },
  {
    title: '5. Grounding',
    lines: ['Independent claim check', 'vs source profiles', 'gate withholds fails'],
    badges: ['independent check'],
  },
  {
    title: '6. Progress',
    lines: ['Per-stage terminal', 'progress lines +', 'timing visibility'],
    badges: [],
  },
];

const NODE_W = 240;
const NODE_H = 150;
const GAP = 40;
const START_X = 40;
const NODE_Y = 260;

const STAGE_STAGGER = 14;
const INCIDENT_START = 130;
const FIX_START = 200;

const Badge: React.FC<{label: string; tone?: 'accent' | 'danger' | 'good'}> = ({
  label,
  tone = 'accent',
}) => {
  const color = tone === 'danger' ? colors.mismatch : tone === 'good' ? colors.approved : colors.agent;
  return (
    <div
      style={{
        display: 'inline-block',
        fontFamily: fonts.mono,
        fontSize: 10,
        letterSpacing: 0.3,
        padding: '3px 7px',
        borderRadius: 999,
        border: `1px solid ${color}`,
        color,
        background: `${color}1a`,
        marginRight: 6,
        marginTop: 6,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </div>
  );
};

export const CoverLetterBuildWalkthroughDiagram: React.FC<CoverLetterBuildWalkthroughDiagramProps> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;

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
          width: 1700,
          height: 620,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(1.0)`,
          transformOrigin: 'center',
        }}
      >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: START_X,
          opacity: fadeIn(t, 0, 20),
          transform: `translateY(${riseIn(t, 0, 20)}px)`,
        }}
      >
        <div
          style={{
            color: colors.agent,
            fontFamily: fonts.mono,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          COVER LETTER AGENT — PIPELINE
        </div>
        <div style={{color: colors.textDim, fontSize: 12, marginTop: 4}}>
          six stages, ingestion to grounded output
        </div>
      </div>

      {/* Stage nodes + connectors */}
      {STAGES.map((stage, i) => {
        const nodeStart = i * STAGE_STAGGER;
        const opacity = fadeIn(t, nodeStart, 20);
        const y = riseIn(t, nodeStart, 20);
        const x = START_X + i * (NODE_W + GAP);

        const isIncidentNode = i === 0; // Job Description ingestion node
        const progressPct = interpolate(t, [nodeStart + 20, nodeStart + 60], [0, 100], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <React.Fragment key={stage.title}>
            {/* connector to next node */}
            {i < STAGES.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: NODE_Y + NODE_H / 2 - 1,
                  left: x + NODE_W,
                  width: interpolate(t, [nodeStart + 15, nodeStart + 35], [0, GAP], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  height: 2,
                  background: colors.agent,
                  opacity: 0.6,
                }}
              />
            )}

            <div
              style={{
                position: 'absolute',
                top: NODE_Y,
                left: x,
                width: NODE_W,
                minHeight: NODE_H,
                opacity,
                transform: `translateY(${y}px)`,
                background: colors.bgRaised,
                border: `1px solid ${
                  isIncidentNode && t > INCIDENT_START && t < FIX_START + 40
                    ? colors.mismatch
                    : colors.border
                }`,
                borderRadius: 12,
                padding: '14px 16px',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  color: colors.text,
                  fontFamily: fonts.mono,
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {stage.title}
              </div>
              {stage.lines.map((line) => (
                <div key={line} style={{color: colors.textDim, fontSize: 11.5, lineHeight: 1.5}}>
                  {line}
                </div>
              ))}
              <div style={{display: 'flex', flexWrap: 'wrap', marginTop: 4}}>
                {stage.badges.map((b) => (
                  <Badge key={b} label={b} />
                ))}
              </div>

              {/* per-stage progress line (stage 6 motif, echoed on every node) */}
              <div
                style={{
                  marginTop: 10,
                  height: 3,
                  borderRadius: 2,
                  background: colors.border,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progressPct}%`,
                    background: colors.approved,
                  }}
                />
              </div>
            </div>
          </React.Fragment>
        );
      })}

      {/* Incident overlay on Ingestion node */}
      {t > INCIDENT_START && (
        <div
          style={{
            position: 'absolute',
            top: NODE_Y + NODE_H + 24,
            left: START_X,
            width: NODE_W + 60,
            opacity: fadeIn(t, INCIDENT_START, 15),
            transform: `translateY(${riseIn(t, INCIDENT_START, 15)}px)`,
            background: `${colors.mismatch}1a`,
            border: `1px solid ${colors.mismatch}`,
            borderRadius: 10,
            padding: '10px 12px',
          }}
        >
          <div
            style={{
              color: colors.mismatch,
              fontFamily: fonts.mono,
              fontSize: 11,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            INCIDENT
          </div>
          <div style={{color: colors.text, fontSize: 12}}>malformed JSON / truncated output</div>
        </div>
      )}

      {/* Two green fixes, connected back into the pipeline */}
      {t > FIX_START && (
        <div
          style={{
            position: 'absolute',
            top: NODE_Y + NODE_H + 24,
            left: START_X + NODE_W + 90,
            display: 'flex',
            gap: 12,
            opacity: fadeIn(t, FIX_START, 15),
            transform: `translateY(${riseIn(t, FIX_START, 15)}px)`,
          }}
        >
          {['raise token ceiling', 'retry validation errors'].map((fix, i) => (
            <div
              key={fix}
              style={{
                background: `${colors.approved}1a`,
                border: `1px solid ${colors.approved}`,
                borderRadius: 10,
                padding: '10px 12px',
                width: 150,
                opacity: fadeIn(t, FIX_START + i * 10, 15),
              }}
            >
              <div
                style={{
                  color: colors.approved,
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                FIX
              </div>
              <div style={{color: colors.text, fontSize: 12}}>{fix}</div>
            </div>
          ))}

          {/* connector line back into pipeline */}
          <svg
            width="140"
            height="60"
            style={{position: 'absolute', top: -50, left: -60, overflow: 'visible'}}
          >
            <path
              d="M 0 50 C 40 0, 60 0, 100 -40"
              stroke={colors.approved}
              strokeWidth={2}
              fill="none"
              strokeDasharray={200}
              strokeDashoffset={interpolate(t, [FIX_START + 20, FIX_START + 60], [200, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}
            />
          </svg>
        </div>
      )}
    </div>
    </div>
  );
};
