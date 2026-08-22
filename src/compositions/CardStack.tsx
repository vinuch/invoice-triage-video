import React from 'react';
import {UICard} from './UICard';
import {Variant} from '../design-tokens';

export type CardConfig = {
  label: string;
  sub?: string;
  frameIn: number;
  variant?: Variant;
};

type CardStackProps = {
  cards: CardConfig[];
  origin: {top: number; left: number};
  direction?: 'vertical' | 'horizontal';
  gap?: number; // gap between card edges, in px
};

// Auto-lays-out a sequence of UICards from one anchor point,
// so scenes never hardcode individual top/left pairs.
export const CardStack: React.FC<CardStackProps> = ({
  cards,
  origin,
  direction = 'vertical',
  gap = 24,
}) => {
  const step = direction === 'vertical' ? 96 + gap : 260 + gap; // approx card height / width + gap

  return (
    <>
      {cards.map((card, i) => {
        const top = direction === 'vertical' ? origin.top + i * step : origin.top;
        const left = direction === 'horizontal' ? origin.left + i * step : origin.left;
        return <UICard key={`${card.label}-${i}`} {...card} top={top} left={left} />;
      })}
    </>
  );
};
