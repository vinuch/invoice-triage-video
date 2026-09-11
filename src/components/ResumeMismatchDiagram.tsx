import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {fadeIn, riseIn, slideIn, staggerAt, growIn} from '../lib/animate';

// Built from brief YsESk (Section 0: Hook)
// "A single static resume file duplicating into a stream of many job-posting
//  cards, each with different keywords/phrasing. Cards funnel through an ATS
//  filter, qualified candidates rejected before reaching a human-review icon.
//  Ends on: 'Resume: static' vs 'Jobs: constantly changing'."

const accent = '#a371f7';
const danger = '#f85149';

type JobCard = {
  title: string;
  keyword: string;
};

const defaultJobs: JobCard[] = [
  {title: 'Backend Engineer', keyword: 'microservices'},
  {title: 'Platform Team Lead', keyword: 'CI/CD pipelines'},
  {title: 'Senior SWE', keyword: 'distributed systems'},
  {title: 'DevOps Engineer', keyword: 'infra-as-code'},
];

type ResumeMismatchDiagramProps = {
  resumeFileName?: string;
  jobs?: JobCard[];
  startFrame?: number;
};

export const ResumeMismatchDiagram: React.FC<ResumeMismatchDiagramProps> = ({
  resumeFileName = 'Resume_Final_v3_ACTUAL_FINAL.pdf',
  jobs = defaultJobs,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;

  // Stage 1 (0-30): resume file appears on the left
  const resumeOpacity = fadeIn(t, 0, 20);

  // Stage 2 (30-110): job cards stream out to the right, staggered
  const cardStagger = 16;
  const cardStart = 35;

  // Stage 3 (130-165): cards funnel down through the ATS filter
  const filterY = growIn(t, 130, 30, 40);
  const filterOpacity = fadeIn(t, 125, 20);

  // Stage 4 (165-200): rejection — most cards fall away red, one survives to human icon
  const rejectOpacity = fadeIn(t, 165, 20);

  // Stage 5 (200-240): closing contrast line
  const closingOpacity = fadeIn(t, 205, 25);
  const closingY = riseIn(t, 205, 25, 16);

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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          opacity: interpolate(t, [200, 210], [1, 0.25], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {/* Static resume file */}
        <div
          style={{
            opacity: resumeOpacity,
            width: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 140,
              height: 176,
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              padding: 16,
            }}
          >
            {[0.9, 0.6, 0.75, 0.5, 0.8, 0.4].map((w, i) => (
              <div
                key={i}
                style={{height: 6, width: `${w * 100}%`, background: '#30363d', borderRadius: 3}}
              />
            ))}
          </div>
          <div style={{color: '#8b949e', fontSize: 12, textAlign: 'center', maxWidth: 160}}>
            {resumeFileName}
          </div>
          <div
            style={{
              color: accent,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            One resume
          </div>
        </div>

        {/* Job posting cards streaming right */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            transform: `translateY(${filterY}px)`,
          }}
        >
          {jobs.map((job, i) => {
            const revealAt = staggerAt(i, cardStart, cardStagger);
            const opacity = fadeIn(t, revealAt, 14);
            const x = slideIn(t, revealAt, 14, -30);
            return (
              <div
                key={job.title}
                style={{
                  opacity,
                  transform: `translateX(${x}px)`,
                  width: 320,
                  padding: '14px 18px',
                  borderRadius: 10,
                  background: '#161b22',
                  border: '1px solid #30363d',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{color: '#e6edf3', fontSize: 16, fontWeight: 600}}>{job.title}</span>
                <span
                  style={{
                    color: '#8b949e',
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                    background: '#0d1117',
                    padding: '3px 8px',
                    borderRadius: 6,
                  }}
                >
                  {job.keyword}
                </span>
              </div>
            );
          })}
        </div>

        {/* ATS filter gate */}
        <div
          style={{
            opacity: filterOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 3,
              height: 200,
              background: `linear-gradient(180deg, ${danger}, transparent)`,
            }}
          />
          <div
            style={{
              color: danger,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              writingMode: 'vertical-rl',
            }}
          >
            ATS filter
          </div>
        </div>
      </div>

      {/* Rejection state */}
      <div
        style={{
          position: 'absolute',
          opacity: rejectOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            background: `${danger}22`,
            border: `1px solid ${danger}66`,
            color: danger,
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          ✕ Filtered out before a human ever sees your name
        </div>
      </div>

      {/* Closing contrast line */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          opacity: closingOpacity,
          transform: `translateY(${closingY}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          fontSize: 30,
          fontWeight: 800,
        }}
      >
        <span style={{color: '#8b949e'}}>Resume: static</span>
        <span style={{color: '#30363d'}}>vs</span>
        <span style={{color: danger}}>Jobs: constantly changing</span>
      </div>
    </div>
  );
};
