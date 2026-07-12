import { Icon } from "./Icons";
import type { ComponentType } from "react";

interface Layer {
  key: string;
  label: string;
  meta: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

// build order - foundation first (index 0), the stakes on top
const LAYERS: Layer[] = [
  { key: "infra", label: "Real infrastructure", meta: "it actually runs", icon: Icon.grid },
  { key: "data", label: "Real data", meta: "live, not seeded", icon: Icon.node },
  { key: "pay", label: "Real payments", meta: "money actually moved", icon: Icon.card },
  { key: "cust", label: "Real customers", meta: "real people, real outcomes", icon: Icon.signal },
  { key: "risk", label: "Real operational risk", meta: "the stakes were real", icon: Icon.shield },
];

/**
 * The emotional centrepiece: Levri assembling itself from nothing. Each beat
 * lays down another layer of the platform - the stack literally builds upward
 * from an empty repository to a live production system.
 */
export function LevriStack({ beat }: { beat: number }) {
  const activeCount = Math.max(0, Math.min(beat + 1, LAYERS.length));
  const live = beat >= LAYERS.length - 1;
  const pct = (activeCount / LAYERS.length) * 100;

  return (
    <div className={["lvstack", live ? "is-live" : ""].join(" ")}>
      <div className="lvstack__spine">
        <div className="lvstack__fill" style={{ height: `${pct}%` }} />
      </div>
      <div className="lvstack__rows">
        {/* render top → bottom (production first) */}
        {LAYERS.slice().reverse().map((l) => {
          const idx = LAYERS.indexOf(l);
          const on = beat >= idx;
          const top = idx === activeCount - 1; // most-recently laid layer
          return (
            <div
              key={l.key}
              className={["lvl", on ? "on" : "", top ? "top" : ""].join(" ")}
            >
              <div className="lvl__orb">
                <l.icon size={24} />
              </div>
              <div className="lvl__body">
                <div className="lvl__label">{l.label}</div>
                <div className="lvl__meta">{l.meta}</div>
              </div>
              <div className="lvl__status">{on && <span className="lvl__dot" />}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
