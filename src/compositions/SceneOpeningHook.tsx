// TODO: placeholder character asset — copyrighted (Rick Sanchez). Replace with original mascot before shipping.
import React from 'react';
import {SceneWrapper} from './SceneWrapper';
import {UICard} from './UICard';
import {Caption} from './Caption';

export const SceneOpeningHook: React.FC = () => {
  return (
    <SceneWrapper characterSrc="mascot-placeholder.png" characterSide="right">
      <UICard label="[INVOICE_01]" sub="$4,200 — total" frameIn={0} top={340} left={280} />
      <UICard label="[INVOICE_02]" sub="$100,000 — total" frameIn={15} top={340} left={680} variant="danger" />
      <Caption text="This invoice says **$4,200**. This one — same vendor, same format — says **$100,000**." frameIn={5} />
    </SceneWrapper>
  );
};
