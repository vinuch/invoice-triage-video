import React from 'react';
import {UICard, UICardProps} from './UICard';
import {CardStack, CardConfig} from './CardStack';
import {Caption} from './Caption';

export type Beat =
  | ({type: 'card'} & UICardProps)
  | {type: 'cardStack'; cards: CardConfig[]; origin: {top: number; left: number}; direction?: 'vertical' | 'horizontal'; gap?: number}
  | {type: 'caption'; text: string; frameIn: number; frameOut?: number};

// Renders a full scene's foreground content (cards + caption) from one declarative array.
// This is the pattern TerminalReveal already uses (script -> lines); scenes now follow it too.
export const SceneBeats: React.FC<{beats: Beat[]}> = ({beats}) => {
  return (
    <>
      {beats.map((beat, i) => {
        if (beat.type === 'card') {
          const {type, ...cardProps} = beat;
          return <UICard key={i} {...cardProps} />;
        }
        if (beat.type === 'cardStack') {
          return (
            <CardStack
              key={i}
              cards={beat.cards}
              origin={beat.origin}
              direction={beat.direction}
              gap={beat.gap}
            />
          );
        }
        return <Caption key={i} text={beat.text} frameIn={beat.frameIn} frameOut={beat.frameOut} />;
      })}
    </>
  );
};
