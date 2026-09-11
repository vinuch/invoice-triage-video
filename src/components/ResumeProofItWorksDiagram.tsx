import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from brief HcSJ8 (Section 4: Proof It Works)
// "Before-and-after comparison for a Backend Engineer / Platform Team resume.
//  Four metric rows: Deterministic 73.0->79.0, Keyword match 41.7->87.5,
//  LLM relevance 85.0->92.0, Composite 65.6->85.9 (emphasized). Three gap
//  callouts: missing 'microservices architecture', missing 'CI/CD',
//  under-elaborated AWS. Trace lines from rewritten terms back to source
//  resume evidence, ending on 'Language gaps, not capability gaps' /
//  'No invented skills'."

const accent = '#a371f7';
const good = '#3fb950';
const dim = '#8b949e';

type Metric = {
  label: string;
  before: number;
  after: number;
  emphasized?: boolean;
};

const metrics: Metric[] = [
  {label: 'Deterministic', before: 73.0, after: 79.0},
  {label: 'Keyword match', before: 41.7, after: 87.5},
  {label: 'LLM relevance', before: 85.0, after: 92.0},
  {label: 'Composite', before: 65.6, after: 85.9, emphasized: true},
];

const gaps = [
  "Missing 'microservices architecture'",
  "Missing 'CI/CD'",
  'Under-elaborated AWS experience',
];

const traces = ['microservices architecture', 'CI/CD', 'Agile/Scrum', 'automated testing practices'];

export const ResumeProofItWorksDiagram: React.FC<{startFrame?: number}> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;

  const reveal = (at: number, dur = 16) =>
    interpolate(t, [at, at + dur], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  const rise = (at: number, dur = 16) =>
    interpolate(t, [at, at + dur], [14, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const rowStagger = 26;
  const rowStart = 10;
  const gapsStart = rowStart + metrics.length * rowStagger + 25;
  const traceStart = gapsStart + gaps.length * 18 + 30;
  const badgeStart = traceStart + traces.length * 14 + 35;

  const maxVal = 100;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0d1117',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '0 80px',
      }}
    >
      <div style={{color: dim, fontSize: 16, marginBottom: 8}}>
        Same resume, tailored for: Backend Engineer / Platform Team
      </div>

      {/* Metric rows */}
      <div style={{width: '100%', maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 20}}>
        {metrics.map((m, i) => {
          const revealAt = rowStart + i * rowStagger;
          const rowOpacity = reveal(revealAt);
          const rowY = rise(revealAt);
          const barProgress = interpolate(t, [revealAt + 10, revealAt + 40], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const currentVal = m.before + (m.after - m.before) * barProgress;

          return (
            <div
              key={m.label}
              style={{
                opacity: rowOpacity,
                transform: `translateY(${rowY}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 170,
                  color: m.emphasized ? '#e6edf3' : dim,
                  fontSize: m.emphasized ? 18 : 15,
                  fontWeight: m.emphasized ? 800 : 600,
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  flex: 1,
                  height: m.emphasized ? 22 : 14,
                  borderRadius: 8,
                  background: '#161b22',
                  border: '1px solid #30363d',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: `${(currentVal / maxVal) * 100}%`,
                    height: '100%',
                    background: m.emphasized
                      ? `linear-gradient(90deg, ${accent}, ${good})`
                      : good,
                    borderRadius: 8,
                  }}
                />
              </div>
              <div
                style={{
                  width: 150,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: m.emphasized ? 18 : 14,
                  fontWeight: m.emphasized ? 800 : 600,
                  color: m.emphasized ? good : '#e6edf3',
                }}
              >
                {m.before.toFixed(1)} → {currentVal.toFixed(1)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gap analysis callouts */}
      <div
        style={{
          display: 'flex',
          gap: 14,
          marginTop: 36,
          opacity: reveal(gapsStart),
          transform: `translateY(${rise(gapsStart)}px)`,
        }}
      >
        {gaps.map((g) => (
          <div
            key={g}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              background: '#161b22',
              border: '1px solid #e3b34166',
              color: '#e3b341',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {g}
          </div>
        ))}
      </div>

      {/* Trace terms */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 22,
          opacity: reveal(traceStart),
          transform: `translateY(${rise(traceStart)}px)`,
        }}
      >
        <span style={{color: dim, fontSize: 13, alignSelf: 'center'}}>Traced to resume:</span>
        {traces.map((tr) => (
          <div
            key={tr}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              background: `${good}18`,
              border: `1px solid ${good}66`,
              color: good,
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {tr}
          </div>
        ))}
      </div>

      {/* Closing badge */}
      <div
        style={{
          marginTop: 32,
          display: 'flex',
          gap: 16,
          opacity: reveal(badgeStart),
          transform: `translateY(${rise(badgeStart)}px)`,
        }}
      >
        <div
          style={{
            padding: '12px 22px',
            borderRadius: 10,
            background: `${accent}18`,
            border: `2px solid ${accent}`,
            color: '#e6edf3',
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          Language gaps, not capability gaps
        </div>
        <div
          style={{
            padding: '12px 22px',
            borderRadius: 10,
            background: `${good}18`,
            border: `2px solid ${good}`,
            color: good,
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          No invented skills
        </div>
      </div>
    </div>
  );
};
