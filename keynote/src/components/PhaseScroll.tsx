export interface Phase {
  label: string;
  text: string;
  accent?: boolean;
}

/**
 * The "phase scroller" interaction the deck is built around: large stacked
 * statements where the active one sits in sharp focus and the others scroll
 * away vertically, blurred out. Advancing scrolls top-down to the next phase.
 *
 * This is the reusable version - when a slide needs "that interaction", use this.
 */
export function PhaseScroll({
  phases,
  active,
  gap = 172,
  className = "",
}: {
  phases: Phase[];
  active: number;
  /** vertical distance between stacked phases, px */
  gap?: number;
  className?: string;
}) {
  return (
    <div className={["phasescroll", className].filter(Boolean).join(" ")}>
      {phases.map((p, k) => {
        const rel = k - active; // <0 scrolled above · 0 active · >0 waiting below
        const on = rel === 0;
        return (
          <div
            key={p.label + k}
            className="phaseitem"
            style={{
              transform: `translateY(calc(-50% + ${rel * gap}px))`,
              opacity: on ? 1 : 0.16,
              filter: on ? "blur(0)" : "blur(6px)",
            }}
          >
            <div
              className="phaseitem__label"
              style={{ color: p.accent ? "var(--accent)" : "var(--ink-faint)" }}
            >
              {p.label}
            </div>
            <p className="phaseitem__text">{p.text}</p>
          </div>
        );
      })}
    </div>
  );
}
