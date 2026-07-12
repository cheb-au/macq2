import { useEffect, useRef } from "react";

// only things a designer PRODUCES - inbound signals (metrics, tickets, quotes)
// are evidence you consume, not artefacts you make, so they don't belong here
const LABELS = [
  "Roadmaps",
  "Spec docs",
  "Wireframes",
  "Figma frames",
  "Prototypes",
  "Personas",
  "Journey maps",
  "Research reports",
  "Jira tickets",
  "Backlog items",
  "Retro notes",
  "Code snippets",
  "Dashboards",
];

// centred below the heading and left of the nav rail
const CX = 900;
const CY = 612;

interface Chip {
  ang: number;
  r: number;
  rf: number; // vertical flatten
  spd: number;
  scale: number;
  op: number;
}

// concentric elliptical rings - evenly spaced so artefacts don't clump
const RINGS = [
  { r: 300, count: 4, spd: 0.05, scale: 1.02, op: 0.9, phase: 0.2 },
  { r: 500, count: 4, spd: -0.038, scale: 0.92, op: 0.74, phase: 0.9 },
  { r: 690, count: 5, spd: 0.03, scale: 0.82, op: 0.58, phase: 0 },
];
const RF = 0.42;

/**
 * Dozens of named artefacts orbiting the decision. As `collapse` goes true they
 * accelerate, spiral inward and fade - collapsing under the sphere's gravity
 * until only the glowing decision is left.
 */
export function ArtefactOrbit({ collapse }: { collapse: boolean }) {
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const target = useRef(0);
  target.current = collapse ? 1 : 0;

  useEffect(() => {
    const chips: Chip[] = [];
    let li = 0;
    for (const ring of RINGS) {
      for (let k = 0; k < ring.count && li < LABELS.length; k++, li++) {
        chips.push({
          ang: ring.phase + (Math.PI * 2 * k) / ring.count,
          r: ring.r,
          rf: RF,
          spd: ring.spd,
          scale: ring.scale,
          op: ring.op,
        });
      }
    }

    let raf = 0;
    let u = 0; // one-shot suck progress 0 → 1
    let last = 0;

    const step = (ts: number) => {
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0.016;
      last = ts;
      // timed suck (not an ease-out) so it ACCELERATES into the singularity
      if (target.current === 1) u = Math.min(1, u + dt / 1.25);
      else u = 0;
      // gravity well: radius holds, then collapses hard at the very end
      const pull = Math.pow(u, 2.6);
      // angular velocity spikes as they near the core - they whirl inward
      const whirl = Math.pow(u, 3);
      // they only wink out at the last instant, as they hit the planet
      const fade = Math.pow(u, 3.6);

      for (let i = 0; i < chips.length; i++) {
        const c = chips[i];
        const el = nodes.current[i];
        if (!el) continue;
        c.ang += c.spd * dt * (1 + whirl * 52);
        const r = c.r * (1 - pull) + 3 * pull;
        const x = CX + Math.cos(c.ang) * r;
        const y = CY + Math.sin(c.ang) * r * c.rf;
        const s = c.scale * (1 - pull * 0.84);
        // words stay upright for readability - no rotation
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) scale(${s.toFixed(3)})`;
        el.style.opacity = String(Math.max(0, c.op * (1 - fade)));
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="artorbit">
      {LABELS.map((label, i) => (
        <div
          key={label}
          ref={(el) => (nodes.current[i] = el)}
          className="artchip"
        >
          {label}
        </div>
      ))}
    </div>
  );
}
