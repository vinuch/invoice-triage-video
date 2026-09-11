import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from brief snP6S (Section 2: Architecture)
// "Two inputs (resume parsing, JD parsing) merge into a tailoring stage that
//  rewrites/reorders existing bullets without inventing experience. Continues
//  through ATS optimization -> gap analysis -> skill suggestions. A distinct
//  independent grounding-check branch after tailoring sends every rewritten
//  line to a separate fact-checking LLM call, tracing claims back to the
//  original resume, outputting verified/warning before final output."

const accent = '#a371f7';
const amber = '#e3b341';
const good = '#3fb950';

type Node = {
  label: string;
  sub?: string[];
  x: number;
  y: number;
  w: number;
  revealAt: number;
  variant?: 'default' | 'accent' | 'amber';
};

const card = (n: Node) => {
  const borderColor =
    n.variant === 'accent' ? accent : n.variant === 'amber' ? amber : '#30363d';
  return {n, borderColor};
};

export const ResumeArchitectureDiagram: React.FC<{startFrame?: number}> = ({
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

  const nodes: Node[] = [
    {
      label: 'Resume parsing',
      sub: ['experience', 'skills', 'education', 'role bullets'],
      x: 40,
      y: 140,
      w: 260,
      revealAt: 0,
    },
    {
      label: 'JD parsing',
      sub: ['required skills', 'preferred skills', 'responsibilities', 'employer vocab'],
      x: 40,
      y: 420,
      w: 260,
      revealAt: 10,
    },
    {
      label: 'Tailoring stage',
      sub: ['rewrites & reorders bullets', 'no invented experience'],
      x: 420,
      y: 270,
      w: 260,
      revealAt: 55,
      variant: 'accent',
    },
    {label: 'ATS optimization', x: 800, y: 140, w: 220, revealAt: 90},
    {label: 'Gap analysis', x: 1080, y: 140, w: 220, revealAt: 105},
    {label: 'Skill suggestions', x: 1360, y: 140, w: 220, revealAt: 120},
    {
      label: 'Fact-checking LLM',
      sub: ['traces every claim', 'back to original resume'],
      x: 800,
      y: 460,
      w: 260,
      revealAt: 145,
      variant: 'amber',
    },
  ];

  const finalRevealAt = 190;

  // FIX: badges now sit BELOW the Fact-checking LLM node with clear
  // vertical spacing (node bottom is ~y:460 + card height ~110 = ~570),
  // instead of at y:460 which put them level with the node's own text
  // and directly in the path of the connector line below.
  const badgeY = 590;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0d1117',
        position: 'relative',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 1620,
          height: 650,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(1.05)`,
          transformOrigin: 'center',
        }}
      >
      {/* Merge connectors: resume + JD -> tailoring */}
      <svg
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}
        viewBox="0 0 1920 1080"
      >
        <line
          x1={300}
          y1={190}
          x2={420}
          y2={330}
          stroke="#30363d"
          strokeWidth={2}
          opacity={reveal(40)}
        />
        <line
          x1={300}
          y1={470}
          x2={420}
          y2={340}
          stroke="#30363d"
          strokeWidth={2}
          opacity={reveal(50)}
        />
        {/* Tailoring -> main chain */}
        <line
          x1={680}
          y1={300}
          x2={800}
          y2={210}
          stroke="#30363d"
          strokeWidth={2}
          opacity={reveal(85)}
        />
        <line
          x1={1020}
          y1={210}
          x2={1080}
          y2={210}
          stroke="#30363d"
          strokeWidth={2}
          opacity={reveal(100)}
        />
        <line
          x1={1300}
          y1={210}
          x2={1360}
          y2={210}
          stroke="#30363d"
          strokeWidth={2}
          opacity={reveal(115)}
        />
        {/* Tailoring -> fact-check branch (dashed, distinct) */}
        <line
          x1={620}
          y1={350}
          x2={800}
          y2={510}
          stroke={amber}
          strokeWidth={2}
          strokeDasharray="6 6"
          opacity={reveal(130)}
        />
        {/* Fact-check -> final output.
            FIX: start point moved from (1060,510) — which sat inside the
            Verified/Warning badge row — down to (1060, badgeY + 26), i.e.
            just below the badges, so the line no longer cuts through the
            badge text. */}
        <line
          x1={1060}
          y1={badgeY + 26}
          x2={1550}
          y2={280}
          stroke={amber}
          strokeWidth={2}
          strokeDasharray="6 6"
          opacity={reveal(170)}
        />
        {/* Skill suggestions -> final output */}
        <line
          x1={1470}
          y1={210}
          x2={1550}
          y2={280}
          stroke="#30363d"
          strokeWidth={2}
          opacity={reveal(150)}
        />
      </svg>

      {nodes.map(card).map(({n, borderColor}) => {
        const op = reveal(n.revealAt);
        const y = rise(n.revealAt);
        return (
          <div
            key={n.label}
            style={{
              position: 'absolute',
              left: n.x,
              top: n.y,
              width: n.w,
              opacity: op,
              transform: `translateY(${y}px)`,
              padding: '18px 20px',
              borderRadius: 14,
              background: '#161b22',
              border: `1px solid ${borderColor}`,
              boxShadow: n.variant ? `0 0 20px ${borderColor}33` : undefined,
            }}
          >
            <div style={{color: '#e6edf3', fontSize: 18, fontWeight: 700}}>{n.label}</div>
            {n.sub && (
              <div style={{marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4}}>
                {n.sub.map((s) => (
                  <div key={s} style={{color: '#8b949e', fontSize: 13}}>
                    · {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Verified / Warning outputs from fact-check.
          FIX: moved from top:460 (level with, and overlapping, the
          Fact-checking LLM node and the connector line) to top:badgeY
          (590) — clearly below the node, matching the "these are the
          node's output" relationship instead of colliding with it. */}
      <div
        style={{
          position: 'absolute',
          left: 800,
          top: badgeY,
          display: 'flex',
          gap: 12,
          opacity: reveal(160),
        }}
      >
        <div
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            background: `${good}18`,
            border: `1px solid ${good}66`,
            color: good,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          ✓ Verified
        </div>
        <div
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            background: `${amber}18`,
            border: `1px solid ${amber}66`,
            color: amber,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          ⚠ Warning
        </div>

      {/* Final pipeline output */}
      <div
        style={{
          position: 'absolute',
          left: 1560,
          top: 210,
          width: 300,
          opacity: reveal(finalRevealAt),
          transform: `translateY(${rise(finalRevealAt)}px)`,
          padding: '22px 22px',
          borderRadius: 16,
          background: '#161b22',
          border: `2px solid ${accent}`,
          boxShadow: `0 0 28px ${accent}44`,
        }}
      >
        <div style={{color: accent, fontSize: 13, fontWeight: 700, letterSpacing: 0.5}}>
          FINAL OUTPUT
        </div>
        <div style={{color: '#e6edf3', fontSize: 16, marginTop: 6}}>
          Tailored resume, grounded &amp; verified
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};
