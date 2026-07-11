import type { ComponentType } from "react";

export interface SlideProps {
  /** whether this slide is currently the active section */
  active: boolean;
  /** current reveal beat within the slide (0-indexed) */
  beat: number;
  /** direction of the last navigation: 1 forward, -1 backward */
  dir: number;
}

export interface SlideDef {
  id: string;
  /** number of reveal beats. beats run 0..(beats-1). */
  beats: number;
  /** accent hue applied to the ambient glow while this slide is active */
  accent?: string;
  accentGlow?: string;
  Component: ComponentType<SlideProps>;
}
