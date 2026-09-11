import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from brief fY0MU (Section 3: Build Walkthrough)
// "End-to-end resume processing pipeline: PDF/text ingestion -> pdfplumber ->
//  sparse-text heuristic -> vision-LLM fallback OR plain text skip -> converge
//  on structured extraction -> ResumeData JSON (Kobo360 work-experience card).
//  Parallel JD extraction -> required/preferred skills, categories, keywords.
//  Both feed a tailoring agent governed by a HARD RULES guardrail card. A
//  bullet rewrite example with traceability. Branch into deterministic ATS
//  checks -> 0-100 score; parallel LLM gap-analysis + relevance scoring;
//  merge into composite score (deterministic 35%, keyword 35%, LLM 30%).
//  Second independent fact-check pass verifies every claim before release."

const accent = '#a371f7';
const amber = '#e3b341';
const good = '#3fb950';
const blue = '#58a6ff';

export const ResumeBuildWalkthroughDiagram: React.FC<{startFrame?: number}> = ({
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
    interpolate(t, [at, at + dur], [12, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  // Small moving token along ingestion path
  const tokenX = interpolate(t, [0, 260], [40, 560], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tokenOpacity = interpolate(t, [0, 10, 250, 265], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const card = (
    key: string,
    label: string,
    style: React.CSSProperties,
    revealAt: number,
    opts?: {sub?: string; border?: string}
  ) => (
    <div
      key={key}
      style={{
        position: 'absolute',
        opacity: reveal(revealAt),
        transform: `translateY(${rise(revealAt)}px)`,
        padding: '12px 16px',
        borderRadius: 10,
        background: '#161b22',
        border: `1px solid ${opts?.border ?? '#30363d'}`,
        color: '#e6edf3',
        fontSize: 14,
        fontWeight: 600,
        whiteSpace: 'pre-line',
        ...style,
      }}
    >
      {label}
      {opts?.sub && (
        <div style={{color: '#8b949e', fontSize: 11, fontWeight: 400, marginTop: 3}}>
          {opts.sub}
        </div>
      )}
    </div>
  );

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
      <svg
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}
        viewBox="0 0 1920 1080"
      >
        <line x1={160} y1={70} x2={280} y2={70} stroke="#30363d" strokeWidth={2} opacity={reveal(10)} />
        <line x1={420} y1={70} x2={540} y2={70} stroke="#30363d" strokeWidth={2} opacity={reveal(30)} />
        <line x1={680} y1={70} x2={680} y2={140} stroke="#30363d" strokeWidth={2} opacity={reveal(45)} />
        <line x1={160} y1={190} x2={680} y2={190} stroke="#30363d" strokeWidth={2} opacity={reveal(20)} />
        <line x1={680} y1={190} x2={680} y2={230} stroke="#30363d" strokeWidth={2} opacity={reveal(50)} />
        <line x1={780} y1={230} x2={900} y2={140} stroke="#30363d" strokeWidth={2} opacity={reveal(80)} />
        <line x1={900} y1={140} x2={1040} y2={140} stroke="#30363d" strokeWidth={2} opacity={reveal(95)} />

        {/* JD path */}
        <line x1={160} y1={340} x2={900} y2={340} stroke="#30363d" strokeWidth={2} opacity={reveal(60)} />
        <line x1={900} y1={340} x2={900} y2={220} stroke="#30363d" strokeWidth={2} opacity={reveal(75)} />

        {/* extraction -> tailoring */}
        <line x1={1040} y1={170} x2={1160} y2={170} stroke="#30363d" strokeWidth={2} opacity={reveal(110)} />

        {/* tailoring -> bullet transform */}
        <line x1={1300} y1={210} x2={1300} y2={280} stroke="#30363d" strokeWidth={2} opacity={reveal(140)} />

        {/* tailoring -> ATS + LLM branches */}
        <line x1={1160} y1={220} x2={900} y2={420} stroke="#30363d" strokeWidth={2} opacity={reveal(170)} />
        <line x1={1160} y1={220} x2={1300} y2={420} stroke="#30363d" strokeWidth={2} opacity={reveal(180)} />

        {/* ATS + LLM -> composite */}
        <line x1={900} y1={470} x2={1080} y2={560} stroke="#30363d" strokeWidth={2} opacity={reveal(230)} />
        <line x1={1300} y1={470} x2={1120} y2={560} stroke="#30363d" strokeWidth={2} opacity={reveal(230)} />

        {/* tailoring -> fact-check (independent, amber dashed) */}
        <line x1={1440} y1={190} x2={1620} y2={280} stroke={amber} strokeWidth={2} strokeDasharray="6 6" opacity={reveal(250)} />

        {/* composite + fact-check -> release */}
        <line x1={1100} y1={610} x2={1620} y2={330} stroke="#30363d" strokeWidth={2} opacity={reveal(280)} />
      </svg>

      {/* Moving token */}
      <div
        style={{
          position: 'absolute',
          left: tokenX,
          top: 55,
          opacity: tokenOpacity,
          width: 10,
          height: 10,
          borderRadius: 5,
          background: blue,
          boxShadow: `0 0 8px ${blue}`,
        }}
      />

      {/* Ingestion row */}
      {card('pdf', 'PDF input', {left: 40, top: 40, width: 110}, 0)}
      {card('text', 'Plain text', {left: 40, top: 160, width: 110}, 5)}
      {card('pdfplumber', 'pdfplumber\nextraction', {left: 280, top: 40, width: 140}, 15, {
        sub: 'text extraction',
      })}
      {card('sparse', 'Sparse-text\nheuristic', {left: 540, top: 40, width: 140}, 35, {
        sub: 'continue or fallback',
      })}
      {card('vision', 'Page render +\nvision-LLM fallback', {left: 540, top: 140, width: 160}, 55, {
        border: amber,
      })}
      {card('extract1', 'Structured\nextraction', {left: 900, top: 90, width: 140}, 85, {
        border: accent,
      })}
      {card(
        'resumedata',
        'ResumeData JSON',
        {left: 1040, top: 40, width: 180},
        100,
        {sub: 'Kobo360 · indexed bullets', border: accent}
      )}

      {/* JD row */}
      {card('jd', 'Job description', {left: 40, top: 320, width: 140}, 60)}
      {card('jdextract', 'Structured\nextraction', {left: 780, top: 300, width: 140}, 70)}
      {card(
        'jddata',
        'Required/preferred skills',
        {left: 940, top: 300, width: 200},
        90,
        {sub: 'categories · normalized keywords'}
      )}

      {/* Tailoring agent w/ HARD RULES */}
      <div
        style={{
          position: 'absolute',
          left: 1160,
          top: 130,
          width: 220,
          opacity: reveal(120),
          transform: `translateY(${rise(120)}px)`,
          padding: '16px 18px',
          borderRadius: 12,
          background: '#161b22',
          border: `2px solid ${accent}`,
          boxShadow: `0 0 22px ${accent}44`,
        }}
      >
        <div style={{color: accent, fontSize: 14, fontWeight: 700}}>Tailoring agent</div>
        <div
          style={{
            marginTop: 8,
            padding: '6px 10px',
            borderRadius: 6,
            background: `${amber}18`,
            border: `1px solid ${amber}66`,
            color: amber,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          HARD RULES: no invented metrics, tools, scope, or specificity
        </div>
      </div>

      {/* Bullet transform example */}
      <div
        style={{
          position: 'absolute',
          left: 1160,
          top: 290,
          width: 300,
          opacity: reveal(150),
          transform: `translateY(${rise(150)}px)`,
        }}
      >
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            background: '#161b22',
            border: '1px solid #30363d',
            color: '#8b949e',
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            textDecoration: 'line-through',
          }}
        >
          Built backend services for logistics
        </div>
        <div style={{color: '#8b949e', fontSize: 11, margin: '4px 0', paddingLeft: 4}}>↓ traced &amp; rewritten</div>
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            background: '#161b22',
            border: `1px solid ${good}66`,
            color: '#e6edf3',
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Built <span style={{color: good, fontWeight: 700}}>microservices</span> backend
          for logistics
        </div>
      </div>

      {/* ATS deterministic checks */}
      <div
        style={{
          position: 'absolute',
          left: 780,
          top: 400,
          width: 220,
          opacity: reveal(190),
          transform: `translateY(${rise(190)}px)`,
          padding: '14px 16px',
          borderRadius: 10,
          background: '#161b22',
          border: '1px solid #30363d',
        }}
      >
        <div style={{color: '#e6edf3', fontSize: 13, fontWeight: 700}}>Deterministic ATS checks</div>
        <div style={{color: '#8b949e', fontSize: 11, marginTop: 6, lineHeight: 1.6}}>
          headers · contact · sections
          <br />
          columns · dates · bullets · filename
        </div>
      </div>

      {/* LLM gap analysis + relevance */}
      <div
        style={{
          position: 'absolute',
          left: 1220,
          top: 400,
          width: 220,
          opacity: reveal(200),
          transform: `translateY(${rise(200)}px)`,
          padding: '14px 16px',
          borderRadius: 10,
          background: '#161b22',
          border: '1px solid #30363d',
        }}
      >
        <div style={{color: '#e6edf3', fontSize: 13, fontWeight: 700}}>LLM gap analysis</div>
        <div style={{color: '#8b949e', fontSize: 11, marginTop: 4}}>+ relevance scoring</div>
      </div>

      {/* Composite score */}
      <div
        style={{
          position: 'absolute',
          left: 950,
          top: 560,
          width: 260,
          opacity: reveal(240),
          transform: `translateY(${rise(240)}px)`,
          padding: '16px 18px',
          borderRadius: 12,
          background: '#161b22',
          border: `2px solid ${good}`,
          boxShadow: `0 0 20px ${good}33`,
        }}
      >
        <div style={{color: good, fontSize: 14, fontWeight: 700}}>Composite score</div>
        <div style={{color: '#8b949e', fontSize: 11, marginTop: 6, lineHeight: 1.6}}>
          Deterministic 35% · Keyword match 35%
          <br />
          LLM relevance 30%
        </div>
      </div>

      {/* Fact-check pass */}
      <div
        style={{
          position: 'absolute',
          left: 1620,
          top: 230,
          width: 220,
          opacity: reveal(260),
          transform: `translateY(${rise(260)}px)`,
          padding: '14px 16px',
          borderRadius: 10,
          background: '#161b22',
          border: `1px solid ${amber}`,
        }}
      >
        <div style={{color: amber, fontSize: 13, fontWeight: 700}}>Fact-checking pass</div>
        <div style={{color: '#8b949e', fontSize: 11, marginTop: 4}}>
          verifies every claim before release
        </div>
      </div>

      {/* Final release */}
      <div
        style={{
          position: 'absolute',
          left: 1620,
          top: 340,
          width: 220,
          opacity: reveal(290),
          transform: `translateY(${rise(290)}px)`,
          padding: '14px 16px',
          borderRadius: 10,
          background: '#161b22',
          border: `2px solid ${accent}`,
          boxShadow: `0 0 18px ${accent}44`,
        }}
      >
        <div style={{color: accent, fontSize: 13, fontWeight: 700}}>Release</div>
        <div style={{color: '#8b949e', fontSize: 11, marginTop: 4}}>tailored + verified resume</div>
      </div>
    </div>
  );
};
