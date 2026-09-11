import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';

export const HookBroll: React.FC = () => (
  <OffthreadVideo
    src={staticFile('broll/hook-broll-1080p.mp4')}
    style={{width: '100%', height: '100%', objectFit: 'cover'}}
    muted
  />
);
