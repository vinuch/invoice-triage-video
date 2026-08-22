import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {colors, fonts, statusColor} from '../design-tokens';

export type TerminalLine =
  | {type: 'command'; text: string; frameIn: number}
  | {type: 'output'; text: string; frameIn: number; dim?: boolean}
  | {
      type: 'status';
      text: string; // e.g. "APPROVED" or "FLAG:MATH_MISMATCH"
      status: 'approved' | 'review' | 'flag' | 'duplicate';
      frameIn: number;
    };

export type TerminalScript = {
  title: string; // shown in the fake window chrome, e.g. "invoice_02.json"
  lines: TerminalLine[];
};

const TypedText: React.FC<{text: string; frameIn: number; charsPerFrame?: number}> = ({
  text,
  frameIn,
  charsPerFrame = 1.5,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - frameIn);
  const chars = Math.min(text.length, Math.floor(elapsed * charsPerFrame));
  return <>{text.slice(0, chars)}</>;
};

export const TerminalReveal: React.FC<{script: TerminalScript}> = ({script}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, padding: 80, justifyContent: 'center'}}>
      <div
        style={{
          backgroundColor: colors.bgRaised,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* window chrome */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '18px 24px',
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div style={{display: 'flex', gap: 8}}>
            {['#E5484D', '#E8A33D', '#5FD98A'].map((c) => (
              <div key={c} style={{width: 12, height: 12, borderRadius: 6, backgroundColor: c, opacity: 0.4}} />
            ))}
          </div>
          <span style={{color: colors.textDim, fontFamily: fonts.mono, fontSize: 18}}>{script.title}</span>
        </div>

        {/* body */}
        <div style={{padding: 32, minWidth: 900, minHeight: 420}}>
          {script.lines.map((line, i) => {
            if (frame < line.frameIn) return null;
            const revealProgress = spring({
              frame: frame - line.frameIn,
              fps,
              config: {damping: 200},
            });

            if (line.type === 'command') {
              return (
                <div key={i} style={{fontFamily: fonts.mono, fontSize: 26, color: colors.text, marginBottom: 12}}>
                  <span style={{color: colors.textDim}}>$ </span>
                  <TypedText text={line.text} frameIn={line.frameIn} />
                </div>
              );
            }

            if (line.type === 'output') {
              return (
                <div
                  key={i}
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 22,
                    color: line.dim ? colors.textDim : colors.text,
                    marginBottom: 8,
                    opacity: interpolate(revealProgress, [0, 1], [0, 1]),
                  }}
                >
                  {line.text}
                </div>
              );
            }

            // status line — the signature bracket tag
            const c = statusColor(line.status);
            return (
              <div
                key={i}
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 30,
                  fontWeight: 700,
                  color: c,
                  marginTop: 20,
                  opacity: interpolate(revealProgress, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(revealProgress, [0, 1], [-12, 0])}px)`,
                }}
              >
                [{line.text}]
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
