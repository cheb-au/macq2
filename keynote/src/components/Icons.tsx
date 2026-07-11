import type { CSSProperties } from "react";

interface IP {
  size?: number;
  className?: string;
  style?: CSSProperties;
}
const base = (size: number): CSSProperties => ({
  width: size,
  height: size,
  display: "block",
});
const svg = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const Icon = {
  node: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="8.4" opacity="0.5" />
    </svg>
  ),
  flow: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <circle cx="5" cy="12" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M7 11 16.8 6.7M7 13l9.8 4" />
    </svg>
  ),
  layers: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M3 13l9 5 9-5" opacity="0.55" />
    </svg>
  ),
  loop: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <path d="M4 12a8 8 0 0 1 13.7-5.6M20 12A8 8 0 0 1 6.3 17.6" />
      <path d="M17 3v3.5h-3.5M7 21v-3.5h3.5" />
    </svg>
  ),
  signal: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <path d="M4 14a11 11 0 0 1 16 0M7.5 11a6.5 6.5 0 0 1 9 0" />
      <circle cx="12" cy="17.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  shield: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <path d="M12 3 5 6v5c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  compass: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5.2-5.2 2 2-5.2 5.2-2Z" />
    </svg>
  ),
  tree: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M12 7v4M12 11H6.5a1 1 0 0 0-1 1v5M12 11h5.5a1 1 0 0 1 1 1v5" />
    </svg>
  ),
  spark: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" opacity="0.6" />
      <path d="M12 8.5 13 11l2.5 1-2.5 1-1 2.5-1-2.5L8.5 12 11 11l1-2.5Z" />
    </svg>
  ),
  eye: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  ),
  grid: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
    </svg>
  ),
  bolt: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />
    </svg>
  ),
  scale: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <path d="M12 4v16M6 8h12M6 8 3.5 14a3 3 0 0 0 5 0L6 8Zm12 0-2.5 6a3 3 0 0 0 5 0L18 8Z" />
      <circle cx="12" cy="4" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  ),
  arrowRight: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  arrowDown: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  ),
  card: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M3.5 9.5h17" opacity="0.6" />
    </svg>
  ),
  doc: ({ size = 24, className, style }: IP) => (
    <svg {...svg} style={{ ...base(size), ...style }} className={className}>
      <path d="M6 3h7l5 5v13H6V3Z" />
      <path d="M13 3v5h5M9 13h6M9 16.5h6" opacity="0.7" />
    </svg>
  ),
};

export type IconName = keyof typeof Icon;
