import React from 'react';
import {SceneWrapper} from './SceneWrapper';
import {UICard} from './UICard';
import {Caption} from './Caption';

export const RickStyleDemo: React.FC = () => {
  return (
    <SceneWrapper characterSrc="mascot-placeholder.png" characterSide="left">
      <UICard label="[TRIP]" sub="request" frameIn={10} top={200} left={700} />
      <UICard label="[RECEIPT]" sub="pending" frameIn={25} top={280} left={950} />
      <Caption text="Now imagine **something** into many services." frameIn={0} />
    </SceneWrapper>
  );
};
