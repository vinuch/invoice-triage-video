import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';

export const CloseBroll: React.FC = () => (
  <OffthreadVideo
    src={staticFile('broll/close-broll-1080p.mp4')}
    style={{width: '100%', height: '100%', objectFit: 'cover'}}
    muted
  />
);
