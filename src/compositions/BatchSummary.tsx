import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {colors, fonts, statusColor} from '../design-tokens';

const rows: {file: string; status: string; kind: 'approved' | 'review' | 'flag' | 'duplicate'}[] = [
  {file: 'invoice_01.pdf', status: 'APPROVED', kind: 'approved'},
  {file: 'invoice_02.pdf', status: 'FLAG: MATH_MISMATCH', kind: 'mismatch' as any},
  {file: 'invoice_03.pdf', status: 'FLAG: MISSING_PO', kind: 'review'},
  {file: 'invoice_04.pdf', status: 'FLAG: HIGH_VALUE', kind: 'review'},
  {file: 'invoice_05.pdf', status: 'FLAG: DUPLICATE', kind: 'duplicate'},
];

export const BatchSummary: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 24,
          color: colors.textDim,
          marginBottom: 32,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        Batch Summary — 5 invoices, 1 pass
      </div>
      <div
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          backgroundColor: colors.bgRaised,
          padding: '16px 0',
          minWidth: 720,
        }}
      >
        {rows.map((row, i) => {
          const delay = i * 8;
          const p = spring({frame: frame - delay, fps, config: {damping: 200}});
          return (
            <div
              key={row.file}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px 40px',
                opacity: p,
                transform: `translateY(${(1 - p) * 16}px)`,
                fontFamily: fonts.mono,
                fontSize: 24,
              }}
            >
              <span style={{color: colors.text}}>{row.file}</span>
              <span style={{color: statusColor(row.kind as any), fontWeight: 700}}>[{row.status}]</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
