import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

// Built from brief pRpsz (Section 5: Close)
// "A static resume struggling against multiple changing job descriptions,
//  transforming into an adaptive resume that dynamically aligns with each
//  role. Flow from tailored applications to increased interviews, ending on
//  'Adapt faster. Interview more.'"

const accent = '#a371f7';
const good = '#3fb950';
const danger = '#f85149';
const dim = '#8b949e';

const jdLabels = ['Backend Eng.', 'Platform Lead', 'DevOps', 'Senior SWE'];

export const ResumeAdaptiveCloseDiagram: React.FC<{startFrame?: number}> = ({
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

  // Static resume struggling (0-60): shake against JDs, then fades
  const struggleShake =
    t > 20 && t < 60 ? Math.sin((t - 20) * 1.6) * 4 : 0;
  const staticOpacity = interpolate(t, [0, 15, 65, 90], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Transform moment (75-110)
  const transformOpacity = interpolate(t, [95, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const transformScale = interpolate(t, [95, 120], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Aligned resumes fan out (130+)
  const fanStart = 140;
  const fanStagger = 14;

  // Applications -> interviews flow (fanStart + jdLabels.length*stagger + 30)
  const flowStart = fanStart + jdLabels.length * fanStagger + 30;

  // Closing line
  const closingStart = flowStart + 70;

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
        position: 'relative',
      }}
    >
      {/* Struggling static resume vs. changing JDs */}
      <div
        style={{
          position: 'absolute',
          opacity: staticOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          transform: `translateX(${struggleShake}px)`,
        }}
      >
        <div
          style={{
            width: 150,
            padding: '16px',
            borderRadius: 10,
            background: '#161b22',
            border: `1px solid ${danger}88`,
          }}
        >
          <div style={{color: '#e6edf3', fontSize: 14, fontWeight: 700}}>Static resume</div>
          <div style={{color: dim, fontSize: 11, marginTop: 4}}>one version, every job</div>
        </div>
        <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', maxWidth: 400}}>
          {jdLabels.map((jd) => (
            <div
              key={jd}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                background: '#161b22',
                border: `1px solid ${danger}55`,
                color: danger,
                fontSize: 12,
              }}
            >
              {jd}
            </div>
          ))}
        </div>
      </div>

      {/* Transform moment */}
      <div
        style={{
          position: 'absolute',
          opacity: transformOpacity,
          transform: `scale(${transformScale})`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            padding: '16px 28px',
            borderRadius: 14,
            background: '#161b22',
            border: `2px solid ${accent}`,
            boxShadow: `0 0 30px ${accent}44`,
            color: accent,
            fontSize: 20,
            fontWeight: 800,
          }}
        >
          Adaptive resume
        </div>
        <div style={{color: dim, fontSize: 13, marginTop: 8}}>aligns dynamically with each role</div>
      </div>

      {/* Fan of aligned resumes */}
      <div
        style={{
          position: 'absolute',
          top: 640,
          display: 'flex',
          gap: 16,
        }}
      >
        {jdLabels.map((jd, i) => {
          const revealAt = fanStart + i * fanStagger;
          const op = reveal(revealAt);
          const y = rise(revealAt);
          return (
            <div
              key={jd}
              style={{
                opacity: op,
                transform: `translateY(${y}px)`,
                width: 150,
                padding: '12px 14px',
                borderRadius: 10,
                background: '#161b22',
                border: `1px solid ${good}66`,
              }}
            >
              <div style={{color: '#e6edf3', fontSize: 13, fontWeight: 700}}>Resume · {jd}</div>
            </div>
          );
        })}
      </div>

      {/* Applications -> interviews flow */}
      <div
        style={{
          position: 'absolute',
          top: 780,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          opacity: reveal(flowStart),
          transform: `translateY(${rise(flowStart)}px)`,
        }}
      >
        <div style={{color: dim, fontSize: 15}}>Tailored applications</div>
        <div style={{width: 60, height: 2, background: good}} />
        <div style={{color: good, fontSize: 18, fontWeight: 800}}>More interviews</div>
      </div>

      {/* Closing line */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          opacity: reveal(closingStart, 24),
          transform: `translateY(${rise(closingStart, 24)}px)`,
          fontSize: 42,
          fontWeight: 800,
          color: '#e6edf3',
          textAlign: 'center',
        }}
      >
        Adapt faster. <span style={{color: accent}}>Interview more.</span>
      </div>
    </div>
  );
};
