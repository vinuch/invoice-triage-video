export const colors = {
  bg: '#0B0E11',
  bgRaised: '#12161B',
  text: '#E8E6E1',
  textDim: '#7C8B99',
  border: '#1E2530',
  approved: '#5FD98A',
  review: '#E8A33D',
  mismatch: '#E5484D',
  agent: '#5B8DEF', // pipeline/agent node accent, distinct from status colors
} as const;

export const fonts = {
  mono: "'JetBrains Mono', 'IBM Plex Mono', monospace",
  display: "'Space Grotesk', sans-serif",
} as const;

// Single source of truth for every variant/status color across the app.
// TerminalReveal statuses and UICard variants both map through this.
export type Variant = 'default' | 'accent' | 'danger' | 'ghost' | 'review';

export const variantColor = (variant: Variant): string => {
  switch (variant) {
    case 'accent':
      return colors.approved;
    case 'danger':
      return colors.mismatch;
    case 'review':
      return colors.review;
    case 'ghost':
      return colors.textDim;
    default:
      return colors.text;
  }
};

// Kept for TerminalReveal's existing status union — now just delegates to variantColor.
export const statusColor = (status: 'approved' | 'review' | 'flag' | 'duplicate') => {
  const map: Record<typeof status, Variant> = {
    approved: 'accent',
    review: 'review',
    flag: 'danger',
    duplicate: 'danger',
  };
  return variantColor(map[status]);
};

// Standard render target: 1920x1080 @30fps
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
