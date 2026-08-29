import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';

// ============================================================
// PLACEHOLDER COMPONENTS
// Replace these three imports with your real ones from
// invoice-triage-video, e.g.:
//   import { SceneWrapper } from '../components/SceneWrapper';
//   import { UICard } from '../components/UICard';
//   import { Caption } from '../components/Caption';
// The props below are guesses based on how you described them —
// adjust the prop names to match your actual signatures.
// ============================================================

const SceneWrapper: React.FC<{ children: React.ReactNode; bg?: string }> = ({
  children,
  bg = '#0b0f14',
}) => <AbsoluteFill style={{ backgroundColor: bg }}>{children}</AbsoluteFill>;

const UICard: React.FC<{
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  delay?: number;
  accent?: string;
}> = ({ title, subtitle, x, y, delay = 0, accent = '#4f9dde' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);
  const scale = spring({ frame: local, fps, config: { damping: 14, stiffness: 140 } });
  const opacity = interpolate(local, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${scale})`,
        opacity,
        background: '#151b23',
        border: `1px solid ${accent}`,
        borderRadius: 12,
        padding: '16px 20px',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        minWidth: 220,
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 600 }}>{title}</div>
      {subtitle && (
        <div style={{ fontSize: 14, color: '#8fa3b3', marginTop: 4 }}>{subtitle}</div>
      )}
    </div>
  );
};

const Caption: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);
  const opacity = interpolate(local, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        fontSize: 28,
        opacity,
      }}
    >
      {text}
    </div>
  );
};

// Simple animated arrow between two cards, keyed to a delay frame
const FlowArrow: React.FC<{ x: number; y: number; delay?: number }> = ({
  x,
  y,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);
  const opacity = interpolate(local, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        color: '#4f9dde',
        fontSize: 32,
        opacity,
      }}
    >
      →
    </div>
  );
};

// ============================================================
// SCENE: Git Workflow — "Saving Your Work" beat
// git add → git commit → git push
// Timed at 30fps: each card lands ~15 frames apart
// ============================================================

export const GitWorkflowScene: React.FC = () => {
  return (
    <SceneWrapper>
      <UICard title="git add" subtitle="Working dir → Staging" x={80} y={280} delay={0} accent="#e8b339" />
      <FlowArrow x={330} y={300} delay={15} />
      <UICard title="git commit" subtitle="Staging → Local repo" x={420} y={280} delay={20} accent="#4fae64" />
      <FlowArrow x={670} y={300} delay={35} />
      <UICard title="git push" subtitle="Local → Remote repo" x={760} y={280} delay={40} accent="#e05252" />

      <Caption text="Three commands. Three moves across the pipeline." delay={55} />
    </SceneWrapper>
  );
};

// ============================================================
// TOP-LEVEL COMPOSITION EXAMPLE
// Register this in your Root.tsx alongside your existing comps
// ============================================================

export const GitWorkflowComposition: React.FC = () => {
  return (
    <Sequence from={0} durationInFrames={120}>
      <GitWorkflowScene />
    </Sequence>
  );
};

