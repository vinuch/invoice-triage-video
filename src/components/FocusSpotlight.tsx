import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../design-tokens';

/**
 * Layer this on top of a long-running diagram (same Sequence `from`, but a
 * shorter `durationInFrames` matching one narration sub-beat) to make a
 * single diagram track multiple points in a long script section instead of
 * sitting static. Stack several of these back-to-back — one per sub-beat —
 * over the diagram's own unchanged Sequence.
 *
 * Coordinates are percentages of the full video canvas (0-100), not the
 * diagram's internal scaled coordinate system — eyeball-position these
 * against a still frame of the diagram rather than computing them exactly.
 *
 * Usage (in a composition file):
 *   <Sequence from={archFrom} durationInFrames={archDur}>
 *     <CoverLetterArchitectureDiagram />
 *   </Sequence>
 *   <Sequence from={archFrom} durationInFrames={sub1Dur}>
 *     <FocusSpotlight x={5} y={35} width={20} height={30} label="Ingestion" />
 *   </Sequence>
 *   <Sequence from={archFrom + sub1Dur} durationInFrames={sub2Dur}>
 *     <FocusSpotlight x={28} y={35} width={20} height={30} label="Research" />
 *   </Sequence>
 */

type FocusSpotlightProps = {
  x: number; // % from left
  y: number; // % from top
  width: number; // % of canvas width
  height: number; // % of canvas height
  label?: string;
  dimOpacity?: number; // how dark the non-highlighted area gets, 0-1
  fadeFrames?: number; // fade in/out duration at each end of this sub-beat
};

export const FocusSpotlight: React.FC<FocusSpotlightProps> = ({
  x,
  y,
  width,
  height,
  label,
  dimOpacity = 0.55,
  fadeFrames = 10,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, fadeFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', inset: 0, opacity, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: `${y}%`, background: `rgba(0,0,0,${dimOpacity})`}} />
      <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, top: `${y + height}%`, background: `rgba(0,0,0,${dimOpacity})`}} />
      <div style={{position: 'absolute', top: `${y}%`, height: `${height}%`, left: 0, width: `${x}%`, background: `rgba(0,0,0,${dimOpacity})`}} />
      <div style={{position: 'absolute', top: `${y}%`, height: `${height}%`, right: 0, left: `${x + width}%`, background: `rgba(0,0,0,${dimOpacity})`}} />

      <div
        style={{
          position: 'absolute',
          top: `${y}%`,
          left: `${x}%`,
          width: `${width}%`,
          height: `${height}%`,
          border: `2px solid ${colors.agent}`,
          borderRadius: 10,
          boxShadow: `0 0 24px ${colors.agent}55`,
        }}
      />

      {label && (
        <div
          style={{
            position: 'absolute',
            top: `calc(${y}% - 34px)`,
            left: `${x}%`,
            color: colors.agent,
            fontFamily: fonts.mono,
            fontSize: 14,
            fontWeight: 700,
            background: colors.bg,
            padding: '4px 10px',
            borderRadius: 6,
            border: `1px solid ${colors.agent}`,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
