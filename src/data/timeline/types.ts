export type TimelineScene = {
  id: string;
  component: string;
  startSec: number;
  endSec: number;
  props?: Record<string, unknown>;
};
