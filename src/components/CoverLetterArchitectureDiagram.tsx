import React from 'react';
import {useCurrentFrame} from 'remotion';
import {fadeIn, riseIn} from '../lib/animate';
import {colors, fonts} from '../design-tokens';

type CoverLetterArchitectureDiagramProps = {
  startFrame?: number;
};

const INPUTS = ['Resume', 'Job Description', 'Company Website'];

const INPUT_X = 40;
const INPUT_W = 150;
const INPUT_H = 60;
const INPUT_Y0 = 80;
const INPUT_GAP = 74;

const STAGE_Y = 260;
const STAGE_H = 130;
const STAGE_W = 170;
const STAGE_GAP = 36;

const STAGES = [
  {key: 'ingestion', title: 'Ingestion', lines: ['raw text →', 'structured fields']},
  {key: 'research', title: 'Research', lines: ['mission, shipped work,', 'culture, team context']},
  {key: 'fusion', title: 'Fusion', lines: ['grounded context:', 'role needs + strengths', '+ company priorities']},
];

const STAGE_X = (i: number) => INPUT_X + INPUT_W + 70 + i * (STAGE_W + STAGE_GAP);

const GEN_X = STAGE_X(3) + 10;
const GEN_Y = STAGE_Y;
const GEN_W = 150;
const GEN_H = 130;

const OUTPUTS = ['Cover Letter', 'Hiring Mgr Email', 'Value Proposition', 'Follow-up Email'];
const OUT_X = GEN_X + GEN_W + 60;
const OUT_W = 190;
const OUT_H = 44;
const OUT_Y0 = 90;
const OUT_GAP = 58;

const GROUND_Y = 560;
const GROUND_H = 70;

const STAGE_START = 40;
const GEN_START = 90;
const OUT_START = 120;
const GROUND_START = 160;
const RETURN_START = 210;

export const CoverLetterArchitectureDiagram: React.FC<CoverLetterArchitectureDiagramProps> = ({
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
          width: 1300,
          height: 630,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(1.3)`,
          transformOrigin: 'center',
        }}
      >
      {/* Input cards */}
      {INPUTS.map((label, i) => {
        const start = i * 12;
        return (
          <div
            key={label}
            style={{
              position: 'absolute',
              top: INPUT_Y0 + i * INPUT_GAP,
              left: INPUT_X,
              width: INPUT_W,
              height: INPUT_H,
              opacity: fadeIn(t, start, 18),
              transform: `translateY(${riseIn(t, start, 18)}px)`,
              background: colors.bgRaised,
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
            }}
          >
            <div style={{color: colors.text, fontSize: 13, fontWeight: 600, textAlign: 'center'}}>
              {label}
            </div>
          </div>
        );
      })}

      {/* connector: inputs -> Ingestion */}
      <svg
        width={70}
        height={INPUT_GAP * 2 + INPUT_H}
        style={{
          position: 'absolute',
          left: INPUT_X + INPUT_W,
          top: INPUT_Y0,
          opacity: fadeIn(t, 30, 20),
          overflow: 'visible',
        }}
      >
        {INPUTS.map((_, i) => (
          <line
            key={i}
            x1={0}
            y1={i * INPUT_GAP + INPUT_H / 2}
            x2={70}
            y2={(STAGE_Y + STAGE_H / 2) - INPUT_Y0}
            stroke={colors.agent}
            strokeWidth={1.5}
            opacity={0.5}
          />
        ))}
      </svg>

      {/* Ingestion / Research / Fusion */}
      {STAGES.map((s, i) => {
        const start = STAGE_START + i * 30;
        return (
          <React.Fragment key={s.key}>
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
                  marginBottom: 8,
                }}
              >
                {s.title}
              </div>
              {s.lines.map((l) => (
                <div key={l} style={{color: colors.textDim, fontSize: 11.5, lineHeight: 1.5}}>
                  {l}
                </div>
              ))}
            </div>
          </React.Fragment>
        );
      })}

      {/* Fusion -> Generation connector */}
      <svg
        width={GEN_X - (STAGE_X(2) + STAGE_W)}
        height={4}
        style={{
          position: 'absolute',
          left: STAGE_X(2) + STAGE_W,
          top: STAGE_Y + STAGE_H / 2 - 1,
          opacity: fadeIn(t, GEN_START - 10, 15),
          overflow: 'visible',
        }}
      >
        <line
          x1={0}
          y1={2}
          x2={GEN_X - (STAGE_X(2) + STAGE_W)}
          y2={2}
          stroke={colors.agent}
          strokeWidth={2}
        />
      </svg>

      {/* Generation node */}
      <div
        style={{
          position: 'absolute',
          top: GEN_Y,
          left: GEN_X,
          width: GEN_W,
          height: GEN_H,
          opacity: fadeIn(t, GEN_START, 20),
          transform: `translateY(${riseIn(t, GEN_START, 20)}px)`,
          background: colors.bgRaised,
          border: `1.5px solid ${colors.agent}`,
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            color: colors.agent,
            fontFamily: fonts.mono,
            fontSize: 12,
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Generation
        </div>
        <div style={{color: colors.textDim, fontSize: 11.5, textAlign: 'center'}}>4 consistent outputs</div>
      </div>

      {/* Generation -> 4 outputs */}
      {OUTPUTS.map((label, i) => {
        const start = OUT_START + i * 10;
        const y = OUT_Y0 + i * OUT_GAP;
        return (
          <React.Fragment key={label}>
            <svg
              width={OUT_X - (GEN_X + GEN_W)}
              height={Math.abs(y + OUT_H / 2 - (GEN_Y + GEN_H / 2)) + 4}
              style={{
                position: 'absolute',
                left: GEN_X + GEN_W,
                top: Math.min(y + OUT_H / 2, GEN_Y + GEN_H / 2),
                opacity: fadeIn(t, start - 5, 15),
                overflow: 'visible',
              }}
            >
              <line
                x1={0}
                y1={y + OUT_H / 2 > GEN_Y + GEN_H / 2 ? Math.abs(y + OUT_H / 2 - (GEN_Y + GEN_H / 2)) : 0}
                x2={OUT_X - (GEN_X + GEN_W)}
                y2={y + OUT_H / 2 > GEN_Y + GEN_H / 2 ? 0 : Math.abs(y + OUT_H / 2 - (GEN_Y + GEN_H / 2))}
                stroke={colors.agent}
                strokeWidth={1.5}
                opacity={0.6}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                top: y,
                left: OUT_X,
                width: OUT_W,
                height: OUT_H,
                opacity: fadeIn(t, start, 18),
                transform: `translateY(${riseIn(t, start, 18)}px)`,
                background: colors.bgRaised,
                border: `1px solid ${colors.border}`,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
            >
              <div style={{color: colors.text, fontSize: 12.5, fontWeight: 600}}>{label}</div>
            </div>
          </React.Fragment>
        );
      })}

      {/* Grounding stage beneath outputs */}
      {t > GROUND_START && (
        <div
          style={{
            position: 'absolute',
            top: GROUND_Y,
            left: STAGE_X(2),
            width: OUT_X + OUT_W - STAGE_X(2),
            height: GROUND_H,
            opacity: fadeIn(t, GROUND_START, 20),
            transform: `translateY(${riseIn(t, GROUND_START, 20)}px)`,
            background: `${colors.approved}14`,
            border: `1px solid ${colors.approved}`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            padding: '0 16px',
          }}
        >
          <div style={{textAlign: 'center'}}>
            <div
              style={{
                color: colors.approved,
                fontFamily: fonts.mono,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Grounding Check
            </div>
            <div style={{color: colors.textDim, fontSize: 11.5, marginTop: 2}}>
              checks claims against original source data
            </div>
          </div>
        </div>
      )}

      {/* return arrow: grounding -> generation (corrections/approval) */}
      {t > RETURN_START && (
        <svg
          width={4}
          height={GROUND_Y - (GEN_Y + GEN_H)}
          style={{
            position: 'absolute',
            left: GEN_X + GEN_W / 2 - 2,
            top: GEN_Y + GEN_H,
            opacity: fadeIn(t, RETURN_START, 20),
            overflow: 'visible',
          }}
        >
          <line
            x1={2}
            y1={0}
            x2={2}
            y2={GROUND_Y - (GEN_Y + GEN_H)}
            stroke={colors.review}
            strokeWidth={2}
            strokeDasharray="6 5"
          />
        </svg>
      )}
      {t > RETURN_START && (
        <div
          style={{
            position: 'absolute',
            top: GEN_Y + GEN_H + (GROUND_Y - (GEN_Y + GEN_H)) / 2 - 10,
            left: GEN_X + GEN_W / 2 + 10,
            opacity: fadeIn(t, RETURN_START, 20),
            color: colors.review,
            fontFamily: fonts.mono,
            fontSize: 10.5,
            whiteSpace: 'nowrap',
          }}
        >
          corrections / approval
        </div>
      )}
    </div>
    </div>
  );
};
