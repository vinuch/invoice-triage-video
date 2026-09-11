import React from 'react';
import {useCurrentFrame} from 'remotion';
import {fadeIn, riseIn} from '../lib/animate';
import {colors, fonts} from '../design-tokens';

type CoverLetterProofItWorksDiagramProps = {
  startFrame?: number;
};

const STAGE_Y = 220;
const STAGE_H = 260;
const STAGE_W = 210;
const STAGE_GAP = 30;
const STAGE_X0 = 30;

const STAGE_X = (i: number) => STAGE_X0 + i * (STAGE_W + STAGE_GAP);

const STAGES = [
  {
    title: 'Inputs',
    lines: ['Amaka Nwosu — resume', 'Stripe job posting', 'Stripe about + jobs pages'],
  },
  {
    title: 'Ingestion + Research',
    lines: [
      '5 must-haves',
      '3 nice-to-haves',
      '3 recurring phrases',
      'source-tagged company language',
    ],
  },
  {
    title: 'Fusion',
    lines: [
      'Python, 500,000 daily records',
      'monolith → REST/Kafka:',
      '  deploy 40min → 6min',
      'GitHub Actions CI/CD,',
      '  operational ownership',
    ],
  },
  {
    title: 'Outputs',
    lines: ['Cover letter', 'Hiring manager email', 'Value proposition', 'Follow-up'],
  },
  {
    title: 'Grounding Check',
    lines: ['every claim traced', 'to a source'],
  },
];

const BADGE_Y = STAGE_Y + STAGE_H + 60;

const STAGE_STAGGER = 45;
const BADGE_START = STAGES.length * STAGE_STAGGER + 30;
const SPLIT_START = BADGE_START + 30;

export const CoverLetterProofItWorksDiagram: React.FC<CoverLetterProofItWorksDiagramProps> = ({
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
          width: 1200,
          height: 650,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(1.4)`,
          transformOrigin: 'center',
        }}
      >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 34,
          left: STAGE_X0,
          opacity: fadeIn(t, 0, 20),
          transform: `translateY(${riseIn(t, 0, 20)}px)`,
        }}
      >
        <div
          style={{
            color: colors.text,
            fontFamily: fonts.mono,
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          Amaka Nwosu → Stripe · Grounded Application
        </div>
      </div>

      {/* Stage columns */}
      {STAGES.map((s, i) => {
        const start = i * STAGE_STAGGER;
        return (
          <React.Fragment key={s.title}>
            {i > 0 && (
              <svg
                width={STAGE_GAP}
                height={4}
                style={{
                  position: 'absolute',
                  left: STAGE_X(i - 1) + STAGE_W,
                  top: STAGE_Y + STAGE_H / 2 - 1,
                  opacity: fadeIn(t, start - 10, 15),
                  overflow: 'visible',
                }}
              >
                <line x1={0} y1={2} x2={STAGE_GAP} y2={2} stroke={colors.agent} strokeWidth={2} />
              </svg>
            )}
            <div
              style={{
                position: 'absolute',
                top: STAGE_Y,
                left: STAGE_X(i),
                width: STAGE_W,
                minHeight: STAGE_H,
                opacity: fadeIn(t, start, 20),
                transform: `translateY(${riseIn(t, start, 20)}px)`,
                background: colors.bgRaised,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                padding: '14px 16px',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  color: colors.agent,
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 10,
                  paddingBottom: 8,
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                {s.title}
              </div>
              {s.lines.map((l, li) => (
                <div
                  key={li}
                  style={{
                    color: colors.text,
                    fontSize: 11,
                    lineHeight: 1.6,
                    whiteSpace: 'pre',
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          </React.Fragment>
        );
      })}

      {/* 9/9 claims verified badge */}
      {t > BADGE_START && (
        <div
          style={{
            position: 'absolute',
            top: BADGE_Y,
            left: STAGE_X0,
            width: STAGE_X(STAGES.length - 1) + STAGE_W - STAGE_X0,
            opacity: fadeIn(t, BADGE_START, 25),
            transform: `translateY(${riseIn(t, BADGE_START, 25)}px)`,
            background: `${colors.approved}14`,
            border: `1.5px solid ${colors.approved}`,
            borderRadius: 14,
            padding: '18px 24px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                color: colors.approved,
                fontFamily: fonts.mono,
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              9/9 claims verified
            </div>
            <div style={{color: colors.textDim, fontSize: 12, marginTop: 4}}>nothing invented</div>
          </div>

          {t > SPLIT_START && (
            <div
              style={{
                display: 'flex',
                gap: 14,
                opacity: fadeIn(t, SPLIT_START, 20),
              }}
            >
              <div
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  padding: '6px 12px',
                  textAlign: 'center',
                }}
              >
                <div style={{color: colors.text, fontSize: 15, fontWeight: 700}}>5</div>
                <div style={{color: colors.textDim, fontSize: 9.5}}>candidate-side</div>
              </div>
              <div
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  padding: '6px 12px',
                  textAlign: 'center',
                }}
              >
                <div style={{color: colors.text, fontSize: 15, fontWeight: 700}}>4</div>
                <div style={{color: colors.textDim, fontSize: 9.5}}>company-side</div>
              </div>
              <div
                style={{
                  border: `1px solid ${colors.approved}`,
                  borderRadius: 8,
                  padding: '6px 10px',
                  textAlign: 'center',
                  color: colors.approved,
                  fontSize: 10,
                  fontFamily: fonts.mono,
                  alignSelf: 'center',
                }}
              >
                source-linked
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
};
