import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../design-tokens';
import {SceneBeats} from '../SceneBeats';

const rows = [
  {item: 'Widget A', qty: '4', price: '$120.00'},
  {item: 'Widget B', qty: '2', price: '$85.00'},
  {item: 'Service Fee', qty: '1', price: '$40.00'},
];

export const SceneLayoutAwareness: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          backgroundColor: colors.bgRaised,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 40,
          width: 760,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{fontFamily: fonts.mono, fontSize: 18, color: colors.textDim, marginBottom: 24}}>
          invoice_01.pdf — table layout
        </div>

        {rows.map((row, i) => {
          const rowFrameIn = 10 + i * 18;
          const enter = spring({frame: frame - rowFrameIn, fps, config: {damping: 200}});
          const scanFrame = rowFrameIn + 6;
          const scan = interpolate(frame - scanFrame, [0, 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const settled = interpolate(frame - scanFrame, [14, 24], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={row.item}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                marginBottom: 10,
                borderRadius: 8,
                fontFamily: fonts.mono,
                fontSize: 20,
                color: colors.text,
                backgroundColor: colors.bg,
                border: `1px solid ${colors.border}`,
                opacity: enter,
                transform: `translateX(${(1 - enter) * -24}px)`,
                overflow: 'hidden',
              }}
            >
              {/* scanning sweep */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${scan * 100}%`,
                  width: 60,
                  background: `linear-gradient(90deg, transparent, rgba(95,217,138,${0.35 * (1 - Math.abs(scan - 0.5) * 0.6)}), transparent)`,
                  transform: 'translateX(-30px)',
                }}
              />
              {/* settle glow once scanned */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: `1px solid rgba(95,217,138,${settled * 0.5})`,
                  borderRadius: 8,
                  pointerEvents: 'none',
                }}
              />
              <span style={{position: 'relative', flex: 2}}>{row.item}</span>
              <span style={{position: 'relative', flex: 1, textAlign: 'center', color: colors.textDim}}>
                qty {row.qty}
              </span>
              <span style={{position: 'relative', flex: 1, textAlign: 'right'}}>{row.price}</span>

              {/* connector dots showing spatial linkage between fields, once settled */}
              {settled > 0.05 && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '35%',
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: colors.approved,
                      opacity: settled,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '65%',
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: colors.approved,
                      opacity: settled,
                    }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
      <SceneBeats
        beats={[
          {
            type: 'caption',
            frameIn: 8,
            text: "A vision model sees the invoice the way a human does — **spatial position included.**",
          },
        ]}
      />
    </AbsoluteFill>
  );
};
